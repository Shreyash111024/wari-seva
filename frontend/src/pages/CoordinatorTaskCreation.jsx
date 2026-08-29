import { useState } from 'react'
import './CoordinatorTaskCreation.css'

function CoordinatorTaskCreation() {
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [requiredVolunteers, setRequiredVolunteers] = useState('')

  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [locationMessage, setLocationMessage] = useState('')

  const [requiredSkills, setRequiredSkills] = useState([])
  const [requiredLanguages, setRequiredLanguages] = useState([])

  const [preferredDates, setPreferredDates] = useState([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(
        'Location is not supported by this browser.'
      )
      return
    }

    setLocationMessage('Getting your location...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)

        setLocationMessage(
          'Location captured successfully.'
        )
      },
      (error) => {
        if (error.code === 1) {
          setLocationMessage(
            'Location permission denied. Please allow location access.'
          )
        } else {
          setLocationMessage(
            'Unable to get your location. Please try again.'
          )
        }
      }
    )
  }

  const handleSkillChange = (skill) => {
    setRequiredSkills((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill]
    )
  }

  const handleLanguageChange = (language) => {
    setRequiredLanguages((previous) =>
      previous.includes(language)
        ? previous.filter((item) => item !== language)
        : [...previous, language]
    )
  }

  const handleDateChange = (date) => {
    setPreferredDates((previous) =>
      previous.includes(date)
        ? previous.filter((item) => item !== date)
        : [...previous, date]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (preferredDates.length === 0) {
      alert('Please select at least one preferred date.')
      return
    }

    const taskData = {
      taskId: `T${Date.now()}`,

      taskName,

      description,

      requiredVolunteers: Number(requiredVolunteers),

      location: {
        address,
        latitude:
          latitude === '' ? undefined : Number(latitude),
        longitude:
          longitude === '' ? undefined : Number(longitude),
      },

      requiredSkills,

      requiredLanguages,

      preferredDates,

      time: {
        start: startTime,
        end: endTime,
      },

      status: 'open',
    }

    console.log('TASK DATA:', taskData)

    try {
      const response = await fetch(
        'http://localhost:5000/api/tasks',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(taskData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Task creation failed'
        )
      }

      console.log('TASK CREATED:', data)

      alert('Task created successfully!')

      // Clear form after successful submission
      setTaskName('')
      setDescription('')
      setRequiredVolunteers('')

      setAddress('')
      setLatitude('')
      setLongitude('')
      setLocationMessage('')

      setRequiredSkills([])
      setRequiredLanguages([])

      setPreferredDates([])

      setStartTime('')
      setEndTime('')
    } catch (error) {
      console.error(
        'Task creation error:',
        error
      )

      alert(
        'Task creation failed: ' +
        error.message
      )
    }
  }

  const skills = [
    'First Aid',
    'Medical Assistance',
    'Crowd Management',
    'Food Distribution',
    'Water Distribution',
    'General Assistance',
  ]

  const languages = [
    'Marathi',
    'Hindi',
    'English',
  ]

  const dates = [
    '9 July',
    '10 July',
    '11 July',
  ]

  return (
    <div className="task-page">

      <div className="task-card">

        {/* =========================
            HEADER
        ========================== */}

        <div className="task-header">

          <div className="task-logo">
            📋
          </div>

          <div>
            <h1>Coordinator Task Creation</h1>

            <p>
              Create a volunteer task for the Wari
            </p>
          </div>

        </div>


        <form
          className="task-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              TASK INFORMATION
          ========================== */}

          <h2>Task Information</h2>

          <div className="form-group">

            <label>Task Name</label>

            <input
              type="text"
              value={taskName}
              onChange={(e) =>
                setTaskName(e.target.value)
              }
              placeholder="Enter task name"
              required
            />

          </div>


          <div className="form-group">

            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="4"
              placeholder="Describe the task"
              required
            />

          </div>


          <div className="form-group">

            <label>Required Volunteers</label>

            <input
              type="number"
              value={requiredVolunteers}
              onChange={(e) =>
                setRequiredVolunteers(e.target.value)
              }
              min="1"
              placeholder="Number of volunteers"
              required
            />

          </div>


          {/* =========================
              TASK LOCATION
          ========================== */}

          <h2>Task Location</h2>

          <div className="form-group">

            <label>Address</label>

            <input
              type="text"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter task address"
              required
            />

          </div>


          <button
            type="button"
            className="task-location-button"
            onClick={getCurrentLocation}
          >
            📍 Use Current Location
          </button>


          {locationMessage && (
            <p className="task-location-message">
              {locationMessage}
            </p>
          )}


          {latitude !== '' &&
            longitude !== '' && (

              <div className="task-coordinates">

                <p>
                  <strong>Latitude:</strong>{' '}
                  {latitude}
                </p>

                <p>
                  <strong>Longitude:</strong>{' '}
                  {longitude}
                </p>

              </div>

            )}


          {/* =========================
              REQUIRED SKILLS
          ========================== */}

          <h2>Required Skills</h2>

          <div className="task-checkbox-grid">

            {skills.map((skill) => (

              <label
                className="task-checkbox"
                key={skill}
              >

                <input
                  type="checkbox"
                  checked={requiredSkills.includes(skill)}
                  onChange={() =>
                    handleSkillChange(skill)
                  }
                />

                <span>{skill}</span>

              </label>

            ))}

          </div>


          {/* =========================
              REQUIRED LANGUAGES
          ========================== */}

          <h2>Required Languages</h2>

          <div className="task-checkbox-grid">

            {languages.map((language) => (

              <label
                className="task-checkbox"
                key={language}
              >

                <input
                  type="checkbox"
                  checked={requiredLanguages.includes(language)}
                  onChange={() =>
                    handleLanguageChange(language)
                  }
                />

                <span>{language}</span>

              </label>

            ))}

          </div>


          {/* =========================
              DATE & TIME
          ========================== */}

          <h2>Date & Time</h2>


          {/* Preferred Dates */}

          <div className="form-group">

            <label>Preferred Dates</label>

            <div className="preferred-dates-list">

              {dates.map((date) => (

                <label
                  className="preferred-date-option"
                  key={date}
                >

                  <input
                    type="checkbox"
                    checked={preferredDates.includes(date)}
                    onChange={() =>
                      handleDateChange(date)
                    }
                  />

                  <span>{date}</span>

                </label>

              ))}

            </div>

          </div>


          {/* Start and End Time */}

          <div className="task-form-row">

            <div className="form-group">

              <label>Start Time</label>

              <input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label>End Time</label>

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                required
              />

            </div>

          </div>


          {/* =========================
              CREATE TASK
          ========================== */}

          <button
            type="submit"
            className="create-task-button"
          >
            Create Task
          </button>

        </form>

      </div>

    </div>
  )
}

export default CoordinatorTaskCreation