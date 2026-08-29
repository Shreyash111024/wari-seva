import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'

import VolunteerRegistration from './pages/VolunteerRegistration'
import CoordinatorTaskCreation from './pages/CoordinatorTaskCreation'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import wariLogo from './assets/wari-logo.png'


function Home() {
  const navigate = useNavigate()

  return (
    <div className="app">

      {/* Decorative Wari flags */}
      <div className="flags">
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
      </div>


      {/* Header */}
      <header className="header">

        <div className="logo-section">

          <div className="logo-circle">

            <img
              src={wariLogo}
              alt="WariSeva Logo"
              className="wari-logo"
            />

          </div>

          <div>

            <h2>WariSeva</h2>

            <p>
              VOLUNTEER ALLOTMENT SYSTEM
            </p>

          </div>

        </div>


        {/* Login */}
        <button
          className="login-btn"
          onClick={() => navigate('/login')}
        >
          Login
        </button>

      </header>


      {/* Main Content */}
      <main>

        {/* Hero Section */}
        <section className="hero">

          <div className="hero-content">

            <div className="small-title">
              &nbsp; SMART VOLUNTEER MANAGEMENT
            </div>

            <h1>
              Serve the Wari.
              <br />
              <span>Make a Difference.</span>
            </h1>

            <p className="description">
              Connect volunteers with meaningful tasks and help
              make the Wari experience safer, smoother and
              more organized.
            </p>

            <div className="hero-buttons">

              {/* Volunteer Registration */}
              <button
                className="primary-btn"
                onClick={() =>
                  navigate('/volunteer-registration')
                }
              >
                Volunteer Registration
              </button>


              {/* Coordinator Task Creation */}
              <button
                className="secondary-btn"
                onClick={() =>
                  navigate('/coordinator-task-creation')
                }
              >
                Coordinator Task Creation
              </button>

            </div>

          </div>

        </section>


        {/* Features */}
        <section className="features-section">

          <h2>
            How Wari-Seva Helps
          </h2>

          <div className="decorative-line">
            ◆
          </div>

          <div className="features">

            <div className="feature-card">

              <div className="feature-icon">
                👥
              </div>

              <h3>
                Volunteer Management
              </h3>

              <p>
                Register and manage volunteers
                in one place.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📋
              </div>

              <h3>
                Smart Task Assignment
              </h3>

              <p>
                Match volunteers with tasks based on
                their skills and availability.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📍
              </div>

              <h3>
                Location Support
              </h3>

              <p>
                Find tasks and volunteers using
                location-based information.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer>
        © 2026 Wari-Seva | Smart Volunteer & Task Management
      </footer>

    </div>
  )
}


/* =========================
   APP ROUTES
========================= */

function App() {

  return (

    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />


      {/* Volunteer Registration */}
      <Route
        path="/volunteer-registration"
        element={<VolunteerRegistration />}
      />


      {/* Coordinator Task Creation */}
      <Route
        path="/coordinator-task-creation"
        element={<CoordinatorTaskCreation />}
      />


      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />


      {/* Volunteer Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

    </Routes>

  )
}


export default App