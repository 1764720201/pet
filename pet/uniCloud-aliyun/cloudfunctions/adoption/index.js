'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const adoption = await db.collection('adoption').add({
		img: event.imageList,
		pet_name: event.petName,
		star: event.star,
		variety: event.variety,
		gender: event.gender,
		age: event.age,
		medical: event.medicalList,
		source: event.source,
		particular: event.particularList,
		story: event.story,
		request: event.requestList,
		punch: event.punch,
		name: event.name,
		city: event.city,
		phone: event.phone,
		wx_code: event.wx_code,
		user_id: event.user_id,
		issue_time: event.issue_time,
		if_adopt: event.ifAdopt
	})
	return adoption
	//返回数据给客户端

};
