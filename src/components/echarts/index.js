import React, { Component } from "react"
import echarts from "echarts"
import "echarts/theme/macarons"
import { debounce } from "../../utils"
import * as PropTypes from "prop-types"

class Echarts extends Component {
    constructor({ props }) {
        super(props)
        this.myEcharts = React.createRef()
    }

    componentDidMount() {
        this.initEcharts()
        this.__resizeHandler = debounce(() => {
            if (this.myEchart) {
                this.myEchart.resize()
            }
        }, 100)
        window.addEventListener("resize", this.__resizeHandler)
    }

    componentDidUpdate() {
        this.myEchart.clear()
        this.renderEcharts(this.myEchart)
    }

    componentWillUnmount() {
        if (!this.myEchart) {
            return
        }
        window.removeEventListener("resize", this.__resizeHandler)
        this.myEchart.dispose()
        this.myEchart = null
    }

    initEcharts() {
        this.myEchart = echarts.init(this.myEcharts.current, "macarons")
        this.renderEcharts(this.myEchart).then(() => {
            if (this.props.type !== "pie") {
                this.myEchart.resize()
            }
        })
        this.myEchart.on("click", params => {
            if (params.seriesType === "pie" && this.props.isClick) {
                this.$router.push(
                    `/dashboard/message_detail/${params.value}/${params.name}/${
                        this.base
                    }`
                )
            }
        })
    }

    async renderEcharts(myEchart) {
        const option = require("./type")[this.props.type](this.props.ecData)
        // option.color = new ColorList(colors, 5)
        await myEchart.setOption(option, true)
    }

    render() {
        return (
            <div
                ref={this.myEcharts}
                id={"myEcharts"}
                style={{
                    width: this.props.elWidth || "100%",
                    height: this.props.elHeight || "400px"
                }}
            />
        )
    }
}
Echarts.propTypes = {
    type: PropTypes.string.isRequired,
    ecData: PropTypes.object.isRequired,
    isClick: PropTypes.bool
}

export default Echarts
