import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TopNav extends React.Component {
    render = () => {
        return (
            <Navbar id='topNav' fixed='top' style={{ background: '#3ABEFF', minWidth: '500px'}}>
                <Navbar.Brand href="/"><b style={{color: '#FFF'}}>Aon Feedback</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className='ml-auto'>
                    <Nav.Item>
                        <Nav.Link href="/access" style={{color: '#FFF'}}>Enter Access Code &nbsp;&nbsp;&nbsp;|</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/signUp" style={{color: '#FFF'}}>Sign Up &nbsp;&nbsp;&nbsp;|</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/signIn" style={{color: '#FFF'}}>Sign In</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }
}