import { API } from "../config";
import querystring from 'query-string'
export const signup=user=>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const signin=user=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const authenticate=(data,next)=>{
    if(typeof window!=='undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

export const signout = (next)=>{
    if(typeof window!=='undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`,{
            method:"GET"
        }).then((res)=>{
            console.log("signout",res)   
        }).catch((err)=>console.log(err))
    }
}

export const isAuthenticated = ()=>{
    if(typeof window =='undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

export const createCategory=(name)=>{
    return fetch(`${API}/category/create`,{
        method:'post',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(name)
    }).then((res)=>{
        return res.json()
    }).catch((error)=>{
        console.log(error);
    })
}   

export const createProduct=product=>{
    return fetch(`${API}/create/product`,{
        method:'post',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product)
    }).then((res)=>{
        return res.json()
    }).catch((error)=>{
        console.log(error);
    })
}

export const getCategory = ()=>{
    return fetch(`${API}/categories`,{
        method:'GET'
    }).then((response)=>{
        return response.json()
    }).catch(err =>console.log(err))
}

export const getProduct = ()=>{
    return fetch(`${API}/viewProduct`,{
        method:'get',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return res.json()
    }).catch((error)=>{
        console.log(error);
    })
}


export const getLatestProduct = ()=>{
    return fetch(`${API}/viewProduct?limit=4`,{
        method:'get',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return res.json()
    }).catch((error)=>{
        console.log(error);
    })
}

export const list = params => {
    const query = querystring.stringify(params)

    return fetch(`${API}/search?${query}`,{
        method:'GET'
    }).then((response)=>{
        console.log(response)
        return response.json()
    }).catch(err =>console.log(err))
}

export const deleteProduct = productId =>{
    return fetch(`${API}/product/${productId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then(response=>{
        return response.json()
    }).catch( err =>console.log(err))
}

export const updateProducts = (productId, prod) => {
    // console.log(prod,"The Procuds")
    return fetch(`${API}/product/${productId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type":"application/json"
        },
        body: JSON.stringify(prod)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getSingleProduct = productId =>{
    return fetch(`${API}/getProduct/${productId}`,{
        method:'GET'
    }).then(response => {
            return response.json();
    }).catch(err => console.log(err));
}