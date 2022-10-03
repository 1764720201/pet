'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const comment = await db.collection('comment').add({
		comment: event.comment,
		comment_type: event.type,
		user_id: event.userId,
		adopt_id: event.adoptId,
		nickname: event.nickname,
		avatar_url: event.avatarUrl,
		comment_id: event.commentId,
		comment_user_id: event.commentUserId,
		found_id: event.foundId,
		topic_id: event.topicId
	})
	return comment
	//返回数据给客户端

};
