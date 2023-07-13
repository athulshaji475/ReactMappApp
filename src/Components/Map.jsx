import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [Calcarea,setCalcarea]=useState(0)
  const [st,setst]=useState(false)

  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    setLocations((prevLocations) => [...prevLocations, clickedLocation]);
  };

  const calculatePolygonArea = () => {
    if (!apiLoaded) {
      console.log('Google Maps API is still loading. Please wait.');
      return;
    }

    if (locations.length < 3) {
      console.log('At least 3 locations are required to calculate the area.');
      return;
    }

    const googleMaps = window.google.maps;

    const polygonPath = locations.map(location => new googleMaps.LatLng(location.lat, location.lng));
    const polygon = new googleMaps.Polygon({ paths: polygonPath });

    const area = googleMaps.geometry.spherical.computeArea(polygon.getPath());
    setCalcarea(area)
    setst(true)
    console.log('Polygon area:', area);
  };

  const handleLoad = () => {
    setApiLoaded(true);
  };

  return (
    <div >
    <div className='col-md' style={{Margin:'10px'}}>

    
      <LoadScript
        googleMapsApiKey="AIzaSyBEKSlBoYpYsCEf1nOk5GprL87pMz7ZMp8"
        libraries={['geometry']}
        onLoad={handleLoad}
      >
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {locations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </GoogleMap>
      </LoadScript>
<br>

</br>
<br></br>
    <center>
    <button className='btn btn-success' style={{width:'100%'}} onClick={calculatePolygonArea}>Calculate Area</button>
    <br>   
    </br>
    <br>
    </br>
   
  { 
    st&&<div style={{backgroundColor:'lightcyan'}}> <h5>Here Is The Calculated Area</h5>
      
       <div> {Calcarea}</div>
       </div>
  }
    
    </center>  
      </div>
    </div>
  );
}

export default Map;
