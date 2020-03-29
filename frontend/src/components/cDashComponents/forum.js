import React from 'react';
import Topic from '../topic';
import { Row, Col, Button, Form } from 'react-bootstrap';
import APIHelper from '../apiHelper';
import ConfirmationModal from '../confirmationModal';
import PostModal from '../postModal';
import ErrorModal from '../errorModal';

export default class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.searchForm = React.createRef();
        this.nameForm = React.createRef();
        this.state = {
            showTopics: false,
            showTopicModal: false,
            showConfirmationModal: false,
            showErrorModal: false,
            errorMessage: "",
            hideForum: false,
            showSearch: false,
            apiHelper: APIHelper.getInstance()
        }
        this.topicsData = [];
        this.topicsUI = [];
    }

    deleteFromTopicData = (topicID) => {
        var tempTopicData = [];
        for (const topic in this.topicsData) {
            const data = this.topicsData[topic];
            if (data.ID !== topicID) tempTopicData.push(this.topicsData[topic]);
        }
        if (tempTopicData.length === 0) this.setState({ showSearch: false });
        this.topicsData = tempTopicData;
        this.generateTopics(this.topicsData);
    }

    getTopics = async () => {
        this.topicsUI = [];
        if (!this.state.showTopics) {
            const res = await this.state.apiHelper.getForum(this.props.accessCode);
            if (!res.error) {
                this.topicsData = [];
                for (const topic of res.topics) this.topicsData.push(topic);
                if (this.topicsData.length > 0) this.setState({ showSearch: true })
                this.generateTopics(this.topicsData);
            } else {
                this.setState({
                    showErrorModal: true,
                    errorMessage: 'Could not fetch topics. Try again later.'
                });
            }
            this.setState({ showTopics: true });
        } else this.setState({ showTopics: false });
    }

    updateFields = () => {
        const currentValue = this.searchForm.current.value.toUpperCase();
        var tempTopicData = [];
        for (const topic in this.topicsData) {
            const data = this.topicsData[topic];
            const name = (data.name).toUpperCase();
            if (name.includes(currentValue)) {
                tempTopicData.push(this.topicsData[topic]);
            }
        }
        this.generateTopics(tempTopicData);
    }

    generateTopics = (topics) => {
        this.topicsUI = [];
        for (const topic of topics) {
            this.topicsUI.push(
                <Topic name={topic.name} id={topic.ID} isCompany={true} deleteFromTopicData={this.deleteFromTopicData} key={topic.ID}/>
            );
        }
        this.setState({});
    }

    addTopic = (name, ID) => {
        this.topicsData.push({ name: name, ID: ID });
        this.topicsUI.push(
            <Topic name={name} id={ID} isCompany={true} deleteFromTopicData={this.deleteFromTopicData} key={ID}/>
        );
        this.setState({ showSearch: true });
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
            this.props.deleteFromForumData(this.props.accessCode);
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
                        style={{ width: '90%', textAlign: 'center', margin: 'auto', borderWidth: '1px', borderColor: '#AAA', borderStyle: 'solid', fontSize: '20px', marginBottom: '10px' }}
                    >
                        <Col style={{ textAlign: 'left' }}><b>{this.props.name}</b></Col>
                        <Col style={{ textAlign: 'right' }}><b>Access Code: {this.props.accessCode}</b></Col>
                        <Col xs={1} style={{ textAlign: 'right' }}><b><Button className='clearButton' onClick={this.showConfirmationModal}><b>Delete</b></Button></b></Col>
                        <Col xs={1} style={{ textAlign: 'right' }}><b><Button className='clearButton' onClick={this.getTopics}><b>Expand</b></Button></b></Col>
                    </Row>
                    <div style={{ display: (this.state.showTopics) ? '' : 'none', width: '90%', margin: 'auto', paddingLeft: '50px', marginBottom: '50px' }}>
                        <div style={{ marginLeft: '50px', paddingLeft: '5px' }}>
                            <Button className='createAForumButton' onClick={this.showTopicModal}><b>Create A New Topic</b></Button>
                            <Form className="form" style={{ display: (this.state.showSearch) ? '' : 'none' }}>
                                <Form.Group controlId="none">
                                    <Form.Control ref={this.searchForm} className='control' placeholder={"Search"} type='text' autoComplete="nope" required onChange={this.updateFields} style={{ width: '50%' }} />
                                </Form.Group>
                            </Form>
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