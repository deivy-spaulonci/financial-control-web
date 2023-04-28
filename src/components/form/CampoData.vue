<template>
    <InputMask mask="99/99/9999"
               :placeholder="place"
               style="width: 100%;"
               v-model="selected"
               @keyup="handleChange"/>
</template>

<script>
export default {
    props: ['defaultValue', 'place', 'setSelected'],
    data() {
        return {
            selected: this.defaultValue,
        }
    },
    methods: {
        handleChange(event) {
            this.selected = event.target.value;
            this.$emit("customChange", event.target.value);
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