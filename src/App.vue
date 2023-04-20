<template>
    <TabMenu :model="items" />
  <router-view/>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {label: 'Home', icon: 'pi pi-fw pi-home', to:'/'},
                {label: 'Despesa', icon: 'pi pi-fw pi-dollar', to:'/despesa'},
                {label: 'Fornecedor', icon: 'pi pi-fw pi-box', to:'/fornecedor'},
                {label: 'Contas', icon: 'pi pi-fw pi-credit-card',  to:'/conta'},
            ]
        }
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>