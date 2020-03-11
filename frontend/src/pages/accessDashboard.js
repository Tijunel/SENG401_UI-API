import React from 'react';
import AccessDashTopNav from '../components/accessDashTopNav';
import WithAuthAccess from '../components/withAuthAccess';
import AccessForum from '../components/aDashComponents/accessForum';
import AccessPrivateFeedback from '../components/aDashComponents/privateFeedback';
import '../styling/accessDash.css';

class AccessDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForum: true
        }
    }

    goToPrivateFeedback = () => {
        this.setState({ showForum: false });
    }

    goToForum = () => {
        this.setState({ showForum: true });
    }

    render = () => {
        return (
            <>
                <AccessDashTopNav goToPrivateFeedback={this.goToPrivateFeedback} goToForum={this.goToForum} />
                {(this.state.showForum)?<AccessForum/>:<AccessPrivateFeedback/>}
            </>
        );
    }
}

export default WithAuthAccess(AccessDashboard);