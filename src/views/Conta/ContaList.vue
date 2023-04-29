<template>
    <div id="frameListContas">
        <div id="filtros">
            <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"
                         @input="keyUpIdFilter($event)" :input-style="{'width':'100%'}"/>

            <ComboTipo  @custom-change="(s) => selectedTipoConta = s" :valores="tipos" place="Tipo Conta" :valor-null="true"/>
            <Calendar v-model="vencimentoInicial" placeholder="Vencimento Inicial" @date-select="getDataConta()"  dateFormat="dd/mm/yy"
                      :showButtonBar="true" @clear-click="getDataConta" />
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

            <Column field="status" header="Status" bodyStyle="padding: 0px;" >
                <template #body="slotProps" >
                    <message-status :status="slotProps.data.intStatus" :text-status="slotProps.data.status"></message-status>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="gridExpand1">
                    <div>Cod. Barras:</div>
                    <div class="bg-teal-100"> {{slotProps.data.codigoBarra}}</div>
                    <div>Numero:</div>
                    <div class="bg-teal-100"> {{slotProps.data.numero}}</div>

                    <div>Forma Pgto:</div>
                    <div class="bg-teal-100">{{slotProps.data.formaPagamento ? slotProps.data.formaPagamento.nome : ''}}</div>
                    <div>Data Pgto:</div>
                    <div class="bg-teal-100">{{util.formatDateBr(slotProps.data.dataPagamento)}}</div>
                    <div>Valor Pgto:</div>
                    <div class="bg-teal-100">{{util.formatCurrencyBR(slotProps.data.valorPago)}}</div>

                    <div></div>
                    <div>Observação:</div>
                    <div class="bg-teal-100">{{slotProps.data.obs}}</div>
                </div>

                <TabelaLancamentoContaCartao :valores="slotProps.data.lancamentoContaCartao">
                </TabelaLancamentoContaCartao>

            </template>

            <template #footer>
                <div class="textRight">Total: {{util.formatCurrencyBR(valorTotal)}}</div>
            </template>
        </DataTable>
        <Paginator style="width: 900px;" :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>

        <ContextMenu ref="cm" :model="menuModel" />

        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script>
import contaListMixin from "@/views/Conta/contaListMixin";
import TabelaLancamentoContaCartao from "@/views/Conta/TabelaLancamentoContaCartao.vue";

export default {
    name: "ContaList",
    components: {TabelaLancamentoContaCartao},
    mixins: [contaListMixin]
}
</script>

<style scoped>
    @import url('Conta.css');
</style>