"""
CivicTwin AI - Preventive Recommendations & Human Approval Gate Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import Recommendation, ApprovalRecord
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/recommendations", tags=["Preventive Recommendations & Governance"])

class ApprovalActionRequest(BaseModel):
    action: str # Approved, Rejected
    comments: Optional[str] = "Signed off by authorized municipal coordinator."
    user_id: Optional[int] = 1

@router.get("")
def list_recommendations(status: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Recommendation)
    if status:
        q = q.filter(Recommendation.status == status)
    return q.order_by(Recommendation.id.desc()).all()

@router.post("/{rec_id}/action")
def act_on_recommendation(rec_id: int, req: ApprovalActionRequest, db: Session = Depends(get_db)):
    rec = db.query(Recommendation).filter(Recommendation.id == rec_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")

    rec.status = req.action.capitalize()

    # Record in audit trail
    approval = ApprovalRecord(
        recommendation_id=rec.id,
        user_id=req.user_id or 1,
        action=req.action.capitalize(),
        comments=req.comments
    )
    db.add(approval)
    db.commit()
    db.refresh(rec)
    return {
        "recommendation_id": rec.id,
        "title": rec.title,
        "status": rec.status,
        "action_recorded": approval.action,
        "timestamp": approval.timestamp.isoformat()
    }
