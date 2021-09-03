import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { ParagraphStyle } from './paragraph-style';

@customElement('md-paragraph')
export class Paragraph extends LitElement {

  @property({ type: String, attribute: true, reflect: true })
	value = '';

	public static styles = [ParagraphStyle];

  // connectedCallback(): void {
  //   super.connectedCallback();
  //   console.log('connectedCallback');
  // }

  // attributeChangedCallback(name: string, old: string | null, value: string | null): void {
  //   super.attributeChangedCallback(name, old, value);
  //   console.log('attributeChangedCallback');
  // }

	render(): TemplateResult {
		return html`
      <div id="container">
        ${this.value}<slot></slot>
      </div>`;
	}
}
