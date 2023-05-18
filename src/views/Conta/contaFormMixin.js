import conta from "@/views/Conta/Conta.vue";
import AutoCompleteFornecedor from "@/components/form/AutoCompleteFornecedor.vue";
import CampoMoeda from "@/components/form/CampoMoeda.vue";
import ComboTipo from "@/components/form/ComboTipo.vue";
import {Conta} from "@/model/Conta";
import {LancamentoContaCartao} from "@/model/LancamentoContaCartao";
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import Validation from "@/util/Validation";
import {Fornecedor} from "@/model/Fornecedor";


export default {
    emits: ["refreshListConta"],
    computed: {
        conta() {
            return conta
        }
    },
    props: ['tipos','formasPgto'],
    name: "ContaForm",
    components: {AutoCompleteFornecedor, CampoMoeda, ComboTipo},
    data() {
        return {
            contaInvalida: true,
            defaultService: null,
            util:null,
            visibleLcc:false,
            contaCadastro: new Conta(),
            lancamentoContaCartao: new LancamentoContaCartao(),
            parcela:null,
            maskaraCodBar:'99999999999999999999999999999999999999999999999',
            textoTest:''
        }
    },
    methods:{
        preCadLcc(){
            var arr = this.textoTest.split(";");
            arr.forEach(linha => {
                linha = linha.replaceAll("\n","")
                let lcc= new LancamentoContaCartao();
                lcc.fornecedor = new Fornecedor();

                if(linha.length<13){
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Erro: linha incompleta', life: 3000 });
                }else{
                    let dia= linha.substring(0,2);
                    let mes= linha.substring(2,4);
                    let ano= linha.substring(4,8)
                    let data= `${ano}-${mes}-${dia}`;
                    if(Validation.isValidDate(data)){
                        lcc.data = data;
                        let parcela= linha.substring(8,10);
                        let totalPa= linha.substring(10,12);
                        lcc.parcela = parseInt(parcela);
                        lcc.totalParcela = parseInt(totalPa);

                        let valor= linha.substring(12, linha.length);
                        lcc.valor = parseFloat(valor)/100;

                        this.contaCadastro.lancamentoContaCartao.push(lcc);
                    }
                }
            });
            this.textoTest = '';

        },
        addLancamentoContaCartao(){
            if(Validation.objectIsNull(this.lancamentoContaCartao.fornecedor))
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Fornecedor inválido', life: 3000 });
            else if(Validation.objectIsNull(this.lancamentoContaCartao.data) ||
                !Validation.isValidDate(this.util.formatData(this.lancamentoContaCartao.data)))
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Data inválida', life: 3000 });
            else if(Validation.objectIsNull(this.lancamentoContaCartao.valor))
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Valor inválido', life: 3000 });
            else{
                var arrParc =  this.lancamentoContaCartao.parcela.split("/");
                var auxLcc = Object.assign({}, this.lancamentoContaCartao)
                auxLcc.parcela = arrParc[0] ? arrParc[0] : 0;
                auxLcc.totalParcela  =arrParc[1] ? arrParc[1] : 0;
                auxLcc.data = this.util.formatData(this.lancamentoContaCartao.data);
                auxLcc.valor = this.lancamentoContaCartao.valor.replaceAll('.','').replaceAll(',', '.');
                this.contaCadastro.lancamentoContaCartao.push(auxLcc);

                console.log(JSON.stringify(this.contaCadastro.lancamentoContaCartao))

                this.lancamentoContaCartao = new LancamentoContaCartao();
                this.lancamentoContaCartao.fornecedor = new Fornecedor();
            }


        },
        cancelar(){
            this.contaCadastro = new Conta();
        },
        setEditConta(conta){
            var parcela = conta.parcela+"/"+conta.totalParcela;
            this.contaCadastro = conta;
            this.contaCadastro.parcela = parcela;
            this.contaCadastro.valor = this.util.formatCurrencyBRnoSymbol(conta.valor);
            this.contaCadastro.valorPago = this.util.formatCurrencyBRnoSymbol(conta.valorPago);
            this.contaCadastro.emissao = this.util.formatDataUsToBr(this.contaCadastro.emissao);
            this.contaCadastro.vencimento = this.util.formatDataUsToBr(this.contaCadastro.vencimento);
            this.contaCadastro.dataPagamento =  this.contaCadastro.dataPagamento ?
                this.util.formatDataUsToBr(this.contaCadastro.dataPagamento): null;
            // this.contaCadastro.valor =  this.contaCadastro.valor ?
            //     this.util.formatCurrencyBRnoSymbol(this.contaCadastro.valor): null;
        },
        async cadastraConta(){
            this.contaCadastro.vencimento = this.util.formatData(this.contaCadastro.vencimento);
            this.contaCadastro.emissao = this.util.formatData(this.contaCadastro.emissao);
            var arrParc =  this.contaCadastro.parcela.split("/");
            this.contaCadastro.parcela = arrParc[0] ? arrParc[0] : 0;
            this.contaCadastro.totalParcela  = arrParc[1] ? arrParc[1] : 0;
            this.contaCadastro.valor = this.contaCadastro.valor.replaceAll('.','').replaceAll(',', '.');

            if(this.contaCadastro.valorPago)
                this.contaCadastro.valorPago = this.contaCadastro.valorPago.replaceAll('.','').replaceAll(',', '.');
            if(this.contaCadastro.dataPagamento)
                this.contaCadastro.dataPagamento = this.util.formatData(this.contaCadastro.dataPagamento);

            await this.defaultService.post('conta',this.contaCadastro);
            this.$emit('refreshListConta');
            await this.cancelar();
        }
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
    watch:{
        contaCadastro:{
            handler(newValue) {
                this.contaInvalida = !(Validation.objectIsNull(newValue.codigoBarra)
                    || Validation.objectIsNull(newValue.numero)
                    || Validation.objectIsNull(newValue.emissao)
                    || !Validation.isValidDate(this.util.formatData((newValue.emissao)))
                    || Validation.objectIsNull(newValue.vencimento)
                    || !Validation.isValidDate(this.util.formatData((newValue.vencimento)))
                    || Validation.objectIsNull(newValue.parcela)
                    || Validation.objectIsNull(newValue.valor)
                    || Validation.objectIsNull(newValue.tipoConta));
                this.contaInvalida = ((!Validation.objectIsNull(newValue.formaPagamento) && Validation.objectIsNull(newValue.dataPagamento))
                    || (Validation.objectIsNull(newValue.formaPagamento) && !Validation.objectIsNull(newValue.dataPagamento))
                );
            },
            deep: true
        }
    }
}