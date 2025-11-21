export default function Message({ role, text }) {
    return (
        <div className={`msg ${role}`}>
            <div className="bubble">{text}</div>
        </div>
    )
}
