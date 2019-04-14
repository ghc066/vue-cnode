<template>
	<div id="userCenter">
		<author-info :topic_content="author_info"></author-info>
		<div class="my_collection">
			<div class="author_tab">
				<p>我的收藏</p>
			</div>
			<div class="collect_content" v-if="collect_topic.length > 0">
				<div v-for="(item,index) in collect_topic.slice(0,5)" :key="index" >
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
		<div class="no_message">
			<div class="author_tab">
				<div class="barge_val">未读消息<div class="barge_number" v-if="barge_number>0">{{barge_number}}</div></div>
			</div>
			<div class="message_content">
				<div v-if="barge_number>0"></div>
				<div v-else class="nomessage">
					<p>无消息</p>
				</div>
			</div>
		</div>
		<div class="read_message">
			<div class="author_tab">
				<p>已读消息</p>
			</div>
			<div class="message_content">
				<div v-if="read_message.length>0"></div>
				<div v-else class="nomessage">
					<p>无消息</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import AuthorInfo from './author_info'
	import TopicItem from './topic_item'
	export default {
		name:"UserCenter",
		components:{
			AuthorInfo,
			TopicItem
		},
		data(){
			return {
				author_info:{},
				collect_topic:[],
				barge_number:0,
				read_message:[],
				no_read_message:[],
			};
		},
		created(){
			this.PostUserInfo();
			this.PostCollection();
			this.GetNoReadCount();
		},
		methods:{
			PostUserInfo(){
				var username = this.$store.getters.getUserInfo.loginname;
				axios.get('/user/'+username).then((res)=>{
					if(res.data.success){
						this.author_info = res.data.data;
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			PostCollection(){
				var username = this.$store.getters.getUserInfo.loginname;
				axios.get('/topic_collect/'+username).then((res)=>{
					if(res.data.success){
						this.collect_topic = res.data.data;
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			GetNoReadCount(){
				var token = this.$store.getters.getToken;
				axios.get('/message/count?accesstoken='+token).then((res)=>{
					if(res.data.success){
						this.barge_number = res.data.data;
					}
				}).catch((err)=>{
					console.log(err);
				});
			}
		}
	}
</script>

<style scoped>
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
	.barge_val{
		position: relative;
	}
	.barge_number{
		position: absolute;
		left: 64px;
		top:10px;
		color:#fff;
		background-color: red;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 10px;
	}
	.nomessage{
		padding:5px 10px;
		color:#333;
	}
</style>