const install = (Vue, vm) => {
	
	const isLogin = () => {
		// 如果没有token, 跳转到登录页面
		const token = vm.vuex_token
		if (!token) {
			// 来自哪个页面
			const currentPage = getCurrentPages().pop()
			// 获取页面路径, 和请求参数
			const {options, route} = currentPage
			// 参数的key
			const optionsKeys = Object.keys(options)
			let params = ''
			if (optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre, current) => {
					return `${pre}${current}=${options[current]}&`
				}, '?').slice(0, -1)
			}
			// 缓存当前页, 用于登录或者注册之后的跳转
			uni.setStorageSync('back_url', route + params)
			
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					url: 'pages/user/logo',
				})
			}, 1500)
			return false
		}
		return true
	}
	
	const updateUser = async () => {
		// 请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		console.log(userInfo)
		// 缓存用户信息
		vm.$u.vuex('vuex_user',userInfo.data)
	}
	
	const isAndroid = () => {
		try {
		    const res = uni.getSystemInfoSync();
		    if(res.platform === 'android') return true
				return false
		} catch (e) {
		    // error
		}
	}
	
	vm.$u.utils = {
		isLogin,
		updateUser,
		isAndroid
	}
}

export default {
	install
}