'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const images = await db.collection('images').add({
		image: event.image,
	})
	return images
	//返回数据给客户端
};
