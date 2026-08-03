"""Pydantic schemas for Book request/response validation."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class BookBase(BaseModel):
    """Fields shared across create and update payloads."""

    title: str = Field(..., min_length=1, max_length=255)
    author: str = Field(..., min_length=1, max_length=255)
    isbn: str = Field(..., min_length=1, max_length=20)
    genre: Optional[str] = Field(default=None, max_length=100)
    published_year: Optional[int] = Field(default=None, ge=0, le=9999)
    available_copies: int = Field(default=1, ge=0)
    is_available: bool = Field(default=True)


class BookCreate(BookBase):
    """Payload for creating a new book."""

    pass


class BookUpdate(BaseModel):
    """Payload for updating an existing book. All fields optional."""

    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    author: Optional[str] = Field(default=None, min_length=1, max_length=255)
    isbn: Optional[str] = Field(default=None, min_length=1, max_length=20)
    genre: Optional[str] = Field(default=None, max_length=100)
    published_year: Optional[int] = Field(default=None, ge=0, le=9999)
    available_copies: Optional[int] = Field(default=None, ge=0)
    is_available: Optional[bool] = None


class BookOut(BookBase):
    """Response schema returned to clients."""

    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
