"""
CivicTwin AI - Citizen Reporting Portal API Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import CitizenReport, User
from app.schemas.schemas import CitizenReportCreate, CitizenReportResponse
from typing import List, Optional
import os
import shutil

router = APIRouter(prefix="/reports", tags=["Citizen Reporting Portal"])

@router.get("", response_model=List[CitizenReportResponse])
def get_citizen_reports(status: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(CitizenReport)
    if status:
        q = q.filter(CitizenReport.status == status)
    return q.order_by(CitizenReport.id.desc()).all()

@router.post("", response_model=CitizenReportResponse)
def submit_citizen_report(
    report_in: CitizenReportCreate,
    db: Session = Depends(get_db)
):
    # Detect possible duplicates within 300m and same category
    potential_duplicate = db.query(CitizenReport).filter(
        CitizenReport.category == report_in.category,
        CitizenReport.latitude.between(report_in.latitude - 0.003, report_in.latitude + 0.003),
        CitizenReport.longitude.between(report_in.longitude - 0.003, report_in.longitude + 0.003)
    ).first()

    status = "Pending Verification"
    duplicate_of = None
    if potential_duplicate:
        duplicate_of = potential_duplicate.id
        status = "Under Review"

    new_report = CitizenReport(
        user_id=1, # Default or current user
        category=report_in.category,
        description=report_in.description,
        latitude=report_in.latitude,
        longitude=report_in.longitude,
        address=report_in.address or "Chennai Metropolitan Area",
        image_url=report_in.image_url,
        status=status,
        priority="High" if report_in.category in ["Flooding", "Waterlogging"] else "Moderate",
        duplicate_of_id=duplicate_of,
        ai_verified=True,
        ai_category_confidence=0.91
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

@router.patch("/{report_id}/status")
def update_report_status(report_id: int, new_status: str, db: Session = Depends(get_db)):
    rep = db.query(CitizenReport).filter(CitizenReport.id == report_id).first()
    if not rep:
        raise HTTPException(status_code=404, detail="Report not found")
    rep.status = new_status
    db.commit()
    db.refresh(rep)
    return rep
