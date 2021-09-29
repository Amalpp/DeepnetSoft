import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { getProduct } from "../auth";
import Layout from "./Layout";

import LastestProduct from "./LatestProducts";
import AllProducts from "./AllProducts";
import Search from "./Search";



const Home = ()=>{

    const [values,setValues] = useState({
        products:[],
        error:false,
        success:false
    })
    
    const {products} = values
    useEffect(() => {
        getProduct().then((data)=>{
            console.log(data)
            if(data){
                console.log(data)
                setValues({...values,products:data.products})
            }else{
                
            }
        })
        
     },[])


    const links= ()=>{
        return <div className="container">
            <div className="float-right ">
                <Link to="/addProduct" className="text-white ml-5 btn btn-primary">Add Product</Link>
                <Link to="/addCategory" className="text-white ml-5 btn btn-primary">Add Category</Link>
            </div>
            
        </div>
    }

    return(
        <Layout title="Home Page" description="Home " className="container">
            {links()}
            <Search />
            {/* {navBar()}  */}
    <AllProducts products={products}/>
            <LastestProduct  />
        </Layout>     
    )
}
export default Home