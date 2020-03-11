import React from 'react';
import { Image, Form, Button } from 'react-bootstrap';

export default class AccessPrivateFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.feedbackForm = React.createRef();
    }

    submitPrivateFeedback = () => {
        if (this.feedbackForm.current.value === '') return; //Show error modal
        fetch('/api/feedback/submitFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companyID: sessionStorage.getItem('companyID'),
                forumID: sessionStorage.getItem('forumID'),
                forumName: sessionStorage.getItem('forumName'),
                message: this.feedbackForm.current.value
            })
        }) //Check status numbers
            .then(res => res.json())
            .then(res => {
                //Show confirmation or error modal
            })
            .catch(err => {
                console.log(err) //Show error modal
            });
    }

    render = () => {
        return (
            <div id='accessDash'>
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
                <Button className='createForumButton' onClick={this.submitPrivateFeedback}><b>Submit</b></Button>
            </div>
        );
    }
}