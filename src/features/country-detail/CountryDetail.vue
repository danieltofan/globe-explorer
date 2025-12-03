<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Country: {{ route.params.code }}</h1>
    <div class="alert alert-info">
      <span>Detailed country view coming soon.</span>
    </div>
  </div>
</template>
