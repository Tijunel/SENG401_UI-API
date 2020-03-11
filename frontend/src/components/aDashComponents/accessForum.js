import React from 'react';
import { Image, Form, Button } from 'react-bootstrap';

export default class AccessForum extends React.Component {
    constructor(props) {
        super(props);
    }

    getStarted = () => {
        //Send to forum and show topics and comments
    }

    render = () => {
        return(
            <div>
                <div id='accessDash'>
                    <Image src={require('../../assets/welcome.svg')} style={{ width: '70vw', minWidth: '150px', maxWidth: '600px', textAlign: 'center', marginTop: '100px' }} />
                    <b style={{ fontSize: 'calc(3.8vw + 0.6rem)' }}><br />Welcome!<br /></b>
                    <div>
                        <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'left', lineHeight: '1.2', maxWidth: '900px', marginBottom: '40px' }}>
                            You are now able to comment, respond to comments, and submit private feedback. Remember, all of your feedback is completely anonymous, so tell your organization what you really think!
                            Just remember, keep it professional, civil, and respectful.
                        </p>
                    </div>
                    <Button className='createForumButton' href='/dashboard' onClick={this.createForum}><b>Get Started</b></Button>
                </div>
            </div>
        )
    }
}