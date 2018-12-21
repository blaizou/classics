!function(){return function t(e,i,s){function n(r,a){if(!i[r]){if(!e[r]){var l="function"==typeof require&&require;if(!a&&l)return l(r,!0);if(o)return o(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var c=i[r]={exports:{}};e[r][0].call(c.exports,function(t){return n(e[r][1][t]||t)},c,c.exports,t,e,i,s)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}}()({1:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),n=h(t("dom-classes")),o=h(t("dom-create-element")),r=h(t("prefix")),a=h(t("virtual-scroll")),l=h(t("dom-events"));function h(t){return t&&t.__esModule?t:{default:t}}var c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.createBound(),this.options=e,this.prefix=(0,r.default)("transform"),this.rAF=void 0,this.isRAFCanceled=!1;var i=this.constructor.name?this.constructor.name:"Smooth";this.extends=void 0===e.extends?this.constructor!==t:e.extends,this.callback=this.options.callback||null,this.vars={direction:this.options.direction||"vertical",native:this.options.native||!1,ease:this.options.ease||.075,preload:this.options.preload||!1,current:0,last:0,target:0,height:window.innerHeight,width:window.innerWidth,bounding:0,timer:null,ticking:!1},this.vs=this.vars.native?null:new a.default({limitInertia:this.options.vs&&this.options.vs.limitInertia||!1,mouseMultiplier:this.options.vs&&this.options.vs.mouseMultiplier||1,touchMultiplier:this.options.vs&&this.options.vs.touchMultiplier||1.5,firefoxMultiplier:this.options.vs&&this.options.vs.firefoxMultiplier||30,preventTouch:this.options.vs&&this.options.vs.preventTouch||!0}),this.dom={listener:this.options.listener||document.body,section:this.options.section||document.querySelector(".vs-section")||null,scrollbar:this.vars.native||this.options.noscrollbar?null:{state:{clicked:!1,x:0},el:(0,o.default)({selector:"div",styles:"vs-scrollbar vs-"+this.vars.direction+" vs-scrollbar-"+i.toLowerCase()}),drag:{el:(0,o.default)({selector:"div",styles:"vs-scrolldrag"}),delta:0,height:50}}}}return s(t,[{key:"createBound",value:function(){var t=this;["run","calc","debounce","resize","mouseUp","mouseDown","mouseMove","calcScroll","scrollTo"].forEach(function(e){return t[e]=t[e].bind(t)})}},{key:"init",value:function(){this.addClasses(),this.vars.preload&&this.preloadImages(),this.vars.native?this.addFakeScrollHeight():!this.options.noscrollbar&&this.addFakeScrollBar(),this.addEvents(),this.resize()}},{key:"addClasses",value:function(){var t=this.vars.native?"native":"virtual",e="vertical"===this.vars.direction?"y":"x";n.default.add(this.dom.listener,"is-"+t+"-scroll"),n.default.add(this.dom.listener,e+"-scroll")}},{key:"preloadImages",value:function(){var t=this,e=Array.prototype.slice.call(this.dom.listener.querySelectorAll("img"),0);e.forEach(function(i){var s=document.createElement("img");l.default.once(s,"load",function(){e.splice(e.indexOf(i),1),0===e.length&&t.resize()}),s.src=i.getAttribute("src")})}},{key:"calc",value:function(t){var e="horizontal"==this.vars.direction?t.deltaX:t.deltaY;this.vars.target+=-1*e,this.clampTarget()}},{key:"debounce",value:function(){var t=this,e=this.dom.listener===document.body;this.vars.target="vertical"===this.vars.direction?e?window.scrollY||window.pageYOffset:this.dom.listener.scrollTop:e?window.scrollX||window.pageXOffset:this.dom.listener.scrollLeft,clearTimeout(this.vars.timer),this.vars.ticking||(this.vars.ticking=!0,n.default.add(this.dom.listener,"is-scrolling")),this.vars.timer=setTimeout(function(){t.vars.ticking=!1,n.default.remove(t.dom.listener,"is-scrolling")},200)}},{key:"run",value:function(){if(!this.isRAFCanceled){if(this.vars.current+=(this.vars.target-this.vars.current)*this.vars.ease,this.vars.current<.1&&(this.vars.current=0),this.requestAnimationFrame(),this.extends||(this.dom.section.style[this.prefix]=this.getTransform(-this.vars.current.toFixed(2))),!this.vars.native&&!this.options.noscrollbar){var t=this.dom.scrollbar.drag.height,e="vertical"===this.vars.direction?this.vars.height:this.vars.width,i=Math.abs(this.vars.current)/(this.vars.bounding/(e-t))+t/.5-t,s=Math.max(0,Math.min(i-t,i+t));this.dom.scrollbar.drag.el.style[this.prefix]=this.getTransform(s.toFixed(2))}this.callback&&this.vars.current!==this.vars.last&&this.callback(this.vars.current),this.vars.last=this.vars.current}}},{key:"getTransform",value:function(t){return"vertical"===this.vars.direction?"translate3d(0,"+t+"px,0)":"translate3d("+t+"px,0,0)"}},{key:"on",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.isRAFCanceled&&(this.isRAFCanceled=!1);var e=this.dom.listener===document.body?window:this.dom.listener;this.vars.native?l.default.on(e,"scroll",this.debounce):this.vs&&this.vs.on(this.calc),t&&this.requestAnimationFrame()}},{key:"off",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=this.dom.listener===document.body?window:this.dom.listener;this.vars.native?l.default.off(e,"scroll",this.debounce):this.vs&&this.vs.off(this.calc),t&&this.cancelAnimationFrame()}},{key:"requestAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){this.rAF=requestAnimationFrame(this.run)})},{key:"cancelAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){this.isRAFCanceled=!0,cancelAnimationFrame(this.rAF)})},{key:"addEvents",value:function(){this.on(),l.default.on(window,"resize",this.resize)}},{key:"removeEvents",value:function(){this.off(),l.default.off(window,"resize",this.resize)}},{key:"addFakeScrollBar",value:function(){this.dom.listener.appendChild(this.dom.scrollbar.el),this.dom.scrollbar.el.appendChild(this.dom.scrollbar.drag.el),l.default.on(this.dom.scrollbar.el,"click",this.calcScroll),l.default.on(this.dom.scrollbar.el,"mousedown",this.mouseDown),l.default.on(document,"mousemove",this.mouseMove),l.default.on(document,"mouseup",this.mouseUp)}},{key:"removeFakeScrollBar",value:function(){l.default.off(this.dom.scrollbar.el,"click",this.calcScroll),l.default.off(this.dom.scrollbar.el,"mousedown",this.mouseDown),l.default.off(document,"mousemove",this.mouseMove),l.default.off(document,"mouseup",this.mouseUp),this.dom.listener.removeChild(this.dom.scrollbar.el)}},{key:"mouseDown",value:function(t){t.preventDefault(),1==t.which&&(this.dom.scrollbar.state.clicked=!0)}},{key:"mouseUp",value:function(t){this.dom.scrollbar.state.clicked=!1,n.default.remove(this.dom.listener,"is-dragging")}},{key:"mouseMove",value:function(t){this.dom.scrollbar.state.clicked&&this.calcScroll(t)}},{key:"addFakeScrollHeight",value:function(){this.dom.scroll=(0,o.default)({selector:"div",styles:"vs-scroll-view"}),this.dom.listener.appendChild(this.dom.scroll)}},{key:"removeFakeScrollHeight",value:function(){this.dom.listener.removeChild(this.dom.scroll)}},{key:"calcScroll",value:function(t){var e="vertical"==this.vars.direction?t.clientY:t.clientX,i="vertical"==this.vars.direction?this.vars.height:this.vars.width,s=e*(this.vars.bounding/i);n.default.add(this.dom.listener,"is-dragging"),this.vars.target=s,this.clampTarget(),this.dom.scrollbar&&(this.dom.scrollbar.drag.delta=this.vars.target)}},{key:"scrollTo",value:function(t){this.vars.native?"vertical"==this.vars.direction?window.scrollTo(0,t):window.scrollTo(t,0):(this.vars.target=t,this.clampTarget())}},{key:"resize",value:function(){var t="vertical"===this.vars.direction?"height":"width";if(this.vars.height=window.innerHeight,this.vars.width=window.innerWidth,!this.extends){var e=this.dom.section.getBoundingClientRect();this.vars.bounding="vertical"===this.vars.direction?e.height-(this.vars.native?0:this.vars.height):e.right-(this.vars.native?0:this.vars.width)}this.vars.native||this.options.noscrollbar?this.vars.native&&(this.dom.scroll.style[t]=this.vars.bounding+"px"):(this.dom.scrollbar.drag.height=this.vars.height*(this.vars.height/(this.vars.bounding+this.vars.height)),this.dom.scrollbar.drag.el.style[t]=this.dom.scrollbar.drag.height+"px"),!this.vars.native&&this.clampTarget()}},{key:"clampTarget",value:function(){this.vars.target=Math.round(Math.max(0,Math.min(this.vars.target,this.vars.bounding)))}},{key:"destroy",value:function(){this.vars.native?(n.default.remove(this.dom.listener,"is-native-scroll"),this.removeFakeScrollHeight()):(n.default.remove(this.dom.listener,"is-virtual-scroll"),!this.options.noscrollbar&&this.removeFakeScrollBar()),"vertical"===this.vars.direction?n.default.remove(this.dom.listener,"y-scroll"):n.default.remove(this.dom.listener,"x-scroll"),this.vars.current=0,this.vs&&(this.vs.destroy(),this.vs=null),this.removeEvents()}}]),t}();i.default=c,window.Smooth=c},{"dom-classes":3,"dom-create-element":4,"dom-events":5,prefix:9,"virtual-scroll":15}],2:[function(t,e,i){"use strict";var s=Object.prototype.toString,n=Object.prototype.hasOwnProperty;function o(t,e){return function(){return t.apply(e,arguments)}}e.exports=function(t){if(!t)return console.warn("bindAll requires at least one argument.");var e=Array.prototype.slice.call(arguments,1);if(0===e.length)for(var i in t)n.call(t,i)&&"function"==typeof t[i]&&"[object Function]"==s.call(t[i])&&e.push(i);for(var r=0;r<e.length;r++){var a=e[r];t[a]=o(t[a],t)}}},{}],3:[function(t,e,i){var s=t("indexof"),n=/\s+/,o=Object.prototype.toString;function r(t){if(t.classList)return t.classList;var e=t.className.replace(/^\s+|\s+$/g,"").split(n);return""===e[0]&&e.shift(),e}function a(t,e){if(t.classList)t.classList.add(e);else{var i=r(t);~s(i,e)||i.push(e),t.className=i.join(" ")}}function l(t,e){return t.classList?t.classList.contains(e):!!~s(r(t),e)}function h(t,e){if("[object RegExp]"==o.call(e))return c(t,e);if(t.classList)t.classList.remove(e);else{var i=r(t),n=s(i,e);~n&&i.splice(n,1),t.className=i.join(" ")}}function c(t,e,i){for(var s=Array.prototype.slice.call(r(t)),n=0;n<s.length;n++)e.test(s[n])&&h(t,s[n])}e.exports=r,e.exports.add=a,e.exports.contains=l,e.exports.has=l,e.exports.toggle=function(t,e){if(t.classList)return t.classList.toggle(e);l(t,e)?h(t,e):a(t,e)},e.exports.remove=h,e.exports.removeMatching=c},{indexof:6}],4:[function(t,e,i){e.exports=function(t){t=t||{};var e=document.createElement(t.selector);if(t.attr)for(var i in t.attr)t.attr.hasOwnProperty(i)&&e.setAttribute(i,t.attr[i]);return"a"==t.selector&&t.link&&(e.href=t.link,t.target&&e.setAttribute("target",t.target)),"img"==t.selector&&t.src&&(e.src=t.src,t.lazyload&&(e.style.opacity=0,e.onload=function(){e.style.opacity=1})),t.id&&(e.id=t.id),t.styles&&(e.className=t.styles),t.html&&(e.innerHTML=t.html),t.children&&e.appendChild(t.children),e}},{}],5:[function(t,e,i){var s=t("synthetic-dom-events"),n=function(t,e,i,s){return t.addEventListener(e,i,s||!1)},o=function(t,e,i,s){return t.removeEventListener(e,i,s||!1)},r=function(t,e,i){var n=s(e,i);t.dispatchEvent(n)};document.addEventListener||(n=function(t,e,i){return t.attachEvent("on"+e,i)}),document.removeEventListener||(o=function(t,e,i){return t.detachEvent("on"+e,i)}),document.dispatchEvent||(r=function(t,e,i){var n=s(e,i);return t.fireEvent("on"+n.type,n)}),e.exports={on:n,off:o,once:function(t,e,i,s){n(t,e,function n(r){o(t,e,n,s),i(r)},s)},emit:r}},{"synthetic-dom-events":10}],6:[function(t,e,i){var s=[].indexOf;e.exports=function(t,e){if(s)return t.indexOf(e);for(var i=0;i<t.length;++i)if(t[i]===e)return i;return-1}},{}],7:[function(t,e,i){(function(){(void 0!==i&&null!==i?i:this).Lethargy=function(){function t(t,e,i,s){this.stability=null!=t?Math.abs(t):8,this.sensitivity=null!=e?1+Math.abs(e):100,this.tolerance=null!=i?1+Math.abs(i):1.1,this.delay=null!=s?s:150,this.lastUpDeltas=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;1<=e?t<=e:t>=e;1<=e?t++:t--)i.push(null);return i}.call(this),this.lastDownDeltas=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;1<=e?t<=e:t>=e;1<=e?t++:t--)i.push(null);return i}.call(this),this.deltasTimestamp=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;1<=e?t<=e:t>=e;1<=e?t++:t--)i.push(null);return i}.call(this)}return t.prototype.check=function(t){var e;return null!=(t=t.originalEvent||t).wheelDelta?e=t.wheelDelta:null!=t.deltaY?e=-40*t.deltaY:null==t.detail&&0!==t.detail||(e=-40*t.detail),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),e>0?(this.lastUpDeltas.push(e),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(e),this.lastDownDeltas.shift(),this.isInertia(-1))},t.prototype.isInertia=function(t){var e,i,s,n,o,r,a;return null===(e=-1===t?this.lastDownDeltas:this.lastUpDeltas)[0]?t:!(this.deltasTimestamp[2*this.stability-2]+this.delay>Date.now()&&e[0]===e[2*this.stability-1])&&(s=e.slice(0,this.stability),i=e.slice(this.stability,2*this.stability),a=s.reduce(function(t,e){return t+e}),o=i.reduce(function(t,e){return t+e}),r=a/s.length,n=o/i.length,Math.abs(r)<Math.abs(n*this.tolerance)&&this.sensitivity<Math.abs(n)&&t)},t.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},t.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},t}()}).call(this)},{}],8:[function(t,e,i){"use strict";var s=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;i<10;i++)e["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(t){s[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},s)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var i,r,a=function(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),l=1;l<arguments.length;l++){i=Object(arguments[l]);for(var h in i)n.call(i,h)&&(a[h]=i[h]);if(s){r=s(i);for(var c=0;c<r.length;c++)o.call(i,r[c])&&(a[r[c]]=i[r[c]])}}return a}},{}],9:[function(t,e,i){var s="undefined"!=typeof document?document.createElement("p").style:{},n=["O","ms","Moz","Webkit"],o=/([A-Z])/g,r={};function a(t){if(t=t.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()}),void 0!==s[t])return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),i=n.length;i--;){var o=n[i]+e;if(void 0!==s[o])return o}return t}e.exports=function(t){return t in r?r[t]:r[t]=a(t)},e.exports.dash=function(t){return t=a(t),o.test(t)&&(t="-"+t.replace(o,"-$1"),o.lastIndex=0),t.toLowerCase()}},{}],10:[function(t,e,i){window;var s=document||{},n=(s.documentElement,!0);try{s.createEvent("KeyEvents")}catch(t){n=!1}e.exports=s.createEvent?function(t,e){e=e||{};var i=a(t),r=i;"KeyboardEvent"===i&&n&&(i="KeyEvents",r="KeyEvent");var l,h,c=s.createEvent(i),u="init"+r,d="function"==typeof c[u]?u:"initEvent",v=o[d],f=[],p={};e.type=t;for(var m=0;m<v.length;++m){var y=e[g=v[m]];void 0===y&&(y=c[g]),p[g]=!0,f.push(y)}c[d].apply(c,f),"KeyboardEvent"===i&&(h=e,(l=c).ctrlKey==(h.ctrlKey||!1)&&l.altKey==(h.altKey||!1)&&l.shiftKey==(h.shiftKey||!1)&&l.metaKey==(h.metaKey||!1)&&l.keyCode==(h.keyCode||0)&&l.charCode==(h.charCode||0)||((l=document.createEvent("Event")).initEvent(h.type,h.bubbles,h.cancelable),l.ctrlKey=h.ctrlKey||!1,l.altKey=h.altKey||!1,l.shiftKey=h.shiftKey||!1,l.metaKey=h.metaKey||!1,l.keyCode=h.keyCode||0,l.charCode=h.charCode||0),c=l);for(var g in e)p[g]||(c[g]=e[g]);return c}:function(t,e){e=e||{};var i=s.createEventObject();i.type=t;for(var n in e)void 0!==e[n]&&(i[n]=e[n]);return i};var o=t("./init.json"),r=t("./types.json"),a=function(){var t={};for(var e in r)for(var i=r[e],s=0;s<i.length;s++)t[i[s]]=e;return function(e){return t[e]||"Event"}}()},{"./init.json":11,"./types.json":12}],11:[function(t,e,i){e.exports={initEvent:["type","bubbles","cancelable"],initUIEvent:["type","bubbles","cancelable","view","detail"],initMouseEvent:["type","bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget"],initMutationEvent:["type","bubbles","cancelable","relatedNode","prevValue","newValue","attrName","attrChange"],initKeyboardEvent:["type","bubbles","cancelable","view","ctrlKey","altKey","shiftKey","metaKey","keyCode","charCode"],initKeyEvent:["type","bubbles","cancelable","view","ctrlKey","altKey","shiftKey","metaKey","keyCode","charCode"]}},{}],12:[function(t,e,i){e.exports={MouseEvent:["click","mousedown","mouseup","mouseover","mousemove","mouseout"],KeyboardEvent:["keydown","keyup","keypress"],MutationEvent:["DOMSubtreeModified","DOMNodeInserted","DOMNodeRemoved","DOMNodeRemovedFromDocument","DOMNodeInsertedIntoDocument","DOMAttrModified","DOMCharacterDataModified"],HTMLEvents:["load","unload","abort","error","select","change","submit","reset","focus","blur","resize","scroll"],UIEvent:["DOMFocusIn","DOMFocusOut","DOMActivate"]}},{}],13:[function(t,e,i){function s(){}s.prototype={on:function(t,e,i){var s=this.e||(this.e={});return(s[t]||(s[t]=[])).push({fn:e,ctx:i}),this},once:function(t,e,i){var s=this;function n(){s.off(t,n),e.apply(i,arguments)}return n._=e,this.on(t,n,i)},emit:function(t){for(var e=[].slice.call(arguments,1),i=((this.e||(this.e={}))[t]||[]).slice(),s=0,n=i.length;s<n;s++)i[s].fn.apply(i[s].ctx,e);return this},off:function(t,e){var i=this.e||(this.e={}),s=i[t],n=[];if(s&&e)for(var o=0,r=s.length;o<r;o++)s[o].fn!==e&&s[o].fn._!==e&&n.push(s[o]);return n.length?i[t]=n:delete i[t],this}},e.exports=s},{}],14:[function(t,e,i){"use strict";e.exports=function(t){return JSON.parse(JSON.stringify(t))}},{}],15:[function(t,e,i){"use strict";var s=t("object-assign"),n=t("tiny-emitter"),o=t("lethargy").Lethargy,r=t("./support"),a=(t("./clone"),t("bindall-standalone")),l="virtualscroll";e.exports=f;var h=37,c=38,u=39,d=40,v=32;function f(t){a(this,"_onWheel","_onMouseWheel","_onTouchStart","_onTouchMove","_onKeyDown"),this.el=window,t&&t.el&&(this.el=t.el,delete t.el),this.options=s({mouseMultiplier:1,touchMultiplier:2,firefoxMultiplier:15,keyStep:120,preventTouch:!1,unpreventTouchClass:"vs-touchmove-allowed",limitInertia:!1},t),this.options.limitInertia&&(this._lethargy=new o),this._emitter=new n,this._event={y:0,x:0,deltaX:0,deltaY:0},this.touchStartX=null,this.touchStartY=null,this.bodyTouchAction=null,void 0!==this.options.passive&&(this.listenerOptions={passive:this.options.passive})}f.prototype._notify=function(t){var e=this._event;e.x+=e.deltaX,e.y+=e.deltaY,this._emitter.emit(l,{x:e.x,y:e.y,deltaX:e.deltaX,deltaY:e.deltaY,originalEvent:t})},f.prototype._onWheel=function(t){var e=this.options;if(!this._lethargy||!1!==this._lethargy.check(t)){var i=this._event;i.deltaX=t.wheelDeltaX||-1*t.deltaX,i.deltaY=t.wheelDeltaY||-1*t.deltaY,r.isFirefox&&1==t.deltaMode&&(i.deltaX*=e.firefoxMultiplier,i.deltaY*=e.firefoxMultiplier),i.deltaX*=e.mouseMultiplier,i.deltaY*=e.mouseMultiplier,this._notify(t)}},f.prototype._onMouseWheel=function(t){if(!this.options.limitInertia||!1!==this._lethargy.check(t)){var e=this._event;e.deltaX=t.wheelDeltaX?t.wheelDeltaX:0,e.deltaY=t.wheelDeltaY?t.wheelDeltaY:t.wheelDelta,this._notify(t)}},f.prototype._onTouchStart=function(t){var e=t.targetTouches?t.targetTouches[0]:t;this.touchStartX=e.pageX,this.touchStartY=e.pageY},f.prototype._onTouchMove=function(t){var e=this.options;e.preventTouch&&!t.target.classList.contains(e.unpreventTouchClass)&&t.preventDefault();var i=this._event,s=t.targetTouches?t.targetTouches[0]:t;i.deltaX=(s.pageX-this.touchStartX)*e.touchMultiplier,i.deltaY=(s.pageY-this.touchStartY)*e.touchMultiplier,this.touchStartX=s.pageX,this.touchStartY=s.pageY,this._notify(t)},f.prototype._onKeyDown=function(t){var e=this._event;e.deltaX=e.deltaY=0;var i=window.innerHeight-40;switch(t.keyCode){case h:case c:e.deltaY=this.options.keyStep;break;case u:case d:e.deltaY=-this.options.keyStep;break;case v&&t.shiftKey:e.deltaY=i;break;case v:e.deltaY=-i;break;default:return}this._notify(t)},f.prototype._bind=function(){r.hasWheelEvent&&this.el.addEventListener("wheel",this._onWheel,this.listenerOptions),r.hasMouseWheelEvent&&this.el.addEventListener("mousewheel",this._onMouseWheel,this.listenerOptions),r.hasTouch&&(this.el.addEventListener("touchstart",this._onTouchStart,this.listenerOptions),this.el.addEventListener("touchmove",this._onTouchMove,this.listenerOptions)),r.hasPointer&&r.hasTouchWin&&(this.bodyTouchAction=document.body.style.msTouchAction,document.body.style.msTouchAction="none",this.el.addEventListener("MSPointerDown",this._onTouchStart,!0),this.el.addEventListener("MSPointerMove",this._onTouchMove,!0)),r.hasKeyDown&&document.addEventListener("keydown",this._onKeyDown)},f.prototype._unbind=function(){r.hasWheelEvent&&this.el.removeEventListener("wheel",this._onWheel),r.hasMouseWheelEvent&&this.el.removeEventListener("mousewheel",this._onMouseWheel),r.hasTouch&&(this.el.removeEventListener("touchstart",this._onTouchStart),this.el.removeEventListener("touchmove",this._onTouchMove)),r.hasPointer&&r.hasTouchWin&&(document.body.style.msTouchAction=this.bodyTouchAction,this.el.removeEventListener("MSPointerDown",this._onTouchStart,!0),this.el.removeEventListener("MSPointerMove",this._onTouchMove,!0)),r.hasKeyDown&&document.removeEventListener("keydown",this._onKeyDown)},f.prototype.on=function(t,e){this._emitter.on(l,t,e);var i=this._emitter.e;i&&i[l]&&1===i[l].length&&this._bind()},f.prototype.off=function(t,e){this._emitter.off(l,t,e);var i=this._emitter.e;(!i[l]||i[l].length<=0)&&this._unbind()},f.prototype.reset=function(){var t=this._event;t.x=0,t.y=0},f.prototype.destroy=function(){this._emitter.off(),this._unbind()}},{"./clone":14,"./support":16,"bindall-standalone":2,lethargy:7,"object-assign":8,"tiny-emitter":13}],16:[function(t,e,i){"use strict";e.exports={hasWheelEvent:"onwheel"in document,hasMouseWheelEvent:"onmousewheel"in document,hasTouch:"ontouchstart"in document,hasTouchWin:navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>1,hasPointer:!!window.navigator.msPointerEnabled,hasKeyDown:"onkeydown"in document,isFirefox:navigator.userAgent.indexOf("Firefox")>-1}},{}]},{},[1]);
