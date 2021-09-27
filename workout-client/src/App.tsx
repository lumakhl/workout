import React, { ReactElement } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/header';

import './App.css';
import WorkoutList from './components/workout-list/workout-list';
import WorkoutDetailPage from './components/workout-detail-page/workout-detail-page';

const App = (): ReactElement => {
  return (
    <Router>
      <div className='App'>
        <Header />
      </div>

      <Switch>
        <Route path='/workout/:id'>
          <WorkoutDetailPage />
        </Route>
        <Route path='/:page'>
          <WorkoutList />
        </Route>
        <Route path='/'>
          <WorkoutList />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
