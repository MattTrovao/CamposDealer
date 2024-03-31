<template>
  <div class="sale">
    <div class="flex between tCenter">
      <p>
        <b>
          <slot name="SalesId"></slot>
        </b>
        <br />
        <small>ID da Venda</small>
      </p>
      <p>
        <b>
          <slot name="Date"></slot>
        </b>
        <br />
        <small>Data da Venda</small>
      </p>
      <p>
        <b>
          <slot name="ClientId"></slot>
        </b>
        <br />
        <small>ID do Cliente</small>
      </p>
    </div>
    <hr />
    <div class="flex aCenter tCenter">
      <p>
        {{ quantity }}
        <br />
        <small>Quantidade</small>
      </p>
      <p>*</p>
      <p>
        {{ unitValue }}
        <br />
        <small>Valor</small>
      </p>
      <p>=</p>
      <p>
        <b class="total">{{ totalValue }}</b>
        <br />
        <small>Total</small>
      </p>

    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { deleteItem } from "@/utils/delete";

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  qtdVenda: {
    type: Number,
    required: false,
  },
  vlrUnitarioVenda: {
    type: Number,
    required: false,
  },
});

const quantity = ref(props.qtdVenda)
const unitValue = ref(props.vlrUnitarioVenda)


const totalValue = ref(quantity.value * unitValue.value)
</script>

<style lang="scss" scoped>
@import "@/sass/Variables.scss";

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

  .total{
    color: $success;
  }
}
</style>