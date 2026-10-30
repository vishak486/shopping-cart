
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import {
  shippingSchema,
  type ShippingDetails,
} from '../schemas/shippingSchema'

type ShippingErrors = {
  fullName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
}

function Checkout() {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const [errors, setErrors] = useState<ShippingErrors>({})

  // Calculate the order total
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const tax = subtotal * 0.05
  const discount = subtotal > 100 ? subtotal * 0.10 : 0
  const finalTotal = subtotal + tax - discount

  // Validate shipping details
  const handleShippingSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const result = shippingSchema.safeParse(shipping)

    if (!result.success) {
      const issues = result.error.issues

      setErrors({
        fullName: issues.find((issue) => issue.path[0] === 'fullName')?.message,
        email: issues.find((issue) => issue.path[0] === 'email')?.message,
        phone: issues.find((issue) => issue.path[0] === 'phone')?.message,
        address: issues.find((issue) => issue.path[0] === 'address')?.message,
        city: issues.find((issue) => issue.path[0] === 'city')?.message,
        postalCode: issues.find((issue) => issue.path[0] === 'postalCode')?.message,
      })

      return
    }

    setErrors({})
    setStep(3)
  }

  // Place the demo order
  const handlePlaceOrder = () => {
    clearCart()
    setOrderPlaced(true)
  }

  // Success message
  if (orderPlaced) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-success">Order placed successfully!</h2>
        <p>Thank you for your order.</p>
        <p>No payment was collected. This is a demo checkout.</p>

        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  // Empty cart message
  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your cart is empty</h2>
        <p>Add products before starting checkout.</p>

        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Checkout</h2>

      <p>
        Step {step} of 3:
        {' '}
        {step === 1
          ? 'Cart Review'
          : step === 2
            ? 'Shipping'
            : 'Payment Summary'}
      </p>

      {/* STEP 1: CART REVIEW */}
      {step === 1 && (
        <>
          <h4>Cart Review</h4>

          {cart.map((item) => (
            <div className="card mb-3" key={item.product.id}>
              <div className="card-body d-flex align-items-center gap-3">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width="80"
                  height="80"
                  style={{ objectFit: 'contain' }}
                />

                <div className="flex-grow-1">
                  <h5>{item.product.title}</h5>
                  <p className="mb-1">Quantity: {item.quantity}</p>
                  <p className="mb-0">
                    Price: ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <strong>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}

          <PriceSummary
            subtotal={subtotal}
            tax={tax}
            discount={discount}
            finalTotal={finalTotal}
          />

          {subtotal < 10 && (
            <p className="text-danger mt-3">
              Minimum checkout subtotal is $10.
            </p>
          )}

          <div className="d-flex gap-2 mt-3">
            <Link to="/cart" className="btn btn-outline-secondary">
              Back to Cart
            </Link>

            <button
              className="btn btn-primary"
              disabled={subtotal < 10}
              onClick={() => setStep(2)}
            >
              Continue to Shipping
            </button>
          </div>
        </>
      )}

      {/* STEP 2: SHIPPING */}
      {step === 2 && (
        <>
          <h4>Shipping Details</h4>

          <form onSubmit={handleShippingSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  value={shipping.fullName}
                  onChange={(event) =>
                    setShipping({ ...shipping, fullName: event.target.value })
                  }
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={shipping.email}
                  onChange={(event) =>
                    setShipping({ ...shipping, email: event.target.value })
                  }
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={shipping.phone}
                  onChange={(event) =>
                    setShipping({ ...shipping, phone: event.target.value })
                  }
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  value={shipping.address}
                  onChange={(event) =>
                    setShipping({ ...shipping, address: event.target.value })
                  }
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  value={shipping.city}
                  onChange={(event) =>
                    setShipping({ ...shipping, city: event.target.value })
                  }
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Postal Code</label>
                <input
                  className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                  value={shipping.postalCode}
                  onChange={(event) =>
                    setShipping({ ...shipping, postalCode: event.target.value })
                  }
                />
                {errors.postalCode && (
                  <div className="invalid-feedback">{errors.postalCode}</div>
                )}
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </div>
          </form>
        </>
      )}

      {/* STEP 3: PAYMENT SUMMARY */}
      {step === 3 && (
        <>
          <h4>Payment Summary</h4>

          <div className="card mt-3">
            <div className="card-body">
              <h5>Shipping Details</h5>
              <p className="mb-1">{shipping.fullName}</p>
              <p className="mb-1">{shipping.email}</p>
              <p className="mb-1">{shipping.phone}</p>
              <p className="mb-1">{shipping.address}</p>
              <p>{shipping.city}, {shipping.postalCode}</p>
            </div>
          </div>

          <h5 className="mt-4">Order Items</h5>

          {cart.map((item) => (
            <div
              key={item.product.id}
              className="d-flex justify-content-between border-bottom py-2 gap-3"
            >
              <span>
                {item.product.title} × {item.quantity}
              </span>
              <span>
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <PriceSummary
            subtotal={subtotal}
            tax={tax}
            discount={discount}
            finalTotal={finalTotal}
          />

          <div className="d-flex gap-2 mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setStep(2)}
            >
              Back to Shipping
            </button>

            <button
              className="btn btn-success"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

type PriceSummaryProps = {
  subtotal: number
  tax: number
  discount: number
  finalTotal: number
}

function PriceSummary({
  subtotal,
  tax,
  discount,
  finalTotal,
}: PriceSummaryProps) {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5>Order Summary</h5>

        <p className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>

        <p className="d-flex justify-content-between">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </p>

        <p className="d-flex justify-content-between">
          <span>Discount (10%)</span>
          <span>-${discount.toFixed(2)}</span>
        </p>

        <hr />

        <h5 className="d-flex justify-content-between">
          <span>Final Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </h5>
      </div>
    </div>
  )
}

export default Checkout
