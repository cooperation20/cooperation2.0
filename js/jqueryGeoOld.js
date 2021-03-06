/*! jQuery Geo - vtest - 2012-08-24
 * http://jquerygeo.com
 * Copyright (c) 2012 Ryan Westphal/Applied Geographics, Inc.; Licensed MIT, GPL */
document.createElement("canvas").getContext || function () {
    function j() {
        return this.context_ || (this.context_ = new I(this))
    }
    function l(a, b, c) {
        var d = k.call(arguments, 2);
        return function () {
            return a.apply(b, d.concat(k.call(arguments)))
        }
    }
    function m(a) {
        return String(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    }
    function n(a, b, c) {
        a.namespaces[b] || a.namespaces.add(b, c, "#default#VML")
    }
    function o(a) {
        n(a, "g_vml_", "urn:schemas-microsoft-com:vml"), n(a, "g_o_", "urn:schemas-microsoft-com:office:office");
        if (!a.styleSheets.ex_canvas_) {
            var b = a.createStyleSheet();
            b.owningElement.id = "ex_canvas_", b.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
        }
    }
    function q(a) {
        var b = a.srcElement;
        switch (a.propertyName) {
        case "width":
            b.getContext().clearRect(), b.style.width = b.attributes.width.nodeValue + "px", b.firstChild.style.width = b.clientWidth + "px";
            break;
        case "height":
            b.getContext().clearRect(), b.style.height = b.attributes.height.nodeValue + "px", b.firstChild.style.height = b.clientHeight + "px"
        }
    }
    function r(a) {
        var b = a.srcElement;
        b.firstChild && (b.firstChild.style.width = b.clientWidth + "px", b.firstChild.style.height = b.clientHeight + "px")
    }
    function v() {
        return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    }
    function w(a, b) {
        var c = v();
        for (var d = 0; d < 3; d++) for (var e = 0; e < 3; e++) {
            var f = 0;
            for (var g = 0; g < 3; g++) f += a[d][g] * b[g][e];
            c[d][e] = f
        }
        return c
    }
    function x(a, b) {
        b.fillStyle = a.fillStyle, b.lineCap = a.lineCap, b.lineJoin = a.lineJoin, b.lineWidth = a.lineWidth, b.miterLimit = a.miterLimit, b.shadowBlur = a.shadowBlur, b.shadowColor = a.shadowColor, b.shadowOffsetX = a.shadowOffsetX, b.shadowOffsetY = a.shadowOffsetY, b.strokeStyle = a.strokeStyle, b.globalAlpha = a.globalAlpha, b.font = a.font, b.textAlign = a.textAlign, b.textBaseline = a.textBaseline, b.arcScaleX_ = a.arcScaleX_, b.arcScaleY_ = a.arcScaleY_, b.lineScale_ = a.lineScale_
    }
    function y(a) {
        var b = a.indexOf("(", 3),
            c = a.indexOf(")", b + 1),
            d = a.substring(b + 1, c).split(",");
        if (d.length != 4 || a.charAt(3) != "a") d[3] = 1;
        return d
    }
    function z(a) {
        return parseFloat(a) / 100
    }
    function A(a, b, c) {
        return Math.min(c, Math.max(b, a))
    }
    function B(a) {
        var b, c, d, e, f, g;
        e = parseFloat(a[0]) / 360 % 360, e < 0 && e++, f = A(z(a[1]), 0, 1), g = A(z(a[2]), 0, 1);
        if (f == 0) b = c = d = g;
        else {
            var h = g < .5 ? g * (1 + f) : g + f - g * f,
                i = 2 * g - h;
            b = C(i, h, e + 1 / 3), c = C(i, h, e), d = C(i, h, e - 1 / 3)
        }
        return "#" + s[Math.floor(b * 255)] + s[Math.floor(c * 255)] + s[Math.floor(d * 255)]
    }
    function C(a, b, c) {
        return c < 0 && c++, c > 1 && c--, 6 * c < 1 ? a + (b - a) * 6 * c : 2 * c < 1 ? b : 3 * c < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a
    }
    function E(a) {
        if (a in D) return D[a];
        var b, c = 1;
        a = String(a);
        if (a.charAt(0) == "#") b = a;
        else if (/^rgb/.test(a)) {
            var d = y(a),
                b = "#",
                e;
            for (var f = 0; f < 3; f++) d[f].indexOf("%") != -1 ? e = Math.floor(z(d[f]) * 255) : e = +d[f], b += s[A(e, 0, 255)];
            c = +d[3]
        } else if (/^hsl/.test(a)) {
            var d = y(a);
            b = B(d), c = d[3]
        } else b = a;
        return D[a] = {
            color: b,
            alpha: c
        }
    }
    function H(a) {
        return G[a] || "square"
    }
    function I(a) {
        this.m_ = v(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.strokeStyle = "#000", this.fillStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = g * 1, this.globalAlpha = 1, this.canvas = a;
        var b = "width:" + a.clientWidth + "px;height:" + a.clientHeight + "px;overflow:hidden;position:absolute",
            c = a.ownerDocument.createElement("div");
        c.style.cssText = b, a.appendChild(c);
        var d = c.cloneNode(!1);
        d.style.backgroundColor = "red", d.style.filter = "alpha(opacity=0)", a.appendChild(d), this.element_ = c, this.arcScaleX_ = 1, this.arcScaleY_ = 1, this.lineScale_ = 1
    }
    function K(a, b, c, d) {
        a.currentPath_.push({
            type: "bezierCurveTo",
            cp1x: b.x,
            cp1y: b.y,
            cp2x: c.x,
            cp2y: c.y,
            x: d.x,
            y: d.y
        }), a.currentX_ = d.x, a.currentY_ = d.y
    }
    function L(a, b) {
        var c = E(a.strokeStyle),
            d = c.color,
            e = c.alpha * a.globalAlpha,
            f = a.lineScale_ * a.lineWidth;
        f < 1 && (e *= f), b.push("<g_vml_:stroke", ' opacity="', e, '"', ' joinstyle="', a.lineJoin, '"', ' miterlimit="', a.miterLimit, '"', ' endcap="', H(a.lineCap), '"', ' weight="', f, 'px"', ' color="', d, '" />')
    }
    function M(a, b, c, d) {
        var e = a.fillStyle,
            f = a.arcScaleX_,
            g = a.arcScaleY_,
            h = d.x - c.x,
            i = d.y - c.y,
            j = E(a.fillStyle),
            k = j.color,
            l = j.alpha * a.globalAlpha;
        b.push('<g_vml_:fill color="', k, '" opacity="', l, '" />')
    }
    function N(a, b, c) {
        var d = a.m_;
        return {
            x: g * (b * d[0][0] + c * d[1][0] + d[2][0]) - h,
            y: g * (b * d[0][1] + c * d[1][1] + d[2][1]) - h
        }
    }
    function O(a) {
        return isFinite(a[0][0]) && isFinite(a[0][1]) && isFinite(a[1][0]) && isFinite(a[1][1]) && isFinite(a[2][0]) && isFinite(a[2][1])
    }
    function P(a, b, c) {
        if (!O(b)) return;
        a.m_ = b;
        if (c) {
            var d = b[0][0] * b[1][1] - b[0][1] * b[1][0];
            a.lineScale_ = f(e(d))
        }
    }
    function Q(a) {
        throw new R(a)
    }
    function R(a) {
        this.code = this[a], this.message = a + ": DOM Exception " + this.code
    }
    var a = Math,
        b = a.round,
        c = a.sin,
        d = a.cos,
        e = a.abs,
        f = a.sqrt,
        g = 10,
        h = g / 2,
        i = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1],
        k = Array.prototype.slice;
    o(document);
    var p = {
        init: function (a) {
            var b = a || document;
            b.createElement("canvas"), b.attachEvent("onreadystatechange", l(this.init_, this, b))
        },
        init_: function (a) {
            var b = a.getElementsByTagName("canvas");
            for (var c = 0; c < b.length; c++) this.initElement(b[c])
        },
        initElement: function (a) {
            if (!a.getContext) {
                a.getContext = j, o(a.ownerDocument), a.innerHTML = "", a.attachEvent("onpropertychange", q), a.attachEvent("onresize", r);
                var b = a.attributes;
                b.width && b.width.specified ? a.style.width = b.width.nodeValue + "px" : a.width = a.clientWidth, b.height && b.height.specified ? a.style.height = b.height.nodeValue + "px" : a.height = a.clientHeight
            }
            return a
        }
    };
    p.init();
    var s = [];
    for (var t = 0; t < 16; t++) for (var u = 0; u < 16; u++) s[t * 16 + u] = t.toString(16) + u.toString(16);
    var D = {}, F = {
        style: "normal",
        variant: "normal",
        weight: "normal",
        size: 10,
        family: "sans-serif"
    }, G = {
        butt: "flat",
        round: "round"
    }, J = I.prototype;
    J.clearRect = function () {
        this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null), this.element_.innerHTML = ""
    }, J.beginPath = function () {
        this.currentPath_ = []
    }, J.moveTo = function (a, b) {
        var c = N(this, a, b);
        this.currentPath_.push({
            type: "moveTo",
            x: c.x,
            y: c.y
        }), this.currentX_ = c.x, this.currentY_ = c.y
    }, J.lineTo = function (a, b) {
        var c = N(this, a, b);
        this.currentPath_.push({
            type: "lineTo",
            x: c.x,
            y: c.y
        }), this.currentX_ = c.x, this.currentY_ = c.y
    }, J.bezierCurveTo = function (a, b, c, d, e, f) {
        var g = N(this, e, f),
            h = N(this, a, b),
            i = N(this, c, d);
        K(this, h, i, g)
    }, J.quadraticCurveTo = function (a, b, c, d) {
        var e = N(this, a, b),
            f = N(this, c, d),
            g = {
                x: this.currentX_ + 2 / 3 * (e.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (e.y - this.currentY_)
            }, h = {
                x: g.x + (f.x - this.currentX_) / 3,
                y: g.y + (f.y - this.currentY_) / 3
            };
        K(this, g, h, f)
    }, J.arc = function (a, b, e, f, i, j) {
        e *= g;
        var k = j ? "at" : "wa",
            l = a + d(f) * e - h,
            m = b + c(f) * e - h,
            n = a + d(i) * e - h,
            o = b + c(i) * e - h;
        l == n && !j && (l += .125);
        var p = N(this, a, b),
            q = N(this, l, m),
            r = N(this, n, o);
        this.currentPath_.push({
            type: k,
            x: p.x,
            y: p.y,
            radius: e,
            xStart: q.x,
            yStart: q.y,
            xEnd: r.x,
            yEnd: r.y
        })
    }, J.stroke = function (a) {
        var c = [],
            d = !1,
            e = 10,
            f = 10;
        c.push("<g_vml_:shape", ' filled="', !! a, '"', ' style="position:absolute;width:', e, "px;height:", f, 'px;"', ' coordorigin="0,0"', ' coordsize="', g * e, ",", g * f, '"', ' stroked="', !a, '"', ' path="');
        var h = !1,
            i = {
                x: null,
                y: null
            }, j = {
                x: null,
                y: null
            };
        for (var k = 0; k < this.currentPath_.length; k++) {
            var l = this.currentPath_[k],
                m;
            switch (l.type) {
            case "moveTo":
                m = l, c.push(" m ", b(l.x), ",", b(l.y));
                break;
            case "lineTo":
                c.push(" l ", b(l.x), ",", b(l.y));
                break;
            case "close":
                c.push(" x "), l = null;
                break;
            case "bezierCurveTo":
                c.push(" c ", b(l.cp1x), ",", b(l.cp1y), ",", b(l.cp2x), ",", b(l.cp2y), ",", b(l.x), ",", b(l.y));
                break;
            case "at":
            case "wa":
                c.push(" ", l.type, " ", b(l.x - this.arcScaleX_ * l.radius), ",", b(l.y - this.arcScaleY_ * l.radius), " ", b(l.x + this.arcScaleX_ * l.radius), ",", b(l.y + this.arcScaleY_ * l.radius), " ", b(l.xStart), ",", b(l.yStart), " ", b(l.xEnd), ",", b(l.yEnd))
            }
            if (l) {
                if (i.x == null || l.x < i.x) i.x = l.x;
                if (j.x == null || l.x > j.x) j.x = l.x;
                if (i.y == null || l.y < i.y) i.y = l.y;
                if (j.y == null || l.y > j.y) j.y = l.y
            }
        }
        c.push(' ">'), a ? M(this, c, i, j) : L(this, c), c.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", c.join(""))
    }, J.fill = function () {
        this.stroke(!0)
    }, J.closePath = function () {
        this.currentPath_.push({
            type: "close"
        })
    }, J.save = function () {
        var a = {};
        x(this, a), this.aStack_.push(a), this.mStack_.push(this.m_), this.m_ = w(v(), this.m_)
    }, J.restore = function () {
        this.aStack_.length && (x(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
    }, J.translate = function (a, b) {
        var c = [
            [1, 0, 0],
            [0, 1, 0],
            [a, b, 1]
        ];
        P(this, w(c, this.m_), !1)
    }, J.scale = function (a, b) {
        this.arcScaleX_ *= a, this.arcScaleY_ *= b;
        var c = [
            [a, 0, 0],
            [0, b, 0],
            [0, 0, 1]
        ];
        P(this, w(c, this.m_), !0)
    };
    var S = R.prototype = new Error;
    S.INDEX_SIZE_ERR = 1, S.DOMSTRING_SIZE_ERR = 2, S.HIERARCHY_REQUEST_ERR = 3, S.WRONG_DOCUMENT_ERR = 4, S.INVALID_CHARACTER_ERR = 5, S.NO_DATA_ALLOWED_ERR = 6, S.NO_MODIFICATION_ALLOWED_ERR = 7, S.NOT_FOUND_ERR = 8, S.NOT_SUPPORTED_ERR = 9, S.INUSE_ATTRIBUTE_ERR = 10, S.INVALID_STATE_ERR = 11, S.SYNTAX_ERR = 12, S.INVALID_MODIFICATION_ERR = 13, S.NAMESPACE_ERR = 14, S.INVALID_ACCESS_ERR = 15, S.VALIDATION_ERR = 16, S.TYPE_MISMATCH_ERR = 17, G_vmlCanvasManager = p, CanvasRenderingContext2D = I, DOMException = R
}(), this.jsviews || this.jQuery && jQuery.views || function (a, b) {
    function A(a, b) {
        var c = "\\" + a.charAt(0),
            d = "\\" + a.charAt(1),
            g = "\\" + b.charAt(0),
            h = "\\" + b.charAt(1);
        return z.rTag = e = d + "(?:(?:(\\w+(?=[\\/\\s" + g + "]))|(?:(\\w+)?(:)|(>)|(\\*)))" + "\\s*((?:[^" + g + "]|" + g + "(?!" + h + "))*?)" + "(\\/)?|(?:\\/(\\w+)))" + g, e = new RegExp(c + e + h, "g"), f = new RegExp("<.*>|" + a + ".*" + b), this
    }
    function B(a) {
        var c = this,
            d = c.tmpl.helpers || {};
        return a = (c.ctx[a] !== b ? c.ctx : d[a] !== b ? d : I[a] !== b ? I : {})[a], typeof a != "function" ? a : function () {
            return a.apply(c, arguments)
        }
    }
    function C(a, b, c) {
        var d = b.tmpl.converters;
        return a = d && d[a] || J[a], a ? a.call(b, c) : c
    }
    function D(a, c, d, e, f) {
        f.props = f.props || {};
        var h, i = f.props.tmpl,
            k = c.tmpl.tags,
            l = c.tmpl.templates,
            m = arguments,
            n = k && k[a] || H[a];
        return n ? (e = e && c.tmpl.tmpls[e - 1], i = i || e || b, f.tmpl = "" + i === i ? l && l[i] || G[i] || G(i) : i, f.isTag = j, f.converter = d, f.view = c, f.renderContent = K, c.ctx && g(f.ctx, c.ctx), h = n.apply(f, m.length > 5 ? x.call(m, 5) : []), h || (h == b ? "" : h.toString())) : ""
    }
    function E(a, c, e, f, g, h) {
        var i = e.views,
            j = {
                tmpl: g,
                path: c,
                parent: e,
                data: f,
                ctx: a,
                views: d.isArray(f) ? [] : {},
                hlp: B
            };
        return d.isArray(i) ? i.splice(j.index = h !== b ? h : i.length, 0, j) : i[j.index = "_" + r++] = j, j
    }
    function F(a, c, d, e, f) {
        var g, i;
        if (d && typeof d == "object" && !d.nodeType) {
            for (g in d) c(g, d[g]);
            return a
        }
        if (!d || e === b) f && (e = f(b, e || d));
        else if ("" + d === d) if (e === null) delete c[d];
        else if (e = f ? f(d, e) : e) c[d] = e;
        return (i = h.onStoreItem) && i(c, d, e, f), e
    }
    function G(a, b) {
        return F(this, G, a, b, O)
    }
    function H(a, b) {
        return F(this, H, a, b)
    }
    function I(a, b) {
        return F(this, I, a, b)
    }
    function J(a, b) {
        return F(this, J, a, b)
    }
    function K(a, c, e, f, k) {
        var l, m, n, o, p, q, r, s, t, u, v = {}, w = k === j,
            x = this,
            y = "";
        x.isTag ? (t = x.tmpl, c = c || x.ctx, e = e || x.view, f = f || x.path, k = k || x.index, v = x.props) : t = x.jquery && x[0] || x, e = e || z.topView, s = e.ctx, u = t.layout, a === e && (a = e.data, u = j), c = c && c === s ? s : s ? (s = g({}, s), c) ? g(s, c) : s : c || {}, v.link === i && (c.link = i), t.fn || (t = G[t] || G(t)), p = c.link && h.onRenderItem, q = c.link && h.onRenderItems;
        if (t) {
            if (d.isArray(a) && !u) {
                o = w ? e : k !== b && e || E(c, f, e, a, t, k);
                for (l = 0, m = a.length; l < m; l++) n = a[l], r = t.fn(n, E(c, f, o, n, t, (k || 0) + l), z), y += p ? p(r, v) : r
            } else o = w ? e : E(c, f, e, a, t, k), y += a || u ? t.fn(a, o, z) : "";
            return e.topKey = o.index, q ? q(y, f, o.index, t, v) : y
        }
        return ""
    }
    function L() {
        throw "Syntax error"
    }
    function M(a, b, c) {
        function I(b) {
            b -= D, b && F.push(a.substr(D, b).replace(n, "\\n"))
        }
        function J(b, e, f, g, h, i, k, l, m, n) {
            h && (g = ":", f = "html");
            var p = "",
                r = "",
                s = !l && !g;
            e = e || g, I(n), D = n + b.length, i ? z && F.push(["*", k.replace(o, "$1")]) : e ? (e === "else" && (G[5] = a.substring(G[5], n), G = E.pop(), F = G[3], s = j), k = k ? N(k, c).replace(q, function (a, b, c) {
                return b ? r += c + "," : p += c + ",", ""
            }) : "", p = p.slice(0, - 1), k = k.slice(0, - 1), d = [e, f || "", k, s && [], "{" + (p ? "props:{" + p + "}," : "") + "path:'" + k + "'" + (r ? ",ctx:{" + r.slice(0, - 1) + "}" : "") + "}"], s && (E.push(G), G = d, G[5] = D), F.push(d)) : m && (G[5] = a.substring(G[5], n), G = E.pop());
            if (!G) throw "Expected block tag";
            F = G[3]
        }
        var d, f, g, h, i, k, l, m, r, s, t, u, w, x, y, z, A = b ? {
            allowCode: z = b.allowCode,
            debug: b.debug
        } : {}, B = b && b.tmpls,
            C = [],
            D = 0,
            E = [],
            F = C,
            G = [, , , C],
            H = 0;
        a = a.replace(p, "\\$1"), a.replace(e, J), I(a.length), h = C.length, i = h ? "" : '"";';
        for (g = 0; g < h; g++) f = C[g], f[0] === "*" ? i = i.slice(0, g ? -1 : -3) + ";" + f[1] + (g + 1 < h ? "ret+=" : "") : "" + f === f ? i += '"' + f + '"+' : (t = f[0], u = f[1], w = f[2], F = f[3], x = f[4], a = f[5], F && (y = P(a, A, b, H++), M(a, y), B.push(y)), s = s || x.indexOf("view") > -1, i += (t === ":" ? u === "html" ? (l = j, "e(" + w) : u ? (r = j, 'c("' + u + '",view,' + w) : (m = j, "((v=" + w + ')!=u?v:""') : (k = j, 't("' + t + '",view,"' + (u || "") + '",' + (F ? B.length : '""') + "," + x + (w ? "," : "") + w)) + ")+");
        return i = new Function("data, view, j, b, u", v + (m ? "v," : "") + (k ? "t=j.tag," : "") + (r ? "c=j.convert," : "") + (l ? "e=j.converters.html," : "") + "ret; try{\n\n" + (A.debug ? "debugger;" : "") + (z ? "ret=" : "return ") + i.slice(0, - 1) + ";\n\n" + (z ? "return ret;" : "") + "}catch(e){return j.err(e);}"), b && (b.fn = i, b.useVw = r || s || k), i
    }
    function N(a, b) {
        function h(a, h, k, m, n, o, p, q, r, s, t, u, v, w, x, y) {
            function z(a, c, d, e, f, g, h) {
                if (c) {
                    var i = (d ? 'view.hlp("' + d + '")' : e ? "view" : "data") + (h ? (f ? "." + f : d ? "" : e ? "" : "." + c) + (g || "") : (h = d ? "" : e ? f || "" : c, ""));
                    return b && r !== "(" && (i = "b(" + i + ',"' + h + '")'), i + (h ? "." + h : "")
                }
                return a
            }
            n = n || "", k = k || h || t, m = m || q, r = r || x || "", n = n || "";
            if (o) L();
            else return g ? (g = !u, g ? a : '"') : f ? (f = !v, f ? a : '"') : (k ? (e++, k) : "") + (y ? e ? "" : c ? (c = i, "\b") : "," : p ? (e && L(), c = j, "\b" + m + ":") : m ? m.replace(l, z) + (r ? (d[++e] = j, r) : n) : n ? a : w ? (d[e--] = i, w) + (r ? (d[++e] = j, r) : "") : s ? (d[e] || L(), ",") : h ? "" : (g = u, f = v, '"'))
        }
        var c, d = {}, e = 0,
            f = i,
            g = i;
        return a = (a + " ").replace(m, h), a
    }
    function O(a, c, d, e) {
        function n(b) {
            if ("" + b === b || b.nodeType > 0) return i = b.nodeType > 0 ? b : !f.test(b) && k && k(b)[0], i && i.type && (b = G[i.getAttribute(u)], b || (a = a || "_" + s++, i.setAttribute(u, a), b = O(a, i.innerHTML, d, e), G[a] = b)), b
        }
        var h, i, j, l, m;
        h = n(c), e = e || (c.markup ? c : {}), e.name = a, l = e.templates, !h && c.markup && (h = n(c.markup)) && h.fn && (h.debug !== c.debug || h.allowCode !== c.allowCode) && (h = h.markup);
        if (h !== b) {
            a && !d && (y[a] = function () {
                return c.render.apply(c, arguments)
            }), h.fn || c.fn ? h.fn && (a && a !== h.name ? c = g(g({}, h), e) : c = h) : (c = P(h, e, d, 0), M(h, c));
            for (j in l) m = l[j], m.name !== j && (l[j] = O(j, m, c));
            return c
        }
    }
    function P(a, b, c, d) {
        function e(a) {
            c[a] && (f[a] = g(g({}, c[a]), b[a]))
        }
        b = b || {};
        var f = {
            markup: a,
            tmpls: [],
            links: [],
            render: K
        };
        return c && (c.templates && (f.templates = g(g({}, c.templates), b.templates)), f.parent = c, f.name = c.name + "[" + d + "]", f.index = d), g(f, b), c && (e("templates"), e("tags"), e("helpers"), e("converters")), f
    }
    function Q(a) {
        return t[a] || (t[a] = "&#" + a.charCodeAt(0) + ";")
    }
    var c = "v1.0pre",
        d, e, f, g, h = {}, i = !1,
        j = !0,
        k = a.jQuery,
        l = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.]*?)(?:[.[]([\w$]+)\]?)?|(['"]).*\8)$/g,
        m = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g,
        n = /\r?\n/g,
        o = /\\(['"])/g,
        p = /\\?(['"])/g,
        q = /\x08(~)?([^\x08]+)\x08/g,
        r = 0,
        s = 0,
        t = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
        }, u = "data-jsv-tmpl",
        v = "var j=j||" + (k ? "jQuery." : "js") + "views,",
        w = /[\x00"&'<>]/g,
        x = Array.prototype.slice,
        y = {}, z = {
            jsviews: c,
            sub: h,
            debugMode: j,
            err: function (a) {
                return z.debugMode ? "<br/><b>Error:</b> <em> " + (a.message || a) + ". </em>" : '""'
            },
            tmplFn: M,
            render: y,
            templates: G,
            tags: H,
            helpers: I,
            converters: J,
            View: E,
            convert: C,
            delimiters: A,
            tag: D
        };
    k ? (d = k, d.templates = G, d.render = y, d.views = z, d.fn.render = K) : (d = a.jsviews = z, d.extend = function (a, b) {
        var c;
        a = a || {};
        for (c in b) a[c] = b[c];
        return a
    }, d.isArray = Array && Array.isArray || function (a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }), g = d.extend, z.topView = {
        views: {},
        tmpl: {},
        hlp: B,
        ctx: z.helpers
    }, H({
        "if": function () {
            var a = this,
                c = a.view;
            return c.onElse = function (a, d) {
                var e = 0,
                    f = d.length;
                while (f && !d[e++]) if (e === f) return "";
                return c.onElse = b, a.path = "", a.renderContent(c)
            }, c.onElse(this, arguments)
        },
        "else": function () {
            var a = this.view;
            return a.onElse ? a.onElse(this, arguments) : ""
        },
        "for": function () {
            var a, b = this,
                c = "",
                d = arguments,
                e = d.length;
            b.props.layout && (b.tmpl.layout = j);
            for (a = 0; a < e; a++) c += b.renderContent(d[a]);
            return c
        },
        "=": function (a) {
            return a
        },
        "*": function (a) {
            return a
        }
    }), J({
        html: function (a) {
            return a != b ? String(a).replace(w, Q) : ""
        }
    }), A("{{", "}}")
}(this),
function (a) {
    function d(b) {
        var c = b || window.event,
            d = [].slice.call(arguments, 1),
            e = 0,
            f = !0,
            g = 0,
            h = 0;
        return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d)
    }
    var b = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks) for (var c = b.length; c;) a.event.fixHooks[b[--c]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) for (var a = b.length; a;) this.addEventListener(b[--a], d, !1);
            else this.onmousewheel = d
        },
        teardown: function () {
            if (this.removeEventListener) for (var a = b.length; a;) this.removeEventListener(b[--a], d, !1);
            else this.onmousewheel = null
        }
    }, a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    })
}(jQuery), $.widget || function (a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function (b) {
            for (var d = 0, e;
            (e = b[d]) != null; d++) try {
                a(e).triggerHandler("remove")
            } catch (f) {}
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function (b, c) {
            return this.each(function () {
                return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function () {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (b) {}
                }), d.call(a(this), b, c)
            })
        }
    }
    a.widget = function (b, c, d) {
        var e = b.split(".")[0],
            f;
        b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function (c) {
            return !!a.data(c, b)
        }, a[e] = a[e] || {}, a[e][b] = function (a, b) {
            arguments.length && this._createWidget(a, b)
        };
        var g = new c;
        g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
            namespace: e,
            widgetName: b,
            widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
            widgetBaseClass: f
        }, d), a.widget.bridge(b, a[e][b])
    }, a.widget.bridge = function (c, d) {
        a.fn[c] = function (e) {
            var f = typeof e == "string",
                g = Array.prototype.slice.call(arguments, 1),
                h = this;
            return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function () {
                var d = a.data(this, c),
                    f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b) return h = f, !1
            }) : this.each(function () {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            }), h)
        }
    }, a.Widget = function (a, b) {
        arguments.length && this._createWidget(a, b)
    }, a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function (b, c) {
            a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
            var d = this;
            this.element.bind("remove." + this.widgetName, function () {
                d.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function () {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (c, d) {
            var e = c;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof c == "string") {
                if (d === b) return this.options[c];
                e = {}, e[c] = d
            }
            return this._setOptions(e), this
        },
        _setOptions: function (b) {
            var c = this;
            return a.each(b, function (a, b) {
                c._setOption(a, b)
            }), this
        },
        _setOption: function (a, b) {
            return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _trigger: function (b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f) for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
        }
    }
}(jQuery),
function (a, b, c) {
    var d = Number.POSITIVE_INFINITY,
        e = Number.NEGATIVE_INFINITY;
    a.geo = {
        _allCoordinates: function (b) {
            var c = this._flatten(b),
                d = 0,
                e = [];
            for (; d < c.length; d++) {
                var f = c[d].coordinates,
                    g = f && a.isArray(f[0]),
                    h = g && a.isArray(f[0][0]),
                    i = h && a.isArray(f[0][0][0]),
                    j, k, l;
                i || (h || (g || (f = [f]), f = [f]), f = [f]);
                for (j = 0; j < f.length; j++) for (k = 0; k < f[j].length; k++) for (l = 0; l < f[j][k].length; l++) e.push(f[j][k][l])
            }
            return e
        },
        _isGeodetic: function (b) {
            while (a.isArray(b)) {
                if (b.length > 1 && !a.isArray(b[0])) return b[0] >= -180 && b[0] <= 180 && b[1] >= -85 && b[1] <= 85;
                b = b[0]
            }
            return !1
        },
        center: function (b, c) {
            var d = !1;
            !c && a.geo.proj && this._isGeodetic(b) && (d = !0, b = a.geo.proj.fromGeodetic(b));
            var e = [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
            return d ? a.geo.proj.toGeodetic(e) : e
        },
        expandBy: function (b, c, d, e) {
            var f = !1;
            return !e && a.geo.proj && this._isGeodetic(b) && (f = !0, b = a.geo.proj.fromGeodetic(b)), b = [b[0] - c, b[1] - d, b[2] + c, b[3] + d], f ? a.geo.proj.toGeodetic(b) : b
        },
        height: function (b, c) {
            return !c && a.geo.proj && this._isGeodetic(b) && (b = a.geo.proj.fromGeodetic(b)), b[3] - b[1]
        },
        _in: function (a, b) {
            return a[0] <= b[0] && a[1] <= b[1] && a[2] >= b[2] && a[3] >= b[3]
        },
        _bboxDisjoint: function (a, b) {
            return b[0] > a[2] || b[2] < a[0] || b[1] > a[3] || b[3] < a[1]
        },
        include: function (b, c, f) {
            if (!c || !a.isArray(c)) return b;
            var g = !1;
            return !f && a.geo.proj && this._isGeodetic(b || c) && (g = !0), b ? g && (b = a.geo.proj.fromGeodetic(b)) : b = [d, d, e, e], c.length === 2 && (c = [c[0], c[1], c[0], c[1]]), c = a.geo.proj.fromGeodetic(c), b[0] = Math.min(c[0], b[0]), b[1] = Math.min(c[1], b[1]), b[2] = Math.max(c[2], b[2]), b[3] = Math.max(c[3], b[3]), g ? a.geo.proj.toGeodetic(b) : b
        },
        polygonize: function (b, c) {
            var d = !1;
            !c && a.geo.proj && this._isGeodetic(b) && (d = !0, b = a.geo.proj.fromGeodetic(b));
            var e = {
                type: "Polygon",
                coordinates: [
                    [
                        [b[0], b[1]],
                        [b[0], b[3]],
                        [b[2], b[3]],
                        [b[2], b[1]],
                        [b[0], b[1]]
                    ]
                ]
            };
            return d && (e.coordinates = a.geo.proj.toGeodetic(e.coordinates)), e
        },
        reaspect: function (b, c, d) {
            var e = !1;
            !d && a.geo.proj && this._isGeodetic(b) && (e = !0, b = a.geo.proj.fromGeodetic(b));
            var f = this.width(b, !0),
                g = this.height(b, !0),
                h = this.center(b, !0),
                i, j;
            return f !== 0 && g !== 0 && c > 0 && (f / g > c ? (i = f / 2, j = i / c) : (j = g / 2, i = j * c), b = [h[0] - i, h[1] - j, h[0] + i, h[1] + j]), e ? a.geo.proj.toGeodetic(b) : b
        },
        recenter: function (b, c, d) {
            var e = !1;
            !d && a.geo.proj && (this._isGeodetic(b) && (e = !0, b = a.geo.proj.fromGeodetic(b)), this._isGeodetic(c) && (c = a.geo.proj.fromGeodetic(c)));
            var f = (b[2] - b[0]) / 2,
                g = (b[3] - b[1]) / 2;
            return b = [c[0] - f, c[1] - g, c[0] + f, c[1] + g], e ? a.geo.proj.toGeodetic(b) : b
        },
        scaleBy: function (b, c, d) {
            var e = !1;
            !d && a.geo.proj && this._isGeodetic(b) && (e = !0, b = a.geo.proj.fromGeodetic(b));
            var f = this.center(b, !0),
                g = (b[2] - b[0]) * c / 2,
                h = (b[3] - b[1]) * c / 2;
            return b = [f[0] - g, f[1] - h, f[0] + g, f[1] + h], e ? a.geo.proj.toGeodetic(b) : b
        },
        width: function (b, c) {
            return !c && a.geo.proj && this._isGeodetic(b) && (b = a.geo.proj.fromGeodetic(b)), b[2] - b[0]
        },
        bbox: function (b, f) {
            var g, h = !1;
            if (!b) return c;
            if (b.bbox) g = !f && a.geo.proj && this._isGeodetic(b.bbox) ? a.geo.proj.fromGeodetic(b.bbox) : b.bbox;
            else {
                g = [d, d, e, e];
                var i = this._allCoordinates(b),
                    j = 0;
                if (i.length === 0) return c;
                !f && a.geo.proj && this._isGeodetic(i) && (h = !0, i = a.geo.proj.fromGeodetic(i));
                for (; j < i.length; j++) g[0] = Math.min(i[j][0], g[0]), g[1] = Math.min(i[j][1], g[1]), g[2] = Math.max(i[j][0], g[2]), g[3] = Math.max(i[j][1], g[3])
            }
            return h ? a.geo.proj.toGeodetic(g) : g
        },
        centroid: function (b, f) {
            switch (b.type) {
            case "Point":
                return a.extend({}, b);
            case "LineString":
            case "Polygon":
                var g = 0,
                    h = [0, 0],
                    i = a.merge([], b.type == "Polygon" ? b.coordinates[0] : b.coordinates),
                    j = 1,
                    k, l, m = [d, d, e, e],
                    n = !1;
                !f && a.geo.proj && this._isGeodetic(i) && (n = !0, i = a.geo.proj.fromGeodetic(i));
                for (; j <= i.length; j++) k = j % i.length, m[0] = Math.min(i[k][0], m[0]), m[1] = Math.min(i[k][1], m[1]), m[2] = Math.max(i[k][0], m[2]), m[3] = Math.max(i[k][1], m[3]), l = i[j - 1][0] * i[k][1] - i[k][0] * i[j - 1][1], g += l, h[0] += (i[j - 1][0] + i[k][0]) * l, h[1] += (i[j - 1][1] + i[k][1]) * l;
                if (g === 0) return i.length > 0 ? (h[0] = Math.min(Math.max(i[0][0], m[0]), m[2]), h[1] = Math.min(Math.max(i[0][1], m[1]), m[3]), {
                    type: "Point",
                    coordinates: n ? a.geo.proj.toGeodetic(h) : h
                }) : c;
                return g *= 3, h[0] = Math.min(Math.max(h[0] / g, m[0]), m[2]), h[1] = Math.min(Math.max(h[1] / g, m[1]), m[3]), {
                    type: "Point",
                    coordinates: n ? a.geo.proj.toGeodetic(h) : h
                }
            }
            return c
        },
        contains: function (a, b) {
            if (a.type != "Polygon") return !1;
            switch (b.type) {
            case "Point":
                return this._containsPolygonPoint(a.coordinates, b.coordinates);
            case "LineString":
                return this._containsPolygonLineString(a.coordinates, b.coordinates);
            case "Polygon":
                return this._containsPolygonLineString(a.coordinates, b.coordinates[0]);
            default:
                return !1
            }
        },
        _containsPolygonPoint: function (a, b) {
            if (a.length === 0 || a[0].length < 4) return !1;
            var c = 0,
                d = a[0][0],
                e = 1,
                f, g;
            for (; e < a[0].length; e++) {
                f = a[0][e];
                if (d[1] <= b[1] && b[1] < f[1] || f[1] <= b[1] && b[1] < d[1] && (b[0] < d[0] || b[0] < f[0])) g = d[0] + (f[0] - d[0]) * (b[1] - d[1]) / (f[1] - d[1]), g > b[0] && c++;
                d = f
            }
            return c % 2 == 1
        },
        _containsPolygonLineString: function (a, b) {
            for (var c = 0; c < b.length; c++) if (!this._containsPolygonPoint(a, b[c])) return !1;
            return !0
        },
        distance: function (b, d, e) {
            var f = !e && a.geo.proj && this._isGeodetic(b.coordinates) ? a.geo.proj.fromGeodetic(b.coordinates) : b.coordinates,
                g = !e && a.geo.proj && this._isGeodetic(d.coordinates) ? a.geo.proj.fromGeodetic(d.coordinates) : d.coordinates;
            switch (b.type) {
            case "Point":
                switch (d.type) {
                case "Point":
                    return this._distancePointPoint(g, f);
                case "LineString":
                    return this._distanceLineStringPoint(g, f);
                case "Polygon":
                    return this._containsPolygonPoint(g, f) ? 0 : this._distanceLineStringPoint(g[0], f);
                default:
                    return c
                }
                break;
            case "LineString":
                switch (d.type) {
                case "Point":
                    return this._distanceLineStringPoint(f, g);
                case "LineString":
                    return this._distanceLineStringLineString(f, g);
                case "Polygon":
                    return this._containsPolygonLineString(g, f) ? 0 : this._distanceLineStringLineString(g[0], f);
                default:
                    return c
                }
                break;
            case "Polygon":
                switch (d.type) {
                case "Point":
                    return this._containsPolygonPoint(f, g) ? 0 : this._distanceLineStringPoint(f[0], g);
                case "LineString":
                    return this._containsPolygonLineString(f, g) ? 0 : this._distanceLineStringLineString(f[0], g);
                case "Polygon":
                    return this._containsPolygonLineString(f, g[0]) ? 0 : this._distanceLineStringLineString(f[0], g[0]);
                default:
                    return c
                }
            }
        },
        _distancePointPoint: function (a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1];
            return Math.sqrt(c * c + d * d)
        },
        _distanceLineStringPoint: function (a, b) {
            var c = d;
            if (a.length > 0) {
                var e = a[0],
                    f = b[0] - e[0],
                    g = b[1] - e[1];
                if (a.length == 1) return Math.sqrt(f * f + g * g);
                for (var h = 1; h < a.length; h++) {
                    var i = a[h],
                        j = i[0] - e[0],
                        k = i[1] - e[1],
                        l = b[0] - i[0],
                        m = b[1] - i[1],
                        n = this._distanceSegmentPoint(j, k, f, g, l, m);
                    if (n === 0) return 0;
                    n < c && (c = n), e = i, f = l, g = m
                }
            }
            return Math.sqrt(c)
        },
        _distanceSegmentPoint: function (a, b, c, d, e, f) {
            var g = a * c + b * d;
            if (g <= 0) return c * c + d * d;
            var h = a * a + b * b;
            return g >= h ? e * e + f * f : c * c + d * d - g * g / h
        },
        _distanceLineStringLineString: function (a, b) {
            var c = d;
            for (var e = 0; e < b.length; e++) c = Math.min(c, this._distanceLineStringPoint(a, b[e]));
            return c
        },
        _buffer: function (b, d, e) {
            var f = !1,
                g = b.coordinates;
            !e && a.geo.proj && this._isGeodetic(b.coordinates) && (f = !0, g = a.geo.proj.fromGeodetic(b.coordinates));
            if (b.type === "Point") {
                var h = [],
                    i = 180,
                    j = 0,
                    k;
                for (; j <= i; j++) k = j * 360 / i * (Math.PI / 180), h.push([g[0] + Math.cos(k) * d, g[1] + Math.sin(k) * d]);
                return {
                    type: "Polygon",
                    coordinates: [f ? a.geo.proj.toGeodetic(h) : h]
                }
            }
            return c
        },
        _flatten: function (b) {
            var c = [],
                d = 0;
            switch (b.type) {
            case "Feature":
                a.merge(c, this._flatten(b.geometry));
                break;
            case "FeatureCollection":
                for (; d < b.features.length; d++) a.merge(c, this._flatten(b.features[d].geometry));
                break;
            case "GeometryCollection":
                for (; d < b.geometries.length; d++) a.merge(c, this._flatten(b.geometries[d]));
                break;
            default:
                c[0] = b
            }
            return c
        },
        length: function (b, c) {
            var d = 0,
                e, f = 1,
                g, h;
            switch (b.type) {
            case "Point":
                return 0;
            case "LineString":
                e = b.coordinates;
                break;
            case "Polygon":
                e = b.coordinates[0]
            }
            if (e) {
                !c && a.geo.proj && this._isGeodetic(e) && (e = a.geo.proj.fromGeodetic(e));
                for (; f < e.length; f++) g = e[f][0] - e[f - 1][0], h = e[f][1] - e[f - 1][1], d += Math.sqrt(g * g + h * h);
                return d
            }
        },
        area: function (b, c) {
            var d = 0,
                e, f = 1,
                g;
            switch (b.type) {
            case "Point":
            case "LineString":
                return 0;
            case "Polygon":
                e = b.coordinates[0]
            }
            if (e) {
                !c && a.geo.proj && this._isGeodetic(e) && (e = a.geo.proj.fromGeodetic(e));
                for (; f <= e.length; f++) g = f % e.length, d += (e[f - 1][0] - e[g][0]) * (e[f - 1][1] + e[g][1]) / 2;
                return Math.abs(d)
            }
        },
        pointAlong: function (b, c, d) {
            var e = 0,
                f = 0,
                g = 0,
                h, i, j, k = [],
                l = 1,
                m, n, o, p, q, r = !1;
            switch (b.type) {
            case "Point":
                return a.extend({}, b);
            case "LineString":
                j = b.coordinates;
                break;
            case "Polygon":
                j = b.coordinates[0]
            }
            if (j) {
                if (c === 0) return {
                    type: "Point",
                    coordinates: [j[0][0], j[0][1]]
                };
                if (c === 1) return l = j.length - 1, {
                    type: "Point",
                    coordinates: [j[l][0], j[l][1]]
                };
                !d && a.geo.proj && this._isGeodetic(j) && (r = !0, j = a.geo.proj.fromGeodetic(j));
                for (; l < j.length; l++) m = j[l][0] - j[l - 1][0], n = j[l][1] - j[l - 1][1], i = Math.sqrt(m * m + n * n), k.push(i), e += i;
                for (l = 0; l < k.length && g < c; l++) f = g, g += k[l] / e;
                return h = c - f, p = j[l - 1], q = j[l], o = [p[0] + h * (q[0] - p[0]), p[1] + h * (q[1] - p[1])], {
                    type: "Point",
                    coordinates: r ? a.geo.proj.toGeodetic(o) : o
                }
            }
        },
        _WKT: function () {
            function b(a) {
                return "POINT " + c(a.coordinates)
            }
            function c(a) {
                return !a || !a.length ? "EMPTY" : "(" + a.join(" ") + ")"
            }
            function d(a) {
                return "LINESTRING " + e(a.coordinates)
            }
            function e(a) {
                if (!a || !a.length) return "EMPTY";
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(a[c].join(" "));
                return "(" + b + ")"
            }
            function f(a) {
                return "POLYGON " + g(a.coordinates)
            }
            function g(a) {
                if (!a || !a.length) return "EMTPY";
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(e(a[c]));
                return "(" + b + ")"
            }
            function h(a) {
                return "MULTIPOINT " + e(a.coordinates)
            }
            function i(a) {
                return "MULTILINSTRING " + g(a.coordinates)
            }
            function j(a) {
                return "MULTIPOLYGON " + k(a.coordinates)
            }
            function k(a) {
                if (!a || !a.length) return "EMPTY";
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(g(a[c]));
                return "(" + b + ")"
            }
            function l(a) {
                return "GEOMETRYCOLLECTION " + m(a.geometries)
            }
            function m(a) {
                if (!a || !a.length) return "EMPTY";
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(n(a[c]));
                return "(" + a + ")"
            }
            function n(a) {
                if (!a || !a.type) return "";
                switch (a.type) {
                case "Point":
                    return b(a);
                case "LineString":
                    return d(a);
                case "Polygon":
                    return f(a);
                case "MultiPoint":
                    return h(a);
                case "MultiLineString":
                    return i(a);
                case "MultiPolygon":
                    return j(a);
                case "GeometryCollection":
                    return l(a);
                default:
                    return ""
                }
            }
            function o(a) {
                var b = a.match(/\(\s*([\d\.\-]+)\s+([\d\.\-]+)\s*\)/);
                return b && b.length > 2 ? {
                    type: "Point",
                    coordinates: [parseFloat(b[1]), parseFloat(b[2])]
                } : null
            }
            function p(a) {
                var b = a.match(/\s*\((.*)\)/),
                    c = [],
                    d, e, f = 0;
                if (b && b.length > 1) {
                    d = b[1].match(/[\d\.\-]+\s+[\d\.\-]+/g);
                    for (; f < d.length; f++) e = d[f].match(/\s*([\d\.\-]+)\s+([\d\.\-]+)\s*/), c[f] = [parseFloat(e[1]), parseFloat(e[2])];
                    return {
                        type: "LineString",
                        coordinates: c
                    }
                }
                return null
            }
            function q(a) {
                var b = a.match(/\s*\(\s*\((.*)\)\s*\)/),
                    c = [],
                    d, e, f = 0;
                if (b && b.length > 1) {
                    d = b[1].match(/[\d\.\-]+\s+[\d\.\-]+/g);
                    for (; f < d.length; f++) e = d[f].match(/\s*([\d\.\-]+)\s+([\d\.\-]+)\s*/), c[f] = [parseFloat(e[1]), parseFloat(e[2])];
                    return {
                        type: "Polygon",
                        coordinates: [c]
                    }
                }
                return null
            }
            function r(b) {
                var c;
                return b.indexOf("((") === -1 ? c = p(b) : (c = s(b), c.coordinates = a.geo._allCoordinates(c)), c.type = "MultiPoint", c
            }
            function s(a) {
                var b = a.substr(1, a.length - 2),
                    c = b.split(")),(("),
                    d = 0,
                    e = {
                        type: "MultiLineString",
                        coordinates: []
                    };
                for (; d < c.length; d++) e.coordinates.push(p(c[d]).coordinates);
                return e
            }
            function t(a) {
                var b = a.substr(1, a.length - 2),
                    c = b.split(")),(("),
                    d = 0,
                    e = {
                        type: "MultiPolygon",
                        coordinates: []
                    };
                for (; d < c.length; d++) e.coordinates.push(q(c[d]).coordinates);
                return e
            }
            function u(a) {
                var b = a.substr(1, a.length - 2),
                    c = b.match(/\),[a-zA-Z]/g),
                    d = {
                        type: "GeometryCollection",
                        geometries: []
                    }, e, f = 0,
                    g = 0,
                    h;
                if (c && c.length > 0) {
                    for (; f < c.length; f++) h = b.indexOf(c[f], g) - g + 1, e = v(b.substr(g, h)), e && d.geometries.push(e), g += h + 1;
                    return e = v(b.substr(g)), e && d.geometries.push(e), d
                }
                return null
            }
            function v(b) {
                b = a.trim(b);
                var c = b.indexOf("("),
                    d = b.substr(c);
                switch (a.trim(b.substr(0, c)).toUpperCase()) {
                case "POINT":
                    return o(d);
                case "LINESTRING":
                    return p(d);
                case "POLYGON":
                    return q(d);
                case "MULTIPOINT":
                    return r(d);
                case "MULTILINESTRING":
                    return s(d);
                case "MULTIPOLYGON":
                    return t(d);
                case "GEOMETRYCOLLECTION":
                    return u(d);
                default:
                    return null
                }
            }
            return {
                stringify: n,
                parse: v
            }
        }(),
        proj: function () {
            var b = 1.5707963267948966,
                c = .7853981633974483,
                d = .017453292519943295,
                e = 57.29577951308232,
                f = 6378137;
            return {
                fromGeodeticPos: function (a) {
                    return [f * a[0] * d, f * Math.log(Math.tan(c + a[1] * d / 2))]
                },
                fromGeodetic: function (b) {
                    if (!a.geo._isGeodetic(b)) return b;
                    var c = a.isArray(b[0]),
                        d = this.fromGeodeticPos;
                    if (!c && b.length == 4) {
                        var e = d([b[0], b[1]]),
                            f = d([b[2], b[3]]);
                        return [e[0], e[1], f[0], f[1]]
                    }
                    var g = c && a.isArray(b[0][0]),
                        h = g && a.isArray(b[0][0][0]),
                        i = [],
                        j, k, l;
                    h || (g || (c || (b = [b]), b = [b]), b = [b]);
                    for (j = 0; j < b.length; j++) {
                        i[j] = [];
                        for (k = 0; k < b[j].length; k++) {
                            i[j][k] = [];
                            for (l = 0; l < b[j][k].length; l++) i[j][k][l] = d(b[j][k][l])
                        }
                    }
                    return h ? i : g ? i[0] : c ? i[0][0] : i[0][0][0]
                },
                toGeodeticPos: function (a) {
                    return [a[0] / f * e, (b - 2 * Math.atan(1 / Math.exp(a[1] / f))) * e]
                },
                toGeodetic: function (b) {
                    if (a.geo._isGeodetic(b)) return b;
                    var c = a.isArray(b[0]),
                        d = this.toGeodeticPos;
                    if (!c && b.length == 4) {
                        var e = d([b[0], b[1]]),
                            f = d([b[2], b[3]]);
                        return [e[0], e[1], f[0], f[1]]
                    }
                    var g = c && a.isArray(b[0][0]),
                        h = g && a.isArray(b[0][0][0]),
                        i = [],
                        j, k, l;
                    h || (g || (c || (b = [b]), b = [b]), b = [b]);
                    for (j = 0; j < b.length; j++) {
                        i[j] = [];
                        for (k = 0; k < b[j].length; k++) {
                            i[j][k] = [];
                            for (l = 0; l < b[j][k].length; l++) i[j][k][l] = d(b[j][k][l])
                        }
                    }
                    return h ? i : g ? i[0] : c ? i[0][0] : i[0][0][0]
                }
            }
        }(),
        _serviceTypes: {}
    }
}(jQuery, this),
function (a, b) {
    var c = function () {
        var a = 5,
            b = document.createElement("div"),
            c = b.all || [];
        do b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->";
        while (c[0]);
        return a > 6 ? a : !a
    }();
    a.widget("geo.geographics", {
        _$elem: b,
        _options: {},
        _trueCanvas: !0,
        _width: 0,
        _height: 0,
        _$canvas: b,
        _context: b,
        _blitcanvas: b,
        _blitcontext: b,
        _$labelsContainer: b,
        options: {
            style: {
                borderRadius: "8px",
                color: "#7f0000",
                fillOpacity: .2,
                height: "8px",
                opacity: 1,
                strokeOpacity: 1,
                strokeWidth: "2px",
                visibility: "visible",
                width: "8px"
            }
        },
        _create: function () {
            this._$elem = this.element, this._options = this.options, this._$elem.css({
                display: "inline-block",
                overflow: "hidden",
                textAlign: "left"
            }), this._$elem.css("position") == "static" && this._$elem.css("position", "relative"), this._$elem.addClass("geo-graphics"), this._width = this._$elem.width(), this._height = this._$elem.height();
            if (!this._width || !this._height) this._width = parseInt(this._$elem.css("width"), 10), this._height = parseInt(this._$elem.css("height"), 10);
            var a = "position:absolute;left:0;top:0;margin:0;padding:0;",
                b = "width:" + this._width + "px;height:" + this._height + "px;",
                d = 'width="' + this._width + '" height="' + this._height + '"';
            document.createElement("canvas").getContext ? (this._$elem.append("<canvas " + d + ' style="-webkit-transform:translateZ(0);' + a + '"></canvas>'), this._$canvas = this._$elem.children(":last"), this._context = this._$canvas[0].getContext("2d"), this._blitcanvas = document.createElement("canvas"), this._blitcanvas.width = this._width, this._blitcanvas.height = this._height, this._blitcontext = this._blitcanvas.getContext("2d")) : c <= 8 && (this._trueCanvas = !1, this._$elem.append("<div " + d + ' style="' + a + b + '"></div>'), this._$canvas = this._$elem.children(":last"), G_vmlCanvasManager.initElement(this._$canvas[0]), this._context = this._$canvas[0].getContext("2d"), this._$canvas.children().css({
                backgroundColor: "transparent",
                width: this._width,
                height: this._height
            })), this._$elem.append('<div class="geo-labels-container" style="-webkit-transform:translateZ(0);' + a + b + '"></div>'), this._$labelsContainer = this._$elem.children(":last")
        },
        _setOption: function (b, c) {
            b == "style" && (c = a.extend({}, this._options.style, c)), a.Widget.prototype._setOption.apply(this, arguments)
        },
        destroy: function () {
            a.Widget.prototype.destroy.apply(this, arguments), this._$elem.html(""), this._$elem.removeClass("geo-graphics")
        },
        clear: function () {
            this._context.clearRect(0, 0, this._width, this._height), this._$labelsContainer.html("")
        },
        drawArc: function (a, b, c, d) {
            d = this._getGraphicStyle(d);
            if (d.visibility != "hidden" && d.opacity > 0 && d.widthValue > 0 && d.heightValue > 0) {
                var e = Math.min(d.widthValue, d.heightValue) / 2;
                b = b * Math.PI / 180, c = c * Math.PI / 180, this._context.save(), this._context.translate(a[0], a[1]), d.widthValue > d.heightValue ? this._context.scale(d.widthValue / d.heightValue, 1) : this._context.scale(1, d.heightValue / d.widthValue), this._context.beginPath(), this._context.arc(0, 0, e, b, c, !1), this._trueCanvas && this._context.restore(), d.doFill && (this._context.fillStyle = d.fill, this._context.globalAlpha = d.opacity * d.fillOpacity, this._context.fill()), d.doStroke && (this._context.lineJoin = "round", this._context.lineWidth = d.strokeWidthValue, this._context.strokeStyle = d.stroke, this._context.globalAlpha = d.opacity * d.strokeOpacity, this._context.stroke()), this._trueCanvas || this._context.restore()
            }
        },
        drawPoint: function (a, b) {
            b = this._getGraphicStyle(b), b.widthValue == b.heightValue && b.heightValue == b.borderRadiusValue ? this.drawArc(a, 0, 360, b) : b.visibility != "hidden" && b.opacity > 0 && (b.borderRadiusValue = Math.min(Math.min(b.widthValue, b.heightValue) / 2, b.borderRadiusValue), a[0] -= b.widthValue / 2, a[1] -= b.heightValue / 2, this._context.beginPath(), this._context.moveTo(a[0] + b.borderRadiusValue, a[1]), this._context.lineTo(a[0] + b.widthValue - b.borderRadiusValue, a[1]), this._context.quadraticCurveTo(a[0] + b.widthValue, a[1], a[0] + b.widthValue, a[1] + b.borderRadiusValue), this._context.lineTo(a[0] + b.widthValue, a[1] + b.heightValue - b.borderRadiusValue), this._context.quadraticCurveTo(a[0] + b.widthValue, a[1] + b.heightValue, a[0] + b.widthValue - b.borderRadiusValue, a[1] + b.heightValue), this._context.lineTo(a[0] + b.borderRadiusValue, a[1] + b.heightValue), this._context.quadraticCurveTo(a[0], a[1] + b.heightValue, a[0], a[1] + b.heightValue - b.borderRadiusValue), this._context.lineTo(a[0], a[1] + b.borderRadiusValue), this._context.quadraticCurveTo(a[0], a[1], a[0] + b.borderRadiusValue, a[1]), this._context.closePath(), b.doFill && (this._context.fillStyle = b.fill, this._context.globalAlpha = b.opacity * b.fillOpacity, this._context.fill()), b.doStroke && (this._context.lineJoin = "round", this._context.lineWidth = b.strokeWidthValue, this._context.strokeStyle = b.stroke, this._context.globalAlpha = b.opacity * b.strokeOpacity, this._context.stroke()))
        },
        drawLineString: function (a, b) {
            this._drawLines([a], !1, b)
        },
        drawPolygon: function (a, b) {
            if (!this._trueCanvas || a.length == 1) this._drawLines(a, !0, b);
            else {
                if (!a || !a.length || a[0].length < 3) return;
                b = this._getGraphicStyle(b);
                var c, d, e;
                if (b.visibility != "hidden" && b.opacity > 0) {
                    this._blitcontext.clearRect(0, 0, this._width, this._height);
                    if (b.doFill && a.length > 1) {
                        this._blitcontext.globalCompositeOperation = "source-out", this._blitcontext.globalAlpha = 1;
                        for (d = 1; d < a.length; d++) {
                            this._blitcontext.beginPath(), this._blitcontext.moveTo(a[d][0][0], a[d][0][1]);
                            for (e = 1; e < a[d].length; e++) this._blitcontext.lineTo(a[d][e][0], a[d][e][1]);
                            this._blitcontext.closePath(), this._blitcontext.fill()
                        }
                    }
                    this._blitcontext.beginPath(), this._blitcontext.moveTo(a[0][0][0], a[0][0][1]), c = [a[0][0][0] - b.strokeWidthValue, a[0][0][1] - b.strokeWidthValue, a[0][0][0] + b.strokeWidthValue, a[0][0][1] + b.strokeWidthValue];
                    for (d = 1; d < a[0].length - 1; d++) this._blitcontext.lineTo(a[0][d][0], a[0][d][1]), c[0] = Math.min(a[0][d][0] - b.strokeWidthValue, c[0]), c[1] = Math.min(a[0][d][1] - b.strokeWidthValue, c[1]), c[2] = Math.max(a[0][d][0] + b.strokeWidthValue, c[2]), c[3] = Math.max(a[0][d][1] + b.strokeWidthValue, c[3]);
                    this._blitcontext.closePath(), this._blitcontext.globalCompositeOperation = "source-out", b.doFill && (this._blitcontext.fillStyle = b.fill, this._blitcontext.globalAlpha = b.opacity * b.fillOpacity, this._blitcontext.fill()), this._blitcontext.globalCompositeOperation = "source-over";
                    if (b.doStroke) {
                        this._blitcontext.lineCap = this._blitcontext.lineJoin = "round", this._blitcontext.lineWidth = b.strokeWidthValue, this._blitcontext.strokeStyle = b.stroke, this._blitcontext.globalAlpha = b.opacity * b.strokeOpacity, this._blitcontext.stroke();
                        if (a.length > 1) for (d = 1; d < a.length; d++) {
                            this._blitcontext.beginPath(), this._blitcontext.moveTo(a[d][0][0], a[d][0][1]);
                            for (e = 1; e < a[d].length; e++) this._blitcontext.lineTo(a[d][e][0], a[d][e][1]);
                            this._blitcontext.closePath(), this._blitcontext.stroke()
                        }
                    }
                    c[0] = Math.min(Math.max(c[0], 0), this._width), c[1] = Math.min(Math.max(c[1], 0), this._height), c[2] = Math.min(Math.max(c[2], 0), this._width), c[3] = Math.min(Math.max(c[3], 0), this._height), c[0] !== c[2] && c[1] !== c[3] && this._context.drawImage(this._blitcanvas, c[0], c[1], c[2] - c[0], c[3] - c[1], c[0], c[1], c[2] - c[0], c[3] - c[1])
                }
            }
        },
        drawBbox: function (a, b) {
            this._drawLines([
                [
                    [a[0], a[1]],
                    [a[0], a[3]],
                    [a[2], a[3]],
                    [a[2], a[1]],
                    [a[0], a[1]]
                ]
            ], !0, b)
        },
        drawLabel: function (a, b) {
            this._$labelsContainer.append('<div class="geo-label" style="-webkit-transform:translateZ(0);position:absolute; left:' + a[0] + "px; top:" + a[1] + 'px;">' + b + "</div>")
        },
        resize: function () {
            this._width = this._$elem.width(), this._height = this._$elem.height();
            if (!this._width || !this._height) this._width = parseInt(this._$elem.css("width"), 10), this._height = parseInt(this._$elem.css("height"), 10);
            this._trueCanvas && (this._$canvas[0].width = this._width, this._$canvas[0].height = this._height), this._$labelsContainer.css({
                width: this._width,
                height: this._height
            })
        },
        _getGraphicStyle: function (b) {
            function c(a) {
                return a = parseInt(a, 10), + a + "" === a ? +a : a
            }
            return b = a.extend({}, this._options.style, b), b.borderRadiusValue = c(b.borderRadius), b.fill = b.fill || b.color, b.doFill = b.fill && b.fillOpacity > 0, b.stroke = b.stroke || b.color, b.strokeWidthValue = c(b.strokeWidth), b.doStroke = b.stroke && b.strokeOpacity > 0 && b.strokeWidthValue > 0, b.widthValue = c(b.width), b.heightValue = c(b.height), b
        },
        _drawLines: function (a, b, c) {
            if (!a || !a.length || a[0].length < 2) return;
            var d, e;
            c = this._getGraphicStyle(c);
            if (c.visibility != "hidden" && c.opacity > 0) {
                this._context.beginPath();
                for (d = 0; d < a.length; d++) {
                    this._context.moveTo(a[d][0][0], a[d][0][1]);
                    for (e = 1; e < a[d].length; e++) this._context.lineTo(a[d][e][0], a[d][e][1])
                }
                b && this._context.closePath(), b && c.doFill && (this._context.fillStyle = c.fill, this._context.globalAlpha = c.opacity * c.fillOpacity, this._context.fill()), c.doStroke && (this._context.lineCap = this._context.lineJoin = "round", this._context.lineWidth = c.strokeWidthValue, this._context.strokeStyle = c.stroke, this._context.globalAlpha = c.opacity * c.strokeOpacity, this._context.stroke())
            }
        }
    })
}(jQuery),
function (a, b) {
    var c = 0,
        d = function () {
            var a = 5,
                b = document.createElement("div"),
                c = b.all || [];
            do b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->";
            while (c[0]);
            return a > 6 ? a : !a
        }(),
        e = {
            bbox: [-180, - 85, 180, 85],
            bboxMax: [-180, - 85, 180, 85],
            center: [0, 0],
            cursors: {
                "static": "default",
                pan: "url(data:image/vnd.microsoft.icon;base64,AAACAAEAICACAAgACAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA/AAAAfwAAAP+AAAH/gAAB/8AAA//AAAd/wAAGf+AAAH9gAADbYAAA2yAAAZsAAAGbAAAAGAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gH///4B///8Af//+AD///AA///wAH//4AB//8AAf//AAD//5AA///gAP//4AD//8AF///AB///5A////5///8=), move",
                zoom: "crosshair",
                dragBox: "crosshair",
                dragCircle: "crosshair",
                drawPoint: "crosshair",
                drawLineString: "crosshair",
                drawPolygon: "crosshair",
                measureLength: "crosshair",
                measureArea: "crosshair"
            },
            measureLabels: {
                length: "{{:length.toFixed( 2 )}} m",
                area: "{{:area.toFixed( 2 )}} sq m"
            },
            drawStyle: {},
            shapeStyle: {},
            mode: "pan",
            pannable: !0,
            scroll: "default",
            shift: "default",
            services: [{
                "class": "osm",
                type: "tiled",
                src: function (a) {
                    return "http://otile" + (a.index % 4 + 1) + ".mqcdn.com/tiles/1.0.0/osm/" + a.zoom + "/" + a.tile.column + "/" + a.tile.row + ".png"
                },
                attr: "Tiles Courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>"
            }],
            tilingScheme: {
                tileWidth: 256,
                tileHeight: 256,
                levels: 18,
                basePixelSize: 156543.03392799935,
                origin: [-20037508.342787, 20037508.342787]
            },
            axisLayout: "map",
            zoom: 0,
            zoomMin: 0,
            zoomMax: Number.POSITIVE_INFINITY,
            pixelSize: 0
        };
    a.widget("geo.geomap", {
        _$elem: b,
        _map: b,
        _created: !1,
        _createdGraphics: !1,
        _widgetId: 0,
        _tmplLengthId: "",
        _tmplAreaId: "",
        _contentBounds: {},
        _$resizeContainer: b,
        _$eventTarget: b,
        _$contentFrame: b,
        _$existingChildren: b,
        _$attrList: b,
        _$servicesContainer: b,
        _$shapesContainers: b,
        _$panContainer: b,
        _$shapesContainer: b,
        _$drawContainer: b,
        _$measureContainer: b,
        _$measureLabel: b,
        _dpi: 96,
        _currentServices: [],
        _center: b,
        _pixelSize: b,
        _centerMax: b,
        _pixelSizeMax: b,
        _userGeodetic: !0,
        _centerInteractive: b,
        _pixelSizeInteractive: b,
        _timeoutInteractive: null,
        _triggerInteractive: !1,
        _loadCount: 0,
        _wheelTimeout: null,
        _wheelLevel: 0,
        _zoomFactor: 2,
        _fullZoomFactor: 2,
        _partialZoomFactor: 1.18920711500273,
        _mouseDown: b,
        _inOp: b,
        _toolPan: b,
        _shiftDown: b,
        _anchor: b,
        _current: b,
        _downDate: b,
        _moveDate: b,
        _clickDate: b,
        _lastMove: b,
        _lastDrag: b,
        _windowHandler: null,
        _resizeTimeout: null,
        _panning: b,
        _velocity: b,
        _friction: b,
        _supportTouch: b,
        _softDblClick: b,
        _isTap: b,
        _isDbltap: b,
        _isMultiTouch: b,
        _multiTouchAnchor: [],
        _multiTouchAnchorBbox: b,
        _multiTouchCurrentBbox: b,
        _drawTimeout: null,
        _drawPixels: [],
        _drawCoords: [],
        _graphicShapes: [],
        _initOptions: {},
        _options: {},
        options: a.extend({}, e),
        _createWidget: function (b, d) {
            this._$elem = a(d);
            if (this._$elem.is(".geo-service")) {
                this._graphicShapes = [], a.Widget.prototype._createWidget.apply(this, arguments);
                return
            }
            this._widgetId = c++, this._tmplLengthId = "geoMeasureLength" + this._widgetId, this._tmplAreaId = "geoMeasureArea" + this._widgetId, this._$elem.addClass("geo-map").css({
                webkitTransform: "translateZ(0)"
            }), this._initOptions = b || {}, this._forcePosition(this._$elem), this._$elem.css("text-align", "left");
            var e = this._findMapSize();
            this._contentBounds = {
                x: parseInt(this._$elem.css("padding-left"), 10),
                y: parseInt(this._$elem.css("padding-top"), 10),
                width: e.width,
                height: e.height
            }, this._createChildren(), this._center = [0, 0], this._centerMax = [0, 0], this._centerInteractive = [0, 0], this.options.pixelSize = this._pixelSize = this._pixelSizeMax = 156543.03392799935, this._mouseDown = this._inOp = this._toolPan = this._shiftDown = this._panning = this._isTap = this._isDbltap = !1, this._anchor = [0, 0], this._current = [0, 0], this._lastMove = [0, 0], this._lastDrag = [0, 0], this._velocity = [0, 0], this._friction = [.8, .8], this._downDate = this._moveDate = this._clickDate = 0, this._drawPixels = [], this._drawCoords = [], this._graphicShapes = [], a.Widget.prototype._createWidget.apply(this, arguments)
        },
        _create: function () {
            this._options = this.options;
            if (this._$elem.is(".geo-service")) {
                this._map = this._$elem.data("geoMap"), this._$elem.data("geoService", this);
                return
            }
            this._map = this, this._supportTouch = "ontouchend" in document, this._softDblClick = this._supportTouch || d == 7;
            var c = this,
                e = this._supportTouch ? "touchstart" : "mousedown",
                f = this._supportTouch ? "touchend touchcancel" : "mouseup",
                g = this._supportTouch ? "touchmove" : "mousemove";
            a(document).keydown(a.proxy(this._document_keydown, this)), this._$eventTarget.dblclick(a.proxy(this._eventTarget_dblclick, this)), this._$eventTarget.bind(e, a.proxy(this._eventTarget_touchstart, this));
            var h = this._$eventTarget[0].setCapture ? this._$eventTarget : a(document);
            h.bind(g, a.proxy(this._dragTarget_touchmove, this)), h.bind(f, a.proxy(this._dragTarget_touchstop, this)), this._$eventTarget.mousewheel(a.proxy(this._eventTarget_mousewheel, this)), this._windowHandler = function () {
                c._resizeTimeout && clearTimeout(c._resizeTimeout), c._resizeTimeout = setTimeout(function () {
                    c._created && c._$elem.geomap("resize", !0)
                }, 500)
            }, a(window).resize(this._windowHandler), this._$drawContainer.geographics({
                style: this._initOptions.drawStyle || {}
            }), this._options.drawStyle = this._$drawContainer.geographics("option", "style"), this._$shapesContainer.geographics({
                style: this._initOptions.shapeStyle || {}
            }), this._createdGraphics = !0, this._options.shapeStyle = this._$shapesContainer.geographics("option", "style"), this._initOptions && (this._initOptions.tilingScheme !== b && this._setOption("tilingScheme", this._initOptions.tilingScheme || null, !1), this._initOptions.services && (this._options.services = a.merge([], this._initOptions.services)), this._initOptions.bboxMax && (this._setOption("bboxMax", this._initOptions.bboxMax, !1), this._setOption("bbox", this._initOptions.bboxMax, !1)), this._initOptions.zoomMin !== b && this._setOption("zoomMin", this._initOptions.zoomMin, !1), this._initOptions.zoomMax !== b && this._setOption("zoomMax", this._initOptions.zoomMax, !1), this._initOptions.bbox && this._setOption("bbox", this._initOptions.bbox, !1), this._initOptions.center && this._setOption("center", this._initOptions.center, !1), this._initOptions.zoom !== b && this._setOption("zoom", this._initOptions.zoom, !1)), a.templates(this._tmplLengthId, this._options.measureLabels.length), a.templates(this._tmplAreaId, this._options.measureLabels.area), this._$eventTarget.css("cursor", this._options.cursors[this._options.mode]), this._createServices(), this._refresh(), this._created = !0
        },
        _setOption: function (c, d, e) {
            if (c == "pixelSize") return;
            e = e === b || e, this._$elem.is(".geo-map") && this._panFinalize();
            var f, g, h, i;
            switch (c) {
            case "bbox":
                this._created && this._clearInteractiveTimeout(), this._userGeodetic = a.geo.proj && a.geo._isGeodetic(d), this._userGeodetic && (d = a.geo.proj.fromGeodetic(d)), f = [d[0] + (d[2] - d[0]) / 2, d[1] + (d[3] - d[1]) / 2], g = Math.max(a.geo.width(d, !0) / this._contentBounds.width, a.geo.height(d, !0) / this._contentBounds.height), i = this._getZoom(f, g), this._options.tilingScheme ? g = this._getPixelSize(Math.min(Math.max(i, this._options.zoomMin), this._options.zoomMax)) : i < this._options.zoomMin ? g = this._getPixelSize(this._options.zoomMin) : i > this._options.zoomMax && (g = this._getPixelSize(this._options.zoomMax)), this._created ? (this._setInteractiveCenterAndSize(f, g), this._setInteractiveTimeout(!1)) : this._setCenterAndSize(f, g, !1, e), d = this._getBbox(f, g);
                break;
            case "bboxMax":
                this._userGeodetic = a.geo.proj && a.geo._isGeodetic(d);
                break;
            case "center":
                this._created && this._clearInteractiveTimeout(), this._userGeodetic = a.geo.proj && a.geo._isGeodetic(d), this._userGeodetic && (d = a.geo.proj.fromGeodetic(d)), this._created ? (this._setInteractiveCenterAndSize(d, this._pixelSizeInteractive), this._interactiveTransform(), this._setInteractiveTimeout(!1)) : this._setCenterAndSize(d, this._pixelSize, !1, e);
                break;
            case "measureLabels":
                d = a.extend(this._options.measureLabels, d), a.templates(this._tmplLengthId, this._options.measureLabels.length), a.templates(this._tmplAreaId, this._options.measureLabels.area);
                break;
            case "drawStyle":
                this._$drawContainer && (this._$drawContainer.geographics("option", "style", d), d = this._$drawContainer.geographics("option", "style"));
                break;
            case "shapeStyle":
                this._$elem.is(".geo-service") && !this._createdGraphics && this._createServiceGraphics(), this._createdGraphics && (this._$shapesContainer.geographics("option", "style", d), d = this._$shapesContainer.geographics("option", "style"));
                break;
            case "mode":
                this._resetDrawing(), this._$eventTarget.css("cursor", this._options.cursors[d]);
                break;
            case "zoom":
                this._created ? this._setZoom(d, !1, e) : (d = Math.max(d, 0), this._setCenterAndSize(this._center, this._getPixelSize(d), !1, e))
            }
            a.Widget.prototype._setOption.apply(this, arguments);
            switch (c) {
            case "bbox":
            case "center":
                this._userGeodetic && (this._options.bbox = a.geo.proj.toGeodetic(this._options.bbox), this._options.center = a.geo.proj.toGeodetic(this._center));
                break;
            case "tilingScheme":
                d !== null && (this._pixelSizeMax = this._getPixelSize(0), this._centerMax = [d.origin[0] + this._pixelSizeMax * d.tileWidth / 2, d.origin[1] + this._pixelSizeMax * d.tileHeight / 2]);
                break;
            case "bboxMax":
                a.geo.proj && a.geo._isGeodetic(d) ? h = a.geo.proj.fromGeodetic(d) : h = d, this._centerMax = a.geo.center(h), this._pixelSizeMax = Math.max(a.geo.width(h, !0) / this._contentBounds.width, a.geo.height(h, !0) / this._contentBounds.height);
                break;
            case "services":
                this._createServices(), e && this._refresh();
                break;
            case "shapeStyle":
                e && this._createdGraphics && (this._$shapesContainer.geographics("clear"), this._refreshShapes(this._$shapesContainer, this._graphicShapes, this._graphicShapes, this._graphicShapes))
            }
        },
        destroy: function () {
            if (this._$elem.is(".geo-service")) this._createdGraphics && (this._$shapesContainer.geographics("destroy"), this._$shapesContainer = b, this._createdGraphics = !1);
            else {
                clearTimeout(this._timeoutInteractive), this._timeoutInteractive = null, this._created = !1, a(window).unbind("resize", this._windowHandler);
                for (var c = 0; c < this._currentServices.length; c++) this._currentServices[c].serviceContainer.geomap("destroy"), a.geo._serviceTypes[this._currentServices[c].type].destroy(this, this._$servicesContainer, this._currentServices[c]);
                this._$shapesContainer.geographics("destroy"), this._$shapesContainer = b, this._createdGraphics = !1, this._$drawContainer.geographics("destroy"), this._$drawContainer = b, this._$existingChildren.detach(), this._$elem.html(""), this._$elem.append(this._$existingChildren), this._$elem.removeClass("geo-map")
            }
            a.Widget.prototype.destroy.apply(this, arguments)
        },
        toMap: function (b) {
            return b = this._toMap(b), this._userGeodetic ? a.geo.proj.toGeodetic(b) : b
        },
        toPixel: function (b, c, d) {
            return this._toPixel(a.geo.proj ? a.geo.proj.fromGeodetic(b) : b, c, d)
        },
        opacity: function (b, c) {
            if (this._$elem.is(".geo-service")) this._$elem.closest(".geo-map").geomap("opacity", b, this._$elem);
            else if (b >= 0 || b <= 1) for (var d = 0; d < this._currentServices.length; d++) {
                var e = this._currentServices[d];
                if (!c || e.serviceContainer[0] == c[0]) e.style.opacity = b, e.serviceObject.style = a.extend({}, e.serviceObject.style, e.style), a.geo._serviceTypes[e.type].opacity(this, e)
            }
        },
        toggle: function (c, d) {
            if (this._$elem.is(".geo-service")) this._$elem.closest(".geo-map").geomap("toggle", c, this._$elem);
            else for (var e = 0; e < this._currentServices.length; e++) {
                var f = this._currentServices[e];
                if (!d || f.serviceContainer[0] == d[0]) c === b && (c = f.style.visibility !== "visible"), f.style.visibility = c ? "visible" : "hidden", f.serviceObject.style = a.extend({}, f.serviceObject.style, f.style), f.serviceContainer.toggle(c), c && a.geo._serviceTypes[f.type].refresh(this, f)
            }
        },
        zoom: function (a) {
            a !== null && this._setZoom(this._options.zoom + a, !1, !0)
        },
        refresh: function (a, b) {
            this._$elem.is(".geo-service") ? this._$elem.closest(".geo-map").geomap("refresh", a, this._$elem) : this._refresh(a, b)
        },
        resize: function (b) {
            var c = this._findMapSize(),
                d = c.width / 2 - this._contentBounds.width / 2,
                e = c.height / 2 - this._contentBounds.height / 2,
                f;
            this._contentBounds = {
                x: parseInt(this._$elem.css("padding-left"), 10),
                y: parseInt(this._$elem.css("padding-top"), 10),
                width: c.width,
                height: c.height
            }, this._$resizeContainer.css({
                width: c.width,
                height: c.height
            });
            for (f = 0; f < this._currentServices.length; f++) a.geo._serviceTypes[this._currentServices[f].type].resize(this, this._currentServices[f]);
            this._$elem.find(".geo-graphics").css({
                width: c.width,
                height: c.height
            }).geographics("resize");
            for (f = 0; f < this._drawPixels.length; f++) this._drawPixels[f][0] += d, this._drawPixels[f][1] += e;
            this._setCenterAndSize(this._center, this._pixelSize, b, !0)
        },
        append: function (c, d, e, f) {
            if (c && (a.isPlainObject(c) || a.isArray(c) && c.length > 0)) {
                this._createdGraphics || this._createServiceGraphics();
                var g, h, i, j, k, l;
                a.isArray(c) ? g = c : c.type == "FeatureCollection" ? g = c.features : g = [c];
                for (i = 1; i < arguments.length; i++) h = arguments[i], typeof h == "object" ? j = h : typeof h == "number" || typeof h == "string" ? k = h : typeof h == "boolean" && (l = h);
                for (i = 0; i < g.length; i++) {
                    if (g[i].type != "Point") {
                        var m = a.geo.bbox(g[i]);
                        a.geo.proj && a.geo._isGeodetic(m) && (m = a.geo.proj.fromGeodetic(m)), a.data(g[i], "geoBbox", m)
                    }
                    this._graphicShapes.push({
                        shape: g[i],
                        style: j,
                        label: k
                    })
                }
                if (l === b || l) this._$elem.is(".geo-service") ? this._refresh(!1, this._$elem) : this._refresh()
            }
        },
        empty: function (c) {
            for (var d = 0; d < this._graphicShapes.length; d++) a.removeData(this._graphicShapes[d].shape, "geoBbox");
            this._graphicShapes = [];
            if (c === b || c) this._$elem.is(".geo-service") ? this._refresh(!1, this._$elem) : this._refresh()
        },
        find: function (c, d) {
            var e = a.isPlainObject(c),
                f = e ? this._map.toPixel(c.coordinates) : b,
                g = this._map._pixelSize * d,
                h = [],
                i, j, k, l = 0;
            for (; l < this._graphicShapes.length; l++) {
                i = this._graphicShapes[l];
                if (e) if (i.shape.type == "Point") a.geo.distance(i.shape, c) <= g && h.push(i.shape);
                else {
                    var m = a.data(i.shape, "geoBbox"),
                        n = {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [m[0], m[1]],
                                    [m[0], m[3]],
                                    [m[2], m[3]],
                                    [m[2], m[1]],
                                    [m[0], m[1]]
                                ]
                            ]
                        }, o = {
                            type: "Point",
                            coordinates: a.geo.proj && a.geo._isGeodetic(c.coordinates) ? a.geo.proj.fromGeodetic(c.coordinates) : c.coordinates
                        };
                    if (a.geo.distance(n, o, !0) <= g) {
                        j = a.geo._flatten(i.shape);
                        for (k = 0; k < j.length; k++) if (a.geo.distance(j[k], c) <= g) {
                            h.push(i.shape);
                            break
                        }
                    }
                } else h.push(i.shape)
            }
            return this._$elem.is(".geo-map") && this._$elem.find(".geo-service").each(function () {
                h = a.merge(h, a(this).geomap("find", c, d))
            }), h
        },
        remove: function (c, d) {
            if (c && (a.isPlainObject(c) || a.isArray(c) && c.length > 0)) {
                var e = a.isArray(c) ? c : [c],
                    f;
                for (var g = 0; g < this._graphicShapes.length; g++) a.inArray(this._graphicShapes[g].shape, e) >= 0 && (a.removeData(c, "geoBbox"), f = this._graphicShapes.slice(g + 1), this._graphicShapes.length = g, this._graphicShapes.push.apply(this._graphicShapes, f), g--);
                if (d === b || d) this._$elem.is(".geo-service") ? this._refresh(!1, this._$elem) : this._refresh()
            }
        },
        _getBbox: function (a, b) {
            a = a || this._center, b = b || this._pixelSize;
            var c = this._contentBounds.width / 2 * b,
                d = this._contentBounds.height / 2 * b;
            return [a[0] - c, a[1] - d, a[0] + c, a[1] + d]
        },
        _setBbox: function (b, c, d) {
            var e = [b[0] + (b[2] - b[0]) / 2, b[1] + (b[3] - b[1]) / 2],
                f = Math.max(a.geo.width(b, !0) / this._contentBounds.width, a.geo.height(b, !0) / this._contentBounds.height),
                g = this._getZoom(e, f);
            this._options.tilingScheme ? f = this._getPixelSize(Math.min(Math.max(g, this._options.zoomMin), this._options.zoomMax)) : g < this._options.zoomMin ? f = this._getPixelSize(this._options.zoomMin) : g > this._options.zoomMax && (f = this._getPixelSize(this._options.zoomMax)), this._setInteractiveCenterAndSize(e, f), this._interactiveTransform()
        },
        _getBboxMax: function () {
            var a = this._contentBounds.width / 2 * this._pixelSizeMax,
                b = this._contentBounds.height / 2 * this._pixelSizeMax;
            return [this._centerMax[0] - a, this._centerMax[1] - b, this._centerMax[0] + a, this._centerMax[1] + b]
        },
        _getCenter: function () {
            return this._center
        },
        _getContentBounds: function () {
            return this._contentBounds
        },
        _getServicesContainer: function () {
            return this._$servicesContainer
        },
        _getZoom: function (b, c) {
            b = b || this._center, c = c || this._pixelSize;
            var d = this._options.tilingScheme;
            if (d) {
                if (d.pixelSizes) {
                    var e = Math.floor(c * 1e3),
                        f = d.pixelSizes.length,
                        g = f - 1;
                    for (; g >= 0; g--) if (Math.floor(d.pixelSizes[g] * 1e3) >= e) return g;
                    return 0
                }
                return Math.round(Math.log(d.basePixelSize / c) / Math.log(2))
            }
            var h = this._contentBounds.width / this._contentBounds.height,
                i = a.geo.reaspect(this._getBbox(b, c), h, !0),
                j = a.geo.reaspect(this._getBboxMax(), h, !0);
            return Math.round(Math.log(a.geo.width(j, !0) / a.geo.width(i, !0)) / Math.log(this._zoomFactor))
        },
        _setZoom: function (a, b, c) {
            this._clearInteractiveTimeout(), a = Math.min(Math.max(a, this._options.zoomMin), this._options.zoomMax), this._setInteractiveCenterAndSize(this._centerInteractive, this._getPixelSize(a)), this._interactiveTransform(), this._setInteractiveTimeout(b)
        },
        _createChildren: function () {
            this._$existingChildren = this._$elem.children(), this._forcePosition(this._$existingChildren), this._$existingChildren.detach().css({
                mozUserSelect: "none"
            });
            var b = "width:" + this._contentBounds.width + "px; height:" + this._contentBounds.height + "px; margin:0; padding:0;",
                c = "position:absolute; left:0; top:0;";
            this._$elem.prepend('<div class="geo-event-target geo-content-frame" style="position:absolute; left:' + this._contentBounds.x + "px; top:" + this._contentBounds.y + "px;" + b + 'overflow:hidden; -khtml-user-select:none; -moz-user-select:none; -webkit-user-select:none; user-select:none;" unselectable="on"></div>'), this._$eventTarget = this._$contentFrame = this._$elem.children(":first"), this._$contentFrame.append('<div class="geo-services-container" style="' + c + b + '"></div>'), this._$servicesContainer = this._$contentFrame.children(":last"), this._$contentFrame.append('<div class="geo-shapes-container" style="' + c + b + '"></div>'), this._$shapesContainer = this._$contentFrame.children(":last"), this._$contentFrame.append('<ul style="position: absolute; bottom: 8px; left: 8px; list-style-type: none; max-width: 50%; padding: 0; margin: 0;"></ul>'), this._$attrList = this._$contentFrame.children(":last"), this._$contentFrame.append('<div class="geo-draw-container" style="' + c + b + '"></div>'), this._$drawContainer = this._$contentFrame.children(":last"), this._$contentFrame.append('<div class="geo-measure-container" style="' + c + b + '"><span class="geo-measure-label" style="' + c + '; display: none;"></span></div>'), this._$measureContainer = this._$contentFrame.children(":last"), this._$measureLabel = this._$measureContainer.children(), this._$panContainer = a([this._$shapesContainer[0], this._$drawContainer[0], this._$measureContainer[0]]), this._$resizeContainer = a([this._$contentFrame[0], this._$servicesContainer[0], this._$eventTarget[0], this._$measureContainer[0]]), this._$contentFrame.append(this._$existingChildren), a("#geo-measure-style").length || a("head").prepend('<style type="text/css" id="geo-measure-style">.geo-measure-label { margin: 4px 0 0 6px; font-family: sans-serif;' + (d ? "letter-spacing: 2px; color: #444; filter:progid:DXImageTransform.Microsoft.DropShadow(Color=white, OffX=1, OffY=2, Positive=true);" : "color: #000; text-shadow: #fff 1px 2px; font-weight: bold;") + " }</style>")
        },
        _createServices: function () {
            var b, c;
            for (c = 0; c < this._currentServices.length; c++) this._currentServices[c].serviceContainer.geomap("destroy"), a.geo._serviceTypes[this._currentServices[c].type].destroy(this, this._$servicesContainer, this._currentServices[c]);
            this._currentServices = [], this._$servicesContainer.html(""), this._$attrList.html("");
            for (c = 0; c < this._options.services.length; c++) {
                b = this._currentServices[c] = a.extend({}, this._options.services[c]), b.serviceObject = this._options.services[c], b.style = a.extend({
                    visibility: "visible",
                    opacity: 1
                }, b.style);
                var d = b.id ? ' id="' + b.id + '"' : "",
                    e = 'class="geo-service ' + (b["class"] ? b["class"] : "") + '"',
                    f = "<div " + d + e + ' style="-webkit-transform:translateZ(0);position:absolute; left:0; top:0; width:32px; height:32px; margin:0; padding:0; display:' + (b.style.visibility === "visible" ? "block" : "none") + ';"></div>',
                    g;
                this._$servicesContainer.append(f), serviceContainer = this._$servicesContainer.children(":last"), b.serviceContainer = serviceContainer, a.geo._serviceTypes[b.type].create(this, serviceContainer, b, c), serviceContainer.data("geoMap", this).geomap(), b.attr && this._$attrList.append("<li>" + b.attr + "</li>")
            }
            this._$shapesContainers = this._$shapesContainer, this._$attrList.find("a").css({
                position: "relative",
                zIndex: 100
            })
        },
        _createServiceGraphics: function () {
            var a = this._$elem.closest(".geo-content-frame");
            this._$elem.append('<div class="geo-shapes-container" style="position:absolute; left:0; top:0; width:' + a.css("width") + "; height:" + a.css("height") + '; margin:0; padding:0;"></div>'), this._$shapesContainer = this._$elem.children(":last"), this._map._$shapesContainers = this._map._$shapesContainers.add(this._$shapesContainer), this._$shapesContainer.geographics(), this._createdGraphics = !0, this._options.shapeStyle = this._$shapesContainer.geographics("option", "style")
        },
        _refreshDrawing: function () {
            this._$drawContainer.geographics("clear");
            if (this._drawPixels.length > 0) {
                var b = this._options.mode,
                    c = this._drawPixels,
                    d = this._drawCoords,
                    e, f, g, h, i;
                switch (b) {
                case "measureLength":
                    b = "drawLineString", f = {
                        type: "LineString",
                        coordinates: d
                    }, e = a.render[this._tmplLengthId]({
                        length: a.geo.length(f, !0)
                    }), g = a.merge([], c[c.length - 1]);
                    break;
                case "measureArea":
                    b = "drawPolygon", f = {
                        type: "Polygon",
                        coordinates: [a.merge([], d)]
                    }, f.coordinates[0].push(d[0]), e = a.render[this._tmplAreaId]({
                        area: a.geo.area(f, !0)
                    }), g = this._toPixel(a.geo.centroid(f).coordinates), c = [c];
                    break;
                case "drawPolygon":
                    c = [c]
                }
                this._$drawContainer.geographics(b, c), e && (this._$measureLabel.html(e), h = this._contentBounds.width - (this._$measureLabel.outerWidth(!0) + g[0]), i = this._contentBounds.height - (this._$measureLabel.outerHeight(!0) + g[1]), h < 0 && (g[0] += h), i < 0 && (g[1] += i), this._$measureLabel.css({
                    left: Math.max(g[0], 0),
                    top: Math.max(g[1], 0)
                }).show())
            }
        },
        _resetDrawing: function () {
            this._drawPixels = [], this._drawCoords = [], this._$drawContainer.geographics("clear"), this._$measureLabel.hide()
        },
        _refreshShapes: function (c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q = this._map._getBbox(g, h);
            for (i = 0; i < d.length; i++) {
                k = d[i].shape || d[i], k = k.geometry || k, l = a.data(k, "geoBbox");
                if (l && a.geo._bboxDisjoint(q, l)) continue;
                m = a.isArray(e) ? e[i].style : e, n = a.isArray(f) ? f[i].label : f, o = n !== b, p = b;
                switch (k.type) {
                case "Point":
                    p = this._map.toPixel(k.coordinates, g, h), this._$shapesContainer.geographics("drawPoint", p, m);
                    break;
                case "LineString":
                    this._$shapesContainer.geographics("drawLineString", this._map.toPixel(k.coordinates, g, h), m), o && (p = this._map.toPixel(a.geo.pointAlong(k, .5).coordinates, g, h));
                    break;
                case "Polygon":
                    this._$shapesContainer.geographics("drawPolygon", this._map.toPixel(k.coordinates, g, h), m), o && (p = this._map.toPixel(a.geo.centroid(k).coordinates, g, h));
                    break;
                case "MultiPoint":
                    for (j = 0; j < k.coordinates.length; j++) this._$shapesContainer.geographics("drawPoint", this._map.toPixel(k.coordinates[j], g, h), m);
                    o && (p = this._map.toPixel(a.geo.centroid(k).coordinates, g, h));
                    break;
                case "MultiLineString":
                    for (j = 0; j < k.coordinates.length; j++) this._$shapesContainer.geographics("drawLineString", this._map.toPixel(k.coordinates[j], g, h), m);
                    o && (p = this._map.toPixel(a.geo.centroid(k).coordinates, g, h));
                    break;
                case "MultiPolygon":
                    for (j = 0; j < k.coordinates.length; j++) this._$shapesContainer.geographics("drawPolygon", this._map.toPixel(k.coordinates[j], g, h), m);
                    o && (p = this._map.toPixel(a.geo.centroid(k).coordinates, g, h));
                    break;
                case "GeometryCollection":
                    this._refreshShapes(c, k.geometries, m, n, g, h)
                }
                o && p && this._$shapesContainer.geographics("drawLabel", p, n)
            }
        },
        _findMapSize: function () {
            var a = {
                width: 0,
                height: 0
            }, b = this._$elem;
            while (b.size() && !(a.width > 0 && a.height > 0)) {
                a = {
                    width: b.width(),
                    height: b.height()
                };
                if (a.width <= 0 || a.height <= 0) a = {
                    width: parseInt(b.css("width"), 10),
                    height: parseInt(b.css("height"), 10)
                };
                b = b.parent()
            }
            return a
        },
        _forcePosition: function (a) {
            var b = a.css("position");
            b != "relative" && b != "absolute" && b != "fixed" && a.css("position", "relative")
        },
        _getPixelSize: function (b) {
            var c = this._options.tilingScheme;
            if (c !== null) {
                if (b === 0) return c.pixelSizes ? c.pixelSizes[0] : c.basePixelSize;
                b = Math.round(b), b = Math.max(b, 0);
                var d = c.pixelSizes ? c.pixelSizes.length : c.levels;
                return b = Math.min(b, d - 1), c.pixelSizes ? c.pixelSizes[b] : c.basePixelSize / Math.pow(2, b)
            }
            var e = a.geo.scaleBy(this._getBboxMax(), 1 / Math.pow(this._zoomFactor, b), !0);
            return Math.max(a.geo.width(e, !0) / this._contentBounds.width, a.geo.height(e, !0) / this._contentBounds.height)
        },
        _getZoomCenterAndSize: function (a, b, c) {
            var d = c ? this._fullZoomFactor : this._partialZoomFactor,
                e = Math.pow(d, - b),
                f = this._pixelSizeInteractive * e,
                g = this._getZoom(this._centerInteractive, f);
            c && this._options.tilingScheme ? f = this._getPixelSize(Math.min(Math.max(g, this._options.zoomMin), this._options.zoomMax)) : b < 0 && g < this._options.zoomMin ? f = this._pixelSizeInteractive : b > 0 && g > this._options.zoomMax && (f = this._pixelSizeInteractive);
            var h = f / this._pixelSizeInteractive,
                i = this._toMap(a, this._centerInteractive, this._pixelSizeInteractive),
                j = [(this._centerInteractive[0] - i[0]) * h, (this._centerInteractive[1] - i[1]) * h],
                k = [i[0] + j[0], i[1] + j[1]];
            return {
                pixelSize: f,
                center: k
            }
        },
        _mouseWheelFinish: function (a) {
            this._wheelTimeout = null;
            if (this._wheelLevel !== 0) {
                var b = this._getZoomCenterAndSize(this._anchor, this._wheelLevel, this._options.tilingScheme !== null);
                this._wheelLevel = 0
            } else a && this._refresh()
        },
        _panFinalize: function () {
            if (this._panning) {
                this._velocity = [0, 0];
                var a = this._current[0] - this._anchor[0],
                    b = this._current[1] - this._anchor[1],
                    c = this._options.axisLayout === "image",
                    d = -a * this._pixelSize,
                    e = (c ? -1 : 1) * b * this._pixelSize;
                this._$eventTarget.css("cursor", this._options.cursors[this._options.mode]), this._inOp = !1, this._anchor = this._current, this._mouseDown = this._toolPan = this._panning = !1
            }
        },
        _panMove: function () {
            if (!this._options.pannable) return;
            var a = this._current[0] - this._lastDrag[0],
                b = this._current[1] - this._lastDrag[1],
                c = 0,
                d, e;
            if (this._toolPan || a > 3 || a < -3 || b > 3 || b < -3) {
                this._toolPan || (this._toolPan = !0, this._$eventTarget.css("cursor", this._options.cursors.pan)), this._mouseDown && (this._velocity = [a, b]);
                if (a !== 0 || b !== 0) this._panning = !0, this._lastDrag = this._current, this._centerInteractive[0] -= a * this._pixelSizeInteractive, this._centerInteractive[1] += (this._options.axisLayout === "image" ? -1 : 1) * b * this._pixelSizeInteractive, this._setInteractiveCenterAndSize(this._centerInteractive, this._pixelSizeInteractive), this._interactiveTransform()
            }
        },
        _clearInteractiveTimeout: function () {
            return this._timeoutInteractive ? (clearTimeout(this._timeoutInteractive), this._timeoutInteractive = null, !0) : (this._centerInteractive[0] = this._center[0], this._centerInteractive[1] = this._center[1], this._pixelSizeInteractive = this._pixelSize, !1)
        },
        _interactiveTransform: function () {
            this._$shapesContainers && this._$shapesContainers.geographics("clear");
            for (var b = 0; b < this._currentServices.length; b++) service = this._currentServices[b], a.geo._serviceTypes[service.type].interactiveTransform(this, service, this._centerInteractive, this._pixelSizeInteractive);
            this._drawCoords.length > 0 && (this._drawPixels = this._toPixel(this._drawCoords, this._centerInteractive, this._pixelSizeInteractive), this._refreshDrawing())
        },
        _setInteractiveTimeout: function (a) {
            function c() {
                b._isMultiTouch ? b._timeoutInteractive = setTimeout(c, 128) : b._created && b._timeoutInteractive && (b._setCenterAndSize(b._centerInteractive, b._pixelSizeInteractive, b._triggerInteractive, !0), b._timeoutInteractive = null, b._triggerInteractive = !1)
            }
            var b = this;
            this._timeoutInteractive = setTimeout(c, 128), this._triggerInteractive |= a
        },
        _refresh: function (b, c) {
            var d, e, f = 0;
            for (; f < this._currentServices.length; f++) {
                d = this._currentServices[f];
                if (!c || d.serviceContainer[0] == c[0]) a.geo._serviceTypes[d.type].refresh(this, d, b), e = d.serviceContainer.data("geoService"), e._createdGraphics && (e._$shapesContainer.geographics("clear"), e._graphicShapes.length > 0 && e._refreshShapes(e._$shapesContainer, e._graphicShapes, e._graphicShapes, e._graphicShapes))
            }
            this._createdGraphics && (this._$shapesContainer.geographics("clear"), this._graphicShapes.length > 0 && this._refreshShapes(this._$shapesContainer, this._graphicShapes, this._graphicShapes, this._graphicShapes))
        },
        _setInteractiveCenterAndSize: function (b, c) {
            this._centerInteractive[0] = b[0], this._centerInteractive[1] = b[1], this._pixelSizeInteractive = c, this._userGeodetic ? (this._options.bbox = a.geo.proj.toGeodetic(this._getBbox(b, c)), this._options.center = a.geo.proj.toGeodetic(b)) : (this._options.bbox = this._getBbox(b, c), this._options.center[0] = b[0], this._options.center[1] = b[1]), this._options.pixelSize = c, this._options.zoom = this._getZoom(b, c)
        },
        _setCenterAndSize: function (b, c, d, e) {
            if (!a.isArray(b) || b.length != 2 || typeof b[0] != "number" || typeof b[1] != "number") return;
            var f = this._getZoom(b, c);
            this._options.tilingScheme ? this._pixelSizeInteractive = c = this._getPixelSize(Math.min(Math.max(f, this._options.zoomMin), this._options.zoomMax)) : f < this._options.zoomMin ? this._pixelSizeInteractive = c = this._getPixelSize(this._options.zoomMin) : f > this._options.zoomMax && (this._pixelSizeInteractive = c = this._getPixelSize(this._options.zoomMax)), this._center[0] = b[0], this._center[1] = b[1], this._options.pixelSize = this._pixelSize = c, this._userGeodetic ? (this._options.bbox = a.geo.proj.toGeodetic(this._getBbox()), this._options.center = a.geo.proj.toGeodetic(this._center)) : (this._options.bbox = this._getBbox(), this._options.center = a.merge([], b)), this._options.zoom = f, d && this._trigger("bboxchange", window.event, {
                bbox: a.merge([], this._options.bbox)
            }), e && (this._refresh(), this._refreshDrawing())
        },
        _requestQueued: function () {
            this._loadCount === 0 && this._trigger("loadstart", window.event), this._loadCount++
        },
        _requestComplete: function () {
            this._loadCount--, this._loadCount <= 0 && (this._loadCount = 0, this._trigger("loadend", window.event))
        },
        _toMap: function (b, c, d) {
            c = c || this._center, d = d || this._pixelSize;
            var e = a.isArray(b[0]),
                f = e && a.isArray(b[0][0]),
                g = f && a.isArray(b[0][0][0]),
                h = this._contentBounds.width,
                i = this._contentBounds.height,
                j = h / 2 * d,
                k = i / 2 * d,
                l = [c[0] - j, c[1] - k, c[0] + j, c[1] + k],
                m = a.geo.width(l, !0) / h,
                n = a.geo.height(l, !0) / i,
                o, p = this._options.axisLayout === "image",
                q = [],
                r, s, t;
            g || (f || (e || (b = [b]), b = [b]), b = [b]);
            for (r = 0; r < b.length; r++) {
                q[r] = [];
                for (s = 0; s < b[r].length; s++) {
                    q[r][s] = [];
                    for (t = 0; t < b[r][s].length; t++) o = b[r][s][t][1] * n, q[r][s][t] = [l[0] + b[r][s][t][0] * m, p ? l[1] + o : l[3] - o]
                }
            }
            return g ? q : f ? q[0] : e ? q[0][0] : q[0][0][0]
        },
        _toPixel: function (b, c, d) {
            c = c || this._center, d = d || this._pixelSize;
            var e = a.isArray(b[0]),
                f = e && a.isArray(b[0][0]),
                g = f && a.isArray(b[0][0][0]),
                h = this._contentBounds.width,
                i = this._contentBounds.height,
                j = h / 2 * d,
                k = i / 2 * d,
                l = [c[0] - j, c[1] - k, c[0] + j, c[1] + k],
                m = a.geo.width(l, !0),
                n = a.geo.height(l, !0),
                o = this._options.axisLayout === "image",
                p = h / m,
                q = i / n,
                r = [],
                s, t, u;
            g || (f || (e || (b = [b]), b = [b]), b = [b]);
            for (s = 0; s < b.length; s++) {
                r[s] = [];
                for (t = 0; t < b[s].length; t++) {
                    r[s][t] = [];
                    for (u = 0; u < b[s][t].length; u++) r[s][t][u] = [Math.round((b[s][t][u][0] - l[0]) * p), Math.round((o ? b[s][t][u][1] - l[1] : l[3] - b[s][t][u][1]) * q)]
                }
            }
            return g ? r : f ? r[0] : e ? r[0][0] : r[0][0][0]
        },
        _document_keydown: function (b) {
            var c = this._drawCoords.length;
            c > 0 && b.which == 27 && (c <= 2 ? (this._resetDrawing(), this._inOp = !1) : (this._drawCoords[c - 2] = a.merge([], this._drawCoords[c - 1]), this._drawPixels[c - 2] = a.merge([], this._drawPixels[c - 1]), this._drawCoords.length--, this._drawPixels.length--, this._refreshDrawing()))
        },
        _eventTarget_dblclick_zoom: function (a) {
            var b = this._clearInteractiveTimeout();
            this._trigger("dblclick", a, {
                type: "Point",
                coordinates: this._toMap(this._current, this._centerInteractive, this._pixelSizeInteractive)
            });
            if (!a.isDefaultPrevented()) {
                var c = this._getZoomCenterAndSize(this._current, 1, !0);
                this._setInteractiveCenterAndSize(c.center, c.pixelSize), this._interactiveTransform(), b = !0
            }
            b && this._setInteractiveTimeout(!0)
        },
        _eventTarget_dblclick: function (b) {
            if (this._options.mode === "static") return;
            this._drawTimeout && (window.clearTimeout(this._drawTimeout), this._drawTimeout = null);
            var c = a(b.currentTarget).offset();
            switch (this._options.mode) {
            case "drawLineString":
            case "measureLength":
                this._drawCoords.length > 1 && (this._drawCoords[0][0] != this._drawCoords[1][0] || this._drawCoords[0][1] != this._drawCoords[1][1]) ? (this._drawCoords.length--, this._trigger("shape", b, {
                    type: "LineString",
                    coordinates: this._userGeodetic ? a.geo.proj.toGeodetic(this._drawCoords) : this._drawCoords
                })) : this._eventTarget_dblclick_zoom(b), this._resetDrawing();
                break;
            case "drawPolygon":
            case "measureArea":
                if (this._drawCoords.length > 1 && (this._drawCoords[0][0] != this._drawCoords[1][0] || this._drawCoords[0][1] != this._drawCoords[1][1])) {
                    var d = this._drawCoords.length - 1;
                    d > 2 && (this._drawCoords[d] = a.merge([], this._drawCoords[0]), this._trigger("shape", b, {
                        type: "Polygon",
                        coordinates: [this._userGeodetic ? a.geo.proj.toGeodetic(this._drawCoords) : this._drawCoords]
                    }))
                } else this._eventTarget_dblclick_zoom(b);
                this._resetDrawing();
                break;
            default:
                this._eventTarget_dblclick_zoom(b)
            }
            this._inOp = !1
        },
        _eventTarget_touchstart: function (b) {
            var c = this._options.mode,
                d = this._options.shift;
            if (c === "static") return;
            if (!this._supportTouch && b.which != 1) return;
            var e = this._clearInteractiveTimeout(),
                f = a(b.currentTarget).offset(),
                g = b.originalEvent.changedTouches;
            this._supportTouch ? (this._multiTouchAnchor = a.merge([], g), this._isMultiTouch = this._multiTouchAnchor.length > 1, this._isMultiTouch ? (this._multiTouchCurrentBbox = [g[0].pageX - f.left, g[0].pageY - f.top, g[1].pageX - f.left, g[1].pageY - f.top], this._multiTouchAnchorBbox = a.merge([], this._multiTouchCurrentBbox), this._current = a.geo.center(this._multiTouchCurrentBbox, !0)) : (this._multiTouchCurrentBbox = [g[0].pageX - f.left, g[0].pageY - f.top, NaN, NaN], this._current = [g[0].pageX - f.left, g[0].pageY - f.top])) : this._current = [b.pageX - f.left, b.pageY - f.top];
            if (this._softDblClick) {
                var h = a.now();
                if (h - this._downDate < 750) {
                    if (this._isTap) {
                        var i = this._current[0] - this._anchor[0],
                            j = this._current[1] - this._anchor[1],
                            k = Math.sqrt(i * i + j * j);
                        k > 8 ? this._isTap = !1 : this._current = a.merge([], this._anchor)
                    }
                    this._isDbltap ? this._isDbltap = !1 : this._isDbltap = this._isTap
                } else this._isDbltap = !1;
                this._isTap = !0, this._downDate = h
            }
            return this._mouseDown = !0, this._anchor = a.merge([], this._current), !this._inOp && b.shiftKey && d !== "off" ? (this._shiftDown = !0, this._$eventTarget.css("cursor", this._options.cursors[d === "default" ? "zoom" : d])) : !this._isMultiTouch && (this._options.pannable || c === "dragBox" || c === "dragCircle") && (this._inOp = !0, c !== "zoom" && c !== "dragBox" && c !== "dragCircle" && (this._lastDrag = this._current, b.currentTarget.setCapture && b.currentTarget.setCapture())), b.preventDefault(), e && this._setInteractiveTimeout(!0), !1
        },
        _dragTarget_touchmove: function (b) {
            if (this._options.mode === "static") return;
            var c = !1;
            this._mouseDown && (c = this._clearInteractiveTimeout());
            var e = this._$eventTarget.offset(),
                f = this._drawCoords.length,
                g = b.originalEvent.changedTouches,
                h, i, j = 0;
            if (this._supportTouch) {
                if (!this._isMultiTouch && this._mouseDown && this._multiTouchAnchor.length > 0 && g[0].identifier !== this._multiTouchAnchor[0].identifier) return this._mouseDown = !1, this._isMultiTouch = !0, this._wheelLevel = 0, this._multiTouchAnchor.push(g[0]), this._multiTouchCurrentBbox = [this._multiTouchCurrentBbox[0], this._multiTouchCurrentBbox[1], this._multiTouchAnchor[1].pageX - e.left, this._multiTouchAnchor[1].pageY - e.top], this._multiTouchAnchorBbox = a.merge([], this._multiTouchCurrentBbox), this._mouseDown = !0, this._anchor = this._current = a.geo.center(this._multiTouchCurrentBbox, !0), c && this._setInteractiveTimeout(!0), !1;
                if (this._isMultiTouch) {
                    for (; j < g.length; j++) g[j].identifier === this._multiTouchAnchor[0].identifier ? (this._multiTouchCurrentBbox[0] = g[j].pageX - e.left, this._multiTouchCurrentBbox[1] = g[j].pageY - e.top) : g[j].identifier === this._multiTouchAnchor[1].identifier && (this._multiTouchCurrentBbox[2] = g[j].pageX - e.left, this._multiTouchCurrentBbox[3] = g[j].pageY - e.top);
                    var k = a.geo._distancePointPoint([this._multiTouchAnchorBbox[0], this._multiTouchAnchorBbox[1]], [this._multiTouchAnchorBbox[2], this._multiTouchAnchorBbox[3]]),
                        l = a.geo._distancePointPoint([this._multiTouchCurrentBbox[0], this._multiTouchCurrentBbox[1]], [this._multiTouchCurrentBbox[2], this._multiTouchCurrentBbox[3]]);
                    h = a.geo.center(this._multiTouchCurrentBbox, !0);
                    var m = (l - k) / k;
                    m > 0 ? m *= 5 : m *= 10;
                    var n = m - this._wheelLevel;
                    this._wheelLevel = m;
                    var o = this._getZoomCenterAndSize(this._anchor, n, !1);
                    this._setInteractiveCenterAndSize(o.center, o.pixelSize), this._interactiveTransform(), c = !0, h = a.geo.center(this._multiTouchCurrentBbox, !0)
                } else h = [b.originalEvent.changedTouches[0].pageX - e.left, b.originalEvent.changedTouches[0].pageY - e.top]
            } else h = [b.pageX - e.left, b.pageY - e.top];
            if (h[0] === this._lastMove[0] && h[1] === this._lastMove[1] && this._inOp) return b.preventDefault(), c && this._setInteractiveTimeout(!0), !1;
            d == 7 && (this._isDbltap = this._isTap = !1), this._mouseDown && (this._current = h, this._moveDate = a.now());
            if (this._isMultiTouch) return b.preventDefault(), this._isDbltap = this._isTap = !1, c && this._setInteractiveTimeout(!0), !1;
            var p = this._options.shift,
                q = this._shiftDown ? p === "default" ? "zoom" : p : this._options.mode,
                r, s, t;
            switch (q) {
            case "zoom":
            case "dragBox":
                this._mouseDown ? (this._$drawContainer.geographics("clear"), this._$drawContainer.geographics("drawBbox", [this._anchor[0], this._anchor[1], h[0], h[1]])) : this._trigger("move", b, {
                    type: "Point",
                    coordinates: this.toMap(h)
                });
                break;
            case "dragCircle":
                this._mouseDown ? (r = h[0] - this._anchor[0], s = h[1] - this._anchor[1], t = Math.sqrt(r * r + s * s) * 2, this._$drawContainer.geographics("clear"), this._$drawContainer.geographics("drawArc", this._anchor, 0, 360, {
                    width: t,
                    height: t
                })) : this._trigger("move", b, {
                    type: "Point",
                    coordinates: this.toMap(h)
                });
                break;
            case "drawLineString":
            case "drawPolygon":
            case "measureLength":
            case "measureArea":
                this._mouseDown || this._toolPan ? (this._panMove(), c = !0) : (f > 0 && (this._drawCoords[f - 1] = this._toMap(h, this._centerInteractive, this._pixelSizeInteractive), this._drawPixels[f - 1] = h, this._refreshDrawing()), this._trigger("move", b, {
                    type: "Point",
                    coordinates: this.toMap(h)
                }));
                break;
            default:
                this._mouseDown || this._toolPan ? (this._panMove(), c = !0) : this._trigger("move", b, {
                    type: "Point",
                    coordinates: this.toMap(h)
                })
            }
            this._lastMove = h, c && this._setInteractiveTimeout(!0);
            if (this._inOp) return b.preventDefault(), !1
        },
        _dragTarget_touchstop: function (b) {
            if (this._options.mode === "static") return;
            if (!this._mouseDown) if (d == 7) this._eventTarget_touchstart(b);
            else return !1;
            var c = this._clearInteractiveTimeout(),
                e = this._mouseDown,
                f = this._toolPan,
                g = this._$eventTarget.offset(),
                h = this._options.shift,
                i = this._shiftDown ? h === "default" ? "zoom" : h : this._options.mode,
                j, k, l, m, n, o, p;
            this._supportTouch ? (j = [b.originalEvent.changedTouches[0].pageX - g.left, b.originalEvent.changedTouches[0].pageY - g.top], this._multiTouchAnchor = [], this._inOp = !1) : j = [b.pageX - g.left, b.pageY - g.top], this._softDblClick && this._isTap && (m = j[0] - this._anchor[0], n = j[1] - this._anchor[1], Math.sqrt(m * m + n * n) <= 8 && (j = a.merge([], this._anchor))), m = j[0] - this._anchor[0], n = j[1] - this._anchor[1], this._$eventTarget.css("cursor", this._options.cursors[this._options.mode]), this._shiftDown = this._mouseDown = this._toolPan = !1;
            if (this._isMultiTouch) {
                b.preventDefault(), this._isMultiTouch = !1, this._wheelLevel = 0, c && this._setInteractiveTimeout(!0);
                return
            }
            document.releaseCapture && document.releaseCapture();
            if (e) {
                l = a.now(), this._current = j;
                switch (i) {
                case "zoom":
                case "dragBox":
                    if (m !== 0 || n !== 0) {
                        var q = this._pixelSize * 6,
                            r = this._toMap([
                                [Math.min(this._anchor[0], j[0]), Math.max(this._anchor[1], j[1])],
                                [Math.max(this._anchor[0], j[0]), Math.min(this._anchor[1], j[1])]
                            ]),
                            s = [r[0][0], r[0][1], r[1][0], r[1][1]];
                        i === "zoom" ? (s[2] - s[0] < q && s[3] - s[1] < q && (s = a.geo.scaleBy(this._getBbox(a.geo.center(s, !0)), .5, !0)), this._setBbox(s, !0, !0), c = !0) : (p = a.geo.polygonize(s, !0), p.bbox = s, this._userGeodetic && (p.coordinates = a.geo.proj.toGeodetic(p.coordinates), p.bbox = a.geo.proj.toGeodetic(p.bbox)), this._trigger("shape", b, p))
                    } else i === "dragBox" && (o = this._toMap(j), p = {
                        type: "Point",
                        coordinates: [o[0], o[1]],
                        bbox: [o[0], o[1], o[0], o[1]]
                    }, this._userGeodetic && (p.coordinates = a.geo.proj.toGeodetic(p.coordinates), p.bbox = a.geo.proj.toGeodetic(p.bbox)), this._trigger("shape", b, p));
                    this._resetDrawing();
                    break;
                case "dragCircle":
                    if (m !== 0 || n !== 0) {
                        var t = this._options.axisLayout === "image",
                            u = Math.sqrt(m * m + n * n),
                            v = 180,
                            w;
                        this._drawPixels.length = v + 1;
                        for (k = 0; k < v; k++) w = k * 360 / v * (Math.PI / 180), this._drawPixels[k] = [this._anchor[0] + Math.cos(w) * u, this._anchor[1] + Math.sin(w) * u];
                        this._drawPixels[v] = [this._drawPixels[0][0], this._drawPixels[0][1]], o = this._toMap([
                            [this._anchor[0] - u, this._anchor[1] + (t ? -u : u)],
                            [this._anchor[0] + u, this._anchor[1] + (t ? u : -u)]
                        ]), p = {
                            type: "Polygon",
                            coordinates: [this._toMap(this._drawPixels)],
                            bbox: [o[0][0], o[0][1], o[1][0], o[1][1]]
                        }, this._userGeodetic && (p.coordinates = a.geo.proj.toGeodetic(p.coordinates), p.bbox = a.geo.proj.toGeodetic(p.bbox)), this._trigger("shape", b, p), this._resetDrawing()
                    } else o = this._toMap(j), p = {
                        type: "Point",
                        coordinates: [o[0], o[1]],
                        bbox: [o[0], o[1], o[0], o[1]]
                    }, this._userGeodetic && (p.coordinates = a.geo.proj.toGeodetic(p.coordinates), p.bbox = a.geo.proj.toGeodetic(p.bbox)), this._trigger("shape", b, p);
                    break;
                case "drawPoint":
                    this._drawTimeout && (window.clearTimeout(this._drawTimeout), this._drawTimeout = null);
                    if (f) this._panFinalize();
                    else if (l - this._clickDate > 100) {
                        var x = this;
                        this._drawTimeout = setTimeout(function () {
                            x._drawTimeout && (x._trigger("shape", b, {
                                type: "Point",
                                coordinates: x.toMap(j)
                            }), x._inOp = !1, x._drawTimeout = null)
                        }, 250)
                    }
                    break;
                case "drawLineString":
                case "drawPolygon":
                case "measureLength":
                case "measureArea":
                    if (f) this._panFinalize();
                    else {
                        k = this._drawCoords.length === 0 ? 0 : this._drawCoords.length - 1, this._drawCoords[k] = this._toMap(j), this._drawPixels[k] = j;
                        if (k < 2 || this._drawCoords[k][0] != this._drawCoords[k - 1][0] || this._drawCoords[k][1] != this._drawCoords[k - 1][1]) this._drawCoords[k + 1] = this._toMap(j, this._centerInteractive, this._pixelSizeInteractive), this._drawPixels[k + 1] = j;
                        this._refreshDrawing()
                    }
                    break;
                default:
                    f ? this._panFinalize() : l - this._clickDate > 100 && (this._trigger("click", b, {
                        type: "Point",
                        coordinates: this.toMap(j)
                    }), this._inOp = !1)
                }
                this._clickDate = l;
                if (this._softDblClick && this._isDbltap) return this._isDbltap = this._isTap = !1, c && this._setInteractiveTimeout(!0), this._$eventTarget.trigger("dblclick", b), !1
            }
            c && this._setInteractiveTimeout(!0);
            if (this._inOp) return b.preventDefault(), !1
        },
        _eventTarget_mousewheel: function (b, c) {
            if (this._options.mode === "static" || this._options.scroll === "off") return;
            b.preventDefault();
            if (this._mouseDown) return !1;
            if (c !== 0) {
                this._clearInteractiveTimeout(), c > 0 ? c = Math.ceil(c) : c = Math.floor(c);
                var d = a(b.currentTarget).offset();
                this._anchor = [b.pageX - d.left, b.pageY - d.top];
                var e = this._getZoomCenterAndSize(this._anchor, c, this._options.tilingScheme !== null),
                    f, g = 0;
                this._setInteractiveCenterAndSize(e.center, e.pixelSize), this._interactiveTransform(), this._setInteractiveTimeout(!0)
            }
            return !1
        }
    })
}(jQuery),
function (a, b) {
    a.geo._serviceTypes.tiled = function () {
        return {
            create: function (b, c, d, e) {
                var f = a.data(d, "geoServiceState");
                if (!f) {
                    f = {
                        loadCount: 0,
                        reloadTiles: !1
                    };
                    var g = '<div data-geo-service="tiled" style="-webkit-transform:translateZ(0); position:absolute; left:0; top:0; width:8px; height:8px; margin:0; padding:0;"></div>';
                    c.append(g), f.serviceContainer = c.children(":last"), a.data(d, "geoServiceState", f)
                }
                return f.serviceContainer
            },
            destroy: function (b, c, d) {
                var e = a.data(d, "geoServiceState");
                e.serviceContainer.remove(), a.removeData(d, "geoServiceState")
            },
            interactiveTransform: function (b, c, d, e) {
                var f = a.data(c, "geoServiceState"),
                    g = b.options.tilingScheme;
                f && (this._cancelUnloaded(b, c), f.serviceContainer.children().each(function (c) {
                    var f = a(this),
                        h = f.data("pixelSize"),
                        i = h / e;
                    if (h > 0) {
                        i = Math.round(i * 1e3) / 1e3;
                        var j = f.data("scaleOrigin"),
                            k = b._toPixel(j, d, e);
                        f.css({
                            left: Math.round(k[0]) + "px",
                            top: Math.round(k[1]) + "px",
                            width: g.tileWidth * i,
                            height: g.tileHeight * i
                        })
                    }
                }))
            },
            refresh: function (b, c, d) {
                var e = a.data(c, "geoServiceState");
                this._cancelUnloaded(b, c), e && d && (e.reloadTiles = !0);
                if (e && c && c.style.visibility === "visible" && !e.serviceContainer.is(":hidden")) {
                    var f = b._getBbox(),
                        g = b._pixelSize,
                        h = this,
                        i = e.serviceContainer,
                        j = b._getContentBounds(),
                        k = j.width,
                        l = j.height,
                        m = b.options.axisLayout === "image",
                        n = m ? 1 : -1,
                        o = b.options.tilingScheme,
                        p = o.tileWidth,
                        q = o.tileHeight,
                        r = Math.floor((f[0] - o.origin[0]) / (g * p)),
                        s = Math.max(Math.floor((m ? f[1] - o.origin[1] : o.origin[1] - f[3]) / (g * q)), 0),
                        t = Math.ceil((f[2] - o.origin[0]) / (g * p)),
                        u = Math.ceil((m ? f[3] - o.origin[1] : o.origin[1] - f[1]) / (g * q)),
                        v = b._getBboxMax(),
                        w = b._getPixelSize(0),
                        x = w / g,
                        y = Math.floor((v[0] - o.origin[0]) / (w * p)) * x,
                        z = Math.floor((o.origin[1] + n * v[3]) / (w * q)) * x,
                        A = o.origin[0] + y * p * g,
                        B = o.origin[1] + n * z * q * g,
                        C = Math.round((A - f[0]) / g),
                        D = Math.round((m ? B - f[1] : f[3] - B) / g),
                        E = i.children().show(),
                        F = E.filter("[data-pixel-size='" + g + "']").appendTo(i),
                        G = c.style.opacity,
                        H, I, J = function (c) {
                            h._loadImage(a.data(this, "img"), c, g, b, e, G)
                        }, K = function () {
                            a.data(this, "img").remove(), e.loadCount--, b._requestComplete()
                        };
                    e.reloadTiles && E.find("img").attr("data-dirty", "true"), F.size() ? (F.css({
                        left: C % p + "px",
                        top: D % q + "px"
                    }).data("scaleOrigin", b._toMap([C % p, D % q])), F.children().each(function (b) {
                        var c = a(this),
                            d = c.attr("data-tile").split(",");
                        c.css({
                            left: Math.round((parseInt(d[0], 10) - y) * 100 + (C - C % p) / p * 100) + "%",
                            top: Math.round((parseInt(d[1], 10) - z) * 100 + (D - D % q) / q * 100) + "%"
                        }), G < 1 && c.fadeTo(0, G)
                    })) : (i.append("<div style='-webkit-transform:translateZ(0);position:absolute; left:" + C % p + "px; top:" + D % q + "px; width:" + p + "px; height:" + q + "px; margin:0; padding:0;' data-pixel-size='" + g + "'></div>"), F = i.children(":last").data("scaleOrigin", b._toMap([C % p, D % q])));
                    for (H = r; H < t; H++) for (I = s; I < u; I++) {
                        var L = "" + H + "," + I,
                            M = F.children("[data-tile='" + L + "']").removeAttr("data-dirty");
                        if (M.size() === 0 || e.reloadTiles) {
                            var N = [o.origin[0] + H * p * g, o.origin[1] + n * I * q * g],
                                O = [o.origin[0] + ((H + 1) * p - 1) * g, o.origin[1] + n * ((I + 1) * q - 1) * g],
                                P = [N[0], N[1], O[0], O[1]],
                                Q = c.hasOwnProperty("src") ? "src" : "getUrl",
                                R = {
                                    bbox: P,
                                    width: p,
                                    height: q,
                                    zoom: b._getZoom(),
                                    tile: {
                                        row: I,
                                        column: H
                                    },
                                    index: Math.abs(I + H)
                                }, S = a.isFunction(c[Q]),
                                T;
                            S ? T = c[Q](R) : (a.templates("geoSrc", c[Q]), T = a.render.geoSrc(R)), e.loadCount++, b._requestQueued();
                            if (e.reloadTiles && M.size() > 0) M.attr("src", T);
                            else {
                                var U = "<img style='-webkit-transform:translateZ(0);position:absolute; left:" + ((H - y) * 100 + (C - C % p) / p * 100) + "%; " + "top:" + ((I - z) * 100 + (D - D % q) / q * 100) + "%; ";
                                U += "width: 100%; height: 100%;", U += "margin:0; padding:0; -khtml-user-select:none; -moz-user-select:none; -webkit-user-select:none; user-select:none; display:none;' unselectable='on' data-tile='" + L + "' />", F.append(U), M = F.children(":last")
                            }
                            typeof T == "string" ? h._loadImage(M, T, g, b, e, G) : T ? (a.data(T, "img", M), T.done(J).fail(K)) : M.remove()
                        }
                    }
                    E.find("[data-dirty]").remove(), e.reloadTiles = !1
                }
            },
            resize: function (a, b) {},
            opacity: function (b, c) {
                var d = a.data(c, "geoServiceState");
                d.serviceContainer.find("img").stop(!0).fadeTo("fast", c.style.opacity)
            },
            toggle: function (b, c) {
                var d = a.data(c, "geoServiceState");
                d.serviceContainer.css("display", c.style.visibility === "visible" ? "block" : "none")
            },
            _cancelUnloaded: function (b, c) {
                var d = a.data(c, "geoServiceState");
                if (d && d.loadCount > 0) {
                    d.serviceContainer.find("img:hidden").remove();
                    while (d.loadCount > 0) d.loadCount--, b._requestComplete()
                }
            },
            _loadImage: function (b, c, d, e, f, g) {
                var h = f.serviceContainer;
                b.load(function (b) {
                    g < 1 ? a(b.target).fadeTo(0, g) : a(b.target).show(), f.loadCount--, e._requestComplete(), f.loadCount <= 0 && (h.children(":not([data-pixel-size='" + d + "'])").remove(), f.loadCount = 0)
                }).error(function (b) {
                    a(b.target).remove(), f.loadCount--, e._requestComplete(), f.loadCount <= 0 && (h.children(":not([data-pixel-size='" + d + "'])").remove(), f.loadCount = 0)
                }).attr("src", c)
            }
        }
    }()
}(jQuery),
function (a, b) {
    a.geo._serviceTypes.shingled = function () {
        return {
            create: function (b, c, d, e) {
                var f = a.data(d, "geoServiceState");
                if (!f) {
                    f = {
                        loadCount: 0
                    };
                    var g = '<div data-geo-service="shingled" style="-webkit-transform:translateZ(0);position:absolute; left:0; top:0; width:16px; height:16px; margin:0; padding:0;"></div>';
                    c.append(g), f.serviceContainer = c.children(":last"), a.data(d, "geoServiceState", f)
                }
                return f.serviceContainer
            },
            destroy: function (b, c, d) {
                var e = a.data(d, "geoServiceState");
                e.serviceContainer.remove(), a.removeData(d, "geoServiceState")
            },
            interactiveTransform: function (b, c, d, e) {
                var f = a.data(c, "geoServiceState"),
                    g = b._getContentBounds(),
                    h = g.width,
                    i = g.height,
                    j = h / 2,
                    k = i / 2,
                    l = [d[0] - j, d[1] - k, d[0] + j, d[1] + k];
                f && (this._cancelUnloaded(b, c), f.serviceContainer.children().each(function (c) {
                    var f = a(this),
                        g = f.data("pixelSize"),
                        j = g / e;
                    if (g > 0) {
                        j = Math.round(j * 1e3) / 1e3;
                        var k = f.data("origin"),
                            l = b._toPixel(k, d, e);
                        f.css({
                            left: Math.round(l[0]),
                            top: Math.round(l[1]),
                            width: h * j,
                            height: i * j
                        })
                    }
                }))
            },
            refresh: function (b, c) {
                var d = a.data(c, "geoServiceState");
                this._cancelUnloaded(b, c);
                if (d && c && c.style.visibility === "visible" && !d.serviceContainer.is(":hidden")) {
                    var e = b._getBbox(),
                        f = b._pixelSize,
                        g = this,
                        h = d.serviceContainer,
                        i = b._getContentBounds(),
                        j = i.width,
                        k = i.height,
                        l = h.children('[data-pixel-size="' + f + '"]'),
                        m = c.style.opacity,
                        n;
                    m < 1 && h.find("img").attr("data-keep-alive", "0"), l.size() || (h.append('<div style="-webkit-transform:translateZ(0);position:absolute; left:0px; top: 0px; width:' + j + "px; height:" + k + 'px; margin:0; padding:0;" data-pixel-size="' + f + '" data-origin="[' + b._toMap([0, 0]) + ']"></div>'), l = h.children(":last"));
                    var o = c.hasOwnProperty("src") ? "src" : "getUrl",
                        p = {
                            bbox: e,
                            width: j,
                            height: k,
                            zoom: b._getZoom(),
                            tile: null,
                            index: 0
                        }, q = a.isFunction(c[o]),
                        r, s = l.position();
                    s.left = -s.left, s.top = -s.top, q ? r = c[o](p) : (a.templates("geoSrc", c[o]), r = a.render.geoSrc(p)), d.loadCount++, b._requestQueued(), l.append('<img style="-webkit-transform:translateZ(0);position:absolute; left:' + s.left / l.width() * 100 + "%; top:" + s.top / l.height() * 100 + '%; width:100%; height:100%; margin:0; padding:0; -khtml-user-select:none; -moz-user-select:none; -webkit-user-select:none; user-select:none; display:none;" unselectable="on" />'), n = l.children(":last").data("center", b._center), typeof r == "string" ? g._loadImage(n, r, f, b, d, m) : r.done(function (a) {
                        g._loadImage(n, a, f, b, d, m)
                    }).fail(function () {
                        n.remove(), d.loadCount--, b._requestComplete()
                    })
                }
            },
            resize: function (b, c) {
                var d = a.data(c, "geoServiceState");
                if (d && c && c.style.visibility === "visible") {
                    this._cancelUnloaded(b, c);
                    var e = d.serviceContainer,
                        f = b._getContentBounds(),
                        g = f.width,
                        h = f.height,
                        i = e.children();
                    i.attr("data-pixel-size", "0"), i.each(function (c) {
                        var d = a(this),
                            e = d.position(),
                            f = d.data("origin"),
                            i = b._toPixel(f);
                        d.css({
                            left: e.left + (g - d.width()) / 2,
                            top: e.top + (h - d.height()) / 2
                        })
                    })
                }
            },
            opacity: function (b, c) {
                var d = a.data(c, "geoServiceState");
                d.serviceContainer.find("img").stop(!0).fadeTo("fast", c.style.opacity)
            },
            toggle: function (b, c) {
                var d = a.data(c, "geoServiceState");
                d.serviceContainer.css("display", c.style.visibility === "visible" ? "block" : "none")
            },
            _cancelUnloaded: function (b, c) {
                var d = a.data(c, "geoServiceState");
                if (d && d.loadCount > 0) {
                    d.serviceContainer.find("img:hidden").remove();
                    while (d.loadCount > 0) d.loadCount--, b._requestComplete()
                }
            },
            _loadImage: function (b, c, d, e, f, g) {
                var h = f.serviceContainer;
                b.load(function (b) {
                    if (!a.contains(document.body, b.target.jquery ? b.target[0] : b.target)) return;
                    g < 1 ? a(b.target).fadeTo(0, g) : a(b.target).show(), f.loadCount--, e._requestComplete(), f.loadCount <= 0 && (h.children(':not([data-pixel-size="' + d + '"])').remove(), h.find("img[data-keep-alive]").remove(), f.loadCount = 0)
                }).error(function (b) {
                    if (!a.contains(document.body, b.target.jquery ? b.target[0] : b.target)) return;
                    a(b.target).remove(), f.loadCount--, e._requestComplete(), f.loadCount <= 0 && (h.children(":not([data-pixel-size='" + d + "'])").remove(), f.loadCount = 0)
                }).attr("src", c)
            }
        }
    }()
}(jQuery);