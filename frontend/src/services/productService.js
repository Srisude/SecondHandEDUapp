import axios from "axios"

// API'nin Base URL'i — senin backend adresin
const API_URL = "http://localhost:5187/api"

// Axios instance oluştur
const apiClient = axios.create({
  baseURL: API_URL,
})

// 🔹 Tüm ürünleri getir
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/products")
    return response.data
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error)
    throw error
  }
}

// 🔹 Belirli bir ürünü ID'ye göre getir
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`ID ${id} olan ürünü çekerken hata oluştu:`, error)
    throw error
  }
}

// 🔹 Yeni ürün oluştur (resim destekli)
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("Ürün oluşturulurken hata oluştu:", error)
    throw error
  }
}

// 🔹 Ürünü güncelle (resim destekli)
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error(`ID ${id} olan ürünü güncellerken hata oluştu:`, error)
    throw error
  }
}

// 🔹 Ürünü sil
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`ID ${id} olan ürünü silerken hata oluştu:`, error)
    throw error
  }
}

// 🔹 Kategori listesini getir
export const getCategories = async () => {
  try {
    const response = await apiClient.get("/products/categories")
    return response.data
  } catch (error) {
    console.error("Kategoriler çekilirken hata oluştu:", error)
    return []
  }
}
