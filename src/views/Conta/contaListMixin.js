import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import ComboTipo from "@/components/form/ComboTipo.vue";
import MessageStatus from "@/views/Conta/MessageStatus.vue";

export default {
    props: ['tipos','formasPgto'],
    emits: ["editSelectedCont"],
    components: {ComboTipo, MessageStatus},
    data() {
        return {
            loading: false,
            idFilter: null,
            selectedTipoConta: null,
            selectedConta: null,
            vencimentoInicial:null,
            vencimentoFinal:null,
            expandedRows: [],
            totalLinas: 0,
            lazyParams: {},
            rows: 20,
            data: [],
            valorTotal: 0,
            menuModel: [
                {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.editarConta()},
                {label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => this.excluirConta()}
            ],
            parcela:null,
            defaultService: null,
            util:null,

        }
    },
    methods:{

        editarConta(){
            this.$emit('editSelectedConta', this.selectedConta);
        },
        excluirConta(){
            this.$confirm.require({
                message: 'Confirma a exclusão da conta?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    await this.defaultService.delete('conta/'+this.selectedConta.id);
                    await this.getDataConta();
                }
            });
        },
        onRowContextMenu(event) {
            this.$refs.cm.show(event.originalEvent);
        },
        onSort(event) {
            this.lazyParams = event;
            this.getDataConta();
        },
        onPage(event) {
            this.lazyParams = event;
            this.getDataConta();
        },
        keyUpIdFilter(event){
            this.idFilter = event.value;
            this.getDataConta();
        },
        async getDataConta(){
            this.loading = true;
            let url = '';

            if(this.lazyParams.sortField)
                url += 'sort=' + (this.lazyParams.sortField)+','+(this.lazyParams.sortOrder==1 ? 'asc' : 'desc');
            else
                url += 'sort=vencimento,desc';

            if(this.lazyParams.page) {
                url += '&page=' + this.lazyParams.page + '&size=' + this.lazyParams.rows;
                this.rows = this.lazyParams.rows;
            }else
                url += '&page=0&size=' + (this.lazyParams.rows ? this.lazyParams.rows : this.rows);

            if(this.idFilter)
                url += '&id=' + this.idFilter;
            if(this.selectedTipoConta)
                url += '&tipoConta.id=' + this.selectedTipoConta.id;
            if(this.vencimentoInicial)
                url += '&vencimentoInicial=' + this.vencimentoInicial.toISOString().substring(0, 10);
            if(this.vencimentoFinal)
                url += '&vencimentoFinal=' + this.vencimentoFinal.toISOString().substring(0, 10);

            const res = await this.defaultService.get('conta/page?'+url);
            this.data = await res.content;
            this.totalLinas =  await res.totalElements;
            this.valorTotal = await this.defaultService.get('conta/valorTotal?'+url);

            this.loading = false;
        },

    },
    mounted() {
        this.loading = true;
        this.getDataConta();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
    watch:{
        selectedTipoConta(){
            this.getDataConta();
        }
    }
}