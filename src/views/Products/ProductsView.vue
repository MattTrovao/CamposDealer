<template>
  <Page>
    <Container>
      <div class="flex end mb-2 gap-5">
        <Search
          field="Produto (Nome ou Valor)"
          v-if="products"
          v-model="searchFilter"
          @search="handleSearch"
        />

        <Modal>
          <template v-slot:Btn>Novo Produto</template>

          <template v-slot:Title>Adicionar Produto</template>

          <template v-slot:Content>
            <div class="grid c--2 mb-2">
              <div class="field">
                <label for="">Nome <span class="tError">*</span></label>
                <input type="text" minlength="3" v-model="name" required />
              </div>

              <div class="field">
                <label for=""
                  >Valor Unitário <span class="tError">*</span></label
                >
                <input
                  type="number"
                  v-model="unitValue"
                  min="1"
                  step="1"
                  pattern="[0-9]"
                  required
                />
              </div>
            </div>

            <div class="flex end">
              <button class="saveData" @click="saveProduct()">Salvar</button>
            </div>
          </template>
        </Modal>
      </div>

      <template v-if="products">
        <Title>Produtos Cadastrados</Title>

        <div class="grid c-2">
          <template v-for="product in filterData" :key="product.idProduto">
            <Products
              :id="product.idProduto"
              :desc="product.dscProduto"
              :unit="product.vlrUnitario"
              @editProduct="handleEdit"
              @deleteProduct="handleDelete"
            >
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
import { onMounted, ref, computed } from "vue";
import api from "@/utils/api";
import Swal from "sweetalert2";
import { idGenerator } from "@/utils/idGenerator";
import { deleteItem } from "@/utils/delete";


const products = ref([
  { idProduto: 1, dscProduto: "Produto 1", vlrUnitario: 5 },
  { idProduto: 2, dscProduto: "Produto 2", vlrUnitario: 10 },
  { idProduto: 3, dscProduto: "Produto 3", vlrUnitario: 15 },
  { idProduto: 4, dscProduto: "Produto 4", vlrUnitario: 20 },
]);
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

async function saveProduct() {
  const id = idGenerator();

  const productData = {
    idProduto: id,
    dscProduto: name.value,
    vlrUnitario: unitValue.value,
  };

  if (name.value == "" || unitValue.value == "") {
    return Swal.fire({
      icon: "error",
      title: "Erro",
      html: `Um ou mais campos necessários não foram preenchidos!`,
    });
  }

  products.value.push(productData); // Remove when use the API

  try {
    let response = await api("/produto", productData);

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

// Edit
async function handleEdit(newData) {
  const productIndex = products.value.findIndex(
    product => product.idProduto === newData.currentId
  );

   const productData = {
    idProduto: newData.currentId,
    dscProduto: newData.newDesc,
    vlrUnitario: newData.newValue,
  };

  Object.assign(products.value[productIndex], productData);

  try {
    let response = await api("/produto", productData);

    if (response.data) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `Produto salvo corretamente!`,
      });
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

// Delete
const handleDelete = (data) => {
  // Deixar apenas a função deleteItem com a API
  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: `Você realmente quer deletar esse produto?`,
    showCancelButton: true,
    confirmButtonText: "Deletar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      products.value = products.value.filter(product => product.idProduto !== data);
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `<span style="text-transform:capitalize">produto ${data}</span> deletado corretamente!`,
      });
    }else {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `<span style="text-transform:capitalize">produto ${data}</span> não foi deletado(a)!`,
      });
    }
  })

  //deleteItem('produto',data)
}

// Search
const searchFilter = ref("");
const filterData = computed(() => {
  if (searchFilter != "") {
    return products.value.filter(
      (product) =>
        product.dscProduto.toLowerCase().includes(searchFilter.value) ||
        product.vlrUnitario.toString().includes(searchFilter.value)
    );
  }

  return products.value;
});

const handleSearch = (search) => {
  searchFilter.value = search.toLowerCase();
};

onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1280px) {
  .flex.gap-5{
    flex-direction: column;
    gap: 2rem;
  }
  .grid.c-2 {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>