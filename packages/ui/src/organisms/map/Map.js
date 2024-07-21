import { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
// import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { Button } from '../../atoms'
import useUpload from '../../../../../apps/client/helper/hooks/upload'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [markerLngLat, setMarkerLngLat] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  const { address, setAddress } = useUpload()

  const getCityName = async (longitude, latitude) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`,
    )
    const data = await response.json()
    const cityName = data.features[1].place_name
    return cityName
  }

  // get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation([position.coords.longitude, position.coords.latitude])
        getCityName(position.coords.longitude, position.coords.latitude).then(
          res => setAddress(res),
        )
      },
      error => {
        console.error(error)
      },
    )
  }, [])

  // map instance
  useEffect(() => {
    if (userLocation) {
      const mapInstance = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: userLocation, // set center to user location if available, otherwise Phnom Penh
        zoom: 10,
      })

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })

      // add geocoder (search)
      mapInstance.addControl(geocoder)

      // listen to geocdoer actions
      geocoder.on('result', event => {
        // Get the location value from the event
        const locationValue = event.result.place_name
        const lngLat = event.result.geometry.coordinates

        setAddress(locationValue)
      })

      // fullscreen
      mapInstance.addControl(new mapboxgl.FullscreenControl())

      // geolocate control and get current lng lat
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })

      // Add the geolocate control to the map
      mapInstance.addControl(geolocate)

      // Listen for the geolocate event
      geolocate.on('geolocate', async event => {
        // Get the longitude and latitude values
        const { longitude, latitude } = event.coords
        const cityName = await getCityName(longitude, latitude)
        setAddress(cityName)
      })

      // navigation control
      mapInstance.addControl(new mapboxgl.NavigationControl())

      setMap(mapInstance)

      new mapboxgl.Marker().setLngLat(userLocation).addTo(mapInstance)

      return () => {
        mapInstance.remove()
      }
    }
  }, [userLocation])

  useEffect(() => {
    if (map) {
      const onClick = async e => {
        // Get the coordinates of the click
        const lngLat = [e.lngLat.lng, e.lngLat.lat]

        // Get the city name from the coordinates
        const cityName = await getCityName(lngLat[0], lngLat[1])

        if (!marker) {
          // Create a new marker instance and add it to the map
          const newMarker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(lngLat)
            .addTo(map)

          setMarker(newMarker)
          setMarkerLngLat(lngLat)
          setAddress(cityName)
        } else {
          //set new lat-long
          marker.setLngLat(lngLat)
          setMarkerLngLat(lngLat)
          setAddress(cityName)
        }
      }

      // Add or remove a click listener to the map based on the marker's presence
      if (marker) {
        map.off('click', onClick)
      } else {
        map.on('click', onClick)
      }

      // Clean up the click listener
      return () => {
        map.off('click', onClick)
      }
    }
  }, [map, marker])

  // Update the marker's position when the user clicks on the map
  useEffect(() => {
    if (map && marker) {
      const onClick = async e => {
        // Get the coordinates of the click
        const lngLat = [e.lngLat.lng, e.lngLat.lat]

        // Get the city name from the coordinates
        const cityName = await getCityName(lngLat[0], lngLat[1])

        //set new lat-long
        marker.setLngLat(lngLat)

        setMarkerLngLat(lngLat)
        setAddress(cityName)
      }

      // Add a click listener to the map
      map.on('click', onClick)

      // Clean up the click listener
      return () => {
        map.off('click', onClick)
      }
    }
  }, [map, marker])

  return (
    <div>
      {userLocation && (
        <div
          id="map-container"
          style={{
            width: '95%',
            height: '300px',
            backgroundColor: 'gray',
            borderRadius: '10px',
          }}
        ></div>
      )}
    </div>
  )
}

export default Map
