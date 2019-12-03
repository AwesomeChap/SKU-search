// Simple header used for navigation

import React from 'react';
import { PageHeader, Radio, Button } from 'antd';
import { withRouter } from 'react-router';

const Header = props => {
    return (
        <PageHeader
            style={{
                background: "#f5f5f5",
                boxShadow: "0 0 10px #bbb",
                borderBottom: "1px solid #ddd"
            }}
            ghost={false}
            title="SKU Assistant"
            subTitle="Easing the way you search"
            extra={[
                <Button icon="search" onClick={() => { props.updateChoice(1); props.history.push("/") }} type={props.choice === 1 ? "primary" : "default"}>Test</Button>,
                <Button icon="setting" onClick={() => { props.updateChoice(2); props.history.push("/patterns") }} type={props.choice === 2 ? "primary" : "default"}>Configure Patterns</Button>
            ]}
        />
    )
}

export default withRouter(Header);