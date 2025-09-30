import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './contexts/GlobalContext'
import DefaultLayout from './layout/DefaultLayout'

import { Homepage } from './pages/Homepage'
import { TaskList } from './pages/TaskList'
import { AddTask } from './pages/AddTask'
import { TaskDetail } from './pages/TaskDetail'

import './index.scss'

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/TaskList" element={<TaskList />}></Route>
              <Route path="/AddTask" element={<AddTask />}></Route>
              <Route path="/task/:id" element={<TaskDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
