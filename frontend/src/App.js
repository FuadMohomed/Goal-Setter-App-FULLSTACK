import './index.css'
import Head from './components/Head';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <>
    <Router>
    <div className="container">
      <Head/>
     <Routes>
       <Route path='/' element={<Dashboard/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
     </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
