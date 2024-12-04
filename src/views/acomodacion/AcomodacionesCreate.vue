<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';
    import CardBlock from '@/components/layout/CardBlock.vue'

    const router = useRouter();
    const route = useRoute();
    
    const sedeId = route.params.id;
    const form = reactive({
        tipo: '',
        habitaciones: 0,
        habitaciones_disponibles_sede: 0,
    })

    onMounted( async () => {  //Consultamos habitaciones disponibles de sede
        try {
            const response = await axios.get(`http://localhost:8000/api/sedes/${sedeId}`);
            form.habitaciones_disponibles_sede = (response.data.data).total - (response.data.data).asociadas;
        } catch (error) {
            console.error("Error fetching sede:", error);
        }
    })

    const handleSubmit = async () => {
        
        if ( form.habitaciones_disponibles_sede >= form.habitaciones ) {
            const createData = {
                id_sedes: sedeId,
                tipo: form.tipo,
                habitaciones: form.habitaciones,
            }
            try {
                const response = await axios.post(`http://localhost:8000/api/habitaciones`, createData);
                router.push(`/sedes/${sedeId}`);
            } catch (error) {
                console.error("Error create acomodacion", error);
                if (error.response.status == 442 ) { 
                    window.alert(`Ups! Este tipo de acomodación ya existe para esta sede.`);
                }
            }
        } else {
            window.alert(`Ups! Esta sede no cuenta con suficientes habitaciones disponibles para crear esta acomodación. (Habitaciones disponibles: ${form.habitaciones_disponibles_sede})` );
        }

    } 
</script>

<template>
    <CardBlock title="Agregar acomodación a sede" subtitle="Crear acomodacion.">
        <template v-slot:infotable>
            <div class="wrapper">
                <label>Recuerda completar los campos requeridos (*).</label>
            </div>
        </template>
        <form class="forms" @submit.prevent="handleSubmit">
            <div class="form-control">
                <label for="tipo">Tipo de Acomodación: *</label>
                <select name="tipo" id="tipo" placeholder="Selecciona un tipo de acomodación" v-model="form.tipo" required>
                    <option value="Estándar Sencilla">Estándar Sencilla</option>
                    <option value="Estándar Doble">Estándar Doble</option>
                    <option value="Junior Triple">Junior Triple</option>
                    <option value="Junior Cuádruple">Junior Cuádruple</option>
                    <option value="Suite Sencilla">Suite Sencilla</option>
                    <option value="Suite Doble">Suite Doble</option>
                    <option value="Suite Triple">Suite Triple</option>
                </select>
            </div>
            <div class="form-control">
                <label for="habitaciones"># de habitaciones: *</label>
                <input type="number" id="habitaciones" name="habitaciones" placeholder="Cantidad de habitaciones" autocomplete="off" min="1" max="9999" v-model="form.habitaciones" required>
            </div>
            
            <div class="actions">
                <RouterLink :to="`/sedes/${sedeId}`" class="btn btn-secondary">Cancelar</RouterLink>
                <button type="submit" class="btn btn-primary ml-2">Guardar</button>
            </div>
        </form>
    </CardBlock>

</template>