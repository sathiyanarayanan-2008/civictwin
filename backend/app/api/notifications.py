"""
CivicTwin AI - Alerts & Notifications API Endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import Notification

router = APIRouter(prefix="/notifications", tags=["Alerts & Notifications"])

@router.get("")
def get_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).order_by(Notification.id.desc()).all()

@router.patch("/{notif_id}/read")
def mark_read(notif_id: int, db: Session = Depends(get_db)):
    n = db.query(Notification).filter(Notification.id == notif_id).first()
    if n:
        n.is_read = True
        db.commit()
    return {"status": "success"}
