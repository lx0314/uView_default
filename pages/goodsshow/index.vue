<template>
	<view class="box"  style="position: relative;">
		<view>
			<u-image width="100%" height="400px" :src="goods.goods.cover_url"></u-image>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
			<view v-html="goods.goods.details" v-if='current==0'>
			</view>
			<view v-else-if="current==1">
				<u-empty text="还有评论" mode="list"></u-empty>
			</view>
			<u-grid :col="2" v-else>
					<u-grid-item v-for="item in goods.like_goods" @click="gogoodsshow(item.id)">
						<u-icon :name="item.cover_url" :size="100"></u-icon>
						<view class="grid-text">{{item.title}}</view>
						<view class="grid-text" style="color: red;">{{'¥'+item.price}}</view>
					</u-grid-item>
			</u-grid>
		</view>
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">店铺</view>
				</view>
				<view class="item car">
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>
	
</template>

<script>
export default {
		data() {
			return {
				goods:{},
				list: [{
									name: '商品详情'
								}, 
								{
									name: '商品评论'
								}, 
								{
									name: '相关商品'
								}, 
								],
				current: 0
			};
		},
		methods: {
			async	change(index){
				console.log(index)
				this.current = index;
			}
			
		},
		async onLoad(option){
			console.log(option.id)
			
		const goodsshow=await this.$u.api.goodsInfo(option.id)
		console.log(goodsshow)
		this.goods=goodsshow.data
		}
	};
</script>

<style lang="scss" scoped>
	.box{
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-bottom: 60px;
	}
	.navigation {
		display: flex;
		position: fixed;
		bottom: 0;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		z-index: 99;
	
		.left {
			display: flex;
			font-size: 20rpx;
	
			.item {
				margin: 0 30rpx;
	
				&.car {
					text-align: center;
					position: relative;
	
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
	
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
	
			.btn {
				line-height: 66rpx;
				padding: 0 20rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
	
			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}
	
			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
