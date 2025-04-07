export function hideElementsInSecondRow(containerSelector: string, itemClass: string): void {
    const container = document.querySelector(containerSelector);
    if (!container) return;
  
    const items = container.querySelectorAll(`.${itemClass}`) as NodeListOf<HTMLElement>;
    if (!items.length) return;
  
    items.forEach((item) => {
      item.style.display = '';
    });

    const firstItemTop = items[0].offsetTop;
  
    items.forEach((item) => {
      if (item.offsetTop !== firstItemTop) {
        item.style.display = 'none';
      }
    });
  }