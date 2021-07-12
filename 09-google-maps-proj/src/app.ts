// Axios comes with a *.d.ts file
import axios from 'axios'
import { Loader } from '@googlemaps/js-api-loader'

const form = document.querySelector('form') as HTMLFormElement
const address = form.querySelector('#address') as HTMLInputElement
const API_KEY = process.env.API_KEY
const GEOCODE_URL = process.env.GEOCODE_URL
const loader = new Loader({
  apiKey: `${API_KEY}`,
  version: 'weekly',
})

type GeocodeResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[]
  status: 'OK' | 'ZERO_RESULTS'
}

// const google comes from @googlemaps. We need to let TS know it exists
// declare const google: any
// OR install @types/googlemaps
const renderMap = (coords: { lat: number; lng: number }) => {
  loader.load().then(() => {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: coords,
        zoom: 12,
      }
    )

    new google.maps.Marker({
      position: coords,
      map,
      title: 'Hello World!',
    })
  })
}

const handleAddressSubmit = (e: Event) => {
  e.preventDefault()
  const enteredAddress = address.value

  axios
    .get<GeocodeResponse>(
      `${GEOCODE_URL}?address=${encodeURI(enteredAddress)}&key=${API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== 'OK') {
        throw new Error('Could not fetch location')
      }
      const coords = res.data.results[0].geometry.location
      renderMap(coords)
    })
    .catch((err) => {
      alert(err.message)
      console.log(err)
    })
}

form.addEventListener('submit', handleAddressSubmit)

console.log(GEOCODE_URL)
