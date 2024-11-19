/**
 * pico css base modal
 */
export class ModalManager {
  private isOpenClass = "modal-is-open";
  private openingClass = "modal-is-opening";
  private closingClass = "modal-is-closing";
  private scrollbarWidthCssVar = "--pico-scrollbar-width";
  private animationDuration = 400; // ms
  private visibleModal: HTMLDialogElement | null = null;

  // Toggle modal
  public toggleModal(event: Event) {
    event.preventDefault();
    const target = (event.currentTarget as HTMLElement)?.dataset.target;
    const modal = target ? document.getElementById(target) as HTMLDialogElement : null;
    if (!modal) return;
    
    if (modal.open) {
      this.closeModal(modal);
    } else {
      this.openModal(modal);
    }
  }

  // Open modal
  public openModal(modal: HTMLDialogElement) {
    const html = document.documentElement;
    const scrollbarWidth = this.getScrollbarWidth();
    if (scrollbarWidth) {
      html.style.setProperty(this.scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(this.isOpenClass, this.openingClass);
    setTimeout(() => {
      this.visibleModal = modal;
      html.classList.remove(this.openingClass);
    }, this.animationDuration);
    modal.showModal();
  }

  // Close modal
  public closeModal(modal: HTMLDialogElement) {
    this.visibleModal = null;
    const html = document.documentElement;
    html.classList.add(this.closingClass);
    setTimeout(() => {
      html.classList.remove(this.closingClass, this.isOpenClass);
      html.style.removeProperty(this.scrollbarWidthCssVar);
      modal.close();
    }, this.animationDuration);
  }

  // Event listener: Close modal with a click outside
  public closeOnClickOutside(event: MouseEvent) {
    if (this.visibleModal === null) return;
    const modalContent = this.visibleModal.querySelector("article");
    const isClickInside = modalContent?.contains(event.target as Node) ?? false;
    if (!isClickInside) {
      this.closeModal(this.visibleModal);
    }
  }

  // Event listener: Close modal with Esc key
  public closeOnEscape(event: KeyboardEvent) {
    if (event.key === "Escape" && this.visibleModal) {
      this.closeModal(this.visibleModal);
    }
  }

  // Get scrollbar width
  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // Is scrollbar visible
  public isScrollbarVisible(): boolean {
    return document.body.scrollHeight > window.innerHeight;
  }
}
