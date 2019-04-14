import Vue from 'vue'
import Router from 'vue-router'

const CHome = () =>
	import ('@/components/home')
const CLogin = () =>
	import ('@/components/login')
const CJob = () =>
	import ('@/components/job')
const CContent = () =>
	import ('@/components/content')
const Author = () =>
	import ('@/components/author')
const UserCenter = () =>
	import ('@/components/user_center')
Vue.use(Router)

export default new Router({
	mode: 'history',
	scrollBehavior(to, from, savePosition) {
		if (savePosition) {
			return savePosition;
		} else {
			return {
				x: 0,
				y: 0
			};
		}
	},
	routes: [{
		path: '/',
		name: 'CHome',
		component: CHome,
		redirect: '/topic/all',
		children: [{
			path: '/topic/:type',
			name: "CJob",
			component: CJob
		}, {
			path: '/content',
			name: 'CContent',
			component: CContent
		}, {
			path: '/author/:user_name',
			name: 'Author',
			component: Author
		}, {
			path: '*',
			redirect: '/topic/all'
		}]
	}, {
		path: '/login',
		name: 'CLogin',
		component: CLogin
	}, {
		path: '/user',
		name: 'UserCenter',
		component: UserCenter
	}]
})