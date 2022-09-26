'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.databaseForJQL({
		event,
		context
	})
	const apply = db.collection('apply').add({
		adopt_id: event.adoptId,
		age: event.age,
		gender: event.gender,
		experience: event.experience,
		present: event.present,
		house: event.house,
		marriage: event.marriage,
		income: event.income,
		work: event.work,
		city: event.city,
		phone: event.phone,
		wx_code: event.wxCode,
		sincerity: event.sincerity,
		state: event.state
	})
	//返回数据给客户端
	return apply
};
