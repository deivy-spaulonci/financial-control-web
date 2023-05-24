import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import AutoCompleteFornecedor from "@/components/form/AutoCompleteFornecedor.vue";
import ComboTipo from "@/components/form/ComboTipo.vue";

export default {
    props: ['tipos','formasPgto'],
    components: {AutoCompleteFornecedor, ComboTipo},
    data() {
        return {
            filtro:{
                idFilter: null,
                dataInicial:null,
                dataFinal:null,
                selectedTipoDespesa: null,
                selectedFornecedor: null,
                selectedFormaPgto: null,
            },
            tabela:{
                data: [],
                totalLinas: 0,
                valorTotal: 0,
                selectedDespesa: null,
                rows: 20,
                loading: false,
            },
            lazyParams: {},
            defaultService: null,
            util:null,
            menuModel: [
                {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.editarDespesa()},
                {label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => this.excluirDespesa()}
            ],
        }
    },
    methods:{
        async getDataDespesa(){
            this.tabela.loading = true;
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

            if(this.filtro.idFilter)
                url += '&id=' + this.filtro.idFilter;
            if(this.filtro.selectedTipoDespesa)
                url += '&tipoDespesa=' + this.filtro.selectedTipoDespesa.value;
            if(this.filtro.selectedFornecedor)
                url += '&fornecedor.id=' + this.filtro.selectedFornecedor.id;
            if(this.filtro.selectedFormaPgto)
                url += '&formaPagamento=' + this.filtro.selectedFormaPgto.value;
            if(this.filtro.dataInicial)
                url += '&dataInicial=' + this.filtro.dataInicial.toISOString().substring(0, 10);
            if(this.filtro.dataFinal)
                url += '&dataFinal=' + this.filtro.dataFinal.toISOString().substring(0, 10);

            console.log('despesa/page?'+url);
            const res = await this.defaultService.get('despesa/page?'+url);
            this.tabela.data = await res.content;
            this.tabela.totalLinas =  await res.totalElements;
            this.tabela.valorTotal = await this.defaultService.get('despesa/valorTotal?'+url);

            this.tabela.loading = false;
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
            this.filtro.idFilter = event.value;
            this.getDataDespesa();
        },
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        excluirDespesa(){
            this.$confirm.require({
                message: 'Confirma a exclusão da despesa?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    await this.defaultService.delete('despesa/'+this.tabela.selectedDespesa.id);
                    await this.getDataDespesa();
                }
            });
        },
        editarDespesa(){
            this.$emit('editSelectedDespesa', this.tabela.selectedDespesa);
        },
    },
    watch: {
        'filtro.selectedTipoDespesa'(){
            this.getDataDespesa();
        },
        'filtro.selectedFornecedor'(){
            this.getDataDespesa();
        },
        'filtro.selectedFormaPgto'(){
            this.getDataDespesa();
        }
    },
    mounted() {
        this.tabela.loading = true;
        this.getDataDespesa();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
}