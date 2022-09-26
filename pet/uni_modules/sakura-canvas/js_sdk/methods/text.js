import { countTextLength } from '../utils/util'
export default class DrawText {
	constructor(params) {
		const { Context, commonUtilMethods, commonDrawMethods } = params
		this.Context = Context
		this.commonUtilMethods = commonUtilMethods
		this.commonDrawMethods = commonDrawMethods
	}
	/**
	 * 获取绘制参数
	 * @param { Object } params 参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	getDrawParams(params = {}, conversion = true) {
		const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params)
		// 绘制文字的参数
		const { 
			text = '', textIndent = 0, lastWidth = 0, font = {}, 
			textAlign = 'none', baseline = 'top', line = {}, 
			highlightText = [], textRect = { show: false, isFill: true, lineWidth: 1 }
		} = params
		const textParams = {
			...globalDataParams,
			text: String(text) || '',
			textIndent,
			lastWidth,
			font: conversion ? this.commonUtilMethods.conversionUnit(this.getFontStyle(font)) : this.getFontStyle(font, conversion),
			textAlign,
			baseline,
			line: this.getTextLine(line, conversion),
			highlightText,
			textRect,
		}
		return conversion ? this.commonUtilMethods.conversionUnit(textParams) : textParams
	}
	/**
	 * 绘制文字
	 * @param { Object } params 文字参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods
		let { 
			x, y, w, h, text, textIndent,
			lastWidth, font, color, alpha, 
			isFill, line, windowAlign, textAlign, baseline, highlightText, textRect, offsetRight
		} = this.getDrawParams(params, conversion)
		Context.save()
		Context.beginPath()
		commonDrawMethods.setAlpha(alpha)
		Context.font = font.style
		// #ifdef MP-TOUTIAO
		// 不知道为啥现在字节跳动一定用这个方法来设置文字大小了. 之前还不用...
		if (!is2d) {
			Context.setFontSize(font.fontSize)
		}
		// #endif
		if (!is2d) {
			Context.setTextBaseline(baseline)
		}else{
			Context.textBaseline = baseline
		}
		if (typeof text !== 'string') {
			text += ''
		}
		let textArr = params.textArr
		if (!textArr) {
			textArr = commonDrawMethods.computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, color, offsetRight)
		}
		if (highlightText.length != 0) {
			textArr = this.getHighlightText(textArr, highlightText, color, font)
		}
		if (textRect.show) {
			// 水平的 垂直的
			const { vorizontal, vertical, ...textReactParmas } = commonUtilMethods.conversionUnit(textRect)
			// console.log({
			// 	vorizontal,
			// 	vertical,
			// })
			const firstText = textArr[0]
			// console.log(firstText)
			let tw = w === canvasWidth ? commonUtilMethods.conversionUnit(params).tw ?? firstText.w : w
			let tx = firstText.x - vorizontal
			let ty = firstText.y - vertical
			let ey = textArr[textArr.length - 1].y + font.fontSize
			let th = ey - firstText.y
			th += vertical * 2
			// #ifdef MP-WEIXIN || MP-TOUTIAO
			if (uni.getSystemInfoSync().platform === 'android') {
				ty += font.fontSize / 3
				th -= font.fontSize / 3
			}
			// #endif
			tw += (vorizontal * 2)
			commonDrawMethods.drawParams.drawRect.draw({
				x: tx,
				y: ty,
				w: tw,
				h: th,
				...textReactParmas
			}, false)
		}
		Context.font = font.style
		textArr.forEach(item => {
			let { text, x, y, tx, ty, tw, fontColor } = item
			if (isFill) {
				commonDrawMethods.setFillStyle(fontColor)
				Context.fillText(text, x, y)
			} else {
				commonDrawMethods.setStrokeStyle(fontColor)
				Context.strokeText(text, x, y)
			}
			if (line.lineStyle !== 'none') {
				if (isFill) {
					commonDrawMethods.setFillStyle(color)
				} else {
					commonDrawMethods.setStrokeStyle(color)
				}
				commonDrawMethods.drawParams.drawLine.draw({
					x: tx,
					y: ty,
					w: tw,
					color,
					lineType: line.lineType,
					lineWidth: line.lineWidth
				}, false)
			}
		})
		Context.restore()
		Context.font = this.getFontStyle().style
		commonDrawMethods.setAlpha(1)
	}
	/**
	 * 获取字体样式
	 * @param { Object } font 字体样式
	 * @param { Boolean } conversion 是否装换单位
	 * @returns 
	 */
	getFontStyle(fontStyle = {}, conversion = true) {
		const { size, family, style, variant, weight} = {...this.commonUtilMethods.fontStyle, ...fontStyle}
		return {
			fontSize: size,
			fontSizeBefore: size,
			fontFamily: family,
			fontStyle: style,
			fontVariant: variant,
			fontWeight: weight,
			style: `${style} ${variant} ${weight} ${conversion ? this.commonUtilMethods.getConvertedValue(size) : size}px ${family}`
		}
	}
	/**
	 * 获取文字line样式
	 * @param { Object } line 行高
	 * @param { Object } conversion 是否转换单位默认true
	 */
	 getTextLine(line = {}, conversion = true) {
		const { num = -1, height = 0, style = 'none', type = 'solid', width = 1 } = line
		return {
			lineNum: num,
			lineHeight: conversion ? this.commonUtilMethods.getConvertedValue(height) : height,
			lineStyle: style,
			lineType: type, 
			lineWidth: width
		}
	}
	/**
	 * 获取高亮文字
	 * @param { Array } textArr 绘制文字数组
	 * @param { Array } highlightText 高亮文字
	 * @param { String } color 字体原颜色
	 * @param { String } font 字体
	 * @returns 
	 */
	getHighlightText(textArr, highlightText, color, font) {
		const highlightTextArr = []
		const highlightColorArr = []
		const { fontSize } = font
		highlightText.map(item => {
			const { text, color } = item
			return [...text].map(i => { 
				return {
					text: i,
					color
				}
			})
		}).forEach(item => {
			const texts = item.map(item => item.text)
			const colors = item.map(item => item.color)
			highlightTextArr.push(...texts)
			highlightColorArr.push(...colors)
		})
		const rowData = []
		textArr.forEach((item, index) => {
			const { x, y, w, text, tx, ty, tw } = item
			const texts = [...text]
			let position = []
			for (let i in texts) {
				const data = texts[i]
				const current = highlightTextArr.findIndex(i => data == i)
				if (current === -1) continue
				if (current !== -1) {
					// 符合规则的内容
					const ruleData = {
						text: data,
						index: i,
						x: x + countTextLength(this.Context, texts.join('').substring(0, i), fontSize),
						fontColor: highlightColorArr[current],
						y,
						tx,
						ty,
						tw,
						w
					}
					const beforeIndex = position.length == 0 ? 0 : Number(position[position.length - 1].index)
					const currentIndex = Number(ruleData.index)
					if (currentIndex - beforeIndex > 1) {
						const other = {
							text: texts.join('').substring(position[beforeIndex] ? beforeIndex + 1 : beforeIndex, currentIndex),
							index: beforeIndex === 0 ? 0 : beforeIndex + 1,
							x: x + countTextLength(this.Context, texts.join('').substring(0, position[beforeIndex] ? beforeIndex + 1 : beforeIndex), fontSize),
							fontColor: color,
							y,
							tx,
							ty,
							tw,
							w
						}
						rowData.push(other)
					}
					position.push(ruleData)
					rowData.push(ruleData)
				}
			}
			if (position.length === 0) {
				rowData.push({
					...item,
					tx,
					ty,
					tw,
					w,
					fontColor: color
				})
			} else {
				const lastIndex = Number(position[position.length - 1].index) + 1
				const length = texts.length
				if (lastIndex === length) return
				const other = {
					text: texts.join('').substring(lastIndex, length),
					index: lastIndex,
					x: x + countTextLength(this.Context, texts.join('').substring(0, lastIndex), fontSize),
					fontColor: color,
					y,
					tx,
					ty,
					tw,
					w
				}
				rowData.push(other)
			}
		})
		return rowData
	}
}