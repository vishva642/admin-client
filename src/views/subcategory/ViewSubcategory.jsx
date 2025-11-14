// import axios from "axios"
// import { useEffect, useState } from "react"
// import { FaTrash } from "react-icons/fa"
// import { FaPencil } from "react-icons/fa6"
// import { NavLink } from "react-router-dom"

// const ViewSubcategory = () => {
//   const [subCategories, setSubCategories] = useState([])
//   const [categories, setCategories] = useState([])

//   // Category aur SubCategory dono load karna
//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_API_URL}/category`)
//       .then(res => setCategories(res.data))
//       .catch(err => console.log(err))

//     axios.get(`${import.meta.env.VITE_API_URL}/subcategory`)
//       .then(res => setSubCategories(res.data))
//       .catch(err => console.log(err))
//   }, [])

//   // Delete function
//   function trash(id) {
//     if (confirm("Are You Sure Want To Delete This SubCategory?")) {
//       axios.delete(`${import.meta.env.VITE_API_URL}/subcategory/${id}`)
//         .then(() => {
//           setSubCategories(subCategories.filter(sc => sc.id !== id))
//         })
//         .catch(err => console.log(err))
//     }
//   }

//   // Helper: categoryId → categoryName
//   function getCategoryName(id) {
//     const cat = categories.find(c => c.id === id)
//     return cat ? cat.category : "Unknown"
//   }

//   return (
//     <div className="container mx-auto my-5 p-5 shadow">
//       <h1 className="text-center">View SubCategories</h1>
//       <table className="table table-striped table-hover table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Category</th>
//             <th>SubCategory</th>
//             <th>Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subCategories && subCategories.map(({ id, categoryId, subcategory, createdAt }, index) => (
//             <tr key={id}>
//               <td>{index + 1}</td>
//               <td>{getCategoryName(categoryId)}</td>
//               <td>{subcategory}</td>
//               <td>{new Date(createdAt).toDateString()}</td>
//               <td>
//                 <button onClick={() => trash(id)} className="btn btn-danger mx-1">
//                   <FaTrash />
//                 </button>
//                 <NavLink to={`/subcategory/update/${id}`} className="btn btn-warning">
//                   <FaPencil />
//                 </NavLink>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ViewSubcategory

import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const ViewSubcategory = () => {
  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])

  function showSubcategory(){
    axios
      .get(`${import.meta.env.VITE_API_URL}/category`)
      .then((res) => setCategories(res.data.category))
      .catch((err) => console.log(err))

    axios
      .get(`${import.meta.env.VITE_API_URL}/subcategory`)
      .then((res) => setSubCategories(res.data.records))
      .catch((err) => console.log(err))
  }
  // Category aur SubCategory dono load karna
  useEffect(() => {
    showSubcategory()
  }, [])

  // Delete function
  function trash(id) {
        if(confirm("Are You Sure Want To Delete This Subcategory?")){
            axios.delete(`${import.meta.env.VITE_API_URL}/subcategory/${id}`)
            .then(res=>{
                console.log(res.data)
                showSubcategory()
            })
            .catch(err=>console.log(err))
        }
    }

  // Helper: categoryId → categoryName
  function getCategoryName(id) {
    const cat = categories.find((c) => c._id === id)
    return cat ? cat.name : 'Unknown'
  }

  return (
    <div className="container mx-auto my-5 p-5 shadow">
      <h1 className="text-center">View SubCategories</h1>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>No.</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategories &&
            subCategories.map(({ _id, cat_id, sub_cat, createdAt, updatedAt }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{getCategoryName(cat_id?._id ?? cat_id)?? "N/A"}</td>
                <td>{sub_cat}</td>
                <td>{createdAt ? new Date(createdAt).toDateString() : '-'}</td>
                <td>{updatedAt ? new Date(updatedAt).toDateString() : '-'}</td>
                <td>
                  <button onClick={() => trash(_id)} className="btn btn-danger mx-1">
                    <FaTrash />
                  </button>
                  <NavLink to={`/subcategory/update/${_id}`} className="btn btn-warning">
                    <FaPencil />
                  </NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewSubcategory
