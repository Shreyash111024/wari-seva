import { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState('')

  const loggedInVolunteer = JSON.parse(
    localStorage.getItem('loggedInVolunteer') || 'null'
  )

 console.log(
  'LOGGED IN VOLUNTEER:',
  JSON.stringify(loggedInVolunteer, null, 2)
)

 useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/tasks'
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to fetch tasks'
        )
      }

      const formattedTasks = (data.tasks || [])
        .filter((task) => task.status === 'open')
        .map((task) => ({
          id: task.taskId,
          taskId: task.taskId,
          taskName: task.taskName,
          description: task.description,
          location:
            task.location?.address || 'Pune',

          dates: (task.preferredDates || []).map((date) => {
            if (date === '2026-07-09') return '9 July'
            if (date === '2026-07-10') return '10 July'
            if (date === '2026-07-11') return '11 July'

            return date
          }),

          startTime: task.time?.start || '',
          endTime: task.time?.end || '',

          requiredVolunteers:
            task.requiredVolunteers,

          status: 'new'
        }))

      console.log(
        'TASKS FROM DATABASE:',
        formattedTasks
      )

      setTasks(formattedTasks)

    } catch (error) {
      console.error(
        'Fetching tasks failed:',
        error
      )
    }
  }

  fetchTasks()
}, [])

  const acceptTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: 'accepted' }
          : task
      )
    )

    setMessage(
      'Task accepted successfully!'
    )
  }

  const reportTask = (id) => {
  const task = tasks.find((task) => task.id === id)

  if (!task) return

  setTasks((previousTasks) =>
    previousTasks.map((task) =>
      task.id === id
        ? { ...task, status: 'reported' }
        : task
    )
  )

  alert(
    `Task: ${task.taskName}\n\nReported Successfully!\nYour activity has been reported.`
  )
}

  const declineTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== id
      )
    )
  }

  const formatTime = (time) => {
    if (!time) return ''

    const [hour, minute] =
      time.split(':')

    const hourNumber = Number(hour)

    const period =
      hourNumber >= 12 ? 'PM' : 'AM'

    const displayHour =
      hourNumber % 12 === 0
        ? 12
        : hourNumber % 12

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
            <p>
              VOLUNTEER DASHBOARD
            </p>
          </div>

        </div>

        <div className="dashboard-user">

          <span>
            Welcome, Volunteer
          </span>

          <button
            className="logout-button"
            onClick={() =>
              alert('Logged out')
            }
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
            onClick={() =>
              setMessage('')
            }
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
              <span>
                Volunteer Dashboard
              </span>
            </h2>

            <p className="welcome-text">
              Find tasks matched to your
              preferences, accept suitable
              tasks and contribute to a safer
              and better organized Wari.
            </p>

          </div>


          <div className="task-count">

            <strong>
              {
                tasks.filter(
                  (task) =>
                    task.status === 'new'
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

                <h3>
                  No new tasks
                </h3>

                <p>
                  We'll notify you when a
                  suitable task becomes
                  available.
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
                      {task.status === 'accepted'
                        ? 'ACCEPTED'
                        : task.status === 'reported'
                        ? 'REPORTED'
                        : 'NEW'}
                    </span>

                  </div>


                  {/* Task Information */}

                  <h3 className="task-title">
                    {task.taskName}
                  </h3>

                  <p className="task-description">
                    {task.description}
                  </p>


                  <div className="task-details">

                    <div className="task-detail">
                      <span>📍</span>
                      <span>
                        {task.location}
                      </span>
                    </div>


                    <div className="task-detail">
                      <span>📅</span>
                      <span>
                        {task.dates.join(', ')}
                      </span>
                    </div>


                    <div className="task-detail">
                      <span>⏰</span>
                      <span>
                        {formatTime(
                          task.startTime
                        )}
                        {' - '}
                        {formatTime(
                          task.endTime
                        )}
                      </span>
                    </div>


                    <div className="task-detail">
                      <span>👥</span>
                      <span>
                        {task.requiredVolunteers}
                        {' volunteers required'}
                      </span>
                    </div>

                  </div>


                  {/* Buttons */}

                  <div className="task-actions">

                    {task.status === 'new' && (

                      <>
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
                      </>

                    )}


                    {task.status === 'accepted' && (

                      <button
                        className="report-button"
                        onClick={() =>
                          reportTask(task.id)
                        }
                      >
                        Report Activity
                      </button>

                    )}

                  </div>

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
        ACTIVITY COVERAGE
      </p>

      <h2>
        🗺️ Pune Wari Volunteer Map
      </h2>

    </div>

    <span className="live-badge">
      ● LIVE
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

    {/* Wari route */}

    <div className="route route-one"></div>
    <div className="route route-two"></div>

    {/* Heat areas */}

    <div className="heat-point heat-one"></div>
    <div className="heat-point heat-two"></div>
    <div className="heat-point heat-three"></div>
    <div className="heat-point heat-four"></div>

    {/* Locations */}

    <div className="map-label label-one">
      Pune
    </div>

    <div className="map-label label-two">
      Hadapsar
    </div>

    <div className="map-label label-three">
      Nana Peth
    </div>

    {/* Legend */}

    <div className="map-legend">

      <strong>
        Volunteer Activity
      </strong>

      <div className="legend-item">
        <span className="legend-dot high"></span>
        High
      </div>

      <div className="legend-item">
        <span className="legend-dot medium"></span>
        Medium
      </div>

      <div className="legend-item">
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

          <p className="section-label">
            SIMPLE PROCESS
          </p>

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
                Get notified when a task
                matches your preferences.
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