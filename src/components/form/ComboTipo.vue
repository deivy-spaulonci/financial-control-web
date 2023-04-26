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
              :show-clear="true"
              v-model="selected"
              @change="handleChange"/>
</template>

<script>
export default {
  props: ['valores','place','valorNull'],
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    handleChange (event) {
      this.selected = event.value;
      this.$emit("customChange", event.value)
    }
  },
    created() {
      if(!this.valorNull)
          this.selected = this.valores[0];
    }
}
</script>

