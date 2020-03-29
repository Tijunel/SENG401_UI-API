import React from 'react';
import Topic from '../topic';
import { Image, Button, Form } from 'react-bootstrap';
import APIHelper from '../apiHelper';
import PostModal from '../postModal';
import ErrorModal from '../errorModal';

export default class AccessForum extends React.Component {
    constructor(props) {
        super(props);
        this.searchForm = React.createRef();
        this.nameForm = React.createRef();
        this.postModal = React.createRef();
        this.state = {
            showIntro: (localStorage.getItem('showAccessIntro') === 'true') ? true : false,
            showTopicModal: false,
            showErrorModal: false,
            errorMessage: "",
            showSearch: false,
            apiHelper: APIHelper.getInstance()
        }
        this.topicsData = [];
        this.topicsUI = [];
    }

    componentWillMount = async () => {
        if (localStorage.getItem('showAccessIntro') === null) {
            localStorage.setItem('showAccessIntro', true);
            this.setState({ showIntro: true });
        }
        const res = await this.state.apiHelper.getForum(sessionStorage.getItem("forumID"));
        if (!res.error) {
            this.topicsData = [];
            for (const topic of res.topics) this.topicsData.push(topic);
            if (this.topicsData.length > 0) this.setState({ showSearch: true })
            this.generateTopics(this.topicsData);
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: "Could not fetch topics. Try again later."
            });
        }
        this.setState({ showTopics: true });
    }

    getStarted = () => {
        localStorage.setItem('showAccessIntro', false);
        this.setState({ showIntro: false });
    }

    updateFields = () => {
        const currentValue = this.searchForm.current.value.toUpperCase();
        var tempTopicData = [];
        for (const topic in this.topicsData) {
            const data = this.topicsData[topic];
            const name = (data.name).toUpperCase();
            if (name.includes(currentValue)) tempTopicData.push(this.topicsData[topic]);
        }
        this.generateTopics(tempTopicData);
    }

    generateTopics = (topics) => {
        this.topicsUI = [];
        for (const topic of topics) {
            this.topicsUI.push(
                <Topic name={topic.name} id={topic.ID} isCompany={false} />
            );
        }
        this.forceUpdate();
    }

    addTopic = (name, ID) => {
        this.topicsData.push({ name: name, ID: ID });
        this.topicsUI.push(
            <Topic name={name} id={ID} isCompany={false} />
        );
        this.setState({ showSearch: true });
    }

    createTopic = async () => {
        if(this.nameForm.current.value === "") {
            this.postModal.current.notifyEmptyText("Oops! Please provide a name for the topic.");
            return;
        }   
        const res = await this.state.apiHelper.postTopic(this.nameForm.current.value, sessionStorage.getItem('forumID'));
        if (!res.error) {
            this.addTopic(this.nameForm.current.value, res.ID);
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: "Could not create topic. Try again later."
            });
        }
        this.showTopicModal();
    }

    showTopicModal = () => { this.setState({ showTopicModal: !this.state.showTopicModal }); }
    showErrorModal = () => { this.setState({ showErrorModal: !this.state.showErrorModal }); }

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
                        <div style={{ width: '90%', margin: 'auto' }}>
                            <div>
                                <Button className='createAForumButton' onClick={this.showTopicModal}><b>Create A New Topic</b></Button>
                                <Form className="form" style={{ display: (this.state.showSearch) ? '' : 'none' }}>
                                    <Form.Group controlId="none">
                                        <Form.Control ref={this.searchForm} className='control' placeholder={"Search"} type='text' autoComplete="nope" required onChange={this.updateFields} style={{ width: '70%' }} />
                                    </Form.Group>
                                </Form>
                                <div style={{ marginTop: '20px' }}>{this.topicsUI}</div>
                            </div>
                        </div>
                        <PostModal
                            showModal={this.state.showTopicModal}
                            hideModal={this.showTopicModal}
                            title={'Create Topic'}
                            message={"Enter the topic's name below."}
                            reference={this.nameForm}
                            placeholder={"Topic Name"}
                            create={this.createTopic}
                            ref={this.postModal}
                        />
                        <ErrorModal
                            showModal={this.state.showErrorModal}
                            hideModal={this.showErrorModal}
                            message={this.state.errorMessage}
                        />
                    </div>
                </div>
            </div>
        )
    }
}