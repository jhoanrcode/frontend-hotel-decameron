<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';
    import CardBlock from '@/components/layout/CardBlock.vue'

    const route = useRoute();
    const router = useRouter();

    const sedeId = route.params.id;
    const form = reactive({
        nombre: '',
        ciudad: '',
        direccion: '',
        nit: '',
        habitaciones: 0,
        acomodaciones: 0,
        hasSede: false
    })

    onMounted( async () => {  //Consultamos informacion de sede
        try {
            const response = await axios.get(`http://localhost:8000/api/sedes/${sedeId}`);
            const dataSede = (response.data.data).dataSede;
            const dataAcomodacionesSede = (response.data.data).asociadas;
            form.nombre = dataSede.nombre;
            form.ciudad = dataSede.ciudad;
            form.direccion = dataSede.direccion;
            form.nit = dataSede.nit;
            form.habitaciones = dataSede.total_habitaciones;
            form.acomodaciones = dataAcomodacionesSede;
            form.hasSede = true;
        } catch (error) {
            console.error("Error fetching sede:", error);
        }
    })

    const handleSubmit = async () => {

        if (form.habitaciones > form.acomodaciones) {
            const updateData = {
                nombre: form.nombre,
                ciudad: form.ciudad,
                direccion: form.direccion,
                nit: form.nit,
                total_habitaciones: form.habitaciones,
            }
            try {
                const response = await axios.put(`http://localhost:8000/api/sedes/${sedeId}`, updateData);
                router.push(`/sedes`);
            } catch (error) {
                console.error("Error updating sede", error);
                if (error.response.status == 442 ) { 
                    const fieldValidate = Object.keys((error.response.data).data);
                    window.alert(`Ups! Ya existe una sede con este ${fieldValidate[0]}.`);
                }
            }
        } else {
            window.alert('Ups! El numero de habitaciones de esta sede no puede ser menor a la configuración de acomodaciones ya establecido. Intenta configurar la cantidad de habitaciones por acomodación para esta sede.');
        }
        
    } 
</script>

<template>
    <CardBlock title="Actualización de Sede" subtitle="Editar sedes.">
        <template v-slot:infotable>
            <div class="wrapper">
                <label>Recuerda completar los campos requeridos (*).</label>
            </div>
        </template>
        <div v-if="form.hasSede">
            <form class="forms" @submit.prevent="handleSubmit">
                <div class="form-control">
                    <label for="nombre">Nombre de sede: *</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre de sede" autocomplete="off" maxlength="200" v-model="form.nombre" required>
                </div>
                <div class="form-control">
                    <label for="ciudad">Ciudad: *</label>
                    <select name="ciudad" id="ciudad" placeholder="Selecciona una ciudad" v-model="form.ciudad" required>
                        <option value="Bogota">Bogota</option>
                        <option value="Medellin">Medellin</option>
                        <option value="Cartagena">Cartagena</option>
                        <option value="Santa Marta">Santa Marta</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="direccion">Dirección: *</label>
                    <input type="text" id="direccion" name="direccion" placeholder="Dirección de sede" autocomplete="off" maxlength="200" v-model="form.direccion" required>
                </div>
                <div class="form-control">
                    <label for="nit">Nit: *</label>
                    <input type="text" id="nit" name="nit" placeholder="Nit de sede" autocomplete="off" v-model="form.nit" maxlength="49" required>
                </div>
                <div class="form-control">
                    <label for="habitaciones"># de habitaciones: *</label>
                    <input type="number" id="habitaciones" name="habitaciones" placeholder="Cantidad de habitaciones" autocomplete="off" min="1" max="9999" v-model="form.habitaciones" required>
                </div>
                
                <div class="actions">
                    <RouterLink to="/sedes" class="btn btn-secondary">Cancelar</RouterLink>
                    <button type="submit" class="btn btn-primary ml-2">Guardar</button>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="grid-no-data">
                No se encontro datos para actualizar esta sede.
            </div>
            <RouterLink to="/sedes" class="btn btn-secondary">Volver a Sedes</RouterLink>
        </div>
    </CardBlock>

</template>