<template>
	<view class="u-popup u-popup_transition">
		<view
			v-if="inited"
			class="u-popup_overlay u-popup_transition"
			:class="popupClass"
			:style="[overlayStyle]"
			@tap.stop="sendEmit"
		></view>
		<view
			class="u-popup_content u-popup_transition"
			:style="[popupContentStyle]"
			:class="popupContentClass"
		>
			<view class="u-popup_content-data" :style="[popupDataStyle]">
				<!-- 标题 -->
				<template v-if="title">
					<view class="u-popup_status-bar">
						<text
							class="u-popup_status-bar-title"
							:style="[titleStyle]"
						>
							{{ title }}
						</text>
					</view>
				</template>
				<!-- 关闭按钮 -->
				<template v-if="close">
					<text
						class="u-popup_status-bar-close icontool icon-close"
						:style="[closeStyle]"
						@tap.stop="sendEmit"
					></text>
				</template>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
	// 是否显示弹窗
	show: {
		type: Boolean,
		default: false
	},
	// 标题
	title: {
		type: String,
		default: ''
	},
	// 标题自定义样式
	titleStyle: {
		type: Object,
		default: () => ({})
	},
	// 是否显示圆角
	round: {
		type: Boolean,
		default: false
	},
	// 圆角大小 单位rpx
	roundSize: {
		type: [String, Number],
		default: 0
	},
	// 是否显示关闭按钮
	close: {
		type: Boolean,
		default: false
	},
	// 关闭按钮样式
	closeStyle: {
		type: Object,
		default: () => ({})
	},
	// 是否显示遮罩
	overlay: {
		type: Boolean,
		default: true
	},
	// 点击遮罩层是否停止发送关闭事件
	overlayStopEmit: {
		type: Boolean,
		default: false
	},
	// 遮罩背景色
	overlayBackground: {
		type: String,
		default: '#000'
	},
	// 遮罩透明度 0-1之间
	overlayOpacity: {
		type: [String, Number],
		default: 0.5
	},
	// 内容背景色
	background: {
		type: String,
		default: '#FFF'
	},
	// 弹出的方向，可选值为 top bottom right left center
	mode: {
		type: String,
		default: 'center'
	},
	// 过渡时长单位毫秒
	duration: {
		type: [String, Number],
		default: 500
	},
	// 层级
	zIndex: {
		type: [String, Number],
		default: 9
	},
	// 节流时间
	throttleTime: {
		type: [String, Number],
		default: 1000
	},
	// 样式： overflow: hidden
	hidden: {
		type: Boolean,
		default: true
	}
});
let count = 0;
// 弹窗容器样式
const popupContentStyle = computed(() => {
	const { mode, zIndex, duration, show } = props;
	const style = {
		position: 'fixed',
		zIndex,
		transitionDuration: !show && count === 0 ? 0 : duration + 'ms'
	};
	if (count === 0) {
		count++;
	}
	style[mode] = 0 + 'rpx';
	if (mode === 'bottom' || mode === 'top') {
		style.left = 0 + 'rpx';
		style.right = 0 + 'rpx';
	}
	if (mode === 'left' || mode === 'right') {
		style.top = 0 + 'rpx';
		style.bottom = 0 + 'rpx';
	}
	if (mode === 'center') {
		// style.top = 0 + 'rpx'
		// style.left = 0 + 'rpx'
		// style.bottom = 0 + 'rpx'
		// style.right = 0 + 'rpx'
		// style.display = 'flex'
		// style.alignItems = 'center'
		// style.justifyContent = 'center'
		// style.zIndex = -9999
		style.left = '50%';
		style.top = '50%';
	}

	return style;
});
// 遮罩样式
const overlayStyle = computed(() => {
	const { overlayBackground, overlayOpacity, duration, zIndex } = props;
	return {
		background: overlayBackground,
		opacity: overlayOpacity,
		transitionDuration: duration + 'ms',
		zIndex
	};
});
// 弹窗数据样式
const popupDataStyle = computed(() => {
	const style = {};
	const { round, roundSize, background, mode, hidden } = props;
	style.background = background;
	if (round) {
		const radius = roundSize + 'rpx';
		if (mode === 'bottom') {
			style.borderRadius = `${radius} ${radius} 0 0`;
		}
		if (mode === 'top') {
			style.borderRadius = `0 0 ${radius} ${radius} `;
		}
		if (mode === 'left') {
			style.borderRadius = `0 ${radius} ${radius} 0`;
		}
		if (mode === 'right') {
			style.borderRadius = `${radius} 0 0 ${radius}`;
		}
		if (mode === 'center') {
			style.borderRadius = radius;
		}
	}
	style.overflow = hidden ? 'hidden' : 'visible';
	return style;
});
// 获取动画名称
const getAnimationName = mode => {
	if (mode === 'bottom') {
		return 'slide-up';
	}
	if (mode === 'top') {
		return 'slide-down';
	}
	if (mode === 'left') {
		return 'slide-left';
	}
	if (mode === 'right') {
		return 'slide-right';
	}
	if (mode === 'center') {
		return 'slide-center';
	}
};
// 获取动画类名
const animationClass = name => ({
	enter: `${name}_enter`,
	leave: `${name}_leave`
});
// 获取popup类样式
const popupClass = computed(() =>
	props.show ? 'u-popup_overlay_enter' : 'u-popup_overlay_leave'
);
// 获取popupContent类样式
const popupContentClass = computed(() => {
	const { mode, show } = props;
	const classes = animationClass(getAnimationName(mode));
	return show ? classes.enter : classes.leave;
});
// 发送事件
const emits = defineEmits(['close']);
const sendEmit = () => {
	if (props.overlayStopEmit) return;
	emits('close');
};
// 遮罩层显示于隐藏
const inited = ref(false);
let transitionEnded = false;
const overlayLeave = () => {
	if (transitionEnded) return;
	transitionEnded = true;
	setTimeout(() => {
		inited.value = false;
		transitionEnded = false;
	}, props.duration);
};
watch(
	() => props.show,
	value => {
		value ? (inited.value = true) : overlayLeave();
	},
	{
		immediate: true
	}
);
</script>

