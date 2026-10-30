
# Shopping Cart Application

A responsive shopping cart application built with React and TypeScript. It allows users to browse products, search and filter items, manage cart quantities, and complete a multi-step checkout process.

## Features

- **Product Listing:** Fetch and display products from the DummyJSON API.
- **Search and Filters:** Search by product title and filter by category and price.
- **Cart Management:** Add and remove products, update quantities from 1 to 5, and clear the cart.
- **Persistent Cart:** Save cart data in localStorage so it remains available after refreshing the page.
- **Price Calculation:** Automatically calculate subtotal, 5% tax, and a 10% discount when the subtotal exceeds $100.
- **Checkout Validation:** Validate shipping details using Zod and display field-level error messages.
- **Multi-Step Checkout:** Cart Review → Shipping Details → Payment Summary.
- **Order Confirmation:** Display a success message and clear the cart after placing an order.
- **Responsive Design:** Bootstrap-based layout for different screen sizes.
- **Loading and Error States:** Handle API loading and error conditions.

## Technologies Used

- React 19
- TypeScript
- Vite
- Bootstrap
- Zustand
- TanStack Query
- Zod
- React Router
- pnpm
- DummyJSON Products API

## Getting Started

### Prerequisites

Make sure you have Node.js and pnpm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd shopping-cart
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the local URL shown in your terminal.

## API

Product data is fetched from the DummyJSON Products API:

https://dummyjson.com/products

TanStack Query handles data fetching and caching, while Zod validates the API response.

## Business Rules

- Product quantity must remain between 1 and 5.
- Tax is calculated at 5% of the subtotal.
- A 10% discount applies when the subtotal exceeds $100.
- Checkout is disabled when the subtotal is below $10.
- Shipping details must pass validation before proceeding.
- Orders are simulated; no real payment gateway is integrated.

## State Management

- **TanStack Query:** Fetching, caching, and managing API data.
- **Zustand:** Managing cart state and persisting it in localStorage.
- **React State:** Managing checkout steps, shipping details, and validation errors.
- **Zod:** Validating API responses and shipping information.

## Scripts

- `pnpm dev` — Start the development server.
- `pnpm build` — Build the application for production.
- `pnpm preview` — Preview the production build.

## Author

Vishak


