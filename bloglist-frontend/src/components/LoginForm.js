import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div className="login-form">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
