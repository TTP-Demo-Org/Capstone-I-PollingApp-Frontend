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
    <div className="poll-page">
      <button className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Polls
      </button>

      <section className="poll-card" style={{ paddingTop: "20px" }}>
        <h1 style={{ paddingBottom: "20px" }}>Create a Poll</h1>
        <form className="options-list" onSubmit={handleSubmit}>
          <input
            className="option-row"
            type="text"
            placeholder="Poll Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="option-row"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {options.map((opt, index) => (
            <input
              className="option-row"
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}

          <button className="option-row selected" type="button" onClick={addOption}>+ Add another option</button>

          <button className="submit-button" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Poll"}
          </button>

          {error && <p>{error}</p>}
        </form>
      </section>
    </div>
  )
}

export default CreatePoll