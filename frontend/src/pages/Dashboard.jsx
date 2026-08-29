import { useState } from 'react'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: 'Medical Assistance',
      description: 'Provide basic medical support to Wari pilgrims.',
      location: 'Bhavani Peth, Pune',
      dates: ['9 July', '10 July'],
      startTime: '09:00',
      endTime: '13:00',
      requiredVolunteers: 5,
      status: 'new',
    },
    {
      id: 2,
      taskName: 'Water Distribution',
      description: 'Help distribute drinking water to pilgrims.',
      location: 'Hadapsar, Pune',
      dates: ['10 July'],
      startTime: '15:00',
      endTime: '18:00',
      requiredVolunteers: 6,
      status: 'new',
    },
    {
      id: 3,
      taskName: 'Crowd Management',
      description: 'Assist coordinators with crowd guidance.',
      location: 'Nana Peth, Pune',
      dates: ['11 July'],
      startTime: '06:00',
      endTime: '10:00',
      requiredVolunteers: 4,
      status: 'new',
    },
  ])

  const [message, setMessage] = useState('')

  const acceptTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: 'accepted' }
          : task
      )
    )

    setMessage('Task accepted successfully!')
  }

  const reportTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: 'reported' }
          : task
      )
    )

    setMessage(
      'Task reported successfully. Your activity can now contribute to the Pune volunteer heatmap.'
    )
  }

  const declineTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    )
  }

  const formatTime = (time) => {
    if (!time) return ''

    const [hour, minute] = time.split(':')
    const hourNumber = Number(hour)

    const period = hourNumber >= 12 ? 'PM' : 'AM'
    const displayHour =
      hourNumber % 12 === 0 ? 12 : hourNumber % 12

    return `${displayHour}:${minute} ${period}`
  }

  return (
    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================== */}

      <header className="dashboard-header">

        <div className="dashboard-brand">

          <div className="dashboard-logo">
            🪷
          </div>

          <div>
            <h1>WariSeva</h1>
            <p>VOLUNTEER DASHBOARD</p>
          </div>

        </div>


        <div className="dashboard-user">

          <span>Welcome, Volunteer</span>

          <button
            className="logout-button"
            onClick={() => alert('Logged out')}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =========================
          SUCCESS MESSAGE
      ========================== */}

      {message && (

        <div className="dashboard-message">

          <span className="success-icon">
            ✓
          </span>

          <span>
            {message}
          </span>

          <button
            onClick={() => setMessage('')}
          >
            ×
          </button>

        </div>

      )}


      <main className="dashboard-content">


        {/* =========================
            WELCOME SECTION
        ========================== */}

        <section className="welcome-section">

          <div>

            <p className="welcome-label">
              WARI VOLUNTEER SERVICE
            </p>

            <h2>
              Welcome to your
              <br />
              <span>Volunteer Dashboard</span>
            </h2>

            <p className="welcome-text">
              Find tasks matched to your preferences,
              accept suitable tasks and contribute to
              a safer and better organized Wari.
            </p>

          </div>


          <div className="task-count">

            <strong>
              {
                tasks.filter(
                  (task) => task.status === 'new'
                ).length
              }
            </strong>

            <span>
              New Task Alerts
            </span>

          </div>

        </section>


        {/* =========================
            TASK ALERTS
        ========================== */}

        <section className="tasks-section">

          <div className="section-header">

            <div>

              <p className="section-label">
                NOTIFICATIONS
              </p>

              <h2>
                🔔 New Task Alerts
              </h2>

            </div>

            <span className="live-badge">
              ● LIVE
            </span>

          </div>


          <div className="tasks-grid">

            {tasks.length === 0 ? (

              <div className="no-tasks">
                <div>✓</div>
                <h3>No new tasks</h3>
                <p>
                  We'll notify you when a suitable
                  task becomes available.
                </p>
              </div>

            ) : (

              tasks.map((task) => (

                <div
                  className={`task-card ${
                    task.status === 'accepted'
                      ? 'accepted-card'
                      : task.status === 'reported'
                      ? 'reported-card'
                      : ''
                  }`}
                  key={task.id}
                >

                  {/* Card Top */}

                  <div className="task-card-top">

                    <span
                      className={`task-badge ${
                        task.status === 'accepted'
                          ? 'accepted-badge'
                          : task.status === 'reported'
                          ? 'reported-badge'
                          : ''
                      }`}
                    >

                      {task.status === 'new'
                        ? 'NEW TASK'
                        : task.status === 'accepted'
                        ? 'ACCEPTED'
                        : 'REPORTED'}

                    </span>

                  </div>


                  {/* Task Title */}

                  <h3>
                    {task.taskName}
                  </h3>


                  {task.status === 'new' && (

                    <p className="task-description">
                      {task.description}
                    </p>

                  )}


                  {/* =========================
                      NEW TASK
                  ========================== */}

                  {task.status === 'new' && (

                    <>

                      <div className="task-info">

                        <div>
                          <span>📍</span>
                          <span>
                            {task.location}
                          </span>
                        </div>

                        <div>
                          <span>📅</span>
                          <span>
                            {task.dates.join(', ')}
                          </span>
                        </div>

                        <div>
                          <span>🕐</span>
                          <span>
                            {formatTime(task.startTime)}
                            {' - '}
                            {formatTime(task.endTime)}
                          </span>
                        </div>

                        <div>
                          <span>👥</span>
                          <span>
                            {task.requiredVolunteers}
                            {' volunteers required'}
                          </span>
                        </div>

                      </div>


                      <div className="task-actions">

                        <button
                          className="accept-button"
                          onClick={() =>
                            acceptTask(task.id)
                          }
                        >
                          Accept Task
                        </button>

                        <button
                          className="decline-button"
                          onClick={() =>
                            declineTask(task.id)
                          }
                        >
                          Decline
                        </button>

                      </div>

                    </>

                  )}


                  {/* =========================
                      ACCEPTED TASK
                  ========================== */}

                  {task.status === 'accepted' && (

                    <div className="accepted-details">

                      <div className="accepted-title">
                        ✓ Task Accepted Successfully
                      </div>


                      <div className="detail-row">

                        <span>📍</span>

                        <div>
                          <small>Location</small>
                          <strong>
                            {task.location}
                          </strong>
                        </div>

                      </div>


                      <div className="detail-row">

                        <span>📅</span>

                        <div>
                          <small>Date</small>
                          <strong>
                            {task.dates.join(', ')}
                          </strong>
                        </div>

                      </div>


                      <div className="detail-row">

                        <span>🕐</span>

                        <div>
                          <small>Time</small>
                          <strong>
                            {formatTime(task.startTime)}
                            {' - '}
                            {formatTime(task.endTime)}
                          </strong>
                        </div>

                      </div>


                      <div className="detail-row">

                        <span>👥</span>

                        <div>
                          <small>
                            Volunteers Required
                          </small>

                          <strong>
                            {task.requiredVolunteers}
                          </strong>

                        </div>

                      </div>


                      <div className="confirmed-status">
                        STATUS: CONFIRMED
                      </div>


                      <button
                        className="report-button"
                        onClick={() =>
                          reportTask(task.id)
                        }
                      >
                        ✓ Report Task
                      </button>

                    </div>

                  )}


                  {/* =========================
                      REPORTED TASK
                  ========================== */}

                  {task.status === 'reported' && (

                    <div className="reported-details">

                      <div className="reported-success">

                        <div className="reported-icon">
                          ✓
                        </div>

                        <div>

                          <strong>
                            Task Reported Successfully
                          </strong>

                          <p>
                            Your volunteer activity has
                            been recorded for the Pune
                            Wari volunteer heatmap.
                          </p>

                        </div>

                      </div>


                      <div className="completed-task-info">

                        <div>
                          📍 {task.location}
                        </div>

                        <div>
                          📅 {task.dates.join(', ')}
                        </div>

                        <div>
                          🕐 {formatTime(task.startTime)}
                          {' - '}
                          {formatTime(task.endTime)}
                        </div>

                      </div>

                    </div>

                  )}

                </div>

              ))

            )}

          </div>

        </section>


        {/* =========================
            PUNE MAP PREVIEW
        ========================== */}

        <section className="map-preview-section">

          <div className="section-header">

            <div>

              <p className="section-label">
                LOCATION INTELLIGENCE
              </p>

              <h2>
                🗺️ Pune Wari Volunteer Map
              </h2>

            </div>

            <span className="pune-badge">
              PUNE ONLY
            </span>

          </div>


          <p className="map-text">
            Volunteer activity and task coverage
            across the Pune Wari route.
          </p>


          <div className="pune-map">

            <div className="map-overlay">

              <div className="map-title">
                Pune Wari Route
              </div>

              <div className="map-subtitle">
                Volunteer Activity Heatmap
              </div>

            </div>


            {/* Pune route visual */}

            <div className="route route-one"></div>

            <div className="route route-two"></div>


            {/* Heat areas */}

            <div className="heat-point heat-one"></div>

            <div className="heat-point heat-two"></div>

            <div className="heat-point heat-three"></div>

            <div className="heat-point heat-four"></div>


            <div className="map-label label-one">
              Pune
            </div>

            <div className="map-label label-two">
              Hadapsar
            </div>

            <div className="map-label label-three">
              Nana Peth
            </div>


            <div className="map-legend">

              <strong>
                Volunteer Activity
              </strong>

              <div>
                <span className="legend-dot high"></span>
                High
              </div>

              <div>
                <span className="legend-dot medium"></span>
                Medium
              </div>

              <div>
                <span className="legend-dot low"></span>
                Low
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            HOW IT WORKS
        ========================== */}

        <section className="how-section">

          <h2>
            How WariSeva Works
          </h2>

          <div className="how-grid">

            <div className="how-card">

              <div className="how-number">
                01
              </div>

              <h3>
                Receive Alert
              </h3>

              <p>
                Get notified when a task matches
                your preferences.
              </p>

            </div>


            <div className="how-card">

              <div className="how-number">
                02
              </div>

              <h3>
                Accept Task
              </h3>

              <p>
                Review the task details and
                confirm your participation.
              </p>

            </div>


            <div className="how-card">

              <div className="how-number">
                03
              </div>

              <h3>
                Report Activity
              </h3>

              <p>
                Report your completed activity
                after serving the task.
              </p>

            </div>


            <div className="how-card">

              <div className="how-number">
                04
              </div>

              <h3>
                Improve Coverage
              </h3>

              <p>
                Activity reports help build
                volunteer coverage insights.
              </p>

            </div>

          </div>

        </section>

      </main>


      <footer className="dashboard-footer">

        © 2026 WariSeva | Pune Wari Volunteer Management

      </footer>

    </div>
  )
}

export default Dashboard