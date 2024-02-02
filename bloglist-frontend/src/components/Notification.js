import PropTypes from 'prop-types'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 32,
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 32,
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes('error')) {
    return <div className="error" style={error}>{message.substring(5)}</div>
  }

  return <div className="success" style={success}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification