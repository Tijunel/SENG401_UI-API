import React from 'react';
import Topic from '../cDashComponents/topic';
import { Image, Form, Button, Modal} from 'react-bootstrap';

export default class AccessForum extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showIntro: (localStorage.getItem('showAccessIntro') === 'true') ? true : false,
            showTopicModal: false
        }
        this.topicsUI = [];
    }

    componentWillMount = () => {
        if (localStorage.getItem('showAccessIntro') === null) {
            localStorage.setItem('showAccessIntro', true)
            this.setState({ showIntro: true })
        }
        fetch('/api/forum/getForum/' + sessionStorage.getItem("forumID"), {//OQKUG4UL
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                if (res.status !== 200) {
                    this.setState({ showTopics: true });
                    throw new Error('error');
                }
                return res.json()
            })
            .then(res => {
                console.log(res.topics)
                this.generateTopics(res.topics);
                this.setState({ showTopics: true });
            })
            .catch(err => {
                console.log(err)
            });
    }

    getStarted = () => {
        localStorage.setItem('showAccessIntro', false)
        this.setState({ showIntro: false })
    }

    generateTopics = (topics) => {
        for (const topic of topics) {
            this.topicsUI.push(
                <Topic name={topic.name} id={topic.ID} isCompany={false}/>
            );
        }
        this.forceUpdate();
    }

    addTopic = (name, ID) => {
        this.topicsUI.push(
            <Topic name={name} id={ID} isCompany={false}/>
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
                forumID: sessionStorage.getItem('forumID')
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

    showTopicModal = () => {
        this.setState({ showTopicModal: !this.state.showTopicModal });
    }

    render = () => {
        return (
            <div id='accessDash' style={{ marginTop: '100px' }}>
                <div style={{ display: (this.state.showIntro) ? '' : 'none' }}>
                    <Image src={require('../../assets/welcome.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center' }} />
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Welcome!<br /></b>
                    <div>
                        <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                            You are now able to comment, respond to comments, and submit private feedback. Remember, all of your feedback is completely anonymous, so tell your organization what you really think!
                            Just remember, keep it professional, civil, and respectful.
                        </p>
                    </div>
                    <Button className='createForumButton' onClick={this.getStarted}><b>Get Started</b></Button>
                </div>
                <div style={{ display: (this.state.showIntro) ? 'none' : '' }}>
                    <div>
                        <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                            You can start commenting on this forum now! Remember to keep it professional, civil, and respectful.
                        </p>
                    </div>
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}>{sessionStorage.getItem('forumName')}</b>
                    <div>
                    <div style={{width: '90%', margin: 'auto'}}>
                        <div>
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
                </div>
                </div>
            </div>
        )
    }
}