"""SQLAlchemy model for the books table."""
from sqlalchemy import Boolean, Column, DateTime, Integer, String, func

from app.db.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    author = Column(String, nullable=False, index=True)
    isbn = Column(String, nullable=False, unique=True, index=True)
    genre = Column(String, nullable=True)
    published_year = Column(Integer, nullable=True)
    available_copies = Column(Integer, nullable=False, default=1)
    is_available = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
