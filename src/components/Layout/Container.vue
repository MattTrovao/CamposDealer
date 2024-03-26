<template>
    <section class="container">
      <section class="row">
        <slot />
      </section>
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.container{
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;

  .row{
    width: 90%;
    margin: 0 auto;

  }
}
</style>