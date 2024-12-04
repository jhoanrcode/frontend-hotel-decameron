<script setup>
    import axios from 'axios';
    import { defineProps } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';

    const router = useRouter();
    const props = defineProps({
        acomodacion: Object
    });

    const deleteAcomodacionSede = async (acomodacionsedeId) => {
        try {
            const confirm = window.confirm('¿Estas seguro de querer eliminar esta acomodación?');
            if(confirm) {
                await axios.delete(`http://localhost:8000/api/habitaciones/${acomodacionsedeId}`);
                router.push('/sedes');
            }
        } catch (error) {
            console.error("Error deleting acomodación: ", error);
        }
    }
</script>
<template>
    <li class="lista-item">
        <div class="info">
            <p>
                <strong>Tipo:</strong> {{ acomodacion.tipo }}<br>
                <strong>Habitaciones:</strong> {{ acomodacion.habitaciones }}
            </p>
        </div>
        <div class="actions">
            <RouterLink :to="`/acomodacion/edit/${acomodacion.id}`" class="btn btn-outliend btn-outliend-primary rounded" title="Editar">
                <span class="material-symbols-outlined">stylus</span>
            </RouterLink>
            <button @click="deleteAcomodacionSede(acomodacion.id)" class="btn btn-outliend btn-outliend-danger rounded ml-1" title="Eliminar">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    </li>
</template>