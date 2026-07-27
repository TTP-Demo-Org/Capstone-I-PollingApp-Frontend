import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

function PollDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/polls/${id}`;

    async function loadPoll() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load polls!");
        const data = await res.json();
        setPoll(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPoll();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error && !poll) {
    return <p>Error: {error}</p>;
  }

  async function handleSubmit() {
    const url = `${import.meta.env.VITE_API_URL}/polls/${id}/vote`;

    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId: selectedOption, email: email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEmailError(data.error || "Failed to submit vote!");
        return;
      }

      navigate(`/poll/${id}/results`);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCopyLink() {
  navigator.clipboard.writeText(window.location.href);
  setCopied(true);
  setTimeout(() => setCopied(false), 3000);
}

  

    return (
    <div className="poll-page">
      <div className="poll-top-bar">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Polls
        </button>
        <button className="copy-link-button" onClick={handleCopyLink}>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>

      <section className="poll-card">
        <h1>{poll.title}</h1>
        <p className="poll-description">{poll.description}</p>

        <div className="options-list">
          {poll.Options.map((option) => (
            <label
              key={option.id}
              className={
                selectedOption === option.id
                  ? "option-row selected"
                  : "option-row"
              }
            >
              <input
                type="radio"
                className="hidden-input"
                name="pollOption"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
              />

              <span>{option.text}</span>
            </label>
          ))}
        </div>

        <label className="email-label">
          Email address
          <input
            className="email-input"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);

              if (newEmail && !emailPattern.test(newEmail)) {
                setEmailError("Please enter a valid email address.");
              } else {
                setEmailError("");
              }
            }}
          />
        </label>

        {emailError && <p className="error-message">{emailError}</p>}

        <button
          className="submit-button"
          disabled={!selectedOption}
          onClick={handleSubmit}
        >
          Submit vote
        </button>

        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}

export default PollDetail;
