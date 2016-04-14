# pechivo.js

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
[v1.0.0 Minified](https://raw.githubusercontent.com/evgv/pechivo/master/src/build/pechivo.min.js) (~ 2.47 KB)                          
[v1.0.0 Unminified](https://raw.githubusercontent.com/evgv/pechivo/master/src/build/pechivo.js) (~ 10.4 KB)


## API Reference

**Properties**  
[Expires](#expires)                                                                                                                   
[Path](#path)                                                                                                                         
[Domain](#domain)                                                                                                                     
[Secure](#secure)                                                                                                                     

**Additional properties**                                                                                                             
[Debug](#debyg)                                                                                                                       
[Encode](#encode)                                                                                                                     

**Methods**  
[pechivo.initialize(options)](#pechivo-initialize)  
[pechivo.resetOptions()](#pechivo-resetoptions)  
[pechivo.set(key, value [, options])](#pechivo-set)  
[pechivo.get(key)](#pechivo-get)  
[pechivo.unset(key)](#pechivo-unset)

### Properties

#### Expires
A number (of seconds), a number parsable string, or a `Date` object of when the cookie will expire. By default is 0 (session cookie).

**Example Usage**
```javascript
pechivo.expires = 3600; // Expires number format 1 hour
pechivo.expires = '3600'; // Expires string format 1 hour
pechivo.expires = new Date(2020, 0, 1); // Expires at Wed Jan 01 2020 00:00:00 GMT+0200
```

#### Path
A string value of the path of the cookie. By default is '/'.

**Example Usage**
```javascript
pechivo.path = '/'; // Path for all pages
pechivo.path = '/cart'; // Path only for /cart page
pechivo.path = '/success'; // Path only for /success page
```

#### Domain
A string value of the domain of the cookie. By default is equal to current domain. 

**Example Usage**
```javascript
pechivo.domain = 'www.example.com'; // Set www.example.com as default domain
```
#### Secure
A boolean value of whether or not the cookie should only be available over SSL. By default is _false_.
_Just now it deprecated and dosen't use._

**Example Usage**
```javascript
pechivo.secure = true; // enable
pechivo.secure = false; // disable
```
### Additional properties

#### Debug
Enable debug option set show in console information about create/delee cookie.

**Example Usage**
```javascript
pechivo.debug = false; // disable
pechivo.debug = true; // enable
```
#### Encode
Set encode cookie _encodeUri()_ value (encode by default), you can disable/enable this option.

**Example Usage**
```javascript
pechivo.encode = false; // disable
pechivo.encode = true; // enable
```

### Methods

#### pechivo.initialize(options)

Set default options for all new cookies

**Example Usage**
```javascript

// Initialize all options 
pechivo.initialize({
    expires : 3600, 
    path : '/', 
    domain : 'www.example.com',
});

// Initialize expires
pechivo.initialize({
    expires : 3600, 
});

``` 
And now all new cookies withot options has this options as default.
Also can reset all options to default with `pechivo.resetOptions` method.

#### pechivo.resetOptions()

Unset all setted cookies options to deafault.

**Example Usage**
```javascript

// Reset options to deafult 
pechivo.resetOptions();

``` 

#### pechivo.set(key, value [, options])

Sets a cookie in the document. If the cookie already exist, it will be rewrite it.

| Option    | Description                                                                                        | Default     |
| --------: | -------------------------------------------------------------------------------------------------- | ----------- |
| *expires* | A number (of seconds), a number parsable string, or a `Date` object of when the cookie will expire | `0`         |
| *path*    | A string value of the path of the cookie                                                           | `/`         |
| *domain*  | A string value of the domain of the cookie                                                         | `empty`     |
| *secure*  | A boolean value of whether or not the cookie should only be available over SSL  (deprecated)       | `false`     |

Also can reset all options to default with `pechivo.resetOptions` method.

**Example Usage**
```javascript

// Setting a cookie value
pechivo.set('key', 'value');

// Setting cookies with additional options
pechivo.set('key', 'value', { domain: 'www.example.com'});

// Setting cookies with expiration values
pechivo.set('key', 'value', { expires: 3600 }); // Expires in 1 hour
pechivo.set('key', 'value', { expires: '3600' }); // Expires in 1 hour
pechivo.set('key', 'value', { expires: new Date(2020, 0, 1) }); // Expires at Wed Jan 01 2020 00:00:00 GMT+0200


// Using the alias
pechivo('key', 'value', { secure: true });
```

#### pechivo.get(key)

Returns the value of the most locally scoped cookie with the specified key.

**Example Usage**
```javascript

// Get the cookie value
pechivo.get('key'); // "value"
```

If `key` is empty ` pechivo()` method return all locally scoped cookies as JSON object.

**Example Usage**
```javascript
// Get all cookies
pechivo.get(); // cookies [{id : id, name  : name, value : value},{...}]
```  
    
#### pechivo.unset(key)

Unse the most locally scoped cookie with the specified key.

**Example Usage**
```javascript

// Unset the cookie 
pechivo.unset('key');
``` 
    
