// Multiple purpose modal form used for editing and creating patterns.

import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Radio, Alert, Row, Col, Tag, Icon, Select, InputNumber, message } from 'antd';
import uuidv4 from 'uuid/v4';

const options = ["A-Z", "a-z", "0-9"];

const PatternForm = props => {
  const { visible, onCancel, onCreate, form, mode, onUpdate } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const [regexArray, setRegexArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editingEl, setEditingEl] = useState(null);
  const [expLength, setExpLength] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect( () => {
    if(mode === "Edit" && !!props.pattern){
      setRegexArray(props.pattern.regexArray);
    }
    else{
      setRegexArray([]);
    }
  }, [props] )

  // Gets invoked when user clicks on "Done" button.
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if(mode !== "Edit"){
          if (values["knowRegex"] == "no") {
            values["regexArray"] = regexArray;
            if (!regexArray.length) {
              return message.error("Regex is required!");
            }
          }
        } else {
          if (props.pattern["knowRegex"] == "no") {
            values["regexArray"] = regexArray;
            if (!regexArray.length) {
              return message.error("Regex is required!");
            }
          }
        }
        
        if(mode === "Edit") onUpdate({...values, key: props.pattern.key, knowRegex: props.pattern.knowRegex});
        else onCreate(values);
      }
    })
  }

  // used to expand current expression by added some sub expressions
  const handleAddSubExp = () => {
    if (!expLength || !selectedOptions.length)
      return message.info("Invalid details");
    else {
      setRegexArray([...regexArray, { uuid: uuidv4(), value: selectedOptions, length: expLength }]);
      setExpLength(null); setSelectedOptions([]);
    }
  }

  // used to delete sub expression
  const handleDeleteSubExp = (uuid) => {
    setRegexArray([...regexArray].filter(ra => ra.uuid !== uuid));
  }

  // used to update sub expression
  const handleUpdateSubExp = el => {
    setRegexArray([...regexArray].map(ra => {
      if (ra.uuid === el.uuid) {
        return { ...el };
      }
      return ra;
    }))
    setExpLength(null); setSelectedOptions([]);
  }

  // Basic instructions for new user
  const instructions = (
    <>
      <strong>Instructions</strong>
      <ol>
        <li style={{ marginLeft: -40 }}>Choose range(s) of characters</li>
        <li style={{ marginLeft: -40 }}>Enter length of the sub-sequence</li>
        <li style={{ marginLeft: -40 }}>Click Add to save the sub-expression</li>
        <li style={{ marginLeft: -40 }}>Click Done to finalise expression</li>
      </ol>
    </>
  )

  return (
    <Modal
      visible={visible}
      title={`${mode} Pattern`}
      okText="Done"
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose={true}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: mode === "Edit" ? props.pattern.name : undefined,
            rules: [{ required: true, message: 'Required' }],
          })(<Input placeholder={"eg. Crockery"} />)}
        </Form.Item>
        {
          mode !== "Edit" && (
            <Form.Item >
              {getFieldDecorator('knowRegex', {
                initialValue: 'no',
              })(
                <Radio.Group>
                  <Radio value="yes">I know Regex</Radio>
                  <Radio value="no">I don't know Regex</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          )
        }
        {
          getFieldValue("knowRegex") == "yes" || (!!props.pattern && props.pattern.knowRegex === "yes") ? (
            <Form.Item label="Regex Pattern">
              {getFieldDecorator('regex', {
                initialValue: mode === "Edit" ? props.pattern.regex : undefined,
                rules: [{ required: true, message: 'Required' }],
              })(<Input placeholder={"eg. /[A-Z]{3}[0-9]{3}/"} />)}
            </Form.Item>
          ) : (
              <>
                {
                  mode !== "Edit" && (
                    <Form.Item>
                      {showInstructions ? <Alert type="info" banner={true} afterClose={() => setShowInstructions(false)} closable closeText="hide" message={instructions} /> : <Button onClick={() => setShowInstructions(true)}>Show Instructions</Button>}
                    </Form.Item>
                  )
                }
                {
                  regexArray.map((ra, i) => {
                    return (
                      <Row key={ra.uuid} gutter={[8, 20]}>
                        <Col span={24}>
                          <Row style={{ boxShadow: "0 0 10px #ccc", padding: "5px 0px" }} type="flex" align="middle" gutter={8}>
                            {
                              editingEl !== ra.uuid ? (
                                <>
                                  <Col span={12}> {ra.value.map((rav, i) => <Tag key={`rav-${i + 1}`}>{rav}</Tag>)} </Col>
                                  <Col span={6}> {ra.length} </Col>
                                  <Col span={6}>
                                    <Row type="flex" justify="end">
                                      <Col> <Button disabled={!!editingEl} onClick={() => {
                                        setEditingEl(ra.uuid); setSelectedOptions(ra.value); setExpLength(ra.length)
                                      }} type="link" icon="edit" /> </Col>
                                      <Col> <Button disabled={!!editingEl} onClick={() => handleDeleteSubExp(ra.uuid)} type="link" style={{ color: "red" }} icon="delete" /> </Col>
                                    </Row>
                                  </Col>
                                </>
                              ) : (
                                  <>
                                    <Col span={12}>
                                      <Select
                                        mode="multiple"
                                        placeholder="Choose character ranges"
                                        value={selectedOptions}
                                        // defaultValue={ra.value}
                                        onChange={selectedOptions => setSelectedOptions(selectedOptions)}
                                      >
                                        {options.map(item => (
                                          <Select.Option key={item} value={item}>
                                            {item}
                                          </Select.Option>
                                        ))}
                                      </Select>
                                    </Col>

                                    <Col span={6}>
                                      <InputNumber
                                        // defaultValue={ra.length}
                                        value={expLength}
                                        onChange={value => setExpLength(value)}
                                        min={1} placeholder="length" />
                                    </Col>

                                    <Col span={6}>
                                      <Row type="flex" justify="end">
                                        <Col> <Button onClick={() => {
                                          setEditingEl(null); handleUpdateSubExp({ uuid: editingEl, value: selectedOptions, length: expLength })
                                        }} type="link" icon="check" /> </Col>
                                        <Col> <Button onClick={() => { setEditingEl(null); setSelectedOptions(null); setExpLength(null) }} type="link" style={{ color: "red" }} icon="cross" /> </Col>
                                      </Row>
                                    </Col>
                                  </>
                                )
                            }
                          </Row>
                        </Col>
                        {regexArray.length !== i + 1 && <Col span={24}>
                          <Row type="flex" justify="center">
                            <Col> <Icon type="arrow-down" /> </Col>
                          </Row>
                        </Col>}
                      </Row>
                    )
                  })
                }
                <Form.Item>
                  <div style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>Extend existing expression</div>
                  <Row gutter={8} style={{ boxShadow: "0 0 10px #ccc", padding: "5px 0px" }} type="flex" align="middle">
                    <Col span={12}>
                      <Select
                        mode="multiple"
                        placeholder="Choose character ranges"
                        value={!editingEl ? selectedOptions : null}
                        disabled={!!editingEl}
                        onChange={selectedOptions => setSelectedOptions(selectedOptions)}
                      >
                        {options.map(item => (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={6}>
                      <InputNumber value={!editingEl ? expLength : null} onChange={value => setExpLength(value)} min={1} placeholder="length" />
                    </Col>
                    <Col span={6}>
                      <Row type="flex" justify="end">
                        <Col><Button disabled={!!editingEl} type="link" onClick={handleAddSubExp} icon="plus" /></Col>
                      </Row>
                    </Col>
                  </Row>
                </Form.Item>
              </>
            )
        }
      </Form>
    </Modal>
  );
}

export default Form.create({ name: "pattern-form" })(PatternForm);
