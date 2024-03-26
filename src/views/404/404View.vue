<template>
  <Page>
    <Container>
      <section class="notFound">
        <h1>404</h1>
        <p>
          Por favor verifique a URL digitada e tente novamente.
        </p>
      </section>
    </Container>
  </Page>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '@/sass/Variables.scss';

.notFound {
  text-align: center;
  padding: 40px 0;
  h1{
    color: $error;
    font-size: 10rem;
  }
  p{
    font-size: 1.2rem;
  }
}

</style>