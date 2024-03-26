<template>
  <div class="title">
    <h1>
      <span>
        <slot />
      </span>
    </h1>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '@/sass/Variables.scss';

.title{
  position: relative;
  margin-bottom: 30px;

  &::before{
    content: "";
    width: 100%;
    height: 2px;
    background: $primary;
    position: absolute;
    top: 60%;
    transform: translateY(-50%);
    z-index: 1;
  }

  h1{
    position: relative;
    z-index: 2;
    margin: 0%;
    span{
      background: $white;
      padding-right: 30px;
    }
  }
}
</style>