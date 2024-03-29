<template>
  <button class="btn" @click="showModal = true">
    <slot name="Btn"> </slot>
  </button>

  <template v-if="showModal">
    <div class="modal">
      <div class="modal__header">
        <h2><slot name="Title"></slot></h2>
      </div>

      <div class="modal__content">
        <slot name="Content"></slot>
      </div>

      <button class="modal__close" @click="showModal = false">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
    </div>

    <div class="overlay"></div>
  </template>
</template>

<script setup>
import { onMounted, ref } from "vue";

const showModal = ref(false);
</script>

<style lang="scss" scoped>
@import "@/sass/Variables.scss";

.btn {
  color: $secondary;
  border-color: $secondary;
  margin-top: 25px;

  &:hover {
    border-color: $hover;
    background: $hover;
    color: $white;
  }
}

.modal {
  $border: 2px solid $tertiary;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80dvw;
  padding: 20px;
  border-radius: $radius;
  border: $border;
  background: $white;

  .modal__header {
    border-bottom: $border;
    padding-bottom: 10px;
    margin-bottom: 40px;
  }

  .modal__close {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    background: none;
    border: 2px solid $error;
    border-radius: $radius;
    transition: $transition;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
      background: $error;
      svg {
        fill: $white;
      }
    }

    svg {
      fill: $error;
      width: 1.1rem;
      height: 1.1rem;
      transition: inherit;
    }
  }
}

.overlay {
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba($primary, 0.6);
  width: 100vw;
  height: 100vh;
}
</style>