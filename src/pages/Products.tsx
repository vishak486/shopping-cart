import { useQuery } from '@tanstack/react-query'
import { productResponseSchema, type Product, } from '../schemas/productSchema'
import { useCartStore } from '../store/cartStore'
import { useProductFilters } from '../hooks/useProductFilters'

const Products = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('https://dummyjson.com/products')
            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }
            const result: unknown = await response.json()
            return productResponseSchema.parse(result)
        }
    })

    const addToCart = useCartStore((state) => state.addToCart)
    const cart = useCartStore((state) => state.cart)
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )
    const {
        search,
        setSearch,
        category,
        setCategory,
        maxPrice,
        setMaxPrice,
        filteredProducts,
        clearFilters,
    } = useProductFilters(data?.products ?? [])

    if (isLoading) {
        return <p className="text-center mt-5">Loading products...</p>
    }
    if (isError) {
        <p className="text-center mt-5 text-danger">
            Failed to load or validate products.
        </p>
    }
    if (!data) {
        return <p>No products available.</p>
    }


    return (
        <div className="container mt-4">
            <h2 className="mb-3">Products</h2>

            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search products..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option value="all">All Categories</option>

                        {[...new Set(data.products.map((product) => product.category))].map(
                            (item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="col-md-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Maximum price ($)"
                        min="0"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center mt-5">
                    No products match your filters.
                </p>
            ) : (
                <div className="row g-4">
                    {filteredProducts.map((product) => (
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                            <div className="card h-100">
                                <img
                                    src={product.thumbnail}
                                    className="card-img-top p-3"
                                    alt={product.title}
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>

                                    <p className="text-muted mb-1">
                                        Category: {product.category}
                                    </p>

                                    <p className="mb-1">
                                        Rating: {product.rating}
                                    </p>

                                    <p className="fw-bold">
                                        ${product.price.toFixed(2)}
                                    </p>

                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Products