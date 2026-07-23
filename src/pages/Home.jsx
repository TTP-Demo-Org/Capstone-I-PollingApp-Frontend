import { useState, useEffect } from 'react'   /* make sure to import both */
import PollCard from '../components/PollCard'

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