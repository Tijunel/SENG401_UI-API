import React from 'react';
import TopNav from '../components/topNav';
import { Image, Form, Button } from 'react-bootstrap';
import '../styling/signIn.css';

export default class SignInDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.emailForm = React.createRef();
        this.passForm = React.createRef();
    }

    handleKeyPress = () => {
        //If there is still a form that is not filled, move the cursor to it (Only handle enter key)
        //Also check if there is a valid email
        //Otherwise, interact with the auth database and authenticate
        //Then provide JWT and send to dashboard
    }

    submitAccessCode = () => {
        //Interact with the auth database and authenticate
        //Then provide JWT and send to dashboard
    }

    render = () => {
        return (
            <div id='signIn'>
                <TopNav />
                <Image src={require('../assets/signIn.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center', marginTop: '80px' }} />
                <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '700px', marginBottom: '40px'}}>
                    Your feedback is waiting! We just need some information first. 
                </p>
                <Form className="form">
                    <Form.Group controlId="email">
                        <Form.Control ref={this.emailForm} className='control' placeholder='Email' type='text' autoComplete='on' required onKeyPress={this.handleKeyPress} />
                    </Form.Group>
                </Form>
                <Form className="form">
                    <Form.Group controlId="password">
                        <Form.Control ref={this.passForm} className='control' placeholder='Password' type='password' required onKeyPress={this.handleKeyPress} />
                    </Form.Group>
                </Form>
                <Button className='submitButton' href='/dashboard' onClick={this.submitAccessCode}><b>Submit</b></Button>
            </div>
        )
    }
}