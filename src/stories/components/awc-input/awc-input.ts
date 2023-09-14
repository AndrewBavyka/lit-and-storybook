import { LitElement, css, html, property } from 'lit-element';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';

@customElement('awc-input')

export class AwcInput extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) color = 'default';
  @property({ type: String }) placeholder = 'Вставьте ссылку';
  @property({ type: Boolean }) disabled: boolean = false;

  protected render() {
    const classes = {
      'awc-input': true,
      [this.color]: true,
    };

    return html`
      <input
        class=${classMap(classes)}
        type="text"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
      />
    `;
  }

  static styles = css`
    .awc-input {
      padding: 13px 0 13px 16px;
      border-radius: 5px;
      border: 1px solid var(--secondary-text);
      color: var(--black-text);
    }
    .awc-input:focus-visible {
      outline: 1px solid var(--secondary-text);
      background: white;
    }
    .awc-input:disabled {
      opacity: 0.4;
      background: var(--input-background);
    }
    .default {
      background: var(--input-background);
    }
    .red {
      background: red;
    }
    .purple {
      background: purple;
    }
  `;
}