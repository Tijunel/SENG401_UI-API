import React from 'react';
import Topic from './topic';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';

export default class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showTopics: false,
            showTopicModal: false,
            showConfirmationModal: false,
            hideForum: false
        }
        this.topicsUI = [];
    }

    getTopics = () => {
        this.topicsUI = [];
        if (!this.state.showTopics) {
            fetch('/api/forum/getForum/' + this.props.accessCode, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status !== 200) {
                        this.setState({ showTopics: true });
                        throw new Error('error');
                    }
                    return res.json()
                })
                .then(res => {
                    this.generateTopics(res.topics);
                    this.setState({ showTopics: true });
                })
                .catch(err => {
                    console.log(err)
                });
        }
        else {
            this.setState({ showTopics: false });
        }
    }

    generateTopics = (topics) => {
        for (const topic of topics) {
            this.topicsUI.push(
                <Topic name={topic.name} id={topic.ID} isCompany={true}/>
            );
        }
        this.forceUpdate();
    }

    addTopic = (name, ID) => {
        this.topicsUI.push(
            <Topic name={name} id={ID} isCompany={true}/>
        );
        this.forceUpdate();
    }

    createTopic = () => {
        fetch('/api/forum/postTopic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topicName: this.nameForm.current.value,
                forumID: this.props.accessCode
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    throw new Error('Error');
                }
                else {
                    res = await res.json()
                    this.addTopic(this.nameForm.current.value, res.ID);
                }
                this.showTopicModal()
            })
            .catch(err => {
                console.log(err)
            });
    }

    deleteForum = () => {
        fetch('/api/forum/deleteEvent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: this.props.accessCode
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    throw new Error('Error')
                }
                else {
                    this.setState({ hideForum: true });
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    showTopicModal = () => {
        this.setState({ showTopicModal: !this.state.showTopicModal });
    }

    showConfirmationModal = () => {
        this.setState({ showConfirmationModal: !this.state.showConfirmationModal });
    }

    render = () => {
        if(!this.state.hideForum) {
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