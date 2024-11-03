const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__content">
        <span className="toast__message">{message}</span>
        <button className="toast__close" onClick={onClose}>×</button>
      </div>
    </div>
  )
}

export default Toast 