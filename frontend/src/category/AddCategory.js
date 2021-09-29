import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { createCategory } from '../auth'
import Layout from '../core/Layout'


const AddCategory = ()=>{

    const [values,setValues] = useState({
        name:'',
        error:false,
        success:false
    })

    const onHandleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})
    }

    const {name,error,success} = values

    const clickSubmit = (e)=>{
        e.preventDefault()
        createCategory({name}).then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,success:true,error:false,name:''})
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
        Category created 
    </div>
    )

        const goBack = ()=>(
            <div className="mt-5">
                <Link to="/" className="text-warning">Go Home</Link>
            </div>
        )

    const AddCategoryForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={onHandleChange('name')} type="text" className="form-control" value={name}/>
            </div>
            <button onClick={clickSubmit}  className='btn btn-primary mx-auto'>Add Category</button>
        </form>
    )
    return (
        <Layout title="Add Category" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {AddCategoryForm()}
            {goBack()}
          
        </Layout>
    )
}

export default AddCategory