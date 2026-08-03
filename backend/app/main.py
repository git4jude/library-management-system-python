"""FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, engine
from app.routers import books

app = FastAPI(
    title="Library Management System API",
    description="Backend API for a three-tier Library Management System.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    """Create database tables if they do not already exist."""
    Base.metadata.create_all(bind=engine)


app.include_router(books.router)


@app.get("/api/health", tags=["health"])
def health_check() -> dict:
    """Simple liveness check used by monitoring and deployment tooling."""
    return {"status": "ok"}
