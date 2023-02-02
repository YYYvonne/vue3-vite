<template>
  <div ref="portRef" class="port" :style="{ height: height, width: width }" @click="onclick"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import eportUpString from "@/assets/svg/eport_up.svg?raw";
import eportDownString from "@/assets/svg/eport_down.svg?raw";
import fportString from "@/assets/svg/fport.svg?raw";

const props = defineProps({
  width: { type: String, default: "32px" },
  height: { type: String, default: "32px" },
  //<port-icon :port="{ ...port, pos: index % 2 === 0 ? 'upside' : 'downside' }" @click="port_onclick" />
  // {"hwtype": "SFP", "id": 27, "pos": "upside"}
  port: { type: Object, required: true },
});

const portRef = ref<any>(null);

onMounted(() => {
  init_port(props.port)
})
watch(props, () => {
  init_port(props.port)
})

function init_port(port: any) {
  let svgData = "<div class = 'padding_slot'></div>";
  // if (!props.port.hwtype) console.trace("[PortIcon] Invalid hwtype");
  if (port.hwtype === "None") {
    // console.log(portRef.value)
    portRef.value.innerHTML = svgData;
  } else {
    svgData = port.hwtype === "SFP" ? fportString : port.pos === "downside" ? eportDownString : eportUpString;
    svgData = svgData.replaceAll("DD", "none")
    svgData = svgData.replaceAll("MD", "none")
    portRef.value.innerHTML = svgData
    portRef.value.classList.remove("selected")
  }
}
function onclick() {
  portRef.value.classList.toggle("selected");
}
</script>
<style scoped>
.port {
  display: flex;
}

.padding_slot {
  width: 10px;
}

.selected {
  --bd-color: green;
}
</style>
