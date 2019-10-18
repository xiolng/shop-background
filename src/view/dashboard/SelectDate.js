import React, {Component} from "react"
import moment from "moment"
import {Button, Popover, Select, DatePicker} from "antd"
import * as PropTypes from "prop-types"

export default class SelectDate extends Component {
    constructor() {
        super()
        this.state = {
            startDate: moment()
                .subtract(7, "day")
                .format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            dateList: [
                {
                    date: moment()
                        .subtract(1, "day")
                        .format("YYYY-MM-DD"),
                    title: "按天"
                },
                {
                    date: moment()
                        .subtract(1, "week")
                        .format("YYYY-MM-DD"),
                    title: "按周"
                },
                {
                    date: moment()
                        .subtract(1, "month")
                        .format("YYYY-MM-DD"),
                    title: "按月"
                },
                {
                    date: moment()
                        .subtract(1, "year")
                        .format("YYYY-MM-DD"),
                    title: "按年"
                }
            ]
        }
    }

    setDate() {
        return this.state.dateList.map((v, index) => (
            <Select.Option value={v.date.toString()} key={index}>
                {v.title}
            </Select.Option>
        ))
    }

    render() {
        const onChange = list => {
            const dates = {
                startDate: moment(list[0]).valueOf(),
                endDate: moment(list[1]).valueOf()
            }
            this.props.getDate([dates.startDate, dates.endDate])
        }
        const selectDates = item => {
            const dates = {
                startDate: moment(item).valueOf(),
                endDate: moment().valueOf()
            }
            this.props.getDate([dates.startDate, dates.endDate])
        }

        return (
            <Popover
                content={
                    <div style={{padding: "20px 0"}}>
                        <Select defaultValue={"按天"} onChange={selectDates}>
                            {this.state.dateList ? this.setDate() : null}
                        </Select>

                        <DatePicker.RangePicker
                            defaultValue={[
                                moment(this.state.startDate),
                                moment(this.state.endDate)
                            ]}
                            onChange={onChange}
                            style={{width: "230px", marginLeft: "20px"}}
                        />
                    </div>
                }
                title="时间选择"
                trigger="click"
                placement={"bottomRight"}
            >
                <Button>时间选择</Button>
            </Popover>
        )
    }
}
SelectDate.propTypes = {
    getDate: PropTypes.func.isRequired
}