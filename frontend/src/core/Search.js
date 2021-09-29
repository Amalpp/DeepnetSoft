import React,{useState,useEffect} from 'react'
import { getProduct,getCategory,list } from '../auth'
import AllProducts from './AllProducts'

const Search = ()=>{
    
    const [data,setData] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        products:[],
        searched:false,

    })

    const {categories,category,search,results,searched,products} = data

    const initCategories=()=>{
        
        getCategory().then(val=>{
            if(val.error){

            }else{
                
                setData({...data,categories:val})
            }
        })
    }

    const getproducts = ()=>(
        getProduct().then((res)=>{
            if(res.error){
                
            }else{
                setData({...data,products:res})
                initCategories()
            }
        })
    )
    
    const handleChange=(name)=> event=>
    (
        setData({...data,[name]:event.target.value,searched:false})
    )

    useEffect(()=>{
        
        getproducts()
    },[])

    const searchData = ()=>{
        if(search){
            list({search:search|| '', category:category})
            .then((response)=>{
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data,results:response,searched:true})
                }
            })
        }
    }

    const searchSubmit = (e)=>{
        e.preventDefault()
        searchData()
    }

    const searchForm=()=>(
        <form onSubmit={searchSubmit}>
        <span className="input-group-text">
            <div className="input-group input-group-lg">
            <div className="input-group-prepend">
                <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">Pick Category</option>
                {categories.map((c,i)=>(
                    <option key={i} value={c._id}>{c.name}</option>
                ))}
                </select>
            </div> 
            <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Seacrh By name" />
            </div>
            <div className="btn input-group-append" style={{border:'none'}} >
                <button className="input-group-text">Search</button>
            </div>
        </span>
        </form>
    )
        

    return(
       <div>
            <div className="row">
            <div className="container">{searchForm()}</div>
        </div>
        
        {searched ? <AllProducts products={results} />  : <AllProducts products={products} />}
       </div>
    )
}

export default Search 