<template>
  <div id="frameListDespesa">
    <div id="filtros">
        <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"  @input="keyUpIdFilter($event)" input-style="width:100%;"/>
        <ComboTipo  @custom-change="(s) => selectedTipoDespesa = s" :valores="tipos" place="Despesa"/>
        <Calendar v-model="dataInicial" placeholder="Inicio" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy" :showButtonBar="true" @clear-click="getDataDespesa"/>
        <Calendar  v-model="dataFinal" placeholder="Termino" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy" :showButtonBar="true" @clear-click="getDataDespesa"/>
        <AutoCompleteFornecedor @custom-change="(s) => selectedFornecedor = s"></AutoCompleteFornecedor>
        <ComboTipo  @custom-change="(s) => selectedFormaPgto = s" :valores="formasPgto" place="Forma Pagamento"/>
    </div>
    <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll" stripedRows
               selectionMode="single" v-model:selection="selectedDespesa"  editMode="row" @row-edit-save="onRowEditSave"
               v-model:editingRows="editingRows">
        <template #empty>No customers found.</template>
        <template #loading>Loading despesas data. Please wait.</template>

        <Column field="id" header="Id" :sortable="true" class="columnId"></Column>

        <Column field="tipoDespesa" header="Despesa" :sortable="true" style="width: 170px;">
            <template #editor="{ data, field }">
                <Dropdown v-model="data[field]" :options="tipos" optionLabel="nome" style="width: 100%;" :filter="true" scrollHeight="400px">
                    <template #option="slotProps">
                        <span>{{slotProps.option.nome}}</span>
                    </template>
                </Dropdown>
            </template>

            <template #body="slotProps" >
                <div>{{slotProps.data.tipoDespesa.nome}}</div>
            </template>
        </Column>

        <Column field="data" header="Data" :sortable="true" style="width: 130px;">
            <template #editor="{ data, field }">
                <CampoData @custom-change="(s) => data[field] = s" :defaultValue="util.formatDateBr(data[field])"/>
            </template>
            <template #body="slotProps" >
                <div class="textCenter">{{util.formatDateBr(slotProps.data.data)}}</div>
            </template>
        </Column>

        <Column field="fornecedor" header="Fornecedor" :sortable="true">
            <template #editor="{ data, field }">
                <Dropdown v-model="data[field]" :options="fornecedores" optionLabel="nome" style="width: 100%;" :filter="true" scrollHeight="400px">
                    <template #option="slotProps">
                        <span>{{slotProps.option.nome}}</span>
                    </template>
                </Dropdown>
            </template>

            <template #body="slotProps" >
                <div>{{slotProps.data.fornecedor.nome}}</div>
            </template>
        </Column>

        <Column field="formaPagamento" header="Pagamento" :sortable="true">
            <template #editor="{ data, field }">
                <Dropdown v-model="data[field]" :options="formasPgto" optionLabel="nome" style="width: 100%;" :filter="true" scrollHeight="400px">
                    <template #option="slotProps">
                        <span>{{slotProps.option.nome}}</span>
                    </template>
                </Dropdown>
            </template>

            <template #body="slotProps" >
                <div>{{slotProps.data.formaPagamento.nome}}</div>
            </template>
        </Column>

        <Column field="valor" header="Valor" class="columnCurrency">
            <template #editor="{ data, field }">
                <CampoMoeda @custom-change="(s) => data[field] = s" :defaultValue="util.formatCurrencyBR(data[field])"/>
            </template>

            <template #body="slotProps" >
                <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
            </template>
        </Column>

        <Column :rowEditor="true" :styles="{width:'10%', 'min-width':'8rem'}" :bodyStyle="{'text-align':'center'}" >
            <Button type="button" icon="pi pi-pencil" class="p-button-success p-button-sm"></Button>
        </Column>

        <!--      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">-->
        <!--        <template #body>-->
        <!--          <Button type="button" icon="pi pi-pencil" class="p-button-success p-button-sm"></Button>-->
        <!--        </template>-->
        <!--      </Column>-->
        <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
            <template #body>
                <Button type="button" icon="pi pi-trash" class="p-button-danger p-button-sm"></Button>
            </template>
        </Column>

        <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
            <template #body="slotProps">
                <Button type="button" v-if="slotProps.data.ajusteFornecedor != null && slotProps.data.ajusteFornecedor.length>0"
                        @click="visibleAjusteFornec=true;selectedDespesa=slotProps.data" icon="pi pi-wrench"
                        class="p-button-info p-button-sm"></Button>
            </template>
        </Column>

        <template #footer>
            <div class="textRight">Total: {{util.formatCurrencyBR(valorTotal)}}</div>
        </template>
    </DataTable>

    <Paginator :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>

  </div>
</template>

<script>
import ComboTipo from "@/components/form/ComboTipo.vue";
import AutoCompleteFornecedor from "@/components/form/AutoCompleteFornecedor.vue";
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";

export default {
    props: ['tipos','formasPgto'],
    name: "DespesaList",
    components: {AutoCompleteFornecedor, ComboTipo},
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
            loading: false,
            lazyParams: {},
            totalLinas: 0,
            filters: null,
            rows: 20,
            data: [],
            valorTotal: 0,
        }
    },
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
        this.getDataDespesa();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
    watch: {
        selectedTipoDespesa(){
            this.getDataDespesa();
        },
        selectedFornecedor(){
            this.getDataDespesa();
        },
        selectedFormaPgto(){
            this.getDataDespesa();
        }
    }
}
</script>

<style scoped>
  #frameListDespesa{

  }
  #filtros{
      display: grid;
      grid-template-columns: 100px 250px 100px 100px auto 250px;
      gap: 3px;
  }
</style>