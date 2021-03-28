(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.FrontDebugger = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = ".front-debugger {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  color: white;\n  z-index: 9999;\n}\n\n.front-debugger p {\n  padding: 12px 20px;\n  margin-top: 3px;\n  background: rgba(0,0,0,0.6);\n}\n\n@media screen and (max-width: 768px) {\n  .front-debugger p {\n    padding: 8px 14px;\n    font-size: 12px;\n  }\n}\n";
    styleInject(css_248z);

    var defaultOptions = {
        test: function () { return location.search.indexOf('mode=test') >= 0; },
        isFront: true,
        isBackground: true,
        prefix: '[test log]',
        displayedTime: 2000,
        parent: 'body',
        className: 'front-debugger',
    };
    var FrontDebugger = (function () {
        function FrontDebugger(options) {
            this.options = __assign(__assign({}, defaultOptions), options);
            if (this.options.test() && this.options.isFront) {
                var div = document.createElement('div');
                div.classList.add(this.options.className);
                document.querySelector(this.options.parent).appendChild(div);
                this.el = div;
            }
        }
        FrontDebugger.prototype.log = function () {
            var text = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                text[_i] = arguments[_i];
            }
            if (this.options.test()) {
                if (this.options.isBackground) {
                    if (this.options.prefix) {
                        console.log.apply(console, __spreadArrays([this.options.prefix], text));
                    }
                    else {
                        console.log.apply(console, text);
                    }
                }
                if (this.options.isFront && this.el) {
                    this.frontLog.apply(this, text);
                }
            }
        };
        FrontDebugger.prototype.frontLog = function () {
            var _a;
            var text = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                text[_i] = arguments[_i];
            }
            var p = document.createElement('p');
            p.textContent = text.reduce(function (pv, cv, ci, arr) {
                var text = (typeof cv === 'string') ? cv : JSON.stringify(cv);
                return pv + " " + text;
            }, '').trim();
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.append(p);
            setTimeout(function () {
                p.remove();
            }, this.options.displayedTime);
        };
        return FrontDebugger;
    }());

    return FrontDebugger;

})));
