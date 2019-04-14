<template>
	<div id="cNav">
		<router-link to="/topic/all">全部</router-link>
		<router-link to="/topic/good">精华</router-link>
		<router-link to="/topic/share">分享</router-link>
		<router-link to="/topic/ask">回答</router-link>
		<router-link to="/topic/job">招聘</router-link>
	</div>
</template>

<script>
	export default{
		name:"CNav",
	}
</script>

<style scoped>
	#cNav{
		box-sizing: border-box;
		width: 100%;
		height:40px;
		overflow: hidden;
		background-color:#ecedee;
		line-height: 40px;
		padding:0 5px;
	}
	#cNav>a{
		padding-bottom: 6px; 
		text-decoration: none;
		color:#80bd01;
		margin-right: 10px;
		box-sizing: border-box;
	}
	#cNav>.router-link-active{
		border-bottom:2px solid #80bd01;
	}
</style>