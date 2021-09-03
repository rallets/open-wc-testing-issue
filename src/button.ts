import { html, LitElement, customElement, TemplateResult, property } from 'lit-element';
import { ButtonStyle } from './button-style';

@customElement('md-button')
export class Button extends LitElement {

  public static styles = [ButtonStyle];

  @property({ type: String, attribute: true, reflect: true })
  text = '';

  update(changedProperties: Map<string | number | symbol, unknown>): void {
    this.checkProperties();

    super.update(changedProperties);
  }

  checkProperties(): void {
    if (!this.text) {
      throw new Error('property "text" required');
    }
    if (this.text === 'aaa') {
      throw new Error('property "text" invalid');
    }
  }

  onCustomEvent(e: PointerEvent | KeyboardEvent): void {
    // `click` is a bubbling event, so we re-throw a new event manually.
    e.stopPropagation();

    this.dispatchEvent(new Event('customEvent'));
    this.text = 'clicked';
  }

  render(): TemplateResult {
    return html`
    <button @click=${(e: PointerEvent | KeyboardEvent) => this.onCustomEvent(e)}>
      <div class="container">
        ${this.text}
      </div>
    </button>
    `;
  }
}
