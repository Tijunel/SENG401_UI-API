import React from 'react';
import { Form, Button } from 'react-bootstrap';
import APIHelper from '../apiHelper';
import ConfirmationModal from '../confirmationModal';
import ErrorModal from '../errorModal';

export default class AccessPrivateFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmationModal: false, 
            showErrorModal: false, 
            errorMessage: "",
            apiHelper: APIHelper.getInstance()
        }
        this.feedbackForm = React.createRef();
    }

    submitPrivateFeedback = async () => {
        if (this.feedbackForm.current.value === '') {
            this.setState({
                showErrorModal: true,
                errorMessage: "You didn't provide any feedback. Please enter your feedback."
            });
            return;
        } 
        const res = await this.state.apiHelper.postPrivateFeedback(this.feedbackForm.current.value, sessionStorage.getItem('forumName'));
        console.log(res)
        if (res) {
            console.log('here')
            this.setState({showConfirmationModal: true});
        } else {
            console.log('yo')
            this.setState({
                showErrorModal: true,
                errorMessage: "Your feedback could not be submitted. Try again later."
            });
        }
    }

    showConfirmationModal = () => { this.setState({ showConfirmationModal: !this.state.showConfirmationModal }); }
    showErrorModal = () => { this.setState({showErrorModal: !this.state.showErrorModal}); }

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
                <ConfirmationModal
                    showModal={this.state.showConfirmationModal}
                    hideModal={this.showConfirmationModal}
                    title={"Submitted"}
                    message={"Your feedback has been submitted!"}
                    delete={this.showConfirmationModal}
                    buttonTitle={"Got It!"}
                />
                <ErrorModal
                    showModal={this.state.showErrorModal}
                    hideModal={this.showErrorModal}
                    message={this.state.errorMessage}
                />
            </div>
        );
    }
}