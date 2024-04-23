import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import './index.css'
import { AuthorPosts } from './pages/AuthorPosts'
import { Authors } from './pages/Authors'
import { CatagoryPosts } from './pages/CatagoryPosts'
import { CreatePost } from './pages/CreatePost'
import { Dashboard } from './pages/Dashboard'
import { DeletePost } from './pages/DeletePost'
import { EditPost } from './pages/EditPost'
import { ErrorPage } from './pages/ErrorPage'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Logout } from './pages/Logout'
import { PostDetails } from './pages/PostDetails'
import { Register } from './pages/Register'
import { UserProfile } from './pages/UserProfile'
const router = createBrowserRouter([
  { 
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: "posts/:id", element: <PostDetails/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>},
      {path: "profile/:id", element: <UserProfile/>},
      {path: "authors", element: <Authors/>},
      {path: "create-post", element: <CreatePost/>},
      {path: "posts/categories/:category", element: <CatagoryPosts/>},
      {path: "posts/users/:id", element: <AuthorPosts/>},
      {path: "myposts/:id", element: <Dashboard/>},
      {path: "posts/:id/edit", element : <EditPost/>},
      {path: "posts/:id/delete", element : <DeletePost/>},
      {path: "logout", element: <Logout/>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
