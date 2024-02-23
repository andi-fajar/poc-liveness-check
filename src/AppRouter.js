import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Score from './livenes/Score';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/score" exact element={<Score/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;