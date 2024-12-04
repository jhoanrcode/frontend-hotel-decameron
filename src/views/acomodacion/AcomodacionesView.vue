<script setup>
    import { onMounted, reactive } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import axios from 'axios';
    import CardBlock from '@/components/layout/CardBlock.vue'
    import Acomodacion from '@/views/acomodacion/Acomodacion.vue';
    
    const route = useRoute();
    
    const sedeId = route.params.id;
    const state = reactive({
        resultAcomodacionSedes: [],
        hasAcomodacion: false
    })

    onMounted(async () => { //Consultamos listado de acomodaciones por sede
        try {
            const response = await axios.get(`http://localhost:8000/api/habitaciones/${sedeId}`);
            state.resultAcomodacionSedes = response.data.data;
            state.hasAcomodacion = true;
        } catch (error) {
            console.error('Error fetching sedes:', error);
        }
    });
</script>
<template>
    
    <CardBlock title="Acomodaciones de Sede" subtitle="Listado de acomodaciones.">
        <template v-slot:infotable>
            <div class="wrapper">
                <label class="subtitle">Listado de acomodaciones <br>para sede seleccionada.</label>
                <RouterLink :to="`/acomodacion/add/${sedeId}`" class="btn btn-primary">+ Agregar</RouterLink>
            </div>
        </template>
        <ul class="lista" v-if="state.hasAcomodacion">
            <Acomodacion v-for="acomodacion in state.resultAcomodacionSedes" :key="acomodacion.id" :acomodacion="acomodacion"/>
        </ul>
        <div class="grid-no-data" v-else>
            No se encontraron acomodaciones creadas para esta sede.
        </div>
        <template v-slot:link>
            <RouterLink to="/sedes" class="btn btn-secondary">Volver a Sedes</RouterLink>
        </template>
    </CardBlock>
</template>