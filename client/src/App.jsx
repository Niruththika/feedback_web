import{BrowserRouter,Routes,Route} from "react-router-dom"
import AddUser from '../src/Pages/Add.jsx'
import User from '../src/Pages/User.jsx'
import Edit from '../src/Pages/Edit.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/addUser' element={<AddUser/>}/>
      <Route path='/' element={<User/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
