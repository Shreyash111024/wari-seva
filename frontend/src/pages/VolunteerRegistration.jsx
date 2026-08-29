import { useState } from 'react'
import './VolunteerRegistration.css'
import wariLogo from '../assets/wari-logo.png'

function VolunteerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    skills: [],
    languages: [],
    selectedDates: [],
    startTime: '',
    endTime: '',
  })

  const [location, setLocation] = useState({
    address: '',
    latitude: '',
    longitude: '',
  })

  const [locationMessage, setLocationMessage] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableDates = [
    '9 July',
    '10 July',
    '11 July',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSkillChange = (e) => {
    const { value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }))
  }

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      languages: checked
        ? [...prev.languages, value]
        : prev.languages.filter((language) => language !== value),
    }))
  }

  const handleDateChange = (e) => {
    const { value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      selectedDates: checked
        ? [...prev.selectedDates, value]
        : prev.selectedDates.filter((date) => date !== value),
    }))
  }

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
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    if (formData.selectedDates.length === 0) {
      setError('Please select at least one date.')
      return
    }

    if (!location.address) {
      setError('Please enter your address.')
      return
    }

    if (!location.latitude || !location.longitude) {
      setError('Please capture your current location.')
      return
    }

    setIsSubmitting(true)

    const volunteerData = {
      volunteerId: `V${Date.now()}`,

      name: formData.name,
      age: Number(formData.age),
      phone: formData.phone,

      location: {
        address: location.address,
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
      },

      skills: formData.skills,

      languages: formData.languages,

      availability: {
        preferredDate: formData.selectedDates.join(', '),
        type: 'Full Day',
        days: [],
        startTime: formData.startTime,
        endTime: formData.endTime,
      },

      status: 'available',
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/volunteers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(volunteerData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Volunteer registration failed'
        )
      }

      setMessage('Volunteer registered successfully!')

      setFormData({
        name: '',
        age: '',
        phone: '',
        skills: [],
        languages: [],
        selectedDates: [],
        startTime: '',
        endTime: '',
      })

      setLocation({
        address: '',
        latitude: '',
        longitude: '',
      })

      setLocationMessage('')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="registration-page">

      <div className="registration-card">

        {/* HEADER */}
        <div className="registration-header">

          <div className="logo-circle">
            <img
              src={wariLogo}
              alt="WariSeva Logo"
            />
          </div>

          <div>
            <h1>Volunteer Registration</h1>

            <p>
              Join WariSeva and serve the Wari community
            </p>
          </div>

        </div>


        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >

          {/* PERSONAL INFORMATION */}
          <h2>Personal Information</h2>

          <div className="form-row">

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                min="1"
                max="100"
                value={formData.age}
                onChange={handleInputChange}
                required
              />

            </div>

          </div>


          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              maxLength="10"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

          </div>


          {/* LOCATION */}
          <h2>Location</h2>

          <div className="form-group">

            <label>Address</label>

            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={location.address}
              onChange={(e) =>
                setLocation({
                  ...location,
                  address: e.target.value,
                })
              }
              required
            />

          </div>


          <button
            type="button"
            className="location-button"
            onClick={getCurrentLocation}
          >
            📍 Use My Current Location
          </button>


          {locationMessage && (
            <p className="location-message">
              {locationMessage}
            </p>
          )}


          {location.latitude &&
            location.longitude && (

              <div className="coordinates">

                <p>
                  <strong>Latitude:</strong>{' '}
                  {location.latitude}
                </p>

                <p>
                  <strong>Longitude:</strong>{' '}
                  {location.longitude}
                </p>

              </div>

            )}


          {/* SKILLS */}
          <h2>Skills / Services</h2>

          <div className="checkbox-grid">

            <label className="checkbox">
              <input
                type="checkbox"
                value="Medical Assistance"
                checked={formData.skills.includes(
                  'Medical Assistance'
                )}
                onChange={handleSkillChange}
              />
              Medical Assistance
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="Crowd Management"
                checked={formData.skills.includes(
                  'Crowd Management'
                )}
                onChange={handleSkillChange}
              />
              Crowd Management
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="Food Distribution"
                checked={formData.skills.includes(
                  'Food Distribution'
                )}
                onChange={handleSkillChange}
              />
              Food Distribution
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="Water Distribution"
                checked={formData.skills.includes(
                  'Water Distribution'
                )}
                onChange={handleSkillChange}
              />
              Water Distribution
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="First Aid"
                checked={formData.skills.includes(
                  'First Aid'
                )}
                onChange={handleSkillChange}
              />
              First Aid
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="General Assistance"
                checked={formData.skills.includes(
                  'General Assistance'
                )}
                onChange={handleSkillChange}
              />
              General Assistance
            </label>

          </div>


          {/* LANGUAGES */}
          <h2>Languages</h2>

          <div className="checkbox-grid">

            <label className="checkbox">
              <input
                type="checkbox"
                value="Marathi"
                checked={formData.languages.includes(
                  'Marathi'
                )}
                onChange={handleLanguageChange}
              />
              Marathi
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="Hindi"
                checked={formData.languages.includes(
                  'Hindi'
                )}
                onChange={handleLanguageChange}
              />
              Hindi
            </label>


            <label className="checkbox">
              <input
                type="checkbox"
                value="English"
                checked={formData.languages.includes(
                  'English'
                )}
                onChange={handleLanguageChange}
              />
              English
            </label>

          </div>


          {/* DATE SELECTION */}
          <h2>Available Dates</h2>

          <p>
            Select one or more dates you are available.
          </p>

          <div className="checkbox-grid">

            {availableDates.map((date) => (
              <label
                className="checkbox"
                key={date}
              >
                <input
                  type="checkbox"
                  value={date}
                  checked={formData.selectedDates.includes(
                    date
                  )}
                  onChange={handleDateChange}
                />

                {date}
              </label>
            ))}

          </div>


          {/* TIME */}
          <h2>Availability Time</h2>

          <div className="form-row">

            <div className="form-group">

              <label>
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />

            </div>

          </div>


          {/* ERROR / SUCCESS */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}


          {/* REGISTER */}
          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Registering...'
              : 'Register as Volunteer'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default VolunteerRegistration