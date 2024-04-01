<template>
  <Page>
    <Container>
      <Title>Últimos Cadastrados</Title>

      <Subtitle> Cliente </Subtitle>

      <template
        v-for="(client, index) in clients.reverse()"
        :key="client.idCliente"
      >
        <Clients :id="client.idCliente" v-if="index === 0">
          <template v-slot:Name>
            {{ client.nmCliente }}
          </template>
          <template v-slot:City>
            {{ client.Cidade }}
          </template>
        </Clients>
      </template>

      <Subtitle>Produto</Subtitle>
      <template v-for="(product, index) in products.reverse()" :key="product.idProduto">
        <Products :id="product.idProduto" v-if="index === 0">
          <template v-slot:Name>
            {{ product.dscProduto }}
          </template>
          <template v-slot:UnitValue>
            {{ product.vlrUnitario }}
          </template>
        </Products>
      </template>

      <Subtitle>Venda</Subtitle>
      <template v-for="(sale, index) in sales.reverse()" :key="sale.idVenda">
        <Sales
          :id="sale.idVenda"
          :qtdVenda="sale.qtdVenda"
          :vlrUnitarioVenda="sale.vlrUnitarioVenda"
          v-if="index === 0"
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
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import api from "@/utils/api";
import Swal from "sweetalert2";
import { formatDate } from "@/utils/date";


// Clients
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
      html: `O seguinte erro ocorreu ao buscar os clientes: <br/> <b>${e}</b>`,
    });
  }
}

// Products
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

// Sales
const sales = ref([
  {
    idVenda: 1,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 1,
    idProduto: 1,
    qtdVenda: 5,
    vlrUnitarioVenda: 5,
  },
  {
    idVenda: 2,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 1,
    idProduto: 2,
    qtdVenda: 1,
    vlrUnitarioVenda: 10,
  },
  {
    idVenda: 3,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 1,
    idProduto: 3,
    qtdVenda: 1,
    vlrUnitarioVenda: 15,
  },
  {
    idVenda: 4,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 2,
    idProduto: 1,
    qtdVenda: 5,
    vlrUnitarioVenda: 5,
  },
  {
    idVenda: 5,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 2,
    idProduto: 2,
    qtdVenda: 1,
    vlrUnitarioVenda: 10,
  },
  {
    idVenda: 6,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 3,
    idProduto: 1,
    qtdVenda: 10,
    vlrUnitarioVenda: 6,
  },
  {
    idVenda: 7,
    dthVenda: "/Date(1711915093537)/",
    idCliente: 3,
    idProduto: 3,
    qtdVenda: 2,
    vlrUnitarioVenda: 15,
  },
]);

async function getSales() {
  try {
    let response = await api("/venda");
    sales.value = response;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      html: `O seguinte erro ocorreu ao buscar as vendas: <br/> <b>${e}</b>`,
    });
  }
}
</script>
