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
            <Products :id="product.idProduto">
              <template v-slot:Name>
                {{ product.dscProduto }}
              </template>
              <template v-slot:UnitValue>
                {{ product.vlrUnitario }}
              </template>
            </Products>
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
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const products = ref([{"idProduto":1,"dscProduto":"Produto 1","vlrUnitario":5},{"idProduto":2,"dscProduto":"Produto 2","vlrUnitario":10},{"idProduto":3,"dscProduto":"Produto 3","vlrUnitario":15},{"idProduto":4,"dscProduto":"Produto 4","vlrUnitario":20}]);
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