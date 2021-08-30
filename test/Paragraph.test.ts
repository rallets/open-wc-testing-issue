import { fixture, expect, html, elementUpdated } from '@open-wc/testing';
import { Paragraph } from '../src/paragraph';
import '../src/paragraph'; // needed for the registration of the custom component

describe('Paragraph', () => {
  it('can instantiate', async () => {
    const el = await fixture<Paragraph>('<md-paragraph></md-paragraph>');
    
    // el.shadowRoot?.innerHTML => <!----><div id="container" ><slot></slot></div><!---->
    // expect(el).shadowDom => <md-paragraph value=""></md-paragraph>

    expect(el.getAttribute('value')).to.equal('');
    expect(el.value).to.equal('');
  });

  it('has value and slot', async () => {
    const el = await fixture<Paragraph>(html`<md-paragraph .value=${'bar'}>foo</md-paragraph>`);
    expect(el).lightDom.to.equal('foo');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Paragraph>(html`<md-paragraph .value=${'bar'}>foo</md-paragraph>`);
    await expect(el).to.be.accessible(); // await is needed
  });

  describe('Attributes', () => {
    describe('.value', () => {
      it('has default attribute', async () => {
        const el = await fixture('<md-paragraph value="bar"></md-paragraph>');
        expect(el.getAttribute('value')).to.equal('bar');
      });

      it('has default property', async () => {
        const el = await fixture<Paragraph>(html`<md-paragraph .value=${'bar'}></md-paragraph>`);
        expect(el.value).to.equal('bar');
      });

      it('can update', async () => {
        const el = await fixture<Paragraph>('<md-paragraph value="value 1"></md-paragraph>');

        expect(el.getAttribute('value')).to.equal('value 1');
        expect(el.value).to.eq('value 1');

        el.value = 'value 2';
        await elementUpdated(el);
        expect(el).dom.to.equal('<md-paragraph value="value 2"></md-paragraph>');
      });

    });
  });
});

