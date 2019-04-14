<template>
	<div class="view_box">
		<Topic v-for="(item,key) in getTopic" :key="key" :topicItem="item"/>
	</div>
</template>

<script>
	import axios from 'axios'
	import Topic from './topic'
	export default {
		name:"CTopic",
		components:{
			Topic
		},
		computed:{
			getTopic(){
				var ckey = this.$route.params.type;
				if(this.$store.getters.getTopics[ckey].length<=0){
					this.PostData(ckey)
				}else{
					return this.$store.getters.getTopics[ckey];
				}
			}
		},
		methods:{
			PostData(ckey){
				axios.get(`/topics?tab=${ckey}`).then((res)=>{
					if(res.data.success){
						this.$store.dispatch(`ActionTopics`,{data:res.data.data,type:ckey});
					}else{
						console.log(res.data);
						console.log(res.status);
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
		},
	}
</script>
