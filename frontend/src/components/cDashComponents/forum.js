import React from 'react';
import Topic from './topic';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import APIHelper from './apiHelper';

export default class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showTopics: false,
            showTopicModal: false,
            showConfirmationModal: false,
            hideForum: false,
            apiHelper: APIHelper.getInstance()
        }
        this.topicsUI = [];
    }

    getTopics = async() => {
        this.topicsUI = [];
        if (!this.state.showTopics) {
            const res = await this.state.apiHelper.getForum(this.props.accessCode);
            if(!res.error) {
                this.generateTopics(res.topics);
            } else {
                //Show error
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

    createTopic = async() => {
        const res = await this.state.apiHelper.postTopic(this.nameForm.current.value, this.props.accessCode);
        if(!res.error) {
            this.addTopic(this.nameForm.current.value, res.ID);
        } else {
            //Show error
        }
        this.showTopicModal();
    }

    deleteForum = async () => {
        const res = await this.state.apiHelper.deleteEvent(this.props.accessCode);
        if (res) {
            this.setState({ hideForum: true });
        } else {
            //Show error
        }
    }

    showTopicModal = () => { this.setState({ showTopicModal: !this.state.showTopicModal }); }
    showConfirmationModal = () => { this.setState({ showConfirmationModal: !this.state.showConfirmationModal }); }

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
                    <Modal id='newForumModal' show={this.state.showTopicModal} onHide={this.showTopicModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b style={{ fontSize: '25px' }}>Create Topic</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '17px' }}>
                            Enter the topic's name below<br /><br />
                            <Form className="form">
                                <Form.Group controlId="name">
                                    <Form.Control ref={this.nameForm} className='control' placeholder='Topic Name' type='text' required />
                                </Form.Group>
                            </Form>
                            <Button className='createAForumButton' onClick={this.createTopic}><b>Submit</b></Button>
                        </Modal.Body>
                    </Modal>
                    <Modal id='newForumModal' show={this.state.showConfirmationModal} onHide={this.showConfirmationModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b style={{ fontSize: '25px' }}>Confirmation</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '17px' }}>
                            Are you sure you want to delete this forum?<br /><br />
                            <Button className='createAForumButton' onClick={this.deleteForum}><b>Yes!</b></Button>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}