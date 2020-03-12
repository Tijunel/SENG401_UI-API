import React from "react";
import { Table } from "react-bootstrap";
import ErrorModal from "../errorModal";

export default class CorporatePrivateFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackExists: false,
      showModal: false,
      message: ""
    };
    this.feedback = [];
  }

  componentWillMount = () => {
    fetch("/api/feedback/getFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          this.setState({
            showModal: true,
            message: "Oops! Something went wrong!"
          });
          return;
        }
      })
      .then(res => res.json())
      .then(res => {
        this.generateFeedbackUI(res);
      })
      .catch(err => {
        this.setState({
          showModal: true,
          message: "Oops! Something went wrong!"
        });
      });
  };

  renderTable = (message, index) => {
    return (
      <tr key={index}>
        <td>{message}</td>
      </tr>
    );
  };

  generateMessageTable = messages => {
    return (
      <div style={{ width: "50%", textAlign: "center", margin: "auto" }}>
        <Table striped>
          <thead>
            <tr>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>{messages.map(this.renderTable)}</tbody>
        </Table>
      </div>
    );
  };

  generateFeedbackUI = feedbackList => {
    for (const feedback of feedbackList) {
      console.log(feedback);
      this.feedback.push(
        <div style={{ marginTop: "80px" }}>
          <b style={{ fontSize: "calc(1vw + 0.8rem)" }}>{feedback.forumName}</b>
          {this.generateMessageTable(feedback.messages)}
        </div>
      );
    }
    this.setState({ feedbackExists: true });
    if (feedbackList.length > 0) {
      this.setState({ feedbackExists: true });
    }
  };

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
