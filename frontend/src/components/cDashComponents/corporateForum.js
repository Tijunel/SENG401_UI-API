import React from 'react';
import Forum from './forum';
import { Image, Button } from 'react-bootstrap';
import APIHelper from '../apiHelper';
import PostModal from '../postModal';
import ErrorModal from '../errorModal';

export default class CorporateForum extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showForum: true,
            showForumModal: false,
            showErrorModal: false,
            errorMessage: "",
            showIntro: true,
            apiHelper: APIHelper.getInstance()
        }
        this.forumUI = [];
    }

    componentWillMount = async () => {
        const res = await this.state.apiHelper.getForums();
        if (!res.error) {
            if (res.forums.length > 0) {
                this.setState({ showIntro: false });
                this.generateForums(res.forums);
            }
        } else {
            this.setState({
                showErrorModal: true,
                errorMessage: 'Could not get forums. Try again later.'
            });
        }
    }

    generateForums = (forums) => {
        for (const forum of forums) {
            this.forumUI.push(
                <Forum name={forum.name} accessCode={forum.accessCode} />
            );
        }
        this.forceUpdate();
    }

    addForum = (name, accessCode) => {
        this.forumUI.push(
            <Forum name={name} accessCode={accessCode} />
        );
        this.forceUpdate();
    }

    createForum = async () => {
        const res = await this.state.apiHelper.postForum(this.nameForm.current.value);
        if (!res.error) {
            this.addForum(res.name, res.accessCode);
            this.setState({ showIntro: false, showForumModal: false });
        } else {
            this.setState({
                showForumModal: false,
                showErrorModal: true,
                errorMessage: 'Could not create forum. Try again later.'
            });
        }
    }

    showForumModal = () => { this.setState({ showForumModal: !this.state.showForumModal }); }
    showErrorModal = () => { this.setState({ showErrorModal: !this.state.showErrorModal }); }

    render = () => {
        return (
            <div id='corporateDash' style={{ marginTop: '100px' }}>
                <div style={{ display: (this.state.showIntro) ? '' : 'none' }}>
                    <Image src={require('../../assets/welcome.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center' }} />
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Welcome!<br /></b>
                    <div>
                        <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                            To get started, create a forum (e.g. a forum for your HR department). Once, the forum is created, you can share its access code with your employees. You can then create topics for the forum, where
                            you can start the discussion.
                        </p>
                    </div>
                </div>
                <Button className='createAForumButton' onClick={this.showForumModal}><b>Create A Forum</b></Button>
                <div style={{ marginTop: '20px' }}>{this.forumUI}</div>
                <PostModal
                    showModal={this.state.showForumModal}
                    hideModal={this.showForumModal}
                    title={'Create Forum'}
                    reference={this.nameForm}
                    placeholder={'Forum Name'}
                    message={"Enter the forum's name below"}
                    create={this.createForum}
                />
                <ErrorModal
                    showModal={this.state.showErrorModal}
                    hideModal={this.showErrorModal}
                    message={this.state.errorMessage}
                />
            </div>
        );
    }
}
