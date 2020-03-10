import React from 'react';
import TopNav from '../components/topNav';
import { Image, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../styling/signUp.css';

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.emailForm = React.createRef();
        this.nameForm = React.createRef();
        this.passForm = React.createRef();
        this.rePassForm = React.createRef();
        this.state = {
            redirect: false
        }
    }

    componentDidMount = () => {
        this.emailForm.current.focus();
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            if(this.emailForm.current.value === '') this.emailForm.current.focus();
            else if(this.nameForm.current.value === '') this.nameForm.current.focus();
            else if(this.passForm.current.value === '') this.passForm.current.focus();
            else if(this.rePassForm.current.value === '') this.passForm.current.focus();
            else if(this.rePassForm.current.value !== this.passForm.current.value) return; //Show error saying passwords don't match
            else this.submitInfo();
        }
    }

    submitInfo = () => {
        let email = this.emailForm.current.value === '';
        let name = this.nameForm.current.value === '';
        let pass = this.passForm.current.value === '';
        let rePass = this.rePassForm.current.value === '';
        if (email && name && pass && rePass) {
            //Show modal saying all fields are empty
            return;
        }
        else if (email || name || pass || rePass) {
            //Show modal saying that there are empty fields
            return;
        }
        if (this.passForm.current.value !== this.rePassForm.current.value) {
            //Show error saying that passwords do not match
            return
        }
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.emailForm.current.value,
                password: this.passForm.current.value,
                username: this.nameForm.current.value
            })
        })
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem('name', res.name)
            sessionStorage.setItem('email', res.email)
            this.setState({ redirect: true })
            //else handle errors for status 500 and 401
        })
        .catch(err => {
            //Handle error
            console.log('Caught Error')
        })
    }

    render = () => {
        if (this.state.redirect) return <Redirect to='/dashboard' />
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
                <Button className='submitButton' onClick={this.submitInfo}><b>Submit</b></Button>
            </div>
        );
    }
}