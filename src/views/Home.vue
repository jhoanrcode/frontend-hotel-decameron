<script setup>
import { RouterLink } from 'vue-router';
import CardBlock from '@/components/layout/CardBlock.vue'
</script>
<template>
    <CardBlock title="Bienvenido a Hoteles Decameron.">
        <p>Este administrador de sedes para el Hotel Decameron se encuentra desarrollado en VueJS v3 consumiendo servicios API REST desde Laravel v11 y almacenado información en base de datos PostgresSQL.</p>
        <p>Este pequeño administrador te permitira realizar un CRUD para la gestion de sedes del Hotel Decameron.
            <br><b>Recuerda:</b> Las acomodaciones por habitación no pueden exceder el total de habitaciones de la sede.
        </p>
        <p><small><i>Desarrollado por Jhoan Avila / joria94@hotmail.com / <a href="https://github.com/jhoanrcode" target="_blank">@jhoanrcode</a></i></small></p>
        <template v-slot:link>
            <RouterLink to="/sedes" class="btn btn-primary">Ver Sedes</RouterLink>
        </template>
    </CardBlock>
</template>
