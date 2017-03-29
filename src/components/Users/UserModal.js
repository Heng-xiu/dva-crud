// ./src/components/Users/UsersModal

import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, age } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{
                    type: 'string',
                    message: 'It since does not like a name...',
                  }, {
                    required: true,
                    message: 'Do not forget your name >.=',
                  }],
                })(<Input placeholder="Username" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                  rules: [{
                    type: 'email',
                    message: 'The input is not email!',
                  }, {
                    required: true,
                    message: 'Please input your E-mail!',
                  }],
                })(<Input placeholder="foo@bar.com" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Age"
            >
              {
                getFieldDecorator('age', {
                  initialValue: age,
                  rules: [{
                    type: 'integer',
                    message: 'This input is not number',
                  }, {
                    required: true,
                    message: 'Please input your Age!',
                  }],
                })(<InputNumber min={1} max={99} placeholder="18" />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
