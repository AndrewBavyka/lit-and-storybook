import { html } from "lit-element";
import "./awc-tab-group";

export default {
  title: "<awc-tab-group>",
  component: "awc-tab-group",
  
};

export const TabGroup = () => {
  return html` 
  <awc-tab-group>
    <awc-tab></awc-tab>
  </awc-tab-group> 
  `;
};

export const DefaultTabGroup = TabGroup();
