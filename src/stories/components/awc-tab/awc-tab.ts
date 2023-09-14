import { LitElement, html, css} from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("awc-tab")
export class AwcTab extends LitElement {
  @property({ type: String }) tabId = "";
  @property({ type: String }) label = "";

  protected render() {
    return html`
      <div class="awc-tab" id="${this.tabId}">
        ${this.label}<slot></slot>
        <span class="underline"></span>
      </div>
    `;
  }

  static styles = css`
    .awc-tab {
      cursor: pointer;
      max-width: max-content;
      position: relative;
      border-radius: 5px;
      color: var(--secondary-text);
    }
    .awc-tab:hover {
      transition: color 0.3s;
      color: var(--black-text);
    }

    .awc-tab:hover .underline {
      width: 100%;
    }
    .underline {
      width: 0;
      height: 2px;
      background-color: var(--base-color);
      position: absolute;
      bottom: -12px;
      left: 0;
      transition: width 0.3s ease-in-out;
    }
  `;
}
