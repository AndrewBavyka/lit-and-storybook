import { html } from "lit-element";
import "./awc-tab";

export default {
  title: "🧬 Atoms/<awc-tab>",
  component: "awc-tab",
  tags: ["autodocs"],
  argTypes: {
    tabId: { control: "text" },
    label: { control: "text" },
  },
  args: {
    tabId: "tabId-1",
    label: "Название таба",
  },
};

const Tab = ({ tabId, label }: { tabId: string; label: string }) =>
  html` 
    <awc-tab tabId=${tabId} label=${label}></awc-tab>
  `;

export const DefaultTab = Tab.bind({});