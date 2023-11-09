import React, { useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'
import { Link } from 'react-router-dom'
import Category from '../components/Category'

function HomePage() {

  const [uploadVideoStatus , setUploadVideoStatus] = useState({})

  return (
    <>
        <div className='container d-flex  alighn-items-center  mt-5 mb-5 justify-content align-items-center' style={{justifyContent:'space-between'}}>
          <div className="add-videos">
          <Add setUploadVideoStatus = {setUploadVideoStatus}/>
          </div>
        <Link  to={'/watch-history'} style={{textDecoration:'none',color:'white ', fontSize:'30px'}}> <h5>Watch History</h5></Link>
        </div>

        <div  className=' container-fluid d-flex w-100 mt-5 mb-5 justify-content-between' style={{justifyContent:'space-between'}}>
          <div className="all-videos col-lg-9">
            <h4 className='mb-5'>All Videos</h4>
            <View uploadVideoStatus = {uploadVideoStatus}/>
          </div>
          <div className="category col-lg-3">
          <Category/>
          </div> 
        </div>
        </>
  )
}

export default HomePage


