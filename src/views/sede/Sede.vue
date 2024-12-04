<script setup>
    import axios from 'axios';
    import { defineProps } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';

    const router = useRouter();
    const props = defineProps({
        sede: Object
    });

    const deleteSede = async (sedeId) => {
        try {
            const confirm = window.confirm('¿Estas seguro de querer eliminar esta sede?');
            if(confirm) {
                await axios.delete(`http://localhost:8000/api/sedes/${sedeId}`);
                router.push('/');
            }
        } catch (error) {
            console.error("Error deleting sede: ", error);
        }
    }
</script>
<template>

    <div class="grid-item">
        <h4 class="titulo">{{ sede.nombre }}</h4>
        <div class="subtitulo">
            <p>{{ sede.ciudad }} | {{ sede.direccion }}</p>
            <p>Nit: {{ sede.nit }}</p>
        </div>
        <p><strong>{{ sede.total_habitaciones }} Habitaciones</strong></p>
        <div class="wrapper actions">
            <RouterLink :to="`/sedes/${sede.id}`" class="btn btn-outliend btn-secondary rounded" title="Ver Acomodaciones">
                <span class="material-symbols-outlined">bed</span>
            </RouterLink>
            <div>
                <RouterLink :to="`/sedes/edit/${sede.id}`" class="btn btn-outliend btn-outliend-primary rounded" title="Editar">
                    <span class="material-symbols-outlined">stylus</span>
                </RouterLink>
                <button @click="deleteSede(sede.id)" class="btn btn-outliend btn-outliend-danger rounded ml-1" title="Eliminar">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    </div>

</template>