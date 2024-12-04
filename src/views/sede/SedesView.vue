<script setup>
    import { onMounted, reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import axios from 'axios';
    import CardBlock from '@/components/layout/CardBlock.vue'
    import Sede from '@/views/sede/Sede.vue';
    
    const state = reactive({
        resultSedes: [],
        hasSede: false
    })

    onMounted(async () => { //Consultamos listado de sedes
        try {
            const response = await axios.get('http://localhost:8000/api/sedes');
            state.resultSedes = response.data.data;
            state.hasSede = true;
        } catch (error) {
            console.error('Error fetching sedes:', error);
        }
    });
</script>
<template>
    
    <CardBlock title="Sedes Hotel Decameron" subtitle="Listado de sedes creadas.">
        <template v-slot:infotable>
            <div class="wrapper">
                <label>Listado de sedes creadas.</label>
                <RouterLink to="/sedes/add" class="btn btn-primary">+ Nueva Sede</RouterLink>
            </div>
        </template>
        <div class="grid" v-if="state.hasSede">
            <Sede v-for="sede in state.resultSedes" :key="sede.id" :sede="sede"/>
        </div>
        <div class="grid-no-data" v-else>
            No se encontraron sedes creadas.
        </div>
    </CardBlock>
</template>