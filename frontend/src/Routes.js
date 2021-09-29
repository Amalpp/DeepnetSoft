import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import AddCategory from './category/AddCategory'
import Home from './core/Home'
import Menu from './core/Menu'
import AddProduct from './product/AddProduct'
import UpdateProduct from '../src/product/updateProduct'
import Signin from './user/Signin'
import Signup from './user/Signup'

const Routes = ()=>{
    return (
        <BrowserRouter>
        <Menu />
            <Switch>
                <PrivateRoute path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute path='/addProduct' exact component={AddProduct} />
                <PrivateRoute path='/updateProduct/:productId' exact component={UpdateProduct} />
                <PrivateRoute path='/addCategory' exact component={AddCategory} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes