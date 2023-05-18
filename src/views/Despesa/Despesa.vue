<template>
    <Panel header="Despesas">
        <div id="frameDespesa">
            <despesa-form :tipos="tipos" :formas-pgto="formasPgto" @consultaDespesas="consultaDespesas"></despesa-form>
            <despesa-list :tipos="tipos" :formas-pgto="formasPgto" ref="depesaList"></despesa-list>
        </div>
    </Panel>
</template>

<script>
import DespesaList from "@/views/Despesa/DespesaList.vue";
import despesaMixin from "@/views/Despesa/despesaMixin";
import DespesaForm from "@/views/Despesa/DespesaForm.vue";

export default {
    name: "Despesa",
    components: {DespesaForm, DespesaList},
    mixins: [despesaMixin],
    methods:{
        consultaDespesas(){
            this.$refs.depesaList.getDataDespesa();
        }
    }
}
</script>

<style scoped>
    #frameDespesa{
        display: grid;
        grid-template-columns: 350px auto;
        gap: 3px;
    }
</style>