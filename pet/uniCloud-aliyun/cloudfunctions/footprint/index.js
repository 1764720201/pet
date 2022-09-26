'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const footprint = await db.collection('footprint').add({
		user_id: event.userId,
		adopt_id: event.adoptId,
		found_id: event.foundId,
	})
	return footprint
	//返回数据给客户端

};
