<template>
    <Panel header="Fornecedor">
        <div id="frameFornecedor">
            <fornecedor-form></fornecedor-form>
        </div>
    </Panel>
</template>

<script>
import FornecedorForm from "@/views/Fornecedor/FornecedorForm.vue";

export default {
    name: "Fornecedor",
    components: {FornecedorForm},
}
</script>

<style scoped>
  #frameFornecedor{
      display: grid;
      grid-template-columns: 350px auto;
      gap: 3px;
  }
</style>