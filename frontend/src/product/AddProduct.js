import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { createProduct, getCategory } from '../auth'
import Layout from '../core/Layout'


const AddProduct = ()=>{

    const [values,setValues] = useState({
        name:'',
        price:'',
        quantity:'',
        categories:[],
        category:'',
        error:false,
        success:false
    })

    const onHandleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})
    }

    const {name,error,success,quantity,price,category,categories} = values

    const clickSubmit = (e)=>{
        e.preventDefault()
        createProduct({name,price,quantity,category}).then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,success:true,error:false,name:'',price:'',quantity:''})
            }
        })
    }

    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error? '':'none'}}>
        {error}
    </div>
    )

    const showSuccess = ()=>(
        <div className="alert alert-success" style={{display:success? '':'none'}}>
        Product created 
    </div>
    )

    // load cartegory

    const init = ()=>{
        getCategory().then(data=>{
            if(data.error){

            }
            else{
                setValues({...values,categories:data})
            }
        })
    }

    useEffect(() => {
       init()
    }, [])


    const goBack = ()=>(
        <div className="mt-5">
            <Link to="/" className="text-warning">Go Home</Link>
        </div>
    )

    const AddProductFrom=()=>(
        <form>
            <div className="form-group">
                <label className='text-muted'>Name</label>
                <input onChange={onHandleChange('name')} type="text" className="form-control" value={name} required/>
            </div>
            <div className="form-group">
                <label className='text-muted'>Price</label>
                <input onChange={onHandleChange('price')} type="number" className="form-control" value={price} required/>
            </div>
            <div className="form-group">
                <label className='text-muted'>Quantity</label>
                <input onChange={onHandleChange('quantity')} type="number" className="form-control" value={quantity} required/>
            </div>
            <div class="form-group ">
                <label className='text-muted'>Category</label>
                <select onChange={onHandleChange('category')} class="form-control"  required>
                    <option>Please select</option>
                    {
                        categories && categories.map((c,i)=>(
                            <option key={i} value={c._id}>{c.name}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary mx-auto'>Add Product</button>
        </form>
    )

    return(
        <Layout title="Add Product" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {AddProductFrom()}
            {goBack()}
        </Layout>
        )
}

export default AddProduct