from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'mahaveer-admin-secret-token')

app = FastAPI(title="Mahaveer Brothers Laundry API")
api_router = APIRouter(prefix="/api")


# ===== Models =====
ALLOWED_STATUSES = {"pending", "picked_up", "in_progress", "delivered", "cancelled"}


class ServiceCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    price: float = Field(ge=0)
    unit: str = Field(default="per piece", max_length=50)
    description: str = Field(default="", max_length=500)


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    unit: Optional[str] = None
    description: Optional[str] = None


class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: float
    unit: str = "per piece"
    description: str = ""
    sort_order: int = 0


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=7, max_length=20)
    address: str = Field(min_length=5, max_length=500)
    service: str = Field(min_length=2, max_length=100)
    pickup_date: str  # YYYY-MM-DD
    pickup_time: str  # HH:MM
    notes: Optional[str] = ""


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    address: str
    service: str
    pickup_date: str
    pickup_time: str
    notes: str = ""
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class StatusUpdate(BaseModel):
    status: str


class AdminLogin(BaseModel):
    username: str
    password: str


# ===== Auth dependency =====
def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_TOKEN):
        raise HTTPException(status_code=401, detail="Invalid or missing admin token")
    return True


# ===== Public routes =====
@api_router.get("/")
async def root():
    return {"message": "Mahaveer Brothers Laundry API", "status": "ok"}


@api_router.get("/services")
async def get_services():
    items = await db.services.find({}, {"_id": 0}).sort("sort_order", 1).to_list(1000)
    return items


DEFAULT_SERVICES = [
    {"id": "wash_iron", "name": "Wash & Iron", "price": 30, "unit": "per piece", "description": "Fresh wash with crisp ironing", "sort_order": 1},
    {"id": "dry_cleaning", "name": "Dry Cleaning", "price": 120, "unit": "per piece", "description": "Professional dry cleaning", "sort_order": 2},
    {"id": "steam_iron", "name": "Steam Iron", "price": 20, "unit": "per piece", "description": "Wrinkle-free steam pressing", "sort_order": 3},
    {"id": "premium_dry_clean", "name": "Premium Dry Clean", "price": 250, "unit": "per piece", "description": "Premium care for delicate fabrics", "sort_order": 4},
    {"id": "shoe_cleaning", "name": "Shoe Cleaning", "price": 150, "unit": "per pair", "description": "Deep clean for all kinds of shoes", "sort_order": 5},
    {"id": "carpet_cleaning", "name": "Carpet Cleaning", "price": 80, "unit": "per sq ft", "description": "Deep carpet & rug cleaning", "sort_order": 6},
]


@app.on_event("startup")
async def seed_services():
    count = await db.services.count_documents({})
    if count == 0:
        await db.services.insert_many([dict(s) for s in DEFAULT_SERVICES])
        logging.getLogger(__name__).info("Seeded default services")


@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    booking = Booking(**payload.model_dump())
    doc = booking.model_dump()
    await db.bookings.insert_one(doc)
    return booking


# ===== Admin routes =====
@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if (
        secrets.compare_digest(payload.username, ADMIN_USERNAME)
        and secrets.compare_digest(payload.password, ADMIN_PASSWORD)
    ):
        return {"token": ADMIN_TOKEN, "username": ADMIN_USERNAME}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@api_router.get("/admin/bookings", response_model=List[Booking])
async def list_bookings(_: bool = Depends(require_admin)):
    items = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.patch("/admin/bookings/{booking_id}", response_model=Booking)
async def update_booking_status(booking_id: str, update: StatusUpdate, _: bool = Depends(require_admin)):
    if update.status not in ALLOWED_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {sorted(ALLOWED_STATUSES)}")
    result = await db.bookings.find_one_and_update(
        {"id": booking_id},
        {"$set": {"status": update.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Booking not found")
    return result


@api_router.delete("/admin/bookings/{booking_id}")
async def delete_booking(booking_id: str, _: bool = Depends(require_admin)):
    result = await db.bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"deleted": True}


@api_router.get("/admin/stats")
async def admin_stats(_: bool = Depends(require_admin)):
    total = await db.bookings.count_documents({})
    pending = await db.bookings.count_documents({"status": "pending"})
    in_progress = await db.bookings.count_documents({"status": "in_progress"})
    delivered = await db.bookings.count_documents({"status": "delivered"})
    return {
        "total": total,
        "pending": pending,
        "in_progress": in_progress,
        "delivered": delivered,
    }


# ===== Admin: Services management =====
@api_router.post("/admin/services", response_model=Service)
async def create_service(payload: ServiceCreate, _: bool = Depends(require_admin)):
    last = await db.services.find({}, {"_id": 0, "sort_order": 1}).sort("sort_order", -1).limit(1).to_list(1)
    next_order = (last[0]["sort_order"] + 1) if last else 1
    svc = Service(name=payload.name, price=payload.price, unit=payload.unit, description=payload.description, sort_order=next_order)
    await db.services.insert_one(svc.model_dump())
    return svc


@api_router.patch("/admin/services/{service_id}", response_model=Service)
async def update_service(service_id: str, payload: ServiceUpdate, _: bool = Depends(require_admin)):
    update_doc = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    if not update_doc:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.services.find_one_and_update(
        {"id": service_id},
        {"$set": update_doc},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Service not found")
    return result


@api_router.delete("/admin/services/{service_id}")
async def delete_service(service_id: str, _: bool = Depends(require_admin)):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"deleted": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
