import { Component } from 'react';

import './App.css'
import './mobile.css'
import Home from './Components/Home'
import Result from './Components/Result'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

class App extends Component {
  render()
  {
    return(
      <div className='app-wrap'>
        <BrowserRouter>
          <Routes>

            <Route exact path="/" element={
              <Navigate to="/home"/>
            }/>
            
            <Route path="/home" element={<Home/>}/>
            <Route path="/text" element={<Result/>}/>
            
          </Routes >
        </BrowserRouter>
      </div>
    );
  }
}

export default App;