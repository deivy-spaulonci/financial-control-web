<template>
    <Card>
        <template #title >Cadastro </template>
        <template #content>
            <form id="formCadConta" @submit="onSubmit">
                <label>Codigo de barras:</label>
                <InputMask v-model="contaCadastro.codigoBarra"  mask="99999999999999999999999999999999999999999999999" placeholder="Codigo de barras" class="w-full"/>
                <label>Numero:</label>
                <InputText type="text" id="numero" v-model="contaCadastro.numero"  placeholder="Numero" class="w-full" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error"/>
                <label>Tipo Conta:</label>
                <div class="p-inputgroup">
                    <ComboTipo @custom-change="(s) => contaCadastro.tipoConta = s" :valores="tipos" place="Tipo Conta"/>
                    <Button type="button" :disabled="!contaCadastro.tipoConta.contaCartao" icon="pi pi-align-justify" class="p-button-warning p-button-sm" @click="visibleLcc = true"></Button>
                </div>
                <div class="line4x4">
                    <label>Emissão:</label>
                    <label>Vencimento:</label>
                    <CampoData @custom-change="(s) => contaCadastro.emissao = s" place="Emissao"/>
                    <CampoData @custom-change="(s) => contaCadastro.vencimento = s" place="Vencimento"/>
                    <label>Parcelas:</label>
                    <label>Valor:</label>
                    <InputMask v-model="contaCadastro.parcela" mask="99/99" placeholder="Parcelas" class="w-full textCenter" />
                    <CampoMoeda @custom-change="(s) => contaCadastro.valor = s"/>
                </div>

                <label>Forma Pagamento:</label>
                <ComboTipo @custom-change="(s) => contaCadastro.formaPagamento = s" :valores="formasPgto" place="Tipo Conta"/>
                <div class="line4x4">
                    <label>Data Pgto:</label>
                    <label>Valor Pgto:</label>
                    <InputMask v-model="contaCadastro.dataPagamento" mask="99/99/9999" placeholder="Data Pgto" class="w-full"/>
                    <CampoMoeda @custom-change="(s) => contaCadastro.valorPago = s"/>
                </div>
                <label>Observação:</label>
                <textarea rows="3"  v-model="contaCadastro.obs"/>

            </form>
        </template>
        <template #footer>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
            <div id="footer" class="footerForm">
                <Button type="submit" icon="pi pi-check" label="Save" size="large" />
                <Button icon="pi pi-times" label="Cancel" severity="secondary"  size="large"/>
            </div>

            {{contaCadastro}}
        </template>
    </Card>

    <Dialog v-model:visible="visibleLcc" modal header="Lançamento Conta Cartao" :style="{ width: '50vw' }">
      <div id="lccForma">
          <AutoCompleteFornecedor @custom-change="(s) => lancamentoContaCartao.fornecedor = s"></AutoCompleteFornecedor>
          <InputMask v-model="lancamentoContaCartao.data" mask="99/99/9999" placeholder="data" class="textCenter" />
          <InputMask v-model="lancamentoContaCartao.parcela" mask="99/99" placeholder="Parcelas" class="textCenter" />
          <CampoMoeda @custom-change="(s) => lancamentoContaCartao.valor = s" class="textCenter"/>
          <Button type="button" icon="pi pi-plus" class="p-button-primary" @click="addLancamentoContaCartao"></Button>
      </div>
    </Dialog>
</template>

<script>
import ComboTipo from "@/components/form/ComboTipo.vue";
import CampoMoeda from "@/components/form/CampoMoeda.vue";
import CampoData from "@/components/form/CampoData.vue";
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import {Conta} from "@/model/Conta";
import {LancamentoContaCartao} from "@/model/LancamentoContaCartao";
import AutoCompleteFornecedor from "@/components/form/AutoCompleteFornecedor.vue";

export default {
    props: ['tipos','formasPgto'],
    name: "ContaForm",
    components: {AutoCompleteFornecedor, CampoMoeda, CampoData, ComboTipo},
       data() {
        return {
            defaultService: null,
            util:null,
            visibleLcc:false,
            menuModel: [
                {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => alert('teste')},
                {label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => alert('teste')}
            ],
            contaCadastro: new Conta(),
            lancamentoContaCartao: new LancamentoContaCartao(),
            parcela:null,
        }
    },
    methods:{
        cadastraConta(){
            // this.contaCadastro.vencimento = this.util.formatData(this.contaCadastro.vencimento);
            // this.contaCadastro.emissao = this.util.formatData(this.contaCadastro.emissao);
            // this.contaCadastro.parcela = this.contaCadastro.parcela.split("/")[0];
            // this.contaCadastro.totalParcela = this.contaCadastro.parcela.split("/")[1];
            // this.contaCadastro.valor = this.contaCadastro.valor.replaceAll('.','').replaceAll(',', '.');

            // alert(JSON.stringify(this.contaCadastro))
            // // await this.defaultService.post('despesa',this.despesaCadastro);
            //this.$emit('consultaDespesas');
            // await this.clearDespesa();
        }
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    }
}
</script>

<style scoped>
  #formCadConta{
      display: grid;
      /*grid-template-columns: 73px auto;*/
      gap: 3px;
  }
  #formCadConta label{
      line-height: 25px;
      text-align: left;
  }
  #formCadConta .line4x4{
      display: grid;
      grid-template-columns: auto auto;
      gap: 3px;
  }
  #lccForma{
      display: grid;
      grid-template-columns: auto 100px 100px 100px 100px;
      gap: 3px;
  }
</style>