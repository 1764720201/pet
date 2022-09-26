<template>
	<view>
		<city-select
			@cityClick="cityClick"
			:formatName="formatName"
			:activeCity="activeCity"
			:hotCity="hotCity"
			:obtainCitys="obtainCitys"
			:isSearch="true"
			ref="citys"
		></city-select>
	</view>
</template>

<script>
import amapFile from '@/common/amap-wx.130.js';
import citys from './citys/citys.js';
import citySelect from '@/components/city-select/city-select.vue';
export default {
	data() {
		return {
			location: {},
			amapPlugin: null,
			key: 'b675910771e04f68544a7cc6492f034f',
			//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
			formatName: 'title',
			//当前城市
			activeCity: {
				id: 1,
				title: '南京市'
			},
			//热门城市
			hotCity: [
				{
					id: 0,
					title: '南京市'
				},
				{
					id: 1,
					title: '南京市'
				}
			],
			//显示的城市数据
			obtainCitys: [
				{
					id: 0,
					title: '南京'
				},
				{
					id: 1,
					title: '北京'
				},
				{
					id: 2,
					title: '天津'
				},
				{
					id: 3,
					title: '东京'
				}
			]
		};
	},
	components: {
		citySelect
	},
	onLoad() {
		uni.authorize({
			scope: 'scope.userLocation',
			success: res => {
				console.log(res);
			}
		});
		try {
			this.amapPlugin = new amapFile.AMapWX({
				key: this.key
			});
		} catch (e) {
			console.log(e);
		}
		uni.showLoading({
			title: '获取信息中'
		});
		this.amapPlugin.getRegeo({
			success: data => {
				this.activeCity = {
					cityName: data[0].regeocodeData.addressComponent.city,
					cityCode: Number(
						data[0].regeocodeData.addressComponent.adcode.slice(
							0,
							4
						) + '00'
					)
				};
				uni.hideLoading();
			}
		});
		//动态更新数据
		setTimeout(() => {
			//修改需要构建索引参数的名称
			this.formatName = 'cityName';
			this.hotCity = [
				{
					cityName: '南京',
					cityCode: 110100
				},
				{
					cityName: '北京',
					cityCode: 110102
				},
				{
					cityName: '宁波市',
					cityCode: 330200
				},
				{
					cityName: '杭州市',
					cityCode: 330100
				},
				{
					cityName: '上海市',
					cityCode: 310100
				},
				{
					cityCode: 610100,
					cityName: '西安市'
				},
				{
					cityName: '广州市',
					cityCode: 440100
				},
				{
					cityName: '深圳市',
					cityCode: 440300
				},
				{
					cityName: '成都市',
					cityCode: 510100
				},
				{
					cityName: '武汉市',
					cityCode: 420100
				},
				{
					cityName: '天津',
					cityCode: 120100
				},
				{
					cityName: '苏州市',
					cityCode: 320500
				}
			];
			//修改构建索引数据
			this.obtainCitys = citys;
		}, 100);
	},
	methods: {
		cityClick(item) {
			uni.reLaunch({
				url: `/pages/Adopt/index?cityName=${item.cityName}`
			});
		},
		getRegeo() {}
	}
};
</script>

<style></style>
