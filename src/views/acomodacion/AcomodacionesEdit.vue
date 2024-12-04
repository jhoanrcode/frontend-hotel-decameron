<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';
    import CardBlock from '@/components/layout/CardBlock.vue'

    const router = useRouter();
    const route = useRoute();
    
    const acomodacionId = route.params.id;
    const form = reactive({
        idsede: 0,
        tipo: '',
        habitaciones: 0,
        habitaciones_old: 0,
        habitaciones_asociadas: 0,
        habitaciones_total_sede: 0,
        hasAcomodacion: false,
    })

    onMounted( async () => {  //Consultamos informacion de acomodacion y cantidad de habitaciones de sede
        try {
            const response = await axios.get(`http://localhost:8000/api/habitaciones/${acomodacionId}/edit`);
            const dataAcomodacion = (response.data.data).dataAcomodacion;
            form.habitaciones_asociadas = (response.data.data).asociadas;
            form.habitaciones_total_sede = (response.data.data).total;
            form.idsede = dataAcomodacion.id_sedes;
            form.tipo = dataAcomodacion.tipo;
            form.habitaciones = dataAcomodacion.habitaciones;
            form.habitaciones_old = dataAcomodacion.habitaciones;
            form.hasAcomodacion = true;
        } catch (error) {
            console.error("Error fetching acomodacion de sede:", error);
        }
    })

    const handleSubmit = async () => {

        const nuevo_total_sede = ( form.habitaciones_asociadas + ( (form.habitaciones - form.habitaciones_old) ) );
        
        if ( form.habitaciones_total_sede >= nuevo_total_sede ) {
            const updateData = {
                tipo: form.tipo,
                habitaciones: form.habitaciones,
            }
            try {
                const response = await axios.put(`http://localhost:8000/api/habitaciones/${acomodacionId}`, updateData);
                router.push(`/sedes/${form.idsede}`);
            } catch (error) {
                console.error("Error updating acomodacion", error);
                if (error.response.status == 442 ) { 
                    window.alert(`Ups! Este tipo de acomodación ya existe para esta sede.`);
                }
            }
        } else {
            window.alert(`Ups! Esta sede no cuenta con suficientes habitaciones disponibles para actualizar la acomodación.` );
        }

    } 
</script>

<template>
    <CardBlock title="Actualización acomodación de sede" subtitle="Editar acomodacion.">
        <template v-slot:infotable>
            <div class="wrapper">
                <label>Recuerda completar los campos requeridos (*).</label>
            </div>
        </template>
        <div v-if="form.hasAcomodacion">
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
                    <RouterLink :to="`/sedes/${form.idsede}`" class="btn btn-secondary">Cancelar</RouterLink>
                    <button type="submit" class="btn btn-primary ml-2">Guardar</button>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="grid-no-data">
                No se encontro datos para actualizar esta acomodacion.
            </div>
            <RouterLink to="/sedes" class="btn btn-secondary">Volver a Sedes</RouterLink>
        </div>
        
    </CardBlock>

</template>