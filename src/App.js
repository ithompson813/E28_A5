import './App.css';
import {GuessApp} from './guess_app.js';
import {BrowserRouter as Router} from "react-router-dom";


function App() {
  return (

    <Router>
      <GuessApp />
    </Router>
    
  );
}

export default App;
