<template>
	<div id="cLogin">
		<div class="tag">
			<span class="tag_main">主页</span><span> / 登陆</span>
		</div>
		<div class="panel">
			<div class="input-group">
				<label>用户名</label>
				<div class="input-item">
					<input type="text" placeholder="请输入用户名" v-model="user.userName">
				</div> 
			</div>
			<div class="input-group">
				<label>密码</label>
				<div class="input-item">
					<input type="password" placeholder="请输入密码" v-model="user.password">
				</div> 
			</div>
			<div class="input-group">
				<button @click="Login" class="btn" ref="loginbtn">{{btn_txt}}</button>
			</div>
			<a class="login_github" @click="LoginByGithub">通过github登陆</a><a class="forget_pwd">忘记密码?</a>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:"CLogin",
		data(){
			return{
				user:{
					userName:"zhangsan",
					password:"123456789"
				},
				btn_txt:"立即登录",
				from_path:"",
			}
		},
		beforeRouteEnter(to,from,next){
			next((vm)=>{
				vm.$store.dispatch("ActionLogin",false);
				vm.from_path = from.path;
			});	
		},
		methods:{
			Login(){
				if(this.userName == "" || this.password == "") return;
				var accessToken = this.$store.getters.getToken;
				if(accessToken == "") return;
				this.btn_txt = "登录中...";
				this.$refs.loginbtn.setAttribute('disabled',true);
				axios.post('/accesstoken',{accesstoken:accessToken},{headers:{'Content-Type':'application/json'}}).then((res)=>{
					var result = res.data;
					if(result.success){
						console.log(result);
						this.$store.dispatch("ActionLogin",true);
						var user_info = {
							loginname:result.loginname,
							id:result.id,
							avatar_url:result.avatar_url,
						};
						this.$store.dispatch("ActionUserInfo",user_info);
						this.btn_txt = "立即登录";
						this.$refs.loginbtn.removeAttribute('disabled');
						this.$router.push(this.from_path);
					}
				}).catch((err)=>{
					this.btn_txt = "立即登录";
					this.$refs.loginbtn.removeAttribute('disabled');
					console.log(err);
				})
			},
			LoginByGithub(){
				console.log("LoginByGithub");
			}
		}
	}
</script>

<style scoped>
	#cLogin{
		width: 100%;
		box-sizing: border-box;
	}
	.tag{
		height: 40px;
		line-height: 40px;
		color:#666;
		background-color: #ecedee;
	}
	.tag_main{
		color:#80bd01;
		margin-left: 5px;
	}
	.panel{
		width: 100%;
		box-sizing: border-box;
		padding:5px 10px;
	}
	.input-group{
		margin:16px 0; 
	}
	.input-group>label{
		line-height: 1.5em
	}
	.input-item>input{
		height: 30px;
		width:100%;
		border:1px solid #ccc;
		outline: none;
		border-radius:8px;
		margin-top: 4px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.input-item>input:focus{
		border: 1px solid #9edbfa;
		box-shadow: 0 0 2px #9edbfa;
	}
	.btn{
		width: 100%;
		height: 30px;
		border-radius: 10px;
		border:none;
		background-color: green;
		color:#fff;
		outline: none;
		margin-top: 10px;
	}
	.login_github,.forget_pwd{
		color:#666;
		font-size:12px;
	}
	.login_github{
		float: left;
	}
	.forget_pwd{
		float: right;
	}
</style>
