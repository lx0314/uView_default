
// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue,vm) => {

	// 首页
	let getindex = (params={page:1,recommend:1}) => vm.$u.get('index', params)
	let login = params => vm.$u.post('auth/login', params)	// 登录
	let register = params => vm.$u.post('auth/register',params)	// 注册
	let logout = () => vm.$u.post('auth/logout')	// 退出登录 
	let ossupdata=(params)=>vm.$u.patch('user/avata',params) 
	let authOssToken=()=>vm.$u.get('auth/oss/token')
	let userInfo = () => vm.$u.get('user') // 用户详情
	let userInfoshow = (params) => vm.$u.put('user',params) // 用户详情
	let goodsInfo = good => vm.$u.get(`goods/${good}`) // 商品详情
	let goodsCollect = id => vm.$u.post(`collects/goods/${id}`) // 商品详情
	let goodsList = (params = {}) => vm.$u.get(`goods`, params) // 商品列表
	let cartAdd = params => vm.$u.post(`carts`, params) // 加入购物车
	let cartList = () => vm.$u.get(`carts`) // 加入购物车
	
		vm.$u.api = {
			getindex,login,
			logout,userInfo,goodsList,
			cartList,cartAdd,
			goodsCollect,userInfoshow,
			goodsInfo,register,
			ossupdata,authOssToken
			};
}

export default {
	install
}