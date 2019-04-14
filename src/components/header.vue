<template>
	<div id="myHeader">
		<div class="hleft">
			<router-link :to="{name:'CHome'}">
				<img class="logo" src="https://static2.cnodejs.org/public/images/cnodejs_light.svg"/>
			</router-link>
		</div>
		<div class="hcenter">
			<div class="search_container">
				<input class="search_input_value" type="text" v-model="searchVal">
			</div>
		</div>
		<div class="hright">
			<router-link :to="{name:'UserCenter'}" v-if="isLogin">{{userInfo.loginname}}</router-link>
			<router-link :to="{name:'CLogin'}" v-else>登陆/注册</router-link>
		</div>	
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
		name:"MyHeader",
		data(){
			return{
				searchVal:""
			}
		},
		computed:{
			...mapGetters({
				'isLogin':'getIsLogin',
				'userInfo':'getUserInfo'
			})
		}
	}
</script>

<style>
	*{
		margin:0;
		padding:0;
	}
</style>

<style scoped>
	#myHeader{
		background-color: #444;
		display: flex;
		height: 40px;
	}
	.logo{
		width:100%;
		height: 100%;
	}
	.hleft,.hright{
		width: 20%;
	}
	.hleft{
		padding:5px;
	}
	.hright{
		text-align: center;
		line-height: 40px;
		color:#fff;
	}
	.hcenter{
		flex:1;
		padding-left: 10px;
		padding-right: 10px;
	}
	.search_container{
		text-align: center;
	}
	.search_input_value{
		box-sizing: border-box;
		width:100%;
		height: 30px;
		border:none;
		border-radius: 20px;
		outline: none;
		background: url(https://cnodejs.org/public/images/search.e53b380a.hashed.png) 8px 6px no-repeat #888;
		padding:3px 5px 3px 28px;
		color:#666;
		font-weight: 400;
		line-height: 1;
		margin-top: 5px;
	}
	.search_input_value:focus{
		background-color: #fff;
	}
	a{
		color:#fff;
	}
</style>