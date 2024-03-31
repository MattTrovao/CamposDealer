<template>
  <div class="sale">
    <button class="edit">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
        />
      </svg>
    </button>

    <button
      class="delete"
      @click="deleteItem('venda', id,)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
        />
      </svg>
    </button>

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