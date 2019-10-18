import React, {Component} from "react"
import Cookies from "js-cookie"
import {Icon} from "antd"
import * as PropTypes from "prop-types"

export class Card extends Component {
    componentDidMount() {
        const cookieList = JSON.parse(localStorage.getItem("cookieList"))
        setTimeout(() => {
            cookieList.map(v => {
                Cookies.set(v.name, v.value, {path: v.path})
                return false
            })
        }, 0)
    }

    render() {
        const item = this.props.item
        const provided = this.props.provided
        const onDelete = this.props.onDelete
        return item.id ? (
            <div
                className="layout-Item"
                {...provided.props}
                {...provided.dragHandle}
                style={{
                    ...provided.props.style,
                    background: `${provided.isDragging ? "#c5f8ff" : "white"}`,
                    cursor: `${this.props.edits ? "move" : "no-drop"}`
                }}
            >
                <div
                    style={{
                        padding: 5,
                        textAlign: "center",
                        color: "#595959",
                        height: "100%"
                    }}
                >
                    <span
                        style={{
                            marginBottom: "3px",
                            display: "inline-block"
                        }}
                    >{`${item.name}--${item.key}`}</span>
                    <span
                        onClick={() => onDelete(item)}
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 3,
                            marginRight: "10px",
                            cursor: `${this.props.edits ? "pointer" : "no-drop"}`,
                            zIndex: 5
                        }}
                    >
                        <Icon type="close-circle" theme="twoTone" />
                    </span>
                    <div style={{borderBottom: "1px solid rgba(120,120,120,0.1)"}} />
                    <iframe
                        src={item.url}
                        style={{border: 0, width: "100%", height: "calc(100% - 40px)"}}
                        title={item.id}
                    />
                </div>
                {this.props.edits ? (
                    <span
                        {...provided.resizeHandle}
                        style={{
                            position: "absolute",
                            width: 10,
                            height: 10,
                            right: 2,
                            bottom: 2,
                            cursor: "se-resize",
                            borderRight: "2px solid rgba(15,15,15,0.2)",
                            borderBottom: "2px solid rgba(15,15,15,0.2)",
                            zIndex: 5
                        }}
                    />
                ) : null}
                {this.props.edits ? (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 3
                        }}
                    />
                ) : null}
            </div>
        ) : null
    }
}

Card.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        key: PropTypes.number.isRequired,
        grid_x: PropTypes.number.isRequired,
        grid_y: PropTypes.number.isRequired,
        w: PropTypes.number.isRequired,
        h: PropTypes.number.isRequired,
        GridX: PropTypes.number.isRequired,
        GridY: PropTypes.number.isRequired
    }),
    provided: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    edits: PropTypes.bool.isRequired
}
