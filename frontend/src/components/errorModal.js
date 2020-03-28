import React from "react";
import { Modal } from "react-bootstrap";

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
				</Modal.Body>
			</Modal>
		);
	};
}
