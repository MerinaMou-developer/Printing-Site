# Django API Integration - Complete Guide

## 🎯 Overview

This Next.js frontend is now fully integrated with the Django REST API backend.

---

## 🔧 **Configuration**

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, update to your production URLs.

---

## 📦 **Services Available**

### Authentication Service
```typescript
import { login, register, logout, getProfile } from '@/services/auth.service';

// Login
const user = await login({ username: 'test', password: 'pass' });

// Register
const response = await register({
  username: 'newuser',
  email: 'user@example.com',
  password: 'secure123',
  password_confirm: 'secure123',
  first_name: 'John',
  last_name: 'Doe'
});

// Get profile
const profile = await getProfile();

// Logout
logout(); // Clears tokens and redirects
```

### Products Service
```typescript
import { getProducts, getProduct, getFeaturedProducts, searchProducts } from '@/services/products.service';

// Get all products
const { results, count } = await getProducts();

// Get single product
const product = await getProduct('product-slug');

// Get featured
const featured = await getFeaturedProducts();

// Search
const results = await searchProducts('stamps');
```

### Categories Service
```typescript
import { getCategories, getCategory, getCategoryProducts } from '@/services/categories.service';

// Get all categories
const categories = await getCategories();

// Get category products
const { results } = await getCategoryProducts('category-slug');
```

### Cart Service
```typescript
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '@/services/cart.service';

// Get cart (requires auth)
const cart = await getCart();

// Add to cart
const response = await addToCart(productId, quantity);

// Update quantity
await updateCartItem(itemId, newQuantity);

// Remove item
await removeCartItem(itemId);

// Clear cart
await clearCart();
```

### Orders Service
```typescript
import { getOrders, getOrder, checkout } from '@/services/orders.service';

// Get user's orders
const { results } = await getOrders();

// Get single order
const order = await getOrder(orderId);

// Checkout
const order = await checkout({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone: '+971501234567',
  address_line_1: '123 Main St',
  city: 'Dubai',
  country: 'UAE'
});
```

---

## 🪝 **React Hooks**

### useAuth Hook
```tsx
'use client';
import { useAuth } from '@/context/auth-context';

export default function MyComponent() {
  const { user, isAuthenticated, loading, login, register, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    return <button onClick={() => router.push('/login')}>Login</button>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.first_name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### useCartApi Hook
```tsx
'use client';
import { useCartApi } from '@/hooks/use-cart-api';

export default function CartButton({ productId }: { productId: number }) {
  const { cart, cartCount, addItem, loading } = useCartApi();
  
  const handleAdd = async () => {
    try {
      await addItem(productId, 1);
      alert('Added to cart!');
    } catch (error) {
      alert('Please login first');
    }
  };
  
  return (
    <button onClick={handleAdd} disabled={loading}>
      Add to Cart ({cartCount})
    </button>
  );
}
```

---

## 🎨 **New Pages**

### Login Page
- URL: `/login`
- File: `src/app/(auth)/login/page.tsx`
- Features: Beautiful UI, validation, error handling
- Demo: testuser / testpass123

### Register Page
- URL: `/register`
- File: `src/app/(auth)/register/page.tsx`
- Features: Complete form, password confirmation, benefits list

---

## 🔐 **Authentication Flow**

### 1. User Registers or Logs In
```
Frontend (/login) → Django API (/api/auth/login/)
                 ← JWT tokens
Frontend stores tokens in localStorage
```

### 2. Making Authenticated Requests
```
Frontend request → Include: Authorization: Bearer {token}
                → Django API validates token
                ← Protected data returned
```

### 3. Token Refresh
```
Access token expires → Frontend auto-refreshes
                     → Uses refresh token
                     → Gets new access token
                     → Retries original request
```

---

## 📝 **TypeScript Interfaces**

All services have full TypeScript support:

```typescript
// User
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone?: string;
  // ... more fields
}

// Product
interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  current_price: string;
  in_stock: boolean;
  // ... more fields
}

// Cart
interface Cart {
  id: number;
  items: CartItem[];
  total_items: number;
  subtotal: string;
}

// Order
interface Order {
  id: number;
  order_number: string;
  status: string;
  total: string;
  items: OrderItem[];
  // ... more fields
}
```

---

## 🔧 **How It Works**

### API Client
The `api-client.ts` handles:
- Token management
- Auto token refresh
- Error handling
- File uploads
- Type-safe requests

### Auth Context
The `auth-context.tsx` provides:
- Global auth state
- Login/register functions
- User data
- Logout function
- Auto-load user on mount

### Services
Each service (`*.service.ts`) provides:
- Type-safe API calls
- Business logic
- Error handling
- Clean interfaces

---

## 🎯 **Example: Update Products Page**

```tsx
// src/app/(marketing)/products/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/products.service';
import type { Product } from '@/services/products.service';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data.results);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="card">
          {product.main_image && (
            <img src={product.main_image} alt={product.name} />
          )}
          <h3>{product.name}</h3>
          <p>{product.short_description}</p>
          <p className="font-bold">AED {product.current_price}</p>
          {product.in_stock ? (
            <button className="btn btn-primary">Add to Cart</button>
          ) : (
            <button disabled>Out of Stock</button>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎊 **Success!**

Your frontend and backend are now:
- ✅ **Fully integrated**
- ✅ **Type-safe**
- ✅ **Professional**
- ✅ **Production-ready**
- ✅ **Well-documented**

---

**Test the integration:**
1. Start both servers
2. Go to http://localhost:3000/login
3. Login with: testuser / testpass123
4. See your name in header!

**Everything is working! 🎉**


