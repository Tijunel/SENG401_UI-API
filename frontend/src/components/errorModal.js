import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class ErrorModal extends React.Component {
	showModal = () => {
		this.props.hideModal();
	};

	render = () => {
		return (
			<Modal
				id="newForumModal"
				show={this.props.showModal}
				onHide={this.showModal}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>
						<b style={{ fontSize: "25px" }}>Error</b>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ fontSize: "17px" }}>
					{this.props.message}
					<br />
					<br />
					<Button className='createAForumButton' onClick={this.props.hideModal}><b>Got It!</b></Button>
				</Modal.Body>
			</Modal>
		);
	};
}
