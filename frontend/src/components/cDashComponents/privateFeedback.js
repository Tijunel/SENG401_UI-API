import React from "react";
import { Table } from "react-bootstrap";
import ErrorModal from "../errorModal";
import APIHelper from '../apiHelper';

export default class CorporatePrivateFeedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feedbackExists: false,
			showModal: false,
			message: "",
			apiHelper: APIHelper.getInstance()
		};
		this.feedback = [];
	}

	componentWillMount = async () => {
		const res = await this.state.apiHelper.getPrivateFeedback();
		if (!res.error) {
			if(res.length !== 0) {
				this.generateFeedbackUI(res);
			}
		} else {
			this.setState({
				showModal: true,
				message: "Oops! Something went wrong!"
			});
		}
	};

	renderTable = (message, index) => {
		return (
			<tr key={index}>
				<td>{message}</td>
			</tr>
		);
	}

	generateMessageTable = (messages) => {
		return (
			<div style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>
				<Table striped>
					<thead>
						<tr>
							<th>Feedback</th>
						</tr>
					</thead>
					<tbody>
						{messages.map(this.renderTable)}
					</tbody>
				</Table>
			</div>
		);
	}

	generateFeedbackUI = (feedbackList) => {
		for (const feedback of feedbackList) {
			this.feedback.push(
				<div style={{ marginTop: '40px' }}>
					<b style={{ fontSize: 'calc(1vw + 0.8rem)' }}>{feedback.forumName}</b>
					{this.generateMessageTable(feedback.messages)}
				</div>
			);
		}
		this.setState({ feedbackExists: true });
		if (feedbackList.length > 0) {
			this.setState({ feedbackExists: true });
		}
	}

	hideModal = () => { this.setState({ showModal: false }); }

	render = () => {
		return (
			<div id="corporateDash" style={{ marginTop: "80px" }}>
				<div style={{ display: this.state.feedbackExists ? "none" : "" }}>
					<p
						style={{
							fontSize: "calc(0.6vw + 0.8rem)",
							width: "50%",
							margin: "auto",
							marginTop: "calc(1vw + 33.33px)",
							textAlign: "center",
							lineHeight: "1.2",
							maxWidth: "900px"
						}}
					>
						No private feedback has been submitted yet.
          			</p>
				</div>
				<div style={{ display: this.state.feedbackExists ? "" : "none" }}>
					{this.feedback}
				</div>
				<ErrorModal
					showModal={this.state.showModal}
					message={this.state.message}
					hideModal={this.hideModal}
				/>
			</div>
		);
	};
}
