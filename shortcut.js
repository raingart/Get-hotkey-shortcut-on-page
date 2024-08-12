/**
 * Keyboard Shortcut Handler
 */

// Usage
// shortcut.add({
//    shortcutCombination: 'ctrl+shift+a',
//    callback: (e) => {
//      console.log('Ctrl+Shift+A pressed!', e);
//    }
//  });

const shortcut = (() => {

   const KEY_MAP = {
      ControlLeft: 'CTRL',
      ControlRight: 'CTRL',
      ShiftLeft: 'SHIFT',
      ShiftRight: 'SHIFT',
      AltLeft: 'ALT',
      AltRight: 'ALT',
      MetaLeft: 'META',
      MetaRight: 'META',
   };

   const shortcutData = new Map();
   const shortcutSet = new Set();

   /**
    * Add a new keyboard shortcut
    * @param {string} shortcutCombination - Combination of keys for the shortcut (e.g., 'ctrl+alt+a')
    * @param {function} callback - Function to be executed on key press
    * @param {Object} options - Options for the shortcut (type, propagate, target, keycode)
    */
   const add = ({ shortcutCombination, callback, options = {} }) => {
      // console.log('Adding shortcut:', shortcutCombination);

      // Set up default options
      const mergedOptions = {
         type: 'keydown',
         propagate: false,
         target: document,
         ...options, // Spread provided options on top
      };

      shortcutSet.add(shortcutCombination.toUpperCase());
      // Store additional options and callback if needed
      shortcutData.set(shortcutCombination, { callback, ...mergedOptions });
   };

   /**
    * Remove a keyboard shortcut
    * @param {string} shortcutCombination - Combination of keys for the shortcut (e.g., 'ctrl+alt+a')
    */
   const remove = (shortcutCombination) => {
      // console.log('Removing shortcut:', shortcutCombination);
      shortcutSet.delete(shortcutCombination);
   };

   const isInputDisabled = (target) => {
      return ['input', 'textarea', 'select'].includes(target.localName) || target.isContentEditable;
   }

   /**
    * Handle key press event
    * @param {Event} e - Key press event
    */
   const handleKeyPress = (evt) => {
      const pressedKeys = [];
      if (evt.ctrlKey) pressedKeys.push('CTRL');
      if (evt.shiftKey) pressedKeys.push('SHIFT');
      if (evt.altKey) pressedKeys.push('ALT');
      if (evt.metaKey) pressedKeys.push('META');
      pressedKeys.push(KEY_MAP[evt.code] || evt.code.replace('Key', ''));

      const pressedShortcut = pressedKeys.join('+');

      console.debug('pressedShortcut', pressedShortcut);

      if (shortcutSet.has(pressedShortcut) && !isInputDisabled(evt.target)) {
         // Retrieve callback and options from shortcutData if needed
         const { callback, options } = shortcutData.get(pressedShortcut);
         callback(evt, options);

         evt.stopPropagation();
         evt.preventDefault();
      }
   };

   // Attach a single event listener for key events on document
   document.addEventListener('keydown', handleKeyPress);

   return { add, remove };
})();
