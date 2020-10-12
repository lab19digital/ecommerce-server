<template>
  <div>
    <button
      @click="showToggle"
      class="bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded"
    >
      {{ showText }}
    </button>

    <!--Modal-->
    <div v-if="show" class="z-40 ml-0 mt-0">
      <div class="py-2" v-for="(value, key) in data" :key="key">
        <div v-for="(val, key) in value" :key="key">{{ key }} : {{ val }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const SessionGetter = namespace("session", Getter);
const SessionAction = namespace("session", Action);

@Component
export default class Modal extends Vue {
  @SessionGetter isAuthenticated: any;
  @SessionAction logOut: any;
  private show: any = false;
  private showText: any = "View";

  @Prop() readonly data!: any;

  showToggle() {
    this.show = !this.show;

    if (this.showText == "View") {
      this.showText = "Close";
    } else {
      this.showText = "View";
    }
  }
}
</script>
