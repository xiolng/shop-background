import React, {Component} from "react"
import {Input, Modal, Form} from "antd"
import * as PropTypes from "prop-types"

class AddBannedModal extends Component {
    componentDidMount() {
        this.props.form.setFieldsValue({
            dashboardName: this.props.dashboardName
        })
    }

    render() {
        const {
            visible, handleCancel, handleOk, form, edit
        } = this.props
        const {getFieldDecorator} = form

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            }
        }
        return (
            <Modal
                title={edit ? '编辑' : '新建'}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <Form layout="inline" style={{lineHeight: '60px'}}>
                        <Form.Item label={'name'} style={{display: 'block'}} {...formItemLayout}>
                            {getFieldDecorator('dashboardName', {
                                rules: [{
                                    required: true, message: '不能为空'
                                }]
                            })(
                                <Input style={{width: '260px', margin: '0 5px'}} placeholder="" />
                            )}
                        </Form.Item>
                    </Form>

                </div>
            </Modal>
        )
    }
}

AddBannedModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    dashboardName: PropTypes.string.isRequired
}

export default Form.create({name: 'dashboard_form'})(AddBannedModal)