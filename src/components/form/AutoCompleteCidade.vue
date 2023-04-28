<template>
    <AutoComplete
            v-model="selected"
            placeholder="Cidade"
            optionLabel="nome"
            :suggestions="cidades"
            @complete="search"
            @change="handleChange"
            :inputStyle="{'width':'100%'}"
            forceSelection
    >
    <template #option="slotProps">
        <div class="flex align-options-center">
            <div>{{ slotProps.option.nome }} - {{ slotProps.option.estado.value }}</div>
        </div>
    </template>
    </AutoComplete>
</template>

<script>
import DefaultService from "@/service/DefaultService";


export default {
    props: ['setSelected'],
    name: "AutoCompleteCidade",
    data() {
        return {
            cidades:[],
            selected: null,
        }
    },
    methods: {
        async search(event) {
            this.cidades = await this.defaultService.get('cidade?nome='+event.query);
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