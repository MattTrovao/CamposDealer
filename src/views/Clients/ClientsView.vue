<template>
  <Page>
    <Container>
      <template v-if="clients">
        <Title>Clientes Cadastrados</Title>

        <div class="flex between">
          <template v-for="client in clients" :key="client.id">
            <div class="card flex aCenter">
              <img
                src="@/assets/user.png"
                :alt="`Foto do Cliente ${name}`"
                class="icon"
              />

              <div class="data">
                <h2 class="name">
                  {{ client.nmCliente }}
                </h2>

                <p class="city">
                  {{ client.Cidade }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <Title>Nenhum cliente cadastrado</Title>
        <p>Para adicionar um novo cliente, clique no botão abaixo.</p>

        <Modal>
          <template v-slot:Btn>Novo Cliente</template>

          <template v-slot:Title>Adicionar cliente</template>

          <template v-slot:Content>
            <div class="grid c--2 mb-2">
              <div class="field">
                <label for="">Nome</label>
                <input type="text" minlength="3" v-model="name" />
              </div>

              <div class="field">
                <label for="">Cidade</label>
                <input type="text" minlength="3" v-model="city" />
              </div>
            </div>

            <div class="flex end">
              <button class="save" @click="saveClient()">Salvar</button>
            </div>
          </template>
        </Modal>
      </template>
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/axios/index";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const clients = ref(null);

const name = ref("");
const city = ref("");

async function getClients() {
  try {
    let response = await api("/cliente");
    clients.value = response;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      html: `O seguinte erro ocorreu ao buscar a listagem: <br/> <b>${e}</b>`,
    });
  }
}

async function saveClient() {
  const id = uuidv4();
  try {
    let response = await api("/cliente", {
      idCliente: id,
      nmCliente: name.value,
      Cidade: city.value,
    });

    if (response.data) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `Cliente salvo corretamente!`,
      });

      name.value = "";
      city.value = "";
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        html: `O seguinte erro ocorreu: <br/> <b>${response.data}</b>`,
      });
    }
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      html: `O seguinte erro ocorreu: <br/> <b>${e}</b>`,
    });
  }
}

onMounted(() => {
  getClients();
});
</script>

<style lang="scss" scoped>
@import "@/sass/Variables.scss";

.card {
  border: 2px solid $tertiary;
  border-radius: $radius;
  padding: 20px;

  .icon {
    max-width: 40px;
    max-height: 40px;
  }
}
</style>