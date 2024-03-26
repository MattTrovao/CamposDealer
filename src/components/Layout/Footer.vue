<template>
  <footer class="footer">
    <p>
      Desenvolvido por 
      <a href="https://github.com/MattTrovao" target="_blank" rel="noopener noreferrer">Matheus Trovão Consentino</a> 
      para uso de teste na 
      <a href="https://camposdealer.com.br/" target="_blank" rel="noopener noreferrer">Campos Dealer</a>
    </p>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/sass/Variables.scss';

.footer{
  text-align: center;
  border-top: 1px solid rgba($primary, .4);
  padding: 10px;

  p{
    font-size: .8rem;
    color: $primary;
    a{
      color: $secondary;
      &:hover{
        opacity: .6;
      }
    }
  }
}
</style>