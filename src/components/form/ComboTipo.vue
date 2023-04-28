<template>
    <Dropdown :options="valores"
              optionLabel="nome"
              :placeholder="place"
              autofocus
              style="width:100%; text-align: left;"
              scrollHeight="400px"
              :filter="true"
              :auto-filter-focus="true"
              :reset-filter-on-hide="true"
              :show-clear="this.valorNull!=null"
              v-model="selected"
              @change="handleChange"/>
</template>

<script>
export default {
    props: ['valores', 'place', 'valorNull', 'setSelected'],
    data() {
        return {
            selected: null
        }
    },
    methods: {
        handleChange(event) {
            this.selected = event.value;
            this.$emit("customChange", event.value)
        }
    },
    created() {
        if (['', undefined, null].indexOf(this.valorNull))
            this.selected = this.valores[0];
    },
    watch: {
        setSelected(newValue) {
            this.selected = newValue;
        }
    }
}
</script>

