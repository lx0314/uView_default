<template>
	<u-upload 
	ref="upload"
	:action="action" 
	:max-size="5 * 1024 * 1024" 
	max-count="1"
	:multiple="false"
	:before-upload="beforeUpload"
	:custom-btn="true"
	:show-progress="false"
	:form-data="formData"
	:show-upload-list="false"	
	:deletable="false"
	@on-success="onSuccess"
	>
		<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
	</u-upload>
</template>

<script>
	let _this = {}
	export default {
		name:"oss-upload",
		data() {
			return {
				action: '',
				formData: {},
				upFileName: ''
			};
		},
		created() {
			_this = this
		},
		methods: {
			/**
			 * 上传前的钩子
			 * 注意: 在小程序中 this 可能会丢失
			 */
			async beforeUpload(index, list) {
				const {file} = list[0]
				
				// #ifdef H5
				const fileName = file.name
				// #endif
				
				// #ifndef H5
				const fileName = file.path
				// #endif
				console.log(fileName)
				// 请求API, 获取oss token
				const ossToken = await _this.$u.api.authOssToken()
				console.log(ossToken)
				
				// 设置上传域名
				_this.action = ossToken.data.host
				
				// 处理唯一文件名
				const suffix = fileName.slice(fileName.lastIndexOf('.'))
				const upFileName = _this.$u.guid(20) + suffix
				
				_this.upFileName = upFileName
				console.log(upFileName)
				// 额外的上传参数
				_this.formData = {
					'key': upFileName, // 上传后的文件ming,
					'policy': ossToken.data.policy,
					'OSSAccessKeyId': ossToken.data.accessid,
					'success_action_status': '200',
					'signature': ossToken.data.signature,
				}
				return true;
			},
			/**
			 * 上传成功之后
			 */
			async onSuccess() {
				// 移出预览区域的图片
				this.$refs.upload.remove(0)
				// 请求API更新头像
				await this.$u.api.ossupdata({avatar: this.upFileName})
				console.log(this.upFileName)
				// 更新缓存的用户信息
				this.$u.utils.updateUser()
				this.$u.toast('更新成功')
			}
		}
	}
</script>

<style>

</style>
