export function scrollToBottom(element: HTMLElement | null) {
	if (element) {
		element.scrollTo({
			top: element.scrollHeight,
			behavior: 'smooth'
		});
	}
}

export function focusElement(selector: string) {
	const element = document.querySelector(selector) as HTMLElement;
	if (element) {
		element.focus();
	}
}

export function focusAndScroll(selector: string, scrollElement: HTMLElement | null) {
	setTimeout(() => {
		scrollToBottom(scrollElement);
		focusElement(selector);
	}, 0);
}
