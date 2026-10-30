import { useCartStore } from '../store/cartStore'
import { Link } from 'react-router-dom'

const Cart = () => {
    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const clearCart = useCartStore((state) => state.clearCart)

    const subtotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    )

    const tax = subtotal * 0.05
    const discount = subtotal > 100 ? subtotal * 0.10 : 0
    const finalTotal = subtotal + tax - discount
    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your cart is empty</h2>
                <p>Add some products to continue shopping.</p>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Shopping Cart</h2>

            <div className="row">
                <div className="col-md-8">
                    {cart.map((item) => (
                        <div
                            className="card mb-3"
                            key={item.product.id}
                        >
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.title}
                                            className="img-fluid"
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <h5>{item.product.title}</h5>
                                        <p className="mb-1">
                                            Price: ${item.product.price.toFixed(2)}
                                        </p>
                                        <p className="mb-1">
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className="fw-bold">
                                            Total: ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="d-flex gap-2 mb-2">
                                            <button
                                                className="btn btn-outline-secondary"
                                                disabled={item.quantity <= 1}
                                                onClick={() => decreaseQuantity(item.product.id)}
                                            >
                                                -
                                            </button>

                                            <span className="align-self-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="btn btn-outline-secondary"
                                                disabled={item.quantity >= 5}
                                                onClick={() => increaseQuantity(item.product.id)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeFromCart(item.product.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        className="btn btn-outline-danger"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4>Order Summary</h4>
                            <hr />

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

                            <Link
                                to="/checkout"
                                className={`btn btn-primary w-100 mt-3 ${subtotal < 10 ? 'disabled' : ''
                                    }`}
                                aria-disabled={subtotal < 10}
                                onClick={(event) => {
                                    if (subtotal < 10) {
                                        event.preventDefault()
                                    }
                                }}
                            >
                                Checkout
                            </Link>

                            {finalTotal < 10 && (
                                <p className="text-danger mt-2 mb-0">
                                    Minimum checkout amount is $10.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart