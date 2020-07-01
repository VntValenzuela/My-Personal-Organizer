<template>
  <div class="organizer">
    <Calendar />
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar.vue";

export default {
  name: "Organizer",
  components: {
    Calendar
  }
};
</script>
