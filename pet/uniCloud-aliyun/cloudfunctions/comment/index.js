'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const comment = await db.collection('comment').add({
		comment: event.commentContent,
		comment_type: event.commentType,
		user_id: event.userId,
		adopt_id: event.adoptId,
		nickname: event.nickname,
		avatar_url: event.avatarUrl,
		comment_id: event.commentId,
		found_id: event.foundId
	})
	return comment
	//返回数据给客户端

};
