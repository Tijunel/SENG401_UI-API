import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './styling/index.css';

import HomePage from './pages/home';
import AccessPage from './pages/access';
import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp';
import AccessDashboard from './pages/accessDashboard';
import CorporateDashboard from './pages/corporateDashboard';

export default class App extends React.Component {
    render = () => {
        if(isMobile) {
            return (
                <div>
                    <p style={{textAlign: 'center', marginTop: '100px'}}><b>Aon Feedback</b></p>
                    <p style={{textAlign: 'center', marginTop: '100px'}}><b>Our mobile version is in progress!</b></p>
                </div>
            )
        } else {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={() => <HomePage />} />
                        <Route exact path="/home" component={() => <HomePage />} />
                        <Route exact path="/access" component={() => <AccessPage />} />
                        <Route exact path="/signIn" component={() => <SignInPage />} />
                        <Route exact path="/signUp" component={() => <SignUpPage />} />
                        <Route exact path="/accessDash" component={() => <AccessDashboard />} />
                        <Route exact path="/dashboard" component={() => <CorporateDashboard />} />
                    </Switch>
                </Router>
            );
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
