import { useState, useEffect } from 'react'   /* make sure to import both */
import { useNavigate } from 'react-router' //allow to go from home to create poll
import PollCard from '../components/PollCard'

function Home() {
const navigate = useNavigate()//creates the function from the import


    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const url = `https://capstone-i-pollingapp-backend.onrender.com/polls`

        async function loadPolls() {
            try{
                const res = await fetch(url)
                if (!res.ok) throw new Error("Failed to load polls!")
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
<div className="home-header">
    <h1>All polls</h1>

    <button className="new-poll-button" type="button" onClick={() => navigate("/create")}>
        + New poll
    </button>
</div>

        <div className="grid">
            {polls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
            ))}
        </div>
    </>
  )
}

export default Home