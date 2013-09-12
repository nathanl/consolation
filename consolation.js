// A safer console object - see github.com/nathanl/consolation
safe_console = {
  enabled: false,
  __no_op_console: {},
  __args_to_array: function(args) { return Array.prototype.slice.call(args); },
  __caller_location: function() {
    var call_locations, current_position, caller, file_and_line;
    try {
    call_locations   = (new Error).stack.split("\n");
    current_position = call_locations[0].match(/Error/) ? 3 : 2;
    caller           = call_locations[current_position];
    // Match from either the last '/' or from '<anonymous>' to the end
    file_and_line    = caller.match(/(\/([^\/]*)|\<anonymous\>.*)$/)[0];

    } catch (err) {
      file_and_line = 'location not supported by browser';
    }
    return file_and_line;
  },
  // Metaprogramming in JS! Wooooooooooooooo
  __add_console_methods: function(console_object, definer) {
    logging_methods = ['log', 'debug', 'info', 'error', 'warn'];
    methods         = ['dir', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'trace'].concat(logging_methods);
    for (i = 0; i < methods.length; i++) {
      method_name = methods[i];
      definer(console_object, method_name);
    }
  }
};

// If the browser has no usable console, use a no-op.
safe_console.original_console = (function(){
  return (typeof(window.console === 'object') && typeof(window.console.log) === 'function') ? window.console : safe_console.__no_op_console;
})();

// Define all no-op methods for dummy console
safe_console.__add_console_methods(safe_console.__no_op_console, function(console_object, method_name) {
  console_object[method_name] = function() { return; };
});

// Define real logging methods for safe console
safe_console.__add_console_methods(safe_console, function(console_object, method_name){
  console_object[method_name] = function() {
    if (!this.enabled) { return; }
    var args = arguments;
    // Tack on the caller location if this is a logging method
    if (logging_methods.indexOf(method_name) !== -1) {
      var called_from = this.__caller_location();
      args            = this.__args_to_array(arguments).concat("(" + called_from + ")");
    }
    this.original_console[method_name].apply(this.original_console, args);
  };
});

// In case we missed any methods, inherit from original console. (These would ignore the `enabled` switch)
safe_console.__proto__ = safe_console.original_console;

// Recklessly cautious!
window.console = safe_console;
