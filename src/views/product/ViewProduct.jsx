import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaPenClip, FaTrash } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const ViewProduct = () => {
  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  function viewProducts() {
    // Fetch categories first
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/category`),
      axios.get(`${import.meta.env.VITE_API_URL}/subCategory`),
      axios.get(`${import.meta.env.VITE_API_URL}/product`),
    ]).then(([catRes, subRes, prodRes]) => {
      console.log('Categories:', catRes.data.category)
      console.log('Subcategories:', subRes.data.records)
      console.log('Products:', prodRes.data.records)
      
      setCategories(catRes.data.category || [])
      setSubCategories(subRes.data.records || [])
      setProducts(prodRes.data.records || [])
    }).catch((err) => console.error('Fetch error:', err))
  }

  useEffect(() => {
    viewProducts()
  }, [])

  function trash(id) {
    if (confirm('Are You Sure Want To Delete This Product?')) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/product/${id}`)
        .then(() => viewProducts())
        .catch((err) => console.log(err))
    }
  }

  function getCategoryName(catObj) {
    if (!catObj) return 'Unknown'
    // Handle both populated object and plain ID
    const id = catObj._id || catObj
    if (!id) return 'Unknown'
    const cat = categories.find((c) => c._id === id)
    return cat ? cat.name : 'Unknown'
  }

  function getSubcategoryName(subObj) {
    if (!subObj) return 'Unknown'
    // Handle both populated object and plain ID
    const id = subObj._id || subObj
    if (!id) return 'Unknown'
    const subcat = subCategories.find((c) => c._id === id)
    return subcat ? subcat.sub_cat : 'Unknown'
  }

  return (
    <div className="container mx-auto my-5 p-5 shadow">
      <h1>View Product</h1>
      <table className="table table-striped table-hover table-success">
        <thead className="table table-dark">
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map(
              ({ _id, category, subcategory, p_name, p_price, createdAt, updatedAt }, index) => (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{getCategoryName(category)}</td>
                  <td>{getSubcategoryName(subcategory)}</td>
                  <td>{p_name}</td>
                  <td>{p_price}</td>
                  <td>{createdAt ? new Date(createdAt).toDateString() : '-'}</td>
                  <td>{updatedAt ? new Date(updatedAt).toDateString() : '-'}</td>
                  <td>
                    <button onClick={() => trash(_id)} className="btn btn-danger mx-1">
                      <FaTrash />
                    </button>
                    <NavLink to={`/product/update/${_id}`} className="btn btn-primary">
                      <FaPenClip />
                    </NavLink>
                  </td>
                </tr>
              ),
            )
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ViewProduct
