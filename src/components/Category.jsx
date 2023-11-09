import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addAllCategory, deleteCategory, getAVideo, getAllCategories, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import { Row } from 'react-bootstrap'
import{ Col }from 'react-bootstrap'

function Category() {

  const [categoryName,setCategoryName]=useState("")
  const[category,setCategory]=useState([])


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//function to get all categories
const allCategory=async()=>{
  const {data}=await getAllCategories()
  // console.log(data);
  setCategory(data)
}
console.log(category);
useEffect(()=>{
  allCategory()
},[])

//function to delte category
const deleteACategory=async(id)=>{
  await deleteCategory(id)
  allCategory()
}

  //function to add category
const addCategory=async()=>{
  console.log(categoryName);
if(categoryName){
  let body={
    categoryName,
    allvideos:[]
  }
  const response= await addAllCategory(body)
  console.log(response);
  if(response.status>=200 && response.status<300){
    toast.success('category added sucessfully')
    setCategoryName('')
    handleClose()
    allCategory()
  }
  else{
    toast.error('something went wrong .. try again later')
  } 
}
else{
  toast.warning('please enter category name')
}

}

//function to prevent reload so that the data that we sent wont lost
const dragOver = (e)=>{
  e.preventDefault()
}

const videoDrop = async(e, categoryId)=>{
  console.log('dropped on the category Id:' , categoryId);
  //method to get the data send from videocard (getData)
  let videoId = e.dataTransfer.getData("videoID")
  console.log(videoId);
  const {data} = await getAVideo(videoId)
  console.log(data);
  const selectedCategory = category.find(item=>item.id===categoryId)
  selectedCategory.allvideos.push(data)
  console.log(selectedCategory);

  await updateCategory(categoryId, selectedCategory)
  allCategory()
}


  return (
    <>
    <div className=' d-grid ms-3'>
        <button onClick={handleShow} className='btn btn-warning'>Add New Category</button>
       
    </div>

    {category?.length>0?
    category?.map((item)=>(<div className='m-5 border border-secondary p-3 rounded'>
    <div className='d-flex justify-content-between align-items-center ' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
    <h6>{item.categoryName}</h6>
    <Button onClick={()=>deleteACategory(item?.id)} className='btn btn-danger '><i class="fa-solid fa-trash "></i></Button>
    </div>

    <Row>
      <Col>
      {item?.allvideos?.length > 0?
      item?.allvideos?.map(card=>(<VideoCard displayVideo={card} />))
      :<p>Nothing to display</p>}
      </Col>
    </Row>

</div>)):
<p className='mt-5 fw-bolder fs-4 text-danger text-center'>no category added</p>
}
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-pencil"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='border border-secondary rounded p-3'> 

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" placeholder="Category name" onChange={(e)=>setCategoryName(e.target.value)} />
            </Form.Group> 
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={addCategory} variant="primary">Add</Button>
        </Modal.Footer>
        </Modal>
        <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
   
  )
}

export default Category