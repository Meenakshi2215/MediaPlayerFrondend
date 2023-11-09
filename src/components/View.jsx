import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { Row } from 'react-bootstrap'
import{ Col }from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI'

function View({uploadVideoStatus}) {

  const [allVideo,setAllVideo]=useState([])

  const [deleteVideoStatus , setDeleteVideoStatus] = useState({})
  
  const getAlluploadedVideo = async()=>{
   const response = await getAllVideos()
 /* console.log(response); */
    const {data} = response 
    /* console.log(data); */ 
    setAllVideo(data)
  }
  console.log(allVideo);

  useEffect(()=>{
    getAlluploadedVideo()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus ,deleteVideoStatus])
  return (
    <>

     <Row>
      { allVideo.length>0?
      allVideo.map((video)=>(<Col sm={12} md={6} lg={4} xl={3}>
         <VideoCard displayVideo={video} setDeleteVideoStatus={setDeleteVideoStatus}/>
      </Col>))
      :
      <p>Nothing to display</p>
    }
     </Row>

    </>
  )
}

export default View