import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import PollDetail from "./pages/PollDetail"
import Layout from "./components/Layout"
import './App.css'


// const items = [
//         {id: 1, title: "Who is better: Messi or Ronaldo?", description: "Choose who you believe is the better soccer player."},
//         {id: 2, title: "Best season to watch Gilmore Girls?", description: "Choose the best season."},
//         {id: 3, title: "Where should I travel?", description: "Choose the best vacation spot."},
//         {id: 4, title: "Who is better: MJ or MJ?", description: "Choose who you believe is the better MJ."},
//         {id: 5, title: "What to do on a Creek?", description: "Although the creek is known to be quiet, choose what YOU would do."},
//     ];

function App() {
    
  return (
    <>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poll/:id" element={<PollDetail />} />
        </Routes>    
      </Layout>
    </>
  )
}

export default App