<template>
    <Panel header="Fornecedor">
        <div id="frameFornecedor">
            <fornecedor-form></fornecedor-form>
            <fornecedor-list></fornecedor-list>
        </div>
    </Panel>
</template>

<script>
import FornecedorForm from "@/views/Fornecedor/FornecedorForm.vue";
import FornecedorList from "@/views/Fornecedor/FornecedorList.vue";

export default {
    name: "Fornecedor",
    components: {FornecedorList, FornecedorForm},
}
</script>

<style scoped>
  #frameFornecedor{
      display: grid;
      grid-template-columns: 350px auto;
      gap: 3px;
  }
</style>