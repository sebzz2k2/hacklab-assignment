import { useEffect, useState } from 'react';
import "./App.css"
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null
  });

  // get visitor's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //! set userLocation state
        setUserLocation({
          ...userLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, (error) => {
        //! handle error
        //! alerts user if they deny location access
        alert(error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  //! get users location on page load
  //! runs once
  useEffect(() => {
    getLocation();
  }, [])

  //! submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    //! validate form 
    if (!name) {
      alert('Please enter a username');
      return;
    } else if (!userLocation.latitude || !userLocation.longitude) {
      alert('Please allow location access');
      return;
    }
    //! send data to server
    axios.post('http://localhost:5000/', {
      username: name,
      lattitude: userLocation.latitude,
      longitude: userLocation.longitude
    },
    ).then((res) => {
      console.log(res.data);
      alert("submited");
    }).catch((err) => {
      console.error(err);
      alert("not-submited");

    })
  }

  //! handle input change
  //!update name state
  //! runs on every input change
  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username</label>
        <input type="text" placeholder='Username' name='username' onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
