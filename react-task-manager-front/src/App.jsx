import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './contexts/GlobalContext'

import { Homepage } from './pages/Homepage'
import { TaskList } from './pages/TaskList'
import { AddTask } from './pages/AddTask'

import './App.css'

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/TaskList" element={<TaskList />}></Route>
            <Route path="/AddTask" element={<AddTask />}></Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
