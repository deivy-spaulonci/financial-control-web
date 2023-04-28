<template>
    <DataTable :value="valores" >
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

<script>
import Util from "@/util/Util";

export default {
    props: ['valores'],
    name: "TabelaLancamentoContaCartao",
    data() {
        return {
            util:null
        }
    },
    created() {
        this.util = new Util();
    },
}
</script>

<style scoped>

</style>