<script setup>
    import { ref } from 'vue';
    import NavbarItem from './NavbarItem.vue';

    const menu = ref([
        { label: 'Inicio', icon: 'home', to: { name: 'home' } },
        { label: 'Sedes', icon: 'dashboard', to: { name: 'sedes' } },
        { label: 'Sobre mi', icon: 'person', to: { name: 'autor' } },
        { label: 'Documentación', icon: 'info', url: 'https://github.com/jhoanrcode/frontend-hotel-decameron', target: '_blank' }
    ]);

</script>
  
<template>
    <nav class="menu">
        <template v-for="(item, i) in menu" :key="item">
            <NavbarItem :item="item" :index="i"></NavbarItem>
        </template>
    </nav>
</template>  
