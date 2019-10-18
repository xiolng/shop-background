import React, {Component} from "react"
import moment from "moment"
import {Dragact} from "dragact"
import {Button, message} from "antd"
import _ from "lodash"
import {Card} from "./Card"
import AddCard from "./addCard"
import {getCookie, setCookie} from "@/utils/config"
import SelectDate from "@/view/dashboard/SelectDate"

export default class Details extends Component {
    constructor({props, match}) {
        super(props, match)
        this.match = match
        this.state = {
            isEdit: false,

            fadeData: [],
            panelsData: [],
            defaultData: [],
            visible: false,
            isCookies: false
        }
    }

    componentDidMount() {
        this.getCookies()
        this.getData()
        this.getPanels()
    }

    /** ***************获取数据********************/
    getData(from, to) {
        window.axios.get(`/api/v1.0/dashboard_member/${this.match.params.id}`, {
            params: {
                from: from || moment().subtract(7, "day").valueOf(),
                to: to || moment().valueOf()
            }
        }).then(res => {
            const data = res.data.data.map((item, index) => {
                return {
                    ...item,
                    GridX: item.grid_x,
                    GridY: item.grid_y,
                    w: item.w,
                    h: item.h,
                    key: item.id,
                    static: !this.state.isEdit
                }
            })
            this.setState({
                fadeData: data,
                defaultData: _.cloneDeep(data)
            })
        })
    }

    getPanels() {
        window.axios.get("/api/v1.0/panels").then(res => {
            const data = res.data.data.map(v => {
                return {
                    key: v.id,
                    ...v
                }
            })
            this.setState({
                panelsData: data
            })
        })
    }

    getCookies() {
        if (!getCookie()) {
            window.axios.get("/api/v1.0/third_auth").then(res => {
                const list = []
                res.data.data.map(v => {
                    const url = v.url.split("://")[1]
                    const path = url.split("/")[1]
                    if (v.status) {
                        for (const item in v.cookie) {
                            list.push({
                                name: item,
                                value: v.cookie[item],
                                path: `/${path}`
                            })
                        }
                    }
                    return false
                })
                setCookie(list)

                this.setState({
                    isCookies: true
                })
            })
        }
        this.setState({
            isCookies: !!getCookie()
        })
    }

    /**
     * 插件和后端key不同，拖拽结束后，修改key值
     * @param item
     */
    dragEnd(item) {
        const list = this.state.fadeData.map(v => {
            if (+v.key === +item.UniqueKey) {
                v.grid_x = item.GridX
                v.grid_y = item.GridY
                v.w = item.w
                v.h = item.h
            }
            return v
        })
        const newFadeData = list.map(item => {
            return {
                ...item,
                GridX: item.grid_x,
                GridY: item.grid_y,
                w: item.w,
                h: item.h,
                key: item.key
            }
        })
        this.setState({
            fadeData: _.cloneDeep(newFadeData)
        })
    }

    /**
     * 增加key值，防止重复值
     * @param key
     * @returns {*}
     */
    forKey(key) {
        let keys = key
        keys++
        const isKey = this.state.fadeData.some(v => +v.key === +keys)
        if (isKey) {
            return this.forKey(keys)
        }
        return keys
    }

    /** ****新增弹窗******/
    openModal() {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        const panels = this.state.panelsData.filter(v => v.id === e)
        const list = this.state.fadeData
        const keys = `${this.state.fadeData.length + this.state.fadeData.length}`
        const newCard = {
            grid_x: 0,
            grid_y: 0,
            GridX: 0,
            GridY: 0,
            w: 4,
            h: 4,
            ...panels[0],
            panel_id: e,
            key: this.forKey(keys),
            static: false
        }
        list.unshift(newCard)
        this.setState({
            visible: false,
            fadeData: list
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false
        })
    };

    /** ******编辑、取消、保存、删除--Card**************/
    editCard() {
        this.setState({
            isEdit: true,
            fadeData: this.state.fadeData.map(v => {
                v.static = this.state.isEdit
                return v
            })
        })
    }

    cancelList() {
        this.setState({
            isEdit: false,
            fadeData: _.cloneDeep(
                this.state.defaultData.map(v => {
                    v.static = this.state.isEdit
                    return v
                })
            )
        })
    }

    saveList() {
        window.axios.post(`/api/v1.0/dashboard_member/${this.match.params.id}`, {
            data: this.state.fadeData
        })
            .then(res => {
                message.info(res.data.message)
                this.setState({
                    isEdit: false,
                    fadeData: this.state.fadeData.map(v => {
                        v.static = this.state.isEdit
                        return v
                    })
                })
                this.getData(
                    moment(this.state.startDate).valueOf(),
                    moment(this.state.endDate).valueOf()
                )
            })
    }

    deleteCard = item => {
        if (!this.state.isEdit) return false
        const list = this.state.fadeData.filter(v => +v.id !== +item.key)
        this.setState({
            fadeData: list
        })
    };

    render() {
        const getDate = item => {
            this.getData(...item)
        }
        return (
            <div>
                <div style={{position: "fixed", top: "74px", right: "20px"}}>
                    {this.state.isEdit ? (
                        <span>
                          <Button
                              type={"primary"}
                              style={{marginRight: "20px"}}
                              onClick={() => this.openModal()}
                          >
                添加
                          </Button>
                          <Button
                              type={"primary"}
                              style={{marginRight: "20px"}}
                              onClick={() => this.saveList()}
                          >
                保存
                          </Button>
                          <Button
                              style={{marginRight: "20px"}}
                              onClick={() => this.cancelList()}
                          >
                取消
                          </Button>
                      </span>
                    ) : (
                        <Button
                            type={"primary"}
                            style={{marginRight: "20px"}}
                            onClick={() => this.editCard()}
                        >
                            编辑
                        </Button>
                    )}
                    <SelectDate getDate={getDate} />
                </div>
                <div style={{position: "relative"}}>
                    {this.state.isCookies && this.state.fadeData.length ? (
                        <Dragact
                            layout={this.state.fadeData} // 必填项
                            col={16} // 必填项
                            width={document.body.clientWidth - 130} // 必填项
                            rowHeight={40} // 必填项
                            margin={[5, 5]} // 必填项
                            className="plant-layout" // 必填项
                            style={{minHeight: "300px", background: "#eee"}} // 非必填项
                            placeholder // 非必填项
                            onDragEnd={e => this.dragEnd(e)}
                        >
                            {(item, provided) => {
                                return (
                                    <Card
                                        item={item}
                                        provided={provided}
                                        onDelete={this.deleteCard}
                                        edits={this.state.isEdit}
                                    />
                                )
                            }}
                        </Dragact>
                    ) : null}
                </div>
                {this.state.panelsData.length ? (
                    <AddCard
                        panelsData={this.state.panelsData}
                        visible={this.state.visible}
                        modalOk={this.handleOk}
                        modalCancel={this.handleCancel}
                    />
                ) : null}
            </div>
        )
    }
}
