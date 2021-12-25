import { DeserializedValue } from '../typings';

export function display(value: DeserializedValue) {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (value instanceof RegExp) {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toString();
  }

  if (value instanceof Set) {
    const content = Array.from(value.values());
    return `[ ${content.join(', ')} ]`;
  }

  if (value instanceof Map) {
    const content: string[] = [];
    value.forEach((v, k) => content.push(`${k}: ${v}`));
    return `{ ${content.join(', ')} }`;
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const content = keys.reduce(
      (output, item, i) => `${output}, ${keys[i]}: ${item}`,
      '',
    );
    return `{ ${content} }`;
  }

  return value?.toString();
}
