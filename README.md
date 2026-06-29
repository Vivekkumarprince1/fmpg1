# FMPG (Find My PG) 🏠

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Vivekkumarprince1/fmpg1)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/platform-Vercel%20%7C%20Serverless-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/license-ISC-orange.svg)](LICENSE)

**FMPG** is a modern, feature-rich web application designed to help users find and book paying guest (PG) accommodations, hostels, and rental rooms near various locations. Built on top of **Node.js, Express, MongoDB (Mongoose)**, and **EJS templates**, the platform integrates advanced administrative dashboards, owner portals, dynamic analytics, OTP-based security, Cloudinary asset storage, and Razorpay payment processing.

The project is fully optimized for serverless deployments on Vercel.

---

## 🔗 Repository
Official Repository Link: **[https://github.com/Vivekkumarprince1/fmpg1](https://github.com/Vivekkumarprince1/fmpg1)**

---

## 🛠️ Tech Stack & Key Technologies

- **Backend Framework**: [Express.js](https://expressjs.com/) (Node.js)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ORM](https://mongoosejs.com/)
- **Frontend / Templating**: [EJS](https://ejs.co/) (Embedded JavaScript) with custom CSS layouts
- **Authentication**: Passport.js with session-based persistence and local strategies
- **Asset Management**: Cloudinary API with Multer for secure image uploads and dynamic delivery
- **Payment Gateway**: Razorpay Integration (via `razorpay` and custom checkout structures)
- **Security & Optimization**:
  - `helmet` for secure HTTP headers
  - `compression` for Gzip response compression
  - `express-rate-limit` for DDoS prevention (Global, Auth, and OTP rate limiters)
  - CSRF/Origin validation on production environments
- **Email & OTP**: Nodemailer for transactional emails (OTP recovery, booking verification, and PDF invoice dispatch)
- **Document Generation**: PDFKit for automated booking invoice PDF generation
- **Logging**: Winston logger for application logging and Morgan for request logs

---

## 📁 Project Directory Structure

```text
fmpg1/
├── api/
│   └── index.js                    # Vercel serverless functions entrypoint
├── config/
│   ├── cloudinary.js               # Cloudinary CDN helper configurations
│   ├── indian-cities.json          # List of cities for property search filtering
│   ├── razorpay.js                 # Razorpay API client setup
│   ├── staticAssetMap.json         # Static assets mapping
│   └── users.js                    # User-related configurations
├── middleware/
│   ├── auth.js                     # Authentication & role protection (superadmin, admin, owner, user)
│   ├── cloudinaryUpload.js         # Multer-Cloudinary file upload configurations
│   └── flash.js                    # Flash message system helper
├── models/
│   ├── admin.js                    # Admin profile settings
│   ├── Analysis.js                 # Booking & system traffic analytics schema
│   ├── AuditLog.js                 # Admin/Owner action logger
│   ├── Booking.js                  # Booking information schema
│   ├── Contact.js                  # Contact message schema
│   ├── old admin.js                # Legacy admin structure
│   ├── Otp.js                      # OTP storage for verification & reset
│   ├── owner.js                    # Property owner detailed profiles
│   ├── Payment.js                  # Payment tracking & status records
│   ├── Property.js                 # PG/Hostel properties schema
│   ├── propertyAddress.js          # Sub-addresses for search filtering
│   ├── Room.js                     # Rooms under properties schema
│   └── users.js                    # Core user account schema (Passport-local integrated)
├── mongodb/
│   └── db.js                       # Mongoose database connection client
├── public/                         # Static files (CSS, JS, images, icons)
├── routes/
│   ├── adminroutes.js              # Admin portal CRUD operations & user/booking control
│   ├── analyticsRoutes.js          # Analytics aggregation and endpoints
│   ├── authroutes.js               # Sign up, Login, Log out, OTP validation
│   ├── bookingroutes.js            # Customer and API booking processes
│   ├── contactroutes.js            # Message submission
│   ├── foodroutes.js               # Food listing management (if any)
│   ├── forgot.js                   # OTP verification & Password resetting
│   ├── index.js                    # Main landing page, searches, policies, and details
│   ├── ownerroutes.js              # Owner dashboard, booking management, invoices
│   ├── payment.js                  # Razorpay checkout & webhook handlers
│   ├── propertyroutes.js           # Property browsing and owner management
│   ├── roomdb.js                   # Room details and settings
│   └── settingsRautes.js           # Account profile & settings management
├── scripts/
│   └── migrateAssetsToCloudinary.js # Data migrations from local storage to Cloudinary
├── utils/
│   └── logger.js                   # Winston-based logging system
├── views/                          # EJS templates (Pages, layouts, partials)
├── app.js                          # Core Express server configuration
├── vercel.json                     # Vercel serverless configurations
└── package.json                    # Node dependencies and scripts
```

---

## ⚡ Installation & Local Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- MongoDB running locally or a MongoDB Atlas URI
- Cloudinary developer account (for image uploads)
- Razorpay account (for payment handling)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Vivekkumarprince1/fmpg1.git
   cd fmpg1
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory by copying the example template:
   ```bash
   cp .env.example .env
   ```
   Fill in your actual credentials:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_mongodb_connection_uri
   SESSION_SECRET=a_strong_session_secret
   JWT_SECRET=a_strong_jwt_secret

   # Razorpay credentials
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # Cloudinary credentials
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Email service (OTP and Invoices)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   EMAIL_FROM=no-reply@fmpg.com
   ```

4. **Run Database Migrations / Asset Uploads (Optional)**
   If you have local assets that you want to migrate to Cloudinary:
   ```bash
   npm run migrate:cloudinary-assets
   ```

5. **Start the Development Server**
   To start the app using `nodemon` (auto-reloading):
   ```bash
   npm run dev
   ```
   Or run the server normally:
   ```bash
   npm start
   ```

6. **Access the Web App**
   Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## 💻 Routes & API Endpoint Reference

### Public / General Routes (`routes/index.js`, `routes/contactroutes.js`)
* `GET /` - Main landing page (Location selector, hero search)
* `GET /about` - About us details
* `GET /service` - Services offered by FMPG
* `GET /destination` - Destination view
* `GET /referandearn` - Reference program details
* `GET /FAQs` - Frequently asked questions
* `GET /TermsAndConditions` & `GET /TermsofService` - Terms pages
* `GET /privacypolicy` - Privacy statement
* `POST /contact` - Submit inquiries via contact form
* `GET /readmore` - Additional informational logs

### Authentication & OTP (`routes/authroutes.js`, `routes/forgot.js`)
* `GET /signup` / `POST /signup` - Account registration (Supports standard users and owner applications)
* `GET /login` / `POST /login` - User sign-in
* `GET /logout` - Terminates user sessions
* `GET /verify-otp` / `POST /verify-otp` - Validates OTP token sent to email
* `GET /forgot` / `POST /forgot` - Form to trigger OTP request for forgotten password recovery

### Profile & Settings (`routes/settingsRautes.js`)
* `GET /profile` - Renders customer/owner profile info
* `GET /settings` / `POST /settings` - Modifies password, user settings, and profile info

### Properties & Rooms (`routes/propertyroutes.js`, `routes/roomdb.js`)
* `GET /Property` - View all active properties with filters (Location, Sharing Type, Pricing, etc.)
* `GET /Property/:id` - Detailed preview of a single property (showing room options, address details)
* `POST /Property/add` - Inserts a new PG property (requires owner/admin role)
* `PUT /Property/edit/:id` - Updates details of property
* `DELETE /Property/delete/:id` - Deletes property record
* `GET /Room` - List of rooms
* `POST /Room/add` / `POST /Room/edit/:id` - Creates/edits rooms associated with a PG property

### Bookings & API Checkout (`routes/bookingroutes.js`, `routes/payment.js`)
* `GET /api/bookings` - Retrieves customer's bookings
* `POST /api/bookings/add` - Initiates room booking request
* `POST /api/bookings/edit/:id` - Updates booking details
* `POST /api/bookings/delete/:id` - Cancels or deletes booking records

### Admin Dashboard (`routes/adminroutes.js`, `routes/analyticsRoutes.js`)
* `GET /admin` - Admin home panel
* `GET /admin/users` - Manage registered users (Add/Edit/Delete)
* `GET /admin/properties` - Manage all properties
* `GET /admin/bookings` - Main view of all bookings (Accept/Reject/Pending states)
* `GET /admin/newOwnerrequest` - Review and approve PG owners request list
* `GET /admin/auditLogs` - History log of admin operations
* `GET /admin/messages` - Contact forms submissions viewer
* `GET /admin/analytics` - Financial & booking visual analysis charts (leveraging Chart.js)

### Owner Portal (`routes/ownerroutes.js`)
* `GET /owner` - Dashboard specific to logged-in owner's properties
* `POST /owner/bookings/:id/accept` - Confirm booking (Generates and emails PDF invoice to customer)
* `POST /owner/bookings/:id/decline` - Rejects booking and releases room availability

---

## 🗄️ Database Schema Structures (Mongoose Models)

1. **User (`models/users.js`)**
   - Credentials, contact info (email, mobile), profile roles: `user`, `admin`, `superadmin`, `owner`. Integrates Passport authentication plugins.
2. **Property (`models/Property.js`)**
   - Property name, description, category type, primary images, amenities list, reference to the owner profile, array of rooms.
3. **Room (`models/Room.js`)**
   - Room number, cost, sharing type, vacancy limit, active booking array, availability state.
4. **Booking (`models/Booking.js`)**
   - Refers to User, Room, and Property. Captures check-in/check-out dates, status (`pending`, `confirmed`, `canceled`), payment reference details, and billing name.
5. **Otp (`models/Otp.js`)**
   - Holds email matching OTP codes with an index expiry for clean database cleanup.
6. **Payment (`models/Payment.js`)**
   - References order ID, receipt number, paid amount, status, signature, and payment gateway references.
7. **AuditLog (`models/AuditLog.js`)**
   - Records administrative edits, timestamps, action kinds, and editor ID.
8. **Analysis (`models/Analysis.js`)**
   - Aggregates metrics of visits, requests, and occupancy.

---

## 🚀 Serverless Deployment on Vercel

The application is fully configured for deployment as a Vercel Serverless Function via `vercel.json` and the serverless wrapper `api/index.js`.

### Steps to Deploy

1. **Push your code to your GitHub Repository**
   ```bash
   git add .
   git commit -m "Configure README and prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Import the repository in [Vercel Dashboard](https://vercel.com).
   - Choose **Node.js** as the build template.

3. **Configure Environment Variables**
   Under **Project Settings → Environment Variables**, add the following keys:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = *Your MongoDB Atlas connection URI*
   - `SESSION_SECRET` = *A strong random secret*
   - `JWT_SECRET` = *A strong random secret*
   - `EMAIL_SERVICE` = `gmail`
   - `EMAIL_USER` = *Gmail account address*
   - `EMAIL_PASS` = *App Password*
   - `EMAIL_FROM` = *Gmail sender address*
   - `RAZORPAY_KEY_ID` = *Razorpay public API key*
   - `RAZORPAY_KEY_SECRET` = *Razorpay secret API key*
   - `CLOUDINARY_CLOUD_NAME` = *Cloudinary cloud name*
   - `CLOUDINARY_API_KEY` = *Cloudinary API key*
   - `CLOUDINARY_API_SECRET` = *Cloudinary API secret*
   - `ALLOWED_ORIGINS` = `https://your-domain.vercel.app` *(Optional: Comma-separated list of trusted origins)*

4. **Deploy**
   - Click **Deploy**. Vercel will build the serverless functions and serve your Express application.

---

## 📝 License
This project is licensed under the **ISC License**.