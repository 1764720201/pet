const uniPush = uniCloud.getPushManager({
	appId: "__UNI__8AC4FDC"
})
exports.main = async (event, context) => {
	return await uniPush.sendMessage({
		"user_id": event.userId,
		"title": "",
		"content": "",
		"payload": {
			"text": event.content
		}
	})
};
