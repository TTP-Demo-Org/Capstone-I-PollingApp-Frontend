import { useState } from "react"
import { useNavigate } from "react-router"

function CreatePoll() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [options, setOptions] = useState(["", ""])  // start with 2 blank options
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleOptionChange(index, value) {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  function addOption() {
    setOptions([...options, ""])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const cleanOptions = options.filter(opt => opt.trim() !== "")
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    if (cleanOptions.length < 2) {
      setError("At least 2 options are needed")
      return
    }

    setSubmitting(true)
    const url = `https://capstone-i-pollingapp-backend.onrender.com/polls`

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, options: cleanOptions })
      })
      if (!res.ok) throw new Error("Failed to create poll")
      const data = await res.json()
      navigate(`/poll/${data.poll.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <h1>Create a Poll</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Poll title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}

        <button type="button" onClick={addOption}>+ Add another option</button>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Poll"}
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default CreatePoll