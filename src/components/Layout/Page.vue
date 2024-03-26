<template>
  <Header />
  <main class="page">
    <slot/>
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.page {
  padding: 20px 0;
  flex: 1;
}
</style>