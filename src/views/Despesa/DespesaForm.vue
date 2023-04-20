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
                <ComboTipo @custom-change="(s) => despesaCadastro.fornecedor = s" :valores="fornecedores" :largura="250" place="Fornecedor"/>
                <label>Forma Pgto:</label>
                <ComboTipo @custom-change="(s) => despesaCadastro.formaPagamento = s" :valores="formasPgto" :largura="250" place="Forma Pgto"/>
                <label>Valor:</label>
                <CampoMoeda @custom-change="(s) => despesaCadastro.valor = s"/>
            </div>
        </template>
    </Card>
</template>

<script>
import ComboTipo from "@/components/form/ComboTipo.vue";
import CampoData from "@/components/form/CampoData.vue";
import CampoMoeda from "@/components/form/CampoMoeda.vue";

export default {
    name: "DespesaForm",
    components: {CampoMoeda, CampoData, ComboTipo}
}
</script>

<style scoped>
    #formCadDespesa{
        display: grid;
        grid-template-columns: 73px auto;
        gap: 3px;
    }
    #formCadDespesa label{
        line-height: 25px;
        text-align: left;
    }
</style>