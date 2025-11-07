# 🎨 Frontend Update - Django API Integration

## ✅ What's Been Done

### 1. **API Configuration Created** ✅
- ✅ `src/lib/api-config.ts` - API endpoints and configuration
- ✅ `src/lib/api-client.ts` - API client with authentication
- ✅ `src/services/auth.service.ts` - Authentication service

### 2. **Authentication System** ✅
- ✅ `src/context/auth-context.tsx` - Auth context provider
- ✅ `src/app/(auth)/login/page.tsx` - Professional login page
- ✅ `src/app/(auth)/register/page.tsx` - Professional registration page

### 3. **Features Implemented** ✅
- Token management (localStorage)
- Automatic token refresh
- Professional UI design
- Form validation
- Error handling
- Loading states

---

## 🚀 Next Steps to Complete

### 1. Update Header Component
Add login/logout buttons to header:

```tsx
// src/components/header.tsx - Add these imports
import { useAuth } from '@/context/auth-context';
import { User, LogOut } from 'lucide-react';

// In the component, add:
const { user, isAuthenticated, logout } = useAuth();

// In the header actions section, add:
{isAuthenticated ? (
  <div className="flex items-center gap-3">
    <Link href="/profile" className="flex items-center gap-2">
      <User className="h-5 w-5" />
      <span className="hidden md:inline">{user?.first_name}</span>
    </Link>
    <button 
      onClick={logout}
      className="flex items-center gap-2 text-red-600 hover:text-red-700"
    >
      <LogOut className="h-5 w-5" />
      <span className="hidden md:inline">Logout</span>
    </button>
  </div>
) : (
  <Link href="/login" className="btn btn-primary">
    Login
  </Link>
)}
```

### 2. Remove Old Cart System
Delete these files (no longer needed):
- ❌ `src/lib/indexeddb.ts`
- ❌ `src/lib/cart-cleanup.ts`
- ❌ `src/lib/force-cleanup-cart.ts`
- ❌ `src/hooks/use-cart.ts` (replace with API version)

### 3. Remove Old API Routes
Delete these Next.js API routes:
- ❌ `src/app/api/order/route.ts`
- ❌ `src/app/api/phone-lead/route.ts`
- ❌ `src/app/api/quote/route.ts`
- ❌ `src/app/api/whatsapp-lead/route.ts`

### 4. Create New Services
Create these service files:

```typescript
// src/services/products.service.ts
export async function getProducts() {
  return apiCall('/products/');
}

export async function getProduct(slug: string) {
  return apiCall(`/products/${slug}/`);
}

// src/services/cart.service.ts
export async function getCart() {
  return authenticatedApiCall('/cart/');
}

export async function addToCart(productId: number, quantity: number) {
  return authenticatedApiCall('/cart/add_item/', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId, quantity })
  });
}

// src/services/orders.service.ts
export async function getOrders() {
  return authenticatedApiCall('/orders/');
}

export async function checkout(data: any) {
  return authenticatedApiCall('/orders/checkout/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

### 5. Update Environment Variables
Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🎯 Test the Authentication

### 1. Start Django Backend
```bash
cd printing-api
python manage.py runserver
```

### 2. Start Next.js Frontend
```bash
cd printing-site
npm run dev
```

### 3. Test Login
1. Go to: http://localhost:3000/login
2. Use demo credentials:
   - Username: `testuser`
   - Password: `testpass123`

### 4. Test Registration
1. Go to: http://localhost:3000/register
2. Fill in the form
3. Create a new account

---

## 📦 What's Ready to Use

### API Client
```typescript
import { apiCall, authenticatedApiCall } from '@/lib/api-client';

// Public endpoint
const products = await apiCall('/products/');

// Authenticated endpoint
const cart = await authenticatedApiCall('/cart/');
```

### Auth Service
```typescript
import { login, register, logout } from '@/services/auth.service';

// Login
await login({ username: 'test', password: 'pass' });

// Register
await register({
  username: 'newuser',
  email: 'user@example.com',
  password: 'secure123',
  password_confirm: 'secure123',
  first_name: 'John',
  last_name: 'Doe'
});

// Logout
logout();
```

### Auth Context
```typescript
import { useAuth } from '@/context/auth-context';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user?.first_name}!</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

---

## 🎨 UI Features

### Login Page
- ✅ Beautiful gradient background
- ✅ Form validation
- ✅ Error messages
- ✅ Loading states
- ✅ Demo credentials shown
- ✅ Links to register
- ✅ Professional design

### Register Page
- ✅ Multi-step form
- ✅ Password confirmation
- ✅ Phone number (optional)
- ✅ Benefits list
- ✅ Loading states
- ✅ Error handling
- ✅ Links to login

---

## 🔧 Configuration Files Created

1. **API Config** (`src/lib/api-config.ts`)
   - Base URL configuration
   - All endpoint definitions
   - Token storage keys

2. **API Client** (`src/lib/api-client.ts`)
   - Generic API calls
   - Authenticated requests
   - Token refresh logic
   - Error handling
   - File upload support

3. **Auth Service** (`src/services/auth.service.ts`)
   - Login/Register functions
   - Profile management
   - Password change
   - Logout functionality

4. **Auth Context** (`src/context/auth-context.tsx`)
   - Global auth state
   - React hooks
   - Auto-load user
   - Refresh user data

---

## 📋 Integration Checklist

- [ ] Update header with auth buttons
- [ ] Remove old localStorage cart
- [ ] Delete old API routes
- [ ] Create product service
- [ ] Create cart service  
- [ ] Create orders service
- [ ] Update product pages to use API
- [ ] Update cart page to use API
- [ ] Update checkout to use API
- [ ] Test complete flow
- [ ] Add loading states
- [ ] Add error boundaries

---

## 🎉 What's Working Now

✅ User registration with Django API
✅ User login with JWT tokens
✅ Token storage and management
✅ Automatic token refresh
✅ Professional login/register pages
✅ Auth context throughout app
✅ Error handling
✅ Loading states
✅ Type-safe API calls

---

## 💡 Quick Commands

```bash
# Start backend
cd printing-api
python manage.py runserver

# Start frontend
cd printing-site
npm run dev

# Test login
# http://localhost:3000/login
# testuser / testpass123

# Test register
# http://localhost:3000/register
```

---

## 🔗 API Endpoints Available

- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh token
- `GET /api/auth/profile/` - Get profile
- `PUT /api/auth/profile/update/` - Update profile
- `GET /api/products/` - List products
- `GET /api/categories/` - List categories
- `GET /api/cart/` - Get cart
- `POST /api/cart/add_item/` - Add to cart
- `POST /api/orders/checkout/` - Checkout

---

**Status: Authentication system ready! ✅**
**Next: Complete the cleanup and connect all components to API**

