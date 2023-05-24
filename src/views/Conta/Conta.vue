<template>
    <Panel header="Contas">
        <div id="frameContas">
            <conta-form :tipos="tipos" :formas-pgto="formasPgto" @refreshListConta="consultaContas" ref="contaForm"></conta-form>
            <conta-list :tipos="tipos" :formas-pgto="formasPgto" @editSelectedConta="editConta" ref="contaList"></conta-list>
        </div>
    </Panel>
</template>

<script>
import ContaForm from "@/views/Conta/ContaForm/ContaForm.vue";
import ContaList from "@/views/Conta/ContaList/ContaList.vue";
import DefaultService from "@/service/DefaultService";

export default {

    name: "Conta",
    components: {ContaList, ContaForm},
    data() {
        return {
            tipos:[],
            formasPgto:[],
            defaultService: null,
        }
    },
    methods:{
        editConta(conta){
            this.$refs.contaForm.setEditConta(conta)
        },
        consultaContas(){
            this.$refs.contaList.getDataConta();
        },
        async getTipos(){
            this.tipos = await this.defaultService.get('tipo-conta');
            this.formasPgto = await this.defaultService.get('forma-pagamento')
        },
    },
    mounted() {
        this.getTipos();
    },
    created() {
        this.defaultService = new DefaultService();
    }
}
</script>

<style scoped>
#frameContas{
    display: grid;
    grid-template-columns: 350px auto;
    gap: 3px;
}
</style>