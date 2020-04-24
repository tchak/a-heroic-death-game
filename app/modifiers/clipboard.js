import { modifier } from 'ember-modifier';
import Clipboard from 'clipboard';

function clipboard(element, _, { text, success, error }) {
  let textFn;

  if (typeof text === 'string') {
    textFn = () => text;
  } else if (typeof text === 'function') {
    textFn = text;
  }

  const clipboard = new Clipboard(element, { text: textFn });

  if (success) {
    clipboard.on('success', success);
  }

  if (error) {
    clipboard.on('error', error);
  }

  return () => clipboard.destroy();
}

export default modifier(clipboard);
