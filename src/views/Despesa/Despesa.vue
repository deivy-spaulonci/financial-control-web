<template>
    <Panel header="Despesas">
        <div id="frameDespesa">
            <despesa-form></despesa-form>
            <despesa-list></despesa-list>
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
    mixins: [despesaMixin]
}
</script>

<style scoped>
    #frameDespesa{
        display: grid;
        grid-template-columns: 400px auto;
        gap: 3px;
    }
</style>