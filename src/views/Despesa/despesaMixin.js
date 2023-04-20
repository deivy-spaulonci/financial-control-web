import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import {Despesa} from "@/model/Despesa";

export default {
    data() {
        return {
            visibleAjusteFornec:false,
            urlUpload:'',
            editingRows: [],
            idFilter: null,
            dataInicial:null,
            dataFinal:null,
            selectedTipoDespesa: null,
            selectedFornecedor: null,
            selectedFormaPgto: null,
            selectedDespesa: null,
            tipos: [],
            fornecedores: [],
            formasPgto: [],
            loading: false,
            lazyParams: {},
            totalLinas: 0,
            filters: null,
            rows: 20,
            data: [],
            valorTotal: 0,
            despesaCadastro:new Despesa(),
        }
    },
    defaultService: null,
    util:null,
    methods:{
        async getDataDespesa(){

            this.loading = true;
            let url = '';
            if(this.lazyParams.sortField)
                url += 'sort=' + (this.lazyParams.sortField)+','+(this.lazyParams.sortOrder==1 ? 'asc' : 'desc');
            else
                url += 'sort=data,desc';

            if(this.lazyParams.page) {
                url += '&page=' + this.lazyParams.page + '&size=' + this.lazyParams.rows;
                this.rows = this.lazyParams.rows;
            }else
                url += '&page=0&size=' + (this.lazyParams.rows ? this.lazyParams.rows : this.rows);

            if(this.idFilter)
                url += '&id=' + this.idFilter;
            if(this.selectedTipoDespesa)
                url += '&tipoDespesa=' + this.selectedTipoDespesa.value;
            if(this.selectedFornecedor)
                url += '&fornecedor.id=' + this.selectedFornecedor.id;
            if(this.selectedFormaPgto)
                url += '&formaPagamento=' + this.selectedFormaPgto.value;
            if(this.dataInicial)
                url += '&dataInicial=' + this.dataInicial.toISOString().substring(0, 10);
            if(this.dataFinal)
                url += '&dataFinal=' + this.dataFinal.toISOString().substring(0, 10);

            console.log('despesa/page?'+url);
            const res = await this.defaultService.get('despesa/page?'+url);
            this.data = await res.content;
            this.totalLinas =  await res.totalElements;
            this.valorTotal = await this.defaultService.get('despesa/valorTotal?'+url);

            this.loading = false;
        },
        async getTipos(){
            this.tipos = await this.defaultService.get('tipo-despesa');
            this.fornecedores = await this.defaultService.get('fornecedor');
            this.formasPgto = await this.defaultService.get('forma-pagamento')
        },
        onSort(event) {
            this.lazyParams = event;
            this.getDataDespesa();
        },
        onPage(event) {
            this.lazyParams = event;
            this.getDataDespesa();
        },
        keyUpIdFilter(event){
            this.idFilter = event.value;
            this.getDataDespesa();
        },
        clearDespesa(){
            // this.despesaCadastro.valor = '0,00';
            // this.despesaCadastro.obs = '';
        },
        async cadastroDespesa(){
            this.despesaCadastro.data = this.util.formatData(this.despesaCadastro.data);
            this.despesaCadastro.valor = this.despesaCadastro.valor.replaceAll('.','').replaceAll(',', '.');
            await this.defaultService.post('despesa',this.despesaCadastro);
            await this.getDataDespesa();
            await this.clearDespesa();
        },
        async onRowEditSave(event) {
            this.loading = true;
            let { newData, index } = event;
            console.log(index)
            // this.products2[index] = newData;
            if(newData.data.toString().indexOf('-') == -1){//foi alterado
                newData.data = this.util.formatData(newData.data);
            }
            if(newData.fornecedor.id!=43)
                newData.ajusteFornecedor=null;
            let result = await this.defaultService.post('despesa',newData);
            console.log(result);
            this.getDataDespesa();
        }
    },
    mounted() {
        this.loading = true;
        this.despesaCadastro = new Despesa();
        this.getDataDespesa();
        this.getTipos();
        this.urlUpload = this.defaultService.getUlrBase()+'despesa/importar';
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    }
}