/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fixture, expect, html, oneEvent, defineCE } from '@open-wc/testing';
import { spy, stub } from 'sinon';
import { nameofFactory } from '../helpers/nameof';
import { Button } from '../src/button';
import '../src/button'; // needed for the registration of the custom component

const nameof = nameofFactory<Button>();

describe('Button', () => {
  it('can instantiate', async () => {
    const el = await fixture<Button>('<md-button text="abc"></md-button>');

    expect(el.getAttribute(nameof('text'))).to.equal('abc');
    expect(el.text).to.equal('abc');
  });

  it('should throw when missing <text> property', async () => {
    const el = new Button();
    expect(() => el.checkProperties()).to.throw('property "text" required');
  });

  it('checkProperties gets called', async () => {
    let checkCalled = false;
    const tag = defineCE(
      class extends Button {
        checkProperties() {
          checkCalled = true;
        }
      },
    );
    await fixture(`<${tag}></${tag}>`);
    expect(checkCalled).to.be.true;
  });

  it('throws an event with the expected value', async () => {
    const component = await fixture<Button>(html`<md-button text="abc"></md-button>`);

    const listener = oneEvent(component, 'customEvent');

    component!.shadowRoot!.querySelector('button')!.click();

    const event = await listener;
    
    expect(event.type).to.equal('customEvent');
    expect(event.detail).to.be.undefined; // detail is set only for custom events
  });

  it('calls a function when it is clicked, keep original behaviour', async () => {
    const el = await fixture<Button>(html`<md-button text="abc"></md-button>`);
    const callSpy = spy(el, <any>nameof('onCustomEvent'));
    el!.shadowRoot!.querySelector('button')!.click();
    expect(callSpy).to.have.callCount(1);
    expect(el.text).to.equal('clicked');
  });

  it('calls a function when it is clicked, replace behaviour with a stub', async () => {
    const el = await fixture<Button>(html`<md-button text="abc"></md-button>`);
    const callStub = stub(el, <any>nameof('onCustomEvent'));
    el!.shadowRoot!.querySelector('button')!.click();
    expect(callStub).to.have.callCount(1);
    // expect(el.text).to.equal('clicked'); // <= this will fail as it's a stub, not a spy
  });

});
