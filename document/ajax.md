#Ajax without jQuery

##AJAX

###AJAX promise api examples
```javascript
ajax('/path/to/api')
  .get({"page": 1, "count": 10})
  .then(function(response) {
    var result = JSON.parse(response);
    // success
  })
  .catch(function(xhr, status, error) {
    // error
  });
```

###AJAX examples
```javascript
ajax('/path/to/api')
  .get({"page": 1, "count": 10})
  .done(function(response) {
    var result = JSON.parse(response);
    // success
  })
  .fail(function(xhr, status, error) {
    // error
  });
```

##AJA
Asynchronous JavaScript And JSON(P), Ajax without XML

###API
####`.url(path)`
ajax request path
####`.data(data)`
ajax request send data
####`.method(method)`
methods:
+ `GET`|`get`
+ `POST`|`post`
+ `PUT`|`put`
+ `DELETE`|`delete`
####`.cache(useCache)`
whether use cache or not, either `true` or `false`
####`.on(event, handler)`
events:
+ `success`
+ `fail`|`error`
+ `complete`
+ `load`
+ `progress`
####`.type(dataType)`
date types:
+ `JSON`|`json`
+ `TEXT`|`text`
+ `HTML`|`html`

###AJA examples
```javascript
aja()
  .url('/path/to/api')
  .data({"page": 1, "count": 10})
  .method("GET")
  .cache(false)
  .on({
    "success": function(response) {
      var result = JSON.parse(response);
      // success
    },
    "error": function(error) {
      // error
    }
  })
```
