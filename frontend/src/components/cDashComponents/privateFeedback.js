import React from 'react';
import { Table } from 'react-bootstrap';

export default class CorporatePrivateFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackExists: false
        }
        this.feedback = [];
    }

    componentWillMount = () => {
        fetch('/api/feedback/getFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }) //Check status codes
            .then(res => res.json())
            .then(res => {
                //Show confirmation or error modal
                this.generateFeedbackUI(res)
            })
            .catch(err => {
                console.log(err) //Show error modal
            });
    }

    renderTable = (message, index) => {
        return (
            <tr key={index}>
                <td>{message}</td>
            </tr>
        )
    }

    generateMessageTable = (messages) => {
        return (
            <div style={{ width: '50%', textAlign: 'center', margin: 'auto'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(this.renderTable)}
                    </tbody>
                </Table>
            </div>
        )
    }

    generateFeedbackUI = (feedbackList) => {
        for (const feedback of feedbackList) {
            console.log(feedback)
            this.feedback.push(
                <div style={{marginTop: '80px'}}>
                    <b style={{fontSize: 'calc(1vw + 0.8rem)'}}>{feedback.forumName}</b>
                    {this.generateMessageTable(feedback.messages)}
                </div>
            );
        }
        this.setState({ feedbackExists: true })
        if (feedbackList.length > 0) {
            this.setState({ feedbackExists: true })
        }
    }

    render = () => {
        return (
            <div id='corporateDash' style={{ marginTop: '80px' }}>
                <div style={{ display: (this.state.feedbackExists) ? 'none' : '' }}>
                    <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'center', lineHeight: '1.2', maxWidth: '900px' }}>
                        No private feedback has been submitted yet.
                    </p>
                </div>
                <div style={{ display: (this.state.feedbackExists) ? '' : 'none' }}>
                    {this.feedback}
                </div>
            </div>
        )
    }
}