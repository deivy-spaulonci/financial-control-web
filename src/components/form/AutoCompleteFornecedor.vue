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
    >
        <template #option="slotProps">
            <div class="flex align-options-center">
                <div>{{ slotProps.option.nome }} - {{ slotProps.option.cidade.nome }}</div>
            </div>
        </template>
    </AutoComplete>
</template>

<script>
import DefaultService from "@/service/DefaultService";
export default {
    props: ['setSelected'],
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
    },
    watch: {
        setSelected(newValue) {
            this.selected = newValue;
        }
    }
}
</script>

<style scoped>

</style>