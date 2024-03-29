<template>
  <Page>
    <Container>
      <Title>Vendas Realizadas</Title>

      <div class="flex">
        <template v-for="sale in sales" :key="sale.idVenda">
          <div class="sale">
            <div class="flex between tCenter">
              <p>
                <b>{{ sale.idVenda }}</b>
                <br />
                <small>ID da Venda</small>
              </p>
              <p>
                <b>{{ formatDate(sale.dthVenda) }}</b>
                <br />
                <small>Data da Venda</small>
              </p>
              <p>
                <b>{{ sale.idCliente }}</b>
                <br />
                <small>ID do Cliente</small>
              </p>
            </div>
            <hr />
            <div class="flex aCenter tCenter">
              <p>
                {{ sale.qtdVenda }}
                <br />
                <small>Quantidade</small>
              </p>
              <p>*</p>
              <p>
                {{ sale.vlrUnitarioVenda }}
                <br />
                <small>Valor</small>
              </p>
              <p>=</p>
              <p>
                {{ sale.qtdVenda * sale.vlrUnitarioVenda }}
                <br />
                <small>Total</small>
              </p>
            </div>
          </div>
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
    dthVenda: "/Date(1711739788177)/",
    idCliente: 1,
    idProduto: 1,
    qtdVenda: 5,
    vlrUnitarioVenda: 5,
  },
  {
    idVenda: 2,
    dthVenda: "/Date(1711739788177)/",
    idCliente: 1,
    idProduto: 2,
    qtdVenda: 1,
    vlrUnitarioVenda: 10,
  },
  {
    idVenda: 3,
    dthVenda: "/Date(1711739788177)/",
    idCliente: 1,
    idProduto: 3,
    qtdVenda: 1,
    vlrUnitarioVenda: 15,
  },
  {
    idVenda: 4,
    dthVenda: "/Date(1711739788177)/",
    idCliente: 2,
    idProduto: 1,
    qtdVenda: 5,
    vlrUnitarioVenda: 5,
  },
  {
    idVenda: 5,
    dthVenda: "/Date(1711739788177)/",
    idCliente: 2,
    idProduto: 2,
    qtdVenda: 1,
    vlrUnitarioVenda: 10,
  },
  {
    idVenda: 6,
    dthVenda: "/Date(1711739788177)/",
    idCliente: 3,
    idProduto: 1,
    qtdVenda: 10,
    vlrUnitarioVenda: 6,
  },
  {
    idVenda: 7,
    dthVenda: "/Date(1711739788177)/",
    idCliente: 3,
    idProduto: 3,
    qtdVenda: 2,
    vlrUnitarioVenda: 15,
  },
]);
</script>

<style lang="scss" scoped>
@import '@/sass/Variables.scss';

.sale {
  border: 2px solid $primary;
  padding: 20px;
  border-radius: $radius;
  hr {
    margin: 20px 0;
    border: 0;
    height: 2px;
    background: $primary;
  }
}
</style>