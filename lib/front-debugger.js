(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.FrontDebugger = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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

    var css_248z = ".front-debugger {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  background: rgba(0,0,0,0.8);\n  color: white;\n}\n\n.front-debugger p {\n  padding: 12px 20px;\n  margin-bottom: 6px;\n}\n";
    styleInject(css_248z);

    var defaultOptions = {
        speed: 2000,
        style: true,
        parent: 'body',
        className: 'front-debugger',
        test: function () {
            return location.search.indexOf('mode=test') >= 0;
        }
    };
    var FrontDebugger = (function () {
        function FrontDebugger(options) {
            this.options = __assign(__assign({}, defaultOptions), options);
            if (this.options.test()) {
                var div = document.createElement('div');
                div.classList.add(this.options.className);
                document.querySelector(this.options.parent).appendChild(div);
                this.el = div;
            }
        }
        FrontDebugger.prototype.log = function (text) {
            if (this.options.test()) {
                console.log(text);
                this.frontLog(text);
            }
        };
        FrontDebugger.prototype.frontLog = function (text) {
            var _a;
            var p = document.createElement('p');
            p.textContent = text;
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.append(p);
            setTimeout(function () {
                p.remove();
            }, this.options.speed);
        };
        return FrontDebugger;
    }());

    return FrontDebugger;

})));
