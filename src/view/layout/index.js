import React, {Component} from "react"
import {Layout, Breadcrumb, Row, Col} from "antd"
import Users from "@/components/users"
import Menus from "@/components/menus"
import "./style.scss"
import {setBreads} from "@/store/action"
import {connect} from "react-redux"

const {Header, Content} = Layout

class LayoutModule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isToken: true
        }
    }

    componentDidMount() {
        this.isToken()
    }

    componentDidUpdate() {
    }

    isToken() {
        if (!this.props.token) {
            this.setState({
                isToken: this.props.token
            })
        }
    }

    render() {
        return this.state.isToken ? (
            <Layout>
                <Header
                    className={"App-header"}
                    style={{position: "fixed", top: 0, left: 0, right: 0}}
                >
                    <div className="App-logo">
                        数据监控
                        {/* <img src={logo} alt=""/> */}
                    </div>
                    <div className="App-menu">
                        <Row gutter={10}>
                            <Col span={20}>
                                <Menus />
                            </Col>
                            <Col span={4}>
                                <Row type={"flex"} justify={"end"}>
                                    <Col>
                                        <Users />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Header>
                <Layout style={{marginTop: "64px"}}>
                    <Layout style={{padding: "0 24px 24px"}}>
                        <Breadcrumb style={{margin: "16px 0"}}>
                            <Breadcrumb.Item>
                                {this.props.breadcrumb.parent}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.breadcrumb.name}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: "#fff",
                                padding: 24,
                                margin: 0,
                                height: "calc(100vh - 141px)",
                                overflow: "hidden",
                                overflowY: "auto",
                                position: "relative"
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        ) : (
            <div>{this.props.children}</div>
        )
    }
}

const mapStateToProps = (state, OwnProps) => ({
    breadcrumb: state.mainConfig.breadcrumb,
    token: state.mainConfig.token
})

const mapDispatchToProps = {
    setBreads
}
export default connect(mapStateToProps, mapDispatchToProps)(LayoutModule)
