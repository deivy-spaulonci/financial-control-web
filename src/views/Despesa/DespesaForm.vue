<template>
    <Card>
        <template #title >Cadastro </template>
        <template #content>
            <div id="formCadDespesa">
                <label>Tipo:</label>
                <ComboTipo @custom-change="(s) => despesaCadastro.tipoDespesa = s" :valores="tipos" place="Despesa"/>
                <label>Data:</label>
                <CampoData @custom-change="(s) => despesaCadastro.data = s" place="Data"/>
                <label>Forencedor:</label>
                <AutoCompleteFornecedor @custom-change="(s) => despesaCadastro.fornecedor = s"></AutoCompleteFornecedor>
                <label>Forma Pgto:</label>
                <ComboTipo @custom-change="(s) => despesaCadastro.formaPagamento = s" :valores="formasPgto" :largura="250" place="Forma Pgto"/>
                <label>Valor:</label>
                <CampoMoeda @custom-change="(s) => despesaCadastro.valor = s"/>
                <label>Observação:</label>
                <Textarea v-model="value" rows="3" />
            </div>
        </template>
        <template #footer>
            <div id="footer" class="footerForm">
                <Button icon="pi pi-check" label="Save" size="large" @click="cadastroDespesa"/>
                <Button icon="pi pi-times" label="Cancel" severity="secondary"  size="large"/>
            </div>
        </template>
    </Card>
</template>

<script>
import ComboTipo from "@/components/form/ComboTipo.vue";
import CampoData from "@/components/form/CampoData.vue";
import CampoMoeda from "@/components/form/CampoMoeda.vue";
import {Despesa} from "@/model/Despesa";
import DefaultService from "@/service/DefaultService";
import AutoCompleteFornecedor from "@/components/form/AutoCompleteFornecedor.vue";
import Util from "@/util/Util";

export default {
    props: ['tipos','formasPgto'],
    name: "DespesaForm",
    components: {AutoCompleteFornecedor, CampoMoeda, CampoData, ComboTipo},
    data() {
        return {
            despesaCadastro:new Despesa(),
            defaultService: null,
            util:null,
        }
    },
    methods:{
        clearDespesa(){
            this.despesaCadastro.valor = '0,00';
            this.despesaCadastro.obs = '';
        },
        async cadastroDespesa(){
            this.despesaCadastro.data = this.util.formatData(this.despesaCadastro.data);
            this.despesaCadastro.valor = this.despesaCadastro.valor.replaceAll('.','').replaceAll(',', '.');

            await this.defaultService.post('despesa',this.despesaCadastro);
            this.$emit('consultaDespesas');
            await this.clearDespesa();
        },
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    }
}
</script>

<style scoped>
    #formCadDespesa{
        display: grid;
        /*grid-template-columns: 73px auto;*/
        gap: 3px;
    }
    #formCadDespesa label{
        line-height: 25px;
        text-align: left;
    }
</style>