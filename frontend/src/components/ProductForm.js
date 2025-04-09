"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProductById, createProduct, updateProduct, getCategories } from "../services/productService"
import "./ProductForm.css"

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    sellerId: "1",
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
  })

  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error("Kategori verisi alınamadı:", err)
      }
    }

    fetchCategories()

    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          setLoading(true)
          const data = await getProductById(id)
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            condition: data.condition,
            sellerId: data.sellerId || "1",
            sellerName: data.sellerName || "",
            sellerEmail: data.sellerEmail || "",
            sellerPhone: data.sellerPhone || "",
          })
          setLoading(false)
        } catch (err) {
          setError("Ürün bilgileri alınamadı.")
          setLoading(false)
        }
      }

      fetchProduct()
    }
  }, [id, isEditMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      const payload = new FormData()
      for (const key in formData) {
        payload.append(key, formData[key])
      }
      if (image) {
        payload.append("image", image)
      }

      if (isEditMode) {
        await updateProduct(id, payload)
        setSuccess("Ürün güncellendi!")
      } else {
        const newProduct = await createProduct(payload)
        setSuccess("Ürün başarıyla oluşturuldu!")
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          condition: "",
          sellerId: "1",
          sellerName: "",
          sellerEmail: "",
          sellerPhone: "",
        })
        setImage(null)

        setTimeout(() => {
          navigate(`/product/${newProduct.productId || newProduct.id}`)
        }, 1500)
      }
    } catch (err) {
      console.error(err)
      setError("Ürün kaydedilirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">{isEditMode ? "Edit Product" : "Add New Product"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
        <div className="form-section">
          <h3 className="section-title">Product Information</h3>

          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required className="form-control" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price ($) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" required className="form-control" />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="form-control">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Condition *</label>
              <select name="condition" value={formData.condition} onChange={handleChange} required className="form-control">
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Image *</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Seller Information</h3>

          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input type="email" name="sellerEmail" value={formData.sellerEmail} onChange={handleChange} required className="form-control" />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="sellerPhone" value={formData.sellerPhone} onChange={handleChange} className="form-control" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(isEditMode ? `/product/${id}` : "/")} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
