import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Flip, toast } from 'react-toastify'

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [product, setProduct] = useState([])
  const { id } = useParams()
  const redirect = useNavigate()
  const [createdAt, setCreatedAt] = useState(null)
  const selectedCategory = watch("category")

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category`)
      .then((res) => setCategories(res.data.category))
      .catch((err) => console.log(err))
  }, [])

  // Fetch subcategories
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/subCategory`)
      .then((res) => setSubcategories(res.data.records))
      .catch((err) => console.log(err))
  }, [])

  // Fetch products for editing
  useEffect(() => {
    if (id) {
      axios.get(`${import.meta.env.VITE_API_URL}/product`)
        .then((res) => {
          const product = res.data.records.find(p => p._id === id)
          if (product) {
            reset({
              category: product.category._id,
              subcategory: product.subcategory._id,
              p_name: product.p_name,
              p_price: product.p_price
            })
            setCreatedAt(product.createdAt)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id, reset])

  // Fetch all products
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/product`)
      .then((res) => setProduct(res.data.records))
      .catch((err) => console.log(err))
  }, [])

  function products(data) {
    // Duplicate check (only for new products)
    if (!id) {
      const isDuplicate = product.find(
        (cat) => cat.p_name.toLowerCase() === data.p_name.toLowerCase()
      )
      if (isDuplicate) {
        toast.error('🦄 Its already exist!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
          transition: Flip,
        })
        return
      }
    }

    if (id) {
      axios.put(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        ...data,
        createdAt,
        updatedAt: new Date(),
      })
      .then(() => {
        toast.success('✅ Product Updated!', { autoClose: 2000, transition: Flip })
        setTimeout(() => redirect('/product/about'), 2000)
      })
      .catch((err) => console.log(err))
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/product`, {
        ...data,
        createdAt: new Date(),
      })
      .then(() => {
        toast.success('✅ Product Added!', { autoClose: 2000, transition: Flip })
        reset()
        redirect('/product/about')
      })
      .catch((err) => console.log(err))
    }
  }

  // Filter subcategories based on selected category
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.cat_id._id === selectedCategory
  )

  return (
    <div className="container mx-auto my-5 p-5 shadow">
      <h1>{id ? "Update Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit(products)}>
        {/* Category Dropdown */}
        <div className="mt-4">
          <select
            {...register('category', {
              required: {
                value: true,
                message: 'Please Select Category',
              },
            })}
            className="form-control"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className="text-danger">{errors?.category?.message}</p>
        </div>

        {/* Subcategory Dropdown */}
        {selectedCategory && (
          <div className="mt-4">
            <select
              {...register('subcategory', { required: { value: true, message: "Select Subcategory Name" } })}
              className="form-select"
            >
              <option value="">-- Select Subcategory --</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.sub_cat}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors?.subcategory?.message}</p>
          </div>
        )}

        {/* Product Name */}
        <div className="mt-3">
          <input
            type="text"
            {...register('p_name', {
              required: { value: true, message: "Enter Product Name" },
              minLength: { value: 2, message: "Enter Minimum 2 characters" },
              maxLength: { value: 50, message: "Enter Maximum 50 characters" },
            })}
            className="form-control"
            placeholder="Enter Product Name"
          />
          <p className="text-danger">{errors?.p_name?.message}</p>
        </div>

        {/* Product Price */}
        <div className="mt-3">
          <input
            type="number"
            {...register('p_price', { required: { value: true, message: "Enter Product Price" } })}
            className="form-control"
            placeholder="Enter Product Price"
          />
          <p className="text-danger">{errors?.p_price?.message}</p>
        </div>

        <div className="mt-3">
          <button type="submit" className={`btn ${id ? 'btn-outline-warning' : 'btn-outline-success'}`}>
            {id ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
