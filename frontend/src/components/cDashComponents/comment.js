import React from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.messageForm = React.createRef();
        this.state = {
            message: this.props.message,
            parentID: this.props.parentID,
            ID: this.props.ID,
            showCommentModal: false,
            showConfirmationModal: false,
            hideComment: false
        }
        this.repliesUI = [];
    }

    componentWillMount = () => {
        this.generateReplies();
    }

    generateReplies = () => {
        for (const reply of this.props.replies) {
            this.repliesUI.push(
                <Comment message={reply.message} replies={reply.replies} ID={reply.id} parentID={reply.parentID} depth={this.props.depth + 1} />
            )
        }
    }

    addReply = (message, ID) => {
        console.log(ID)
        console.log(this.props.ID)
        this.repliesUI.push(
            <Comment message={message} replies={[]} ID={ID} parentID={this.props.ID} depth={this.props.depth + 1} />
        );
    }

    createReply = () => {
        fetch('api/forum/postComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentID: this.props.ID,
                message: this.messageForm.current.value
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    throw new Error('Error')
                }
                else {
                    res = await res.json()
                    this.addReply(this.messageForm.current.value, res.ID);
                }
                this.showCommentModal()
            })
            .catch(err => {
                console.log(err)
            });
    }

    deleteComment = () => {
        fetch('/api/forum/deleteEvent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: this.props.ID
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    throw new Error('Error')
                }
                else {
                    this.setState({hideComment: true});
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    showCommentModal = () => {
        this.setState({ showCommentModal: !this.state.showCommentModal });
    }

    showConfirmationModal = () => {
        this.setState({ showConfirmationModal: !this.state.showConfirmationModal });
    }

    render = () => {
        if(!this.state.hideComment) {
            return (
                <div>
                    <div
                        style={{ width: '100%', textAlign: 'left', margin: 'auto', borderWidth: '1px', borderColor: '#AAA', borderStyle: 'solid', fontSize: '20px', marginBottom: '10px' }}
                        onClick={this.getComments}
                    >
                        <div style={{ margin: '5px' }}>{this.state.message}</div>
                        <div style={{ textAlign: 'right' }}>
                            <Button className='clearButton' onClick={this.showCommentModal}><b>Reply</b></Button>
                            <Button className='clearButton' onClick={this.showConfirmationModal}><b>Delete</b></Button>
                        </div>
                    </div>
                    <div style={{ display: (this.repliesUI.length > 0) ? '' : 'none', marginLeft: '10px', marginRight: '0', paddingLeft: '10px', marginBottom: '10px', borderLeft: '1px solid', borderColor: '#AAA'}}>
                        <div style={{ marginLeft: '10px'}}>
                            <div style={{ marginTop: '10px' }}>{this.repliesUI}</div>
                        </div>
                    </div>
                    <Modal id='newForumModal' show={this.state.showCommentModal} onHide={this.showCommentModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b style={{ fontSize: '25px' }}>Reply</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '17px' }}>
                            Enter your reply below.<br /><br />
                            <Form className="form">
                                <Form.Group controlId="email">
                                    <Form.Control ref={this.messageForm} className='control' placeholder='Message' as='textarea' rows='10' required style={{ height: '300px' }} />
                                </Form.Group>
                            </Form>
                            <Button className='createAForumButton' onClick={this.createReply}><b>Submit</b></Button>
                        </Modal.Body>
                    </Modal>
                    <Modal id='newForumModal' show={this.state.showConfirmationModal} onHide={this.showConfirmationModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b style={{ fontSize: '25px' }}>Confirmation</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '17px' }}>
                            Are you sure you want to delete this comment?<br /><br />
                            <Button className='createAForumButton' onClick={this.deleteComment}><b>Yes!</b></Button>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}