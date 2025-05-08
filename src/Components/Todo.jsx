import { useState } from "react"
import React from 'react'


const Todo = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] =  useState("")

    const [items, setItems] = useState([])
    const [error, setError] = useState("")

    const [editIndex, setEditIndex] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")

    const handleDesc =(e)=>{
        setDescription(e.target.value)
        console.log(e.target.value)


    }

    const handleTitle = (e)=>{
        setTitle(e.target.value)
        console.log(e.target.value)

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (!title.trim() || !description.trim()){
            setError("Both Title and Description are required")
            return
        }
        else{
            setError("")
            const inputData = {
                name: title,
                desc : description,
                done: false,

            }
        setItems([inputData, ...items])
        setTitle("")
        setDescription("")
        }
        

    }

    const handleDone = (index) =>{
        const updatedItems = [...items]
        updatedItems[index].done = !updatedItems[index].done
        setItems(updatedItems)

    }

    const handleDelete = (index) =>{
        const updatedItems = items.filter((elem,i) =>i!== index )
        setItems(updatedItems)
    }

    const handleEdit = (index) =>{

        setEditIndex(index)
        setEditTitle(items[index].name)
        setEditDescription(items[index].desc)

    }

    const cancelEdit =()=>{
        setEditIndex(null)
        setEditTitle("")
        setEditDescription("")

    }

    const saveEdit = (index) =>{
        if (!editTitle.trim() || !editDescription.trim()){
            setError("Both Title and Description are required")
            return
        }

        const updatedItems = [...items]
        updatedItems[index].name = editTitle
        updatedItems[index].desc = editDescription
        setItems(updatedItems)
        cancelEdit()
        setError("")


    }




  return (
    <>
    <div className='mt-4 min-w-[80%]  flex flex-col items-center shadow-xl bg-white rounded-xl mx-[10px]' >
        <h2 className='text-center font-bold text-2xl mt-2'>Add Task</h2>
        <form action="submit" onSubmit={handleSubmit} className=' mx-2 my-3 p-3 min-w-full'>
            <div>
            <label htmlFor="title" className='text-lg m-1 '>Enter Title</label> <br />
            <input  onChange= {handleTitle} value={title}
                type="text"  id="title" placeholder='Title' className='bg-white h-8 min-w-[90%] my-2 mb-3 outline-none rounded-[5px]'/><br />
            </div>
            <div>
            <label htmlFor="description" className='text-lg'>Enter Description</label><br />
            <input onChange={handleDesc} value={description} type="text" id="description" placeholder='Description'className='bg-white h-8 min-w-[90%] my-2 mb-3 outline-none rounded-[5px]'/>
            </div>

            {
                error && (
                    <p className="text-red-600 text-sm mb-2 font-medium">{error}</p>
                )
            }
            <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer focus:outline-none'>Add Task</button>


            
            



        </form>

        
      
    </div>

    <div className="mt-[50px] min-w-[80%] shadow-xl bg-white rounded-xl mx-[10px] my-[8px] pb-[7px] ">
        <div className="space-y-4 ">
            

    

        {
               
                    items.map((elem, index)=>(

                        editIndex === index?  (<div>

                            <input type="text"
                            value={editTitle}
                            onChange={(e)=>setEditTitle(e.target.value)} 
                            className="w-full mb-2 p-2 border border-gray-300 rounded"/>

<input type="text"
                            value={editDescription}
                            onChange={(e)=>setEditDescription(e.target.value)} 
                            className="w-full mb-2 p-2 border border-gray-300 rounded"/>

<div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(index)}
                      className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-1.5"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-3 py-1.5"
                    >
                      Cancel
                    </button>
                  </div>



                        </div>):
                        
                          (<div key={index} className="p-4 bg-white rounded-xl shadow-2xl"> <h2 className={`mx-2 my-1 pt-3 text-xl ${elem.done ? "line-through text-gray-500" : ""}`}>{elem.name}</h2>
                                <div className="flex justify-between">
                                   
                                    <h3 className={`mx-2 my-2 ${elem.done ? "line-through text-gray-500" : ""}`}> {elem.desc}</h3>
                                    <div className="flex gap-1 pr-[5px]">
                                    <button
                                    onClick={() =>handleEdit(index)}
                                     className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-2 py-1.5 me-1 mb-1 cursor-pointer focus:outline-none">Edit</button>
                                    <button 
                                    onClick={()=>handleDelete(index)}
                                    className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-2 py-1.5 me-1 mb-1 cursor-pointer focus:outline-none">Delete</button>
                                    <button 
                                    onClick={()=>handleDone(index)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 me-1 mb-1 cursor-pointer focus:outline-none">
                                        {elem.done ? "Undo" : "Done"}</button>
                    
                                    </div>
                                    
                                    
                    
                                    
                                    
                                </div> </div>)
                        
                       
                        
                      
                    ))
                }

        </div>
          
            
        </div>

    </>
  )
}

export default Todo
