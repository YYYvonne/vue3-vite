/// <reference types="vite/client" />
declare var GLOBAL_VAR;
declare module "*.vue" {
    import { App, defineComponent } from "vue";
    const component: ReturnType<typeof defineComponent> & {
      install(app: App): void;
    };
    export default component;
  }
  
  