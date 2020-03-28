import React from 'react';
import { Modal, Form, Button } from "react-bootstrap";

export default class PostModal extends React.Component {
    showModal = () => {
        this.props.hideModal();
    };

    render = () => {
        return (
            <Modal id='newForumModal' show={this.props.showModal} onHide={this.showModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <b style={{ fontSize: '25px' }}>{this.props.title}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '17px' }}>
                    {this.props.message}<br /><br />
                    <Form className="form">
                        <Form.Group controlId="name">
                            <Form.Control ref={this.props.reference} className='control' placeholder={this.props.placeholder} type='text' required />
                        </Form.Group>
                    </Form>
                    <Button className='createAForumButton' onClick={this.props.create}><b>Submit</b></Button>
                </Modal.Body>
            </Modal>
        );
    }
}