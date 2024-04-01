<template>
  <Page>
    <Container>
      <div class="flex end mb-2 gap-5">
        <Search
          field="Cliente (Nome ou Cidade)"
          v-if="clients"
          v-model="searchFilter"
          @search="handleSearch"
        />

        <Modal>
          <template v-slot:Btn>Novo Cliente</template>

          <template v-slot:Title>Adicionar cliente</template>

          <template v-slot:Content>
            <div class="grid c--2 mb-2">
              <div class="field">
                <label for="">Nome <span class="tError">*</span></label>
                <input type="text" minlength="3" v-model="name" required />
              </div>

              <div class="field">
                <label for="">Cidade <span class="tError">*</span></label>
                <input type="text" minlength="3" v-model="city" required />
              </div>
            </div>

            <div class="flex end">
              <button class="saveData" @click="saveClient()">Salvar</button>
            </div>
          </template>
        </Modal>
      </div>

      <template v-if="clients">
        <Title>Clientes Cadastrados</Title>

        <div class="grid c-2">
          <template v-for="client in filterData" :key="client.idCliente">
            <Clients 
              :id="client.idCliente"
              :clientName="client.nmCliente"
              :clientCity="client.Cidade"
              @editClient="handleEdit"
              @deleteClient="handleDelete"
            />
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
import { onMounted, ref, computed } from "vue";
import api from "@/utils/api";
import { idGenerator } from "@/utils/idGenerator";
import Swal from "sweetalert2";
import { deleteItem } from "@/utils/delete";


const clients = ref([
  { idCliente: 1, nmCliente: "Cli1", Cidade: "Cidade1" },
  { idCliente: 2, nmCliente: "Cli2", Cidade: "Cidade2" },
  { idCliente: 3, nmCliente: "Cli3", Cidade: "Cidade3" },
  { idCliente: 4, nmCliente: "Cli4", Cidade: "Cidade4" },
]);

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
  const id = idGenerator();

  const clientData = {
    idCliente: id,
    nmCliente: name.value,
    Cidade: city.value,
  };

  if (name.value == "" || city.value == "") {
    return Swal.fire({
      icon: "error",
      title: "Erro",
      html: `Um ou mais campos necessários não foram preenchidos!`,
    });
  }

  clients.value.push(clientData);  // Remove when use the API

  try {
    let response = await api("/cliente", clientData);

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

// Edit
async function handleEdit(newData) {
  const clientIndex = clients.value.findIndex(
    client => client.idCliente === newData.currentId
  );

   const clientData = {
    idCliente: newData.currentId,
    nmCliente: newData.newName,
    Cidade: newData.newCity,
  };

  Object.assign(clients.value[clientIndex], clientData);

  try {
    let response = await api("/cliente", clientData);

    if (response.data) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `Cliente salvo corretamente!`,
      });
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

// Delete
const handleDelete = (data) => {
  // Deixar apenas a função deleteItem com a API
  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: `Você realmente quer deletar esse cliente?`,
    showCancelButton: true,
    confirmButtonText: "Deletar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      clients.value = clients.value.filter(client => client.idCliente !== data);
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `<span style="text-transform:capitalize">Cliente ${data}</span> deletado corretamente!`,
      });
    }else {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `<span style="text-transform:capitalize">Cliente ${data}</span> não foi deletado(a)!`,
      });
    }
  })

  //deleteItem('cliente',data)
}

// Search
const searchFilter = ref("");
const filterData = computed(() => {
  if (searchFilter != "") {
    return clients.value.filter(
      (client) =>
        client.nmCliente.toLowerCase().includes(searchFilter.value) ||
        client.Cidade.toLowerCase().includes(searchFilter.value)
    );
  }

  return clients.value;
});

const handleSearch = (search) => {
  searchFilter.value = search.toLowerCase();
};

onMounted(() => {
  getClients();
});
</script>

