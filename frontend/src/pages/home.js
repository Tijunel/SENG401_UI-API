import React from 'react';
import TopNav from '../components/topNav';
import { Jumbotron, Row, Col, Image } from 'react-bootstrap';
import '../styling/home.css';

export default class HomePage extends React.Component {
    render = () => {
        return (
            <div id='home'>
                <TopNav />
                <Jumbotron style={{ width: '100%', backgroundColor: '#FFF', borderRadius: '0', textAlign: 'center', marginTop: '56px' }}>
                    <Image src={require('../assets/CaptureImage.svg')} style={{ width: '100vw', minWidth: '150px', maxWidth: '1000px' }} />
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Anonymous Feedback, Done Right.<br /></b>
                    <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '100%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px' }}>
                        Aon Feedback is dedicated to providing a safe platform for corporate organizations to receive real, genuine feedback from employees. We ensure the anonymity of employees to take the stigma and fear out of
                        providing feedback. We will never store information about employees, only their thoughts for improvement.
                    </p>
                </Jumbotron>
                <Jumbotron style={{ width: '100%', backgroundColor: '#FFF', borderRadius: '0', textAlign: 'center' }}>
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}>How It Works<br /></b>
                    <Image src={require('../assets/question.svg')} style={{ width: '20vw', minWidth: '150px', maxWidth: '500px' }} />
                    <Row>
                        <Col>
                            <b style={{ fontSize: 'calc(2.2vw + 0.6rem)' }}>Looking To Get Feedback?<br /></b>
                            <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '100%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '600px', marginBottom: '20px', height: '16vw'}}>
                                Our platform allows you to receive feedback in one of two ways: <br/><br/>
                                1) Create an open discussion where employees can comment and respond to one another.<br/><br/>
                                2) Receive private feedback in your feedbox. <br/><br/>
                                Ready to get started? Sign up <a href='/signUp'>here</a>
                            </p>
                        </Col>
                        <Col>
                            <b style={{ fontSize: 'calc(2.2vw + 0.6rem)' }}>Looking To Give Feedback?<br /></b>
                            <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '100%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '600px', marginBottom: '20px', height: '16vw'}}>
                                Your organization will provide you with an access code, which will take you to a dashboard where you can share your ideas.<br/><br/>
                                You will be able to send private feedback, or join the discussion in one of the forums created by your organization. <br/><br/>
                                Already have an access code? Enter it <a href='/access'>here</a>
                            </p>
                        </Col>
                    </Row>
                </Jumbotron>
                <Jumbotron style={{ width: '100%', backgroundColor: '#FFF', borderRadius: '0', textAlign: 'center', marginTop: '-100px' }}>
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Want to give us feedback?<br /></b>
                    <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '100%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'center', lineHeight: '1.2', maxWidth: '900px' }}>
                        Enter the access code WOO1XQ11 <a href='/access'>here</a>.
                    </p>
                </Jumbotron>
            </div>
        );
    }
}