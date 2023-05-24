<template>
    <Card>
        <template #title >Cadastro </template>
        <template #content>
            <div id="formCadFornecedor">
                <label>CNPJ:</label>
                <div class="p-inputgroup" style="width: 100%">
                    <InputMask v-model="fornecedorCadastro.cnpj" mask="99.999.999/9999-99" placeholder="CNPJ"/>
                    <Button type="button" icon="pi pi-search-plus" class="p-button-primary p-button-sm"
                            style="width:10%;" @click="getCnpj"></Button>
                </div>
                <label>Nome:</label>
                <InputText type="text" v-model="fornecedorCadastro.nome" :style="{'text-transform':'capitalize'}"
                           placeholder="Nome" style="width: 100%; text-transform: capitalize"/>
                <label>Razão Social:</label>
                <InputText type="text" v-model="fornecedorCadastro.razaoSocial" placeholder="Razão Social" style="width: 100%;"/>
                <label>Cidade:</label>
                <auto-complete-cidade @custom-change="(s) => fornecedorCadastro.cidade = s"
                                      :set-selected="fornecedorCadastro.cidade">
                </auto-complete-cidade>
            </div>

        </template>
        <template #footer>
            <div id="footer" class="footerForm">
                <Button icon="pi pi-check" label="Save" size="large"  @click="cadastroFornecedor"/>
                <Button icon="pi pi-times" label="Cancel" severity="secondary"  size="large"/>
            </div>
        </template>
    </Card>
</template>

<script>

import fornecedorFormMixin from "@/views/Fornecedor/FornecedorForm/fornecedorFormMixin";

export default {
  name: "FornecedorForm",
  mixins: [fornecedorFormMixin]
}
</script>

<style scoped>
    #formCadFornecedor{
        text-align: left;
        display: grid;
        gap: 3px;
    }
    #formCadFornecedor label{
        line-height: 25px;
        text-align: left;
    }
</style>