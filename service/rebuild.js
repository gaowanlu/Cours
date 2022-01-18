class Cas {
    constructor() {
        this.R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.J = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    }
    vpn_get_obj(ary, index) {
        return ary[index];
    }
    vpn_set_obj(ary, index, value) {
        ary[index] = value;
    }
    i(e) {
        if (typeof (e) === "boolean" && e === 1) {
            this.digits = null;
        } else {
            this.digits = this.R.slice(0);
            this.isNeg = false;
        }
    }
    s(e) {
        let result = "";
        let n = e.length - 1;
        for (; n > -1; --n) {
            result += e.charAt(n);
        }
        return result;
    }
    l(e) {
        for (var t = "", n = 0; n < 4; ++n) t += vpn_get_obj(J, 15 & e), e >>>= 4;
        return s(t);
    }
    u(e) {
        for (var t = "", n = (h(e), h(e)); n > -1; --n) t += l(vpn_get_obj(e.digits, n));
        return t;
    }
    L(e, t) {
        for (var n = new Array, a = t.length, r = 0; r < a;) vpn_set_obj(n, r, t.charCodeAt(r)), r++;
        for (; n.length % e.chunkSize != 0;) vpn_set_obj(n, (r++), 0);
        var o, s, l, p = n.length,
            m = "";
        for (r = 0; r < p; r += e.chunkSize) {
            for (l = new i, o = 0, s = r; s < r + e.chunkSize; ++o) vpn_set_obj(l.digits, o, vpn_get_obj(n, s++)), l.digits[o] += vpn_get_obj(n, s++) << 8;
            var d = e.barrett.powMod(l, e.e);
            m += u(d) + " "
        }
        return m.substring(0, m.length - 1)
    }
    W(e, t) {
        var n = new i;
        n.digits[0] = 1;
        for (var a = e, r = t;;) {
            if (0 != (1 & r.digits[0]) && (n = this.multiplyMod(n, a)), r = T(r, 1), 0 == r.digits[0] && 0 == h(r)) break;
            a = this.multiplyMod(a, a)
        }
        return n
    }
    P(e, t) {
        var n = E(e, t);
        return this.modulo(n)
    }

}

var X = 65535

var K = 16

var B = 16

var j = 65536

function E(e, t) {
    for (var n, a, r, o = new i, s = h(e), c = h(t), l = 0; l <= c; ++l) {
        n = 0, r = l;
        for (var u = 0; u <= s; ++u, ++r) a = vpn_get_obj(o.digits, r) + vpn_get_obj(e.digits, u) * vpn_get_obj(t.digits, l) + n, vpn_set_obj(o.digits, r, a & X), n = a >>> K;
        vpn_set_obj(o.digits, (l + s + 1), n)
    }
    return o.isNeg = e.isNeg != t.isNeg, o
}

function A(e) {
    var t = x(e, this.k - 1),
        n = E(t, this.mu),
        a = x(n, this.k + 1),
        i = O(e, this.k + 1),
        r = E(a, this.modulus),
        o = O(r, this.k + 1),
        s = g(i, o);
    s.isNeg && (s = f(s, this.bkplus1));
    for (var c = k(s, this.modulus) >= 0; c;) s = g(s, this.modulus), c = k(s, this.modulus) >= 0;
    return s
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
    if (e.isNeg != t.isNeg) t.isNeg = !t.isNeg, n = g(e, t), t.isNeg = !t.isNeg;
    else {
        n = new i;
        for (var a, r = 0, o = 0; o < e.digits.length; ++o) a = vpn_get_obj(e.digits, o) + vpn_get_obj(t.digits, o) + r, vpn_set_obj(n.digits, o, a % j), r = Number(a >= j);
        n.isNeg = e.isNeg
    }
    return n
}

var V = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535]

function T(e, t) {
    var n = Math.floor(t / B),
        a = new i;
    b(e.digits, n, a.digits, 0, e.digits.length - n);
    for (var r = t % B, o = B - r, s = 0, c = s + 1; s < a.digits.length - 1; ++s, ++c) vpn_set_obj(a.digits, s, vpn_get_obj(a.digits, s) >>> r | (vpn_get_obj(a.digits, c) & vpn_get_obj(V, r)) << o);
    return a.digits[a.digits.length - 1] >>>= r, a.isNeg = e.isNeg, a
}

function h(e) {
    for (var t = e.digits.length - 1; t > 0 && 0 == vpn_get_obj(e.digits, t);) --t;
    return t
}

function b(e, t, n, a, i) {
    for (var r = Math.min(t + i, e.length), o = t, s = a; o < r; ++o, ++s) vpn_set_obj(n, s, vpn_get_obj(e, o))
}

function cas(t) {
    return L({
        e: {
            digits: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            isNeg: false
        },
        d: {
            digits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            isNeg: false
        },
        m: {
            digits: [59313, 4375, 54507, 5267, 8345, 43610, 49971, 28563, 34983, 36521, 17297, 62027, 42744, 32131, 40043, 48417, 5636, 46659, 52373, 20768, 28635, 46498, 55076, 13948, 44453, 44804, 40613, 1466, 26896, 54350, 28506, 28712, 44726, 4974, 46852, 32655, 60720, 2973, 7722, 43040, 10398, 28111, 52739, 6542, 43865, 20892, 59308, 8898, 58877, 36302, 41921, 27719, 59291, 10923, 8559, 53747, 10707, 59976, 48415, 32958, 37390, 57449, 45414, 46574, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            isNeg: false
        },
        chunkSize: 126,
        radix: 16,
        barrett: {
            modulo: A,
            multiplyMod: P,
            powMod: W,
            modulus: {
                digits: [59313, 4375, 54507, 5267, 8345, 43610, 49971, 28563, 34983, 36521, 17297, 62027, 42744, 32131, 40043, 48417, 5636, 46659, 52373, 20768, 28635, 46498, 55076, 13948, 44453, 44804, 40613, 1466, 26896, 54350, 28506, 28712, 44726, 4974, 46852, 32655, 60720, 2973, 7722, 43040, 10398, 28111, 52739, 6542, 43865, 20892, 59308, 8898, 58877, 36302, 41921, 27719, 59291, 10923, 8559, 53747, 10707, 59976, 48415, 32958, 37390, 57449, 45414, 46574, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                isNeg: false
            },
            k: 64,
            mu: {
                digits: [7469, 13822, 15506, 32982, 50429, 62979, 64339, 60597, 40979, 61913, 20952, 38396, 43669, 60926, 10345, 21166, 11931, 31731, 17652, 54018, 14346, 5098, 29577, 27601, 14064, 33529, 25220, 39088, 8044, 19738, 21550, 5198, 30005, 21337, 934, 14453, 28049, 17274, 16321, 32160, 3193, 55263, 27029, 41238, 14094, 25353, 47316, 6175, 31709, 27325, 36707, 32884, 7478, 49873, 62514, 44522, 9303, 45997, 33566, 1250, 26644, 59158, 49823, 26680, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                isNeg: false
            },
            bkplus1: {
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                isNeg: false
            }
        }
    }, t);
}

module.exports = cas;