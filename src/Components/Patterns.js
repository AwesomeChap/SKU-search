import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, Modal } from 'antd';
import PatternForm from './PatternForm';
import uuidv4 from 'uuid/v4';
import RandExp from "randexp";

const Patterns = props => {
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState("New");
    const [pattern, setPattern] = useState(null);

    // Toggles visibiity of the modal form.
    const showModal = () => {
        setVisible(true);
    };

    // closes modal form
    const handleCancel = () => {
        setVisible(false);
    };

    // handes additon of new pattern.
    const handleAdd = (pattern) => {
        if (pattern.knowRegex == "no") {
            let rgx = "";
            pattern.regexArray.forEach((ra, i) => {
                rgx += `[${ra.value.join("")}]{${ra.length}}`
                if (i < pattern.regexArray.length - 1) {
                    rgx += "-";
                }
            })
            // rgx += "/"
            pattern["regex"] = rgx;
        }
        pattern["key"] = uuidv4();
        pattern["example"] = new RandExp(pattern["regex"]).gen();

        props.addPattern(pattern);
        setVisible(false);
        setPattern(null);
    }

    // gets invoked whrn user clicks on "Edit" button.
    const handleEdit = (record) => {
        setMode("Edit");
        setPattern(record);
        setVisible(true);
    }

    // used to update pattern
    const updatePattern = (pattern) => {
        console.log(pattern);

        if (pattern.knowRegex == "no") {
            pattern.regexArray.forEach((ra, i) => {
                rgx += `[${ra.value.join("")}]{${ra.length}}`
                if (i < pattern.regexArray.length - 1) {
                    rgx += "-";
                }
            })
            pattern["regex"] = rgx;
        }
        
        pattern["example"] = new RandExp(pattern["regex"]).gen();

        // console.log(pattern);
        props.modifyPattern(pattern);
        setVisible(false);
    }

    // handles deletion of pattern
    const handleDelete = (record) => {
        props.deletePattern(record.key)
    }

    // columns of the table visible at "/patterns" route
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Regex",
            dataIndex: "regex",
        },
        {
            title: "Example",
            dataIndex: "example",

        },
        {
            width: "20%",
            title: "Operations",
            dataIndex: "operations",
            render: (text, record) => {
                return (
                    <Row>
                        <Col span={12}> <Button onClick={() => handleEdit(record)}>Edit</Button> </Col>
                        <Col span={12}> <Button onClick={() => handleDelete(record)}>Delete</Button> </Col>
                    </Row>
                )
            }
        }
    ]

    return (
        <div style={{ padding: "0px 20px" }}>
            <Row type="flex" justify="end">
                <Col>
                    <Button icon={"plus"} onClick={() => { setMode("New"); showModal() }} type="primary" style={{ marginBottom: 16 }}>
                        New Pattern
                    </Button>
                </Col>
            </Row>
            <Table
                bordered
                dataSource={props.patterns}
                columns={columns}
            />
            <PatternForm
                mode={mode}
                visible={visible}
                onCancel={handleCancel}
                onCreate={handleAdd}
                pattern={pattern}
                onUpdate={updatePattern}
            />
        </div>
    )
}

export default Patterns;