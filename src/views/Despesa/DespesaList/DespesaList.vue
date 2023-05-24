<template>
  <div id="frameListDespesa">
    <div id="filtros">
        <InputNumber inputId="withoutgrouping" v-model="filtro.idFilter" mode="decimal" :useGrouping="false" placeholder="Id"
                     @input="keyUpIdFilter($event)" input-style="width:100%;"/>
        <ComboTipo  @custom-change="(s) => filtro.selectedTipoDespesa = s" :valores="tipos" place="Despesa" valor-null="true"/>
        <Calendar v-model="filtro.dataInicial" placeholder="Inicio" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy"
                  :showButtonBar="true" @clear-click="getDataDespesa"/>
        <Calendar  v-model="filtro.dataFinal" placeholder="Termino" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy"
                   :showButtonBar="true" @clear-click="getDataDespesa"/>
        <AutoCompleteFornecedor @custom-change="(s) => filtro.selectedFornecedor = s"></AutoCompleteFornecedor>
        <ComboTipo  @custom-change="(s) => filtro.selectedFormaPgto = s" :valores="formasPgto" place="Forma Pagamento"
                    valor-null="true"/>
    </div>
    <DataTable :value="tabela.data" :loading="tabela.loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll"
               stripedRows selectionMode="single" v-model:selection="tabela.selectedDespesa" showGridlines contextMenu
               @rowContextmenu="onRowContextMenu" v-model:contextMenuSelection="tabela.selectedDespesa">
        <template #empty>No customers found.</template>
        <template #loading>Loading despesas data. Please wait.</template>

        <Column field="id" header="Id" :sortable="true" class="columnId" style="width: 50px;"></Column>
        <Column field="tipoDespesa" header="Despesa" :sortable="true" style="width: 170px;">
            <template #body="slotProps">{{slotProps.data.tipoDespesa.nome}}</template>
        </Column>
        <Column field="data" header="Data" :sortable="true" style="width: 90px;">
            <template #body="slotProps" >
                <div class="textCenter">{{util.formatDateBr(slotProps.data.data)}}</div>
            </template>
        </Column>
        <Column field="fornecedor" header="Fornecedor" :sortable="true">
            <template #body="slotProps" >{{slotProps.data.fornecedor.nome}}</template>
        </Column>
        <Column field="formaPagamento" header="Pagamento" :sortable="true">
            <template #body="slotProps" >{{slotProps.data.formaPagamento.nome}}</template>
        </Column>
        <Column field="valor" header="Valor" class="columnCurrency">
            <template #body="slotProps" >
                <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
            </template>
        </Column>
        <template #footer>
            <div class="textRight">Total: {{util.formatCurrencyBR(tabela.valorTotal)}}</div>
        </template>
    </DataTable>

    <Paginator :rows="tabela.rows" :totalRecords="tabela.totalLinas" @page="onPage($event)"
               :rowsPerPageOptions="[10,15,20,25]"></Paginator>

    <ContextMenu ref="cm" :model="menuModel" />

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import despesaListMixin from "@/views/Despesa/DespesaList/despesaListMixin";

export default {
  name: "DespeaList",
  mixins: [despesaListMixin],
}
</script>

<style scoped>
  #frameListDespesa{}
  #filtros{
      display: grid;
      grid-template-columns: 100px 250px 100px 100px auto 250px;
      gap: 3px;
  }
</style>