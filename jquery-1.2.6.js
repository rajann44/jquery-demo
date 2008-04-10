/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/License
 *
 * Date: 2008-05-24 22:33:40 +1000 (Sat, 24 May 2008)
 * Revision: 1.2.6
 */

(function() {
    var jQuery = window.jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    };

    // Core functionality
    jQuery.fn = jQuery.prototype = {
        init: function(selector, context) {
            if (!selector) return this;
            
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            }

            if (typeof selector === "string") {
                // Handle HTML strings
                var match = /^[^<]*(<(.|\s)+>)[^>]*$/.exec(selector);
                if (match) {
                    var div = document.createElement("div");
                    div.innerHTML = match[1];
                    for (var i = 0; i < div.childNodes.length; i++) {
                        this[i] = div.childNodes[i];
                    }
                    this.length = div.childNodes.length;
                    return this;
                }
                
                // Handle CSS selectors
                var elements;
                if (context) {
                    elements = context.getElementsByTagName(selector);
                } else {
                    elements = document.getElementsByTagName(selector);
                }
                
                for (var i = 0; i < elements.length; i++) {
                    this[i] = elements[i];
                }
                this.length = elements.length;
                return this;
            }
            
            return this;
        },

        // Core methods
        each: function(callback) {
            for (var i = 0; i < this.length; i++) {
                callback.call(this[i], i, this[i]);
            }
            return this;
        },

        // DOM manipulation
        html: function(value) {
            if (value === undefined) {
                return this[0].innerHTML;
            }
            return this.each(function() {
                this.innerHTML = value;
            });
        },

        text: function(value) {
            if (value === undefined) {
                return this[0].innerText || this[0].textContent;
            }
            return this.each(function() {
                if (this.innerText !== undefined) {
                    this.innerText = value;
                } else {
                    this.textContent = value;
                }
            });
        },

        append: function(content) {
            return this.each(function() {
                if (typeof content === "string") {
                    this.innerHTML += content;
                } else if (content.nodeType) {
                    this.appendChild(content);
                }
            });
        },

        // Event handling
        ready: function(fn) {
            if (document.readyState === "complete") {
                fn();
            } else {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", fn, false);
                } else {
                    document.attachEvent("onload", fn);
                }
            }
            return this;
        },

        bind: function(type, fn) {
            return this.each(function() {
                if (this.addEventListener) {
                    this.addEventListener(type, fn, false);
                } else if (this.attachEvent) {
                    this.attachEvent("on" + type, fn);
                }
            });
        },

        unbind: function(type, fn) {
            return this.each(function() {
                if (this.removeEventListener) {
                    this.removeEventListener(type, fn, false);
                } else if (this.detachEvent) {
                    this.detachEvent("on" + type, fn);
                }
            });
        },

        // Effects
        show: function() {
            return this.each(function() {
                this.style.display = "";
            });
        },

        hide: function() {
            return this.each(function() {
                this.style.display = "none";
            });
        },

        fadeOut: function(duration, callback) {
            return this.each(function() {
                var elem = this;
                var opacity = 1;
                var timer = setInterval(function() {
                    opacity -= 0.1;
                    if (opacity <= 0) {
                        clearInterval(timer);
                        elem.style.display = "none";
                        if (callback) callback.call(elem);
                    }
                    elem.style.opacity = opacity;
                }, duration / 10);
            });
        },

        fadeIn: function(duration, callback) {
            return this.each(function() {
                var elem = this;
                elem.style.display = "block";
                elem.style.opacity = 0;
                var opacity = 0;
                var timer = setInterval(function() {
                    opacity += 0.1;
                    if (opacity >= 1) {
                        clearInterval(timer);
                        if (callback) callback.call(elem);
                    }
                    elem.style.opacity = opacity;
                }, duration / 10);
            });
        },

        // Animation
        animate: function(properties, duration, callback) {
            return this.each(function() {
                var elem = this;
                var start = {};
                var end = {};
                
                for (var prop in properties) {
                    if (properties.hasOwnProperty(prop)) {
                        start[prop] = parseFloat(elem.style[prop] || 0);
                        end[prop] = parseFloat(properties[prop]);
                    }
                }

                var startTime = new Date().getTime();
                var timer = setInterval(function() {
                    var currentTime = new Date().getTime();
                    var elapsed = currentTime - startTime;
                    var progress = Math.min(elapsed / duration, 1);

                    for (var prop in properties) {
                        if (properties.hasOwnProperty(prop)) {
                            var current = start[prop] + (end[prop] - start[prop]) * progress;
                            elem.style[prop] = current + "px";
                        }
                    }

                    if (progress === 1) {
                        clearInterval(timer);
                        if (callback) callback.call(elem);
                    }
                }, 16);
            });
        },

        // Class manipulation
        addClass: function(className) {
            return this.each(function() {
                var classes = this.className.split(" ");
                var found = false;
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i] === className) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    classes.push(className);
                    this.className = classes.join(" ");
                }
            });
        },

        removeClass: function(className) {
            return this.each(function() {
                var classes = this.className.split(" ");
                var newClasses = [];
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i] !== className) {
                        newClasses.push(classes[i]);
                    }
                }
                this.className = newClasses.join(" ");
            });
        },

        toggleClass: function(className) {
            return this.each(function() {
                var classes = this.className.split(" ");
                var found = false;
                var newClasses = [];
                
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i] === className) {
                        found = true;
                    } else {
                        newClasses.push(classes[i]);
                    }
                }
                
                if (!found) {
                    newClasses.push(className);
                }
                
                this.className = newClasses.join(" ");
            });
        },

        hasClass: function(className) {
            var classes = this[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] === className) {
                    return true;
                }
            }
            return false;
        },

        // AJAX
        ajax: function(options) {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xhr.open(options.method || "GET", options.url, true);
            
            if (options.headers) {
                for (var header in options.headers) {
                    if (options.headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header, options.headers[header]);
                    }
                }
            }
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = xhr.responseText;
                        try {
                            data = eval("(" + data + ")");
                        } catch(e) {}
                        options.success(data);
                    } else {
                        options.error(xhr);
                    }
                }
            };
            
            xhr.send(options.data);
        },

        // Utility methods
        css: function(property, value) {
            if (value === undefined) {
                return this[0].style[property];
            }
            return this.each(function() {
                this.style[property] = value;
            });
        },

        attr: function(name, value) {
            if (value === undefined) {
                return this[0].getAttribute(name);
            }
            return this.each(function() {
                this.setAttribute(name, value);
            });
        },

        removeAttr: function(name) {
            return this.each(function() {
                this.removeAttribute(name);
            });
        }
    };

    // Make jQuery.fn.init.prototype = jQuery.fn
    jQuery.fn.init.prototype = jQuery.fn;

    // Add $ as an alias for jQuery
    window.$ = jQuery;
})(); 