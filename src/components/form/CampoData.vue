<template>
      <InputMask mask="99/99/9999"
                  placeholder="Data"
                  style="width: 100%;"
                  v-model="selected"
                  @keyup="handleChange"/>
</template>

<script>
export default {
  props:['defaultValue'],
  data() {
    return {
      selected: this.defaultValue,
    }
  },
  methods: {
    handleChange (event) {
      this.selected = event.target.value;
      this.$emit("customChange", event.target.value);
    }
  }
}
</script>

<style scoped>

</style>