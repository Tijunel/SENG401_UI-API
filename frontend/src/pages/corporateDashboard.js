import React from 'react';
import DashTopNav from '../components/dashTopNav';
import { Image, Form, Button } from 'react-bootstrap';
import '../styling/corporateDash.css';

export default class CorporateDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    createForum = () => {
        //Show a modal and get all the information needed to create a forum
        //Once the info is submitted, interact with the forum service and create and new one
    }

    render = () => {
        return (
            <div id='corporateDash'>
                <DashTopNav />
                <Image src={require('../assets/welcome.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center', marginTop: '100px'}} />
                <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Welcome!<br /></b>
                <div>
                    <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                        To get started, create a forum (e.g. a forum for your HR department). Once, the forum is created, you can share its access code with your employees. You can then create topics for the forum, where
                        you can start the discussion. 
                    </p>
                </div>
                <Button className='createForumButton' href='/dashboard' onClick={this.createForum}><b>Create A Forum</b></Button>
            </div>
        );
    }
}