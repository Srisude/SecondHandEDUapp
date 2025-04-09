"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"
import FilterPanel from "./FilterPanel"
import { getAllProducts } from "../services/productService"
import "./ProductList.css"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch products. Please try again later.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const applyFilters = () => {
    let filtered = [...products]

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= Number.parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number.parseFloat(filters.maxPrice))
    }

    if (filters.condition) {
      filtered = filtered.filter((product) => product.condition === filters.condition)
    }

    setFilteredProducts(filtered)
  }

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Available Products</h2>
        <Link to="/add-product" className="btn-primary add-product-btn">
          + Add New Product
        </Link>
      </div>

      <div className="product-list-content">
        <FilterPanel onFilterChange={handleFilterChange} />

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="no-products">No products found matching your criteria.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList

