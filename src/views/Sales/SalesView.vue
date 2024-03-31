<template>
  <Page>
    <Container>
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
    </Container>
  </Page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { formatDate } from "@/utils/date";

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
</script>

