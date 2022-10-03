'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const topic = await db.collection('topic').add({
		image: event.imageList,
		user_id: event.userId,
		content: event.content,
		read: event.read
	})
	return topic
	//返回数据给客户端

};
