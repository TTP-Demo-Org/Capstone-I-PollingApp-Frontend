import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router"

function PollDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState(null)
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        const url = `https://capstone-i-pollingapp-backend.onrender.com/polls/${id}`

        async function loadPoll() {
            const res = await fetch(url)
            const data = await res.json()
            setPoll(data)
            setLoading(false)
        }

        loadPoll()
    }, [id])

    async function handleSubmit() {
        const url = `https://capstone-i-pollingapp-backend.onrender.com/polls/${id}/vote`

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ optionId: selectedOption, email: email })
            })
            if (!res.ok) throw new Error("Failed to submit vote")
            navigate(`/poll/${id}/results`)
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <button onClick={() => navigate("/")}> Back</button>
            <h1>{poll.title}</h1>
            <p>{poll.description}</p>

            {poll.Options.map((option) => (
                <label key={option.id}>
                    <input
                        type="radio"
                        name="pollOption"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                    />
                    {option.text}
                </label>
            ))}

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button disabled={!selectedOption || !email } onClick={handleSubmit}>
                Submit Vote!
            </button>
            {error && <p>{error}</p>}
            
        </div>
    )
}

export default PollDetail