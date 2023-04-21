<template>
    <AutoComplete
            v-model="selected"
            placeholder="Fornecedor"
            optionLabel="nome"
            :suggestions="fornecedores"
            @complete="search"
            @change="handleChange"
            :inputStyle="{'width':'100%'}"
            forceSelection
    />
</template>

<script>
import DefaultService from "@/service/DefaultService";
export default {
    name: "AutoCompleteFornecedor",
    data() {
        return {
            fornecedores:[],
            selected: null,
        }
    },
    methods: {
        async search(event) {
            console.log(event.query)
            this.fornecedores = await this.defaultService.get('fornecedor/search/'+event.query);
            // this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
        },
        handleChange (event) {
            this.selected = event.value;
            this.$emit("customChange", event.value)
        }
    },
    created() {
        this.defaultService = new DefaultService();
    }
}
</script>

<style scoped>

</style>