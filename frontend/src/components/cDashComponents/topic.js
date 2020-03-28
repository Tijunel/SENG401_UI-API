import React from 'react';
import Comment from './comment';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.messageForm = React.createRef();
        this.state = {
            showComments: false,
            showCommentModal: false,
            hideTopic: false
        }
        this.commentsUI = [];
    }

    getComments = () => {
        this.commentsUI = [];
        if (!this.state.showComments) {
            fetch('/api/forum/getTopic/' + this.props.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status !== 200) {
                        this.setState({ showComments: true });
                        throw new Error('error');
                    }
                    return res.json();
                })
                .then(res => {
                    this.generateRootComments(res.comments);
                    this.setState({ showComments: true });
                })
                .catch(err => {
                    console.log(err)
                });
        }
        else {
            this.setState({ showComments: false });
        }
    }

    generateRootComments = (comments) => {
        for (const comment of comments) {
            this.commentsUI.push(
                <Comment message={comment.message} replies={comment.replies} ID={comment.id} parentID={this.props.id} depth={0} isCompany={this.props.isCompany}/>
            );
        }
    }

    addRootComment = (message, ID) => {
        this.commentsUI.push(
            <Comment message={message} replies={[]} ID={ID} parentID={this.props.id} depth={0} isCompany={this.props.isCompany}/>
        );
    }

    createRootComment = () => {
        fetch('api/forum/postComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentID: this.props.id,
                message: this.messageForm.current.value
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    throw new Error('Error')
                }
                else {
                    res = await res.json()
                    this.addRootComment(this.messageForm.current.value, res.ID);
                }
                this.showCommentModal()
            })
            .catch(err => {
                console.log(err)
            });
    }

    deleteTopic = () => {
        fetch('/api/forum/deleteEvent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: this.props.id
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    throw new Error('Error')
                }
                else {
                    this.setState({ hideTopic: true });
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
        if (!this.state.hideTopic) {
            return (
                <div>
                    <Row
                        style={{ width: '100%', textAlign: 'center', margin: 'auto', borderWidth: '1px', borderColor: '#AAA', borderStyle: 'solid', fontSize: '20px', cursor: 'pointer', marginBottom: '10px' }}
                        onClick={this.getComments}
                    >
                        <Col style={{ textAlign: 'left' }}><b>{this.props.name}</b></Col>
                        <Col style={{ textAlign: 'right' }}>
                            <b><Button className='clearButton' onClick={this.showConfirmationModal} style={{display:(this.props.isCompany)?'':'none'}}><b>Delete</b></Button></b>
                        </Col>
                    </Row>
                    <div style={{ display: (this.state.showComments) ? '' : 'none', marginLeft: '10px', marginRight: '0', paddingLeft: '10px', marginBottom: '50px' }}>
                        <div style={{ marginLeft: '10px', paddingLeft: '5px', paddingRight: '5px' }}>
                            <Button className='createAForumButton' onClick={this.showCommentModal}><b>Create A New Comment</b></Button>
                            <div style={{ marginTop: '20px' }}>{this.commentsUI}</div>
                        </div>
                    </div>
                    <Modal id='newForumModal' show={this.state.showCommentModal} onHide={this.showCommentModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b style={{ fontSize: '25px' }}>Create Comment</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '17px' }}>
                            Enter your message below.<br /><br />
                            <Form className="form">
                                <Form.Group controlId="email">
                                    <Form.Control ref={this.messageForm} className='control' placeholder='Message' as='textarea' rows='10' required style={{ height: '300px' }} />
                                </Form.Group>
                            </Form>
                            <Button className='createAForumButton' onClick={this.createRootComment}><b>Submit</b></Button>
                        </Modal.Body>
                    </Modal>
                    <Modal id='newForumModal' show={this.state.showConfirmationModal} onHide={this.showConfirmationModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b style={{ fontSize: '25px' }}>Confirmation</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '17px' }}>
                            Are you sure you want to delete this topic?<br /><br />
                            <Button className='createAForumButton' onClick={this.deleteTopic}><b>Yes!</b></Button>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}