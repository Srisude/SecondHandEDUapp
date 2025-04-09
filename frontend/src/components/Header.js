import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>UniMarket</h1>
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-product" className="nav-link">
                Sell Item
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

