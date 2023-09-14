import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("awc-tab-group")
export class AwcTabGroup extends LitElement {
  protected render() {
    return html`
      <div class="tab-group">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .awc-tab-group {
      max-width: max-content;
      display: flex;
      align-items: center;
      gap: 34px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--secondary-text);
    }
  `;
}
