import React from 'react'

const Loader = () => {

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 my-24">

           {
            [1,2,3].map((ele,index)=>{
                return  <div key={index} className="border rounded-lg p-3  animate-pulse">
                <h2 className="bg-gray-100 rounded-lg p-3 mb-2 w-1/2"></h2>
                <p className="bg-gray-100 rounded-lg p-2 mb-2"></p>
                <p className="bg-gray-100 rounded-lg p-2 w-1/3"></p>

            </div>
            })
           }
          
            
         

        </div>
    )
}

export default Loader
