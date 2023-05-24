import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";

export default {
    name: "FornecedorList",
    data() {
        return {
            loading: false,
            selectedFornecedor: null,
            idFilter: null,
            nomeFilter: null,
            cnpjFilter: null,
            expandedRows: [],
            totalLinas: 0,
            lazyParams: {},
            rows: 20,
            data: [],
            defaultService: null,
            util:null,
            menuModel: [
                {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.editarFornecedor()},
            ],
        }
    },
    methods:{
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        editarFornecedor(){
            this.$emit('editSelectedFornecedor', this.selectedFornecedor);
        },
        onSort(event) {
            this.lazyParams = event;
            this.getDataFornecedor();
        },
        onPage(event) {
            this.lazyParams = event;
            this.getDataFornecedor();
        },
        keyUpIdFilter(event){
            this.idFilter = event.value;
            this.getDataFornecedor();
        },
        async getDataFornecedor(){
            // if(this.selectedTipoDespesa)
            //     url += '&tipoDespesa=' + this.selectedTipoDespesa.value;

            this.loading = true;
            let url = '';

            if(this.lazyParams.sortField)
                url += 'sort=' + (this.lazyParams.sortField)+','+(this.lazyParams.sortOrder==1 ? 'asc' : 'desc');
            else
                url += 'sort=nome,asc';

            if(this.lazyParams.page) {
                url += '&page=' + this.lazyParams.page + '&size=' + this.lazyParams.rows;
                this.rows = this.lazyParams.rows;
            }else
                url += '&page=0&size=' + (this.lazyParams.rows ? this.lazyParams.rows : this.rows);

            if(this.idFilter)
                url += '&id=' + this.idFilter;
            if(this.nomeFilter)
                url += '&nome=' + this.nomeFilter;
            if(this.cnpjFilter)
                url += '&cnpj=' + this.cnpjFilter;

            const res = await this.defaultService.get('fornecedor/page?'+url);
            this.data = await res.content;
            this.totalLinas =  await res.totalElements;

            this.loading = false;
        }
    },
    mounted() {
        this.loading = true;
        this.getDataFornecedor();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
}