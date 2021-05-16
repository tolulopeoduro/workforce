import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import {BrowserRouter as Router} from 'react-router-dom'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Workforce'
  }, [])
  return (
    <div className = {classes.App}>
      <Router>
        <Layout/>
      </Router> 
    </div>
  );
}

export default App;

