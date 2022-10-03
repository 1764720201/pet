// 云函数代码，传入context
const uniID = require('uni-id-common')
exports.main = async function(event, context) {
	context.APPID = '__UNI__8AC4FDC' // 替换为当前客户端的APPID，通过客户端callFunction请求的场景可以使用context.APPID获取
	context.PLATFORM = 'mp-weixin' // 替换为当前客户端的平台类型，通过客户端callFunction请求的场景可以使用context.PLATFORM获取
	context.LOCALE = 'zh-Hans' // 替换为当前客户端的语言代码，通过客户端callFunction请求的场景可以使用context.LOCALE获取
	const uniIDIns = uniID.createInstance({ // 创建uni-id实例
		context: context,
		// config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
	})
	payload = await uniIDIns.checkToken(event.uniIdToken) // 后续使用uniIDIns调用相关接口
	if (payload.code) {
		return payload
	}
}

// 云对象代码传入clientInfo
const uniID = require('uni-id-common')
module.exports = {
	_before() {
		const clientInfo = this.getClientInfo()
		this.uniID = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
			clientInfo
		})
	},
	refreshToken() {
		// ...
		// this.uniID.refreshToken()
	}
}
