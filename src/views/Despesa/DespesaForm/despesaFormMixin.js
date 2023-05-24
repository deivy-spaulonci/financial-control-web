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
        setEditDespesa(despesa){
            this.despesaCadastro = Object.assign({}, despesa);
            this.despesaCadastro.valor = this.util.formatCurrencyBRnoSymbol(this.despesaCadastro.valor);
            this.despesaCadastro.data = this.util.formatDataUsToBr(this.despesaCadastro.data);
        },
        cancelar(){
            this.despesaCadastro = new Despesa();
            this.despesaCadastro.fornecedor = null;
        },
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    }
}