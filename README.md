# ProjecTra
Student Project Management and Discovery Platform

## 🔐 Authentication
ProjecTra now features **JWT-based authentication** for secure, persistent sessions:
- ✅ Token-based login/logout
- ✅ 7-day session persistence 
- ✅ Protected API routes
- ✅ Automatic token validation
- ✅ Secure user authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v8.0+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahabubranasaikat/ProjecTra
   cd ProjecTra
   ```

2. **Set up database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment** (optional)
   ```bash
   # Create .env file in backend directory
   JWT_SECRET=your-super-secret-key-here
   JWT_EXPIRES_IN=7d
   PORT=5500
   ```

5. **Start the application**
   ```bash
   # From project root
   ./start-servers.sh
   ```

6. **Access the application**
   - Login page: http://localhost:5500/auth/login.html
   - Home page: http://localhost:5500/home.html
   - API: http://localhost:5500/api

### 🧪 Testing

Run comprehensive tests to verify JWT authentication:

```bash
# Test JWT authentication
node test-jwt-auth.js

# Test full system functionality  
node test-full-system.js
```

## 📚 Documentation

- **[JWT Implementation Guide](JWT_IMPLEMENTATION.md)** - Complete authentication documentation
- **[API Documentation](backend/API_DOCUMENTATION.md)** - Backend API reference
- **[Server Setup Guide](SERVER_GUIDE.md)** - Server configuration and deployment