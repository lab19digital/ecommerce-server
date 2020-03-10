!(function(e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = (t[r] = { i: r, l: !1, exports: {} });
        return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = e),
        (n.c = t),
        (n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
        }),
        (n.r = function(e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        (n.t = function(e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
                2 & t && 'string' != typeof e)
            )
                for (var o in e)
                    n.d(
                        r,
                        o,
                        function(t) {
                            return e[t];
                        }.bind(null, o),
                    );
            return r;
        }),
        (n.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default;
                      }
                    : function() {
                          return e;
                      };
            return n.d(t, 'a', t), t;
        }),
        (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ''),
        n((n.s = 1));
})([
    function(e, t, n) {
        var r;
        /*!
         * jQuery JavaScript Library v3.4.1
         * https://jquery.com/
         *
         * Includes Sizzle.js
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://jquery.org/license
         *
         * Date: 2019-05-01T21:04Z
         */ !(function(t, n) {
            'use strict';
            'object' == typeof e.exports
                ? (e.exports = t.document
                      ? n(t, !0)
                      : function(e) {
                            if (!e.document) throw new Error('jQuery requires a window with a document');
                            return n(e);
                        })
                : n(t);
        })('undefined' != typeof window ? window : this, function(n, o) {
            'use strict';
            var i = [],
                a = n.document,
                s = Object.getPrototypeOf,
                u = i.slice,
                c = i.concat,
                l = i.push,
                d = i.indexOf,
                f = {},
                p = f.toString,
                h = f.hasOwnProperty,
                g = h.toString,
                v = g.call(Object),
                m = {},
                y = function(e) {
                    return 'function' == typeof e && 'number' != typeof e.nodeType;
                },
                x = function(e) {
                    return null != e && e === e.window;
                },
                b = { type: !0, src: !0, nonce: !0, noModule: !0 };
            function w(e, t, n) {
                var r,
                    o,
                    i = (n = n || a).createElement('script');
                if (((i.text = e), t))
                    for (r in b) (o = t[r] || (t.getAttribute && t.getAttribute(r))) && i.setAttribute(r, o);
                n.head.appendChild(i).parentNode.removeChild(i);
            }
            function T(e) {
                return null == e
                    ? e + ''
                    : 'object' == typeof e || 'function' == typeof e
                    ? f[p.call(e)] || 'object'
                    : typeof e;
            }
            var k = function(e, t) {
                    return new k.fn.init(e, t);
                },
                C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            function S(e) {
                var t = !!e && 'length' in e && e.length,
                    n = T(e);
                return !y(e) && !x(e) && ('array' === n || 0 === t || ('number' == typeof t && t > 0 && t - 1 in e));
            }
            (k.fn = k.prototype = {
                jquery: '3.4.1',
                constructor: k,
                length: 0,
                toArray: function() {
                    return u.call(this);
                },
                get: function(e) {
                    return null == e ? u.call(this) : e < 0 ? this[e + this.length] : this[e];
                },
                pushStack: function(e) {
                    var t = k.merge(this.constructor(), e);
                    return (t.prevObject = this), t;
                },
                each: function(e) {
                    return k.each(this, e);
                },
                map: function(e) {
                    return this.pushStack(
                        k.map(this, function(t, n) {
                            return e.call(t, n, t);
                        }),
                    );
                },
                slice: function() {
                    return this.pushStack(u.apply(this, arguments));
                },
                first: function() {
                    return this.eq(0);
                },
                last: function() {
                    return this.eq(-1);
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
                },
                end: function() {
                    return this.prevObject || this.constructor();
                },
                push: l,
                sort: i.sort,
                splice: i.splice,
            }),
                (k.extend = k.fn.extend = function() {
                    var e,
                        t,
                        n,
                        r,
                        o,
                        i,
                        a = arguments[0] || {},
                        s = 1,
                        u = arguments.length,
                        c = !1;
                    for (
                        'boolean' == typeof a && ((c = a), (a = arguments[s] || {}), s++),
                            'object' == typeof a || y(a) || (a = {}),
                            s === u && ((a = this), s--);
                        s < u;
                        s++
                    )
                        if (null != (e = arguments[s]))
                            for (t in e)
                                (r = e[t]),
                                    '__proto__' !== t &&
                                        a !== r &&
                                        (c && r && (k.isPlainObject(r) || (o = Array.isArray(r)))
                                            ? ((n = a[t]),
                                              (i = o && !Array.isArray(n) ? [] : o || k.isPlainObject(n) ? n : {}),
                                              (o = !1),
                                              (a[t] = k.extend(c, i, r)))
                                            : void 0 !== r && (a[t] = r));
                    return a;
                }),
                k.extend({
                    expando: 'jQuery' + ('3.4.1' + Math.random()).replace(/\D/g, ''),
                    isReady: !0,
                    error: function(e) {
                        throw new Error(e);
                    },
                    noop: function() {},
                    isPlainObject: function(e) {
                        var t, n;
                        return (
                            !(!e || '[object Object]' !== p.call(e)) &&
                            (!(t = s(e)) ||
                                ('function' == typeof (n = h.call(t, 'constructor') && t.constructor) &&
                                    g.call(n) === v))
                        );
                    },
                    isEmptyObject: function(e) {
                        var t;
                        for (t in e) return !1;
                        return !0;
                    },
                    globalEval: function(e, t) {
                        w(e, { nonce: t && t.nonce });
                    },
                    each: function(e, t) {
                        var n,
                            r = 0;
                        if (S(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                        else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                        return e;
                    },
                    trim: function(e) {
                        return null == e ? '' : (e + '').replace(C, '');
                    },
                    makeArray: function(e, t) {
                        var n = t || [];
                        return (
                            null != e && (S(Object(e)) ? k.merge(n, 'string' == typeof e ? [e] : e) : l.call(n, e)), n
                        );
                    },
                    inArray: function(e, t, n) {
                        return null == t ? -1 : d.call(t, e, n);
                    },
                    merge: function(e, t) {
                        for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
                        return (e.length = o), e;
                    },
                    grep: function(e, t, n) {
                        for (var r = [], o = 0, i = e.length, a = !n; o < i; o++) !t(e[o], o) !== a && r.push(e[o]);
                        return r;
                    },
                    map: function(e, t, n) {
                        var r,
                            o,
                            i = 0,
                            a = [];
                        if (S(e)) for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && a.push(o);
                        else for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
                        return c.apply([], a);
                    },
                    guid: 1,
                    support: m,
                }),
                'function' == typeof Symbol && (k.fn[Symbol.iterator] = i[Symbol.iterator]),
                k.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(
                    e,
                    t,
                ) {
                    f['[object ' + t + ']'] = t.toLowerCase();
                });
            var E =
                /*!
                 * Sizzle CSS Selector Engine v2.3.4
                 * https://sizzlejs.com/
                 *
                 * Copyright JS Foundation and other contributors
                 * Released under the MIT license
                 * https://js.foundation/
                 *
                 * Date: 2019-04-08
                 */
                (function(e) {
                    var t,
                        n,
                        r,
                        o,
                        i,
                        a,
                        s,
                        u,
                        c,
                        l,
                        d,
                        f,
                        p,
                        h,
                        g,
                        v,
                        m,
                        y,
                        x,
                        b = 'sizzle' + 1 * new Date(),
                        w = e.document,
                        T = 0,
                        k = 0,
                        C = ue(),
                        S = ue(),
                        E = ue(),
                        j = ue(),
                        A = function(e, t) {
                            return e === t && (d = !0), 0;
                        },
                        D = {}.hasOwnProperty,
                        N = [],
                        q = N.pop,
                        _ = N.push,
                        L = N.push,
                        I = N.slice,
                        P = function(e, t) {
                            for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                            return -1;
                        },
                        O =
                            'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
                        $ = '[\\x20\\t\\r\\n\\f]',
                        H = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
                        M =
                            '\\[' +
                            $ +
                            '*(' +
                            H +
                            ')(?:' +
                            $ +
                            '*([*^$|!~]?=)' +
                            $ +
                            '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                            H +
                            '))|)' +
                            $ +
                            '*\\]',
                        R =
                            ':(' +
                            H +
                            ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                            M +
                            ')*)|.*)\\)|)',
                        W = new RegExp($ + '+', 'g'),
                        B = new RegExp('^' + $ + '+|((?:^|[^\\\\])(?:\\\\.)*)' + $ + '+$', 'g'),
                        F = new RegExp('^' + $ + '*,' + $ + '*'),
                        U = new RegExp('^' + $ + '*([>+~]|' + $ + ')' + $ + '*'),
                        z = new RegExp($ + '|>'),
                        X = new RegExp(R),
                        Q = new RegExp('^' + H + '$'),
                        V = {
                            ID: new RegExp('^#(' + H + ')'),
                            CLASS: new RegExp('^\\.(' + H + ')'),
                            TAG: new RegExp('^(' + H + '|[*])'),
                            ATTR: new RegExp('^' + M),
                            PSEUDO: new RegExp('^' + R),
                            CHILD: new RegExp(
                                '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                                    $ +
                                    '*(even|odd|(([+-]|)(\\d*)n|)' +
                                    $ +
                                    '*(?:([+-]|)' +
                                    $ +
                                    '*(\\d+)|))' +
                                    $ +
                                    '*\\)|)',
                                'i',
                            ),
                            bool: new RegExp('^(?:' + O + ')$', 'i'),
                            needsContext: new RegExp(
                                '^' +
                                    $ +
                                    '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                                    $ +
                                    '*((?:-\\d)?\\d*)' +
                                    $ +
                                    '*\\)|)(?=[^-]|$)',
                                'i',
                            ),
                        },
                        G = /HTML$/i,
                        Y = /^(?:input|select|textarea|button)$/i,
                        J = /^h\d$/i,
                        K = /^[^{]+\{\s*\[native \w/,
                        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        ee = /[+~]/,
                        te = new RegExp('\\\\([\\da-f]{1,6}' + $ + '?|(' + $ + ')|.)', 'ig'),
                        ne = function(e, t, n) {
                            var r = '0x' + t - 65536;
                            return r != r || n
                                ? t
                                : r < 0
                                ? String.fromCharCode(r + 65536)
                                : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
                        },
                        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                        oe = function(e, t) {
                            return t
                                ? '\0' === e
                                    ? '�'
                                    : e.slice(0, -1) + '\\' + e.charCodeAt(e.length - 1).toString(16) + ' '
                                : '\\' + e;
                        },
                        ie = function() {
                            f();
                        },
                        ae = be(
                            function(e) {
                                return !0 === e.disabled && 'fieldset' === e.nodeName.toLowerCase();
                            },
                            { dir: 'parentNode', next: 'legend' },
                        );
                    try {
                        L.apply((N = I.call(w.childNodes)), w.childNodes), N[w.childNodes.length].nodeType;
                    } catch (e) {
                        L = {
                            apply: N.length
                                ? function(e, t) {
                                      _.apply(e, I.call(t));
                                  }
                                : function(e, t) {
                                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                                      e.length = n - 1;
                                  },
                        };
                    }
                    function se(e, t, r, o) {
                        var i,
                            s,
                            c,
                            l,
                            d,
                            h,
                            m,
                            y = t && t.ownerDocument,
                            T = t ? t.nodeType : 9;
                        if (((r = r || []), 'string' != typeof e || !e || (1 !== T && 9 !== T && 11 !== T))) return r;
                        if (!o && ((t ? t.ownerDocument || t : w) !== p && f(t), (t = t || p), g)) {
                            if (11 !== T && (d = Z.exec(e)))
                                if ((i = d[1])) {
                                    if (9 === T) {
                                        if (!(c = t.getElementById(i))) return r;
                                        if (c.id === i) return r.push(c), r;
                                    } else if (y && (c = y.getElementById(i)) && x(t, c) && c.id === i)
                                        return r.push(c), r;
                                } else {
                                    if (d[2]) return L.apply(r, t.getElementsByTagName(e)), r;
                                    if ((i = d[3]) && n.getElementsByClassName && t.getElementsByClassName)
                                        return L.apply(r, t.getElementsByClassName(i)), r;
                                }
                            if (
                                n.qsa &&
                                !j[e + ' '] &&
                                (!v || !v.test(e)) &&
                                (1 !== T || 'object' !== t.nodeName.toLowerCase())
                            ) {
                                if (((m = e), (y = t), 1 === T && z.test(e))) {
                                    for (
                                        (l = t.getAttribute('id'))
                                            ? (l = l.replace(re, oe))
                                            : t.setAttribute('id', (l = b)),
                                            s = (h = a(e)).length;
                                        s--;

                                    )
                                        h[s] = '#' + l + ' ' + xe(h[s]);
                                    (m = h.join(',')), (y = (ee.test(e) && me(t.parentNode)) || t);
                                }
                                try {
                                    return L.apply(r, y.querySelectorAll(m)), r;
                                } catch (t) {
                                    j(e, !0);
                                } finally {
                                    l === b && t.removeAttribute('id');
                                }
                            }
                        }
                        return u(e.replace(B, '$1'), t, r, o);
                    }
                    function ue() {
                        var e = [];
                        return function t(n, o) {
                            return e.push(n + ' ') > r.cacheLength && delete t[e.shift()], (t[n + ' '] = o);
                        };
                    }
                    function ce(e) {
                        return (e[b] = !0), e;
                    }
                    function le(e) {
                        var t = p.createElement('fieldset');
                        try {
                            return !!e(t);
                        } catch (e) {
                            return !1;
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), (t = null);
                        }
                    }
                    function de(e, t) {
                        for (var n = e.split('|'), o = n.length; o--; ) r.attrHandle[n[o]] = t;
                    }
                    function fe(e, t) {
                        var n = t && e,
                            r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                        if (r) return r;
                        if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
                        return e ? 1 : -1;
                    }
                    function pe(e) {
                        return function(t) {
                            return 'input' === t.nodeName.toLowerCase() && t.type === e;
                        };
                    }
                    function he(e) {
                        return function(t) {
                            var n = t.nodeName.toLowerCase();
                            return ('input' === n || 'button' === n) && t.type === e;
                        };
                    }
                    function ge(e) {
                        return function(t) {
                            return 'form' in t
                                ? t.parentNode && !1 === t.disabled
                                    ? 'label' in t
                                        ? 'label' in t.parentNode
                                            ? t.parentNode.disabled === e
                                            : t.disabled === e
                                        : t.isDisabled === e || (t.isDisabled !== !e && ae(t) === e)
                                    : t.disabled === e
                                : 'label' in t && t.disabled === e;
                        };
                    }
                    function ve(e) {
                        return ce(function(t) {
                            return (
                                (t = +t),
                                ce(function(n, r) {
                                    for (var o, i = e([], n.length, t), a = i.length; a--; )
                                        n[(o = i[a])] && (n[o] = !(r[o] = n[o]));
                                })
                            );
                        });
                    }
                    function me(e) {
                        return e && void 0 !== e.getElementsByTagName && e;
                    }
                    for (t in ((n = se.support = {}),
                    (i = se.isXML = function(e) {
                        var t = e.namespaceURI,
                            n = (e.ownerDocument || e).documentElement;
                        return !G.test(t || (n && n.nodeName) || 'HTML');
                    }),
                    (f = se.setDocument = function(e) {
                        var t,
                            o,
                            a = e ? e.ownerDocument || e : w;
                        return a !== p && 9 === a.nodeType && a.documentElement
                            ? ((h = (p = a).documentElement),
                              (g = !i(p)),
                              w !== p &&
                                  (o = p.defaultView) &&
                                  o.top !== o &&
                                  (o.addEventListener
                                      ? o.addEventListener('unload', ie, !1)
                                      : o.attachEvent && o.attachEvent('onunload', ie)),
                              (n.attributes = le(function(e) {
                                  return (e.className = 'i'), !e.getAttribute('className');
                              })),
                              (n.getElementsByTagName = le(function(e) {
                                  return e.appendChild(p.createComment('')), !e.getElementsByTagName('*').length;
                              })),
                              (n.getElementsByClassName = K.test(p.getElementsByClassName)),
                              (n.getById = le(function(e) {
                                  return (
                                      (h.appendChild(e).id = b), !p.getElementsByName || !p.getElementsByName(b).length
                                  );
                              })),
                              n.getById
                                  ? ((r.filter.ID = function(e) {
                                        var t = e.replace(te, ne);
                                        return function(e) {
                                            return e.getAttribute('id') === t;
                                        };
                                    }),
                                    (r.find.ID = function(e, t) {
                                        if (void 0 !== t.getElementById && g) {
                                            var n = t.getElementById(e);
                                            return n ? [n] : [];
                                        }
                                    }))
                                  : ((r.filter.ID = function(e) {
                                        var t = e.replace(te, ne);
                                        return function(e) {
                                            var n = void 0 !== e.getAttributeNode && e.getAttributeNode('id');
                                            return n && n.value === t;
                                        };
                                    }),
                                    (r.find.ID = function(e, t) {
                                        if (void 0 !== t.getElementById && g) {
                                            var n,
                                                r,
                                                o,
                                                i = t.getElementById(e);
                                            if (i) {
                                                if ((n = i.getAttributeNode('id')) && n.value === e) return [i];
                                                for (o = t.getElementsByName(e), r = 0; (i = o[r++]); )
                                                    if ((n = i.getAttributeNode('id')) && n.value === e) return [i];
                                            }
                                            return [];
                                        }
                                    })),
                              (r.find.TAG = n.getElementsByTagName
                                  ? function(e, t) {
                                        return void 0 !== t.getElementsByTagName
                                            ? t.getElementsByTagName(e)
                                            : n.qsa
                                            ? t.querySelectorAll(e)
                                            : void 0;
                                    }
                                  : function(e, t) {
                                        var n,
                                            r = [],
                                            o = 0,
                                            i = t.getElementsByTagName(e);
                                        if ('*' === e) {
                                            for (; (n = i[o++]); ) 1 === n.nodeType && r.push(n);
                                            return r;
                                        }
                                        return i;
                                    }),
                              (r.find.CLASS =
                                  n.getElementsByClassName &&
                                  function(e, t) {
                                      if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e);
                                  }),
                              (m = []),
                              (v = []),
                              (n.qsa = K.test(p.querySelectorAll)) &&
                                  (le(function(e) {
                                      (h.appendChild(e).innerHTML =
                                          "<a id='" +
                                          b +
                                          "'></a><select id='" +
                                          b +
                                          "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                          e.querySelectorAll("[msallowcapture^='']").length &&
                                              v.push('[*^$]=' + $ + '*(?:\'\'|"")'),
                                          e.querySelectorAll('[selected]').length ||
                                              v.push('\\[' + $ + '*(?:value|' + O + ')'),
                                          e.querySelectorAll('[id~=' + b + '-]').length || v.push('~='),
                                          e.querySelectorAll(':checked').length || v.push(':checked'),
                                          e.querySelectorAll('a#' + b + '+*').length || v.push('.#.+[+~]');
                                  }),
                                  le(function(e) {
                                      e.innerHTML =
                                          "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                      var t = p.createElement('input');
                                      t.setAttribute('type', 'hidden'),
                                          e.appendChild(t).setAttribute('name', 'D'),
                                          e.querySelectorAll('[name=d]').length && v.push('name' + $ + '*[*^$|!~]?='),
                                          2 !== e.querySelectorAll(':enabled').length &&
                                              v.push(':enabled', ':disabled'),
                                          (h.appendChild(e).disabled = !0),
                                          2 !== e.querySelectorAll(':disabled').length &&
                                              v.push(':enabled', ':disabled'),
                                          e.querySelectorAll('*,:x'),
                                          v.push(',.*:');
                                  })),
                              (n.matchesSelector = K.test(
                                  (y =
                                      h.matches ||
                                      h.webkitMatchesSelector ||
                                      h.mozMatchesSelector ||
                                      h.oMatchesSelector ||
                                      h.msMatchesSelector),
                              )) &&
                                  le(function(e) {
                                      (n.disconnectedMatch = y.call(e, '*')), y.call(e, "[s!='']:x"), m.push('!=', R);
                                  }),
                              (v = v.length && new RegExp(v.join('|'))),
                              (m = m.length && new RegExp(m.join('|'))),
                              (t = K.test(h.compareDocumentPosition)),
                              (x =
                                  t || K.test(h.contains)
                                      ? function(e, t) {
                                            var n = 9 === e.nodeType ? e.documentElement : e,
                                                r = t && t.parentNode;
                                            return (
                                                e === r ||
                                                !(
                                                    !r ||
                                                    1 !== r.nodeType ||
                                                    !(n.contains
                                                        ? n.contains(r)
                                                        : e.compareDocumentPosition &&
                                                          16 & e.compareDocumentPosition(r))
                                                )
                                            );
                                        }
                                      : function(e, t) {
                                            if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                            return !1;
                                        }),
                              (A = t
                                  ? function(e, t) {
                                        if (e === t) return (d = !0), 0;
                                        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                        return (
                                            r ||
                                            (1 &
                                                (r =
                                                    (e.ownerDocument || e) === (t.ownerDocument || t)
                                                        ? e.compareDocumentPosition(t)
                                                        : 1) ||
                                            (!n.sortDetached && t.compareDocumentPosition(e) === r)
                                                ? e === p || (e.ownerDocument === w && x(w, e))
                                                    ? -1
                                                    : t === p || (t.ownerDocument === w && x(w, t))
                                                    ? 1
                                                    : l
                                                    ? P(l, e) - P(l, t)
                                                    : 0
                                                : 4 & r
                                                ? -1
                                                : 1)
                                        );
                                    }
                                  : function(e, t) {
                                        if (e === t) return (d = !0), 0;
                                        var n,
                                            r = 0,
                                            o = e.parentNode,
                                            i = t.parentNode,
                                            a = [e],
                                            s = [t];
                                        if (!o || !i)
                                            return e === p
                                                ? -1
                                                : t === p
                                                ? 1
                                                : o
                                                ? -1
                                                : i
                                                ? 1
                                                : l
                                                ? P(l, e) - P(l, t)
                                                : 0;
                                        if (o === i) return fe(e, t);
                                        for (n = e; (n = n.parentNode); ) a.unshift(n);
                                        for (n = t; (n = n.parentNode); ) s.unshift(n);
                                        for (; a[r] === s[r]; ) r++;
                                        return r ? fe(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0;
                                    }),
                              p)
                            : p;
                    }),
                    (se.matches = function(e, t) {
                        return se(e, null, null, t);
                    }),
                    (se.matchesSelector = function(e, t) {
                        if (
                            ((e.ownerDocument || e) !== p && f(e),
                            n.matchesSelector && g && !j[t + ' '] && (!m || !m.test(t)) && (!v || !v.test(t)))
                        )
                            try {
                                var r = y.call(e, t);
                                if (r || n.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return r;
                            } catch (e) {
                                j(t, !0);
                            }
                        return se(t, p, null, [e]).length > 0;
                    }),
                    (se.contains = function(e, t) {
                        return (e.ownerDocument || e) !== p && f(e), x(e, t);
                    }),
                    (se.attr = function(e, t) {
                        (e.ownerDocument || e) !== p && f(e);
                        var o = r.attrHandle[t.toLowerCase()],
                            i = o && D.call(r.attrHandle, t.toLowerCase()) ? o(e, t, !g) : void 0;
                        return void 0 !== i
                            ? i
                            : n.attributes || !g
                            ? e.getAttribute(t)
                            : (i = e.getAttributeNode(t)) && i.specified
                            ? i.value
                            : null;
                    }),
                    (se.escape = function(e) {
                        return (e + '').replace(re, oe);
                    }),
                    (se.error = function(e) {
                        throw new Error('Syntax error, unrecognized expression: ' + e);
                    }),
                    (se.uniqueSort = function(e) {
                        var t,
                            r = [],
                            o = 0,
                            i = 0;
                        if (((d = !n.detectDuplicates), (l = !n.sortStable && e.slice(0)), e.sort(A), d)) {
                            for (; (t = e[i++]); ) t === e[i] && (o = r.push(i));
                            for (; o--; ) e.splice(r[o], 1);
                        }
                        return (l = null), e;
                    }),
                    (o = se.getText = function(e) {
                        var t,
                            n = '',
                            r = 0,
                            i = e.nodeType;
                        if (i) {
                            if (1 === i || 9 === i || 11 === i) {
                                if ('string' == typeof e.textContent) return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                            } else if (3 === i || 4 === i) return e.nodeValue;
                        } else for (; (t = e[r++]); ) n += o(t);
                        return n;
                    }),
                    ((r = se.selectors = {
                        cacheLength: 50,
                        createPseudo: ce,
                        match: V,
                        attrHandle: {},
                        find: {},
                        relative: {
                            '>': { dir: 'parentNode', first: !0 },
                            ' ': { dir: 'parentNode' },
                            '+': { dir: 'previousSibling', first: !0 },
                            '~': { dir: 'previousSibling' },
                        },
                        preFilter: {
                            ATTR: function(e) {
                                return (
                                    (e[1] = e[1].replace(te, ne)),
                                    (e[3] = (e[3] || e[4] || e[5] || '').replace(te, ne)),
                                    '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
                                    e.slice(0, 4)
                                );
                            },
                            CHILD: function(e) {
                                return (
                                    (e[1] = e[1].toLowerCase()),
                                    'nth' === e[1].slice(0, 3)
                                        ? (e[3] || se.error(e[0]),
                                          (e[4] = +(e[4]
                                              ? e[5] + (e[6] || 1)
                                              : 2 * ('even' === e[3] || 'odd' === e[3]))),
                                          (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
                                        : e[3] && se.error(e[0]),
                                    e
                                );
                            },
                            PSEUDO: function(e) {
                                var t,
                                    n = !e[6] && e[2];
                                return V.CHILD.test(e[0])
                                    ? null
                                    : (e[3]
                                          ? (e[2] = e[4] || e[5] || '')
                                          : n &&
                                            X.test(n) &&
                                            (t = a(n, !0)) &&
                                            (t = n.indexOf(')', n.length - t) - n.length) &&
                                            ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                                      e.slice(0, 3));
                            },
                        },
                        filter: {
                            TAG: function(e) {
                                var t = e.replace(te, ne).toLowerCase();
                                return '*' === e
                                    ? function() {
                                          return !0;
                                      }
                                    : function(e) {
                                          return e.nodeName && e.nodeName.toLowerCase() === t;
                                      };
                            },
                            CLASS: function(e) {
                                var t = C[e + ' '];
                                return (
                                    t ||
                                    ((t = new RegExp('(^|' + $ + ')' + e + '(' + $ + '|$)')) &&
                                        C(e, function(e) {
                                            return t.test(
                                                ('string' == typeof e.className && e.className) ||
                                                    (void 0 !== e.getAttribute && e.getAttribute('class')) ||
                                                    '',
                                            );
                                        }))
                                );
                            },
                            ATTR: function(e, t, n) {
                                return function(r) {
                                    var o = se.attr(r, e);
                                    return null == o
                                        ? '!=' === t
                                        : !t ||
                                              ((o += ''),
                                              '=' === t
                                                  ? o === n
                                                  : '!=' === t
                                                  ? o !== n
                                                  : '^=' === t
                                                  ? n && 0 === o.indexOf(n)
                                                  : '*=' === t
                                                  ? n && o.indexOf(n) > -1
                                                  : '$=' === t
                                                  ? n && o.slice(-n.length) === n
                                                  : '~=' === t
                                                  ? (' ' + o.replace(W, ' ') + ' ').indexOf(n) > -1
                                                  : '|=' === t && (o === n || o.slice(0, n.length + 1) === n + '-'));
                                };
                            },
                            CHILD: function(e, t, n, r, o) {
                                var i = 'nth' !== e.slice(0, 3),
                                    a = 'last' !== e.slice(-4),
                                    s = 'of-type' === t;
                                return 1 === r && 0 === o
                                    ? function(e) {
                                          return !!e.parentNode;
                                      }
                                    : function(t, n, u) {
                                          var c,
                                              l,
                                              d,
                                              f,
                                              p,
                                              h,
                                              g = i !== a ? 'nextSibling' : 'previousSibling',
                                              v = t.parentNode,
                                              m = s && t.nodeName.toLowerCase(),
                                              y = !u && !s,
                                              x = !1;
                                          if (v) {
                                              if (i) {
                                                  for (; g; ) {
                                                      for (f = t; (f = f[g]); )
                                                          if (s ? f.nodeName.toLowerCase() === m : 1 === f.nodeType)
                                                              return !1;
                                                      h = g = 'only' === e && !h && 'nextSibling';
                                                  }
                                                  return !0;
                                              }
                                              if (((h = [a ? v.firstChild : v.lastChild]), a && y)) {
                                                  for (
                                                      x =
                                                          (p =
                                                              (c =
                                                                  (l =
                                                                      (d = (f = v)[b] || (f[b] = {}))[f.uniqueID] ||
                                                                      (d[f.uniqueID] = {}))[e] || [])[0] === T &&
                                                              c[1]) && c[2],
                                                          f = p && v.childNodes[p];
                                                      (f = (++p && f && f[g]) || (x = p = 0) || h.pop());

                                                  )
                                                      if (1 === f.nodeType && ++x && f === t) {
                                                          l[e] = [T, p, x];
                                                          break;
                                                      }
                                              } else if (
                                                  (y &&
                                                      (x = p =
                                                          (c =
                                                              (l =
                                                                  (d = (f = t)[b] || (f[b] = {}))[f.uniqueID] ||
                                                                  (d[f.uniqueID] = {}))[e] || [])[0] === T && c[1]),
                                                  !1 === x)
                                              )
                                                  for (
                                                      ;
                                                      (f = (++p && f && f[g]) || (x = p = 0) || h.pop()) &&
                                                      ((s ? f.nodeName.toLowerCase() !== m : 1 !== f.nodeType) ||
                                                          !++x ||
                                                          (y &&
                                                              ((l =
                                                                  (d = f[b] || (f[b] = {}))[f.uniqueID] ||
                                                                  (d[f.uniqueID] = {}))[e] = [T, x]),
                                                          f !== t));

                                                  );
                                              return (x -= o) === r || (x % r == 0 && x / r >= 0);
                                          }
                                      };
                            },
                            PSEUDO: function(e, t) {
                                var n,
                                    o =
                                        r.pseudos[e] ||
                                        r.setFilters[e.toLowerCase()] ||
                                        se.error('unsupported pseudo: ' + e);
                                return o[b]
                                    ? o(t)
                                    : o.length > 1
                                    ? ((n = [e, e, '', t]),
                                      r.setFilters.hasOwnProperty(e.toLowerCase())
                                          ? ce(function(e, n) {
                                                for (var r, i = o(e, t), a = i.length; a--; )
                                                    e[(r = P(e, i[a]))] = !(n[r] = i[a]);
                                            })
                                          : function(e) {
                                                return o(e, 0, n);
                                            })
                                    : o;
                            },
                        },
                        pseudos: {
                            not: ce(function(e) {
                                var t = [],
                                    n = [],
                                    r = s(e.replace(B, '$1'));
                                return r[b]
                                    ? ce(function(e, t, n, o) {
                                          for (var i, a = r(e, null, o, []), s = e.length; s--; )
                                              (i = a[s]) && (e[s] = !(t[s] = i));
                                      })
                                    : function(e, o, i) {
                                          return (t[0] = e), r(t, null, i, n), (t[0] = null), !n.pop();
                                      };
                            }),
                            has: ce(function(e) {
                                return function(t) {
                                    return se(e, t).length > 0;
                                };
                            }),
                            contains: ce(function(e) {
                                return (
                                    (e = e.replace(te, ne)),
                                    function(t) {
                                        return (t.textContent || o(t)).indexOf(e) > -1;
                                    }
                                );
                            }),
                            lang: ce(function(e) {
                                return (
                                    Q.test(e || '') || se.error('unsupported lang: ' + e),
                                    (e = e.replace(te, ne).toLowerCase()),
                                    function(t) {
                                        var n;
                                        do {
                                            if ((n = g ? t.lang : t.getAttribute('xml:lang') || t.getAttribute('lang')))
                                                return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + '-');
                                        } while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1;
                                    }
                                );
                            }),
                            target: function(t) {
                                var n = e.location && e.location.hash;
                                return n && n.slice(1) === t.id;
                            },
                            root: function(e) {
                                return e === h;
                            },
                            focus: function(e) {
                                return (
                                    e === p.activeElement &&
                                    (!p.hasFocus || p.hasFocus()) &&
                                    !!(e.type || e.href || ~e.tabIndex)
                                );
                            },
                            enabled: ge(!1),
                            disabled: ge(!0),
                            checked: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return ('input' === t && !!e.checked) || ('option' === t && !!e.selected);
                            },
                            selected: function(e) {
                                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                            },
                            empty: function(e) {
                                for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                                return !0;
                            },
                            parent: function(e) {
                                return !r.pseudos.empty(e);
                            },
                            header: function(e) {
                                return J.test(e.nodeName);
                            },
                            input: function(e) {
                                return Y.test(e.nodeName);
                            },
                            button: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return ('input' === t && 'button' === e.type) || 'button' === t;
                            },
                            text: function(e) {
                                var t;
                                return (
                                    'input' === e.nodeName.toLowerCase() &&
                                    'text' === e.type &&
                                    (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
                                );
                            },
                            first: ve(function() {
                                return [0];
                            }),
                            last: ve(function(e, t) {
                                return [t - 1];
                            }),
                            eq: ve(function(e, t, n) {
                                return [n < 0 ? n + t : n];
                            }),
                            even: ve(function(e, t) {
                                for (var n = 0; n < t; n += 2) e.push(n);
                                return e;
                            }),
                            odd: ve(function(e, t) {
                                for (var n = 1; n < t; n += 2) e.push(n);
                                return e;
                            }),
                            lt: ve(function(e, t, n) {
                                for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; ) e.push(r);
                                return e;
                            }),
                            gt: ve(function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                                return e;
                            }),
                        },
                    }).pseudos.nth = r.pseudos.eq),
                    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                        r.pseudos[t] = pe(t);
                    for (t in { submit: !0, reset: !0 }) r.pseudos[t] = he(t);
                    function ye() {}
                    function xe(e) {
                        for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value;
                        return r;
                    }
                    function be(e, t, n) {
                        var r = t.dir,
                            o = t.next,
                            i = o || r,
                            a = n && 'parentNode' === i,
                            s = k++;
                        return t.first
                            ? function(t, n, o) {
                                  for (; (t = t[r]); ) if (1 === t.nodeType || a) return e(t, n, o);
                                  return !1;
                              }
                            : function(t, n, u) {
                                  var c,
                                      l,
                                      d,
                                      f = [T, s];
                                  if (u) {
                                      for (; (t = t[r]); ) if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
                                  } else
                                      for (; (t = t[r]); )
                                          if (1 === t.nodeType || a)
                                              if (
                                                  ((l = (d = t[b] || (t[b] = {}))[t.uniqueID] || (d[t.uniqueID] = {})),
                                                  o && o === t.nodeName.toLowerCase())
                                              )
                                                  t = t[r] || t;
                                              else {
                                                  if ((c = l[i]) && c[0] === T && c[1] === s) return (f[2] = c[2]);
                                                  if (((l[i] = f), (f[2] = e(t, n, u)))) return !0;
                                              }
                                  return !1;
                              };
                    }
                    function we(e) {
                        return e.length > 1
                            ? function(t, n, r) {
                                  for (var o = e.length; o--; ) if (!e[o](t, n, r)) return !1;
                                  return !0;
                              }
                            : e[0];
                    }
                    function Te(e, t, n, r, o) {
                        for (var i, a = [], s = 0, u = e.length, c = null != t; s < u; s++)
                            (i = e[s]) && ((n && !n(i, r, o)) || (a.push(i), c && t.push(s)));
                        return a;
                    }
                    function ke(e, t, n, r, o, i) {
                        return (
                            r && !r[b] && (r = ke(r)),
                            o && !o[b] && (o = ke(o, i)),
                            ce(function(i, a, s, u) {
                                var c,
                                    l,
                                    d,
                                    f = [],
                                    p = [],
                                    h = a.length,
                                    g =
                                        i ||
                                        (function(e, t, n) {
                                            for (var r = 0, o = t.length; r < o; r++) se(e, t[r], n);
                                            return n;
                                        })(t || '*', s.nodeType ? [s] : s, []),
                                    v = !e || (!i && t) ? g : Te(g, f, e, s, u),
                                    m = n ? (o || (i ? e : h || r) ? [] : a) : v;
                                if ((n && n(v, m, s, u), r))
                                    for (c = Te(m, p), r(c, [], s, u), l = c.length; l--; )
                                        (d = c[l]) && (m[p[l]] = !(v[p[l]] = d));
                                if (i) {
                                    if (o || e) {
                                        if (o) {
                                            for (c = [], l = m.length; l--; ) (d = m[l]) && c.push((v[l] = d));
                                            o(null, (m = []), c, u);
                                        }
                                        for (l = m.length; l--; )
                                            (d = m[l]) && (c = o ? P(i, d) : f[l]) > -1 && (i[c] = !(a[c] = d));
                                    }
                                } else (m = Te(m === a ? m.splice(h, m.length) : m)), o ? o(null, a, m, u) : L.apply(a, m);
                            })
                        );
                    }
                    function Ce(e) {
                        for (
                            var t,
                                n,
                                o,
                                i = e.length,
                                a = r.relative[e[0].type],
                                s = a || r.relative[' '],
                                u = a ? 1 : 0,
                                l = be(
                                    function(e) {
                                        return e === t;
                                    },
                                    s,
                                    !0,
                                ),
                                d = be(
                                    function(e) {
                                        return P(t, e) > -1;
                                    },
                                    s,
                                    !0,
                                ),
                                f = [
                                    function(e, n, r) {
                                        var o = (!a && (r || n !== c)) || ((t = n).nodeType ? l(e, n, r) : d(e, n, r));
                                        return (t = null), o;
                                    },
                                ];
                            u < i;
                            u++
                        )
                            if ((n = r.relative[e[u].type])) f = [be(we(f), n)];
                            else {
                                if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                                    for (o = ++u; o < i && !r.relative[e[o].type]; o++);
                                    return ke(
                                        u > 1 && we(f),
                                        u > 1 &&
                                            xe(
                                                e.slice(0, u - 1).concat({ value: ' ' === e[u - 2].type ? '*' : '' }),
                                            ).replace(B, '$1'),
                                        n,
                                        u < o && Ce(e.slice(u, o)),
                                        o < i && Ce((e = e.slice(o))),
                                        o < i && xe(e),
                                    );
                                }
                                f.push(n);
                            }
                        return we(f);
                    }
                    return (
                        (ye.prototype = r.filters = r.pseudos),
                        (r.setFilters = new ye()),
                        (a = se.tokenize = function(e, t) {
                            var n,
                                o,
                                i,
                                a,
                                s,
                                u,
                                c,
                                l = S[e + ' '];
                            if (l) return t ? 0 : l.slice(0);
                            for (s = e, u = [], c = r.preFilter; s; ) {
                                for (a in ((n && !(o = F.exec(s))) ||
                                    (o && (s = s.slice(o[0].length) || s), u.push((i = []))),
                                (n = !1),
                                (o = U.exec(s)) &&
                                    ((n = o.shift()),
                                    i.push({ value: n, type: o[0].replace(B, ' ') }),
                                    (s = s.slice(n.length))),
                                r.filter))
                                    !(o = V[a].exec(s)) ||
                                        (c[a] && !(o = c[a](o))) ||
                                        ((n = o.shift()),
                                        i.push({ value: n, type: a, matches: o }),
                                        (s = s.slice(n.length)));
                                if (!n) break;
                            }
                            return t ? s.length : s ? se.error(e) : S(e, u).slice(0);
                        }),
                        (s = se.compile = function(e, t) {
                            var n,
                                o = [],
                                i = [],
                                s = E[e + ' '];
                            if (!s) {
                                for (t || (t = a(e)), n = t.length; n--; ) (s = Ce(t[n]))[b] ? o.push(s) : i.push(s);
                                (s = E(
                                    e,
                                    (function(e, t) {
                                        var n = t.length > 0,
                                            o = e.length > 0,
                                            i = function(i, a, s, u, l) {
                                                var d,
                                                    h,
                                                    v,
                                                    m = 0,
                                                    y = '0',
                                                    x = i && [],
                                                    b = [],
                                                    w = c,
                                                    k = i || (o && r.find.TAG('*', l)),
                                                    C = (T += null == w ? 1 : Math.random() || 0.1),
                                                    S = k.length;
                                                for (l && (c = a === p || a || l); y !== S && null != (d = k[y]); y++) {
                                                    if (o && d) {
                                                        for (
                                                            h = 0, a || d.ownerDocument === p || (f(d), (s = !g));
                                                            (v = e[h++]);

                                                        )
                                                            if (v(d, a || p, s)) {
                                                                u.push(d);
                                                                break;
                                                            }
                                                        l && (T = C);
                                                    }
                                                    n && ((d = !v && d) && m--, i && x.push(d));
                                                }
                                                if (((m += y), n && y !== m)) {
                                                    for (h = 0; (v = t[h++]); ) v(x, b, a, s);
                                                    if (i) {
                                                        if (m > 0) for (; y--; ) x[y] || b[y] || (b[y] = q.call(u));
                                                        b = Te(b);
                                                    }
                                                    L.apply(u, b),
                                                        l && !i && b.length > 0 && m + t.length > 1 && se.uniqueSort(u);
                                                }
                                                return l && ((T = C), (c = w)), x;
                                            };
                                        return n ? ce(i) : i;
                                    })(i, o),
                                )).selector = e;
                            }
                            return s;
                        }),
                        (u = se.select = function(e, t, n, o) {
                            var i,
                                u,
                                c,
                                l,
                                d,
                                f = 'function' == typeof e && e,
                                p = !o && a((e = f.selector || e));
                            if (((n = n || []), 1 === p.length)) {
                                if (
                                    (u = p[0] = p[0].slice(0)).length > 2 &&
                                    'ID' === (c = u[0]).type &&
                                    9 === t.nodeType &&
                                    g &&
                                    r.relative[u[1].type]
                                ) {
                                    if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
                                    f && (t = t.parentNode), (e = e.slice(u.shift().value.length));
                                }
                                for (
                                    i = V.needsContext.test(e) ? 0 : u.length;
                                    i-- && ((c = u[i]), !r.relative[(l = c.type)]);

                                )
                                    if (
                                        (d = r.find[l]) &&
                                        (o = d(
                                            c.matches[0].replace(te, ne),
                                            (ee.test(u[0].type) && me(t.parentNode)) || t,
                                        ))
                                    ) {
                                        if ((u.splice(i, 1), !(e = o.length && xe(u)))) return L.apply(n, o), n;
                                        break;
                                    }
                            }
                            return (f || s(e, p))(o, t, !g, n, !t || (ee.test(e) && me(t.parentNode)) || t), n;
                        }),
                        (n.sortStable =
                            b
                                .split('')
                                .sort(A)
                                .join('') === b),
                        (n.detectDuplicates = !!d),
                        f(),
                        (n.sortDetached = le(function(e) {
                            return 1 & e.compareDocumentPosition(p.createElement('fieldset'));
                        })),
                        le(function(e) {
                            return (e.innerHTML = "<a href='#'></a>"), '#' === e.firstChild.getAttribute('href');
                        }) ||
                            de('type|href|height|width', function(e, t, n) {
                                if (!n) return e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
                            }),
                        (n.attributes &&
                            le(function(e) {
                                return (
                                    (e.innerHTML = '<input/>'),
                                    e.firstChild.setAttribute('value', ''),
                                    '' === e.firstChild.getAttribute('value')
                                );
                            })) ||
                            de('value', function(e, t, n) {
                                if (!n && 'input' === e.nodeName.toLowerCase()) return e.defaultValue;
                            }),
                        le(function(e) {
                            return null == e.getAttribute('disabled');
                        }) ||
                            de(O, function(e, t, n) {
                                var r;
                                if (!n)
                                    return !0 === e[t]
                                        ? t.toLowerCase()
                                        : (r = e.getAttributeNode(t)) && r.specified
                                        ? r.value
                                        : null;
                            }),
                        se
                    );
                })(n);
            (k.find = E),
                (k.expr = E.selectors),
                (k.expr[':'] = k.expr.pseudos),
                (k.uniqueSort = k.unique = E.uniqueSort),
                (k.text = E.getText),
                (k.isXMLDoc = E.isXML),
                (k.contains = E.contains),
                (k.escapeSelector = E.escape);
            var j = function(e, t, n) {
                    for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                        if (1 === e.nodeType) {
                            if (o && k(e).is(n)) break;
                            r.push(e);
                        }
                    return r;
                },
                A = function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n;
                },
                D = k.expr.match.needsContext;
            function N(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            }
            var q = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            function _(e, t, n) {
                return y(t)
                    ? k.grep(e, function(e, r) {
                          return !!t.call(e, r, e) !== n;
                      })
                    : t.nodeType
                    ? k.grep(e, function(e) {
                          return (e === t) !== n;
                      })
                    : 'string' != typeof t
                    ? k.grep(e, function(e) {
                          return d.call(t, e) > -1 !== n;
                      })
                    : k.filter(t, e, n);
            }
            (k.filter = function(e, t, n) {
                var r = t[0];
                return (
                    n && (e = ':not(' + e + ')'),
                    1 === t.length && 1 === r.nodeType
                        ? k.find.matchesSelector(r, e)
                            ? [r]
                            : []
                        : k.find.matches(
                              e,
                              k.grep(t, function(e) {
                                  return 1 === e.nodeType;
                              }),
                          )
                );
            }),
                k.fn.extend({
                    find: function(e) {
                        var t,
                            n,
                            r = this.length,
                            o = this;
                        if ('string' != typeof e)
                            return this.pushStack(
                                k(e).filter(function() {
                                    for (t = 0; t < r; t++) if (k.contains(o[t], this)) return !0;
                                }),
                            );
                        for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, o[t], n);
                        return r > 1 ? k.uniqueSort(n) : n;
                    },
                    filter: function(e) {
                        return this.pushStack(_(this, e || [], !1));
                    },
                    not: function(e) {
                        return this.pushStack(_(this, e || [], !0));
                    },
                    is: function(e) {
                        return !!_(this, 'string' == typeof e && D.test(e) ? k(e) : e || [], !1).length;
                    },
                });
            var L,
                I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            ((k.fn.init = function(e, t, n) {
                var r, o;
                if (!e) return this;
                if (((n = n || L), 'string' == typeof e)) {
                    if (
                        !(r = '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3 ? [null, e, null] : I.exec(e)) ||
                        (!r[1] && t)
                    )
                        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (
                            ((t = t instanceof k ? t[0] : t),
                            k.merge(this, k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : a, !0)),
                            q.test(r[1]) && k.isPlainObject(t))
                        )
                            for (r in t) y(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this;
                    }
                    return (o = a.getElementById(r[2])) && ((this[0] = o), (this.length = 1)), this;
                }
                return e.nodeType
                    ? ((this[0] = e), (this.length = 1), this)
                    : y(e)
                    ? void 0 !== n.ready
                        ? n.ready(e)
                        : e(k)
                    : k.makeArray(e, this);
            }).prototype = k.fn),
                (L = k(a));
            var P = /^(?:parents|prev(?:Until|All))/,
                O = { children: !0, contents: !0, next: !0, prev: !0 };
            function $(e, t) {
                for (; (e = e[t]) && 1 !== e.nodeType; );
                return e;
            }
            k.fn.extend({
                has: function(e) {
                    var t = k(e, this),
                        n = t.length;
                    return this.filter(function() {
                        for (var e = 0; e < n; e++) if (k.contains(this, t[e])) return !0;
                    });
                },
                closest: function(e, t) {
                    var n,
                        r = 0,
                        o = this.length,
                        i = [],
                        a = 'string' != typeof e && k(e);
                    if (!D.test(e))
                        for (; r < o; r++)
                            for (n = this[r]; n && n !== t; n = n.parentNode)
                                if (
                                    n.nodeType < 11 &&
                                    (a ? a.index(n) > -1 : 1 === n.nodeType && k.find.matchesSelector(n, e))
                                ) {
                                    i.push(n);
                                    break;
                                }
                    return this.pushStack(i.length > 1 ? k.uniqueSort(i) : i);
                },
                index: function(e) {
                    return e
                        ? 'string' == typeof e
                            ? d.call(k(e), this[0])
                            : d.call(this, e.jquery ? e[0] : e)
                        : this[0] && this[0].parentNode
                        ? this.first().prevAll().length
                        : -1;
                },
                add: function(e, t) {
                    return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))));
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                },
            }),
                k.each(
                    {
                        parent: function(e) {
                            var t = e.parentNode;
                            return t && 11 !== t.nodeType ? t : null;
                        },
                        parents: function(e) {
                            return j(e, 'parentNode');
                        },
                        parentsUntil: function(e, t, n) {
                            return j(e, 'parentNode', n);
                        },
                        next: function(e) {
                            return $(e, 'nextSibling');
                        },
                        prev: function(e) {
                            return $(e, 'previousSibling');
                        },
                        nextAll: function(e) {
                            return j(e, 'nextSibling');
                        },
                        prevAll: function(e) {
                            return j(e, 'previousSibling');
                        },
                        nextUntil: function(e, t, n) {
                            return j(e, 'nextSibling', n);
                        },
                        prevUntil: function(e, t, n) {
                            return j(e, 'previousSibling', n);
                        },
                        siblings: function(e) {
                            return A((e.parentNode || {}).firstChild, e);
                        },
                        children: function(e) {
                            return A(e.firstChild);
                        },
                        contents: function(e) {
                            return void 0 !== e.contentDocument
                                ? e.contentDocument
                                : (N(e, 'template') && (e = e.content || e), k.merge([], e.childNodes));
                        },
                    },
                    function(e, t) {
                        k.fn[e] = function(n, r) {
                            var o = k.map(this, t, n);
                            return (
                                'Until' !== e.slice(-5) && (r = n),
                                r && 'string' == typeof r && (o = k.filter(r, o)),
                                this.length > 1 && (O[e] || k.uniqueSort(o), P.test(e) && o.reverse()),
                                this.pushStack(o)
                            );
                        };
                    },
                );
            var H = /[^\x20\t\r\n\f]+/g;
            function M(e) {
                return e;
            }
            function R(e) {
                throw e;
            }
            function W(e, t, n, r) {
                var o;
                try {
                    e && y((o = e.promise))
                        ? o
                              .call(e)
                              .done(t)
                              .fail(n)
                        : e && y((o = e.then))
                        ? o.call(e, t, n)
                        : t.apply(void 0, [e].slice(r));
                } catch (e) {
                    n.apply(void 0, [e]);
                }
            }
            (k.Callbacks = function(e) {
                e =
                    'string' == typeof e
                        ? (function(e) {
                              var t = {};
                              return (
                                  k.each(e.match(H) || [], function(e, n) {
                                      t[n] = !0;
                                  }),
                                  t
                              );
                          })(e)
                        : k.extend({}, e);
                var t,
                    n,
                    r,
                    o,
                    i = [],
                    a = [],
                    s = -1,
                    u = function() {
                        for (o = o || e.once, r = t = !0; a.length; s = -1)
                            for (n = a.shift(); ++s < i.length; )
                                !1 === i[s].apply(n[0], n[1]) && e.stopOnFalse && ((s = i.length), (n = !1));
                        e.memory || (n = !1), (t = !1), o && (i = n ? [] : '');
                    },
                    c = {
                        add: function() {
                            return (
                                i &&
                                    (n && !t && ((s = i.length - 1), a.push(n)),
                                    (function t(n) {
                                        k.each(n, function(n, r) {
                                            y(r)
                                                ? (e.unique && c.has(r)) || i.push(r)
                                                : r && r.length && 'string' !== T(r) && t(r);
                                        });
                                    })(arguments),
                                    n && !t && u()),
                                this
                            );
                        },
                        remove: function() {
                            return (
                                k.each(arguments, function(e, t) {
                                    for (var n; (n = k.inArray(t, i, n)) > -1; ) i.splice(n, 1), n <= s && s--;
                                }),
                                this
                            );
                        },
                        has: function(e) {
                            return e ? k.inArray(e, i) > -1 : i.length > 0;
                        },
                        empty: function() {
                            return i && (i = []), this;
                        },
                        disable: function() {
                            return (o = a = []), (i = n = ''), this;
                        },
                        disabled: function() {
                            return !i;
                        },
                        lock: function() {
                            return (o = a = []), n || t || (i = n = ''), this;
                        },
                        locked: function() {
                            return !!o;
                        },
                        fireWith: function(e, n) {
                            return o || ((n = [e, (n = n || []).slice ? n.slice() : n]), a.push(n), t || u()), this;
                        },
                        fire: function() {
                            return c.fireWith(this, arguments), this;
                        },
                        fired: function() {
                            return !!r;
                        },
                    };
                return c;
            }),
                k.extend({
                    Deferred: function(e) {
                        var t = [
                                ['notify', 'progress', k.Callbacks('memory'), k.Callbacks('memory'), 2],
                                [
                                    'resolve',
                                    'done',
                                    k.Callbacks('once memory'),
                                    k.Callbacks('once memory'),
                                    0,
                                    'resolved',
                                ],
                                [
                                    'reject',
                                    'fail',
                                    k.Callbacks('once memory'),
                                    k.Callbacks('once memory'),
                                    1,
                                    'rejected',
                                ],
                            ],
                            r = 'pending',
                            o = {
                                state: function() {
                                    return r;
                                },
                                always: function() {
                                    return i.done(arguments).fail(arguments), this;
                                },
                                catch: function(e) {
                                    return o.then(null, e);
                                },
                                pipe: function() {
                                    var e = arguments;
                                    return k
                                        .Deferred(function(n) {
                                            k.each(t, function(t, r) {
                                                var o = y(e[r[4]]) && e[r[4]];
                                                i[r[1]](function() {
                                                    var e = o && o.apply(this, arguments);
                                                    e && y(e.promise)
                                                        ? e
                                                              .promise()
                                                              .progress(n.notify)
                                                              .done(n.resolve)
                                                              .fail(n.reject)
                                                        : n[r[0] + 'With'](this, o ? [e] : arguments);
                                                });
                                            }),
                                                (e = null);
                                        })
                                        .promise();
                                },
                                then: function(e, r, o) {
                                    var i = 0;
                                    function a(e, t, r, o) {
                                        return function() {
                                            var s = this,
                                                u = arguments,
                                                c = function() {
                                                    var n, c;
                                                    if (!(e < i)) {
                                                        if ((n = r.apply(s, u)) === t.promise())
                                                            throw new TypeError('Thenable self-resolution');
                                                        (c =
                                                            n &&
                                                            ('object' == typeof n || 'function' == typeof n) &&
                                                            n.then),
                                                            y(c)
                                                                ? o
                                                                    ? c.call(n, a(i, t, M, o), a(i, t, R, o))
                                                                    : (i++,
                                                                      c.call(
                                                                          n,
                                                                          a(i, t, M, o),
                                                                          a(i, t, R, o),
                                                                          a(i, t, M, t.notifyWith),
                                                                      ))
                                                                : (r !== M && ((s = void 0), (u = [n])),
                                                                  (o || t.resolveWith)(s, u));
                                                    }
                                                },
                                                l = o
                                                    ? c
                                                    : function() {
                                                          try {
                                                              c();
                                                          } catch (n) {
                                                              k.Deferred.exceptionHook &&
                                                                  k.Deferred.exceptionHook(n, l.stackTrace),
                                                                  e + 1 >= i &&
                                                                      (r !== R && ((s = void 0), (u = [n])),
                                                                      t.rejectWith(s, u));
                                                          }
                                                      };
                                            e
                                                ? l()
                                                : (k.Deferred.getStackHook &&
                                                      (l.stackTrace = k.Deferred.getStackHook()),
                                                  n.setTimeout(l));
                                        };
                                    }
                                    return k
                                        .Deferred(function(n) {
                                            t[0][3].add(a(0, n, y(o) ? o : M, n.notifyWith)),
                                                t[1][3].add(a(0, n, y(e) ? e : M)),
                                                t[2][3].add(a(0, n, y(r) ? r : R));
                                        })
                                        .promise();
                                },
                                promise: function(e) {
                                    return null != e ? k.extend(e, o) : o;
                                },
                            },
                            i = {};
                        return (
                            k.each(t, function(e, n) {
                                var a = n[2],
                                    s = n[5];
                                (o[n[1]] = a.add),
                                    s &&
                                        a.add(
                                            function() {
                                                r = s;
                                            },
                                            t[3 - e][2].disable,
                                            t[3 - e][3].disable,
                                            t[0][2].lock,
                                            t[0][3].lock,
                                        ),
                                    a.add(n[3].fire),
                                    (i[n[0]] = function() {
                                        return i[n[0] + 'With'](this === i ? void 0 : this, arguments), this;
                                    }),
                                    (i[n[0] + 'With'] = a.fireWith);
                            }),
                            o.promise(i),
                            e && e.call(i, i),
                            i
                        );
                    },
                    when: function(e) {
                        var t = arguments.length,
                            n = t,
                            r = Array(n),
                            o = u.call(arguments),
                            i = k.Deferred(),
                            a = function(e) {
                                return function(n) {
                                    (r[e] = this),
                                        (o[e] = arguments.length > 1 ? u.call(arguments) : n),
                                        --t || i.resolveWith(r, o);
                                };
                            };
                        if (
                            t <= 1 &&
                            (W(e, i.done(a(n)).resolve, i.reject, !t), 'pending' === i.state() || y(o[n] && o[n].then))
                        )
                            return i.then();
                        for (; n--; ) W(o[n], a(n), i.reject);
                        return i.promise();
                    },
                });
            var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            (k.Deferred.exceptionHook = function(e, t) {
                n.console &&
                    n.console.warn &&
                    e &&
                    B.test(e.name) &&
                    n.console.warn('jQuery.Deferred exception: ' + e.message, e.stack, t);
            }),
                (k.readyException = function(e) {
                    n.setTimeout(function() {
                        throw e;
                    });
                });
            var F = k.Deferred();
            function U() {
                a.removeEventListener('DOMContentLoaded', U), n.removeEventListener('load', U), k.ready();
            }
            (k.fn.ready = function(e) {
                return (
                    F.then(e).catch(function(e) {
                        k.readyException(e);
                    }),
                    this
                );
            }),
                k.extend({
                    isReady: !1,
                    readyWait: 1,
                    ready: function(e) {
                        (!0 === e ? --k.readyWait : k.isReady) ||
                            ((k.isReady = !0), (!0 !== e && --k.readyWait > 0) || F.resolveWith(a, [k]));
                    },
                }),
                (k.ready.then = F.then),
                'complete' === a.readyState || ('loading' !== a.readyState && !a.documentElement.doScroll)
                    ? n.setTimeout(k.ready)
                    : (a.addEventListener('DOMContentLoaded', U), n.addEventListener('load', U));
            var z = function(e, t, n, r, o, i, a) {
                    var s = 0,
                        u = e.length,
                        c = null == n;
                    if ('object' === T(n)) for (s in ((o = !0), n)) z(e, t, s, n[s], !0, i, a);
                    else if (
                        void 0 !== r &&
                        ((o = !0),
                        y(r) || (a = !0),
                        c &&
                            (a
                                ? (t.call(e, r), (t = null))
                                : ((c = t),
                                  (t = function(e, t, n) {
                                      return c.call(k(e), n);
                                  }))),
                        t)
                    )
                        for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                    return o ? e : c ? t.call(e) : u ? t(e[0], n) : i;
                },
                X = /^-ms-/,
                Q = /-([a-z])/g;
            function V(e, t) {
                return t.toUpperCase();
            }
            function G(e) {
                return e.replace(X, 'ms-').replace(Q, V);
            }
            var Y = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
            function J() {
                this.expando = k.expando + J.uid++;
            }
            (J.uid = 1),
                (J.prototype = {
                    cache: function(e) {
                        var t = e[this.expando];
                        return (
                            t ||
                                ((t = {}),
                                Y(e) &&
                                    (e.nodeType
                                        ? (e[this.expando] = t)
                                        : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))),
                            t
                        );
                    },
                    set: function(e, t, n) {
                        var r,
                            o = this.cache(e);
                        if ('string' == typeof t) o[G(t)] = n;
                        else for (r in t) o[G(r)] = t[r];
                        return o;
                    },
                    get: function(e, t) {
                        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)];
                    },
                    access: function(e, t, n) {
                        return void 0 === t || (t && 'string' == typeof t && void 0 === n)
                            ? this.get(e, t)
                            : (this.set(e, t, n), void 0 !== n ? n : t);
                    },
                    remove: function(e, t) {
                        var n,
                            r = e[this.expando];
                        if (void 0 !== r) {
                            if (void 0 !== t) {
                                n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(H) || []).length;
                                for (; n--; ) delete r[t[n]];
                            }
                            (void 0 === t || k.isEmptyObject(r)) &&
                                (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                        }
                    },
                    hasData: function(e) {
                        var t = e[this.expando];
                        return void 0 !== t && !k.isEmptyObject(t);
                    },
                });
            var K = new J(),
                Z = new J(),
                ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                te = /[A-Z]/g;
            function ne(e, t, n) {
                var r;
                if (void 0 === n && 1 === e.nodeType)
                    if (
                        ((r = 'data-' + t.replace(te, '-$&').toLowerCase()), 'string' == typeof (n = e.getAttribute(r)))
                    ) {
                        try {
                            n = (function(e) {
                                return (
                                    'true' === e ||
                                    ('false' !== e &&
                                        ('null' === e ? null : e === +e + '' ? +e : ee.test(e) ? JSON.parse(e) : e))
                                );
                            })(n);
                        } catch (e) {}
                        Z.set(e, t, n);
                    } else n = void 0;
                return n;
            }
            k.extend({
                hasData: function(e) {
                    return Z.hasData(e) || K.hasData(e);
                },
                data: function(e, t, n) {
                    return Z.access(e, t, n);
                },
                removeData: function(e, t) {
                    Z.remove(e, t);
                },
                _data: function(e, t, n) {
                    return K.access(e, t, n);
                },
                _removeData: function(e, t) {
                    K.remove(e, t);
                },
            }),
                k.fn.extend({
                    data: function(e, t) {
                        var n,
                            r,
                            o,
                            i = this[0],
                            a = i && i.attributes;
                        if (void 0 === e) {
                            if (this.length && ((o = Z.get(i)), 1 === i.nodeType && !K.get(i, 'hasDataAttrs'))) {
                                for (n = a.length; n--; )
                                    a[n] &&
                                        0 === (r = a[n].name).indexOf('data-') &&
                                        ((r = G(r.slice(5))), ne(i, r, o[r]));
                                K.set(i, 'hasDataAttrs', !0);
                            }
                            return o;
                        }
                        return 'object' == typeof e
                            ? this.each(function() {
                                  Z.set(this, e);
                              })
                            : z(
                                  this,
                                  function(t) {
                                      var n;
                                      if (i && void 0 === t)
                                          return void 0 !== (n = Z.get(i, e)) || void 0 !== (n = ne(i, e)) ? n : void 0;
                                      this.each(function() {
                                          Z.set(this, e, t);
                                      });
                                  },
                                  null,
                                  t,
                                  arguments.length > 1,
                                  null,
                                  !0,
                              );
                    },
                    removeData: function(e) {
                        return this.each(function() {
                            Z.remove(this, e);
                        });
                    },
                }),
                k.extend({
                    queue: function(e, t, n) {
                        var r;
                        if (e)
                            return (
                                (t = (t || 'fx') + 'queue'),
                                (r = K.get(e, t)),
                                n && (!r || Array.isArray(n) ? (r = K.access(e, t, k.makeArray(n))) : r.push(n)),
                                r || []
                            );
                    },
                    dequeue: function(e, t) {
                        t = t || 'fx';
                        var n = k.queue(e, t),
                            r = n.length,
                            o = n.shift(),
                            i = k._queueHooks(e, t);
                        'inprogress' === o && ((o = n.shift()), r--),
                            o &&
                                ('fx' === t && n.unshift('inprogress'),
                                delete i.stop,
                                o.call(
                                    e,
                                    function() {
                                        k.dequeue(e, t);
                                    },
                                    i,
                                )),
                            !r && i && i.empty.fire();
                    },
                    _queueHooks: function(e, t) {
                        var n = t + 'queueHooks';
                        return (
                            K.get(e, n) ||
                            K.access(e, n, {
                                empty: k.Callbacks('once memory').add(function() {
                                    K.remove(e, [t + 'queue', n]);
                                }),
                            })
                        );
                    },
                }),
                k.fn.extend({
                    queue: function(e, t) {
                        var n = 2;
                        return (
                            'string' != typeof e && ((t = e), (e = 'fx'), n--),
                            arguments.length < n
                                ? k.queue(this[0], e)
                                : void 0 === t
                                ? this
                                : this.each(function() {
                                      var n = k.queue(this, e, t);
                                      k._queueHooks(this, e), 'fx' === e && 'inprogress' !== n[0] && k.dequeue(this, e);
                                  })
                        );
                    },
                    dequeue: function(e) {
                        return this.each(function() {
                            k.dequeue(this, e);
                        });
                    },
                    clearQueue: function(e) {
                        return this.queue(e || 'fx', []);
                    },
                    promise: function(e, t) {
                        var n,
                            r = 1,
                            o = k.Deferred(),
                            i = this,
                            a = this.length,
                            s = function() {
                                --r || o.resolveWith(i, [i]);
                            };
                        for ('string' != typeof e && ((t = e), (e = void 0)), e = e || 'fx'; a--; )
                            (n = K.get(i[a], e + 'queueHooks')) && n.empty && (r++, n.empty.add(s));
                        return s(), o.promise(t);
                    },
                });
            var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                oe = new RegExp('^(?:([+-])=|)(' + re + ')([a-z%]*)$', 'i'),
                ie = ['Top', 'Right', 'Bottom', 'Left'],
                ae = a.documentElement,
                se = function(e) {
                    return k.contains(e.ownerDocument, e);
                },
                ue = { composed: !0 };
            ae.getRootNode &&
                (se = function(e) {
                    return k.contains(e.ownerDocument, e) || e.getRootNode(ue) === e.ownerDocument;
                });
            var ce = function(e, t) {
                    return (
                        'none' === (e = t || e).style.display ||
                        ('' === e.style.display && se(e) && 'none' === k.css(e, 'display'))
                    );
                },
                le = function(e, t, n, r) {
                    var o,
                        i,
                        a = {};
                    for (i in t) (a[i] = e.style[i]), (e.style[i] = t[i]);
                    for (i in ((o = n.apply(e, r || [])), t)) e.style[i] = a[i];
                    return o;
                };
            function de(e, t, n, r) {
                var o,
                    i,
                    a = 20,
                    s = r
                        ? function() {
                              return r.cur();
                          }
                        : function() {
                              return k.css(e, t, '');
                          },
                    u = s(),
                    c = (n && n[3]) || (k.cssNumber[t] ? '' : 'px'),
                    l = e.nodeType && (k.cssNumber[t] || ('px' !== c && +u)) && oe.exec(k.css(e, t));
                if (l && l[3] !== c) {
                    for (u /= 2, c = c || l[3], l = +u || 1; a--; )
                        k.style(e, t, l + c), (1 - i) * (1 - (i = s() / u || 0.5)) <= 0 && (a = 0), (l /= i);
                    (l *= 2), k.style(e, t, l + c), (n = n || []);
                }
                return (
                    n &&
                        ((l = +l || +u || 0),
                        (o = n[1] ? l + (n[1] + 1) * n[2] : +n[2]),
                        r && ((r.unit = c), (r.start = l), (r.end = o))),
                    o
                );
            }
            var fe = {};
            function pe(e) {
                var t,
                    n = e.ownerDocument,
                    r = e.nodeName,
                    o = fe[r];
                return (
                    o ||
                    ((t = n.body.appendChild(n.createElement(r))),
                    (o = k.css(t, 'display')),
                    t.parentNode.removeChild(t),
                    'none' === o && (o = 'block'),
                    (fe[r] = o),
                    o)
                );
            }
            function he(e, t) {
                for (var n, r, o = [], i = 0, a = e.length; i < a; i++)
                    (r = e[i]).style &&
                        ((n = r.style.display),
                        t
                            ? ('none' === n && ((o[i] = K.get(r, 'display') || null), o[i] || (r.style.display = '')),
                              '' === r.style.display && ce(r) && (o[i] = pe(r)))
                            : 'none' !== n && ((o[i] = 'none'), K.set(r, 'display', n)));
                for (i = 0; i < a; i++) null != o[i] && (e[i].style.display = o[i]);
                return e;
            }
            k.fn.extend({
                show: function() {
                    return he(this, !0);
                },
                hide: function() {
                    return he(this);
                },
                toggle: function(e) {
                    return 'boolean' == typeof e
                        ? e
                            ? this.show()
                            : this.hide()
                        : this.each(function() {
                              ce(this) ? k(this).show() : k(this).hide();
                          });
                },
            });
            var ge = /^(?:checkbox|radio)$/i,
                ve = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                me = /^$|^module$|\/(?:java|ecma)script/i,
                ye = {
                    option: [1, "<select multiple='multiple'>", '</select>'],
                    thead: [1, '<table>', '</table>'],
                    col: [2, '<table><colgroup>', '</colgroup></table>'],
                    tr: [2, '<table><tbody>', '</tbody></table>'],
                    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
                    _default: [0, '', ''],
                };
            function xe(e, t) {
                var n;
                return (
                    (n =
                        void 0 !== e.getElementsByTagName
                            ? e.getElementsByTagName(t || '*')
                            : void 0 !== e.querySelectorAll
                            ? e.querySelectorAll(t || '*')
                            : []),
                    void 0 === t || (t && N(e, t)) ? k.merge([e], n) : n
                );
            }
            function be(e, t) {
                for (var n = 0, r = e.length; n < r; n++) K.set(e[n], 'globalEval', !t || K.get(t[n], 'globalEval'));
            }
            (ye.optgroup = ye.option), (ye.tbody = ye.tfoot = ye.colgroup = ye.caption = ye.thead), (ye.th = ye.td);
            var we,
                Te,
                ke = /<|&#?\w+;/;
            function Ce(e, t, n, r, o) {
                for (var i, a, s, u, c, l, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
                    if ((i = e[p]) || 0 === i)
                        if ('object' === T(i)) k.merge(f, i.nodeType ? [i] : i);
                        else if (ke.test(i)) {
                            for (
                                a = a || d.appendChild(t.createElement('div')),
                                    s = (ve.exec(i) || ['', ''])[1].toLowerCase(),
                                    u = ye[s] || ye._default,
                                    a.innerHTML = u[1] + k.htmlPrefilter(i) + u[2],
                                    l = u[0];
                                l--;

                            )
                                a = a.lastChild;
                            k.merge(f, a.childNodes), ((a = d.firstChild).textContent = '');
                        } else f.push(t.createTextNode(i));
                for (d.textContent = '', p = 0; (i = f[p++]); )
                    if (r && k.inArray(i, r) > -1) o && o.push(i);
                    else if (((c = se(i)), (a = xe(d.appendChild(i), 'script')), c && be(a), n))
                        for (l = 0; (i = a[l++]); ) me.test(i.type || '') && n.push(i);
                return d;
            }
            (we = a.createDocumentFragment().appendChild(a.createElement('div'))),
                (Te = a.createElement('input')).setAttribute('type', 'radio'),
                Te.setAttribute('checked', 'checked'),
                Te.setAttribute('name', 't'),
                we.appendChild(Te),
                (m.checkClone = we.cloneNode(!0).cloneNode(!0).lastChild.checked),
                (we.innerHTML = '<textarea>x</textarea>'),
                (m.noCloneChecked = !!we.cloneNode(!0).lastChild.defaultValue);
            var Se = /^key/,
                Ee = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                je = /^([^.]*)(?:\.(.+)|)/;
            function Ae() {
                return !0;
            }
            function De() {
                return !1;
            }
            function Ne(e, t) {
                return (
                    (e ===
                        (function() {
                            try {
                                return a.activeElement;
                            } catch (e) {}
                        })()) ==
                    ('focus' === t)
                );
            }
            function qe(e, t, n, r, o, i) {
                var a, s;
                if ('object' == typeof t) {
                    for (s in ('string' != typeof n && ((r = r || n), (n = void 0)), t)) qe(e, s, n, r, t[s], i);
                    return e;
                }
                if (
                    (null == r && null == o
                        ? ((o = n), (r = n = void 0))
                        : null == o &&
                          ('string' == typeof n ? ((o = r), (r = void 0)) : ((o = r), (r = n), (n = void 0))),
                    !1 === o)
                )
                    o = De;
                else if (!o) return e;
                return (
                    1 === i &&
                        ((a = o),
                        ((o = function(e) {
                            return k().off(e), a.apply(this, arguments);
                        }).guid = a.guid || (a.guid = k.guid++))),
                    e.each(function() {
                        k.event.add(this, t, o, r, n);
                    })
                );
            }
            function _e(e, t, n) {
                n
                    ? (K.set(e, t, !1),
                      k.event.add(e, t, {
                          namespace: !1,
                          handler: function(e) {
                              var r,
                                  o,
                                  i = K.get(this, t);
                              if (1 & e.isTrigger && this[t]) {
                                  if (i.length) (k.event.special[t] || {}).delegateType && e.stopPropagation();
                                  else if (
                                      ((i = u.call(arguments)),
                                      K.set(this, t, i),
                                      (r = n(this, t)),
                                      this[t](),
                                      i !== (o = K.get(this, t)) || r ? K.set(this, t, !1) : (o = {}),
                                      i !== o)
                                  )
                                      return e.stopImmediatePropagation(), e.preventDefault(), o.value;
                              } else
                                  i.length &&
                                      (K.set(this, t, {
                                          value: k.event.trigger(k.extend(i[0], k.Event.prototype), i.slice(1), this),
                                      }),
                                      e.stopImmediatePropagation());
                          },
                      }))
                    : void 0 === K.get(e, t) && k.event.add(e, t, Ae);
            }
            (k.event = {
                global: {},
                add: function(e, t, n, r, o) {
                    var i,
                        a,
                        s,
                        u,
                        c,
                        l,
                        d,
                        f,
                        p,
                        h,
                        g,
                        v = K.get(e);
                    if (v)
                        for (
                            n.handler && ((n = (i = n).handler), (o = i.selector)),
                                o && k.find.matchesSelector(ae, o),
                                n.guid || (n.guid = k.guid++),
                                (u = v.events) || (u = v.events = {}),
                                (a = v.handle) ||
                                    (a = v.handle = function(t) {
                                        return void 0 !== k && k.event.triggered !== t.type
                                            ? k.event.dispatch.apply(e, arguments)
                                            : void 0;
                                    }),
                                c = (t = (t || '').match(H) || ['']).length;
                            c--;

                        )
                            (p = g = (s = je.exec(t[c]) || [])[1]),
                                (h = (s[2] || '').split('.').sort()),
                                p &&
                                    ((d = k.event.special[p] || {}),
                                    (p = (o ? d.delegateType : d.bindType) || p),
                                    (d = k.event.special[p] || {}),
                                    (l = k.extend(
                                        {
                                            type: p,
                                            origType: g,
                                            data: r,
                                            handler: n,
                                            guid: n.guid,
                                            selector: o,
                                            needsContext: o && k.expr.match.needsContext.test(o),
                                            namespace: h.join('.'),
                                        },
                                        i,
                                    )),
                                    (f = u[p]) ||
                                        (((f = u[p] = []).delegateCount = 0),
                                        (d.setup && !1 !== d.setup.call(e, r, h, a)) ||
                                            (e.addEventListener && e.addEventListener(p, a))),
                                    d.add && (d.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)),
                                    o ? f.splice(f.delegateCount++, 0, l) : f.push(l),
                                    (k.event.global[p] = !0));
                },
                remove: function(e, t, n, r, o) {
                    var i,
                        a,
                        s,
                        u,
                        c,
                        l,
                        d,
                        f,
                        p,
                        h,
                        g,
                        v = K.hasData(e) && K.get(e);
                    if (v && (u = v.events)) {
                        for (c = (t = (t || '').match(H) || ['']).length; c--; )
                            if (((p = g = (s = je.exec(t[c]) || [])[1]), (h = (s[2] || '').split('.').sort()), p)) {
                                for (
                                    d = k.event.special[p] || {},
                                        f = u[(p = (r ? d.delegateType : d.bindType) || p)] || [],
                                        s = s[2] && new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                                        a = i = f.length;
                                    i--;

                                )
                                    (l = f[i]),
                                        (!o && g !== l.origType) ||
                                            (n && n.guid !== l.guid) ||
                                            (s && !s.test(l.namespace)) ||
                                            (r && r !== l.selector && ('**' !== r || !l.selector)) ||
                                            (f.splice(i, 1),
                                            l.selector && f.delegateCount--,
                                            d.remove && d.remove.call(e, l));
                                a &&
                                    !f.length &&
                                    ((d.teardown && !1 !== d.teardown.call(e, h, v.handle)) ||
                                        k.removeEvent(e, p, v.handle),
                                    delete u[p]);
                            } else for (p in u) k.event.remove(e, p + t[c], n, r, !0);
                        k.isEmptyObject(u) && K.remove(e, 'handle events');
                    }
                },
                dispatch: function(e) {
                    var t,
                        n,
                        r,
                        o,
                        i,
                        a,
                        s = k.event.fix(e),
                        u = new Array(arguments.length),
                        c = (K.get(this, 'events') || {})[s.type] || [],
                        l = k.event.special[s.type] || {};
                    for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
                    if (((s.delegateTarget = this), !l.preDispatch || !1 !== l.preDispatch.call(this, s))) {
                        for (a = k.event.handlers.call(this, s, c), t = 0; (o = a[t++]) && !s.isPropagationStopped(); )
                            for (
                                s.currentTarget = o.elem, n = 0;
                                (i = o.handlers[n++]) && !s.isImmediatePropagationStopped();

                            )
                                (s.rnamespace && !1 !== i.namespace && !s.rnamespace.test(i.namespace)) ||
                                    ((s.handleObj = i),
                                    (s.data = i.data),
                                    void 0 !==
                                        (r = ((k.event.special[i.origType] || {}).handle || i.handler).apply(
                                            o.elem,
                                            u,
                                        )) &&
                                        !1 === (s.result = r) &&
                                        (s.preventDefault(), s.stopPropagation()));
                        return l.postDispatch && l.postDispatch.call(this, s), s.result;
                    }
                },
                handlers: function(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        a,
                        s = [],
                        u = t.delegateCount,
                        c = e.target;
                    if (u && c.nodeType && !('click' === e.type && e.button >= 1))
                        for (; c !== this; c = c.parentNode || this)
                            if (1 === c.nodeType && ('click' !== e.type || !0 !== c.disabled)) {
                                for (i = [], a = {}, n = 0; n < u; n++)
                                    void 0 === a[(o = (r = t[n]).selector + ' ')] &&
                                        (a[o] = r.needsContext
                                            ? k(o, this).index(c) > -1
                                            : k.find(o, this, null, [c]).length),
                                        a[o] && i.push(r);
                                i.length && s.push({ elem: c, handlers: i });
                            }
                    return (c = this), u < t.length && s.push({ elem: c, handlers: t.slice(u) }), s;
                },
                addProp: function(e, t) {
                    Object.defineProperty(k.Event.prototype, e, {
                        enumerable: !0,
                        configurable: !0,
                        get: y(t)
                            ? function() {
                                  if (this.originalEvent) return t(this.originalEvent);
                              }
                            : function() {
                                  if (this.originalEvent) return this.originalEvent[e];
                              },
                        set: function(t) {
                            Object.defineProperty(this, e, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: t,
                            });
                        },
                    });
                },
                fix: function(e) {
                    return e[k.expando] ? e : new k.Event(e);
                },
                special: {
                    load: { noBubble: !0 },
                    click: {
                        setup: function(e) {
                            var t = this || e;
                            return ge.test(t.type) && t.click && N(t, 'input') && _e(t, 'click', Ae), !1;
                        },
                        trigger: function(e) {
                            var t = this || e;
                            return ge.test(t.type) && t.click && N(t, 'input') && _e(t, 'click'), !0;
                        },
                        _default: function(e) {
                            var t = e.target;
                            return (ge.test(t.type) && t.click && N(t, 'input') && K.get(t, 'click')) || N(t, 'a');
                        },
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                        },
                    },
                },
            }),
                (k.removeEvent = function(e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n);
                }),
                (k.Event = function(e, t) {
                    if (!(this instanceof k.Event)) return new k.Event(e, t);
                    e && e.type
                        ? ((this.originalEvent = e),
                          (this.type = e.type),
                          (this.isDefaultPrevented =
                              e.defaultPrevented || (void 0 === e.defaultPrevented && !1 === e.returnValue) ? Ae : De),
                          (this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target),
                          (this.currentTarget = e.currentTarget),
                          (this.relatedTarget = e.relatedTarget))
                        : (this.type = e),
                        t && k.extend(this, t),
                        (this.timeStamp = (e && e.timeStamp) || Date.now()),
                        (this[k.expando] = !0);
                }),
                (k.Event.prototype = {
                    constructor: k.Event,
                    isDefaultPrevented: De,
                    isPropagationStopped: De,
                    isImmediatePropagationStopped: De,
                    isSimulated: !1,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        (this.isDefaultPrevented = Ae), e && !this.isSimulated && e.preventDefault();
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        (this.isPropagationStopped = Ae), e && !this.isSimulated && e.stopPropagation();
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        (this.isImmediatePropagationStopped = Ae),
                            e && !this.isSimulated && e.stopImmediatePropagation(),
                            this.stopPropagation();
                    },
                }),
                k.each(
                    {
                        altKey: !0,
                        bubbles: !0,
                        cancelable: !0,
                        changedTouches: !0,
                        ctrlKey: !0,
                        detail: !0,
                        eventPhase: !0,
                        metaKey: !0,
                        pageX: !0,
                        pageY: !0,
                        shiftKey: !0,
                        view: !0,
                        char: !0,
                        code: !0,
                        charCode: !0,
                        key: !0,
                        keyCode: !0,
                        button: !0,
                        buttons: !0,
                        clientX: !0,
                        clientY: !0,
                        offsetX: !0,
                        offsetY: !0,
                        pointerId: !0,
                        pointerType: !0,
                        screenX: !0,
                        screenY: !0,
                        targetTouches: !0,
                        toElement: !0,
                        touches: !0,
                        which: function(e) {
                            var t = e.button;
                            return null == e.which && Se.test(e.type)
                                ? null != e.charCode
                                    ? e.charCode
                                    : e.keyCode
                                : !e.which && void 0 !== t && Ee.test(e.type)
                                ? 1 & t
                                    ? 1
                                    : 2 & t
                                    ? 3
                                    : 4 & t
                                    ? 2
                                    : 0
                                : e.which;
                        },
                    },
                    k.event.addProp,
                ),
                k.each({ focus: 'focusin', blur: 'focusout' }, function(e, t) {
                    k.event.special[e] = {
                        setup: function() {
                            return _e(this, e, Ne), !1;
                        },
                        trigger: function() {
                            return _e(this, e), !0;
                        },
                        delegateType: t,
                    };
                }),
                k.each(
                    {
                        mouseenter: 'mouseover',
                        mouseleave: 'mouseout',
                        pointerenter: 'pointerover',
                        pointerleave: 'pointerout',
                    },
                    function(e, t) {
                        k.event.special[e] = {
                            delegateType: t,
                            bindType: t,
                            handle: function(e) {
                                var n,
                                    r = this,
                                    o = e.relatedTarget,
                                    i = e.handleObj;
                                return (
                                    (o && (o === r || k.contains(r, o))) ||
                                        ((e.type = i.origType), (n = i.handler.apply(this, arguments)), (e.type = t)),
                                    n
                                );
                            },
                        };
                    },
                ),
                k.fn.extend({
                    on: function(e, t, n, r) {
                        return qe(this, e, t, n, r);
                    },
                    one: function(e, t, n, r) {
                        return qe(this, e, t, n, r, 1);
                    },
                    off: function(e, t, n) {
                        var r, o;
                        if (e && e.preventDefault && e.handleObj)
                            return (
                                (r = e.handleObj),
                                k(e.delegateTarget).off(
                                    r.namespace ? r.origType + '.' + r.namespace : r.origType,
                                    r.selector,
                                    r.handler,
                                ),
                                this
                            );
                        if ('object' == typeof e) {
                            for (o in e) this.off(o, t, e[o]);
                            return this;
                        }
                        return (
                            (!1 !== t && 'function' != typeof t) || ((n = t), (t = void 0)),
                            !1 === n && (n = De),
                            this.each(function() {
                                k.event.remove(this, e, n, t);
                            })
                        );
                    },
                });
            var Le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                Ie = /<script|<style|<link/i,
                Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Oe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            function $e(e, t) {
                return (
                    (N(e, 'table') && N(11 !== t.nodeType ? t : t.firstChild, 'tr') && k(e).children('tbody')[0]) || e
                );
            }
            function He(e) {
                return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
            }
            function Me(e) {
                return (
                    'true/' === (e.type || '').slice(0, 5) ? (e.type = e.type.slice(5)) : e.removeAttribute('type'), e
                );
            }
            function Re(e, t) {
                var n, r, o, i, a, s, u, c;
                if (1 === t.nodeType) {
                    if (K.hasData(e) && ((i = K.access(e)), (a = K.set(t, i)), (c = i.events)))
                        for (o in (delete a.handle, (a.events = {}), c))
                            for (n = 0, r = c[o].length; n < r; n++) k.event.add(t, o, c[o][n]);
                    Z.hasData(e) && ((s = Z.access(e)), (u = k.extend({}, s)), Z.set(t, u));
                }
            }
            function We(e, t) {
                var n = t.nodeName.toLowerCase();
                'input' === n && ge.test(e.type)
                    ? (t.checked = e.checked)
                    : ('input' !== n && 'textarea' !== n) || (t.defaultValue = e.defaultValue);
            }
            function Be(e, t, n, r) {
                t = c.apply([], t);
                var o,
                    i,
                    a,
                    s,
                    u,
                    l,
                    d = 0,
                    f = e.length,
                    p = f - 1,
                    h = t[0],
                    g = y(h);
                if (g || (f > 1 && 'string' == typeof h && !m.checkClone && Pe.test(h)))
                    return e.each(function(o) {
                        var i = e.eq(o);
                        g && (t[0] = h.call(this, o, i.html())), Be(i, t, n, r);
                    });
                if (
                    f &&
                    ((i = (o = Ce(t, e[0].ownerDocument, !1, e, r)).firstChild),
                    1 === o.childNodes.length && (o = i),
                    i || r)
                ) {
                    for (s = (a = k.map(xe(o, 'script'), He)).length; d < f; d++)
                        (u = o),
                            d !== p && ((u = k.clone(u, !0, !0)), s && k.merge(a, xe(u, 'script'))),
                            n.call(e[d], u, d);
                    if (s)
                        for (l = a[a.length - 1].ownerDocument, k.map(a, Me), d = 0; d < s; d++)
                            (u = a[d]),
                                me.test(u.type || '') &&
                                    !K.access(u, 'globalEval') &&
                                    k.contains(l, u) &&
                                    (u.src && 'module' !== (u.type || '').toLowerCase()
                                        ? k._evalUrl &&
                                          !u.noModule &&
                                          k._evalUrl(u.src, { nonce: u.nonce || u.getAttribute('nonce') })
                                        : w(u.textContent.replace(Oe, ''), u, l));
                }
                return e;
            }
            function Fe(e, t, n) {
                for (var r, o = t ? k.filter(t, e) : e, i = 0; null != (r = o[i]); i++)
                    n || 1 !== r.nodeType || k.cleanData(xe(r)),
                        r.parentNode && (n && se(r) && be(xe(r, 'script')), r.parentNode.removeChild(r));
                return e;
            }
            k.extend({
                htmlPrefilter: function(e) {
                    return e.replace(Le, '<$1></$2>');
                },
                clone: function(e, t, n) {
                    var r,
                        o,
                        i,
                        a,
                        s = e.cloneNode(!0),
                        u = se(e);
                    if (!(m.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || k.isXMLDoc(e)))
                        for (a = xe(s), r = 0, o = (i = xe(e)).length; r < o; r++) We(i[r], a[r]);
                    if (t)
                        if (n) for (i = i || xe(e), a = a || xe(s), r = 0, o = i.length; r < o; r++) Re(i[r], a[r]);
                        else Re(e, s);
                    return (a = xe(s, 'script')).length > 0 && be(a, !u && xe(e, 'script')), s;
                },
                cleanData: function(e) {
                    for (var t, n, r, o = k.event.special, i = 0; void 0 !== (n = e[i]); i++)
                        if (Y(n)) {
                            if ((t = n[K.expando])) {
                                if (t.events)
                                    for (r in t.events) o[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
                                n[K.expando] = void 0;
                            }
                            n[Z.expando] && (n[Z.expando] = void 0);
                        }
                },
            }),
                k.fn.extend({
                    detach: function(e) {
                        return Fe(this, e, !0);
                    },
                    remove: function(e) {
                        return Fe(this, e);
                    },
                    text: function(e) {
                        return z(
                            this,
                            function(e) {
                                return void 0 === e
                                    ? k.text(this)
                                    : this.empty().each(function() {
                                          (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
                                              (this.textContent = e);
                                      });
                            },
                            null,
                            e,
                            arguments.length,
                        );
                    },
                    append: function() {
                        return Be(this, arguments, function(e) {
                            (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
                                $e(this, e).appendChild(e);
                        });
                    },
                    prepend: function() {
                        return Be(this, arguments, function(e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var t = $e(this, e);
                                t.insertBefore(e, t.firstChild);
                            }
                        });
                    },
                    before: function() {
                        return Be(this, arguments, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this);
                        });
                    },
                    after: function() {
                        return Be(this, arguments, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                        });
                    },
                    empty: function() {
                        for (var e, t = 0; null != (e = this[t]); t++)
                            1 === e.nodeType && (k.cleanData(xe(e, !1)), (e.textContent = ''));
                        return this;
                    },
                    clone: function(e, t) {
                        return (
                            (e = null != e && e),
                            (t = null == t ? e : t),
                            this.map(function() {
                                return k.clone(this, e, t);
                            })
                        );
                    },
                    html: function(e) {
                        return z(
                            this,
                            function(e) {
                                var t = this[0] || {},
                                    n = 0,
                                    r = this.length;
                                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                                if (
                                    'string' == typeof e &&
                                    !Ie.test(e) &&
                                    !ye[(ve.exec(e) || ['', ''])[1].toLowerCase()]
                                ) {
                                    e = k.htmlPrefilter(e);
                                    try {
                                        for (; n < r; n++)
                                            1 === (t = this[n] || {}).nodeType &&
                                                (k.cleanData(xe(t, !1)), (t.innerHTML = e));
                                        t = 0;
                                    } catch (e) {}
                                }
                                t && this.empty().append(e);
                            },
                            null,
                            e,
                            arguments.length,
                        );
                    },
                    replaceWith: function() {
                        var e = [];
                        return Be(
                            this,
                            arguments,
                            function(t) {
                                var n = this.parentNode;
                                k.inArray(this, e) < 0 && (k.cleanData(xe(this)), n && n.replaceChild(t, this));
                            },
                            e,
                        );
                    },
                }),
                k.each(
                    {
                        appendTo: 'append',
                        prependTo: 'prepend',
                        insertBefore: 'before',
                        insertAfter: 'after',
                        replaceAll: 'replaceWith',
                    },
                    function(e, t) {
                        k.fn[e] = function(e) {
                            for (var n, r = [], o = k(e), i = o.length - 1, a = 0; a <= i; a++)
                                (n = a === i ? this : this.clone(!0)), k(o[a])[t](n), l.apply(r, n.get());
                            return this.pushStack(r);
                        };
                    },
                );
            var Ue = new RegExp('^(' + re + ')(?!px)[a-z%]+$', 'i'),
                ze = function(e) {
                    var t = e.ownerDocument.defaultView;
                    return (t && t.opener) || (t = n), t.getComputedStyle(e);
                },
                Xe = new RegExp(ie.join('|'), 'i');
            function Qe(e, t, n) {
                var r,
                    o,
                    i,
                    a,
                    s = e.style;
                return (
                    (n = n || ze(e)) &&
                        ('' !== (a = n.getPropertyValue(t) || n[t]) || se(e) || (a = k.style(e, t)),
                        !m.pixelBoxStyles() &&
                            Ue.test(a) &&
                            Xe.test(t) &&
                            ((r = s.width),
                            (o = s.minWidth),
                            (i = s.maxWidth),
                            (s.minWidth = s.maxWidth = s.width = a),
                            (a = n.width),
                            (s.width = r),
                            (s.minWidth = o),
                            (s.maxWidth = i))),
                    void 0 !== a ? a + '' : a
                );
            }
            function Ve(e, t) {
                return {
                    get: function() {
                        if (!e()) return (this.get = t).apply(this, arguments);
                        delete this.get;
                    },
                };
            }
            !(function() {
                function e() {
                    if (l) {
                        (c.style.cssText =
                            'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                            (l.style.cssText =
                                'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                            ae.appendChild(c).appendChild(l);
                        var e = n.getComputedStyle(l);
                        (r = '1%' !== e.top),
                            (u = 12 === t(e.marginLeft)),
                            (l.style.right = '60%'),
                            (s = 36 === t(e.right)),
                            (o = 36 === t(e.width)),
                            (l.style.position = 'absolute'),
                            (i = 12 === t(l.offsetWidth / 3)),
                            ae.removeChild(c),
                            (l = null);
                    }
                }
                function t(e) {
                    return Math.round(parseFloat(e));
                }
                var r,
                    o,
                    i,
                    s,
                    u,
                    c = a.createElement('div'),
                    l = a.createElement('div');
                l.style &&
                    ((l.style.backgroundClip = 'content-box'),
                    (l.cloneNode(!0).style.backgroundClip = ''),
                    (m.clearCloneStyle = 'content-box' === l.style.backgroundClip),
                    k.extend(m, {
                        boxSizingReliable: function() {
                            return e(), o;
                        },
                        pixelBoxStyles: function() {
                            return e(), s;
                        },
                        pixelPosition: function() {
                            return e(), r;
                        },
                        reliableMarginLeft: function() {
                            return e(), u;
                        },
                        scrollboxSize: function() {
                            return e(), i;
                        },
                    }));
            })();
            var Ge = ['Webkit', 'Moz', 'ms'],
                Ye = a.createElement('div').style,
                Je = {};
            function Ke(e) {
                var t = k.cssProps[e] || Je[e];
                return (
                    t ||
                    (e in Ye
                        ? e
                        : (Je[e] =
                              (function(e) {
                                  for (var t = e[0].toUpperCase() + e.slice(1), n = Ge.length; n--; )
                                      if ((e = Ge[n] + t) in Ye) return e;
                              })(e) || e))
                );
            }
            var Ze = /^(none|table(?!-c[ea]).+)/,
                et = /^--/,
                tt = { position: 'absolute', visibility: 'hidden', display: 'block' },
                nt = { letterSpacing: '0', fontWeight: '400' };
            function rt(e, t, n) {
                var r = oe.exec(t);
                return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
            }
            function ot(e, t, n, r, o, i) {
                var a = 'width' === t ? 1 : 0,
                    s = 0,
                    u = 0;
                if (n === (r ? 'border' : 'content')) return 0;
                for (; a < 4; a += 2)
                    'margin' === n && (u += k.css(e, n + ie[a], !0, o)),
                        r
                            ? ('content' === n && (u -= k.css(e, 'padding' + ie[a], !0, o)),
                              'margin' !== n && (u -= k.css(e, 'border' + ie[a] + 'Width', !0, o)))
                            : ((u += k.css(e, 'padding' + ie[a], !0, o)),
                              'padding' !== n
                                  ? (u += k.css(e, 'border' + ie[a] + 'Width', !0, o))
                                  : (s += k.css(e, 'border' + ie[a] + 'Width', !0, o)));
                return (
                    !r &&
                        i >= 0 &&
                        (u +=
                            Math.max(0, Math.ceil(e['offset' + t[0].toUpperCase() + t.slice(1)] - i - u - s - 0.5)) ||
                            0),
                    u
                );
            }
            function it(e, t, n) {
                var r = ze(e),
                    o = (!m.boxSizingReliable() || n) && 'border-box' === k.css(e, 'boxSizing', !1, r),
                    i = o,
                    a = Qe(e, t, r),
                    s = 'offset' + t[0].toUpperCase() + t.slice(1);
                if (Ue.test(a)) {
                    if (!n) return a;
                    a = 'auto';
                }
                return (
                    ((!m.boxSizingReliable() && o) ||
                        'auto' === a ||
                        (!parseFloat(a) && 'inline' === k.css(e, 'display', !1, r))) &&
                        e.getClientRects().length &&
                        ((o = 'border-box' === k.css(e, 'boxSizing', !1, r)), (i = s in e) && (a = e[s])),
                    (a = parseFloat(a) || 0) + ot(e, t, n || (o ? 'border' : 'content'), i, r, a) + 'px'
                );
            }
            function at(e, t, n, r, o) {
                return new at.prototype.init(e, t, n, r, o);
            }
            k.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = Qe(e, 'opacity');
                                return '' === n ? '1' : n;
                            }
                        },
                    },
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                },
                cssProps: {},
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var o,
                            i,
                            a,
                            s = G(t),
                            u = et.test(t),
                            c = e.style;
                        if ((u || (t = Ke(s)), (a = k.cssHooks[t] || k.cssHooks[s]), void 0 === n))
                            return a && 'get' in a && void 0 !== (o = a.get(e, !1, r)) ? o : c[t];
                        'string' === (i = typeof n) && (o = oe.exec(n)) && o[1] && ((n = de(e, t, o)), (i = 'number')),
                            null != n &&
                                n == n &&
                                ('number' !== i || u || (n += (o && o[3]) || (k.cssNumber[s] ? '' : 'px')),
                                m.clearCloneStyle || '' !== n || 0 !== t.indexOf('background') || (c[t] = 'inherit'),
                                (a && 'set' in a && void 0 === (n = a.set(e, n, r))) ||
                                    (u ? c.setProperty(t, n) : (c[t] = n)));
                    }
                },
                css: function(e, t, n, r) {
                    var o,
                        i,
                        a,
                        s = G(t);
                    return (
                        et.test(t) || (t = Ke(s)),
                        (a = k.cssHooks[t] || k.cssHooks[s]) && 'get' in a && (o = a.get(e, !0, n)),
                        void 0 === o && (o = Qe(e, t, r)),
                        'normal' === o && t in nt && (o = nt[t]),
                        '' === n || n ? ((i = parseFloat(o)), !0 === n || isFinite(i) ? i || 0 : o) : o
                    );
                },
            }),
                k.each(['height', 'width'], function(e, t) {
                    k.cssHooks[t] = {
                        get: function(e, n, r) {
                            if (n)
                                return !Ze.test(k.css(e, 'display')) ||
                                    (e.getClientRects().length && e.getBoundingClientRect().width)
                                    ? it(e, t, r)
                                    : le(e, tt, function() {
                                          return it(e, t, r);
                                      });
                        },
                        set: function(e, n, r) {
                            var o,
                                i = ze(e),
                                a = !m.scrollboxSize() && 'absolute' === i.position,
                                s = (a || r) && 'border-box' === k.css(e, 'boxSizing', !1, i),
                                u = r ? ot(e, t, r, s, i) : 0;
                            return (
                                s &&
                                    a &&
                                    (u -= Math.ceil(
                                        e['offset' + t[0].toUpperCase() + t.slice(1)] -
                                            parseFloat(i[t]) -
                                            ot(e, t, 'border', !1, i) -
                                            0.5,
                                    )),
                                u &&
                                    (o = oe.exec(n)) &&
                                    'px' !== (o[3] || 'px') &&
                                    ((e.style[t] = n), (n = k.css(e, t))),
                                rt(0, n, u)
                            );
                        },
                    };
                }),
                (k.cssHooks.marginLeft = Ve(m.reliableMarginLeft, function(e, t) {
                    if (t)
                        return (
                            (parseFloat(Qe(e, 'marginLeft')) ||
                                e.getBoundingClientRect().left -
                                    le(e, { marginLeft: 0 }, function() {
                                        return e.getBoundingClientRect().left;
                                    })) + 'px'
                        );
                })),
                k.each({ margin: '', padding: '', border: 'Width' }, function(e, t) {
                    (k.cssHooks[e + t] = {
                        expand: function(n) {
                            for (var r = 0, o = {}, i = 'string' == typeof n ? n.split(' ') : [n]; r < 4; r++)
                                o[e + ie[r] + t] = i[r] || i[r - 2] || i[0];
                            return o;
                        },
                    }),
                        'margin' !== e && (k.cssHooks[e + t].set = rt);
                }),
                k.fn.extend({
                    css: function(e, t) {
                        return z(
                            this,
                            function(e, t, n) {
                                var r,
                                    o,
                                    i = {},
                                    a = 0;
                                if (Array.isArray(t)) {
                                    for (r = ze(e), o = t.length; a < o; a++) i[t[a]] = k.css(e, t[a], !1, r);
                                    return i;
                                }
                                return void 0 !== n ? k.style(e, t, n) : k.css(e, t);
                            },
                            e,
                            t,
                            arguments.length > 1,
                        );
                    },
                }),
                (k.Tween = at),
                (at.prototype = {
                    constructor: at,
                    init: function(e, t, n, r, o, i) {
                        (this.elem = e),
                            (this.prop = n),
                            (this.easing = o || k.easing._default),
                            (this.options = t),
                            (this.start = this.now = this.cur()),
                            (this.end = r),
                            (this.unit = i || (k.cssNumber[n] ? '' : 'px'));
                    },
                    cur: function() {
                        var e = at.propHooks[this.prop];
                        return e && e.get ? e.get(this) : at.propHooks._default.get(this);
                    },
                    run: function(e) {
                        var t,
                            n = at.propHooks[this.prop];
                        return (
                            this.options.duration
                                ? (this.pos = t = k.easing[this.easing](
                                      e,
                                      this.options.duration * e,
                                      0,
                                      1,
                                      this.options.duration,
                                  ))
                                : (this.pos = t = e),
                            (this.now = (this.end - this.start) * t + this.start),
                            this.options.step && this.options.step.call(this.elem, this.now, this),
                            n && n.set ? n.set(this) : at.propHooks._default.set(this),
                            this
                        );
                    },
                }),
                (at.prototype.init.prototype = at.prototype),
                (at.propHooks = {
                    _default: {
                        get: function(e) {
                            var t;
                            return 1 !== e.elem.nodeType || (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                                ? e.elem[e.prop]
                                : (t = k.css(e.elem, e.prop, '')) && 'auto' !== t
                                ? t
                                : 0;
                        },
                        set: function(e) {
                            k.fx.step[e.prop]
                                ? k.fx.step[e.prop](e)
                                : 1 !== e.elem.nodeType || (!k.cssHooks[e.prop] && null == e.elem.style[Ke(e.prop)])
                                ? (e.elem[e.prop] = e.now)
                                : k.style(e.elem, e.prop, e.now + e.unit);
                        },
                    },
                }),
                (at.propHooks.scrollTop = at.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                    },
                }),
                (k.easing = {
                    linear: function(e) {
                        return e;
                    },
                    swing: function(e) {
                        return 0.5 - Math.cos(e * Math.PI) / 2;
                    },
                    _default: 'swing',
                }),
                (k.fx = at.prototype.init),
                (k.fx.step = {});
            var st,
                ut,
                ct = /^(?:toggle|show|hide)$/,
                lt = /queueHooks$/;
            function dt() {
                ut &&
                    (!1 === a.hidden && n.requestAnimationFrame
                        ? n.requestAnimationFrame(dt)
                        : n.setTimeout(dt, k.fx.interval),
                    k.fx.tick());
            }
            function ft() {
                return (
                    n.setTimeout(function() {
                        st = void 0;
                    }),
                    (st = Date.now())
                );
            }
            function pt(e, t) {
                var n,
                    r = 0,
                    o = { height: e };
                for (t = t ? 1 : 0; r < 4; r += 2 - t) o['margin' + (n = ie[r])] = o['padding' + n] = e;
                return t && (o.opacity = o.width = e), o;
            }
            function ht(e, t, n) {
                for (var r, o = (gt.tweeners[t] || []).concat(gt.tweeners['*']), i = 0, a = o.length; i < a; i++)
                    if ((r = o[i].call(n, t, e))) return r;
            }
            function gt(e, t, n) {
                var r,
                    o,
                    i = 0,
                    a = gt.prefilters.length,
                    s = k.Deferred().always(function() {
                        delete u.elem;
                    }),
                    u = function() {
                        if (o) return !1;
                        for (
                            var t = st || ft(),
                                n = Math.max(0, c.startTime + c.duration - t),
                                r = 1 - (n / c.duration || 0),
                                i = 0,
                                a = c.tweens.length;
                            i < a;
                            i++
                        )
                            c.tweens[i].run(r);
                        return (
                            s.notifyWith(e, [c, r, n]),
                            r < 1 && a ? n : (a || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1)
                        );
                    },
                    c = s.promise({
                        elem: e,
                        props: k.extend({}, t),
                        opts: k.extend(!0, { specialEasing: {}, easing: k.easing._default }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: st || ft(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = k.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                            return c.tweens.push(r), r;
                        },
                        stop: function(t) {
                            var n = 0,
                                r = t ? c.tweens.length : 0;
                            if (o) return this;
                            for (o = !0; n < r; n++) c.tweens[n].run(1);
                            return (
                                t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]),
                                this
                            );
                        },
                    }),
                    l = c.props;
                for (
                    !(function(e, t) {
                        var n, r, o, i, a;
                        for (n in e)
                            if (
                                ((o = t[(r = G(n))]),
                                (i = e[n]),
                                Array.isArray(i) && ((o = i[1]), (i = e[n] = i[0])),
                                n !== r && ((e[r] = i), delete e[n]),
                                (a = k.cssHooks[r]) && ('expand' in a))
                            )
                                for (n in ((i = a.expand(i)), delete e[r], i)) (n in e) || ((e[n] = i[n]), (t[n] = o));
                            else t[r] = o;
                    })(l, c.opts.specialEasing);
                    i < a;
                    i++
                )
                    if ((r = gt.prefilters[i].call(c, e, l, c.opts)))
                        return y(r.stop) && (k._queueHooks(c.elem, c.opts.queue).stop = r.stop.bind(r)), r;
                return (
                    k.map(l, ht, c),
                    y(c.opts.start) && c.opts.start.call(e, c),
                    c
                        .progress(c.opts.progress)
                        .done(c.opts.done, c.opts.complete)
                        .fail(c.opts.fail)
                        .always(c.opts.always),
                    k.fx.timer(k.extend(u, { elem: e, anim: c, queue: c.opts.queue })),
                    c
                );
            }
            (k.Animation = k.extend(gt, {
                tweeners: {
                    '*': [
                        function(e, t) {
                            var n = this.createTween(e, t);
                            return de(n.elem, e, oe.exec(t), n), n;
                        },
                    ],
                },
                tweener: function(e, t) {
                    y(e) ? ((t = e), (e = ['*'])) : (e = e.match(H));
                    for (var n, r = 0, o = e.length; r < o; r++)
                        (n = e[r]), (gt.tweeners[n] = gt.tweeners[n] || []), gt.tweeners[n].unshift(t);
                },
                prefilters: [
                    function(e, t, n) {
                        var r,
                            o,
                            i,
                            a,
                            s,
                            u,
                            c,
                            l,
                            d = 'width' in t || 'height' in t,
                            f = this,
                            p = {},
                            h = e.style,
                            g = e.nodeType && ce(e),
                            v = K.get(e, 'fxshow');
                        for (r in (n.queue ||
                            (null == (a = k._queueHooks(e, 'fx')).unqueued &&
                                ((a.unqueued = 0),
                                (s = a.empty.fire),
                                (a.empty.fire = function() {
                                    a.unqueued || s();
                                })),
                            a.unqueued++,
                            f.always(function() {
                                f.always(function() {
                                    a.unqueued--, k.queue(e, 'fx').length || a.empty.fire();
                                });
                            })),
                        t))
                            if (((o = t[r]), ct.test(o))) {
                                if ((delete t[r], (i = i || 'toggle' === o), o === (g ? 'hide' : 'show'))) {
                                    if ('show' !== o || !v || void 0 === v[r]) continue;
                                    g = !0;
                                }
                                p[r] = (v && v[r]) || k.style(e, r);
                            }
                        if ((u = !k.isEmptyObject(t)) || !k.isEmptyObject(p))
                            for (r in (d &&
                                1 === e.nodeType &&
                                ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                                null == (c = v && v.display) && (c = K.get(e, 'display')),
                                'none' === (l = k.css(e, 'display')) &&
                                    (c
                                        ? (l = c)
                                        : (he([e], !0),
                                          (c = e.style.display || c),
                                          (l = k.css(e, 'display')),
                                          he([e]))),
                                ('inline' === l || ('inline-block' === l && null != c)) &&
                                    'none' === k.css(e, 'float') &&
                                    (u ||
                                        (f.done(function() {
                                            h.display = c;
                                        }),
                                        null == c && ((l = h.display), (c = 'none' === l ? '' : l))),
                                    (h.display = 'inline-block'))),
                            n.overflow &&
                                ((h.overflow = 'hidden'),
                                f.always(function() {
                                    (h.overflow = n.overflow[0]),
                                        (h.overflowX = n.overflow[1]),
                                        (h.overflowY = n.overflow[2]);
                                })),
                            (u = !1),
                            p))
                                u ||
                                    (v ? 'hidden' in v && (g = v.hidden) : (v = K.access(e, 'fxshow', { display: c })),
                                    i && (v.hidden = !g),
                                    g && he([e], !0),
                                    f.done(function() {
                                        for (r in (g || he([e]), K.remove(e, 'fxshow'), p)) k.style(e, r, p[r]);
                                    })),
                                    (u = ht(g ? v[r] : 0, r, f)),
                                    r in v || ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
                    },
                ],
                prefilter: function(e, t) {
                    t ? gt.prefilters.unshift(e) : gt.prefilters.push(e);
                },
            })),
                (k.speed = function(e, t, n) {
                    var r =
                        e && 'object' == typeof e
                            ? k.extend({}, e)
                            : {
                                  complete: n || (!n && t) || (y(e) && e),
                                  duration: e,
                                  easing: (n && t) || (t && !y(t) && t),
                              };
                    return (
                        k.fx.off
                            ? (r.duration = 0)
                            : 'number' != typeof r.duration &&
                              (r.duration in k.fx.speeds
                                  ? (r.duration = k.fx.speeds[r.duration])
                                  : (r.duration = k.fx.speeds._default)),
                        (null != r.queue && !0 !== r.queue) || (r.queue = 'fx'),
                        (r.old = r.complete),
                        (r.complete = function() {
                            y(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue);
                        }),
                        r
                    );
                }),
                k.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(ce)
                            .css('opacity', 0)
                            .show()
                            .end()
                            .animate({ opacity: t }, e, n, r);
                    },
                    animate: function(e, t, n, r) {
                        var o = k.isEmptyObject(e),
                            i = k.speed(t, n, r),
                            a = function() {
                                var t = gt(this, k.extend({}, e), i);
                                (o || K.get(this, 'finish')) && t.stop(!0);
                            };
                        return (a.finish = a), o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a);
                    },
                    stop: function(e, t, n) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n);
                        };
                        return (
                            'string' != typeof e && ((n = t), (t = e), (e = void 0)),
                            t && !1 !== e && this.queue(e || 'fx', []),
                            this.each(function() {
                                var t = !0,
                                    o = null != e && e + 'queueHooks',
                                    i = k.timers,
                                    a = K.get(this);
                                if (o) a[o] && a[o].stop && r(a[o]);
                                else for (o in a) a[o] && a[o].stop && lt.test(o) && r(a[o]);
                                for (o = i.length; o--; )
                                    i[o].elem !== this ||
                                        (null != e && i[o].queue !== e) ||
                                        (i[o].anim.stop(n), (t = !1), i.splice(o, 1));
                                (!t && n) || k.dequeue(this, e);
                            })
                        );
                    },
                    finish: function(e) {
                        return (
                            !1 !== e && (e = e || 'fx'),
                            this.each(function() {
                                var t,
                                    n = K.get(this),
                                    r = n[e + 'queue'],
                                    o = n[e + 'queueHooks'],
                                    i = k.timers,
                                    a = r ? r.length : 0;
                                for (
                                    n.finish = !0,
                                        k.queue(this, e, []),
                                        o && o.stop && o.stop.call(this, !0),
                                        t = i.length;
                                    t--;

                                )
                                    i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                                for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                delete n.finish;
                            })
                        );
                    },
                }),
                k.each(['toggle', 'show', 'hide'], function(e, t) {
                    var n = k.fn[t];
                    k.fn[t] = function(e, r, o) {
                        return null == e || 'boolean' == typeof e
                            ? n.apply(this, arguments)
                            : this.animate(pt(t, !0), e, r, o);
                    };
                }),
                k.each(
                    {
                        slideDown: pt('show'),
                        slideUp: pt('hide'),
                        slideToggle: pt('toggle'),
                        fadeIn: { opacity: 'show' },
                        fadeOut: { opacity: 'hide' },
                        fadeToggle: { opacity: 'toggle' },
                    },
                    function(e, t) {
                        k.fn[e] = function(e, n, r) {
                            return this.animate(t, e, n, r);
                        };
                    },
                ),
                (k.timers = []),
                (k.fx.tick = function() {
                    var e,
                        t = 0,
                        n = k.timers;
                    for (st = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                    n.length || k.fx.stop(), (st = void 0);
                }),
                (k.fx.timer = function(e) {
                    k.timers.push(e), k.fx.start();
                }),
                (k.fx.interval = 13),
                (k.fx.start = function() {
                    ut || ((ut = !0), dt());
                }),
                (k.fx.stop = function() {
                    ut = null;
                }),
                (k.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
                (k.fn.delay = function(e, t) {
                    return (
                        (e = (k.fx && k.fx.speeds[e]) || e),
                        (t = t || 'fx'),
                        this.queue(t, function(t, r) {
                            var o = n.setTimeout(t, e);
                            r.stop = function() {
                                n.clearTimeout(o);
                            };
                        })
                    );
                }),
                (function() {
                    var e = a.createElement('input'),
                        t = a.createElement('select').appendChild(a.createElement('option'));
                    (e.type = 'checkbox'),
                        (m.checkOn = '' !== e.value),
                        (m.optSelected = t.selected),
                        ((e = a.createElement('input')).value = 't'),
                        (e.type = 'radio'),
                        (m.radioValue = 't' === e.value);
                })();
            var vt,
                mt = k.expr.attrHandle;
            k.fn.extend({
                attr: function(e, t) {
                    return z(this, k.attr, e, t, arguments.length > 1);
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        k.removeAttr(this, e);
                    });
                },
            }),
                k.extend({
                    attr: function(e, t, n) {
                        var r,
                            o,
                            i = e.nodeType;
                        if (3 !== i && 8 !== i && 2 !== i)
                            return void 0 === e.getAttribute
                                ? k.prop(e, t, n)
                                : ((1 === i && k.isXMLDoc(e)) ||
                                      (o = k.attrHooks[t.toLowerCase()] || (k.expr.match.bool.test(t) ? vt : void 0)),
                                  void 0 !== n
                                      ? null === n
                                          ? void k.removeAttr(e, t)
                                          : o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                                          ? r
                                          : (e.setAttribute(t, n + ''), n)
                                      : o && 'get' in o && null !== (r = o.get(e, t))
                                      ? r
                                      : null == (r = k.find.attr(e, t))
                                      ? void 0
                                      : r);
                    },
                    attrHooks: {
                        type: {
                            set: function(e, t) {
                                if (!m.radioValue && 'radio' === t && N(e, 'input')) {
                                    var n = e.value;
                                    return e.setAttribute('type', t), n && (e.value = n), t;
                                }
                            },
                        },
                    },
                    removeAttr: function(e, t) {
                        var n,
                            r = 0,
                            o = t && t.match(H);
                        if (o && 1 === e.nodeType) for (; (n = o[r++]); ) e.removeAttribute(n);
                    },
                }),
                (vt = {
                    set: function(e, t, n) {
                        return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n;
                    },
                }),
                k.each(k.expr.match.bool.source.match(/\w+/g), function(e, t) {
                    var n = mt[t] || k.find.attr;
                    mt[t] = function(e, t, r) {
                        var o,
                            i,
                            a = t.toLowerCase();
                        return r || ((i = mt[a]), (mt[a] = o), (o = null != n(e, t, r) ? a : null), (mt[a] = i)), o;
                    };
                });
            var yt = /^(?:input|select|textarea|button)$/i,
                xt = /^(?:a|area)$/i;
            function bt(e) {
                return (e.match(H) || []).join(' ');
            }
            function wt(e) {
                return (e.getAttribute && e.getAttribute('class')) || '';
            }
            function Tt(e) {
                return Array.isArray(e) ? e : ('string' == typeof e && e.match(H)) || [];
            }
            k.fn.extend({
                prop: function(e, t) {
                    return z(this, k.prop, e, t, arguments.length > 1);
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[k.propFix[e] || e];
                    });
                },
            }),
                k.extend({
                    prop: function(e, t, n) {
                        var r,
                            o,
                            i = e.nodeType;
                        if (3 !== i && 8 !== i && 2 !== i)
                            return (
                                (1 === i && k.isXMLDoc(e)) || ((t = k.propFix[t] || t), (o = k.propHooks[t])),
                                void 0 !== n
                                    ? o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                                        ? r
                                        : (e[t] = n)
                                    : o && 'get' in o && null !== (r = o.get(e, t))
                                    ? r
                                    : e[t]
                            );
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var t = k.find.attr(e, 'tabindex');
                                return t
                                    ? parseInt(t, 10)
                                    : yt.test(e.nodeName) || (xt.test(e.nodeName) && e.href)
                                    ? 0
                                    : -1;
                            },
                        },
                    },
                    propFix: { for: 'htmlFor', class: 'className' },
                }),
                m.optSelected ||
                    (k.propHooks.selected = {
                        get: function(e) {
                            var t = e.parentNode;
                            return t && t.parentNode && t.parentNode.selectedIndex, null;
                        },
                        set: function(e) {
                            var t = e.parentNode;
                            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                        },
                    }),
                k.each(
                    [
                        'tabIndex',
                        'readOnly',
                        'maxLength',
                        'cellSpacing',
                        'cellPadding',
                        'rowSpan',
                        'colSpan',
                        'useMap',
                        'frameBorder',
                        'contentEditable',
                    ],
                    function() {
                        k.propFix[this.toLowerCase()] = this;
                    },
                ),
                k.fn.extend({
                    addClass: function(e) {
                        var t,
                            n,
                            r,
                            o,
                            i,
                            a,
                            s,
                            u = 0;
                        if (y(e))
                            return this.each(function(t) {
                                k(this).addClass(e.call(this, t, wt(this)));
                            });
                        if ((t = Tt(e)).length)
                            for (; (n = this[u++]); )
                                if (((o = wt(n)), (r = 1 === n.nodeType && ' ' + bt(o) + ' '))) {
                                    for (a = 0; (i = t[a++]); ) r.indexOf(' ' + i + ' ') < 0 && (r += i + ' ');
                                    o !== (s = bt(r)) && n.setAttribute('class', s);
                                }
                        return this;
                    },
                    removeClass: function(e) {
                        var t,
                            n,
                            r,
                            o,
                            i,
                            a,
                            s,
                            u = 0;
                        if (y(e))
                            return this.each(function(t) {
                                k(this).removeClass(e.call(this, t, wt(this)));
                            });
                        if (!arguments.length) return this.attr('class', '');
                        if ((t = Tt(e)).length)
                            for (; (n = this[u++]); )
                                if (((o = wt(n)), (r = 1 === n.nodeType && ' ' + bt(o) + ' '))) {
                                    for (a = 0; (i = t[a++]); )
                                        for (; r.indexOf(' ' + i + ' ') > -1; ) r = r.replace(' ' + i + ' ', ' ');
                                    o !== (s = bt(r)) && n.setAttribute('class', s);
                                }
                        return this;
                    },
                    toggleClass: function(e, t) {
                        var n = typeof e,
                            r = 'string' === n || Array.isArray(e);
                        return 'boolean' == typeof t && r
                            ? t
                                ? this.addClass(e)
                                : this.removeClass(e)
                            : y(e)
                            ? this.each(function(n) {
                                  k(this).toggleClass(e.call(this, n, wt(this), t), t);
                              })
                            : this.each(function() {
                                  var t, o, i, a;
                                  if (r)
                                      for (o = 0, i = k(this), a = Tt(e); (t = a[o++]); )
                                          i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                                  else
                                      (void 0 !== e && 'boolean' !== n) ||
                                          ((t = wt(this)) && K.set(this, '__className__', t),
                                          this.setAttribute &&
                                              this.setAttribute(
                                                  'class',
                                                  t || !1 === e ? '' : K.get(this, '__className__') || '',
                                              ));
                              });
                    },
                    hasClass: function(e) {
                        var t,
                            n,
                            r = 0;
                        for (t = ' ' + e + ' '; (n = this[r++]); )
                            if (1 === n.nodeType && (' ' + bt(wt(n)) + ' ').indexOf(t) > -1) return !0;
                        return !1;
                    },
                });
            var kt = /\r/g;
            k.fn.extend({
                val: function(e) {
                    var t,
                        n,
                        r,
                        o = this[0];
                    return arguments.length
                        ? ((r = y(e)),
                          this.each(function(n) {
                              var o;
                              1 === this.nodeType &&
                                  (null == (o = r ? e.call(this, n, k(this).val()) : e)
                                      ? (o = '')
                                      : 'number' == typeof o
                                      ? (o += '')
                                      : Array.isArray(o) &&
                                        (o = k.map(o, function(e) {
                                            return null == e ? '' : e + '';
                                        })),
                                  ((t = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) &&
                                      'set' in t &&
                                      void 0 !== t.set(this, o, 'value')) ||
                                      (this.value = o));
                          }))
                        : o
                        ? (t = k.valHooks[o.type] || k.valHooks[o.nodeName.toLowerCase()]) &&
                          'get' in t &&
                          void 0 !== (n = t.get(o, 'value'))
                            ? n
                            : 'string' == typeof (n = o.value)
                            ? n.replace(kt, '')
                            : null == n
                            ? ''
                            : n
                        : void 0;
                },
            }),
                k.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var t = k.find.attr(e, 'value');
                                return null != t ? t : bt(k.text(e));
                            },
                        },
                        select: {
                            get: function(e) {
                                var t,
                                    n,
                                    r,
                                    o = e.options,
                                    i = e.selectedIndex,
                                    a = 'select-one' === e.type,
                                    s = a ? null : [],
                                    u = a ? i + 1 : o.length;
                                for (r = i < 0 ? u : a ? i : 0; r < u; r++)
                                    if (
                                        ((n = o[r]).selected || r === i) &&
                                        !n.disabled &&
                                        (!n.parentNode.disabled || !N(n.parentNode, 'optgroup'))
                                    ) {
                                        if (((t = k(n).val()), a)) return t;
                                        s.push(t);
                                    }
                                return s;
                            },
                            set: function(e, t) {
                                for (var n, r, o = e.options, i = k.makeArray(t), a = o.length; a--; )
                                    ((r = o[a]).selected = k.inArray(k.valHooks.option.get(r), i) > -1) && (n = !0);
                                return n || (e.selectedIndex = -1), i;
                            },
                        },
                    },
                }),
                k.each(['radio', 'checkbox'], function() {
                    (k.valHooks[this] = {
                        set: function(e, t) {
                            if (Array.isArray(t)) return (e.checked = k.inArray(k(e).val(), t) > -1);
                        },
                    }),
                        m.checkOn ||
                            (k.valHooks[this].get = function(e) {
                                return null === e.getAttribute('value') ? 'on' : e.value;
                            });
                }),
                (m.focusin = 'onfocusin' in n);
            var Ct = /^(?:focusinfocus|focusoutblur)$/,
                St = function(e) {
                    e.stopPropagation();
                };
            k.extend(k.event, {
                trigger: function(e, t, r, o) {
                    var i,
                        s,
                        u,
                        c,
                        l,
                        d,
                        f,
                        p,
                        g = [r || a],
                        v = h.call(e, 'type') ? e.type : e,
                        m = h.call(e, 'namespace') ? e.namespace.split('.') : [];
                    if (
                        ((s = p = u = r = r || a),
                        3 !== r.nodeType &&
                            8 !== r.nodeType &&
                            !Ct.test(v + k.event.triggered) &&
                            (v.indexOf('.') > -1 && ((m = v.split('.')), (v = m.shift()), m.sort()),
                            (l = v.indexOf(':') < 0 && 'on' + v),
                            ((e = e[k.expando] ? e : new k.Event(v, 'object' == typeof e && e)).isTrigger = o ? 2 : 3),
                            (e.namespace = m.join('.')),
                            (e.rnamespace = e.namespace
                                ? new RegExp('(^|\\.)' + m.join('\\.(?:.*\\.|)') + '(\\.|$)')
                                : null),
                            (e.result = void 0),
                            e.target || (e.target = r),
                            (t = null == t ? [e] : k.makeArray(t, [e])),
                            (f = k.event.special[v] || {}),
                            o || !f.trigger || !1 !== f.trigger.apply(r, t)))
                    ) {
                        if (!o && !f.noBubble && !x(r)) {
                            for (c = f.delegateType || v, Ct.test(c + v) || (s = s.parentNode); s; s = s.parentNode)
                                g.push(s), (u = s);
                            u === (r.ownerDocument || a) && g.push(u.defaultView || u.parentWindow || n);
                        }
                        for (i = 0; (s = g[i++]) && !e.isPropagationStopped(); )
                            (p = s),
                                (e.type = i > 1 ? c : f.bindType || v),
                                (d = (K.get(s, 'events') || {})[e.type] && K.get(s, 'handle')) && d.apply(s, t),
                                (d = l && s[l]) &&
                                    d.apply &&
                                    Y(s) &&
                                    ((e.result = d.apply(s, t)), !1 === e.result && e.preventDefault());
                        return (
                            (e.type = v),
                            o ||
                                e.isDefaultPrevented() ||
                                (f._default && !1 !== f._default.apply(g.pop(), t)) ||
                                !Y(r) ||
                                (l &&
                                    y(r[v]) &&
                                    !x(r) &&
                                    ((u = r[l]) && (r[l] = null),
                                    (k.event.triggered = v),
                                    e.isPropagationStopped() && p.addEventListener(v, St),
                                    r[v](),
                                    e.isPropagationStopped() && p.removeEventListener(v, St),
                                    (k.event.triggered = void 0),
                                    u && (r[l] = u))),
                            e.result
                        );
                    }
                },
                simulate: function(e, t, n) {
                    var r = k.extend(new k.Event(), n, { type: e, isSimulated: !0 });
                    k.event.trigger(r, null, t);
                },
            }),
                k.fn.extend({
                    trigger: function(e, t) {
                        return this.each(function() {
                            k.event.trigger(e, t, this);
                        });
                    },
                    triggerHandler: function(e, t) {
                        var n = this[0];
                        if (n) return k.event.trigger(e, t, n, !0);
                    },
                }),
                m.focusin ||
                    k.each({ focus: 'focusin', blur: 'focusout' }, function(e, t) {
                        var n = function(e) {
                            k.event.simulate(t, e.target, k.event.fix(e));
                        };
                        k.event.special[t] = {
                            setup: function() {
                                var r = this.ownerDocument || this,
                                    o = K.access(r, t);
                                o || r.addEventListener(e, n, !0), K.access(r, t, (o || 0) + 1);
                            },
                            teardown: function() {
                                var r = this.ownerDocument || this,
                                    o = K.access(r, t) - 1;
                                o ? K.access(r, t, o) : (r.removeEventListener(e, n, !0), K.remove(r, t));
                            },
                        };
                    });
            var Et = n.location,
                jt = Date.now(),
                At = /\?/;
            k.parseXML = function(e) {
                var t;
                if (!e || 'string' != typeof e) return null;
                try {
                    t = new n.DOMParser().parseFromString(e, 'text/xml');
                } catch (e) {
                    t = void 0;
                }
                return (t && !t.getElementsByTagName('parsererror').length) || k.error('Invalid XML: ' + e), t;
            };
            var Dt = /\[\]$/,
                Nt = /\r?\n/g,
                qt = /^(?:submit|button|image|reset|file)$/i,
                _t = /^(?:input|select|textarea|keygen)/i;
            function Lt(e, t, n, r) {
                var o;
                if (Array.isArray(t))
                    k.each(t, function(t, o) {
                        n || Dt.test(e)
                            ? r(e, o)
                            : Lt(e + '[' + ('object' == typeof o && null != o ? t : '') + ']', o, n, r);
                    });
                else if (n || 'object' !== T(t)) r(e, t);
                else for (o in t) Lt(e + '[' + o + ']', t[o], n, r);
            }
            (k.param = function(e, t) {
                var n,
                    r = [],
                    o = function(e, t) {
                        var n = y(t) ? t() : t;
                        r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
                    };
                if (null == e) return '';
                if (Array.isArray(e) || (e.jquery && !k.isPlainObject(e)))
                    k.each(e, function() {
                        o(this.name, this.value);
                    });
                else for (n in e) Lt(n, e[n], t, o);
                return r.join('&');
            }),
                k.fn.extend({
                    serialize: function() {
                        return k.param(this.serializeArray());
                    },
                    serializeArray: function() {
                        return this.map(function() {
                            var e = k.prop(this, 'elements');
                            return e ? k.makeArray(e) : this;
                        })
                            .filter(function() {
                                var e = this.type;
                                return (
                                    this.name &&
                                    !k(this).is(':disabled') &&
                                    _t.test(this.nodeName) &&
                                    !qt.test(e) &&
                                    (this.checked || !ge.test(e))
                                );
                            })
                            .map(function(e, t) {
                                var n = k(this).val();
                                return null == n
                                    ? null
                                    : Array.isArray(n)
                                    ? k.map(n, function(e) {
                                          return { name: t.name, value: e.replace(Nt, '\r\n') };
                                      })
                                    : { name: t.name, value: n.replace(Nt, '\r\n') };
                            })
                            .get();
                    },
                });
            var It = /%20/g,
                Pt = /#.*$/,
                Ot = /([?&])_=[^&]*/,
                $t = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                Ht = /^(?:GET|HEAD)$/,
                Mt = /^\/\//,
                Rt = {},
                Wt = {},
                Bt = '*/'.concat('*'),
                Ft = a.createElement('a');
            function Ut(e) {
                return function(t, n) {
                    'string' != typeof t && ((n = t), (t = '*'));
                    var r,
                        o = 0,
                        i = t.toLowerCase().match(H) || [];
                    if (y(n))
                        for (; (r = i[o++]); )
                            '+' === r[0]
                                ? ((r = r.slice(1) || '*'), (e[r] = e[r] || []).unshift(n))
                                : (e[r] = e[r] || []).push(n);
                };
            }
            function zt(e, t, n, r) {
                var o = {},
                    i = e === Wt;
                function a(s) {
                    var u;
                    return (
                        (o[s] = !0),
                        k.each(e[s] || [], function(e, s) {
                            var c = s(t, n, r);
                            return 'string' != typeof c || i || o[c]
                                ? i
                                    ? !(u = c)
                                    : void 0
                                : (t.dataTypes.unshift(c), a(c), !1);
                        }),
                        u
                    );
                }
                return a(t.dataTypes[0]) || (!o['*'] && a('*'));
            }
            function Xt(e, t) {
                var n,
                    r,
                    o = k.ajaxSettings.flatOptions || {};
                for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
                return r && k.extend(!0, e, r), e;
            }
            (Ft.href = Et.href),
                k.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Et.href,
                        type: 'GET',
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        accepts: {
                            '*': Bt,
                            text: 'text/plain',
                            html: 'text/html',
                            xml: 'application/xml, text/xml',
                            json: 'application/json, text/javascript',
                        },
                        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                        responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
                        converters: {
                            '* text': String,
                            'text html': !0,
                            'text json': JSON.parse,
                            'text xml': k.parseXML,
                        },
                        flatOptions: { url: !0, context: !0 },
                    },
                    ajaxSetup: function(e, t) {
                        return t ? Xt(Xt(e, k.ajaxSettings), t) : Xt(k.ajaxSettings, e);
                    },
                    ajaxPrefilter: Ut(Rt),
                    ajaxTransport: Ut(Wt),
                    ajax: function(e, t) {
                        'object' == typeof e && ((t = e), (e = void 0)), (t = t || {});
                        var r,
                            o,
                            i,
                            s,
                            u,
                            c,
                            l,
                            d,
                            f,
                            p,
                            h = k.ajaxSetup({}, t),
                            g = h.context || h,
                            v = h.context && (g.nodeType || g.jquery) ? k(g) : k.event,
                            m = k.Deferred(),
                            y = k.Callbacks('once memory'),
                            x = h.statusCode || {},
                            b = {},
                            w = {},
                            T = 'canceled',
                            C = {
                                readyState: 0,
                                getResponseHeader: function(e) {
                                    var t;
                                    if (l) {
                                        if (!s)
                                            for (s = {}; (t = $t.exec(i)); )
                                                s[t[1].toLowerCase() + ' '] = (
                                                    s[t[1].toLowerCase() + ' '] || []
                                                ).concat(t[2]);
                                        t = s[e.toLowerCase() + ' '];
                                    }
                                    return null == t ? null : t.join(', ');
                                },
                                getAllResponseHeaders: function() {
                                    return l ? i : null;
                                },
                                setRequestHeader: function(e, t) {
                                    return (
                                        null == l && ((e = w[e.toLowerCase()] = w[e.toLowerCase()] || e), (b[e] = t)),
                                        this
                                    );
                                },
                                overrideMimeType: function(e) {
                                    return null == l && (h.mimeType = e), this;
                                },
                                statusCode: function(e) {
                                    var t;
                                    if (e)
                                        if (l) C.always(e[C.status]);
                                        else for (t in e) x[t] = [x[t], e[t]];
                                    return this;
                                },
                                abort: function(e) {
                                    var t = e || T;
                                    return r && r.abort(t), S(0, t), this;
                                },
                            };
                        if (
                            (m.promise(C),
                            (h.url = ((e || h.url || Et.href) + '').replace(Mt, Et.protocol + '//')),
                            (h.type = t.method || t.type || h.method || h.type),
                            (h.dataTypes = (h.dataType || '*').toLowerCase().match(H) || ['']),
                            null == h.crossDomain)
                        ) {
                            c = a.createElement('a');
                            try {
                                (c.href = h.url),
                                    (c.href = c.href),
                                    (h.crossDomain = Ft.protocol + '//' + Ft.host != c.protocol + '//' + c.host);
                            } catch (e) {
                                h.crossDomain = !0;
                            }
                        }
                        if (
                            (h.data &&
                                h.processData &&
                                'string' != typeof h.data &&
                                (h.data = k.param(h.data, h.traditional)),
                            zt(Rt, h, t, C),
                            l)
                        )
                            return C;
                        for (f in ((d = k.event && h.global) && 0 == k.active++ && k.event.trigger('ajaxStart'),
                        (h.type = h.type.toUpperCase()),
                        (h.hasContent = !Ht.test(h.type)),
                        (o = h.url.replace(Pt, '')),
                        h.hasContent
                            ? h.data &&
                              h.processData &&
                              0 === (h.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                              (h.data = h.data.replace(It, '+'))
                            : ((p = h.url.slice(o.length)),
                              h.data &&
                                  (h.processData || 'string' == typeof h.data) &&
                                  ((o += (At.test(o) ? '&' : '?') + h.data), delete h.data),
                              !1 === h.cache &&
                                  ((o = o.replace(Ot, '$1')), (p = (At.test(o) ? '&' : '?') + '_=' + jt++ + p)),
                              (h.url = o + p)),
                        h.ifModified &&
                            (k.lastModified[o] && C.setRequestHeader('If-Modified-Since', k.lastModified[o]),
                            k.etag[o] && C.setRequestHeader('If-None-Match', k.etag[o])),
                        ((h.data && h.hasContent && !1 !== h.contentType) || t.contentType) &&
                            C.setRequestHeader('Content-Type', h.contentType),
                        C.setRequestHeader(
                            'Accept',
                            h.dataTypes[0] && h.accepts[h.dataTypes[0]]
                                ? h.accepts[h.dataTypes[0]] + ('*' !== h.dataTypes[0] ? ', ' + Bt + '; q=0.01' : '')
                                : h.accepts['*'],
                        ),
                        h.headers))
                            C.setRequestHeader(f, h.headers[f]);
                        if (h.beforeSend && (!1 === h.beforeSend.call(g, C, h) || l)) return C.abort();
                        if (
                            ((T = 'abort'),
                            y.add(h.complete),
                            C.done(h.success),
                            C.fail(h.error),
                            (r = zt(Wt, h, t, C)))
                        ) {
                            if (((C.readyState = 1), d && v.trigger('ajaxSend', [C, h]), l)) return C;
                            h.async &&
                                h.timeout > 0 &&
                                (u = n.setTimeout(function() {
                                    C.abort('timeout');
                                }, h.timeout));
                            try {
                                (l = !1), r.send(b, S);
                            } catch (e) {
                                if (l) throw e;
                                S(-1, e);
                            }
                        } else S(-1, 'No Transport');
                        function S(e, t, a, s) {
                            var c,
                                f,
                                p,
                                b,
                                w,
                                T = t;
                            l ||
                                ((l = !0),
                                u && n.clearTimeout(u),
                                (r = void 0),
                                (i = s || ''),
                                (C.readyState = e > 0 ? 4 : 0),
                                (c = (e >= 200 && e < 300) || 304 === e),
                                a &&
                                    (b = (function(e, t, n) {
                                        for (var r, o, i, a, s = e.contents, u = e.dataTypes; '*' === u[0]; )
                                            u.shift(),
                                                void 0 === r && (r = e.mimeType || t.getResponseHeader('Content-Type'));
                                        if (r)
                                            for (o in s)
                                                if (s[o] && s[o].test(r)) {
                                                    u.unshift(o);
                                                    break;
                                                }
                                        if (u[0] in n) i = u[0];
                                        else {
                                            for (o in n) {
                                                if (!u[0] || e.converters[o + ' ' + u[0]]) {
                                                    i = o;
                                                    break;
                                                }
                                                a || (a = o);
                                            }
                                            i = i || a;
                                        }
                                        if (i) return i !== u[0] && u.unshift(i), n[i];
                                    })(h, C, a)),
                                (b = (function(e, t, n, r) {
                                    var o,
                                        i,
                                        a,
                                        s,
                                        u,
                                        c = {},
                                        l = e.dataTypes.slice();
                                    if (l[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
                                    for (i = l.shift(); i; )
                                        if (
                                            (e.responseFields[i] && (n[e.responseFields[i]] = t),
                                            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                                            (u = i),
                                            (i = l.shift()))
                                        )
                                            if ('*' === i) i = u;
                                            else if ('*' !== u && u !== i) {
                                                if (!(a = c[u + ' ' + i] || c['* ' + i]))
                                                    for (o in c)
                                                        if (
                                                            (s = o.split(' '))[1] === i &&
                                                            (a = c[u + ' ' + s[0]] || c['* ' + s[0]])
                                                        ) {
                                                            !0 === a
                                                                ? (a = c[o])
                                                                : !0 !== c[o] && ((i = s[0]), l.unshift(s[1]));
                                                            break;
                                                        }
                                                if (!0 !== a)
                                                    if (a && e.throws) t = a(t);
                                                    else
                                                        try {
                                                            t = a(t);
                                                        } catch (e) {
                                                            return {
                                                                state: 'parsererror',
                                                                error: a ? e : 'No conversion from ' + u + ' to ' + i,
                                                            };
                                                        }
                                            }
                                    return { state: 'success', data: t };
                                })(h, b, C, c)),
                                c
                                    ? (h.ifModified &&
                                          ((w = C.getResponseHeader('Last-Modified')) && (k.lastModified[o] = w),
                                          (w = C.getResponseHeader('etag')) && (k.etag[o] = w)),
                                      204 === e || 'HEAD' === h.type
                                          ? (T = 'nocontent')
                                          : 304 === e
                                          ? (T = 'notmodified')
                                          : ((T = b.state), (f = b.data), (c = !(p = b.error))))
                                    : ((p = T), (!e && T) || ((T = 'error'), e < 0 && (e = 0))),
                                (C.status = e),
                                (C.statusText = (t || T) + ''),
                                c ? m.resolveWith(g, [f, T, C]) : m.rejectWith(g, [C, T, p]),
                                C.statusCode(x),
                                (x = void 0),
                                d && v.trigger(c ? 'ajaxSuccess' : 'ajaxError', [C, h, c ? f : p]),
                                y.fireWith(g, [C, T]),
                                d && (v.trigger('ajaxComplete', [C, h]), --k.active || k.event.trigger('ajaxStop')));
                        }
                        return C;
                    },
                    getJSON: function(e, t, n) {
                        return k.get(e, t, n, 'json');
                    },
                    getScript: function(e, t) {
                        return k.get(e, void 0, t, 'script');
                    },
                }),
                k.each(['get', 'post'], function(e, t) {
                    k[t] = function(e, n, r, o) {
                        return (
                            y(n) && ((o = o || r), (r = n), (n = void 0)),
                            k.ajax(
                                k.extend(
                                    { url: e, type: t, dataType: o, data: n, success: r },
                                    k.isPlainObject(e) && e,
                                ),
                            )
                        );
                    };
                }),
                (k._evalUrl = function(e, t) {
                    return k.ajax({
                        url: e,
                        type: 'GET',
                        dataType: 'script',
                        cache: !0,
                        async: !1,
                        global: !1,
                        converters: { 'text script': function() {} },
                        dataFilter: function(e) {
                            k.globalEval(e, t);
                        },
                    });
                }),
                k.fn.extend({
                    wrapAll: function(e) {
                        var t;
                        return (
                            this[0] &&
                                (y(e) && (e = e.call(this[0])),
                                (t = k(e, this[0].ownerDocument)
                                    .eq(0)
                                    .clone(!0)),
                                this[0].parentNode && t.insertBefore(this[0]),
                                t
                                    .map(function() {
                                        for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                                        return e;
                                    })
                                    .append(this)),
                            this
                        );
                    },
                    wrapInner: function(e) {
                        return y(e)
                            ? this.each(function(t) {
                                  k(this).wrapInner(e.call(this, t));
                              })
                            : this.each(function() {
                                  var t = k(this),
                                      n = t.contents();
                                  n.length ? n.wrapAll(e) : t.append(e);
                              });
                    },
                    wrap: function(e) {
                        var t = y(e);
                        return this.each(function(n) {
                            k(this).wrapAll(t ? e.call(this, n) : e);
                        });
                    },
                    unwrap: function(e) {
                        return (
                            this.parent(e)
                                .not('body')
                                .each(function() {
                                    k(this).replaceWith(this.childNodes);
                                }),
                            this
                        );
                    },
                }),
                (k.expr.pseudos.hidden = function(e) {
                    return !k.expr.pseudos.visible(e);
                }),
                (k.expr.pseudos.visible = function(e) {
                    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
                }),
                (k.ajaxSettings.xhr = function() {
                    try {
                        return new n.XMLHttpRequest();
                    } catch (e) {}
                });
            var Qt = { 0: 200, 1223: 204 },
                Vt = k.ajaxSettings.xhr();
            (m.cors = !!Vt && 'withCredentials' in Vt),
                (m.ajax = Vt = !!Vt),
                k.ajaxTransport(function(e) {
                    var t, r;
                    if (m.cors || (Vt && !e.crossDomain))
                        return {
                            send: function(o, i) {
                                var a,
                                    s = e.xhr();
                                if ((s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields))
                                    for (a in e.xhrFields) s[a] = e.xhrFields[a];
                                for (a in (e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType),
                                e.crossDomain || o['X-Requested-With'] || (o['X-Requested-With'] = 'XMLHttpRequest'),
                                o))
                                    s.setRequestHeader(a, o[a]);
                                (t = function(e) {
                                    return function() {
                                        t &&
                                            ((t = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null),
                                            'abort' === e
                                                ? s.abort()
                                                : 'error' === e
                                                ? 'number' != typeof s.status
                                                    ? i(0, 'error')
                                                    : i(s.status, s.statusText)
                                                : i(
                                                      Qt[s.status] || s.status,
                                                      s.statusText,
                                                      'text' !== (s.responseType || 'text') ||
                                                          'string' != typeof s.responseText
                                                          ? { binary: s.response }
                                                          : { text: s.responseText },
                                                      s.getAllResponseHeaders(),
                                                  ));
                                    };
                                }),
                                    (s.onload = t()),
                                    (r = s.onerror = s.ontimeout = t('error')),
                                    void 0 !== s.onabort
                                        ? (s.onabort = r)
                                        : (s.onreadystatechange = function() {
                                              4 === s.readyState &&
                                                  n.setTimeout(function() {
                                                      t && r();
                                                  });
                                          }),
                                    (t = t('abort'));
                                try {
                                    s.send((e.hasContent && e.data) || null);
                                } catch (e) {
                                    if (t) throw e;
                                }
                            },
                            abort: function() {
                                t && t();
                            },
                        };
                }),
                k.ajaxPrefilter(function(e) {
                    e.crossDomain && (e.contents.script = !1);
                }),
                k.ajaxSetup({
                    accepts: {
                        script:
                            'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                    },
                    contents: { script: /\b(?:java|ecma)script\b/ },
                    converters: {
                        'text script': function(e) {
                            return k.globalEval(e), e;
                        },
                    },
                }),
                k.ajaxPrefilter('script', function(e) {
                    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
                }),
                k.ajaxTransport('script', function(e) {
                    var t, n;
                    if (e.crossDomain || e.scriptAttrs)
                        return {
                            send: function(r, o) {
                                (t = k('<script>')
                                    .attr(e.scriptAttrs || {})
                                    .prop({ charset: e.scriptCharset, src: e.url })
                                    .on(
                                        'load error',
                                        (n = function(e) {
                                            t.remove(), (n = null), e && o('error' === e.type ? 404 : 200, e.type);
                                        }),
                                    )),
                                    a.head.appendChild(t[0]);
                            },
                            abort: function() {
                                n && n();
                            },
                        };
                });
            var Gt,
                Yt = [],
                Jt = /(=)\?(?=&|$)|\?\?/;
            k.ajaxSetup({
                jsonp: 'callback',
                jsonpCallback: function() {
                    var e = Yt.pop() || k.expando + '_' + jt++;
                    return (this[e] = !0), e;
                },
            }),
                k.ajaxPrefilter('json jsonp', function(e, t, r) {
                    var o,
                        i,
                        a,
                        s =
                            !1 !== e.jsonp &&
                            (Jt.test(e.url)
                                ? 'url'
                                : 'string' == typeof e.data &&
                                  0 === (e.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                                  Jt.test(e.data) &&
                                  'data');
                    if (s || 'jsonp' === e.dataTypes[0])
                        return (
                            (o = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                            s
                                ? (e[s] = e[s].replace(Jt, '$1' + o))
                                : !1 !== e.jsonp && (e.url += (At.test(e.url) ? '&' : '?') + e.jsonp + '=' + o),
                            (e.converters['script json'] = function() {
                                return a || k.error(o + ' was not called'), a[0];
                            }),
                            (e.dataTypes[0] = 'json'),
                            (i = n[o]),
                            (n[o] = function() {
                                a = arguments;
                            }),
                            r.always(function() {
                                void 0 === i ? k(n).removeProp(o) : (n[o] = i),
                                    e[o] && ((e.jsonpCallback = t.jsonpCallback), Yt.push(o)),
                                    a && y(i) && i(a[0]),
                                    (a = i = void 0);
                            }),
                            'script'
                        );
                }),
                (m.createHTMLDocument =
                    (((Gt = a.implementation.createHTMLDocument('').body).innerHTML = '<form></form><form></form>'),
                    2 === Gt.childNodes.length)),
                (k.parseHTML = function(e, t, n) {
                    return 'string' != typeof e
                        ? []
                        : ('boolean' == typeof t && ((n = t), (t = !1)),
                          t ||
                              (m.createHTMLDocument
                                  ? (((r = (t = a.implementation.createHTMLDocument('')).createElement('base')).href =
                                        a.location.href),
                                    t.head.appendChild(r))
                                  : (t = a)),
                          (i = !n && []),
                          (o = q.exec(e))
                              ? [t.createElement(o[1])]
                              : ((o = Ce([e], t, i)), i && i.length && k(i).remove(), k.merge([], o.childNodes)));
                    var r, o, i;
                }),
                (k.fn.load = function(e, t, n) {
                    var r,
                        o,
                        i,
                        a = this,
                        s = e.indexOf(' ');
                    return (
                        s > -1 && ((r = bt(e.slice(s))), (e = e.slice(0, s))),
                        y(t) ? ((n = t), (t = void 0)) : t && 'object' == typeof t && (o = 'POST'),
                        a.length > 0 &&
                            k
                                .ajax({ url: e, type: o || 'GET', dataType: 'html', data: t })
                                .done(function(e) {
                                    (i = arguments),
                                        a.html(
                                            r
                                                ? k('<div>')
                                                      .append(k.parseHTML(e))
                                                      .find(r)
                                                : e,
                                        );
                                })
                                .always(
                                    n &&
                                        function(e, t) {
                                            a.each(function() {
                                                n.apply(this, i || [e.responseText, t, e]);
                                            });
                                        },
                                ),
                        this
                    );
                }),
                k.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function(
                    e,
                    t,
                ) {
                    k.fn[t] = function(e) {
                        return this.on(t, e);
                    };
                }),
                (k.expr.pseudos.animated = function(e) {
                    return k.grep(k.timers, function(t) {
                        return e === t.elem;
                    }).length;
                }),
                (k.offset = {
                    setOffset: function(e, t, n) {
                        var r,
                            o,
                            i,
                            a,
                            s,
                            u,
                            c = k.css(e, 'position'),
                            l = k(e),
                            d = {};
                        'static' === c && (e.style.position = 'relative'),
                            (s = l.offset()),
                            (i = k.css(e, 'top')),
                            (u = k.css(e, 'left')),
                            ('absolute' === c || 'fixed' === c) && (i + u).indexOf('auto') > -1
                                ? ((a = (r = l.position()).top), (o = r.left))
                                : ((a = parseFloat(i) || 0), (o = parseFloat(u) || 0)),
                            y(t) && (t = t.call(e, n, k.extend({}, s))),
                            null != t.top && (d.top = t.top - s.top + a),
                            null != t.left && (d.left = t.left - s.left + o),
                            'using' in t ? t.using.call(e, d) : l.css(d);
                    },
                }),
                k.fn.extend({
                    offset: function(e) {
                        if (arguments.length)
                            return void 0 === e
                                ? this
                                : this.each(function(t) {
                                      k.offset.setOffset(this, e, t);
                                  });
                        var t,
                            n,
                            r = this[0];
                        return r
                            ? r.getClientRects().length
                                ? ((t = r.getBoundingClientRect()),
                                  (n = r.ownerDocument.defaultView),
                                  { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
                                : { top: 0, left: 0 }
                            : void 0;
                    },
                    position: function() {
                        if (this[0]) {
                            var e,
                                t,
                                n,
                                r = this[0],
                                o = { top: 0, left: 0 };
                            if ('fixed' === k.css(r, 'position')) t = r.getBoundingClientRect();
                            else {
                                for (
                                    t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
                                    e && (e === n.body || e === n.documentElement) && 'static' === k.css(e, 'position');

                                )
                                    e = e.parentNode;
                                e &&
                                    e !== r &&
                                    1 === e.nodeType &&
                                    (((o = k(e).offset()).top += k.css(e, 'borderTopWidth', !0)),
                                    (o.left += k.css(e, 'borderLeftWidth', !0)));
                            }
                            return {
                                top: t.top - o.top - k.css(r, 'marginTop', !0),
                                left: t.left - o.left - k.css(r, 'marginLeft', !0),
                            };
                        }
                    },
                    offsetParent: function() {
                        return this.map(function() {
                            for (var e = this.offsetParent; e && 'static' === k.css(e, 'position'); )
                                e = e.offsetParent;
                            return e || ae;
                        });
                    },
                }),
                k.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(e, t) {
                    var n = 'pageYOffset' === t;
                    k.fn[e] = function(r) {
                        return z(
                            this,
                            function(e, r, o) {
                                var i;
                                if ((x(e) ? (i = e) : 9 === e.nodeType && (i = e.defaultView), void 0 === o))
                                    return i ? i[t] : e[r];
                                i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : (e[r] = o);
                            },
                            e,
                            r,
                            arguments.length,
                        );
                    };
                }),
                k.each(['top', 'left'], function(e, t) {
                    k.cssHooks[t] = Ve(m.pixelPosition, function(e, n) {
                        if (n) return (n = Qe(e, t)), Ue.test(n) ? k(e).position()[t] + 'px' : n;
                    });
                }),
                k.each({ Height: 'height', Width: 'width' }, function(e, t) {
                    k.each({ padding: 'inner' + e, content: t, '': 'outer' + e }, function(n, r) {
                        k.fn[r] = function(o, i) {
                            var a = arguments.length && (n || 'boolean' != typeof o),
                                s = n || (!0 === o || !0 === i ? 'margin' : 'border');
                            return z(
                                this,
                                function(t, n, o) {
                                    var i;
                                    return x(t)
                                        ? 0 === r.indexOf('outer')
                                            ? t['inner' + e]
                                            : t.document.documentElement['client' + e]
                                        : 9 === t.nodeType
                                        ? ((i = t.documentElement),
                                          Math.max(
                                              t.body['scroll' + e],
                                              i['scroll' + e],
                                              t.body['offset' + e],
                                              i['offset' + e],
                                              i['client' + e],
                                          ))
                                        : void 0 === o
                                        ? k.css(t, n, s)
                                        : k.style(t, n, o, s);
                                },
                                t,
                                a ? o : void 0,
                                a,
                            );
                        };
                    });
                }),
                k.each(
                    'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                        ' ',
                    ),
                    function(e, t) {
                        k.fn[t] = function(e, n) {
                            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                        };
                    },
                ),
                k.fn.extend({
                    hover: function(e, t) {
                        return this.mouseenter(e).mouseleave(t || e);
                    },
                }),
                k.fn.extend({
                    bind: function(e, t, n) {
                        return this.on(e, null, t, n);
                    },
                    unbind: function(e, t) {
                        return this.off(e, null, t);
                    },
                    delegate: function(e, t, n, r) {
                        return this.on(t, e, n, r);
                    },
                    undelegate: function(e, t, n) {
                        return 1 === arguments.length ? this.off(e, '**') : this.off(t, e || '**', n);
                    },
                }),
                (k.proxy = function(e, t) {
                    var n, r, o;
                    if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), y(e)))
                        return (
                            (r = u.call(arguments, 2)),
                            ((o = function() {
                                return e.apply(t || this, r.concat(u.call(arguments)));
                            }).guid = e.guid = e.guid || k.guid++),
                            o
                        );
                }),
                (k.holdReady = function(e) {
                    e ? k.readyWait++ : k.ready(!0);
                }),
                (k.isArray = Array.isArray),
                (k.parseJSON = JSON.parse),
                (k.nodeName = N),
                (k.isFunction = y),
                (k.isWindow = x),
                (k.camelCase = G),
                (k.type = T),
                (k.now = Date.now),
                (k.isNumeric = function(e) {
                    var t = k.type(e);
                    return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
                }),
                void 0 ===
                    (r = function() {
                        return k;
                    }.apply(t, [])) || (e.exports = r);
            var Kt = n.jQuery,
                Zt = n.$;
            return (
                (k.noConflict = function(e) {
                    return n.$ === k && (n.$ = Zt), e && n.jQuery === k && (n.jQuery = Kt), k;
                }),
                o || (n.jQuery = n.$ = k),
                k
            );
        });
    },
    function(e, t, n) {
        'use strict';
        n.r(t);
        var r = ({
                title: e,
                short_description: t,
                id: n,
                buttonText: r,
                price_cents: o,
                price_currency: i,
                quantity: a,
            }) =>
                `\n<div>\n    <div class="uk-card uk-card-default uk-margin-left uk-margin-top">\n        <div class="uk-card-header">\n            <div class="uk-grid-small uk-flex-middle" uk-grid>\n                <div class="uk-width-auto">\n                    <//img class="uk-border-circle" width="40" height="40" src="images/avatar.jpg">\n                    <span uk-icon="icon: camera"></span>\n                </div>\n                <div class="uk-width-expand">\n                    <h3 class="uk-card-title uk-margin-remove-bottom product-title" id="product-title-${n}">${e}</h3>\n                    <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>\n                </div>\n            </div>\n        </div>\n        <div class="uk-card-body">\n            <p class="short-description">${t}</p>\n            <hr class="uk-divider-small">\n            <p class="product-price">${o} ${i}</p> \n            <hr class="uk-divider-small">\n            <p class="product-quantity"><span class="uk-label">quantity</span> ${a}</p>\n        </div>\n        <div class="uk-card-footer">\n            <a  href="#" class="uk-button uk-button-text add-to-cart" data-id="${n}">${r}</a>\n        </div>\n    </div>\n</div>\n`,
            o = n(0),
            i = n.n(o);
        var a = e =>
            `\n<div class="uk-alert-danger" uk-alert>\n    <a class="uk-alert-close" uk-close></a>\n    <p>${e}</p>\n</div>\n`;
        var s = () =>
            '\n<div class="uk-alert-success" uk-alert>\n    <a class="uk-alert-close" uk-close></a>\n    <p>Your checkout has been successful.</p>\n</div>\n';
        class u {
            constructor(e) {
                this.graphqlService = e;
            }
            createSession() {
                return this.graphqlService
                    .sendQuery(
                        'mutation {\n            createSession {\n                token\n            }\n        }',
                    )
                    .then(e => {
                        let t = e.data.createSession.token;
                        return this.addSessionTokenToLocalStorage(t), e;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            addSessionTokenToLocalStorage(e) {
                localStorage.setItem('userToken', e);
            }
            checkIfTokenInLocalStorage() {
                return !!localStorage.getItem('userToken');
            }
            checkTokenExistsInDatabase() {
                let e = localStorage.getItem('userToken');
                return this.graphqlService.sendQuery(
                    ' {\n            me {\n                session {\n                    id\n                    token\n                }\n            }\n        }',
                    e,
                );
            }
        }
        var c = $('#loadingDiv').hide();
        $(document)
            .ajaxStart(function() {
                c.show();
            })
            .ajaxStop(function() {
                c.hide();
            });
        let l = window.location.pathname,
            d = new (class {
                constructor() {
                    this.userToken = localStorage.getItem('userToken');
                }
                async sendQuery(e, t = '') {
                    try {
                        return await i.a.ajax({
                            url: 'http://laravel-gernzy.test/graphql',
                            contentType: 'application/json',
                            type: 'POST',
                            headers: { Authorization: `Bearer ${t}` },
                            data: JSON.stringify({ query: e }),
                        });
                    } catch (e) {
                        return e;
                    }
                }
            })(),
            f = new (class {
                constructor(e) {
                    this.graphqlService = e;
                }
                setUpSessionData() {
                    var e = localStorage.getItem('userToken');
                    return this.graphqlService
                        .sendQuery(
                            '{\n            me {\n                session {\n                    data\n                }\n            }\n        }',
                            e,
                        )
                        .then(e => {
                            localStorage.setItem('sessionData', e.data.me.session.data),
                                e.data.me.session.data[1] &&
                                    localStorage.setItem('currency', e.data.me.session.data[1]);
                        });
                }
                setUpShopConfig() {
                    var e = localStorage.getItem('userToken');
                    return this.graphqlService
                        .sendQuery(
                            '\n            query {\n                shopConfig {\n                    enabled_currencies\n                    default_currency\n                }\n            }\n        ',
                            e,
                        )
                        .then(e => {
                            e.data.shopConfig.enabled_currencies.forEach(e => {
                                i()('#available-currencies').append(
                                    `<li><a href='#' class='available-currency' data-currency="${e}">${e}</a></li>`,
                                );
                            }),
                                i()('.available-currency').on('click', this.changeUserCurrency.bind(this)),
                                localStorage.setItem('default_currency', e.data.shopConfig.default_currency);
                        });
                }
                setUpGeoLocation() {
                    var e = localStorage.getItem('userToken');
                    return this.graphqlService
                        .sendQuery(
                            '\n            mutation {\n                setSessionGeoLocation {\n                    geolocation_record\n                }\n            }\n        ',
                            e,
                        )
                        .then(e => {
                            let t = e.errors[0].debugMessage;
                            t
                                ? console.log(t)
                                : localStorage.setItem(
                                      'setSessionGeoLocation',
                                      e.data.setSessionGeoLocation.geolocation_record,
                                  );
                        });
                }
                changeUserCurrency(e) {
                    var t = localStorage.getItem('userToken');
                    let n = `\n            mutation {\n                setSessionCurrency(input: {\n                    currency: "${i()(
                        e.target,
                    ).attr(
                        'data-currency',
                    )}"\n                }){\n                    currency\n                }\n            }\n        `;
                    return this.graphqlService.sendQuery(n, t).then(e => {
                        try {
                            let t = e.errors[0].debugMessage;
                            console.log(t);
                        } catch {
                            localStorage.setItem('currency', e.data.setSessionCurrency.currency), location.reload(!0);
                        }
                    });
                }
                setupUser() {
                    let e = new u(this.graphqlService);
                    e.checkIfTokenInLocalStorage()
                        ? e.checkTokenExistsInDatabase().then(t => {
                              try {
                                  'Cannot return null for non-nullable field Session.id.' == t.errors[0].debugMessage &&
                                      e.createSession();
                              } catch (e) {}
                          })
                        : e.createSession();
                }
            })(d),
            p = new (class {
                constructor(e, t) {
                    (this.graphqlService = e), (this.cart = t);
                }
                getAllProducts() {
                    let e = localStorage.getItem('userToken');
                    return this.graphqlService
                        .sendQuery(
                            'query {\n            products(first:10) {\n                data {\n                    id\n                    title\n                    status\n                    published\n                    short_description\n                    price_cents\n                    price_currency\n                }\n                paginatorInfo {\n                    total\n                    hasMorePages\n                    currentPage\n                }\n            }\n        }',
                            e,
                        )
                        .then(e => {
                            let t;
                            try {
                                t = e.data.products.data;
                            } catch (t) {
                                return (
                                    console.log(e),
                                    void i()('.products-container').html(
                                        a(`There was an error loading products. <br> ${e.errors[0].extensions.reason}`),
                                    )
                                );
                            }
                            let n = t.map(e => {
                                var t = localStorage.getItem('currency');
                                return (
                                    t || (t = e.price_currency),
                                    {
                                        title: e.title,
                                        price_cents: e.price_cents / 100,
                                        price_currency: t,
                                        short_description: e.short_description,
                                        id: e.id,
                                        quantity: 1,
                                        buttonText: 'Add to cart',
                                    }
                                );
                            });
                            return (
                                i()('.products-container').html(n.map(r).join('')),
                                i()('.add-to-cart').on('click', this.addProductToCart.bind(this)),
                                e
                            );
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                getProduct(e) {
                    let t = `query {\n            product(id:${e}) {\n                    id\n                    title\n                    status\n                    published\n                    short_description\n                    price_cents\n                    price_currency\n            }\n        }`,
                        n = localStorage.getItem('userToken');
                    return this.graphqlService.sendQuery(t, n);
                }
                addProductToCart(e) {
                    let t = i()(e.target).attr('data-id');
                    var n = localStorage.getItem('userToken');
                    let r = ` mutation {\n            addToCart(input: {\n                    items: [\n                        { product_id: ${t}, quantity: 1 }\n                    ]\n                }) {\n                cart {\n                    items {\n                        product_id\n                        quantity\n                    }\n                }\n            }\n        }`;
                    this.graphqlService
                        .sendQuery(r, n)
                        .then(n => {
                            n.data.addToCart.cart.items.forEach(n => {
                                n.product_id == t &&
                                    i()(e.target)
                                        .parent()
                                        .append(i()(`<span class="uk-badge">${n.quantity}</span>`));
                            });
                        })
                        .catch(e => {
                            console.log(`addProductToCart: ${e}`);
                        });
                }
            })(d),
            h = new (class {
                constructor(e, t) {
                    (this.productObj = e), (this.graphqlService = t);
                }
                viewProductsInCart() {
                    var e = localStorage.getItem('userToken');
                    return this.graphqlService
                        .sendQuery(
                            '{\n            me {\n                cart {\n                    items {\n                        product_id\n                        quantity\n                    }\n                }\n            }\n        }',
                            e,
                        )
                        .then(e => {
                            let t = e.data.me.cart.items;
                            return (
                                t && t.length > 0
                                    ? this.lookupProductsInCart(e.data.me.cart.items)
                                    : (i()('.cart-products').html(a('No products in cart.')),
                                      i()('#cart-checkout').addClass('uk-disabled')),
                                e
                            );
                        })
                        .catch(e => {
                            console.log(`viewProductsInCart: ${e}`);
                        });
                }
                async lookupProductsInCart(e) {
                    return await Promise.all(
                        e.map(async e => {
                            const t = await this.productObj.getProduct(e.product_id);
                            let n = { quantity: e.quantity };
                            return { ...t.data.product, ...n };
                        }),
                    )
                        .then(e => (this.populateUIWithProducts(e), e))
                        .catch(e => {
                            console.log(e);
                        });
                }
                populateUIWithProducts(e) {
                    let t = e.map(e => {
                        var t = localStorage.getItem('currency');
                        return (
                            t || (t = e.price_currency),
                            {
                                title: e.title,
                                short_description: e.short_description,
                                id: e.id,
                                price_cents: e.price_cents / 100,
                                price_currency: t,
                                quantity: e.quantity,
                                buttonText: 'Remove',
                            }
                        );
                    });
                    i()('.cart-products').html(t.map(r).join(''));
                }
            })(p, d),
            g = new (class {
                constructor(e, t = null) {
                    (this.graphqlService = e), (this.cart = t);
                }
                checkout() {
                    var e = this;
                    i()('#checkout-form').submit(function(t) {
                        t.preventDefault();
                        var n = i()('#checkout-form :input'),
                            r = {};
                        n.each(function() {
                            r[this.name] = i()(this).val();
                        }),
                            (r.use_shipping_for_billing = i()('#use_shipping_for_billing').prop('checked')),
                            (r.agree_to_terms = i()('#agree_to_terms').prop('checked')),
                            e.sendOfCheckoutInfo(r);
                    });
                }
                sendOfCheckoutInfo(e) {
                    var t = localStorage.getItem('userToken');
                    let n = ` mutation {\n            checkout(input: {\n                name: "${e.name}",\n                email: "${e.email}",\n                telephone: "${e.telephone}",\n                mobile: "${e.mobile}",\n                billing_address: {\n                    line_1: "${e.billing_address_line_1}",\n                    line_2: "${e.billing_address_line_2}",\n                    state: "${e.billing_address_state}",\n                    postcode: "${e.billing_address_postcode}",\n                    country: "${e.billing_address_country}"\n                },\n                shipping_address: {\n                    line_1: "${e.shipping_address_line_1}",\n                    line_2: "${e.shipping_address_line_2}",\n                    state: "${e.shipping_address_state}",\n                    postcode: "${e.shipping_address_postcode}",\n                    country: "${e.shipping_address_country}"\n                },\n                use_shipping_for_billing: ${e.use_shipping_for_billing},\n                payment_method: "${e.payment_method}",\n                agree_to_terms: ${e.agree_to_terms},\n                notes: "${e.notes}"\n            }){\n                order {\n                    id\n                }\n            }\n        }`;
                    return this.graphqlService
                        .sendQuery(n, t)
                        .then(e => (i()('.checkout-container').html(s), e))
                        .catch(e => {
                            console.log(e);
                        });
                }
                getBasketTotal() {
                    var e = localStorage.getItem('userToken');
                    return this.graphqlService
                        .sendQuery(
                            '{\n            me {\n                cart {\n                    cart_total\n                }\n            }\n        }',
                            e,
                        )
                        .then(e => {
                            let t = localStorage.getItem('currency');
                            return (
                                t || (t = localStorage.getItem('default_currency')),
                                i()('#checkout-cart-total').html(`${e.data.me.cart.cart_total / 100} ${t}`),
                                e
                            );
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                displayLineItems() {
                    return this.cart.viewProductsInCart().then(e => {
                        try {
                            let t = e.errors[0].debugMessage;
                            console.log(t);
                        } catch {
                            let t = e.data.me.cart.items;
                            t && t.length > 0
                                ? this.cart.lookupProductsInCart(t).then(e => {
                                      let t = localStorage.getItem('currency');
                                      t || (t = localStorage.getItem('default_currency')),
                                          e.forEach(e => {
                                              i()('#table-body-line-item').append(
                                                  i()(
                                                      `<tr>\n                                    <td>${
                                                          e.title
                                                      }</td>\n                                    <td>${
                                                          e.quantity
                                                      }</td>\n                                    <td>${e.price_cents /
                                                          100} ${t}</td>\n                                </tr>`,
                                                  ),
                                              );
                                          });
                                  })
                                : i()('.checkout-container').html(errorTemplate('No products in cart.'));
                        }
                        return e;
                    });
                }
            })(d, h);
        f.setupUser(),
            f.setUpShopConfig(),
            f.setUpSessionData(),
            l.includes('shop') && p.getAllProducts(),
            l.includes('cart') && h.viewProductsInCart(),
            l.includes('checkout') && (g.getBasketTotal(), g.displayLineItems(), g.checkout());
    },
]);
