<script setup lang="ts">
import { ref } from 'vue';

const apiKey = ref('dev-local-key');
const baseUrl = 'http://127.0.0.1:17321';
const status = ref<'idle' | 'printing' | 'success' | 'error'>('idle');
const message = ref('');

async function print() {
  status.value = 'printing';
  try {
    const response = await fetch(`${baseUrl}/print`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-portix-api-key': apiKey.value,
      },
      body: JSON.stringify({ content: 'Test ticket from Vue' }),
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message ?? `Print failed (${response.status})`);
    }
    status.value = 'success';
    message.value = `Job ${body.jobId} queued`;
  } catch (error) {
    status.value = 'error';
    message.value = (error as Error).message;
  }
}
</script>

<template>
  <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 40px auto">
    <h1>PortixOne — Vue print button</h1>
    <p>Requires the PortixOne runtime running locally (see the portixone repo).</p>

    <label>
      API key
      <br />
      <input v-model="apiKey" />
    </label>
    <br /><br />

    <button :disabled="status === 'printing'" @click="print">
      {{ status === 'printing' ? 'Printing…' : 'Print test ticket' }}
    </button>

    <p v-if="message">{{ message }}</p>
  </div>
</template>
