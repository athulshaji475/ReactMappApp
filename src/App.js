import React from 'react'
import Map from './Components/Map'
import {
  BrowserRouter as Router,
  Routes,
  Route
 
} from "react-router-dom";
import Splash from './Components/Splash';
function App() {
  return (
    <div style={{Height:'100%'}}>
 <div style={{backgroundColor:'greenyellow'}}>
 <center><h2>MAP</h2></center> 
 </div>  
<Router>
<Routes>
<Route path='/' element={<Splash/>} />
  <Route path='/Map' element={<Map/>}/>
</Routes>
</Router>




     
    </div>
  )
}

export default App