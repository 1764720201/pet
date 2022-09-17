<script>
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
export default {
	onLaunch: async function() {
		console.log('App Launch');
		await uniIdPageInit();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './static/icon.css';
</style>
