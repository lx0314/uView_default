<template>
	<view class="box">
		<view class="title">欢迎登图书商城</view>
		<u-form :model="form">
					<u-form-item label="账号" prop="email">
						<u-input v-model="form.email" />
					</u-form-item>
					<u-form-item label="密码" prop="password">
						<u-input type='password' v-model="form.password" />
					</u-form-item>
					<button @click="submit()">登录</button>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					email: '',
					password: '',
				},
				
			};
		},
		methods: {
			async submit(){
				const params = {
					email: this.form.email,
					password: this.form.password
				}
				const loginRes = await this.$u.api.login(params)
				console.log(loginRes)
				this.$u.vuex('vuex_token',loginRes.data.access_token)
				// 请求用户信息
				const userInfo = await this.$u.api.userInfo()
				// 缓存用户信息
				this.$u.vuex('vuex_user', userInfo.data)
				if(loginRes.statusCode==200){
					this.$u.toast('登录成功')
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch', 
							url: 'pages/user/index'
						})
					}, 1500)
				}
			}
			
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			
		}
	};
</script>

<style>
	.box{
		padding: 0 20px;
	}
	.title {
		text-align: left;
		font-size: 60rpx;
		font-weight: 500;
		margin-bottom: 100rpx;
	}
</style>
