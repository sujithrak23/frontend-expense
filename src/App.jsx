import './App.css'
import { Album } from './Album'
import Expense from './expense'
import Login from './login'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
  const [cookies] = useCookies()
  return cookies.token ? children : <Navigate to="/login"/>;
}

const routes = createBrowserRouter([
  {
    path: "/expense",
    element : (
      <ProtectedRoute>
           <Expense/>
      </ProtectedRoute>
    )
  },
  {
    path: "/",
    element : (
      <ProtectedRoute>
           <Album/>
      </ProtectedRoute>
    )
  },
  {
   path: "/login",
   Component: Login
  }
])

function App() {

  return (
    <>
    <RouterProvider router = {routes}/>
    </>
  )
}

export default App
