export default class ColorList {
    constructor(colors, step = 5) {
        this.colors = colors
        this.step = step
        const colorList = colors.map(v =>
            this.gradientColor(v.start, v.end, this.step)
        )
        return this.concatList(colorList)
    }

    concatList(list) {
        const colorList = []
        for (let i = 0; i < this.step; i++) {
            for (let j = 0; j < list.length; j++) {
                colorList.push(list[j][i])
            }
        }
        return colorList
    }

    gradientColor(startColor, endColor, step) {
        const startRGB = this.colorsRgb(startColor)
        const startR = startRGB[0]
        const startG = startRGB[1]
        const startB = startRGB[2]
        const endRGB = this.colorsRgb(endColor)
        const endR = endRGB[0]
        const endG = endRGB[1]
        const endB = endRGB[2]

        const sR = (endR - startR) / step
        const sG = (endG - startG) / step
        const sB = (endB - startB) / step

        const colorArr = []
        for (let i = 0; i < step; i++) {
            const hex = this.colorsHex(
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
            const hiColor = []
            for (let i = 1; i < 7; i += 2) {
                hiColor.push(parseInt("0x" + lowColor.slice(i, i + 2)))
            }
            return hiColor
        } else {
            return lowColor
        }
    }

    colorsHex(colors) {
        const _this = colors
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        if (/^(rgb|RGB)/.test(_this)) {
            const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",")
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
            const aNum = _this.replace(/#/, "").split("")
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
