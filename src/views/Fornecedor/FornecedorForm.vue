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
<!--                <Dropdown v-model="fornecedorCadastro.cidade" scrollHeight="400px" :options="cidades" optionLabel="nome"-->
<!--                          placeholder="Cidade" style="width: 100%;" :filter="true" :show-clear="true"/>-->

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
import {Fornecedor} from "@/model/Fornecedor";
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import AutoCompleteCidade from "@/components/form/AutoCompleteCidade.vue";
import {Cidade} from "@/model/Cidade";

export default {
    name: "FornecedorForm",
    components: {AutoCompleteCidade},
    data() {
        return {
            fornecedorCadastro:new Fornecedor(),
            defaultService: null,
            util:null,
        }
    },
    methods:{
        setEditfornecedor(fornecedor){
            this.fornecedorCadastro = fornecedor;
        },
        async cadastroFornecedor(){
            this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/[^0-9]+/g, '');

            await this.defaultService.post('fornecedor',this.fornecedorCadastro);
            this.$emit('refreshListFornecedor');
            this.fornecedorCadastro = new Fornecedor();
            this.fornecedorCadastro.cidade = new Cidade();
        },
        async getCnpj(){
            this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/\D/g, '');

            let result = await this.defaultService.get('fornecedor/consultacnpj?cnpj='+this.fornecedorCadastro.cnpj);
            if(result.status=="ERROR"){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:result.message, life: 3000});
            }else{
                this.fornecedorCadastro.nome = this.util.capt(result.fantasia ? result.fantasia : result.nome);
                this.fornecedorCadastro.razaoSocial = this.util.capt(result.nome ? result.nome : result.fantasia);
                this.fornecedorCadastro.cidade = new Cidade();
                this.fornecedorCadastro.cidade.nome = result.municipio.toLowerCase();
                // this.cidades = this.cidadesDb.filter((e) =>
                //     e.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()==result.municipio.toLocaleLowerCase()
                // );

            }
        }
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
    mounted() {
    },
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