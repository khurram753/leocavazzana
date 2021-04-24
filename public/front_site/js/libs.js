!(function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window
                ? window
                : "undefined" != typeof global
                    ? global
                    : "undefined" != typeof self
                        ? self
                        : this
        ).Pjax = e();
    }
})(function () {
    return (function () {
        return function e(t, i, n) {
            function s(r, o) {
                if (!i[r]) {
                    if (!t[r]) {
                        var l = "function" == typeof require && require;
                        if (!o && l) return l(r, !0);
                        if (a) return a(r, !0);
                        var c = new Error("Cannot find module '" + r + "'");
                        throw ((c.code = "MODULE_NOT_FOUND"), c);
                    }
                    var d = (i[r] = {exports: {}});
                    t[r][0].call(
                        d.exports,
                        function (e) {
                            return s(t[r][1][e] || e);
                        },
                        d,
                        d.exports,
                        e,
                        t,
                        i,
                        n
                    );
                }
                return i[r].exports;
            }

            for (
                var a = "function" == typeof require && require, r = 0;
                r < n.length;
                r++
            )
                s(n[r]);
            return s;
        };
    })()(
        {
            1: [
                function (e, t, i) {
                    var n = e("./lib/execute-scripts"),
                        s = e("./lib/foreach-els"),
                        a = e("./lib/parse-options"),
                        r = e("./lib/switches"),
                        o = e("./lib/uniqueid"),
                        l = e("./lib/events/on"),
                        c = e("./lib/events/trigger"),
                        d = e("./lib/util/clone"),
                        h = e("./lib/util/contains"),
                        u = e("./lib/util/extend"),
                        p = e("./lib/util/noop"),
                        f = function (e) {
                            (this.state = {
                                numPendingSwitches: 0,
                                href: null,
                                options: null,
                            }),
                                (this.options = a(e)),
                                this.log("Pjax options", this.options),
                            this.options.scrollRestoration &&
                            "scrollRestoration" in history &&
                            (history.scrollRestoration = "manual"),
                                (this.maxUid = this.lastUid = o()),
                                this.parseDOM(document),
                                l(
                                    window,
                                    "popstate",
                                    function (e) {
                                        if (e.state) {
                                            var t = d(this.options);
                                            (t.url = e.state.url),
                                                (t.title = e.state.title),
                                                (t.history = !1),
                                                (t.scrollPos = e.state.scrollPos),
                                                e.state.uid < this.lastUid
                                                    ? (t.backward = !0)
                                                    : (t.forward = !0),
                                                (this.lastUid = e.state.uid),
                                                this.loadUrl(e.state.url, t);
                                        }
                                    }.bind(this)
                                );
                        };
                    if (
                        ((f.switches = r),
                            (f.prototype = {
                                log: e("./lib/proto/log"),
                                getElements: function (e) {
                                    return e.querySelectorAll(this.options.elements);
                                },
                                parseDOM: function (t) {
                                    var i = e("./lib/proto/parse-element");
                                    s(this.getElements(t), i, this);
                                },
                                refresh: function (e) {
                                    this.parseDOM(e || document);
                                },
                                reload: function () {
                                    window.location.reload();
                                },
                                attachLink: e("./lib/proto/attach-link"),
                                attachForm: e("./lib/proto/attach-form"),
                                forEachSelectors: function (t, i, n) {
                                    return e("./lib/foreach-selectors").bind(this)(
                                        this.options.selectors,
                                        t,
                                        i,
                                        n
                                    );
                                },
                                switchSelectors: function (t, i, n, s) {
                                    return e("./lib/switches-selectors").bind(this)(
                                        this.options.switches,
                                        this.options.switchesOptions,
                                        t,
                                        i,
                                        n,
                                        s
                                    );
                                },
                                latestChance: function (e) {
                                    window.location = e;
                                },
                                onSwitch: function () {
                                    c(window, "resize scroll"),
                                        this.state.numPendingSwitches--,
                                    0 === this.state.numPendingSwitches &&
                                    this.afterAllSwitches();
                                },
                                loadContent: function (e, t) {
                                    if ("string" == typeof e) {
                                        var i = document.implementation.createHTMLDocument("pjax"),
                                            n = e.match(/<html[^>]+>/gi);
                                        if (
                                            (n &&
                                            n.length &&
                                            (n = n[0].match(/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi))
                                                .length &&
                                            (n.shift(),
                                                n.forEach(function (e) {
                                                    var t = e.trim().split("=");
                                                    1 === t.length
                                                        ? i.documentElement.setAttribute(t[0], !0)
                                                        : i.documentElement.setAttribute(
                                                        t[0],
                                                        t[1].slice(1, -1)
                                                        );
                                                })),
                                                (i.documentElement.innerHTML = e),
                                                this.log(
                                                    "load content",
                                                    i.documentElement.attributes,
                                                    i.documentElement.innerHTML.length
                                                ),
                                            document.activeElement &&
                                            h(
                                                document,
                                                this.options.selectors,
                                                document.activeElement
                                            ))
                                        )
                                            try {
                                                document.activeElement.blur();
                                            } catch (e) {
                                            }
                                        this.switchSelectors(this.options.selectors, i, document, t);
                                    } else c(document, "pjax:complete pjax:error", t);
                                },
                                abortRequest: e("./lib/abort-request"),
                                doRequest: e("./lib/send-request"),
                                handleResponse: e("./lib/proto/handle-response"),
                                loadUrl: function (e, t) {
                                    (t =
                                        "object" == typeof t
                                            ? u({}, this.options, t)
                                            : d(this.options)),
                                        this.log("load href", e, t),
                                        this.abortRequest(this.request),
                                        c(document, "pjax:send", t),
                                        (this.request = this.doRequest(
                                            e,
                                            t,
                                            this.handleResponse.bind(this)
                                        ));
                                },
                                afterAllSwitches: function () {
                                    var e = Array.prototype.slice
                                        .call(document.querySelectorAll("[autofocus]"))
                                        .pop();
                                    e && document.activeElement !== e && e.focus(),
                                        this.options.selectors.forEach(function (e) {
                                            s(document.querySelectorAll(e), function (e) {
                                                n(e);
                                            });
                                        });
                                    var t = this.state;
                                    if (
                                        (t.options.history &&
                                        (window.history.state ||
                                        ((this.lastUid = this.maxUid = o()),
                                            window.history.replaceState(
                                                {
                                                    url: window.location.href,
                                                    title: document.title,
                                                    uid: this.maxUid,
                                                    scrollPos: [0, 0],
                                                },
                                                document.title
                                            )),
                                            (this.lastUid = this.maxUid = o()),
                                            window.history.pushState(
                                                {
                                                    url: t.href,
                                                    title: t.options.title,
                                                    uid: this.maxUid,
                                                    scrollPos: [0, 0],
                                                },
                                                t.options.title,
                                                t.href
                                            )),
                                            this.forEachSelectors(function (e) {
                                                this.parseDOM(e);
                                            }, this),
                                            c(document, "pjax:complete pjax:success", t.options),
                                        "function" == typeof t.options.analytics &&
                                        t.options.analytics(),
                                            t.options.history)
                                    ) {
                                        var i = document.createElement("a");
                                        if (((i.href = this.state.href), i.hash)) {
                                            var a = i.hash.slice(1);
                                            a = decodeURIComponent(a);
                                            var r = 0,
                                                l =
                                                    document.getElementById(a) ||
                                                    document.getElementsByName(a)[0];
                                            if (l && l.offsetParent)
                                                do {
                                                    (r += l.offsetTop), (l = l.offsetParent);
                                                } while (l);
                                            window.scrollTo(0, r);
                                        } else
                                            !1 !== t.options.scrollTo &&
                                            (t.options.scrollTo.length > 1
                                                ? window.scrollTo(
                                                    t.options.scrollTo[0],
                                                    t.options.scrollTo[1]
                                                )
                                                : window.scrollTo(0, t.options.scrollTo));
                                    } else
                                        t.options.scrollRestoration &&
                                        t.options.scrollPos &&
                                        window.scrollTo(
                                            t.options.scrollPos[0],
                                            t.options.scrollPos[1]
                                        );
                                    this.state = {
                                        numPendingSwitches: 0,
                                        href: null,
                                        options: null,
                                    };
                                },
                            }),
                            (f.isSupported = e("./lib/is-supported")),
                            f.isSupported())
                    )
                        t.exports = f;
                    else {
                        var m = p;
                        for (var v in f.prototype)
                            f.prototype.hasOwnProperty(v) &&
                            "function" == typeof f.prototype[v] &&
                            (m[v] = p);
                        t.exports = m;
                    }
                },
                {
                    "./lib/abort-request": 2,
                    "./lib/events/on": 4,
                    "./lib/events/trigger": 5,
                    "./lib/execute-scripts": 6,
                    "./lib/foreach-els": 7,
                    "./lib/foreach-selectors": 8,
                    "./lib/is-supported": 9,
                    "./lib/parse-options": 10,
                    "./lib/proto/attach-form": 11,
                    "./lib/proto/attach-link": 12,
                    "./lib/proto/handle-response": 13,
                    "./lib/proto/log": 14,
                    "./lib/proto/parse-element": 15,
                    "./lib/send-request": 16,
                    "./lib/switches": 18,
                    "./lib/switches-selectors": 17,
                    "./lib/uniqueid": 19,
                    "./lib/util/clone": 20,
                    "./lib/util/contains": 21,
                    "./lib/util/extend": 22,
                    "./lib/util/noop": 23,
                },
            ],
            2: [
                function (e, t, i) {
                    var n = e("./util/noop");
                    t.exports = function (e) {
                        e && e.readyState < 4 && ((e.onreadystatechange = n), e.abort());
                    };
                },
                {"./util/noop": 23},
            ],
            3: [
                function (e, t, i) {
                    t.exports = function (e) {
                        var t = e.text || e.textContent || e.innerHTML || "",
                            i = e.src || "",
                            n =
                                e.parentNode ||
                                document.querySelector("head") ||
                                document.documentElement,
                            s = document.createElement("script");
                        if (t.match("document.write"))
                            return (
                                console &&
                                console.log &&
                                console.log(
                                    "Script contains document.write. Can’t be executed correctly. Code skipped ",
                                    e
                                ),
                                    !1
                            );
                        if (
                            ((s.type = "text/javascript"),
                                (s.id = e.id),
                            "" !== i && ((s.src = i), (s.async = !1)),
                            "" !== t)
                        )
                            try {
                                s.appendChild(document.createTextNode(t));
                            } catch (e) {
                                s.text = t;
                            }
                        return (
                            n.appendChild(s),
                            (n instanceof HTMLHeadElement || n instanceof HTMLBodyElement) &&
                            n.contains(s) &&
                            n.removeChild(s),
                                !0
                        );
                    };
                },
                {},
            ],
            4: [
                function (e, t, i) {
                    var n = e("../foreach-els");
                    t.exports = function (e, t, i, s) {
                        (t = "string" == typeof t ? t.split(" ") : t).forEach(function (t) {
                            n(e, function (e) {
                                e.addEventListener(t, i, s);
                            });
                        });
                    };
                },
                {"../foreach-els": 7},
            ],
            5: [
                function (e, t, i) {
                    var n = e("../foreach-els");
                    t.exports = function (e, t, i) {
                        (t = "string" == typeof t ? t.split(" ") : t).forEach(function (t) {
                            var s;
                            (s = document.createEvent("HTMLEvents")).initEvent(t, !0, !0),
                                (s.eventName = t),
                            i &&
                            Object.keys(i).forEach(function (e) {
                                s[e] = i[e];
                            }),
                                n(e, function (e) {
                                    var t = !1;
                                    e.parentNode ||
                                    e === document ||
                                    e === window ||
                                    ((t = !0), document.body.appendChild(e)),
                                        e.dispatchEvent(s),
                                    t && e.parentNode.removeChild(e);
                                });
                        });
                    };
                },
                {"../foreach-els": 7},
            ],
            6: [
                function (e, t, i) {
                    var n = e("./foreach-els"),
                        s = e("./eval-script");
                    t.exports = function (e) {
                        "script" === e.tagName.toLowerCase() && s(e),
                            n(e.querySelectorAll("script"), function (e) {
                                (e.type && "text/javascript" !== e.type.toLowerCase()) ||
                                (e.parentNode && e.parentNode.removeChild(e), s(e));
                            });
                    };
                },
                {"./eval-script": 3, "./foreach-els": 7},
            ],
            7: [
                function (e, t, i) {
                    t.exports = function (e, t, i) {
                        return e instanceof HTMLCollection ||
                        e instanceof NodeList ||
                        e instanceof Array
                            ? Array.prototype.forEach.call(e, t, i)
                            : t.call(i, e);
                    };
                },
                {},
            ],
            8: [
                function (e, t, i) {
                    var n = e("./foreach-els");
                    t.exports = function (e, t, i, s) {
                        (s = s || document),
                            e.forEach(function (e) {
                                n(s.querySelectorAll(e), t, i);
                            });
                    };
                },
                {"./foreach-els": 7},
            ],
            9: [
                function (e, t, i) {
                    t.exports = function () {
                        return (
                            window.history &&
                            window.history.pushState &&
                            window.history.replaceState &&
                            !navigator.userAgent.match(
                                /((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/
                            )
                        );
                    };
                },
                {},
            ],
            10: [
                function (e, t, i) {
                    var n = e("./switches");

                    function s() {
                        window._gaq && _gaq.push(["_trackPageview"]),
                        window.ga &&
                        ga("send", "pageview", {
                            page: location.pathname,
                            title: document.title,
                        });
                    }

                    t.exports = function (e) {
                        return (
                            ((e = e || {}).elements = e.elements || "a[href], form[action]"),
                                (e.selectors = e.selectors || ["title", ".js-Pjax"]),
                                (e.switches = e.switches || {}),
                                (e.switchesOptions = e.switchesOptions || {}),
                                (e.history = void 0 === e.history || e.history),
                                (e.analytics =
                                    "function" == typeof e.analytics || !1 === e.analytics
                                        ? e.analytics
                                        : s),
                                (e.scrollTo = void 0 === e.scrollTo ? 0 : e.scrollTo),
                                (e.scrollRestoration =
                                    void 0 === e.scrollRestoration || e.scrollRestoration),
                                (e.cacheBust = void 0 === e.cacheBust || e.cacheBust),
                                (e.debug = e.debug || !1),
                                (e.timeout = e.timeout || 0),
                                (e.currentUrlFullReload =
                                    void 0 !== e.currentUrlFullReload && e.currentUrlFullReload),
                            e.switches.head || (e.switches.head = n.switchElementsAlt),
                            e.switches.body || (e.switches.body = n.switchElementsAlt),
                                e
                        );
                    };
                },
                {"./switches": 18},
            ],
            11: [
                function (e, t, i) {
                    var n = e("../events/on"),
                        s = e("../util/clone"),
                        a = function (e, t) {
                            if (!r(t)) {
                                var i = s(this.options);
                                i.requestOptions = {
                                    requestUrl: e.getAttribute("action") || window.location.href,
                                    requestMethod: e.getAttribute("method") || "GET",
                                };
                                var n = document.createElement("a");
                                n.setAttribute("href", i.requestOptions.requestUrl);
                                var a = (function (e, t) {
                                    if (
                                        e.protocol !== window.location.protocol ||
                                        e.host !== window.location.host
                                    )
                                        return "external";
                                    if (
                                        e.hash &&
                                        e.href.replace(e.hash, "") ===
                                        window.location.href.replace(location.hash, "")
                                    )
                                        return "anchor";
                                    if (e.href === window.location.href.split("#")[0] + "#")
                                        return "anchor-empty";
                                    if (
                                        t.currentUrlFullReload &&
                                        e.href === window.location.href.split("#")[0]
                                    )
                                        return "reload";
                                })(n, i);
                                a
                                    ? e.setAttribute("data-pjax-state", a)
                                    : (t.preventDefault(),
                                        "multipart/form-data" === e.enctype
                                            ? (i.requestOptions.formData = new FormData(e))
                                            : (i.requestOptions.requestParams = (function (e) {
                                                for (
                                                    var t = [], i = e.elements, n = 0;
                                                    n < i.length;
                                                    n++
                                                ) {
                                                    var s = i[n],
                                                        a = s.tagName.toLowerCase();
                                                    if (
                                                        s.name &&
                                                        void 0 !== s.attributes &&
                                                        "button" !== a
                                                    ) {
                                                        var r = s.attributes.type;
                                                        if (
                                                            !r ||
                                                            ("checkbox" !== r.value &&
                                                                "radio" !== r.value) ||
                                                            s.checked
                                                        ) {
                                                            var o = [];
                                                            if ("select" === a)
                                                                for (var l, c = 0; c < s.options.length; c++)
                                                                    (l = s.options[c]).selected &&
                                                                    !l.disabled &&
                                                                    o.push(
                                                                        l.hasAttribute("value")
                                                                            ? l.value
                                                                            : l.text
                                                                    );
                                                            else o.push(s.value);
                                                            for (var d = 0; d < o.length; d++)
                                                                t.push({
                                                                    name: encodeURIComponent(s.name),
                                                                    value: encodeURIComponent(o[d]),
                                                                });
                                                        }
                                                    }
                                                }
                                                return t;
                                            })(e)),
                                        e.setAttribute("data-pjax-state", "submit"),
                                        (i.triggerElement = e),
                                        this.loadUrl(n.href, i));
                            }
                        };
                    var r = function (e) {
                        return e.defaultPrevented || !1 === e.returnValue;
                    };
                    t.exports = function (e) {
                        var t = this;
                        e.setAttribute("data-pjax-state", ""),
                            n(e, "submit", function (i) {
                                a.call(t, e, i);
                            });
                    };
                },
                {"../events/on": 4, "../util/clone": 20},
            ],
            12: [
                function (e, t, i) {
                    var n = e("../events/on"),
                        s = e("../util/clone"),
                        a = "data-pjax-state",
                        r = function (e, t) {
                            if (!o(t)) {
                                var i = s(this.options),
                                    n = (function (e, t) {
                                        if (
                                            t.which > 1 ||
                                            t.metaKey ||
                                            t.ctrlKey ||
                                            t.shiftKey ||
                                            t.altKey
                                        )
                                            return "modifier";
                                        if (
                                            e.protocol !== window.location.protocol ||
                                            e.host !== window.location.host
                                        )
                                            return "external";
                                        if (
                                            e.hash &&
                                            e.href.replace(e.hash, "") ===
                                            window.location.href.replace(location.hash, "")
                                        )
                                            return "anchor";
                                        if (e.href === window.location.href.split("#")[0] + "#")
                                            return "anchor-empty";
                                    })(e, t);
                                if (n) e.setAttribute(a, n);
                                else {
                                    if (
                                        (t.preventDefault(),
                                        this.options.currentUrlFullReload &&
                                        e.href === window.location.href.split("#")[0])
                                    )
                                        return e.setAttribute(a, "reload"), void this.reload();
                                    e.setAttribute(a, "load"),
                                        (i.triggerElement = e),
                                        this.loadUrl(e.href, i);
                                }
                            }
                        };
                    var o = function (e) {
                        return e.defaultPrevented || !1 === e.returnValue;
                    };
                    t.exports = function (e) {
                        var t = this;
                        e.setAttribute(a, ""),
                            n(e, "click", function (i) {
                                r.call(t, e, i);
                            }),
                            n(
                                e,
                                "keyup",
                                function (i) {
                                    13 === i.keyCode && r.call(t, e, i);
                                }.bind(this)
                            );
                    };
                },
                {"../events/on": 4, "../util/clone": 20},
            ],
            13: [
                function (e, t, i) {
                    var n = e("../util/clone"),
                        s = e("../uniqueid"),
                        a = e("../events/trigger");
                    t.exports = function (e, t, i, r) {
                        if ((((r = n(r || this.options)).request = t), !1 !== e)) {
                            var o = window.history.state || {};
                            window.history.replaceState(
                                {
                                    url: o.url || window.location.href,
                                    title: o.title || document.title,
                                    uid: o.uid || s(),
                                    scrollPos: [
                                        document.documentElement.scrollLeft ||
                                        document.body.scrollLeft,
                                        document.documentElement.scrollTop ||
                                        document.body.scrollTop,
                                    ],
                                },
                                document.title,
                                window.location.href
                            );
                            var l = i;
                            t.responseURL
                                ? i !== t.responseURL && (i = t.responseURL)
                                : t.getResponseHeader("X-PJAX-URL")
                                ? (i = t.getResponseHeader("X-PJAX-URL"))
                                : t.getResponseHeader("X-XHR-Redirected-To") &&
                                (i = t.getResponseHeader("X-XHR-Redirected-To"));
                            var c = document.createElement("a");
                            c.href = l;
                            var d = c.hash;
                            (c.href = i),
                            d && !c.hash && ((c.hash = d), (i = c.href)),
                                (this.state.href = i),
                                (this.state.options = r);
                            try {
                                this.loadContent(e, r);
                            } catch (e) {
                                if ((a(document, "pjax:error", r), this.options.debug)) throw e;
                                return (
                                    console &&
                                    console.error &&
                                    console.error("Pjax switch fail: ", e),
                                        this.latestChance(i)
                                );
                            }
                        } else a(document, "pjax:complete pjax:error", r);
                    };
                },
                {"../events/trigger": 5, "../uniqueid": 19, "../util/clone": 20},
            ],
            14: [
                function (e, t, i) {
                    t.exports = function () {
                        this.options.debug &&
                        console &&
                        ("function" == typeof console.log
                            ? console.log.apply(console, arguments)
                            : console.log && console.log(arguments));
                    };
                },
                {},
            ],
            15: [
                function (e, t, i) {
                    t.exports = function (e) {
                        switch (e.tagName.toLowerCase()) {
                            case "a":
                                e.hasAttribute("data-pjax-state") || this.attachLink(e);
                                break;
                            case "form":
                                e.hasAttribute("data-pjax-state") || this.attachForm(e);
                                break;
                            default:
                                throw "Pjax can only be applied on <a> or <form> submit";
                        }
                    };
                },
                {},
            ],
            16: [
                function (e, t, i) {
                    var n = e("./util/update-query-string");
                    t.exports = function (e, t, i) {
                        var s,
                            a = (t = t || {}).requestOptions || {},
                            r = (a.requestMethod || "GET").toUpperCase(),
                            o = a.requestParams || null,
                            l = a.formData || null,
                            c = null,
                            d = new XMLHttpRequest(),
                            h = t.timeout || 0;
                        if (
                            ((d.onreadystatechange = function () {
                                4 === d.readyState &&
                                (200 === d.status
                                    ? i(d.responseText, d, e, t)
                                    : 0 !== d.status && i(null, d, e, t));
                            }),
                                (d.onerror = function (n) {
                                    console.log(n), i(null, d, e, t);
                                }),
                                (d.ontimeout = function () {
                                    i(null, d, e, t);
                                }),
                            o && o.length)
                        )
                            switch (
                                ((s = o
                                    .map(function (e) {
                                        return e.name + "=" + e.value;
                                    })
                                    .join("&")),
                                    r)
                                ) {
                                case "GET":
                                    (e = e.split("?")[0]), (e += "?" + s);
                                    break;
                                case "POST":
                                    c = s;
                            }
                        else l && (c = l);
                        return (
                            t.cacheBust && (e = n(e, "t", Date.now())),
                                d.open(r, e, !0),
                                (d.timeout = h),
                                d.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                                d.setRequestHeader("X-PJAX", "true"),
                                d.setRequestHeader(
                                    "X-PJAX-Selectors",
                                    JSON.stringify(t.selectors)
                                ),
                            c &&
                            "POST" === r &&
                            !l &&
                            d.setRequestHeader(
                                "Content-Type",
                                "application/x-www-form-urlencoded"
                            ),
                                d.send(c),
                                d
                        );
                    };
                },
                {"./util/update-query-string": 24},
            ],
            17: [
                function (e, t, i) {
                    var n = e("./foreach-els"),
                        s = e("./switches");
                    t.exports = function (e, t, i, a, r, o) {
                        var l = [];
                        i.forEach(function (i) {
                            var c = a.querySelectorAll(i),
                                d = r.querySelectorAll(i);
                            if (
                                (this.log && this.log("Pjax switch", i, c, d),
                                c.length !== d.length)
                            )
                                throw (
                                    "DOM doesn’t look the same on new loaded page: ’" +
                                    i +
                                    "’ - new " +
                                    c.length +
                                    ", old " +
                                    d.length
                                );
                            n(
                                c,
                                function (n, a) {
                                    var r = d[a];
                                    this.log && this.log("newEl", n, "oldEl", r);
                                    var c = e[i]
                                        ? e[i].bind(this, r, n, o, t[i])
                                        : s.outerHTML.bind(this, r, n, o);
                                    l.push(c);
                                },
                                this
                            );
                        }, this),
                            (this.state.numPendingSwitches = l.length),
                            l.forEach(function (e) {
                                e();
                            });
                    };
                },
                {"./foreach-els": 7, "./switches": 18},
            ],
            18: [
                function (e, t, i) {
                    var n = e("./events/on");
                    t.exports = {
                        outerHTML: function (e, t) {
                            (e.outerHTML = t.outerHTML), this.onSwitch();
                        },
                        innerHTML: function (e, t) {
                            (e.innerHTML = t.innerHTML),
                                "" === t.className
                                    ? e.removeAttribute("class")
                                    : (e.className = t.className),
                                this.onSwitch();
                        },
                        switchElementsAlt: function (e, t) {
                            if (((e.innerHTML = t.innerHTML), t.hasAttributes()))
                                for (var i = t.attributes, n = 0; n < i.length; n++)
                                    e.attributes.setNamedItem(i[n].cloneNode());
                            this.onSwitch();
                        },
                        replaceNode: function (e, t) {
                            e.parentNode.replaceChild(t, e), this.onSwitch();
                        },
                        sideBySide: function (e, t, i, s) {
                            var a = Array.prototype.forEach,
                                r = [],
                                o = [],
                                l = document.createDocumentFragment(),
                                c =
                                    "animationend webkitAnimationEnd MSAnimationEnd oanimationend",
                                d = 0,
                                h = function (e) {
                                    e.target === e.currentTarget &&
                                    --d <= 0 &&
                                    r &&
                                    (r.forEach(function (e) {
                                        e.parentNode && e.parentNode.removeChild(e);
                                    }),
                                        o.forEach(function (e) {
                                            (e.className = e.className.replace(
                                                e.getAttribute("data-pjax-classes"),
                                                ""
                                            )),
                                                e.removeAttribute("data-pjax-classes");
                                        }),
                                        (o = null),
                                        (r = null),
                                        this.onSwitch());
                                }.bind(this);
                            (s = s || {}),
                                a.call(e.childNodes, function (e) {
                                    r.push(e),
                                    e.classList &&
                                    !e.classList.contains("js-Pjax-remove") &&
                                    (e.hasAttribute("data-pjax-classes") &&
                                    ((e.className = e.className.replace(
                                        e.getAttribute("data-pjax-classes"),
                                        ""
                                    )),
                                        e.removeAttribute("data-pjax-classes")),
                                        e.classList.add("js-Pjax-remove"),
                                    s.callbacks &&
                                    s.callbacks.removeElement &&
                                    s.callbacks.removeElement(e),
                                    s.classNames &&
                                    (e.className +=
                                        " " +
                                        s.classNames.remove +
                                        " " +
                                        (i.backward
                                            ? s.classNames.backward
                                            : s.classNames.forward)),
                                        d++,
                                        n(e, c, h, !0));
                                }),
                                a.call(t.childNodes, function (e) {
                                    if (e.classList) {
                                        var t = "";
                                        s.classNames &&
                                        (t =
                                            " js-Pjax-add " +
                                            s.classNames.add +
                                            " " +
                                            (i.backward
                                                ? s.classNames.forward
                                                : s.classNames.backward)),
                                        s.callbacks &&
                                        s.callbacks.addElement &&
                                        s.callbacks.addElement(e),
                                            (e.className += t),
                                            e.setAttribute("data-pjax-classes", t),
                                            o.push(e),
                                            l.appendChild(e),
                                            d++,
                                            n(e, c, h, !0);
                                    }
                                }),
                                (e.className = t.className),
                                e.appendChild(l);
                        },
                    };
                },
                {"./events/on": 4},
            ],
            19: [
                function (e, t, i) {
                    var n;
                    t.exports =
                        ((n = 0),
                            function () {
                                var e = "pjax" + new Date().getTime() + "_" + n;
                                return n++, e;
                            });
                },
                {},
            ],
            20: [
                function (e, t, i) {
                    t.exports = function (e) {
                        if (null === e || "object" != typeof e) return e;
                        var t = e.constructor();
                        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                        return t;
                    };
                },
                {},
            ],
            21: [
                function (e, t, i) {
                    t.exports = function (e, t, i) {
                        for (var n = 0; n < t.length; n++)
                            for (var s = e.querySelectorAll(t[n]), a = 0; a < s.length; a++)
                                if (s[a].contains(i)) return !0;
                        return !1;
                    };
                },
                {},
            ],
            22: [
                function (e, t, i) {
                    t.exports = function (e) {
                        if (null == e) return null;
                        for (var t = Object(e), i = 1; i < arguments.length; i++) {
                            var n = arguments[i];
                            if (null != n)
                                for (var s in n)
                                    Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
                        }
                        return t;
                    };
                },
                {},
            ],
            23: [
                function (e, t, i) {
                    t.exports = function () {
                    };
                },
                {},
            ],
            24: [
                function (e, t, i) {
                    t.exports = function (e, t, i) {
                        var n = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                            s = -1 !== e.indexOf("?") ? "&" : "?";
                        return e.match(n)
                            ? e.replace(n, "$1" + t + "=" + i + "$2")
                            : e + s + t + "=" + i;
                    };
                },
                {},
            ],
        },
        {},
        [1]
    )(1);
}),
    (function (e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = e.document
            ? t(e, !0)
            : function (e) {
                if (!e.document)
                    throw new Error("jQuery requires a window with a document");
                return t(e);
            })
            : t(e);
    })("undefined" != typeof window ? window : this, function (e, t) {
        "use strict";
        var i = [],
            n = e.document,
            s = Object.getPrototypeOf,
            a = i.slice,
            r = i.concat,
            o = i.push,
            l = i.indexOf,
            c = {},
            d = c.toString,
            h = c.hasOwnProperty,
            u = h.toString,
            p = u.call(Object),
            f = {},
            m = function (e) {
                return "function" == typeof e && "number" != typeof e.nodeType;
            },
            v = function (e) {
                return null != e && e === e.window;
            },
            g = {type: !0, src: !0, nonce: !0, noModule: !0};

        function b(e, t, i) {
            var s,
                a,
                r = (i = i || n).createElement("script");
            if (((r.text = e), t))
                for (s in g)
                    (a = t[s] || (t.getAttribute && t.getAttribute(s))) &&
                    r.setAttribute(s, a);
            i.head.appendChild(r).parentNode.removeChild(r);
        }

        function y(e) {
            return null == e
                ? e + ""
                : "object" == typeof e || "function" == typeof e
                    ? c[d.call(e)] || "object"
                    : typeof e;
        }

        var x = "3.4.1",
            w = function (e, t) {
                return new w.fn.init(e, t);
            },
            T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

        function C(e) {
            var t = !!e && "length" in e && e.length,
                i = y(e);
            return (
                !m(e) &&
                !v(e) &&
                ("array" === i ||
                    0 === t ||
                    ("number" == typeof t && 0 < t && t - 1 in e))
            );
        }

        (w.fn = w.prototype = {
            jquery: x,
            constructor: w,
            length: 0,
            toArray: function () {
                return a.call(this);
            },
            get: function (e) {
                return null == e
                    ? a.call(this)
                    : e < 0
                        ? this[e + this.length]
                        : this[e];
            },
            pushStack: function (e) {
                var t = w.merge(this.constructor(), e);
                return (t.prevObject = this), t;
            },
            each: function (e) {
                return w.each(this, e);
            },
            map: function (e) {
                return this.pushStack(
                    w.map(this, function (t, i) {
                        return e.call(t, i, t);
                    })
                );
            },
            slice: function () {
                return this.pushStack(a.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (e) {
                var t = this.length,
                    i = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= i && i < t ? [this[i]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: o,
            sort: i.sort,
            splice: i.splice,
        }),
            (w.extend = w.fn.extend = function () {
                var e,
                    t,
                    i,
                    n,
                    s,
                    a,
                    r = arguments[0] || {},
                    o = 1,
                    l = arguments.length,
                    c = !1;
                for (
                    "boolean" == typeof r && ((c = r), (r = arguments[o] || {}), o++),
                    "object" == typeof r || m(r) || (r = {}),
                    o === l && ((r = this), o--);
                    o < l;
                    o++
                )
                    if (null != (e = arguments[o]))
                        for (t in e)
                            (n = e[t]),
                            "__proto__" !== t &&
                            r !== n &&
                            (c && n && (w.isPlainObject(n) || (s = Array.isArray(n)))
                                ? ((i = r[t]),
                                    (a =
                                        s && !Array.isArray(i)
                                            ? []
                                            : s || w.isPlainObject(i)
                                            ? i
                                            : {}),
                                    (s = !1),
                                    (r[t] = w.extend(c, a, n)))
                                : void 0 !== n && (r[t] = n));
                return r;
            }),
            w.extend({
                expando: "jQuery" + (x + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (e) {
                    throw new Error(e);
                },
                noop: function () {
                },
                isPlainObject: function (e) {
                    var t, i;
                    return !(
                        !e ||
                        "[object Object]" !== d.call(e) ||
                        ((t = s(e)) &&
                            ("function" !=
                                typeof (i = h.call(t, "constructor") && t.constructor) ||
                                u.call(i) !== p))
                    );
                },
                isEmptyObject: function (e) {
                    var t;
                    for (t in e) return !1;
                    return !0;
                },
                globalEval: function (e, t) {
                    b(e, {nonce: t && t.nonce});
                },
                each: function (e, t) {
                    var i,
                        n = 0;
                    if (C(e))
                        for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++) ;
                    else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
                    return e;
                },
                trim: function (e) {
                    return null == e ? "" : (e + "").replace(T, "");
                },
                makeArray: function (e, t) {
                    var i = t || [];
                    return (
                        null != e &&
                        (C(Object(e))
                            ? w.merge(i, "string" == typeof e ? [e] : e)
                            : o.call(i, e)),
                            i
                    );
                },
                inArray: function (e, t, i) {
                    return null == t ? -1 : l.call(t, e, i);
                },
                merge: function (e, t) {
                    for (var i = +t.length, n = 0, s = e.length; n < i; n++)
                        e[s++] = t[n];
                    return (e.length = s), e;
                },
                grep: function (e, t, i) {
                    for (var n = [], s = 0, a = e.length, r = !i; s < a; s++)
                        !t(e[s], s) !== r && n.push(e[s]);
                    return n;
                },
                map: function (e, t, i) {
                    var n,
                        s,
                        a = 0,
                        o = [];
                    if (C(e))
                        for (n = e.length; a < n; a++)
                            null != (s = t(e[a], a, i)) && o.push(s);
                    else for (a in e) null != (s = t(e[a], a, i)) && o.push(s);
                    return r.apply([], o);
                },
                guid: 1,
                support: f,
            }),
        "function" == typeof Symbol &&
        (w.fn[Symbol.iterator] = i[Symbol.iterator]),
            w.each(
                "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                    " "
                ),
                function (e, t) {
                    c["[object " + t + "]"] = t.toLowerCase();
                }
            );
        var S = (function (e) {
            var t,
                i,
                n,
                s,
                a,
                r,
                o,
                l,
                c,
                d,
                h,
                u,
                p,
                f,
                m,
                v,
                g,
                b,
                y,
                x = "sizzle" + 1 * new Date(),
                w = e.document,
                T = 0,
                C = 0,
                S = le(),
                E = le(),
                P = le(),
                M = le(),
                k = function (e, t) {
                    return e === t && (h = !0), 0;
                },
                $ = {}.hasOwnProperty,
                L = [],
                A = L.pop,
                z = L.push,
                D = L.push,
                I = L.slice,
                O = function (e, t) {
                    for (var i = 0, n = e.length; i < n; i++) if (e[i] === t) return i;
                    return -1;
                },
                N =
                    "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                H = "[\\x20\\t\\r\\n\\f]",
                j = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                q =
                    "\\[" +
                    H +
                    "*(" +
                    j +
                    ")(?:" +
                    H +
                    "*([*^$|!~]?=)" +
                    H +
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                    j +
                    "))|)" +
                    H +
                    "*\\]",
                R =
                    ":(" +
                    j +
                    ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                    q +
                    ")*)|.*)\\)|)",
                F = new RegExp(H + "+", "g"),
                B = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
                X = new RegExp("^" + H + "*," + H + "*"),
                W = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
                Y = new RegExp(H + "|>"),
                V = new RegExp(R),
                G = new RegExp("^" + j + "$"),
                _ = {
                    ID: new RegExp("^#(" + j + ")"),
                    CLASS: new RegExp("^\\.(" + j + ")"),
                    TAG: new RegExp("^(" + j + "|[*])"),
                    ATTR: new RegExp("^" + q),
                    PSEUDO: new RegExp("^" + R),
                    CHILD: new RegExp(
                        "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        H +
                        "*(even|odd|(([+-]|)(\\d*)n|)" +
                        H +
                        "*(?:([+-]|)" +
                        H +
                        "*(\\d+)|))" +
                        H +
                        "*\\)|)",
                        "i"
                    ),
                    bool: new RegExp("^(?:" + N + ")$", "i"),
                    needsContext: new RegExp(
                        "^" +
                        H +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        H +
                        "*((?:-\\d)?\\d*)" +
                        H +
                        "*\\)|)(?=[^-]|$)",
                        "i"
                    ),
                },
                U = /HTML$/i,
                K = /^(?:input|select|textarea|button)$/i,
                Z = /^h\d$/i,
                Q = /^[^{]+\{\s*\[native \w/,
                J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ee = /[+~]/,
                te = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
                ie = function (e, t, i) {
                    var n = "0x" + t - 65536;
                    return n != n || i
                        ? t
                        : n < 0
                            ? String.fromCharCode(n + 65536)
                            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
                },
                ne = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                se = function (e, t) {
                    return t
                        ? "\0" === e
                            ? "�"
                            : e.slice(0, -1) +
                            "\\" +
                            e.charCodeAt(e.length - 1).toString(16) +
                            " "
                        : "\\" + e;
                },
                ae = function () {
                    u();
                },
                re = xe(
                    function (e) {
                        return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
                    },
                    {dir: "parentNode", next: "legend"}
                );
            try {
                D.apply((L = I.call(w.childNodes)), w.childNodes),
                    L[w.childNodes.length].nodeType;
            } catch (t) {
                D = {
                    apply: L.length
                        ? function (e, t) {
                            z.apply(e, I.call(t));
                        }
                        : function (e, t) {
                            for (var i = e.length, n = 0; (e[i++] = t[n++]);) ;
                            e.length = i - 1;
                        },
                };
            }

            function oe(e, t, n, s) {
                var a,
                    o,
                    c,
                    d,
                    h,
                    f,
                    g,
                    b = t && t.ownerDocument,
                    T = t ? t.nodeType : 9;
                if (
                    ((n = n || []),
                    "string" != typeof e || !e || (1 !== T && 9 !== T && 11 !== T))
                )
                    return n;
                if (
                    !s &&
                    ((t ? t.ownerDocument || t : w) !== p && u(t), (t = t || p), m)
                ) {
                    if (11 !== T && (h = J.exec(e)))
                        if ((a = h[1])) {
                            if (9 === T) {
                                if (!(c = t.getElementById(a))) return n;
                                if (c.id === a) return n.push(c), n;
                            } else if (
                                b &&
                                (c = b.getElementById(a)) &&
                                y(t, c) &&
                                c.id === a
                            )
                                return n.push(c), n;
                        } else {
                            if (h[2]) return D.apply(n, t.getElementsByTagName(e)), n;
                            if (
                                (a = h[3]) &&
                                i.getElementsByClassName &&
                                t.getElementsByClassName
                            )
                                return D.apply(n, t.getElementsByClassName(a)), n;
                        }
                    if (
                        i.qsa &&
                        !M[e + " "] &&
                        (!v || !v.test(e)) &&
                        (1 !== T || "object" !== t.nodeName.toLowerCase())
                    ) {
                        if (((g = e), (b = t), 1 === T && Y.test(e))) {
                            for (
                                (d = t.getAttribute("id"))
                                    ? (d = d.replace(ne, se))
                                    : t.setAttribute("id", (d = x)),
                                    o = (f = r(e)).length;
                                o--;
                            )
                                f[o] = "#" + d + " " + ye(f[o]);
                            (g = f.join(",")), (b = (ee.test(e) && ge(t.parentNode)) || t);
                        }
                        try {
                            return D.apply(n, b.querySelectorAll(g)), n;
                        } catch (t) {
                            M(e, !0);
                        } finally {
                            d === x && t.removeAttribute("id");
                        }
                    }
                }
                return l(e.replace(B, "$1"), t, n, s);
            }

            function le() {
                var e = [];
                return function t(i, s) {
                    return (
                        e.push(i + " ") > n.cacheLength && delete t[e.shift()],
                            (t[i + " "] = s)
                    );
                };
            }

            function ce(e) {
                return (e[x] = !0), e;
            }

            function de(e) {
                var t = p.createElement("fieldset");
                try {
                    return !!e(t);
                } catch (e) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), (t = null);
                }
            }

            function he(e, t) {
                for (var i = e.split("|"), s = i.length; s--;) n.attrHandle[i[s]] = t;
            }

            function ue(e, t) {
                var i = t && e,
                    n =
                        i &&
                        1 === e.nodeType &&
                        1 === t.nodeType &&
                        e.sourceIndex - t.sourceIndex;
                if (n) return n;
                if (i) for (; (i = i.nextSibling);) if (i === t) return -1;
                return e ? 1 : -1;
            }

            function pe(e) {
                return function (t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e;
                };
            }

            function fe(e) {
                return function (t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === e;
                };
            }

            function me(e) {
                return function (t) {
                    return "form" in t
                        ? t.parentNode && !1 === t.disabled
                            ? "label" in t
                                ? "label" in t.parentNode
                                    ? t.parentNode.disabled === e
                                    : t.disabled === e
                                : t.isDisabled === e || (t.isDisabled !== !e && re(t) === e)
                            : t.disabled === e
                        : "label" in t && t.disabled === e;
                };
            }

            function ve(e) {
                return ce(function (t) {
                    return (
                        (t = +t),
                            ce(function (i, n) {
                                for (var s, a = e([], i.length, t), r = a.length; r--;)
                                    i[(s = a[r])] && (i[s] = !(n[s] = i[s]));
                            })
                    );
                });
            }

            function ge(e) {
                return e && void 0 !== e.getElementsByTagName && e;
            }

            for (t in ((i = oe.support = {}),
                (a = oe.isXML = function (e) {
                    var t = e.namespaceURI,
                        i = (e.ownerDocument || e).documentElement;
                    return !U.test(t || (i && i.nodeName) || "HTML");
                }),
                (u = oe.setDocument = function (e) {
                    var t,
                        s,
                        r = e ? e.ownerDocument || e : w;
                    return (
                        r !== p &&
                        9 === r.nodeType &&
                        r.documentElement &&
                        ((f = (p = r).documentElement),
                            (m = !a(p)),
                        w !== p &&
                        (s = p.defaultView) &&
                        s.top !== s &&
                        (s.addEventListener
                            ? s.addEventListener("unload", ae, !1)
                            : s.attachEvent && s.attachEvent("onunload", ae)),
                            (i.attributes = de(function (e) {
                                return (e.className = "i"), !e.getAttribute("className");
                            })),
                            (i.getElementsByTagName = de(function (e) {
                                return (
                                    e.appendChild(p.createComment("")),
                                        !e.getElementsByTagName("*").length
                                );
                            })),
                            (i.getElementsByClassName = Q.test(p.getElementsByClassName)),
                            (i.getById = de(function (e) {
                                return (
                                    (f.appendChild(e).id = x),
                                    !p.getElementsByName || !p.getElementsByName(x).length
                                );
                            })),
                            i.getById
                                ? ((n.filter.ID = function (e) {
                                    var t = e.replace(te, ie);
                                    return function (e) {
                                        return e.getAttribute("id") === t;
                                    };
                                }),
                                    (n.find.ID = function (e, t) {
                                        if (void 0 !== t.getElementById && m) {
                                            var i = t.getElementById(e);
                                            return i ? [i] : [];
                                        }
                                    }))
                                : ((n.filter.ID = function (e) {
                                    var t = e.replace(te, ie);
                                    return function (e) {
                                        var i =
                                            void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                        return i && i.value === t;
                                    };
                                }),
                                    (n.find.ID = function (e, t) {
                                        if (void 0 !== t.getElementById && m) {
                                            var i,
                                                n,
                                                s,
                                                a = t.getElementById(e);
                                            if (a) {
                                                if ((i = a.getAttributeNode("id")) && i.value === e)
                                                    return [a];
                                                for (s = t.getElementsByName(e), n = 0; (a = s[n++]);)
                                                    if ((i = a.getAttributeNode("id")) && i.value === e)
                                                        return [a];
                                            }
                                            return [];
                                        }
                                    })),
                            (n.find.TAG = i.getElementsByTagName
                                ? function (e, t) {
                                    return void 0 !== t.getElementsByTagName
                                        ? t.getElementsByTagName(e)
                                        : i.qsa
                                            ? t.querySelectorAll(e)
                                            : void 0;
                                }
                                : function (e, t) {
                                    var i,
                                        n = [],
                                        s = 0,
                                        a = t.getElementsByTagName(e);
                                    if ("*" === e) {
                                        for (; (i = a[s++]);) 1 === i.nodeType && n.push(i);
                                        return n;
                                    }
                                    return a;
                                }),
                            (n.find.CLASS =
                                i.getElementsByClassName &&
                                function (e, t) {
                                    if (void 0 !== t.getElementsByClassName && m)
                                        return t.getElementsByClassName(e);
                                }),
                            (g = []),
                            (v = []),
                        (i.qsa = Q.test(p.querySelectorAll)) &&
                        (de(function (e) {
                            (f.appendChild(e).innerHTML =
                                "<a id='" +
                                x +
                                "'></a><select id='" +
                                x +
                                "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                            e.querySelectorAll("[msallowcapture^='']").length &&
                            v.push("[*^$]=" + H + "*(?:''|\"\")"),
                            e.querySelectorAll("[selected]").length ||
                            v.push("\\[" + H + "*(?:value|" + N + ")"),
                            e.querySelectorAll("[id~=" + x + "-]").length || v.push("~="),
                            e.querySelectorAll(":checked").length || v.push(":checked"),
                            e.querySelectorAll("a#" + x + "+*").length ||
                            v.push(".#.+[+~]");
                        }),
                            de(function (e) {
                                e.innerHTML =
                                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var t = p.createElement("input");
                                t.setAttribute("type", "hidden"),
                                    e.appendChild(t).setAttribute("name", "D"),
                                e.querySelectorAll("[name=d]").length &&
                                v.push("name" + H + "*[*^$|!~]?="),
                                2 !== e.querySelectorAll(":enabled").length &&
                                v.push(":enabled", ":disabled"),
                                    (f.appendChild(e).disabled = !0),
                                2 !== e.querySelectorAll(":disabled").length &&
                                v.push(":enabled", ":disabled"),
                                    e.querySelectorAll("*,:x"),
                                    v.push(",.*:");
                            })),
                        (i.matchesSelector = Q.test(
                            (b =
                                f.matches ||
                                f.webkitMatchesSelector ||
                                f.mozMatchesSelector ||
                                f.oMatchesSelector ||
                                f.msMatchesSelector)
                        )) &&
                        de(function (e) {
                            (i.disconnectedMatch = b.call(e, "*")),
                                b.call(e, "[s!='']:x"),
                                g.push("!=", R);
                        }),
                            (v = v.length && new RegExp(v.join("|"))),
                            (g = g.length && new RegExp(g.join("|"))),
                            (t = Q.test(f.compareDocumentPosition)),
                            (y =
                                t || Q.test(f.contains)
                                    ? function (e, t) {
                                        var i = 9 === e.nodeType ? e.documentElement : e,
                                            n = t && t.parentNode;
                                        return (
                                            e === n ||
                                            !(
                                                !n ||
                                                1 !== n.nodeType ||
                                                !(i.contains
                                                    ? i.contains(n)
                                                    : e.compareDocumentPosition &&
                                                    16 & e.compareDocumentPosition(n))
                                            )
                                        );
                                    }
                                    : function (e, t) {
                                        if (t) for (; (t = t.parentNode);) if (t === e) return !0;
                                        return !1;
                                    }),
                            (k = t
                                ? function (e, t) {
                                    if (e === t) return (h = !0), 0;
                                    var n =
                                        !e.compareDocumentPosition - !t.compareDocumentPosition;
                                    return (
                                        n ||
                                        (1 &
                                        (n =
                                            (e.ownerDocument || e) === (t.ownerDocument || t)
                                                ? e.compareDocumentPosition(t)
                                                : 1) ||
                                        (!i.sortDetached && t.compareDocumentPosition(e) === n)
                                            ? e === p || (e.ownerDocument === w && y(w, e))
                                                ? -1
                                                : t === p || (t.ownerDocument === w && y(w, t))
                                                    ? 1
                                                    : d
                                                        ? O(d, e) - O(d, t)
                                                        : 0
                                            : 4 & n
                                                ? -1
                                                : 1)
                                    );
                                }
                                : function (e, t) {
                                    if (e === t) return (h = !0), 0;
                                    var i,
                                        n = 0,
                                        s = e.parentNode,
                                        a = t.parentNode,
                                        r = [e],
                                        o = [t];
                                    if (!s || !a)
                                        return e === p
                                            ? -1
                                            : t === p
                                                ? 1
                                                : s
                                                    ? -1
                                                    : a
                                                        ? 1
                                                        : d
                                                            ? O(d, e) - O(d, t)
                                                            : 0;
                                    if (s === a) return ue(e, t);
                                    for (i = e; (i = i.parentNode);) r.unshift(i);
                                    for (i = t; (i = i.parentNode);) o.unshift(i);
                                    for (; r[n] === o[n];) n++;
                                    return n
                                        ? ue(r[n], o[n])
                                        : r[n] === w
                                            ? -1
                                            : o[n] === w
                                                ? 1
                                                : 0;
                                })),
                            p
                    );
                }),
                (oe.matches = function (e, t) {
                    return oe(e, null, null, t);
                }),
                (oe.matchesSelector = function (e, t) {
                    if (
                        ((e.ownerDocument || e) !== p && u(e),
                        i.matchesSelector &&
                        m &&
                        !M[t + " "] &&
                        (!g || !g.test(t)) &&
                        (!v || !v.test(t)))
                    )
                        try {
                            var n = b.call(e, t);
                            if (
                                n ||
                                i.disconnectedMatch ||
                                (e.document && 11 !== e.document.nodeType)
                            )
                                return n;
                        } catch (e) {
                            M(t, !0);
                        }
                    return 0 < oe(t, p, null, [e]).length;
                }),
                (oe.contains = function (e, t) {
                    return (e.ownerDocument || e) !== p && u(e), y(e, t);
                }),
                (oe.attr = function (e, t) {
                    (e.ownerDocument || e) !== p && u(e);
                    var s = n.attrHandle[t.toLowerCase()],
                        a = s && $.call(n.attrHandle, t.toLowerCase()) ? s(e, t, !m) : void 0;
                    return void 0 !== a
                        ? a
                        : i.attributes || !m
                            ? e.getAttribute(t)
                            : (a = e.getAttributeNode(t)) && a.specified
                                ? a.value
                                : null;
                }),
                (oe.escape = function (e) {
                    return (e + "").replace(ne, se);
                }),
                (oe.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e);
                }),
                (oe.uniqueSort = function (e) {
                    var t,
                        n = [],
                        s = 0,
                        a = 0;
                    if (
                        ((h = !i.detectDuplicates),
                            (d = !i.sortStable && e.slice(0)),
                            e.sort(k),
                            h)
                    ) {
                        for (; (t = e[a++]);) t === e[a] && (s = n.push(a));
                        for (; s--;) e.splice(n[s], 1);
                    }
                    return (d = null), e;
                }),
                (s = oe.getText = function (e) {
                    var t,
                        i = "",
                        n = 0,
                        a = e.nodeType;
                    if (a) {
                        if (1 === a || 9 === a || 11 === a) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) i += s(e);
                        } else if (3 === a || 4 === a) return e.nodeValue;
                    } else for (; (t = e[n++]);) i += s(t);
                    return i;
                }),
                ((n = oe.selectors = {
                    cacheLength: 50,
                    createPseudo: ce,
                    match: _,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {dir: "parentNode", first: !0},
                        " ": {dir: "parentNode"},
                        "+": {dir: "previousSibling", first: !0},
                        "~": {dir: "previousSibling"},
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return (
                                (e[1] = e[1].replace(te, ie)),
                                    (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ie)),
                                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                                    e.slice(0, 4)
                            );
                        },
                        CHILD: function (e) {
                            return (
                                (e[1] = e[1].toLowerCase()),
                                    "nth" === e[1].slice(0, 3)
                                        ? (e[3] || oe.error(e[0]),
                                            (e[4] = +(e[4]
                                                ? e[5] + (e[6] || 1)
                                                : 2 * ("even" === e[3] || "odd" === e[3]))),
                                            (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                                        : e[3] && oe.error(e[0]),
                                    e
                            );
                        },
                        PSEUDO: function (e) {
                            var t,
                                i = !e[6] && e[2];
                            return _.CHILD.test(e[0])
                                ? null
                                : (e[3]
                                    ? (e[2] = e[4] || e[5] || "")
                                    : i &&
                                    V.test(i) &&
                                    (t = r(i, !0)) &&
                                    (t = i.indexOf(")", i.length - t) - i.length) &&
                                    ((e[0] = e[0].slice(0, t)), (e[2] = i.slice(0, t))),
                                    e.slice(0, 3));
                        },
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(te, ie).toLowerCase();
                            return "*" === e
                                ? function () {
                                    return !0;
                                }
                                : function (e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t;
                                };
                        },
                        CLASS: function (e) {
                            var t = S[e + " "];
                            return (
                                t ||
                                ((t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) &&
                                    S(e, function (e) {
                                        return t.test(
                                            ("string" == typeof e.className && e.className) ||
                                            (void 0 !== e.getAttribute && e.getAttribute("class")) ||
                                            ""
                                        );
                                    }))
                            );
                        },
                        ATTR: function (e, t, i) {
                            return function (n) {
                                var s = oe.attr(n, e);
                                return null == s
                                    ? "!=" === t
                                    : !t ||
                                    ((s += ""),
                                        "=" === t
                                            ? s === i
                                            : "!=" === t
                                            ? s !== i
                                            : "^=" === t
                                                ? i && 0 === s.indexOf(i)
                                                : "*=" === t
                                                    ? i && -1 < s.indexOf(i)
                                                    : "$=" === t
                                                        ? i && s.slice(-i.length) === i
                                                        : "~=" === t
                                                            ? -1 < (" " + s.replace(F, " ") + " ").indexOf(i)
                                                            : "|=" === t &&
                                                            (s === i || s.slice(0, i.length + 1) === i + "-"));
                            };
                        },
                        CHILD: function (e, t, i, n, s) {
                            var a = "nth" !== e.slice(0, 3),
                                r = "last" !== e.slice(-4),
                                o = "of-type" === t;
                            return 1 === n && 0 === s
                                ? function (e) {
                                    return !!e.parentNode;
                                }
                                : function (t, i, l) {
                                    var c,
                                        d,
                                        h,
                                        u,
                                        p,
                                        f,
                                        m = a !== r ? "nextSibling" : "previousSibling",
                                        v = t.parentNode,
                                        g = o && t.nodeName.toLowerCase(),
                                        b = !l && !o,
                                        y = !1;
                                    if (v) {
                                        if (a) {
                                            for (; m;) {
                                                for (u = t; (u = u[m]);)
                                                    if (
                                                        o
                                                            ? u.nodeName.toLowerCase() === g
                                                            : 1 === u.nodeType
                                                    )
                                                        return !1;
                                                f = m = "only" === e && !f && "nextSibling";
                                            }
                                            return !0;
                                        }
                                        if (((f = [r ? v.firstChild : v.lastChild]), r && b)) {
                                            for (
                                                y =
                                                    (p =
                                                        (c =
                                                            (d =
                                                                (h = (u = v)[x] || (u[x] = {}))[u.uniqueID] ||
                                                                (h[u.uniqueID] = {}))[e] || [])[0] === T &&
                                                        c[1]) && c[2],
                                                    u = p && v.childNodes[p];
                                                (u = (++p && u && u[m]) || (y = p = 0) || f.pop());
                                            )
                                                if (1 === u.nodeType && ++y && u === t) {
                                                    d[e] = [T, p, y];
                                                    break;
                                                }
                                        } else if (
                                            (b &&
                                            (y = p =
                                                (c =
                                                    (d =
                                                        (h = (u = t)[x] || (u[x] = {}))[u.uniqueID] ||
                                                        (h[u.uniqueID] = {}))[e] || [])[0] === T && c[1]),
                                            !1 === y)
                                        )
                                            for (
                                                ;
                                                (u = (++p && u && u[m]) || (y = p = 0) || f.pop()) &&
                                                ((o
                                                    ? u.nodeName.toLowerCase() !== g
                                                    : 1 !== u.nodeType) ||
                                                    !++y ||
                                                    (b &&
                                                    ((d =
                                                        (h = u[x] || (u[x] = {}))[u.uniqueID] ||
                                                        (h[u.uniqueID] = {}))[e] = [T, y]),
                                                    u !== t));
                                            ) ;
                                        return (y -= s) === n || (y % n == 0 && 0 <= y / n);
                                    }
                                };
                        },
                        PSEUDO: function (e, t) {
                            var i,
                                s =
                                    n.pseudos[e] ||
                                    n.setFilters[e.toLowerCase()] ||
                                    oe.error("unsupported pseudo: " + e);
                            return s[x]
                                ? s(t)
                                : 1 < s.length
                                    ? ((i = [e, e, "", t]),
                                        n.setFilters.hasOwnProperty(e.toLowerCase())
                                            ? ce(function (e, i) {
                                                for (var n, a = s(e, t), r = a.length; r--;)
                                                    e[(n = O(e, a[r]))] = !(i[n] = a[r]);
                                            })
                                            : function (e) {
                                                return s(e, 0, i);
                                            })
                                    : s;
                        },
                    },
                    pseudos: {
                        not: ce(function (e) {
                            var t = [],
                                i = [],
                                n = o(e.replace(B, "$1"));
                            return n[x]
                                ? ce(function (e, t, i, s) {
                                    for (var a, r = n(e, null, s, []), o = e.length; o--;)
                                        (a = r[o]) && (e[o] = !(t[o] = a));
                                })
                                : function (e, s, a) {
                                    return (t[0] = e), n(t, null, a, i), (t[0] = null), !i.pop();
                                };
                        }),
                        has: ce(function (e) {
                            return function (t) {
                                return 0 < oe(e, t).length;
                            };
                        }),
                        contains: ce(function (e) {
                            return (
                                (e = e.replace(te, ie)),
                                    function (t) {
                                        return -1 < (t.textContent || s(t)).indexOf(e);
                                    }
                            );
                        }),
                        lang: ce(function (e) {
                            return (
                                G.test(e || "") || oe.error("unsupported lang: " + e),
                                    (e = e.replace(te, ie).toLowerCase()),
                                    function (t) {
                                        var i;
                                        do {
                                            if (
                                                (i = m
                                                    ? t.lang
                                                    : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                            )
                                                return (
                                                    (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
                                                );
                                        } while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1;
                                    }
                            );
                        }),
                        target: function (t) {
                            var i = e.location && e.location.hash;
                            return i && i.slice(1) === t.id;
                        },
                        root: function (e) {
                            return e === f;
                        },
                        focus: function (e) {
                            return (
                                e === p.activeElement &&
                                (!p.hasFocus || p.hasFocus()) &&
                                !!(e.type || e.href || ~e.tabIndex)
                            );
                        },
                        enabled: me(!1),
                        disabled: me(!0),
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return (
                                ("input" === t && !!e.checked) || ("option" === t && !!e.selected)
                            );
                        },
                        selected: function (e) {
                            return (
                                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                            );
                        },
                        empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function (e) {
                            return !n.pseudos.empty(e);
                        },
                        header: function (e) {
                            return Z.test(e.nodeName);
                        },
                        input: function (e) {
                            return K.test(e.nodeName);
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return ("input" === t && "button" === e.type) || "button" === t;
                        },
                        text: function (e) {
                            var t;
                            return (
                                "input" === e.nodeName.toLowerCase() &&
                                "text" === e.type &&
                                (null == (t = e.getAttribute("type")) ||
                                    "text" === t.toLowerCase())
                            );
                        },
                        first: ve(function () {
                            return [0];
                        }),
                        last: ve(function (e, t) {
                            return [t - 1];
                        }),
                        eq: ve(function (e, t, i) {
                            return [i < 0 ? i + t : i];
                        }),
                        even: ve(function (e, t) {
                            for (var i = 0; i < t; i += 2) e.push(i);
                            return e;
                        }),
                        odd: ve(function (e, t) {
                            for (var i = 1; i < t; i += 2) e.push(i);
                            return e;
                        }),
                        lt: ve(function (e, t, i) {
                            for (var n = i < 0 ? i + t : t < i ? t : i; 0 <= --n;) e.push(n);
                            return e;
                        }),
                        gt: ve(function (e, t, i) {
                            for (var n = i < 0 ? i + t : i; ++n < t;) e.push(n);
                            return e;
                        }),
                    },
                }).pseudos.nth = n.pseudos.eq),
                {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}))
                n.pseudos[t] = pe(t);
            for (t in {submit: !0, reset: !0}) n.pseudos[t] = fe(t);

            function be() {
            }

            function ye(e) {
                for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
                return n;
            }

            function xe(e, t, i) {
                var n = t.dir,
                    s = t.next,
                    a = s || n,
                    r = i && "parentNode" === a,
                    o = C++;
                return t.first
                    ? function (t, i, s) {
                        for (; (t = t[n]);) if (1 === t.nodeType || r) return e(t, i, s);
                        return !1;
                    }
                    : function (t, i, l) {
                        var c,
                            d,
                            h,
                            u = [T, o];
                        if (l) {
                            for (; (t = t[n]);)
                                if ((1 === t.nodeType || r) && e(t, i, l)) return !0;
                        } else
                            for (; (t = t[n]);)
                                if (1 === t.nodeType || r)
                                    if (
                                        ((d =
                                            (h = t[x] || (t[x] = {}))[t.uniqueID] ||
                                            (h[t.uniqueID] = {})),
                                        s && s === t.nodeName.toLowerCase())
                                    )
                                        t = t[n] || t;
                                    else {
                                        if ((c = d[a]) && c[0] === T && c[1] === o)
                                            return (u[2] = c[2]);
                                        if (((d[a] = u)[2] = e(t, i, l))) return !0;
                                    }
                        return !1;
                    };
            }

            function we(e) {
                return 1 < e.length
                    ? function (t, i, n) {
                        for (var s = e.length; s--;) if (!e[s](t, i, n)) return !1;
                        return !0;
                    }
                    : e[0];
            }

            function Te(e, t, i, n, s) {
                for (var a, r = [], o = 0, l = e.length, c = null != t; o < l; o++)
                    (a = e[o]) && ((i && !i(a, n, s)) || (r.push(a), c && t.push(o)));
                return r;
            }

            function Ce(e, t, i, n, s, a) {
                return (
                    n && !n[x] && (n = Ce(n)),
                    s && !s[x] && (s = Ce(s, a)),
                        ce(function (a, r, o, l) {
                            var c,
                                d,
                                h,
                                u = [],
                                p = [],
                                f = r.length,
                                m =
                                    a ||
                                    (function (e, t, i) {
                                        for (var n = 0, s = t.length; n < s; n++) oe(e, t[n], i);
                                        return i;
                                    })(t || "*", o.nodeType ? [o] : o, []),
                                v = !e || (!a && t) ? m : Te(m, u, e, o, l),
                                g = i ? (s || (a ? e : f || n) ? [] : r) : v;
                            if ((i && i(v, g, o, l), n))
                                for (c = Te(g, p), n(c, [], o, l), d = c.length; d--;)
                                    (h = c[d]) && (g[p[d]] = !(v[p[d]] = h));
                            if (a) {
                                if (s || e) {
                                    if (s) {
                                        for (c = [], d = g.length; d--;)
                                            (h = g[d]) && c.push((v[d] = h));
                                        s(null, (g = []), c, l);
                                    }
                                    for (d = g.length; d--;)
                                        (h = g[d]) &&
                                        -1 < (c = s ? O(a, h) : u[d]) &&
                                        (a[c] = !(r[c] = h));
                                }
                            } else (g = Te(g === r ? g.splice(f, g.length) : g)), s ? s(null, r, g, l) : D.apply(r, g);
                        })
                );
            }

            function Se(e) {
                for (
                    var t,
                        i,
                        s,
                        a = e.length,
                        r = n.relative[e[0].type],
                        o = r || n.relative[" "],
                        l = r ? 1 : 0,
                        d = xe(
                            function (e) {
                                return e === t;
                            },
                            o,
                            !0
                        ),
                        h = xe(
                            function (e) {
                                return -1 < O(t, e);
                            },
                            o,
                            !0
                        ),
                        u = [
                            function (e, i, n) {
                                var s =
                                    (!r && (n || i !== c)) ||
                                    ((t = i).nodeType ? d(e, i, n) : h(e, i, n));
                                return (t = null), s;
                            },
                        ];
                    l < a;
                    l++
                )
                    if ((i = n.relative[e[l].type])) u = [xe(we(u), i)];
                    else {
                        if ((i = n.filter[e[l].type].apply(null, e[l].matches))[x]) {
                            for (s = ++l; s < a && !n.relative[e[s].type]; s++) ;
                            return Ce(
                                1 < l && we(u),
                                1 < l &&
                                ye(
                                    e
                                        .slice(0, l - 1)
                                        .concat({value: " " === e[l - 2].type ? "*" : ""})
                                ).replace(B, "$1"),
                                i,
                                l < s && Se(e.slice(l, s)),
                                s < a && Se((e = e.slice(s))),
                                s < a && ye(e)
                            );
                        }
                        u.push(i);
                    }
                return we(u);
            }

            return (
                (be.prototype = n.filters = n.pseudos),
                    (n.setFilters = new be()),
                    (r = oe.tokenize = function (e, t) {
                        var i,
                            s,
                            a,
                            r,
                            o,
                            l,
                            c,
                            d = E[e + " "];
                        if (d) return t ? 0 : d.slice(0);
                        for (o = e, l = [], c = n.preFilter; o;) {
                            for (r in ((i && !(s = X.exec(o))) ||
                            (s && (o = o.slice(s[0].length) || o), l.push((a = []))),
                                (i = !1),
                            (s = W.exec(o)) &&
                            ((i = s.shift()),
                                a.push({value: i, type: s[0].replace(B, " ")}),
                                (o = o.slice(i.length))),
                                n.filter))
                                !(s = _[r].exec(o)) ||
                                (c[r] && !(s = c[r](s))) ||
                                ((i = s.shift()),
                                    a.push({value: i, type: r, matches: s}),
                                    (o = o.slice(i.length)));
                            if (!i) break;
                        }
                        return t ? o.length : o ? oe.error(e) : E(e, l).slice(0);
                    }),
                    (o = oe.compile = function (e, t) {
                        var i,
                            s,
                            a,
                            o,
                            l,
                            d,
                            h = [],
                            f = [],
                            v = P[e + " "];
                        if (!v) {
                            for (t || (t = r(e)), i = t.length; i--;)
                                (v = Se(t[i]))[x] ? h.push(v) : f.push(v);
                            (v = P(
                                e,
                                ((s = f),
                                    (o = 0 < (a = h).length),
                                    (l = 0 < s.length),
                                    (d = function (e, t, i, r, d) {
                                        var h,
                                            f,
                                            v,
                                            g = 0,
                                            b = "0",
                                            y = e && [],
                                            x = [],
                                            w = c,
                                            C = e || (l && n.find.TAG("*", d)),
                                            S = (T += null == w ? 1 : Math.random() || 0.1),
                                            E = C.length;
                                        for (
                                            d && (c = t === p || t || d);
                                            b !== E && null != (h = C[b]);
                                            b++
                                        ) {
                                            if (l && h) {
                                                for (
                                                    f = 0, t || h.ownerDocument === p || (u(h), (i = !m));
                                                    (v = s[f++]);
                                                )
                                                    if (v(h, t || p, i)) {
                                                        r.push(h);
                                                        break;
                                                    }
                                                d && (T = S);
                                            }
                                            o && ((h = !v && h) && g--, e && y.push(h));
                                        }
                                        if (((g += b), o && b !== g)) {
                                            for (f = 0; (v = a[f++]);) v(y, x, t, i);
                                            if (e) {
                                                if (0 < g) for (; b--;) y[b] || x[b] || (x[b] = A.call(r));
                                                x = Te(x);
                                            }
                                            D.apply(r, x),
                                            d &&
                                            !e &&
                                            0 < x.length &&
                                            1 < g + a.length &&
                                            oe.uniqueSort(r);
                                        }
                                        return d && ((T = S), (c = w)), y;
                                    }),
                                    o ? ce(d) : d)
                            )).selector = e;
                        }
                        return v;
                    }),
                    (l = oe.select = function (e, t, i, s) {
                        var a,
                            l,
                            c,
                            d,
                            h,
                            u = "function" == typeof e && e,
                            p = !s && r((e = u.selector || e));
                        if (((i = i || []), 1 === p.length)) {
                            if (
                                2 < (l = p[0] = p[0].slice(0)).length &&
                                "ID" === (c = l[0]).type &&
                                9 === t.nodeType &&
                                m &&
                                n.relative[l[1].type]
                            ) {
                                if (!(t = (n.find.ID(c.matches[0].replace(te, ie), t) || [])[0]))
                                    return i;
                                u && (t = t.parentNode), (e = e.slice(l.shift().value.length));
                            }
                            for (
                                a = _.needsContext.test(e) ? 0 : l.length;
                                a-- && ((c = l[a]), !n.relative[(d = c.type)]);
                            )
                                if (
                                    (h = n.find[d]) &&
                                    (s = h(
                                        c.matches[0].replace(te, ie),
                                        (ee.test(l[0].type) && ge(t.parentNode)) || t
                                    ))
                                ) {
                                    if ((l.splice(a, 1), !(e = s.length && ye(l))))
                                        return D.apply(i, s), i;
                                    break;
                                }
                        }
                        return (
                            (u || o(e, p))(
                                s,
                                t,
                                !m,
                                i,
                                !t || (ee.test(e) && ge(t.parentNode)) || t
                            ),
                                i
                        );
                    }),
                    (i.sortStable = x.split("").sort(k).join("") === x),
                    (i.detectDuplicates = !!h),
                    u(),
                    (i.sortDetached = de(function (e) {
                        return 1 & e.compareDocumentPosition(p.createElement("fieldset"));
                    })),
                de(function (e) {
                    return (
                        (e.innerHTML = "<a href='#'></a>"),
                        "#" === e.firstChild.getAttribute("href")
                    );
                }) ||
                he("type|href|height|width", function (e, t, i) {
                    if (!i)
                        return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                }),
                (i.attributes &&
                    de(function (e) {
                        return (
                            (e.innerHTML = "<input/>"),
                                e.firstChild.setAttribute("value", ""),
                            "" === e.firstChild.getAttribute("value")
                        );
                    })) ||
                he("value", function (e, t, i) {
                    if (!i && "input" === e.nodeName.toLowerCase())
                        return e.defaultValue;
                }),
                de(function (e) {
                    return null == e.getAttribute("disabled");
                }) ||
                he(N, function (e, t, i) {
                    var n;
                    if (!i)
                        return !0 === e[t]
                            ? t.toLowerCase()
                            : (n = e.getAttributeNode(t)) && n.specified
                                ? n.value
                                : null;
                }),
                    oe
            );
        })(e);
        (w.find = S),
            (w.expr = S.selectors),
            (w.expr[":"] = w.expr.pseudos),
            (w.uniqueSort = w.unique = S.uniqueSort),
            (w.text = S.getText),
            (w.isXMLDoc = S.isXML),
            (w.contains = S.contains),
            (w.escapeSelector = S.escape);
        var E = function (e, t, i) {
                for (var n = [], s = void 0 !== i; (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (s && w(e).is(i)) break;
                        n.push(e);
                    }
                return n;
            },
            P = function (e, t) {
                for (var i = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && i.push(e);
                return i;
            },
            M = w.expr.match.needsContext;

        function k(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        }

        var $ = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function L(e, t, i) {
            return m(t)
                ? w.grep(e, function (e, n) {
                    return !!t.call(e, n, e) !== i;
                })
                : t.nodeType
                    ? w.grep(e, function (e) {
                        return (e === t) !== i;
                    })
                    : "string" != typeof t
                        ? w.grep(e, function (e) {
                            return -1 < l.call(t, e) !== i;
                        })
                        : w.filter(t, e, i);
        }

        (w.filter = function (e, t, i) {
            var n = t[0];
            return (
                i && (e = ":not(" + e + ")"),
                    1 === t.length && 1 === n.nodeType
                        ? w.find.matchesSelector(n, e)
                        ? [n]
                        : []
                        : w.find.matches(
                        e,
                        w.grep(t, function (e) {
                            return 1 === e.nodeType;
                        })
                        )
            );
        }),
            w.fn.extend({
                find: function (e) {
                    var t,
                        i,
                        n = this.length,
                        s = this;
                    if ("string" != typeof e)
                        return this.pushStack(
                            w(e).filter(function () {
                                for (t = 0; t < n; t++) if (w.contains(s[t], this)) return !0;
                            })
                        );
                    for (i = this.pushStack([]), t = 0; t < n; t++) w.find(e, s[t], i);
                    return 1 < n ? w.uniqueSort(i) : i;
                },
                filter: function (e) {
                    return this.pushStack(L(this, e || [], !1));
                },
                not: function (e) {
                    return this.pushStack(L(this, e || [], !0));
                },
                is: function (e) {
                    return !!L(
                        this,
                        "string" == typeof e && M.test(e) ? w(e) : e || [],
                        !1
                    ).length;
                },
            });
        var A,
            z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((w.fn.init = function (e, t, i) {
            var s, a;
            if (!e) return this;
            if (((i = i || A), "string" == typeof e)) {
                if (
                    !(s =
                        "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
                            ? [null, e, null]
                            : z.exec(e)) ||
                    (!s[1] && t)
                )
                    return !t || t.jquery
                        ? (t || i).find(e)
                        : this.constructor(t).find(e);
                if (s[1]) {
                    if (
                        ((t = t instanceof w ? t[0] : t),
                            w.merge(
                                this,
                                w.parseHTML(s[1], t && t.nodeType ? t.ownerDocument || t : n, !0)
                            ),
                        $.test(s[1]) && w.isPlainObject(t))
                    )
                        for (s in t) m(this[s]) ? this[s](t[s]) : this.attr(s, t[s]);
                    return this;
                }
                return (
                    (a = n.getElementById(s[2])) && ((this[0] = a), (this.length = 1)),
                        this
                );
            }
            return e.nodeType
                ? ((this[0] = e), (this.length = 1), this)
                : m(e)
                    ? void 0 !== i.ready
                        ? i.ready(e)
                        : e(w)
                    : w.makeArray(e, this);
        }).prototype = w.fn),
            (A = w(n));
        var D = /^(?:parents|prev(?:Until|All))/,
            I = {children: !0, contents: !0, next: !0, prev: !0};

        function O(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType;) ;
            return e;
        }

        w.fn.extend({
            has: function (e) {
                var t = w(e, this),
                    i = t.length;
                return this.filter(function () {
                    for (var e = 0; e < i; e++) if (w.contains(this, t[e])) return !0;
                });
            },
            closest: function (e, t) {
                var i,
                    n = 0,
                    s = this.length,
                    a = [],
                    r = "string" != typeof e && w(e);
                if (!M.test(e))
                    for (; n < s; n++)
                        for (i = this[n]; i && i !== t; i = i.parentNode)
                            if (
                                i.nodeType < 11 &&
                                (r
                                    ? -1 < r.index(i)
                                    : 1 === i.nodeType && w.find.matchesSelector(i, e))
                            ) {
                                a.push(i);
                                break;
                            }
                return this.pushStack(1 < a.length ? w.uniqueSort(a) : a);
            },
            index: function (e) {
                return e
                    ? "string" == typeof e
                        ? l.call(w(e), this[0])
                        : l.call(this, e.jquery ? e[0] : e)
                    : this[0] && this[0].parentNode
                        ? this.first().prevAll().length
                        : -1;
            },
            add: function (e, t) {
                return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
            },
            addBack: function (e) {
                return this.add(
                    null == e ? this.prevObject : this.prevObject.filter(e)
                );
            },
        }),
            w.each(
                {
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null;
                    },
                    parents: function (e) {
                        return E(e, "parentNode");
                    },
                    parentsUntil: function (e, t, i) {
                        return E(e, "parentNode", i);
                    },
                    next: function (e) {
                        return O(e, "nextSibling");
                    },
                    prev: function (e) {
                        return O(e, "previousSibling");
                    },
                    nextAll: function (e) {
                        return E(e, "nextSibling");
                    },
                    prevAll: function (e) {
                        return E(e, "previousSibling");
                    },
                    nextUntil: function (e, t, i) {
                        return E(e, "nextSibling", i);
                    },
                    prevUntil: function (e, t, i) {
                        return E(e, "previousSibling", i);
                    },
                    siblings: function (e) {
                        return P((e.parentNode || {}).firstChild, e);
                    },
                    children: function (e) {
                        return P(e.firstChild);
                    },
                    contents: function (e) {
                        return void 0 !== e.contentDocument
                            ? e.contentDocument
                            : (k(e, "template") && (e = e.content || e),
                                w.merge([], e.childNodes));
                    },
                },
                function (e, t) {
                    w.fn[e] = function (i, n) {
                        var s = w.map(this, t, i);
                        return (
                            "Until" !== e.slice(-5) && (n = i),
                            n && "string" == typeof n && (s = w.filter(n, s)),
                            1 < this.length &&
                            (I[e] || w.uniqueSort(s), D.test(e) && s.reverse()),
                                this.pushStack(s)
                        );
                    };
                }
            );
        var N = /[^\x20\t\r\n\f]+/g;

        function H(e) {
            return e;
        }

        function j(e) {
            throw e;
        }

        function q(e, t, i, n) {
            var s;
            try {
                e && m((s = e.promise))
                    ? s.call(e).done(t).fail(i)
                    : e && m((s = e.then))
                    ? s.call(e, t, i)
                    : t.apply(void 0, [e].slice(n));
            } catch (e) {
                i.apply(void 0, [e]);
            }
        }

        (w.Callbacks = function (e) {
            var t, i;
            e =
                "string" == typeof e
                    ? ((t = e),
                        (i = {}),
                        w.each(t.match(N) || [], function (e, t) {
                            i[t] = !0;
                        }),
                        i)
                    : w.extend({}, e);
            var n,
                s,
                a,
                r,
                o = [],
                l = [],
                c = -1,
                d = function () {
                    for (r = r || e.once, a = n = !0; l.length; c = -1)
                        for (s = l.shift(); ++c < o.length;)
                            !1 === o[c].apply(s[0], s[1]) &&
                            e.stopOnFalse &&
                            ((c = o.length), (s = !1));
                    e.memory || (s = !1), (n = !1), r && (o = s ? [] : "");
                },
                h = {
                    add: function () {
                        return (
                            o &&
                            (s && !n && ((c = o.length - 1), l.push(s)),
                                (function t(i) {
                                    w.each(i, function (i, n) {
                                        m(n)
                                            ? (e.unique && h.has(n)) || o.push(n)
                                            : n && n.length && "string" !== y(n) && t(n);
                                    });
                                })(arguments),
                            s && !n && d()),
                                this
                        );
                    },
                    remove: function () {
                        return (
                            w.each(arguments, function (e, t) {
                                for (var i; -1 < (i = w.inArray(t, o, i));)
                                    o.splice(i, 1), i <= c && c--;
                            }),
                                this
                        );
                    },
                    has: function (e) {
                        return e ? -1 < w.inArray(e, o) : 0 < o.length;
                    },
                    empty: function () {
                        return o && (o = []), this;
                    },
                    disable: function () {
                        return (r = l = []), (o = s = ""), this;
                    },
                    disabled: function () {
                        return !o;
                    },
                    lock: function () {
                        return (r = l = []), s || n || (o = s = ""), this;
                    },
                    locked: function () {
                        return !!r;
                    },
                    fireWith: function (e, t) {
                        return (
                            r ||
                            ((t = [e, (t = t || []).slice ? t.slice() : t]),
                                l.push(t),
                            n || d()),
                                this
                        );
                    },
                    fire: function () {
                        return h.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!a;
                    },
                };
            return h;
        }),
            w.extend({
                Deferred: function (t) {
                    var i = [
                            [
                                "notify",
                                "progress",
                                w.Callbacks("memory"),
                                w.Callbacks("memory"),
                                2,
                            ],
                            [
                                "resolve",
                                "done",
                                w.Callbacks("once memory"),
                                w.Callbacks("once memory"),
                                0,
                                "resolved",
                            ],
                            [
                                "reject",
                                "fail",
                                w.Callbacks("once memory"),
                                w.Callbacks("once memory"),
                                1,
                                "rejected",
                            ],
                        ],
                        n = "pending",
                        s = {
                            state: function () {
                                return n;
                            },
                            always: function () {
                                return a.done(arguments).fail(arguments), this;
                            },
                            catch: function (e) {
                                return s.then(null, e);
                            },
                            pipe: function () {
                                var e = arguments;
                                return w
                                    .Deferred(function (t) {
                                        w.each(i, function (i, n) {
                                            var s = m(e[n[4]]) && e[n[4]];
                                            a[n[1]](function () {
                                                var e = s && s.apply(this, arguments);
                                                e && m(e.promise)
                                                    ? e
                                                        .promise()
                                                        .progress(t.notify)
                                                        .done(t.resolve)
                                                        .fail(t.reject)
                                                    : t[n[0] + "With"](this, s ? [e] : arguments);
                                            });
                                        }),
                                            (e = null);
                                    })
                                    .promise();
                            },
                            then: function (t, n, s) {
                                var a = 0;

                                function r(t, i, n, s) {
                                    return function () {
                                        var o = this,
                                            l = arguments,
                                            c = function () {
                                                var e, c;
                                                if (!(t < a)) {
                                                    if ((e = n.apply(o, l)) === i.promise())
                                                        throw new TypeError("Thenable self-resolution");
                                                    (c =
                                                        e &&
                                                        ("object" == typeof e || "function" == typeof e) &&
                                                        e.then),
                                                        m(c)
                                                            ? s
                                                            ? c.call(e, r(a, i, H, s), r(a, i, j, s))
                                                            : (a++,
                                                                c.call(
                                                                    e,
                                                                    r(a, i, H, s),
                                                                    r(a, i, j, s),
                                                                    r(a, i, H, i.notifyWith)
                                                                ))
                                                            : (n !== H && ((o = void 0), (l = [e])),
                                                                (s || i.resolveWith)(o, l));
                                                }
                                            },
                                            d = s
                                                ? c
                                                : function () {
                                                    try {
                                                        c();
                                                    } catch (e) {
                                                        w.Deferred.exceptionHook &&
                                                        w.Deferred.exceptionHook(e, d.stackTrace),
                                                        a <= t + 1 &&
                                                        (n !== j && ((o = void 0), (l = [e])),
                                                            i.rejectWith(o, l));
                                                    }
                                                };
                                        t
                                            ? d()
                                            : (w.Deferred.getStackHook &&
                                            (d.stackTrace = w.Deferred.getStackHook()),
                                                e.setTimeout(d));
                                    };
                                }

                                return w
                                    .Deferred(function (e) {
                                        i[0][3].add(r(0, e, m(s) ? s : H, e.notifyWith)),
                                            i[1][3].add(r(0, e, m(t) ? t : H)),
                                            i[2][3].add(r(0, e, m(n) ? n : j));
                                    })
                                    .promise();
                            },
                            promise: function (e) {
                                return null != e ? w.extend(e, s) : s;
                            },
                        },
                        a = {};
                    return (
                        w.each(i, function (e, t) {
                            var r = t[2],
                                o = t[5];
                            (s[t[1]] = r.add),
                            o &&
                            r.add(
                                function () {
                                    n = o;
                                },
                                i[3 - e][2].disable,
                                i[3 - e][3].disable,
                                i[0][2].lock,
                                i[0][3].lock
                            ),
                                r.add(t[3].fire),
                                (a[t[0]] = function () {
                                    return (
                                        a[t[0] + "With"](this === a ? void 0 : this, arguments),
                                            this
                                    );
                                }),
                                (a[t[0] + "With"] = r.fireWith);
                        }),
                            s.promise(a),
                        t && t.call(a, a),
                            a
                    );
                },
                when: function (e) {
                    var t = arguments.length,
                        i = t,
                        n = Array(i),
                        s = a.call(arguments),
                        r = w.Deferred(),
                        o = function (e) {
                            return function (i) {
                                (n[e] = this),
                                    (s[e] = 1 < arguments.length ? a.call(arguments) : i),
                                --t || r.resolveWith(n, s);
                            };
                        };
                    if (
                        t <= 1 &&
                        (q(e, r.done(o(i)).resolve, r.reject, !t),
                        "pending" === r.state() || m(s[i] && s[i].then))
                    )
                        return r.then();
                    for (; i--;) q(s[i], o(i), r.reject);
                    return r.promise();
                },
            });
        var R = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (w.Deferred.exceptionHook = function (t, i) {
            e.console &&
            e.console.warn &&
            t &&
            R.test(t.name) &&
            e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i);
        }),
            (w.readyException = function (t) {
                e.setTimeout(function () {
                    throw t;
                });
            });
        var F = w.Deferred();

        function B() {
            n.removeEventListener("DOMContentLoaded", B),
                e.removeEventListener("load", B),
                w.ready();
        }

        (w.fn.ready = function (e) {
            return (
                F.then(e).catch(function (e) {
                    w.readyException(e);
                }),
                    this
            );
        }),
            w.extend({
                isReady: !1,
                readyWait: 1,
                ready: function (e) {
                    (!0 === e ? --w.readyWait : w.isReady) ||
                    ((w.isReady = !0) !== e && 0 < --w.readyWait) ||
                    F.resolveWith(n, [w]);
                },
            }),
            (w.ready.then = F.then),
            "complete" === n.readyState ||
            ("loading" !== n.readyState && !n.documentElement.doScroll)
                ? e.setTimeout(w.ready)
                : (n.addEventListener("DOMContentLoaded", B),
                    e.addEventListener("load", B));
        var X = function (e, t, i, n, s, a, r) {
                var o = 0,
                    l = e.length,
                    c = null == i;
                if ("object" === y(i))
                    for (o in ((s = !0), i)) X(e, t, o, i[o], !0, a, r);
                else if (
                    void 0 !== n &&
                    ((s = !0),
                    m(n) || (r = !0),
                    c &&
                    (r
                        ? (t.call(e, n), (t = null))
                        : ((c = t),
                            (t = function (e, t, i) {
                                return c.call(w(e), i);
                            }))),
                        t)
                )
                    for (; o < l; o++) t(e[o], i, r ? n : n.call(e[o], o, t(e[o], i)));
                return s ? e : c ? t.call(e) : l ? t(e[0], i) : a;
            },
            W = /^-ms-/,
            Y = /-([a-z])/g;

        function V(e, t) {
            return t.toUpperCase();
        }

        function G(e) {
            return e.replace(W, "ms-").replace(Y, V);
        }

        var _ = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
        };

        function U() {
            this.expando = w.expando + U.uid++;
        }

        (U.uid = 1),
            (U.prototype = {
                cache: function (e) {
                    var t = e[this.expando];
                    return (
                        t ||
                        ((t = {}),
                        _(e) &&
                        (e.nodeType
                            ? (e[this.expando] = t)
                            : Object.defineProperty(e, this.expando, {
                                value: t,
                                configurable: !0,
                            }))),
                            t
                    );
                },
                set: function (e, t, i) {
                    var n,
                        s = this.cache(e);
                    if ("string" == typeof t) s[G(t)] = i;
                    else for (n in t) s[G(n)] = t[n];
                    return s;
                },
                get: function (e, t) {
                    return void 0 === t
                        ? this.cache(e)
                        : e[this.expando] && e[this.expando][G(t)];
                },
                access: function (e, t, i) {
                    return void 0 === t || (t && "string" == typeof t && void 0 === i)
                        ? this.get(e, t)
                        : (this.set(e, t, i), void 0 !== i ? i : t);
                },
                remove: function (e, t) {
                    var i,
                        n = e[this.expando];
                    if (void 0 !== n) {
                        if (void 0 !== t) {
                            i = (t = Array.isArray(t)
                                ? t.map(G)
                                : (t = G(t)) in n
                                    ? [t]
                                    : t.match(N) || []).length;
                            for (; i--;) delete n[t[i]];
                        }
                        (void 0 === t || w.isEmptyObject(n)) &&
                        (e.nodeType
                            ? (e[this.expando] = void 0)
                            : delete e[this.expando]);
                    }
                },
                hasData: function (e) {
                    var t = e[this.expando];
                    return void 0 !== t && !w.isEmptyObject(t);
                },
            });
        var K = new U(),
            Z = new U(),
            Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            J = /[A-Z]/g;

        function ee(e, t, i) {
            var n, s;
            if (void 0 === i && 1 === e.nodeType)
                if (
                    ((n = "data-" + t.replace(J, "-$&").toLowerCase()),
                    "string" == typeof (i = e.getAttribute(n)))
                ) {
                    try {
                        i =
                            "true" === (s = i) ||
                            ("false" !== s &&
                                ("null" === s
                                    ? null
                                    : s === +s + ""
                                        ? +s
                                        : Q.test(s)
                                            ? JSON.parse(s)
                                            : s));
                    } catch (e) {
                    }
                    Z.set(e, t, i);
                } else i = void 0;
            return i;
        }

        w.extend({
            hasData: function (e) {
                return Z.hasData(e) || K.hasData(e);
            },
            data: function (e, t, i) {
                return Z.access(e, t, i);
            },
            removeData: function (e, t) {
                Z.remove(e, t);
            },
            _data: function (e, t, i) {
                return K.access(e, t, i);
            },
            _removeData: function (e, t) {
                K.remove(e, t);
            },
        }),
            w.fn.extend({
                data: function (e, t) {
                    var i,
                        n,
                        s,
                        a = this[0],
                        r = a && a.attributes;
                    if (void 0 === e) {
                        if (
                            this.length &&
                            ((s = Z.get(a)), 1 === a.nodeType && !K.get(a, "hasDataAttrs"))
                        ) {
                            for (i = r.length; i--;)
                                r[i] &&
                                0 === (n = r[i].name).indexOf("data-") &&
                                ((n = G(n.slice(5))), ee(a, n, s[n]));
                            K.set(a, "hasDataAttrs", !0);
                        }
                        return s;
                    }
                    return "object" == typeof e
                        ? this.each(function () {
                            Z.set(this, e);
                        })
                        : X(
                            this,
                            function (t) {
                                var i;
                                if (a && void 0 === t)
                                    return void 0 !== (i = Z.get(a, e))
                                        ? i
                                        : void 0 !== (i = ee(a, e))
                                            ? i
                                            : void 0;
                                this.each(function () {
                                    Z.set(this, e, t);
                                });
                            },
                            null,
                            t,
                            1 < arguments.length,
                            null,
                            !0
                        );
                },
                removeData: function (e) {
                    return this.each(function () {
                        Z.remove(this, e);
                    });
                },
            }),
            w.extend({
                queue: function (e, t, i) {
                    var n;
                    if (e)
                        return (
                            (t = (t || "fx") + "queue"),
                                (n = K.get(e, t)),
                            i &&
                            (!n || Array.isArray(i)
                                ? (n = K.access(e, t, w.makeArray(i)))
                                : n.push(i)),
                            n || []
                        );
                },
                dequeue: function (e, t) {
                    t = t || "fx";
                    var i = w.queue(e, t),
                        n = i.length,
                        s = i.shift(),
                        a = w._queueHooks(e, t);
                    "inprogress" === s && ((s = i.shift()), n--),
                    s &&
                    ("fx" === t && i.unshift("inprogress"),
                        delete a.stop,
                        s.call(
                            e,
                            function () {
                                w.dequeue(e, t);
                            },
                            a
                        )),
                    !n && a && a.empty.fire();
                },
                _queueHooks: function (e, t) {
                    var i = t + "queueHooks";
                    return (
                        K.get(e, i) ||
                        K.access(e, i, {
                            empty: w.Callbacks("once memory").add(function () {
                                K.remove(e, [t + "queue", i]);
                            }),
                        })
                    );
                },
            }),
            w.fn.extend({
                queue: function (e, t) {
                    var i = 2;
                    return (
                        "string" != typeof e && ((t = e), (e = "fx"), i--),
                            arguments.length < i
                                ? w.queue(this[0], e)
                                : void 0 === t
                                ? this
                                : this.each(function () {
                                    var i = w.queue(this, e, t);
                                    w._queueHooks(this, e),
                                    "fx" === e && "inprogress" !== i[0] && w.dequeue(this, e);
                                })
                    );
                },
                dequeue: function (e) {
                    return this.each(function () {
                        w.dequeue(this, e);
                    });
                },
                clearQueue: function (e) {
                    return this.queue(e || "fx", []);
                },
                promise: function (e, t) {
                    var i,
                        n = 1,
                        s = w.Deferred(),
                        a = this,
                        r = this.length,
                        o = function () {
                            --n || s.resolveWith(a, [a]);
                        };
                    for (
                        "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
                        r--;
                    )
                        (i = K.get(a[r], e + "queueHooks")) &&
                        i.empty &&
                        (n++, i.empty.add(o));
                    return o(), s.promise(t);
                },
            });
        var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ie = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$", "i"),
            ne = ["Top", "Right", "Bottom", "Left"],
            se = n.documentElement,
            ae = function (e) {
                return w.contains(e.ownerDocument, e);
            },
            re = {composed: !0};
        se.getRootNode &&
        (ae = function (e) {
            return (
                w.contains(e.ownerDocument, e) ||
                e.getRootNode(re) === e.ownerDocument
            );
        });
        var oe = function (e, t) {
                return (
                    "none" === (e = t || e).style.display ||
                    ("" === e.style.display && ae(e) && "none" === w.css(e, "display"))
                );
            },
            le = function (e, t, i, n) {
                var s,
                    a,
                    r = {};
                for (a in t) (r[a] = e.style[a]), (e.style[a] = t[a]);
                for (a in ((s = i.apply(e, n || [])), t)) e.style[a] = r[a];
                return s;
            };

        function ce(e, t, i, n) {
            var s,
                a,
                r = 20,
                o = n
                    ? function () {
                        return n.cur();
                    }
                    : function () {
                        return w.css(e, t, "");
                    },
                l = o(),
                c = (i && i[3]) || (w.cssNumber[t] ? "" : "px"),
                d =
                    e.nodeType &&
                    (w.cssNumber[t] || ("px" !== c && +l)) &&
                    ie.exec(w.css(e, t));
            if (d && d[3] !== c) {
                for (l /= 2, c = c || d[3], d = +l || 1; r--;)
                    w.style(e, t, d + c),
                    (1 - a) * (1 - (a = o() / l || 0.5)) <= 0 && (r = 0),
                        (d /= a);
                (d *= 2), w.style(e, t, d + c), (i = i || []);
            }
            return (
                i &&
                ((d = +d || +l || 0),
                    (s = i[1] ? d + (i[1] + 1) * i[2] : +i[2]),
                n && ((n.unit = c), (n.start = d), (n.end = s))),
                    s
            );
        }

        var de = {};

        function he(e, t) {
            for (var i, n, s, a, r, o, l, c = [], d = 0, h = e.length; d < h; d++)
                (n = e[d]).style &&
                ((i = n.style.display),
                    t
                        ? ("none" === i &&
                        ((c[d] = K.get(n, "display") || null),
                        c[d] || (n.style.display = "")),
                        "" === n.style.display &&
                        oe(n) &&
                        (c[d] =
                            ((l = r = a = void 0),
                                (r = (s = n).ownerDocument),
                                (o = s.nodeName),
                            (l = de[o]) ||
                            ((a = r.body.appendChild(r.createElement(o))),
                                (l = w.css(a, "display")),
                                a.parentNode.removeChild(a),
                            "none" === l && (l = "block"),
                                (de[o] = l)))))
                        : "none" !== i && ((c[d] = "none"), K.set(n, "display", i)));
            for (d = 0; d < h; d++) null != c[d] && (e[d].style.display = c[d]);
            return e;
        }

        w.fn.extend({
            show: function () {
                return he(this, !0);
            },
            hide: function () {
                return he(this);
            },
            toggle: function (e) {
                return "boolean" == typeof e
                    ? e
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                        oe(this) ? w(this).show() : w(this).hide();
                    });
            },
        });
        var ue = /^(?:checkbox|radio)$/i,
            pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            fe = /^$|^module$|\/(?:java|ecma)script/i,
            me = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""],
            };

        function ve(e, t) {
            var i;
            return (
                (i =
                    void 0 !== e.getElementsByTagName
                        ? e.getElementsByTagName(t || "*")
                        : void 0 !== e.querySelectorAll
                        ? e.querySelectorAll(t || "*")
                        : []),
                    void 0 === t || (t && k(e, t)) ? w.merge([e], i) : i
            );
        }

        function ge(e, t) {
            for (var i = 0, n = e.length; i < n; i++)
                K.set(e[i], "globalEval", !t || K.get(t[i], "globalEval"));
        }

        (me.optgroup = me.option),
            (me.tbody = me.tfoot = me.colgroup = me.caption = me.thead),
            (me.th = me.td);
        var be,
            ye,
            xe = /<|&#?\w+;/;

        function we(e, t, i, n, s) {
            for (
                var a,
                    r,
                    o,
                    l,
                    c,
                    d,
                    h = t.createDocumentFragment(),
                    u = [],
                    p = 0,
                    f = e.length;
                p < f;
                p++
            )
                if ((a = e[p]) || 0 === a)
                    if ("object" === y(a)) w.merge(u, a.nodeType ? [a] : a);
                    else if (xe.test(a)) {
                        for (
                            r = r || h.appendChild(t.createElement("div")),
                                o = (pe.exec(a) || ["", ""])[1].toLowerCase(),
                                l = me[o] || me._default,
                                r.innerHTML = l[1] + w.htmlPrefilter(a) + l[2],
                                d = l[0];
                            d--;
                        )
                            r = r.lastChild;
                        w.merge(u, r.childNodes), ((r = h.firstChild).textContent = "");
                    } else u.push(t.createTextNode(a));
            for (h.textContent = "", p = 0; (a = u[p++]);)
                if (n && -1 < w.inArray(a, n)) s && s.push(a);
                else if (
                    ((c = ae(a)), (r = ve(h.appendChild(a), "script")), c && ge(r), i)
                )
                    for (d = 0; (a = r[d++]);) fe.test(a.type || "") && i.push(a);
            return h;
        }

        (be = n.createDocumentFragment().appendChild(n.createElement("div"))),
            (ye = n.createElement("input")).setAttribute("type", "radio"),
            ye.setAttribute("checked", "checked"),
            ye.setAttribute("name", "t"),
            be.appendChild(ye),
            (f.checkClone = be.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (be.innerHTML = "<textarea>x</textarea>"),
            (f.noCloneChecked = !!be.cloneNode(!0).lastChild.defaultValue);
        var Te = /^key/,
            Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Se = /^([^.]*)(?:\.(.+)|)/;

        function Ee() {
            return !0;
        }

        function Pe() {
            return !1;
        }

        function Me(e, t) {
            return (
                (e ===
                    (function () {
                        try {
                            return n.activeElement;
                        } catch (e) {
                        }
                    })()) ==
                ("focus" === t)
            );
        }

        function ke(e, t, i, n, s, a) {
            var r, o;
            if ("object" == typeof t) {
                for (o in ("string" != typeof i && ((n = n || i), (i = void 0)), t))
                    ke(e, o, i, n, t[o], a);
                return e;
            }
            if (
                (null == n && null == s
                    ? ((s = i), (n = i = void 0))
                    : null == s &&
                    ("string" == typeof i
                        ? ((s = n), (n = void 0))
                        : ((s = n), (n = i), (i = void 0))),
                !1 === s)
            )
                s = Pe;
            else if (!s) return e;
            return (
                1 === a &&
                ((r = s),
                    ((s = function (e) {
                        return w().off(e), r.apply(this, arguments);
                    }).guid = r.guid || (r.guid = w.guid++))),
                    e.each(function () {
                        w.event.add(this, t, s, n, i);
                    })
            );
        }

        function $e(e, t, i) {
            i
                ? (K.set(e, t, !1),
                    w.event.add(e, t, {
                        namespace: !1,
                        handler: function (e) {
                            var n,
                                s,
                                r = K.get(this, t);
                            if (1 & e.isTrigger && this[t]) {
                                if (r.length)
                                    (w.event.special[t] || {}).delegateType &&
                                    e.stopPropagation();
                                else if (
                                    ((r = a.call(arguments)),
                                        K.set(this, t, r),
                                        (n = i(this, t)),
                                        this[t](),
                                        r !== (s = K.get(this, t)) || n
                                            ? K.set(this, t, !1)
                                            : (s = {}),
                                    r !== s)
                                )
                                    return (
                                        e.stopImmediatePropagation(), e.preventDefault(), s.value
                                    );
                            } else
                                r.length &&
                                (K.set(this, t, {
                                    value: w.event.trigger(
                                        w.extend(r[0], w.Event.prototype),
                                        r.slice(1),
                                        this
                                    ),
                                }),
                                    e.stopImmediatePropagation());
                        },
                    }))
                : void 0 === K.get(e, t) && w.event.add(e, t, Ee);
        }

        (w.event = {
            global: {},
            add: function (e, t, i, n, s) {
                var a,
                    r,
                    o,
                    l,
                    c,
                    d,
                    h,
                    u,
                    p,
                    f,
                    m,
                    v = K.get(e);
                if (v)
                    for (
                        i.handler && ((i = (a = i).handler), (s = a.selector)),
                        s && w.find.matchesSelector(se, s),
                        i.guid || (i.guid = w.guid++),
                        (l = v.events) || (l = v.events = {}),
                        (r = v.handle) ||
                        (r = v.handle = function (t) {
                            return void 0 !== w && w.event.triggered !== t.type
                                ? w.event.dispatch.apply(e, arguments)
                                : void 0;
                        }),
                            c = (t = (t || "").match(N) || [""]).length;
                        c--;
                    )
                        (p = m = (o = Se.exec(t[c]) || [])[1]),
                            (f = (o[2] || "").split(".").sort()),
                        p &&
                        ((h = w.event.special[p] || {}),
                            (p = (s ? h.delegateType : h.bindType) || p),
                            (h = w.event.special[p] || {}),
                            (d = w.extend(
                                {
                                    type: p,
                                    origType: m,
                                    data: n,
                                    handler: i,
                                    guid: i.guid,
                                    selector: s,
                                    needsContext: s && w.expr.match.needsContext.test(s),
                                    namespace: f.join("."),
                                },
                                a
                            )),
                        (u = l[p]) ||
                        (((u = l[p] = []).delegateCount = 0),
                        (h.setup && !1 !== h.setup.call(e, n, f, r)) ||
                        (e.addEventListener && e.addEventListener(p, r))),
                        h.add &&
                        (h.add.call(e, d),
                        d.handler.guid || (d.handler.guid = i.guid)),
                            s ? u.splice(u.delegateCount++, 0, d) : u.push(d),
                            (w.event.global[p] = !0));
            },
            remove: function (e, t, i, n, s) {
                var a,
                    r,
                    o,
                    l,
                    c,
                    d,
                    h,
                    u,
                    p,
                    f,
                    m,
                    v = K.hasData(e) && K.get(e);
                if (v && (l = v.events)) {
                    for (c = (t = (t || "").match(N) || [""]).length; c--;)
                        if (
                            ((p = m = (o = Se.exec(t[c]) || [])[1]),
                                (f = (o[2] || "").split(".").sort()),
                                p)
                        ) {
                            for (
                                h = w.event.special[p] || {},
                                    u = l[(p = (n ? h.delegateType : h.bindType) || p)] || [],
                                    o =
                                        o[2] &&
                                        new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                    r = a = u.length;
                                a--;
                            )
                                (d = u[a]),
                                (!s && m !== d.origType) ||
                                (i && i.guid !== d.guid) ||
                                (o && !o.test(d.namespace)) ||
                                (n && n !== d.selector && ("**" !== n || !d.selector)) ||
                                (u.splice(a, 1),
                                d.selector && u.delegateCount--,
                                h.remove && h.remove.call(e, d));
                            r &&
                            !u.length &&
                            ((h.teardown && !1 !== h.teardown.call(e, f, v.handle)) ||
                            w.removeEvent(e, p, v.handle),
                                delete l[p]);
                        } else for (p in l) w.event.remove(e, p + t[c], i, n, !0);
                    w.isEmptyObject(l) && K.remove(e, "handle events");
                }
            },
            dispatch: function (e) {
                var t,
                    i,
                    n,
                    s,
                    a,
                    r,
                    o = w.event.fix(e),
                    l = new Array(arguments.length),
                    c = (K.get(this, "events") || {})[o.type] || [],
                    d = w.event.special[o.type] || {};
                for (l[0] = o, t = 1; t < arguments.length; t++) l[t] = arguments[t];
                if (
                    ((o.delegateTarget = this),
                    !d.preDispatch || !1 !== d.preDispatch.call(this, o))
                ) {
                    for (
                        r = w.event.handlers.call(this, o, c), t = 0;
                        (s = r[t++]) && !o.isPropagationStopped();
                    )
                        for (
                            o.currentTarget = s.elem, i = 0;
                            (a = s.handlers[i++]) && !o.isImmediatePropagationStopped();
                        )
                            (o.rnamespace &&
                                !1 !== a.namespace &&
                                !o.rnamespace.test(a.namespace)) ||
                            ((o.handleObj = a),
                                (o.data = a.data),
                            void 0 !==
                            (n = (
                                (w.event.special[a.origType] || {}).handle || a.handler
                            ).apply(s.elem, l)) &&
                            !1 === (o.result = n) &&
                            (o.preventDefault(), o.stopPropagation()));
                    return d.postDispatch && d.postDispatch.call(this, o), o.result;
                }
            },
            handlers: function (e, t) {
                var i,
                    n,
                    s,
                    a,
                    r,
                    o = [],
                    l = t.delegateCount,
                    c = e.target;
                if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                            for (a = [], r = {}, i = 0; i < l; i++)
                                void 0 === r[(s = (n = t[i]).selector + " ")] &&
                                (r[s] = n.needsContext
                                    ? -1 < w(s, this).index(c)
                                    : w.find(s, this, null, [c]).length),
                                r[s] && a.push(n);
                            a.length && o.push({elem: c, handlers: a});
                        }
                return (
                    (c = this),
                    l < t.length && o.push({elem: c, handlers: t.slice(l)}),
                        o
                );
            },
            addProp: function (e, t) {
                Object.defineProperty(w.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: m(t)
                        ? function () {
                            if (this.originalEvent) return t(this.originalEvent);
                        }
                        : function () {
                            if (this.originalEvent) return this.originalEvent[e];
                        },
                    set: function (t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t,
                        });
                    },
                });
            },
            fix: function (e) {
                return e[w.expando] ? e : new w.Event(e);
            },
            special: {
                load: {noBubble: !0},
                click: {
                    setup: function (e) {
                        var t = this || e;
                        return (
                            ue.test(t.type) && t.click && k(t, "input") && $e(t, "click", Ee),
                                !1
                        );
                    },
                    trigger: function (e) {
                        var t = this || e;
                        return (
                            ue.test(t.type) && t.click && k(t, "input") && $e(t, "click"), !0
                        );
                    },
                    _default: function (e) {
                        var t = e.target;
                        return (
                            (ue.test(t.type) &&
                                t.click &&
                                k(t, "input") &&
                                K.get(t, "click")) ||
                            k(t, "a")
                        );
                    },
                },
                beforeunload: {
                    postDispatch: function (e) {
                        void 0 !== e.result &&
                        e.originalEvent &&
                        (e.originalEvent.returnValue = e.result);
                    },
                },
            },
        }),
            (w.removeEvent = function (e, t, i) {
                e.removeEventListener && e.removeEventListener(t, i);
            }),
            (w.Event = function (e, t) {
                if (!(this instanceof w.Event)) return new w.Event(e, t);
                e && e.type
                    ? ((this.originalEvent = e),
                        (this.type = e.type),
                        (this.isDefaultPrevented =
                            e.defaultPrevented ||
                            (void 0 === e.defaultPrevented && !1 === e.returnValue)
                                ? Ee
                                : Pe),
                        (this.target =
                            e.target && 3 === e.target.nodeType
                                ? e.target.parentNode
                                : e.target),
                        (this.currentTarget = e.currentTarget),
                        (this.relatedTarget = e.relatedTarget))
                    : (this.type = e),
                t && w.extend(this, t),
                    (this.timeStamp = (e && e.timeStamp) || Date.now()),
                    (this[w.expando] = !0);
            }),
            (w.Event.prototype = {
                constructor: w.Event,
                isDefaultPrevented: Pe,
                isPropagationStopped: Pe,
                isImmediatePropagationStopped: Pe,
                isSimulated: !1,
                preventDefault: function () {
                    var e = this.originalEvent;
                    (this.isDefaultPrevented = Ee),
                    e && !this.isSimulated && e.preventDefault();
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    (this.isPropagationStopped = Ee),
                    e && !this.isSimulated && e.stopPropagation();
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    (this.isImmediatePropagationStopped = Ee),
                    e && !this.isSimulated && e.stopImmediatePropagation(),
                        this.stopPropagation();
                },
            }),
            w.each(
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
                    which: function (e) {
                        var t = e.button;
                        return null == e.which && Te.test(e.type)
                            ? null != e.charCode
                                ? e.charCode
                                : e.keyCode
                            : !e.which && void 0 !== t && Ce.test(e.type)
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
                w.event.addProp
            ),
            w.each({focus: "focusin", blur: "focusout"}, function (e, t) {
                w.event.special[e] = {
                    setup: function () {
                        return $e(this, e, Me), !1;
                    },
                    trigger: function () {
                        return $e(this, e), !0;
                    },
                    delegateType: t,
                };
            }),
            w.each(
                {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout",
                },
                function (e, t) {
                    w.event.special[e] = {
                        delegateType: t,
                        bindType: t,
                        handle: function (e) {
                            var i,
                                n = e.relatedTarget,
                                s = e.handleObj;
                            return (
                                (n && (n === this || w.contains(this, n))) ||
                                ((e.type = s.origType),
                                    (i = s.handler.apply(this, arguments)),
                                    (e.type = t)),
                                    i
                            );
                        },
                    };
                }
            ),
            w.fn.extend({
                on: function (e, t, i, n) {
                    return ke(this, e, t, i, n);
                },
                one: function (e, t, i, n) {
                    return ke(this, e, t, i, n, 1);
                },
                off: function (e, t, i) {
                    var n, s;
                    if (e && e.preventDefault && e.handleObj)
                        return (
                            (n = e.handleObj),
                                w(e.delegateTarget).off(
                                    n.namespace ? n.origType + "." + n.namespace : n.origType,
                                    n.selector,
                                    n.handler
                                ),
                                this
                        );
                    if ("object" == typeof e) {
                        for (s in e) this.off(s, t, e[s]);
                        return this;
                    }
                    return (
                        (!1 !== t && "function" != typeof t) || ((i = t), (t = void 0)),
                        !1 === i && (i = Pe),
                            this.each(function () {
                                w.event.remove(this, e, i, t);
                            })
                    );
                },
            });
        var Le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            Ae = /<script|<style|<link/i,
            ze = /checked\s*(?:[^=]|=\s*.checked.)/i,
            De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

        function Ie(e, t) {
            return (
                (k(e, "table") &&
                    k(11 !== t.nodeType ? t : t.firstChild, "tr") &&
                    w(e).children("tbody")[0]) ||
                e
            );
        }

        function Oe(e) {
            return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
        }

        function Ne(e) {
            return (
                "true/" === (e.type || "").slice(0, 5)
                    ? (e.type = e.type.slice(5))
                    : e.removeAttribute("type"),
                    e
            );
        }

        function He(e, t) {
            var i, n, s, a, r, o, l, c;
            if (1 === t.nodeType) {
                if (
                    K.hasData(e) &&
                    ((a = K.access(e)), (r = K.set(t, a)), (c = a.events))
                )
                    for (s in (delete r.handle, (r.events = {}), c))
                        for (i = 0, n = c[s].length; i < n; i++) w.event.add(t, s, c[s][i]);
                Z.hasData(e) && ((o = Z.access(e)), (l = w.extend({}, o)), Z.set(t, l));
            }
        }

        function je(e, t, i, n) {
            t = r.apply([], t);
            var s,
                a,
                o,
                l,
                c,
                d,
                h = 0,
                u = e.length,
                p = u - 1,
                v = t[0],
                g = m(v);
            if (g || (1 < u && "string" == typeof v && !f.checkClone && ze.test(v)))
                return e.each(function (s) {
                    var a = e.eq(s);
                    g && (t[0] = v.call(this, s, a.html())), je(a, t, i, n);
                });
            if (
                u &&
                ((a = (s = we(t, e[0].ownerDocument, !1, e, n)).firstChild),
                1 === s.childNodes.length && (s = a),
                a || n)
            ) {
                for (l = (o = w.map(ve(s, "script"), Oe)).length; h < u; h++)
                    (c = s),
                    h !== p &&
                    ((c = w.clone(c, !0, !0)), l && w.merge(o, ve(c, "script"))),
                        i.call(e[h], c, h);
                if (l)
                    for (
                        d = o[o.length - 1].ownerDocument, w.map(o, Ne), h = 0;
                        h < l;
                        h++
                    )
                        (c = o[h]),
                        fe.test(c.type || "") &&
                        !K.access(c, "globalEval") &&
                        w.contains(d, c) &&
                        (c.src && "module" !== (c.type || "").toLowerCase()
                            ? w._evalUrl &&
                            !c.noModule &&
                            w._evalUrl(c.src, {
                                nonce: c.nonce || c.getAttribute("nonce"),
                            })
                            : b(c.textContent.replace(De, ""), c, d));
            }
            return e;
        }

        function qe(e, t, i) {
            for (var n, s = t ? w.filter(t, e) : e, a = 0; null != (n = s[a]); a++)
                i || 1 !== n.nodeType || w.cleanData(ve(n)),
                n.parentNode &&
                (i && ae(n) && ge(ve(n, "script")), n.parentNode.removeChild(n));
            return e;
        }

        w.extend({
            htmlPrefilter: function (e) {
                return e.replace(Le, "<$1></$2>");
            },
            clone: function (e, t, i) {
                var n,
                    s,
                    a,
                    r,
                    o,
                    l,
                    c,
                    d = e.cloneNode(!0),
                    h = ae(e);
                if (
                    !(
                        f.noCloneChecked ||
                        (1 !== e.nodeType && 11 !== e.nodeType) ||
                        w.isXMLDoc(e)
                    )
                )
                    for (r = ve(d), n = 0, s = (a = ve(e)).length; n < s; n++)
                        (o = a[n]),
                            "input" === (c = (l = r[n]).nodeName.toLowerCase()) &&
                            ue.test(o.type)
                                ? (l.checked = o.checked)
                                : ("input" !== c && "textarea" !== c) ||
                                (l.defaultValue = o.defaultValue);
                if (t)
                    if (i)
                        for (
                            a = a || ve(e), r = r || ve(d), n = 0, s = a.length;
                            n < s;
                            n++
                        )
                            He(a[n], r[n]);
                    else He(e, d);
                return (
                    0 < (r = ve(d, "script")).length && ge(r, !h && ve(e, "script")), d
                );
            },
            cleanData: function (e) {
                for (
                    var t, i, n, s = w.event.special, a = 0;
                    void 0 !== (i = e[a]);
                    a++
                )
                    if (_(i)) {
                        if ((t = i[K.expando])) {
                            if (t.events)
                                for (n in t.events)
                                    s[n] ? w.event.remove(i, n) : w.removeEvent(i, n, t.handle);
                            i[K.expando] = void 0;
                        }
                        i[Z.expando] && (i[Z.expando] = void 0);
                    }
            },
        }),
            w.fn.extend({
                detach: function (e) {
                    return qe(this, e, !0);
                },
                remove: function (e) {
                    return qe(this, e);
                },
                text: function (e) {
                    return X(
                        this,
                        function (e) {
                            return void 0 === e
                                ? w.text(this)
                                : this.empty().each(function () {
                                    (1 !== this.nodeType &&
                                        11 !== this.nodeType &&
                                        9 !== this.nodeType) ||
                                    (this.textContent = e);
                                });
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                append: function () {
                    return je(this, arguments, function (e) {
                        (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                        Ie(this, e).appendChild(e);
                    });
                },
                prepend: function () {
                    return je(this, arguments, function (e) {
                        if (
                            1 === this.nodeType ||
                            11 === this.nodeType ||
                            9 === this.nodeType
                        ) {
                            var t = Ie(this, e);
                            t.insertBefore(e, t.firstChild);
                        }
                    });
                },
                before: function () {
                    return je(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this);
                    });
                },
                after: function () {
                    return je(this, arguments, function (e) {
                        this.parentNode &&
                        this.parentNode.insertBefore(e, this.nextSibling);
                    });
                },
                empty: function () {
                    for (var e, t = 0; null != (e = this[t]); t++)
                        1 === e.nodeType && (w.cleanData(ve(e, !1)), (e.textContent = ""));
                    return this;
                },
                clone: function (e, t) {
                    return (
                        (e = null != e && e),
                            (t = null == t ? e : t),
                            this.map(function () {
                                return w.clone(this, e, t);
                            })
                    );
                },
                html: function (e) {
                    return X(
                        this,
                        function (e) {
                            var t = this[0] || {},
                                i = 0,
                                n = this.length;
                            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                            if (
                                "string" == typeof e &&
                                !Ae.test(e) &&
                                !me[(pe.exec(e) || ["", ""])[1].toLowerCase()]
                            ) {
                                e = w.htmlPrefilter(e);
                                try {
                                    for (; i < n; i++)
                                        1 === (t = this[i] || {}).nodeType &&
                                        (w.cleanData(ve(t, !1)), (t.innerHTML = e));
                                    t = 0;
                                } catch (e) {
                                }
                            }
                            t && this.empty().append(e);
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                replaceWith: function () {
                    var e = [];
                    return je(
                        this,
                        arguments,
                        function (t) {
                            var i = this.parentNode;
                            w.inArray(this, e) < 0 &&
                            (w.cleanData(ve(this)), i && i.replaceChild(t, this));
                        },
                        e
                    );
                },
            }),
            w.each(
                {
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith",
                },
                function (e, t) {
                    w.fn[e] = function (e) {
                        for (var i, n = [], s = w(e), a = s.length - 1, r = 0; r <= a; r++)
                            (i = r === a ? this : this.clone(!0)),
                                w(s[r])[t](i),
                                o.apply(n, i.get());
                        return this.pushStack(n);
                    };
                }
            );
        var Re = new RegExp("^(" + te + ")(?!px)[a-z%]+$", "i"),
            Fe = function (t) {
                var i = t.ownerDocument.defaultView;
                return (i && i.opener) || (i = e), i.getComputedStyle(t);
            },
            Be = new RegExp(ne.join("|"), "i");

        function Xe(e, t, i) {
            var n,
                s,
                a,
                r,
                o = e.style;
            return (
                (i = i || Fe(e)) &&
                ("" !== (r = i.getPropertyValue(t) || i[t]) ||
                ae(e) ||
                (r = w.style(e, t)),
                !f.pixelBoxStyles() &&
                Re.test(r) &&
                Be.test(t) &&
                ((n = o.width),
                    (s = o.minWidth),
                    (a = o.maxWidth),
                    (o.minWidth = o.maxWidth = o.width = r),
                    (r = i.width),
                    (o.width = n),
                    (o.minWidth = s),
                    (o.maxWidth = a))),
                    void 0 !== r ? r + "" : r
            );
        }

        function We(e, t) {
            return {
                get: function () {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get;
                },
            };
        }

        !(function () {
            function t() {
                if (d) {
                    (c.style.cssText =
                        "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                        (d.style.cssText =
                            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                        se.appendChild(c).appendChild(d);
                    var t = e.getComputedStyle(d);
                    (s = "1%" !== t.top),
                        (l = 12 === i(t.marginLeft)),
                        (d.style.right = "60%"),
                        (o = 36 === i(t.right)),
                        (a = 36 === i(t.width)),
                        (d.style.position = "absolute"),
                        (r = 12 === i(d.offsetWidth / 3)),
                        se.removeChild(c),
                        (d = null);
                }
            }

            function i(e) {
                return Math.round(parseFloat(e));
            }

            var s,
                a,
                r,
                o,
                l,
                c = n.createElement("div"),
                d = n.createElement("div");
            d.style &&
            ((d.style.backgroundClip = "content-box"),
                (d.cloneNode(!0).style.backgroundClip = ""),
                (f.clearCloneStyle = "content-box" === d.style.backgroundClip),
                w.extend(f, {
                    boxSizingReliable: function () {
                        return t(), a;
                    },
                    pixelBoxStyles: function () {
                        return t(), o;
                    },
                    pixelPosition: function () {
                        return t(), s;
                    },
                    reliableMarginLeft: function () {
                        return t(), l;
                    },
                    scrollboxSize: function () {
                        return t(), r;
                    },
                }));
        })();
        var Ye = ["Webkit", "Moz", "ms"],
            Ve = n.createElement("div").style,
            Ge = {};

        function _e(e) {
            return (
                w.cssProps[e] ||
                Ge[e] ||
                (e in Ve
                    ? e
                    : (Ge[e] =
                        (function (e) {
                            for (
                                var t = e[0].toUpperCase() + e.slice(1), i = Ye.length;
                                i--;
                            )
                                if ((e = Ye[i] + t) in Ve) return e;
                        })(e) || e))
            );
        }

        var Ue = /^(none|table(?!-c[ea]).+)/,
            Ke = /^--/,
            Ze = {position: "absolute", visibility: "hidden", display: "block"},
            Qe = {letterSpacing: "0", fontWeight: "400"};

        function Je(e, t, i) {
            var n = ie.exec(t);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t;
        }

        function et(e, t, i, n, s, a) {
            var r = "width" === t ? 1 : 0,
                o = 0,
                l = 0;
            if (i === (n ? "border" : "content")) return 0;
            for (; r < 4; r += 2)
                "margin" === i && (l += w.css(e, i + ne[r], !0, s)),
                    n
                        ? ("content" === i && (l -= w.css(e, "padding" + ne[r], !0, s)),
                        "margin" !== i &&
                        (l -= w.css(e, "border" + ne[r] + "Width", !0, s)))
                        : ((l += w.css(e, "padding" + ne[r], !0, s)),
                            "padding" !== i
                                ? (l += w.css(e, "border" + ne[r] + "Width", !0, s))
                                : (o += w.css(e, "border" + ne[r] + "Width", !0, s)));
            return (
                !n &&
                0 <= a &&
                (l +=
                    Math.max(
                        0,
                        Math.ceil(
                            e["offset" + t[0].toUpperCase() + t.slice(1)] - a - l - o - 0.5
                        )
                    ) || 0),
                    l
            );
        }

        function tt(e, t, i) {
            var n = Fe(e),
                s =
                    (!f.boxSizingReliable() || i) &&
                    "border-box" === w.css(e, "boxSizing", !1, n),
                a = s,
                r = Xe(e, t, n),
                o = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Re.test(r)) {
                if (!i) return r;
                r = "auto";
            }
            return (
                ((!f.boxSizingReliable() && s) ||
                    "auto" === r ||
                    (!parseFloat(r) && "inline" === w.css(e, "display", !1, n))) &&
                e.getClientRects().length &&
                ((s = "border-box" === w.css(e, "boxSizing", !1, n)),
                (a = o in e) && (r = e[o])),
                (r = parseFloat(r) || 0) +
                et(e, t, i || (s ? "border" : "content"), a, n, r) +
                "px"
            );
        }

        function it(e, t, i, n, s) {
            return new it.prototype.init(e, t, i, n, s);
        }

        w.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var i = Xe(e, "opacity");
                            return "" === i ? "1" : i;
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
            style: function (e, t, i, n) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var s,
                        a,
                        r,
                        o = G(t),
                        l = Ke.test(t),
                        c = e.style;
                    if (
                        (l || (t = _e(o)),
                            (r = w.cssHooks[t] || w.cssHooks[o]),
                        void 0 === i)
                    )
                        return r && "get" in r && void 0 !== (s = r.get(e, !1, n))
                            ? s
                            : c[t];
                    "string" == (a = typeof i) &&
                    (s = ie.exec(i)) &&
                    s[1] &&
                    ((i = ce(e, t, s)), (a = "number")),
                    null != i &&
                    i == i &&
                    ("number" !== a ||
                    l ||
                    (i += (s && s[3]) || (w.cssNumber[o] ? "" : "px")),
                    f.clearCloneStyle ||
                    "" !== i ||
                    0 !== t.indexOf("background") ||
                    (c[t] = "inherit"),
                    (r && "set" in r && void 0 === (i = r.set(e, i, n))) ||
                    (l ? c.setProperty(t, i) : (c[t] = i)));
                }
            },
            css: function (e, t, i, n) {
                var s,
                    a,
                    r,
                    o = G(t);
                return (
                    Ke.test(t) || (t = _e(o)),
                    (r = w.cssHooks[t] || w.cssHooks[o]) &&
                    "get" in r &&
                    (s = r.get(e, !0, i)),
                    void 0 === s && (s = Xe(e, t, n)),
                    "normal" === s && t in Qe && (s = Qe[t]),
                        "" === i || i
                            ? ((a = parseFloat(s)), !0 === i || isFinite(a) ? a || 0 : s)
                            : s
                );
            },
        }),
            w.each(["height", "width"], function (e, t) {
                w.cssHooks[t] = {
                    get: function (e, i, n) {
                        if (i)
                            return !Ue.test(w.css(e, "display")) ||
                            (e.getClientRects().length && e.getBoundingClientRect().width)
                                ? tt(e, t, n)
                                : le(e, Ze, function () {
                                    return tt(e, t, n);
                                });
                    },
                    set: function (e, i, n) {
                        var s,
                            a = Fe(e),
                            r = !f.scrollboxSize() && "absolute" === a.position,
                            o = (r || n) && "border-box" === w.css(e, "boxSizing", !1, a),
                            l = n ? et(e, t, n, o, a) : 0;
                        return (
                            o &&
                            r &&
                            (l -= Math.ceil(
                                e["offset" + t[0].toUpperCase() + t.slice(1)] -
                                parseFloat(a[t]) -
                                et(e, t, "border", !1, a) -
                                0.5
                            )),
                            l &&
                            (s = ie.exec(i)) &&
                            "px" !== (s[3] || "px") &&
                            ((e.style[t] = i), (i = w.css(e, t))),
                                Je(0, i, l)
                        );
                    },
                };
            }),
            (w.cssHooks.marginLeft = We(f.reliableMarginLeft, function (e, t) {
                if (t)
                    return (
                        (parseFloat(Xe(e, "marginLeft")) ||
                            e.getBoundingClientRect().left -
                            le(e, {marginLeft: 0}, function () {
                                return e.getBoundingClientRect().left;
                            })) + "px"
                    );
            })),
            w.each({margin: "", padding: "", border: "Width"}, function (e, t) {
                (w.cssHooks[e + t] = {
                    expand: function (i) {
                        for (
                            var n = 0, s = {}, a = "string" == typeof i ? i.split(" ") : [i];
                            n < 4;
                            n++
                        )
                            s[e + ne[n] + t] = a[n] || a[n - 2] || a[0];
                        return s;
                    },
                }),
                "margin" !== e && (w.cssHooks[e + t].set = Je);
            }),
            w.fn.extend({
                css: function (e, t) {
                    return X(
                        this,
                        function (e, t, i) {
                            var n,
                                s,
                                a = {},
                                r = 0;
                            if (Array.isArray(t)) {
                                for (n = Fe(e), s = t.length; r < s; r++)
                                    a[t[r]] = w.css(e, t[r], !1, n);
                                return a;
                            }
                            return void 0 !== i ? w.style(e, t, i) : w.css(e, t);
                        },
                        e,
                        t,
                        1 < arguments.length
                    );
                },
            }),
            (((w.Tween = it).prototype = {
                constructor: it,
                init: function (e, t, i, n, s, a) {
                    (this.elem = e),
                        (this.prop = i),
                        (this.easing = s || w.easing._default),
                        (this.options = t),
                        (this.start = this.now = this.cur()),
                        (this.end = n),
                        (this.unit = a || (w.cssNumber[i] ? "" : "px"));
                },
                cur: function () {
                    var e = it.propHooks[this.prop];
                    return e && e.get ? e.get(this) : it.propHooks._default.get(this);
                },
                run: function (e) {
                    var t,
                        i = it.propHooks[this.prop];
                    return (
                        this.options.duration
                            ? (this.pos = t = w.easing[this.easing](
                            e,
                            this.options.duration * e,
                            0,
                            1,
                            this.options.duration
                            ))
                            : (this.pos = t = e),
                            (this.now = (this.end - this.start) * t + this.start),
                        this.options.step &&
                        this.options.step.call(this.elem, this.now, this),
                            i && i.set ? i.set(this) : it.propHooks._default.set(this),
                            this
                    );
                },
            }).init.prototype = it.prototype),
            ((it.propHooks = {
                _default: {
                    get: function (e) {
                        var t;
                        return 1 !== e.elem.nodeType ||
                        (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                            ? e.elem[e.prop]
                            : (t = w.css(e.elem, e.prop, "")) && "auto" !== t
                                ? t
                                : 0;
                    },
                    set: function (e) {
                        w.fx.step[e.prop]
                            ? w.fx.step[e.prop](e)
                            : 1 !== e.elem.nodeType ||
                            (!w.cssHooks[e.prop] && null == e.elem.style[_e(e.prop)])
                            ? (e.elem[e.prop] = e.now)
                            : w.style(e.elem, e.prop, e.now + e.unit);
                    },
                },
            }).scrollTop = it.propHooks.scrollLeft = {
                set: function (e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                },
            }),
            (w.easing = {
                linear: function (e) {
                    return e;
                },
                swing: function (e) {
                    return 0.5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing",
            }),
            (w.fx = it.prototype.init),
            (w.fx.step = {});
        var nt,
            st,
            at,
            rt,
            ot = /^(?:toggle|show|hide)$/,
            lt = /queueHooks$/;

        function ct() {
            st &&
            (!1 === n.hidden && e.requestAnimationFrame
                ? e.requestAnimationFrame(ct)
                : e.setTimeout(ct, w.fx.interval),
                w.fx.tick());
        }

        function dt() {
            return (
                e.setTimeout(function () {
                    nt = void 0;
                }),
                    (nt = Date.now())
            );
        }

        function ht(e, t) {
            var i,
                n = 0,
                s = {height: e};
            for (t = t ? 1 : 0; n < 4; n += 2 - t)
                s["margin" + (i = ne[n])] = s["padding" + i] = e;
            return t && (s.opacity = s.width = e), s;
        }

        function ut(e, t, i) {
            for (
                var n,
                    s = (pt.tweeners[t] || []).concat(pt.tweeners["*"]),
                    a = 0,
                    r = s.length;
                a < r;
                a++
            )
                if ((n = s[a].call(i, t, e))) return n;
        }

        function pt(e, t, i) {
            var n,
                s,
                a = 0,
                r = pt.prefilters.length,
                o = w.Deferred().always(function () {
                    delete l.elem;
                }),
                l = function () {
                    if (s) return !1;
                    for (
                        var t = nt || dt(),
                            i = Math.max(0, c.startTime + c.duration - t),
                            n = 1 - (i / c.duration || 0),
                            a = 0,
                            r = c.tweens.length;
                        a < r;
                        a++
                    )
                        c.tweens[a].run(n);
                    return (
                        o.notifyWith(e, [c, n, i]),
                            n < 1 && r
                                ? i
                                : (r || o.notifyWith(e, [c, 1, 0]), o.resolveWith(e, [c]), !1)
                    );
                },
                c = o.promise({
                    elem: e,
                    props: w.extend({}, t),
                    opts: w.extend(
                        !0,
                        {specialEasing: {}, easing: w.easing._default},
                        i
                    ),
                    originalProperties: t,
                    originalOptions: i,
                    startTime: nt || dt(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function (t, i) {
                        var n = w.Tween(
                            e,
                            c.opts,
                            t,
                            i,
                            c.opts.specialEasing[t] || c.opts.easing
                        );
                        return c.tweens.push(n), n;
                    },
                    stop: function (t) {
                        var i = 0,
                            n = t ? c.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; i < n; i++) c.tweens[i].run(1);
                        return (
                            t
                                ? (o.notifyWith(e, [c, 1, 0]), o.resolveWith(e, [c, t]))
                                : o.rejectWith(e, [c, t]),
                                this
                        );
                    },
                }),
                d = c.props;
            for (
                (function (e, t) {
                    var i, n, s, a, r;
                    for (i in e)
                        if (
                            ((s = t[(n = G(i))]),
                                (a = e[i]),
                            Array.isArray(a) && ((s = a[1]), (a = e[i] = a[0])),
                            i !== n && ((e[n] = a), delete e[i]),
                            (r = w.cssHooks[n]) && ("expand" in r))
                        )
                            for (i in ((a = r.expand(a)), delete e[n], a))
                                (i in e) || ((e[i] = a[i]), (t[i] = s));
                        else t[n] = s;
                })(d, c.opts.specialEasing);
                a < r;
                a++
            )
                if ((n = pt.prefilters[a].call(c, e, d, c.opts)))
                    return (
                        m(n.stop) &&
                        (w._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)),
                            n
                    );
            return (
                w.map(d, ut, c),
                m(c.opts.start) && c.opts.start.call(e, c),
                    c
                        .progress(c.opts.progress)
                        .done(c.opts.done, c.opts.complete)
                        .fail(c.opts.fail)
                        .always(c.opts.always),
                    w.fx.timer(w.extend(l, {elem: e, anim: c, queue: c.opts.queue})),
                    c
            );
        }

        (w.Animation = w.extend(pt, {
            tweeners: {
                "*": [
                    function (e, t) {
                        var i = this.createTween(e, t);
                        return ce(i.elem, e, ie.exec(t), i), i;
                    },
                ],
            },
            tweener: function (e, t) {
                m(e) ? ((t = e), (e = ["*"])) : (e = e.match(N));
                for (var i, n = 0, s = e.length; n < s; n++)
                    (i = e[n]),
                        (pt.tweeners[i] = pt.tweeners[i] || []),
                        pt.tweeners[i].unshift(t);
            },
            prefilters: [
                function (e, t, i) {
                    var n,
                        s,
                        a,
                        r,
                        o,
                        l,
                        c,
                        d,
                        h = "width" in t || "height" in t,
                        u = this,
                        p = {},
                        f = e.style,
                        m = e.nodeType && oe(e),
                        v = K.get(e, "fxshow");
                    for (n in (i.queue ||
                    (null == (r = w._queueHooks(e, "fx")).unqueued &&
                    ((r.unqueued = 0),
                        (o = r.empty.fire),
                        (r.empty.fire = function () {
                            r.unqueued || o();
                        })),
                        r.unqueued++,
                        u.always(function () {
                            u.always(function () {
                                r.unqueued--, w.queue(e, "fx").length || r.empty.fire();
                            });
                        })),
                        t))
                        if (((s = t[n]), ot.test(s))) {
                            if (
                                (delete t[n],
                                    (a = a || "toggle" === s),
                                s === (m ? "hide" : "show"))
                            ) {
                                if ("show" !== s || !v || void 0 === v[n]) continue;
                                m = !0;
                            }
                            p[n] = (v && v[n]) || w.style(e, n);
                        }
                    if ((l = !w.isEmptyObject(t)) || !w.isEmptyObject(p))
                        for (n in (h &&
                        1 === e.nodeType &&
                        ((i.overflow = [f.overflow, f.overflowX, f.overflowY]),
                        null == (c = v && v.display) && (c = K.get(e, "display")),
                        "none" === (d = w.css(e, "display")) &&
                        (c
                            ? (d = c)
                            : (he([e], !0),
                                (c = e.style.display || c),
                                (d = w.css(e, "display")),
                                he([e]))),
                        ("inline" === d || ("inline-block" === d && null != c)) &&
                        "none" === w.css(e, "float") &&
                        (l ||
                        (u.done(function () {
                            f.display = c;
                        }),
                        null == c && ((d = f.display), (c = "none" === d ? "" : d))),
                            (f.display = "inline-block"))),
                        i.overflow &&
                        ((f.overflow = "hidden"),
                            u.always(function () {
                                (f.overflow = i.overflow[0]),
                                    (f.overflowX = i.overflow[1]),
                                    (f.overflowY = i.overflow[2]);
                            })),
                            (l = !1),
                            p))
                            l ||
                            (v
                                ? "hidden" in v && (m = v.hidden)
                                : (v = K.access(e, "fxshow", {display: c})),
                            a && (v.hidden = !m),
                            m && he([e], !0),
                                u.done(function () {
                                    for (n in (m || he([e]), K.remove(e, "fxshow"), p))
                                        w.style(e, n, p[n]);
                                })),
                                (l = ut(m ? v[n] : 0, n, u)),
                            n in v ||
                            ((v[n] = l.start), m && ((l.end = l.start), (l.start = 0)));
                },
            ],
            prefilter: function (e, t) {
                t ? pt.prefilters.unshift(e) : pt.prefilters.push(e);
            },
        })),
            (w.speed = function (e, t, i) {
                var n =
                    e && "object" == typeof e
                        ? w.extend({}, e)
                        : {
                            complete: i || (!i && t) || (m(e) && e),
                            duration: e,
                            easing: (i && t) || (t && !m(t) && t),
                        };
                return (
                    w.fx.off
                        ? (n.duration = 0)
                        : "number" != typeof n.duration &&
                        (n.duration in w.fx.speeds
                            ? (n.duration = w.fx.speeds[n.duration])
                            : (n.duration = w.fx.speeds._default)),
                    (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
                        (n.old = n.complete),
                        (n.complete = function () {
                            m(n.old) && n.old.call(this), n.queue && w.dequeue(this, n.queue);
                        }),
                        n
                );
            }),
            w.fn.extend({
                fadeTo: function (e, t, i, n) {
                    return this.filter(oe)
                        .css("opacity", 0)
                        .show()
                        .end()
                        .animate({opacity: t}, e, i, n);
                },
                animate: function (e, t, i, n) {
                    var s = w.isEmptyObject(e),
                        a = w.speed(t, i, n),
                        r = function () {
                            var t = pt(this, w.extend({}, e), a);
                            (s || K.get(this, "finish")) && t.stop(!0);
                        };
                    return (
                        (r.finish = r),
                            s || !1 === a.queue ? this.each(r) : this.queue(a.queue, r)
                    );
                },
                stop: function (e, t, i) {
                    var n = function (e) {
                        var t = e.stop;
                        delete e.stop, t(i);
                    };
                    return (
                        "string" != typeof e && ((i = t), (t = e), (e = void 0)),
                        t && !1 !== e && this.queue(e || "fx", []),
                            this.each(function () {
                                var t = !0,
                                    s = null != e && e + "queueHooks",
                                    a = w.timers,
                                    r = K.get(this);
                                if (s) r[s] && r[s].stop && n(r[s]);
                                else for (s in r) r[s] && r[s].stop && lt.test(s) && n(r[s]);
                                for (s = a.length; s--;)
                                    a[s].elem !== this ||
                                    (null != e && a[s].queue !== e) ||
                                    (a[s].anim.stop(i), (t = !1), a.splice(s, 1));
                                (!t && i) || w.dequeue(this, e);
                            })
                    );
                },
                finish: function (e) {
                    return (
                        !1 !== e && (e = e || "fx"),
                            this.each(function () {
                                var t,
                                    i = K.get(this),
                                    n = i[e + "queue"],
                                    s = i[e + "queueHooks"],
                                    a = w.timers,
                                    r = n ? n.length : 0;
                                for (
                                    i.finish = !0,
                                        w.queue(this, e, []),
                                    s && s.stop && s.stop.call(this, !0),
                                        t = a.length;
                                    t--;
                                )
                                    a[t].elem === this &&
                                    a[t].queue === e &&
                                    (a[t].anim.stop(!0), a.splice(t, 1));
                                for (t = 0; t < r; t++)
                                    n[t] && n[t].finish && n[t].finish.call(this);
                                delete i.finish;
                            })
                    );
                },
            }),
            w.each(["toggle", "show", "hide"], function (e, t) {
                var i = w.fn[t];
                w.fn[t] = function (e, n, s) {
                    return null == e || "boolean" == typeof e
                        ? i.apply(this, arguments)
                        : this.animate(ht(t, !0), e, n, s);
                };
            }),
            w.each(
                {
                    slideDown: ht("show"),
                    slideUp: ht("hide"),
                    slideToggle: ht("toggle"),
                    fadeIn: {opacity: "show"},
                    fadeOut: {opacity: "hide"},
                    fadeToggle: {opacity: "toggle"},
                },
                function (e, t) {
                    w.fn[e] = function (e, i, n) {
                        return this.animate(t, e, i, n);
                    };
                }
            ),
            (w.timers = []),
            (w.fx.tick = function () {
                var e,
                    t = 0,
                    i = w.timers;
                for (nt = Date.now(); t < i.length; t++)
                    (e = i[t])() || i[t] !== e || i.splice(t--, 1);
                i.length || w.fx.stop(), (nt = void 0);
            }),
            (w.fx.timer = function (e) {
                w.timers.push(e), w.fx.start();
            }),
            (w.fx.interval = 13),
            (w.fx.start = function () {
                st || ((st = !0), ct());
            }),
            (w.fx.stop = function () {
                st = null;
            }),
            (w.fx.speeds = {slow: 600, fast: 200, _default: 400}),
            (w.fn.delay = function (t, i) {
                return (
                    (t = (w.fx && w.fx.speeds[t]) || t),
                        (i = i || "fx"),
                        this.queue(i, function (i, n) {
                            var s = e.setTimeout(i, t);
                            n.stop = function () {
                                e.clearTimeout(s);
                            };
                        })
                );
            }),
            (at = n.createElement("input")),
            (rt = n.createElement("select").appendChild(n.createElement("option"))),
            (at.type = "checkbox"),
            (f.checkOn = "" !== at.value),
            (f.optSelected = rt.selected),
            ((at = n.createElement("input")).value = "t"),
            (at.type = "radio"),
            (f.radioValue = "t" === at.value);
        var ft,
            mt = w.expr.attrHandle;
        w.fn.extend({
            attr: function (e, t) {
                return X(this, w.attr, e, t, 1 < arguments.length);
            },
            removeAttr: function (e) {
                return this.each(function () {
                    w.removeAttr(this, e);
                });
            },
        }),
            w.extend({
                attr: function (e, t, i) {
                    var n,
                        s,
                        a = e.nodeType;
                    if (3 !== a && 8 !== a && 2 !== a)
                        return void 0 === e.getAttribute
                            ? w.prop(e, t, i)
                            : ((1 === a && w.isXMLDoc(e)) ||
                            (s =
                                w.attrHooks[t.toLowerCase()] ||
                                (w.expr.match.bool.test(t) ? ft : void 0)),
                                void 0 !== i
                                    ? null === i
                                    ? void w.removeAttr(e, t)
                                    : s && "set" in s && void 0 !== (n = s.set(e, i, t))
                                        ? n
                                        : (e.setAttribute(t, i + ""), i)
                                    : s && "get" in s && null !== (n = s.get(e, t))
                                    ? n
                                    : null == (n = w.find.attr(e, t))
                                        ? void 0
                                        : n);
                },
                attrHooks: {
                    type: {
                        set: function (e, t) {
                            if (!f.radioValue && "radio" === t && k(e, "input")) {
                                var i = e.value;
                                return e.setAttribute("type", t), i && (e.value = i), t;
                            }
                        },
                    },
                },
                removeAttr: function (e, t) {
                    var i,
                        n = 0,
                        s = t && t.match(N);
                    if (s && 1 === e.nodeType)
                        for (; (i = s[n++]);) e.removeAttribute(i);
                },
            }),
            (ft = {
                set: function (e, t, i) {
                    return !1 === t ? w.removeAttr(e, i) : e.setAttribute(i, i), i;
                },
            }),
            w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var i = mt[t] || w.find.attr;
                mt[t] = function (e, t, n) {
                    var s,
                        a,
                        r = t.toLowerCase();
                    return (
                        n ||
                        ((a = mt[r]),
                            (mt[r] = s),
                            (s = null != i(e, t, n) ? r : null),
                            (mt[r] = a)),
                            s
                    );
                };
            });
        var vt = /^(?:input|select|textarea|button)$/i,
            gt = /^(?:a|area)$/i;

        function bt(e) {
            return (e.match(N) || []).join(" ");
        }

        function yt(e) {
            return (e.getAttribute && e.getAttribute("class")) || "";
        }

        function xt(e) {
            return Array.isArray(e) ? e : ("string" == typeof e && e.match(N)) || [];
        }

        w.fn.extend({
            prop: function (e, t) {
                return X(this, w.prop, e, t, 1 < arguments.length);
            },
            removeProp: function (e) {
                return this.each(function () {
                    delete this[w.propFix[e] || e];
                });
            },
        }),
            w.extend({
                prop: function (e, t, i) {
                    var n,
                        s,
                        a = e.nodeType;
                    if (3 !== a && 8 !== a && 2 !== a)
                        return (
                            (1 === a && w.isXMLDoc(e)) ||
                            ((t = w.propFix[t] || t), (s = w.propHooks[t])),
                                void 0 !== i
                                    ? s && "set" in s && void 0 !== (n = s.set(e, i, t))
                                    ? n
                                    : (e[t] = i)
                                    : s && "get" in s && null !== (n = s.get(e, t))
                                    ? n
                                    : e[t]
                        );
                },
                propHooks: {
                    tabIndex: {
                        get: function (e) {
                            var t = w.find.attr(e, "tabindex");
                            return t
                                ? parseInt(t, 10)
                                : vt.test(e.nodeName) || (gt.test(e.nodeName) && e.href)
                                    ? 0
                                    : -1;
                        },
                    },
                },
                propFix: {for: "htmlFor", class: "className"},
            }),
        f.optSelected ||
        (w.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null;
            },
            set: function (e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
            },
        }),
            w.each(
                [
                    "tabIndex",
                    "readOnly",
                    "maxLength",
                    "cellSpacing",
                    "cellPadding",
                    "rowSpan",
                    "colSpan",
                    "useMap",
                    "frameBorder",
                    "contentEditable",
                ],
                function () {
                    w.propFix[this.toLowerCase()] = this;
                }
            ),
            w.fn.extend({
                addClass: function (e) {
                    var t,
                        i,
                        n,
                        s,
                        a,
                        r,
                        o,
                        l = 0;
                    if (m(e))
                        return this.each(function (t) {
                            w(this).addClass(e.call(this, t, yt(this)));
                        });
                    if ((t = xt(e)).length)
                        for (; (i = this[l++]);)
                            if (((s = yt(i)), (n = 1 === i.nodeType && " " + bt(s) + " "))) {
                                for (r = 0; (a = t[r++]);)
                                    n.indexOf(" " + a + " ") < 0 && (n += a + " ");
                                s !== (o = bt(n)) && i.setAttribute("class", o);
                            }
                    return this;
                },
                removeClass: function (e) {
                    var t,
                        i,
                        n,
                        s,
                        a,
                        r,
                        o,
                        l = 0;
                    if (m(e))
                        return this.each(function (t) {
                            w(this).removeClass(e.call(this, t, yt(this)));
                        });
                    if (!arguments.length) return this.attr("class", "");
                    if ((t = xt(e)).length)
                        for (; (i = this[l++]);)
                            if (((s = yt(i)), (n = 1 === i.nodeType && " " + bt(s) + " "))) {
                                for (r = 0; (a = t[r++]);)
                                    for (; -1 < n.indexOf(" " + a + " ");)
                                        n = n.replace(" " + a + " ", " ");
                                s !== (o = bt(n)) && i.setAttribute("class", o);
                            }
                    return this;
                },
                toggleClass: function (e, t) {
                    var i = typeof e,
                        n = "string" === i || Array.isArray(e);
                    return "boolean" == typeof t && n
                        ? t
                            ? this.addClass(e)
                            : this.removeClass(e)
                        : m(e)
                            ? this.each(function (i) {
                                w(this).toggleClass(e.call(this, i, yt(this), t), t);
                            })
                            : this.each(function () {
                                var t, s, a, r;
                                if (n)
                                    for (s = 0, a = w(this), r = xt(e); (t = r[s++]);)
                                        a.hasClass(t) ? a.removeClass(t) : a.addClass(t);
                                else
                                    (void 0 !== e && "boolean" !== i) ||
                                    ((t = yt(this)) && K.set(this, "__className__", t),
                                    this.setAttribute &&
                                    this.setAttribute(
                                        "class",
                                        t || !1 === e ? "" : K.get(this, "__className__") || ""
                                    ));
                            });
                },
                hasClass: function (e) {
                    var t,
                        i,
                        n = 0;
                    for (t = " " + e + " "; (i = this[n++]);)
                        if (1 === i.nodeType && -1 < (" " + bt(yt(i)) + " ").indexOf(t))
                            return !0;
                    return !1;
                },
            });
        var wt = /\r/g;
        w.fn.extend({
            val: function (e) {
                var t,
                    i,
                    n,
                    s = this[0];
                return arguments.length
                    ? ((n = m(e)),
                        this.each(function (i) {
                            var s;
                            1 === this.nodeType &&
                            (null == (s = n ? e.call(this, i, w(this).val()) : e)
                                ? (s = "")
                                : "number" == typeof s
                                    ? (s += "")
                                    : Array.isArray(s) &&
                                    (s = w.map(s, function (e) {
                                        return null == e ? "" : e + "";
                                    })),
                            ((t =
                                w.valHooks[this.type] ||
                                w.valHooks[this.nodeName.toLowerCase()]) &&
                                "set" in t &&
                                void 0 !== t.set(this, s, "value")) ||
                            (this.value = s));
                        }))
                    : s
                        ? (t = w.valHooks[s.type] || w.valHooks[s.nodeName.toLowerCase()]) &&
                        "get" in t &&
                        void 0 !== (i = t.get(s, "value"))
                            ? i
                            : "string" == typeof (i = s.value)
                                ? i.replace(wt, "")
                                : null == i
                                    ? ""
                                    : i
                        : void 0;
            },
        }),
            w.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = w.find.attr(e, "value");
                            return null != t ? t : bt(w.text(e));
                        },
                    },
                    select: {
                        get: function (e) {
                            var t,
                                i,
                                n,
                                s = e.options,
                                a = e.selectedIndex,
                                r = "select-one" === e.type,
                                o = r ? null : [],
                                l = r ? a + 1 : s.length;
                            for (n = a < 0 ? l : r ? a : 0; n < l; n++)
                                if (
                                    ((i = s[n]).selected || n === a) &&
                                    !i.disabled &&
                                    (!i.parentNode.disabled || !k(i.parentNode, "optgroup"))
                                ) {
                                    if (((t = w(i).val()), r)) return t;
                                    o.push(t);
                                }
                            return o;
                        },
                        set: function (e, t) {
                            for (
                                var i, n, s = e.options, a = w.makeArray(t), r = s.length;
                                r--;
                            )
                                ((n = s[r]).selected =
                                    -1 < w.inArray(w.valHooks.option.get(n), a)) && (i = !0);
                            return i || (e.selectedIndex = -1), a;
                        },
                    },
                },
            }),
            w.each(["radio", "checkbox"], function () {
                (w.valHooks[this] = {
                    set: function (e, t) {
                        if (Array.isArray(t))
                            return (e.checked = -1 < w.inArray(w(e).val(), t));
                    },
                }),
                f.checkOn ||
                (w.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                });
            }),
            (f.focusin = "onfocusin" in e);
        var Tt = /^(?:focusinfocus|focusoutblur)$/,
            Ct = function (e) {
                e.stopPropagation();
            };
        w.extend(w.event, {
            trigger: function (t, i, s, a) {
                var r,
                    o,
                    l,
                    c,
                    d,
                    u,
                    p,
                    f,
                    g = [s || n],
                    b = h.call(t, "type") ? t.type : t,
                    y = h.call(t, "namespace") ? t.namespace.split(".") : [];
                if (
                    ((o = f = l = s = s || n),
                    3 !== s.nodeType &&
                    8 !== s.nodeType &&
                    !Tt.test(b + w.event.triggered) &&
                    (-1 < b.indexOf(".") &&
                    ((b = (y = b.split(".")).shift()), y.sort()),
                        (d = b.indexOf(":") < 0 && "on" + b),
                        ((t = t[w.expando]
                            ? t
                            : new w.Event(b, "object" == typeof t && t)).isTrigger = a
                            ? 2
                            : 3),
                        (t.namespace = y.join(".")),
                        (t.rnamespace = t.namespace
                            ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)")
                            : null),
                        (t.result = void 0),
                    t.target || (t.target = s),
                        (i = null == i ? [t] : w.makeArray(i, [t])),
                        (p = w.event.special[b] || {}),
                    a || !p.trigger || !1 !== p.trigger.apply(s, i)))
                ) {
                    if (!a && !p.noBubble && !v(s)) {
                        for (
                            c = p.delegateType || b, Tt.test(c + b) || (o = o.parentNode);
                            o;
                            o = o.parentNode
                        )
                            g.push(o), (l = o);
                        l === (s.ownerDocument || n) &&
                        g.push(l.defaultView || l.parentWindow || e);
                    }
                    for (r = 0; (o = g[r++]) && !t.isPropagationStopped();)
                        (f = o),
                            (t.type = 1 < r ? c : p.bindType || b),
                        (u = (K.get(o, "events") || {})[t.type] && K.get(o, "handle")) &&
                        u.apply(o, i),
                        (u = d && o[d]) &&
                        u.apply &&
                        _(o) &&
                        ((t.result = u.apply(o, i)),
                        !1 === t.result && t.preventDefault());
                    return (
                        (t.type = b),
                        a ||
                        t.isDefaultPrevented() ||
                        (p._default && !1 !== p._default.apply(g.pop(), i)) ||
                        !_(s) ||
                        (d &&
                            m(s[b]) &&
                            !v(s) &&
                            ((l = s[d]) && (s[d] = null),
                                (w.event.triggered = b),
                            t.isPropagationStopped() && f.addEventListener(b, Ct),
                                s[b](),
                            t.isPropagationStopped() && f.removeEventListener(b, Ct),
                                (w.event.triggered = void 0),
                            l && (s[d] = l))),
                            t.result
                    );
                }
            },
            simulate: function (e, t, i) {
                var n = w.extend(new w.Event(), i, {type: e, isSimulated: !0});
                w.event.trigger(n, null, t);
            },
        }),
            w.fn.extend({
                trigger: function (e, t) {
                    return this.each(function () {
                        w.event.trigger(e, t, this);
                    });
                },
                triggerHandler: function (e, t) {
                    var i = this[0];
                    if (i) return w.event.trigger(e, t, i, !0);
                },
            }),
        f.focusin ||
        w.each({focus: "focusin", blur: "focusout"}, function (e, t) {
            var i = function (e) {
                w.event.simulate(t, e.target, w.event.fix(e));
            };
            w.event.special[t] = {
                setup: function () {
                    var n = this.ownerDocument || this,
                        s = K.access(n, t);
                    s || n.addEventListener(e, i, !0), K.access(n, t, (s || 0) + 1);
                },
                teardown: function () {
                    var n = this.ownerDocument || this,
                        s = K.access(n, t) - 1;
                    s
                        ? K.access(n, t, s)
                        : (n.removeEventListener(e, i, !0), K.remove(n, t));
                },
            };
        });
        var St = e.location,
            Et = Date.now(),
            Pt = /\?/;
        w.parseXML = function (t) {
            var i;
            if (!t || "string" != typeof t) return null;
            try {
                i = new e.DOMParser().parseFromString(t, "text/xml");
            } catch (t) {
                i = void 0;
            }
            return (
                (i && !i.getElementsByTagName("parsererror").length) ||
                w.error("Invalid XML: " + t),
                    i
            );
        };
        var Mt = /\[\]$/,
            kt = /\r?\n/g,
            $t = /^(?:submit|button|image|reset|file)$/i,
            Lt = /^(?:input|select|textarea|keygen)/i;

        function At(e, t, i, n) {
            var s;
            if (Array.isArray(t))
                w.each(t, function (t, s) {
                    i || Mt.test(e)
                        ? n(e, s)
                        : At(
                        e + "[" + ("object" == typeof s && null != s ? t : "") + "]",
                        s,
                        i,
                        n
                        );
                });
            else if (i || "object" !== y(t)) n(e, t);
            else for (s in t) At(e + "[" + s + "]", t[s], i, n);
        }

        (w.param = function (e, t) {
            var i,
                n = [],
                s = function (e, t) {
                    var i = m(t) ? t() : t;
                    n[n.length] =
                        encodeURIComponent(e) +
                        "=" +
                        encodeURIComponent(null == i ? "" : i);
                };
            if (null == e) return "";
            if (Array.isArray(e) || (e.jquery && !w.isPlainObject(e)))
                w.each(e, function () {
                    s(this.name, this.value);
                });
            else for (i in e) At(i, e[i], t, s);
            return n.join("&");
        }),
            w.fn.extend({
                serialize: function () {
                    return w.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var e = w.prop(this, "elements");
                        return e ? w.makeArray(e) : this;
                    })
                        .filter(function () {
                            var e = this.type;
                            return (
                                this.name &&
                                !w(this).is(":disabled") &&
                                Lt.test(this.nodeName) &&
                                !$t.test(e) &&
                                (this.checked || !ue.test(e))
                            );
                        })
                        .map(function (e, t) {
                            var i = w(this).val();
                            return null == i
                                ? null
                                : Array.isArray(i)
                                    ? w.map(i, function (e) {
                                        return {name: t.name, value: e.replace(kt, "\r\n")};
                                    })
                                    : {name: t.name, value: i.replace(kt, "\r\n")};
                        })
                        .get();
                },
            });
        var zt = /%20/g,
            Dt = /#.*$/,
            It = /([?&])_=[^&]*/,
            Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Nt = /^(?:GET|HEAD)$/,
            Ht = /^\/\//,
            jt = {},
            qt = {},
            Rt = "*/".concat("*"),
            Ft = n.createElement("a");

        function Bt(e) {
            return function (t, i) {
                "string" != typeof t && ((i = t), (t = "*"));
                var n,
                    s = 0,
                    a = t.toLowerCase().match(N) || [];
                if (m(i))
                    for (; (n = a[s++]);)
                        "+" === n[0]
                            ? ((n = n.slice(1) || "*"), (e[n] = e[n] || []).unshift(i))
                            : (e[n] = e[n] || []).push(i);
            };
        }

        function Xt(e, t, i, n) {
            var s = {},
                a = e === qt;

            function r(o) {
                var l;
                return (
                    (s[o] = !0),
                        w.each(e[o] || [], function (e, o) {
                            var c = o(t, i, n);
                            return "string" != typeof c || a || s[c]
                                ? a
                                    ? !(l = c)
                                    : void 0
                                : (t.dataTypes.unshift(c), r(c), !1);
                        }),
                        l
                );
            }

            return r(t.dataTypes[0]) || (!s["*"] && r("*"));
        }

        function Wt(e, t) {
            var i,
                n,
                s = w.ajaxSettings.flatOptions || {};
            for (i in t) void 0 !== t[i] && ((s[i] ? e : n || (n = {}))[i] = t[i]);
            return n && w.extend(!0, e, n), e;
        }

        (Ft.href = St.href),
            w.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: St.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                        St.protocol
                    ),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Rt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript",
                    },
                    contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON",
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": w.parseXML,
                    },
                    flatOptions: {url: !0, context: !0},
                },
                ajaxSetup: function (e, t) {
                    return t ? Wt(Wt(e, w.ajaxSettings), t) : Wt(w.ajaxSettings, e);
                },
                ajaxPrefilter: Bt(jt),
                ajaxTransport: Bt(qt),
                ajax: function (t, i) {
                    "object" == typeof t && ((i = t), (t = void 0)), (i = i || {});
                    var s,
                        a,
                        r,
                        o,
                        l,
                        c,
                        d,
                        h,
                        u,
                        p,
                        f = w.ajaxSetup({}, i),
                        m = f.context || f,
                        v = f.context && (m.nodeType || m.jquery) ? w(m) : w.event,
                        g = w.Deferred(),
                        b = w.Callbacks("once memory"),
                        y = f.statusCode || {},
                        x = {},
                        T = {},
                        C = "canceled",
                        S = {
                            readyState: 0,
                            getResponseHeader: function (e) {
                                var t;
                                if (d) {
                                    if (!o)
                                        for (o = {}; (t = Ot.exec(r));)
                                            o[t[1].toLowerCase() + " "] = (
                                                o[t[1].toLowerCase() + " "] || []
                                            ).concat(t[2]);
                                    t = o[e.toLowerCase() + " "];
                                }
                                return null == t ? null : t.join(", ");
                            },
                            getAllResponseHeaders: function () {
                                return d ? r : null;
                            },
                            setRequestHeader: function (e, t) {
                                return (
                                    null == d &&
                                    ((e = T[e.toLowerCase()] = T[e.toLowerCase()] || e),
                                        (x[e] = t)),
                                        this
                                );
                            },
                            overrideMimeType: function (e) {
                                return null == d && (f.mimeType = e), this;
                            },
                            statusCode: function (e) {
                                var t;
                                if (e)
                                    if (d) S.always(e[S.status]);
                                    else for (t in e) y[t] = [y[t], e[t]];
                                return this;
                            },
                            abort: function (e) {
                                var t = e || C;
                                return s && s.abort(t), E(0, t), this;
                            },
                        };
                    if (
                        (g.promise(S),
                            (f.url = ((t || f.url || St.href) + "").replace(
                                Ht,
                                St.protocol + "//"
                            )),
                            (f.type = i.method || i.type || f.method || f.type),
                            (f.dataTypes = (f.dataType || "*").toLowerCase().match(N) || [""]),
                        null == f.crossDomain)
                    ) {
                        c = n.createElement("a");
                        try {
                            (c.href = f.url),
                                (c.href = c.href),
                                (f.crossDomain =
                                    Ft.protocol + "//" + Ft.host != c.protocol + "//" + c.host);
                        } catch (t) {
                            f.crossDomain = !0;
                        }
                    }
                    if (
                        (f.data &&
                        f.processData &&
                        "string" != typeof f.data &&
                        (f.data = w.param(f.data, f.traditional)),
                            Xt(jt, f, i, S),
                            d)
                    )
                        return S;
                    for (u in ((h = w.event && f.global) &&
                    0 == w.active++ &&
                    w.event.trigger("ajaxStart"),
                        (f.type = f.type.toUpperCase()),
                        (f.hasContent = !Nt.test(f.type)),
                        (a = f.url.replace(Dt, "")),
                        f.hasContent
                            ? f.data &&
                            f.processData &&
                            0 ===
                            (f.contentType || "").indexOf(
                                "application/x-www-form-urlencoded"
                            ) &&
                            (f.data = f.data.replace(zt, "+"))
                            : ((p = f.url.slice(a.length)),
                            f.data &&
                            (f.processData || "string" == typeof f.data) &&
                            ((a += (Pt.test(a) ? "&" : "?") + f.data), delete f.data),
                            !1 === f.cache &&
                            ((a = a.replace(It, "$1")),
                                (p = (Pt.test(a) ? "&" : "?") + "_=" + Et++ + p)),
                                (f.url = a + p)),
                    f.ifModified &&
                    (w.lastModified[a] &&
                    S.setRequestHeader("If-Modified-Since", w.lastModified[a]),
                    w.etag[a] && S.setRequestHeader("If-None-Match", w.etag[a])),
                    ((f.data && f.hasContent && !1 !== f.contentType) || i.contentType) &&
                    S.setRequestHeader("Content-Type", f.contentType),
                        S.setRequestHeader(
                            "Accept",
                            f.dataTypes[0] && f.accepts[f.dataTypes[0]]
                                ? f.accepts[f.dataTypes[0]] +
                                ("*" !== f.dataTypes[0] ? ", " + Rt + "; q=0.01" : "")
                                : f.accepts["*"]
                        ),
                        f.headers))
                        S.setRequestHeader(u, f.headers[u]);
                    if (f.beforeSend && (!1 === f.beforeSend.call(m, S, f) || d))
                        return S.abort();
                    if (
                        ((C = "abort"),
                            b.add(f.complete),
                            S.done(f.success),
                            S.fail(f.error),
                            (s = Xt(qt, f, i, S)))
                    ) {
                        if (((S.readyState = 1), h && v.trigger("ajaxSend", [S, f]), d))
                            return S;
                        f.async &&
                        0 < f.timeout &&
                        (l = e.setTimeout(function () {
                            S.abort("timeout");
                        }, f.timeout));
                        try {
                            (d = !1), s.send(x, E);
                        } catch (t) {
                            if (d) throw t;
                            E(-1, t);
                        }
                    } else E(-1, "No Transport");

                    function E(t, i, n, o) {
                        var c,
                            u,
                            p,
                            x,
                            T,
                            C = i;
                        d ||
                        ((d = !0),
                        l && e.clearTimeout(l),
                            (s = void 0),
                            (r = o || ""),
                            (S.readyState = 0 < t ? 4 : 0),
                            (c = (200 <= t && t < 300) || 304 === t),
                        n &&
                        (x = (function (e, t, i) {
                            for (
                                var n, s, a, r, o = e.contents, l = e.dataTypes;
                                "*" === l[0];
                            )
                                l.shift(),
                                void 0 === n &&
                                (n = e.mimeType || t.getResponseHeader("Content-Type"));
                            if (n)
                                for (s in o)
                                    if (o[s] && o[s].test(n)) {
                                        l.unshift(s);
                                        break;
                                    }
                            if (l[0] in i) a = l[0];
                            else {
                                for (s in i) {
                                    if (!l[0] || e.converters[s + " " + l[0]]) {
                                        a = s;
                                        break;
                                    }
                                    r || (r = s);
                                }
                                a = a || r;
                            }
                            if (a) return a !== l[0] && l.unshift(a), i[a];
                        })(f, S, n)),
                            (x = (function (e, t, i, n) {
                                var s,
                                    a,
                                    r,
                                    o,
                                    l,
                                    c = {},
                                    d = e.dataTypes.slice();
                                if (d[1])
                                    for (r in e.converters) c[r.toLowerCase()] = e.converters[r];
                                for (a = d.shift(); a;)
                                    if (
                                        (e.responseFields[a] && (i[e.responseFields[a]] = t),
                                        !l &&
                                        n &&
                                        e.dataFilter &&
                                        (t = e.dataFilter(t, e.dataType)),
                                            (l = a),
                                            (a = d.shift()))
                                    )
                                        if ("*" === a) a = l;
                                        else if ("*" !== l && l !== a) {
                                            if (!(r = c[l + " " + a] || c["* " + a]))
                                                for (s in c)
                                                    if (
                                                        (o = s.split(" "))[1] === a &&
                                                        (r = c[l + " " + o[0]] || c["* " + o[0]])
                                                    ) {
                                                        !0 === r
                                                            ? (r = c[s])
                                                            : !0 !== c[s] && ((a = o[0]), d.unshift(o[1]));
                                                        break;
                                                    }
                                            if (!0 !== r)
                                                if (r && e.throws) t = r(t);
                                                else
                                                    try {
                                                        t = r(t);
                                                    } catch (e) {
                                                        return {
                                                            state: "parsererror",
                                                            error: r
                                                                ? e
                                                                : "No conversion from " + l + " to " + a,
                                                        };
                                                    }
                                        }
                                return {state: "success", data: t};
                            })(f, x, S, c)),
                            c
                                ? (f.ifModified &&
                                ((T = S.getResponseHeader("Last-Modified")) &&
                                (w.lastModified[a] = T),
                                (T = S.getResponseHeader("etag")) && (w.etag[a] = T)),
                                    204 === t || "HEAD" === f.type
                                        ? (C = "nocontent")
                                        : 304 === t
                                        ? (C = "notmodified")
                                        : ((C = x.state), (u = x.data), (c = !(p = x.error))))
                                : ((p = C), (!t && C) || ((C = "error"), t < 0 && (t = 0))),
                            (S.status = t),
                            (S.statusText = (i || C) + ""),
                            c ? g.resolveWith(m, [u, C, S]) : g.rejectWith(m, [S, C, p]),
                            S.statusCode(y),
                            (y = void 0),
                        h &&
                        v.trigger(c ? "ajaxSuccess" : "ajaxError", [S, f, c ? u : p]),
                            b.fireWith(m, [S, C]),
                        h &&
                        (v.trigger("ajaxComplete", [S, f]),
                        --w.active || w.event.trigger("ajaxStop")));
                    }

                    return S;
                },
                getJSON: function (e, t, i) {
                    return w.get(e, t, i, "json");
                },
                getScript: function (e, t) {
                    return w.get(e, void 0, t, "script");
                },
            }),
            w.each(["get", "post"], function (e, t) {
                w[t] = function (e, i, n, s) {
                    return (
                        m(i) && ((s = s || n), (n = i), (i = void 0)),
                            w.ajax(
                                w.extend(
                                    {url: e, type: t, dataType: s, data: i, success: n},
                                    w.isPlainObject(e) && e
                                )
                            )
                    );
                };
            }),
            (w._evalUrl = function (e, t) {
                return w.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function () {
                        }
                    },
                    dataFilter: function (e) {
                        w.globalEval(e, t);
                    },
                });
            }),
            w.fn.extend({
                wrapAll: function (e) {
                    var t;
                    return (
                        this[0] &&
                        (m(e) && (e = e.call(this[0])),
                            (t = w(e, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && t.insertBefore(this[0]),
                            t
                                .map(function () {
                                    for (var e = this; e.firstElementChild;)
                                        e = e.firstElementChild;
                                    return e;
                                })
                                .append(this)),
                            this
                    );
                },
                wrapInner: function (e) {
                    return m(e)
                        ? this.each(function (t) {
                            w(this).wrapInner(e.call(this, t));
                        })
                        : this.each(function () {
                            var t = w(this),
                                i = t.contents();
                            i.length ? i.wrapAll(e) : t.append(e);
                        });
                },
                wrap: function (e) {
                    var t = m(e);
                    return this.each(function (i) {
                        w(this).wrapAll(t ? e.call(this, i) : e);
                    });
                },
                unwrap: function (e) {
                    return (
                        this.parent(e)
                            .not("body")
                            .each(function () {
                                w(this).replaceWith(this.childNodes);
                            }),
                            this
                    );
                },
            }),
            (w.expr.pseudos.hidden = function (e) {
                return !w.expr.pseudos.visible(e);
            }),
            (w.expr.pseudos.visible = function (e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }),
            (w.ajaxSettings.xhr = function () {
                try {
                    return new e.XMLHttpRequest();
                } catch (e) {
                }
            });
        var Yt = {0: 200, 1223: 204},
            Vt = w.ajaxSettings.xhr();
        (f.cors = !!Vt && "withCredentials" in Vt),
            (f.ajax = Vt = !!Vt),
            w.ajaxTransport(function (t) {
                var i, n;
                if (f.cors || (Vt && !t.crossDomain))
                    return {
                        send: function (s, a) {
                            var r,
                                o = t.xhr();
                            if (
                                (o.open(t.type, t.url, t.async, t.username, t.password),
                                    t.xhrFields)
                            )
                                for (r in t.xhrFields) o[r] = t.xhrFields[r];
                            for (r in (t.mimeType &&
                            o.overrideMimeType &&
                            o.overrideMimeType(t.mimeType),
                            t.crossDomain ||
                            s["X-Requested-With"] ||
                            (s["X-Requested-With"] = "XMLHttpRequest"),
                                s))
                                o.setRequestHeader(r, s[r]);
                            (i = function (e) {
                                return function () {
                                    i &&
                                    ((i = n = o.onload = o.onerror = o.onabort = o.ontimeout = o.onreadystatechange = null),
                                        "abort" === e
                                            ? o.abort()
                                            : "error" === e
                                            ? "number" != typeof o.status
                                                ? a(0, "error")
                                                : a(o.status, o.statusText)
                                            : a(
                                                Yt[o.status] || o.status,
                                                o.statusText,
                                                "text" !== (o.responseType || "text") ||
                                                "string" != typeof o.responseText
                                                    ? {binary: o.response}
                                                    : {text: o.responseText},
                                                o.getAllResponseHeaders()
                                            ));
                                };
                            }),
                                (o.onload = i()),
                                (n = o.onerror = o.ontimeout = i("error")),
                                void 0 !== o.onabort
                                    ? (o.onabort = n)
                                    : (o.onreadystatechange = function () {
                                        4 === o.readyState &&
                                        e.setTimeout(function () {
                                            i && n();
                                        });
                                    }),
                                (i = i("abort"));
                            try {
                                o.send((t.hasContent && t.data) || null);
                            } catch (s) {
                                if (i) throw s;
                            }
                        },
                        abort: function () {
                            i && i();
                        },
                    };
            }),
            w.ajaxPrefilter(function (e) {
                e.crossDomain && (e.contents.script = !1);
            }),
            w.ajaxSetup({
                accepts: {
                    script:
                        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
                },
                contents: {script: /\b(?:java|ecma)script\b/},
                converters: {
                    "text script": function (e) {
                        return w.globalEval(e), e;
                    },
                },
            }),
            w.ajaxPrefilter("script", function (e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            }),
            w.ajaxTransport("script", function (e) {
                var t, i;
                if (e.crossDomain || e.scriptAttrs)
                    return {
                        send: function (s, a) {
                            (t = w("<script>")
                                .attr(e.scriptAttrs || {})
                                .prop({charset: e.scriptCharset, src: e.url})
                                .on(
                                    "load error",
                                    (i = function (e) {
                                        t.remove(),
                                            (i = null),
                                        e && a("error" === e.type ? 404 : 200, e.type);
                                    })
                                )),
                                n.head.appendChild(t[0]);
                        },
                        abort: function () {
                            i && i();
                        },
                    };
            });
        var Gt,
            _t = [],
            Ut = /(=)\?(?=&|$)|\?\?/;
        w.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var e = _t.pop() || w.expando + "_" + Et++;
                return (this[e] = !0), e;
            },
        }),
            w.ajaxPrefilter("json jsonp", function (t, i, n) {
                var s,
                    a,
                    r,
                    o =
                        !1 !== t.jsonp &&
                        (Ut.test(t.url)
                            ? "url"
                            : "string" == typeof t.data &&
                            0 ===
                            (t.contentType || "").indexOf(
                                "application/x-www-form-urlencoded"
                            ) &&
                            Ut.test(t.data) &&
                            "data");
                if (o || "jsonp" === t.dataTypes[0])
                    return (
                        (s = t.jsonpCallback = m(t.jsonpCallback)
                            ? t.jsonpCallback()
                            : t.jsonpCallback),
                            o
                                ? (t[o] = t[o].replace(Ut, "$1" + s))
                                : !1 !== t.jsonp &&
                                (t.url += (Pt.test(t.url) ? "&" : "?") + t.jsonp + "=" + s),
                            (t.converters["script json"] = function () {
                                return r || w.error(s + " was not called"), r[0];
                            }),
                            (t.dataTypes[0] = "json"),
                            (a = e[s]),
                            (e[s] = function () {
                                r = arguments;
                            }),
                            n.always(function () {
                                void 0 === a ? w(e).removeProp(s) : (e[s] = a),
                                t[s] && ((t.jsonpCallback = i.jsonpCallback), _t.push(s)),
                                r && m(a) && a(r[0]),
                                    (r = a = void 0);
                            }),
                            "script"
                    );
            }),
            (f.createHTMLDocument =
                (((Gt = n.implementation.createHTMLDocument("").body).innerHTML =
                    "<form></form><form></form>"),
                2 === Gt.childNodes.length)),
            (w.parseHTML = function (e, t, i) {
                return "string" != typeof e
                    ? []
                    : ("boolean" == typeof t && ((i = t), (t = !1)),
                    t ||
                    (f.createHTMLDocument
                        ? (((s = (t = n.implementation.createHTMLDocument(
                            ""
                        )).createElement("base")).href = n.location.href),
                            t.head.appendChild(s))
                        : (t = n)),
                        (r = !i && []),
                        (a = $.exec(e))
                            ? [t.createElement(a[1])]
                            : ((a = we([e], t, r)),
                            r && r.length && w(r).remove(),
                                w.merge([], a.childNodes)));
                var s, a, r;
            }),
            (w.fn.load = function (e, t, i) {
                var n,
                    s,
                    a,
                    r = this,
                    o = e.indexOf(" ");
                return (
                    -1 < o && ((n = bt(e.slice(o))), (e = e.slice(0, o))),
                        m(t)
                            ? ((i = t), (t = void 0))
                            : t && "object" == typeof t && (s = "POST"),
                    0 < r.length &&
                    w
                        .ajax({url: e, type: s || "GET", dataType: "html", data: t})
                        .done(function (e) {
                            (a = arguments),
                                r.html(n ? w("<div>").append(w.parseHTML(e)).find(n) : e);
                        })
                        .always(
                            i &&
                            function (e, t) {
                                r.each(function () {
                                    i.apply(this, a || [e.responseText, t, e]);
                                });
                            }
                        ),
                        this
                );
            }),
            w.each(
                [
                    "ajaxStart",
                    "ajaxStop",
                    "ajaxComplete",
                    "ajaxError",
                    "ajaxSuccess",
                    "ajaxSend",
                ],
                function (e, t) {
                    w.fn[t] = function (e) {
                        return this.on(t, e);
                    };
                }
            ),
            (w.expr.pseudos.animated = function (e) {
                return w.grep(w.timers, function (t) {
                    return e === t.elem;
                }).length;
            }),
            (w.offset = {
                setOffset: function (e, t, i) {
                    var n,
                        s,
                        a,
                        r,
                        o,
                        l,
                        c = w.css(e, "position"),
                        d = w(e),
                        h = {};
                    "static" === c && (e.style.position = "relative"),
                        (o = d.offset()),
                        (a = w.css(e, "top")),
                        (l = w.css(e, "left")),
                        ("absolute" === c || "fixed" === c) && -1 < (a + l).indexOf("auto")
                            ? ((r = (n = d.position()).top), (s = n.left))
                            : ((r = parseFloat(a) || 0), (s = parseFloat(l) || 0)),
                    m(t) && (t = t.call(e, i, w.extend({}, o))),
                    null != t.top && (h.top = t.top - o.top + r),
                    null != t.left && (h.left = t.left - o.left + s),
                        "using" in t ? t.using.call(e, h) : d.css(h);
                },
            }),
            w.fn.extend({
                offset: function (e) {
                    if (arguments.length)
                        return void 0 === e
                            ? this
                            : this.each(function (t) {
                                w.offset.setOffset(this, e, t);
                            });
                    var t,
                        i,
                        n = this[0];
                    return n
                        ? n.getClientRects().length
                            ? ((t = n.getBoundingClientRect()),
                                (i = n.ownerDocument.defaultView),
                                {top: t.top + i.pageYOffset, left: t.left + i.pageXOffset})
                            : {top: 0, left: 0}
                        : void 0;
                },
                position: function () {
                    if (this[0]) {
                        var e,
                            t,
                            i,
                            n = this[0],
                            s = {top: 0, left: 0};
                        if ("fixed" === w.css(n, "position")) t = n.getBoundingClientRect();
                        else {
                            for (
                                t = this.offset(),
                                    i = n.ownerDocument,
                                    e = n.offsetParent || i.documentElement;
                                e &&
                                (e === i.body || e === i.documentElement) &&
                                "static" === w.css(e, "position");
                            )
                                e = e.parentNode;
                            e &&
                            e !== n &&
                            1 === e.nodeType &&
                            (((s = w(e).offset()).top += w.css(e, "borderTopWidth", !0)),
                                (s.left += w.css(e, "borderLeftWidth", !0)));
                        }
                        return {
                            top: t.top - s.top - w.css(n, "marginTop", !0),
                            left: t.left - s.left - w.css(n, "marginLeft", !0),
                        };
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (
                            var e = this.offsetParent;
                            e && "static" === w.css(e, "position");
                        )
                            e = e.offsetParent;
                        return e || se;
                    });
                },
            }),
            w.each(
                {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"},
                function (e, t) {
                    var i = "pageYOffset" === t;
                    w.fn[e] = function (n) {
                        return X(
                            this,
                            function (e, n, s) {
                                var a;
                                if (
                                    (v(e) ? (a = e) : 9 === e.nodeType && (a = e.defaultView),
                                    void 0 === s)
                                )
                                    return a ? a[t] : e[n];
                                a
                                    ? a.scrollTo(i ? a.pageXOffset : s, i ? s : a.pageYOffset)
                                    : (e[n] = s);
                            },
                            e,
                            n,
                            arguments.length
                        );
                    };
                }
            ),
            w.each(["top", "left"], function (e, t) {
                w.cssHooks[t] = We(f.pixelPosition, function (e, i) {
                    if (i)
                        return (i = Xe(e, t)), Re.test(i) ? w(e).position()[t] + "px" : i;
                });
            }),
            w.each({Height: "height", Width: "width"}, function (e, t) {
                w.each(
                    {padding: "inner" + e, content: t, "": "outer" + e},
                    function (i, n) {
                        w.fn[n] = function (s, a) {
                            var r = arguments.length && (i || "boolean" != typeof s),
                                o = i || (!0 === s || !0 === a ? "margin" : "border");
                            return X(
                                this,
                                function (t, i, s) {
                                    var a;
                                    return v(t)
                                        ? 0 === n.indexOf("outer")
                                            ? t["inner" + e]
                                            : t.document.documentElement["client" + e]
                                        : 9 === t.nodeType
                                            ? ((a = t.documentElement),
                                                Math.max(
                                                    t.body["scroll" + e],
                                                    a["scroll" + e],
                                                    t.body["offset" + e],
                                                    a["offset" + e],
                                                    a["client" + e]
                                                ))
                                            : void 0 === s
                                                ? w.css(t, i, o)
                                                : w.style(t, i, s, o);
                                },
                                t,
                                r ? s : void 0,
                                r
                            );
                        };
                    }
                );
            }),
            w.each(
                "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                    " "
                ),
                function (e, t) {
                    w.fn[t] = function (e, i) {
                        return 0 < arguments.length
                            ? this.on(t, null, e, i)
                            : this.trigger(t);
                    };
                }
            ),
            w.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                },
            }),
            w.fn.extend({
                bind: function (e, t, i) {
                    return this.on(e, null, t, i);
                },
                unbind: function (e, t) {
                    return this.off(e, null, t);
                },
                delegate: function (e, t, i, n) {
                    return this.on(t, e, i, n);
                },
                undelegate: function (e, t, i) {
                    return 1 === arguments.length
                        ? this.off(e, "**")
                        : this.off(t, e || "**", i);
                },
            }),
            (w.proxy = function (e, t) {
                var i, n, s;
                if (("string" == typeof t && ((i = e[t]), (t = e), (e = i)), m(e)))
                    return (
                        (n = a.call(arguments, 2)),
                            ((s = function () {
                                return e.apply(t || this, n.concat(a.call(arguments)));
                            }).guid = e.guid = e.guid || w.guid++),
                            s
                    );
            }),
            (w.holdReady = function (e) {
                e ? w.readyWait++ : w.ready(!0);
            }),
            (w.isArray = Array.isArray),
            (w.parseJSON = JSON.parse),
            (w.nodeName = k),
            (w.isFunction = m),
            (w.isWindow = v),
            (w.camelCase = G),
            (w.type = y),
            (w.now = Date.now),
            (w.isNumeric = function (e) {
                var t = w.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
            }),
        "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
            return w;
        });
        var Kt = e.jQuery,
            Zt = e.$;
        return (
            (w.noConflict = function (t) {
                return (
                    e.$ === w && (e.$ = Zt), t && e.jQuery === w && (e.jQuery = Kt), w
                );
            }),
            t || (e.jQuery = e.$ = w),
                w
        );
    }),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = t())
            : "function" == typeof define && define.amd
            ? define(t)
            : ((e = e || self).Swiper = t());
    })(this, function () {
        "use strict";
        var e =
                "undefined" == typeof document
                    ? {
                        body: {},
                        addEventListener: function () {
                        },
                        removeEventListener: function () {
                        },
                        activeElement: {
                            blur: function () {
                            }, nodeName: ""
                        },
                        querySelector: function () {
                            return null;
                        },
                        querySelectorAll: function () {
                            return [];
                        },
                        getElementById: function () {
                            return null;
                        },
                        createEvent: function () {
                            return {
                                initEvent: function () {
                                }
                            };
                        },
                        createElement: function () {
                            return {
                                children: [],
                                childNodes: [],
                                style: {},
                                setAttribute: function () {
                                },
                                getElementsByTagName: function () {
                                    return [];
                                },
                            };
                        },
                        location: {hash: ""},
                    }
                    : document,
            t =
                "undefined" == typeof window
                    ? {
                        document: e,
                        navigator: {userAgent: ""},
                        location: {},
                        history: {},
                        CustomEvent: function () {
                            return this;
                        },
                        addEventListener: function () {
                        },
                        removeEventListener: function () {
                        },
                        getComputedStyle: function () {
                            return {
                                getPropertyValue: function () {
                                    return "";
                                },
                            };
                        },
                        Image: function () {
                        },
                        Date: function () {
                        },
                        screen: {},
                        setTimeout: function () {
                        },
                        clearTimeout: function () {
                        },
                    }
                    : window,
            i = function (e) {
                for (var t = 0; t < e.length; t += 1) this[t] = e[t];
                return (this.length = e.length), this;
            };

        function n(n, s) {
            var a = [],
                r = 0;
            if (n && !s && n instanceof i) return n;
            if (n)
                if ("string" == typeof n) {
                    var o,
                        l,
                        c = n.trim();
                    if (c.indexOf("<") >= 0 && c.indexOf(">") >= 0) {
                        var d = "div";
                        for (
                            0 === c.indexOf("<li") && (d = "ul"),
                            0 === c.indexOf("<tr") && (d = "tbody"),
                            (0 !== c.indexOf("<td") && 0 !== c.indexOf("<th")) ||
                            (d = "tr"),
                            0 === c.indexOf("<tbody") && (d = "table"),
                            0 === c.indexOf("<option") && (d = "select"),
                                (l = e.createElement(d)).innerHTML = c,
                                r = 0;
                            r < l.childNodes.length;
                            r += 1
                        )
                            a.push(l.childNodes[r]);
                    } else
                        for (
                            o =
                                s || "#" !== n[0] || n.match(/[ .<>:~]/)
                                    ? (s || e).querySelectorAll(n.trim())
                                    : [e.getElementById(n.trim().split("#")[1])],
                                r = 0;
                            r < o.length;
                            r += 1
                        )
                            o[r] && a.push(o[r]);
                } else if (n.nodeType || n === t || n === e) a.push(n);
                else if (n.length > 0 && n[0].nodeType)
                    for (r = 0; r < n.length; r += 1) a.push(n[r]);
            return new i(a);
        }

        function s(e) {
            for (var t = [], i = 0; i < e.length; i += 1)
                -1 === t.indexOf(e[i]) && t.push(e[i]);
            return t;
        }

        (n.fn = i.prototype), (n.Class = i), (n.Dom7 = i);
        var a = {
            addClass: function (e) {
                if (void 0 === e) return this;
                for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                    for (var n = 0; n < this.length; n += 1)
                        void 0 !== this[n] &&
                        void 0 !== this[n].classList &&
                        this[n].classList.add(t[i]);
                return this;
            },
            removeClass: function (e) {
                for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                    for (var n = 0; n < this.length; n += 1)
                        void 0 !== this[n] &&
                        void 0 !== this[n].classList &&
                        this[n].classList.remove(t[i]);
                return this;
            },
            hasClass: function (e) {
                return !!this[0] && this[0].classList.contains(e);
            },
            toggleClass: function (e) {
                for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                    for (var n = 0; n < this.length; n += 1)
                        void 0 !== this[n] &&
                        void 0 !== this[n].classList &&
                        this[n].classList.toggle(t[i]);
                return this;
            },
            attr: function (e, t) {
                var i = arguments;
                if (1 === arguments.length && "string" == typeof e)
                    return this[0] ? this[0].getAttribute(e) : void 0;
                for (var n = 0; n < this.length; n += 1)
                    if (2 === i.length) this[n].setAttribute(e, t);
                    else
                        for (var s in e) (this[n][s] = e[s]), this[n].setAttribute(s, e[s]);
                return this;
            },
            removeAttr: function (e) {
                for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
                return this;
            },
            data: function (e, t) {
                var i;
                if (void 0 !== t) {
                    for (var n = 0; n < this.length; n += 1)
                        (i = this[n]).dom7ElementDataStorage ||
                        (i.dom7ElementDataStorage = {}),
                            (i.dom7ElementDataStorage[e] = t);
                    return this;
                }
                if ((i = this[0]))
                    return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage
                        ? i.dom7ElementDataStorage[e]
                        : i.getAttribute("data-" + e) || void 0;
            },
            transform: function (e) {
                for (var t = 0; t < this.length; t += 1) {
                    var i = this[t].style;
                    (i.webkitTransform = e), (i.transform = e);
                }
                return this;
            },
            transition: function (e) {
                "string" != typeof e && (e += "ms");
                for (var t = 0; t < this.length; t += 1) {
                    var i = this[t].style;
                    (i.webkitTransitionDuration = e), (i.transitionDuration = e);
                }
                return this;
            },
            on: function () {
                for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
                var s = t[0],
                    a = t[1],
                    r = t[2],
                    o = t[3];

                function l(e) {
                    var t = e.target;
                    if (t) {
                        var i = e.target.dom7EventData || [];
                        if ((i.indexOf(e) < 0 && i.unshift(e), n(t).is(a))) r.apply(t, i);
                        else
                            for (var s = n(t).parents(), o = 0; o < s.length; o += 1)
                                n(s[o]).is(a) && r.apply(s[o], i);
                    }
                }

                function c(e) {
                    var t = (e && e.target && e.target.dom7EventData) || [];
                    t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
                }

                "function" == typeof t[1] &&
                ((s = (e = t)[0]), (r = e[1]), (o = e[2]), (a = void 0)),
                o || (o = !1);
                for (var d, h = s.split(" "), u = 0; u < this.length; u += 1) {
                    var p = this[u];
                    if (a)
                        for (d = 0; d < h.length; d += 1) {
                            var f = h[d];
                            p.dom7LiveListeners || (p.dom7LiveListeners = {}),
                            p.dom7LiveListeners[f] || (p.dom7LiveListeners[f] = []),
                                p.dom7LiveListeners[f].push({listener: r, proxyListener: l}),
                                p.addEventListener(f, l, o);
                        }
                    else
                        for (d = 0; d < h.length; d += 1) {
                            var m = h[d];
                            p.dom7Listeners || (p.dom7Listeners = {}),
                            p.dom7Listeners[m] || (p.dom7Listeners[m] = []),
                                p.dom7Listeners[m].push({listener: r, proxyListener: c}),
                                p.addEventListener(m, c, o);
                        }
                }
                return this;
            },
            off: function () {
                for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
                var n = t[0],
                    s = t[1],
                    a = t[2],
                    r = t[3];
                "function" == typeof t[1] &&
                ((n = (e = t)[0]), (a = e[1]), (r = e[2]), (s = void 0)),
                r || (r = !1);
                for (var o = n.split(" "), l = 0; l < o.length; l += 1)
                    for (var c = o[l], d = 0; d < this.length; d += 1) {
                        var h = this[d],
                            u = void 0;
                        if (
                            (!s && h.dom7Listeners
                                ? (u = h.dom7Listeners[c])
                                : s && h.dom7LiveListeners && (u = h.dom7LiveListeners[c]),
                            u && u.length)
                        )
                            for (var p = u.length - 1; p >= 0; p -= 1) {
                                var f = u[p];
                                a && f.listener === a
                                    ? (h.removeEventListener(c, f.proxyListener, r),
                                        u.splice(p, 1))
                                    : a &&
                                    f.listener &&
                                    f.listener.dom7proxy &&
                                    f.listener.dom7proxy === a
                                    ? (h.removeEventListener(c, f.proxyListener, r),
                                        u.splice(p, 1))
                                    : a ||
                                    (h.removeEventListener(c, f.proxyListener, r),
                                        u.splice(p, 1));
                            }
                    }
                return this;
            },
            trigger: function () {
                for (var i = [], n = arguments.length; n--;) i[n] = arguments[n];
                for (var s = i[0].split(" "), a = i[1], r = 0; r < s.length; r += 1)
                    for (var o = s[r], l = 0; l < this.length; l += 1) {
                        var c = this[l],
                            d = void 0;
                        try {
                            d = new t.CustomEvent(o, {
                                detail: a,
                                bubbles: !0,
                                cancelable: !0,
                            });
                        } catch (t) {
                            (d = e.createEvent("Event")).initEvent(o, !0, !0), (d.detail = a);
                        }
                        (c.dom7EventData = i.filter(function (e, t) {
                            return t > 0;
                        })),
                            c.dispatchEvent(d),
                            (c.dom7EventData = []),
                            delete c.dom7EventData;
                    }
                return this;
            },
            transitionEnd: function (e) {
                var t,
                    i = ["webkitTransitionEnd", "transitionend"],
                    n = this;

                function s(a) {
                    if (a.target === this)
                        for (e.call(this, a), t = 0; t < i.length; t += 1) n.off(i[t], s);
                }

                if (e) for (t = 0; t < i.length; t += 1) n.on(i[t], s);
                return this;
            },
            outerWidth: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var t = this.styles();
                        return (
                            this[0].offsetWidth +
                            parseFloat(t.getPropertyValue("margin-right")) +
                            parseFloat(t.getPropertyValue("margin-left"))
                        );
                    }
                    return this[0].offsetWidth;
                }
                return null;
            },
            outerHeight: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var t = this.styles();
                        return (
                            this[0].offsetHeight +
                            parseFloat(t.getPropertyValue("margin-top")) +
                            parseFloat(t.getPropertyValue("margin-bottom"))
                        );
                    }
                    return this[0].offsetHeight;
                }
                return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var i = this[0],
                        n = i.getBoundingClientRect(),
                        s = e.body,
                        a = i.clientTop || s.clientTop || 0,
                        r = i.clientLeft || s.clientLeft || 0,
                        o = i === t ? t.scrollY : i.scrollTop,
                        l = i === t ? t.scrollX : i.scrollLeft;
                    return {top: n.top + o - a, left: n.left + l - r};
                }
                return null;
            },
            css: function (e, i) {
                var n;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (n = 0; n < this.length; n += 1)
                            for (var s in e) this[n].style[s] = e[s];
                        return this;
                    }
                    if (this[0])
                        return t.getComputedStyle(this[0], null).getPropertyValue(e);
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (n = 0; n < this.length; n += 1) this[n].style[e] = i;
                    return this;
                }
                return this;
            },
            each: function (e) {
                if (!e) return this;
                for (var t = 0; t < this.length; t += 1)
                    if (!1 === e.call(this[t], t, this[t])) return this;
                return this;
            },
            html: function (e) {
                if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                return this;
            },
            text: function (e) {
                if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
                return this;
            },
            is: function (s) {
                var a,
                    r,
                    o = this[0];
                if (!o || void 0 === s) return !1;
                if ("string" == typeof s) {
                    if (o.matches) return o.matches(s);
                    if (o.webkitMatchesSelector) return o.webkitMatchesSelector(s);
                    if (o.msMatchesSelector) return o.msMatchesSelector(s);
                    for (a = n(s), r = 0; r < a.length; r += 1) if (a[r] === o) return !0;
                    return !1;
                }
                if (s === e) return o === e;
                if (s === t) return o === t;
                if (s.nodeType || s instanceof i) {
                    for (a = s.nodeType ? [s] : s, r = 0; r < a.length; r += 1)
                        if (a[r] === o) return !0;
                    return !1;
                }
                return !1;
            },
            index: function () {
                var e,
                    t = this[0];
                if (t) {
                    for (e = 0; null !== (t = t.previousSibling);)
                        1 === t.nodeType && (e += 1);
                    return e;
                }
            },
            eq: function (e) {
                if (void 0 === e) return this;
                var t,
                    n = this.length;
                return new i(
                    e > n - 1
                        ? []
                        : e < 0
                        ? (t = n + e) < 0
                            ? []
                            : [this[t]]
                        : [this[e]]
                );
            },
            append: function () {
                for (var t, n = [], s = arguments.length; s--;) n[s] = arguments[s];
                for (var a = 0; a < n.length; a += 1) {
                    t = n[a];
                    for (var r = 0; r < this.length; r += 1)
                        if ("string" == typeof t) {
                            var o = e.createElement("div");
                            for (o.innerHTML = t; o.firstChild;)
                                this[r].appendChild(o.firstChild);
                        } else if (t instanceof i)
                            for (var l = 0; l < t.length; l += 1) this[r].appendChild(t[l]);
                        else this[r].appendChild(t);
                }
                return this;
            },
            prepend: function (t) {
                var n, s;
                for (n = 0; n < this.length; n += 1)
                    if ("string" == typeof t) {
                        var a = e.createElement("div");
                        for (a.innerHTML = t, s = a.childNodes.length - 1; s >= 0; s -= 1)
                            this[n].insertBefore(a.childNodes[s], this[n].childNodes[0]);
                    } else if (t instanceof i)
                        for (s = 0; s < t.length; s += 1)
                            this[n].insertBefore(t[s], this[n].childNodes[0]);
                    else this[n].insertBefore(t, this[n].childNodes[0]);
                return this;
            },
            next: function (e) {
                return this.length > 0
                    ? e
                        ? this[0].nextElementSibling && n(this[0].nextElementSibling).is(e)
                            ? new i([this[0].nextElementSibling])
                            : new i([])
                        : this[0].nextElementSibling
                            ? new i([this[0].nextElementSibling])
                            : new i([])
                    : new i([]);
            },
            nextAll: function (e) {
                var t = [],
                    s = this[0];
                if (!s) return new i([]);
                for (; s.nextElementSibling;) {
                    var a = s.nextElementSibling;
                    e ? n(a).is(e) && t.push(a) : t.push(a), (s = a);
                }
                return new i(t);
            },
            prev: function (e) {
                if (this.length > 0) {
                    var t = this[0];
                    return e
                        ? t.previousElementSibling && n(t.previousElementSibling).is(e)
                            ? new i([t.previousElementSibling])
                            : new i([])
                        : t.previousElementSibling
                            ? new i([t.previousElementSibling])
                            : new i([]);
                }
                return new i([]);
            },
            prevAll: function (e) {
                var t = [],
                    s = this[0];
                if (!s) return new i([]);
                for (; s.previousElementSibling;) {
                    var a = s.previousElementSibling;
                    e ? n(a).is(e) && t.push(a) : t.push(a), (s = a);
                }
                return new i(t);
            },
            parent: function (e) {
                for (var t = [], i = 0; i < this.length; i += 1)
                    null !== this[i].parentNode &&
                    (e
                        ? n(this[i].parentNode).is(e) && t.push(this[i].parentNode)
                        : t.push(this[i].parentNode));
                return n(s(t));
            },
            parents: function (e) {
                for (var t = [], i = 0; i < this.length; i += 1)
                    for (var a = this[i].parentNode; a;)
                        e ? n(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
                return n(s(t));
            },
            closest: function (e) {
                var t = this;
                return void 0 === e
                    ? new i([])
                    : (t.is(e) || (t = t.parents(e).eq(0)), t);
            },
            find: function (e) {
                for (var t = [], n = 0; n < this.length; n += 1)
                    for (var s = this[n].querySelectorAll(e), a = 0; a < s.length; a += 1)
                        t.push(s[a]);
                return new i(t);
            },
            children: function (e) {
                for (var t = [], a = 0; a < this.length; a += 1)
                    for (var r = this[a].childNodes, o = 0; o < r.length; o += 1)
                        e
                            ? 1 === r[o].nodeType && n(r[o]).is(e) && t.push(r[o])
                            : 1 === r[o].nodeType && t.push(r[o]);
                return new i(s(t));
            },
            filter: function (e) {
                for (var t = [], n = 0; n < this.length; n += 1)
                    e.call(this[n], n, this[n]) && t.push(this[n]);
                return new i(t);
            },
            remove: function () {
                for (var e = 0; e < this.length; e += 1)
                    this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this;
            },
            add: function () {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                var i, s;
                for (i = 0; i < e.length; i += 1) {
                    var a = n(e[i]);
                    for (s = 0; s < a.length; s += 1)
                        (this[this.length] = a[s]), (this.length += 1);
                }
                return this;
            },
            styles: function () {
                return this[0] ? t.getComputedStyle(this[0], null) : {};
            },
        };
        Object.keys(a).forEach(function (e) {
            n.fn[e] = n.fn[e] || a[e];
        });
        var r = {
                deleteProps: function (e) {
                    var t = e;
                    Object.keys(t).forEach(function (e) {
                        try {
                            t[e] = null;
                        } catch (e) {
                        }
                        try {
                            delete t[e];
                        } catch (e) {
                        }
                    });
                },
                nextTick: function (e, t) {
                    return void 0 === t && (t = 0), setTimeout(e, t);
                },
                now: function () {
                    return Date.now();
                },
                getTranslate: function (e, i) {
                    var n, s, a;
                    void 0 === i && (i = "x");
                    var r = t.getComputedStyle(e, null);
                    return (
                        t.WebKitCSSMatrix
                            ? ((s = r.transform || r.webkitTransform).split(",").length > 6 &&
                            (s = s
                                .split(", ")
                                .map(function (e) {
                                    return e.replace(",", ".");
                                })
                                .join(", ")),
                                (a = new t.WebKitCSSMatrix("none" === s ? "" : s)))
                            : (n = (a =
                            r.MozTransform ||
                            r.OTransform ||
                            r.MsTransform ||
                            r.msTransform ||
                            r.transform ||
                            r
                                .getPropertyValue("transform")
                                .replace("translate(", "matrix(1, 0, 0, 1,"))
                                .toString()
                                .split(",")),
                        "x" === i &&
                        (s = t.WebKitCSSMatrix
                            ? a.m41
                            : 16 === n.length
                                ? parseFloat(n[12])
                                : parseFloat(n[4])),
                        "y" === i &&
                        (s = t.WebKitCSSMatrix
                            ? a.m42
                            : 16 === n.length
                                ? parseFloat(n[13])
                                : parseFloat(n[5])),
                        s || 0
                    );
                },
                parseUrlQuery: function (e) {
                    var i,
                        n,
                        s,
                        a,
                        r = {},
                        o = e || t.location.href;
                    if ("string" == typeof o && o.length)
                        for (
                            a = (n = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "")
                                .split("&")
                                .filter(function (e) {
                                    return "" !== e;
                                })).length,
                                i = 0;
                            i < a;
                            i += 1
                        )
                            (s = n[i].replace(/#\S+/g, "").split("=")),
                                (r[decodeURIComponent(s[0])] =
                                    void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "");
                    return r;
                },
                isObject: function (e) {
                    return (
                        "object" == typeof e &&
                        null !== e &&
                        e.constructor &&
                        e.constructor === Object
                    );
                },
                extend: function () {
                    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                    for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
                        var s = e[n];
                        if (null != s)
                            for (
                                var a = Object.keys(Object(s)), o = 0, l = a.length;
                                o < l;
                                o += 1
                            ) {
                                var c = a[o],
                                    d = Object.getOwnPropertyDescriptor(s, c);
                                void 0 !== d &&
                                d.enumerable &&
                                (r.isObject(i[c]) && r.isObject(s[c])
                                    ? r.extend(i[c], s[c])
                                    : !r.isObject(i[c]) && r.isObject(s[c])
                                        ? ((i[c] = {}), r.extend(i[c], s[c]))
                                        : (i[c] = s[c]));
                            }
                    }
                    return i;
                },
            },
            o = {
                touch:
                    (t.Modernizr && !0 === t.Modernizr.touch) ||
                    !!(
                        t.navigator.maxTouchPoints > 0 ||
                        "ontouchstart" in t ||
                        (t.DocumentTouch && e instanceof t.DocumentTouch)
                    ),
                pointerEvents:
                    !!t.PointerEvent &&
                    "maxTouchPoints" in t.navigator &&
                    t.navigator.maxTouchPoints > 0,
                observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
                passiveListener: (function () {
                    var e = !1;
                    try {
                        var i = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0;
                            },
                        });
                        t.addEventListener("testPassiveListener", null, i);
                    } catch (e) {
                    }
                    return e;
                })(),
                gestures: "ongesturestart" in t,
            },
            l = function (e) {
                void 0 === e && (e = {});
                var t = this;
                (t.params = e),
                    (t.eventsListeners = {}),
                t.params &&
                t.params.on &&
                Object.keys(t.params.on).forEach(function (e) {
                    t.on(e, t.params.on[e]);
                });
            },
            c = {components: {configurable: !0}};
        (l.prototype.on = function (e, t, i) {
            var n = this;
            if ("function" != typeof t) return n;
            var s = i ? "unshift" : "push";
            return (
                e.split(" ").forEach(function (e) {
                    n.eventsListeners[e] || (n.eventsListeners[e] = []),
                        n.eventsListeners[e][s](t);
                }),
                    n
            );
        }),
            (l.prototype.once = function (e, t, i) {
                var n = this;
                if ("function" != typeof t) return n;

                function s() {
                    for (var i = [], a = arguments.length; a--;) i[a] = arguments[a];
                    n.off(e, s), s.f7proxy && delete s.f7proxy, t.apply(n, i);
                }

                return (s.f7proxy = t), n.on(e, s, i);
            }),
            (l.prototype.off = function (e, t) {
                var i = this;
                return i.eventsListeners
                    ? (e.split(" ").forEach(function (e) {
                        void 0 === t
                            ? (i.eventsListeners[e] = [])
                            : i.eventsListeners[e] &&
                            i.eventsListeners[e].length &&
                            i.eventsListeners[e].forEach(function (n, s) {
                                (n === t || (n.f7proxy && n.f7proxy === t)) &&
                                i.eventsListeners[e].splice(s, 1);
                            });
                    }),
                        i)
                    : i;
            }),
            (l.prototype.emit = function () {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                var i,
                    n,
                    s,
                    a = this;
                return a.eventsListeners
                    ? ("string" == typeof e[0] || Array.isArray(e[0])
                        ? ((i = e[0]), (n = e.slice(1, e.length)), (s = a))
                        : ((i = e[0].events), (n = e[0].data), (s = e[0].context || a)),
                        (Array.isArray(i) ? i : i.split(" ")).forEach(function (e) {
                            if (a.eventsListeners && a.eventsListeners[e]) {
                                var t = [];
                                a.eventsListeners[e].forEach(function (e) {
                                    t.push(e);
                                }),
                                    t.forEach(function (e) {
                                        e.apply(s, n);
                                    });
                            }
                        }),
                        a)
                    : a;
            }),
            (l.prototype.useModulesParams = function (e) {
                var t = this;
                t.modules &&
                Object.keys(t.modules).forEach(function (i) {
                    var n = t.modules[i];
                    n.params && r.extend(e, n.params);
                });
            }),
            (l.prototype.useModules = function (e) {
                void 0 === e && (e = {});
                var t = this;
                t.modules &&
                Object.keys(t.modules).forEach(function (i) {
                    var n = t.modules[i],
                        s = e[i] || {};
                    n.instance &&
                    Object.keys(n.instance).forEach(function (e) {
                        var i = n.instance[e];
                        t[e] = "function" == typeof i ? i.bind(t) : i;
                    }),
                    n.on &&
                    t.on &&
                    Object.keys(n.on).forEach(function (e) {
                        t.on(e, n.on[e]);
                    }),
                    n.create && n.create.bind(t)(s);
                });
            }),
            (c.components.set = function (e) {
                this.use && this.use(e);
            }),
            (l.installModule = function (e) {
                for (var t = [], i = arguments.length - 1; i-- > 0;)
                    t[i] = arguments[i + 1];
                var n = this;
                n.prototype.modules || (n.prototype.modules = {});
                var s =
                    e.name || Object.keys(n.prototype.modules).length + "_" + r.now();
                return (
                    (n.prototype.modules[s] = e),
                    e.proto &&
                    Object.keys(e.proto).forEach(function (t) {
                        n.prototype[t] = e.proto[t];
                    }),
                    e.static &&
                    Object.keys(e.static).forEach(function (t) {
                        n[t] = e.static[t];
                    }),
                    e.install && e.install.apply(n, t),
                        n
                );
            }),
            (l.use = function (e) {
                for (var t = [], i = arguments.length - 1; i-- > 0;)
                    t[i] = arguments[i + 1];
                var n = this;
                return Array.isArray(e)
                    ? (e.forEach(function (e) {
                        return n.installModule(e);
                    }),
                        n)
                    : n.installModule.apply(n, [e].concat(t));
            }),
            Object.defineProperties(l, c);
        var d,
            h,
            u,
            p,
            f,
            m,
            v,
            g,
            b,
            y,
            x,
            w,
            T,
            C,
            S,
            E = {
                updateSize: function () {
                    var e,
                        t,
                        i = this.$el;
                    (e =
                        void 0 !== this.params.width
                            ? this.params.width
                            : i[0].clientWidth),
                        (t =
                            void 0 !== this.params.height
                                ? this.params.height
                                : i[0].clientHeight),
                    (0 === e && this.isHorizontal()) ||
                    (0 === t && this.isVertical()) ||
                    ((e =
                        e -
                        parseInt(i.css("padding-left"), 10) -
                        parseInt(i.css("padding-right"), 10)),
                        (t =
                            t -
                            parseInt(i.css("padding-top"), 10) -
                            parseInt(i.css("padding-bottom"), 10)),
                        r.extend(this, {
                            width: e,
                            height: t,
                            size: this.isHorizontal() ? e : t,
                        }));
                },
                updateSlides: function () {
                    var e = this.params,
                        i = this.$wrapperEl,
                        n = this.size,
                        s = this.rtlTranslate,
                        a = this.wrongRTL,
                        o = this.virtual && e.virtual.enabled,
                        l = o ? this.virtual.slides.length : this.slides.length,
                        c = i.children("." + this.params.slideClass),
                        d = o ? this.virtual.slides.length : c.length,
                        h = [],
                        u = [],
                        p = [];

                    function f(t) {
                        return !e.cssMode || t !== c.length - 1;
                    }

                    var m = e.slidesOffsetBefore;
                    "function" == typeof m && (m = e.slidesOffsetBefore.call(this));
                    var v = e.slidesOffsetAfter;
                    "function" == typeof v && (v = e.slidesOffsetAfter.call(this));
                    var g = this.snapGrid.length,
                        b = this.snapGrid.length,
                        y = e.spaceBetween,
                        x = -m,
                        w = 0,
                        T = 0;
                    if (void 0 !== n) {
                        var C, S;
                        "string" == typeof y &&
                        y.indexOf("%") >= 0 &&
                        (y = (parseFloat(y.replace("%", "")) / 100) * n),
                            (this.virtualSize = -y),
                            s
                                ? c.css({marginLeft: "", marginTop: ""})
                                : c.css({marginRight: "", marginBottom: ""}),
                        e.slidesPerColumn > 1 &&
                        ((C =
                            Math.floor(d / e.slidesPerColumn) ===
                            d / this.params.slidesPerColumn
                                ? d
                                : Math.ceil(d / e.slidesPerColumn) * e.slidesPerColumn),
                        "auto" !== e.slidesPerView &&
                        "row" === e.slidesPerColumnFill &&
                        (C = Math.max(C, e.slidesPerView * e.slidesPerColumn)));
                        for (
                            var E,
                                P = e.slidesPerColumn,
                                M = C / P,
                                k = Math.floor(d / e.slidesPerColumn),
                                $ = 0;
                            $ < d;
                            $ += 1
                        ) {
                            S = 0;
                            var L = c.eq($);
                            if (e.slidesPerColumn > 1) {
                                var A = void 0,
                                    z = void 0,
                                    D = void 0;
                                if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                                    var I = Math.floor(
                                        $ / (e.slidesPerGroup * e.slidesPerColumn)
                                        ),
                                        O = $ - e.slidesPerColumn * e.slidesPerGroup * I,
                                        N =
                                            0 === I
                                                ? e.slidesPerGroup
                                                : Math.min(
                                                Math.ceil((d - I * P * e.slidesPerGroup) / P),
                                                e.slidesPerGroup
                                                );
                                    (A =
                                        (z =
                                            O - (D = Math.floor(O / N)) * N + I * e.slidesPerGroup) +
                                        (D * C) / P),
                                        L.css({
                                            "-webkit-box-ordinal-group": A,
                                            "-moz-box-ordinal-group": A,
                                            "-ms-flex-order": A,
                                            "-webkit-order": A,
                                            order: A,
                                        });
                                } else
                                    "column" === e.slidesPerColumnFill
                                        ? ((D = $ - (z = Math.floor($ / P)) * P),
                                        (z > k || (z === k && D === P - 1)) &&
                                        (D += 1) >= P &&
                                        ((D = 0), (z += 1)))
                                        : (z = $ - (D = Math.floor($ / M)) * M);
                                L.css(
                                    "margin-" + (this.isHorizontal() ? "top" : "left"),
                                    0 !== D && e.spaceBetween && e.spaceBetween + "px"
                                );
                            }
                            if ("none" !== L.css("display")) {
                                if ("auto" === e.slidesPerView) {
                                    var H = t.getComputedStyle(L[0], null),
                                        j = L[0].style.transform,
                                        q = L[0].style.webkitTransform;
                                    if (
                                        (j && (L[0].style.transform = "none"),
                                        q && (L[0].style.webkitTransform = "none"),
                                            e.roundLengths)
                                    )
                                        S = this.isHorizontal()
                                            ? L.outerWidth(!0)
                                            : L.outerHeight(!0);
                                    else if (this.isHorizontal()) {
                                        var R = parseFloat(H.getPropertyValue("width")),
                                            F = parseFloat(H.getPropertyValue("padding-left")),
                                            B = parseFloat(H.getPropertyValue("padding-right")),
                                            X = parseFloat(H.getPropertyValue("margin-left")),
                                            W = parseFloat(H.getPropertyValue("margin-right")),
                                            Y = H.getPropertyValue("box-sizing");
                                        S = Y && "border-box" === Y ? R + X + W : R + F + B + X + W;
                                    } else {
                                        var V = parseFloat(H.getPropertyValue("height")),
                                            G = parseFloat(H.getPropertyValue("padding-top")),
                                            _ = parseFloat(H.getPropertyValue("padding-bottom")),
                                            U = parseFloat(H.getPropertyValue("margin-top")),
                                            K = parseFloat(H.getPropertyValue("margin-bottom")),
                                            Z = H.getPropertyValue("box-sizing");
                                        S = Z && "border-box" === Z ? V + U + K : V + G + _ + U + K;
                                    }
                                    j && (L[0].style.transform = j),
                                    q && (L[0].style.webkitTransform = q),
                                    e.roundLengths && (S = Math.floor(S));
                                } else
                                    (S = (n - (e.slidesPerView - 1) * y) / e.slidesPerView),
                                    e.roundLengths && (S = Math.floor(S)),
                                    c[$] &&
                                    (this.isHorizontal()
                                        ? (c[$].style.width = S + "px")
                                        : (c[$].style.height = S + "px"));
                                c[$] && (c[$].swiperSlideSize = S),
                                    p.push(S),
                                    e.centeredSlides
                                        ? ((x = x + S / 2 + w / 2 + y),
                                        0 === w && 0 !== $ && (x = x - n / 2 - y),
                                        0 === $ && (x = x - n / 2 - y),
                                        Math.abs(x) < 0.001 && (x = 0),
                                        e.roundLengths && (x = Math.floor(x)),
                                        T % e.slidesPerGroup == 0 && h.push(x),
                                            u.push(x))
                                        : (e.roundLengths && (x = Math.floor(x)),
                                        (T - Math.min(this.params.slidesPerGroupSkip, T)) %
                                        this.params.slidesPerGroup ==
                                        0 && h.push(x),
                                            u.push(x),
                                            (x = x + S + y)),
                                    (this.virtualSize += S + y),
                                    (w = S),
                                    (T += 1);
                            }
                        }
                        if (
                            ((this.virtualSize = Math.max(this.virtualSize, n) + v),
                            s &&
                            a &&
                            ("slide" === e.effect || "coverflow" === e.effect) &&
                            i.css({width: this.virtualSize + e.spaceBetween + "px"}),
                            e.setWrapperSize &&
                            (this.isHorizontal()
                                ? i.css({width: this.virtualSize + e.spaceBetween + "px"})
                                : i.css({
                                    height: this.virtualSize + e.spaceBetween + "px",
                                })),
                            e.slidesPerColumn > 1 &&
                            ((this.virtualSize = (S + e.spaceBetween) * C),
                                (this.virtualSize =
                                    Math.ceil(this.virtualSize / e.slidesPerColumn) -
                                    e.spaceBetween),
                                this.isHorizontal()
                                    ? i.css({width: this.virtualSize + e.spaceBetween + "px"})
                                    : i.css({height: this.virtualSize + e.spaceBetween + "px"}),
                                e.centeredSlides))
                        ) {
                            E = [];
                            for (var Q = 0; Q < h.length; Q += 1) {
                                var J = h[Q];
                                e.roundLengths && (J = Math.floor(J)),
                                h[Q] < this.virtualSize + h[0] && E.push(J);
                            }
                            h = E;
                        }
                        if (!e.centeredSlides) {
                            E = [];
                            for (var ee = 0; ee < h.length; ee += 1) {
                                var te = h[ee];
                                e.roundLengths && (te = Math.floor(te)),
                                h[ee] <= this.virtualSize - n && E.push(te);
                            }
                            (h = E),
                            Math.floor(this.virtualSize - n) - Math.floor(h[h.length - 1]) >
                            1 && h.push(this.virtualSize - n);
                        }
                        if (
                            (0 === h.length && (h = [0]),
                            0 !== e.spaceBetween &&
                            (this.isHorizontal()
                                ? s
                                    ? c.filter(f).css({marginLeft: y + "px"})
                                    : c.filter(f).css({marginRight: y + "px"})
                                : c.filter(f).css({marginBottom: y + "px"})),
                            e.centeredSlides && e.centeredSlidesBounds)
                        ) {
                            var ie = 0;
                            p.forEach(function (t) {
                                ie += t + (e.spaceBetween ? e.spaceBetween : 0);
                            });
                            var ne = (ie -= e.spaceBetween) - n;
                            h = h.map(function (e) {
                                return e < 0 ? -m : e > ne ? ne + v : e;
                            });
                        }
                        if (e.centerInsufficientSlides) {
                            var se = 0;
                            if (
                                (p.forEach(function (t) {
                                    se += t + (e.spaceBetween ? e.spaceBetween : 0);
                                }),
                                (se -= e.spaceBetween) < n)
                            ) {
                                var ae = (n - se) / 2;
                                h.forEach(function (e, t) {
                                    h[t] = e - ae;
                                }),
                                    u.forEach(function (e, t) {
                                        u[t] = e + ae;
                                    });
                            }
                        }
                        r.extend(this, {
                            slides: c,
                            snapGrid: h,
                            slidesGrid: u,
                            slidesSizesGrid: p,
                        }),
                        d !== l && this.emit("slidesLengthChange"),
                        h.length !== g &&
                        (this.params.watchOverflow && this.checkOverflow(),
                            this.emit("snapGridLengthChange")),
                        u.length !== b && this.emit("slidesGridLengthChange"),
                        (e.watchSlidesProgress || e.watchSlidesVisibility) &&
                        this.updateSlidesOffset();
                    }
                },
                updateAutoHeight: function (e) {
                    var t,
                        i = [],
                        n = 0;
                    if (
                        ("number" == typeof e
                            ? this.setTransition(e)
                            : !0 === e && this.setTransition(this.params.speed),
                        "auto" !== this.params.slidesPerView &&
                        this.params.slidesPerView > 1)
                    )
                        for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                            var s = this.activeIndex + t;
                            if (s > this.slides.length) break;
                            i.push(this.slides.eq(s)[0]);
                        }
                    else i.push(this.slides.eq(this.activeIndex)[0]);
                    for (t = 0; t < i.length; t += 1)
                        if (void 0 !== i[t]) {
                            var a = i[t].offsetHeight;
                            n = a > n ? a : n;
                        }
                    n && this.$wrapperEl.css("height", n + "px");
                },
                updateSlidesOffset: function () {
                    for (var e = this.slides, t = 0; t < e.length; t += 1)
                        e[t].swiperSlideOffset = this.isHorizontal()
                            ? e[t].offsetLeft
                            : e[t].offsetTop;
                },
                updateSlidesProgress: function (e) {
                    void 0 === e && (e = (this && this.translate) || 0);
                    var t = this.params,
                        i = this.slides,
                        s = this.rtlTranslate;
                    if (0 !== i.length) {
                        void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                        var a = -e;
                        s && (a = e),
                            i.removeClass(t.slideVisibleClass),
                            (this.visibleSlidesIndexes = []),
                            (this.visibleSlides = []);
                        for (var r = 0; r < i.length; r += 1) {
                            var o = i[r],
                                l =
                                    (a +
                                        (t.centeredSlides ? this.minTranslate() : 0) -
                                        o.swiperSlideOffset) /
                                    (o.swiperSlideSize + t.spaceBetween);
                            if (t.watchSlidesVisibility) {
                                var c = -(a - o.swiperSlideOffset),
                                    d = c + this.slidesSizesGrid[r];
                                ((c >= 0 && c < this.size - 1) ||
                                    (d > 1 && d <= this.size) ||
                                    (c <= 0 && d >= this.size)) &&
                                (this.visibleSlides.push(o),
                                    this.visibleSlidesIndexes.push(r),
                                    i.eq(r).addClass(t.slideVisibleClass));
                            }
                            o.progress = s ? -l : l;
                        }
                        this.visibleSlides = n(this.visibleSlides);
                    }
                },
                updateProgress: function (e) {
                    if (void 0 === e) {
                        var t = this.rtlTranslate ? -1 : 1;
                        e = (this && this.translate && this.translate * t) || 0;
                    }
                    var i = this.params,
                        n = this.maxTranslate() - this.minTranslate(),
                        s = this.progress,
                        a = this.isBeginning,
                        o = this.isEnd,
                        l = a,
                        c = o;
                    0 === n
                        ? ((s = 0), (a = !0), (o = !0))
                        : ((a = (s = (e - this.minTranslate()) / n) <= 0), (o = s >= 1)),
                        r.extend(this, {progress: s, isBeginning: a, isEnd: o}),
                    (i.watchSlidesProgress || i.watchSlidesVisibility) &&
                    this.updateSlidesProgress(e),
                    a && !l && this.emit("reachBeginning toEdge"),
                    o && !c && this.emit("reachEnd toEdge"),
                    ((l && !a) || (c && !o)) && this.emit("fromEdge"),
                        this.emit("progress", s);
                },
                updateSlidesClasses: function () {
                    var e,
                        t = this.slides,
                        i = this.params,
                        n = this.$wrapperEl,
                        s = this.activeIndex,
                        a = this.realIndex,
                        r = this.virtual && i.virtual.enabled;
                    t.removeClass(
                        i.slideActiveClass +
                        " " +
                        i.slideNextClass +
                        " " +
                        i.slidePrevClass +
                        " " +
                        i.slideDuplicateActiveClass +
                        " " +
                        i.slideDuplicateNextClass +
                        " " +
                        i.slideDuplicatePrevClass
                    ),
                        (e = r
                            ? this.$wrapperEl.find(
                                "." + i.slideClass + '[data-swiper-slide-index="' + s + '"]'
                            )
                            : t.eq(s)).addClass(i.slideActiveClass),
                    i.loop &&
                    (e.hasClass(i.slideDuplicateClass)
                        ? n
                            .children(
                                "." +
                                i.slideClass +
                                ":not(." +
                                i.slideDuplicateClass +
                                ')[data-swiper-slide-index="' +
                                a +
                                '"]'
                            )
                            .addClass(i.slideDuplicateActiveClass)
                        : n
                            .children(
                                "." +
                                i.slideClass +
                                "." +
                                i.slideDuplicateClass +
                                '[data-swiper-slide-index="' +
                                a +
                                '"]'
                            )
                            .addClass(i.slideDuplicateActiveClass));
                    var o = e
                        .nextAll("." + i.slideClass)
                        .eq(0)
                        .addClass(i.slideNextClass);
                    i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
                    var l = e
                        .prevAll("." + i.slideClass)
                        .eq(0)
                        .addClass(i.slidePrevClass);
                    i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
                    i.loop &&
                    (o.hasClass(i.slideDuplicateClass)
                        ? n
                            .children(
                                "." +
                                i.slideClass +
                                ":not(." +
                                i.slideDuplicateClass +
                                ')[data-swiper-slide-index="' +
                                o.attr("data-swiper-slide-index") +
                                '"]'
                            )
                            .addClass(i.slideDuplicateNextClass)
                        : n
                            .children(
                                "." +
                                i.slideClass +
                                "." +
                                i.slideDuplicateClass +
                                '[data-swiper-slide-index="' +
                                o.attr("data-swiper-slide-index") +
                                '"]'
                            )
                            .addClass(i.slideDuplicateNextClass),
                        l.hasClass(i.slideDuplicateClass)
                            ? n
                                .children(
                                    "." +
                                    i.slideClass +
                                    ":not(." +
                                    i.slideDuplicateClass +
                                    ')[data-swiper-slide-index="' +
                                    l.attr("data-swiper-slide-index") +
                                    '"]'
                                )
                                .addClass(i.slideDuplicatePrevClass)
                            : n
                                .children(
                                    "." +
                                    i.slideClass +
                                    "." +
                                    i.slideDuplicateClass +
                                    '[data-swiper-slide-index="' +
                                    l.attr("data-swiper-slide-index") +
                                    '"]'
                                )
                                .addClass(i.slideDuplicatePrevClass));
                },
                updateActiveIndex: function (e) {
                    var t,
                        i = this.rtlTranslate ? this.translate : -this.translate,
                        n = this.slidesGrid,
                        s = this.snapGrid,
                        a = this.params,
                        o = this.activeIndex,
                        l = this.realIndex,
                        c = this.snapIndex,
                        d = e;
                    if (void 0 === d) {
                        for (var h = 0; h < n.length; h += 1)
                            void 0 !== n[h + 1]
                                ? i >= n[h] && i < n[h + 1] - (n[h + 1] - n[h]) / 2
                                ? (d = h)
                                : i >= n[h] && i < n[h + 1] && (d = h + 1)
                                : i >= n[h] && (d = h);
                        a.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
                    }
                    if (s.indexOf(i) >= 0) t = s.indexOf(i);
                    else {
                        var u = Math.min(a.slidesPerGroupSkip, d);
                        t = u + Math.floor((d - u) / a.slidesPerGroup);
                    }
                    if ((t >= s.length && (t = s.length - 1), d !== o)) {
                        var p = parseInt(
                            this.slides.eq(d).attr("data-swiper-slide-index") || d,
                            10
                        );
                        r.extend(this, {
                            snapIndex: t,
                            realIndex: p,
                            previousIndex: o,
                            activeIndex: d,
                        }),
                            this.emit("activeIndexChange"),
                            this.emit("snapIndexChange"),
                        l !== p && this.emit("realIndexChange"),
                        (this.initialized || this.runCallbacksOnInit) &&
                        this.emit("slideChange");
                    } else
                        t !== c && ((this.snapIndex = t), this.emit("snapIndexChange"));
                },
                updateClickedSlide: function (e) {
                    var t = this.params,
                        i = n(e.target).closest("." + t.slideClass)[0],
                        s = !1;
                    if (i)
                        for (var a = 0; a < this.slides.length; a += 1)
                            this.slides[a] === i && (s = !0);
                    if (!i || !s)
                        return (
                            (this.clickedSlide = void 0), void (this.clickedIndex = void 0)
                        );
                    (this.clickedSlide = i),
                        this.virtual && this.params.virtual.enabled
                            ? (this.clickedIndex = parseInt(
                            n(i).attr("data-swiper-slide-index"),
                            10
                            ))
                            : (this.clickedIndex = n(i).index()),
                    t.slideToClickedSlide &&
                    void 0 !== this.clickedIndex &&
                    this.clickedIndex !== this.activeIndex &&
                    this.slideToClickedSlide();
                },
            },
            P = {
                getTranslate: function (e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    var t = this.params,
                        i = this.rtlTranslate,
                        n = this.translate,
                        s = this.$wrapperEl;
                    if (t.virtualTranslate) return i ? -n : n;
                    if (t.cssMode) return n;
                    var a = r.getTranslate(s[0], e);
                    return i && (a = -a), a || 0;
                },
                setTranslate: function (e, t) {
                    var i = this.rtlTranslate,
                        n = this.params,
                        s = this.$wrapperEl,
                        a = this.wrapperEl,
                        r = this.progress,
                        o = 0,
                        l = 0;
                    this.isHorizontal() ? (o = i ? -e : e) : (l = e),
                    n.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
                        n.cssMode
                            ? (a[
                                this.isHorizontal() ? "scrollLeft" : "scrollTop"
                                ] = this.isHorizontal() ? -o : -l)
                            : n.virtualTranslate ||
                            s.transform("translate3d(" + o + "px, " + l + "px, 0px)"),
                        (this.previousTranslate = this.translate),
                        (this.translate = this.isHorizontal() ? o : l);
                    var c = this.maxTranslate() - this.minTranslate();
                    (0 === c ? 0 : (e - this.minTranslate()) / c) !== r &&
                    this.updateProgress(e),
                        this.emit("setTranslate", this.translate, t);
                },
                minTranslate: function () {
                    return -this.snapGrid[0];
                },
                maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1];
                },
                translateTo: function (e, t, i, n, s) {
                    var a;
                    void 0 === e && (e = 0),
                    void 0 === t && (t = this.params.speed),
                    void 0 === i && (i = !0),
                    void 0 === n && (n = !0);
                    var r = this,
                        o = r.params,
                        l = r.wrapperEl;
                    if (r.animating && o.preventInteractionOnTransition) return !1;
                    var c,
                        d = r.minTranslate(),
                        h = r.maxTranslate();
                    if (
                        ((c = n && e > d ? d : n && e < h ? h : e),
                            r.updateProgress(c),
                            o.cssMode)
                    ) {
                        var u = r.isHorizontal();
                        return (
                            0 === t
                                ? (l[u ? "scrollLeft" : "scrollTop"] = -c)
                                : l.scrollTo
                                ? l.scrollTo(
                                    (((a = {})[u ? "left" : "top"] = -c),
                                        (a.behavior = "smooth"),
                                        a)
                                )
                                : (l[u ? "scrollLeft" : "scrollTop"] = -c),
                                !0
                        );
                    }
                    return (
                        0 === t
                            ? (r.setTransition(0),
                                r.setTranslate(c),
                            i &&
                            (r.emit("beforeTransitionStart", t, s),
                                r.emit("transitionEnd")))
                            : (r.setTransition(t),
                                r.setTranslate(c),
                            i &&
                            (r.emit("beforeTransitionStart", t, s),
                                r.emit("transitionStart")),
                            r.animating ||
                            ((r.animating = !0),
                            r.onTranslateToWrapperTransitionEnd ||
                            (r.onTranslateToWrapperTransitionEnd = function (e) {
                                r &&
                                !r.destroyed &&
                                e.target === this &&
                                (r.$wrapperEl[0].removeEventListener(
                                    "transitionend",
                                    r.onTranslateToWrapperTransitionEnd
                                ),
                                    r.$wrapperEl[0].removeEventListener(
                                        "webkitTransitionEnd",
                                        r.onTranslateToWrapperTransitionEnd
                                    ),
                                    (r.onTranslateToWrapperTransitionEnd = null),
                                    delete r.onTranslateToWrapperTransitionEnd,
                                i && r.emit("transitionEnd"));
                            }),
                                r.$wrapperEl[0].addEventListener(
                                    "transitionend",
                                    r.onTranslateToWrapperTransitionEnd
                                ),
                                r.$wrapperEl[0].addEventListener(
                                    "webkitTransitionEnd",
                                    r.onTranslateToWrapperTransitionEnd
                                ))),
                            !0
                    );
                },
            },
            M = {
                slideTo: function (e, t, i, n) {
                    var s;
                    void 0 === e && (e = 0),
                    void 0 === t && (t = this.params.speed),
                    void 0 === i && (i = !0);
                    var a = this,
                        r = e;
                    r < 0 && (r = 0);
                    var o = a.params,
                        l = a.snapGrid,
                        c = a.slidesGrid,
                        d = a.previousIndex,
                        h = a.activeIndex,
                        u = a.rtlTranslate,
                        p = a.wrapperEl;
                    if (a.animating && o.preventInteractionOnTransition) return !1;
                    var f = Math.min(a.params.slidesPerGroupSkip, r),
                        m = f + Math.floor((r - f) / a.params.slidesPerGroup);
                    m >= c.length && (m = c.length - 1),
                    (h || o.initialSlide || 0) === (d || 0) &&
                    i &&
                    a.emit("beforeSlideChangeStart");
                    var v,
                        g = -l[m];
                    if ((a.updateProgress(g), o.normalizeSlideIndex))
                        for (var b = 0; b < c.length; b += 1)
                            -Math.floor(100 * g) >= Math.floor(100 * c[b]) && (r = b);
                    if (a.initialized && r !== h) {
                        if (!a.allowSlideNext && g < a.translate && g < a.minTranslate())
                            return !1;
                        if (
                            !a.allowSlidePrev &&
                            g > a.translate &&
                            g > a.maxTranslate() &&
                            (h || 0) !== r
                        )
                            return !1;
                    }
                    if (
                        ((v = r > h ? "next" : r < h ? "prev" : "reset"),
                        (u && -g === a.translate) || (!u && g === a.translate))
                    )
                        return (
                            a.updateActiveIndex(r),
                            o.autoHeight && a.updateAutoHeight(),
                                a.updateSlidesClasses(),
                            "slide" !== o.effect && a.setTranslate(g),
                            "reset" !== v && (a.transitionStart(i, v), a.transitionEnd(i, v)),
                                !1
                        );
                    if (o.cssMode) {
                        var y = a.isHorizontal();
                        return (
                            0 === t
                                ? (p[y ? "scrollLeft" : "scrollTop"] = -g)
                                : p.scrollTo
                                ? p.scrollTo(
                                    (((s = {})[y ? "left" : "top"] = -g),
                                        (s.behavior = "smooth"),
                                        s)
                                )
                                : (p[y ? "scrollLeft" : "scrollTop"] = -g),
                                !0
                        );
                    }
                    return (
                        0 === t
                            ? (a.setTransition(0),
                                a.setTranslate(g),
                                a.updateActiveIndex(r),
                                a.updateSlidesClasses(),
                                a.emit("beforeTransitionStart", t, n),
                                a.transitionStart(i, v),
                                a.transitionEnd(i, v))
                            : (a.setTransition(t),
                                a.setTranslate(g),
                                a.updateActiveIndex(r),
                                a.updateSlidesClasses(),
                                a.emit("beforeTransitionStart", t, n),
                                a.transitionStart(i, v),
                            a.animating ||
                            ((a.animating = !0),
                            a.onSlideToWrapperTransitionEnd ||
                            (a.onSlideToWrapperTransitionEnd = function (e) {
                                a &&
                                !a.destroyed &&
                                e.target === this &&
                                (a.$wrapperEl[0].removeEventListener(
                                    "transitionend",
                                    a.onSlideToWrapperTransitionEnd
                                ),
                                    a.$wrapperEl[0].removeEventListener(
                                        "webkitTransitionEnd",
                                        a.onSlideToWrapperTransitionEnd
                                    ),
                                    (a.onSlideToWrapperTransitionEnd = null),
                                    delete a.onSlideToWrapperTransitionEnd,
                                    a.transitionEnd(i, v));
                            }),
                                a.$wrapperEl[0].addEventListener(
                                    "transitionend",
                                    a.onSlideToWrapperTransitionEnd
                                ),
                                a.$wrapperEl[0].addEventListener(
                                    "webkitTransitionEnd",
                                    a.onSlideToWrapperTransitionEnd
                                ))),
                            !0
                    );
                },
                slideToLoop: function (e, t, i, n) {
                    void 0 === e && (e = 0),
                    void 0 === t && (t = this.params.speed),
                    void 0 === i && (i = !0);
                    var s = e;
                    return (
                        this.params.loop && (s += this.loopedSlides),
                            this.slideTo(s, t, i, n)
                    );
                },
                slideNext: function (e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var n = this.params,
                        s = this.animating,
                        a = this.activeIndex < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup;
                    if (n.loop) {
                        if (s) return !1;
                        this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft);
                    }
                    return this.slideTo(this.activeIndex + a, e, t, i);
                },
                slidePrev: function (e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var n = this.params,
                        s = this.animating,
                        a = this.snapGrid,
                        r = this.slidesGrid,
                        o = this.rtlTranslate;
                    if (n.loop) {
                        if (s) return !1;
                        this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft);
                    }

                    function l(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
                    }

                    var c,
                        d = l(o ? this.translate : -this.translate),
                        h = a.map(function (e) {
                            return l(e);
                        }),
                        u =
                            (r.map(function (e) {
                                return l(e);
                            }),
                                a[h.indexOf(d)],
                                a[h.indexOf(d) - 1]);
                    return (
                        void 0 === u &&
                        n.cssMode &&
                        a.forEach(function (e) {
                            !u && d >= e && (u = e);
                        }),
                        void 0 !== u &&
                        (c = r.indexOf(u)) < 0 &&
                        (c = this.activeIndex - 1),
                            this.slideTo(c, e, t, i)
                    );
                },
                slideReset: function (e, t, i) {
                    return (
                        void 0 === e && (e = this.params.speed),
                        void 0 === t && (t = !0),
                            this.slideTo(this.activeIndex, e, t, i)
                    );
                },
                slideToClosest: function (e, t, i, n) {
                    void 0 === e && (e = this.params.speed),
                    void 0 === t && (t = !0),
                    void 0 === n && (n = 0.5);
                    var s = this.activeIndex,
                        a = Math.min(this.params.slidesPerGroupSkip, s),
                        r = a + Math.floor((s - a) / this.params.slidesPerGroup),
                        o = this.rtlTranslate ? this.translate : -this.translate;
                    if (o >= this.snapGrid[r]) {
                        var l = this.snapGrid[r];
                        o - l > (this.snapGrid[r + 1] - l) * n &&
                        (s += this.params.slidesPerGroup);
                    } else {
                        var c = this.snapGrid[r - 1];
                        o - c <= (this.snapGrid[r] - c) * n &&
                        (s -= this.params.slidesPerGroup);
                    }
                    return (
                        (s = Math.max(s, 0)),
                            (s = Math.min(s, this.slidesGrid.length - 1)),
                            this.slideTo(s, e, t, i)
                    );
                },
                slideToClickedSlide: function () {
                    var e,
                        t = this,
                        i = t.params,
                        s = t.$wrapperEl,
                        a =
                            "auto" === i.slidesPerView
                                ? t.slidesPerViewDynamic()
                                : i.slidesPerView,
                        o = t.clickedIndex;
                    if (i.loop) {
                        if (t.animating) return;
                        (e = parseInt(
                            n(t.clickedSlide).attr("data-swiper-slide-index"),
                            10
                        )),
                            i.centeredSlides
                                ? o < t.loopedSlides - a / 2 ||
                                o > t.slides.length - t.loopedSlides + a / 2
                                ? (t.loopFix(),
                                    (o = s
                                        .children(
                                            "." +
                                            i.slideClass +
                                            '[data-swiper-slide-index="' +
                                            e +
                                            '"]:not(.' +
                                            i.slideDuplicateClass +
                                            ")"
                                        )
                                        .eq(0)
                                        .index()),
                                    r.nextTick(function () {
                                        t.slideTo(o);
                                    }))
                                : t.slideTo(o)
                                : o > t.slides.length - a
                                ? (t.loopFix(),
                                    (o = s
                                        .children(
                                            "." +
                                            i.slideClass +
                                            '[data-swiper-slide-index="' +
                                            e +
                                            '"]:not(.' +
                                            i.slideDuplicateClass +
                                            ")"
                                        )
                                        .eq(0)
                                        .index()),
                                    r.nextTick(function () {
                                        t.slideTo(o);
                                    }))
                                : t.slideTo(o);
                    } else t.slideTo(o);
                },
            },
            k = {
                loopCreate: function () {
                    var t = this,
                        i = t.params,
                        s = t.$wrapperEl;
                    s.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
                    var a = s.children("." + i.slideClass);
                    if (i.loopFillGroupWithBlank) {
                        var r = i.slidesPerGroup - (a.length % i.slidesPerGroup);
                        if (r !== i.slidesPerGroup) {
                            for (var o = 0; o < r; o += 1) {
                                var l = n(e.createElement("div")).addClass(
                                    i.slideClass + " " + i.slideBlankClass
                                );
                                s.append(l);
                            }
                            a = s.children("." + i.slideClass);
                        }
                    }
                    "auto" !== i.slidesPerView ||
                    i.loopedSlides ||
                    (i.loopedSlides = a.length),
                        (t.loopedSlides = Math.ceil(
                            parseFloat(i.loopedSlides || i.slidesPerView, 10)
                        )),
                        (t.loopedSlides += i.loopAdditionalSlides),
                    t.loopedSlides > a.length && (t.loopedSlides = a.length);
                    var c = [],
                        d = [];
                    a.each(function (e, i) {
                        var s = n(i);
                        e < t.loopedSlides && d.push(i),
                        e < a.length && e >= a.length - t.loopedSlides && c.push(i),
                            s.attr("data-swiper-slide-index", e);
                    });
                    for (var h = 0; h < d.length; h += 1)
                        s.append(n(d[h].cloneNode(!0)).addClass(i.slideDuplicateClass));
                    for (var u = c.length - 1; u >= 0; u -= 1)
                        s.prepend(n(c[u].cloneNode(!0)).addClass(i.slideDuplicateClass));
                },
                loopFix: function () {
                    this.emit("beforeLoopFix");
                    var e,
                        t = this.activeIndex,
                        i = this.slides,
                        n = this.loopedSlides,
                        s = this.allowSlidePrev,
                        a = this.allowSlideNext,
                        r = this.snapGrid,
                        o = this.rtlTranslate;
                    (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
                    var l = -r[t] - this.getTranslate();
                    t < n
                        ? ((e = i.length - 3 * n + t),
                            (e += n),
                        this.slideTo(e, 0, !1, !0) &&
                        0 !== l &&
                        this.setTranslate((o ? -this.translate : this.translate) - l))
                        : t >= i.length - n &&
                        ((e = -i.length + t + n),
                            (e += n),
                        this.slideTo(e, 0, !1, !0) &&
                        0 !== l &&
                        this.setTranslate((o ? -this.translate : this.translate) - l)),
                        (this.allowSlidePrev = s),
                        (this.allowSlideNext = a),
                        this.emit("loopFix");
                },
                loopDestroy: function () {
                    var e = this.$wrapperEl,
                        t = this.params,
                        i = this.slides;
                    e
                        .children(
                            "." +
                            t.slideClass +
                            "." +
                            t.slideDuplicateClass +
                            ",." +
                            t.slideClass +
                            "." +
                            t.slideBlankClass
                        )
                        .remove(),
                        i.removeAttr("data-swiper-slide-index");
                },
            },
            $ = {
                setGrabCursor: function (e) {
                    if (
                        !(
                            o.touch ||
                            !this.params.simulateTouch ||
                            (this.params.watchOverflow && this.isLocked) ||
                            this.params.cssMode
                        )
                    ) {
                        var t = this.el;
                        (t.style.cursor = "move"),
                            (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                            (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                            (t.style.cursor = e ? "grabbing" : "grab");
                    }
                },
                unsetGrabCursor: function () {
                    o.touch ||
                    (this.params.watchOverflow && this.isLocked) ||
                    this.params.cssMode ||
                    (this.el.style.cursor = "");
                },
            },
            L = {
                appendSlide: function (e) {
                    var t = this.$wrapperEl,
                        i = this.params;
                    if (
                        (i.loop && this.loopDestroy(),
                        "object" == typeof e && "length" in e)
                    )
                        for (var n = 0; n < e.length; n += 1) e[n] && t.append(e[n]);
                    else t.append(e);
                    i.loop && this.loopCreate(),
                    (i.observer && o.observer) || this.update();
                },
                prependSlide: function (e) {
                    var t = this.params,
                        i = this.$wrapperEl,
                        n = this.activeIndex;
                    t.loop && this.loopDestroy();
                    var s = n + 1;
                    if ("object" == typeof e && "length" in e) {
                        for (var a = 0; a < e.length; a += 1) e[a] && i.prepend(e[a]);
                        s = n + e.length;
                    } else i.prepend(e);
                    t.loop && this.loopCreate(),
                    (t.observer && o.observer) || this.update(),
                        this.slideTo(s, 0, !1);
                },
                addSlide: function (e, t) {
                    var i = this.$wrapperEl,
                        n = this.params,
                        s = this.activeIndex;
                    n.loop &&
                    ((s -= this.loopedSlides),
                        this.loopDestroy(),
                        (this.slides = i.children("." + n.slideClass)));
                    var a = this.slides.length;
                    if (e <= 0) this.prependSlide(t);
                    else if (e >= a) this.appendSlide(t);
                    else {
                        for (var r = s > e ? s + 1 : s, l = [], c = a - 1; c >= e; c -= 1) {
                            var d = this.slides.eq(c);
                            d.remove(), l.unshift(d);
                        }
                        if ("object" == typeof t && "length" in t) {
                            for (var h = 0; h < t.length; h += 1) t[h] && i.append(t[h]);
                            r = s > e ? s + t.length : s;
                        } else i.append(t);
                        for (var u = 0; u < l.length; u += 1) i.append(l[u]);
                        n.loop && this.loopCreate(),
                        (n.observer && o.observer) || this.update(),
                            n.loop
                                ? this.slideTo(r + this.loopedSlides, 0, !1)
                                : this.slideTo(r, 0, !1);
                    }
                },
                removeSlide: function (e) {
                    var t = this.params,
                        i = this.$wrapperEl,
                        n = this.activeIndex;
                    t.loop &&
                    ((n -= this.loopedSlides),
                        this.loopDestroy(),
                        (this.slides = i.children("." + t.slideClass)));
                    var s,
                        a = n;
                    if ("object" == typeof e && "length" in e) {
                        for (var r = 0; r < e.length; r += 1)
                            (s = e[r]),
                            this.slides[s] && this.slides.eq(s).remove(),
                            s < a && (a -= 1);
                        a = Math.max(a, 0);
                    } else
                        (s = e),
                        this.slides[s] && this.slides.eq(s).remove(),
                        s < a && (a -= 1),
                            (a = Math.max(a, 0));
                    t.loop && this.loopCreate(),
                    (t.observer && o.observer) || this.update(),
                        t.loop
                            ? this.slideTo(a + this.loopedSlides, 0, !1)
                            : this.slideTo(a, 0, !1);
                },
                removeAllSlides: function () {
                    for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                    this.removeSlide(e);
                },
            },
            A =
                ((d = t.navigator.platform),
                    (h = t.navigator.userAgent),
                    (u = {
                        ios: !1,
                        android: !1,
                        androidChrome: !1,
                        desktop: !1,
                        iphone: !1,
                        ipod: !1,
                        ipad: !1,
                        edge: !1,
                        ie: !1,
                        firefox: !1,
                        macos: !1,
                        windows: !1,
                        cordova: !(!t.cordova && !t.phonegap),
                        phonegap: !(!t.cordova && !t.phonegap),
                        electron: !1,
                    }),
                    (p = t.screen.width),
                    (f = t.screen.height),
                    (m = h.match(/(Android);?[\s\/]+([\d.]+)?/)),
                    (v = h.match(/(iPad).*OS\s([\d_]+)/)),
                    (g = h.match(/(iPod)(.*OS\s([\d_]+))?/)),
                    (b = !v && h.match(/(iPhone\sOS|iOS)\s([\d_]+)/)),
                    (y = h.indexOf("MSIE ") >= 0 || h.indexOf("Trident/") >= 0),
                    (x = h.indexOf("Edge/") >= 0),
                    (w = h.indexOf("Gecko/") >= 0 && h.indexOf("Firefox/") >= 0),
                    (T = "Win32" === d),
                    (C = h.toLowerCase().indexOf("electron") >= 0),
                    (S = "MacIntel" === d),
                !v &&
                S &&
                o.touch &&
                ((1024 === p && 1366 === f) ||
                    (834 === p && 1194 === f) ||
                    (834 === p && 1112 === f) ||
                    (768 === p && 1024 === f)) &&
                ((v = h.match(/(Version)\/([\d.]+)/)), (S = !1)),
                    (u.ie = y),
                    (u.edge = x),
                    (u.firefox = w),
                m &&
                !T &&
                ((u.os = "android"),
                    (u.osVersion = m[2]),
                    (u.android = !0),
                    (u.androidChrome = h.toLowerCase().indexOf("chrome") >= 0)),
                (v || b || g) && ((u.os = "ios"), (u.ios = !0)),
                b && !g && ((u.osVersion = b[2].replace(/_/g, ".")), (u.iphone = !0)),
                v && ((u.osVersion = v[2].replace(/_/g, ".")), (u.ipad = !0)),
                g &&
                ((u.osVersion = g[3] ? g[3].replace(/_/g, ".") : null),
                    (u.ipod = !0)),
                u.ios &&
                u.osVersion &&
                h.indexOf("Version/") >= 0 &&
                "10" === u.osVersion.split(".")[0] &&
                (u.osVersion = h.toLowerCase().split("version/")[1].split(" ")[0]),
                    (u.webView =
                        !(
                            !(b || v || g) ||
                            (!h.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone)
                        ) ||
                        (t.matchMedia && t.matchMedia("(display-mode: standalone)").matches)),
                    (u.webview = u.webView),
                    (u.standalone = u.webView),
                    (u.desktop = !(u.ios || u.android) || C),
                u.desktop &&
                ((u.electron = C),
                    (u.macos = S),
                    (u.windows = T),
                u.macos && (u.os = "macos"),
                u.windows && (u.os = "windows")),
                    (u.pixelRatio = t.devicePixelRatio || 1),
                    u);

        function z(i) {
            var s = this.touchEventsData,
                a = this.params,
                o = this.touches;
            if (!this.animating || !a.preventInteractionOnTransition) {
                var l = i;
                l.originalEvent && (l = l.originalEvent);
                var c = n(l.target);
                if (
                    ("wrapper" !== a.touchEventsTarget ||
                        c.closest(this.wrapperEl).length) &&
                    ((s.isTouchEvent = "touchstart" === l.type),
                    (s.isTouchEvent || !("which" in l) || 3 !== l.which) &&
                    !(
                        (!s.isTouchEvent && "button" in l && l.button > 0) ||
                        (s.isTouched && s.isMoved)
                    ))
                )
                    if (
                        a.noSwiping &&
                        c.closest(
                            a.noSwipingSelector ? a.noSwipingSelector : "." + a.noSwipingClass
                        )[0]
                    )
                        this.allowClick = !0;
                    else if (!a.swipeHandler || c.closest(a.swipeHandler)[0]) {
                        (o.currentX =
                            "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
                            (o.currentY =
                                "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
                        var d = o.currentX,
                            h = o.currentY,
                            u = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                            p = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                        if (!u || !(d <= p || d >= t.screen.width - p)) {
                            if (
                                (r.extend(s, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0,
                                }),
                                    (o.startX = d),
                                    (o.startY = h),
                                    (s.touchStartTime = r.now()),
                                    (this.allowClick = !0),
                                    this.updateSize(),
                                    (this.swipeDirection = void 0),
                                a.threshold > 0 && (s.allowThresholdMove = !1),
                                "touchstart" !== l.type)
                            ) {
                                var f = !0;
                                c.is(s.formElements) && (f = !1),
                                e.activeElement &&
                                n(e.activeElement).is(s.formElements) &&
                                e.activeElement !== c[0] &&
                                e.activeElement.blur();
                                var m = f && this.allowTouchMove && a.touchStartPreventDefault;
                                (a.touchStartForcePreventDefault || m) && l.preventDefault();
                            }
                            this.emit("touchStart", l);
                        }
                    }
            }
        }

        function D(t) {
            var i = this.touchEventsData,
                s = this.params,
                a = this.touches,
                o = this.rtlTranslate,
                l = t;
            if ((l.originalEvent && (l = l.originalEvent), i.isTouched)) {
                if (!i.isTouchEvent || "mousemove" !== l.type) {
                    var c =
                        "touchmove" === l.type &&
                        l.targetTouches &&
                        (l.targetTouches[0] || l.changedTouches[0]),
                        d = "touchmove" === l.type ? c.pageX : l.pageX,
                        h = "touchmove" === l.type ? c.pageY : l.pageY;
                    if (l.preventedByNestedSwiper)
                        return (a.startX = d), void (a.startY = h);
                    if (!this.allowTouchMove)
                        return (
                            (this.allowClick = !1),
                                void (
                                    i.isTouched &&
                                    (r.extend(a, {
                                        startX: d,
                                        startY: h,
                                        currentX: d,
                                        currentY: h,
                                    }),
                                        (i.touchStartTime = r.now()))
                                )
                        );
                    if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                        if (this.isVertical()) {
                            if (
                                (h < a.startY && this.translate <= this.maxTranslate()) ||
                                (h > a.startY && this.translate >= this.minTranslate())
                            )
                                return (i.isTouched = !1), void (i.isMoved = !1);
                        } else if (
                            (d < a.startX && this.translate <= this.maxTranslate()) ||
                            (d > a.startX && this.translate >= this.minTranslate())
                        )
                            return;
                    if (
                        i.isTouchEvent &&
                        e.activeElement &&
                        l.target === e.activeElement &&
                        n(l.target).is(i.formElements)
                    )
                        return (i.isMoved = !0), void (this.allowClick = !1);
                    if (
                        (i.allowTouchCallbacks && this.emit("touchMove", l),
                            !(l.targetTouches && l.targetTouches.length > 1))
                    ) {
                        (a.currentX = d), (a.currentY = h);
                        var u,
                            p = a.currentX - a.startX,
                            f = a.currentY - a.startY;
                        if (
                            !(
                                this.params.threshold &&
                                Math.sqrt(Math.pow(p, 2) + Math.pow(f, 2)) <
                                this.params.threshold
                            )
                        )
                            if (
                                (void 0 === i.isScrolling &&
                                ((this.isHorizontal() && a.currentY === a.startY) ||
                                (this.isVertical() && a.currentX === a.startX)
                                    ? (i.isScrolling = !1)
                                    : p * p + f * f >= 25 &&
                                    ((u =
                                        (180 * Math.atan2(Math.abs(f), Math.abs(p))) / Math.PI),
                                        (i.isScrolling = this.isHorizontal()
                                            ? u > s.touchAngle
                                            : 90 - u > s.touchAngle))),
                                i.isScrolling && this.emit("touchMoveOpposite", l),
                                void 0 === i.startMoving &&
                                ((a.currentX === a.startX && a.currentY === a.startY) ||
                                    (i.startMoving = !0)),
                                    i.isScrolling)
                            )
                                i.isTouched = !1;
                            else if (i.startMoving) {
                                (this.allowClick = !1),
                                s.cssMode || l.preventDefault(),
                                s.touchMoveStopPropagation &&
                                !s.nested &&
                                l.stopPropagation(),
                                i.isMoved ||
                                (s.loop && this.loopFix(),
                                    (i.startTranslate = this.getTranslate()),
                                    this.setTransition(0),
                                this.animating &&
                                this.$wrapperEl.trigger(
                                    "webkitTransitionEnd transitionend"
                                ),
                                    (i.allowMomentumBounce = !1),
                                !s.grabCursor ||
                                (!0 !== this.allowSlideNext &&
                                    !0 !== this.allowSlidePrev) ||
                                this.setGrabCursor(!0),
                                    this.emit("sliderFirstMove", l)),
                                    this.emit("sliderMove", l),
                                    (i.isMoved = !0);
                                var m = this.isHorizontal() ? p : f;
                                (a.diff = m),
                                    (m *= s.touchRatio),
                                o && (m = -m),
                                    (this.swipeDirection = m > 0 ? "prev" : "next"),
                                    (i.currentTranslate = m + i.startTranslate);
                                var v = !0,
                                    g = s.resistanceRatio;
                                if (
                                    (s.touchReleaseOnEdges && (g = 0),
                                        m > 0 && i.currentTranslate > this.minTranslate()
                                            ? ((v = !1),
                                            s.resistance &&
                                            (i.currentTranslate =
                                                this.minTranslate() -
                                                1 +
                                                Math.pow(
                                                    -this.minTranslate() + i.startTranslate + m,
                                                    g
                                                )))
                                            : m < 0 &&
                                            i.currentTranslate < this.maxTranslate() &&
                                            ((v = !1),
                                            s.resistance &&
                                            (i.currentTranslate =
                                                this.maxTranslate() +
                                                1 -
                                                Math.pow(
                                                    this.maxTranslate() - i.startTranslate - m,
                                                    g
                                                ))),
                                    v && (l.preventedByNestedSwiper = !0),
                                    !this.allowSlideNext &&
                                    "next" === this.swipeDirection &&
                                    i.currentTranslate < i.startTranslate &&
                                    (i.currentTranslate = i.startTranslate),
                                    !this.allowSlidePrev &&
                                    "prev" === this.swipeDirection &&
                                    i.currentTranslate > i.startTranslate &&
                                    (i.currentTranslate = i.startTranslate),
                                    s.threshold > 0)
                                ) {
                                    if (!(Math.abs(m) > s.threshold || i.allowThresholdMove))
                                        return void (i.currentTranslate = i.startTranslate);
                                    if (!i.allowThresholdMove)
                                        return (
                                            (i.allowThresholdMove = !0),
                                                (a.startX = a.currentX),
                                                (a.startY = a.currentY),
                                                (i.currentTranslate = i.startTranslate),
                                                void (a.diff = this.isHorizontal()
                                                    ? a.currentX - a.startX
                                                    : a.currentY - a.startY)
                                        );
                                }
                                s.followFinger &&
                                !s.cssMode &&
                                ((s.freeMode ||
                                    s.watchSlidesProgress ||
                                    s.watchSlidesVisibility) &&
                                (this.updateActiveIndex(), this.updateSlidesClasses()),
                                s.freeMode &&
                                (0 === i.velocities.length &&
                                i.velocities.push({
                                    position: a[this.isHorizontal() ? "startX" : "startY"],
                                    time: i.touchStartTime,
                                }),
                                    i.velocities.push({
                                        position:
                                            a[this.isHorizontal() ? "currentX" : "currentY"],
                                        time: r.now(),
                                    })),
                                    this.updateProgress(i.currentTranslate),
                                    this.setTranslate(i.currentTranslate));
                            }
                    }
                }
            } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l);
        }

        function I(e) {
            var t = this,
                i = t.touchEventsData,
                n = t.params,
                s = t.touches,
                a = t.rtlTranslate,
                o = t.$wrapperEl,
                l = t.slidesGrid,
                c = t.snapGrid,
                d = e;
            if (
                (d.originalEvent && (d = d.originalEvent),
                i.allowTouchCallbacks && t.emit("touchEnd", d),
                    (i.allowTouchCallbacks = !1),
                    !i.isTouched)
            )
                return (
                    i.isMoved && n.grabCursor && t.setGrabCursor(!1),
                        (i.isMoved = !1),
                        void (i.startMoving = !1)
                );
            n.grabCursor &&
            i.isMoved &&
            i.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
            var h,
                u = r.now(),
                p = u - i.touchStartTime;
            if (
                (t.allowClick &&
                (t.updateClickedSlide(d),
                    t.emit("tap click", d),
                p < 300 &&
                u - i.lastClickTime < 300 &&
                t.emit("doubleTap doubleClick", d)),
                    (i.lastClickTime = r.now()),
                    r.nextTick(function () {
                        t.destroyed || (t.allowClick = !0);
                    }),
                !i.isTouched ||
                !i.isMoved ||
                !t.swipeDirection ||
                0 === s.diff ||
                i.currentTranslate === i.startTranslate)
            )
                return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
            if (
                ((i.isTouched = !1),
                    (i.isMoved = !1),
                    (i.startMoving = !1),
                    (h = n.followFinger
                        ? a
                            ? t.translate
                            : -t.translate
                        : -i.currentTranslate),
                    !n.cssMode)
            )
                if (n.freeMode) {
                    if (h < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                    if (h > -t.maxTranslate())
                        return void (t.slides.length < c.length
                            ? t.slideTo(c.length - 1)
                            : t.slideTo(t.slides.length - 1));
                    if (n.freeModeMomentum) {
                        if (i.velocities.length > 1) {
                            var f = i.velocities.pop(),
                                m = i.velocities.pop(),
                                v = f.position - m.position,
                                g = f.time - m.time;
                            (t.velocity = v / g),
                                (t.velocity /= 2),
                            Math.abs(t.velocity) < n.freeModeMinimumVelocity &&
                            (t.velocity = 0),
                            (g > 150 || r.now() - f.time > 300) && (t.velocity = 0);
                        } else t.velocity = 0;
                        (t.velocity *= n.freeModeMomentumVelocityRatio),
                            (i.velocities.length = 0);
                        var b = 1e3 * n.freeModeMomentumRatio,
                            y = t.velocity * b,
                            x = t.translate + y;
                        a && (x = -x);
                        var w,
                            T,
                            C = !1,
                            S = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                        if (x < t.maxTranslate())
                            n.freeModeMomentumBounce
                                ? (x + t.maxTranslate() < -S && (x = t.maxTranslate() - S),
                                    (w = t.maxTranslate()),
                                    (C = !0),
                                    (i.allowMomentumBounce = !0))
                                : (x = t.maxTranslate()),
                            n.loop && n.centeredSlides && (T = !0);
                        else if (x > t.minTranslate())
                            n.freeModeMomentumBounce
                                ? (x - t.minTranslate() > S && (x = t.minTranslate() + S),
                                    (w = t.minTranslate()),
                                    (C = !0),
                                    (i.allowMomentumBounce = !0))
                                : (x = t.minTranslate()),
                            n.loop && n.centeredSlides && (T = !0);
                        else if (n.freeModeSticky) {
                            for (var E, P = 0; P < c.length; P += 1)
                                if (c[P] > -x) {
                                    E = P;
                                    break;
                                }
                            x = -(x =
                                Math.abs(c[E] - x) < Math.abs(c[E - 1] - x) ||
                                "next" === t.swipeDirection
                                    ? c[E]
                                    : c[E - 1]);
                        }
                        if (
                            (T &&
                            t.once("transitionEnd", function () {
                                t.loopFix();
                            }),
                            0 !== t.velocity)
                        ) {
                            if (
                                ((b = a
                                    ? Math.abs((-x - t.translate) / t.velocity)
                                    : Math.abs((x - t.translate) / t.velocity)),
                                    n.freeModeSticky)
                            ) {
                                var M = Math.abs((a ? -x : x) - t.translate),
                                    k = t.slidesSizesGrid[t.activeIndex];
                                b = M < k ? n.speed : M < 2 * k ? 1.5 * n.speed : 2.5 * n.speed;
                            }
                        } else if (n.freeModeSticky) return void t.slideToClosest();
                        n.freeModeMomentumBounce && C
                            ? (t.updateProgress(w),
                                t.setTransition(b),
                                t.setTranslate(x),
                                t.transitionStart(!0, t.swipeDirection),
                                (t.animating = !0),
                                o.transitionEnd(function () {
                                    t &&
                                    !t.destroyed &&
                                    i.allowMomentumBounce &&
                                    (t.emit("momentumBounce"),
                                        t.setTransition(n.speed),
                                        t.setTranslate(w),
                                        o.transitionEnd(function () {
                                            t && !t.destroyed && t.transitionEnd();
                                        }));
                                }))
                            : t.velocity
                            ? (t.updateProgress(x),
                                t.setTransition(b),
                                t.setTranslate(x),
                                t.transitionStart(!0, t.swipeDirection),
                            t.animating ||
                            ((t.animating = !0),
                                o.transitionEnd(function () {
                                    t && !t.destroyed && t.transitionEnd();
                                })))
                            : t.updateProgress(x),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses();
                    } else if (n.freeModeSticky) return void t.slideToClosest();
                    (!n.freeModeMomentum || p >= n.longSwipesMs) &&
                    (t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses());
                } else {
                    for (
                        var $ = 0, L = t.slidesSizesGrid[0], A = 0;
                        A < l.length;
                        A += A < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
                    ) {
                        var z = A < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                        void 0 !== l[A + z]
                            ? h >= l[A] && h < l[A + z] && (($ = A), (L = l[A + z] - l[A]))
                            : h >= l[A] && (($ = A), (L = l[l.length - 1] - l[l.length - 2]));
                    }
                    var D = (h - l[$]) / L,
                        I = $ < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                    if (p > n.longSwipesMs) {
                        if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection &&
                        (D >= n.longSwipesRatio ? t.slideTo($ + I) : t.slideTo($)),
                        "prev" === t.swipeDirection &&
                        (D > 1 - n.longSwipesRatio ? t.slideTo($ + I) : t.slideTo($));
                    } else {
                        if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                        !t.navigation ||
                        (d.target !== t.navigation.nextEl &&
                            d.target !== t.navigation.prevEl)
                            ? ("next" === t.swipeDirection && t.slideTo($ + I),
                            "prev" === t.swipeDirection && t.slideTo($))
                            : d.target === t.navigation.nextEl
                            ? t.slideTo($ + I)
                            : t.slideTo($);
                    }
                }
        }

        function O() {
            var e = this.params,
                t = this.el;
            if (!t || 0 !== t.offsetWidth) {
                e.breakpoints && this.setBreakpoint();
                var i = this.allowSlideNext,
                    n = this.allowSlidePrev,
                    s = this.snapGrid;
                (this.allowSlideNext = !0),
                    (this.allowSlidePrev = !0),
                    this.updateSize(),
                    this.updateSlides(),
                    this.updateSlidesClasses(),
                    ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
                    this.isEnd &&
                    !this.params.centeredSlides
                        ? this.slideTo(this.slides.length - 1, 0, !1, !0)
                        : this.slideTo(this.activeIndex, 0, !1, !0),
                this.autoplay &&
                this.autoplay.running &&
                this.autoplay.paused &&
                this.autoplay.run(),
                    (this.allowSlidePrev = n),
                    (this.allowSlideNext = i),
                this.params.watchOverflow &&
                s !== this.snapGrid &&
                this.checkOverflow();
            }
        }

        var N = !1;

        function H() {
        }

        var j = {
                init: !0,
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                cssMode: !1,
                updateOnWindowResize: !0,
                preventInteractionOnTransition: !1,
                edgeSwipeDetection: !1,
                edgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: 0.02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                slidesPerGroupSkip: 0,
                centeredSlides: !1,
                centeredSlidesBounds: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                normalizeSlideIndex: !0,
                centerInsufficientSlides: !1,
                watchOverflow: !1,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: 0.5,
                longSwipesMs: 300,
                followFinger: !0,
                allowTouchMove: !0,
                threshold: 0,
                touchMoveStopPropagation: !1,
                touchStartPreventDefault: !0,
                touchStartForcePreventDefault: !1,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                resistance: !0,
                resistanceRatio: 0.85,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                loopFillGroupWithBlank: !1,
                allowSlidePrev: !0,
                allowSlideNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                noSwipingSelector: null,
                passiveListeners: !0,
                containerModifierClass: "swiper-container-",
                slideClass: "swiper-slide",
                slideBlankClass: "swiper-slide-invisible-blank",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                runCallbacksOnInit: !0,
            },
            q = {
                update: E,
                translate: P,
                transition: {
                    setTransition: function (e, t) {
                        this.params.cssMode || this.$wrapperEl.transition(e),
                            this.emit("setTransition", e, t);
                    },
                    transitionStart: function (e, t) {
                        void 0 === e && (e = !0);
                        var i = this.activeIndex,
                            n = this.params,
                            s = this.previousIndex;
                        if (!n.cssMode) {
                            n.autoHeight && this.updateAutoHeight();
                            var a = t;
                            if (
                                (a || (a = i > s ? "next" : i < s ? "prev" : "reset"),
                                    this.emit("transitionStart"),
                                e && i !== s)
                            ) {
                                if ("reset" === a)
                                    return void this.emit("slideResetTransitionStart");
                                this.emit("slideChangeTransitionStart"),
                                    "next" === a
                                        ? this.emit("slideNextTransitionStart")
                                        : this.emit("slidePrevTransitionStart");
                            }
                        }
                    },
                    transitionEnd: function (e, t) {
                        void 0 === e && (e = !0);
                        var i = this.activeIndex,
                            n = this.previousIndex,
                            s = this.params;
                        if (((this.animating = !1), !s.cssMode)) {
                            this.setTransition(0);
                            var a = t;
                            if (
                                (a || (a = i > n ? "next" : i < n ? "prev" : "reset"),
                                    this.emit("transitionEnd"),
                                e && i !== n)
                            ) {
                                if ("reset" === a)
                                    return void this.emit("slideResetTransitionEnd");
                                this.emit("slideChangeTransitionEnd"),
                                    "next" === a
                                        ? this.emit("slideNextTransitionEnd")
                                        : this.emit("slidePrevTransitionEnd");
                            }
                        }
                    },
                },
                slide: M,
                loop: k,
                grabCursor: $,
                manipulation: L,
                events: {
                    attachEvents: function () {
                        var t = this.params,
                            i = this.touchEvents,
                            n = this.el,
                            s = this.wrapperEl;
                        (this.onTouchStart = z.bind(this)),
                            (this.onTouchMove = D.bind(this)),
                            (this.onTouchEnd = I.bind(this)),
                        t.cssMode &&
                        (this.onScroll = function () {
                            var e = this.wrapperEl;
                            (this.previousTranslate = this.translate),
                                (this.translate = this.isHorizontal()
                                    ? -e.scrollLeft
                                    : -e.scrollTop),
                            -0 === this.translate && (this.translate = 0),
                                this.updateActiveIndex(),
                                this.updateSlidesClasses();
                            var t = this.maxTranslate() - this.minTranslate();
                            (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !==
                            this.progress && this.updateProgress(this.translate),
                                this.emit("setTranslate", this.translate, !1);
                        }.bind(this)),
                            (this.onClick = function (e) {
                                this.allowClick ||
                                (this.params.preventClicks && e.preventDefault(),
                                this.params.preventClicksPropagation &&
                                this.animating &&
                                (e.stopPropagation(), e.stopImmediatePropagation()));
                            }.bind(this));
                        var a = !!t.nested;
                        if (!o.touch && o.pointerEvents)
                            n.addEventListener(i.start, this.onTouchStart, !1),
                                e.addEventListener(i.move, this.onTouchMove, a),
                                e.addEventListener(i.end, this.onTouchEnd, !1);
                        else {
                            if (o.touch) {
                                var r = !(
                                    "touchstart" !== i.start ||
                                    !o.passiveListener ||
                                    !t.passiveListeners
                                ) && {passive: !0, capture: !1};
                                n.addEventListener(i.start, this.onTouchStart, r),
                                    n.addEventListener(
                                        i.move,
                                        this.onTouchMove,
                                        o.passiveListener ? {passive: !1, capture: a} : a
                                    ),
                                    n.addEventListener(i.end, this.onTouchEnd, r),
                                i.cancel && n.addEventListener(i.cancel, this.onTouchEnd, r),
                                N || (e.addEventListener("touchstart", H), (N = !0));
                            }
                            ((t.simulateTouch && !A.ios && !A.android) ||
                                (t.simulateTouch && !o.touch && A.ios)) &&
                            (n.addEventListener("mousedown", this.onTouchStart, !1),
                                e.addEventListener("mousemove", this.onTouchMove, a),
                                e.addEventListener("mouseup", this.onTouchEnd, !1));
                        }
                        (t.preventClicks || t.preventClicksPropagation) &&
                        n.addEventListener("click", this.onClick, !0),
                        t.cssMode && s.addEventListener("scroll", this.onScroll),
                            t.updateOnWindowResize
                                ? this.on(
                                A.ios || A.android
                                    ? "resize orientationchange observerUpdate"
                                    : "resize observerUpdate",
                                O,
                                !0
                                )
                                : this.on("observerUpdate", O, !0);
                    },
                    detachEvents: function () {
                        var t = this.params,
                            i = this.touchEvents,
                            n = this.el,
                            s = this.wrapperEl,
                            a = !!t.nested;
                        if (!o.touch && o.pointerEvents)
                            n.removeEventListener(i.start, this.onTouchStart, !1),
                                e.removeEventListener(i.move, this.onTouchMove, a),
                                e.removeEventListener(i.end, this.onTouchEnd, !1);
                        else {
                            if (o.touch) {
                                var r = !(
                                    "onTouchStart" !== i.start ||
                                    !o.passiveListener ||
                                    !t.passiveListeners
                                ) && {passive: !0, capture: !1};
                                n.removeEventListener(i.start, this.onTouchStart, r),
                                    n.removeEventListener(i.move, this.onTouchMove, a),
                                    n.removeEventListener(i.end, this.onTouchEnd, r),
                                i.cancel &&
                                n.removeEventListener(i.cancel, this.onTouchEnd, r);
                            }
                            ((t.simulateTouch && !A.ios && !A.android) ||
                                (t.simulateTouch && !o.touch && A.ios)) &&
                            (n.removeEventListener("mousedown", this.onTouchStart, !1),
                                e.removeEventListener("mousemove", this.onTouchMove, a),
                                e.removeEventListener("mouseup", this.onTouchEnd, !1));
                        }
                        (t.preventClicks || t.preventClicksPropagation) &&
                        n.removeEventListener("click", this.onClick, !0),
                        t.cssMode && s.removeEventListener("scroll", this.onScroll),
                            this.off(
                                A.ios || A.android
                                    ? "resize orientationchange observerUpdate"
                                    : "resize observerUpdate",
                                O
                            );
                    },
                },
                breakpoints: {
                    setBreakpoint: function () {
                        var e = this.activeIndex,
                            t = this.initialized,
                            i = this.loopedSlides;
                        void 0 === i && (i = 0);
                        var n = this.params,
                            s = this.$el,
                            a = n.breakpoints;
                        if (a && (!a || 0 !== Object.keys(a).length)) {
                            var o = this.getBreakpoint(a);
                            if (o && this.currentBreakpoint !== o) {
                                var l = o in a ? a[o] : void 0;
                                l &&
                                [
                                    "slidesPerView",
                                    "spaceBetween",
                                    "slidesPerGroup",
                                    "slidesPerGroupSkip",
                                    "slidesPerColumn",
                                ].forEach(function (e) {
                                    var t = l[e];
                                    void 0 !== t &&
                                    (l[e] =
                                        "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                                            ? "slidesPerView" === e
                                            ? parseFloat(t)
                                            : parseInt(t, 10)
                                            : "auto");
                                });
                                var c = l || this.originalParams,
                                    d = n.slidesPerColumn > 1,
                                    h = c.slidesPerColumn > 1;
                                d && !h
                                    ? s.removeClass(
                                    n.containerModifierClass +
                                    "multirow " +
                                    n.containerModifierClass +
                                    "multirow-column"
                                    )
                                    : !d &&
                                    h &&
                                    (s.addClass(n.containerModifierClass + "multirow"),
                                    "column" === c.slidesPerColumnFill &&
                                    s.addClass(n.containerModifierClass + "multirow-column"));
                                var u = c.direction && c.direction !== n.direction,
                                    p = n.loop && (c.slidesPerView !== n.slidesPerView || u);
                                u && t && this.changeDirection(),
                                    r.extend(this.params, c),
                                    r.extend(this, {
                                        allowTouchMove: this.params.allowTouchMove,
                                        allowSlideNext: this.params.allowSlideNext,
                                        allowSlidePrev: this.params.allowSlidePrev,
                                    }),
                                    (this.currentBreakpoint = o),
                                p &&
                                t &&
                                (this.loopDestroy(),
                                    this.loopCreate(),
                                    this.updateSlides(),
                                    this.slideTo(e - i + this.loopedSlides, 0, !1)),
                                    this.emit("breakpoint", c);
                            }
                        }
                    },
                    getBreakpoint: function (e) {
                        if (e) {
                            var i = !1,
                                n = Object.keys(e).map(function (e) {
                                    if ("string" == typeof e && e.startsWith("@")) {
                                        var i = parseFloat(e.substr(1));
                                        return {value: t.innerHeight * i, point: e};
                                    }
                                    return {value: e, point: e};
                                });
                            n.sort(function (e, t) {
                                return parseInt(e.value, 10) - parseInt(t.value, 10);
                            });
                            for (var s = 0; s < n.length; s += 1) {
                                var a = n[s],
                                    r = a.point;
                                a.value <= t.innerWidth && (i = r);
                            }
                            return i || "max";
                        }
                    },
                },
                checkOverflow: {
                    checkOverflow: function () {
                        var e = this.params,
                            t = this.isLocked,
                            i =
                                this.slides.length > 0 &&
                                e.slidesOffsetBefore +
                                e.spaceBetween * (this.slides.length - 1) +
                                this.slides[0].offsetWidth * this.slides.length;
                        e.slidesOffsetBefore && e.slidesOffsetAfter && i
                            ? (this.isLocked = i <= this.size)
                            : (this.isLocked = 1 === this.snapGrid.length),
                            (this.allowSlideNext = !this.isLocked),
                            (this.allowSlidePrev = !this.isLocked),
                        t !== this.isLocked &&
                        this.emit(this.isLocked ? "lock" : "unlock"),
                        t &&
                        t !== this.isLocked &&
                        ((this.isEnd = !1), this.navigation.update());
                    },
                },
                classes: {
                    addClasses: function () {
                        var e = this.classNames,
                            t = this.params,
                            i = this.rtl,
                            n = this.$el,
                            s = [];
                        s.push("initialized"),
                            s.push(t.direction),
                        t.freeMode && s.push("free-mode"),
                        t.autoHeight && s.push("autoheight"),
                        i && s.push("rtl"),
                        t.slidesPerColumn > 1 &&
                        (s.push("multirow"),
                        "column" === t.slidesPerColumnFill &&
                        s.push("multirow-column")),
                        A.android && s.push("android"),
                        A.ios && s.push("ios"),
                        t.cssMode && s.push("css-mode"),
                            s.forEach(function (i) {
                                e.push(t.containerModifierClass + i);
                            }),
                            n.addClass(e.join(" "));
                    },
                    removeClasses: function () {
                        var e = this.$el,
                            t = this.classNames;
                        e.removeClass(t.join(" "));
                    },
                },
                images: {
                    loadImage: function (e, i, n, s, a, r) {
                        var o;

                        function l() {
                            r && r();
                        }

                        e.complete && a
                            ? l()
                            : i
                            ? (((o = new t.Image()).onload = l),
                                (o.onerror = l),
                            s && (o.sizes = s),
                            n && (o.srcset = n),
                            i && (o.src = i))
                            : l();
                    },
                    preloadImages: function () {
                        var e = this;

                        function t() {
                            null != e &&
                            e &&
                            !e.destroyed &&
                            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                            e.imagesLoaded === e.imagesToLoad.length &&
                            (e.params.updateOnImagesReady && e.update(),
                                e.emit("imagesReady")));
                        }

                        e.imagesToLoad = e.$el.find("img");
                        for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                            var n = e.imagesToLoad[i];
                            e.loadImage(
                                n,
                                n.currentSrc || n.getAttribute("src"),
                                n.srcset || n.getAttribute("srcset"),
                                n.sizes || n.getAttribute("sizes"),
                                !0,
                                t
                            );
                        }
                    },
                },
            },
            R = {},
            F = (function (e) {
                function t() {
                    for (var i, s, a, l = [], c = arguments.length; c--;)
                        l[c] = arguments[c];
                    1 === l.length && l[0].constructor && l[0].constructor === Object
                        ? (a = l[0])
                        : ((s = (i = l)[0]), (a = i[1])),
                    a || (a = {}),
                        (a = r.extend({}, a)),
                    s && !a.el && (a.el = s),
                        e.call(this, a),
                        Object.keys(q).forEach(function (e) {
                            Object.keys(q[e]).forEach(function (i) {
                                t.prototype[i] || (t.prototype[i] = q[e][i]);
                            });
                        });
                    var d = this;
                    void 0 === d.modules && (d.modules = {}),
                        Object.keys(d.modules).forEach(function (e) {
                            var t = d.modules[e];
                            if (t.params) {
                                var i = Object.keys(t.params)[0],
                                    n = t.params[i];
                                if ("object" != typeof n || null === n) return;
                                if (!(i in a && "enabled" in n)) return;
                                !0 === a[i] && (a[i] = {enabled: !0}),
                                "object" != typeof a[i] ||
                                "enabled" in a[i] ||
                                (a[i].enabled = !0),
                                a[i] || (a[i] = {enabled: !1});
                            }
                        });
                    var h = r.extend({}, j);
                    d.useModulesParams(h),
                        (d.params = r.extend({}, h, R, a)),
                        (d.originalParams = r.extend({}, d.params)),
                        (d.passedParams = r.extend({}, a)),
                        (d.$ = n);
                    var u = n(d.params.el);
                    if ((s = u[0])) {
                        if (u.length > 1) {
                            var p = [];
                            return (
                                u.each(function (e, i) {
                                    var n = r.extend({}, a, {el: i});
                                    p.push(new t(n));
                                }),
                                    p
                            );
                        }
                        var f, m, v;
                        return (
                            (s.swiper = d),
                                u.data("swiper", d),
                                s && s.shadowRoot && s.shadowRoot.querySelector
                                    ? ((f = n(
                                    s.shadowRoot.querySelector("." + d.params.wrapperClass)
                                    )).children = function (e) {
                                        return u.children(e);
                                    })
                                    : (f = u.children("." + d.params.wrapperClass)),
                                r.extend(d, {
                                    $el: u,
                                    el: s,
                                    $wrapperEl: f,
                                    wrapperEl: f[0],
                                    classNames: [],
                                    slides: n(),
                                    slidesGrid: [],
                                    snapGrid: [],
                                    slidesSizesGrid: [],
                                    isHorizontal: function () {
                                        return "horizontal" === d.params.direction;
                                    },
                                    isVertical: function () {
                                        return "vertical" === d.params.direction;
                                    },
                                    rtl:
                                        "rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction"),
                                    rtlTranslate:
                                        "horizontal" === d.params.direction &&
                                        ("rtl" === s.dir.toLowerCase() ||
                                            "rtl" === u.css("direction")),
                                    wrongRTL: "-webkit-box" === f.css("display"),
                                    activeIndex: 0,
                                    realIndex: 0,
                                    isBeginning: !0,
                                    isEnd: !1,
                                    translate: 0,
                                    previousTranslate: 0,
                                    progress: 0,
                                    velocity: 0,
                                    animating: !1,
                                    allowSlideNext: d.params.allowSlideNext,
                                    allowSlidePrev: d.params.allowSlidePrev,
                                    touchEvents:
                                        ((m = ["touchstart", "touchmove", "touchend", "touchcancel"]),
                                            (v = ["mousedown", "mousemove", "mouseup"]),
                                        o.pointerEvents &&
                                        (v = ["pointerdown", "pointermove", "pointerup"]),
                                            (d.touchEventsTouch = {
                                                start: m[0],
                                                move: m[1],
                                                end: m[2],
                                                cancel: m[3],
                                            }),
                                            (d.touchEventsDesktop = {
                                                start: v[0],
                                                move: v[1],
                                                end: v[2],
                                            }),
                                            o.touch || !d.params.simulateTouch
                                                ? d.touchEventsTouch
                                                : d.touchEventsDesktop),
                                    touchEventsData: {
                                        isTouched: void 0,
                                        isMoved: void 0,
                                        allowTouchCallbacks: void 0,
                                        touchStartTime: void 0,
                                        isScrolling: void 0,
                                        currentTranslate: void 0,
                                        startTranslate: void 0,
                                        allowThresholdMove: void 0,
                                        formElements:
                                            "input, select, option, textarea, button, video",
                                        lastClickTime: r.now(),
                                        clickTimeout: void 0,
                                        velocities: [],
                                        allowMomentumBounce: void 0,
                                        isTouchEvent: void 0,
                                        startMoving: void 0,
                                    },
                                    allowClick: !0,
                                    allowTouchMove: d.params.allowTouchMove,
                                    touches: {
                                        startX: 0,
                                        startY: 0,
                                        currentX: 0,
                                        currentY: 0,
                                        diff: 0,
                                    },
                                    imagesToLoad: [],
                                    imagesLoaded: 0,
                                }),
                                d.useModules(),
                            d.params.init && d.init(),
                                d
                        );
                    }
                }

                e && (t.__proto__ = e),
                    (t.prototype = Object.create(e && e.prototype)),
                    (t.prototype.constructor = t);
                var i = {
                    extendedDefaults: {configurable: !0},
                    defaults: {configurable: !0},
                    Class: {configurable: !0},
                    $: {configurable: !0},
                };
                return (
                    (t.prototype.slidesPerViewDynamic = function () {
                        var e = this.params,
                            t = this.slides,
                            i = this.slidesGrid,
                            n = this.size,
                            s = this.activeIndex,
                            a = 1;
                        if (e.centeredSlides) {
                            for (
                                var r, o = t[s].swiperSlideSize, l = s + 1;
                                l < t.length;
                                l += 1
                            )
                                t[l] &&
                                !r &&
                                ((a += 1), (o += t[l].swiperSlideSize) > n && (r = !0));
                            for (var c = s - 1; c >= 0; c -= 1)
                                t[c] &&
                                !r &&
                                ((a += 1), (o += t[c].swiperSlideSize) > n && (r = !0));
                        } else
                            for (var d = s + 1; d < t.length; d += 1)
                                i[d] - i[s] < n && (a += 1);
                        return a;
                    }),
                        (t.prototype.update = function () {
                            var e = this;
                            if (e && !e.destroyed) {
                                var t = e.snapGrid,
                                    i = e.params;
                                i.breakpoints && e.setBreakpoint(),
                                    e.updateSize(),
                                    e.updateSlides(),
                                    e.updateProgress(),
                                    e.updateSlidesClasses(),
                                    e.params.freeMode
                                        ? (n(), e.params.autoHeight && e.updateAutoHeight())
                                        : (("auto" === e.params.slidesPerView ||
                                        e.params.slidesPerView > 1) &&
                                    e.isEnd &&
                                    !e.params.centeredSlides
                                        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                                        : e.slideTo(e.activeIndex, 0, !1, !0)) || n(),
                                i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                                    e.emit("update");
                            }

                            function n() {
                                var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                                    i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                                e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
                            }
                        }),
                        (t.prototype.changeDirection = function (e, t) {
                            void 0 === t && (t = !0);
                            var i = this.params.direction;
                            return (
                                e || (e = "horizontal" === i ? "vertical" : "horizontal"),
                                    e === i || ("horizontal" !== e && "vertical" !== e)
                                        ? this
                                        : (this.$el
                                            .removeClass("" + this.params.containerModifierClass + i)
                                            .addClass("" + this.params.containerModifierClass + e),
                                            (this.params.direction = e),
                                            this.slides.each(function (t, i) {
                                                "vertical" === e
                                                    ? (i.style.width = "")
                                                    : (i.style.height = "");
                                            }),
                                            this.emit("changeDirection"),
                                        t && this.update(),
                                            this)
                            );
                        }),
                        (t.prototype.init = function () {
                            this.initialized ||
                            (this.emit("beforeInit"),
                            this.params.breakpoints && this.setBreakpoint(),
                                this.addClasses(),
                            this.params.loop && this.loopCreate(),
                                this.updateSize(),
                                this.updateSlides(),
                            this.params.watchOverflow && this.checkOverflow(),
                            this.params.grabCursor && this.setGrabCursor(),
                            this.params.preloadImages && this.preloadImages(),
                                this.params.loop
                                    ? this.slideTo(
                                    this.params.initialSlide + this.loopedSlides,
                                    0,
                                    this.params.runCallbacksOnInit
                                    )
                                    : this.slideTo(
                                    this.params.initialSlide,
                                    0,
                                    this.params.runCallbacksOnInit
                                    ),
                                this.attachEvents(),
                                (this.initialized = !0),
                                this.emit("init"));
                        }),
                        (t.prototype.destroy = function (e, t) {
                            void 0 === e && (e = !0), void 0 === t && (t = !0);
                            var i = this,
                                n = i.params,
                                s = i.$el,
                                a = i.$wrapperEl,
                                o = i.slides;
                            return void 0 === i.params || i.destroyed
                                ? null
                                : (i.emit("beforeDestroy"),
                                    (i.initialized = !1),
                                    i.detachEvents(),
                                n.loop && i.loopDestroy(),
                                t &&
                                (i.removeClasses(),
                                    s.removeAttr("style"),
                                    a.removeAttr("style"),
                                o &&
                                o.length &&
                                o
                                    .removeClass(
                                        [
                                            n.slideVisibleClass,
                                            n.slideActiveClass,
                                            n.slideNextClass,
                                            n.slidePrevClass,
                                        ].join(" ")
                                    )
                                    .removeAttr("style")
                                    .removeAttr("data-swiper-slide-index")),
                                    i.emit("destroy"),
                                    Object.keys(i.eventsListeners).forEach(function (e) {
                                        i.off(e);
                                    }),
                                !1 !== e &&
                                ((i.$el[0].swiper = null),
                                    i.$el.data("swiper", null),
                                    r.deleteProps(i)),
                                    (i.destroyed = !0),
                                    null);
                        }),
                        (t.extendDefaults = function (e) {
                            r.extend(R, e);
                        }),
                        (i.extendedDefaults.get = function () {
                            return R;
                        }),
                        (i.defaults.get = function () {
                            return j;
                        }),
                        (i.Class.get = function () {
                            return e;
                        }),
                        (i.$.get = function () {
                            return n;
                        }),
                        Object.defineProperties(t, i),
                        t
                );
            })(l),
            B = {name: "device", proto: {device: A}, static: {device: A}},
            X = {name: "support", proto: {support: o}, static: {support: o}},
            W = {
                isEdge: !!t.navigator.userAgent.match(/Edge/g),
                isSafari: (function () {
                    var e = t.navigator.userAgent.toLowerCase();
                    return (
                        e.indexOf("safari") >= 0 &&
                        e.indexOf("chrome") < 0 &&
                        e.indexOf("android") < 0
                    );
                })(),
                isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                    t.navigator.userAgent
                ),
            },
            Y = {name: "browser", proto: {browser: W}, static: {browser: W}},
            V = {
                name: "resize",
                create: function () {
                    var e = this;
                    r.extend(e, {
                        resize: {
                            resizeHandler: function () {
                                e &&
                                !e.destroyed &&
                                e.initialized &&
                                (e.emit("beforeResize"), e.emit("resize"));
                            },
                            orientationChangeHandler: function () {
                                e &&
                                !e.destroyed &&
                                e.initialized &&
                                e.emit("orientationchange");
                            },
                        },
                    });
                },
                on: {
                    init: function () {
                        t.addEventListener("resize", this.resize.resizeHandler),
                            t.addEventListener(
                                "orientationchange",
                                this.resize.orientationChangeHandler
                            );
                    },
                    destroy: function () {
                        t.removeEventListener("resize", this.resize.resizeHandler),
                            t.removeEventListener(
                                "orientationchange",
                                this.resize.orientationChangeHandler
                            );
                    },
                },
            },
            G = {
                func: t.MutationObserver || t.WebkitMutationObserver,
                attach: function (e, i) {
                    void 0 === i && (i = {});
                    var n = this,
                        s = new (0, G.func)(function (e) {
                            if (1 !== e.length) {
                                var i = function () {
                                    n.emit("observerUpdate", e[0]);
                                };
                                t.requestAnimationFrame
                                    ? t.requestAnimationFrame(i)
                                    : t.setTimeout(i, 0);
                            } else n.emit("observerUpdate", e[0]);
                        });
                    s.observe(e, {
                        attributes: void 0 === i.attributes || i.attributes,
                        childList: void 0 === i.childList || i.childList,
                        characterData: void 0 === i.characterData || i.characterData,
                    }),
                        n.observer.observers.push(s);
                },
                init: function () {
                    if (o.observer && this.params.observer) {
                        if (this.params.observeParents)
                            for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
                                this.observer.attach(e[t]);
                        this.observer.attach(this.$el[0], {
                            childList: this.params.observeSlideChildren,
                        }),
                            this.observer.attach(this.$wrapperEl[0], {attributes: !1});
                    }
                },
                destroy: function () {
                    this.observer.observers.forEach(function (e) {
                        e.disconnect();
                    }),
                        (this.observer.observers = []);
                },
            },
            _ = {
                name: "observer",
                params: {observer: !1, observeParents: !1, observeSlideChildren: !1},
                create: function () {
                    r.extend(this, {
                        observer: {
                            init: G.init.bind(this),
                            attach: G.attach.bind(this),
                            destroy: G.destroy.bind(this),
                            observers: [],
                        },
                    });
                },
                on: {
                    init: function () {
                        this.observer.init();
                    },
                    destroy: function () {
                        this.observer.destroy();
                    },
                },
            },
            U = {
                update: function (e) {
                    var t = this,
                        i = t.params,
                        n = i.slidesPerView,
                        s = i.slidesPerGroup,
                        a = i.centeredSlides,
                        o = t.params.virtual,
                        l = o.addSlidesBefore,
                        c = o.addSlidesAfter,
                        d = t.virtual,
                        h = d.from,
                        u = d.to,
                        p = d.slides,
                        f = d.slidesGrid,
                        m = d.renderSlide,
                        v = d.offset;
                    t.updateActiveIndex();
                    var g,
                        b,
                        y,
                        x = t.activeIndex || 0;
                    (g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
                        a
                            ? ((b = Math.floor(n / 2) + s + l),
                                (y = Math.floor(n / 2) + s + c))
                            : ((b = n + (s - 1) + l), (y = s + c));
                    var w = Math.max((x || 0) - y, 0),
                        T = Math.min((x || 0) + b, p.length - 1),
                        C = (t.slidesGrid[w] || 0) - (t.slidesGrid[0] || 0);

                    function S() {
                        t.updateSlides(),
                            t.updateProgress(),
                            t.updateSlidesClasses(),
                        t.lazy && t.params.lazy.enabled && t.lazy.load();
                    }

                    if (
                        (r.extend(t.virtual, {
                            from: w,
                            to: T,
                            offset: C,
                            slidesGrid: t.slidesGrid,
                        }),
                        h === w && u === T && !e)
                    )
                        return (
                            t.slidesGrid !== f && C !== v && t.slides.css(g, C + "px"),
                                void t.updateProgress()
                        );
                    if (t.params.virtual.renderExternal)
                        return (
                            t.params.virtual.renderExternal.call(t, {
                                offset: C,
                                from: w,
                                to: T,
                                slides: (function () {
                                    for (var e = [], t = w; t <= T; t += 1) e.push(p[t]);
                                    return e;
                                })(),
                            }),
                                void S()
                        );
                    var E = [],
                        P = [];
                    if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                    else
                        for (var M = h; M <= u; M += 1)
                            (M < w || M > T) &&
                            t.$wrapperEl
                                .find(
                                    "." +
                                    t.params.slideClass +
                                    '[data-swiper-slide-index="' +
                                    M +
                                    '"]'
                                )
                                .remove();
                    for (var k = 0; k < p.length; k += 1)
                        k >= w &&
                        k <= T &&
                        (void 0 === u || e
                            ? P.push(k)
                            : (k > u && P.push(k), k < h && E.push(k)));
                    P.forEach(function (e) {
                        t.$wrapperEl.append(m(p[e], e));
                    }),
                        E.sort(function (e, t) {
                            return t - e;
                        }).forEach(function (e) {
                            t.$wrapperEl.prepend(m(p[e], e));
                        }),
                        t.$wrapperEl.children(".swiper-slide").css(g, C + "px"),
                        S();
                },
                renderSlide: function (e, t) {
                    var i = this.params.virtual;
                    if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                    var s = i.renderSlide
                        ? n(i.renderSlide.call(this, e, t))
                        : n(
                            '<div class="' +
                            this.params.slideClass +
                            '" data-swiper-slide-index="' +
                            t +
                            '">' +
                            e +
                            "</div>"
                        );
                    return (
                        s.attr("data-swiper-slide-index") ||
                        s.attr("data-swiper-slide-index", t),
                        i.cache && (this.virtual.cache[t] = s),
                            s
                    );
                },
                appendSlide: function (e) {
                    if ("object" == typeof e && "length" in e)
                        for (var t = 0; t < e.length; t += 1)
                            e[t] && this.virtual.slides.push(e[t]);
                    else this.virtual.slides.push(e);
                    this.virtual.update(!0);
                },
                prependSlide: function (e) {
                    var t = this.activeIndex,
                        i = t + 1,
                        n = 1;
                    if (Array.isArray(e)) {
                        for (var s = 0; s < e.length; s += 1)
                            e[s] && this.virtual.slides.unshift(e[s]);
                        (i = t + e.length), (n = e.length);
                    } else this.virtual.slides.unshift(e);
                    if (this.params.virtual.cache) {
                        var a = this.virtual.cache,
                            r = {};
                        Object.keys(a).forEach(function (e) {
                            var t = a[e],
                                i = t.attr("data-swiper-slide-index");
                            i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1),
                                (r[parseInt(e, 10) + n] = t);
                        }),
                            (this.virtual.cache = r);
                    }
                    this.virtual.update(!0), this.slideTo(i, 0);
                },
                removeSlide: function (e) {
                    if (null != e) {
                        var t = this.activeIndex;
                        if (Array.isArray(e))
                            for (var i = e.length - 1; i >= 0; i -= 1)
                                this.virtual.slides.splice(e[i], 1),
                                this.params.virtual.cache && delete this.virtual.cache[e[i]],
                                e[i] < t && (t -= 1),
                                    (t = Math.max(t, 0));
                        else
                            this.virtual.slides.splice(e, 1),
                            this.params.virtual.cache && delete this.virtual.cache[e],
                            e < t && (t -= 1),
                                (t = Math.max(t, 0));
                        this.virtual.update(!0), this.slideTo(t, 0);
                    }
                },
                removeAllSlides: function () {
                    (this.virtual.slides = []),
                    this.params.virtual.cache && (this.virtual.cache = {}),
                        this.virtual.update(!0),
                        this.slideTo(0, 0);
                },
            },
            K = {
                name: "virtual",
                params: {
                    virtual: {
                        enabled: !1,
                        slides: [],
                        cache: !0,
                        renderSlide: null,
                        renderExternal: null,
                        addSlidesBefore: 0,
                        addSlidesAfter: 0,
                    },
                },
                create: function () {
                    r.extend(this, {
                        virtual: {
                            update: U.update.bind(this),
                            appendSlide: U.appendSlide.bind(this),
                            prependSlide: U.prependSlide.bind(this),
                            removeSlide: U.removeSlide.bind(this),
                            removeAllSlides: U.removeAllSlides.bind(this),
                            renderSlide: U.renderSlide.bind(this),
                            slides: this.params.virtual.slides,
                            cache: {},
                        },
                    });
                },
                on: {
                    beforeInit: function () {
                        if (this.params.virtual.enabled) {
                            this.classNames.push(
                                this.params.containerModifierClass + "virtual"
                            );
                            var e = {watchSlidesProgress: !0};
                            r.extend(this.params, e),
                                r.extend(this.originalParams, e),
                            this.params.initialSlide || this.virtual.update();
                        }
                    },
                    setTranslate: function () {
                        this.params.virtual.enabled && this.virtual.update();
                    },
                },
            },
            Z = {
                handle: function (i) {
                    var n = this.rtlTranslate,
                        s = i;
                    s.originalEvent && (s = s.originalEvent);
                    var a = s.keyCode || s.charCode;
                    if (
                        !this.allowSlideNext &&
                        ((this.isHorizontal() && 39 === a) ||
                            (this.isVertical() && 40 === a) ||
                            34 === a)
                    )
                        return !1;
                    if (
                        !this.allowSlidePrev &&
                        ((this.isHorizontal() && 37 === a) ||
                            (this.isVertical() && 38 === a) ||
                            33 === a)
                    )
                        return !1;
                    if (
                        !(
                            s.shiftKey ||
                            s.altKey ||
                            s.ctrlKey ||
                            s.metaKey ||
                            (e.activeElement &&
                                e.activeElement.nodeName &&
                                ("input" === e.activeElement.nodeName.toLowerCase() ||
                                    "textarea" === e.activeElement.nodeName.toLowerCase()))
                        )
                    ) {
                        if (
                            this.params.keyboard.onlyInViewport &&
                            (33 === a ||
                                34 === a ||
                                37 === a ||
                                39 === a ||
                                38 === a ||
                                40 === a)
                        ) {
                            var r = !1;
                            if (
                                this.$el.parents("." + this.params.slideClass).length > 0 &&
                                0 ===
                                this.$el.parents("." + this.params.slideActiveClass).length
                            )
                                return;
                            var o = t.innerWidth,
                                l = t.innerHeight,
                                c = this.$el.offset();
                            n && (c.left -= this.$el[0].scrollLeft);
                            for (
                                var d = [
                                        [c.left, c.top],
                                        [c.left + this.width, c.top],
                                        [c.left, c.top + this.height],
                                        [c.left + this.width, c.top + this.height],
                                    ],
                                    h = 0;
                                h < d.length;
                                h += 1
                            ) {
                                var u = d[h];
                                u[0] >= 0 && u[0] <= o && u[1] >= 0 && u[1] <= l && (r = !0);
                            }
                            if (!r) return;
                        }
                        this.isHorizontal()
                            ? ((33 !== a && 34 !== a && 37 !== a && 39 !== a) ||
                            (s.preventDefault
                                ? s.preventDefault()
                                : (s.returnValue = !1)),
                            (((34 !== a && 39 !== a) || n) &&
                                ((33 !== a && 37 !== a) || !n)) ||
                            this.slideNext(),
                            (((33 !== a && 37 !== a) || n) &&
                                ((34 !== a && 39 !== a) || !n)) ||
                            this.slidePrev())
                            : ((33 !== a && 34 !== a && 38 !== a && 40 !== a) ||
                            (s.preventDefault
                                ? s.preventDefault()
                                : (s.returnValue = !1)),
                            (34 !== a && 40 !== a) || this.slideNext(),
                            (33 !== a && 38 !== a) || this.slidePrev()),
                            this.emit("keyPress", a);
                    }
                },
                enable: function () {
                    this.keyboard.enabled ||
                    (n(e).on("keydown", this.keyboard.handle),
                        (this.keyboard.enabled = !0));
                },
                disable: function () {
                    this.keyboard.enabled &&
                    (n(e).off("keydown", this.keyboard.handle),
                        (this.keyboard.enabled = !1));
                },
            },
            Q = {
                name: "keyboard",
                params: {keyboard: {enabled: !1, onlyInViewport: !0}},
                create: function () {
                    r.extend(this, {
                        keyboard: {
                            enabled: !1,
                            enable: Z.enable.bind(this),
                            disable: Z.disable.bind(this),
                            handle: Z.handle.bind(this),
                        },
                    });
                },
                on: {
                    init: function () {
                        this.params.keyboard.enabled && this.keyboard.enable();
                    },
                    destroy: function () {
                        this.keyboard.enabled && this.keyboard.disable();
                    },
                },
            },
            J = {
                lastScrollTime: r.now(),
                lastEventBeforeSnap: void 0,
                recentWheelEvents: [],
                event: function () {
                    return t.navigator.userAgent.indexOf("firefox") > -1
                        ? "DOMMouseScroll"
                        : (function () {
                            var t = "onwheel" in e;
                            if (!t) {
                                var i = e.createElement("div");
                                i.setAttribute("onwheel", "return;"),
                                    (t = "function" == typeof i.onwheel);
                            }
                            return (
                                !t &&
                                e.implementation &&
                                e.implementation.hasFeature &&
                                !0 !== e.implementation.hasFeature("", "") &&
                                (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                                    t
                            );
                        })()
                            ? "wheel"
                            : "mousewheel";
                },
                normalize: function (e) {
                    var t = 0,
                        i = 0,
                        n = 0,
                        s = 0;
                    return (
                        "detail" in e && (i = e.detail),
                        "wheelDelta" in e && (i = -e.wheelDelta / 120),
                        "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
                        "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                        "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
                            (n = 10 * t),
                            (s = 10 * i),
                        "deltaY" in e && (s = e.deltaY),
                        "deltaX" in e && (n = e.deltaX),
                        e.shiftKey && !n && ((n = s), (s = 0)),
                        (n || s) &&
                        e.deltaMode &&
                        (1 === e.deltaMode
                            ? ((n *= 40), (s *= 40))
                            : ((n *= 800), (s *= 800))),
                        n && !t && (t = n < 1 ? -1 : 1),
                        s && !i && (i = s < 1 ? -1 : 1),
                            {spinX: t, spinY: i, pixelX: n, pixelY: s}
                    );
                },
                handleMouseEnter: function () {
                    this.mouseEntered = !0;
                },
                handleMouseLeave: function () {
                    this.mouseEntered = !1;
                },
                handle: function (e) {
                    var t = e,
                        i = this,
                        s = i.params.mousewheel;
                    i.params.cssMode && t.preventDefault();
                    var a = i.$el;
                    if (
                        ("container" !== i.params.mousewheel.eventsTarged &&
                        (a = n(i.params.mousewheel.eventsTarged)),
                        !i.mouseEntered && !a[0].contains(t.target) && !s.releaseOnEdges)
                    )
                        return !0;
                    t.originalEvent && (t = t.originalEvent);
                    var o = 0,
                        l = i.rtlTranslate ? -1 : 1,
                        c = J.normalize(t);
                    if (s.forceToAxis)
                        if (i.isHorizontal()) {
                            if (!(Math.abs(c.pixelX) > Math.abs(c.pixelY))) return !0;
                            o = c.pixelX * l;
                        } else {
                            if (!(Math.abs(c.pixelY) > Math.abs(c.pixelX))) return !0;
                            o = c.pixelY;
                        }
                    else
                        o =
                            Math.abs(c.pixelX) > Math.abs(c.pixelY)
                                ? -c.pixelX * l
                                : -c.pixelY;
                    if (0 === o) return !0;
                    if ((s.invert && (o = -o), i.params.freeMode)) {
                        var d = {
                                time: r.now(),
                                delta: Math.abs(o),
                                direction: Math.sign(o),
                            },
                            h = i.mousewheel.lastEventBeforeSnap,
                            u =
                                h &&
                                d.time < h.time + 500 &&
                                d.delta <= h.delta &&
                                d.direction === h.direction;
                        if (!u) {
                            (i.mousewheel.lastEventBeforeSnap = void 0),
                            i.params.loop && i.loopFix();
                            var p = i.getTranslate() + o * s.sensitivity,
                                f = i.isBeginning,
                                m = i.isEnd;
                            if (
                                (p >= i.minTranslate() && (p = i.minTranslate()),
                                p <= i.maxTranslate() && (p = i.maxTranslate()),
                                    i.setTransition(0),
                                    i.setTranslate(p),
                                    i.updateProgress(),
                                    i.updateActiveIndex(),
                                    i.updateSlidesClasses(),
                                ((!f && i.isBeginning) || (!m && i.isEnd)) &&
                                i.updateSlidesClasses(),
                                    i.params.freeModeSticky)
                            ) {
                                clearTimeout(i.mousewheel.timeout),
                                    (i.mousewheel.timeout = void 0);
                                var v = i.mousewheel.recentWheelEvents;
                                v.length >= 15 && v.shift();
                                var g = v.length ? v[v.length - 1] : void 0,
                                    b = v[0];
                                if (
                                    (v.push(d),
                                    g && (d.delta > g.delta || d.direction !== g.direction))
                                )
                                    v.splice(0);
                                else if (
                                    v.length >= 15 &&
                                    d.time - b.time < 500 &&
                                    b.delta - d.delta >= 1 &&
                                    d.delta <= 6
                                ) {
                                    var y = o > 0 ? 0.8 : 0.2;
                                    (i.mousewheel.lastEventBeforeSnap = d),
                                        v.splice(0),
                                        (i.mousewheel.timeout = r.nextTick(function () {
                                            i.slideToClosest(i.params.speed, !0, void 0, y);
                                        }, 0));
                                }
                                i.mousewheel.timeout ||
                                (i.mousewheel.timeout = r.nextTick(function () {
                                    (i.mousewheel.lastEventBeforeSnap = d),
                                        v.splice(0),
                                        i.slideToClosest(i.params.speed, !0, void 0, 0.5);
                                }, 500));
                            }
                            if (
                                (u || i.emit("scroll", t),
                                i.params.autoplay &&
                                i.params.autoplayDisableOnInteraction &&
                                i.autoplay.stop(),
                                p === i.minTranslate() || p === i.maxTranslate())
                            )
                                return !0;
                        }
                    } else {
                        var x = {
                                time: r.now(),
                                delta: Math.abs(o),
                                direction: Math.sign(o),
                                raw: e,
                            },
                            w = i.mousewheel.recentWheelEvents;
                        w.length >= 2 && w.shift();
                        var T = w.length ? w[w.length - 1] : void 0;
                        if (
                            (w.push(x),
                                T
                                    ? (x.direction !== T.direction || x.delta > T.delta) &&
                                    i.mousewheel.animateSlider(x)
                                    : i.mousewheel.animateSlider(x),
                                i.mousewheel.releaseScroll(x))
                        )
                            return !0;
                    }
                    return (
                        t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1
                    );
                },
                animateSlider: function (e) {
                    return (
                        (e.delta >= 6 && r.now() - this.mousewheel.lastScrollTime < 60) ||
                        (e.direction < 0
                            ? (this.isEnd && !this.params.loop) ||
                            this.animating ||
                            (this.slideNext(), this.emit("scroll", e.raw))
                            : (this.isBeginning && !this.params.loop) ||
                            this.animating ||
                            (this.slidePrev(), this.emit("scroll", e.raw)),
                            (this.mousewheel.lastScrollTime = new t.Date().getTime()),
                            !1)
                    );
                },
                releaseScroll: function (e) {
                    var t = this.params.mousewheel;
                    if (e.direction < 0) {
                        if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0;
                    } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges)
                        return !0;
                    return !1;
                },
                enable: function () {
                    var e = J.event();
                    if (this.params.cssMode)
                        return (
                            this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0
                        );
                    if (!e) return !1;
                    if (this.mousewheel.enabled) return !1;
                    var t = this.$el;
                    return (
                        "container" !== this.params.mousewheel.eventsTarged &&
                        (t = n(this.params.mousewheel.eventsTarged)),
                            t.on("mouseenter", this.mousewheel.handleMouseEnter),
                            t.on("mouseleave", this.mousewheel.handleMouseLeave),
                            t.on(e, this.mousewheel.handle),
                            (this.mousewheel.enabled = !0),
                            !0
                    );
                },
                disable: function () {
                    var e = J.event();
                    if (this.params.cssMode)
                        return (
                            this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0
                        );
                    if (!e) return !1;
                    if (!this.mousewheel.enabled) return !1;
                    var t = this.$el;
                    return (
                        "container" !== this.params.mousewheel.eventsTarged &&
                        (t = n(this.params.mousewheel.eventsTarged)),
                            t.off(e, this.mousewheel.handle),
                            (this.mousewheel.enabled = !1),
                            !0
                    );
                },
            },
            ee = {
                update: function () {
                    var e = this.params.navigation;
                    if (!this.params.loop) {
                        var t = this.navigation,
                            i = t.$nextEl,
                            n = t.$prevEl;
                        n &&
                        n.length > 0 &&
                        (this.isBeginning
                            ? n.addClass(e.disabledClass)
                            : n.removeClass(e.disabledClass),
                            n[
                                this.params.watchOverflow && this.isLocked
                                    ? "addClass"
                                    : "removeClass"
                                ](e.lockClass)),
                        i &&
                        i.length > 0 &&
                        (this.isEnd
                            ? i.addClass(e.disabledClass)
                            : i.removeClass(e.disabledClass),
                            i[
                                this.params.watchOverflow && this.isLocked
                                    ? "addClass"
                                    : "removeClass"
                                ](e.lockClass));
                    }
                },
                onPrevClick: function (e) {
                    e.preventDefault(),
                    (this.isBeginning && !this.params.loop) || this.slidePrev();
                },
                onNextClick: function (e) {
                    e.preventDefault(),
                    (this.isEnd && !this.params.loop) || this.slideNext();
                },
                init: function () {
                    var e,
                        t,
                        i = this.params.navigation;
                    (i.nextEl || i.prevEl) &&
                    (i.nextEl &&
                    ((e = n(i.nextEl)),
                    this.params.uniqueNavElements &&
                    "string" == typeof i.nextEl &&
                    e.length > 1 &&
                    1 === this.$el.find(i.nextEl).length &&
                    (e = this.$el.find(i.nextEl))),
                    i.prevEl &&
                    ((t = n(i.prevEl)),
                    this.params.uniqueNavElements &&
                    "string" == typeof i.prevEl &&
                    t.length > 1 &&
                    1 === this.$el.find(i.prevEl).length &&
                    (t = this.$el.find(i.prevEl))),
                    e && e.length > 0 && e.on("click", this.navigation.onNextClick),
                    t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
                        r.extend(this.navigation, {
                            $nextEl: e,
                            nextEl: e && e[0],
                            $prevEl: t,
                            prevEl: t && t[0],
                        }));
                },
                destroy: function () {
                    var e = this.navigation,
                        t = e.$nextEl,
                        i = e.$prevEl;
                    t &&
                    t.length &&
                    (t.off("click", this.navigation.onNextClick),
                        t.removeClass(this.params.navigation.disabledClass)),
                    i &&
                    i.length &&
                    (i.off("click", this.navigation.onPrevClick),
                        i.removeClass(this.params.navigation.disabledClass));
                },
            },
            te = {
                update: function () {
                    var e = this.rtl,
                        t = this.params.pagination;
                    if (
                        t.el &&
                        this.pagination.el &&
                        this.pagination.$el &&
                        0 !== this.pagination.$el.length
                    ) {
                        var i,
                            s =
                                this.virtual && this.params.virtual.enabled
                                    ? this.virtual.slides.length
                                    : this.slides.length,
                            a = this.pagination.$el,
                            r = this.params.loop
                                ? Math.ceil(
                                    (s - 2 * this.loopedSlides) / this.params.slidesPerGroup
                                )
                                : this.snapGrid.length;
                        if (
                            (this.params.loop
                                ? ((i = Math.ceil(
                                    (this.activeIndex - this.loopedSlides) /
                                    this.params.slidesPerGroup
                                )) >
                                s - 1 - 2 * this.loopedSlides &&
                                (i -= s - 2 * this.loopedSlides),
                                i > r - 1 && (i -= r),
                                i < 0 &&
                                "bullets" !== this.params.paginationType &&
                                (i = r + i))
                                : (i =
                                    void 0 !== this.snapIndex
                                        ? this.snapIndex
                                        : this.activeIndex || 0),
                            "bullets" === t.type &&
                            this.pagination.bullets &&
                            this.pagination.bullets.length > 0)
                        ) {
                            var o,
                                l,
                                c,
                                d = this.pagination.bullets;
                            if (
                                (t.dynamicBullets &&
                                ((this.pagination.bulletSize = d
                                    .eq(0)
                                    [this.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                                    a.css(
                                        this.isHorizontal() ? "width" : "height",
                                        this.pagination.bulletSize * (t.dynamicMainBullets + 4) +
                                        "px"
                                    ),
                                t.dynamicMainBullets > 1 &&
                                void 0 !== this.previousIndex &&
                                ((this.pagination.dynamicBulletIndex +=
                                    i - this.previousIndex),
                                    this.pagination.dynamicBulletIndex >
                                    t.dynamicMainBullets - 1
                                        ? (this.pagination.dynamicBulletIndex =
                                        t.dynamicMainBullets - 1)
                                        : this.pagination.dynamicBulletIndex < 0 &&
                                        (this.pagination.dynamicBulletIndex = 0)),
                                    (o = i - this.pagination.dynamicBulletIndex),
                                    (c =
                                        ((l = o + (Math.min(d.length, t.dynamicMainBullets) - 1)) +
                                            o) /
                                        2)),
                                    d.removeClass(
                                        t.bulletActiveClass +
                                        " " +
                                        t.bulletActiveClass +
                                        "-next " +
                                        t.bulletActiveClass +
                                        "-next-next " +
                                        t.bulletActiveClass +
                                        "-prev " +
                                        t.bulletActiveClass +
                                        "-prev-prev " +
                                        t.bulletActiveClass +
                                        "-main"
                                    ),
                                a.length > 1)
                            )
                                d.each(function (e, s) {
                                    var a = n(s),
                                        r = a.index();
                                    r === i && a.addClass(t.bulletActiveClass),
                                    t.dynamicBullets &&
                                    (r >= o &&
                                    r <= l &&
                                    a.addClass(t.bulletActiveClass + "-main"),
                                    r === o &&
                                    a
                                        .prev()
                                        .addClass(t.bulletActiveClass + "-prev")
                                        .prev()
                                        .addClass(t.bulletActiveClass + "-prev-prev"),
                                    r === l &&
                                    a
                                        .next()
                                        .addClass(t.bulletActiveClass + "-next")
                                        .next()
                                        .addClass(t.bulletActiveClass + "-next-next"));
                                });
                            else {
                                var h = d.eq(i),
                                    u = h.index();
                                if ((h.addClass(t.bulletActiveClass), t.dynamicBullets)) {
                                    for (var p = d.eq(o), f = d.eq(l), m = o; m <= l; m += 1)
                                        d.eq(m).addClass(t.bulletActiveClass + "-main");
                                    if (this.params.loop)
                                        if (u >= d.length - t.dynamicMainBullets) {
                                            for (var v = t.dynamicMainBullets; v >= 0; v -= 1)
                                                d.eq(d.length - v).addClass(
                                                    t.bulletActiveClass + "-main"
                                                );
                                            d.eq(d.length - t.dynamicMainBullets - 1).addClass(
                                                t.bulletActiveClass + "-prev"
                                            );
                                        } else
                                            p
                                                .prev()
                                                .addClass(t.bulletActiveClass + "-prev")
                                                .prev()
                                                .addClass(t.bulletActiveClass + "-prev-prev"),
                                                f
                                                    .next()
                                                    .addClass(t.bulletActiveClass + "-next")
                                                    .next()
                                                    .addClass(t.bulletActiveClass + "-next-next");
                                    else
                                        p
                                            .prev()
                                            .addClass(t.bulletActiveClass + "-prev")
                                            .prev()
                                            .addClass(t.bulletActiveClass + "-prev-prev"),
                                            f
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next")
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next-next");
                                }
                            }
                            if (t.dynamicBullets) {
                                var g = Math.min(d.length, t.dynamicMainBullets + 4),
                                    b =
                                        (this.pagination.bulletSize * g -
                                            this.pagination.bulletSize) /
                                        2 -
                                        c * this.pagination.bulletSize,
                                    y = e ? "right" : "left";
                                d.css(this.isHorizontal() ? y : "top", b + "px");
                            }
                        }
                        if (
                            ("fraction" === t.type &&
                            (a
                                .find("." + t.currentClass)
                                .text(t.formatFractionCurrent(i + 1)),
                                a.find("." + t.totalClass).text(t.formatFractionTotal(r))),
                            "progressbar" === t.type)
                        ) {
                            var x;
                            x = t.progressbarOpposite
                                ? this.isHorizontal()
                                    ? "vertical"
                                    : "horizontal"
                                : this.isHorizontal()
                                    ? "horizontal"
                                    : "vertical";
                            var w = (i + 1) / r,
                                T = 1,
                                C = 1;
                            "horizontal" === x ? (T = w) : (C = w),
                                a
                                    .find("." + t.progressbarFillClass)
                                    .transform(
                                        "translate3d(0,0,0) scaleX(" + T + ") scaleY(" + C + ")"
                                    )
                                    .transition(this.params.speed);
                        }
                        "custom" === t.type && t.renderCustom
                            ? (a.html(t.renderCustom(this, i + 1, r)),
                                this.emit("paginationRender", this, a[0]))
                            : this.emit("paginationUpdate", this, a[0]),
                            a[
                                this.params.watchOverflow && this.isLocked
                                    ? "addClass"
                                    : "removeClass"
                                ](t.lockClass);
                    }
                },
                render: function () {
                    var e = this.params.pagination;
                    if (
                        e.el &&
                        this.pagination.el &&
                        this.pagination.$el &&
                        0 !== this.pagination.$el.length
                    ) {
                        var t =
                                this.virtual && this.params.virtual.enabled
                                    ? this.virtual.slides.length
                                    : this.slides.length,
                            i = this.pagination.$el,
                            n = "";
                        if ("bullets" === e.type) {
                            for (
                                var s = this.params.loop
                                    ? Math.ceil(
                                        (t - 2 * this.loopedSlides) / this.params.slidesPerGroup
                                    )
                                    : this.snapGrid.length,
                                    a = 0;
                                a < s;
                                a += 1
                            )
                                e.renderBullet
                                    ? (n += e.renderBullet.call(this, a, e.bulletClass))
                                    : (n +=
                                    "<" +
                                    e.bulletElement +
                                    ' class="' +
                                    e.bulletClass +
                                    '"></' +
                                    e.bulletElement +
                                    ">");
                            i.html(n),
                                (this.pagination.bullets = i.find("." + e.bulletClass));
                        }
                        "fraction" === e.type &&
                        ((n = e.renderFraction
                            ? e.renderFraction.call(this, e.currentClass, e.totalClass)
                            : '<span class="' +
                            e.currentClass +
                            '"></span> / <span class="' +
                            e.totalClass +
                            '"></span>'),
                            i.html(n)),
                        "progressbar" === e.type &&
                        ((n = e.renderProgressbar
                            ? e.renderProgressbar.call(this, e.progressbarFillClass)
                            : '<span class="' + e.progressbarFillClass + '"></span>'),
                            i.html(n)),
                        "custom" !== e.type &&
                        this.emit("paginationRender", this.pagination.$el[0]);
                    }
                },
                init: function () {
                    var e = this,
                        t = e.params.pagination;
                    if (t.el) {
                        var i = n(t.el);
                        0 !== i.length &&
                        (e.params.uniqueNavElements &&
                        "string" == typeof t.el &&
                        i.length > 1 &&
                        1 === e.$el.find(t.el).length &&
                        (i = e.$el.find(t.el)),
                        "bullets" === t.type &&
                        t.clickable &&
                        i.addClass(t.clickableClass),
                            i.addClass(t.modifierClass + t.type),
                        "bullets" === t.type &&
                        t.dynamicBullets &&
                        (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
                            (e.pagination.dynamicBulletIndex = 0),
                        t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                        "progressbar" === t.type &&
                        t.progressbarOpposite &&
                        i.addClass(t.progressbarOppositeClass),
                        t.clickable &&
                        i.on("click", "." + t.bulletClass, function (t) {
                            t.preventDefault();
                            var i = n(this).index() * e.params.slidesPerGroup;
                            e.params.loop && (i += e.loopedSlides), e.slideTo(i);
                        }),
                            r.extend(e.pagination, {$el: i, el: i[0]}));
                    }
                },
                destroy: function () {
                    var e = this.params.pagination;
                    if (
                        e.el &&
                        this.pagination.el &&
                        this.pagination.$el &&
                        0 !== this.pagination.$el.length
                    ) {
                        var t = this.pagination.$el;
                        t.removeClass(e.hiddenClass),
                            t.removeClass(e.modifierClass + e.type),
                        this.pagination.bullets &&
                        this.pagination.bullets.removeClass(e.bulletActiveClass),
                        e.clickable && t.off("click", "." + e.bulletClass);
                    }
                },
            },
            ie = {
                setTranslate: function () {
                    if (this.params.scrollbar.el && this.scrollbar.el) {
                        var e = this.scrollbar,
                            t = this.rtlTranslate,
                            i = this.progress,
                            n = e.dragSize,
                            s = e.trackSize,
                            a = e.$dragEl,
                            r = e.$el,
                            o = this.params.scrollbar,
                            l = n,
                            c = (s - n) * i;
                        t
                            ? (c = -c) > 0
                            ? ((l = n - c), (c = 0))
                            : -c + n > s && (l = s + c)
                            : c < 0
                            ? ((l = n + c), (c = 0))
                            : c + n > s && (l = s - c),
                            this.isHorizontal()
                                ? (a.transform("translate3d(" + c + "px, 0, 0)"),
                                    (a[0].style.width = l + "px"))
                                : (a.transform("translate3d(0px, " + c + "px, 0)"),
                                    (a[0].style.height = l + "px")),
                        o.hide &&
                        (clearTimeout(this.scrollbar.timeout),
                            (r[0].style.opacity = 1),
                            (this.scrollbar.timeout = setTimeout(function () {
                                (r[0].style.opacity = 0), r.transition(400);
                            }, 1e3)));
                    }
                },
                setTransition: function (e) {
                    this.params.scrollbar.el &&
                    this.scrollbar.el &&
                    this.scrollbar.$dragEl.transition(e);
                },
                updateSize: function () {
                    if (this.params.scrollbar.el && this.scrollbar.el) {
                        var e = this.scrollbar,
                            t = e.$dragEl,
                            i = e.$el;
                        (t[0].style.width = ""), (t[0].style.height = "");
                        var n,
                            s = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                            a = this.size / this.virtualSize,
                            o = a * (s / this.size);
                        (n =
                            "auto" === this.params.scrollbar.dragSize
                                ? s * a
                                : parseInt(this.params.scrollbar.dragSize, 10)),
                            this.isHorizontal()
                                ? (t[0].style.width = n + "px")
                                : (t[0].style.height = n + "px"),
                            (i[0].style.display = a >= 1 ? "none" : ""),
                        this.params.scrollbar.hide && (i[0].style.opacity = 0),
                            r.extend(e, {
                                trackSize: s,
                                divider: a,
                                moveDivider: o,
                                dragSize: n,
                            }),
                            e.$el[
                                this.params.watchOverflow && this.isLocked
                                    ? "addClass"
                                    : "removeClass"
                                ](this.params.scrollbar.lockClass);
                    }
                },
                getPointerPosition: function (e) {
                    return this.isHorizontal()
                        ? "touchstart" === e.type || "touchmove" === e.type
                            ? e.targetTouches[0].clientX
                            : e.clientX
                        : "touchstart" === e.type || "touchmove" === e.type
                            ? e.targetTouches[0].clientY
                            : e.clientY;
                },
                setDragPosition: function (e) {
                    var t,
                        i = this.scrollbar,
                        n = this.rtlTranslate,
                        s = i.$el,
                        a = i.dragSize,
                        r = i.trackSize,
                        o = i.dragStartPos;
                    (t =
                        (i.getPointerPosition(e) -
                            s.offset()[this.isHorizontal() ? "left" : "top"] -
                            (null !== o ? o : a / 2)) /
                        (r - a)),
                        (t = Math.max(Math.min(t, 1), 0)),
                    n && (t = 1 - t);
                    var l =
                        this.minTranslate() +
                        (this.maxTranslate() - this.minTranslate()) * t;
                    this.updateProgress(l),
                        this.setTranslate(l),
                        this.updateActiveIndex(),
                        this.updateSlidesClasses();
                },
                onDragStart: function (e) {
                    var t = this.params.scrollbar,
                        i = this.scrollbar,
                        n = this.$wrapperEl,
                        s = i.$el,
                        a = i.$dragEl;
                    (this.scrollbar.isTouched = !0),
                        (this.scrollbar.dragStartPos =
                            e.target === a[0] || e.target === a
                                ? i.getPointerPosition(e) -
                                e.target.getBoundingClientRect()[
                                    this.isHorizontal() ? "left" : "top"
                                    ]
                                : null),
                        e.preventDefault(),
                        e.stopPropagation(),
                        n.transition(100),
                        a.transition(100),
                        i.setDragPosition(e),
                        clearTimeout(this.scrollbar.dragTimeout),
                        s.transition(0),
                    t.hide && s.css("opacity", 1),
                    this.params.cssMode &&
                    this.$wrapperEl.css("scroll-snap-type", "none"),
                        this.emit("scrollbarDragStart", e);
                },
                onDragMove: function (e) {
                    var t = this.scrollbar,
                        i = this.$wrapperEl,
                        n = t.$el,
                        s = t.$dragEl;
                    this.scrollbar.isTouched &&
                    (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                        t.setDragPosition(e),
                        i.transition(0),
                        n.transition(0),
                        s.transition(0),
                        this.emit("scrollbarDragMove", e));
                },
                onDragEnd: function (e) {
                    var t = this.params.scrollbar,
                        i = this.scrollbar,
                        n = this.$wrapperEl,
                        s = i.$el;
                    this.scrollbar.isTouched &&
                    ((this.scrollbar.isTouched = !1),
                    this.params.cssMode &&
                    (this.$wrapperEl.css("scroll-snap-type", ""), n.transition("")),
                    t.hide &&
                    (clearTimeout(this.scrollbar.dragTimeout),
                        (this.scrollbar.dragTimeout = r.nextTick(function () {
                            s.css("opacity", 0), s.transition(400);
                        }, 1e3))),
                        this.emit("scrollbarDragEnd", e),
                    t.snapOnRelease && this.slideToClosest());
                },
                enableDraggable: function () {
                    if (this.params.scrollbar.el) {
                        var t = this.scrollbar,
                            i = this.touchEventsTouch,
                            n = this.touchEventsDesktop,
                            s = this.params,
                            a = t.$el[0],
                            r = !(!o.passiveListener || !s.passiveListeners) && {
                                passive: !1,
                                capture: !1,
                            },
                            l = !(!o.passiveListener || !s.passiveListeners) && {
                                passive: !0,
                                capture: !1,
                            };
                        o.touch
                            ? (a.addEventListener(i.start, this.scrollbar.onDragStart, r),
                                a.addEventListener(i.move, this.scrollbar.onDragMove, r),
                                a.addEventListener(i.end, this.scrollbar.onDragEnd, l))
                            : (a.addEventListener(n.start, this.scrollbar.onDragStart, r),
                                e.addEventListener(n.move, this.scrollbar.onDragMove, r),
                                e.addEventListener(n.end, this.scrollbar.onDragEnd, l));
                    }
                },
                disableDraggable: function () {
                    if (this.params.scrollbar.el) {
                        var t = this.scrollbar,
                            i = this.touchEventsTouch,
                            n = this.touchEventsDesktop,
                            s = this.params,
                            a = t.$el[0],
                            r = !(!o.passiveListener || !s.passiveListeners) && {
                                passive: !1,
                                capture: !1,
                            },
                            l = !(!o.passiveListener || !s.passiveListeners) && {
                                passive: !0,
                                capture: !1,
                            };
                        o.touch
                            ? (a.removeEventListener(i.start, this.scrollbar.onDragStart, r),
                                a.removeEventListener(i.move, this.scrollbar.onDragMove, r),
                                a.removeEventListener(i.end, this.scrollbar.onDragEnd, l))
                            : (a.removeEventListener(n.start, this.scrollbar.onDragStart, r),
                                e.removeEventListener(n.move, this.scrollbar.onDragMove, r),
                                e.removeEventListener(n.end, this.scrollbar.onDragEnd, l));
                    }
                },
                init: function () {
                    if (this.params.scrollbar.el) {
                        var e = this.scrollbar,
                            t = this.$el,
                            i = this.params.scrollbar,
                            s = n(i.el);
                        this.params.uniqueNavElements &&
                        "string" == typeof i.el &&
                        s.length > 1 &&
                        1 === t.find(i.el).length &&
                        (s = t.find(i.el));
                        var a = s.find("." + this.params.scrollbar.dragClass);
                        0 === a.length &&
                        ((a = n(
                            '<div class="' + this.params.scrollbar.dragClass + '"></div>'
                        )),
                            s.append(a)),
                            r.extend(e, {$el: s, el: s[0], $dragEl: a, dragEl: a[0]}),
                        i.draggable && e.enableDraggable();
                    }
                },
                destroy: function () {
                    this.scrollbar.disableDraggable();
                },
            },
            ne = {
                setTransform: function (e, t) {
                    var i = this.rtl,
                        s = n(e),
                        a = i ? -1 : 1,
                        r = s.attr("data-swiper-parallax") || "0",
                        o = s.attr("data-swiper-parallax-x"),
                        l = s.attr("data-swiper-parallax-y"),
                        c = s.attr("data-swiper-parallax-scale"),
                        d = s.attr("data-swiper-parallax-opacity");
                    if (
                        (o || l
                            ? ((o = o || "0"), (l = l || "0"))
                            : this.isHorizontal()
                                ? ((o = r), (l = "0"))
                                : ((l = r), (o = "0")),
                            (o =
                                o.indexOf("%") >= 0
                                    ? parseInt(o, 10) * t * a + "%"
                                    : o * t * a + "px"),
                            (l =
                                l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px"),
                        null != d)
                    ) {
                        var h = d - (d - 1) * (1 - Math.abs(t));
                        s[0].style.opacity = h;
                    }
                    if (null == c) s.transform("translate3d(" + o + ", " + l + ", 0px)");
                    else {
                        var u = c - (c - 1) * (1 - Math.abs(t));
                        s.transform(
                            "translate3d(" + o + ", " + l + ", 0px) scale(" + u + ")"
                        );
                    }
                },
                setTranslate: function () {
                    var e = this,
                        t = e.$el,
                        i = e.slides,
                        s = e.progress,
                        a = e.snapGrid;
                    t
                        .children(
                            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                        )
                        .each(function (t, i) {
                            e.parallax.setTransform(i, s);
                        }),
                        i.each(function (t, i) {
                            var r = i.progress;
                            e.params.slidesPerGroup > 1 &&
                            "auto" !== e.params.slidesPerView &&
                            (r += Math.ceil(t / 2) - s * (a.length - 1)),
                                (r = Math.min(Math.max(r, -1), 1)),
                                n(i)
                                    .find(
                                        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                                    )
                                    .each(function (t, i) {
                                        e.parallax.setTransform(i, r);
                                    });
                        });
                },
                setTransition: function (e) {
                    void 0 === e && (e = this.params.speed),
                        this.$el
                            .find(
                                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                            )
                            .each(function (t, i) {
                                var s = n(i),
                                    a =
                                        parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                                0 === e && (a = 0), s.transition(a);
                            });
                },
            },
            se = {
                getDistanceBetweenTouches: function (e) {
                    if (e.targetTouches.length < 2) return 1;
                    var t = e.targetTouches[0].pageX,
                        i = e.targetTouches[0].pageY,
                        n = e.targetTouches[1].pageX,
                        s = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(n - t, 2) + Math.pow(s - i, 2));
                },
                onGestureStart: function (e) {
                    var t = this.params.zoom,
                        i = this.zoom,
                        s = i.gesture;
                    if (
                        ((i.fakeGestureTouched = !1),
                            (i.fakeGestureMoved = !1),
                            !o.gestures)
                    ) {
                        if (
                            "touchstart" !== e.type ||
                            ("touchstart" === e.type && e.targetTouches.length < 2)
                        )
                            return;
                        (i.fakeGestureTouched = !0),
                            (s.scaleStart = se.getDistanceBetweenTouches(e));
                    }
                    (s.$slideEl && s.$slideEl.length) ||
                    ((s.$slideEl = n(e.target).closest(".swiper-slide")),
                    0 === s.$slideEl.length &&
                    (s.$slideEl = this.slides.eq(this.activeIndex)),
                        (s.$imageEl = s.$slideEl.find("img, svg, canvas")),
                        (s.$imageWrapEl = s.$imageEl.parent("." + t.containerClass)),
                        (s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio),
                    0 !== s.$imageWrapEl.length)
                        ? (s.$imageEl.transition(0), (this.zoom.isScaling = !0))
                        : (s.$imageEl = void 0);
                },
                onGestureChange: function (e) {
                    var t = this.params.zoom,
                        i = this.zoom,
                        n = i.gesture;
                    if (!o.gestures) {
                        if (
                            "touchmove" !== e.type ||
                            ("touchmove" === e.type && e.targetTouches.length < 2)
                        )
                            return;
                        (i.fakeGestureMoved = !0),
                            (n.scaleMove = se.getDistanceBetweenTouches(e));
                    }
                    n.$imageEl &&
                    0 !== n.$imageEl.length &&
                    (o.gestures
                        ? (i.scale = e.scale * i.currentScale)
                        : (i.scale = (n.scaleMove / n.scaleStart) * i.currentScale),
                    i.scale > n.maxRatio &&
                    (i.scale =
                        n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, 0.5)),
                    i.scale < t.minRatio &&
                    (i.scale =
                        t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, 0.5)),
                        n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
                },
                onGestureEnd: function (e) {
                    var t = this.params.zoom,
                        i = this.zoom,
                        n = i.gesture;
                    if (!o.gestures) {
                        if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                        if (
                            "touchend" !== e.type ||
                            ("touchend" === e.type &&
                                e.changedTouches.length < 2 &&
                                !A.android)
                        )
                            return;
                        (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
                    }
                    n.$imageEl &&
                    0 !== n.$imageEl.length &&
                    ((i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio)),
                        n.$imageEl
                            .transition(this.params.speed)
                            .transform("translate3d(0,0,0) scale(" + i.scale + ")"),
                        (i.currentScale = i.scale),
                        (i.isScaling = !1),
                    1 === i.scale && (n.$slideEl = void 0));
                },
                onTouchStart: function (e) {
                    var t = this.zoom,
                        i = t.gesture,
                        n = t.image;
                    i.$imageEl &&
                    0 !== i.$imageEl.length &&
                    (n.isTouched ||
                        (A.android && e.preventDefault(),
                            (n.isTouched = !0),
                            (n.touchesStart.x =
                                "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                            (n.touchesStart.y =
                                "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
                },
                onTouchMove: function (e) {
                    var t = this.zoom,
                        i = t.gesture,
                        n = t.image,
                        s = t.velocity;
                    if (
                        i.$imageEl &&
                        0 !== i.$imageEl.length &&
                        ((this.allowClick = !1), n.isTouched && i.$slideEl)
                    ) {
                        n.isMoved ||
                        ((n.width = i.$imageEl[0].offsetWidth),
                            (n.height = i.$imageEl[0].offsetHeight),
                            (n.startX = r.getTranslate(i.$imageWrapEl[0], "x") || 0),
                            (n.startY = r.getTranslate(i.$imageWrapEl[0], "y") || 0),
                            (i.slideWidth = i.$slideEl[0].offsetWidth),
                            (i.slideHeight = i.$slideEl[0].offsetHeight),
                            i.$imageWrapEl.transition(0),
                        this.rtl && ((n.startX = -n.startX), (n.startY = -n.startY)));
                        var a = n.width * t.scale,
                            o = n.height * t.scale;
                        if (!(a < i.slideWidth && o < i.slideHeight)) {
                            if (
                                ((n.minX = Math.min(i.slideWidth / 2 - a / 2, 0)),
                                    (n.maxX = -n.minX),
                                    (n.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
                                    (n.maxY = -n.minY),
                                    (n.touchesCurrent.x =
                                        "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                                    (n.touchesCurrent.y =
                                        "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                                !n.isMoved && !t.isScaling)
                            ) {
                                if (
                                    this.isHorizontal() &&
                                    ((Math.floor(n.minX) === Math.floor(n.startX) &&
                                        n.touchesCurrent.x < n.touchesStart.x) ||
                                        (Math.floor(n.maxX) === Math.floor(n.startX) &&
                                            n.touchesCurrent.x > n.touchesStart.x))
                                )
                                    return void (n.isTouched = !1);
                                if (
                                    !this.isHorizontal() &&
                                    ((Math.floor(n.minY) === Math.floor(n.startY) &&
                                        n.touchesCurrent.y < n.touchesStart.y) ||
                                        (Math.floor(n.maxY) === Math.floor(n.startY) &&
                                            n.touchesCurrent.y > n.touchesStart.y))
                                )
                                    return void (n.isTouched = !1);
                            }
                            e.preventDefault(),
                                e.stopPropagation(),
                                (n.isMoved = !0),
                                (n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX),
                                (n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY),
                            n.currentX < n.minX &&
                            (n.currentX =
                                n.minX + 1 - Math.pow(n.minX - n.currentX + 1, 0.8)),
                            n.currentX > n.maxX &&
                            (n.currentX =
                                n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, 0.8)),
                            n.currentY < n.minY &&
                            (n.currentY =
                                n.minY + 1 - Math.pow(n.minY - n.currentY + 1, 0.8)),
                            n.currentY > n.maxY &&
                            (n.currentY =
                                n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, 0.8)),
                            s.prevPositionX || (s.prevPositionX = n.touchesCurrent.x),
                            s.prevPositionY || (s.prevPositionY = n.touchesCurrent.y),
                            s.prevTime || (s.prevTime = Date.now()),
                                (s.x =
                                    (n.touchesCurrent.x - s.prevPositionX) /
                                    (Date.now() - s.prevTime) /
                                    2),
                                (s.y =
                                    (n.touchesCurrent.y - s.prevPositionY) /
                                    (Date.now() - s.prevTime) /
                                    2),
                            Math.abs(n.touchesCurrent.x - s.prevPositionX) < 2 && (s.x = 0),
                            Math.abs(n.touchesCurrent.y - s.prevPositionY) < 2 && (s.y = 0),
                                (s.prevPositionX = n.touchesCurrent.x),
                                (s.prevPositionY = n.touchesCurrent.y),
                                (s.prevTime = Date.now()),
                                i.$imageWrapEl.transform(
                                    "translate3d(" + n.currentX + "px, " + n.currentY + "px,0)"
                                );
                        }
                    }
                },
                onTouchEnd: function () {
                    var e = this.zoom,
                        t = e.gesture,
                        i = e.image,
                        n = e.velocity;
                    if (t.$imageEl && 0 !== t.$imageEl.length) {
                        if (!i.isTouched || !i.isMoved)
                            return (i.isTouched = !1), void (i.isMoved = !1);
                        (i.isTouched = !1), (i.isMoved = !1);
                        var s = 300,
                            a = 300,
                            r = n.x * s,
                            o = i.currentX + r,
                            l = n.y * a,
                            c = i.currentY + l;
                        0 !== n.x && (s = Math.abs((o - i.currentX) / n.x)),
                        0 !== n.y && (a = Math.abs((c - i.currentY) / n.y));
                        var d = Math.max(s, a);
                        (i.currentX = o), (i.currentY = c);
                        var h = i.width * e.scale,
                            u = i.height * e.scale;
                        (i.minX = Math.min(t.slideWidth / 2 - h / 2, 0)),
                            (i.maxX = -i.minX),
                            (i.minY = Math.min(t.slideHeight / 2 - u / 2, 0)),
                            (i.maxY = -i.minY),
                            (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
                            (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
                            t.$imageWrapEl
                                .transition(d)
                                .transform(
                                    "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
                                );
                    }
                },
                onTransitionEnd: function () {
                    var e = this.zoom,
                        t = e.gesture;
                    t.$slideEl &&
                    this.previousIndex !== this.activeIndex &&
                    (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
                        t.$imageWrapEl.transform("translate3d(0,0,0)"),
                        (e.scale = 1),
                        (e.currentScale = 1),
                        (t.$slideEl = void 0),
                        (t.$imageEl = void 0),
                        (t.$imageWrapEl = void 0));
                },
                toggle: function (e) {
                    var t = this.zoom;
                    t.scale && 1 !== t.scale ? t.out() : t.in(e);
                },
                in: function (e) {
                    var t,
                        i,
                        s,
                        a,
                        r,
                        o,
                        l,
                        c,
                        d,
                        h,
                        u,
                        p,
                        f,
                        m,
                        v,
                        g,
                        b = this.zoom,
                        y = this.params.zoom,
                        x = b.gesture,
                        w = b.image;
                    x.$slideEl ||
                    ((x.$slideEl = this.clickedSlide
                        ? n(this.clickedSlide)
                        : this.slides.eq(this.activeIndex)),
                        (x.$imageEl = x.$slideEl.find("img, svg, canvas")),
                        (x.$imageWrapEl = x.$imageEl.parent("." + y.containerClass))),
                    x.$imageEl &&
                    0 !== x.$imageEl.length &&
                    (x.$slideEl.addClass("" + y.zoomedSlideClass),
                        void 0 === w.touchesStart.x && e
                            ? ((t =
                                "touchend" === e.type
                                    ? e.changedTouches[0].pageX
                                    : e.pageX),
                                (i =
                                    "touchend" === e.type
                                        ? e.changedTouches[0].pageY
                                        : e.pageY))
                            : ((t = w.touchesStart.x), (i = w.touchesStart.y)),
                        (b.scale = x.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio),
                        (b.currentScale =
                            x.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio),
                        e
                            ? ((v = x.$slideEl[0].offsetWidth),
                                (g = x.$slideEl[0].offsetHeight),
                                (s = x.$slideEl.offset().left + v / 2 - t),
                                (a = x.$slideEl.offset().top + g / 2 - i),
                                (l = x.$imageEl[0].offsetWidth),
                                (c = x.$imageEl[0].offsetHeight),
                                (d = l * b.scale),
                                (h = c * b.scale),
                                (f = -(u = Math.min(v / 2 - d / 2, 0))),
                                (m = -(p = Math.min(g / 2 - h / 2, 0))),
                            (r = s * b.scale) < u && (r = u),
                            r > f && (r = f),
                            (o = a * b.scale) < p && (o = p),
                            o > m && (o = m))
                            : ((r = 0), (o = 0)),
                        x.$imageWrapEl
                            .transition(300)
                            .transform("translate3d(" + r + "px, " + o + "px,0)"),
                        x.$imageEl
                            .transition(300)
                            .transform("translate3d(0,0,0) scale(" + b.scale + ")"));
                },
                out: function () {
                    var e = this.zoom,
                        t = this.params.zoom,
                        i = e.gesture;
                    i.$slideEl ||
                    ((i.$slideEl = this.clickedSlide
                        ? n(this.clickedSlide)
                        : this.slides.eq(this.activeIndex)),
                        (i.$imageEl = i.$slideEl.find("img, svg, canvas")),
                        (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
                    i.$imageEl &&
                    0 !== i.$imageEl.length &&
                    ((e.scale = 1),
                        (e.currentScale = 1),
                        i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                        i.$imageEl
                            .transition(300)
                            .transform("translate3d(0,0,0) scale(1)"),
                        i.$slideEl.removeClass("" + t.zoomedSlideClass),
                        (i.$slideEl = void 0));
                },
                enable: function () {
                    var e = this.zoom;
                    if (!e.enabled) {
                        e.enabled = !0;
                        var t = !(
                                "touchstart" !== this.touchEvents.start ||
                                !o.passiveListener ||
                                !this.params.passiveListeners
                            ) && {passive: !0, capture: !1},
                            i = !o.passiveListener || {passive: !1, capture: !0};
                        o.gestures
                            ? (this.$wrapperEl.on(
                            "gesturestart",
                            ".swiper-slide",
                            e.onGestureStart,
                            t
                            ),
                                this.$wrapperEl.on(
                                    "gesturechange",
                                    ".swiper-slide",
                                    e.onGestureChange,
                                    t
                                ),
                                this.$wrapperEl.on(
                                    "gestureend",
                                    ".swiper-slide",
                                    e.onGestureEnd,
                                    t
                                ))
                            : "touchstart" === this.touchEvents.start &&
                            (this.$wrapperEl.on(
                                this.touchEvents.start,
                                ".swiper-slide",
                                e.onGestureStart,
                                t
                            ),
                                this.$wrapperEl.on(
                                    this.touchEvents.move,
                                    ".swiper-slide",
                                    e.onGestureChange,
                                    i
                                ),
                                this.$wrapperEl.on(
                                    this.touchEvents.end,
                                    ".swiper-slide",
                                    e.onGestureEnd,
                                    t
                                ),
                            this.touchEvents.cancel &&
                            this.$wrapperEl.on(
                                this.touchEvents.cancel,
                                ".swiper-slide",
                                e.onGestureEnd,
                                t
                            )),
                            this.$wrapperEl.on(
                                this.touchEvents.move,
                                "." + this.params.zoom.containerClass,
                                e.onTouchMove,
                                i
                            );
                    }
                },
                disable: function () {
                    var e = this.zoom;
                    if (e.enabled) {
                        this.zoom.enabled = !1;
                        var t = !(
                                "touchstart" !== this.touchEvents.start ||
                                !o.passiveListener ||
                                !this.params.passiveListeners
                            ) && {passive: !0, capture: !1},
                            i = !o.passiveListener || {passive: !1, capture: !0};
                        o.gestures
                            ? (this.$wrapperEl.off(
                            "gesturestart",
                            ".swiper-slide",
                            e.onGestureStart,
                            t
                            ),
                                this.$wrapperEl.off(
                                    "gesturechange",
                                    ".swiper-slide",
                                    e.onGestureChange,
                                    t
                                ),
                                this.$wrapperEl.off(
                                    "gestureend",
                                    ".swiper-slide",
                                    e.onGestureEnd,
                                    t
                                ))
                            : "touchstart" === this.touchEvents.start &&
                            (this.$wrapperEl.off(
                                this.touchEvents.start,
                                ".swiper-slide",
                                e.onGestureStart,
                                t
                            ),
                                this.$wrapperEl.off(
                                    this.touchEvents.move,
                                    ".swiper-slide",
                                    e.onGestureChange,
                                    i
                                ),
                                this.$wrapperEl.off(
                                    this.touchEvents.end,
                                    ".swiper-slide",
                                    e.onGestureEnd,
                                    t
                                ),
                            this.touchEvents.cancel &&
                            this.$wrapperEl.off(
                                this.touchEvents.cancel,
                                ".swiper-slide",
                                e.onGestureEnd,
                                t
                            )),
                            this.$wrapperEl.off(
                                this.touchEvents.move,
                                "." + this.params.zoom.containerClass,
                                e.onTouchMove,
                                i
                            );
                    }
                },
            },
            ae = {
                loadInSlide: function (e, t) {
                    void 0 === t && (t = !0);
                    var i = this,
                        s = i.params.lazy;
                    if (void 0 !== e && 0 !== i.slides.length) {
                        var a =
                                i.virtual && i.params.virtual.enabled
                                    ? i.$wrapperEl.children(
                                    "." +
                                    i.params.slideClass +
                                    '[data-swiper-slide-index="' +
                                    e +
                                    '"]'
                                    )
                                    : i.slides.eq(e),
                            r = a.find(
                                "." +
                                s.elementClass +
                                ":not(." +
                                s.loadedClass +
                                "):not(." +
                                s.loadingClass +
                                ")"
                            );
                        !a.hasClass(s.elementClass) ||
                        a.hasClass(s.loadedClass) ||
                        a.hasClass(s.loadingClass) ||
                        (r = r.add(a[0])),
                        0 !== r.length &&
                        r.each(function (e, r) {
                            var o = n(r);
                            o.addClass(s.loadingClass);
                            var l = o.attr("data-background"),
                                c = o.attr("data-src"),
                                d = o.attr("data-srcset"),
                                h = o.attr("data-sizes");
                            i.loadImage(o[0], c || l, d, h, !1, function () {
                                if (null != i && i && (!i || i.params) && !i.destroyed) {
                                    if (
                                        (l
                                            ? (o.css("background-image", 'url("' + l + '")'),
                                                o.removeAttr("data-background"))
                                            : (d &&
                                            (o.attr("srcset", d),
                                                o.removeAttr("data-srcset")),
                                            h &&
                                            (o.attr("sizes", h), o.removeAttr("data-sizes")),
                                            c && (o.attr("src", c), o.removeAttr("data-src"))),
                                            o.addClass(s.loadedClass).removeClass(s.loadingClass),
                                            a.find("." + s.preloaderClass).remove(),
                                        i.params.loop && t)
                                    ) {
                                        var e = a.attr("data-swiper-slide-index");
                                        if (a.hasClass(i.params.slideDuplicateClass)) {
                                            var n = i.$wrapperEl.children(
                                                '[data-swiper-slide-index="' +
                                                e +
                                                '"]:not(.' +
                                                i.params.slideDuplicateClass +
                                                ")"
                                            );
                                            i.lazy.loadInSlide(n.index(), !1);
                                        } else {
                                            var r = i.$wrapperEl.children(
                                                "." +
                                                i.params.slideDuplicateClass +
                                                '[data-swiper-slide-index="' +
                                                e +
                                                '"]'
                                            );
                                            i.lazy.loadInSlide(r.index(), !1);
                                        }
                                    }
                                    i.emit("lazyImageReady", a[0], o[0]);
                                }
                            }),
                                i.emit("lazyImageLoad", a[0], o[0]);
                        });
                    }
                },
                load: function () {
                    var e = this,
                        t = e.$wrapperEl,
                        i = e.params,
                        s = e.slides,
                        a = e.activeIndex,
                        r = e.virtual && i.virtual.enabled,
                        o = i.lazy,
                        l = i.slidesPerView;

                    function c(e) {
                        if (r) {
                            if (
                                t.children(
                                    "." + i.slideClass + '[data-swiper-slide-index="' + e + '"]'
                                ).length
                            )
                                return !0;
                        } else if (s[e]) return !0;
                        return !1;
                    }

                    function d(e) {
                        return r ? n(e).attr("data-swiper-slide-index") : n(e).index();
                    }

                    if (
                        ("auto" === l && (l = 0),
                        e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
                            e.params.watchSlidesVisibility)
                    )
                        t.children("." + i.slideVisibleClass).each(function (t, i) {
                            var s = r ? n(i).attr("data-swiper-slide-index") : n(i).index();
                            e.lazy.loadInSlide(s);
                        });
                    else if (l > 1)
                        for (var h = a; h < a + l; h += 1) c(h) && e.lazy.loadInSlide(h);
                    else e.lazy.loadInSlide(a);
                    if (o.loadPrevNext)
                        if (l > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
                            for (
                                var u = o.loadPrevNextAmount,
                                    p = l,
                                    f = Math.min(a + p + Math.max(u, p), s.length),
                                    m = Math.max(a - Math.max(p, u), 0),
                                    v = a + l;
                                v < f;
                                v += 1
                            )
                                c(v) && e.lazy.loadInSlide(v);
                            for (var g = m; g < a; g += 1) c(g) && e.lazy.loadInSlide(g);
                        } else {
                            var b = t.children("." + i.slideNextClass);
                            b.length > 0 && e.lazy.loadInSlide(d(b));
                            var y = t.children("." + i.slidePrevClass);
                            y.length > 0 && e.lazy.loadInSlide(d(y));
                        }
                },
            },
            re = {
                LinearSpline: function (e, t) {
                    var i, n, s, a, r;
                    return (
                        (this.x = e),
                            (this.y = t),
                            (this.lastIndex = e.length - 1),
                            (this.interpolate = function (e) {
                                return e
                                    ? ((r = (function (e, t) {
                                        for (n = -1, i = e.length; i - n > 1;)
                                            e[(s = (i + n) >> 1)] <= t ? (n = s) : (i = s);
                                        return i;
                                    })(this.x, e)),
                                        (a = r - 1),
                                    ((e - this.x[a]) * (this.y[r] - this.y[a])) /
                                    (this.x[r] - this.x[a]) +
                                    this.y[a])
                                    : 0;
                            }),
                            this
                    );
                },
                getInterpolateFunction: function (e) {
                    this.controller.spline ||
                    (this.controller.spline = this.params.loop
                        ? new re.LinearSpline(this.slidesGrid, e.slidesGrid)
                        : new re.LinearSpline(this.snapGrid, e.snapGrid));
                },
                setTranslate: function (e, t) {
                    var i,
                        n,
                        s = this,
                        a = s.controller.control;

                    function r(e) {
                        var t = s.rtlTranslate ? -s.translate : s.translate;
                        "slide" === s.params.controller.by &&
                        (s.controller.getInterpolateFunction(e),
                            (n = -s.controller.spline.interpolate(-t))),
                        (n && "container" !== s.params.controller.by) ||
                        ((i =
                            (e.maxTranslate() - e.minTranslate()) /
                            (s.maxTranslate() - s.minTranslate())),
                            (n = (t - s.minTranslate()) * i + e.minTranslate())),
                        s.params.controller.inverse && (n = e.maxTranslate() - n),
                            e.updateProgress(n),
                            e.setTranslate(n, s),
                            e.updateActiveIndex(),
                            e.updateSlidesClasses();
                    }

                    if (Array.isArray(a))
                        for (var o = 0; o < a.length; o += 1)
                            a[o] !== t && a[o] instanceof F && r(a[o]);
                    else a instanceof F && t !== a && r(a);
                },
                setTransition: function (e, t) {
                    var i,
                        n = this,
                        s = n.controller.control;

                    function a(t) {
                        t.setTransition(e, n),
                        0 !== e &&
                        (t.transitionStart(),
                        t.params.autoHeight &&
                        r.nextTick(function () {
                            t.updateAutoHeight();
                        }),
                            t.$wrapperEl.transitionEnd(function () {
                                s &&
                                (t.params.loop &&
                                "slide" === n.params.controller.by &&
                                t.loopFix(),
                                    t.transitionEnd());
                            }));
                    }

                    if (Array.isArray(s))
                        for (i = 0; i < s.length; i += 1)
                            s[i] !== t && s[i] instanceof F && a(s[i]);
                    else s instanceof F && t !== s && a(s);
                },
            },
            oe = {
                makeElFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e;
                },
                addElRole: function (e, t) {
                    return e.attr("role", t), e;
                },
                addElLabel: function (e, t) {
                    return e.attr("aria-label", t), e;
                },
                disableEl: function (e) {
                    return e.attr("aria-disabled", !0), e;
                },
                enableEl: function (e) {
                    return e.attr("aria-disabled", !1), e;
                },
                onEnterKey: function (e) {
                    var t = this.params.a11y;
                    if (13 === e.keyCode) {
                        var i = n(e.target);
                        this.navigation &&
                        this.navigation.$nextEl &&
                        i.is(this.navigation.$nextEl) &&
                        ((this.isEnd && !this.params.loop) || this.slideNext(),
                            this.isEnd
                                ? this.a11y.notify(t.lastSlideMessage)
                                : this.a11y.notify(t.nextSlideMessage)),
                        this.navigation &&
                        this.navigation.$prevEl &&
                        i.is(this.navigation.$prevEl) &&
                        ((this.isBeginning && !this.params.loop) || this.slidePrev(),
                            this.isBeginning
                                ? this.a11y.notify(t.firstSlideMessage)
                                : this.a11y.notify(t.prevSlideMessage)),
                        this.pagination &&
                        i.is("." + this.params.pagination.bulletClass) &&
                        i[0].click();
                    }
                },
                notify: function (e) {
                    var t = this.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e));
                },
                updateNavigation: function () {
                    if (!this.params.loop && this.navigation) {
                        var e = this.navigation,
                            t = e.$nextEl,
                            i = e.$prevEl;
                        i &&
                        i.length > 0 &&
                        (this.isBeginning
                            ? this.a11y.disableEl(i)
                            : this.a11y.enableEl(i)),
                        t &&
                        t.length > 0 &&
                        (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t));
                    }
                },
                updatePagination: function () {
                    var e = this,
                        t = e.params.a11y;
                    e.pagination &&
                    e.params.pagination.clickable &&
                    e.pagination.bullets &&
                    e.pagination.bullets.length &&
                    e.pagination.bullets.each(function (i, s) {
                        var a = n(s);
                        e.a11y.makeElFocusable(a),
                            e.a11y.addElRole(a, "button"),
                            e.a11y.addElLabel(
                                a,
                                t.paginationBulletMessage.replace(/{{index}}/, a.index() + 1)
                            );
                    });
                },
                init: function () {
                    this.$el.append(this.a11y.liveRegion);
                    var e,
                        t,
                        i = this.params.a11y;
                    this.navigation &&
                    this.navigation.$nextEl &&
                    (e = this.navigation.$nextEl),
                    this.navigation &&
                    this.navigation.$prevEl &&
                    (t = this.navigation.$prevEl),
                    e &&
                    (this.a11y.makeElFocusable(e),
                        this.a11y.addElRole(e, "button"),
                        this.a11y.addElLabel(e, i.nextSlideMessage),
                        e.on("keydown", this.a11y.onEnterKey)),
                    t &&
                    (this.a11y.makeElFocusable(t),
                        this.a11y.addElRole(t, "button"),
                        this.a11y.addElLabel(t, i.prevSlideMessage),
                        t.on("keydown", this.a11y.onEnterKey)),
                    this.pagination &&
                    this.params.pagination.clickable &&
                    this.pagination.bullets &&
                    this.pagination.bullets.length &&
                    this.pagination.$el.on(
                        "keydown",
                        "." + this.params.pagination.bulletClass,
                        this.a11y.onEnterKey
                    );
                },
                destroy: function () {
                    var e, t;
                    this.a11y.liveRegion &&
                    this.a11y.liveRegion.length > 0 &&
                    this.a11y.liveRegion.remove(),
                    this.navigation &&
                    this.navigation.$nextEl &&
                    (e = this.navigation.$nextEl),
                    this.navigation &&
                    this.navigation.$prevEl &&
                    (t = this.navigation.$prevEl),
                    e && e.off("keydown", this.a11y.onEnterKey),
                    t && t.off("keydown", this.a11y.onEnterKey),
                    this.pagination &&
                    this.params.pagination.clickable &&
                    this.pagination.bullets &&
                    this.pagination.bullets.length &&
                    this.pagination.$el.off(
                        "keydown",
                        "." + this.params.pagination.bulletClass,
                        this.a11y.onEnterKey
                    );
                },
            },
            le = {
                init: function () {
                    if (this.params.history) {
                        if (!t.history || !t.history.pushState)
                            return (
                                (this.params.history.enabled = !1),
                                    void (this.params.hashNavigation.enabled = !0)
                            );
                        var e = this.history;
                        (e.initialized = !0),
                            (e.paths = le.getPathValues()),
                        (e.paths.key || e.paths.value) &&
                        (e.scrollToSlide(
                            0,
                            e.paths.value,
                            this.params.runCallbacksOnInit
                        ),
                        this.params.history.replaceState ||
                        t.addEventListener(
                            "popstate",
                            this.history.setHistoryPopState
                        ));
                    }
                },
                destroy: function () {
                    this.params.history.replaceState ||
                    t.removeEventListener("popstate", this.history.setHistoryPopState);
                },
                setHistoryPopState: function () {
                    (this.history.paths = le.getPathValues()),
                        this.history.scrollToSlide(
                            this.params.speed,
                            this.history.paths.value,
                            !1
                        );
                },
                getPathValues: function () {
                    var e = t.location.pathname
                            .slice(1)
                            .split("/")
                            .filter(function (e) {
                                return "" !== e;
                            }),
                        i = e.length;
                    return {key: e[i - 2], value: e[i - 1]};
                },
                setHistory: function (e, i) {
                    if (this.history.initialized && this.params.history.enabled) {
                        var n = this.slides.eq(i),
                            s = le.slugify(n.attr("data-history"));
                        t.location.pathname.includes(e) || (s = e + "/" + s);
                        var a = t.history.state;
                        (a && a.value === s) ||
                        (this.params.history.replaceState
                            ? t.history.replaceState({value: s}, null, s)
                            : t.history.pushState({value: s}, null, s));
                    }
                },
                slugify: function (e) {
                    return e
                        .toString()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]+/g, "")
                        .replace(/--+/g, "-")
                        .replace(/^-+/, "")
                        .replace(/-+$/, "");
                },
                scrollToSlide: function (e, t, i) {
                    if (t)
                        for (var n = 0, s = this.slides.length; n < s; n += 1) {
                            var a = this.slides.eq(n);
                            if (
                                le.slugify(a.attr("data-history")) === t &&
                                !a.hasClass(this.params.slideDuplicateClass)
                            ) {
                                var r = a.index();
                                this.slideTo(r, e, i);
                            }
                        }
                    else this.slideTo(0, e, i);
                },
            },
            ce = {
                onHashCange: function () {
                    var t = e.location.hash.replace("#", "");
                    if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                        var i = this.$wrapperEl
                            .children(
                                "." + this.params.slideClass + '[data-hash="' + t + '"]'
                            )
                            .index();
                        if (void 0 === i) return;
                        this.slideTo(i);
                    }
                },
                setHash: function () {
                    if (
                        this.hashNavigation.initialized &&
                        this.params.hashNavigation.enabled
                    )
                        if (
                            this.params.hashNavigation.replaceState &&
                            t.history &&
                            t.history.replaceState
                        )
                            t.history.replaceState(
                                null,
                                null,
                                "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""
                            );
                        else {
                            var i = this.slides.eq(this.activeIndex),
                                n = i.attr("data-hash") || i.attr("data-history");
                            e.location.hash = n || "";
                        }
                },
                init: function () {
                    if (
                        !(
                            !this.params.hashNavigation.enabled ||
                            (this.params.history && this.params.history.enabled)
                        )
                    ) {
                        this.hashNavigation.initialized = !0;
                        var i = e.location.hash.replace("#", "");
                        if (i)
                            for (var s = 0, a = this.slides.length; s < a; s += 1) {
                                var r = this.slides.eq(s);
                                if (
                                    (r.attr("data-hash") || r.attr("data-history")) === i &&
                                    !r.hasClass(this.params.slideDuplicateClass)
                                ) {
                                    var o = r.index();
                                    this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
                                }
                            }
                        this.params.hashNavigation.watchState &&
                        n(t).on("hashchange", this.hashNavigation.onHashCange);
                    }
                },
                destroy: function () {
                    this.params.hashNavigation.watchState &&
                    n(t).off("hashchange", this.hashNavigation.onHashCange);
                },
            },
            de = {
                run: function () {
                    var e = this,
                        t = e.slides.eq(e.activeIndex),
                        i = e.params.autoplay.delay;
                    t.attr("data-swiper-autoplay") &&
                    (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
                        clearTimeout(e.autoplay.timeout),
                        (e.autoplay.timeout = r.nextTick(function () {
                            e.params.autoplay.reverseDirection
                                ? e.params.loop
                                ? (e.loopFix(),
                                    e.slidePrev(e.params.speed, !0, !0),
                                    e.emit("autoplay"))
                                : e.isBeginning
                                    ? e.params.autoplay.stopOnLastSlide
                                        ? e.autoplay.stop()
                                        : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                                            e.emit("autoplay"))
                                    : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
                                : e.params.loop
                                ? (e.loopFix(),
                                    e.slideNext(e.params.speed, !0, !0),
                                    e.emit("autoplay"))
                                : e.isEnd
                                    ? e.params.autoplay.stopOnLastSlide
                                        ? e.autoplay.stop()
                                        : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
                                    : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")),
                            e.params.cssMode && e.autoplay.running && e.autoplay.run();
                        }, i));
                },
                start: function () {
                    return (
                        void 0 === this.autoplay.timeout &&
                        !this.autoplay.running &&
                        ((this.autoplay.running = !0),
                            this.emit("autoplayStart"),
                            this.autoplay.run(),
                            !0)
                    );
                },
                stop: function () {
                    return (
                        !!this.autoplay.running &&
                        void 0 !== this.autoplay.timeout &&
                        (this.autoplay.timeout &&
                        (clearTimeout(this.autoplay.timeout),
                            (this.autoplay.timeout = void 0)),
                            (this.autoplay.running = !1),
                            this.emit("autoplayStop"),
                            !0)
                    );
                },
                pause: function (e) {
                    this.autoplay.running &&
                    (this.autoplay.paused ||
                        (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
                            (this.autoplay.paused = !0),
                            0 !== e && this.params.autoplay.waitForTransition
                                ? (this.$wrapperEl[0].addEventListener(
                                "transitionend",
                                this.autoplay.onTransitionEnd
                                ),
                                    this.$wrapperEl[0].addEventListener(
                                        "webkitTransitionEnd",
                                        this.autoplay.onTransitionEnd
                                    ))
                                : ((this.autoplay.paused = !1), this.autoplay.run())));
                },
            },
            he = {
                setTranslate: function () {
                    for (var e = this.slides, t = 0; t < e.length; t += 1) {
                        var i = this.slides.eq(t),
                            n = -i[0].swiperSlideOffset;
                        this.params.virtualTranslate || (n -= this.translate);
                        var s = 0;
                        this.isHorizontal() || ((s = n), (n = 0));
                        var a = this.params.fadeEffect.crossFade
                            ? Math.max(1 - Math.abs(i[0].progress), 0)
                            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                        i.css({opacity: a}).transform(
                            "translate3d(" + n + "px, " + s + "px, 0px)"
                        );
                    }
                },
                setTransition: function (e) {
                    var t = this,
                        i = t.slides,
                        n = t.$wrapperEl;
                    if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
                        var s = !1;
                        i.transitionEnd(function () {
                            if (!s && t && !t.destroyed) {
                                (s = !0), (t.animating = !1);
                                for (
                                    var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                                    i < e.length;
                                    i += 1
                                )
                                    n.trigger(e[i]);
                            }
                        });
                    }
                },
            },
            ue = {
                setTranslate: function () {
                    var e,
                        t = this.$el,
                        i = this.$wrapperEl,
                        s = this.slides,
                        a = this.width,
                        r = this.height,
                        o = this.rtlTranslate,
                        l = this.size,
                        c = this.params.cubeEffect,
                        d = this.isHorizontal(),
                        h = this.virtual && this.params.virtual.enabled,
                        u = 0;
                    c.shadow &&
                    (d
                        ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                        ((e = n('<div class="swiper-cube-shadow"></div>')),
                            i.append(e)),
                            e.css({height: a + "px"}))
                        : 0 === (e = t.find(".swiper-cube-shadow")).length &&
                        ((e = n('<div class="swiper-cube-shadow"></div>')),
                            t.append(e)));
                    for (var p = 0; p < s.length; p += 1) {
                        var f = s.eq(p),
                            m = p;
                        h && (m = parseInt(f.attr("data-swiper-slide-index"), 10));
                        var v = 90 * m,
                            g = Math.floor(v / 360);
                        o && ((v = -v), (g = Math.floor(-v / 360)));
                        var b = Math.max(Math.min(f[0].progress, 1), -1),
                            y = 0,
                            x = 0,
                            w = 0;
                        m % 4 == 0
                            ? ((y = 4 * -g * l), (w = 0))
                            : (m - 1) % 4 == 0
                            ? ((y = 0), (w = 4 * -g * l))
                            : (m - 2) % 4 == 0
                                ? ((y = l + 4 * g * l), (w = l))
                                : (m - 3) % 4 == 0 && ((y = -l), (w = 3 * l + 4 * l * g)),
                        o && (y = -y),
                        d || ((x = y), (y = 0));
                        var T =
                            "rotateX(" +
                            (d ? 0 : -v) +
                            "deg) rotateY(" +
                            (d ? v : 0) +
                            "deg) translate3d(" +
                            y +
                            "px, " +
                            x +
                            "px, " +
                            w +
                            "px)";
                        if (
                            (b <= 1 &&
                            b > -1 &&
                            ((u = 90 * m + 90 * b), o && (u = 90 * -m - 90 * b)),
                                f.transform(T),
                                c.slideShadows)
                        ) {
                            var C = d
                                ? f.find(".swiper-slide-shadow-left")
                                : f.find(".swiper-slide-shadow-top"),
                                S = d
                                    ? f.find(".swiper-slide-shadow-right")
                                    : f.find(".swiper-slide-shadow-bottom");
                            0 === C.length &&
                            ((C = n(
                                '<div class="swiper-slide-shadow-' +
                                (d ? "left" : "top") +
                                '"></div>'
                            )),
                                f.append(C)),
                            0 === S.length &&
                            ((S = n(
                                '<div class="swiper-slide-shadow-' +
                                (d ? "right" : "bottom") +
                                '"></div>'
                            )),
                                f.append(S)),
                            C.length && (C[0].style.opacity = Math.max(-b, 0)),
                            S.length && (S[0].style.opacity = Math.max(b, 0));
                        }
                    }
                    if (
                        (i.css({
                            "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                            "transform-origin": "50% 50% -" + l / 2 + "px",
                        }),
                            c.shadow)
                    )
                        if (d)
                            e.transform(
                                "translate3d(0px, " +
                                (a / 2 + c.shadowOffset) +
                                "px, " +
                                -a / 2 +
                                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                                c.shadowScale +
                                ")"
                            );
                        else {
                            var E = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                                P =
                                    1.5 -
                                    (Math.sin((2 * E * Math.PI) / 360) / 2 +
                                        Math.cos((2 * E * Math.PI) / 360) / 2),
                                M = c.shadowScale,
                                k = c.shadowScale / P,
                                $ = c.shadowOffset;
                            e.transform(
                                "scale3d(" +
                                M +
                                ", 1, " +
                                k +
                                ") translate3d(0px, " +
                                (r / 2 + $) +
                                "px, " +
                                -r / 2 / k +
                                "px) rotateX(-90deg)"
                            );
                        }
                    var L = W.isSafari || W.isUiWebView ? -l / 2 : 0;
                    i.transform(
                        "translate3d(0px,0," +
                        L +
                        "px) rotateX(" +
                        (this.isHorizontal() ? 0 : u) +
                        "deg) rotateY(" +
                        (this.isHorizontal() ? -u : 0) +
                        "deg)"
                    );
                },
                setTransition: function (e) {
                    var t = this.$el;
                    this.slides
                        .transition(e)
                        .find(
                            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                        )
                        .transition(e),
                    this.params.cubeEffect.shadow &&
                    !this.isHorizontal() &&
                    t.find(".swiper-cube-shadow").transition(e);
                },
            },
            pe = {
                setTranslate: function () {
                    for (
                        var e = this.slides, t = this.rtlTranslate, i = 0;
                        i < e.length;
                        i += 1
                    ) {
                        var s = e.eq(i),
                            a = s[0].progress;
                        this.params.flipEffect.limitRotation &&
                        (a = Math.max(Math.min(s[0].progress, 1), -1));
                        var r = -180 * a,
                            o = 0,
                            l = -s[0].swiperSlideOffset,
                            c = 0;
                        if (
                            (this.isHorizontal()
                                ? t && (r = -r)
                                : ((c = l), (l = 0), (o = -r), (r = 0)),
                                (s[0].style.zIndex = -Math.abs(Math.round(a)) + e.length),
                                this.params.flipEffect.slideShadows)
                        ) {
                            var d = this.isHorizontal()
                                ? s.find(".swiper-slide-shadow-left")
                                : s.find(".swiper-slide-shadow-top"),
                                h = this.isHorizontal()
                                    ? s.find(".swiper-slide-shadow-right")
                                    : s.find(".swiper-slide-shadow-bottom");
                            0 === d.length &&
                            ((d = n(
                                '<div class="swiper-slide-shadow-' +
                                (this.isHorizontal() ? "left" : "top") +
                                '"></div>'
                            )),
                                s.append(d)),
                            0 === h.length &&
                            ((h = n(
                                '<div class="swiper-slide-shadow-' +
                                (this.isHorizontal() ? "right" : "bottom") +
                                '"></div>'
                            )),
                                s.append(h)),
                            d.length && (d[0].style.opacity = Math.max(-a, 0)),
                            h.length && (h[0].style.opacity = Math.max(a, 0));
                        }
                        s.transform(
                            "translate3d(" +
                            l +
                            "px, " +
                            c +
                            "px, 0px) rotateX(" +
                            o +
                            "deg) rotateY(" +
                            r +
                            "deg)"
                        );
                    }
                },
                setTransition: function (e) {
                    var t = this,
                        i = t.slides,
                        n = t.activeIndex,
                        s = t.$wrapperEl;
                    if (
                        (i
                            .transition(e)
                            .find(
                                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                            )
                            .transition(e),
                        t.params.virtualTranslate && 0 !== e)
                    ) {
                        var a = !1;
                        i.eq(n).transitionEnd(function () {
                            if (!a && t && !t.destroyed) {
                                (a = !0), (t.animating = !1);
                                for (
                                    var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                                    i < e.length;
                                    i += 1
                                )
                                    s.trigger(e[i]);
                            }
                        });
                    }
                },
            },
            fe = {
                setTranslate: function () {
                    for (
                        var e = this.width,
                            t = this.height,
                            i = this.slides,
                            s = this.$wrapperEl,
                            a = this.slidesSizesGrid,
                            r = this.params.coverflowEffect,
                            l = this.isHorizontal(),
                            c = this.translate,
                            d = l ? e / 2 - c : t / 2 - c,
                            h = l ? r.rotate : -r.rotate,
                            u = r.depth,
                            p = 0,
                            f = i.length;
                        p < f;
                        p += 1
                    ) {
                        var m = i.eq(p),
                            v = a[p],
                            g = ((d - m[0].swiperSlideOffset - v / 2) / v) * r.modifier,
                            b = l ? h * g : 0,
                            y = l ? 0 : h * g,
                            x = -u * Math.abs(g),
                            w = l ? 0 : r.stretch * g,
                            T = l ? r.stretch * g : 0;
                        Math.abs(T) < 0.001 && (T = 0),
                        Math.abs(w) < 0.001 && (w = 0),
                        Math.abs(x) < 0.001 && (x = 0),
                        Math.abs(b) < 0.001 && (b = 0),
                        Math.abs(y) < 0.001 && (y = 0);
                        var C =
                            "translate3d(" +
                            T +
                            "px," +
                            w +
                            "px," +
                            x +
                            "px)  rotateX(" +
                            y +
                            "deg) rotateY(" +
                            b +
                            "deg)";
                        if (
                            (m.transform(C),
                                (m[0].style.zIndex = 1 - Math.abs(Math.round(g))),
                                r.slideShadows)
                        ) {
                            var S = l
                                ? m.find(".swiper-slide-shadow-left")
                                : m.find(".swiper-slide-shadow-top"),
                                E = l
                                    ? m.find(".swiper-slide-shadow-right")
                                    : m.find(".swiper-slide-shadow-bottom");
                            0 === S.length &&
                            ((S = n(
                                '<div class="swiper-slide-shadow-' +
                                (l ? "left" : "top") +
                                '"></div>'
                            )),
                                m.append(S)),
                            0 === E.length &&
                            ((E = n(
                                '<div class="swiper-slide-shadow-' +
                                (l ? "right" : "bottom") +
                                '"></div>'
                            )),
                                m.append(E)),
                            S.length && (S[0].style.opacity = g > 0 ? g : 0),
                            E.length && (E[0].style.opacity = -g > 0 ? -g : 0);
                        }
                    }
                    (o.pointerEvents || o.prefixedPointerEvents) &&
                    (s[0].style.perspectiveOrigin = d + "px 50%");
                },
                setTransition: function (e) {
                    this.slides
                        .transition(e)
                        .find(
                            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                        )
                        .transition(e);
                },
            },
            me = {
                init: function () {
                    var e = this.params.thumbs,
                        t = this.constructor;
                    e.swiper instanceof t
                        ? ((this.thumbs.swiper = e.swiper),
                            r.extend(this.thumbs.swiper.originalParams, {
                                watchSlidesProgress: !0,
                                slideToClickedSlide: !1,
                            }),
                            r.extend(this.thumbs.swiper.params, {
                                watchSlidesProgress: !0,
                                slideToClickedSlide: !1,
                            }))
                        : r.isObject(e.swiper) &&
                        ((this.thumbs.swiper = new t(
                            r.extend({}, e.swiper, {
                                watchSlidesVisibility: !0,
                                watchSlidesProgress: !0,
                                slideToClickedSlide: !1,
                            })
                        )),
                            (this.thumbs.swiperCreated = !0)),
                        this.thumbs.swiper.$el.addClass(
                            this.params.thumbs.thumbsContainerClass
                        ),
                        this.thumbs.swiper.on("tap", this.thumbs.onThumbClick);
                },
                onThumbClick: function () {
                    var e = this.thumbs.swiper;
                    if (e) {
                        var t = e.clickedIndex,
                            i = e.clickedSlide;
                        if (
                            !(
                                (i &&
                                    n(i).hasClass(this.params.thumbs.slideThumbActiveClass)) ||
                                null == t
                            )
                        ) {
                            var s;
                            if (
                                ((s = e.params.loop
                                    ? parseInt(
                                        n(e.clickedSlide).attr("data-swiper-slide-index"),
                                        10
                                    )
                                    : t),
                                    this.params.loop)
                            ) {
                                var a = this.activeIndex;
                                this.slides.eq(a).hasClass(this.params.slideDuplicateClass) &&
                                (this.loopFix(),
                                    (this._clientLeft = this.$wrapperEl[0].clientLeft),
                                    (a = this.activeIndex));
                                var r = this.slides
                                        .eq(a)
                                        .prevAll('[data-swiper-slide-index="' + s + '"]')
                                        .eq(0)
                                        .index(),
                                    o = this.slides
                                        .eq(a)
                                        .nextAll('[data-swiper-slide-index="' + s + '"]')
                                        .eq(0)
                                        .index();
                                s = void 0 === r ? o : void 0 === o ? r : o - a < a - r ? o : r;
                            }
                            this.slideTo(s);
                        }
                    }
                },
                update: function (e) {
                    var t = this.thumbs.swiper;
                    if (t) {
                        var i =
                            "auto" === t.params.slidesPerView
                                ? t.slidesPerViewDynamic()
                                : t.params.slidesPerView;
                        if (this.realIndex !== t.realIndex) {
                            var n,
                                s = t.activeIndex;
                            if (t.params.loop) {
                                t.slides.eq(s).hasClass(t.params.slideDuplicateClass) &&
                                (t.loopFix(),
                                    (t._clientLeft = t.$wrapperEl[0].clientLeft),
                                    (s = t.activeIndex));
                                var a = t.slides
                                        .eq(s)
                                        .prevAll(
                                            '[data-swiper-slide-index="' + this.realIndex + '"]'
                                        )
                                        .eq(0)
                                        .index(),
                                    r = t.slides
                                        .eq(s)
                                        .nextAll(
                                            '[data-swiper-slide-index="' + this.realIndex + '"]'
                                        )
                                        .eq(0)
                                        .index();
                                n =
                                    void 0 === a
                                        ? r
                                        : void 0 === r
                                        ? a
                                        : r - s == s - a
                                            ? s
                                            : r - s < s - a
                                                ? r
                                                : a;
                            } else n = this.realIndex;
                            t.visibleSlidesIndexes &&
                            t.visibleSlidesIndexes.indexOf(n) < 0 &&
                            (t.params.centeredSlides
                                ? (n =
                                    n > s
                                        ? n - Math.floor(i / 2) + 1
                                        : n + Math.floor(i / 2) - 1)
                                : n > s && (n = n - i + 1),
                                t.slideTo(n, e ? 0 : void 0));
                        }
                        var o = 1,
                            l = this.params.thumbs.slideThumbActiveClass;
                        if (
                            (this.params.slidesPerView > 1 &&
                            !this.params.centeredSlides &&
                            (o = this.params.slidesPerView),
                            this.params.thumbs.multipleActiveThumbs || (o = 1),
                                (o = Math.floor(o)),
                                t.slides.removeClass(l),
                            t.params.loop || (t.params.virtual && t.params.virtual.enabled))
                        )
                            for (var c = 0; c < o; c += 1)
                                t.$wrapperEl
                                    .children(
                                        '[data-swiper-slide-index="' + (this.realIndex + c) + '"]'
                                    )
                                    .addClass(l);
                        else
                            for (var d = 0; d < o; d += 1)
                                t.slides.eq(this.realIndex + d).addClass(l);
                    }
                },
            },
            ve = [
                B,
                X,
                Y,
                V,
                _,
                K,
                Q,
                {
                    name: "mousewheel",
                    params: {
                        mousewheel: {
                            enabled: !1,
                            releaseOnEdges: !1,
                            invert: !1,
                            forceToAxis: !1,
                            sensitivity: 1,
                            eventsTarged: "container",
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            mousewheel: {
                                enabled: !1,
                                enable: J.enable.bind(this),
                                disable: J.disable.bind(this),
                                handle: J.handle.bind(this),
                                handleMouseEnter: J.handleMouseEnter.bind(this),
                                handleMouseLeave: J.handleMouseLeave.bind(this),
                                animateSlider: J.animateSlider.bind(this),
                                releaseScroll: J.releaseScroll.bind(this),
                                lastScrollTime: r.now(),
                                lastEventBeforeSnap: void 0,
                                recentWheelEvents: [],
                            },
                        });
                    },
                    on: {
                        init: function () {
                            !this.params.mousewheel.enabled &&
                            this.params.cssMode &&
                            this.mousewheel.disable(),
                            this.params.mousewheel.enabled && this.mousewheel.enable();
                        },
                        destroy: function () {
                            this.params.cssMode && this.mousewheel.enable(),
                            this.mousewheel.enabled && this.mousewheel.disable();
                        },
                    },
                },
                {
                    name: "navigation",
                    params: {
                        navigation: {
                            nextEl: null,
                            prevEl: null,
                            hideOnClick: !1,
                            disabledClass: "swiper-button-disabled",
                            hiddenClass: "swiper-button-hidden",
                            lockClass: "swiper-button-lock",
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            navigation: {
                                init: ee.init.bind(this),
                                update: ee.update.bind(this),
                                destroy: ee.destroy.bind(this),
                                onNextClick: ee.onNextClick.bind(this),
                                onPrevClick: ee.onPrevClick.bind(this),
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.navigation.init(), this.navigation.update();
                        },
                        toEdge: function () {
                            this.navigation.update();
                        },
                        fromEdge: function () {
                            this.navigation.update();
                        },
                        destroy: function () {
                            this.navigation.destroy();
                        },
                        click: function (e) {
                            var t,
                                i = this.navigation,
                                s = i.$nextEl,
                                a = i.$prevEl;
                            !this.params.navigation.hideOnClick ||
                            n(e.target).is(a) ||
                            n(e.target).is(s) ||
                            (s
                                ? (t = s.hasClass(this.params.navigation.hiddenClass))
                                : a && (t = a.hasClass(this.params.navigation.hiddenClass)),
                                !0 === t
                                    ? this.emit("navigationShow", this)
                                    : this.emit("navigationHide", this),
                            s && s.toggleClass(this.params.navigation.hiddenClass),
                            a && a.toggleClass(this.params.navigation.hiddenClass));
                        },
                    },
                },
                {
                    name: "pagination",
                    params: {
                        pagination: {
                            el: null,
                            bulletElement: "span",
                            clickable: !1,
                            hideOnClick: !1,
                            renderBullet: null,
                            renderProgressbar: null,
                            renderFraction: null,
                            renderCustom: null,
                            progressbarOpposite: !1,
                            type: "bullets",
                            dynamicBullets: !1,
                            dynamicMainBullets: 1,
                            formatFractionCurrent: function (e) {
                                return e;
                            },
                            formatFractionTotal: function (e) {
                                return e;
                            },
                            bulletClass: "swiper-pagination-bullet",
                            bulletActiveClass: "swiper-pagination-bullet-active",
                            modifierClass: "swiper-pagination-",
                            currentClass: "swiper-pagination-current",
                            totalClass: "swiper-pagination-total",
                            hiddenClass: "swiper-pagination-hidden",
                            progressbarFillClass: "swiper-pagination-progressbar-fill",
                            progressbarOppositeClass:
                                "swiper-pagination-progressbar-opposite",
                            clickableClass: "swiper-pagination-clickable",
                            lockClass: "swiper-pagination-lock",
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            pagination: {
                                init: te.init.bind(this),
                                render: te.render.bind(this),
                                update: te.update.bind(this),
                                destroy: te.destroy.bind(this),
                                dynamicBulletIndex: 0,
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.pagination.init(),
                                this.pagination.render(),
                                this.pagination.update();
                        },
                        activeIndexChange: function () {
                            this.params.loop
                                ? this.pagination.update()
                                : void 0 === this.snapIndex && this.pagination.update();
                        },
                        snapIndexChange: function () {
                            this.params.loop || this.pagination.update();
                        },
                        slidesLengthChange: function () {
                            this.params.loop &&
                            (this.pagination.render(), this.pagination.update());
                        },
                        snapGridLengthChange: function () {
                            this.params.loop ||
                            (this.pagination.render(), this.pagination.update());
                        },
                        destroy: function () {
                            this.pagination.destroy();
                        },
                        click: function (e) {
                            this.params.pagination.el &&
                            this.params.pagination.hideOnClick &&
                            this.pagination.$el.length > 0 &&
                            !n(e.target).hasClass(this.params.pagination.bulletClass) &&
                            (!0 ===
                            this.pagination.$el.hasClass(this.params.pagination.hiddenClass)
                                ? this.emit("paginationShow", this)
                                : this.emit("paginationHide", this),
                                this.pagination.$el.toggleClass(
                                    this.params.pagination.hiddenClass
                                ));
                        },
                    },
                },
                {
                    name: "scrollbar",
                    params: {
                        scrollbar: {
                            el: null,
                            dragSize: "auto",
                            hide: !1,
                            draggable: !1,
                            snapOnRelease: !0,
                            lockClass: "swiper-scrollbar-lock",
                            dragClass: "swiper-scrollbar-drag",
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            scrollbar: {
                                init: ie.init.bind(this),
                                destroy: ie.destroy.bind(this),
                                updateSize: ie.updateSize.bind(this),
                                setTranslate: ie.setTranslate.bind(this),
                                setTransition: ie.setTransition.bind(this),
                                enableDraggable: ie.enableDraggable.bind(this),
                                disableDraggable: ie.disableDraggable.bind(this),
                                setDragPosition: ie.setDragPosition.bind(this),
                                getPointerPosition: ie.getPointerPosition.bind(this),
                                onDragStart: ie.onDragStart.bind(this),
                                onDragMove: ie.onDragMove.bind(this),
                                onDragEnd: ie.onDragEnd.bind(this),
                                isTouched: !1,
                                timeout: null,
                                dragTimeout: null,
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.scrollbar.init(),
                                this.scrollbar.updateSize(),
                                this.scrollbar.setTranslate();
                        },
                        update: function () {
                            this.scrollbar.updateSize();
                        },
                        resize: function () {
                            this.scrollbar.updateSize();
                        },
                        observerUpdate: function () {
                            this.scrollbar.updateSize();
                        },
                        setTranslate: function () {
                            this.scrollbar.setTranslate();
                        },
                        setTransition: function (e) {
                            this.scrollbar.setTransition(e);
                        },
                        destroy: function () {
                            this.scrollbar.destroy();
                        },
                    },
                },
                {
                    name: "parallax",
                    params: {parallax: {enabled: !1}},
                    create: function () {
                        r.extend(this, {
                            parallax: {
                                setTransform: ne.setTransform.bind(this),
                                setTranslate: ne.setTranslate.bind(this),
                                setTransition: ne.setTransition.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            this.params.parallax.enabled &&
                            ((this.params.watchSlidesProgress = !0),
                                (this.originalParams.watchSlidesProgress = !0));
                        },
                        init: function () {
                            this.params.parallax.enabled && this.parallax.setTranslate();
                        },
                        setTranslate: function () {
                            this.params.parallax.enabled && this.parallax.setTranslate();
                        },
                        setTransition: function (e) {
                            this.params.parallax.enabled && this.parallax.setTransition(e);
                        },
                    },
                },
                {
                    name: "zoom",
                    params: {
                        zoom: {
                            enabled: !1,
                            maxRatio: 3,
                            minRatio: 1,
                            toggle: !0,
                            containerClass: "swiper-zoom-container",
                            zoomedSlideClass: "swiper-slide-zoomed",
                        },
                    },
                    create: function () {
                        var e = this,
                            t = {
                                enabled: !1,
                                scale: 1,
                                currentScale: 1,
                                isScaling: !1,
                                gesture: {
                                    $slideEl: void 0,
                                    slideWidth: void 0,
                                    slideHeight: void 0,
                                    $imageEl: void 0,
                                    $imageWrapEl: void 0,
                                    maxRatio: 3,
                                },
                                image: {
                                    isTouched: void 0,
                                    isMoved: void 0,
                                    currentX: void 0,
                                    currentY: void 0,
                                    minX: void 0,
                                    minY: void 0,
                                    maxX: void 0,
                                    maxY: void 0,
                                    width: void 0,
                                    height: void 0,
                                    startX: void 0,
                                    startY: void 0,
                                    touchesStart: {},
                                    touchesCurrent: {},
                                },
                                velocity: {
                                    x: void 0,
                                    y: void 0,
                                    prevPositionX: void 0,
                                    prevPositionY: void 0,
                                    prevTime: void 0,
                                },
                            };
                        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
                            .split(" ")
                            .forEach(function (i) {
                                t[i] = se[i].bind(e);
                            }),
                            r.extend(e, {zoom: t});
                        var i = 1;
                        Object.defineProperty(e.zoom, "scale", {
                            get: function () {
                                return i;
                            },
                            set: function (t) {
                                if (i !== t) {
                                    var n = e.zoom.gesture.$imageEl
                                        ? e.zoom.gesture.$imageEl[0]
                                        : void 0,
                                        s = e.zoom.gesture.$slideEl
                                            ? e.zoom.gesture.$slideEl[0]
                                            : void 0;
                                    e.emit("zoomChange", t, n, s);
                                }
                                i = t;
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.params.zoom.enabled && this.zoom.enable();
                        },
                        destroy: function () {
                            this.zoom.disable();
                        },
                        touchStart: function (e) {
                            this.zoom.enabled && this.zoom.onTouchStart(e);
                        },
                        touchEnd: function (e) {
                            this.zoom.enabled && this.zoom.onTouchEnd(e);
                        },
                        doubleTap: function (e) {
                            this.params.zoom.enabled &&
                            this.zoom.enabled &&
                            this.params.zoom.toggle &&
                            this.zoom.toggle(e);
                        },
                        transitionEnd: function () {
                            this.zoom.enabled &&
                            this.params.zoom.enabled &&
                            this.zoom.onTransitionEnd();
                        },
                        slideChange: function () {
                            this.zoom.enabled &&
                            this.params.zoom.enabled &&
                            this.params.cssMode &&
                            this.zoom.onTransitionEnd();
                        },
                    },
                },
                {
                    name: "lazy",
                    params: {
                        lazy: {
                            enabled: !1,
                            loadPrevNext: !1,
                            loadPrevNextAmount: 1,
                            loadOnTransitionStart: !1,
                            elementClass: "swiper-lazy",
                            loadingClass: "swiper-lazy-loading",
                            loadedClass: "swiper-lazy-loaded",
                            preloaderClass: "swiper-lazy-preloader",
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            lazy: {
                                initialImageLoaded: !1,
                                load: ae.load.bind(this),
                                loadInSlide: ae.loadInSlide.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            this.params.lazy.enabled &&
                            this.params.preloadImages &&
                            (this.params.preloadImages = !1);
                        },
                        init: function () {
                            this.params.lazy.enabled &&
                            !this.params.loop &&
                            0 === this.params.initialSlide &&
                            this.lazy.load();
                        },
                        scroll: function () {
                            this.params.freeMode &&
                            !this.params.freeModeSticky &&
                            this.lazy.load();
                        },
                        resize: function () {
                            this.params.lazy.enabled && this.lazy.load();
                        },
                        scrollbarDragMove: function () {
                            this.params.lazy.enabled && this.lazy.load();
                        },
                        transitionStart: function () {
                            this.params.lazy.enabled &&
                            (this.params.lazy.loadOnTransitionStart ||
                                (!this.params.lazy.loadOnTransitionStart &&
                                    !this.lazy.initialImageLoaded)) &&
                            this.lazy.load();
                        },
                        transitionEnd: function () {
                            this.params.lazy.enabled &&
                            !this.params.lazy.loadOnTransitionStart &&
                            this.lazy.load();
                        },
                        slideChange: function () {
                            this.params.lazy.enabled &&
                            this.params.cssMode &&
                            this.lazy.load();
                        },
                    },
                },
                {
                    name: "controller",
                    params: {controller: {control: void 0, inverse: !1, by: "slide"}},
                    create: function () {
                        r.extend(this, {
                            controller: {
                                control: this.params.controller.control,
                                getInterpolateFunction: re.getInterpolateFunction.bind(this),
                                setTranslate: re.setTranslate.bind(this),
                                setTransition: re.setTransition.bind(this),
                            },
                        });
                    },
                    on: {
                        update: function () {
                            this.controller.control &&
                            this.controller.spline &&
                            ((this.controller.spline = void 0),
                                delete this.controller.spline);
                        },
                        resize: function () {
                            this.controller.control &&
                            this.controller.spline &&
                            ((this.controller.spline = void 0),
                                delete this.controller.spline);
                        },
                        observerUpdate: function () {
                            this.controller.control &&
                            this.controller.spline &&
                            ((this.controller.spline = void 0),
                                delete this.controller.spline);
                        },
                        setTranslate: function (e, t) {
                            this.controller.control && this.controller.setTranslate(e, t);
                        },
                        setTransition: function (e, t) {
                            this.controller.control && this.controller.setTransition(e, t);
                        },
                    },
                },
                {
                    name: "a11y",
                    params: {
                        a11y: {
                            enabled: !0,
                            notificationClass: "swiper-notification",
                            prevSlideMessage: "Previous slide",
                            nextSlideMessage: "Next slide",
                            firstSlideMessage: "This is the first slide",
                            lastSlideMessage: "This is the last slide",
                            paginationBulletMessage: "Go to slide {{index}}",
                        },
                    },
                    create: function () {
                        var e = this;
                        r.extend(e, {
                            a11y: {
                                liveRegion: n(
                                    '<span class="' +
                                    e.params.a11y.notificationClass +
                                    '" aria-live="assertive" aria-atomic="true"></span>'
                                ),
                            },
                        }),
                            Object.keys(oe).forEach(function (t) {
                                e.a11y[t] = oe[t].bind(e);
                            });
                    },
                    on: {
                        init: function () {
                            this.params.a11y.enabled &&
                            (this.a11y.init(), this.a11y.updateNavigation());
                        },
                        toEdge: function () {
                            this.params.a11y.enabled && this.a11y.updateNavigation();
                        },
                        fromEdge: function () {
                            this.params.a11y.enabled && this.a11y.updateNavigation();
                        },
                        paginationUpdate: function () {
                            this.params.a11y.enabled && this.a11y.updatePagination();
                        },
                        destroy: function () {
                            this.params.a11y.enabled && this.a11y.destroy();
                        },
                    },
                },
                {
                    name: "history",
                    params: {history: {enabled: !1, replaceState: !1, key: "slides"}},
                    create: function () {
                        r.extend(this, {
                            history: {
                                init: le.init.bind(this),
                                setHistory: le.setHistory.bind(this),
                                setHistoryPopState: le.setHistoryPopState.bind(this),
                                scrollToSlide: le.scrollToSlide.bind(this),
                                destroy: le.destroy.bind(this),
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.params.history.enabled && this.history.init();
                        },
                        destroy: function () {
                            this.params.history.enabled && this.history.destroy();
                        },
                        transitionEnd: function () {
                            this.history.initialized &&
                            this.history.setHistory(
                                this.params.history.key,
                                this.activeIndex
                            );
                        },
                        slideChange: function () {
                            this.history.initialized &&
                            this.params.cssMode &&
                            this.history.setHistory(
                                this.params.history.key,
                                this.activeIndex
                            );
                        },
                    },
                },
                {
                    name: "hash-navigation",
                    params: {
                        hashNavigation: {enabled: !1, replaceState: !1, watchState: !1},
                    },
                    create: function () {
                        r.extend(this, {
                            hashNavigation: {
                                initialized: !1,
                                init: ce.init.bind(this),
                                destroy: ce.destroy.bind(this),
                                setHash: ce.setHash.bind(this),
                                onHashCange: ce.onHashCange.bind(this),
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.params.hashNavigation.enabled && this.hashNavigation.init();
                        },
                        destroy: function () {
                            this.params.hashNavigation.enabled &&
                            this.hashNavigation.destroy();
                        },
                        transitionEnd: function () {
                            this.hashNavigation.initialized && this.hashNavigation.setHash();
                        },
                        slideChange: function () {
                            this.hashNavigation.initialized &&
                            this.params.cssMode &&
                            this.hashNavigation.setHash();
                        },
                    },
                },
                {
                    name: "autoplay",
                    params: {
                        autoplay: {
                            enabled: !1,
                            delay: 3e3,
                            waitForTransition: !0,
                            disableOnInteraction: !0,
                            stopOnLastSlide: !1,
                            reverseDirection: !1,
                        },
                    },
                    create: function () {
                        var e = this;
                        r.extend(e, {
                            autoplay: {
                                running: !1,
                                paused: !1,
                                run: de.run.bind(e),
                                start: de.start.bind(e),
                                stop: de.stop.bind(e),
                                pause: de.pause.bind(e),
                                onVisibilityChange: function () {
                                    "hidden" === document.visibilityState &&
                                    e.autoplay.running &&
                                    e.autoplay.pause(),
                                    "visible" === document.visibilityState &&
                                    e.autoplay.paused &&
                                    (e.autoplay.run(), (e.autoplay.paused = !1));
                                },
                                onTransitionEnd: function (t) {
                                    e &&
                                    !e.destroyed &&
                                    e.$wrapperEl &&
                                    t.target === this &&
                                    (e.$wrapperEl[0].removeEventListener(
                                        "transitionend",
                                        e.autoplay.onTransitionEnd
                                    ),
                                        e.$wrapperEl[0].removeEventListener(
                                            "webkitTransitionEnd",
                                            e.autoplay.onTransitionEnd
                                        ),
                                        (e.autoplay.paused = !1),
                                        e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
                                },
                            },
                        });
                    },
                    on: {
                        init: function () {
                            this.params.autoplay.enabled &&
                            (this.autoplay.start(),
                                document.addEventListener(
                                    "visibilitychange",
                                    this.autoplay.onVisibilityChange
                                ));
                        },
                        beforeTransitionStart: function (e, t) {
                            this.autoplay.running &&
                            (t || !this.params.autoplay.disableOnInteraction
                                ? this.autoplay.pause(e)
                                : this.autoplay.stop());
                        },
                        sliderFirstMove: function () {
                            this.autoplay.running &&
                            (this.params.autoplay.disableOnInteraction
                                ? this.autoplay.stop()
                                : this.autoplay.pause());
                        },
                        touchEnd: function () {
                            this.params.cssMode &&
                            this.autoplay.paused &&
                            !this.params.autoplay.disableOnInteraction &&
                            this.autoplay.run();
                        },
                        destroy: function () {
                            this.autoplay.running && this.autoplay.stop(),
                                document.removeEventListener(
                                    "visibilitychange",
                                    this.autoplay.onVisibilityChange
                                );
                        },
                    },
                },
                {
                    name: "effect-fade",
                    params: {fadeEffect: {crossFade: !1}},
                    create: function () {
                        r.extend(this, {
                            fadeEffect: {
                                setTranslate: he.setTranslate.bind(this),
                                setTransition: he.setTransition.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            if ("fade" === this.params.effect) {
                                this.classNames.push(
                                    this.params.containerModifierClass + "fade"
                                );
                                var e = {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    slidesPerGroup: 1,
                                    watchSlidesProgress: !0,
                                    spaceBetween: 0,
                                    virtualTranslate: !0,
                                };
                                r.extend(this.params, e), r.extend(this.originalParams, e);
                            }
                        },
                        setTranslate: function () {
                            "fade" === this.params.effect && this.fadeEffect.setTranslate();
                        },
                        setTransition: function (e) {
                            "fade" === this.params.effect && this.fadeEffect.setTransition(e);
                        },
                    },
                },
                {
                    name: "effect-cube",
                    params: {
                        cubeEffect: {
                            slideShadows: !0,
                            shadow: !0,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            cubeEffect: {
                                setTranslate: ue.setTranslate.bind(this),
                                setTransition: ue.setTransition.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            if ("cube" === this.params.effect) {
                                this.classNames.push(
                                    this.params.containerModifierClass + "cube"
                                ),
                                    this.classNames.push(
                                        this.params.containerModifierClass + "3d"
                                    );
                                var e = {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    slidesPerGroup: 1,
                                    watchSlidesProgress: !0,
                                    resistanceRatio: 0,
                                    spaceBetween: 0,
                                    centeredSlides: !1,
                                    virtualTranslate: !0,
                                };
                                r.extend(this.params, e), r.extend(this.originalParams, e);
                            }
                        },
                        setTranslate: function () {
                            "cube" === this.params.effect && this.cubeEffect.setTranslate();
                        },
                        setTransition: function (e) {
                            "cube" === this.params.effect && this.cubeEffect.setTransition(e);
                        },
                    },
                },
                {
                    name: "effect-flip",
                    params: {flipEffect: {slideShadows: !0, limitRotation: !0}},
                    create: function () {
                        r.extend(this, {
                            flipEffect: {
                                setTranslate: pe.setTranslate.bind(this),
                                setTransition: pe.setTransition.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            if ("flip" === this.params.effect) {
                                this.classNames.push(
                                    this.params.containerModifierClass + "flip"
                                ),
                                    this.classNames.push(
                                        this.params.containerModifierClass + "3d"
                                    );
                                var e = {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    slidesPerGroup: 1,
                                    watchSlidesProgress: !0,
                                    spaceBetween: 0,
                                    virtualTranslate: !0,
                                };
                                r.extend(this.params, e), r.extend(this.originalParams, e);
                            }
                        },
                        setTranslate: function () {
                            "flip" === this.params.effect && this.flipEffect.setTranslate();
                        },
                        setTransition: function (e) {
                            "flip" === this.params.effect && this.flipEffect.setTransition(e);
                        },
                    },
                },
                {
                    name: "effect-coverflow",
                    params: {
                        coverflowEffect: {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: !0,
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            coverflowEffect: {
                                setTranslate: fe.setTranslate.bind(this),
                                setTransition: fe.setTransition.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            "coverflow" === this.params.effect &&
                            (this.classNames.push(
                                this.params.containerModifierClass + "coverflow"
                            ),
                                this.classNames.push(this.params.containerModifierClass + "3d"),
                                (this.params.watchSlidesProgress = !0),
                                (this.originalParams.watchSlidesProgress = !0));
                        },
                        setTranslate: function () {
                            "coverflow" === this.params.effect &&
                            this.coverflowEffect.setTranslate();
                        },
                        setTransition: function (e) {
                            "coverflow" === this.params.effect &&
                            this.coverflowEffect.setTransition(e);
                        },
                    },
                },
                {
                    name: "thumbs",
                    params: {
                        thumbs: {
                            multipleActiveThumbs: !0,
                            swiper: null,
                            slideThumbActiveClass: "swiper-slide-thumb-active",
                            thumbsContainerClass: "swiper-container-thumbs",
                        },
                    },
                    create: function () {
                        r.extend(this, {
                            thumbs: {
                                swiper: null,
                                init: me.init.bind(this),
                                update: me.update.bind(this),
                                onThumbClick: me.onThumbClick.bind(this),
                            },
                        });
                    },
                    on: {
                        beforeInit: function () {
                            var e = this.params.thumbs;
                            e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
                        },
                        slideChange: function () {
                            this.thumbs.swiper && this.thumbs.update();
                        },
                        update: function () {
                            this.thumbs.swiper && this.thumbs.update();
                        },
                        resize: function () {
                            this.thumbs.swiper && this.thumbs.update();
                        },
                        observerUpdate: function () {
                            this.thumbs.swiper && this.thumbs.update();
                        },
                        setTransition: function (e) {
                            var t = this.thumbs.swiper;
                            t && t.setTransition(e);
                        },
                        beforeDestroy: function () {
                            var e = this.thumbs.swiper;
                            e && this.thumbs.swiperCreated && e && e.destroy();
                        },
                    },
                },
            ];
        return (
            void 0 === F.use &&
            ((F.use = F.Class.use), (F.installModule = F.Class.installModule)),
                F.use(ve),
                F
        );
    }),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = t())
            : "function" == typeof define && define.amd
            ? define(t)
            : (e.lozad = t());
    })(this, function () {
        "use strict";
        "undefined" != typeof document && document.documentMode;
        var e = {
            rootMargin: "0px",
            threshold: 0,
            load: function (e) {
                if ("picture" === e.nodeName.toLowerCase()) {
                    var t = document.createElement("img");
                    h &&
                    e.getAttribute("data-iesrc") &&
                    (t.src = e.getAttribute("data-iesrc")),
                    e.getAttribute("data-alt") && (t.alt = e.getAttribute("data-alt")),
                        e.appendChild(t);
                }
                if (
                    ("iframe" === e.nodeName.toLowerCase() &&
                    e.getAttribute("data-src") &&
                    (e.setAttribute("src", e.getAttribute("data-src")),
                        e.setAttribute("data-loaded", "true")),
                    "video" === e.nodeName.toLowerCase() &&
                    !e.getAttribute("data-src") &&
                    e.children)
                ) {
                    e.setAttribute("poster", e.getAttribute("data-poster")),
                        (t = e.children);
                    for (var i, n = 0; n <= t.length - 1; n++)
                        (i = t[n].getAttribute("data-src")) && (t[n].src = i);
                    e.load();
                }
                e.getAttribute("data-src") && (e.src = e.getAttribute("data-src")),
                e.getAttribute("data-srcset") &&
                e.setAttribute("srcset", e.getAttribute("data-srcset")),
                e.getAttribute("data-background-image") &&
                (e.style.backgroundImage =
                    "url('" + e.getAttribute("data-background-image") + "')"),
                e.getAttribute("data-toggle-class") &&
                e.classList.toggle(e.getAttribute("data-toggle-class"));
            },
            loaded: function (e) {
                e.onload = (e) => {
                    t(e.target);
                };
            },
        };

        function t(e) {
            e.setAttribute("data-loaded", !0),
                e.parentElement.setAttribute("data-loaded", !0);
        }

        var i = function (e) {
                return "true" === e.getAttribute("data-loaded");
            },
            n = function (e, t) {
                return function (n, s) {
                    n.forEach(function (n) {
                        (n.intersectionRatio > 0 || n.isIntersecting) &&
                        (s.unobserve(n.target),
                        i(n.target) || (e(n.target), t(n.target)));
                    });
                };
            },
            s = function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : document;
                return e instanceof Element
                    ? [e]
                    : e instanceof NodeList
                        ? e
                        : t.querySelectorAll(e);
            };
        return function () {
            var a =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : ".lozad",
                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = Object.assign({}, e, r),
                l = o.root,
                c = o.rootMargin,
                d = o.threshold,
                h = o.load,
                u = o.loaded,
                p = void 0;
            return (
                "undefined" != typeof window &&
                window.IntersectionObserver &&
                (p = new IntersectionObserver(n(h, u), {
                    root: l,
                    rootMargin: c,
                    threshold: d,
                })),
                    {
                        observe: function () {
                            for (var e = s(a, l), n = 0; n < e.length; n++)
                                i(e[n]) || (p ? p.observe(e[n]) : (h(e[n]), t(e[n]), u(e[n])));
                        },
                        triggerLoad: function (e) {
                            i(e) || (h(e), t(e), u(e));
                        },
                        observer: p,
                    }
            );
        };
    }),
    (function (e, t, i, n) {
        "use strict";
        if (((e.console = e.console || {
            info: function (e) {
            }
        }), i))
            if (i.fn.fancybox) console.info("fancyBox already initialized");
            else {
                var s,
                    a,
                    r = {
                        closeExisting: !1,
                        loop: !1,
                        gutter: 50,
                        keyboard: !0,
                        preventCaptionOverlap: !0,
                        arrows: !0,
                        infobar: !0,
                        smallBtn: "auto",
                        toolbar: "auto",
                        buttons: ["zoom", "slideShow", "thumbs", "close"],
                        idleTime: 3,
                        protect: !1,
                        modal: !1,
                        image: {preload: !1},
                        ajax: {settings: {data: {fancybox: !0}}},
                        iframe: {
                            tpl:
                                '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                            preload: !0,
                            css: {},
                            attr: {scrolling: "auto"},
                        },
                        video: {
                            tpl:
                                '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                            format: "",
                            autoStart: !0,
                        },
                        defaultType: "image",
                        animationEffect: "zoom",
                        animationDuration: 366,
                        zoomOpacity: "auto",
                        transitionEffect: "fade",
                        transitionDuration: 366,
                        slideClass: "",
                        baseClass: "",
                        baseTpl:
                            '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                        spinnerTpl: '<div class="fancybox-loading"></div>',
                        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                        btnTpl: {
                            download:
                                '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                            zoom:
                                '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" data-cursor-title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                            close:
                                '<button data-fancybox-close class="fancybox-button fancybox-button--close" data-cursor-title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                            arrowLeft:
                                '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" data-cursor-title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                            arrowRight:
                                '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" data-cursor-title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                            smallBtn:
                                '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" data-cursor-title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
                        },
                        parentEl: "body",
                        hideScrollbar: !0,
                        autoFocus: !0,
                        backFocus: !0,
                        trapFocus: !0,
                        fullScreen: {autoStart: !1},
                        touch: {vertical: !0, momentum: !0},
                        hash: null,
                        media: {},
                        slideShow: {autoStart: !1, speed: 3e3},
                        thumbs: {
                            autoStart: !1,
                            hideOnClose: !0,
                            parentEl: ".fancybox-container",
                            axis: "y",
                        },
                        wheel: "auto",
                        onInit: i.noop,
                        beforeLoad: i.noop,
                        afterLoad: i.noop,
                        beforeShow: i.noop,
                        afterShow: i.noop,
                        beforeClose: i.noop,
                        afterClose: i.noop,
                        onActivate: i.noop,
                        onDeactivate: i.noop,
                        clickContent: function (e, t) {
                            return "image" === e.type && "zoom";
                        },
                        clickSlide: "close",
                        clickOutside: "close",
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1,
                        mobile: {
                            preventCaptionOverlap: !1,
                            idleTime: !1,
                            clickContent: function (e, t) {
                                return "image" === e.type && "toggleControls";
                            },
                            clickSlide: function (e, t) {
                                return "image" === e.type ? "toggleControls" : "close";
                            },
                            dblclickContent: function (e, t) {
                                return "image" === e.type && "zoom";
                            },
                            dblclickSlide: function (e, t) {
                                return "image" === e.type && "zoom";
                            },
                        },
                        lang: "en",
                        i18n: {
                            en: {
                                CLOSE: "Close",
                                NEXT: "Next",
                                PREV: "Previous",
                                ERROR:
                                    "The requested content cannot be loaded. <br/> Please try again later.",
                                PLAY_START: "Start slideshow",
                                PLAY_STOP: "Pause slideshow",
                                FULL_SCREEN: "Full screen",
                                THUMBS: "Thumbnails",
                                DOWNLOAD: "Download",
                                SHARE: "Share",
                                ZOOM: "Zoom",
                            },
                            de: {
                                CLOSE: "Schlie&szlig;en",
                                NEXT: "Weiter",
                                PREV: "Zur&uuml;ck",
                                ERROR:
                                    "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                                PLAY_START: "Diaschau starten",
                                PLAY_STOP: "Diaschau beenden",
                                FULL_SCREEN: "Vollbild",
                                THUMBS: "Vorschaubilder",
                                DOWNLOAD: "Herunterladen",
                                SHARE: "Teilen",
                                ZOOM: "Vergr&ouml;&szlig;ern",
                            },
                        },
                    },
                    o = i(e),
                    l = i(t),
                    c = 0,
                    d =
                        e.requestAnimationFrame ||
                        e.webkitRequestAnimationFrame ||
                        e.mozRequestAnimationFrame ||
                        e.oRequestAnimationFrame ||
                        function (t) {
                            return e.setTimeout(t, 1e3 / 60);
                        },
                    h =
                        e.cancelAnimationFrame ||
                        e.webkitCancelAnimationFrame ||
                        e.mozCancelAnimationFrame ||
                        e.oCancelAnimationFrame ||
                        function (t) {
                            e.clearTimeout(t);
                        },
                    u = (function () {
                        var e,
                            i = t.createElement("fakeelement"),
                            n = {
                                transition: "transitionend",
                                OTransition: "oTransitionEnd",
                                MozTransition: "transitionend",
                                WebkitTransition: "webkitTransitionEnd",
                            };
                        for (e in n) if (void 0 !== i.style[e]) return n[e];
                        return "transitionend";
                    })(),
                    p = function (e) {
                        return e && e.length && e[0].offsetHeight;
                    },
                    f = function (e, t) {
                        var n = i.extend(!0, {}, e, t);
                        return (
                            i.each(t, function (e, t) {
                                i.isArray(t) && (n[e] = t);
                            }),
                                n
                        );
                    },
                    m = function (e, t, n) {
                        (this.opts = f({index: n}, i.fancybox.defaults)),
                        i.isPlainObject(t) && (this.opts = f(this.opts, t)),
                        i.fancybox.isMobile &&
                        (this.opts = f(this.opts, this.opts.mobile)),
                            (this.id = this.opts.id || ++c),
                            (this.currIndex = parseInt(this.opts.index, 10) || 0),
                            (this.prevIndex = null),
                            (this.prevPos = null),
                            (this.currPos = 0),
                            (this.firstRun = !0),
                            (this.group = []),
                            (this.slides = {}),
                            this.addContent(e),
                        this.group.length && this.init();
                    };
                i.extend(m.prototype, {
                    init: function () {
                        var n,
                            s,
                            a = this,
                            r = a.group[a.currIndex].opts;
                        r.closeExisting && i.fancybox.close(!0),
                            i("body").addClass("fancybox-active"),
                        !i.fancybox.getInstance() &&
                        !1 !== r.hideScrollbar &&
                        !i.fancybox.isMobile &&
                        t.body.scrollHeight > e.innerHeight &&
                        (i("head").append(
                            '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                            (e.innerWidth - t.documentElement.clientWidth) +
                            "px;}</style>"
                        ),
                            i("body").addClass("compensate-for-scrollbar")),
                            (s = ""),
                            i.each(r.buttons, function (e, t) {
                                s += r.btnTpl[t] || "";
                            }),
                            (n = i(
                                a.translate(
                                    a,
                                    r.baseTpl
                                        .replace("{{buttons}}", s)
                                        .replace(
                                            "{{arrows}}",
                                            r.btnTpl.arrowLeft + r.btnTpl.arrowRight
                                        )
                                )
                            )
                                .attr("id", "fancybox-container-" + a.id)
                                .addClass(r.baseClass)
                                .data("FancyBox", a)
                                .appendTo(r.parentEl)),
                            (a.$refs = {container: n}),
                            [
                                "bg",
                                "inner",
                                "infobar",
                                "toolbar",
                                "stage",
                                "caption",
                                "navigation",
                            ].forEach(function (e) {
                                a.$refs[e] = n.find(".fancybox-" + e);
                            }),
                            a.trigger("onInit"),
                            a.activate(),
                            a.jumpTo(a.currIndex);
                    },
                    translate: function (e, t) {
                        var i = e.opts.i18n[e.opts.lang] || e.opts.i18n.en;
                        return t.replace(/\{\{(\w+)\}\}/g, function (e, t) {
                            return void 0 === i[t] ? e : i[t];
                        });
                    },
                    addContent: function (e) {
                        var t,
                            n = this,
                            s = i.makeArray(e);
                        i.each(s, function (e, t) {
                            var s,
                                a,
                                r,
                                o,
                                l,
                                c = {},
                                d = {};
                            i.isPlainObject(t)
                                ? ((c = t), (d = t.opts || t))
                                : "object" === i.type(t) && i(t).length
                                ? ((d = (s = i(t)).data() || {}),
                                    ((d = i.extend(!0, {}, d, d.options)).$orig = s),
                                    (c.src = n.opts.src || d.src || s.attr("href")),
                                c.type || c.src || ((c.type = "inline"), (c.src = t)))
                                : (c = {type: "html", src: t + ""}),
                                (c.opts = i.extend(!0, {}, n.opts, d)),
                            i.isArray(d.buttons) && (c.opts.buttons = d.buttons),
                            i.fancybox.isMobile &&
                            c.opts.mobile &&
                            (c.opts = f(c.opts, c.opts.mobile)),
                                (a = c.type || c.opts.type),
                                (o = c.src || ""),
                            !a &&
                            o &&
                            ((r = o.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                                ? ((a = "video"),
                                c.opts.video.format ||
                                (c.opts.video.format =
                                    "video/" + ("ogv" === r[1] ? "ogg" : r[1])))
                                : o.match(
                                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                                )
                                    ? (a = "image")
                                    : o.match(/\.(pdf)((\?|#).*)?$/i)
                                        ? ((a = "iframe"),
                                            (c = i.extend(!0, c, {
                                                contentType: "pdf",
                                                opts: {iframe: {preload: !1}},
                                            })))
                                        : "#" === o.charAt(0) && (a = "inline")),
                                a ? (c.type = a) : n.trigger("objectNeedsType", c),
                            c.contentType ||
                            (c.contentType =
                                i.inArray(c.type, ["html", "inline", "ajax"]) > -1
                                    ? "html"
                                    : c.type),
                                (c.index = n.group.length),
                            "auto" == c.opts.smallBtn &&
                            (c.opts.smallBtn =
                                i.inArray(c.type, ["html", "inline", "ajax"]) > -1),
                            "auto" === c.opts.toolbar &&
                            (c.opts.toolbar = !c.opts.smallBtn),
                                (c.$thumb = c.opts.$thumb || null),
                            c.opts.$trigger &&
                            c.index === n.opts.index &&
                            ((c.$thumb = c.opts.$trigger.find("img:first")),
                            c.$thumb.length && (c.opts.$orig = c.opts.$trigger)),
                            (c.$thumb && c.$thumb.length) ||
                            !c.opts.$orig ||
                            (c.$thumb = c.opts.$orig.find("img:first")),
                            c.$thumb && !c.$thumb.length && (c.$thumb = null),
                                (c.thumb = c.opts.thumb || (c.$thumb ? c.$thumb[0].src : null)),
                            "function" === i.type(c.opts.caption) &&
                            (c.opts.caption = c.opts.caption.apply(t, [n, c])),
                            "function" === i.type(n.opts.caption) &&
                            (c.opts.caption = n.opts.caption.apply(t, [n, c])),
                            c.opts.caption instanceof i ||
                            (c.opts.caption =
                                void 0 === c.opts.caption ? "" : c.opts.caption + ""),
                            "ajax" === c.type &&
                            (l = o.split(/\s+/, 2)).length > 1 &&
                            ((c.src = l.shift()), (c.opts.filter = l.shift())),
                            c.opts.modal &&
                            (c.opts = i.extend(!0, c.opts, {
                                trapFocus: !0,
                                infobar: 0,
                                toolbar: 0,
                                smallBtn: 0,
                                keyboard: 0,
                                slideShow: 0,
                                fullScreen: 0,
                                thumbs: 0,
                                touch: 0,
                                clickContent: !1,
                                clickSlide: !1,
                                clickOutside: !1,
                                dblclickContent: !1,
                                dblclickSlide: !1,
                                dblclickOutside: !1,
                            })),
                                n.group.push(c);
                        }),
                        Object.keys(n.slides).length &&
                        (n.updateControls(),
                        (t = n.Thumbs) && t.isActive && (t.create(), t.focus()));
                    },
                    addEvents: function () {
                        var t = this;
                        t.removeEvents(),
                            t.$refs.container
                                .on("click.fb-close", "[data-fancybox-close]", function (e) {
                                    e.stopPropagation(), e.preventDefault(), t.close(e);
                                })
                                .on(
                                    "touchstart.fb-prev click.fb-prev",
                                    "[data-fancybox-prev]",
                                    function (e) {
                                        e.stopPropagation(), e.preventDefault(), t.previous();
                                    }
                                )
                                .on(
                                    "touchstart.fb-next click.fb-next",
                                    "[data-fancybox-next]",
                                    function (e) {
                                        e.stopPropagation(), e.preventDefault(), t.next();
                                    }
                                )
                                .on("click.fb", "[data-fancybox-zoom]", function (e) {
                                    t[t.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
                                }),
                            o.on("orientationchange.fb resize.fb", function (e) {
                                e && e.originalEvent && "resize" === e.originalEvent.type
                                    ? (t.requestId && h(t.requestId),
                                        (t.requestId = d(function () {
                                            t.update(e);
                                        })))
                                    : (t.current &&
                                    "iframe" === t.current.type &&
                                    t.$refs.stage.hide(),
                                        setTimeout(
                                            function () {
                                                t.$refs.stage.show(), t.update(e);
                                            },
                                            i.fancybox.isMobile ? 600 : 250
                                        ));
                            }),
                            l.on("keydown.fb", function (e) {
                                var n = (i.fancybox ? i.fancybox.getInstance() : null).current,
                                    s = e.keyCode || e.which;
                                if (9 != s) {
                                    if (
                                        !(
                                            !n.opts.keyboard ||
                                            e.ctrlKey ||
                                            e.altKey ||
                                            e.shiftKey ||
                                            i(e.target).is("input,textarea,video,audio,select")
                                        )
                                    )
                                        return 8 === s || 27 === s
                                            ? (e.preventDefault(), void t.close(e))
                                            : 37 === s || 38 === s
                                                ? (e.preventDefault(), void t.previous())
                                                : 39 === s || 40 === s
                                                    ? (e.preventDefault(), void t.next())
                                                    : void t.trigger("afterKeydown", e, s);
                                } else n.opts.trapFocus && t.focus(e);
                            }),
                        t.group[t.currIndex].opts.idleTime &&
                        ((t.idleSecondsCounter = 0),
                            l.on(
                                "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
                                function (e) {
                                    (t.idleSecondsCounter = 0),
                                    t.isIdle && t.showControls(),
                                        (t.isIdle = !1);
                                }
                            ),
                            (t.idleInterval = e.setInterval(function () {
                                t.idleSecondsCounter++,
                                t.idleSecondsCounter >=
                                t.group[t.currIndex].opts.idleTime &&
                                !t.isDragging &&
                                ((t.isIdle = !0),
                                    (t.idleSecondsCounter = 0),
                                    t.hideControls());
                            }, 1e3)));
                    },
                    removeEvents: function () {
                        o.off("orientationchange.fb resize.fb"),
                            l.off("keydown.fb .fb-idle"),
                            this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                        this.idleInterval &&
                        (e.clearInterval(this.idleInterval),
                            (this.idleInterval = null));
                    },
                    previous: function (e) {
                        return this.jumpTo(this.currPos - 1, e);
                    },
                    next: function (e) {
                        return this.jumpTo(this.currPos + 1, e);
                    },
                    jumpTo: function (e, t) {
                        var n,
                            s,
                            a,
                            r,
                            o,
                            l,
                            c,
                            d,
                            h,
                            u = this,
                            f = u.group.length;
                        if (
                            !(u.isDragging || u.isClosing || (u.isAnimating && u.firstRun))
                        ) {
                            if (
                                ((e = parseInt(e, 10)),
                                !(a = u.current ? u.current.opts.loop : u.opts.loop) &&
                                (e < 0 || e >= f))
                            )
                                return !1;
                            if (
                                ((n = u.firstRun = !Object.keys(u.slides).length),
                                    (o = u.current),
                                    (u.prevIndex = u.currIndex),
                                    (u.prevPos = u.currPos),
                                    (r = u.createSlide(e)),
                                f > 1 &&
                                ((a || r.index < f - 1) && u.createSlide(e + 1),
                                (a || r.index > 0) && u.createSlide(e - 1)),
                                    (u.current = r),
                                    (u.currIndex = r.index),
                                    (u.currPos = r.pos),
                                    u.trigger("beforeShow", n),
                                    u.updateControls(),
                                    (r.forcedDuration = void 0),
                                    i.isNumeric(t)
                                        ? (r.forcedDuration = t)
                                        : (t =
                                            r.opts[n ? "animationDuration" : "transitionDuration"]),
                                    (t = parseInt(t, 10)),
                                    (s = u.isMoved(r)),
                                    r.$slide.addClass("fancybox-slide--current"),
                                    n)
                            )
                                return (
                                    r.opts.animationEffect &&
                                    t &&
                                    u.$refs.container.css("transition-duration", t + "ms"),
                                        u.$refs.container
                                            .addClass("fancybox-is-open")
                                            .trigger("focus"),
                                        u.loadSlide(r),
                                        void u.preload("image")
                                );
                            (l = i.fancybox.getTranslate(o.$slide)),
                                (c = i.fancybox.getTranslate(u.$refs.stage)),
                                i.each(u.slides, function (e, t) {
                                    i.fancybox.stop(t.$slide, !0);
                                }),
                            o.pos !== r.pos && (o.isComplete = !1),
                                o.$slide.removeClass(
                                    "fancybox-slide--complete fancybox-slide--current"
                                ),
                                s
                                    ? ((h = l.left - (o.pos * l.width + o.pos * o.opts.gutter)),
                                        i.each(u.slides, function (e, n) {
                                            n.$slide
                                                .removeClass("fancybox-animated")
                                                .removeClass(function (e, t) {
                                                    return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(
                                                        " "
                                                    );
                                                });
                                            var s = n.pos * l.width + n.pos * n.opts.gutter;
                                            i.fancybox.setTranslate(n.$slide, {
                                                top: 0,
                                                left: s - c.left + h,
                                            }),
                                            n.pos !== r.pos &&
                                            n.$slide.addClass(
                                                "fancybox-slide--" +
                                                (n.pos > r.pos ? "next" : "previous")
                                            ),
                                                p(n.$slide),
                                                i.fancybox.animate(
                                                    n.$slide,
                                                    {
                                                        top: 0,
                                                        left:
                                                            (n.pos - r.pos) * l.width +
                                                            (n.pos - r.pos) * n.opts.gutter,
                                                    },
                                                    t,
                                                    function () {
                                                        n.$slide
                                                            .css({transform: "", opacity: ""})
                                                            .removeClass(
                                                                "fancybox-slide--next fancybox-slide--previous"
                                                            ),
                                                        n.pos === u.currPos && u.complete();
                                                    }
                                                );
                                        }))
                                    : t &&
                                    r.opts.transitionEffect &&
                                    ((d =
                                        "fancybox-animated fancybox-fx-" +
                                        r.opts.transitionEffect),
                                        o.$slide.addClass(
                                            "fancybox-slide--" + (o.pos > r.pos ? "next" : "previous")
                                        ),
                                        i.fancybox.animate(
                                            o.$slide,
                                            d,
                                            t,
                                            function () {
                                                o.$slide
                                                    .removeClass(d)
                                                    .removeClass(
                                                        "fancybox-slide--next fancybox-slide--previous"
                                                    );
                                            },
                                            !1
                                        )),
                                r.isLoaded ? u.revealContent(r) : u.loadSlide(r),
                                u.preload("image");
                        }
                    },
                    createSlide: function (e) {
                        var t, n;
                        return (
                            (n = (n = e % this.group.length) < 0 ? this.group.length + n : n),
                            !this.slides[e] &&
                            this.group[n] &&
                            ((t = i('<div class="fancybox-slide"></div>').appendTo(
                                this.$refs.stage
                            )),
                                (this.slides[e] = i.extend(!0, {}, this.group[n], {
                                    pos: e,
                                    $slide: t,
                                    isLoaded: !1,
                                })),
                                this.updateSlide(this.slides[e])),
                                this.slides[e]
                        );
                    },
                    scaleToActual: function (e, t, n) {
                        var s,
                            a,
                            r,
                            o,
                            l,
                            c = this,
                            d = c.current,
                            h = d.$content,
                            u = i.fancybox.getTranslate(d.$slide).width,
                            p = i.fancybox.getTranslate(d.$slide).height,
                            f = d.width,
                            m = d.height;
                        c.isAnimating ||
                        c.isMoved() ||
                        !h ||
                        "image" != d.type ||
                        !d.isLoaded ||
                        d.hasError ||
                        ((c.isAnimating = !0),
                            i.fancybox.stop(h),
                            (e = void 0 === e ? 0.5 * u : e),
                            (t = void 0 === t ? 0.5 * p : t),
                            ((s = i.fancybox.getTranslate(h)).top -= i.fancybox.getTranslate(
                                d.$slide
                            ).top),
                            (s.left -= i.fancybox.getTranslate(d.$slide).left),
                            (o = f / s.width),
                            (l = m / s.height),
                            (a = 0.5 * u - 0.5 * f),
                            (r = 0.5 * p - 0.5 * m),
                        f > u &&
                        ((a = s.left * o - (e * o - e)) > 0 && (a = 0),
                        a < u - f && (a = u - f)),
                        m > p &&
                        ((r = s.top * l - (t * l - t)) > 0 && (r = 0),
                        r < p - m && (r = p - m)),
                            c.updateCursor(f, m),
                            i.fancybox.animate(
                                h,
                                {top: r, left: a, scaleX: o, scaleY: l},
                                n || 366,
                                function () {
                                    c.isAnimating = !1;
                                }
                            ),
                        c.SlideShow && c.SlideShow.isActive && c.SlideShow.stop());
                    },
                    scaleToFit: function (e) {
                        var t,
                            n = this,
                            s = n.current,
                            a = s.$content;
                        n.isAnimating ||
                        n.isMoved() ||
                        !a ||
                        "image" != s.type ||
                        !s.isLoaded ||
                        s.hasError ||
                        ((n.isAnimating = !0),
                            i.fancybox.stop(a),
                            (t = n.getFitPos(s)),
                            n.updateCursor(t.width, t.height),
                            i.fancybox.animate(
                                a,
                                {
                                    top: t.top,
                                    left: t.left,
                                    scaleX: t.width / a.width(),
                                    scaleY: t.height / a.height(),
                                },
                                e || 366,
                                function () {
                                    n.isAnimating = !1;
                                }
                            ));
                    },
                    getFitPos: function (e) {
                        var t,
                            n,
                            s,
                            a,
                            r = e.$content,
                            o = e.$slide,
                            l = e.width || e.opts.width,
                            c = e.height || e.opts.height,
                            d = {};
                        return (
                            !!(e.isLoaded && r && r.length) &&
                            ((t = i.fancybox.getTranslate(this.$refs.stage).width),
                                (n = i.fancybox.getTranslate(this.$refs.stage).height),
                                (t -=
                                    parseFloat(o.css("paddingLeft")) +
                                    parseFloat(o.css("paddingRight")) +
                                    parseFloat(r.css("marginLeft")) +
                                    parseFloat(r.css("marginRight"))),
                                (n -=
                                    parseFloat(o.css("paddingTop")) +
                                    parseFloat(o.css("paddingBottom")) +
                                    parseFloat(r.css("marginTop")) +
                                    parseFloat(r.css("marginBottom"))),
                            (l && c) || ((l = t), (c = n)),
                            (l *= s = Math.min(1, t / l, n / c)) > t - 0.5 && (l = t),
                            (c *= s) > n - 0.5 && (c = n),
                                "image" === e.type
                                    ? ((d.top =
                                    Math.floor(0.5 * (n - c)) +
                                    parseFloat(o.css("paddingTop"))),
                                        (d.left =
                                            Math.floor(0.5 * (t - l)) +
                                            parseFloat(o.css("paddingLeft"))))
                                    : "video" === e.contentType &&
                                    (c >
                                    l /
                                    (a =
                                        e.opts.width && e.opts.height
                                            ? l / c
                                            : e.opts.ratio || 16 / 9)
                                        ? (c = l / a)
                                        : l > c * a && (l = c * a)),
                                (d.width = l),
                                (d.height = c),
                                d)
                        );
                    },
                    update: function (e) {
                        var t = this;
                        i.each(t.slides, function (i, n) {
                            t.updateSlide(n, e);
                        });
                    },
                    updateSlide: function (e, t) {
                        var n = e && e.$content,
                            s = e.width || e.opts.width,
                            a = e.height || e.opts.height,
                            r = e.$slide;
                        this.adjustCaption(e),
                        n &&
                        (s || a || "video" === e.contentType) &&
                        !e.hasError &&
                        (i.fancybox.stop(n),
                            i.fancybox.setTranslate(n, this.getFitPos(e)),
                        e.pos === this.currPos &&
                        ((this.isAnimating = !1), this.updateCursor())),
                            this.adjustLayout(e),
                        r.length &&
                        (r.trigger("refresh"),
                        e.pos === this.currPos &&
                        this.$refs.toolbar
                            .add(
                                this.$refs.navigation.find(
                                    ".fancybox-button--arrow_right"
                                )
                            )
                            .toggleClass(
                                "compensate-for-scrollbar",
                                r.get(0).scrollHeight > r.get(0).clientHeight
                            )),
                            this.trigger("onUpdate", e, t);
                    },
                    centerSlide: function (e) {
                        var t = this,
                            n = t.current,
                            s = n.$slide;
                        !t.isClosing &&
                        n &&
                        (s.siblings().css({transform: "", opacity: ""}),
                            s
                                .parent()
                                .children()
                                .removeClass("fancybox-slide--previous fancybox-slide--next"),
                            i.fancybox.animate(
                                s,
                                {top: 0, left: 0, opacity: 1},
                                void 0 === e ? 0 : e,
                                function () {
                                    s.css({transform: "", opacity: ""}),
                                    n.isComplete || t.complete();
                                },
                                !1
                            ));
                    },
                    isMoved: function (e) {
                        var t,
                            n,
                            s = e || this.current;
                        return (
                            !!s &&
                            ((n = i.fancybox.getTranslate(this.$refs.stage)),
                                (t = i.fancybox.getTranslate(s.$slide)),
                            !s.$slide.hasClass("fancybox-animated") &&
                            (Math.abs(t.top - n.top) > 0.5 ||
                                Math.abs(t.left - n.left) > 0.5))
                        );
                    },
                    updateCursor: function (e, t) {
                        var n,
                            s,
                            a = this.current,
                            r = this.$refs.container;
                        a &&
                        !this.isClosing &&
                        this.Guestures &&
                        (r.removeClass(
                            "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"
                        ),
                            (s = !!(n = this.canPan(e, t)) || this.isZoomable()),
                            r.toggleClass("fancybox-is-zoomable", s),
                            i("[data-fancybox-zoom]").prop("disabled", !s),
                            n
                                ? r.addClass("fancybox-can-pan")
                                : s &&
                                ("zoom" === a.opts.clickContent ||
                                    (i.isFunction(a.opts.clickContent) &&
                                        "zoom" == a.opts.clickContent(a)))
                                ? r.addClass("fancybox-can-zoomIn")
                                : a.opts.touch &&
                                (a.opts.touch.vertical || this.group.length > 1) &&
                                "video" !== a.contentType &&
                                r.addClass("fancybox-can-swipe"));
                    },
                    isZoomable: function () {
                        var e,
                            t = this.current;
                        if (t && !this.isClosing && "image" === t.type && !t.hasError) {
                            if (!t.isLoaded) return !0;
                            if (
                                (e = this.getFitPos(t)) &&
                                (t.width > e.width || t.height > e.height)
                            )
                                return !0;
                        }
                        return !1;
                    },
                    isScaledDown: function (e, t) {
                        var n = !1,
                            s = this.current,
                            a = s.$content;
                        return (
                            void 0 !== e && void 0 !== t
                                ? (n = e < s.width && t < s.height)
                                : a &&
                                (n =
                                    (n = i.fancybox.getTranslate(a)).width < s.width &&
                                    n.height < s.height),
                                n
                        );
                    },
                    canPan: function (e, t) {
                        var n = this.current,
                            s = null,
                            a = !1;
                        return (
                            "image" === n.type &&
                            (n.isComplete || (e && t)) &&
                            !n.hasError &&
                            ((a = this.getFitPos(n)),
                                void 0 !== e && void 0 !== t
                                    ? (s = {width: e, height: t})
                                    : n.isComplete && (s = i.fancybox.getTranslate(n.$content)),
                            s &&
                            a &&
                            (a =
                                Math.abs(s.width - a.width) > 1.5 ||
                                Math.abs(s.height - a.height) > 1.5)),
                                a
                        );
                    },
                    loadSlide: function (e) {
                        var t,
                            n,
                            s,
                            a = this;
                        if (!e.isLoading && !e.isLoaded) {
                            if (((e.isLoading = !0), !1 === a.trigger("beforeLoad", e)))
                                return (e.isLoading = !1), !1;
                            switch (
                                ((t = e.type),
                                    (n = e.$slide)
                                        .off("refresh")
                                        .trigger("onReset")
                                        .addClass(e.opts.slideClass),
                                    t)
                                ) {
                                case "image":
                                    a.setImage(e);
                                    break;
                                case "iframe":
                                    a.setIframe(e);
                                    break;
                                case "html":
                                    a.setContent(e, e.src || e.content);
                                    break;
                                case "video":
                                    a.setContent(
                                        e,
                                        e.opts.video.tpl
                                            .replace(/\{\{src\}\}/gi, e.src)
                                            .replace(
                                                "{{format}}",
                                                e.opts.videoFormat || e.opts.video.format || ""
                                            )
                                            .replace("{{poster}}", e.thumb || "")
                                    );
                                    break;
                                case "inline":
                                    i(e.src).length ? a.setContent(e, i(e.src)) : a.setError(e);
                                    break;
                                case "ajax":
                                    a.showLoading(e),
                                        (s = i.ajax(
                                            i.extend({}, e.opts.ajax.settings, {
                                                url: e.src,
                                                success: function (t, i) {
                                                    "success" === i && a.setContent(e, t);
                                                },
                                                error: function (t, i) {
                                                    t && "abort" !== i && a.setError(e);
                                                },
                                            })
                                        )),
                                        n.one("onReset", function () {
                                            s.abort();
                                        });
                                    break;
                                default:
                                    a.setError(e);
                            }
                            return !0;
                        }
                    },
                    setImage: function (e) {
                        var n,
                            s = this;
                        setTimeout(function () {
                            var t = e.$image;
                            s.isClosing ||
                            !e.isLoading ||
                            (t && t.length && t[0].complete) ||
                            e.hasError ||
                            s.showLoading(e);
                        }, 300),
                            s.checkSrcset(e),
                            (e.$content = i('<div class="fancybox-content"></div>')
                                .addClass("fancybox-is-hidden")
                                .appendTo(e.$slide.addClass("fancybox-slide--image"))),
                        !1 !== e.opts.preload &&
                        e.opts.width &&
                        e.opts.height &&
                        e.thumb &&
                        ((e.width = e.opts.width),
                            (e.height = e.opts.height),
                            ((n = t.createElement("img")).onerror = function () {
                                i(this).remove(), (e.$ghost = null);
                            }),
                            (n.onload = function () {
                                s.afterLoad(e);
                            }),
                            (e.$ghost = i(n)
                                .addClass("fancybox-image")
                                .appendTo(e.$content)
                                .attr("src", e.thumb))),
                            s.setBigImage(e);
                    },
                    checkSrcset: function (t) {
                        var i,
                            n,
                            s,
                            a,
                            r = t.opts.srcset || t.opts.image.srcset;
                        if (r) {
                            (s = e.devicePixelRatio || 1),
                                (a = e.innerWidth * s),
                                (n = r.split(",").map(function (e) {
                                    var t = {};
                                    return (
                                        e
                                            .trim()
                                            .split(/\s+/)
                                            .forEach(function (e, i) {
                                                var n = parseInt(e.substring(0, e.length - 1), 10);
                                                if (0 === i) return (t.url = e);
                                                n && ((t.value = n), (t.postfix = e[e.length - 1]));
                                            }),
                                            t
                                    );
                                })).sort(function (e, t) {
                                    return e.value - t.value;
                                });
                            for (var o = 0; o < n.length; o++) {
                                var l = n[o];
                                if (
                                    ("w" === l.postfix && l.value >= a) ||
                                    ("x" === l.postfix && l.value >= s)
                                ) {
                                    i = l;
                                    break;
                                }
                            }
                            !i && n.length && (i = n[n.length - 1]),
                            i &&
                            ((t.src = i.url),
                            t.width &&
                            t.height &&
                            "w" == i.postfix &&
                            ((t.height = (t.width / t.height) * i.value),
                                (t.width = i.value)),
                                (t.opts.srcset = r));
                        }
                    },
                    setBigImage: function (e) {
                        var n = this,
                            s = t.createElement("img"),
                            a = i(s);
                        (e.$image = a
                            .one("error", function () {
                                n.setError(e);
                            })
                            .one("load", function () {
                                var t;
                                e.$ghost ||
                                (n.resolveImageSlideSize(
                                    e,
                                    this.naturalWidth,
                                    this.naturalHeight
                                ),
                                    n.afterLoad(e)),
                                n.isClosing ||
                                (e.opts.srcset &&
                                (((t = e.opts.sizes) && "auto" !== t) ||
                                (t =
                                    (e.width / e.height > 1 && o.width() / o.height() > 1
                                        ? "100"
                                        : Math.round((e.width / e.height) * 100)) + "vw"),
                                    a.attr("sizes", t).attr("srcset", e.opts.srcset)),
                                e.$ghost &&
                                setTimeout(function () {
                                    e.$ghost && !n.isClosing && e.$ghost.hide();
                                }, Math.min(300, Math.max(1e3, e.height / 1600))),
                                    n.hideLoading(e));
                            })
                            .addClass("fancybox-image")
                            .attr("src", e.src)
                            .appendTo(e.$content)),
                            (s.complete || "complete" == s.readyState) &&
                            a.naturalWidth &&
                            a.naturalHeight
                                ? a.trigger("load")
                                : s.error && a.trigger("error");
                    },
                    resolveImageSlideSize: function (e, t, i) {
                        var n = parseInt(e.opts.width, 10),
                            s = parseInt(e.opts.height, 10);
                        (e.width = t),
                            (e.height = i),
                        n > 0 && ((e.width = n), (e.height = Math.floor((n * i) / t))),
                        s > 0 && ((e.width = Math.floor((s * t) / i)), (e.height = s));
                    },
                    setIframe: function (e) {
                        var t,
                            n = this,
                            s = e.opts.iframe,
                            a = e.$slide;
                        (e.$content = i(
                            '<div class="fancybox-content' +
                            (s.preload ? " fancybox-is-hidden" : "") +
                            '"></div>'
                        )
                            .css(s.css)
                            .appendTo(a)),
                            a.addClass("fancybox-slide--" + e.contentType),
                            (e.$iframe = t = i(
                                s.tpl.replace(/\{rnd\}/g, new Date().getTime())
                            )
                                .attr(s.attr)
                                .appendTo(e.$content)),
                            s.preload
                                ? (n.showLoading(e),
                                    t.on("load.fb error.fb", function (t) {
                                        (this.isReady = 1),
                                            e.$slide.trigger("refresh"),
                                            n.afterLoad(e);
                                    }),
                                    a.on("refresh.fb", function () {
                                        var i,
                                            n = e.$content,
                                            r = s.css.width,
                                            o = s.css.height;
                                        if (1 === t[0].isReady) {
                                            try {
                                                i = t.contents().find("body");
                                            } catch (e) {
                                            }
                                            i &&
                                            i.length &&
                                            i.children().length &&
                                            (a.css("overflow", "visible"),
                                                n.css({
                                                    width: "100%",
                                                    "max-width": "100%",
                                                    height: "9999px",
                                                }),
                                            void 0 === r &&
                                            (r = Math.ceil(
                                                Math.max(i[0].clientWidth, i.outerWidth(!0))
                                            )),
                                                n.css("width", r || "").css("max-width", ""),
                                            void 0 === o &&
                                            (o = Math.ceil(
                                                Math.max(i[0].clientHeight, i.outerHeight(!0))
                                            )),
                                                n.css("height", o || ""),
                                                a.css("overflow", "auto")),
                                                n.removeClass("fancybox-is-hidden");
                                        }
                                    }))
                                : n.afterLoad(e),
                            t.attr("src", e.src),
                            a.one("onReset", function () {
                                try {
                                    i(this)
                                        .find("iframe")
                                        .hide()
                                        .unbind()
                                        .attr("src", "//about:blank");
                                } catch (e) {
                                }
                                i(this).off("refresh.fb").empty(),
                                    (e.isLoaded = !1),
                                    (e.isRevealed = !1);
                            });
                    },
                    setContent: function (e, t) {
                        var n;
                        this.isClosing ||
                        (this.hideLoading(e),
                        e.$content && i.fancybox.stop(e.$content),
                            e.$slide.empty(),
                            (n = t) && n.hasOwnProperty && n instanceof i && t.parent().length
                                ? ((t.hasClass("fancybox-content") ||
                                t.parent().hasClass("fancybox-content")) &&
                                t.parents(".fancybox-slide").trigger("onReset"),
                                    (e.$placeholder = i("<div>").hide().insertAfter(t)),
                                    t.css("display", "inline-block"))
                                : e.hasError ||
                                ("string" === i.type(t) &&
                                (t = i("<div>").append(i.trim(t)).contents()),
                                e.opts.filter &&
                                (t = i("<div>").html(t).find(e.opts.filter))),
                            e.$slide.one("onReset", function () {
                                i(this).find("video,audio").trigger("pause"),
                                e.$placeholder &&
                                (e.$placeholder
                                    .after(t.removeClass("fancybox-content").hide())
                                    .remove(),
                                    (e.$placeholder = null)),
                                e.$smallBtn && (e.$smallBtn.remove(), (e.$smallBtn = null)),
                                e.hasError ||
                                (i(this).empty(), (e.isLoaded = !1), (e.isRevealed = !1));
                            }),
                            i(t).appendTo(e.$slide),
                        i(t).is("video,audio") &&
                        (i(t).addClass("fancybox-video"),
                            i(t).wrap("<div></div>"),
                            (e.contentType = "video"),
                            (e.opts.width = e.opts.width || i(t).attr("width")),
                            (e.opts.height = e.opts.height || i(t).attr("height"))),
                            (e.$content = e.$slide
                                .children()
                                .filter("div,form,main,video,audio,article,.fancybox-content")
                                .first()),
                            e.$content.siblings().hide(),
                        e.$content.length ||
                        (e.$content = e.$slide
                            .wrapInner("<div></div>")
                            .children()
                            .first()),
                            e.$content.addClass("fancybox-content"),
                            e.$slide.addClass("fancybox-slide--" + e.contentType),
                            this.afterLoad(e));
                    },
                    setError: function (e) {
                        (e.hasError = !0),
                            e.$slide
                                .trigger("onReset")
                                .removeClass("fancybox-slide--" + e.contentType)
                                .addClass("fancybox-slide--error"),
                            (e.contentType = "html"),
                            this.setContent(e, this.translate(e, e.opts.errorTpl)),
                        e.pos === this.currPos && (this.isAnimating = !1);
                    },
                    showLoading: function (e) {
                        (e = e || this.current) &&
                        !e.$spinner &&
                        (e.$spinner = i(this.translate(this, this.opts.spinnerTpl))
                            .appendTo(e.$slide)
                            .hide()
                            .fadeIn("fast"));
                    },
                    hideLoading: function (e) {
                        (e = e || this.current) &&
                        e.$spinner &&
                        (e.$spinner.stop().remove(), delete e.$spinner);
                    },
                    afterLoad: function (e) {
                        this.isClosing ||
                        ((e.isLoading = !1),
                            (e.isLoaded = !0),
                            this.trigger("afterLoad", e),
                            this.hideLoading(e),
                        !e.opts.smallBtn ||
                        (e.$smallBtn && e.$smallBtn.length) ||
                        (e.$smallBtn = i(
                            this.translate(e, e.opts.btnTpl.smallBtn)
                        ).appendTo(e.$content)),
                        e.opts.protect &&
                        e.$content &&
                        !e.hasError &&
                        (e.$content.on("contextmenu.fb", function (e) {
                            return 2 == e.button && e.preventDefault(), !0;
                        }),
                        "image" === e.type &&
                        i('<div class="fancybox-spaceball"></div>').appendTo(
                            e.$content
                        )),
                            this.adjustCaption(e),
                            this.adjustLayout(e),
                        e.pos === this.currPos && this.updateCursor(),
                            this.revealContent(e));
                    },
                    adjustCaption: function (e) {
                        var t,
                            i = e || this.current,
                            n = i.opts.caption,
                            s = i.opts.preventCaptionOverlap,
                            a = this.$refs.caption,
                            r = !1;
                        a.toggleClass("fancybox-caption--separate", s),
                        s &&
                        n &&
                        n.length &&
                        (i.pos !== this.currPos
                            ? ((t = a.clone().appendTo(a.parent()))
                                .children()
                                .eq(0)
                                .empty()
                                .html(n),
                                (r = t.outerHeight(!0)),
                                t.empty().remove())
                            : this.$caption && (r = this.$caption.outerHeight(!0)),
                            i.$slide.css("padding-bottom", r || ""));
                    },
                    adjustLayout: function (e) {
                        var t,
                            i,
                            n,
                            s,
                            a = e || this.current;
                        a.isLoaded &&
                        !0 !== a.opts.disableLayoutFix &&
                        (a.$content.css("margin-bottom", ""),
                        a.$content.outerHeight() > a.$slide.height() + 0.5 &&
                        ((n = a.$slide[0].style["padding-bottom"]),
                            (s = a.$slide.css("padding-bottom")),
                        parseFloat(s) > 0 &&
                        ((t = a.$slide[0].scrollHeight),
                            a.$slide.css("padding-bottom", 0),
                        Math.abs(t - a.$slide[0].scrollHeight) < 1 && (i = s),
                            a.$slide.css("padding-bottom", n))),
                            a.$content.css("margin-bottom", i));
                    },
                    revealContent: function (e) {
                        var t,
                            n,
                            s,
                            a,
                            r = this,
                            o = e.$slide,
                            l = !1,
                            c = !1,
                            d = r.isMoved(e),
                            h = e.isRevealed;
                        return (
                            (e.isRevealed = !0),
                                (t = e.opts[r.firstRun ? "animationEffect" : "transitionEffect"]),
                                (s =
                                    e.opts[
                                        r.firstRun ? "animationDuration" : "transitionDuration"
                                        ]),
                                (s = parseInt(
                                    void 0 === e.forcedDuration ? s : e.forcedDuration,
                                    10
                                )),
                            (!d && e.pos === r.currPos && s) || (t = !1),
                            "zoom" === t &&
                            (e.pos === r.currPos &&
                            s &&
                            "image" === e.type &&
                            !e.hasError &&
                            (c = r.getThumbPos(e))
                                ? (l = r.getFitPos(e))
                                : (t = "fade")),
                                "zoom" === t
                                    ? ((r.isAnimating = !0),
                                        (l.scaleX = l.width / c.width),
                                        (l.scaleY = l.height / c.height),
                                    "auto" == (a = e.opts.zoomOpacity) &&
                                    (a =
                                        Math.abs(e.width / e.height - c.width / c.height) > 0.1),
                                    a && ((c.opacity = 0.1), (l.opacity = 1)),
                                        i.fancybox.setTranslate(
                                            e.$content.removeClass("fancybox-is-hidden"),
                                            c
                                        ),
                                        p(e.$content),
                                        void i.fancybox.animate(e.$content, l, s, function () {
                                            (r.isAnimating = !1), r.complete();
                                        }))
                                    : (r.updateSlide(e),
                                        t
                                            ? (i.fancybox.stop(o),
                                                (n =
                                                    "fancybox-slide--" +
                                                    (e.pos >= r.prevPos ? "next" : "previous") +
                                                    " fancybox-animated fancybox-fx-" +
                                                    t),
                                                o.addClass(n).removeClass("fancybox-slide--current"),
                                                e.$content.removeClass("fancybox-is-hidden"),
                                                p(o),
                                            "image" !== e.type && e.$content.hide().show(0),
                                                void i.fancybox.animate(
                                                    o,
                                                    "fancybox-slide--current",
                                                    s,
                                                    function () {
                                                        o.removeClass(n).css({transform: "", opacity: ""}),
                                                        e.pos === r.currPos && r.complete();
                                                    },
                                                    !0
                                                ))
                                            : (e.$content.removeClass("fancybox-is-hidden"),
                                            h ||
                                            !d ||
                                            "image" !== e.type ||
                                            e.hasError ||
                                            e.$content.hide().fadeIn("fast"),
                                                void (e.pos === r.currPos && r.complete())))
                        );
                    },
                    getThumbPos: function (e) {
                        var n,
                            s,
                            a,
                            r,
                            o,
                            l,
                            c = e.$thumb;
                        return (
                            !(
                                !c ||
                                !(function (e) {
                                    var n, s;
                                    return (
                                        !(!e || e.ownerDocument !== t) &&
                                        (i(".fancybox-container").css("pointer-events", "none"),
                                            (n = {
                                                x: e.getBoundingClientRect().left + e.offsetWidth / 2,
                                                y: e.getBoundingClientRect().top + e.offsetHeight / 2,
                                            }),
                                            (s = t.elementFromPoint(n.x, n.y) === e),
                                            i(".fancybox-container").css("pointer-events", ""),
                                            s)
                                    );
                                })(c[0])
                            ) &&
                            ((s = i.fancybox.getTranslate(c)),
                                (a = parseFloat(c.css("border-top-width") || 0)),
                                (r = parseFloat(c.css("border-right-width") || 0)),
                                (o = parseFloat(c.css("border-bottom-width") || 0)),
                                (l = parseFloat(c.css("border-left-width") || 0)),
                                (n = {
                                    top: s.top + a,
                                    left: s.left + l,
                                    width: s.width - r - l,
                                    height: s.height - a - o,
                                    scaleX: 1,
                                    scaleY: 1,
                                }),
                            s.width > 0 && s.height > 0 && n)
                        );
                    },
                    complete: function () {
                        var e,
                            t = this,
                            n = t.current,
                            s = {};
                        !t.isMoved() &&
                        n.isLoaded &&
                        (n.isComplete ||
                        ((n.isComplete = !0),
                            n.$slide.siblings().trigger("onReset"),
                            t.preload("inline"),
                            p(n.$slide),
                            n.$slide.addClass("fancybox-slide--complete"),
                            i.each(t.slides, function (e, n) {
                                n.pos >= t.currPos - 1 && n.pos <= t.currPos + 1
                                    ? (s[n.pos] = n)
                                    : n && (i.fancybox.stop(n.$slide), n.$slide.off().remove());
                            }),
                            (t.slides = s)),
                            (t.isAnimating = !1),
                            t.updateCursor(),
                            t.trigger("afterShow"),
                        n.opts.video.autoStart &&
                        n.$slide
                            .find("video,audio")
                            .filter(":visible:first")
                            .trigger("play")
                            .one("ended", function () {
                                Document.exitFullscreen
                                    ? Document.exitFullscreen()
                                    : this.webkitExitFullscreen &&
                                    this.webkitExitFullscreen(),
                                    t.next();
                            }),
                        n.opts.autoFocus &&
                        "html" === n.contentType &&
                        ((e = n.$content.find("input[autofocus]:enabled:visible:first"))
                            .length
                            ? e.trigger("focus")
                            : t.focus(null, !0)),
                            n.$slide.scrollTop(0).scrollLeft(0));
                    },
                    preload: function (e) {
                        var t, i;
                        this.group.length < 2 ||
                        ((i = this.slides[this.currPos + 1]),
                        (t = this.slides[this.currPos - 1]) &&
                        t.type === e &&
                        this.loadSlide(t),
                        i && i.type === e && this.loadSlide(i));
                    },
                    focus: function (e, n) {
                        var s,
                            a,
                            r = [
                                "a[href]",
                                "area[href]",
                                'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                                "select:not([disabled]):not([aria-hidden])",
                                "textarea:not([disabled]):not([aria-hidden])",
                                "button:not([disabled]):not([aria-hidden])",
                                "iframe",
                                "object",
                                "embed",
                                "video",
                                "audio",
                                "[contenteditable]",
                                '[tabindex]:not([tabindex^="-"])',
                            ].join(",");
                        this.isClosing ||
                        ((s = (s =
                            !e && this.current && this.current.isComplete
                                ? this.current.$slide.find(
                                "*:visible" + (n ? ":not(.fancybox-close-small)" : "")
                                )
                                : this.$refs.container.find("*:visible"))
                            .filter(r)
                            .filter(function () {
                                return (
                                    "hidden" !== i(this).css("visibility") &&
                                    !i(this).hasClass("disabled")
                                );
                            })).length
                            ? ((a = s.index(t.activeElement)),
                                e && e.shiftKey
                                    ? (a < 0 || 0 == a) &&
                                    (e.preventDefault(), s.eq(s.length - 1).trigger("focus"))
                                    : (a < 0 || a == s.length - 1) &&
                                    (e && e.preventDefault(), s.eq(0).trigger("focus")))
                            : this.$refs.container.trigger("focus"));
                    },
                    activate: function () {
                        var e = this;
                        i(".fancybox-container").each(function () {
                            var t = i(this).data("FancyBox");
                            t &&
                            t.id !== e.id &&
                            !t.isClosing &&
                            (t.trigger("onDeactivate"),
                                t.removeEvents(),
                                (t.isVisible = !1));
                        }),
                            (e.isVisible = !0),
                        (e.current || e.isIdle) && (e.update(), e.updateControls()),
                            e.trigger("onActivate"),
                            e.addEvents();
                    },
                    close: function (e, t) {
                        var n,
                            s,
                            a,
                            r,
                            o,
                            l,
                            c,
                            h = this,
                            u = h.current,
                            f = function () {
                                h.cleanUp(e);
                            };
                        return (
                            !h.isClosing &&
                            ((h.isClosing = !0),
                                !1 === h.trigger("beforeClose", e)
                                    ? ((h.isClosing = !1),
                                        d(function () {
                                            h.update();
                                        }),
                                        !1)
                                    : (h.removeEvents(),
                                        (a = u.$content),
                                        (n = u.opts.animationEffect),
                                        (s = i.isNumeric(t) ? t : n ? u.opts.animationDuration : 0),
                                        u.$slide.removeClass(
                                            "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
                                        ),
                                        !0 !== e ? i.fancybox.stop(u.$slide) : (n = !1),
                                        u.$slide.siblings().trigger("onReset").remove(),
                                    s &&
                                    h.$refs.container
                                        .removeClass("fancybox-is-open")
                                        .addClass("fancybox-is-closing")
                                        .css("transition-duration", s + "ms"),
                                        h.hideLoading(u),
                                        h.hideControls(!0),
                                        h.updateCursor(),
                                    "zoom" !== n ||
                                    (a &&
                                        s &&
                                        "image" === u.type &&
                                        !h.isMoved() &&
                                        !u.hasError &&
                                        (c = h.getThumbPos(u))) ||
                                    (n = "fade"),
                                        "zoom" === n
                                            ? (i.fancybox.stop(a),
                                                (l = {
                                                    top: (r = i.fancybox.getTranslate(a)).top,
                                                    left: r.left,
                                                    scaleX: r.width / c.width,
                                                    scaleY: r.height / c.height,
                                                    width: c.width,
                                                    height: c.height,
                                                }),
                                            "auto" == (o = u.opts.zoomOpacity) &&
                                            (o =
                                                Math.abs(u.width / u.height - c.width / c.height) >
                                                0.1),
                                            o && (c.opacity = 0),
                                                i.fancybox.setTranslate(a, l),
                                                p(a),
                                                i.fancybox.animate(a, c, s, f),
                                                !0)
                                            : (n && s
                                            ? i.fancybox.animate(
                                                u.$slide
                                                    .addClass("fancybox-slide--previous")
                                                    .removeClass("fancybox-slide--current"),
                                                "fancybox-animated fancybox-fx-" + n,
                                                s,
                                                f
                                            )
                                            : !0 === e
                                                ? setTimeout(f, s)
                                                : f(),
                                                !0)))
                        );
                    },
                    cleanUp: function (t) {
                        var n,
                            s,
                            a,
                            r = this.current.opts.$orig;
                        this.current.$slide.trigger("onReset"),
                            this.$refs.container.empty().remove(),
                            this.trigger("afterClose", t),
                        this.current.opts.backFocus &&
                        ((r && r.length && r.is(":visible")) || (r = this.$trigger),
                        r &&
                        r.length &&
                        ((s = e.scrollX),
                            (a = e.scrollY),
                            r.trigger("focus"),
                            i("html, body").scrollTop(a).scrollLeft(s))),
                            (this.current = null),
                            (n = i.fancybox.getInstance())
                                ? n.activate()
                                : (i("body").removeClass(
                                "fancybox-active compensate-for-scrollbar"
                                ),
                                    i("#fancybox-style-noscroll").remove());
                    },
                    trigger: function (e, t) {
                        var n,
                            s = Array.prototype.slice.call(arguments, 1),
                            a = t && t.opts ? t : this.current;
                        if (
                            (a ? s.unshift(a) : (a = this),
                                s.unshift(this),
                            i.isFunction(a.opts[e]) && (n = a.opts[e].apply(a, s)),
                            !1 === n)
                        )
                            return n;
                        "afterClose" !== e && this.$refs
                            ? this.$refs.container.trigger(e + ".fb", s)
                            : l.trigger(e + ".fb", s);
                    },
                    updateControls: function () {
                        var e = this.current,
                            n = e.index,
                            s = this.$refs.container,
                            a = this.$refs.caption,
                            r = e.opts.caption;
                        e.$slide.trigger("refresh"),
                            r && r.length
                                ? ((this.$caption = a), a.children().eq(0).html(r))
                                : (this.$caption = null),
                        this.hasHiddenControls || this.isIdle || this.showControls(),
                            s.find("[data-fancybox-count]").html(this.group.length),
                            s.find("[data-fancybox-index]").html(n + 1),
                            s
                                .find("[data-fancybox-prev]")
                                .prop("disabled", !e.opts.loop && n <= 0),
                            s
                                .find("[data-fancybox-next]")
                                .prop("disabled", !e.opts.loop && n >= this.group.length - 1),
                            "image" === e.type
                                ? s
                                    .find("[data-fancybox-zoom]")
                                    .show()
                                    .end()
                                    .find("[data-fancybox-download]")
                                    .attr("href", e.opts.image.src || e.src)
                                    .show()
                                : e.opts.toolbar &&
                                s
                                    .find("[data-fancybox-download],[data-fancybox-zoom]")
                                    .hide(),
                        i(t.activeElement).is(":hidden,[disabled]") &&
                        this.$refs.container.trigger("focus");
                    },
                    hideControls: function (e) {
                        var t = ["infobar", "toolbar", "nav"];
                        (!e && this.current.opts.preventCaptionOverlap) ||
                        t.push("caption"),
                            this.$refs.container.removeClass(
                                t
                                    .map(function (e) {
                                        return "fancybox-show-" + e;
                                    })
                                    .join(" ")
                            ),
                            (this.hasHiddenControls = !0);
                    },
                    showControls: function () {
                        var e = this.current ? this.current.opts : this.opts,
                            t = this.$refs.container;
                        (this.hasHiddenControls = !1),
                            (this.idleSecondsCounter = 0),
                            t
                                .toggleClass(
                                    "fancybox-show-toolbar",
                                    !(!e.toolbar || !e.buttons)
                                )
                                .toggleClass(
                                    "fancybox-show-infobar",
                                    !!(e.infobar && this.group.length > 1)
                                )
                                .toggleClass("fancybox-show-caption", !!this.$caption)
                                .toggleClass(
                                    "fancybox-show-nav",
                                    !!(e.arrows && this.group.length > 1)
                                )
                                .toggleClass("fancybox-is-modal", !!e.modal);
                    },
                    toggleControls: function () {
                        this.hasHiddenControls ? this.showControls() : this.hideControls();
                    },
                }),
                    (i.fancybox = {
                        version: "3.5.7",
                        defaults: r,
                        getInstance: function (e) {
                            var t = i(
                                '.fancybox-container:not(".fancybox-is-closing"):last'
                                ).data("FancyBox"),
                                n = Array.prototype.slice.call(arguments, 1);
                            return (
                                t instanceof m &&
                                ("string" === i.type(e)
                                    ? t[e].apply(t, n)
                                    : "function" === i.type(e) && e.apply(t, n),
                                    t)
                            );
                        },
                        open: function (e, t, i) {
                            return new m(e, t, i);
                        },
                        close: function (e) {
                            var t = this.getInstance();
                            t && (t.close(), !0 === e && this.close(e));
                        },
                        destroy: function () {
                            this.close(!0), l.add("body").off("click.fb-start", "**");
                        },
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                            navigator.userAgent
                        ),
                        use3d:
                            ((s = t.createElement("div")),
                            e.getComputedStyle &&
                            e.getComputedStyle(s) &&
                            e.getComputedStyle(s).getPropertyValue("transform") &&
                            !(t.documentMode && t.documentMode < 11)),
                        getTranslate: function (e) {
                            var t;
                            return (
                                !(!e || !e.length) && {
                                    top: (t = e[0].getBoundingClientRect()).top || 0,
                                    left: t.left || 0,
                                    width: t.width,
                                    height: t.height,
                                    opacity: parseFloat(e.css("opacity")),
                                }
                            );
                        },
                        setTranslate: function (e, t) {
                            var i = "",
                                n = {};
                            if (e && t)
                                return (
                                    (void 0 === t.left && void 0 === t.top) ||
                                    ((i =
                                        (void 0 === t.left ? e.position().left : t.left) +
                                        "px, " +
                                        (void 0 === t.top ? e.position().top : t.top) +
                                        "px"),
                                        (i = this.use3d
                                            ? "translate3d(" + i + ", 0px)"
                                            : "translate(" + i + ")")),
                                        void 0 !== t.scaleX && void 0 !== t.scaleY
                                            ? (i += " scale(" + t.scaleX + ", " + t.scaleY + ")")
                                            : void 0 !== t.scaleX && (i += " scaleX(" + t.scaleX + ")"),
                                    i.length && (n.transform = i),
                                    void 0 !== t.opacity && (n.opacity = t.opacity),
                                    void 0 !== t.width && (n.width = t.width),
                                    void 0 !== t.height && (n.height = t.height),
                                        e.css(n)
                                );
                        },
                        animate: function (e, t, n, s, a) {
                            var r,
                                o = this;
                            i.isFunction(n) && ((s = n), (n = null)),
                                o.stop(e),
                                (r = o.getTranslate(e)),
                                e.on(u, function (l) {
                                    (!l ||
                                        !l.originalEvent ||
                                        (e.is(l.originalEvent.target) &&
                                            "z-index" != l.originalEvent.propertyName)) &&
                                    (o.stop(e),
                                    i.isNumeric(n) && e.css("transition-duration", ""),
                                        i.isPlainObject(t)
                                            ? void 0 !== t.scaleX &&
                                            void 0 !== t.scaleY &&
                                            o.setTranslate(e, {
                                                top: t.top,
                                                left: t.left,
                                                width: r.width * t.scaleX,
                                                height: r.height * t.scaleY,
                                                scaleX: 1,
                                                scaleY: 1,
                                            })
                                            : !0 !== a && e.removeClass(t),
                                    i.isFunction(s) && s(l));
                                }),
                            i.isNumeric(n) && e.css("transition-duration", n + "ms"),
                                i.isPlainObject(t)
                                    ? (void 0 !== t.scaleX &&
                                    void 0 !== t.scaleY &&
                                    (delete t.width,
                                        delete t.height,
                                    e.parent().hasClass("fancybox-slide--image") &&
                                    e.parent().addClass("fancybox-is-scaling")),
                                        i.fancybox.setTranslate(e, t))
                                    : e.addClass(t),
                                e.data(
                                    "timer",
                                    setTimeout(function () {
                                        e.trigger(u);
                                    }, n + 33)
                                );
                        },
                        stop: function (e, t) {
                            e &&
                            e.length &&
                            (clearTimeout(e.data("timer")),
                            t && e.trigger(u),
                                e.off(u).css("transition-duration", ""),
                                e.parent().removeClass("fancybox-is-scaling"));
                        },
                    }),
                    (i.fn.fancybox = function (e) {
                        var t;
                        return (
                            (t = (e = e || {}).selector || !1)
                                ? i("body")
                                    .off("click.fb-start", t)
                                    .on("click.fb-start", t, {options: e}, v)
                                : this.off("click.fb-start").on(
                                "click.fb-start",
                                {items: this, options: e},
                                v
                                ),
                                this
                        );
                    }),
                    l.on("click.fb-start", "[data-fancybox]", v),
                    l.on("click.fb-start", "[data-fancybox-trigger]", function (e) {
                        i('[data-fancybox="' + i(this).attr("data-fancybox-trigger") + '"]')
                            .eq(i(this).attr("data-fancybox-index") || 0)
                            .trigger("click.fb-start", {$trigger: i(this)});
                    }),
                    (a = null),
                    l.on(
                        "mousedown mouseup focus blur",
                        ".fancybox-button",
                        function (e) {
                            switch (e.type) {
                                case "mousedown":
                                    a = i(this);
                                    break;
                                case "mouseup":
                                    a = null;
                                    break;
                                case "focusin":
                                    i(".fancybox-button").removeClass("fancybox-focus"),
                                    i(this).is(a) ||
                                    i(this).is("[disabled]") ||
                                    i(this).addClass("fancybox-focus");
                                    break;
                                case "focusout":
                                    i(".fancybox-button").removeClass("fancybox-focus");
                            }
                        }
                    );
            }

        function v(e, t) {
            var n,
                s,
                a,
                r = [],
                o = 0;
            (e && e.isDefaultPrevented()) ||
            (e.preventDefault(),
                (t = t || {}),
            e && e.data && (t = f(e.data.options, t)),
                (n = t.$target || i(e.currentTarget).trigger("blur")),
            ((a = i.fancybox.getInstance()) && a.$trigger && a.$trigger.is(n)) ||
            ((r = t.selector
                ? i(t.selector)
                : (s = n.attr("data-fancybox") || "")
                    ? (r = e.data ? e.data.items : []).length
                        ? r.filter('[data-fancybox="' + s + '"]')
                        : i('[data-fancybox="' + s + '"]')
                    : [n]),
            (o = i(r).index(n)) < 0 && (o = 0),
                ((a = i.fancybox.open(r, t, o)).$trigger = n)));
        }
    })(window, document, jQuery),
    (function (e) {
        "use strict";
        var t = {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                    params: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        wmode: "transparent",
                        enablejsapi: 1,
                        html5: 1,
                    },
                    paramPlace: 8,
                    type: "iframe",
                    url: "https://www.youtube-nocookie.com/embed/$4",
                    thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg",
                },
                vimeo: {
                    matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                    params: {
                        autoplay: 1,
                        hd: 1,
                        show_title: 1,
                        show_byline: 1,
                        show_portrait: 0,
                        fullscreen: 1,
                    },
                    paramPlace: 3,
                    type: "iframe",
                    url: "//player.vimeo.com/video/$2",
                },
                instagram: {
                    matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                    type: "image",
                    url: "//$1/p/$2/media/?size=l",
                },
                gmap_place: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                    type: "iframe",
                    url: function (e) {
                        return (
                            "//maps.google." +
                            e[2] +
                            "/?ll=" +
                            (e[9]
                                    ? e[9] +
                                    "&z=" +
                                    Math.floor(e[10]) +
                                    (e[12] ? e[12].replace(/^\//, "&") : "")
                                    : e[12] + ""
                            ).replace(/\?/, "&") +
                            "&output=" +
                            (e[12] && e[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                        );
                    },
                },
                gmap_search: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                    type: "iframe",
                    url: function (e) {
                        return (
                            "//maps.google." +
                            e[2] +
                            "/maps?q=" +
                            e[5].replace("query=", "q=").replace("api=1", "") +
                            "&output=embed"
                        );
                    },
                },
            },
            i = function (t, i, n) {
                if (t)
                    return (
                        (n = n || ""),
                        "object" === e.type(n) && (n = e.param(n, !0)),
                            e.each(i, function (e, i) {
                                t = t.replace("$" + e, i || "");
                            }),
                        n.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + n),
                            t
                    );
            };
        e(document).on("objectNeedsType.fb", function (n, s, a) {
            var r,
                o,
                l,
                c,
                d,
                h,
                u,
                p = a.src || "",
                f = !1;
            (r = e.extend(!0, {}, t, a.opts.media)),
                e.each(r, function (t, n) {
                    if ((l = p.match(n.matcher))) {
                        if (
                            ((f = n.type), (u = t), (h = {}), n.paramPlace && l[n.paramPlace])
                        ) {
                            "?" == (d = l[n.paramPlace])[0] && (d = d.substring(1)),
                                (d = d.split("&"));
                            for (var s = 0; s < d.length; ++s) {
                                var r = d[s].split("=", 2);
                                2 == r.length &&
                                (h[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")));
                            }
                        }
                        return (
                            (c = e.extend(!0, {}, n.params, a.opts[t], h)),
                                (p =
                                    "function" === e.type(n.url)
                                        ? n.url.call(this, l, c, a)
                                        : i(n.url, l, c)),
                                (o =
                                    "function" === e.type(n.thumb)
                                        ? n.thumb.call(this, l, c, a)
                                        : i(n.thumb, l)),
                                "youtube" === t
                                    ? (p = p.replace(/&t=((\d+)m)?(\d+)s/, function (e, t, i, n) {
                                        return (
                                            "&start=" +
                                            ((i ? 60 * parseInt(i, 10) : 0) + parseInt(n, 10))
                                        );
                                    }))
                                    : "vimeo" === t && (p = p.replace("&%23", "#")),
                                !1
                        );
                    }
                }),
                f
                    ? (a.opts.thumb ||
                    (a.opts.$thumb && a.opts.$thumb.length) ||
                    (a.opts.thumb = o),
                    "iframe" === f &&
                    (a.opts = e.extend(!0, a.opts, {
                        iframe: {preload: !1, attr: {scrolling: "no"}},
                    })),
                        e.extend(a, {
                            type: f,
                            src: p,
                            origSrc: a.src,
                            contentSource: u,
                            contentType:
                                "image" === f
                                    ? "image"
                                    : "gmap_place" == u || "gmap_search" == u
                                    ? "map"
                                    : "video",
                        }))
                    : p && (a.type = a.opts.defaultType);
        });
        var n = {
            youtube: {
                src: "https://www.youtube.com/iframe_api",
                class: "YT",
                loading: !1,
                loaded: !1,
            },
            vimeo: {
                src: "https://player.vimeo.com/api/player.js",
                class: "Vimeo",
                loading: !1,
                loaded: !1,
            },
            load: function (e) {
                var t,
                    i = this;
                this[e].loaded
                    ? setTimeout(function () {
                        i.done(e);
                    })
                    : this[e].loading ||
                    ((this[e].loading = !0),
                        ((t = document.createElement("script")).type = "text/javascript"),
                        (t.src = this[e].src),
                        "youtube" === e
                            ? (window.onYouTubeIframeAPIReady = function () {
                                (i[e].loaded = !0), i.done(e);
                            })
                            : (t.onload = function () {
                                (i[e].loaded = !0), i.done(e);
                            }),
                        document.body.appendChild(t));
            },
            done: function (t) {
                var i, n;
                "youtube" === t && delete window.onYouTubeIframeAPIReady,
                (i = e.fancybox.getInstance()) &&
                ((n = i.current.$content.find("iframe")),
                    "youtube" === t && void 0 !== YT && YT
                        ? new YT.Player(n.attr("id"), {
                            events: {
                                onStateChange: function (e) {
                                    0 == e.data && i.next();
                                },
                            },
                        })
                        : "vimeo" === t &&
                        void 0 !== Vimeo &&
                        Vimeo &&
                        new Vimeo.Player(n).on("ended", function () {
                            i.next();
                        }));
            },
        };
        e(document).on({
            "afterShow.fb": function (e, t, i) {
                t.group.length > 1 &&
                ("youtube" === i.contentSource || "vimeo" === i.contentSource) &&
                n.load(i.contentSource);
            },
        });
    })(jQuery),
    (function (e, t, i) {
        "use strict";
        var n =
            e.requestAnimationFrame ||
            e.webkitRequestAnimationFrame ||
            e.mozRequestAnimationFrame ||
            e.oRequestAnimationFrame ||
            function (t) {
                return e.setTimeout(t, 1e3 / 60);
            },
            s =
                e.cancelAnimationFrame ||
                e.webkitCancelAnimationFrame ||
                e.mozCancelAnimationFrame ||
                e.oCancelAnimationFrame ||
                function (t) {
                    e.clearTimeout(t);
                },
            a = function (t) {
                var i = [];
                for (var n in (t =
                    (t = t.originalEvent || t || e.e).touches && t.touches.length
                        ? t.touches
                        : t.changedTouches && t.changedTouches.length
                        ? t.changedTouches
                        : [t]))
                    t[n].pageX
                        ? i.push({x: t[n].pageX, y: t[n].pageY})
                        : t[n].clientX && i.push({x: t[n].clientX, y: t[n].clientY});
                return i;
            },
            r = function (e, t, i) {
                return t && e
                    ? "x" === i
                        ? e.x - t.x
                        : "y" === i
                            ? e.y - t.y
                            : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                    : 0;
            },
            o = function (e) {
                if (
                    e.is(
                        'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
                    ) ||
                    i.isFunction(e.get(0).onclick) ||
                    e.data("selectable")
                )
                    return !0;
                for (var t = 0, n = e[0].attributes, s = n.length; t < s; t++)
                    if ("data-fancybox-" === n[t].nodeName.substr(0, 14)) return !0;
                return !1;
            },
            l = function (t) {
                for (
                    var i, n, s, a, r, o = !1;
                    (i = t.get(0)),
                        (n = void 0),
                        (s = void 0),
                        (a = void 0),
                        (r = void 0),
                        (n = e.getComputedStyle(i)["overflow-y"]),
                        (s = e.getComputedStyle(i)["overflow-x"]),
                        (a =
                            ("scroll" === n || "auto" === n) &&
                            i.scrollHeight > i.clientHeight),
                        (r =
                            ("scroll" === s || "auto" === s) &&
                            i.scrollWidth > i.clientWidth),
                    !(o = a || r) &&
                    (t = t.parent()).length &&
                    !t.hasClass("fancybox-stage") &&
                    !t.is("body");
                ) ;
                return o;
            },
            c = function (e) {
                (this.instance = e),
                    (this.$bg = e.$refs.bg),
                    (this.$stage = e.$refs.stage),
                    (this.$container = e.$refs.container),
                    this.destroy(),
                    this.$container.on(
                        "touchstart.fb.touch mousedown.fb.touch",
                        i.proxy(this, "ontouchstart")
                    );
            };
        (c.prototype.destroy = function () {
            this.$container.off(".fb.touch"),
                i(t).off(".fb.touch"),
            this.requestId && (s(this.requestId), (this.requestId = null)),
            this.tapped && (clearTimeout(this.tapped), (this.tapped = null));
        }),
            (c.prototype.ontouchstart = function (n) {
                var s = i(n.target),
                    c = this.instance,
                    d = c.current,
                    h = d.$slide,
                    u = d.$content,
                    p = "touchstart" == n.type;
                if (
                    (p && this.$container.off("mousedown.fb.touch"),
                    (!n.originalEvent || 2 != n.originalEvent.button) &&
                    h.length &&
                    s.length &&
                    !o(s) &&
                    !o(s.parent()) &&
                    (s.is("img") ||
                        !(n.originalEvent.clientX > s[0].clientWidth + s.offset().left)))
                ) {
                    if (!d || c.isAnimating || d.$slide.hasClass("fancybox-animated"))
                        return n.stopPropagation(), void n.preventDefault();
                    (this.realPoints = this.startPoints = a(n)),
                    this.startPoints.length &&
                    (d.touch && n.stopPropagation(),
                        (this.startEvent = n),
                        (this.canTap = !0),
                        (this.$target = s),
                        (this.$content = u),
                        (this.opts = d.opts.touch),
                        (this.isPanning = !1),
                        (this.isSwiping = !1),
                        (this.isZooming = !1),
                        (this.isScrolling = !1),
                        (this.canPan = c.canPan()),
                        (this.startTime = new Date().getTime()),
                        (this.distanceX = this.distanceY = this.distance = 0),
                        (this.canvasWidth = Math.round(h[0].clientWidth)),
                        (this.canvasHeight = Math.round(h[0].clientHeight)),
                        (this.contentLastPos = null),
                        (this.contentStartPos = i.fancybox.getTranslate(
                            this.$content
                        ) || {top: 0, left: 0}),
                        (this.sliderStartPos = i.fancybox.getTranslate(h)),
                        (this.stagePos = i.fancybox.getTranslate(c.$refs.stage)),
                        (this.sliderStartPos.top -= this.stagePos.top),
                        (this.sliderStartPos.left -= this.stagePos.left),
                        (this.contentStartPos.top -= this.stagePos.top),
                        (this.contentStartPos.left -= this.stagePos.left),
                        i(t)
                            .off(".fb.touch")
                            .on(
                                p
                                    ? "touchend.fb.touch touchcancel.fb.touch"
                                    : "mouseup.fb.touch mouseleave.fb.touch",
                                i.proxy(this, "ontouchend")
                            )
                            .on(
                                p ? "touchmove.fb.touch" : "mousemove.fb.touch",
                                i.proxy(this, "ontouchmove")
                            ),
                    i.fancybox.isMobile &&
                    t.addEventListener("scroll", this.onscroll, !0),
                    (((this.opts || this.canPan) &&
                        (s.is(this.$stage) || this.$stage.find(s).length)) ||
                        (s.is(".fancybox-image") && n.preventDefault(),
                        i.fancybox.isMobile &&
                        s.parents(".fancybox-caption").length)) &&
                    ((this.isScrollable = l(s) || l(s.parent())),
                    (i.fancybox.isMobile && this.isScrollable) ||
                    n.preventDefault(),
                    (1 === this.startPoints.length || d.hasError) &&
                    (this.canPan
                        ? (i.fancybox.stop(this.$content), (this.isPanning = !0))
                        : (this.isSwiping = !0),
                        this.$container.addClass("fancybox-is-grabbing")),
                    2 === this.startPoints.length &&
                    "image" === d.type &&
                    (d.isLoaded || d.$ghost) &&
                    ((this.canTap = !1),
                        (this.isSwiping = !1),
                        (this.isPanning = !1),
                        (this.isZooming = !0),
                        i.fancybox.stop(this.$content),
                        (this.centerPointStartX =
                            0.5 * (this.startPoints[0].x + this.startPoints[1].x) -
                            i(e).scrollLeft()),
                        (this.centerPointStartY =
                            0.5 * (this.startPoints[0].y + this.startPoints[1].y) -
                            i(e).scrollTop()),
                        (this.percentageOfImageAtPinchPointX =
                            (this.centerPointStartX - this.contentStartPos.left) /
                            this.contentStartPos.width),
                        (this.percentageOfImageAtPinchPointY =
                            (this.centerPointStartY - this.contentStartPos.top) /
                            this.contentStartPos.height),
                        (this.startDistanceBetweenFingers = r(
                            this.startPoints[0],
                            this.startPoints[1]
                        )))));
                }
            }),
            (c.prototype.onscroll = function (e) {
                (this.isScrolling = !0),
                    t.removeEventListener("scroll", this.onscroll, !0);
            }),
            (c.prototype.ontouchmove = function (e) {
                void 0 === e.originalEvent.buttons || 0 !== e.originalEvent.buttons
                    ? this.isScrolling
                    ? (this.canTap = !1)
                    : ((this.newPoints = a(e)),
                    (this.opts || this.canPan) &&
                    this.newPoints.length &&
                    this.newPoints.length &&
                    ((this.isSwiping && !0 === this.isSwiping) ||
                    e.preventDefault(),
                        (this.distanceX = r(
                            this.newPoints[0],
                            this.startPoints[0],
                            "x"
                        )),
                        (this.distanceY = r(
                            this.newPoints[0],
                            this.startPoints[0],
                            "y"
                        )),
                        (this.distance = r(this.newPoints[0], this.startPoints[0])),
                    this.distance > 0 &&
                    (this.isSwiping
                        ? this.onSwipe(e)
                        : this.isPanning
                            ? this.onPan()
                            : this.isZooming && this.onZoom())))
                    : this.ontouchend(e);
            }),
            (c.prototype.onSwipe = function (t) {
                var a,
                    r = this,
                    o = r.instance,
                    l = r.isSwiping,
                    c = r.sliderStartPos.left || 0;
                if (!0 !== l)
                    "x" == l &&
                    (r.distanceX > 0 &&
                    (r.instance.group.length < 2 ||
                        (0 === r.instance.current.index && !r.instance.current.opts.loop))
                        ? (c += Math.pow(r.distanceX, 0.8))
                        : r.distanceX < 0 &&
                        (r.instance.group.length < 2 ||
                            (r.instance.current.index === r.instance.group.length - 1 &&
                                !r.instance.current.opts.loop))
                            ? (c -= Math.pow(-r.distanceX, 0.8))
                            : (c += r.distanceX)),
                        (r.sliderLastPos = {
                            top: "x" == l ? 0 : r.sliderStartPos.top + r.distanceY,
                            left: c,
                        }),
                    r.requestId && (s(r.requestId), (r.requestId = null)),
                        (r.requestId = n(function () {
                            r.sliderLastPos &&
                            (i.each(r.instance.slides, function (e, t) {
                                var n = t.pos - r.instance.currPos;
                                i.fancybox.setTranslate(t.$slide, {
                                    top: r.sliderLastPos.top,
                                    left:
                                        r.sliderLastPos.left +
                                        n * r.canvasWidth +
                                        n * t.opts.gutter,
                                });
                            }),
                                r.$container.addClass("fancybox-is-sliding"));
                        }));
                else if (Math.abs(r.distance) > 10) {
                    if (
                        ((r.canTap = !1),
                            o.group.length < 2 && r.opts.vertical
                                ? (r.isSwiping = "y")
                                : o.isDragging ||
                                !1 === r.opts.vertical ||
                                ("auto" === r.opts.vertical && i(e).width() > 800)
                                ? (r.isSwiping = "x")
                                : ((a = Math.abs(
                                    (180 * Math.atan2(r.distanceY, r.distanceX)) / Math.PI
                                )),
                                    (r.isSwiping = a > 45 && a < 135 ? "y" : "x")),
                        "y" === r.isSwiping && i.fancybox.isMobile && r.isScrollable)
                    )
                        return void (r.isScrolling = !0);
                    (o.isDragging = r.isSwiping),
                        (r.startPoints = r.newPoints),
                        i.each(o.slides, function (e, t) {
                            var n, s;
                            i.fancybox.stop(t.$slide),
                                (n = i.fancybox.getTranslate(t.$slide)),
                                (s = i.fancybox.getTranslate(o.$refs.stage)),
                                t.$slide
                                    .css({
                                        transform: "",
                                        opacity: "",
                                        "transition-duration": "",
                                    })
                                    .removeClass("fancybox-animated")
                                    .removeClass(function (e, t) {
                                        return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                                    }),
                            t.pos === o.current.pos &&
                            ((r.sliderStartPos.top = n.top - s.top),
                                (r.sliderStartPos.left = n.left - s.left)),
                                i.fancybox.setTranslate(t.$slide, {
                                    top: n.top - s.top,
                                    left: n.left - s.left,
                                });
                        }),
                    o.SlideShow && o.SlideShow.isActive && o.SlideShow.stop();
                }
            }),
            (c.prototype.onPan = function () {
                var e = this;
                r(e.newPoints[0], e.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5)
                    ? (e.startPoints = e.newPoints)
                    : ((e.canTap = !1),
                        (e.contentLastPos = e.limitMovement()),
                    e.requestId && s(e.requestId),
                        (e.requestId = n(function () {
                            i.fancybox.setTranslate(e.$content, e.contentLastPos);
                        })));
            }),
            (c.prototype.limitMovement = function () {
                var e,
                    t,
                    i,
                    n,
                    s,
                    a,
                    r = this.canvasWidth,
                    o = this.canvasHeight,
                    l = this.distanceX,
                    c = this.distanceY,
                    d = this.contentStartPos,
                    h = d.left,
                    u = d.top,
                    p = d.width,
                    f = d.height;
                return (
                    (s = p > r ? h + l : h),
                        (a = u + c),
                        (e = Math.max(0, 0.5 * r - 0.5 * p)),
                        (t = Math.max(0, 0.5 * o - 0.5 * f)),
                        (i = Math.min(r - p, 0.5 * r - 0.5 * p)),
                        (n = Math.min(o - f, 0.5 * o - 0.5 * f)),
                    l > 0 && s > e && (s = e - 1 + Math.pow(-e + h + l, 0.8) || 0),
                    l < 0 && s < i && (s = i + 1 - Math.pow(i - h - l, 0.8) || 0),
                    c > 0 && a > t && (a = t - 1 + Math.pow(-t + u + c, 0.8) || 0),
                    c < 0 && a < n && (a = n + 1 - Math.pow(n - u - c, 0.8) || 0),
                        {top: a, left: s}
                );
            }),
            (c.prototype.limitPosition = function (e, t, i, n) {
                var s = this.canvasWidth,
                    a = this.canvasHeight;
                return (
                    (e =
                        i > s
                            ? (e = e > 0 ? 0 : e) < s - i
                            ? s - i
                            : e
                            : Math.max(0, s / 2 - i / 2)),
                        {
                            top: (t =
                                n > a
                                    ? (t = t > 0 ? 0 : t) < a - n
                                    ? a - n
                                    : t
                                    : Math.max(0, a / 2 - n / 2)),
                            left: e,
                        }
                );
            }),
            (c.prototype.onZoom = function () {
                var t = this,
                    a = t.contentStartPos,
                    o = a.width,
                    l = a.height,
                    c = a.left,
                    d = a.top,
                    h = r(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
                    u = Math.floor(o * h),
                    p = Math.floor(l * h),
                    f = (o - u) * t.percentageOfImageAtPinchPointX,
                    m = (l - p) * t.percentageOfImageAtPinchPointY,
                    v = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(e).scrollLeft(),
                    g = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(e).scrollTop(),
                    b = v - t.centerPointStartX,
                    y = {
                        top: d + (m + (g - t.centerPointStartY)),
                        left: c + (f + b),
                        scaleX: h,
                        scaleY: h,
                    };
                (t.canTap = !1),
                    (t.newWidth = u),
                    (t.newHeight = p),
                    (t.contentLastPos = y),
                t.requestId && s(t.requestId),
                    (t.requestId = n(function () {
                        i.fancybox.setTranslate(t.$content, t.contentLastPos);
                    }));
            }),
            (c.prototype.ontouchend = function (e) {
                var n = this.isSwiping,
                    r = this.isPanning,
                    o = this.isZooming,
                    l = this.isScrolling;
                if (
                    ((this.endPoints = a(e)),
                        (this.dMs = Math.max(new Date().getTime() - this.startTime, 1)),
                        this.$container.removeClass("fancybox-is-grabbing"),
                        i(t).off(".fb.touch"),
                        t.removeEventListener("scroll", this.onscroll, !0),
                    this.requestId && (s(this.requestId), (this.requestId = null)),
                        (this.isSwiping = !1),
                        (this.isPanning = !1),
                        (this.isZooming = !1),
                        (this.isScrolling = !1),
                        (this.instance.isDragging = !1),
                        this.canTap)
                )
                    return this.onTap(e);
                (this.speed = 100),
                    (this.velocityX = (this.distanceX / this.dMs) * 0.5),
                    (this.velocityY = (this.distanceY / this.dMs) * 0.5),
                    r ? this.endPanning() : o ? this.endZooming() : this.endSwiping(n, l);
            }),
            (c.prototype.endSwiping = function (e, t) {
                var n = !1,
                    s = this.instance.group.length,
                    a = Math.abs(this.distanceX),
                    r = "x" == e && s > 1 && ((this.dMs > 130 && a > 10) || a > 50);
                (this.sliderLastPos = null),
                    "y" == e && !t && Math.abs(this.distanceY) > 50
                        ? (i.fancybox.animate(
                        this.instance.current.$slide,
                        {
                            top:
                                this.sliderStartPos.top +
                                this.distanceY +
                                150 * this.velocityY,
                            opacity: 0,
                        },
                        200
                        ),
                            (n = this.instance.close(!0, 250)))
                        : r && this.distanceX > 0
                        ? (n = this.instance.previous(300))
                        : r && this.distanceX < 0 && (n = this.instance.next(300)),
                !1 !== n || ("x" != e && "y" != e) || this.instance.centerSlide(200),
                    this.$container.removeClass("fancybox-is-sliding");
            }),
            (c.prototype.endPanning = function () {
                var e, t, n;
                this.contentLastPos &&
                (!1 === this.opts.momentum || this.dMs > 350
                    ? ((e = this.contentLastPos.left), (t = this.contentLastPos.top))
                    : ((e = this.contentLastPos.left + 500 * this.velocityX),
                        (t = this.contentLastPos.top + 500 * this.velocityY)),
                    ((n = this.limitPosition(
                        e,
                        t,
                        this.contentStartPos.width,
                        this.contentStartPos.height
                    )).width = this.contentStartPos.width),
                    (n.height = this.contentStartPos.height),
                    i.fancybox.animate(this.$content, n, 366));
            }),
            (c.prototype.endZooming = function () {
                var e,
                    t,
                    n,
                    s,
                    a = this.instance.current,
                    r = this.newWidth,
                    o = this.newHeight;
                this.contentLastPos &&
                ((e = this.contentLastPos.left),
                    (s = {
                        top: (t = this.contentLastPos.top),
                        left: e,
                        width: r,
                        height: o,
                        scaleX: 1,
                        scaleY: 1,
                    }),
                    i.fancybox.setTranslate(this.$content, s),
                    r < this.canvasWidth && o < this.canvasHeight
                        ? this.instance.scaleToFit(150)
                        : r > a.width || o > a.height
                        ? this.instance.scaleToActual(
                            this.centerPointStartX,
                            this.centerPointStartY,
                            150
                        )
                        : ((n = this.limitPosition(e, t, r, o)),
                            i.fancybox.animate(this.$content, n, 150)));
            }),
            (c.prototype.onTap = function (t) {
                var n,
                    s = this,
                    r = i(t.target),
                    o = s.instance,
                    l = o.current,
                    c = (t && a(t)) || s.startPoints,
                    d = c[0] ? c[0].x - i(e).scrollLeft() - s.stagePos.left : 0,
                    h = c[0] ? c[0].y - i(e).scrollTop() - s.stagePos.top : 0,
                    u = function (e) {
                        var n = l.opts[e];
                        if ((i.isFunction(n) && (n = n.apply(o, [l, t])), n))
                            switch (n) {
                                case "close":
                                    o.close(s.startEvent);
                                    break;
                                case "toggleControls":
                                    o.toggleControls();
                                    break;
                                case "next":
                                    o.next();
                                    break;
                                case "nextOrClose":
                                    o.group.length > 1 ? o.next() : o.close(s.startEvent);
                                    break;
                                case "zoom":
                                    "image" == l.type &&
                                    (l.isLoaded || l.$ghost) &&
                                    (o.canPan()
                                        ? o.scaleToFit()
                                        : o.isScaledDown()
                                            ? o.scaleToActual(d, h)
                                            : o.group.length < 2 && o.close(s.startEvent));
                            }
                    };
                if (
                    (!t.originalEvent || 2 != t.originalEvent.button) &&
                    (r.is("img") || !(d > r[0].clientWidth + r.offset().left))
                ) {
                    if (
                        r.is(
                            ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
                        )
                    )
                        n = "Outside";
                    else if (r.is(".fancybox-slide")) n = "Slide";
                    else {
                        if (
                            !o.current.$content ||
                            !o.current.$content.find(r).addBack().filter(r).length
                        )
                            return;
                        n = "Content";
                    }
                    if (s.tapped) {
                        if (
                            (clearTimeout(s.tapped),
                                (s.tapped = null),
                            Math.abs(d - s.tapX) > 50 || Math.abs(h - s.tapY) > 50)
                        )
                            return this;
                        u("dblclick" + n);
                    } else
                        (s.tapX = d),
                            (s.tapY = h),
                            l.opts["dblclick" + n] &&
                            l.opts["dblclick" + n] !== l.opts["click" + n]
                                ? (s.tapped = setTimeout(function () {
                                    (s.tapped = null), o.isAnimating || u("click" + n);
                                }, 500))
                                : u("click" + n);
                    return this;
                }
            }),
            i(t)
                .on("onActivate.fb", function (e, t) {
                    t && !t.Guestures && (t.Guestures = new c(t));
                })
                .on("beforeClose.fb", function (e, t) {
                    t && t.Guestures && t.Guestures.destroy();
                });
    })(window, document, jQuery),
    (function (e, t) {
        "use strict";
        t.extend(!0, t.fancybox.defaults, {
            btnTpl: {
                slideShow:
                    '<button data-fancybox-play class="fancybox-button fancybox-button--play" data-cursor-title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
            },
            slideShow: {autoStart: !1, speed: 3e3, progress: !0},
        });
        var i = function (e) {
            (this.instance = e), this.init();
        };
        t.extend(i.prototype, {
            timer: null,
            isActive: !1,
            $button: null,
            init: function () {
                var e = this,
                    i = e.instance,
                    n = i.group[i.currIndex].opts.slideShow;
                (e.$button = i.$refs.toolbar
                    .find("[data-fancybox-play]")
                    .on("click", function () {
                        e.toggle();
                    })),
                    i.group.length < 2 || !n
                        ? e.$button.hide()
                        : n.progress &&
                        (e.$progress = t(
                            '<div class="fancybox-progress"></div>'
                        ).appendTo(i.$refs.inner));
            },
            set: function (e) {
                var i = this.instance,
                    n = i.current;
                n && (!0 === e || n.opts.loop || i.currIndex < i.group.length - 1)
                    ? this.isActive &&
                    "video" !== n.contentType &&
                    (this.$progress &&
                    t.fancybox.animate(
                        this.$progress.show(),
                        {scaleX: 1},
                        n.opts.slideShow.speed
                    ),
                        (this.timer = setTimeout(function () {
                            i.current.opts.loop || i.current.index != i.group.length - 1
                                ? i.next()
                                : i.jumpTo(0);
                        }, n.opts.slideShow.speed)))
                    : (this.stop(), (i.idleSecondsCounter = 0), i.showControls());
            },
            clear: function () {
                clearTimeout(this.timer),
                    (this.timer = null),
                this.$progress && this.$progress.removeAttr("style").hide();
            },
            start: function () {
                var e = this.instance.current;
                e &&
                (this.$button
                    .attr(
                        "data-cursor-title",
                        (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP
                    )
                    .removeClass("fancybox-button--play")
                    .addClass("fancybox-button--pause"),
                    (this.isActive = !0),
                e.isComplete && this.set(!0),
                    this.instance.trigger("onSlideShowChange", !0));
            },
            stop: function () {
                var e = this.instance.current;
                this.clear(),
                    this.$button
                        .attr(
                            "data-cursor-title",
                            (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START
                        )
                        .removeClass("fancybox-button--pause")
                        .addClass("fancybox-button--play"),
                    (this.isActive = !1),
                    this.instance.trigger("onSlideShowChange", !1),
                this.$progress && this.$progress.removeAttr("style").hide();
            },
            toggle: function () {
                this.isActive ? this.stop() : this.start();
            },
        }),
            t(e).on({
                "onInit.fb": function (e, t) {
                    t && !t.SlideShow && (t.SlideShow = new i(t));
                },
                "beforeShow.fb": function (e, t, i, n) {
                    var s = t && t.SlideShow;
                    n
                        ? s && i.opts.slideShow.autoStart && s.start()
                        : s && s.isActive && s.clear();
                },
                "afterShow.fb": function (e, t, i) {
                    var n = t && t.SlideShow;
                    n && n.isActive && n.set();
                },
                "afterKeydown.fb": function (i, n, s, a, r) {
                    var o = n && n.SlideShow;
                    !o ||
                    !s.opts.slideShow ||
                    (80 !== r && 32 !== r) ||
                    t(e.activeElement).is("button,a,input") ||
                    (a.preventDefault(), o.toggle());
                },
                "beforeClose.fb onDeactivate.fb": function (e, t) {
                    var i = t && t.SlideShow;
                    i && i.stop();
                },
            }),
            t(e).on("visibilitychange", function () {
                var i = t.fancybox.getInstance(),
                    n = i && i.SlideShow;
                n && n.isActive && (e.hidden ? n.clear() : n.set());
            });
    })(document, jQuery),
    (function (e, t) {
        "use strict";
        var i = (function () {
            for (
                var t = [
                        [
                            "requestFullscreen",
                            "exitFullscreen",
                            "fullscreenElement",
                            "fullscreenEnabled",
                            "fullscreenchange",
                            "fullscreenerror",
                        ],
                        [
                            "webkitRequestFullscreen",
                            "webkitExitFullscreen",
                            "webkitFullscreenElement",
                            "webkitFullscreenEnabled",
                            "webkitfullscreenchange",
                            "webkitfullscreenerror",
                        ],
                        [
                            "webkitRequestFullScreen",
                            "webkitCancelFullScreen",
                            "webkitCurrentFullScreenElement",
                            "webkitCancelFullScreen",
                            "webkitfullscreenchange",
                            "webkitfullscreenerror",
                        ],
                        [
                            "mozRequestFullScreen",
                            "mozCancelFullScreen",
                            "mozFullScreenElement",
                            "mozFullScreenEnabled",
                            "mozfullscreenchange",
                            "mozfullscreenerror",
                        ],
                        [
                            "msRequestFullscreen",
                            "msExitFullscreen",
                            "msFullscreenElement",
                            "msFullscreenEnabled",
                            "MSFullscreenChange",
                            "MSFullscreenError",
                        ],
                    ],
                    i = {},
                    n = 0;
                n < t.length;
                n++
            ) {
                var s = t[n];
                if (s && s[1] in e) {
                    for (var a = 0; a < s.length; a++) i[t[0][a]] = s[a];
                    return i;
                }
            }
            return !1;
        })();
        if (i) {
            var n = {
                request: function (t) {
                    (t = t || e.documentElement)[i.requestFullscreen](
                        t.ALLOW_KEYBOARD_INPUT
                    );
                },
                exit: function () {
                    e[i.exitFullscreen]();
                },
                toggle: function (t) {
                    (t = t || e.documentElement),
                        this.isFullscreen() ? this.exit() : this.request(t);
                },
                isFullscreen: function () {
                    return Boolean(e[i.fullscreenElement]);
                },
                enabled: function () {
                    return Boolean(e[i.fullscreenEnabled]);
                },
            };
            t.extend(!0, t.fancybox.defaults, {
                btnTpl: {
                    fullScreen:
                        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" data-cursor-title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
                },
                fullScreen: {autoStart: !1},
            }),
                t(e).on(i.fullscreenchange, function () {
                    var e = n.isFullscreen(),
                        i = t.fancybox.getInstance();
                    i &&
                    (i.current &&
                    "image" === i.current.type &&
                    i.isAnimating &&
                    ((i.isAnimating = !1),
                        i.update(!0, !0, 0),
                    i.isComplete || i.complete()),
                        i.trigger("onFullscreenChange", e),
                        i.$refs.container.toggleClass("fancybox-is-fullscreen", e),
                        i.$refs.toolbar
                            .find("[data-fancybox-fullscreen]")
                            .toggleClass("fancybox-button--fsenter", !e)
                            .toggleClass("fancybox-button--fsexit", e));
                });
        }
        t(e).on({
            "onInit.fb": function (e, t) {
                i
                    ? t && t.group[t.currIndex].opts.fullScreen
                    ? (t.$refs.container.on(
                        "click.fb-fullscreen",
                        "[data-fancybox-fullscreen]",
                        function (e) {
                            e.stopPropagation(), e.preventDefault(), n.toggle();
                        }
                    ),
                    t.opts.fullScreen &&
                    !0 === t.opts.fullScreen.autoStart &&
                    n.request(),
                        (t.FullScreen = n))
                    : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
                    : t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
            },
            "afterKeydown.fb": function (e, t, i, n, s) {
                t &&
                t.FullScreen &&
                70 === s &&
                (n.preventDefault(), t.FullScreen.toggle());
            },
            "beforeClose.fb": function (e, t) {
                t &&
                t.FullScreen &&
                t.$refs.container.hasClass("fancybox-is-fullscreen") &&
                n.exit();
            },
        });
    })(document, jQuery),
    (function (e, t) {
        "use strict";
        var i = "fancybox-thumbs";
        t.fancybox.defaults = t.extend(
            !0,
            {
                btnTpl: {
                    thumbs:
                        '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y",
                },
            },
            t.fancybox.defaults
        );
        var n = function (e) {
            this.init(e);
        };
        t.extend(n.prototype, {
            $button: null,
            $grid: null,
            $list: null,
            isVisible: !1,
            isActive: !1,
            init: function (e) {
                var t = this,
                    i = e.group,
                    n = 0;
                (t.instance = e),
                    (t.opts = i[e.currIndex].opts.thumbs),
                    (e.Thumbs = t),
                    (t.$button = e.$refs.toolbar.find("[data-fancybox-thumbs]"));
                for (
                    var s = 0, a = i.length;
                    s < a && (i[s].thumb && n++, !(n > 1));
                    s++
                ) ;
                n > 1 && t.opts
                    ? (t.$button.removeAttr("style").on("click", function () {
                        t.toggle();
                    }),
                        (t.isActive = !0))
                    : t.$button.hide();
            },
            create: function () {
                var e,
                    n = this.instance,
                    s = this.opts.parentEl,
                    a = [];
                this.$grid ||
                ((this.$grid = t(
                    '<div class="' + i + " " + i + "-" + this.opts.axis + '"></div>'
                ).appendTo(n.$refs.container.find(s).addBack().filter(s))),
                    this.$grid.on("click", "a", function () {
                        n.jumpTo(t(this).attr("data-index"));
                    })),
                this.$list ||
                (this.$list = t('<div class="' + i + '__list">').appendTo(
                    this.$grid
                )),
                    t.each(n.group, function (t, i) {
                        (e = i.thumb) || "image" !== i.type || (e = i.src),
                            a.push(
                                '<a href="javascript:;" tabindex="0" data-index="' +
                                t +
                                '"' +
                                (e && e.length
                                    ? ' style="background-image:url(' + e + ')"'
                                    : 'class="fancybox-thumbs-missing"') +
                                "></a>"
                            );
                    }),
                    (this.$list[0].innerHTML = a.join("")),
                "x" === this.opts.axis &&
                this.$list.width(
                    parseInt(this.$grid.css("padding-right"), 10) +
                    n.group.length * this.$list.children().eq(0).outerWidth(!0)
                );
            },
            focus: function (e) {
                var t,
                    i,
                    n = this.$list,
                    s = this.$grid;
                this.instance.current &&
                ((i = (t = n
                    .children()
                    .removeClass("fancybox-thumbs-active")
                    .filter('[data-index="' + this.instance.current.index + '"]')
                    .addClass("fancybox-thumbs-active")).position()),
                    "y" === this.opts.axis &&
                    (i.top < 0 || i.top > n.height() - t.outerHeight())
                        ? n.stop().animate({scrollTop: n.scrollTop() + i.top}, e)
                        : "x" === this.opts.axis &&
                        (i.left < s.scrollLeft() ||
                            i.left > s.scrollLeft() + (s.width() - t.outerWidth())) &&
                        n.parent().stop().animate({scrollLeft: i.left}, e));
            },
            update: function () {
                this.instance.$refs.container.toggleClass(
                    "fancybox-show-thumbs",
                    this.isVisible
                ),
                    this.isVisible
                        ? (this.$grid || this.create(),
                            this.instance.trigger("onThumbsShow"),
                            this.focus(0))
                        : this.$grid && this.instance.trigger("onThumbsHide"),
                    this.instance.update();
            },
            hide: function () {
                (this.isVisible = !1), this.update();
            },
            show: function () {
                (this.isVisible = !0), this.update();
            },
            toggle: function () {
                (this.isVisible = !this.isVisible), this.update();
            },
        }),
            t(e).on({
                "onInit.fb": function (e, t) {
                    var i;
                    t &&
                    !t.Thumbs &&
                    (i = new n(t)).isActive &&
                    !0 === i.opts.autoStart &&
                    i.show();
                },
                "beforeShow.fb": function (e, t, i, n) {
                    var s = t && t.Thumbs;
                    s && s.isVisible && s.focus(n ? 0 : 250);
                },
                "afterKeydown.fb": function (e, t, i, n, s) {
                    var a = t && t.Thumbs;
                    a && a.isActive && 71 === s && (n.preventDefault(), a.toggle());
                },
                "beforeClose.fb": function (e, t) {
                    var i = t && t.Thumbs;
                    i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide();
                },
            });
    })(document, jQuery),
    (function (e, t) {
        "use strict";
        t.extend(!0, t.fancybox.defaults, {
            btnTpl: {
                share:
                    '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
            },
            share: {
                url: function (e, t) {
                    return (
                        (!e.currentHash &&
                            "inline" !== t.type &&
                            "html" !== t.type &&
                            (t.origSrc || t.src)) ||
                        window.location
                    );
                },
                tpl:
                    '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
            },
        }),
            t(e).on("click", "[data-fancybox-share]", function () {
                var e,
                    i,
                    n,
                    s,
                    a = t.fancybox.getInstance(),
                    r = a.current || null;
                r &&
                ("function" === t.type(r.opts.share.url) &&
                (e = r.opts.share.url.apply(r, [a, r])),
                    (i = r.opts.share.tpl
                        .replace(
                            /\{\{media\}\}/g,
                            "image" === r.type ? encodeURIComponent(r.src) : ""
                        )
                        .replace(/\{\{url\}\}/g, encodeURIComponent(e))
                        .replace(
                            /\{\{url_raw\}\}/g,
                            ((n = e),
                                (s = {
                                    "&": "&amp;",
                                    "<": "&lt;",
                                    ">": "&gt;",
                                    '"': "&quot;",
                                    "'": "&#39;",
                                    "/": "&#x2F;",
                                    "`": "&#x60;",
                                    "=": "&#x3D;",
                                }),
                                String(n).replace(/[&<>"'`=\/]/g, function (e) {
                                    return s[e];
                                }))
                        )
                        .replace(
                            /\{\{descr\}\}/g,
                            a.$caption ? encodeURIComponent(a.$caption.text()) : ""
                        )),
                    t.fancybox.open({
                        src: a.translate(a, i),
                        type: "html",
                        opts: {
                            touch: !1,
                            animationEffect: !1,
                            afterLoad: function (e, t) {
                                a.$refs.container.one("beforeClose.fb", function () {
                                    e.close(null, 0);
                                }),
                                    t.$content.find(".fancybox-share__button").click(function () {
                                        return (
                                            window.open(this.href, "Share", "width=550, height=450"),
                                                !1
                                        );
                                    });
                            },
                            mobile: {autoFocus: !1},
                        },
                    }));
            });
    })(document, jQuery),
    (function (e, t, i) {
        "use strict";

        function n() {
            var t = e.location.hash.substr(1),
                i = t.split("-"),
                n =
                    (i.length > 1 &&
                        /^\+?\d+$/.test(i[i.length - 1]) &&
                        parseInt(i.pop(-1), 10)) ||
                    1;
            return {hash: t, index: n < 1 ? 1 : n, gallery: i.join("-")};
        }

        function s(e) {
            "" !== e.gallery &&
            i("[data-fancybox='" + i.escapeSelector(e.gallery) + "']")
                .eq(e.index - 1)
                .focus()
                .trigger("click.fb-start");
        }

        function a(e) {
            var t, i;
            return (
                !!e &&
                "" !==
                (i =
                    (t = e.current ? e.current.opts : e.opts).hash ||
                    (t.$orig
                        ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger")
                        : "")) &&
                i
            );
        }

        i.escapeSelector ||
        (i.escapeSelector = function (e) {
            return (e + "").replace(
                /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
                function (e, t) {
                    return t
                        ? "\0" === e
                            ? "�"
                            : e.slice(0, -1) +
                            "\\" +
                            e.charCodeAt(e.length - 1).toString(16) +
                            " "
                        : "\\" + e;
                }
            );
        }),
            i(function () {
                !1 !== i.fancybox.defaults.hash &&
                (i(t).on({
                    "onInit.fb": function (e, t) {
                        var i, s;
                        !1 !== t.group[t.currIndex].opts.hash &&
                        ((i = n()),
                        (s = a(t)) &&
                        i.gallery &&
                        s == i.gallery &&
                        (t.currIndex = i.index - 1));
                    },
                    "beforeShow.fb": function (i, n, s, r) {
                        var o;
                        s &&
                        !1 !== s.opts.hash &&
                        (o = a(n)) &&
                        ((n.currentHash =
                            o + (n.group.length > 1 ? "-" + (s.index + 1) : "")),
                        e.location.hash !== "#" + n.currentHash &&
                        (r && !n.origHash && (n.origHash = e.location.hash),
                        n.hashTimer && clearTimeout(n.hashTimer),
                            (n.hashTimer = setTimeout(function () {
                                "replaceState" in e.history
                                    ? (e.history[r ? "pushState" : "replaceState"](
                                    {},
                                    t.title,
                                    e.location.pathname +
                                    e.location.search +
                                    "#" +
                                    n.currentHash
                                    ),
                                    r && (n.hasCreatedHistory = !0))
                                    : (e.location.hash = n.currentHash),
                                    (n.hashTimer = null);
                            }, 300))));
                    },
                    "beforeClose.fb": function (i, n, s) {
                        s &&
                        !1 !== s.opts.hash &&
                        (clearTimeout(n.hashTimer),
                            n.currentHash && n.hasCreatedHistory
                                ? e.history.back()
                                : n.currentHash &&
                                ("replaceState" in e.history
                                    ? e.history.replaceState(
                                        {},
                                        t.title,
                                        e.location.pathname +
                                        e.location.search +
                                        (n.origHash || "")
                                    )
                                    : (e.location.hash = n.origHash)),
                            (n.currentHash = null));
                    },
                }),
                    i(e).on("hashchange.fb", function () {
                        var e = n(),
                            t = null;
                        i.each(i(".fancybox-container").get().reverse(), function (e, n) {
                            var s = i(n).data("FancyBox");
                            if (s && s.currentHash) return (t = s), !1;
                        }),
                            t
                                ? t.currentHash === e.gallery + "-" + e.index ||
                                (1 === e.index && t.currentHash == e.gallery) ||
                                ((t.currentHash = null), t.close())
                                : "" !== e.gallery && s(e);
                    }),
                    setTimeout(function () {
                        i.fancybox.getInstance() || s(n());
                    }, 50));
            });
    })(window, document, jQuery),
    (function (e, t) {
        "use strict";
        var i = new Date().getTime();
        t(e).on({
            "onInit.fb": function (e, t, n) {
                t.$refs.stage.on(
                    "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
                    function (e) {
                        var n = t.current,
                            s = new Date().getTime();
                        t.group.length < 2 ||
                        !1 === n.opts.wheel ||
                        ("auto" === n.opts.wheel && "image" !== n.type) ||
                        (e.preventDefault(),
                            e.stopPropagation(),
                        n.$slide.hasClass("fancybox-animated") ||
                        ((e = e.originalEvent || e),
                        s - i < 250 ||
                        ((i = s),
                            t[
                                (-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0
                                    ? "next"
                                    : "previous"
                                ]())));
                    }
                );
            },
        });
    })(document, jQuery),
    (function (e) {
        function t(e) {
            return e.clone().css({position: "absolute"});
        }

        function i(e) {
            return e.split(/\s+/);
        }

        function n(t, i) {
            return e((t = "<div>" + t))
                .find('*:not(:has("*"))')
                .html(i)
                .parentsUntil()
                .slice(-1)
                .html();
        }

        e.fn.splitLines = function (s) {
            var a = {width: "auto", tag: "<div>", wrap: "", keepHtml: !0};
            s && e.extend(a, s);
            var r = t(this),
                o = this.contents(),
                l = this.text();
            this.append(r), r.text("42");
            var c = r.height() + 2;
            r.empty();
            var d = t(r),
                h = a.width;
            "auto" === a.width && (h = this[0].offsetWidth),
                d.width(h),
                this.append(d);
            for (
                var u,
                    p = a.keepHtml
                        ? (function t(n) {
                            for (var s, a = [], r = 0; r < n.length; r++)
                                if ("BR" !== n[r].nodeName) {
                                    if (3 == n[r].nodeType)
                                        s = i(n[r].textContent || n[r].toString());
                                    else {
                                        var o = e(n[r]).clone();
                                        s = t(o.contents());
                                        for (var l = 0; l < s.length; l++)
                                            o.empty(),
                                                (s[l] = o.html(s[l]).wrap("<p></p>").parent().html());
                                    }
                                    for (var c = 0; c < s.length; c++)
                                        "" !== s[c] && a.push(s[c]);
                                } else a.push("<br>");
                            return a;
                        })(o)
                        : i(l),
                    f = 0;
                f < p.length;
                f++
            ) {
                var m = d.html();
                d.html(m + p[f] + " "),
                    d.html() != u
                        ? d.height() > c &&
                        ((u = d.html()),
                            d.html(m),
                            r.append(n(a.tag, d.html())),
                            d.html(""),
                            f--)
                        : ((u = ""), r.append(n(a.tag, d.html())), d.html(""));
            }
            r.append(n(a.tag, d.html())), this.html(r.html());
        };
    })(jQuery);
