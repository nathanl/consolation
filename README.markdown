# Consolation

## Yet another safe JS browser console

A safer console object
- Ensures `console.log` doesn't cause errors in browsers with no console
- Lets you enable/disable console logging (using `console.enabled = boolean`)
- Supports all console methods [documented by Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/console)
- If any console method was overlooked, it will be delegated to the original console object (bypassing the `enabled` check)

This is slightly less fancy but lighter weight than [Ben Alman's Debug library](http://benalman.com/projects/javascript-debug-console-log)

## Try it out

Paste the following in a file and include it on your page

```javascript
console.enabled = true;

function go_beedogs_go() {
  console.log('I heart beedogs', 42, {we: 'rock you', yes: function(){ return 'we do';}});
}

go_beedogs_go();

console.log('here we are in the top level...');
```

Then paste the following (uncommented) in your browser's JS console

```javascript
console.warn('hi there', {number: 9});
```
