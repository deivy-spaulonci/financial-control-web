<template>
    <div id="frameListContas">
        <div id="filtros">
            <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"
                         @input="keyUpIdFilter($event)" input-style="width:100%;"/>

            <ComboTipo  @custom-change="(s) => selectedTipoConta = s" :valores="tipos" place="Tipo Conta" :valor-null="true"/>
            <Calendar v-model="vencimentoInicial" placeholder="Vencimento Inicial" @date-select="getDataConta()"  dateFormat="dd/mm/yy"
                      :showButtonBar="true" @clear-click="getDataConta"/>
            <Calendar v-model="vencimentoFinal" placeholder="Vencimento Final" @date-select="getDataConta()"  dateFormat="dd/mm/yy"
                      :showButtonBar="true" @clear-click="getDataConta"/>
        </div>

        <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)"
                   stripedRows selectionMode="single" v-model:selection="selectedConta" showGridlines
                   contextMenu v-model:contextMenuSelection="selectedConta" @rowContextmenu="onRowContextMenu"
                   v-model:expandedRows="expandedRows" sortField="vencimento" :sortOrder="-1" style="width: 1000px;">

            <template #empty>No customers found.</template>
            <template #loading>Loading contas data. Please wait.</template>

            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="id" header="Id" :sortable="true" class="columnId"></Column>
            <Column field="tipoConta.nome" header="Conta" :sortable="true"></Column>
            <Column field="emissao" header="Emissão" :sortable="true">
                <template #body="slotProps" >
                    <div class="textCenter">{{util.formatDateBr(slotProps.data.emissao)}}</div>
                </template>
            </Column>
            <Column field="vencimento" header="Vencimento" :sortable="true">
                <template #body="slotProps" >
                    <div class="textCenter">{{util.formatDateBr(slotProps.data.vencimento)}}</div>
                </template>
            </Column>

            <Column field="parcela" header="Parcelas">
                <template #body="slotProps" >
                    <div class="textCenter">{{slotProps.data.parcela}}/{{slotProps.data.totalParcela}}</div>
                </template>
            </Column>

            <Column field="valor" header="Valor" class="columnCurrency">
                <template #body="slotProps" >
                    <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
                </template>
            </Column>

            <Column field="status" header="Status" style="padding: 0px;">
                <template #body="slotProps" >{{slotProps.data.status}}
<!--                    <message-status :status="slotProps.data.intStatus" :text-status="slotProps.data.status"></message-status>-->
                </template>
            </Column>

            <template #expansion="slotProps">

                <div class="grid" style="margin-top: 5px;">
                    <div class="col-fixed" style="width:90px;">Cod. Barras:</div>
                    <div class="col-5 bg-teal-100">{{slotProps.data.codigoBarra}}</div>
                    <div class="col-2">Numero:</div>
                    <div class="col-3 bg-teal-100">{{slotProps.data.numero}}</div>

                    <div class="col-fixed" style="width:90px;">Forma Pgto:</div>
                    <div class="col-4 bg-teal-100">{{slotProps.data.formaPagamento ? slotProps.data.formaPagamento.nome : ''}}</div>
                    <div class="col-1">Data Pgto:</div>
                    <div class="col-2 bg-teal-100">{{util.formatDateBr(slotProps.data.dataPagamento)}}</div>
                    <div class="col-1">Valor Pgto:</div>
                    <div class="col-2 bg-teal-100">{{util.formatCurrencyBR(slotProps.data.valorPago)}}</div>

                </div>

                <DataTable :value="slotProps.data.lancamentoContaCartao" v-if="slotProps.data.lancamentoContaCartao.length>0">
                    <Column field="data" header="Data" :sortable="true">
                        <template #body="slotProps" >
                            <div class="textCenter">{{util.formatDateBr(slotProps.data.data)}}</div>
                        </template>
                    </Column>
                    <Column field="fornecedor.nome" header="Fornecedor" :sortable="true"></Column>
                    <Column field="valor" header="Valor">
                        <template #body="slotProps" >
                            <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
                        </template>
                    </Column>
                    <Column field="parcela" header="Parcelas">
                        <template #body="slotProps" >
                            <div class="textCenter">{{slotProps.data.parcela}}/{{slotProps.data.totalParcela}}</div>
                        </template>
                    </Column>
                </DataTable>

            </template>

            <template #footer>
                <div class="textRight">Total: {{util.formatCurrencyBR(valorTotal)}}</div>
            </template>
        </DataTable>
        <Paginator style="width: 900px;" :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>

        <ContextMenu ref="cm" :model="menuModel" />
    </div>
</template>

<script>
import Validation from "@/util/Validation";
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import ComboTipo from "@/components/form/ComboTipo.vue";

export default {
    props: ['tipos','formasPgto'],
    name: "ContaList",
    components: {ComboTipo},
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
                {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => alert('teste')},
                {label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => alert('teste')}
            ],
            parcela:null,
            defaultService: null,
            util:null,
        }
    },
    methods:{
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
        }
    },
    mounted() {
        this.loading = true;
        this.getDataConta();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
        this.validation = new Validation();

    },
}
</script>

<style scoped>
#frameListContas{

}
#filtros{
    display: grid;
    grid-template-columns:100px 300px 100px 100px;
    gap: 3px;
}
</style>