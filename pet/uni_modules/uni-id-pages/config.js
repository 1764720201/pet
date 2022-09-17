export default {
	//调试模式
	"debug": true,
	/*
		登录类型 未列举到的或运行环境不支持的，将被自动隐藏。
		如果需要在不同平台有不同的配置，直接用条件编译即可
	*/
	"loginTypes": [
		"weixin",
	],
	//政策协议
	"agreements": {
		"serviceUrl": "https://xxx", //用户服务协议链接
		"privacyUrl": "https://xxx", //隐私政策条款链接
		// 哪些场景下显示，1.注册（包括注册并登录，如：微信登录、苹果登录、短信验证码登录）、2.登录（如：用户名密码登录）
		"scope": ['login']
	},
	// 提供各类服务接入（如微信登录服务）的应用id
	"appid": {
		"weixin": {
			// 微信公众号的appid，来源:登录微信公众号（https://mp.weixin.qq.com）-> 设置与开发 -> 基本配置 -> 公众号开发信息 -> AppID
			"h5": "wxcafbef5692363c46",
			// 微信开放平台的appid，来源:登录微信开放平台（https://open.weixin.qq.com） -> 管理中心 -> 网站应用 -> 选择对应的应用名称，点击查看 -> AppID
			"web": "wxcafbef5692363c46"
		}
	}
}
