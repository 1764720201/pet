<template>
	<view class="explain">
		<view class="title">领养说明</view>
		<view class="attention">
			可能你很想领养一只宠物，但是可能实际和您想象的不太一样，以请您一定要做好充足准备。
		</view>
		<uni-collapse>
			<uni-collapse-item :show-animation="true" title="展开">
				<text>
					请认真阅读以下内容：\n
					1.如果不是你本人有养宠意愿以后宠物不是由你来负责饲养，请不要申请领养\n
					2.你是否愿意留出资金用于它们的生活和可能得病需要的治疗费\n
					3.如果你长期出差、旅行外出，宠物需要寄养，那请暂时不要宠。\n
					4.家里其他成员是否接纳宠物？您的家人能否与与您共同照顾拥珍情它？\n
					5.养宠是否是你长期的打算？家猫家狗的寿命通常在15-20年。
					能几十年如一日地善待他吗？不因结婚生子、工作调动、家庭反等等的个人理由而抛弃他们吗\n
					6.你是否有足够的耐心？猫猫狗狗都有各自不同的习惯，每只还个体差异。你能接受猫咪抓沙发，玩窗帘，创家具，掉毛吗？\n
					7.当它生病的时候，您愿意付出您的时间和精力来陪伴他吗？您够精心照顾它使它早日恢复健康？\n
				</text>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script lang="ts" setup></script>

<style lang="less">
.explain {
	margin-top: 50rpx;
	width: 90%;
	margin-left: 5%;

	.title {
		font-weight: 900;
		font-size: 35rpx;
	}
	.attention {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #666;
	}
	:deep(.uni-collapse-item__title-box) {
		margin: 0 auto;
		width: 250rpx;
		.uni-collapse-item__title-text {
			border: 1px solid #000;
			line-height: 40rpx;
			text-align: center;
			height: 40rpx;
			border-radius: 20rpx;
		}
	}
	:deep(.uni-icons) {
		margin-left: -320rpx;
	}
}
</style>
