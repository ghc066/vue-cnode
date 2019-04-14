<template>
	<div id="topic_item" v-if="Object.keys(topicItem).length>0">
		<a class="author">
			<router-link :to="{path:'/author/'+topicItem.author.loginname}"><img class="author_img" :src="topicItem.author.avatar_url" :alt="topicItem.author.loginname" :title="topicItem.author.loginname"></router-link>
		</a>
		<router-link :to="{path:'/content',query:{id:topicItem.id}}" class="content">
			{{topicItem.title}}
		</router-link>
		<span class="topic_time">{{topicItem.last_reply_at | filterTime}}</span>
	</div>
</template>

<script>
	export default {
		name:"TopicItem",
		props:{
			topicItem:{
				type:Object
			}
		},
	}
</script>

<style scoped>
	#topic_item{
		width: 100%;
		height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #ecedee;
		line-height: 50px;
		padding:0 8px;
		display: flex;
	}
	.author{
		width:40px;
	}
	.author_img{
		width:30px;
		height: 30px;
		border-radius: 4px;
		margin-top: 10px;
	}
	.content{
		flex:1;
		white-space: nowrap;
		overflow:hidden;
		text-overflow: ellipsis;
		color:#444;
		padding-left: 5px;
	}
	.topic_time{
		color:#b4b4b4;
		line-height: 50px;
	}
</style>