import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer, Flip } from 'react-toastify'

const AddSubCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const redirect = useNavigate()
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [createdAt, setCreatedAt] = useState(null) // State to hold createdAt date
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category`)
      .then((res) => setCategories(res.data.category))
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/subcategory/${id}`)
        .then((res) => {
          reset({
            cat_id: res.data.subcat.cat_id,
            sub_cat: res.data.subcat.sub_cat,
          })
          setCreatedAt(res.data.subcat.createdAt)
        })
        .catch((err) => console.log(err))
    }
  }, [id, reset])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/subcategory`)
      .then((res) => {
        setSubcategories(res.data.records)
      })
      .catch((err) => console.log(err))
  }, [])

  function subcat(data) {
    if (!id) {
      const isDuplicate = subcategories.find((cat) => {
        return cat.sub_cat.toLowerCase() == data.sub_cat.toLowerCase()
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
      const updateData = {
        cat_id: data.cat_id,
        sub_cat: data.sub_cat
      }
      axios
        .put(`${import.meta.env.VITE_API_URL}/subcategory/${id}`, updateData)
        .then(() => {
          // toast.success('✅ SubCategory Updated!', { autoClose: 2000, transition: Flip })
          redirect('/subcategory/about')
        })
        .catch((err) => console.log(err))
    } else {
      // ✅ Add Mode
      const addData = {
        cat_id: data.cat_id,
        sub_cat: data.sub_cat
      }
      axios
        .post(`${import.meta.env.VITE_API_URL}/subcategory`, addData)
        .then(() => {
          // toast.success('✅ SubCategory Added!', { autoClose: 2000, transition: Flip })
          reset()
          redirect('/subcategory/about')
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="container mx-auto my-5 p-5 shadow">
      <h1>{id ? 'Update SubCategory' : 'Add SubCategory'}</h1>
      <form onSubmit={handleSubmit(subcat)}>
        {/* Category Select */}
        <div className="mt-4">
          <select
            {...register('cat_id', {
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
          <p className="text-danger">{errors?.cat_id?.message}</p>
        </div>

        {/* SubCategory Input */}
        <div className="mt-4">
          <input
            type="text"
            {...register('sub_cat', {
              required: {
                value: true,
                message: 'Enter The Subcategory Name',
              },
              minLength: {
                value: 2,
                message: 'Enter minimum 2 characters',
              },
              maxLength: {
                value: 50,
                message: 'Enter maximum 50 characters',
              },
            })}
            // {...register('subcategory', { required: true })}
            placeholder="Enter SubCategory Name"
            className="form-control"
          />
          <p className="text-danger">{errors?.sub_cat?.message}</p>
        </div>

        <div className="mt-4">
          <button type="submit" className={`btn ${id ? 'btn-outline-warning' : 'btn-outline-success'}`}>
            {id ? 'Update' : 'Submit'}
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  )
}

export default AddSubCategory
