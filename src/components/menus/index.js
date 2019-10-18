import React, {Component} from "react"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import {routeConfig} from "@/router"
import {setBreads} from '@/store/action'
import {connect} from "react-redux"

class Menus extends Component {
    componentDidMount() {
        routeConfig[1].routes.map(item => {
            if (item.path === this.props.location) {
                this.setBreadcrumb(item)
            }
            return item
        })
    }

    setBreadcrumb(item) {
        this.props.setBreads({
            parent: item.parent,
            name: item.name
        })
    }

    getNavList() {
        return routeConfig[1].routes.map(item =>
            item.hideMenu ? (
                ""
            ) : (
                <Menu.Item key={item.name}>
                    <Link
                        to={item.path}
                        onClick={() => {
                            this.setBreadcrumb(item)
                        }}
                    >
                        {item.name}
                    </Link>
                </Menu.Item>
            )
        )
    }

    render() {
        return (
            <Menu
                theme={"dark"}
                mode="horizontal"
                defaultSelectedKeys={[this.props.breadcrumb.name]}
                defaultOpenKeys={[this.props.breadcrumb.parent]}
                selectedKeys={[this.props.breadcrumb.name]}
                style={{lineHeight: "64px"}}
            >
                {this.getNavList()}
            </Menu>
        )
    }
}

const mapStateToProps = (state, OwnProps) => ({
    breadcrumb: state.mainConfig.breadcrumb
})

const mapDispatchToProps = {
    setBreads
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus)