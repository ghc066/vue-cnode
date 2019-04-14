<template>
  <div id="app">
  	<div class="app-header">
  		<c-header />
  	</div>
    <!-- <transition name="fade"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import CHeader from './components/header'
export default {
  name: 'App',
  components:{
	 CHeader
  }
}
</script>
<style>
a{
	text-decoration: none;
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>

