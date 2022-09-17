<!-- uni-data-jql.vue -->
<template>
	<view>
		<view v-if="mixinDatacomErrorMessage">
			请求错误：{{mixinDatacomErrorMessage}}
		</view>
		<view v-else-if="mixinDatacomLoading">
			加载中...
		</view>
		<view else="mixinDatacomResData">
			<!-- 需要自行处理数据及相关UI展现 -->
			<view>
				<slot :data="info">
					<!-- #ifdef H5 -->
					<component :is="showComName" :value="info">{{showText}}</component>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<text>{{showText}}</text>
					<!-- #endif -->
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import QueryData from "./query-first.js";
	export default {
		name: "daxiang-query-first",
		mixins: [uniCloud.mixinDatacom],
		props: {
			showField: {
				type: String,
				default: ""
			},
			getList: Boolean,
			forceQuery: Boolean,
			value: [String, Number],
			valueKey: String,
			showComName: {
				type: String,
				default: "text"
			}
		},
		computed: {
			showText() {
				const {
					showField,
					getList,
					info
				} = this;
				return showField && !getList ? info[showField] : ''
			},
			info() {
				if (this.getList) {
					return this.mixinDatacomResData;
				} else {
					return this.mixinDatacomResData[0] || {}
				}
			},
			resWhere() {
				if (this.value && this.valueKey) {
					let val = typeof this.value === 'string' ? `'${this.value}'` : this.value;
					let where = `${this.valueKey}==${val}`;
					return [where, this.where].filter(v => !!v).join("&&")
				} else {
					return this.where;
				}
			},
			resField() {
				return this.field || this.showField
			}
		},
		watch: {
			info: {
				handler() {
					this.$emit("change", this.info);
				},
				deep: true
			}
		},
		data() {
			return {}
		},
		created() {
			// 调用 uniCloud.mixinDatacom 中的方法加载数据

			this.load()
		},
		methods: {
			removeData() {
				QueryData.removeData(this.collection, this.resWhere, this.resField)
			},
			load() {
				if (this.mixinDatacomLoading == true) {
					return
				}
				const res = QueryData.getData(this.collection, this.resWhere, this.resField);
				if (res && !this.forceQuery) {
					this.mixinDatacomResData = res.data;
					return;
				} else {
					this.mixinDatacomLoading = true
				}
				const id = QueryData.addQuery(this.collection, this.resWhere, this.resField, this.mixinDatacomGet);
				QueryData.startQuery(id).then((res) => { 
					this.mixinDatacomLoading = false
					const {
						data,
						count
					} = res.result
					QueryData.setData(this.collection, this.resWhere, this.resField, data);
					this.mixinDatacomResData = data
				}).catch((err) => {
					this.mixinDatacomLoading = false
					this.mixinDatacomErrorMessage = err
				})
			},
			// 当组件属性发生变化时
			onMixinDatacomPropsChange(needReset, changed) {
				// needReset=true 需要重置已加载数据和分页信息，例如 collection，orderby
				// changed，变化的属性名，类型为 Array，例如 ['collection', 'orderby'] 
				if (needReset) {
					// 清空已加载的数据 
					// 重置分页数据，如果没有分页不需要处理
					this.mixinDatacomPage.size = this.pageSize // 重置分页大小
					this.mixinDatacomPage.current = 1 // 重置当前分页
					this.mixinDatacomPage.count = 0 // 重置数据总数
					this.mixinDatacomResData = [];
					this.load()
				}
			}
		}
	}
</script>
