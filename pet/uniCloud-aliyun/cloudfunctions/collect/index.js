'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const collect = await db.collection('collect').add({
		user_id: event.userId,
		adopt_id: event.adoptId,
		type: event.type,
		pet_id: event.petId,
		found_id: event.foundId,
		knowledge_id: event.knowledgeId,
		topic_id: event.topicId
	})
	return collect
	//返回数据给客户端

};
