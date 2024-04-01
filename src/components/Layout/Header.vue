<template>
  <header class="flex between aCenter header">
    <div class="header__logo">
      <img src="@/assets/logo.svg" alt="Campos Dealer Logotipo" />
    </div>

    <button
      :class="`header__mobile ${showMenu ? 'menuOpen' : ''}`"
      @click="showMenu = !showMenu"
    >
      <span></span><span></span><span></span>
    </button>

    <nav
      :class="`header__navigation flex end gap-2 ${showMenu ? 'menuOpen' : ''}`"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/clients">Clientes</router-link>
      <router-link to="/products">Produtos</router-link>
      <router-link to="/sales">Vendas</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const showMenu = ref(false);
</script>

<style scoped lang="scss">
@import "@/sass/Variables.scss";

.header {
  $padding: 10px;
  position: sticky;
  top: 0;
  width: calc(100% - ($padding * 2));
  padding: $padding;
  background: $white;
  border-bottom: 1px solid rgba($primary, 0.4);
  z-index: 9;

  .header__logo {
    img {
      width: 150px;
    }
  }

  .header__navigation {
    flex: unset;
    a {
      color: $secondary;
      font-size: 1.2rem;
      padding: 5px $padding * 2;
      border: 1px solid transparent;
      border-radius: $radius;

      &.router-link-active {
        color: $tertiary;
        border-color: $tertiary;
      }

      &:hover {
        opacity: 0.6;
        border-color: $secondary;
      }
    }

    @media screen and (max-width: 1280px) {
      opacity: 0;
      position: absolute;
      right: -2vw;
      width: 1vw;
      height: calc(100vh - 76px);
      flex-direction: column;
      top: 76px;
      display: flex;
      justify-content: normal;
      align-content: center;
      gap: 2rem;
      background: $hover;
      padding-top: 40px;
      transition: $transition;
      a {
        display: block;
        max-height: 40px;
        flex: unset;
        color: $white;
      }

      &.menuOpen {
        opacity: 1;
        right: 0;
        width: 100vw;
      }
    }
  }

  .header__mobile {
    border: none;
    border-radius: 0;
    height: 30px;
    position: relative;
    padding: 0;
    max-width: 40px;
    span {
      width: 100%;
      height: 2px;
      display: block;
      background: $primary;
      position: absolute;
      transform: translateY(-50%);
      transition: $transition;


      &:first-child {
        top: 10%;
      }

      &:nth-child(2) {
        top: 50%;
      }

      &:last-of-type {
        top: 90%;
      }
    }

    &.menuOpen{
      span{
        top: 50%;
        transform: translateY(-50%);
      }
    }

    @media screen and (min-width: 1280px) {
      display: none;
    }
  }
}
</style>