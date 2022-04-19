
 import React, {useState} from 'react'

 // We use Route in order to define the different routes of our application
 import { Route, Routes } from "react-router-dom";

 // We import all the components we need in our app
 import Navbar from "./components/navbar";
 import RecordList from "./components/recordList";
 import Edit from "./components/edit";
 import Create from "./components/create";

 const App = () => {
  const [data,setData]=useState(null);
  const [print,setPrint]=useState(false);
  function getData(val)
  {
  	setData(val.target.value)
  	setPrint(false)
  	console.warn(val.target.value) //Remove in final implementation
  }
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      
      <h1> {data} </h1>
      <p>(copy of data read by input box for testing purposes only)</p>

      <input type="text" onChange={getData} />
      <button onClick={()=>setPrint(true)} >Submit</button>

    </div>
  );
 };

 export default App;
