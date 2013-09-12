# Consolation

## Yet another safe JS browser console

- Ensures `console.log` doesn't cause errors in browsers with no console
- Lets you enable/disable console logging (using `console.enabled = boolean`)
- Supports all console methods [documented by Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/console)
- If any console method was overlooked, it will be delegated to the original console object (bypassing the `enabled` check)

Tested and works in Chrome, Firefox and Safari. Chrome gives the nicest stack traces.

## Try it out

Open the included `demo.html` in a browser, **or** after including `consolation.js` in your own page, paste in the following:

```javascript
console.enabled = true;

function go_beedogs_go() {
  console.log('I heart beedogs', 42, {we: 'rock you', yes: function(){ return 'we do';}});
}

go_beedogs_go();

console.log('here we are in the top level...');
```

Then paste the following in your browser's JS console.

```javascript
console.warn('hi there', {number: 9});
```

That's pretty much it. If you're hungry for **still more** excitement, read the source code, you crazy adrenaline junky.

## If you hate it

Try Ben Alman's better-known [Javascript Debug](http://benalman.com/projects/javascript-debug-console-log).

