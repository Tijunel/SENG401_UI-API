import React from 'react';
import Topic from '../topic';
import { Row, Col, Button } from 'react-bootstrap';
import APIHelper from '../apiHelper';
import ConfirmationModal from '../confirmationModal';
import PostModal from '../postModal';
import ErrorModal from '../errorModal';

export default class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showTopics: false,
            showTopicModal: false,
            showConfirmationModal: false,
            showErrorModal: false,
            errorMessage: "",
            hideForum: false,
            apiHelper: APIHelper.getInstance()
        }
        this.topicsUI = [];
    }

    getTopics = async () => {
        this.topicsUI = [];
        if (!this.state.showTopics) {
            const res = await this.state.apiHelper.getForum(this.props.accessCode);
            if (!res.error) {
                this.generateTopics(res.topics);
            } else {
                this.setState({
                    showErrorModal: true,
                    errorMessage: 'Could not fetch topics. Try again later.'
                });
            }
            this.setState({ showTopics: true });
        } else {
            this.setState({ showTopics: false });
        }
    }

    generateTopics = (topics) => {
        for (const topic of topics) {
            this.topicsUI.push(
                <Topic name={topic.name} id={topic.ID} isCompany={true} />
            );
        }
        this.forceUpdate();
    }

    addTopic = (name, ID) => {
        this.topicsUI.push(
            <Topic name={name} id={ID} isCompany={true} />
        );
        this.forceUpdate();
    }

    createTopic = async () => {
        const res = await this.state.apiHelper.postTopic(this.nameForm.current.value, this.props.accessCode);
        if (!res.error) {
            this.addTopic(this.nameForm.current.value, res.ID);
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: 'Could not create topic. Try again later.'
            });
        }
        this.showTopicModal();
    }

    deleteForum = async () => {
        const res = await this.state.apiHelper.deleteEvent(this.props.accessCode);
        if (res) {
            this.setState({ hideForum: true });
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: 'Could not delete forum. Try again later.'
            });
        }
    }

    showTopicModal = () => { this.setState({ showTopicModal: !this.state.showTopicModal }); }
    showConfirmationModal = () => { this.setState({ showConfirmationModal: !this.state.showConfirmationModal }); }
    showErrorModal = () => { this.setState({ showErrorModal: !this.state.showErrorModal }); }

    render = () => {
        if (!this.state.hideForum) {
            return (
                <div>
                    <Row
                        style={{ width: '90%', textAlign: 'center', margin: 'auto', borderWidth: '1px', borderColor: '#AAA', borderStyle: 'solid', fontSize: '20px', cursor: 'pointer', marginBottom: '10px' }}
                        onClick={this.getTopics}
                    >
                        <Col style={{ textAlign: 'left', width: '40%' }}><b>{this.props.name}</b></Col>
                        <Col style={{ textAlign: 'right', width: '40%' }}><b>Access Code: {this.props.accessCode}</b></Col>
                        <Col xs={1} style={{ textAlign: 'right', width: '1%' }}><b><Button className='clearButton' onClick={this.showConfirmationModal}><b>Delete</b></Button></b></Col>
                    </Row>
                    <div style={{ display: (this.state.showTopics) ? '' : 'none', width: '90%', margin: 'auto', paddingLeft: '50px', marginBottom: '50px' }}>
                        <div style={{ marginLeft: '50px', paddingLeft: '5px' }}>
                            <Button className='createAForumButton' onClick={this.showTopicModal}><b>Create A New Topic</b></Button>
                            <div style={{ marginTop: '20px' }}>{this.topicsUI}</div>
                        </div>
                    </div>
                    <PostModal
                        showModal={this.state.showTopicModal}
                        hideModal={this.showTopicModal}
                        title={'Create Topic'}
                        reference={this.nameForm}
                        placeholder={'Topic Name'}
                        message={"Enter the topic's name below"}
                        create={this.createTopic}
                    />
                    <ConfirmationModal
                        showModal={this.state.showConfirmationModal}
                        hideModal={this.showConfirmationModal}
                        title={'Confirmation'}
                        message={"Are you sure you want to delete this forum?"}
                        delete={this.deleteForum}
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