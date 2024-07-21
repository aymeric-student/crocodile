<template>
  <v-dialog v-model="props.dialogVisible" max-width="500">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text v-if="content">
        <p>{{ content }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDialog">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const emits = defineEmits(["update:dialogVisible"]);

const closeDialog = () => {
  emits("update:dialogVisible", false);
};
</script>

<style scoped>
.v-btn {
  height: 56px;
}
</style>
