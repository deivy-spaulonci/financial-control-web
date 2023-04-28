<template>
    <Card>
        <template #title >Cadastro </template>
        <template #content>
            <InlineMessage severity="warn" style="position:absolute; float:right; padding: 5px 20px;" v-if="contaCadastro.id">
                ID Conta : {{contaCadastro.id}}
            </InlineMessage>

            <div id="formCadConta">
                <label>Codigo de barras:</label>
                <InputMask v-model="contaCadastro.codigoBarra"  :mask="maskaraCodBar" placeholder="Codigo de barras" class="w-full"/>
                <label>Número:</label>
                <InputText type="text" id="numero" v-model="contaCadastro.numero"  placeholder="Número" class="w-full"/>
                <label>Tipo Conta:</label>
                <div class="p-inputgroup">
                    <ComboTipo @custom-change="(s) => contaCadastro.tipoConta = s" :valores="tipos" place="Tipo Conta" :set-selected="contaCadastro.tipoConta"/>
                    <Button type="button" :disabled="!contaCadastro.tipoConta.contaCartao" icon="pi pi-align-justify" class="p-button-warning p-button-sm" @click="visibleLcc = true"></Button>
                </div>
                <div class="line4x4">
                    <label>Emissão:</label>
                    <label>Vencimento:</label>
                    <InputMask v-model="contaCadastro.emissao" mask="99/99/9999" placeholder="Data Pgto" class="w-full"/>
                    <InputMask v-model="contaCadastro.vencimento" mask="99/99/9999" placeholder="Data Pgto" class="w-full"/>
                    <label>Parcelas:</label>
                    <label>Valor:</label>
                    <InputMask v-model="contaCadastro.parcela" mask="99/99" placeholder="Parcelas" class="w-full textCenter" />
                    <CampoMoeda @custom-change="(s) => contaCadastro.valor = s"  :set-selected="contaCadastro.valor"/>
                </div>

                <label>Forma Pagamento:</label>
                <ComboTipo @custom-change="(s) => contaCadastro.formaPagamento = s" :valores="formasPgto" place="Forma Pgto" valor-null="true" :set-selected="contaCadastro.formaPagamento"/>
                <div class="line4x4">
                    <label>Data Pgto:</label>
                    <label>Valor Pgto:</label>
                    <InputMask v-model="contaCadastro.dataPagamento" mask="99/99/9999" placeholder="Data Pgto" class="w-full"/>
                    <CampoMoeda @custom-change="(s) => contaCadastro.valorPago = s" :set-selected="contaCadastro.valorPago"/>
                </div>
                <label>Observação:</label>
                <textarea rows="3"  v-model="contaCadastro.obs" />

            </div>
        </template>
        <template #footer>
<!-- <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>-->
            <div id="footer" class="footerForm">
                <Button type="button" icon="pi pi-check" label="Save" size="large" @click="cadastraConta" :disabled="contaInvalida"/>
                <Button type="button" icon="pi pi-times" label="Cancel" severity="secondary"  size="large" @click="cancelar" />
            </div>

        </template>
    </Card>

    <Toast />

    <Dialog v-model:visible="visibleLcc" modal header="Lançamento Conta Cartao" :style="{ width: '50vw'}">
      <div id="lccForma">
          <AutoCompleteFornecedor @custom-change="(s) => lancamentoContaCartao.fornecedor = s"
                                  :set-selected="lancamentoContaCartao.fornecedor">
          </AutoCompleteFornecedor>
          <InputMask v-model="lancamentoContaCartao.data" mask="99/99/9999" placeholder="data" class="textCenter" />
          <InputMask v-model="lancamentoContaCartao.parcela" mask="99/99" placeholder="Parcelas" class="textCenter" />
          <CampoMoeda @custom-change="(s) => lancamentoContaCartao.valor = s" class="textCenter" :set-selected="lancamentoContaCartao.valor"/>
          <Button type="button" icon="pi pi-plus" class="p-button-primary" @click="addLancamentoContaCartao"></Button>
      </div>
        <TabelaLancamentoContaCartao :valores="this.contaCadastro.lancamentoContaCartao">
        </TabelaLancamentoContaCartao>
    </Dialog>
</template>

<script>
    import contaFormMixin from "@/views/Conta/contaFormMixin";
    import TabelaLancamentoContaCartao from "@/views/Conta/TabelaLancamentoContaCartao.vue";

    export default {
        name: "ContaList",
        components: {TabelaLancamentoContaCartao},
        mixins: [contaFormMixin]
    }
</script>

<style scoped>
    @import url('Conta.css');
</style>