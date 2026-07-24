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

    /*const totalVotes = poll.Options.reduce((acc, currentOption) => {
        return acc + currentOption.voteCount
    }, 0)  --- (not used here at all, just noted here)*/

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

                <div>
                    {poll.Options.map((option, index) => (
                        <div key={option.id}>
                            <h2>{option.text}</h2>
                            {/* <progress max={maxVotes} value={option.voteCount}>{option.voteCount}</progress> --- progess bar (not used here at all, just noted here)*/}
                            <div

                                className={option.voteCount === maxVotes ? "vote-bar winner" : "vote-bar"}
                                style={{ width: `${option.voteCount / maxVotes * 100}%` }}

                            // create a div that holds the text and the bar --- this holds the bar and vote count
                            >
                                <h2>{option.voteCount}</h2>
                            </div>
                        </div>
                    ))}

                </div>

            </section>
        </div>
    )

}

export default Results