import React from 'react';
import TopNav from '../components/topNav';
import { Image, Form, Button } from 'react-bootstrap';
import '../styling/signUp.css';

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.emailForm = React.createRef();
        this.nameForm = React.createRef();
        this.passForm = React.createRef();
        this.rePassForm = React.createRef();
    }

    handleKeyPress = () => {
        //Handle pressing enter key
        //If there are still empty forms, move cursor to them
        //Otherwise, interact with auth service and create a new account
        //Then serve JWT and send to dashboard

        //Also handle non-matching passwords and emails that are not valid emails
    }

    submitAccessCode = () => {
        //Interact with auth service and create a new account
        //Then serve JWT and send to dashboard
    }

    render = () => {
        return (
            <div id='signUp'>
                <TopNav/>
                <Image src={require('../assets/signUp.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center', marginTop: '80px'}} />
                <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '700px', marginBottom: '40px'}}>
                    We're excited to bring you onboard! We just need some information to get you started, your feedback is on its way!
                </p>
                <Form className="form">
                    <Form.Group controlId="email">
                        <Form.Control ref={this.emailForm} className='control' placeholder='Email' type='text' autoComplete='on' required onKeyPress={this.handleKeyPress} />
                    </Form.Group>
                </Form>
                <Form className="form">
                    <Form.Group controlId="name">
                        <Form.Control ref={this.nameForm} className='control' placeholder='Organization Name' type='text' required onKeyPress={this.handleKeyPress}/>
                    </Form.Group>
                </Form>
                <Form className="form">
                    <Form.Group controlId="password">
                        <Form.Control ref={this.passForm} className='control' placeholder='Password' type='password' required onKeyPress={this.handleKeyPress}/>
                    </Form.Group>
                </Form>
                <Form className="form">
                    <Form.Group controlId="password">
                        <Form.Control ref={this.rePassForm} className='control' placeholder='Re-Enter Password' type='password' required onKeyPress={this.handleKeyPress}/>
                    </Form.Group>
                </Form>
                <Button className='submitButton' href='/dashboard' onClick={this.submitAccessCode}><b>Submit</b></Button>
            </div>
        );
    }
}