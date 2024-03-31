import Swal from "sweetalert2";

export async function deleteItem(url, field) {
  const fieldName = field;

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: `Você realmente quer deletar esse ${url}?`,
    showCancelButton: true,
    confirmButtonText: "Deletar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let response = await api(`/${url}`, {
          fieldName: value
        });

        if (response.data) {
          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            html: `<span style="text-transform:capitalize">${url}</span> deletado corretamente!`,
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
    } else {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        html: `<span style="text-transform:capitalize">${url} ${field}</span> não foi deletado!`,
      });
    }
  })
}