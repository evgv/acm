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
- [v1.0.0 Minified]() (~ KB gzipped)
- [v1.0.0 Unminified]() (~ KB gzipped)


## API Reference

**Properties**  
[expires](#pechivo.expires)  
[pechivo.path](#path)
[pechivo.domain](#domain)
[pechivo.secure](#secure)

**Methods**  
[pechivo.initialize(options)](#pechivo-initialize)  
[pechivo.resetOptions()](#pechivo-resetoptions)  
[pechivo.set(key, value [, options])](#pechivo-set)  
[pechivo.get(key)](#pechivo-get)  
[pechivo.unset(key)](#pechivo-unset)

### Properties

#### pechivo.expires
*Alias: pechivo.expires*

#### pechivo.path
*Alias:  pechivo.path*

#### pechivo.domain
*Alias: pechivo.domain*

#### pechivo.secure
*Alias: pechivo.secure*

#### pechivo.encode
*Alias: pechivo.encode*

#### pechivo.debug
*Alias: pechivo.debug*


### Methods

#### pechivo.initialize(options)
*Alias: pechivo.initialize(options)*

Set default options for all new cookies

**Example Usage**
```javascript

// Initialize options 
pechivo.initialize({
    expires : 3600, 
    path : '/', 
    domain : 'www.example.com',
    secure : true
});

``` 
And now all new cookies withot options has this options as default.
Also can reset all options to default with `pechivo.resetOptions` method.

#### pechivo.resetOptions()
*Alias: pechivo.resetOptions()*

Unset all setted cookies options to deafault.

**Example Usage**
```javascript

// Reset options to deafult 
pechivo.resetOptions();

``` 

#### pechivo.set(key, value [, options])
*Alias: pechivo(key, value [, options])*

Sets a cookie in the document. If the cookie already exist, it will be rewrite it.

| Option    | Description                                                                                        | Default     |
| --------: | -------------------------------------------------------------------------------------------------- | ----------- |
| *expires* | A number (of seconds), a number parsable string, or a `Date` object of when the cookie will expire | `0`         |
| *path*    | A string value of the path of the cookie                                                           | `/`         |
| *domain*  | A string value of the domain of the cookie                                                         | `empty`     |
| *secure*  | A boolean value of whether or not the cookie should only be available over SSL                     | `false`     |

Also can reset all options to default with `pechivo.resetOptions` method.

**Example Usage**
```javascript
// Setting a cookie value
pechivo.set('key', 'value');

// Setting cookies with additional options
pechivo.set('key', 'value', { domain: 'www.example.com', secure: true });

// Setting cookies with expiration values
pechivo.set('key', 'value', { expires: 3600 }); // Expires in 1 hour
pechivo.set('key', 'value', { expires: '3600' }); // Expires in 1 hour
pechivo.set('key', 'value', { expires: new Date(2020, 0, 1) }); // Expires at Wed Jan 01 2020 00:00:00 GMT+0200


// Using the alias
pechivo('key', 'value', { secure: true });
```

#### pechivo.get(key)
*Alias: pechivo.get(key)*

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
*Alias: pechivo.unset(key)*

Unse the most locally scoped cookie with the specified key.

**Example Usage**
```javascript

// Unset the cookie 
pechivo.unset('key');
``` 
    