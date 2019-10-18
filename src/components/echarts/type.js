const pie = ecData => {
    return {
        title: {
            text: `${ecData.title}`,
            subtext: ecData.subTitle || "",
            x: "center",
            textStyle: {
                fontSize: 20,
                color: "#666",
                fontWeight: "normal"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: "scroll",
            // orient: 'vertical',
            right: 10,
            top: 50,
            bottom: 20,
            data: ecData.data.map(v => v.name)

            // selected: this.ecData
        },
        cursor: ecData.cursor || "init",
        series: [
            {
                name: ecData.toolTitle,
                type: "pie",
                radius: "66%",
                center: ["50%", "60%"],
                data: ecData.data,
                label: {
                    normal: {
                        show: true,
                        formatter: "{b}\n{c}台-{d}%"
                    }
                },
                labelLine: {
                    show: true
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    }
}

const bar = ecData => {
    return {
        title: {
            text: `${ecData.mmdd[0]}--${ecData.mmdd[ecData.mmdd.length - 1]}${
                ecData.title
            }`,
            // subtext: '纯属虚构',
            x: "center",
            textStyle: {
                fontSize: 20,
                color: "#666",
                fontWeight: "normal"
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        legend: {
            type: "scroll",
            // orient: 'vertical',
            right: 10,
            top: 30,
            data: ecData.itemName

            // selected: this.ecData
        },
        calculable: true,
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0
                },
                minInterval: 5,
                data: ecData.mmdd
            }
        ],
        yAxis: [
            {
                type: "value"
            }
        ],
        series: ecData.data.map(v => {
            return {
                name: v.name,
                type: "bar",
                label: {
                    show: true,
                    formatter: data => {
                        return `${ecData.machine_datas[data.name]}\n台`
                    }
                    // rotate: 90
                },
                data: v.value
            }
        })
    }
}
const line = ecData => {
    return {
        title: {
            text: `${ecData.mmdd[0]}--${ecData.mmdd[ecData.mmdd.length - 1]}${
                ecData.title
            }`,
            // subtext: '纯属虚构',
            x: "center",
            textStyle: {
                fontSize: 20,
                color: "#666",
                fontWeight: "normal"
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross"
            }
        },
        legend: {
            type: "scroll",
            // orient: 'vertical',
            right: 10,
            top: 30,
            data: ecData.itemName

            // selected: this.ecData
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: ecData.mmdd
            }
        ],
        yAxis: {
            splitLine: {
                show: false
            }
        },
        series: ecData.data.map(v => {
            return {
                name: v.name,
                type: "line",
                data: v.value,
                stack: "总量",
                areaStyle: {
                    normal: {}
                }
            }
        })
    }
}
export { pie, bar, line }
