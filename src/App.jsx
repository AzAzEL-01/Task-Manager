import { useState } from 'react'
import Header from './Components/Header'
import Todo from './Components/Todo'
import Todoo from './chat/Todoo'



function App() {
  

  return (
    <>
    <div className='max-w-[90%] min-h-fit max-h-screen  h-screen min-w-fit shadow-lg shadow-gray-100 mx-auto my-[50px] px-2 py-2 bg-gray-100 rounded-2xl' >
    <Header/>
    <Todo/>

    </div>
    
      
    </>
  )
}

export default App
