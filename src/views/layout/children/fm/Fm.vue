<template lang="pug">
p fm
input(type='file' @change="handleFile($event)")
</template>

<script lang="ts" setup>
const handleFile = (event: Event) => {
	const target = event.target as HTMLInputElement
	console.log(target.files)
}
</script>

<style scoped lang="less"></style>
