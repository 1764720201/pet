'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const foundPet = await db.collection('foundPet').add({
		uploadPicture: event.imageList,
		name: event.name,
		star: event.star,
		variety: event.variety,
		gender: event.gender,
		introduce: event.introduce,
		title: event.title,
		city: event.city,
		phone: event.phone,
		wx_code: event.wxCode,
		reward: event.reward,
		avatar_url: event.avatarURL,
		type: event.type,
		nickname: event.authorName
	})
	return foundPet
	//返回数据给客户端

};
