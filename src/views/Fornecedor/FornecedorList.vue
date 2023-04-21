<template>
    <div id="frameListFornecedor">
        <div id="filtros">
          <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"  @input="keyUpIdFilter($event)" input-style="width:100%;"/>
          <InputText placeholder="Nome" type="text" v-model="nomeFilter" @input="keyUpIdFilter($event)" style="width:100%;"/>
          <InputText placeholder="CNPJ" type="text" v-model="cnpjFilter" @input="keyUpIdFilter($event)" style="width:100%;"/>
        </div>

        <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll"
                   stripedRows selectionMode="single" v-model:selection="selectedFornecedor" showGridlines>
            <template #empty>No customers found.</template>
            <template #loading>Loading contas data. Please wait.</template>
            <Column field="id" header="Id" :sortable="true" class="columnId"></Column>
            <Column field="nome" header="Nome" :sortable="true"></Column>
            <Column field="cnpj" header="CNPJ" :sortable="true">
                <template #body="slotProps" >
                    <div v-if="slotProps.data.cnpj">{{slotProps.data.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")}}</div>
                </template>
            </Column>
            <Column field="cidade.nome" header="Cidade" :sortable="true">
                <template #body="slotProps" >
                    <div>{{slotProps.data.cidade.nome}} / {{slotProps.data.cidade.estado.value}}</div>
                </template>
            </Column>

            <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible;" style="padding: 0px;">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-pencil" class="p-button-success p-button-sm" @click="editFornecedor(slotProps.data.id)"></Button>
                </template>
            </Column>

        </DataTable>
        <Paginator :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>

    </div>
</template>

<script>
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
            cidades:[],
            cidadesDb:[],
            defaultService: null,
            util:null,
        }
    },
    methods:{
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
        async getCidades(){
            this.cidadesDb = await this.defaultService.get('cidade');
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
        },
        // async editFornecedor(id){
        //     this.fornecedorCadastro = await this.defaultService.get('fornecedor/'+id);
        //     this.cidades = this.cidadesDb;
        // }
    },
    mounted() {
        this.loading = true;
        this.getDataFornecedor();
        // this.getCidades()
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
}
</script>

<style scoped>
#frameListFornecedor{

}
#filtros{
    display: grid;
    grid-template-columns:100px auto auto;
    gap: 3px;
}
</style>