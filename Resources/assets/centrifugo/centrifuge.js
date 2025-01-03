/*
 *  Copyright 2025.  Baks.dev <admin@baks.dev>
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is furnished
 *  to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";
(() =>
{
    var re = Object.create;
    var B = Object.defineProperty;
    var oe = Object.getOwnPropertyDescriptor;
    var ae = Object.getOwnPropertyNames;
    var ce = Object.getPrototypeOf, ue = Object.prototype.hasOwnProperty;
    var he = (o, s) => () => (s || o((s = {exports: {}}).exports, s), s.exports);
    var le = (o, s, e, t) =>
    {
        if(s && typeof s == "object" || typeof s == "function")
        {
            for(let n of ae(s)) !ue.call(o, n) && n !== e && B(o, n, {
                get: () => s[n],
                enumerable: !(t = oe(s, n)) || t.enumerable
            });
        }
        return o
    };
    var J = (o, s, e) => (e = o != null ? re(ce(o)) : {}, le(s || !o || !o.__esModule ? B(e, "default", {
        value: o,
        enumerable: !0
    }) : e, o));
    var z = he((Pe, U) =>
    {
        "use strict";
        var y = typeof Reflect == "object" ? Reflect : null,
            q = y && typeof y.apply == "function" ? y.apply : function(s, e, t)
            {return Function.prototype.apply.call(s, e, t)}, P;
        y && typeof y.ownKeys == "function" ? P = y.ownKeys : Object.getOwnPropertySymbols ? P = function(s){return Object.getOwnPropertyNames(s).concat(Object.getOwnPropertySymbols(s))} : P = function(s){return Object.getOwnPropertyNames(s)};

        function fe(o){console && console.warn && console.warn(o)}

        var F = Number.isNaN || function(s){return s !== s};

        function h(){h.init.call(this)}

        U.exports = h;
        U.exports.once = be;
        h.EventEmitter = h;
        h.prototype._events = void 0;
        h.prototype._eventsCount = 0;
        h.prototype._maxListeners = void 0;
        var H = 10;

        function C(o)
        {
            if(typeof o != "function")
            {
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof o)
            }
        }

        Object.defineProperty(h, "defaultMaxListeners", {
            enumerable: !0,
            get: function(){return H},
            set: function(o)
            {
                if(typeof o != "number" || o < 0 || F(o))
                {
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + o + ".");
                }
                H = o
            }
        });
        h.init = function(){(this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0};
        h.prototype.setMaxListeners = function(s)
        {
            if(typeof s != "number" || s < 0 || F(s))
            {
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + s + ".");
            }
            return this._maxListeners = s, this
        };

        function V(o){return o._maxListeners === void 0 ? h.defaultMaxListeners : o._maxListeners}

        h.prototype.getMaxListeners = function(){return V(this)};
        h.prototype.emit = function(s)
        {
            for(var e = [], t = 1; t < arguments.length; t++) e.push(arguments[t]);
            var n = s === "error", i = this._events;
            if(i !== void 0)
            {
                n = n && i.error === void 0;
            } else if(!n)
            {
                return !1;
            }
            if(n)
            {
                var r;
                if(e.length > 0 && (r = e[0]), r instanceof Error)
                {
                    throw r;
                }
                var a = new Error("Unhandled error." + (r ? " (" + r.message + ")" : ""));
                throw a.context = r, a
            }
            var c = i[s];
            if(c === void 0)
            {
                return !1;
            }
            if(typeof c == "function")
            {
                q(c, this, e);
            } else
            {
                for(var u = c.length, _ = Y(c, u), t = 0; t < u; ++t) q(_[t], this, e);
            }
            return !0
        };

        function K(o, s, e, t)
        {
            var n, i, r;
            if(C(e), i = o._events, i === void 0 ? (i = o._events = Object.create(null), o._eventsCount = 0) : (i.newListener !== void 0 && (o.emit("newListener", s, e.listener ? e.listener : e), i = o._events), r = i[s]), r === void 0)
            {
                r = i[s] = e, ++o._eventsCount;
            } else if(typeof r == "function" ? r = i[s] = t ? [e, r] : [r, e] : t ? r.unshift(e) : r.push(e), n = V(o), n > 0 && r.length > n && !r.warned)
            {
                r.warned = !0;
                var a = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(s) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                a.name = "MaxListenersExceededWarning", a.emitter = o, a.type = s, a.count = r.length, fe(a)
            }
            return o
        }

        h.prototype.addListener = function(s, e){return K(this, s, e, !1)};
        h.prototype.on = h.prototype.addListener;
        h.prototype.prependListener = function(s, e){return K(this, s, e, !0)};

        function pe()
        {
            if(!this.fired)
            {
                return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }
        }

        function G(o, s, e)
        {
            var t = {fired: !1, wrapFn: void 0, target: o, type: s, listener: e}, n = pe.bind(t);
            return n.listener = e, t.wrapFn = n, n
        }

        h.prototype.once = function(s, e){return C(e), this.on(s, G(this, s, e)), this};
        h.prototype.prependOnceListener = function(s, e){return C(e), this.prependListener(s, G(this, s, e)), this};
        h.prototype.removeListener = function(s, e)
        {
            var t, n, i, r, a;
            if(C(e), n = this._events, n === void 0)
            {
                return this;
            }
            if(t = n[s], t === void 0)
            {
                return this;
            }
            if(t === e || t.listener === e)
            {
                --this._eventsCount === 0 ? this._events = Object.create(null) : (delete n[s], n.removeListener && this.emit("removeListener", s, t.listener || e));
            } else if(typeof t != "function")
            {
                for(i = -1, r = t.length - 1; r >= 0; r--) if(t[r] === e || t[r].listener === e)
                {
                    a = t[r].listener, i = r;
                    break
                }
                if(i < 0)
                {
                    return this;
                }
                i === 0 ? t.shift() : de(t, i), t.length === 1 && (n[s] = t[0]), n.removeListener !== void 0 && this.emit("removeListener", s, a || e)
            }
            return this
        };
        h.prototype.off = h.prototype.removeListener;
        h.prototype.removeAllListeners = function(s)
        {
            var e, t, n;
            if(t = this._events, t === void 0)
            {
                return this;
            }
            if(t.removeListener === void 0)
            {
                return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : t[s] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete t[s]), this;
            }
            if(arguments.length === 0)
            {
                var i = Object.keys(t), r;
                for(n = 0; n < i.length; ++n) r = i[n], r !== "removeListener" && this.removeAllListeners(r);
                return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
            }
            if(e = t[s], typeof e == "function")
            {
                this.removeListener(s, e);
            } else if(e !== void 0)
            {
                for(n = e.length - 1; n >= 0; n--) this.removeListener(s, e[n]);
            }
            return this
        };

        function Q(o, s, e)
        {
            var t = o._events;
            if(t === void 0)
            {
                return [];
            }
            var n = t[s];
            return n === void 0 ? [] : typeof n == "function" ? e ? [n.listener || n] : [n] : e ? _e(n) : Y(n, n.length)
        }

        h.prototype.listeners = function(s){return Q(this, s, !0)};
        h.prototype.rawListeners = function(s){return Q(this, s, !1)};
        h.listenerCount = function(o, s)
        {return typeof o.listenerCount == "function" ? o.listenerCount(s) : X.call(o, s)};
        h.prototype.listenerCount = X;

        function X(o)
        {
            var s = this._events;
            if(s !== void 0)
            {
                var e = s[o];
                if(typeof e == "function")
                {
                    return 1;
                }
                if(e !== void 0)
                {
                    return e.length
                }
            }
            return 0
        }

        h.prototype.eventNames = function(){return this._eventsCount > 0 ? P(this._events) : []};

        function Y(o, s)
        {
            for(var e = new Array(s), t = 0; t < s; ++t) e[t] = o[t];
            return e
        }

        function de(o, s)
        {
            for(; s + 1 < o.length; s++) o[s] = o[s + 1];
            o.pop()
        }

        function _e(o)
        {
            for(var s = new Array(o.length), e = 0; e < s.length; ++e) s[e] = o[e].listener || o[e];
            return s
        }

        function be(o, s)
        {
            return new Promise(function(e, t)
            {
                function n(r){o.removeListener(s, i), t(r)}

                function i(){typeof o.removeListener == "function" && o.removeListener("error", n), e([].slice.call(arguments))}

                Z(o, s, i, {once: !0}), s !== "error" && me(o, n, {once: !0})
            })
        }

        function me(o, s, e){typeof o.on == "function" && Z(o, "error", s, e)}

        function Z(o, s, e, t)
        {
            if(typeof o.on == "function")
            {
                t.once ? o.once(s, e) : o.on(s, e);
            } else if(typeof o.addEventListener == "function")
            {
                o.addEventListener(s, function n(i){t.once && o.removeEventListener(s, n), e(i)});
            } else
            {
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof o)
            }
        }
    });
    var ne = J(z());
    var k = (t => (t.Disconnected = "disconnected", t.Connecting = "connecting", t.Connected = "connected", t))(k || {}),
        R = (t => (t.Unsubscribed = "unsubscribed", t.Subscribing = "subscribing", t.Subscribed = "subscribed", t))(R || {});

    function $(o, s){return o.lastIndexOf(s, 0) === 0}

    function M(o){return o == null ? !1 : typeof o == "function"}

    function ee(o, s)
    {
        if(globalThis.console)
        {
            let e = globalThis.console[o];
            M(e) && e.apply(globalThis.console, s)
        }
    }

    function ge(o, s){return Math.floor(Math.random() * (s - o + 1) + o)}

    function S(o, s, e)
    {
        o > 31 && (o = 31);
        let t = ge(0, Math.min(e, s * Math.pow(2, o)));
        return Math.min(e, s + t)
    }

    function te(o){return "error" in o && o.error !== null}

    function x(o){return Math.min(o * 1e3, 2147483647)}

    var O = class extends ne.default
    {
        constructor(e, t, n)
        {
            super();
            this._resubscribeTimeout = null;
            this._refreshTimeout = null;
            this.channel = t, this.state = "unsubscribed", this._centrifuge = e, this._token = "", this._getToken = null, this._data = null, this._getData = null, this._recover = !1, this._offset = null, this._epoch = null, this._recoverable = !1, this._positioned = !1, this._joinLeave = !1, this._minResubscribeDelay = 500, this._maxResubscribeDelay = 2e4, this._resubscribeTimeout = null, this._resubscribeAttempts = 0, this._promises = {}, this._promiseId = 0, this._inflight = !1, this._refreshTimeout = null, this._delta = "", this._delta_negotiated = !1, this._prevValue = null, this._unsubPromise = Promise.resolve(), this._setOptions(n), this._centrifuge._debugEnabled ? (this.on("state", i => {this._centrifuge._debug("subscription state", t, i.oldState, "->", i.newState)}), this.on("error", i => {this._centrifuge._debug("subscription error", t, i)})) : this.on("error", function(){Function.prototype()})
        }

        ready(e)
        {
            return this.state === "unsubscribed" ? Promise.reject({
                code: 7,
                message: this.state
            }) : this.state === "subscribed" ? Promise.resolve() : new Promise((t, n) =>
            {
                let i = {resolve: t, reject: n};
                e && (i.timeout = setTimeout(function()
                {
                    n({
                        code: 1,
                        message: "timeout"
                    })
                }, e)), this._promises[this._nextPromiseId()] = i
            })
        }

        subscribe(){this._isSubscribed() || (this._resubscribeAttempts = 0, this._setSubscribing(0, "subscribe called"))}

        unsubscribe(){this._unsubPromise = this._setUnsubscribed(0, "unsubscribe called", !0)}

        publish(e)
        {
            let t = this;
            return this._methodCall().then(function(){return t._centrifuge.publish(t.channel, e)})
        }

        presence()
        {
            let e = this;
            return this._methodCall().then(function(){return e._centrifuge.presence(e.channel)})
        }

        presenceStats()
        {
            let e = this;
            return this._methodCall().then(function(){return e._centrifuge.presenceStats(e.channel)})
        }

        history(e)
        {
            let t = this;
            return this._methodCall().then(function(){return t._centrifuge.history(t.channel, e)})
        }

        _methodCall()
        {
            return this._isSubscribed() ? Promise.resolve() : this._isUnsubscribed() ? Promise.reject({
                code: 7,
                message: this.state
            }) : new Promise((e, t) =>
            {
                let n = setTimeout(function()
                {
                    t({
                        code: 1,
                        message: "timeout"
                    })
                }, this._centrifuge._config.timeout);
                this._promises[this._nextPromiseId()] = {timeout: n, resolve: e, reject: t}
            })
        }

        _nextPromiseId(){return ++this._promiseId}

        _needRecover(){return this._recover === !0}

        _isUnsubscribed(){return this.state === "unsubscribed"}

        _isSubscribing(){return this.state === "subscribing"}

        _isSubscribed(){return this.state === "subscribed"}

        _setState(e)
        {
            if(this.state !== e)
            {
                let t = this.state;
                return this.state = e, this.emit("state", {newState: e, oldState: t, channel: this.channel}), !0
            }
            return !1
        }

        _usesToken(){return this._token !== "" || this._getToken !== null}

        _clearSubscribingState(){this._resubscribeAttempts = 0, this._clearResubscribeTimeout()}

        _clearSubscribedState(){this._clearRefreshTimeout()}

        _setSubscribed(e)
        {
            if(!this._isSubscribing())
            {
                return;
            }
            this._clearSubscribingState(), e.recoverable && (this._recover = !0, this._offset = e.offset || 0, this._epoch = e.epoch || ""), e.delta ? this._delta_negotiated = !0 : this._delta_negotiated = !1, this._setState("subscribed");
            let t = this._centrifuge._getSubscribeContext(this.channel, e);
            this.emit("subscribed", t), this._resolvePromises();
            let n = e.publications;
            if(n && n.length > 0)
            {
                for(let i in n) n.hasOwnProperty(i) && this._handlePublication(n[i]);
            }
            e.expires === !0 && (this._refreshTimeout = setTimeout(() => this._refresh(), x(e.ttl)))
        }

        async _setSubscribing(e, t)
        {
            this._isSubscribing() || (this._isSubscribed() && this._clearSubscribedState(), this._setState("subscribing") && this.emit("subscribing", {
                channel: this.channel,
                code: e,
                reason: t
            }), this._centrifuge._transport && this._centrifuge._transport.emulation() && await this._unsubPromise, this._isSubscribing() && this._subscribe())
        }

        _subscribe()
        {
            if(this._centrifuge._debug("subscribing on", this.channel), !this._centrifuge._transportIsOpen)
            {
                return this._centrifuge._debug("delay subscribe on", this.channel, "till connected"), null;
            }
            let e = this, t = {channel: e.channel};
            return !this._usesToken() || this._token ? e._getData ? (e._getData(t).then(function(n){e._isSubscribing() && (e._data = n, e._sendSubscribe(e._token))}), null) : e._sendSubscribe(e._token) : (this._getSubscriptionToken().then(function(n)
            {
                if(e._isSubscribing())
                {
                    if(!n)
                    {
                        e._failUnauthorized();
                        return
                    }
                    e._token = n, e._getData ? e._getData(t).then(function(i){e._isSubscribing() && (e._data = i, e._sendSubscribe(n))}) : e._sendSubscribe(n)
                }
            }).catch(function(n)
            {
                if(e._isSubscribing())
                {
                    if(n instanceof m)
                    {
                        e._failUnauthorized();
                        return
                    }
                    e.emit("error", {
                        type: "subscribeToken",
                        channel: e.channel,
                        error: {code: 8, message: n !== void 0 ? n.toString() : ""}
                    }), e._scheduleResubscribe()
                }
            }), null)
        }

        _sendSubscribe(e)
        {
            if(!this._centrifuge._transportIsOpen)
            {
                return null;
            }
            let n = {channel: this.channel};
            if(e && (n.token = e), this._data && (n.data = this._data), this._positioned && (n.positioned = !0), this._recoverable && (n.recoverable = !0), this._joinLeave && (n.join_leave = !0), this._needRecover())
            {
                n.recover = !0;
                let r = this._getOffset();
                r && (n.offset = r);
                let a = this._getEpoch();
                a && (n.epoch = a)
            }
            this._delta && (n.delta = this._delta);
            let i = {subscribe: n};
            return this._inflight = !0, this._centrifuge._call(i).then(r =>
            {
                this._inflight = !1;
                let a = r.reply.subscribe;
                this._handleSubscribeResponse(a), r.next && r.next()
            }, r => {this._inflight = !1, this._handleSubscribeError(r.error), r.next && r.next()}), i
        }

        _handleSubscribeError(e)
        {
            if(this._isSubscribing())
            {
                if(e.code === 1)
                {
                    this._centrifuge._disconnect(3, "subscribe timeout", !0);
                    return
                }
                this._subscribeError(e)
            }
        }

        _handleSubscribeResponse(e){this._isSubscribing() && this._setSubscribed(e)}

        _setUnsubscribed(e, t, n)
        {
            if(this._isUnsubscribed())
            {
                return Promise.resolve();
            }
            let i = Promise.resolve();
            return this._isSubscribed() ? (n && (i = this._centrifuge._unsubscribe(this)), this._clearSubscribedState()) : this._isSubscribing() && (this._inflight && n && (i = this._centrifuge._unsubscribe(this)), this._clearSubscribingState()), this._setState("unsubscribed") && this.emit("unsubscribed", {
                channel: this.channel,
                code: e,
                reason: t
            }), this._rejectPromises({code: 7, message: this.state}), i
        }

        _handlePublication(e)
        {
            if(this._delta && this._delta_negotiated)
            {
                let {newData: n, newPrevValue: i} = this._centrifuge._codec.applyDeltaIfNeeded(e, this._prevValue);
                e.data = n, this._prevValue = i
            }
            let t = this._centrifuge._getPublicationContext(this.channel, e);
            this.emit("publication", t), e.offset && (this._offset = e.offset)
        }

        _handleJoin(e)
        {
            let t = this._centrifuge._getJoinLeaveContext(e.info);
            this.emit("join", {channel: this.channel, info: t})
        }

        _handleLeave(e)
        {
            let t = this._centrifuge._getJoinLeaveContext(e.info);
            this.emit("leave", {channel: this.channel, info: t})
        }

        _resolvePromises(){for(let e in this._promises) this._promises.hasOwnProperty(e) && (this._promises[e].timeout && clearTimeout(this._promises[e].timeout), this._promises[e].resolve(), delete this._promises[e])}

        _rejectPromises(e){for(let t in this._promises) this._promises.hasOwnProperty(t) && (this._promises[t].timeout && clearTimeout(this._promises[t].timeout), this._promises[t].reject(e), delete this._promises[t])}

        _scheduleResubscribe()
        {
            let e = this, t = this._getResubscribeDelay();
            this._resubscribeTimeout = setTimeout(function(){e._isSubscribing() && e._subscribe()}, t)
        }

        _subscribeError(e)
        {
            if(this._isSubscribing())
            {
                if(e.code < 100 || e.code === 109 || e.temporary === !0)
                {
                    e.code === 109 && (this._token = "");
                    let t = {channel: this.channel, type: "subscribe", error: e};
                    this._centrifuge.state === "connected" && this.emit("error", t), this._scheduleResubscribe()
                } else
                {
                    this._setUnsubscribed(e.code, e.message, !1)
                }
            }
        }

        _getResubscribeDelay()
        {
            let e = S(this._resubscribeAttempts, this._minResubscribeDelay, this._maxResubscribeDelay);
            return this._resubscribeAttempts++, e
        }

        _setOptions(e)
        {
            if(e && (e.since && (this._offset = e.since.offset, this._epoch = e.since.epoch, this._recover = !0), e.data && (this._data = e.data), e.getData && (this._getData = e.getData), e.minResubscribeDelay !== void 0 && (this._minResubscribeDelay = e.minResubscribeDelay), e.maxResubscribeDelay !== void 0 && (this._maxResubscribeDelay = e.maxResubscribeDelay), e.token && (this._token = e.token), e.getToken && (this._getToken = e.getToken), e.positioned === !0 && (this._positioned = !0), e.recoverable === !0 && (this._recoverable = !0), e.joinLeave === !0 && (this._joinLeave = !0), e.delta))
            {
                if(e.delta !== "fossil")
                {
                    throw new Error("unsupported delta format");
                }
                this._delta = e.delta
            }
        }

        _getOffset()
        {
            let e = this._offset;
            return e !== null ? e : 0
        }

        _getEpoch()
        {
            let e = this._epoch;
            return e !== null ? e : ""
        }

        _clearRefreshTimeout(){this._refreshTimeout !== null && (clearTimeout(this._refreshTimeout), this._refreshTimeout = null)}

        _clearResubscribeTimeout(){this._resubscribeTimeout !== null && (clearTimeout(this._resubscribeTimeout), this._resubscribeTimeout = null)}

        _getSubscriptionToken()
        {
            this._centrifuge._debug("get subscription token for channel", this.channel);
            let e = {channel: this.channel}, t = this._getToken;
            if(t === null)
            {
                throw this.emit("error", {
                    type: "configuration",
                    channel: this.channel,
                    error: {code: 12, message: "provide a function to get channel subscription token"}
                }), new m("");
            }
            return t(e)
        }

        _refresh()
        {
            this._clearRefreshTimeout();
            let e = this;
            this._getSubscriptionToken().then(function(t)
            {
                if(!e._isSubscribed())
                {
                    return;
                }
                if(!t)
                {
                    e._failUnauthorized();
                    return
                }
                e._token = t;
                let i = {sub_refresh: {channel: e.channel, token: t}};
                e._centrifuge._call(i).then(r =>
                {
                    let a = r.reply.sub_refresh;
                    e._refreshResponse(a), r.next && r.next()
                }, r => {e._refreshError(r.error), r.next && r.next()})
            }).catch(function(t)
            {
                if(t instanceof m)
                {
                    e._failUnauthorized();
                    return
                }
                e.emit("error", {
                    type: "refreshToken",
                    channel: e.channel,
                    error: {code: 9, message: t !== void 0 ? t.toString() : ""}
                }), e._refreshTimeout = setTimeout(() => e._refresh(), e._getRefreshRetryDelay())
            })
        }

        _refreshResponse(e){this._isSubscribed() && (this._centrifuge._debug("subscription token refreshed, channel", this.channel), this._clearRefreshTimeout(), e.expires === !0 && (this._refreshTimeout = setTimeout(() => this._refresh(), x(e.ttl))))}

        _refreshError(e)
        {
            this._isSubscribed() && (e.code < 100 || e.temporary === !0 ? (this.emit("error", {
                type: "refresh",
                channel: this.channel,
                error: e
            }), this._refreshTimeout = setTimeout(() => this._refresh(), this._getRefreshRetryDelay())) : this._setUnsubscribed(e.code, e.message, !0))
        }

        _getRefreshRetryDelay(){return S(0, 1e4, 2e4)}

        _failUnauthorized(){this._setUnsubscribed(1, "unauthorized", !0)}
    };
    var L = class
    {
        constructor(s, e){this.endpoint = s, this.options = e, this._transport = null}

        name(){return "sockjs"}

        subName(){return "sockjs-" + this._transport.transport}

        emulation(){return !1}

        supported(){return this.options.sockjs !== null}

        initialize(s, e)
        {this._transport = new this.options.sockjs(this.endpoint, null, this.options.sockjsOptions), this._transport.onopen = () => {e.onOpen()}, this._transport.onerror = t => {e.onError(t)}, this._transport.onclose = t => {e.onClose(t)}, this._transport.onmessage = t => {e.onMessage(t.data)}}

        close(){this._transport.close()}

        send(s){this._transport.send(s)}
    };
    var T = class
    {
        constructor(s, e){this.endpoint = s, this.options = e, this._transport = null}

        name(){return "websocket"}

        subName(){return "websocket"}

        emulation(){return !1}

        supported(){return this.options.websocket !== void 0 && this.options.websocket !== null}

        initialize(s, e)
        {
            let t = "";
            s === "protobuf" && (t = "centrifuge-protobuf"), t !== "" ? this._transport = new this.options.websocket(this.endpoint, t) : this._transport = new this.options.websocket(this.endpoint), s === "protobuf" && (this._transport.binaryType = "arraybuffer"), this._transport.onopen = () => {e.onOpen()}, this._transport.onerror = n => {e.onError(n)}, this._transport.onclose = n => {e.onClose(n)}, this._transport.onmessage = n => {e.onMessage(n.data)}
        }

        close(){this._transport.close()}

        send(s){this._transport.send(s)}
    };
    var D = class
    {
        constructor(s, e)
        {this.endpoint = s, this.options = e, this._abortController = null, this._utf8decoder = new TextDecoder, this._protocol = "json"}

        name(){return "http_stream"}

        subName(){return "http_stream"}

        emulation(){return !0}

        _handleErrors(s)
        {
            if(!s.ok)
            {
                throw new Error(s.status);
            }
            return s
        }

        _fetchEventTarget(s, e, t)
        {
            let n = new EventTarget, i = s.options.fetch;
            return i(e, t).then(s._handleErrors).then(r =>
            {
                n.dispatchEvent(new Event("open"));
                let a = "", c = 0, u = new Uint8Array, _ = r.body.getReader();
                return new s.options.readableStream({
                    start(v)
                    {
                        function E()
                        {
                            return _.read().then(({done: b, value: l}) =>
                            {
                                if(b)
                                {
                                    n.dispatchEvent(new Event("close")), v.close();
                                    return
                                }
                                try
                                {
                                    if(s._protocol === "json")
                                    {
                                        for(a += s._utf8decoder.decode(l); c < a.length;) if(a[c] === `
`)
                                        {
                                            let p = a.substring(0, c);
                                            n.dispatchEvent(new MessageEvent("message", {data: p})), a = a.substring(c + 1), c = 0
                                        } else
                                        {
                                            ++c;
                                        }
                                    } else
                                    {
                                        let p = new Uint8Array(u.length + l.length);
                                        for(p.set(u), p.set(l, u.length), u = p; ;)
                                        {
                                            let d = s.options.decoder.decodeReply(u);
                                            if(d.ok)
                                            {
                                                let f = u.slice(0, d.pos);
                                                n.dispatchEvent(new MessageEvent("message", {data: f})), u = u.slice(d.pos);
                                                continue
                                            }
                                            break
                                        }
                                    }
                                } catch(p)
                                {
                                    n.dispatchEvent(new Event("error", {detail: p})), n.dispatchEvent(new Event("close")), v.close();
                                    return
                                }
                                E()
                            }).catch(function(b){n.dispatchEvent(new Event("error", {detail: b})), n.dispatchEvent(new Event("close")), v.close()})
                        }

                        return E()
                    }
                })
            }).catch(r => {n.dispatchEvent(new Event("error", {detail: r})), n.dispatchEvent(new Event("close"))}), n
        }

        supported(){return this.options.fetch !== null && this.options.readableStream !== null && typeof TextDecoder < "u" && typeof AbortController < "u" && typeof EventTarget < "u" && typeof Event < "u" && typeof MessageEvent < "u" && typeof Error < "u"}

        initialize(s, e, t)
        {
            this._protocol = s, this._abortController = new AbortController;
            let n, i;
            s === "json" ? (n = {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, i = t) : (n = {Accept: "application/octet-stream", "Content-Type": "application/octet-stream"}, i = t);
            let r = {
                method: "POST",
                headers: n,
                body: i,
                mode: "cors",
                credentials: "same-origin",
                cache: "no-cache",
                signal: this._abortController.signal
            }, a = this._fetchEventTarget(this, this.endpoint, r);
            a.addEventListener("open", () => {e.onOpen()}), a.addEventListener("error", c => {this._abortController.abort(), e.onError(c)}), a.addEventListener("close", () =>
            {
                this._abortController.abort(), e.onClose({
                    code: 4,
                    reason: "connection closed"
                })
            }), a.addEventListener("message", c => {e.onMessage(c.data)})
        }

        close(){this._abortController.abort()}

        send(s, e, t)
        {
            let n, i, r = {session: e, node: t, data: s};
            this._protocol === "json" ? (n = {"Content-Type": "application/json"}, i = JSON.stringify(r)) : (n = {"Content-Type": "application/octet-stream"}, i = this.options.encoder.encodeEmulationRequest(r));
            let a = this.options.fetch,
                c = {method: "POST", headers: n, body: i, mode: "cors", credentials: "same-origin", cache: "no-cache"};
            a(this.options.emulationEndpoint, c)
        }
    };
    var I = class
    {
        constructor(s, e)
        {this.endpoint = s, this.options = e, this._protocol = "json", this._transport = null, this._onClose = null}

        name(){return "sse"}

        subName(){return "sse"}

        emulation(){return !0}

        supported(){return this.options.eventsource !== null && this.options.fetch !== null}

        initialize(s, e, t)
        {
            let n;
            globalThis && globalThis.document && globalThis.document.baseURI ? n = new URL(this.endpoint, globalThis.document.baseURI) : n = new URL(this.endpoint), n.searchParams.append("cf_connect", t);
            let i = {}, r = new this.options.eventsource(n.toString(), i);
            this._transport = r;
            let a = this;
            r.onopen = function(){e.onOpen()}, r.onerror = function(c)
            {
                r.close(), e.onError(c), e.onClose({
                    code: 4,
                    reason: "connection closed"
                })
            }, r.onmessage = function(c){e.onMessage(c.data)}, a._onClose = function()
            {
                e.onClose({
                    code: 4,
                    reason: "connection closed"
                })
            }
        }

        close(){this._transport.close(), this._onClose !== null && this._onClose()}

        send(s, e, t)
        {
            let n = {session: e, node: t, data: s}, i = {"Content-Type": "application/json"}, r = JSON.stringify(n),
                a = this.options.fetch,
                c = {method: "POST", headers: i, body: r, mode: "cors", credentials: "same-origin", cache: "no-cache"};
            a(this.options.emulationEndpoint, c)
        }
    };
    var j = class
    {
        constructor(s, e)
        {this.endpoint = s, this.options = e, this._transport = null, this._stream = null, this._writer = null, this._utf8decoder = new TextDecoder, this._protocol = "json"}

        name(){return "webtransport"}

        subName(){return "webtransport"}

        emulation(){return !1}

        supported(){return this.options.webtransport !== void 0 && this.options.webtransport !== null}

        async initialize(s, e)
        {
            let t;
            globalThis && globalThis.document && globalThis.document.baseURI ? t = new URL(this.endpoint, globalThis.document.baseURI) : t = new URL(this.endpoint), s === "protobuf" && t.searchParams.append("cf_protocol", "protobuf"), this._protocol = s;
            let n = new EventTarget;
            this._transport = new this.options.webtransport(t.toString()), this._transport.closed.then(() =>
            {
                e.onClose({
                    code: 4,
                    reason: "connection closed"
                })
            }).catch(() => {e.onClose({code: 4, reason: "connection closed"})});
            try
            {await this._transport.ready} catch
            {
                this.close();
                return
            }
            let i;
            try
            {i = await this._transport.createBidirectionalStream()} catch
            {
                this.close();
                return
            }
            this._stream = i, this._writer = this._stream.writable.getWriter(), n.addEventListener("close", () =>
            {
                e.onClose({
                    code: 4,
                    reason: "connection closed"
                })
            }), n.addEventListener("message", r => {e.onMessage(r.data)}), this._startReading(n), e.onOpen()
        }

        async _startReading(s)
        {
            let e = this._stream.readable.getReader(), t = "", n = 0, i = new Uint8Array;
            try
            {
                for(; ;)
                {
                    let {done: r, value: a} = await e.read();
                    if(a.length > 0)
                    {
                        if(this._protocol === "json")
                        {
                            for(t += this._utf8decoder.decode(a); n < t.length;) if(t[n] === `
`)
                            {
                                let c = t.substring(0, n);
                                s.dispatchEvent(new MessageEvent("message", {data: c})), t = t.substring(n + 1), n = 0
                            } else
                            {
                                ++n;
                            }
                        } else
                        {
                            let c = new Uint8Array(i.length + a.length);
                            for(c.set(i), c.set(a, i.length), i = c; ;)
                            {
                                let u = this.options.decoder.decodeReply(i);
                                if(u.ok)
                                {
                                    let _ = i.slice(0, u.pos);
                                    s.dispatchEvent(new MessageEvent("message", {data: _})), i = i.slice(u.pos);
                                    continue
                                }
                                break
                            }
                        }
                    }
                    if(r)
                    {
                        break
                    }
                }
            } catch
            {s.dispatchEvent(new Event("close"))}
        }

        async close()
        {
            try
            {this._writer && await this._writer.close(), this._transport.close()} catch
            {}
        }

        async send(s)
        {
            let e;
            this._protocol === "json" ? e = new TextEncoder().encode(s + `
`) : e = s;
            try
            {await this._writer.write(e)} catch
            {this.close()}
        }
    };
    var xe = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, 36, -1, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, -1, -1, -1, 63, -1],
        N = class
        {
            constructor(s){this.a = s, this.pos = 0}

            haveBytes(){return this.pos < this.a.length}

            getByte()
            {
                let s = this.a[this.pos];
                if(this.pos++, this.pos > this.a.length)
                {
                    throw new RangeError("out of bounds");
                }
                return s
            }

            getChar(){return String.fromCharCode(this.getByte())}

            getInt()
            {
                let s = 0, e;
                for(; this.haveBytes() && (e = xe[127 & this.getByte()]) >= 0;) s = (s << 6) + e;
                return this.pos--, s >>> 0
            }
        }, W = class
        {
            constructor(){this.a = []}

            toByteArray(s){return Array.isArray(s) ? this.a : new Uint8Array(this.a)}

            putArray(s, e, t){for(let n = e; n < t; n++) this.a.push(s[n])}
        };

    function Te(o)
    {
        let s = 0, e = 0, t = 0, n = 0, i = 0, r = o.length;
        for(; r >= 16;) s = s + o[i + 0] | 0, e = e + o[i + 1] | 0, t = t + o[i + 2] | 0, n = n + o[i + 3] | 0, s = s + o[i + 4] | 0, e = e + o[i + 5] | 0, t = t + o[i + 6] | 0, n = n + o[i + 7] | 0, s = s + o[i + 8] | 0, e = e + o[i + 9] | 0, t = t + o[i + 10] | 0, n = n + o[i + 11] | 0, s = s + o[i + 12] | 0, e = e + o[i + 13] | 0, t = t + o[i + 14] | 0, n = n + o[i + 15] | 0, i += 16, r -= 16;
        for(; r >= 4;) s = s + o[i + 0] | 0, e = e + o[i + 1] | 0, t = t + o[i + 2] | 0, n = n + o[i + 3] | 0, i += 4, r -= 4;
        switch(n = ((n + (t << 8) | 0) + (e << 16) | 0) + (s << 24) | 0, r)
        {
            case 3:
                n = n + (o[i + 2] << 8) | 0;
            case 2:
                n = n + (o[i + 1] << 16) | 0;
            case 1:
                n = n + (o[i + 0] << 24) | 0
        }
        return n >>> 0
    }

    function ie(o, s)
    {
        let e = 0, t = new N(s), n = o.length, i = s.length, r = t.getInt();
        if(t.getChar() !== `
`)
        {
            throw new Error("size integer not terminated by '\\n'");
        }
        let a = new W;
        for(; t.haveBytes();)
        {
            let c = t.getInt(), u;
            switch(t.getChar())
            {
                case"@":
                    if(u = t.getInt(), t.haveBytes() && t.getChar() !== ",")
                    {
                        throw new Error("copy command not terminated by ','");
                    }
                    if(e += c, e > r)
                    {
                        throw new Error("copy exceeds output file size");
                    }
                    if(u + c > n)
                    {
                        throw new Error("copy extends past end of input");
                    }
                    a.putArray(o, u, u + c);
                    break;
                case":":
                    if(e += c, e > r)
                    {
                        throw new Error("insert command gives an output larger than predicted");
                    }
                    if(c > i)
                    {
                        throw new Error("insert count exceeds size of delta");
                    }
                    a.putArray(t.a, t.pos, t.pos + c), t.pos += c;
                    break;
                case";":
                {
                    let _ = a.toByteArray(o);
                    if(c !== Te(_))
                    {
                        throw new Error("bad checksum");
                    }
                    if(e !== r)
                    {
                        throw new Error("generated size does not match predicted size");
                    }
                    return _
                }
                default:
                    throw new Error("unknown delta operator")
            }
        }
        throw new Error("unterminated delta")
    }

    var w = class
    {
        name(){return "json"}

        encodeCommands(s)
        {
            return s.map(e => JSON.stringify(e)).join(`
`)
        }

        decodeReplies(s)
        {
            return s.trim().split(`
`).map(e => JSON.parse(e))
        }

        applyDeltaIfNeeded(s, e)
        {
            let t, n;
            if(s.delta)
            {
                let i = ie(e, new TextEncoder().encode(s.data));
                t = JSON.parse(new TextDecoder().decode(i)), n = i
            } else
            {
                t = JSON.parse(s.data), n = new TextEncoder().encode(s.data);
            }
            return {newData: t, newPrevValue: n}
        }
    };
    var se = J(z()), we = {
            token: "",
            getToken: null,
            data: null,
            getData: null,
            debug: !1,
            name: "js",
            version: "",
            fetch: null,
            readableStream: null,
            websocket: null,
            eventsource: null,
            sockjs: null,
            sockjsOptions: {},
            emulationEndpoint: "/emulation",
            minReconnectDelay: 500,
            maxReconnectDelay: 2e4,
            timeout: 5e3,
            maxServerPingDelay: 1e4,
            networkEventTarget: null
        }, m = class extends Error {constructor(s){super(s), this.name = this.constructor.name}},
        g = class extends se.default
        {
            constructor(e, t)
            {
                super();
                this._reconnectTimeout = null;
                this._refreshTimeout = null;
                this._serverPingTimeout = null;
                this.state = "disconnected", this._transportIsOpen = !1, this._endpoint = e, this._emulation = !1, this._transports = [], this._currentTransportIndex = 0, this._triedAllTransports = !1, this._transportWasOpen = !1, this._transport = null, this._transportId = 0, this._deviceWentOffline = !1, this._transportClosed = !0, this._codec = new w, this._reconnecting = !1, this._reconnectTimeout = null, this._reconnectAttempts = 0, this._client = null, this._session = "", this._node = "", this._subs = {}, this._serverSubs = {}, this._commandId = 0, this._commands = [], this._batching = !1, this._refreshRequired = !1, this._refreshTimeout = null, this._callbacks = {}, this._token = "", this._data = null, this._dispatchPromise = Promise.resolve(), this._serverPing = 0, this._serverPingTimeout = null, this._sendPong = !1, this._promises = {}, this._promiseId = 0, this._debugEnabled = !1, this._networkEventsSet = !1, this._config = {...we, ...t}, this._configure(), this._debugEnabled ? (this.on("state", n => {this._debug("client state", n.oldState, "->", n.newState)}), this.on("error", n => {this._debug("client error", n)})) : this.on("error", function(){Function.prototype()})
            }

            newSubscription(e, t)
            {
                if(this.getSubscription(e) !== null)
                {
                    throw new Error("Subscription to the channel " + e + " already exists");
                }
                let n = new O(this, e, t);
                return this._subs[e] = n, n
            }

            getSubscription(e){return this._getSub(e)}

            removeSubscription(e){e && (e.state !== "unsubscribed" && e.unsubscribe(), this._removeSubscription(e))}

            subscriptions(){return this._subs}

            ready(e)
            {
                return this.state === "disconnected" ? Promise.reject({
                    code: 3,
                    message: "client disconnected"
                }) : this.state === "connected" ? Promise.resolve() : new Promise((t, n) =>
                {
                    let i = {
                        resolve: t,
                        reject: n
                    };
                    e && (i.timeout = setTimeout(function()
                    {
                        n({
                            code: 1,
                            message: "timeout"
                        })
                    }, e)), this._promises[this._nextPromiseId()] = i
                })
            }

            connect()
            {
                if(this._isConnected())
                {
                    this._debug("connect called when already connected");
                    return
                }
                if(this._isConnecting())
                {
                    this._debug("connect called when already connecting");
                    return
                }
                this._debug("connect called"), this._reconnectAttempts = 0, this._startConnecting()
            }

            disconnect(){this._disconnect(0, "disconnect called", !1)}

            setToken(e){this._token = e}

            send(e)
            {
                let t = {send: {data: e}}, n = this;
                return this._methodCall().then(function(){return n._transportSendCommands([t]) ? Promise.resolve() : Promise.reject(n._createErrorObject(10, "transport write error"))})
            }

            rpc(e, t)
            {
                let n = {rpc: {method: e, data: t}}, i = this;
                return this._methodCall().then(function(){return i._callPromise(n, function(r){return {data: r.rpc.data}})})
            }

            publish(e, t)
            {
                let n = {publish: {channel: e, data: t}}, i = this;
                return this._methodCall().then(function(){return i._callPromise(n, function(){return {}})})
            }

            history(e, t)
            {
                let n = {history: this._getHistoryRequest(e, t)}, i = this;
                return this._methodCall().then(function()
                {
                    return i._callPromise(n, function(r)
                    {
                        let a = r.history, c = [];
                        if(a.publications)
                        {
                            for(let u = 0; u < a.publications.length; u++) c.push(i._getPublicationContext(e, a.publications[u]));
                        }
                        return {publications: c, epoch: a.epoch || "", offset: a.offset || 0}
                    })
                })
            }

            presence(e)
            {
                let t = {presence: {channel: e}}, n = this;
                return this._methodCall().then(function()
                {
                    return n._callPromise(t, function(i)
                    {
                        let r = i.presence.presence;
                        for(let a in r) if(r.hasOwnProperty(a))
                        {
                            let c = r[a].conn_info, u = r[a].chan_info;
                            c && (r[a].connInfo = c), u && (r[a].chanInfo = u)
                        }
                        return {clients: r}
                    })
                })
            }

            presenceStats(e)
            {
                let t = {presence_stats: {channel: e}}, n = this;
                return this._methodCall().then(function()
                {
                    return n._callPromise(t, function(i)
                    {
                        let r = i.presence_stats;
                        return {numUsers: r.num_users, numClients: r.num_clients}
                    })
                })
            }

            startBatching(){this._batching = !0}

            stopBatching()
            {
                let e = this;
                Promise.resolve().then(function(){Promise.resolve().then(function(){e._batching = !1, e._flush()})})
            }

            _debug(...e){this._debugEnabled && ee("debug", e)}

            _formatOverride(){}

            _configure()
            {
                if(!("Promise" in globalThis))
                {
                    throw new Error("Promise polyfill required");
                }
                if(!this._endpoint)
                {
                    throw new Error("endpoint configuration required");
                }
                if(this._config.token !== null && (this._token = this._config.token), this._config.data !== null && (this._data = this._config.data), this._codec = new w, this._formatOverride(), (this._config.debug === !0 || typeof localStorage < "u" && localStorage.getItem("centrifuge.debug")) && (this._debugEnabled = !0), this._debug("config", this._config), typeof this._endpoint != "string")
                {
                    if(typeof this._endpoint == "object" && this._endpoint instanceof Array)
                    {
                        this._transports = this._endpoint, this._emulation = !0;
                        for(let e in this._transports) if(this._transports.hasOwnProperty(e))
                        {
                            let t = this._transports[e];
                            if(!t.endpoint || !t.transport)
                            {
                                throw new Error("malformed transport configuration");
                            }
                            let n = t.transport;
                            if(["websocket", "http_stream", "sse", "sockjs", "webtransport"].indexOf(n) < 0)
                            {
                                throw new Error("unsupported transport name: " + n)
                            }
                        }
                    } else
                    {
                        throw new Error("unsupported url configuration type: only string or array of objects are supported")
                    }
                }
            }

            _setState(e)
            {
                if(this.state !== e)
                {
                    this._reconnecting = !1;
                    let t = this.state;
                    return this.state = e, this.emit("state", {newState: e, oldState: t}), !0
                }
                return !1
            }

            _isDisconnected(){return this.state === "disconnected"}

            _isConnecting(){return this.state === "connecting"}

            _isConnected(){return this.state === "connected"}

            _nextCommandId(){return ++this._commandId}

            _setNetworkEvents()
            {
                if(this._networkEventsSet)
                {
                    return;
                }
                let e = null;
                this._config.networkEventTarget !== null ? e = this._config.networkEventTarget : typeof globalThis.addEventListener < "u" && (e = globalThis), e && (e.addEventListener("offline", () => {this._debug("offline event triggered"), (this.state === "connected" || this.state === "connecting") && (this._disconnect(1, "transport closed", !0), this._deviceWentOffline = !0)}), e.addEventListener("online", () => {this._debug("online event triggered"), this.state === "connecting" && (this._deviceWentOffline && !this._transportClosed && (this._deviceWentOffline = !1, this._transportClosed = !0), this._clearReconnectTimeout(), this._startReconnecting())}), this._networkEventsSet = !0)
            }

            _getReconnectDelay()
            {
                let e = S(this._reconnectAttempts, this._config.minReconnectDelay, this._config.maxReconnectDelay);
                return this._reconnectAttempts += 1, e
            }

            _clearOutgoingRequests()
            {
                for(let e in this._callbacks) if(this._callbacks.hasOwnProperty(e))
                {
                    let t = this._callbacks[e];
                    clearTimeout(t.timeout);
                    let n = t.errback;
                    if(!n)
                    {
                        continue;
                    }
                    n({error: this._createErrorObject(11, "connection closed")})
                }
                this._callbacks = {}
            }

            _clearConnectedState()
            {
                this._client = null, this._clearServerPingTimeout(), this._clearRefreshTimeout();
                for(let e in this._subs)
                {
                    if(!this._subs.hasOwnProperty(e))
                    {
                        continue;
                    }
                    let t = this._subs[e];
                    t.state === "subscribed" && t._setSubscribing(1, "transport closed")
                }
                for(let e in this._serverSubs) this._serverSubs.hasOwnProperty(e) && this.emit("subscribing", {channel: e})
            }

            _handleWriteError(e)
            {
                for(let t of e)
                {
                    let n = t.id;
                    if(!(n in this._callbacks))
                    {
                        continue;
                    }
                    let i = this._callbacks[n];
                    clearTimeout(this._callbacks[n].timeout), delete this._callbacks[n];
                    let r = i.errback;
                    r({error: this._createErrorObject(10, "transport write error")})
                }
            }

            _transportSendCommands(e)
            {
                if(!e.length)
                {
                    return !0;
                }
                if(!this._transport)
                {
                    return !1;
                }
                try
                {this._transport.send(this._codec.encodeCommands(e), this._session, this._node)} catch(t)
                {return this._debug("error writing commands", t), this._handleWriteError(e), !1}
                return !0
            }

            _initializeTransport()
            {
                let e;
                this._config.websocket !== null ? e = this._config.websocket : typeof globalThis.WebSocket != "function" && typeof globalThis.WebSocket != "object" || (e = globalThis.WebSocket);
                let t = null;
                this._config.sockjs !== null ? t = this._config.sockjs : typeof globalThis.SockJS < "u" && (t = globalThis.SockJS);
                let n = null;
                this._config.eventsource !== null ? n = this._config.eventsource : typeof globalThis.EventSource < "u" && (n = globalThis.EventSource);
                let i = null;
                this._config.fetch !== null ? i = this._config.fetch : typeof globalThis.fetch < "u" && (i = globalThis.fetch);
                let r = null;
                if(this._config.readableStream !== null ? r = this._config.readableStream : typeof globalThis.ReadableStream < "u" && (r = globalThis.ReadableStream), this._emulation)
                {
                    this._currentTransportIndex >= this._transports.length && (this._triedAllTransports = !0, this._currentTransportIndex = 0);
                    let l = 0;
                    for(; ;)
                    {
                        if(l >= this._transports.length)
                        {
                            throw new Error("no supported transport found");
                        }
                        let p = this._transports[this._currentTransportIndex], d = p.transport, f = p.endpoint;
                        if(d === "websocket")
                        {
                            if(this._debug("trying websocket transport"), this._transport = new T(f, {websocket: e}), !this._transport.supported())
                            {
                                this._debug("websocket transport not available"), this._currentTransportIndex++, l++;
                                continue
                            }
                        } else if(d === "webtransport")
                        {
                            if(this._debug("trying webtransport transport"), this._transport = new j(f, {
                                webtransport: globalThis.WebTransport,
                                decoder: this._codec,
                                encoder: this._codec
                            }), !this._transport.supported())
                            {
                                this._debug("webtransport transport not available"), this._currentTransportIndex++, l++;
                                continue
                            }
                        } else if(d === "http_stream")
                        {
                            if(this._debug("trying http_stream transport"), this._transport = new D(f, {
                                fetch: i,
                                readableStream: r,
                                emulationEndpoint: this._config.emulationEndpoint,
                                decoder: this._codec,
                                encoder: this._codec
                            }), !this._transport.supported())
                            {
                                this._debug("http_stream transport not available"), this._currentTransportIndex++, l++;
                                continue
                            }
                        } else if(d === "sse")
                        {
                            if(this._debug("trying sse transport"), this._transport = new I(f, {
                                eventsource: n,
                                fetch: i,
                                emulationEndpoint: this._config.emulationEndpoint
                            }), !this._transport.supported())
                            {
                                this._debug("sse transport not available"), this._currentTransportIndex++, l++;
                                continue
                            }
                        } else if(d === "sockjs")
                        {
                            if(this._debug("trying sockjs"), this._transport = new L(f, {
                                sockjs: t,
                                sockjsOptions: this._config.sockjsOptions
                            }), !this._transport.supported())
                            {
                                this._debug("sockjs transport not available"), this._currentTransportIndex++, l++;
                                continue
                            }
                        } else
                        {
                            throw new Error("unknown transport " + d);
                        }
                        break
                    }
                } else
                {
                    if($(this._endpoint, "http"))
                    {
                        throw new Error("Provide explicit transport endpoints configuration in case of using HTTP (i.e. using array of TransportEndpoint instead of a single string), or use ws(s):// scheme in an endpoint if you aimed using WebSocket transport");
                    }
                    if(this._debug("client will use websocket"), this._transport = new T(this._endpoint, {websocket: e}), !this._transport.supported())
                    {
                        throw new Error("WebSocket not available")
                    }
                }
                let a = this, c = this._transport, u = this._nextTransportId();
                a._debug("id of transport", u);
                let _ = !1, v = [];
                if(this._transport.emulation())
                {
                    let l = a._sendConnect(!0);
                    v.push(l)
                }
                this._setNetworkEvents();
                let E = this._codec.encodeCommands(v);
                this._transportClosed = !1;
                let b;
                b = setTimeout(function(){c.close()}, this._config.timeout), this._transport.initialize(this._codec.name(), {
                    onOpen: function()
                    {
                        if(b && (clearTimeout(b), b = null), a._transportId != u)
                        {
                            a._debug("open callback from non-actual transport"), c.close();
                            return
                        }
                        _ = !0, a._debug(c.subName(), "transport open"), !c.emulation() && (a._transportIsOpen = !0, a._transportWasOpen = !0, a.startBatching(), a._sendConnect(!1), a._sendSubscribeCommands(), a.stopBatching(), a.emit("__centrifuge_debug:connect_frame_sent", {}))
                    }, onError: function(l)
                    {
                        if(a._transportId != u)
                        {
                            a._debug("error callback from non-actual transport");
                            return
                        }
                        a._debug("transport level error", l)
                    }, onClose: function(l)
                    {
                        if(b && (clearTimeout(b), b = null), a._transportId != u)
                        {
                            a._debug("close callback from non-actual transport");
                            return
                        }
                        a._debug(c.subName(), "transport closed"), a._transportClosed = !0, a._transportIsOpen = !1;
                        let p = "connection closed", d = !0, f = 0;
                        if(l && "code" in l && l.code && (f = l.code), l && l.reason)
                        {
                            try
                            {
                                let A = JSON.parse(l.reason);
                                p = A.reason, d = A.reconnect
                            } catch
                            {p = l.reason, (f >= 3500 && f < 4e3 || f >= 4500 && f < 5e3) && (d = !1)}
                        }
                        f < 3e3 ? (f === 1009 ? (f = 3, p = "message size limit exceeded", d = !1) : (f = 1, p = "transport closed"), a._emulation && !a._transportWasOpen && (a._currentTransportIndex++, a._currentTransportIndex >= a._transports.length && (a._triedAllTransports = !0, a._currentTransportIndex = 0))) : a._transportWasOpen = !0, a._isConnecting() && !_ && a.emit("error", {
                            type: "transport",
                            error: {code: 2, message: "transport closed"},
                            transport: c.name()
                        }), a._reconnecting = !1, a._disconnect(f, p, d)
                    }, onMessage: function(l){a._dataReceived(l)}
                }, E), a.emit("__centrifuge_debug:transport_initialized", {})
            }

            _sendConnect(e)
            {
                let t = this._constructConnectCommand(), n = this;
                return this._call(t, e).then(i =>
                {
                    let r = i.reply.connect;
                    n._connectResponse(r), i.next && i.next()
                }, i => {n._connectError(i.error), i.next && i.next()}), t
            }

            _startReconnecting()
            {
                if(this._debug("start reconnecting"), !this._isConnecting())
                {
                    this._debug("stop reconnecting: client not in connecting state");
                    return
                }
                if(this._reconnecting)
                {
                    this._debug("reconnect already in progress, return from reconnect routine");
                    return
                }
                if(this._transportClosed === !1)
                {
                    this._debug("waiting for transport close");
                    return
                }
                this._reconnecting = !0;
                let e = this, t = this._token === "";
                if(!(this._refreshRequired || t && this._config.getToken !== null))
                {
                    this._config.getData ? this._config.getData().then(function(i){e._isConnecting() && (e._data = i, e._initializeTransport())}) : this._initializeTransport();
                    return
                }
                this._getToken().then(function(i)
                {
                    if(e._isConnecting())
                    {
                        if(i == null || i == null)
                        {
                            e._failUnauthorized();
                            return
                        }
                        e._token = i, e._debug("connection token refreshed"), e._config.getData ? e._config.getData().then(function(r){e._isConnecting() && (e._data = r, e._initializeTransport())}) : e._initializeTransport()
                    }
                }).catch(function(i)
                {
                    if(!e._isConnecting())
                    {
                        return;
                    }
                    if(i instanceof m)
                    {
                        e._failUnauthorized();
                        return
                    }
                    e.emit("error", {
                        type: "connectToken",
                        error: {code: 5, message: i !== void 0 ? i.toString() : ""}
                    });
                    let r = e._getReconnectDelay();
                    e._debug("error on connection token refresh, reconnect after " + r + " milliseconds", i), e._reconnecting = !1, e._reconnectTimeout = setTimeout(() => {e._startReconnecting()}, r)
                })
            }

            _connectError(e)
            {
                this.state === "connecting" && (e.code === 109 && (this._refreshRequired = !0), e.code < 100 || e.temporary === !0 || e.code === 109 ? (this.emit("error", {
                    type: "connect",
                    error: e
                }), this._debug("closing transport due to connect error"), this._disconnect(e.code, e.message, !0)) : this._disconnect(e.code, e.message, !1))
            }

            _scheduleReconnect()
            {
                if(!this._isConnecting())
                {
                    return;
                }
                let e = !1;
                this._emulation && !this._transportWasOpen && !this._triedAllTransports && (e = !0);
                let t = this._getReconnectDelay();
                e && (t = 0), this._debug("reconnect after " + t + " milliseconds"), this._clearReconnectTimeout(), this._reconnectTimeout = setTimeout(() => {this._startReconnecting()}, t)
            }

            _constructConnectCommand()
            {
                let e = {};
                this._token && (e.token = this._token), this._data && (e.data = this._data), this._config.name && (e.name = this._config.name), this._config.version && (e.version = this._config.version);
                let t = {}, n = !1;
                for(let i in this._serverSubs) if(this._serverSubs.hasOwnProperty(i) && this._serverSubs[i].recoverable)
                {
                    n = !0;
                    let r = {recover: !0};
                    this._serverSubs[i].offset && (r.offset = this._serverSubs[i].offset), this._serverSubs[i].epoch && (r.epoch = this._serverSubs[i].epoch), t[i] = r
                }
                return n && (e.subs = t), {connect: e}
            }

            _getHistoryRequest(e, t)
            {
                let n = {channel: e};
                return t !== void 0 && (t.since && (n.since = {offset: t.since.offset}, t.since.epoch && (n.since.epoch = t.since.epoch)), t.limit !== void 0 && (n.limit = t.limit), t.reverse === !0 && (n.reverse = !0)), n
            }

            _methodCall()
            {
                return this._isConnected() ? Promise.resolve() : new Promise((e, t) =>
                {
                    let n = setTimeout(function(){t({code: 1, message: "timeout"})}, this._config.timeout);
                    this._promises[this._nextPromiseId()] = {timeout: n, resolve: e, reject: t}
                })
            }

            _callPromise(e, t)
            {
                return new Promise((n, i) =>
                {this._call(e, !1).then(r => {n(t(r.reply)), r.next && r.next()}, r => {i(r.error), r.next && r.next()})})
            }

            _dataReceived(e)
            {
                this._serverPing > 0 && this._waitServerPing();
                let t = this._codec.decodeReplies(e);
                this._dispatchPromise = this._dispatchPromise.then(() =>
                {
                    let n;
                    this._dispatchPromise = new Promise(i => {n = i}), this._dispatchSynchronized(t, n)
                })
            }

            _dispatchSynchronized(e, t)
            {
                let n = Promise.resolve();
                for(let i in e) e.hasOwnProperty(i) && (n = n.then(() => this._dispatchReply(e[i])));
                n = n.then(() => {t()})
            }

            _dispatchReply(e)
            {
                let t, n = new Promise(r => {t = r});
                if(e == null)
                {
                    return this._debug("dispatch: got undefined or null reply"), t(), n;
                }
                let i = e.id;
                return i && i > 0 ? this._handleReply(e, t) : e.push ? this._handlePush(e.push, t) : this._handleServerPing(t), n
            }

            _call(e, t)
            {
                return new Promise((n, i) =>
                {e.id = this._nextCommandId(), this._registerCall(e.id, n, i), t || this._addCommand(e)})
            }

            _startConnecting()
            {
                this._debug("start connecting"), this._setState("connecting") && this.emit("connecting", {
                    code: 0,
                    reason: "connect called"
                }), this._client = null, this._startReconnecting()
            }

            _disconnect(e, t, n)
            {
                if(this._isDisconnected())
                {
                    return;
                }
                this._transportIsOpen = !1;
                let i = this.state;
                this._reconnecting = !1;
                let r = {code: e, reason: t}, a = !1;
                if(n ? a = this._setState("connecting") : (a = this._setState("disconnected"), this._rejectPromises({
                    code: 3,
                    message: "disconnected"
                })), this._clearOutgoingRequests(), i === "connecting" && this._clearReconnectTimeout(), i === "connected" && this._clearConnectedState(), a && (this._isConnecting() ? this.emit("connecting", r) : this.emit("disconnected", r)), this._transport)
                {
                    this._debug("closing existing transport");
                    let c = this._transport;
                    this._transport = null, c.close(), this._transportClosed = !0, this._nextTransportId()
                } else
                {
                    this._debug("no transport to close");
                }
                this._scheduleReconnect()
            }

            _failUnauthorized(){this._disconnect(1, "unauthorized", !1)}

            _getToken()
            {
                if(this._debug("get connection token"), !this._config.getToken)
                {
                    throw this.emit("error", {
                        type: "configuration",
                        error: {code: 12, message: "token expired but no getToken function set in the configuration"}
                    }), new m("");
                }
                return this._config.getToken({})
            }

            _refresh()
            {
                let e = this._client, t = this;
                this._getToken().then(function(n)
                {
                    if(e !== t._client)
                    {
                        return;
                    }
                    if(!n)
                    {
                        t._failUnauthorized();
                        return
                    }
                    if(t._token = n, t._debug("connection token refreshed"), !t._isConnected())
                    {
                        return;
                    }
                    let i = {refresh: {token: t._token}};
                    t._call(i, !1).then(r =>
                    {
                        let a = r.reply.refresh;
                        t._refreshResponse(a), r.next && r.next()
                    }, r => {t._refreshError(r.error), r.next && r.next()})
                }).catch(function(n)
                {
                    if(t._isConnected())
                    {
                        if(n instanceof m)
                        {
                            t._failUnauthorized();
                            return
                        }
                        t.emit("error", {
                            type: "refreshToken",
                            error: {code: 6, message: n !== void 0 ? n.toString() : ""}
                        }), t._refreshTimeout = setTimeout(() => t._refresh(), t._getRefreshRetryDelay())
                    }
                })
            }

            _refreshError(e)
            {
                e.code < 100 || e.temporary === !0 ? (this.emit("error", {
                    type: "refresh",
                    error: e
                }), this._refreshTimeout = setTimeout(() => this._refresh(), this._getRefreshRetryDelay())) : this._disconnect(e.code, e.message, !1)
            }

            _getRefreshRetryDelay(){return S(0, 5e3, 1e4)}

            _refreshResponse(e){this._refreshTimeout && (clearTimeout(this._refreshTimeout), this._refreshTimeout = null), e.expires && (this._client = e.client, this._refreshTimeout = setTimeout(() => this._refresh(), x(e.ttl)))}

            _removeSubscription(e){e !== null && delete this._subs[e.channel]}

            _unsubscribe(e)
            {
                if(!this._transportIsOpen)
                {
                    return Promise.resolve();
                }
                let n = {unsubscribe: {channel: e.channel}}, i = this;
                return new Promise((a, c) =>
                {this._call(n, !1).then(u => {a(), u.next && u.next()}, u => {a(), u.next && u.next(), i._disconnect(4, "unsubscribe error", !0)})})
            }

            _getSub(e)
            {
                let t = this._subs[e];
                return t || null
            }

            _isServerSub(e){return this._serverSubs[e] !== void 0}

            _sendSubscribeCommands()
            {
                let e = [];
                for(let t in this._subs)
                {
                    if(!this._subs.hasOwnProperty(t))
                    {
                        continue;
                    }
                    let n = this._subs[t];
                    if(n._inflight !== !0 && n.state === "subscribing")
                    {
                        let i = n._subscribe();
                        i && e.push(i)
                    }
                }
                return e
            }

            _connectResponse(e)
            {
                if(this._transportIsOpen = !0, this._transportWasOpen = !0, this._reconnectAttempts = 0, this._refreshRequired = !1, this._isConnected())
                {
                    return;
                }
                this._client = e.client, this._setState("connected"), this._refreshTimeout && clearTimeout(this._refreshTimeout), e.expires && (this._refreshTimeout = setTimeout(() => this._refresh(), x(e.ttl))), this._session = e.session, this._node = e.node, this.startBatching(), this._sendSubscribeCommands(), this.stopBatching();
                let t = {client: e.client, transport: this._transport.subName()};
                e.data && (t.data = e.data), this.emit("connected", t), this._resolvePromises(), this._processServerSubs(e.subs || {}), e.ping && e.ping > 0 ? (this._serverPing = e.ping * 1e3, this._sendPong = e.pong === !0, this._waitServerPing()) : this._serverPing = 0
            }

            _processServerSubs(e)
            {
                for(let t in e)
                {
                    if(!e.hasOwnProperty(t))
                    {
                        continue;
                    }
                    let n = e[t];
                    this._serverSubs[t] = {offset: n.offset, epoch: n.epoch, recoverable: n.recoverable || !1};
                    let i = this._getSubscribeContext(t, n);
                    this.emit("subscribed", i)
                }
                for(let t in e)
                {
                    if(!e.hasOwnProperty(t))
                    {
                        continue;
                    }
                    let n = e[t];
                    if(n.recovered)
                    {
                        let i = n.publications;
                        if(i && i.length > 0)
                        {
                            for(let r in i) i.hasOwnProperty(r) && this._handlePublication(t, i[r])
                        }
                    }
                }
                for(let t in this._serverSubs) this._serverSubs.hasOwnProperty(t) && (e[t] || (this.emit("unsubscribed", {channel: t}), delete this._serverSubs[t]))
            }

            _clearRefreshTimeout(){this._refreshTimeout !== null && (clearTimeout(this._refreshTimeout), this._refreshTimeout = null)}

            _clearReconnectTimeout(){this._reconnectTimeout !== null && (clearTimeout(this._reconnectTimeout), this._reconnectTimeout = null)}

            _clearServerPingTimeout(){this._serverPingTimeout !== null && (clearTimeout(this._serverPingTimeout), this._serverPingTimeout = null)}

            _waitServerPing(){this._config.maxServerPingDelay !== 0 && this._isConnected() && (this._clearServerPingTimeout(), this._serverPingTimeout = setTimeout(() => {this._isConnected() && this._disconnect(2, "no ping", !0)}, this._serverPing + this._config.maxServerPingDelay))}

            _getSubscribeContext(e, t)
            {
                let n = {
                    channel: e,
                    positioned: !1,
                    recoverable: !1,
                    wasRecovering: !1,
                    recovered: !1
                };
                t.recovered && (n.recovered = !0), t.positioned && (n.positioned = !0), t.recoverable && (n.recoverable = !0), t.was_recovering && (n.wasRecovering = !0);
                let i = "";
                "epoch" in t && (i = t.epoch);
                let r = 0;
                return "offset" in t && (r = t.offset), (n.positioned || n.recoverable) && (n.streamPosition = {
                    offset: r,
                    epoch: i
                }), t.data && (n.data = t.data), n
            }

            _handleReply(e, t)
            {
                let n = e.id;
                if(!(n in this._callbacks))
                {
                    t();
                    return
                }
                let i = this._callbacks[n];
                if(clearTimeout(this._callbacks[n].timeout), delete this._callbacks[n], te(e))
                {
                    let r = i.errback;
                    if(!r)
                    {
                        t();
                        return
                    }
                    let a = e.error;
                    r({error: a, next: t})
                } else
                {
                    let r = i.callback;
                    if(!r)
                    {
                        return;
                    }
                    r({reply: e, next: t})
                }
            }

            _handleJoin(e, t)
            {
                let n = this._getSub(e);
                if(!n)
                {
                    if(this._isServerSub(e))
                    {
                        let i = {channel: e, info: this._getJoinLeaveContext(t.info)};
                        this.emit("join", i)
                    }
                    return
                }
                n._handleJoin(t)
            }

            _handleLeave(e, t)
            {
                let n = this._getSub(e);
                if(!n)
                {
                    if(this._isServerSub(e))
                    {
                        let i = {channel: e, info: this._getJoinLeaveContext(t.info)};
                        this.emit("leave", i)
                    }
                    return
                }
                n._handleLeave(t)
            }

            _handleUnsubscribe(e, t)
            {
                let n = this._getSub(e);
                if(!n)
                {
                    this._isServerSub(e) && (delete this._serverSubs[e], this.emit("unsubscribed", {channel: e}));
                    return
                }
                t.code < 2500 ? n._setUnsubscribed(t.code, t.reason, !1) : n._setSubscribing(t.code, t.reason)
            }

            _handleSubscribe(e, t)
            {
                this._serverSubs[e] = {
                    offset: t.offset,
                    epoch: t.epoch,
                    recoverable: t.recoverable || !1
                }, this.emit("subscribed", this._getSubscribeContext(e, t))
            }

            _handleDisconnect(e)
            {
                let t = e.code, n = !0;
                (t >= 3500 && t < 4e3 || t >= 4500 && t < 5e3) && (n = !1), this._disconnect(t, e.reason, n)
            }

            _getPublicationContext(e, t)
            {
                let n = {channel: e, data: t.data};
                return t.offset && (n.offset = t.offset), t.info && (n.info = this._getJoinLeaveContext(t.info)), t.tags && (n.tags = t.tags), n
            }

            _getJoinLeaveContext(e)
            {
                let t = {client: e.client, user: e.user};
                return e.conn_info && (t.connInfo = e.conn_info), e.chan_info && (t.chanInfo = e.chan_info), t
            }

            _handlePublication(e, t)
            {
                let n = this._getSub(e);
                if(!n)
                {
                    if(this._isServerSub(e))
                    {
                        let i = this._getPublicationContext(e, t);
                        this.emit("publication", i), t.offset !== void 0 && (this._serverSubs[e].offset = t.offset)
                    }
                    return
                }
                n._handlePublication(t)
            }

            _handleMessage(e){this.emit("message", {data: e.data})}

            _handleServerPing(e)
            {
                if(this._sendPong)
                {
                    let t = {};
                    this._transportSendCommands([t])
                }
                e()
            }

            _handlePush(e, t)
            {
                let n = e.channel;
                e.pub ? this._handlePublication(n, e.pub) : e.message ? this._handleMessage(e.message) : e.join ? this._handleJoin(n, e.join) : e.leave ? this._handleLeave(n, e.leave) : e.unsubscribe ? this._handleUnsubscribe(n, e.unsubscribe) : e.subscribe ? this._handleSubscribe(n, e.subscribe) : e.disconnect && this._handleDisconnect(e.disconnect), t()
            }

            _flush()
            {
                let e = this._commands.slice(0);
                this._commands = [], this._transportSendCommands(e)
            }

            _createErrorObject(e, t, n)
            {
                let i = {code: e, message: t};
                return n && (i.temporary = !0), i
            }

            _registerCall(e, t, n)
            {
                this._callbacks[e] = {
                    callback: t,
                    errback: n,
                    timeout: null
                }, this._callbacks[e].timeout = setTimeout(() => {delete this._callbacks[e], M(n) && n({error: this._createErrorObject(1, "timeout")})}, this._config.timeout)
            }

            _addCommand(e){this._batching ? this._commands.push(e) : this._transportSendCommands([e])}

            _nextPromiseId(){return ++this._promiseId}

            _nextTransportId(){return ++this._transportId}

            _resolvePromises(){for(let e in this._promises) this._promises.hasOwnProperty(e) && (this._promises[e].timeout && clearTimeout(this._promises[e].timeout), this._promises[e].resolve(), delete this._promises[e])}

            _rejectPromises(e){for(let t in this._promises) this._promises.hasOwnProperty(t) && (this._promises[t].timeout && clearTimeout(this._promises[t].timeout), this._promises[t].reject(e), delete this._promises[t])}
        };
    g.SubscriptionState = R;
    g.State = k;
    g.UnauthorizedError = m;
    globalThis.Centrifuge = g;
})();
//# sourceMappingURL=centrifuge.js.map