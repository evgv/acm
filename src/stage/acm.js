/**
 * acm v1.1.4
 * Advanced Cookie Manager
 * https://github.com/evgv/acm
 *
 * Copyright 2017 Zubkov Evgen
 * Released under the MIT
 */



/**
 *
 * Create scope for acm.js
 +
 * @param {object}    global      - window
 * @param {object}    environment - navigator
 * @param {undefined} undefined   - undefined
 */
(function (global, environment, undefined) {

    "use strict";

    /**
     * Factory method
     *
     * @throws {Error}  acm.js requires a `window` with a `document` object
     * @throws {Error}  acm.js requires a cookie enabled
     * @param  {object} window
     * @param  {object} navigator
     */
    var factory = function (window, navigator) {

        /**
         * Check window object on exist
         */
        if (typeof window.document !== "object") {
            throw new Error("acm.js requires a `window` with a `document` object");
        }

        /**
         * Check cookie enabled
         */
        if (navigator.cookieEnabled !== true) {
            throw new Error("acm.js requires a cookie enabled");
        }

        /**
         * Main instance
         */
        var acm = function () {

            /**
             * PRIVATE VARIABLES AND FUNCTIONS
             * ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE
             */

            /**
             * Lifetime of the session cookie, defined in seconds.
             * @param {string|number|data} expires
             */
            var expires = 0;

            /**
             * Path on the domain where the cookie will work.
             * Use a single slash ("/") for all paths on the domain.
             * @param {string} path
             */
            var path = "/";

            /**
             * Cookie domain, for example "www.example.com".
             * To make cookies visible on all subdomains then the domain must be prefixed with a dot like ".example.com".
             * @param {string} domain
             */
            var domain = "";

            /**
             * If TRUE cookie will only be sent over secure connections.
             *
             * Deprecated on this monent and dosen't use
             *
             * @param {boolean|string} secure
             */
            var secure = false;

            /**
             * Encode cookie value
             * @param {boolean} encode
             */
            var encode = true;

            /**
             * Debug logs
             */
            var debug = false;

            /**
             * Retrieve all cookies as JSON
             *
             * Object format
             *
             * cookies [{
             *     id    : id,
             *     name  : name,
             *     value : value
             * },{...}]
             *
             *
             * @return {object} all retrieved cookies as array
             */
            function getAll() {

                var list = document.cookie.split(";"),
                        cookies = [];

                list.forEach(function (item, i, list) {
                    cookies.push({
                        "name": item.split("=")[0].length ? item.split("=")[0] : "",
                        "value": item.split("=")[1].length ? decodeURIComponent(item.split("=")[1]) : ""
                    });
                });

                return cookies;
            };

            /**
             * Set cookie expires param from setted param or get default value
             * @param   {object} options cookie options
             * @return  {object} options prepared cookie options
             */
            function setExpires(options) {

                var expiresParam = options.hasOwnProperty("expires") ? options.expires : expires;

                if (expiresParam === -1) {
                    options.expires = "Thu, 01 Jan 1970 00:00:01 GMT";
                } else {
                    if (
                            typeof expiresParam === "string" &&
                            Number(expiresParam)
                            ) {
                        expiresParam = Number(expiresParam);
                    }

                    if (typeof expiresParam === "number") {
                        var d = new Date();
                        d.setTime(d.getTime() + expiresParam);
                        options.expires = d;
                    }

                    if (
                            typeof expiresParam === "object" &&
                            expires.toUTCString
                            ) {
                        options.expires = expires.toUTCString();
                    }
                }

                return options;
            };

            /**
             * Set cookie domain param from setted param or get current host
             * @param   {object} options cookie options
             * @return  {object} options prepared cookie options
             */
            function setDomain(options) {

                var domainParam = options.hasOwnProperty("domain") ? options.domain : domain;

                if (domainParam) {
                    options.domain = domainParam;
                    // } else {
                    //     var host = window.location.hostname;
                    //     if(host) {
                    //         options.domain = host;
                    //     }
                }

                return options;
            };

            /**
             * Set cookie path param from setted param or get default value "/"
             * @param   {object} options cookie options
             * @return {object} options prepared cookie options
             */
            function setPath(options) {

                var pathParam = options.hasOwnProperty("path") ? options.path : path;

                if (pathParam) {
                    options.path = pathParam;
                }

                return options;
            };

            /**
             * Set cookie expires param from setted param or get default value
             *
             * Deprecated on this moment and dosen't use
             *
             * @param   {object} options cookie options
             * @return {object} options prepared cookie options
             */
            function setSecure(options) {

                var secureParam = options.hasOwnProperty("secure") ? options.secure : secure;

                if (typeof secureParam !== "undefined") {
                    options.secure = secureParam;
                }

                return options;
            };

            /**
             * Endcode value if encode param is set true
             * @param   {string} value will be encoded with encodeURIComponent
             * @return {string} prepared value
             */
            function encodeValue(value) {

                if (encode !== "undefined" && encode) {
                    value = encodeURIComponent(value);
                }

                return value;
            };


            /**
             * PRIVILEGED METHODS
             * MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS
             * MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS
             */

            /**
             * Initialize object variables
             *
             * @param {object} options
             * @return {object} acm
             */
            this.initialize = function (options) {

                var self = new acm();

                if (options.hasOwnProperty("expires")) {
                    expires = options.expires;
                }

                if (options.hasOwnProperty("path")) {
                    path = options.path;
                }

                if (options.hasOwnProperty("domain")) {
                    domain = options.domain;
                }

                if (options.hasOwnProperty("encode")) {
                    encode = options.encode;
                }

                if (options.hasOwnProperty("debug")) {
                    debug = options.debug;
                }

                if (debug) {
                    console.group("debug");
                    console.time("Initialization time took");
                }

                if (typeof options !== "object") {
                    return;
                }

                if (debug) {
                    console.timeEnd("Initialization time took");
                    console.groupEnd();
                }

                return self;
            };

            /**
             * Retrieve cookie value by name.
             * If name is empty return all cookies as array
             *
             * @param   {string} name  cookie name
             * @return  {string}       cookie value
             */
            this.get = function (name) {

                if (typeof name !== "undefined") {
                    var expression = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"),
                            matches = document.cookie.match(expression);

                    return matches ? decodeURIComponent(matches[1]) : undefined;
                } else {
                    return getAll();
                }
            };

            /**
             * Set cookie by name, value and options
             *
             * @param {string} name         cookie name
             * @param {string} value        cookie value
             * @param {object} options      cookie options
             */
            this.set = function (name, value, options) {

                if (typeof name !== "undefined" && typeof value !== "undefined") {

                    options = options || {};

                    options = setExpires(options);
                    options = setDomain(options);
                    options = setPath(options);
                    // options = setSecure(options);

                    var updatedCookie = name + "=" + encodeValue(value);

                    /* set cookie options for cookie update */
                    for (var propName in options) {

                        updatedCookie += "; " + propName;
                        var propValue = options[propName];
                        if (propValue !== true) {
                            updatedCookie += "=" + propValue;
                        }
                    }

                    try {
                        document.cookie = updatedCookie;

                        if (debug) {
                            console.log("%c Cookie with name \"" + name + "\" and value \"" + value + "\" was created", "background: #000; color: #ffff00");
                        }

                        return updatedCookie;

                    } catch (e) {
                        console.warn(e);
                    }
                }
            };

            /**
             * Unset cookie by name
             * @param {string} name cookie name
             */
            this.unset = function (name) {

                var self = this,
                        options = {"expires": -1};

                self.set(name, "", options);

                if (!self.get(name)) {

                    if (debug) {
                        console.log("%c Cookie with name \"" + name + "\" successful deleted.", "background: #000; color: #ffff00");
                    }

                    return true;
                } else {
                    return false;
                }
            };

        };

        /**
         * Return main insance
         */
        return new acm();

    };

    /**
     * Create acm instance
     */
    var acmExport = (
            typeof global.document === "object" &&
            typeof global.navigator === "object"
            ) ? factory(global, environment) : factory;



    /**
     * AMD support
     */
    if (typeof define === "function" && define.amd) {

        define(function () {
            return acmExport;
        });

        /**
         * CommonJS / Node.js support
         */
    } else if (typeof exports === "object") {

        /**
         * Support Node.js specific `module.exports` (which can be a function)
         */
        if (typeof module === "object" && typeof module.exports === "object") {
            exports = module.exports = acmExport;
        }

        /**
         * But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
         */
        exports.acm = acmExport;

        /**
         * Native JS export
         */
    } else {

        global.acm = acmExport;
    }

})(typeof window === "undefined" ? this : window, navigator);
