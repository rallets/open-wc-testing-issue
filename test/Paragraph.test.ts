import { fixture, expect, html, elementUpdated } from '@open-wc/testing';
import { Paragraph } from '../src/paragraph';

describe('Paragraph', () => {
  it('can instantiate', async () => {
    const el = await fixture<Paragraph>('<md-paragraph></md-paragraph>');
    
    const root = el.shadowRoot?.innerHTML;
    console.log('el.shadowRoot:', root);

    expect(el).shadowDom.not.be.null;

    expect(el.getAttribute('value')).to.equal(''); // <= FAILS
    expect(el.value).to.equal(''); // <= FAILS
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
        expect(el.value).to.eq('value 1'); // <= FAILS

        el.value = 'value 2';
        await elementUpdated(el);
        expect(el).dom.to.equal('<md-paragraph value="value 2"></md-paragraph>'); // <= FAILS
      });

    });
  });
});

