<template>
    <Panel header="Fornecedor">
        <div id="frameFornecedor">
            <fornecedor-form @refreshListFornecedor="consultaFornecedor" ref="fornecedorForm"></fornecedor-form>
            <fornecedor-list @editSelectedFornecedor="editFornecedor" ref="fornecedorList"></fornecedor-list>
        </div>
    </Panel>
</template>

<script>
import FornecedorForm from "@/views/Fornecedor/FornecedorForm/FornecedorForm.vue";
import FornecedorList from "@/views/Fornecedor/FornecedorList/FornecedorList.vue";

export default {
    name: "Fornecedor",
    components: {FornecedorList, FornecedorForm},
    methods:{
        consultaFornecedor(){
            this.$refs.fornecedorList.getDataFornecedor();
        },
        editFornecedor(fornecedor){
            this.$refs.fornecedorForm.setEditfornecedor(fornecedor)
        }
    }
}
</script>

<style scoped>
  #frameFornecedor{
      display: grid;
      grid-template-columns: 350px auto;
      gap: 3px;
  }
</style>