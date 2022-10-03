<script setup lang="ts">
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
import { onHide } from '@dcloudio/uni-app';
import { onShow } from '@dcloudio/uni-app';
import { onLaunch } from '@dcloudio/uni-app';
const db = uniCloud.database();
const getUnread = () => {
	db.collection('chat')
		.where(`to_uid==$cloudEnv_uid&&is_read==false`)
		.count()
		.then(res => {
			if (res.result.total) {
				uni.setTabBarBadge({
					index: 3,
					text: String(res.result.total)
				});
			}
		});
};
uni.onPushMessage(() => {
	getUnread();
});
onLaunch(async () => {
	console.log('App Launch');
	await uniIdPageInit();
	getUnread();
});
onShow(() => {
	console.log('App Show');
});
onHide(() => {
	console.log('App Hide');
});
</script>

<style lang="scss">
button::after {
	border: none;
}
button {
	background-color: #fff;
	border-radius: 0;
	padding: 0;
	font-size: 26rpx;
}
@import './static/icon.css';
</style>
