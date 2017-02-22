# Advanced Cookie Manager

## v 1.1.4 (02192017)

Small client-side javascript library that makes managing cookies easy.

[Features](#features)  
[Browser Compatibility](#browser-compatibility)  
[Getting the Library](#getting-the-library)  
[API Reference](#api-reference)

## Features
- [RFC6265](http://www.rfc-editor.org/rfc/rfc6265.txt) compliant
- Cross browser
- Lightweight
- No dependencies

## Browser Compatibility
The following browsers have passed all of the automated Cookies.js tests:
- Chrome
- Firefox 3+
- Safari 4+
- Opera 10+
- Internet Explorer 6+

## Getting the Library
#### Direct downloads
[v1.1.4](https://raw.githubusercontent.com/evgv/acm/master/src/build/acm.js) (~ 13.94 KB)
[v1.1.4 Minified](https://raw.githubusercontent.com/evgv/acm/master/src/build/acm.min.js) (~ 2.52 KB)


## API Reference                                                                                                                   

**Methods**  
[acm.initialize(options)](#initialize)  
[acm.set(key, value, options = {})](#set)  
[acm.get(key)](#get)  
[acm.unset(key)](#unset)

### Properties

#### Expires
A number (of seconds), a number parsable string, or a `Date` object of when the cookie will expire. By default is 0 (session cookie).

**Example Usage**
```javascript
acm.expires = 3600; // Expires number format 1 hour
acm.expires = '3600'; // Expires string format 1 hour
acm.expires = new Date(2020, 0, 1); // Expires at Wed Jan 01 2020 00:00:00 GMT+0200
```

#### Path
A string value of the path of the cookie. By default is '/'.

**Example Usage**
```javascript
acm.path = '/'; // Path for all pages
acm.path = '/cart'; // Path only for /cart page
acm.path = '/success'; // Path only for /success page
```

#### Domain
A string value of the domain of the cookie. By default is equal to current domain.

**Example Usage**
```javascript
acm.domain = 'www.example.com'; // Set www.example.com as default domain
```
#### Secure
A boolean value of whether or not the cookie should only be available over SSL. By default is _false_.

_Just now it deprecated and dosen't use._


### Additional properties

#### Debug
Enable debug option set show in console information about create/delee cookie.

**Example Usage**
```javascript
acm.debug = false; // disable
acm.debug = true; // enable
```
#### Encode
Set encode cookie _encodeUri()_ value (encode by default), you can disable/enable this option.

**Example Usage**
```javascript
acm.encode = false; // disable
acm.encode = true; // enable
```

### Methods

#### acm.initialize(options)

Set default options for all new cookies

**Example Usage**
```javascript

// Initialize all options
acm.initialize({
    expires : 3600,
    path : '/',
    domain : 'www.example.com',
});

// Initialize expires
acm.initialize({
    expires : 3600,
});

```
And now all new cookies without options has this options as default.

#### acm.set(key, value [, options])

Sets a cookie in the document. If the cookie already exist, it will be rewrite it.

| Option    | Description                                                                                        | Default     |
| --------: | -------------------------------------------------------------------------------------------------- | ----------- |
| *expires* | A number (of seconds), a number parsable string, or a `Date` object of when the cookie will expire | `0`         |
| *path*    | A string value of the path of the cookie                                                           | `/`         |
| *domain*  | A string value of the domain of the cookie                                                         | `empty`     |
| *secure*  | A boolean value of whether or not the cookie should only be available over SSL  (deprecated)       | `false`     |

**Example Usage**
```javascript

// Setting a cookie value
acm.set('key', 'value');

// Setting cookies with additional options
acm.set('key', 'value', { domain: 'www.example.com'});

// Setting cookies with expiration values
acm.set('key', 'value', { expires: 3600 }); // Expires in 1 hour
acm.set('key', 'value', { expires: '3600' }); // Expires in 1 hour
acm.set('key', 'value', { expires: new Date(2020, 0, 1) }); // Expires at Wed Jan 01 2020 00:00:00 GMT+0200

```

#### acm.get(key)

Returns the value of the most locally scoped cookie with the specified key.

**Example Usage**
```javascript

// Get the cookie value
acm.get('key'); // "value"
```

If `key` is empty ` acm()` method return all locally scoped cookies as array of items (cookies).

**Example Usage**
```javascript

// Get all cookies
acm.get(); // [[name  : name, value : value], [...], ...}]

```  

#### acm.unset(key)

Unse the most locally scoped cookie with the specified key.

**Example Usage**
```javascript

// Unset the cookie
acm.unset('key');
```
