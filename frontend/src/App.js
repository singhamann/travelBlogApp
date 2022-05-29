import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound';
import AddPlace from './components/AddPlace'
import Dashboard from './components/Dashboard'
import EditPlace from './components/EditPlace'
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path= '/' element={<Navbar />}>
            <Route path='home' element= {<Home />}/>
            <Route path='SignIn' element= {<SignIn />}/>
            <Route path='SignUp' element= {<SignUp />}/>
            <Route path='AddPlace' element= {<AddPlace />}/>
            <Route path='dashboard/:userId' element= {<Dashboard />}/>
            <Route path='editPlace/:placeId' element= {<EditPlace />} />
            <Route path='*' element = {<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
