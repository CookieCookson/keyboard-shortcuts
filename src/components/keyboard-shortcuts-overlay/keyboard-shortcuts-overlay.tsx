import { Component, Listen, State, Prop } from '@stencil/core';

@Component({
  tag: 'keyboard-shortcuts-overlay',
  styleUrl: 'keyboard-shortcuts-overlay.css',
  shadow: true
})
export class KeyboardShortcutsOverlayComponent {
  @Prop() public dialogTitle: string = 'Keyboard Shortcuts';
  @State() private isVisible: boolean = false;

  @Listen('document:keydown')
  handleKeyDown(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.shiftKey && keyboardEvent.keyCode === 191) { // Shift + ?
      this.isVisible = !this.isVisible;
    }
    if (keyboardEvent.keyCode === 27) { // Escape
      this.setVisibility(false);
    }
  }

  setVisibility(newVisibilityState: boolean) {
    this.isVisible = newVisibilityState;
  }

  render() {
    if (!this.isVisible) return;
    return [
      <div class="dialog-container">
        <div class="dialog">
          <h2>{this.dialogTitle}</h2>
          <slot></slot>
          <button aria-label="Close Dialog" title="Close Dialog" onClick={() => this.setVisibility(false)}>
            <svg version="1.1"  width="512" height="512" viewBox="0 0 512 512" focusable="false">
              <path d="M256.010 204.645l100.118-100.146 51.344 51.33-100.118 100.146-51.344-51.329z" />
              <path d="M155.827 407.483l-51.344-51.358 100.161-100.132 51.344 51.358-100.161 100.132z" />
              <path d="M407.498 356.112l-51.373 51.358-100.118-100.146 51.373-51.358 100.118 100.146z" />
              <path d="M104.502 155.857l51.337-51.351 100.153 100.125-51.337 51.351-100.153-100.125z" />
              <path d="M255.983 307.36l-51.351-51.365 51.365-51.351 51.351 51.365-51.365 51.351z" />
            </svg>
          </button>
        </div>
      </div>
    ];
  }
}
