import React from 'react';
import { Button } from 'react-bootstrap';
import APIHelper from './apiHelper';
import PostModal from './postModal';
import ConfirmationModal from './confirmationModal';
import ErrorModal from "./errorModal";

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
            showErrorModal: false,
            errorMessage: "",
            hideComment: false,
            apiHelper: APIHelper.getInstance()
        }
        this.repliesUI = [];
    }

    componentWillMount = () => {
        for (const reply of this.props.replies) {
            this.repliesUI.push(
                <Comment message={reply.message} replies={reply.replies} ID={reply.id} parentID={reply.parentID} isCompany={this.props.isCompany} depth={this.props.depth + 1} key={reply.id}/>
            );
        }
    }

    addReply = (message, ID) => {
        this.repliesUI.push(
            <Comment message={message} replies={[]} ID={ID} parentID={this.props.ID} isCompany={this.props.isCompany} depth={this.props.depth + 1} key={ID}/>
        );
    }

    createReply = async () => {
        if(this.props.depth + 1 > 7) {
            this.setState({
                showErrorModal: true,
                errorMessage: "Max reply depth reached."
            });
            return;
        }
        const res = await this.state.apiHelper.postComment(this.props.ID, this.messageForm.current.value);
        if (!res.error) {
            this.addReply(this.messageForm.current.value, res.ID);
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: "Could not save your reply. Try again later."
            });
        }
        this.showCommentModal();
    }

    deleteComment = async () => {
        const res = await this.state.apiHelper.deleteEvent(this.props.ID);
        if (res) {
            this.setState({ hideComment: true });
        } else {
            this.setState({
                showErrorModal: true,
                showConfirmationModal: false,
                errorMessage: "Could not delete the comment. Try again later."
            });
        }
    }

    showCommentModal = () => { this.setState({ showCommentModal: !this.state.showCommentModal }); }
    showConfirmationModal = () => { this.setState({ showConfirmationModal: !this.state.showConfirmationModal }); }
    showErrorModal = () => { this.setState({showErrorModal: !this.showErrorModal}); }

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
                    <PostModal
                        showModal={this.state.showCommentModal}
                        hideModal={this.showCommentModal}
                        title={"Reply"}
                        message={"Enter your reply below"}
                        reference={this.messageForm}
                        placeholder={"Your Reply"}
                        create={this.createReply}
                    />
                    <ConfirmationModal
                        showModal={this.state.showConfirmationModal}
                        hideModal={this.showConfirmationModal}
                        title={"Confirmation"}
                        message={"Are you sure you want to delete this comment?"}
                        delete={this.deleteComment}
                        buttonTitle={"Yes!"}
                    />
                    <ErrorModal
                        showModal={this.state.showErrorModal}
                        hideModal={this.showErrorModal}
                        message={this.state.errorMessage}
                    />
                </div>
            );
        }
        else { return (<div></div>); }
    }
}