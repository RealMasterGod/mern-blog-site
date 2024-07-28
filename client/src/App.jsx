import Home from "./pages/home"
import Topbar from "./components/topbar"
import Single from "./pages/single"
import Write from "./pages/write"
import Setting from "./pages/setting"
import Login from "./pages/login"
import Register from "./pages/register"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "./context/Context"

function App() {
  const {user} = useContext(GlobalContext);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/post/:postId" element={<Single />}/>
        <Route path="/write" element={user ? <Write /> : <Register />}/>
        <Route path="/setting" element={user ? <Setting /> : <Register />}/>
        <Route path="/login" element={user ? <Home /> : <Login/>}/>
        <Route path="/register" element={user ? <Home /> : <Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
