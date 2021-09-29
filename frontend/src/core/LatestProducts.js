import React,{useState,useEffect} from 'react'
import {Card} from 'react-bootstrap'
import { getLatestProduct } from '../auth'


const LastestProduct = ()=>{

  const [values,setValues] = useState({
    products:[],
    error:false,
    success:false
})

const {products} = values

const init = ()=>(
  getLatestProduct().then((data)=>{
        if(data){
            setValues({...values,products:data})
        }else{
            
        }
    })
)
useEffect(() => {
    init()
 }, [])

  return  (<div className=" mt-5">
      <h3>Latest Products</h3>
      <div className="row ">
      {products.length>0 && products.map((products,i)=>(
        <Card className="m-5 col-md">
            <Card.Header as="h5" key={i}>{products.category.name}</Card.Header>
            <Card.Body>
                <Card.Title>{products.name}</Card.Title>
                <Card.Text>
                   Price : {products.price}<br />
                   Quantity : {products.quantity}
                </Card.Text>
            </Card.Body>
        </Card>
  ))}
  </div>
  </div>)
  
}


export default LastestProduct