import React from 'react';
import DashTopNav from '../components/dashTopNav';
import WithAuthCompany from '../components/withAuthCompany';
import CorporateForum from '../components/cDashComponents/corporateForum';
import CorporatePrivateFeedback from '../components/cDashComponents/privateFeedback';
import '../styling/corporateDash.css';

class CorporateDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showForum: true
        }
    }

    goToPrivateFeedback = () => {this.setState({ showForum: false });}

    goToForum = () => {this.setState({ showForum: true });}

    render = () => {
        return (
            <>
                <DashTopNav goToPrivateFeedback={this.goToPrivateFeedback} goToForum={this.goToForum} />
                {(this.state.showForum)?<CorporateForum />:<CorporatePrivateFeedback />}
            </>
        );
    }
}

export default WithAuthCompany(CorporateDashboard);