// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {
	store
} from './store/store'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	error: '/static/error.png',
	loading: '/static/loading.gif',
	attempt: 1
})

axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.filter("filterTime", function(value) {
	var date = new Date(value);
	var timestamp = parseInt((new Date().getTime() - date.getTime()) / 1000);
	if (parseInt(timestamp / (3600 * 24)) > 0) {
		return parseInt(timestamp / (3600 * 24)) + "天前";
	} else if (parseInt(timestamp / 3600) > 0) {
		return parseInt(timestamp / 3600) + "小时前";
	} else if (parseInt(timestamp / 60) > 0) {
		return parseInt(timestamp / 60) + "分钟前";
	} else {
		return "刚刚";
	}
});

Vue.filter("filterTab", function(value) {
	switch (value) {
		case 'ask':
			return "问答";
			break;
		case 'share':
			return "分享";
			break;
		case 'good':
			return "精品";
			break;
		case 'job':
			return "招牌";
			break;
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	//template: '<App/>'
	render: h => h(App)
})