import { Link } from "react-router-dom"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `http://localhost:5187/${product.imageUrl.replace(/^\/+/, "")}`
    : "/placeholder.svg"

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={imageSrc}
            alt={product.name}
            className="product-image"
            onError={(e) => (e.target.src = "/placeholder.svg")}
          />
          <div className="product-condition">{product.condition}</div>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-category">{product.category}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
