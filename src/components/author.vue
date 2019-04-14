<template>
	<div id="author">
		<div class="author_container" v-if="loaded">
			<div class="user_info">
				<div class="author_tab">
					<p>个人信息</p>
				</div>
				<div class="user_img_name">
					<div class="user_img">
						<img :src="author_info.avatar_url" :alt="author_info.loginname">
					</div>
					<div class="user_name txt_color">
						<p>{{author_info.loginname}}</p>
					</div>
				</div>
				<div class="score">
					<p>{{author_info.score}} 积分</p>
				</div>
				<div class="collected txt_color">
					<p>{{collect_len}}个话题收藏</p>
				</div>
				<div class="other_info txt_color">
					<i class="iconfont icon-github" v-if="typeof author_info.githubUsername!='undefined'">
						@{{author_info.githubUsername}}
					</i>
				</div>
				<div class="reg_time txt_color">
					<p>注册时间{{author_info.create_at | filterTime}}</p>
				</div>
			</div>
			<div class="recent_topic">
				<div class="author_tab">
					<p>最近创建的话题</p>
				</div>
				<div v-if="author_info.recent_topics.length>0">
					<div class="topic_item" v-for="(item,index) in author_info.recent_topics.slice(0,5)" :key="index">
					<topic-item :topicItem="item"></topic-item>
					</div>
					<div class="scan_more">
						<router-link to="/">查看更多&gt;&gt;</router-link>
					</div>
				</div>
				<div v-else>
					<p>无</p>
				</div>
			</div>
			<div class="recent_topic">
				<div class="author_tab">
					<p>最近参与的话题</p>
				</div>
				<div v-if="author_info.recent_replies.length>0">
					<div class="topic_item" v-for="(item,index) in author_info.recent_replies.slice(0,5)" :key="index">
					<topic-item :topicItem="item"></topic-item>
					</div>
					<div class="scan_more">
						<router-link to="/">查看更多&gt;&gt;</router-link>
					</div>
				</div>
				<div v-else>
					<p>无</p>
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
	import TopicItem from './topic_item'
	import axios from 'axios'
	export default {
		name:"Author",
		components:{
			TopicItem
		},
		data(){
			return {
				loaded:false,
				author_info:{},
				collect_len:0,	
			}
		},
		created(){
			this.GetAuthorInfo();
		},
		methods:{
			GetAuthorInfo(){
				var username = this.$route.params.user_name;
				if(username == "") return;
				axios.all([this.GetUserInfo(username),this.GetCollectTopic(username)]).then(axios.spread((res,collection)=>{
						if(res.data.success && collection.data.success){
							this.loaded = true;
							this.author_info = res.data.data;
							this.collect_len = collection.data.data.length;
						}else{
							this.$router.go(-1);
						}
				})).catch((err)=>{
					console.log(err);
					this.Back();
				});
			},
			GetUserInfo(user_name){
				return axios.get('/user/'+user_name);
			},
			GetCollectTopic(user_name){
				return axios.get('/topic_collect/'+user_name);
			},
			Back(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.user_img_name{
		width: 100%;
		padding:5px;
		height: 60px;
		box-sizing: border-box;
		display: flex;
		display: -webkit-flex;
	}
	.user_img{
		width: 50px;
		height: 50px;
		border-radius: 4px;
	}
	.user_img>img{
		width:100%;
		height: 100%;
	}
	.user_name{
		flex:1;
		line-height: 50px;
		padding-left: 20px;
	}
	.score,.collected,.reg_time{
		padding:5px;
	}
	.collected{
		font-size:17px;
	}
	.txt_color{
		color:#acb2b9;
	}
	.other_info{
		padding:5px 7px;
	}
	.scan_more{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #ecedee;
	}
	.scan_more>a{
		color:#333;
		font-size: 14px;
	}
</style>
