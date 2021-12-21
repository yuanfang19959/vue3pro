<template>
  <div class="text">hello</div>
  <button @click="kkp">点击</button>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  },
  methods:{
   kkp() {
      this.color = 'blue'
      console.log(this.color)
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>