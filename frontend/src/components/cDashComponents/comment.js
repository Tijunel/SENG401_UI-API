import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import APIHelper from './apiHelper';

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
            hideComment: false,
            apiHelper: APIHelper.getInstance()
        }
        this.repliesUI = [];
    }

    componentWillMount = () => {
        for (const reply of this.props.replies) {
            this.repliesUI.push(
                <Comment message={reply.message} replies={reply.replies} ID={reply.id} parentID={reply.parentID} isCompany={this.props.isCompany} depth={this.props.depth + 1} />
            )
        }
    }

    addReply = (message, ID) => {
        this.repliesUI.push(
            <Comment message={message} replies={[]} ID={ID} parentID={this.props.ID} isCompany={this.props.isCompany} depth={this.props.depth + 1} />
        );
    }

    createReply = async () => {
        const res = await this.state.apiHelper.postComment(this.props.ID, this.messageForm.current.value);
        if (!res.error) {
            this.addReply(this.messageForm.current.value, res.ID);
        } else {
            //Show error
        }
        this.showCommentModal();
    }

    deleteComment = async () => {
        const res = await this.state.apiHelper.deleteEvent(this.props.ID);
        if (res) {
            this.setState({ hideComment: true });
        } else {
            //Show error
        }
    }

    showCommentModal = () => { this.setState({ showCommentModal: !this.state.showCommentModal }); }
    showConfirmationModal = () => { this.setState({ showConfirmationModal: !this.state.showConfirmationModal }); }

    render = () => {
        if (!this.state.hideComment) {
            return (
                <div>
                    <div
                        style={{ width: '100%', textAlign: 'left', margin: 'auto', borderWidth: '1px', borderColor: '#AAA', borderStyle: 'solid', fontSize: '20px', marginBottom: '10px' }}
                        onClick={this.getComments}
                    >
                        <div style={{ margin: '5px' }}>{this.state.message}</div>
                        <div style={{ textAlign: 'right' }}>
                            <Button className='clearButton' onClick={this.showCommentModal}><b>Reply</b></Button>
                            <Button className='clearButton' onClick={this.showConfirmationModal} style={{ display: (this.props.isCompany) ? '' : 'none' }}><b>Delete</b></Button>
                        </div>
                    </div>
                    <div style={{ display: (this.repliesUI.length > 0) ? '' : 'none', marginLeft: '10px', marginRight: '0', paddingLeft: '10px', marginBottom: '10px', borderLeft: '1px solid', borderColor: '#AAA' }}>
                        <div style={{ marginLeft: '10px' }}>
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