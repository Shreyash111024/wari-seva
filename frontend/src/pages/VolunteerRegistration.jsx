import { useState } from 'react'
import './VolunteerRegistration.css'

function VolunteerRegistration() {
  const [location, setLocation] = useState({
    address: '',
    latitude: '',
    longitude: '',
  })

  const [locationMessage, setLocationMessage] = useState('')

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Location is not supported by this browser.')
      return
    }

    setLocationMessage('Getting your location...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          address: '',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })

        setLocationMessage('Location captured successfully.')
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

  return (
    <div className="registration-page">

      <div className="registration-card">

        {/* Header */}
        <div className="registration-header">

          <div className="registration-logo">
            ↑
          </div>

          <div>
            <h1>Volunteer Registration</h1>
            <p>
              Join WariSeva and serve the Wari community
            </p>
          </div>

        </div>

        <form className="registration-form">

          {/* =========================
              PERSONAL INFORMATION
          ========================== */}

          <h2>Personal Information</h2>

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
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
              />
            </div>

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
            />

          </div>


          {/* =========================
              LOCATION
          ========================== */}

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

          {location.latitude && location.longitude && (
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


          {/* =========================
              SKILLS
          ========================== */}

          <h2>Skills / Services</h2>

          <div className="checkbox-grid">

            <label className="checkbox">
              <input type="checkbox" name="skills" value="Medical Assistance" />
              Medical Assistance
            </label>

            <label className="checkbox">
              <input type="checkbox" name="skills" value="Crowd Management" />
              Crowd Management
            </label>

            <label className="checkbox">
              <input type="checkbox" name="skills" value="Food Distribution" />
              Food Distribution
            </label>

            <label className="checkbox">
              <input type="checkbox" name="skills" value="Water Distribution" />
              Water Distribution
            </label>

            <label className="checkbox">
              <input type="checkbox" name="skills" value="First Aid" />
              First Aid
            </label>

            <label className="checkbox">
              <input type="checkbox" name="skills" value="General Assistance" />
              General Assistance
            </label>

          </div>


          {/* =========================
              LANGUAGES
          ========================== */}

          <h2>Languages</h2>

          <div className="checkbox-grid">

            <label className="checkbox">
              <input type="checkbox" name="languages" value="Marathi" />
              Marathi
            </label>

            <label className="checkbox">
              <input type="checkbox" name="languages" value="Hindi" />
              Hindi
            </label>

            <label className="checkbox">
              <input type="checkbox" name="languages" value="English" />
              English
            </label>

          </div>


          {/* =========================
              AVAILABILITY
          ========================== */}

          <h2>Availability</h2>

          <div className="form-row">

            <div className="form-group">

              <label>Preferred Date</label>

              <div className="date-input-wrapper">

                <input
                  type="date"
                  name="preferredDate"
                  min={
                    new Date()
                      .toISOString()
                      .split('T')[0]
                  }
                />

                <span className="date-placeholder">
                  DD / MM / YYYY
                </span>

                <span className="calendar-icon">
                  📅
                </span>

              </div>

            </div>


            <div className="form-group">

              <label>Availability</label>

              <select name="availability">

                <option value="">
                  Select availability
                </option>

                <option>
                  Full Day
                </option>

                <option>
                  Morning
                </option>

                <option>
                  Afternoon
                </option>

                <option>
                  Evening
                </option>

              </select>

            </div>

          </div>


          <div className="form-group">

            <label>Available Days</label>

            <div className="checkbox-grid">

              <label className="checkbox">
                <input type="checkbox" name="days" value="Monday" />
                Monday
              </label>

              <label className="checkbox">
                <input type="checkbox" name="days" value="Tuesday" />
                Tuesday
              </label>

              <label className="checkbox">
                <input type="checkbox" name="days" value="Wednesday" />
                Wednesday
              </label>

              <label className="checkbox">
                <input type="checkbox" name="days" value="Thursday" />
                Thursday
              </label>

              <label className="checkbox">
                <input type="checkbox" name="days" value="Friday" />
                Friday
              </label>

              <label className="checkbox">
                <input type="checkbox" name="days" value="Saturday" />
                Saturday
              </label>

              <label className="checkbox">
                <input type="checkbox" name="days" value="Sunday" />
                Sunday
              </label>

            </div>

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>Start Time</label>

              <input
                type="time"
                name="startTime"
              />

            </div>

            <div className="form-group">

              <label>End Time</label>

              <input
                type="time"
                name="endTime"
              />

            </div>

          </div>


          {/* =========================
              ADDITIONAL INFORMATION
          ========================== */}

          <h2>Additional Information</h2>

          <label className="checkbox large-checkbox">

            <input
              type="checkbox"
              name="hasVehicle"
            />

            I have a vehicle

          </label>

          <label className="checkbox large-checkbox">

            <input
              type="checkbox"
              name="physicallyFit"
            />

            I am physically fit for volunteer work

          </label>

          <label className="checkbox large-checkbox">

            <input
              type="checkbox"
              name="canWorkOutdoors"
            />

            I can work outdoors

          </label>


          {/* =========================
              REGISTER
          ========================== */}

          <button
            type="submit"
            className="register-button"
          >
            Register as Volunteer
          </button>

        </form>

      </div>

    </div>
  )
}

export default VolunteerRegistration