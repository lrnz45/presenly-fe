<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <Toaster position="top-center" richColors closeButton />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster, toast } from 'vue-sonner'
</script>
