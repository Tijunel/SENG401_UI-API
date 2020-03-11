import React from 'react';

export default class CorporatePrivateFeedback extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render = () => {
        return (
            <div id='corporateDash'>
                <div>
                    <p style={{ fontSize: 'calc(0.6vw + 0.8rem)', width: '50%', margin: 'auto', marginTop: 'calc(1vw + 33.33px)', textAlign: 'center', lineHeight: '1.2', maxWidth: '900px', marginTop: '80px' }}>
                        No private feedback has been submitted yet.
                    </p>
                </div>
            </div>
        )
    }
}