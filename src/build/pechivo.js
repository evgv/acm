/**
 * pechivo v1.0.0
 * https://github.com/evgv/pechivo
 *
 * Copyright 2016 Zubkov Evgen
 * Released under the GNU GPL
 */



/**
 *
 * Create scope for pechivo.js
 +
 * @param {object}    global      - window
 * @param {object}    environment - navigator
 * @param {undefined} undefined   - undefined
 */
(function (global, environment, undefined) {
    
    'use strict';
    
    /**
     * Factory method 
     * 
     * @throws {Error}  pechivo.js requires a `window` with a `document` object' 
     * @throws {Error}  pechivo.js requires a cookie enabled
     * @param  {object} window
     * @param  {object} navigator 
     */
    var factory = function (window, navigator) {
        
        /**
         * Check window object on exist
         */
        if (typeof window.document !== 'object') {
            throw new Error('pechivo.js requires a `window` with a `document` object');
        }

        /**
         * Check cookie enabled
         */
        if (navigator.cookieEnabled !== true) {
            throw new Error('pechivo.js requires a cookie enabled');
        }
        
        /**
         * Main instance
         */
        var pechivo = function() {}
        
        /**
         * Lifetime of the session cookie, defined in seconds. 
         * @param {string|number|data} expires
         */
        pechivo.expires = 0;

        /**
         * Path on the domain where the cookie will work. 
         * Use a single slash ('/') for all paths on the domain.
         * @param {string} path 
         */
        pechivo.path = '/';

        /**
         * Cookie domain, for example 'www.example.com'.
         * To make cookies visible on all subdomains then the domain must be prefixed with a dot like '.example.com'.
         * @param {string} domain
         */
        pechivo.domain = '';

        /**
         * If TRUE cookie will only be sent over secure connections.
         * @param {boolean|string} secure
         */
        pechivo.secure = false;

        /**
         * Encode cookie value
         * @param {boolean} encode 
         */
        pechivo.encode = true;
        
        /**
         * Debug logs
         */
        pechivo.debug = false;
                
        /**
         * Reset options
         */
        pechivo.resetOptions = function() {
            this.expires = 0;
            this.path    = '/';
            this.domain  = '';
            this.secure  = false;
        };
        
        /**
         * Initialize object variables
         * 
         * @param {object} options
         */
        pechivo.initialize = function(options) {
            
            if(typeof options !== 'object') {
                return;
            }
            
            for (var key in options){
                if (options.hasOwnProperty(key) && pechivo.hasOwnProperty(key)) {
                    pechivo.key = options[key];
                    
                    if(this.debug) {
                        
                        console.log('%c ' + key + ' = ' +  options[key], 'background: #000; color: #ffff00');
                    }
                }
            }
 
        };
         

        /**
         * Retrieve cookie value by name.
         * If name is empty return all cookies as array
         * 
         * @param   {string} name  cookie name
         * @returns {string}       cookie value
         */
        pechivo.get = function(name) {

            if(typeof name !== 'undefined') {
                var expression = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"),
               matches = document.cookie.match(expression);

                return matches ? decodeURIComponent(matches[1]) : undefined;
            } else {
                return this.__getAll();
            }

        };
        
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
         * @returns {object} all retrieved cookies as array
         */
        pechivo.__getAll = function() {

            var list      = document.cookie.split(';'),
                jsonArray = { cookies: [] };      

            list.forEach(function(item, i, list) {

                jsonArray.cookies.push({ 
                        'id'    : i, 
                        'name'  : item.split('=')[0].length ? item.split('=')[0] : '',
                        'value' : item.split('=')[1].length ? decodeURIComponent(item.split('=')[1]) : ''
                    });

            });
            
            return jsonArray;
        };

        /**
         * Set cookie by name, value and options
         * 
         * @param {string} name         cookie name
         * @param {string} value        cookie value
         * @param {object} options={}   cookie options
         */
        pechivo.set = function(name, value, options) {

            if(typeof name !== 'undefined' && typeof value !== 'undefined') {
                
                options = options || {};
                
                options = this.__setExpires(options);
                options = this.__setDomain(options);
                options = this.__setPath(options);
                options = this.__setSecure(options);

                var updatedCookie = name + "=" + this.__encode(value);

                /* set cookie options for cookie update */
                for (var propName in options) {
                    
                    updatedCookie += "; " + propName;
                    var propValue = options[propName];
                    if (propValue !== true) {
                        updatedCookie += "=" + propValue;
                    }
                }

                document.cookie = updatedCookie;
                
                if(this.debug && value) {
                    
                    console.log('%c Cookie with name ' + name + ' and value ' + value + ' was created/updated', 'background: #000; color: #ffff00');
                }
            }
        };

        /**
         * Set cookie expires param from setted param or get default value
         * @param   {object} options cookie options
         * @returns {object} options prepared cookie options
         */
        pechivo.__setExpires = function(options) {

            var expires = options.expires ? options.expires : this.expires;
            
            if (typeof expires === "string" && Number(expires)) {
                
                expires =  Number(expires);
            }

            if (typeof expires === "number") {
                
                var d = new Date();
                d.setTime(d.getTime() + expires);
                options.expires = d;
            }

            if (typeof expires === "object" && expires.toUTCString) {
                
                options.expires = expires.toUTCString();
            }

            return options;
        };

        /**
         * Set cookie domain param from setted param or get current host
         * @param   {object} options cookie options
         * @returns {object} options prepared cookie options
         */
        pechivo.__setDomain = function(options) {

          var domain = options.domain ? options.domain : this.domain;

            if (domain) {
                
                options.domain = domain;
            } else {
                
                var host = window.location.hostname;
                if(host) {
                    
                    options.domain = host;
                }
            }

            return options;
        };

        /**
         * Set cookie path param from setted param or get default value '/'
         * @param   {object} options cookie options
         * @returns {object} options prepared cookie options
         */
        pechivo.__setPath = function(options) {

            var path = options.path ? options.path : this.path;

            if (path)  {
                
                options.path = path;
            }

            return options;
        };

        /**
         * Set cookie expires param from setted param or get default value
         * @param   {object} options cookie options
         * @returns {object} options prepared cookie options
         */
        pechivo.__setSecure = function(options) {

            var secure = options.secure ? options.secure : this.secure;

            if (typeof secure !== 'undefined') {
                
                options.secure = secure;
            } 

            return options;
        };

        /**
         * Endcode value if encode param is set true
         * @param   {string} value will be encoded with encodeURIComponent
         * @returns {string} prepared value
         */
        pechivo.__encode = function(value) {

            if (this.encode !== 'undefined' && this.encode) {
                
                value = encodeURIComponent(value);
            }

            return value;
        };

        /**
         * Unset cookie by name
         * @param {string} name cookie name
         */
        pechivo.unset = function(name) {

            var options = {expires : -1, path : '/'};
            this.set(name, '', options);
            
            if(this.debug) {
                
                console.log('%c Cookie with name ' + name + ' deleted.', 'background: #000; color: #ffff00');
            }

        };
        
        
        /**
         * Return main insance
         */
        return pechivo;

    };
    
    /**
     * Create pechivo instance 
     */
    var pechivoExport = typeof global.document === 'object' ? factory(global, environment) : factory;
    
    
    
    /**
     * AMD support
     */
    if (typeof define === 'function' && define.amd) {
        
        define(function () { 
            return pechivoExport; 
        });
        
    /**
     * CommonJS / Node.js support
     */
    } else if (typeof exports === 'object') {
        
       /**
        * Support Node.js specific `module.exports` (which can be a function)
        */
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = pechivoExport;
        }
        
       /**
        * But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        */
        exports.pechivo = pechivoExport;
        
    /**
     * Native JS export 
     */
    } else {
        
        global.pechivo = pechivoExport;
    }
    
})(typeof window === 'undefined' ? this : window, navigator);
