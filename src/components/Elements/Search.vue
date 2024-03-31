<template>
  <input
    type="text"
    name=""
    :placeholder="`Busque por ${field}`"
    class="searchbar"
    @input="filterItem"
  />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
});

const emit = defineEmits( ['search'] )

const filterItem = (e) => {
  emit('search', e.target.value)
}
</script>

<style lang="scss" scoped>
@import "@/sass/Variables.scss";

.searchbar {
  padding: 10px;
  height: 20px;
  border: 1px solid $hover;
  border-radius: $radius;
}
</style>