<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import CardBlock from '@/components/layout/CardBlock.vue'

    const router = useRouter();
    const form = reactive({
        nombre: '',
        ciudad: '',
        direccion: '',
        nit: '',
        habitaciones: 0
    })

    const handleSubmit = async () => {
        const createData = {
            nombre: form.nombre,
            ciudad: form.ciudad,
            direccion: form.direccion,
            nit: form.nit,
            total_habitaciones: form.habitaciones,
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/sedes`, createData);
            router.push(`/sedes`);
        } catch (error) {
            console.error("Error create sede", error);
            if (error.response.status == 442 ) { 
                const fieldValidate = Object.keys((error.response.data).data);
                window.alert(`Ups! Ya existe una sede con este ${fieldValidate[0]}.`);
            }
        }
    } 
</script>

<template>
    <CardBlock title="Crear de Sede" subtitle="Crear sedes.">
        <template v-slot:infotable>
            <div class="wrapper">
                <label>Recuerda completar los campos requeridos (*).</label>
            </div>
        </template>
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
    </CardBlock>

</template>