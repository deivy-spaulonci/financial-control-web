<template>
  <Card style="width: 100%; display: inline-block;">
    <template #header></template>
    <template #title>
      {{titulo}}
    </template>
    <template #subtitle>
      <Message severity="success" :closable="false" :icon="icone">
        Total : {{util.formatCurrencyBR(valorTotal)}}
      </Message>
    </template>
    <template #content>
      <p>{{subtitulo}}</p>
      <Chart type="bar" :data="dados" :options="horizontalOptions"/>
    </template>
    <template #footer>
<!--      <Button icon="pi pi-check" label="Save" />-->
    </template>
  </Card>
</template>

<script>
import Util from "@/util/Util";

export default {
  data(){
    return {
      horizontalOptions: {
        indexAxis: 'y',
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    }
  },
  props: ['titulo','valorTotal','dados','icone','subtitulo'],
  name: "CardChard",
  util:null,
  created() {
    this.util = new Util();
  },
}
</script>

<style scoped>

</style>