<template>
	<view class="">
		购物车
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return
		}
	}
</script>

<style>
</style>
