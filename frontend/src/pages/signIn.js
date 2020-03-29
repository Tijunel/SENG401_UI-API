import React from 'react';
import TopNav from '../components/topNav';
import { Image, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ErrorModal from '../components/errorModal';
import '../styling/signIn.css';

export default class SignInDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.emailForm = React.createRef();
        this.passForm = React.createRef();
        this.state = {
            redirect: false,
            showErrorModal: false, 
            errorMessage: ""
        }
    }

    componentDidMount = () => {this.emailForm.current.focus();}

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.passForm.current.value === '') this.passwordForm.current.focus();
            else if (this.emailForm.current.value === '') this.emailForm.current.focus();
            else this.submitInfo();
        }
    }

    submitInfo = () => {
        if (this.passForm.current.value === '') {
            this.setState({
                showErrorModal: true,
                errorMessage: "Oops! Looks like you forgot to enter your password!"
            });
            return;
        } 
        else if (this.emailForm.current.value === '') {
            this.setState({
                showErrorModal: true,
                errorMessage: "Oops! Looks like you forgot to enter your email!"
            });
            return;
        } 
        fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.emailForm.current.value,
                password: this.passForm.current.value,
            })
        })
            .then(async res => {
                if(res.status !== 200) {
                    this.setState({
                        showErrorModal: true,
                        errorMessage: "Oops! Something went wrong!"
                    });
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .then(res => {
                sessionStorage.setItem('name', res.name);
                sessionStorage.setItem('email', res.email);
                this.setState({ redirect: true });
            })
            .catch(err => {
                this.setState({
                    showErrorModal: true,
                    errorMessage: "Oops! Something went wrong!"
                });
            });
    }

    showErrorModal = () => { this.setState({showErrorModal: !this.state.showErrorModal}); }

    render = () => {
        if (this.state.redirect) return <Redirect to='/dashboard' />
        return (
            <div id='signIn'>
                <TopNav />
                <Image src={require('../assets/signIn.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center', marginTop: '80px' }} />
                <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '700px', marginBottom: '40px' }}>
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
                <Button className='submitButton' onClick={this.submitInfo}><b>Submit</b></Button>
                <ErrorModal
                    showModal={this.state.showErrorModal}
                    hideModal={this.showErrorModal}
                    message={this.state.errorMessage}
                />
            </div>
        )
    }
}