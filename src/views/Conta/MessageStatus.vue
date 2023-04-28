<template>
  <InlineMessage :severity="severityType"
                 style="min-width: 100% !important">
    {{textStatus}}
  </InlineMessage>
</template>

<script>
export default {
  data() {
    return {
      severityType:'success'
    }
  },
  name: "MessageStatus",
  props: {
    textStatus: String,
    status: Number
  },
  created() {

    switch (this.status){
      case -1 : this.severityType='error'; break;
      case 0  : this.severityType='warn'; break;
      case 1  : this.severityType='info'; break;
      case 2  : this.severityType='success'; break;
      case 3  : this.severityType='info'; break;
    }
  }
}
</script>

<style scoped>

</style>