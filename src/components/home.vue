<template>
	<div id="cHome">
		<c-nav />
		<!-- <transition name="fade"> -->
		<div class="view-content" ref="view_box">
			<router-view></router-view>
			<div class="load_more" v-if="loadMore">
				<img src="/static/loading.gif">
			</div>
		</div>
		<!-- </transition> -->
		<div class="to_top" v-if="show_scroll">
			<img src="../assets/top.png" @click="ToTop">
		</div>
	</div>
</template>

<script>
	let timer =  null;
	import CNav from './nav'
	import axios from 'axios'
	export default {
		name:"CHome",
		components:{
			CNav
		},
		data(){
			return{
				show_scroll:false,
				windowHeight:0,
				loadMore:false,
				loading:false,
			}
		},
		created(){
			var height = document.documentElement.clientHeight;
			this.windowHeight = height;
		},
		mounted(){
			var box = this.$refs.view_box;
			box.addEventListener("scroll",this.OnScroll,false);
		},
		methods:{
			ToTop(){
				var box = this.$refs.view_box;
				timer = setInterval(function(){
					var now_top =box.scrollTop;
					var speed = Math.floor(-now_top / 5);
					box.scrollTop = now_top + speed;
					if(now_top <= 0){
						clearInterval(timer);
					}
				},20);
			},
			OnScroll(){
				var box = this.$refs.view_box;
				if(box.scrollTop >= this.windowHeight){
					if(!this.show_scroll){
						this.show_scroll = true;
					}
				}else{
					if(this.show_scroll){
						this.show_scroll = false;
					}
				}
				var type = this.$route.params.type;
				if(typeof type != 'undefined'){
					var box_height = box.querySelector('.view_box').offsetHeight;
					if(!this.loading){
						if(this.windowHeight - 80 + box.scrollTop >= box_height){
							this.loading = true;
							this.loadMore = true;
							axios.get('/topics?page=2').then((res)=>{
								var result = res.data;
								if(result.success){
									this.$store.dispatch('ActionAddTopics',{type:type,data:result.data});
								}	
								setTimeout(()=>{
									this.loading = false;
								},2000);
								this.loadMore = false;
							}).catch((err)=>{
								console.log(err);
								this.loading = false;
								this.loadMore = false;
							});
						}
					}
				}
			}
		},
		destroyed(){
			// var box = this.$refs.view_box;
			// if(box.removeEventListener){
			// 	box.removeEventListener("scroll",this.OnScroll);
			// }
		}
	}
</script>
<style scoped>
	.view-content{
		width:100%;
		position: absolute;
		box-sizing: border-box;
		top:80px;
		left: 0;
		bottom: 0;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.to_top{
		width:50px;
		height: 50px;
		position: fixed;
		bottom: 20px;
		right: 20px;
		border-radius:50%;
	}
	.to_top>img{
		width: 50px;
		border-radius:50%;
	}
	.load_more{
		width: 100%;
		height: 30px;
		box-sizing: border-box;
		text-align: center;
	}
	.load_more>img{
		width: 30px;
		height: 30px;
	}
</style>