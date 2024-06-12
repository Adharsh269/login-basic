import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login/Login"
import Home from "./Home/Home"
import Create from "./Create/Create"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create" element={<Create/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
