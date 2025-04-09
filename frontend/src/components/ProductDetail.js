"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getProductById, deleteProduct } from "../services/productService"
import "./ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteProduct(id)
      navigate("/")
    } catch (err) {
      setError("Failed to delete product. Please try again later.")
    }
  }

  if (loading) return <div className="loading">Loading product details...</div>
  if (error) return <div className="error">{error}</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>

          <div className="product-detail-meta">
            <span className="product-detail-price">${product.price.toFixed(2)}</span>
            <span className="product-detail-condition">{product.condition}</span>
            <span className="product-detail-category">{product.category}</span>
          </div>

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-detail-seller">
            <h3>Seller Information</h3>
            <p>
              <strong>Name:</strong> {product.sellerName}
            </p>
            <p>
              <strong>Email:</strong> {product.sellerEmail}
            </p>
            <p>
              <strong>Phone:</strong> {product.sellerPhone}
            </p>
          </div>

          <div className="product-detail-actions">
            <Link to={`/edit-product/${product.id}`} className="btn-secondary">
              Edit Product
            </Link>
            <button className="btn-danger" onClick={() => setShowDeleteConfirm(true)}>
              Delete Product
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="delete-confirm-actions">
              <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

