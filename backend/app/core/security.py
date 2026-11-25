from datetime import datetime, timedelta, timezone
from typing import Optional, Union, Any
from jose import jwt, JWTError
import hashlib
import hmac
import os
from app.core.config import settings

# Secure password hashing with salt using SHA-256 HMAC for portability and security
def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        if "$" not in hashed_password:
            return False
        parts = hashed_password.split("$")
        if len(parts) != 3:
            return False
        algorithm, salt, hash_val = parts
        computed = hashlib.sha256((salt + plain_password).encode('utf-8')).hexdigest()
        return hmac.compare_digest(computed, hash_val)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    salt = os.urandom(16).hex()
    hash_val = hashlib.sha256((salt + password).encode('utf-8')).hexdigest()
    return f"sha256${salt}${hash_val}"

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None
