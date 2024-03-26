<template>
  <header class="flex between aCenter header">
    <div class="header__logo">
      <img src="@/assets/logo.svg" alt="Campos Dealer Logotipo">
    </div>

    <nav class="header__navigation flex end gap-2">
      <a href="">Home</a>
      <a href="">Clientes</a>
      <a href="">Produtos</a>
      <a href="">Vendas</a>
    </nav>
  </header>
</template>

<script>
</script>

<style scoped lang="scss">
@import '@/sass/Variables.scss';

.header{
  $padding: 10px;
  position: sticky;
  top: 0;
  width: calc(100% - ($padding * 2));
  padding: $padding;
  background: $white;
  border-bottom: 1px solid rgba($primary, .4);

  .header__logo{
    img{
      width: 150px;
    }
  }

  .header__navigation{
    flex: unset;
    a{
      color: $secondary;
      font-size: 1.2rem;
      padding: 5px $padding * 2;
      border: 1px solid transparent;
      border-radius: $radius;

      &:hover{
        opacity: .6;
        border-color: $secondary;
      }
    }
  }
}
</style>