"use client"

import { useState, useEffect } from "react"
import { getCategories } from "../services/productService"
import "./FilterPanel.css"

const FilterPanel = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedFilters = { ...filters, [name]: value }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      condition: "",
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="filter-panel">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-section">
        <label className="filter-label">Category</label>
        <select name="category" value={filters.category} onChange={handleChange} className="filter-select">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
            className="filter-input"
            min="0"
          />
          <span className="price-separator">-</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
            className="filter-input"
            min="0"
          />
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Condition</label>
        <select name="condition" value={filters.condition} onChange={handleChange} className="filter-select">
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      <button onClick={clearFilters} className="clear-filters-btn">
        Clear Filters
      </button>
    </div>
  )
}

export default FilterPanel

