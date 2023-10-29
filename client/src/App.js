import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Permi from './pages/permi';
import Etablissement from './pages/Etablissment';
//import 'antd/dist/antd.css'

import { Button } from 'antd';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/permi' element={<ProtectedRoute><Permi /></ProtectedRoute>}></Route>
          <Route path='/etablissement' element={<ProtectedRoute><Etablissement /></ProtectedRoute>}></Route>
          <Route path='/login' element={<NonProtectedRoute><Login /></NonProtectedRoute>} />
          <Route path='/register' element={<NonProtectedRoute><Register /></NonProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('tav-user')) {
    return props.children
  }
  else {
    return <Navigate to='/login' />
  }
}

export function NonProtectedRoute(props) {
  if (localStorage.getItem('tav-user')) {
    return <Navigate to='/home' />

  }
  else {
    return props.children
  }
}

export default App;

