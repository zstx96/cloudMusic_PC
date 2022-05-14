<template lang="pug">
p(type="") fm
input(type='file' @change="handleFile($event)"   )
</template>

<script lang="ts" setup>
const handleFile = (event: Event) => {
	const target = event.target as HTMLInputElement
}
</script>

<style scoped lang="less"></style>
