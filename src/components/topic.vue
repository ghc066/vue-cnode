<template>
	<div id="topic" v-if="Object.keys(topicItem).length>0">
		<a class="author">
			<router-link :to="{path:'/author/'+topicItem.author.loginname}"><img class="author_img" v-lazy="topicItem.author.avatar_url"></router-link>
		</a>
		<div class="visit_num">
			<span class="label" v-if="topicItem.top">置顶</span>
			<span class="label" v-else-if="topicItem.good">精华</span>
			<span class="label1" v-else>{{topicItem.tab | filterTab}}</span>
			<span class="vc_val">
				<span class="comment_val">{{topicItem.reply_count}}</span>/<span class="visit_val">{{topicItem.visit_count}}</span>
			</span>
		</div>
		<router-link :to="{path:'/content',query:{id:topicItem.id}}" class="content">
			{{topicItem.title}}
		</router-link>
		<span class="topic_time">{{topicItem.create_at | filterTime}}</span>
	</div>
</template>

<script>
	export default {
		name:"Topic",
		props:{
			topicItem:{
				type:Object
			}
		},
	}
</script>

<style scoped>
	#topic{
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
	.visit_num,.topic_time{
		font-size:12px;
	}
	.visit_num{
		position: relative;
	}
	.vc_val{
		position: absolute;
		left: 0;
		top:17px;
	}
	.comment_val{
		color:#9e78c0;
	}
	.visit_val{
		color:#b4b4b4;
	}
	.label{
		background-color:#80bd01;
		color:#fff;
		border-radius: 4px;
		padding: 2px;
	}
	.label1{
		background-color:#ccc;
		color:#fff;
		border-radius: 4px;
		padding: 2px;
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