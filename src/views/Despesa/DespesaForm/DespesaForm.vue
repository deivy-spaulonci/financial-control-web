<template>
    <Card>
        <template #title >Cadastro </template>
        <template #content>
            <InlineMessage severity="warn" style="position:absolute; float:right; padding: 5px 20px;"
                           v-if="despesaCadastro.id">
              ID Despesa : {{despesaCadastro.id}}
            </InlineMessage>

            <div id="formCadDespesa">
                <label>Tipo:</label>
                <ComboTipo @custom-change="(s) => despesaCadastro.tipoDespesa = s" :valores="tipos" place="Despesa"
                           :set-selected="despesaCadastro.tipoDespesa"/>
                <label>Data:</label>
                <CampoData @custom-change="(s) => despesaCadastro.data = s" place="Data" :set-selected="despesaCadastro.data"/>
                <label>Forencedor:</label>
                <AutoCompleteFornecedor @custom-change="(s) => despesaCadastro.fornecedor = s"
                                        :set-selected="despesaCadastro.fornecedor"></AutoCompleteFornecedor>
                <label>Forma Pgto:</label>
                <ComboTipo @custom-change="(s) => despesaCadastro.formaPagamento = s" :valores="formasPgto"
                           :largura="250" place="Forma Pgto" :set-selected="despesaCadastro.formaPagamento"/>
                <label>Valor:</label>
                <CampoMoeda @custom-change="(s) => despesaCadastro.valor = s" :set-selected="despesaCadastro.valor"/>
                <label>Observação:</label>
                <Textarea v-model="value" rows="3" />
            </div>
        </template>
        <template #footer>
            <div id="footer" class="footerForm">
                <Button icon="pi pi-check" label="Save" size="large" @click="cadastroDespesa"/>
                <Button icon="pi pi-times" label="Cancel" severity="secondary"  size="large"  @click="cancelar"/>
            </div>
        </template>
    </Card>
</template>

<script>

import despesaFormMixin from "@/views/Despesa/DespesaForm/despesaFormMixin";

export default {
  name: "DespeaForm",
  mixins: [despesaFormMixin],
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