import React from "react"

const LoginForm = ({ username,password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <span>Username</span> <input type="text" value={username} name='Username' onChange={handleUsernameChange} data-testid="username"/>
        </div>
        <div>
          <span>Password</span> <input type="password" value={password} name="Password" onChange={handlePasswordChange} data-testid="password"/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm