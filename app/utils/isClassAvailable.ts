export function isClassAvailable(className: string): boolean { 
  const testElement = document.createElement("i");
  testElement.className = className;
  document.body.appendChild(testElement);

  const style = getComputedStyle(testElement, "::before");
  const hasContent = !!style.content && style.content !== "none" && style.content !== '""';

  document.body.removeChild(testElement);
  return hasContent;
}