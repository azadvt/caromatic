import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';

function App() {
  return (
    <>
      <Router>
        <AdminRoute/>

        <UserRoute/>
      </Router>
      </>  
    
  );
}

export default App;
