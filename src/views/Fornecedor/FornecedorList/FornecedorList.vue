<template>
    <div id="frameListFornecedor">
        <div id="filtros">
          <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"
                       @input="keyUpIdFilter($event)" :input-style="{'width':'100%'}"/>
          <InputText placeholder="Nome" type="text" v-model="nomeFilter" @input="keyUpIdFilter($event)" style="width:100%;"/>
          <InputText placeholder="CNPJ" type="text" v-model="cnpjFilter" @input="keyUpIdFilter($event)" style="width:100%;"/>
        </div>

        <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll"
                   contextMenu v-model:contextMenuSelection="selectedFornecedor" @rowContextmenu="onRowContextMenu"
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

        </DataTable>
        <Paginator :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>
        <ContextMenu ref="cm" :model="menuModel" />
    </div>
</template>

<script>
import fornecedorListMixin from "@/views/Fornecedor/FornecedorList/fornecedorListMixin";
export default {
  name: "FornecedorList",
  mixins: [fornecedorListMixin]
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