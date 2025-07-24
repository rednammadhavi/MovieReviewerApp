import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Admin from "./pages/Admin"
import MovieForm from "./forms/MovieForm"
import MovieInfo from "./pages/MovieInfo"

import ProtectedPage from "./components/ProtectedPages"
import Spinner from "./components/Spinner"

const App = () => {
  const { loading } = useSelector((state) => state.loaders)

  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path="/admin" element={<ProtectedPage><Admin /></ProtectedPage>} />
          <Route path="/admin/movies/add" element={<ProtectedPage><MovieForm /></ProtectedPage>} />
          <Route path="/admin/movies/edit/:id" element={<ProtectedPage><MovieForm /></ProtectedPage>} />
          <Route path="/movie/:id" element={<ProtectedPage><MovieInfo /></ProtectedPage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
