"""Backend API tests for Mahaveer Brothers Laundry service."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    # fallback to frontend/.env
    from dotenv import dotenv_values
    BASE_URL = dotenv_values('/app/frontend/.env').get('REACT_APP_BACKEND_URL', '').rstrip('/')

API = f"{BASE_URL}/api"

ADMIN_USER = "admin"
ADMIN_PASS = "admin123"


@pytest.fixture(scope="session")
def admin_token():
    r = requests.post(f"{API}/admin/login", json={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=30)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="session")
def admin_headers(admin_token):
    return {"x-admin-token": admin_token}


# ===== Services =====
class TestServices:
    def test_get_services_returns_six(self):
        r = requests.get(f"{API}/services", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6
        assert {"id", "name", "price", "unit", "description"} <= set(data[0].keys())


# ===== Admin login =====
class TestAdminLogin:
    def test_valid_login(self):
        r = requests.post(f"{API}/admin/login", json={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=30)
        assert r.status_code == 200
        assert "token" in r.json()

    def test_wrong_password(self):
        r = requests.post(f"{API}/admin/login", json={"username": ADMIN_USER, "password": "wrong"}, timeout=30)
        assert r.status_code == 401

    def test_wrong_username(self):
        r = requests.post(f"{API}/admin/login", json={"username": "nope", "password": ADMIN_PASS}, timeout=30)
        assert r.status_code == 401


# ===== Bookings & admin booking management =====
class TestBookingsFlow:
    booking_id = None

    def test_create_booking(self):
        payload = {
            "name": "TEST_Vivek",
            "phone": "9876543210",
            "address": "123 TEST Street, Deoria",
            "service": "Wash & Iron",
            "pickup_date": "2026-02-20",
            "pickup_time": "10:00",
            "notes": "TEST booking"
        }
        r = requests.post(f"{API}/bookings", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["status"] == "pending"
        assert "id" in data
        TestBookingsFlow.booking_id = data["id"]

    def test_admin_bookings_requires_token(self):
        r = requests.get(f"{API}/admin/bookings", timeout=30)
        assert r.status_code == 401

    def test_admin_bookings_with_token(self, admin_headers):
        r = requests.get(f"{API}/admin/bookings", headers=admin_headers, timeout=30)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        ids = [b["id"] for b in items]
        assert TestBookingsFlow.booking_id in ids

    def test_update_status_valid(self, admin_headers):
        bid = TestBookingsFlow.booking_id
        r = requests.patch(f"{API}/admin/bookings/{bid}", headers=admin_headers, json={"status": "in_progress"}, timeout=30)
        assert r.status_code == 200
        assert r.json()["status"] == "in_progress"

    def test_update_status_invalid(self, admin_headers):
        bid = TestBookingsFlow.booking_id
        r = requests.patch(f"{API}/admin/bookings/{bid}", headers=admin_headers, json={"status": "bogus"}, timeout=30)
        assert r.status_code == 400

    def test_update_status_missing_booking(self, admin_headers):
        r = requests.patch(f"{API}/admin/bookings/nonexistent-id-xyz", headers=admin_headers, json={"status": "pending"}, timeout=30)
        assert r.status_code == 404

    def test_admin_stats(self, admin_headers):
        r = requests.get(f"{API}/admin/stats", headers=admin_headers, timeout=30)
        assert r.status_code == 200
        data = r.json()
        for k in ["total", "pending", "in_progress", "delivered"]:
            assert k in data
            assert isinstance(data[k], int)

    def test_delete_booking(self, admin_headers):
        bid = TestBookingsFlow.booking_id
        r = requests.delete(f"{API}/admin/bookings/{bid}", headers=admin_headers, timeout=30)
        assert r.status_code == 200
        # verify gone
        r2 = requests.delete(f"{API}/admin/bookings/{bid}", headers=admin_headers, timeout=30)
        assert r2.status_code == 404
