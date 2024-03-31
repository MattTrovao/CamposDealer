<template>
  <Page>
    <Container>
      <div class="flex end mb-1">
        <Modal>
          <template v-slot:Btn>Nova Venda</template>

          <template v-slot:Title>Adicionar Venda</template>

          <template v-slot:Content>
            <div class="field">
              <label for="">Cliente</label>
              <select @click="getClients" v-model="clientID">
                <option></option>
                <template v-for="client in clients" :key="client.idCliente">
                  <option :value="client.idCliente">
                    {{ client.idCliente + " - " + client.nmCliente }}
                  </option>
                </template>
              </select>
            </div>

            <div class="flex mb-2">
              <div class="field">
                <label for="">Produto</label>
                <select
                  @click="getProducts"
                  @change="saveProductPrice"
                  v-model="productID"
                >
                  <option></option>
                  <template
                    v-for="product in products"
                    :key="product.idProduto"
                  >
                    <option :value="product.idProduto" :data-price="product.vlrUnitario">
                      {{ product.idProduto + " - " + product.dscProduto }}
                    </option>
                  </template>
                </select>
              </div>

              <div class="field">
                <label for="">Quantidade</label>
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  step="1"
                  pattern="[0-9]"
                />
              </div>
            </div>

            <div class="flex end aCenter tRight mb-2" v-if="totalValue && quantity">
              <p>Valor Total:</p>
              <h3 class="tSuccess m-0">
                <small>R$</small>
                {{totalValue * quantity}}
              </h3>
            </div>

            <div class="flex end">
              <button class="save" @click="saveProduct()">Salvar</button>
            </div>
          </template>
        </Modal>
      </div>

      <template v-if="sales">
        <Title>Vendas Realizadas</Title>

        <div class="flex">
          <template v-for="sale in sales" :key="sale.idVenda">
            <Sales
              :id="sale.idVenda"
              :qtdVenda="sale.qtdVenda"
              :vlrUnitarioVenda="sale.vlrUnitarioVenda"
            >
              <template v-slot:SalesId>
                {{ sale.idVenda }}
              </template>
              <template v-slot:Date>
                {{ formatDate(sale.dthVenda) }}
              </template>
              <template v-slot:ClientId>
                {{ sale.idCliente }}
              </template>
            </Sales>
          </template>
        </div>
      </template>

      <template v-else>
        <Title>Nenhuma venda realizada</Title>
        <p>Para adicionar uma nova venda, clique no botão acima.</p>
      </template>
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { formatDate } from "@/utils/date";
import api from "@/utils/api";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const sales = ref("");

const clientID = ref("");
const productID = ref("");
const selectProduct = ref("");
const quantity = ref("");
const totalValue = ref("");

async function getSales() {
  try {
    let response = await api("/venda");
    sales.value = response;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      html: `O seguinte erro ocorreu ao buscar a listagem: <br/> <b>${e}</b>`,
    });
  }
}

// Get Client List
const clients = ref([
  { idCliente: 1, nmCliente: "Cli1", Cidade: "Cidade1" },
  { idCliente: 2, nmCliente: "Cli2", Cidade: "Cidade2" },
  { idCliente: 3, nmCliente: "Cli3", Cidade: "Cidade3" },
  { idCliente: 4, nmCliente: "Cli4", Cidade: "Cidade4" },
]);
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

// Get Products List
const products = ref([
  { idProduto: 1, dscProduto: "Produto 1", vlrUnitario: 5 },
  { idProduto: 2, dscProduto: "Produto 2", vlrUnitario: 10 },
  { idProduto: 3, dscProduto: "Produto 3", vlrUnitario: 15 },
  { idProduto: 4, dscProduto: "Produto 4", vlrUnitario: 20 },
]);
async function getProducts() {
  try {
    // let response = await api("/produto");
    products.value = response;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      html: `O seguinte erro ocorreu ao buscar os Produtos: <br/> <b>${e}</b>`,
    });
  }
}

// Calculate Total Value
function saveProductPrice(e) {
  console.log(e.target.selectedOptions[0].attributes[1].value);
  totalValue.value = e.target.selectedOptions[0].attributes[1].value;
}

onMounted(() => {
  // getSales();
});
</script>

<style lang="scss" scoped>
@import "@/sass/Variables.scss";

.total{
  width: 30%;
}
</style>