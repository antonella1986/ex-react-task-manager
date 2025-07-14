import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Homepage } from './pages/Homepage'
import { TaskList } from './pages/TaskList'
import { AddTask } from './pages/AddTask'

import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/TaskList" element={<TaskList />}></Route>
          <Route path="/AddTask" element={<AddTask />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
