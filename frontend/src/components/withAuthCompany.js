import React from 'react';
import {Redirect} from 'react-router-dom';

export default function WithAuthCompany(ComponentToProtect) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                loading: false,
                redirect: true
            }
        }

        periodicallyCheckToken = () => {
            fetch('/api/checkCompanyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200) this.setState({ loading: false })
                else {
                    const error = new Error(res.error)
                    throw error;
                }
            })
            .catch(err => {
                this.setState({ loading: false, redirect: true })
            })
        }

        componentDidMount = () => {
            fetch('/api/checkCompanyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( res => {
                if(res.status === 200) this.setState({loading: false});
                else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {this.setState({loading: false, redirect: true})});
            this.timerID = setInterval(() => this.periodicallyCheckToken(), 30000);
        }

        render = () => {
            const {loading, redirect} = this.state
            if(loading) return null;
            if(redirect) return <Redirect to='/signIn'/>
            return (
                <React.Fragment>
                    <ComponentToProtect/>
                </React.Fragment>
            )
        }
    }
}