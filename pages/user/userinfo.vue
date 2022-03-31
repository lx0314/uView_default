<template>
	<view class="box">
		<u-form :model="form">
					<u-form-item label="名称" prop="name">
						<u-input v-model="form.name" />
					</u-form-item>
					<button @click="submit(form)">确认修改</button>
		</u-form>
	</view>
</template>

<script>
export default {
		data() {
			return {
				form: {
					name: ''
				},
				rules: {
					name: [
						{ 
							required: true, 
							message: '请输入姓名', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					]
				}
			};
		},
		methods: {
			async submit(data){
				const params = {
					name: data.name
				}
				const loginRes = await this.$u.api.userInfoshow(params)
				this.$u.toast('修改成功')
				this.$u.route({
					type: 'switchTab',
					url: 'pages/user/index'
				})
				await this.$u.utils.updateUser()
			}
		},
		async onLoad() {
			const res=await this.$u.api.userInfo()
			console.log(res)
			this.form=res.data
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
