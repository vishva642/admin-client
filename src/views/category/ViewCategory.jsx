import axios from "axios"
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import {NavLink} from "react-router-dom"

const ViewCategory = () => {
    const [categories,setCategories] = useState([])
    function showCategory(){
       axios.get(`${import.meta.env.VITE_API_URL}/category`)
       .then(res=>setCategories(res.data.category))
       .catch(err=>console.log(err))
    }
    useEffect(()=>{
        showCategory()
    },[])
    function trash(id) {
        if(confirm("Are You Sure Want To Delete This Category?")){
            axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`)
            .then(res=>{
                console.log(res.data)
                showCategory()
            })
            .catch(err=>console.log(err))
        }
    }
  return (
    <>
        <table className="table col-lg-6 mx-auto my-5 p-5 shadow container table-striped table-hover table-danger">
            <thead className="table table-dark">
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories && categories.map(({_id,name,createdAt, updatedAt},index)=>{
                        return(
                            <tr key={_id}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{new Date(createdAt).toDateString()}</td>
                            <td>{new Date(updatedAt).toDateString()}</td>
                            <td>
                                <button onClick={()=>trash(_id)} className="btn btn-danger mx-1"><FaTrash/></button>
                                <NavLink to={`/category/update/${_id}`} className="btn btn-warning"><FaPencil/></NavLink>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  )
}

export default ViewCategory

