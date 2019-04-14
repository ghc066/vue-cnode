<template>
	<div id="content">
		<div class="content_body" v-if="Object.keys(topic_content).length >0">
			<div class="title">
				<h3>{{topic_content.title}}</h3>
			</div>
			<div class="publish_info">
				<p>&bull; 发布于{{topic_content.create_at | filterTime}} &bull;作者 {{topic_content.author.loginname}} &bull;{{topic_content.visit_count}}次浏览 &bull;来自 {{topic_content.tab | filterTab}}</p>
				<p class="collect_p" v-if="IsLogin"><button class="collect" @click="OnCollect">收藏</button></p>
			</div>
			<div class="detail_content" v-html="topic_content.content"></div>
			<div class="author_info">
				<div class="author_tab">
					<p>作者信息</p>
				</div>
				<div class="author_content">
					<div class="author_img_name">
						<div class="author_img">
							<router-link :to="{path:'/author/'+topic_content.author.loginname}"><img :src="topic_content.author.avatar_url" :alt="topic_content.author.loginname"></router-link>
						</div>
						<div class="author_name">
							<router-link :to="{path:'/author/'+topic_content.author.loginname}">{{topic_content.author.loginname}}</router-link>
						</div>
					</div>
					<div class="user_score">
						积分:{{UserScores}}
					</div>
					<div class="user_score">
						<i>“ 这家伙很懒，什么个性签名都没有留下。 ”</i>
					</div>
				</div>
			</div>
			<div class="reply" v-if="topic_content.reply_count>0">
				<div class="author_tab">
					<p>{{topic_content.reply_count}} 回复</p>
				</div>
				<div class="reply_item" v-for="(item,index) in topic_content.replies" :key="index">
					<div class="reply_logo">
						<img :src="item.author.avatar_url" :alt="item.author.loginname">
					</div>
					<div class="reply_content">
						<div class="reply_name">
							<p>{{item.author.loginname}} <span class="reply_top">{{index+1}}楼&bull;{{item.create_at | filterTime}}</span></p>
						</div>
						<div class="reply_txt" v-html="item.content"></div>
					</div>
				</div>
			</div>
			<div class="back" @click="Back">
				返回
			</div>
		</div>
		<div v-else>
			<img src="../assets/loading.gif" width="50" alt="" class="loading-gif">
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:"Content",
		data(){
			return {
				topic_content:{},
				user_info:{}
			}
		},
		computed:{
			UserScores(){
				if(Object.keys(this.user_info).length>0){
					return this.user_info.score;
				}else{
					return 0;
				}
			},
			IsLogin(){
				return this.$store.getters.getIsLogin;
			}
		},
		created(){
			var id = this.$route.query.id;
			if(id == "") return;
			axios.get('/topic/'+id).then((res)=>{
				if(res.data.success){
					this.topic_content = res.data.data;
					this.GetUserInfo(this.topic_content.author.loginname);
				}else{
					this.$router.go(-1);
				}
			}).catch((err)=>{
				console.log(err);
				this.$router.go(-1);
			})
		},
		methods:{
			GetUserInfo(user_name){
				axios.get('/user/'+user_name).then((res)=>{
					if(res.data.success){
						this.user_info = res.data.data;
					}
				}).catch((err)=>{
					console.log(err);
					this.$router.go(-1);
				})
			},
			Back(){
				this.$router.go(-1);
			},
			OnCollect(){
				var token = this.$store.getters.getToken;
				var id = this.$route.query.id;
				axios.post('/topic_collect/collect',{accesstoken:token,topic_id:id},{
					headers:{'Content-Type':'application/json'}
				}).then((res)=>{
					if(res.data.success){
						alert("收藏成功");
					}
				}).catch((err)=>{
					console.log(err);
				});
			}
		}
	}
</script>

<style scoped>
	#content{
		padding:5px 0;
		width: 100%;
	}
	.title{
		padding:0 5px;
	}
	.publish_info{
		font-size:12px;
		color:#707375;
		padding:10px 5px;
		border-bottom:1px solid #707375;
	}
	.detail_content{
		box-sizing: border-box;
		padding:5px;
		line-height: 1.5em;
		width: 100%;
		overflow:hidden;
	}
	.detail_content>a{
		color:blue;
		text-decoration: underline;
	}
	.detail_content .markdown-text img{
		width: 100%;
	}
	.markdown-text{
		width:100px;
	}
	.author_info,.author_content{
		width: 100%;
		box-sizing: border-box;
	}
	.author_img_name{
		height: 60px;
		padding:5px;
		box-sizing: border-box;
	}
	.author_img{
		width: 50px;
		height: 50px;
		float: left;
	}
	.author_img>a>img{
		width: 100%;
		height: 100%;
	}
	.author_name{
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
		float: left;
	}
	.author_name a{
		color:#000;
	}
	.user_score{
		padding:5px;
		font-size:15px;
	}
	.reply_item{
		width: 100%;
		box-sizing: border-box;
		padding:10px;
		border-bottom:1px solid #ccc;
		overflow:hidden;
		display: flex;
		display: -webkit-flex;
	}
	.reply_logo{
		width:40px;
		height: 40px;
	}
	.reply_logo>img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.reply_content{
		flex:1;
		padding:0 5px 5px;
	}
	.reply_top{
		font-size:13px;
		color:#58ee8a;
	}
	.reply_name{
		width: 100%;
	}
	.reply_txt{
		width: 100%;
		padding:5px;
	}
	.collect_p{
		margin-top: 4px;
	}
	.collect{
		background:green;
		color:#fff;
		padding:3px 5px;
		outline: none;
		border-radius: 5px;
		border:1px solid green;
	}
</style>

<style>
	.markdown-text img{
		width:100%;
	}
	.loading-gif{
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
	}
	.author_tab{
		height: 40px;
		line-height: 40px;
		background-color:#bcc2c7;
		padding-left: 5px;
	}
	.back{
		position: fixed;
		width: 50px;
		height: 50px;
		line-height: 50px;
		top:50%;
		left: 0;
		margin-top: -50px;
		border-radius: 50%;
		background-color: #90ec7e;
		text-align: center;
		color:#fff;
	}
</style>