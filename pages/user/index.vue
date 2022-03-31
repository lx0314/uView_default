<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 avatar-body">
					<oss></oss>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">昵称:{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">email:{{vuex_user.email}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20" @click="goinfo">
			<u-cell-group>
				<u-cell-item icon="fingerprint" title="个人信息"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的收藏"></u-cell-item>
				<u-cell-item icon="file-text" title="我的订单"></u-cell-item>
				<u-cell-item icon="map" title="我的地址"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20" @click="loginout">
			<u-cell-group>
				<u-cell-item icon="reload" title="退出登录"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				isAndroid:false,
				userinfo:{}
			}
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return
			
			if(this.$u.utils.isAndroid()) {
				this.$u.toast('是安卓设备')
				this.isAndroid = true
			}
		},
		methods: {
			loginout(){
				this.$u.api.logout()
				setTimeout(() => {
					// 清除缓存的token和用户信息
					this.$u.vuex('vuex_token', null)
					this.$u.vuex('vuex_user',{})
					this.$u.route({
						type: 'reLaunch', // 使用reLaunch在App上会导致无法返回首页
						url: 'pages/user/logo'
					})
				}, 1500)
			},
			goinfo(){
				
				this.$u.route({
					url: 'pages/user/userinfo'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
