import React from 'react';
import { Modal } from 'react-bootstrap';

export default class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        }
    }

    showModal = () => {
        this.setState({showModal: false})
    }

    render = () => {
        return (
            <Modal id='newForumModal' show={this.props.showModal && this.state.showModal} onHide={this.showModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <b style={{ fontSize: '25px' }}>Error</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '17px' }}>
                    Oops! Something went wrong.<br /><br />
                </Modal.Body>
            </Modal>
        )
    }
}