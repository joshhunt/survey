export function renderHTML(htmlString: string, selector: string) {
  const el = querySelector(selector);
  el.innerHTML = htmlString;
}

export function querySelector(selector: string) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Could not find element for selector ${selector}`);
  }

  return element;
}

export function querySelectorAll(selector: string) {
  const elementArray = document.querySelectorAll(selector);

  if (!elementArray) {
    throw new Error(`Could not find element for selector ${selector}`);
  }

  return Array.from(elementArray);
}
