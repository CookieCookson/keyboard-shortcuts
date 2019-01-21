import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'keyboard-shortcut',
  styleUrl: 'keyboard-shortcut.css',
  shadow: true
})
export class KeyboardShortcutComponent {
    @Prop() public key: string;
    @Prop() public shift: boolean = false;
    @Prop() public commandControl: boolean = false;

    getCommandControlKey(): string {
        let isMac: boolean = navigator.platform.toLowerCase().indexOf('mac') >= 0;
        return isMac ? '⌘' : 'Ctrl';
    }

    render() {
        let keyArray: string[] = [this.key];
        if (this.shift) keyArray.unshift('Shift');
        if (this.commandControl) keyArray.unshift(this.getCommandControlKey());
        return [
            <label>
                <slot></slot>
            </label>,
            <kbd>{keyArray.join(' + ')}</kbd>
        ];
    }
}
