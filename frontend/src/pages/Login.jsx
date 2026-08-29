import { useState } from 'react'
import './Login.css'
import wariLogo from '../assets/wari-logo.png'

function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      phone,
      password,
    })

    alert('Login submitted successfully!')
  }

  return (
    <div className="login-page">

      <div className="login-card">

        {/* WariSeva Branding */}
        <div className="login-brand">

          <div className="login-logo">
            <img
              src={wariLogo}
              alt="WariSeva Logo"
            />
          </div>

          <div>
            <h1>WariSeva</h1>
            <p>VOLUNTEER ALLOTMENT SYSTEM</p>
          </div>

        </div>


        {/* Welcome */}
        <div className="login-heading">

          <h2>WELCOME</h2>

          <p>Login to continue to WariSeva</p>

        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Phone Number */}
          <div className="login-field">

            <label>Phone Number</label>

            <div className="input-wrapper">

              <span className="input-icon">
                
              </span>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter your phone number"
                maxLength="10"
                required
              />

            </div>

          </div>


          {/* Password */}
          <div className="login-field">

            <label>Password</label>

            <div className="input-wrapper">

              <span className="input-icon">
                
              </span>

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? '◉' : '◌'}
              </button>

            </div>

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>


        {/* Registration */}
        <div className="login-register">

          <div className="or-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <p className="account-text">
            Don't have an account?
          </p>

          <button
            className="register-button"
            onClick={() =>
              window.location.href =
                '/volunteer-registration'
            }
          >
            Register as Volunteer
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login