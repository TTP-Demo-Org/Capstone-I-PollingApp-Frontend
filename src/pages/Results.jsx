import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"

function Results() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const url = `https://capstone-i-pollingapp-backend.onrender.com/polls/${id}`

        async function loadPoll() {
            try {
                const res = await fetch(url)
                if (!res.ok) throw new Error("Failed to load polls!")
                const data = await res.json()
                setPoll(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadPoll()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const maxVotes = Math.max(...poll.Options.map(option => option.voteCount))
    
    return (
        <div className="poll-page">
            <button className="back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Polls
            </button>

            <section className="poll-card">
                <h1>{poll.title}</h1>
                <p className="poll-description">{poll.description}</p>

                <div className="vote-count">
                    {poll.Options.map((option, index) => (
                        <div
                            key={option.id}
                            className={option.voteCount === maxVotes ? "vote-bar winner" : "vote-bar"}
                        // style={{minWidth: `${option.voteCount * 85}px`, height:"50px" }}
                        >
                            <h2 className="option-text">{option.text}</h2>

                            {/* {index === 0 && <h2 className="winner-message">👑</h2>} */}
                            <h2 className="option-vote-count">{option.voteCount}</h2>
                        </div>
                    ))}

                </div>

            </section>
        </div>
    )

}

export default Results