/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = window, J = k.ShadowRoot && (k.ShadyCSS === void 0 || k.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Y = Symbol(), G = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Y)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (n) => new ht(typeof n == "string" ? n : n + "", void 0, Y), dt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new ht(e, n, Y);
}, mt = (n, t) => {
  J ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = k.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Q = J ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return At(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const R = window, X = R.trustedTypes, gt = X ? X.emptyScript : "", tt = R.reactiveElementPolyfillSupport, q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? gt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, ct = (n, t) => t !== n && (t == t || n == n), I = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: ct }, K = "finalized";
let g = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = I) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || I;
  }
  static finalize() {
    if (this.hasOwnProperty(K))
      return !1;
    this[K] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(Q(s));
    } else
      t !== void 0 && e.push(Q(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return mt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = I) {
    var s;
    const r = this.constructor._$Ep(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : q).toAttribute(e, i.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = s.getPropertyOptions(r), h = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : q;
      this._$El = r, this[r] = h.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ct)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
g[K] = !0, g.elementProperties = /* @__PURE__ */ new Map(), g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, tt == null || tt({ ReactiveElement: g }), ((j = R.reactiveElementVersions) !== null && j !== void 0 ? j : R.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var D;
const M = window, E = M.trustedTypes, et = E ? E.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Z = "$lit$", v = `lit$${(Math.random() + "").slice(9)}$`, ut = "?" + v, bt = `<${ut}>`, y = document, x = () => y.createComment(""), P = (n) => n === null || typeof n != "object" && typeof n != "function", pt = Array.isArray, Et = (n) => pt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, _ = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, rt = /"/g, $t = /^(?:script|style|textarea|title)$/i, St = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), vt = St(1), A = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), f = y.createTreeWalker(y, 129, null, !1);
function _t(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const wt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", o = C;
  for (let h = 0; h < e; h++) {
    const l = n[h];
    let a, d, c = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, d = o.exec(l), d !== null); )
      p = o.lastIndex, o === C ? d[1] === "!--" ? o = it : d[1] !== void 0 ? o = st : d[2] !== void 0 ? ($t.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = _) : d[3] !== void 0 && (o = _) : o === _ ? d[0] === ">" ? (o = s ?? C, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, a = d[1], o = d[3] === void 0 ? _ : d[3] === '"' ? rt : nt) : o === rt || o === nt ? o = _ : o === it || o === st ? o = C : (o = _, s = void 0);
    const $ = o === _ && n[h + 1].startsWith("/>") ? " " : "";
    r += o === C ? l + bt : c >= 0 ? (i.push(a), l.slice(0, c) + Z + l.slice(c) + v + $) : l + v + (c === -2 ? (i.push(void 0), h) : $);
  }
  return [_t(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, l = this.parts, [a, d] = wt(t, e);
    if (this.el = T.createElement(a, i), f.currentNode = this.el.content, e === 2) {
      const c = this.el.content, p = c.firstChild;
      p.remove(), c.append(...p.childNodes);
    }
    for (; (s = f.nextNode()) !== null && l.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const c = [];
          for (const p of s.getAttributeNames())
            if (p.endsWith(Z) || p.startsWith(v)) {
              const $ = d[o++];
              if (c.push(p), $ !== void 0) {
                const yt = s.getAttribute($.toLowerCase() + Z).split(v), N = /([.?@])?(.*)/.exec($);
                l.push({ type: 1, index: r, name: N[2], strings: yt, ctor: N[1] === "." ? xt : N[1] === "?" ? Tt : N[1] === "@" ? Ut : L });
              } else
                l.push({ type: 6, index: r });
            }
          for (const p of c)
            s.removeAttribute(p);
        }
        if ($t.test(s.tagName)) {
          const c = s.textContent.split(v), p = c.length - 1;
          if (p > 0) {
            s.textContent = E ? E.emptyScript : "";
            for (let $ = 0; $ < p; $++)
              s.append(c[$], x()), f.nextNode(), l.push({ type: 2, index: ++r });
            s.append(c[p], x());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ut)
          l.push({ type: 2, index: r });
        else {
          let c = -1;
          for (; (c = s.data.indexOf(v, c + 1)) !== -1; )
            l.push({ type: 7, index: r }), c += v.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var s, r, o, h;
  if (t === A)
    return t;
  let l = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const a = P(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), a === void 0 ? l = void 0 : (l = new a(n), l._$AT(n, e, i)), i !== void 0 ? ((o = (h = e)._$Co) !== null && o !== void 0 ? o : h._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = S(n, l._$AS(n, t.values), l, i)), t;
}
class Ct {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(i, !0);
    f.currentNode = r;
    let o = f.nextNode(), h = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (h === a.index) {
        let d;
        a.type === 2 ? d = new O(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Ot(o, this, t)), this._$AV.push(d), a = s[++l];
      }
      h !== (a == null ? void 0 : a.index) && (o = f.nextNode(), h++);
    }
    return f.currentNode = y, r;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), P(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Et(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== u && P(this._$AH) ? this._$AA.nextSibling.data = t : this.$(y.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(_t(s.h, s.h[0]), this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.v(i);
    else {
      const o = new Ct(r, this), h = o.u(this.options);
      o.v(i), this.$(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new T(t)), e;
  }
  T(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new O(this.k(x()), this.k(x()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class L {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = S(this, t, e, 0), o = !P(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const h = t;
      let l, a;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        a = S(this, h[i + l], e, l), a === A && (a = this._$AH[l]), o || (o = !P(a) || a !== this._$AH[l]), a === u ? t = u : t !== u && (t += (a ?? "") + r[l + 1]), this._$AH[l] = a;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const Pt = E ? E.emptyScript : "";
class Tt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, Pt) : this.element.removeAttribute(this.name);
  }
}
class Ut extends L {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = S(this, t, e, 0)) !== null && i !== void 0 ? i : u) === A)
      return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ot {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const lt = M.litHtmlPolyfillSupport;
lt == null || lt(T, O), ((D = M.litHtmlVersions) !== null && D !== void 0 ? D : M.litHtmlVersions = []).push("2.8.0");
const Ht = (n, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const h = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new O(t.insertBefore(x(), h), h, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var z, V;
class b extends g {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ht(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return A;
  }
}
b.finalized = !0, b._$litElement$ = !0, (z = globalThis.litElementHydrateSupport) === null || z === void 0 || z.call(globalThis, { LitElement: b });
const at = globalThis.litElementPolyfillSupport;
at == null || at({ LitElement: b });
((V = globalThis.litElementVersions) !== null && V !== void 0 ? V : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: r } = i;
  return { kind: s, elements: r, finisher(o) {
    customElements.define(e, o);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} }, kt = (n, t, e) => {
  t.constructor.createProperty(e, n);
};
function w(n) {
  return (t, e) => e !== void 0 ? kt(n, t, e) : Nt(n, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W;
((W = window.HTMLSlotElement) === null || W === void 0 ? void 0 : W.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Mt = (n) => (...t) => ({ _$litDirective$: n, values: t });
class Lt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = Mt(class extends Lt {
  constructor(n) {
    var t;
    if (super(n), n.type !== Rt.ATTRIBUTE || n.name !== "class" || ((t = n.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return " " + Object.keys(n).filter((t) => n[t]).join(" ") + " ";
  }
  update(n, [t]) {
    var e, i;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), n.strings !== void 0 && (this.nt = new Set(n.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in t)
        t[r] && !(!((e = this.nt) === null || e === void 0) && e.has(r)) && this.it.add(r);
      return this.render(t);
    }
    const s = n.element.classList;
    this.it.forEach((r) => {
      r in t || (s.remove(r), this.it.delete(r));
    });
    for (const r in t) {
      const o = !!t[r];
      o === this.it.has(r) || !((i = this.nt) === null || i === void 0) && i.has(r) || (o ? (s.add(r), this.it.add(r)) : (s.remove(r), this.it.delete(r)));
    }
    return A;
  }
});
var It = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, H = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Dt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && It(t, e, s), s;
};
let m = class extends b {
  constructor() {
    super(...arguments), this.name = "", this.color = "default", this.placeholder = "Вставьте ссылку", this.disabled = !1;
  }
  _handleChange(n) {
    console.log(n);
  }
  render() {
    const n = {
      "awc-input": !0,
      [this.color]: !0
    };
    return vt`
      <input
        class=${jt(n)}
        type="text"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        @change=${this._handleChange}
      />
    `;
  }
};
m.styles = dt`
    .awc-input {
      padding: 13px 0 13px 16px;
      border-radius: 5px;
      border: 1px solid var(--secondary-text);
      color: var(--black-text);
    }
    .awc-input:focus-visible {
      outline: 1px solid var(--secondary-text);
      background: white;
    }
    .awc-input:disabled {
      opacity: 0.4;
      background: var(--input-background);
    }
    .default {
      background: var(--input-background);
    }
    .red {
      background: red;
    }
    .purple {
      background: purple;
    }
  `;
H([
  w({ type: String })
], m.prototype, "name", 2);
H([
  w({ type: String })
], m.prototype, "color", 2);
H([
  w({ type: String })
], m.prototype, "placeholder", 2);
H([
  w({ type: Boolean })
], m.prototype, "disabled", 2);
m = H([
  ft("awc-input")
], m);
var Bt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, F = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? zt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Bt(t, e, s), s;
};
let U = class extends b {
  constructor() {
    super(...arguments), this.tabId = "", this.label = "";
  }
  render() {
    return vt`
      <div class="awc-tab" id="${this.tabId}">
        ${this.label}<slot></slot>
        <span class="underline"></span>
      </div>
    `;
  }
};
U.styles = dt`
    .awc-tab {
      cursor: pointer;
      max-width: max-content;
      position: relative;
      border-radius: 5px;
      color: var(--secondary-text);
    }
    .awc-tab:hover {
      transition: color 0.3s;
      color: var(--black-text);
    }

    .awc-tab:hover .underline {
      width: 100%;
    }
    .underline {
      width: 0;
      height: 2px;
      background-color: var(--base-color);
      position: absolute;
      bottom: -12px;
      left: 0;
      transition: width 0.3s ease-in-out;
    }
  `;
F([
  w({ type: String })
], U.prototype, "tabId", 2);
F([
  w({ type: String })
], U.prototype, "label", 2);
U = F([
  ft("awc-tab")
], U);
export {
  m as AwcInput,
  U as AwcTab
};
