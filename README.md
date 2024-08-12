## Keyboard Shortcut Handler

This project provides a simple way to create keyboard shortcuts using JavaScript. It allows you to define key combinations that will trigger specific functions when pressed. The library is easy to use and can be integrated into any web application or website.

### Installation
Include this script in your HTML file within a `<script>` tag or link to an external JS file where you have included this code.

Once installed, you can import it in your project using ES6 syntax:
```javascript
import { add, remove } from 'shortcut';
```
### Usage
To use the `shortcut` library, follow these steps:
1. Define a function that will be called when the desired key combination is pressed (this can be any JavaScript function).
2. Use the `add()` function to associate this function with a specific keyboard shortcut by passing in an object containing the `shortcutCombination` and the `callback` function you defined earlier.
3. To remove a keyboard shortcut, use the `remove()` function and pass in the same combination that was used when adding it.

Here's how to add a keyboard shortcut:
```javascript
shortcut.add({
   shortcutCombination: 'ctrl+shift+a',
   callback: (e) => {
     console.log('Ctrl+Shift+A pressed!', e);
   }
 });
```

How to remove a keyboard shortcut:
```
shortcut.remove('ctrl+shift+a');
```
### Advantages
- Easy to use and integrate with any web application or website
- Supports both standard and custom keyboard shortcuts
- Allows you to define multiple key combinations for the same function
- Handles cases where multiple keyboards may be used simultaneously (e.g., touchpad vs. physical keyboard)
- Customizable options to control propagation and target of the event
