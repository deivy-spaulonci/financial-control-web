<template>
    <InputText v-model="selected"
               style="width: 100%; text-align:right;"
               placeholder="Valor"
               @keyup="handleChange"/>
</template>

<script>
export default {
    props: ['defaultValue', 'setSelected'],
    data() {
        return {
            selected: this.defaultValue,
        }
    },
    methods: {
        handleChange(event) {
            var v = event.target.value.replace(/\D/g, '');
            v = (v / 100).toFixed(2) + '';
            v = v.replace(".", ",");
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            this.selected = v;
            this.$emit("customChange", v)
        }
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