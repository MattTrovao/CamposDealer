<template>
  <div class="product">
    <template v-if="actions">
      <template v-if="edit">
        <button class="edit" @click="edit = !edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
            />
          </svg>
        </button>

        <button class="delete" @click="deleteProduct()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      </template>

      <template v-else>
        <button class="save" @click="saveProductData()">
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

    <img src="@/assets/picture.png" :alt="`Foto do produto`" />

    <div class="data" v-if="edit">
      <h2>
        {{ desc }}
      </h2>
      <p>
        <small>R$ </small>
        {{ unit }}
      </p>
    </div>

    <div class="data--edit grid c-2" v-else>
      <div class="field m-0">
        <label for="">Novo Nome</label>
        <input type="text" v-model="desc" />
      </div>
      <div class="field m-0">
        <label for="">Novo Valor Unitário</label>
        <input type="number" v-model="unit" min="1" step="1" pattern="[0-9]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  actions: {
    type: Boolean,
    default: true,
  },
  desc: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
});

const edit = ref(true);

const id = ref(props.id);
const desc = ref(props.desc);
const unit = ref(props.unit);


const emit = defineEmits(["editProduct", "deleteProduct"]);
const deleteProduct = () => {
  emit("deleteProduct", id.value);
};

const saveProductData = () => {
  let currentId = id.value
  let newDesc = desc.value
  let newValue = unit.value

  emit("editProduct", {currentId,newDesc,newValue})

  edit.value = true
};
</script>

<style lang="scss" scoped>
@import "@/sass/Variables.scss";

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 2px solid $primary;
  border-radius: $radius;
  padding: 20px;
  text-align: center;

  img {
    width: 180px;
    height: 180px;
  }

  .data {
    h2 {
      margin-bottom: 20px;
    }
    p {
      color: $success;
      font-weight: 700;
    }
  }
}
</style>