import Vue from "vue";
import { SimpleDropzone } from "simple-dropzone";
import CustomDropzone from "./lib/dropzone";

let Dropzone;

export default Vue.directive("dropzone", {
  bind(el, binding, vnode) {
    let DropController = new SimpleDropzone(
      el,
      document.createElement("input")
    );

    Dropzone = new CustomDropzone(binding.value ? binding.value : {});

    DropController.on("drop", Dropzone.onDrop);
    DropController.on("dropstart", Dropzone.onDropStart);
    DropController.on("droperror", Dropzone.onDropError);
    el.addEventListener("dragenter", Dropzone.onDragEnter);
    el.addEventListener("dragleave", Dropzone.onDragLeave);
  },
  unbind() { }
});
