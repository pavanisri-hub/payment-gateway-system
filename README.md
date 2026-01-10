# Payment Gateway System

A production-ready payment gateway system supporting UPI and Card payments, similar to Razorpay/Stripe.

## 🚀 Quick Start

Start all services with a single command:

```bash
docker-compose up -d

Wait 10-15 seconds for services to initialize, then access:

API: http://localhost:8000

Dashboard: http://localhost:3000

Checkout: http://localhost:3001

📦 Services
PostgreSQL (port 5432): Database with auto-seeded test merchant

Spring Boot API (port 8000): RESTful API with authentication

React Dashboard (port 3000): Merchant dashboard

React Checkout (port 3001): Hosted checkout page

🔑 Test Credentials
Dashboard Login:

Email: test@example.com

Password: Any password (not validated in Deliverable 1)

API Credentials:

API Key: key_test_abc123

API Secret: secret_test_xyz789

🧪 Testing

1. Health Check

curl http://localhost:8000/health

2. Create Order

curl -X POST http://localhost:8000/api/v1/orders \
  -H "X-Api-Key: key_test_abc123" \
  -H "X-Api-Secret: secret_test_xyz789" \
  -H "Content-Type: application/json" \
  -d '{"amount": 50000, "currency": "INR", "receipt": "test_123"}'

3. Test Checkout

Visit: http://localhost:3001/checkout?order_id=<ORDER_ID_FROM_STEP_2>

UPI Payment:

VPA: test@paytm or any valid format

Card Payment:

Card Number: 4111111111111111

Expiry: 12/25

CVV: 123

Name: Any name

🏗️ Architecture

┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Dashboard  │────▶│  Spring API  │────▶│ PostgreSQL  │
│  (Port 3000)│     │  (Port 8000) │     │ (Port 5432) │
└─────────────┘     └──────────────┘     └─────────────┘
                            ▲
                            │
                    ┌───────┴────────┐
                    │    Checkout    │
                    │   (Port 3001)  │
                    └────────────────┘
📊 Database Schema
Merchants Table:

Test merchant auto-seeded on startup

UUID primary key, unique email and api_key

Orders Table:

Format: order_ + 16 alphanumeric chars

Minimum amount: 100 paise (₹1.00)

Amounts stored in paise

Payments Table:

Format: pay_ + 16 alphanumeric chars

Status flow: processing → success/failed

Supports UPI (with VPA validation) and Card (with Luhn validation)

🔌 API Endpoints
Public Endpoints:

GET /health - Health check

GET /api/v1/orders/{id}/public - Get order (no auth)

POST /api/v1/payments/public - Create payment (no auth)

GET /api/v1/payments/{id}/public - Get payment status (no auth)

Authenticated Endpoints:

POST /api/v1/orders - Create order

GET /api/v1/orders/{id} - Get order

POST /api/v1/payments - Create payment

GET /api/v1/payments/{id} - Get payment

🛠️ Tech Stack
Backend: Java Spring Boot, PostgreSQL

Frontend: React, React Router

Deployment: Docker, Docker Compose, Nginx

📝 Features
✅ Dockerized deployment (single command)
✅ RESTful API with authentication
✅ UPI payment with VPA validation
✅ Card payment with Luhn algorithm & network detection
✅ Payment polling (2-second intervals)
✅ Merchant dashboard with API credentials
✅ Transaction history
✅ Hosted checkout page
✅ Auto-seeded test merchant
✅ All required data-test-id attributes

🧹 Cleanup
Stop and remove all containers:

docker-compose down

Remove volumes (including database):

docker-compose down -v
📄 License
MIT

text

***

## 🎯 **FINAL TEST (2 minutes):**

### **Test these 3 flows:**

1. **Create Order → Pay with UPI → Success** ✅
2. **Dashboard Login → View Credentials** ✅
3. **Health Check** ✅

***

## 📤 **SUBMISSION:**

1. ✅ Push to GitHub
2. ✅ Include screenshots
3. ✅ Record 2-min video demo
4. ✅ Submit repository URL

```markdown
📚 **[View Complete API Documentation](./API.md)** 

🏗️ **[View System Architecture](./ARCHITECTURE.md)**

💾 **[View Database Schema](./DATABASE.md)**