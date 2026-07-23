import { useState, useEffect } from 'react'   /* make sure to import both */
import './App.css'
import PollCard from './components/PollCard'

// const items = [
//         {id: 1, title: "Who is better: Messi or Ronaldo?", description: "Choose who you believe is the better soccer player."},
//         {id: 2, title: "Best season to watch Gilmore Girls?", description: "Choose the best season."},
//         {id: 3, title: "Where should I travel?", description: "Choose the best vacation spot."},
//         {id: 4, title: "Who is better: MJ or MJ?", description: "Choose who you believe is the better MJ."},
//         {id: 5, title: "What to do on a Creek?", description: "Although the creek is known to be quiet, choose what YOU would do."},
//     ];

function App() {
    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const url = `https://capstone-i-pollingapp-backend.onrender.com/polls`

        async function loadPolls() {
            try{
                const res = await fetch(url)
                if (!res.ok) throw new Error("Failed to load polls")
                const data = await res.json()
                setPolls(data)
            }   catch (err) {
                setError(err.message)
            }   finally {
                setLoading(false)
            }
        }

        loadPolls()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
  return (
    <>
        <div>
            <h1>Poll Up</h1>
        </div> 

        <div>
            {polls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
            ))}
        </div>
    </>
  )
}

export default App
