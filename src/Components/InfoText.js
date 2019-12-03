import React, {useState} from 'react';
import {Alert} from 'antd';
import {Link} from 'react-router-dom';

const InfoText = props => {
    const message = (ch) => {
        switch(ch){
            case 1: return <p>You  have {props.patterns.length} {props.patterns.length > 2 ? "patterns" : "pattern"} available. <Link onClick={() => props.updateChoice(2)} to="/patterns">View All</Link></p>;
            case 2: return `Found ${props.patterns.length} ${props.patterns.length > 2 ? "patterns" : "pattern"}`;
            default: return ;
        }
    }

    return (
        <div style={{padding: "16px 20px"}}>
            {props.bannerVisibility ? (
                <Alert
                    showIcon={false}
                    banner={true}
                    closeText="Hide Now"
                    message={message(props.choice)}
                    type="info"
                    closable
                    afterClose={() => props.updateBannerVisibility(false)}
                />
            ) : null}
        </div>
    )
}

export default InfoText