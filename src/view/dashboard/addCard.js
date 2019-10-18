import React, {Component} from "react"
import {Modal, Select} from "antd"
import * as PropTypes from "prop-types"

export default class AddCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            panelsData: []
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }

    componentWillMount() {
        this.setState({
            panelsData: this.props.panelsData,
            selectPanelsId: null
        })
    }

    SetPanels() {
        return this.state.panelsData.map(v => (
            <Select.Option value={v.id} key={v.id}>
                {v.name}
            </Select.Option>
        ))
    }

    handleOk() {
        if (this.state.selectPanelsId) {
            this.props.modalOk(this.state.selectPanelsId)
        }
    }

    handleCancel() {
        this.props.modalCancel()
    }

    render() {
        const vm = this
        const selectPanels = item => {
            // console.log(item)
            vm.setState({
                selectPanelsId: item
            })
        }

        return (
            <Modal
                title={"添加"}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Select defaultValue={"请选择"} onChange={selectPanels}>
                    {this.state.panelsData ? this.SetPanels() : null}
                </Select>
            </Modal>
        )
    }
}
AddCard.propTypes = {
    panelsData: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    modalOk: PropTypes.func.isRequired,
    modalCancel: PropTypes.func.isRequired
}
