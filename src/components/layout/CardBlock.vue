<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        title: String,
        subtitle: String
    });

</script>

<template>
    <main class="content">
        <div class="container">
            <header>
                <h1>{{ title }}</h1>
            </header>
            <div v-if="$slots.infotable">
                <slot name="infotable"></slot>
            </div>

            <slot></slot>
            <footer v-if="$slots.link">
                <slot name="link"></slot>
            </footer>
        </div>
    </main>
</template>