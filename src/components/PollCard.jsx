function PollCard({ poll }) {
    return (
        <div className="card">
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
        </div>
    );
}

export default PollCard;