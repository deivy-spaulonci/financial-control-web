<template>
    <Card>
        <template #title >Cadastro </template>
        <template #content>
            <div id="formCadDespesa">
                <label>CNPJ:</label>
            </div>
        </template>
        <template #footer>
            <div id="footer">
                <Button icon="pi pi-check" label="Save" size="large"/>
                <Button icon="pi pi-times" label="Cancel" severity="secondary"  size="large"/>
            </div>
        </template>
    </Card>
</template>

<script>


export default {
    name: "FornecedorForm",
}
</script>

<style scoped>

</style>