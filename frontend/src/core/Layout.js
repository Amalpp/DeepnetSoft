import React from 'react'

const Layout = ({title="Title",className,children})=>(
    <div>
        <div className="jumbotron" style={{backgroundColor:'rgb(254 255 255)'}} >
            <h2 className="text-center">{title}</h2>
        </div>
        <div className={className}>{children}</div>
    </div>
)
 
export default Layout;