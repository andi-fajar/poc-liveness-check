import logo from '../logo.svg';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'; 

function Score() {
  const { sessionId } = useParams();
    
  useEffect(() => {
      console.log("sessionId change " + sessionId)
  }, [sessionId])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="/demo/bcg"
          rel="noopener noreferrer"
        >
          DEMO 2
        </a>
      </header>
    </div>
  );
}

export default Score;
