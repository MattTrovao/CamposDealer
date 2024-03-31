<template>
  <Page>
    <Container>
      <div class="flex end mb-1">
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
      </div>

      <template v-if="clients">
        <Title>Clientes Cadastrados</Title>

        <div class="flex between">
          <template v-for="client in clients" :key="client.idCliente">
            <Clients :id="client.idCliente">
              <template v-slot:Name>
                {{ client.nmCliente }}
              </template>
               <template v-slot:City>
                {{ client.Cidade }}
              </template>
            </Clients>
          </template>
        </div>
      </template>

      <template v-else>
        <Title>Nenhum cliente cadastrado</Title>
        <p>Para adicionar um novo cliente, clique no botão acima.</p>
      </template>
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/utils/api";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const clients = ref([{"idCliente":1,"nmCliente":"Cli1","Cidade":"Cidade1"},{"idCliente":2,"nmCliente":"Cli2","Cidade":"Cidade2"},{"idCliente":3,"nmCliente":"Cli3","Cidade":"Cidade3"},{"idCliente":4,"nmCliente":"Cli4","Cidade":"Cidade4"}]);
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

