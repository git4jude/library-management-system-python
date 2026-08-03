"""Business logic for books. Raises domain exceptions; routers translate them to HTTP."""
from typing import List

from sqlalchemy.orm import Session

from app.models.book import Book
from app.repositories import book_repository
from app.schemas.book import BookCreate, BookUpdate


class BookNotFoundError(Exception):
    """Raised when a book with the given id does not exist."""


class DuplicateIsbnError(Exception):
    """Raised when attempting to create/update a book with an ISBN already in use."""


def list_books(db: Session, skip: int = 0, limit: int = 100) -> List[Book]:
    return book_repository.get_books(db, skip=skip, limit=limit)


def get_book(db: Session, book_id: int) -> Book:
    book = book_repository.get_book(db, book_id)
    if book is None:
        raise BookNotFoundError(f"Book with id {book_id} not found")
    return book


def create_book(db: Session, book_in: BookCreate) -> Book:
    if book_repository.get_book_by_isbn(db, book_in.isbn) is not None:
        raise DuplicateIsbnError(f"Book with ISBN {book_in.isbn} already exists")
    return book_repository.create_book(db, book_in)


def update_book(db: Session, book_id: int, book_in: BookUpdate) -> Book:
    book = get_book(db, book_id)

    if book_in.isbn is not None and book_in.isbn != book.isbn:
        existing = book_repository.get_book_by_isbn(db, book_in.isbn)
        if existing is not None and existing.id != book_id:
            raise DuplicateIsbnError(f"Book with ISBN {book_in.isbn} already exists")

    return book_repository.update_book(db, book, book_in)


def delete_book(db: Session, book_id: int) -> None:
    book = get_book(db, book_id)
    book_repository.delete_book(db, book)
