import React from 'react';
import { Image, Form, Button, Modal } from 'react-bootstrap';

export default class CorporateForum extends React.Component {
    constructor(props) {
        super(props);
        this.nameForm = React.createRef();
        this.state = {
            showForum: true,
            showForumModal: false,
            showIntro: true,
            forums: []
        }
        this.forumUI = []
    }

    componentWillMount = () => {
        fetch('/api/user/getForums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // id: sessionStorage.getItem('id')
            })
        }) //Check status numbers
            .then(res => res.json())
            .then(res => {
                if (res.forums.length > 0) {
                    this.setState({ showIntro: false })
                    this.generateForums(res.forums)
                }
                //Show confirmation or error modal
            })
            .catch(err => {
                console.log(err) //show error modal
            });
    }

    generateForums = (forums) => {
        this.setState({ forums: [] })
        for (const forum of forums) {
            this.state.forums.push({ name: forum.name, accessCode: forum.accessCode })
        }
        for (const forum of this.state.forums) {
            this.forumUI.push(
                <div>
                    {forum.name}&nbsp;{forum.accessCode}
                </div>
            )
        }
        this.setState({})
    }

    addForum = (name, accessCode) => {
        this.state.forums.push({ name: name, accessCode: accessCode })
        this.forumUI = [];
        this.generateForums(this.state.forums)
    }

    createForum = () => {
        fetch('/api/user/createForum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.nameForm.current.value,
                // id: sessionStorage.getItem('id')
            })
        })
            .then(res => res.json())
            .then(res => {
                let name = res.name
                let accessCode = res.accessCode
                this.addForum(name, accessCode)
                this.setState({ showIntro: false, showForumModal: false })
            })
            .catch(err => {
                console.log(err)
            });
    }

    showForumModal = () => {
        this.setState({ showForumModal: !this.state.showForumModal })
    }

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
                <div>{this.forumUI}</div>
                <Button className='createAForumButton' onClick={this.showForumModal}><b>Create A Forum</b></Button>
                <Modal id='newForumModal' show={this.state.showForumModal} onHide={this.showForumModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b style={{ fontSize: '25px' }}>Create Forum</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: '17px' }}>
                        Enter the forum's name below<br /><br />
                        <Form className="form">
                            <Form.Group controlId="name">
                                <Form.Control ref={this.nameForm} className='control' placeholder='Forum Name' type='text' required />
                            </Form.Group>
                        </Form>
                        <Button className='createForumButton' onClick={this.createForum}><b>Submit</b></Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}