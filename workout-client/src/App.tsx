import React, { ReactElement } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/header';

import WorkoutList from './components/workout-list/workout-list';
import WorkoutDetailPage from './components/workout-detail-page/workout-detail-page';

import { WorkoutNavigationContext } from './contexts/workout-navigation-context';

import './App.css';

const App = (): ReactElement => {
  return (
    <Router>
      <div className='App'>
        <Header />
      </div>

      <WorkoutNavigationContext.context.Provider value={new WorkoutNavigationContext()}>
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
      </WorkoutNavigationContext.context.Provider>
    </Router>
  );
};

export default App;
