<template>
	<view>
		<u-swiper :list="slides" name="img_url"></u-swiper>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-grid :col="2">
				<u-grid-item v-for="item in goods" @click="gogoodsshow(item.id)">
					<u-icon :name="item.cover_url" :size="100"></u-icon>
					<view class="grid-text">{{item.title}}</view>
					<view class="grid-text" style="color: red;">{{'¥'+item.price}}</view>
				</u-grid-item>
				<u-loadmore :status="status" />
			</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slides:[],
				goods:[],
				list: [{
									name: '推荐'
								}, 
								{
									name: '销量'
								}, 
								{
									name: '评论'
								}, 
								{
									name: '价格'
								},
								],
				current: 0,
				status: 'loadmore',
								lists: 15,
								parmas:{
									page:1,
									recommend:1
								}
			}
		},
		async onLoad() {
			let ress=await this.$u.api.getindex()
			console.log(ress)
			this.slides=ress.data.slides
			this.goods=ress.data.goods.data
		},
		async onReachBottom() {
					if(this.page >= 3) return ;
					this.status = 'loading';
					this.parmas.page +=1
					let ress=await this.$u.api.getindex(this.parmas)
					this.goods = this.goods.pop().title ? [...this.goods, ...ress.data.goods.data] : ress.data.goods.data
				 setTimeout(() => {
						this.lists += 10;
						if(this.page >= 3) this.status = 'nomore';
						else this.status = 'loading';
						
					}, 2000)
				},
		methods: {
			gogoodsshow(ids){
				console.log(ids)
				this.$u.route({
					url:'pages/goodsshow/index?id='+ids
				})
			},
		async	change(index) {
			
			if(index==0){
				this.parmas={
					page:1,
					recommend:1
				}
			}else if(index==1){
				this.parmas={
					page:1,
					sales:1
				}
			}else if(index==2){
				this.parmas={
					page:1,
					comments_count:1
				}
			}else if(index==3){
				this.parmas={
					page:1,
					price:1
				}
			}
				let res=await this.$u.api.getindex(this.parmas)
				this.current = index;
				this.goods=res.data.goods.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}
.wrap {
		padding: 40rpx;
	}
.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
