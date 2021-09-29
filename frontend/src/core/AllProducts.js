import React from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct } from '../auth'

const AllProducts = ({products})=>{

    const destroyProduct = (productId) =>(
        deleteProduct(productId).then((data)=>{
            if(data.error){
                console.log(data.error)
            }
        })
    )

   return <div className="mt-3">
       <h2>All Product</h2>
       <table className="table mt-4">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Price</th>
      <th scope="col">quantity</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    
      {products.map((p,i)=>(
          <tr key={i}>
          <th scope="row" >{i+1}</th>
          <td>{p.name}</td>
          <td>{p.category.name}</td>
          <td>{p.price}</td>
          <td>{p.quantity}</td>
          <td>
              <Link to={`/updateProduct/${p._id}`} className="btn btn-success" >Edit</Link>
          </td>
          <td><button onClick={()=> destroyProduct(p._id)} className="btn btn-danger">Delete</button></td>
          </tr>
      ))}
    
  </tbody>
</table>
   </div>
}

export default AllProducts