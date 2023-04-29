<template>
    <DataTable :value="valores"  editMode="cell" @cell-edit-complete="onCellEditComplete">
        <Column field="data" header="Data" :sortable="true">
            <template #body="slotProps" >
                <div class="textCenter">{{util.formatDateBr(slotProps.data.data)}}</div>
            </template>
        </Column>
        <Column field="fornecedor" header="Fornecedor" :sortable="true" autofocus >
            <template #body="slotProps">
                {{ slotProps.data.fornecedor.nome }}
            </template>
            <template #editor="slotProps">
                  <AutoCompleteFornecedor @custom-change="(s) =>  slotProps.data.fornecedor = s"/>
            </template>
        </Column>
        <Column field="valor" header="Valor" :sortable="true">
            <template #body="slotProps" >
                <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
            </template>
        </Column>
        <Column field="parcela" header="Parcelas">
            <template #body="slotProps">
                <div class="textCenter">{{slotProps.data.parcela}}/{{slotProps.data.totalParcela}}</div>
            </template>
        </Column>
        <Column header="">
            <template #body="slotProps">
                <Button type="button" icon="pi pi-trash" severity="danger" @click="remove(slotProps.data)"/>
            </template>
        </Column>
    </DataTable>
</template>

<script>
import Util from "@/util/Util";
import AutoCompleteFornecedor from "@/components/form/AutoCompleteFornecedor.vue";

export default {
    props: ['valores'],
    name: "TabelaLancamentoContaCartao",
    components: {AutoCompleteFornecedor},
    data() {
        return {
            util:null
        }
    },
    methods:{
        remove(data){
            let i = this.valores.indexOf(data);
            console.log(i)
            // this.valores.splice(i,1)
        },
        onCellEditComplete(event) {
            console.log(event)
            // let { data, newValue, field } = event;


            // switch (field) {
            //     case 'quantity':
            //     case 'price':
            //         if (this.isPositiveInteger(newValue)) data[field] = newValue;
            //         else event.preventDefault();
            //         break;
            //
            //     default:
            //         if (newValue.trim().length > 0) data[field] = newValue;
            //         else event.preventDefault();
            //         break;
            // }
        },
    },
    created() {
        this.util = new Util();
    },
}
</script>

<style scoped>

</style>