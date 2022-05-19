<template lang="pug">
div
    div( class=" flex flex-wrap")
        span(v-for="item in $router.getRoutes()"
            @click="$router.push({name:item.name})"
            class=" bg-slate-200 rounded-full px-2 py-.5 mx-1 my-1 cursor-pointer "
            :class="[(item.path.includes(':id') || item.path.includes('Result'))&&' cursor-not-allowed bg-red-400']"
        ) {{item.name}} 
 

</template>

<script lang="ts" setup></script>

<style scoped lang="less"></style>
