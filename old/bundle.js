(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var HackerAPI, XMLHttpRequest, api, callback, token,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

XMLHttpRequest = require('xhr2');

HackerAPI = (function() {
  function HackerAPI(token) {
    this.token = token;
    this.userId = null;
    this.apiServer = "https://hackerapi.com/v1";
    this.sync = false;
  }

  HackerAPI.prototype.getToken = function(username, password, callback) {
    var req;
    req = {};
    req.method = 'POST';
    req.endpoint = '/auth/user';
    req.callback = callback;
    req.payload = {
      username: username,
      password: password
    };
    return this.makeRequest(req);
  };

  HackerAPI.prototype.setToken = function(token) {
    return this.token = token;
  };

  HackerAPI.prototype.getCurrentUserInfo = function(callback) {
    var req;
    req = {};
    req.endpoint = "/users/me";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getUserInfo = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/users/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getUserFiles = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/users/" + id + "/files";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getUserResume = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/users/" + id + "/resume";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.updateUser = function(id, payload, callback) {
    var req;
    req = {};
    req.method = 'PUT';
    req.payload = payload;
    req.endpoint = "/users/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getTeamInfo = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/teams/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.joinTeam = function(team_id, callback) {
    var req;
    req = {};
    req.method = "PUT";
    req.endpoint = "/teams/" + team_id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.createTeam = function(event_slug, callback) {
    var req;
    req = {};
    req.method = "POST";
    req.endpoint = "/events/" + event_slug + "/teams";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.leaveTeam = function(id, callback) {
    var req;
    req = {};
    req.method = "DELETE";
    req.endpoint = "/teams/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getPipelineInfo = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/pipelines/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getPipelineClaims = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/pipelines/" + id + "/claims";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getPipelineFields = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/pipelines/" + id + "/fields";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getPipelineFieldById = function(id, field_id, callback) {
    var req;
    req = {};
    req.endpoint = "/pipelines/" + id + "/fields/" + field_id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getClaimInfo = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/claims/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getFileInfo = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/files/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getFileDownload = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/files/" + id + "/download";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getInstitutionInfo = function(id, callback) {
    var req;
    req = {};
    req.endpoint = "/institutions/" + id;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.createInstitution = function(payload, callback) {
    var ref, req, types;
    if (payload.name == null) {
      throw "Institution name missing";
    }
    if (payload.institution_type == null) {
      throw "Institution type missing";
    }
    if (payload.country_code == null) {
      throw "Missing country code";
    }
    types = ['post-secondary', "high_school", "middle_school", "other"];
    if (ref = payload.institution_type, indexOf.call(types, ref) < 0) {
      throw "Invalid institution type";
    }
    if (payload.country_code.length !== 2) {
      throw "Invalid country code";
    }
    req = {};
    req.method = 'POST';
    req.payload = {
      name: payload.name,
      institution_type: payload.institution_type,
      country_code: payload.country_code
    };
    req.endpoint = "/institutions";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getEventInfo = function(slug, callback) {
    var req;
    req = {};
    req.endpoint = "/events/" + slug;
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.getEventSignups = function(slug, callback) {
    var req;
    req = {};
    req.endpoint = "/events/" + slug + "/signups";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.uploadFile = function(evet_slug, payload, callback) {
    var ref, req, types;
    if (typeof event_slug === "undefined" || event_slug === null) {
      throw "Event slug missing";
    }
    if (payload.file == null) {
      throw "File missing";
    }
    if (payload.type == null) {
      throw "File type missing.";
    }
    types = ['resume', "receipt", "form", "other"];
    if (ref = payload.type, indexOf.call(types, ref) < 0) {
      throw "Invalid file type";
    }
    req = {};
    req.method = 'POST';
    req.payload = {
      file: payload.file,
      type: payload.type
    };
    req.endpoint = "/events/" + slug + "/upload";
    req.callback = callback;
    return this.makeRequest(req);
  };

  HackerAPI.prototype.searchInstitutions = function(query, callback) {
    var req;
    req = {};
    req.params = {
      q: query
    };
    req.callback = callback;
    req.endpoint = "/search/institutions";
    return this.makeRequest(req);
  };

  HackerAPI.prototype.makeRequest = function(arg) {
    var callback, endpoint, method, params, payload, ref, self, url, xhr;
    ref = arg != null ? arg : {}, endpoint = ref.endpoint, method = ref.method, params = ref.params, payload = ref.payload, callback = ref.callback;
    if (method == null) {
      method = 'GET';
    }
    if (params == null) {
      params = {};
    }
    if (payload == null) {
      payload = null;
    }
    self = this;
    if (this.token) {
      params.token = this.token;
    }
    params = this.serialize(params);
    url = "" + this.apiServer + endpoint + "?" + params;
    xhr = new XMLHttpRequest;
    xhr.open(method, url, !this.sync);
    if (method === 'POST' || method === 'PUT') {
      if (payload) {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(payload));
      } else {
        xhr.send();
      }
    } else {
      xhr.send();
    }
    if (this.sync) {
      return this.parseReponse(xhr.responseText);
    }
    return xhr.onreadystatechange = function() {
      var json;
      if (xhr.readyState === 4) {
        json = self.parseReponse(xhr.responseText);
        return callback(json);
      }
    };
  };

  HackerAPI.prototype.parseReponse = function(data) {
    var error, json;
    try {
      json = JSON.parse(data);
    } catch (error) {
      json = {
        "success": false,
        "message": "Could not parse response JSON"
      };
    }
    return json;
  };

  HackerAPI.prototype.serialize = function(obj) {
    var p, param, str;
    str = [];
    for (p in obj) {
      param = encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]);
      str.push(param);
    }
    return str.join("&");
  };

  return HackerAPI;

})();

token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzM5MTUyOTgsImlkIjoyLCJldnQiOlsxXSwidHlwIjoidXNyIn0.USfHFAJ_AYw4hP-wAjiVSWiXbwxPwWLjzzC5oXhVCws";

api = new HackerAPI(token);

callback = console.log;
console.log(HackerAPI);
console.log("hello");

},{"xhr2":2}],2:[function(require,module,exports){
module.exports = XMLHttpRequest;

},{}]},{},[1]);
