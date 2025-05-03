import { Route, Routes } from "react-router-dom"
import HomePage from "./Page/Home-page.jsx";
import Forms from "./Page/Forms.jsx";
import TaskForm from "./Page/Tasks-Form.jsx";
function App() {
  //This is where the pages will be rendered
  return (
    <Routes>
      <Route path="/" element={<Forms/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/tasks" element={<TaskForm/>} />
    </Routes>
  )
}

export default App
