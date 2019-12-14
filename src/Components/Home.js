// User can here test the patterns by querying in the provided search field.

import React, { useEffect } from 'react';
import { Input, Row, Col, Alert, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const Home = props => {

    const [matchedPts, setMatchedPts] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sugg, setSugg] = useState([]);

    const { patterns } = props;

    const handleSearch = value => {

        setSearchValue(value);

        setMatchedPts(patterns.filter(pt => {
            const regexp = new RegExp(pt.value);
            return regexp.test(value)
        }));
    }

    return (
        <div style={{ padding: 20 }}>
            <Row type="flex" gutter={[0, 20]} justify="center" style={{ width: 600, margin: "0 auto" }}>
                <Col span={24}>
                    <Input.Search allowClear style={{ width: "100%" }} onSearch={(value) => { setMatchedPts([]); handleSearch(value) }} size="large" />
                </Col>
                {
                    !!matchedPts.length ? (
                        <>
                            <Col span={24}>
                                <Title style={{ transform: "translate(25%)" }}>Matched Patterns</Title>
                            </Col>
                            {matchedPts.map((pt) => {
                                return (
                                    <Col span={24}>
                                        <Alert
                                            message={pt.name}
                                            description={`Pattern: ${pt.value}`}
                                            type="success"
                                            showIcon
                                        />
                                    </Col>
                                )
                            })}
                        </>
                    ) : (
                        !!searchValue.length && (
                            <div>No Results</div>
                        )
                    )
                }
            </Row>
        </div>
    )
}

export default Home;