import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router"

function PollDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState(null)

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
        </div>
    )
}

export default PollDetail