import { Route, Routes } from "react-router-dom"
import SalesAdd from "./pages/SalesAdd"
import SalesSubmit from "./components/SalesSubmit"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<SalesAdd />}/>
      <Route path="/salesresult" element={<SalesSubmit />}/>
    </Routes>

    </>
  )
}

export default App
