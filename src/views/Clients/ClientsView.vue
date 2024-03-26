<template>
  <Page>
    <Container>
      <Title>Clientes Cadastrados</Title>
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/axios/index";

const clients = ref(null);
async function getClients() {
  let response = await api("/cliente");

  if (response) {
    clients.value = response;
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
    });
  }
}

onMounted(() => {
  getClients();
});
</script>
