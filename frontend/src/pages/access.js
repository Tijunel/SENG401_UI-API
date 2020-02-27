import React from 'react';
import TopNav from '../components/topNav';
import { Image, Form, Button } from 'react-bootstrap';
import '../styling/access.css';

export default class AccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.accessForm = React.createRef();
    }

    submitAccessCode = () => {
        //Interact with the forum microservice to find the data for the access code. 
        //Get JWT to access the page
        //Send to access dashboard
    }

    render = () => {
        return (
            <div id='access'>
                <TopNav />
                <Image src={require('../assets/security.svg')} style={{ width: '50vw', minWidth: '150px', maxWidth: '500px', textAlign: 'center', marginTop: '80px' }} />
                <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '100%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '700px', marginBottom: '40px'}}>
                    We will never store any personally identifiable information about you. Your anonymity is our top priority.
                </p>
                <Form className="accessCodeForm">
                    <Form.Group controlId="name">
                        <Form.Control className='control' ref={this.accessForm} placeholder='Access Code' type='text' autoComplete='on' required onKeyPress={this.handleKeyPress} />
                    </Form.Group>
                </Form>
                <Button className='submitButton' href='/accessDash' onClick={this.submitAccessCode}><b>Submit</b></Button>
            </div>
        );
    }
}