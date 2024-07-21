import { HomePage } from 'ui'
import { useState, useEffect } from 'react'

function Home() {
  const [userLocation, setUserLocation] = useState([])

  // to get current location of user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation([position.coords.longitude, position.coords.latitude])
      },
      error => {
        console.error(error)
      },
    )
  }, [])

  return <HomePage />
}

export default Home
