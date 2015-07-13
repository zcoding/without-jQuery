# require('utils')

getXMLHttpRequest = ()->
   if window.XMLHttpRequest
      new window.XMLHttpRequest
   else
       try
          new ActiveXObject("MSXML2.XMLHTTP.3.0")
       catch(ex)
          null

Ajax = (url) ->

  core =
    ajax: (method, url, args) ->
      http = getXMLHttpRequest()
      data = null
      argsType = typeof args

      if argsType is 'string'
        if method is 'POST' or method is 'PUT'
          data = args
        else
          url += '?' + args
      else if argsType isnt 'undefined'
        if method is 'POST' or method is 'PUT'
          data = utils.query.stringify(args)
        else
          url += '?' + utils.query.stringify(args)

      http.open(method, url, true)

      if method is 'POST' or method is 'PUT'
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

      http.onreadystatechange = ()->
        if http.readyState is 4 # complete
          if 200 <= http.status < 400
            # done
          else
            # fail
      http.send data
      api

    api =
      done: ()->
        this
      fail: ()->
        this

  return {
    get: (data)->
      core.ajax('GET', url, data)
    post: (data)->
      core.ajax('POST', url, data)
    put: (data)->
      core.ajax('PUT', url, data)
    delete: (data)
      core.ajax('DELETE', url, data)
  }
