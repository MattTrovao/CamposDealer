<template>
  <Page>
    <Container>
      <div class="flex end mb-1">
        <Modal>
          <template v-slot:Btn>Novo Produto</template>

          <template v-slot:Title>Adicionar Produto</template>

          <template v-slot:Content>
            <div class="grid c--2 mb-2">
              <div class="field">
                <label for="">Nome</label>
                <input type="text" minlength="3" v-model="name" />
              </div>

              <div class="field">
                <label for="">Valor</label>
                <input type="number" v-model="unitValue" min="1" step="1" pattern="[0-9]" />
              </div>
            </div>

            <div class="flex end">
              <button class="save" @click="saveProduct()">Salvar</button>
            </div>
          </template>
        </Modal>
      </div>

      <template v-if="products">
        <Title>Produtos Cadastrados</Title>

        <div class="flex between">
          <template v-for="product in products" :key="product.idProduto">
            <div class="product">
              <button class="delete" @click="deleteItem('produto',idProduto,product.idProduto)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </button>
              <img src="@/assets/picture.png" :alt="`Foto do produto ${product.dscProduto}`" />

              <div class="data">
                <h2>{{product.dscProduto}}</h2>
                <p>
                  <small>R$</small>
                  {{product.vlrUnitario}}
                </p>
              </div>
            </div>
          </template>
        </div>
      </template>

      <template v-else>
        <Title>Nenhum produto cadastrado</Title>
        <p>Para adicionar um novo produto, clique no botão acima.</p>
      </template>
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/utils/api";
import { deleteItem } from "@/utils/delete"
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const products = ref("");
const name = ref("");
const unitValue = ref("");

async function getProducts() {
  try {
    let response = await api("/produto");
    products.value = response;
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
    let response = await api("/produto", {
      idProduto: id,
      dscProduto: name.value,
      vlrUnitario: unitValue.value,
    });

    if (response.data) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `Produto salvo corretamente!`,
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
  getProducts();
});
</script>