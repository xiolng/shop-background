import React, {Component} from "react"
import {Button, Checkbox, Form, Icon, Input} from "antd"
import {Redirect} from "react-router-dom"
import BGParticle from "../../utils/bgParticle"

import "./login.scss"
import {setTokens} from "@/store/action"
import {connect} from "react-redux"

class Login extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: false
    }
  }

  componentDidMount() {
    this.particle = new BGParticle("loginBox")
    this.particle.init()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values)
        this.setState({
          isLogin: true
        })
      }
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form
    return !this.state.isLogin ? (
      <div id={"loginBox"} className="loginBox">
        <div className="loginContent">
          <div className="logo">
            {/* <img src={logo} alt="友信金服" /> */}
          </div>
          <div className="loginForm">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    {required: true, message: "Please input your username!"}
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {required: true, message: "Please input your Password!"}
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to={"/"}/>
    )
  }
}

const mapStateToProps = (state, OwnProps) => ({
  token: state.mainConfig.token
})

const mapDispatchToProps = {
  setTokens
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