<style scoped lang="scss">
.u-popup {
	/* #ifdef APP-PLUS-NVUE */
	flex: 1;
	/* #endif */
	width: 750rpx;
	@include flex(column);
	&_transition {
		transition-property: opacity, transform;
	}
	// 遮罩
	&_overlay {
		/* #ifdef APP-PLUS-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-PLUS-NVUE */
		height: 100%;
		/* #endif */
		width: 750rpx;
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		&_leave {
			opacity: 0 !important;
		}
		&_enter {
			opacity: 1;
		}
	}
	// 内容
	&_content {
		&-data {
			overflow: hidden;
			position: relative;
		}
	}
	&_status-bar {
		@include flex(column);
		&-title {
			overflow: hidden;
		}
	}
}
.slide-up {
	&_enter {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
	&_leave {
		transform: translate3d(0, 100%, 0);
		opacity: 0;
	}
}
.slide-down {
	&_enter {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
	&_leave {
		transform: translate3d(0, -100%, 0);
		opacity: 0;
	}
}
.slide-left {
	&_enter {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
	&_leave {
		transform: translate3d(-100%, 0, 0);
		opacity: 0;
	}
}
.slide-right {
	&_enter {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
	&_leave {
		transform: translate3d(100%, 0, 0);
		opacity: 0;
	}
}
.slide-center {
	&_enter {
		transform: translate3d(-50%, -50%, 0) scale(1);
		opacity: 1;
	}
	&_leave {
		transform: translate3d(-50%, -50%, 0) scale(0.85);
		opacity: 0;
		z-index: -9999 !important;
	}
}
</style>
