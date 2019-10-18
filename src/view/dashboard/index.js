import React, {Component} from "react"
import {Link} from "react-router-dom"
import {Button, Col, Input, message, Modal, Row, Table} from "antd"
import * as ReactDOM from "react-dom"
import AddDashboard from './AddDashboard'

export default class Dashboard extends Component {
  constructor({props}) {
    super(props)
    this.state = {
      tableData: [],
      visible: false,
      dashboardName: '',
      isEdit: false,
      id: "",
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true
      },
      visibleDelete: false
    }
    this.searchValue = React.createRef()
  }

  componentDidMount() {
    this.getList()
  }

  getList(current, pageSize, key, value) {
    window.axios.get(`/api/v1.0/dashboards?page=${current || 1}&page_size=${pageSize || 10}&key=${key || ''}&value=${value || ''}`).then(res => {
      const data = res.data.data.map(v => {
        return {
          key: v.id,
          ...v
        }
      })
      this.setState((preState) => ({
        tableData: data,
        pagination: {
          current: preState.pagination.current,
          pageSize: preState.pagination.pageSize,
          showSizeChanger: true,
          total: res.data.total
        }
      }))
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      isEdit: false
    })
  };

  handleOk = e => {
    e.preventDefault()
    const form = this.formRef.props.form
    form.validateFields((err, data) => {
      if (!err) {
        if (data.dashboardName && this.state.isEdit) {
          window.axios.put(`/api/v1.0/dashboards/${this.state.id}`, {
            name: data.dashboardName
          }).then(res => {
            message.info('编辑成功')
            this.setState({
              visible: false
            }, () => {
              form.resetFields()
              this.getList()
            })
          })
        } else if (data.dashboardName && !this.state.isEdit) {
          window.axios.post(`/api/v1.0/dashboards`, {
            name: data.dashboardName
          }).then(res => {
            message.info('新建成功')
            this.setState({
              visible: false
            }, () => {
              form.resetFields()
              this.getList()
            })
          })
        }
        return false
      }
      this.setState({
        visible: true
      })
    })


    this.setState({
      visible: false,
      dashboardName: ''
    })
  };

  handleCancel = e => {
    // console.log(e)
    this.setState({
      visible: false,
      dashboardName: '',
      visibleDelete: false
    })
  };

  editName(item) {
    this.setState({
      dashboardName: item.name,
      visible: true,
      isEdit: true,
      id: item.id
    })
  }

  deleteName(item) {
    this.setState({
      id: item.id,
      visibleDelete: true
    })
  }

  deleteOk() {
    window.axios.delete(`/api/v1.0/dashboards/${this.state.id}`).then(res => {
      // console.log("delete", res)
      this.setState({
        visibleDelete: false
      })
      this.getList()
    })
  }

  /**
   * 链接 新建modal的表单
   * @param formRef
   */
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  tableChange(pagination, filters, sorter) {
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true
      }
    }, () => {
      this.getList(pagination.current, pagination.pageSize, this.state.key, this.state.value)
    })
  }

  render() {
    const columns = [
      {
        key: "name",
        title: "name",
        dataIndex: "name"
      },
      {
        key: "operation",
        title: "操作",
        render: (text, record, index) => {
          return (
            <span>
                          <Link
                            to={{
                              pathname: `/DashboardDetail/${record.id}`
                            }}
                            style={{marginRight: "10px"}}
                          >
                详情
                          </Link>
                          <Button
                            type={"primary"}
                            style={{marginRight: "10px"}}
                            size={"small"}
                            onClick={() => this.editName(record)}
                          >
                编辑
                          </Button>
                          <Button onClick={() => this.deleteName(record)} size={"small"}>
                删除
                          </Button>
                      </span>
          )
        }
      }
    ]
    const searchChange = (e) => {
      this.setState({
        value: e,
        pagination: {
          current: 1,
          pageSize: 10
        }
      }, () => {
        this.getList(this.state.pagination.current, this.state.pagination.pageSize, this.state.key, e)
      })
    }
    return (
      <div>
        <Row type={"flex"} justify={"end"} style={{marginBottom: "20px"}}>
          <Col span={18}>
            <div style={{display: 'inline-block'}}>
              {/* <Input.Search */}
              {/* placeholder={this.state.key === 'ip' ? '请输入ip' : '请输入搜索内容'} */}
              {/* onSearch={(e) => searchChange(e)} */}
              {/* enterButton */}
              {/* style={{width: '200px', marginRight: '20px'}} */}
              {/* ref={this.searchValue} */}
              {/* /> */}
              {/* { */}
              {/* this.state.value ? <Button onClick={() => { */}
              {/* this.setState({ */}
              {/* key: '', */}
              {/* value: '' */}
              {/* }) */}
              {/* let input = ReactDOM.findDOMNode(this.searchValue.current) */}
              {/* input.querySelector('input').value = '' */}
              {/* this.getList(this.state.pagination.current, this.state.pagination.pageSize, '', '') */}
              {/* }}>清空过滤</Button> : null */}
              {/* } */}
            </div>
          </Col>
          <Col span={6} style={{textAlign: 'right'}}>
            <Button type={"primary"} onClick={this.showModal}>
              新建
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.tableData} pagination={this.state.pagination}
               onChange={(p, f, s) => this.tableChange(p, f, s)}/>

        {
          this.state.visible ? <AddDashboard
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            edit={this.state.isEdit}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            dashboardName={this.state.dashboardName}
          /> : null
        }
        <Modal
          title="删除"
          visible={this.state.visibleDelete}
          onOk={() => this.deleteOk()}
          onCancel={this.handleCancel}
        >
          <span>确定要删除吗？</span>
        </Modal>
      </div>
    )
  }
}
