export default class ColorList {
    constructor(colors, step = 5) {
        this.colors = colors
        this.step = step
        let colorList = colors.map(v =>
            this.gradientColor(v.start, v.end, this.step)
        )
        return this.concatList(colorList)
    }

    concatList(list) {
        let colorList = []
        for (let i = 0; i < this.step; i++) {
            for (let j = 0; j < list.length; j++) {
                colorList.push(list[j][i])
            }
        }
        return colorList
    }

    gradientColor(startColor, endColor, step) {
        let startRGB = this.colorsRgb(startColor)
        let startR = startRGB[0]
        let startG = startRGB[1]
        let startB = startRGB[2]
        let endRGB = this.colorsRgb(endColor)
        let endR = endRGB[0]
        let endG = endRGB[1]
        let endB = endRGB[2]

        let sR = (endR - startR) / step
        let sG = (endG - startG) / step
        let sB = (endB - startB) / step

        const colorArr = []
        for (let i = 0; i < step; i++) {
            let hex = this.colorsHex(
                "rgb(" +
          parseInt(sR * i + startR) +
          "," +
          parseInt(sG * i + startG) +
          "," +
          parseInt(sB * i + startB) +
          ")"
            )
            colorArr.push(hex)
        }
        return colorArr
    }

    colorsRgb(colors) {
        const reg = /^#([a-fA-f0-9]{3}|[a-fA-f0-9]{6})$/
        let lowColor = colors.toLowerCase()
        if (lowColor && reg.test(lowColor)) {
            if (lowColor.length === 4) {
                let newColor = "#"
                for (let i = 1; i < 4; i++) {
                    newColor += lowColor.slice(i, i + 1).concat(lowColor.slice(i, i + 1))
                }
                lowColor = newColor
            }
            let hiColor = []
            for (let i = 1; i < 7; i += 2) {
                hiColor.push(parseInt("0x" + lowColor.slice(i, i + 2)))
            }
            return hiColor
        } else {
            return lowColor
        }
    }

    colorsHex(colors) {
        let _this = colors
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        if (/^(rgb|RGB)/.test(_this)) {
            let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",")
            let strHex = "#"
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16)
                hex = hex < 10 ? 0 + "" + hex : hex
                if (hex === "0") {
                    hex += hex
                }
                strHex += hex
            }
            if (strHex.length !== 7) {
                strHex = _this
            }
            return strHex
        } else if (reg.test(_this)) {
            let aNum = _this.replace(/#/, "").split("")
            if (aNum.length === 6) {
                return _this
            } else if (aNum.length === 3) {
                let numHex = "#"
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += aNum[i] + aNum[i]
                }
                return numHex
            }
        } else {
            return _this
        }
    }
}
