import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Flip, toast } from 'react-toastify'

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [product, setProduct] = useState([])
  const { id } = useParams()
  const redirect = useNavigate()
  const [createdAt, setCreatedAt] = useState(null) // State to hold createdAt date
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/subcategory`)
      .then((res) => setSubcategories(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/product/${id}`)
        .then((res) => {
          reset({
            categoryId: res.data.categoryId,
            subcategoryId: res.data.subcategoryId,
            p_name: res.data.p_name,
            p_price: res.data.p_price,
          })
          setCreatedAt(res.data.createdAt)
          setSelectedCategoryId(res.data.selectedCategoryId)
        })
        .catch((err) => console.log(err))
    }
  }, [id, reset])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  function products(data) {
    if (!id) {
      const isDuplicate = product.find((cat) => {
        return cat.p_name.toLowerCase() == data.p_name.toLowerCase()
      })

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
      // ✅ Update Mode
      axios
        .get(`${import.meta.env.VITE_API_URL}/product/${id}`) // pehle purana record lelo
        .then(() => {
          axios
            .put(`${import.meta.env.VITE_API_URL}/product/${id}`, {
              ...data,
              createdAt: createdAt,
              updatedAt: new Date(),
            })
            // console.log(data)
            .then(() => {
              toast.success('✅ Product Updated!', { autoClose: 2000, transition: Flip })
              redirect('/product/about')
            })
        })
        .catch((err) => console.log(err))
    } else {
      // ✅ Add Mode
      axios
        .post(`${import.meta.env.VITE_API_URL}/product`, {
          ...data,
          createdAt: new Date(), // 👈 new record ke liye createdAt add
        })
        .then(() => {
          toast.success('✅ Product Added!', { autoClose: 2000, transition: Flip })
          reset()
          redirect('/product/about')
        })
        .catch((err) => console.log(err))
    }
  }

  const filteredSubcategories = subcategories.filter((sub) => sub.categoryId === selectedCategoryId)

  return (
    <>
      <div className="container mx-auto my-5 p-5 shadow">
        <h1>{id ? 'Update Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit(products)}>
          <div className="mt-3">
            <select
              {...register('categoryId', {
                required: {
                  value: true,
                  message: 'Select Category Name',
                },
              })}
              className="form-select"
              onChange={(e)=>setSelectedCategoryId(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors?.categoryId?.message}</p>
          </div>
          {selectedCategoryId && (
            <div className="mt-3">
              <select
                {...register('subcategoryId', {
                  required: {
                    value: true,
                    message: 'Select Subcategory Name',
                  },
                })}
                className="form-select"
              >
                <option value="">-- Select Subcategory --</option>
                {filteredSubcategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.subcategory}
                  </option>
                ))}
              </select>
              <p className="text-danger">{errors?.subcategoryId?.message}</p>
            </div>
          )}
          <div className="mt-3">
            <input
              type="text"
              {...register('p_name', {
                required: {
                  value: true,
                  message: 'Enter Product Name',
                },
                minLength: {
                  value: 2,
                  message: 'Enter Minimum 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Enter Maximum 50 characters',
                },
              })}
              className="form-control"
              placeholder="Enter Product Name"
            />
            <p className="text-danger">{errors?.p_name?.message}</p>
          </div>
          <div className="mt-3">
            <input
              type="number"
              {...register('p_price', {
                register: {
                  value: true,
                  message: 'Enter Product Price',
                },
              })}
              className="form-control"
              placeholder="Enter Product Price"
            />
            <p className="text-danger">{errors?.p_price?.message}</p>
          </div>
          <div className="mt-3">
            <button className={`btn ${id ? 'btn-outline-warning' : 'btn-outline-success'}`}>
              {id ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProduct
