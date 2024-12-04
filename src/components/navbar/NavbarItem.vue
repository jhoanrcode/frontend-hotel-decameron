<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const props = defineProps({
        item: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 0
        },
    }); 
    
    function checkActiveRoute(url) { 
        return route.name === url.name; 
    }

</script>


<template>
    <a v-if="(!item.to) !== false" :href="item.url" class="link" :target="item.target" tabindex="0">
        <span class="material-symbols-outlined">{{ item.icon }}</span>
    </a>
    <router-link v-if="item.to !== undefined" class="link" :to="item.to" :class="{ active: checkActiveRoute(item.to) }" :title="item.label">
        <span class="material-symbols-outlined">{{ item.icon }}</span>
    </router-link>
</template>
