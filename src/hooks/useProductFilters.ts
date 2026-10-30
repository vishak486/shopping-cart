
import { useMemo, useState } from 'react'
import type { Product } from '../schemas/productSchema'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        category === 'all' || product.category === category

      const matchesPrice =
        maxPrice === '' || product.price <= Number(maxPrice)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, search, category, maxPrice])

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setMaxPrice('')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    clearFilters,
  }
}
