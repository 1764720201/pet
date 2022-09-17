# daxiang-query-first
## 列表数据异步加载
组件会根据field,where,collection等查询字段进行数据缓存，也可以通过传递forceQuery进行不使用缓存的强制查询。
## 使用方式
```javascript
<daxiang-query-first collection="uni-id-users" :where="`_id=='${value}'`" getone
		field="nickname,avatar" v-slot="{data}" @change="onchange">
		// 这里的data即为查询的单条数据  object
		// change事件返回查询的数据
		<view v-if="data._id">
			<image :src="data.avatar"></image>
			<text>{{data.nickname}}<text>
		</view>
</daxiang-query-first>
```
##如果不想在行内使用数据可以这样：
```javascript
<daxiang-query-first collection="uni-id-users" :where="`_id=='${value}'`" getone
		field="nickname,avatar" @change="onchange($event,index)">
</daxiang-query-first>
...
// 定义储存集合
data(){
	reutrn {
		users:[]
	}
},
methods:{
	onchange(data,index){
		this.users.splice(index,1,data)
	}
}
```
##查询多条数据
 getList参数 让data返回数据为多条
```javascript
//假设uids为用户ID的数组  此时查询多条信息则这样写
<daxiang-query-first collection="uni-id-users" :where="`_id in [${uids.map(v=>`'${v}'`).join(',')}]`" getone
		field="nickname,avatar" v-slot="{data}" getList>
		// 这里的data即为查询的多条数据 array 
		<view v-for="(item,index) in data" :key="index">
			<image :src="item.avatar"></image>
			<text>{{item.nickname}}<text>
		</view> 
</daxiang-query-first>
```