import React from 'react';
import TopNav from '../components/topNav';
import { Image, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ErrorModal from '../components/errorModal';
import '../styling/access.css';

export default class AccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.accessForm = React.createRef();
        this.state = {
            redirect: false,
            showErrorModal: false, 
            errorMessage: ""
        }
    }

    submitAccessCode = () => {
        if (this.accessForm.current.value === '') {
            this.setState({
                showErrorModal: true, 
                errorMessage: "Oops! Looks like you forget to enter your access code!"
            });
            return;
        } 
        fetch('/api/access/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessCode: this.accessForm.current.value
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
                sessionStorage.setItem('forumName', res.name);
                sessionStorage.setItem('forumID', res.forumID);
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
        if (this.state.redirect) return <Redirect to='/AccessDash' />
        return (
            <div id='access'>
                <TopNav />
                <Image src={require('../assets/security.svg')} id='image' />
                <p id='text'>We will never store any personally identifiable information about you. Your anonymity is our top priority.</p>
                <Form className="accessCodeForm">
                    <Form.Group controlId="name">
                        <Form.Control className='control' ref={this.accessForm} placeholder='Access Code' type='text' autoComplete='on' required onKeyPress={this.handleKeyPress} />
                    </Form.Group>
                </Form>
                <Button className='submitButton' onClick={this.submitAccessCode} ><b>Submit</b></Button>
                <ErrorModal
                    showModal={this.state.showErrorModal}
                    hideModal={this.showErrorModal}
                    message={this.state.errorMessage}
                />
            </div>
        );
    }
}