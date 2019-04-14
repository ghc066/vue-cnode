<template>
	<div id="authorInfo" v-if="Object.keys(topic_content).length > 0">
		<div class="author_info">
			<div class="author_tab">
				<p>作者信息</p>
			</div>
			<div class="author_content">
				<div class="author_img_name">
					<div class="author_img">
						<router-link :to="{path:'/author/'+topic_content.loginname}"><img :src="topic_content.avatar_url" :alt="topic_content.loginname"></router-link>
					</div>
					<div class="author_name">
						<router-link :to="{path:'/author/'+topic_content.loginname}">{{topic_content.loginname}}</router-link>
					</div>
				</div>
				<div class="user_score">
					积分:{{topic_content.score}}
				</div>
				<div class="user_score">
					<i>“ 这家伙很懒，什么个性签名都没有留下。 ”</i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:"AuthorInfo",
		props:{
			topic_content:{
				type:Object
			}
		},
	}
</script>

<style scoped>
	.author_info{
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
	.author_tab{
		height: 40px;
		line-height: 40px;
		background-color:#bcc2c7;
		padding-left: 5px;
	}
</style>