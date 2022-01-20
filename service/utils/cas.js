const {
    e_factory,
    d_factory,
    m_factory,
    modulus_factory,
    mu_factory,
    bkplus1_factory
} = require("./casFactory.js");


function cas(pwd) {
    const R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const J = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    const V = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
    const X = 65535;
    const K = 16;
    const B = 16;
    const j = 65536;

    function vpn_get_obj(ary, index) {
        return ary[index]
    }

    function vpn_set_obj(ary, index, value) {
        ary[index] = value
    }

    function i(e) {
        this.digits = "boolean" == typeof e && 1 == e ? null : R.slice(0), this.isNeg = !1
    }

    function s(e) {
        for (var t = "", n = e.length - 1; n > -1; --n) t += e.charAt(n);
        return t
    }

    function l(e) {
        for (var t = "", n = 0; n < 4; ++n) t += vpn_get_obj(J, 15 & e), e >>>= 4;
        return s(t)
    }

    function u(e) {
        for (var t = "", n = (h(e), h(e)); n > -1; --n) t += l(vpn_get_obj(e.digits, n));
        return t
    }

    function E(e, t) {
        for (var n, a, r, o = new i, s = h(e), c = h(t), l = 0; l <= c; ++l) {
            n = 0, r = l;
            for (var u = 0; u <= s; ++u, ++r) a = vpn_get_obj(o.digits, r) + vpn_get_obj(e.digits, u) * vpn_get_obj(t.digits, l) + n, vpn_set_obj(o.digits, r, a & X), n = a >>> K;
            vpn_set_obj(o.digits, (l + s + 1), n)
        }
        return o.isNeg = e.isNeg != t.isNeg, o
    }

    function k(e, t) {
        if (e.isNeg != t.isNeg) return 1 - 2 * Number(e.isNeg);
        for (var n = e.digits.length - 1; n >= 0; --n)
            if (vpn_get_obj(e.digits, n) != vpn_get_obj(t.digits, n)) return e.isNeg ? 1 - 2 * Number(vpn_get_obj(e.digits, n) > vpn_get_obj(t.digits, n)) : 1 - 2 * Number(vpn_get_obj(e.digits, n) < vpn_get_obj(t.digits, n));
        return 0
    }

    function O(e, t) {
        var n = new i;
        return b(e.digits, 0, n.digits, 0, t), n
    }

    function x(e, t) {
        var n = new i;
        return b(e.digits, t, n.digits, 0, n.digits.length - t), n
    }

    function g(e, t) {
        var n;
        if (e.isNeg != t.isNeg) t.isNeg = !t.isNeg, n = f(e, t), t.isNeg = !t.isNeg;
        else {
            n = new i;
            var a, r;
            r = 0;
            for (var o = 0; o < e.digits.length; ++o) a = vpn_get_obj(e.digits, o) - vpn_get_obj(t.digits, o) + r, vpn_set_obj(n.digits, o, a % j), vpn_get_obj(n.digits, o) < 0 && (n.digits[o] += j), r = 0 - Number(a < 0);
            if (-1 == r) {
                r = 0;
                for (var o = 0; o < e.digits.length; ++o) a = 0 - vpn_get_obj(n.digits, o) + r, vpn_set_obj(n.digits, o, a % j), vpn_get_obj(n.digits, o) < 0 && (n.digits[o] += j), r = 0 - Number(a < 0);
                n.isNeg = !e.isNeg
            } else n.isNeg = e.isNeg
        }
        return n
    }

    function f(e, t) {
        var n;
        if (e.isNeg !== t.isNeg) {
            t.isNeg = !t.isNeg;
            n = g(e, t);
            t.isNeg = !t.isNeg;
        } else {
            n = new i;
            for (var a, r = 0, o = 0; o < e.digits.length; ++o) {
                a = vpn_get_obj(e.digits, o) + vpn_get_obj(t.digits, o) + r;
                vpn_set_obj(n.digits, o, a % j);
                r = Number(a >= j);
            }
            n.isNeg = e.isNeg
        }
        return n
    }



    function T(e, t) {
        var n = Math.floor(t / B),
            a = new i;
        b(e.digits, n, a.digits, 0, e.digits.length - n);
        for (var r = t % B, o = B - r, s = 0, c = s + 1; s < a.digits.length - 1; ++s, ++c)
            vpn_set_obj(a.digits, s, vpn_get_obj(a.digits, s) >>> r | (vpn_get_obj(a.digits, c) & vpn_get_obj(V, r)) << o);
        return a.digits[a.digits.length - 1] >>>= r, a.isNeg = e.isNeg, a
    }

    function h(e) {
        for (var t = e.digits.length - 1; t > 0 && 0 == vpn_get_obj(e.digits, t);)
            --t;
        return t
    }

    function b(e, t, n, a, i) {
        for (var r = Math.min(t + i, e.length), o = t, s = a; o < r; ++o, ++s)
            vpn_set_obj(n, s, vpn_get_obj(e, o))
    }

    function L(e, t) {
        for (var n = new Array, a = t.length, r = 0; r < a;) {
            vpn_set_obj(n, r, t.charCodeAt(r));
            r++;
        }
        for (; n.length % e.chunkSize !== 0;) {
            vpn_set_obj(n, (r++), 0);
        };
        let o, s, l, p = n.length,
            m = "";
        for (r = 0; r < p; r += e.chunkSize) {
            for (l = new i, o = 0, s = r; s < r + e.chunkSize; ++o) {
                vpn_set_obj(l.digits, o, vpn_get_obj(n, s++));
                l.digits[o] += vpn_get_obj(n, s++) << 8;
            }
            let d = e.barrett.powMod(l, e.e);
            m += u(d) + " "
        }
        return m.substring(0, m.length - 1)
    }

    /*编码*/
    return L({
        e: e_factory(),
        d: d_factory(),
        m: m_factory(),
        chunkSize: 126,
        radix: 16,
        barrett: {
            modulo(e) {
                var t = x(e, this.k - 1),
                    n = E(t, this.mu),
                    a = x(n, this.k + 1),
                    i = O(e, this.k + 1),
                    r = E(a, this.modulus),
                    o = O(r, this.k + 1),
                    s = g(i, o);
                s.isNeg && (s = f(s, this.bkplus1));
                for (var c = k(s, this.modulus) >= 0; c;) {
                    s = g(s, this.modulus);
                    c = k(s, this.modulus) >= 0;
                }
                return s;
            },
            multiplyMod(e, t) {
                var n = E(e, t);
                return this.modulo(n)
            },
            powMod(e, t) {
                var n = new i;
                n.digits[0] = 1;
                for (var a = e, r = t;;) {
                    if (0 !== (1 & r.digits[0]) && (n = this.multiplyMod(n, a)), r = T(r, 1), 0 === r.digits[0] && 0 === h(r)) {
                        break
                    };
                    a = this.multiplyMod(a, a)
                }
                return n
            },
            modulus: modulus_factory(),
            k: 64,
            mu: mu_factory(),
            bkplus1: bkplus1_factory()
        }
    }, pwd);
}
//console.log(cas("Gao13346637702."));
module.exports = cas;