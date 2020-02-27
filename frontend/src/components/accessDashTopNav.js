import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default class AccessDashTopNav extends React.Component {
    render = () => {
        return (
            <Navbar id='topNav' fixed='top' style={{ background: '#3ABEFF', minWidth: '500px'}}>
                <Navbar.Brand href="/"><b style={{color: '#FFF'}}>Aon Feedback</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className='ml-auto'>
                    <Nav.Item>
                        <Nav.Link  style={{color: '#FFF'}} onClick={this.props.goToForum}>Forum &nbsp;&nbsp;&nbsp;|</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  style={{color: '#FFF'}} onClick={this.props.goToPrivateFeedback}>Submit Private Feedback</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }
}