<template>
    <Panel header="Conas">
        <div id="frameContas">
            <conta-form :tipos="tipos" :formas-pgto="formasPgto"></conta-form>
            <conta-list :tipos="tipos" :formas-pgto="formasPgto"></conta-list>
        </div>
    </Panel>
</template>

<script>
import ContaForm from "@/views/Conta/ContaForm.vue";
import ContaList from "@/views/Conta/ContaList.vue";
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
        consultaContas(){
            this.$ref.depesaList.getDataConta();
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