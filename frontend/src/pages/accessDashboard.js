import React from 'react';
import AccessDashTopNav from '../components/accessDashTopNav';
import { Image, Form, Button } from 'react-bootstrap';
import WithAuthAccess from '../components/withAuthAccess';
import '../styling/accessDash.css';

class AccessDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.feedbackForm = React.createRef();
        this.state = {
            showForum: true
        }
    }

    getStarted = () => {
        //Send to forum and show topics and comments
    }

    goToPrivateFeedback = () => {
        this.setState({ showForum: false });
    }

    goToForum = () => {
        this.setState({ showForum: true });
    }

    submitPrivateFeedback = () => {
        //Send the feedback to the feedback microservice 
        //Confirm with the user that it has been submitted
        //Check if the text field is empty
    }

    render = () => {
        if (this.state.showForum) {
            return (
                <div id='accessDash'>
                    <AccessDashTopNav goToPrivateFeedback={this.goToPrivateFeedback} goToForum={this.goToForum} />
                    <Image src={require('../assets/welcome.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center', marginTop: '100px' }} />
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Welcome!<br /></b>
                    <div>
                        <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                            You are now able to comment, respond to comments, and submit private feedback. Remember, all of your feedback is completely anonymous, so tell your organization what you really think!
                            Just remember, keep it professional, civil, and respectful.
                        </p>
                    </div>
                    <Button className='createForumButton' href='/dashboard' onClick={this.createForum}><b>Get Started</b></Button>
                </div>
            );
        }
        else {
            return (
                <div id='accessDash'>
                    <AccessDashTopNav goToPrivateFeedback={this.goToPrivateFeedback} goToForum={this.goToForum} />
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Submit Your Private Feedback<br /></b>
                    <div>
                        <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                            This feedback won't be seen by anyone except priveleged members of your organization. Before submitting, ensure that this is the feedback you want to provide, as you won't be able to see it again.
                        </p>
                    </div>
                    <Form className="feedback">
                        <Form.Group controlId="email">
                            <Form.Control ref={this.feedbackForm} className='control' placeholder='Your Feedback' as='textarea' rows='10' required />
                        </Form.Group>
                    </Form>
                    <Button className='createForumButton' href='/dashboard' onClick={this.submitPrivateFeedback}><b>Submit</b></Button>
                </div>
            );
        }
    }
}

export default WithAuthAccess(AccessDashboard);