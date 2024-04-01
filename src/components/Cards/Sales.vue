<template>
  <div class="sale">
    <template v-if="actions">
      <template v-if="edit">
        <button class="edit" @click="edit = !edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
            />
          </svg>
        </button>

        <button class="delete" @click="deleteSale()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      </template>

      <template v-else>
        <button class="save" @click="saveSaleData()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
        </button>

        <button class="delete" @click="edit = !edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
      </template>
    </template>

    <template v-if="edit">
      <div class="flex between tCenter">
        <p>
          <b>
            {{ id }}
          </b>
          <br />
          <small>ID da Venda</small>
        </p>
        <p>
          <b>
            {{ dateSale }}
          </b>
          <br />
          <small>Data da Venda</small>
        </p>
        <p>
          <b>
            {{ idClient }}
          </b>
          <br />
          <small>ID do Cliente</small>
        </p>
        <p>
          <b>
            {{ idProduto }}
          </b>
          <br />
          <small>ID do Produto</small>
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
        <p class="tSuccess">
          <b>{{ totalValue }}</b>
          <br />
          <small>Total</small>
        </p>
      </div>
    </template>

    <template v-else>
      <div class="grid c-2 px-5">
        <div class="field">
          <label for="">Cliente <span class="tError">*</span> </label>
          <select v-model="idClient" required>
            <template v-for="client in clients" :key="client.idCliente">
              <option :value="client.idCliente">
                {{ client.idCliente + " - " + client.nmCliente }}
              </option>
            </template>
          </select>
        </div>

        <div class="field">
          <label for="">Data da Venda</label>
          <VueDatePicker
            v-model="dateSale"
            text-input
            locale="pt"
            hide-input-icon
          />
        </div>

        <div class="field">
          <label for="">Produto <span class="tError">*</span></label>
          <select @change="saveProductPrice" v-model="idProduto" required>
            <template v-for="product in products" :key="product.idProduto">
              <option
                :value="product.idProduto"
                :data-price="product.vlrUnitario"
              >
                {{ product.idProduto + " - " + product.dscProduto }}
              </option>
            </template>
          </select>
        </div>

        <div class="field">
          <label for="">Quantidade <span class="tError">*</span></label>
          <input
            type="number"
            v-model="quantity"
            min="1"
            step="1"
            pattern="[0-9]"
            required
          />
        </div>
      </div>

      <div class="flex end aCenter tRight mb-2" v-if="totalValue && quantity">
        <p>Valor Total:</p>
        <h3 class="tSuccess m-0">
          <small>R$</small>
          {{ totalValue * quantity }}
        </h3>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { formatDate, sendDateTime, currentDateMillisencods } from "@/utils/date";


const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  qtdVenda: {
    type: Number,
    required: true,
  },
  vlrUnitarioVenda: {
    type: Number,
    required: true,
  },
  idClient: {
    type: Number,
    required: true,
  },
  idProduto: {
    type: Number,
    required: true,
  },
  dateSale: {
    type: Date,
    required: true,
  },
  actions: {
    type: Boolean,
    default: true,
  },
  clients: {
    type: Array,
    required: false,
  },
  products: {
    type: Array,
    required: false,
  },
});

const edit = ref(true);

const id = ref(props.id);
const idClient = ref(props.idClient);
const idProduto = ref(props.idProduto);
const dateSale = ref(props.dateSale);
const quantity = ref(props.qtdVenda);
const unitValue = ref(props.vlrUnitarioVenda);

const clients = ref(props.clients);
const products = ref(props.products);
const clientOption = ref("");
const productOption = ref("");

function saveProductPrice(e) {
  totalValue.value = e.target.selectedOptions[0].attributes[1].value;
}

const totalValue = ref(quantity.value * unitValue.value);

function getSelectsValue() {
  const clientIndex = clients.value.findIndex(
    (client) => client.idCliente === idClient.value
  );
  clientOption.value = clients.value[clientIndex];

  const productIndex = products.value.findIndex(
    (product) => product.idProduto === idClient.value
  );

  productOption.value = products.value[productIndex];
}

const emit = defineEmits(["editSale", "deleteSale"]);

const deleteSale = () => {
  emit("deleteSale", id.value);
};
const saveSaleData = () => {
  const data = dateSale.value ? sendDateTime(dateSale.value) : currentDateMillisencods()  

  let salesObj = {
    idVenda: id.value,
    dthVenda: data,
    idCliente: idClient.value,
    idProduto: idProduto.value,
    qtdVenda: quantity.value,
    vlrUnitarioVenda: unitValue.value,
  }

  emit("editSale",salesObj)

  edit.value = !edit
}

onMounted(() => {
  getSelectsValue();
});
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

  .total {
    color: $success;
  }
}
</style>