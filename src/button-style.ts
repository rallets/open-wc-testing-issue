import { css, unsafeCSS } from 'lit-element';

export const palette = {
  main: '#004B46',
  success: '#009B96',
  dividingLine: '#CCCCCC',
  fieldAdd: '#ECE7D2',
  text: '#222222',
};

export const ButtonStyle = [css` 
    :host {
      display: block;
      flex-direction: column;
      padding: 0;
    }
  
    button {
      border-radius: 0px;
      outline: none;
      border: 2px solid ${unsafeCSS(palette.main)};
      background-color: ${unsafeCSS(palette.main)};
      outline: 2px solid ${unsafeCSS(palette.main)};
      color: var(--text-field-text-color, white);
      height: 44px;
      font-size: 16px;
      padding: 0 24px;      
    }

    button:focus, button:hover{
        outline: 2px solid ${unsafeCSS(palette.success)};
        text-decoration: underline;
        cursor: pointer;
    }

    .container {
      display: flex;
      gap: 32px;
      align-items: center;
    }

    :host(.add-field) {
      display: flex;
    }

    :host(.add-field) button {
      border-radius: 3px;
      border: 1px solid ${unsafeCSS(palette.dividingLine)};
      background-color: ${unsafeCSS(palette.fieldAdd)};
      outline: none;
      color: ${unsafeCSS(palette.text)};
      text-align: left;
    }
`];
