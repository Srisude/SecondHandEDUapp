import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import ProductDetail from "./components/ProductDetail"
import ProductForm from "./components/ProductForm"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Üst menü */}
        <Header />

        {/* Ana içerik alanı */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product/:id" element={<ProductForm />} />
          </Routes>
        </main>

        {/* Alt bilgi */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
