import './App.css';
import { NavBar } from './NavBar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Element/Home';
import Bisection from './RootofEquation/Bisection';
import FalsePosition from './RootofEquation/FalsePosition';
import OnePoint from './RootofEquation/One-Point';
import NewtonRap from './RootofEquation/Newton-Raphson';
import Secant from './RootofEquation/Secant';
import Matrix from './RootofEquation/Matrix';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/Home' element={<Home/>} />
      <Route path='/Bisection' element={<Bisection/>} />
      <Route path='/False-Position' element={<FalsePosition/>} />
      <Route path='/One-Point' element={<OnePoint/>} />
      <Route path='/Newton-Raphson' element={<NewtonRap/>} />
      <Route path='/Secant' element={<Secant/>} />
      <Route path = '/Matrix' element={<Matrix/>}/>
    </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
