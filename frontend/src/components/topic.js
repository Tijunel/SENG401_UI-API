import React from 'react';
import Comment from './comment';
import { Row, Col, Button } from 'react-bootstrap';
import APIHelper from './apiHelper';
import PostModal from './postModal';
import ConfirmationModal from './confirmationModal';
import ErrorModal from "./errorModal";

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.messageForm = React.createRef();
        this.postModal = React.createRef();
        this.state = {
            showComments: false,
            showCommentModal: false,
            hideTopic: false,
            showErrorModal: false,
            errorMessage: "",
            apiHelper: APIHelper.getInstance()
        }
        this.commentsUI = [];
    }

    getComments = async () => {
        this.commentsUI = [];
        if (!this.state.showComments) {
            const res = await this.state.apiHelper.getTopic(this.props.id);
            if (!res.error) {
                this.generateRootComments(res.comments);
            } else {
                this.setState({
                    showErrorModal: true,
                    errorMessage: "Could not fetch comments. Please try again later."
                });
            }
            this.setState({ showComments: true });
        } else this.setState({ showComments: false });
    }

    generateRootComments = (comments) => {
        for (const comment of comments) {
            this.commentsUI.push(
                <Comment message={comment.message} replies={comment.replies} ID={comment.id} parentID={this.props.id} depth={0} isCompany={this.props.isCompany} key={comment.id} />
            );
        }
    }

    addRootComment = (message, ID) => {
        this.commentsUI.push(
            <Comment message={message} replies={[]} ID={ID} parentID={this.props.id} depth={0} isCompany={this.props.isCompany} key={ID} />
        );
    }

    createRootComment = async () => {
        if (this.messageForm.current.value === "") {
            this.postModal.current.notifyEmptyText("Oops! Please write out your comment.");
            return;
        }
        const res = await this.state.apiHelper.postComment(this.props.id, this.messageForm.current.value);
        if (!res.error) {
            this.addRootComment(this.messageForm.current.value, res.ID);
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: "Could not upload comment. Please try again later."
            });
        }
        this.showCommentModal();
    }

    deleteTopic = async () => {
        const res = await this.state.apiHelper.deleteEvent(this.props.id);
        if (res) {
            this.props.deleteFromTopicData(this.props.id);
            this.setState({ hideTopic: true });
        } else {
            this.setState({
                showErrorModal: true,
                showConfirmationModal: false,
                errorMessage: "Could not delete topic. Please try again later."
            });
        }
    }

    showCommentModal = () => { this.setState({ showCommentModal: !this.state.showCommentModal }); }
    showConfirmationModal = () => { this.setState({ showConfirmationModal: !this.state.showConfirmationModal }); }
    showErrorModal = () => { this.setState({ showErrorModal: !this.state.showErrorModal }); }

    render = () => {
        if (!this.state.hideTopic) {
            return (
                <div>
                    <Row style={{ width: '100%', textAlign: 'center', margin: 'auto', borderWidth: '1px', borderColor: '#AAA', borderStyle: 'solid', fontSize: '20px', marginBottom: '10px' }}>
                        <Col style={{ textAlign: 'left' }}><b>{this.props.name}</b></Col>
                        <Col xs={1} style={{ textAlign: 'right' }}><Button className='clearButton' onClick={this.showConfirmationModal} style={{ display: (this.props.isCompany) ? '' : 'none' }}><b>Delete</b></Button></Col>
                        <Col xs={1} style={{ textAlign: 'right' }}><b><Button className='clearButton' onClick={this.getComments}><b>{(this.state.showComments) ? 'Close' : 'Expand'}</b></Button></b></Col>
                    </Row>
                    <div style={{ display: (this.state.showComments) ? '' : 'none', marginLeft: '10px', marginRight: '0', paddingLeft: '10px', marginBottom: '50px' }}>
                        <div style={{ marginLeft: '10px' }}>
                            <Button className='createAForumButton' onClick={this.showCommentModal}><b>Create A New Comment</b></Button>
                            <div style={{ marginTop: '20px' }}>{this.commentsUI}</div>
                        </div>
                    </div>
                    <PostModal
                        showModal={this.state.showCommentModal}
                        hideModal={this.showCommentModal}
                        title={"Create Comment"}
                        message={"Enter your message below."}
                        reference={this.messageForm}
                        placeholder={"Message"}
                        create={this.createRootComment}
                        ref={this.postModal}
                    />
                    <ConfirmationModal
                        showModal={this.state.showConfirmationModal}
                        hideModal={this.showConfirmationModal}
                        title={"Confirmation"}
                        message={"Are you sure you want to delete this topic?"}
                        delete={this.deleteTopic}
                        buttonTitle={"Yes!"}
                    />
                    <ErrorModal
                        showModal={this.state.showErrorModal}
                        hideModal={this.showErrorModal}
                        message={this.state.errorMessage}
                    />
                </div>
            );
        } else { return (<div></div>); }
    }
}