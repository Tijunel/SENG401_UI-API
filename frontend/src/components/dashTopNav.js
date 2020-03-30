import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ErrorModal from './errorModal';

export default class DashTopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showErrorModal: false
        }
    }

    logOut = () => {
        fetch('/api/user/stopSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.clear();
                    this.setState({ redirect: true });
                } else {
                    this.setState({ showErrorModal: true });
                }
            })
            .catch(err => {
                this.setState({ showErrorModal: true });
            });
    }

    showErrorModal = () => {
        this.setState({ showErrorModal: !this.state.showErrorModal });
    }

    render = () => {
        if (this.state.redirect) return <Redirect to='/signIn' />;
        return (
            <>
                <Navbar id='topNav' fixed='top' style={{ background: '#3ABEFF', minWidth: '500px' }}>
                    <Navbar.Brand href="/"><b style={{ color: '#FFF' }}>Aon Feedback</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav className='ml-auto'>
                        <Nav.Item>
                            <Nav.Link style={{ color: '#FFF' }} onClick={this.props.goToForum}>Forum &nbsp;&nbsp;&nbsp;|</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ color: '#FFF' }} onClick={this.props.goToPrivateFeedback}>View Private Feedback &nbsp;&nbsp;&nbsp;|</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav.Item>
                        <Nav.Link style={{ color: '#FFF' }} onClick={this.logOut}>Log Out</Nav.Link>
                    </Nav.Item>
                </Navbar>
                <ErrorModal
                    showModal={this.state.showErrorModal}
                    hideModal={this.showErrorModal}
                    message={"Oops! Something went wrong!"}
                />
            </>
        );
    }
}