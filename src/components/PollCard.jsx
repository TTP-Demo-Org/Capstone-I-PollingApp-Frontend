import { Link } from "react-router"

function PollCard({ poll }) {
    return (
        <Link to={`/poll/${poll.id}`} className="card">
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
        </Link>
    );
}

export default PollCard;