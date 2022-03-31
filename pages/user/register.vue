<template>
	<view class="box">
		<view class="title">欢迎注册图书商城账号</view>
		<u-form :model="form">
					<u-form-item label="账号">
						<u-input v-model="form.name" />
					</u-form-item>
					<u-form-item label="邮箱">
						<u-input v-model="form.email" />
					</u-form-item>
					<u-form-item label="密码">
						<u-input type='password' v-model="form.password" />
					</u-form-item>
					<u-form-item label="确认密码" >
						<u-input type='password' v-model="form.password_confirmation" />
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
					name:'',
					email: '',
					password: '',
					password_confirmation:''
				},
				rules: {
					email: [
						{ 
							required: true, 
							message: '请输入邮箱',
							trigger: 'change',
						}
					],
					password: [
						{
							min: 6, 
							message: '密码不能少于6位', 
							trigger: 'change'
						}
					]
				}
			};
		},
		methods: {
			async submit(){
				const params = {
					name:this.name,
					email: this.form.email,
					password: this.form.password,
					password_confirmation: this.form.password_confirmation
				}
				const loginRes = await this.$u.api.register(params)
				this.$u.vuex('vuex_token',loginRes.data.access_token)
				if(loginRes.statusCode==200){
					this.$u.toast('注册成功')
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch', 
							url: 'pages/user/logo'
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
