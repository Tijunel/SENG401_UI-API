import React from 'react';
import AccessDashTopNav from '../components/accessDashTopNav';
//Display this page when a company signs in

export default class AccessDashboard extends React.Component {
    render = () => {
        return (
            <div id='accessDash'>
                <AccessDashTopNav/>
            </div>
        );
    }
}