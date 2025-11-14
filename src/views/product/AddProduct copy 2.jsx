import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Flip, toast } from "react-toastify"

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [product, setProduct] = useState([])
  const { id } = useParams()
  const redirect = useNavigate()
  const [createdAt, setCreatedAt] = useState(null)

  // 👀 watch categoryId
  const selectedCategoryId = watch("categoryId")

  // fetch categories
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/category`)
      .then((res) => setCategories(res.data))
  }, [])

  // fetch subcategories
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/subcategory`)
      .then((res) => setSubcategories(res.data))
  }, [])

  // fetch product for update
  useEffect(() => {
    if (id) {
      axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)
        .then((res) => {
          reset({
            categoryId: res.data.categoryId,
            subcategoryId: res.data.subcategoryId,
            p_name: res.data.p_name,
            p_price: res.data.p_price,
          })
          setCreatedAt(res.data.createdAt)
        })
    }
  }, [id, reset])

  // fetch all products
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/product`)
      .then((res) => setProduct(res.data))
  }, [])

  // submit handler
  function products(data) {
    if (!id) {
      const isDuplicate = product.find(
        (cat) => cat.p_name.toLowerCase() === data.p_name.toLowerCase()
      )
      if (isDuplicate) {
        toast.error("🦄 Its already exist!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Flip,
        })
        return
      }
    }

    if (id) {
      axios.put(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        ...data,
        createdAt: createdAt,
        updatedAt: new Date(),
      })
        .then(() => {
          toast.success("✅ Product Updated!", { autoClose: 2000, transition: Flip })
          redirect("/product/about")
        })
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/product`, {
        ...data,
        createdAt: new Date(),
      })
        .then(() => {
          toast.success("✅ Product Added!", { autoClose: 2000, transition: Flip })
          reset()
          redirect("/product/about")
        })
    }
  }

  // filter subcategories by category
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId === selectedCategoryId
  )

  return (
    <div className="container mx-auto my-5 p-5 shadow">
      <h1>{id ? "Update Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit(products)}>
        {/* Category */}
        <div className="mt-3">
          <select
            {...register("categoryId", {
              required: "Select Category Name",
            })}
            className="form-select"
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

        {/* Subcategory - only show if category selected */}
        {selectedCategoryId && (
          <div className="mt-3">
            <select
              {...register("subcategoryId", {
                required: "Select Subcategory Name",
              })}
              className="form-select"
            >
              <option value="">-- Select Subcategory --</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subcategory}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors?.subcategoryId?.message}</p>
          </div>
        )}

        {/* Product Name */}
        <div className="mt-3">
          <input
            type="text"
            {...register("p_name", {
              required: "Enter Product Name",
              minLength: { value: 2, message: "Minimum 2 characters" },
              maxLength: { value: 50, message: "Maximum 50 characters" },
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
            {...register("p_price", {
              required: "Enter Product Price",
            })}
            className="form-control"
            placeholder="Enter Product Price"
          />
          <p className="text-danger">{errors?.p_price?.message}</p>
        </div>

        <div className="mt-3">
          <button className={`btn ${id ? "btn-outline-warning" : "btn-outline-success"}`}>
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
