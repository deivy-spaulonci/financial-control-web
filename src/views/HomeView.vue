<template>
    <div class="home">
        <Message severity="info" :closable="false" >
            Welcome to App personal-payment-view
        </Message>
    </div>
    <div class="grid">
        <div class="col">
            <card-chard titulo="Despesas" :dados="basicDataDespesa" :valorTotal="totalValorDespesas"
                        :subtitulo="legendaDespesa" :icone="'pi pi-fw pi-dollar'"></card-chard>
        </div>
        <div class="col">
            <card-chard titulo="Contas" :dados="basicDataConta" :valorTotal="totalValorContas"
                        subtitulo="Total de Contas por Tipo" :icone="'pi pi-fw pi-credit-card'"></card-chard>
        </div>
    </div>
</template>

<script>
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import CardChard from "@/components/dashboard/CardChard.vue";
import BasicDataChart from "@/model/BasicDataChart";

export default {
    data() {
        return {
            dataChartDespesa: [],
            dataChartConta:[],
            totalValorDespesas: 0,
            totalValorContas: 0,
            basicDataDespesa: new BasicDataChart(),
            basicDataConta:new BasicDataChart(),
            legendaDespesa: '',
        }
    },
    name: 'HomeView',
    defaultService: null,
    components: {
        CardChard
    },
    mounted() {
        this.geTotais();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
    methods:{
        async geTotais(){
            this.totalValorDespesas = await this.defaultService.get('despesa/valorTotal');
            this.totalValorContas = await this.defaultService.get('conta/valorTotal');
            this.dataChartConta = await this.defaultService.get('conta/contaPorTipo');
            this.dataChartDespesa = await this.defaultService.get('despesa/despesaPorTipo');

            this.basicDataDespesa.labels = this.dataChartDespesa.map((i) => i.tipoDespesa.nome)
            this.basicDataDespesa.datasets[0].data = this.dataChartDespesa.map((i) => i.valor)
            this.legendaDespesa = 'Total de Contas por Tipo';
            this.legendaDespesa += 'Período : ' + this.util.formatDateBr(this.dataChartDespesa[0].dataFim);
            this.legendaDespesa += ' até ' + this.util.formatDateBr(this.dataChartDespesa[0].dataInicio);
            this.basicDataDespesa.datasets[0].label = 'Total';

            this.basicDataConta.labels = this.dataChartConta.map((i) => i.tipoConta.nome)
            this.basicDataConta.datasets[0].data = this.dataChartConta.map((i) => i.valor);
            this.basicDataConta.datasets[0].label = 'Total';

        }
    }
}
</script>
