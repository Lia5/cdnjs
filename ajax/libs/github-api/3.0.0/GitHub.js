(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GitHub = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * A Gist can retrieve and modify gists.
 */
var Gist = function (_Requestable) {
  _inherits(Gist, _Requestable);

  /**
   * Create a Gist.
   * @param {string} id - the id of the gist (not required when creating a gist)
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Gist(id, auth, apiBase) {
    _classCallCheck(this, Gist);

    var _this = _possibleConstructorReturn(this, (Gist.__proto__ || Object.getPrototypeOf(Gist)).call(this, auth, apiBase));

    _this.__id = id;
    return _this;
  }

  /**
   * Fetch a gist.
   * @see https://developer.github.com/v3/gists/#get-a-single-gist
   * @param {Requestable.callback} [cb] - will receive the gist
   * @return {Promise} - the Promise for the http request
   */


  _createClass(Gist, [{
    key: 'read',
    value: function read(cb) {
      return this._request('GET', '/gists/' + this.__id, null, cb);
    }

    /**
     * Create a new gist.
     * @see https://developer.github.com/v3/gists/#create-a-gist
     * @param {Object} gist - the data for the new gist
     * @param {Requestable.callback} [cb] - will receive the new gist upon creation
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'create',
    value: function create(gist, cb) {
      var _this2 = this;

      return this._request('POST', '/gists', gist, cb).then(function (response) {
        _this2.__id = response.data.id;
        return response;
      });
    }

    /**
     * Delete a gist.
     * @see https://developer.github.com/v3/gists/#delete-a-gist
     * @param {Requestable.callback} [cb] - will receive true if the request succeeds
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'delete',
    value: function _delete(cb) {
      return this._request('DELETE', '/gists/' + this.__id, null, cb);
    }

    /**
     * Fork a gist.
     * @see https://developer.github.com/v3/gists/#fork-a-gist
     * @param {Requestable.callback} [cb] - the function that will receive the gist
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'fork',
    value: function fork(cb) {
      return this._request('POST', '/gists/' + this.__id + '/forks', null, cb);
    }

    /**
     * Update a gist.
     * @see https://developer.github.com/v3/gists/#edit-a-gist
     * @param {Object} gist - the new data for the gist
     * @param {Requestable.callback} [cb] - the function that receives the API result
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'update',
    value: function update(gist, cb) {
      return this._request('PATCH', '/gists/' + this.__id, gist, cb);
    }

    /**
     * Star a gist.
     * @see https://developer.github.com/v3/gists/#star-a-gist
     * @param {Requestable.callback} [cb] - will receive true if the request is successful
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'star',
    value: function star(cb) {
      return this._request('PUT', '/gists/' + this.__id + '/star', null, cb);
    }

    /**
     * Unstar a gist.
     * @see https://developer.github.com/v3/gists/#unstar-a-gist
     * @param {Requestable.callback} [cb] - will receive true if the request is successful
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'unstar',
    value: function unstar(cb) {
      return this._request('DELETE', '/gists/' + this.__id + '/star', null, cb);
    }

    /**
     * Check if a gist is starred by the user.
     * @see https://developer.github.com/v3/gists/#check-if-a-gist-is-starred
     * @param {Requestable.callback} [cb] - will receive true if the gist is starred and false if the gist is not starred
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'isStarred',
    value: function isStarred(cb) {
      return this._request204or404('/gists/' + this.__id + '/star', null, cb);
    }

    /**
     * List the gist's comments
     * @see https://developer.github.com/v3/gists/comments/#list-comments-on-a-gist
     * @param {Requestable.callback} [cb] - will receive the array of comments
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listComments',
    value: function listComments(cb) {
      return this._requestAllPages('/gists/' + this.__id + '/comments', null, cb);
    }

    /**
     * Fetch one of the gist's comments
     * @see https://developer.github.com/v3/gists/comments/#get-a-single-comment
     * @param {number} comment - the id of the comment
     * @param {Requestable.callback} [cb] - will receive the comment
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'getComment',
    value: function getComment(comment, cb) {
      return this._request('GET', '/gists/' + this.__id + '/comments/' + comment, null, cb);
    }

    /**
     * Comment on a gist
     * @see https://developer.github.com/v3/gists/comments/#create-a-comment
     * @param {string} comment - the comment to add
     * @param {Requestable.callback} [cb] - the function that receives the API result
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'createComment',
    value: function createComment(comment, cb) {
      return this._request('POST', '/gists/' + this.__id + '/comments', { body: comment }, cb);
    }

    /**
     * Edit a comment on the gist
     * @see https://developer.github.com/v3/gists/comments/#edit-a-comment
     * @param {number} comment - the id of the comment
     * @param {string} body - the new comment
     * @param {Requestable.callback} [cb] - will receive the modified comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editComment',
    value: function editComment(comment, body, cb) {
      return this._request('PATCH', '/gists/' + this.__id + '/comments/' + comment, { body: body }, cb);
    }

    /**
     * Delete a comment on the gist.
     * @see https://developer.github.com/v3/gists/comments/#delete-a-comment
     * @param {number} comment - the id of the comment
     * @param {Requestable.callback} [cb] - will receive true if the request succeeds
     * @return {Promise} - the Promise for the http request
     */

  }, {
    key: 'deleteComment',
    value: function deleteComment(comment, cb) {
      return this._request('DELETE', '/gists/' + this.__id + '/comments/' + comment, null, cb);
    }
  }]);

  return Gist;
}(_Requestable3.default);

module.exports = Gist;

},{"./Requestable":9}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/* eslint valid-jsdoc: ["error", {"requireReturnDescription": false}] */

var _Gist = require('./Gist');

var _Gist2 = _interopRequireDefault(_Gist);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _Issue = require('./Issue');

var _Issue2 = _interopRequireDefault(_Issue);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _RateLimit = require('./RateLimit');

var _RateLimit2 = _interopRequireDefault(_RateLimit);

var _Repository = require('./Repository');

var _Repository2 = _interopRequireDefault(_Repository);

var _Organization = require('./Organization');

var _Organization2 = _interopRequireDefault(_Organization);

var _Team = require('./Team');

var _Team2 = _interopRequireDefault(_Team);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * GitHub encapsulates the functionality to create various API wrapper objects.
 */
var GitHub = function () {
  /**
   * Create a new GitHub.
   * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
   *                                  not provided requests will be made unauthenticated
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function GitHub(auth) {
    var apiBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://api.github.com';

    _classCallCheck(this, GitHub);

    this.__apiBase = apiBase;
    this.__auth = auth || {};
  }

  /**
   * Create a new Gist wrapper
   * @param {number} [id] - the id for the gist, leave undefined when creating a new gist
   * @return {Gist}
   */


  _createClass(GitHub, [{
    key: 'getGist',
    value: function getGist(id) {
      return new _Gist2.default(id, this.__auth, this.__apiBase);
    }

    /**
     * Create a new User wrapper
     * @param {string} [user] - the name of the user to get information about
     *                        leave undefined for the authenticated user
     * @return {User}
     */

  }, {
    key: 'getUser',
    value: function getUser(user) {
      return new _User2.default(user, this.__auth, this.__apiBase);
    }

    /**
     * Create a new Organization wrapper
     * @param {string} organization - the name of the organization
     * @return {Organization}
     */

  }, {
    key: 'getOrganization',
    value: function getOrganization(organization) {
      return new _Organization2.default(organization, this.__auth, this.__apiBase);
    }

    /**
     * create a new Team wrapper
     * @param {string} teamId - the name of the team
     * @return {team}
     */

  }, {
    key: 'getTeam',
    value: function getTeam(teamId) {
      return new _Team2.default(teamId, this.__auth, this.__apiBase);
    }

    /**
     * Create a new Repository wrapper
     * @param {string} user - the user who owns the respository
     * @param {string} repo - the name of the repository
     * @return {Repository}
     */

  }, {
    key: 'getRepo',
    value: function getRepo(user, repo) {
      return new _Repository2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
    }

    /**
     * Create a new Issue wrapper
     * @param {string} user - the user who owns the respository
     * @param {string} repo - the name of the repository
     * @return {Issue}
     */

  }, {
    key: 'getIssues',
    value: function getIssues(user, repo) {
      return new _Issue2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
    }

    /**
     * Create a new Search wrapper
     * @param {string} query - the query to search for
     * @return {Search}
     */

  }, {
    key: 'search',
    value: function search(query) {
      return new _Search2.default(query, this.__auth, this.__apiBase);
    }

    /**
     * Create a new RateLimit wrapper
     * @return {RateLimit}
     */

  }, {
    key: 'getRateLimit',
    value: function getRateLimit() {
      return new _RateLimit2.default(this.__auth, this.__apiBase);
    }

    /**
     * Create a new Markdown wrapper
     * @return {Markdown}
     */

  }, {
    key: 'getMarkdown',
    value: function getMarkdown() {
      return new _Markdown2.default(this.__auth, this.__apiBase);
    }

    /**
     * Create a new Project wrapper
     * @param {string} id - the id of the project
     * @return {Markdown}
     */

  }, {
    key: 'getProject',
    value: function getProject(id) {
      return new _Project2.default(id, this.__auth, this.__apiBase);
    }

    /**
     * Computes the full repository name
     * @param {string} user - the username (or the full name)
     * @param {string} repo - the repository name, must not be passed if `user` is the full name
     * @return {string} the repository's full name
     */

  }, {
    key: '_getFullName',
    value: function _getFullName(user, repo) {
      var fullname = user;

      if (repo) {
        fullname = user + '/' + repo;
      }

      return fullname;
    }
  }]);

  return GitHub;
}();

module.exports = GitHub;

},{"./Gist":1,"./Issue":3,"./Markdown":4,"./Organization":5,"./Project":6,"./RateLimit":7,"./Repository":8,"./Search":10,"./Team":11,"./User":12}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Issue wraps the functionality to get issues for repositories
 */
var Issue = function (_Requestable) {
  _inherits(Issue, _Requestable);

  /**
   * Create a new Issue
   * @param {string} repository - the full name of the repository (`:user/:repo`) to get issues for
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Issue(repository, auth, apiBase) {
    _classCallCheck(this, Issue);

    var _this = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, auth, apiBase));

    _this.__repository = repository;
    return _this;
  }

  /**
   * Create a new issue
   * @see https://developer.github.com/v3/issues/#create-an-issue
   * @param {Object} issueData - the issue to create
   * @param {Requestable.callback} [cb] - will receive the created issue
   * @return {Promise} - the promise for the http request
   */


  _createClass(Issue, [{
    key: 'createIssue',
    value: function createIssue(issueData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/issues', issueData, cb);
    }

    /**
     * List the issues for the repository
     * @see https://developer.github.com/v3/issues/#list-issues-for-a-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of issues
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssues',
    value: function listIssues(options, cb) {
      return this._requestAllPages('/repos/' + this.__repository + '/issues', options, cb);
    }

    /**
     * List the events for an issue
     * @see https://developer.github.com/v3/issues/events/#list-events-for-an-issue
     * @param {number} issue - the issue to get events for
     * @param {Requestable.callback} [cb] - will receive the list of events
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssueEvents',
    value: function listIssueEvents(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/events', null, cb);
    }

    /**
     * List comments on an issue
     * @see https://developer.github.com/v3/issues/comments/#list-comments-on-an-issue
     * @param {number} issue - the id of the issue to get comments from
     * @param {Requestable.callback} [cb] - will receive the comments
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssueComments',
    value: function listIssueComments(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/comments', null, cb);
    }

    /**
     * Get a single comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#get-a-single-comment
     * @param {number} id - the comment id to get
     * @param {Requestable.callback} [cb] - will receive the comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getIssueComment',
    value: function getIssueComment(id, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
    }

    /**
     * Comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#create-a-comment
     * @param {number} issue - the id of the issue to comment on
     * @param {string} comment - the comment to add
     * @param {Requestable.callback} [cb] - will receive the created comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createIssueComment',
    value: function createIssueComment(issue, comment, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/issues/' + issue + '/comments', { body: comment }, cb);
    }

    /**
     * Edit a comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#edit-a-comment
     * @param {number} id - the comment id to edit
     * @param {string} comment - the comment to edit
     * @param {Requestable.callback} [cb] - will receive the edited comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editIssueComment',
    value: function editIssueComment(id, comment, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/issues/comments/' + id, { body: comment }, cb);
    }

    /**
     * Delete a comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#delete-a-comment
     * @param {number} id - the comment id to delete
     * @param {Requestable.callback} [cb] - will receive true if the request is successful
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteIssueComment',
    value: function deleteIssueComment(id, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
    }

    /**
     * Edit an issue
     * @see https://developer.github.com/v3/issues/#edit-an-issue
     * @param {number} issue - the issue number to edit
     * @param {Object} issueData - the new issue data
     * @param {Requestable.callback} [cb] - will receive the modified issue
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editIssue',
    value: function editIssue(issue, issueData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/issues/' + issue, issueData, cb);
    }

    /**
     * Get a particular issue
     * @see https://developer.github.com/v3/issues/#get-a-single-issue
     * @param {number} issue - the issue number to fetch
     * @param {Requestable.callback} [cb] - will receive the issue
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getIssue',
    value: function getIssue(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue, null, cb);
    }

    /**
     * List the milestones for the repository
     * @see https://developer.github.com/v3/issues/milestones/#list-milestones-for-a-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of milestones
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listMilestones',
    value: function listMilestones(options, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/milestones', options, cb);
    }

    /**
     * Get a milestone
     * @see https://developer.github.com/v3/issues/milestones/#get-a-single-milestone
     * @param {string} milestone - the id of the milestone to fetch
     * @param {Requestable.callback} [cb] - will receive the milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getMilestone',
    value: function getMilestone(milestone, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
    }

    /**
     * Create a new milestone
     * @see https://developer.github.com/v3/issues/milestones/#create-a-milestone
     * @param {Object} milestoneData - the milestone definition
     * @param {Requestable.callback} [cb] - will receive the milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createMilestone',
    value: function createMilestone(milestoneData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/milestones', milestoneData, cb);
    }

    /**
     * Edit a milestone
     * @see https://developer.github.com/v3/issues/milestones/#update-a-milestone
     * @param {string} milestone - the id of the milestone to edit
     * @param {Object} milestoneData - the updates to make to the milestone
     * @param {Requestable.callback} [cb] - will receive the updated milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editMilestone',
    value: function editMilestone(milestone, milestoneData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/milestones/' + milestone, milestoneData, cb);
    }

    /**
     * Delete a milestone (this is distinct from closing a milestone)
     * @see https://developer.github.com/v3/issues/milestones/#delete-a-milestone
     * @param {string} milestone - the id of the milestone to delete
     * @param {Requestable.callback} [cb] - will receive the status
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteMilestone',
    value: function deleteMilestone(milestone, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
    }

    /**
     * Create a new label
     * @see https://developer.github.com/v3/issues/labels/#create-a-label
     * @param {Object} labelData - the label definition
     * @param {Requestable.callback} [cb] - will receive the object representing the label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createLabel',
    value: function createLabel(labelData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/labels', labelData, cb);
    }

    /**
     * List the labels for the repository
     * @see https://developer.github.com/v3/issues/labels/#list-all-labels-for-this-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of labels
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listLabels',
    value: function listLabels(options, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/labels', options, cb);
    }

    /**
     * Get a label
     * @see https://developer.github.com/v3/issues/labels/#get-a-single-label
     * @param {string} label - the name of the label to fetch
     * @param {Requestable.callback} [cb] - will receive the label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getLabel',
    value: function getLabel(label, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/labels/' + label, null, cb);
    }

    /**
     * Edit a label
     * @see https://developer.github.com/v3/issues/labels/#update-a-label
     * @param {string} label - the name of the label to edit
     * @param {Object} labelData - the updates to make to the label
     * @param {Requestable.callback} [cb] - will receive the updated label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editLabel',
    value: function editLabel(label, labelData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/labels/' + label, labelData, cb);
    }

    /**
     * Delete a label
     * @see https://developer.github.com/v3/issues/labels/#delete-a-label
     * @param {string} label - the name of the label to delete
     * @param {Requestable.callback} [cb] - will receive the status
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteLabel',
    value: function deleteLabel(label, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/labels/' + label, null, cb);
    }
  }]);

  return Issue;
}(_Requestable3.default);

module.exports = Issue;

},{"./Requestable":9}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Renders html from Markdown text
 */
var Markdown = function (_Requestable) {
  _inherits(Markdown, _Requestable);

  /**
   * construct a Markdown
   * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
   * @param {string} [apiBase] - the base Github API URL
   * @return {Promise} - the promise for the http request
   */
  function Markdown(auth, apiBase) {
    _classCallCheck(this, Markdown);

    return _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this, auth, apiBase));
  }

  /**
   * Render html from Markdown text.
   * @see https://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document
   * @param {Object} options - conversion options
   * @param {string} [options.text] - the markdown text to convert
   * @param {string} [options.mode=markdown] - can be either `markdown` or `gfm`
   * @param {string} [options.context] - repository name if mode is gfm
   * @param {Requestable.callback} [cb] - will receive the converted html
   * @return {Promise} - the promise for the http request
   */


  _createClass(Markdown, [{
    key: 'render',
    value: function render(options, cb) {
      return this._request('POST', '/markdown', options, cb);
    }
  }]);

  return Markdown;
}(_Requestable3.default);

module.exports = Markdown;

},{"./Requestable":9}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Organization encapsulates the functionality to create repositories in organizations
 */
var Organization = function (_Requestable) {
  _inherits(Organization, _Requestable);

  /**
   * Create a new Organization
   * @param {string} organization - the name of the organization
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Organization(organization, auth, apiBase) {
    _classCallCheck(this, Organization);

    var _this = _possibleConstructorReturn(this, (Organization.__proto__ || Object.getPrototypeOf(Organization)).call(this, auth, apiBase));

    _this.__name = organization;
    return _this;
  }

  /**
   * Create a repository in an organization
   * @see https://developer.github.com/v3/repos/#create
   * @param {Object} options - the repository definition
   * @param {Requestable.callback} [cb] - will receive the created repository
   * @return {Promise} - the promise for the http request
   */


  _createClass(Organization, [{
    key: 'createRepo',
    value: function createRepo(options, cb) {
      return this._request('POST', '/orgs/' + this.__name + '/repos', options, cb);
    }

    /**
     * List the repositories in an organization
     * @see https://developer.github.com/v3/repos/#list-organization-repositories
     * @param {Requestable.callback} [cb] - will receive the list of repositories
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getRepos',
    value: function getRepos(cb) {
      var requestOptions = this._getOptionsWithDefaults({ direction: 'desc' });

      return this._requestAllPages('/orgs/' + this.__name + '/repos', requestOptions, cb);
    }

    /**
     * Query if the user is a member or not
     * @param {string} username - the user in question
     * @param {Requestable.callback} [cb] - will receive true if the user is a member
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'isMember',
    value: function isMember(username, cb) {
      return this._request204or404('/orgs/' + this.__name + '/members/' + username, null, cb);
    }

    /**
     * List the users who are members of the company
     * @see https://developer.github.com/v3/orgs/members/#members-list
     * @param {object} options - filtering options
     * @param {string} [options.filter=all] - can be either `2fa_disabled` or `all`
     * @param {string} [options.role=all] - can be one of: `all`, `admin`, or `member`
     * @param {Requestable.callback} [cb] - will receive the list of users
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listMembers',
    value: function listMembers(options, cb) {
      return this._request('GET', '/orgs/' + this.__name + '/members', options, cb);
    }

    /**
     * List the Teams in the Organization
     * @see https://developer.github.com/v3/orgs/teams/#list-teams
     * @param {Requestable.callback} [cb] - will receive the list of teams
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getTeams',
    value: function getTeams(cb) {
      return this._requestAllPages('/orgs/' + this.__name + '/teams', undefined, cb);
    }

    /**
     * Create a team
     * @see https://developer.github.com/v3/orgs/teams/#create-team
     * @param {object} options - Team creation parameters
     * @param {string} options.name - The name of the team
     * @param {string} [options.description] - Team description
     * @param {string} [options.repo_names] - Repos to add the team to
     * @param {string} [options.privacy=secret] - The level of privacy the team should have. Can be either one
     * of: `secret`, or `closed`
     * @param {Requestable.callback} [cb] - will receive the created team
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createTeam',
    value: function createTeam(options, cb) {
      return this._request('POST', '/orgs/' + this.__name + '/teams', options, cb);
    }

    /**
     * Get information about all projects
     * @see https://developer.github.com/v3/projects/#list-organization-projects
     * @param {Requestable.callback} [cb] - will receive the list of projects
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listProjects',
    value: function listProjects(cb) {
      return this._requestAllPages('/orgs/' + this.__name + '/projects', { AcceptHeader: 'inertia-preview' }, cb);
    }

    /**
     * Create a new project
     * @see https://developer.github.com/v3/repos/projects/#create-a-project
     * @param {Object} options - the description of the project
     * @param {Requestable.callback} cb - will receive the newly created project
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createProject',
    value: function createProject(options, cb) {
      options = options || {};
      options.AcceptHeader = 'inertia-preview';
      return this._request('POST', '/orgs/' + this.__name + '/projects', options, cb);
    }
  }]);

  return Organization;
}(_Requestable3.default);

module.exports = Organization;

},{"./Requestable":9}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Project encapsulates the functionality to create, query, and modify cards and columns.
 */
var Project = function (_Requestable) {
   _inherits(Project, _Requestable);

   /**
    * Create a Project.
    * @param {string} id - the id of the project
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Project(id, auth, apiBase) {
      _classCallCheck(this, Project);

      var _this = _possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).call(this, auth, apiBase, 'inertia-preview'));

      _this.__id = id;
      return _this;
   }

   /**
    * Get information about a project
    * @see https://developer.github.com/v3/projects/#get-a-project
    * @param {Requestable.callback} cb - will receive the project information
    * @return {Promise} - the promise for the http request
    */


   _createClass(Project, [{
      key: 'getProject',
      value: function getProject(cb) {
         return this._request('GET', '/projects/' + this.__id, null, cb);
      }

      /**
       * Edit a project
       * @see https://developer.github.com/v3/projects/#update-a-project
       * @param {Object} options - the description of the project
       * @param {Requestable.callback} cb - will receive the modified project
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateProject',
      value: function updateProject(options, cb) {
         return this._request('PATCH', '/projects/' + this.__id, options, cb);
      }

      /**
       * Delete a project
       * @see https://developer.github.com/v3/projects/#delete-a-project
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteProject',
      value: function deleteProject(cb) {
         return this._request('DELETE', '/projects/' + this.__id, null, cb);
      }

      /**
       * Get information about all columns of a project
       * @see https://developer.github.com/v3/projects/columns/#list-project-columns
       * @param {Requestable.callback} [cb] - will receive the list of columns
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjectColumns',
      value: function listProjectColumns(cb) {
         return this._requestAllPages('/projects/' + this.__id + '/columns', null, cb);
      }

      /**
       * Get information about a column
       * @see https://developer.github.com/v3/projects/columns/#get-a-project-column
       * @param {string} colId - the id of the column
       * @param {Requestable.callback} cb - will receive the column information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getProjectColumn',
      value: function getProjectColumn(colId, cb) {
         return this._request('GET', '/projects/columns/' + colId, null, cb);
      }

      /**
       * Create a new column
       * @see https://developer.github.com/v3/projects/columns/#create-a-project-column
       * @param {Object} options - the description of the column
       * @param {Requestable.callback} cb - will receive the newly created column
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createProjectColumn',
      value: function createProjectColumn(options, cb) {
         return this._request('POST', '/projects/' + this.__id + '/columns', options, cb);
      }

      /**
       * Edit a column
       * @see https://developer.github.com/v3/projects/columns/#update-a-project-column
       * @param {string} colId - the column id
       * @param {Object} options - the description of the column
       * @param {Requestable.callback} cb - will receive the modified column
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateProjectColumn',
      value: function updateProjectColumn(colId, options, cb) {
         return this._request('PATCH', '/projects/columns/' + colId, options, cb);
      }

      /**
       * Delete a column
       * @see https://developer.github.com/v3/projects/columns/#delete-a-project-column
       * @param {string} colId - the column to be deleted
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteProjectColumn',
      value: function deleteProjectColumn(colId, cb) {
         return this._request('DELETE', '/projects/columns/' + colId, null, cb);
      }

      /**
       * Move a column
       * @see https://developer.github.com/v3/projects/columns/#move-a-project-column
       * @param {string} colId - the column to be moved
       * @param {string} position - can be one of first, last, or after:<column-id>,
       * where <column-id> is the id value of a column in the same project.
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'moveProjectColumn',
      value: function moveProjectColumn(colId, position, cb) {
         return this._request('POST', '/projects/columns/' + colId + '/moves', { position: position }, cb);
      }

      /**
       * Get information about all cards of a project
       * @see https://developer.github.com/v3/projects/cards/#list-project-cards
       * @param {Requestable.callback} [cb] - will receive the list of cards
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjectCards',
      value: function listProjectCards(cb) {
         var _this2 = this;

         return this.listProjectColumns().then(function (_ref) {
            var data = _ref.data;

            return Promise.all(data.map(function (column) {
               return _this2._requestAllPages('/projects/columns/' + column.id + '/cards', null);
            }));
         }).then(function (cardsInColumns) {
            var cards = cardsInColumns.reduce(function (prev, _ref2) {
               var data = _ref2.data;

               prev.push.apply(prev, _toConsumableArray(data));
               return prev;
            }, []);
            if (cb) {
               cb(null, cards);
            }
            return cards;
         }).catch(function (err) {
            if (cb) {
               cb(err);
               return;
            }
            throw err;
         });
      }

      /**
      * Get information about all cards of a column
      * @see https://developer.github.com/v3/projects/cards/#list-project-cards
      * @param {string} colId - the id of the column
      * @param {Requestable.callback} [cb] - will receive the list of cards
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'listColumnCards',
      value: function listColumnCards(colId, cb) {
         return this._requestAllPages('/projects/columns/' + colId + '/cards', null, cb);
      }

      /**
      * Get information about a card
      * @see https://developer.github.com/v3/projects/cards/#get-a-project-card
      * @param {string} cardId - the id of the card
      * @param {Requestable.callback} cb - will receive the card information
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'getProjectCard',
      value: function getProjectCard(cardId, cb) {
         return this._request('GET', '/projects/columns/cards/' + cardId, null, cb);
      }

      /**
      * Create a new card
      * @see https://developer.github.com/v3/projects/cards/#create-a-project-card
      * @param {string} colId - the column id
      * @param {Object} options - the description of the card
      * @param {Requestable.callback} cb - will receive the newly created card
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'createProjectCard',
      value: function createProjectCard(colId, options, cb) {
         return this._request('POST', '/projects/columns/' + colId + '/cards', options, cb);
      }

      /**
      * Edit a card
      * @see https://developer.github.com/v3/projects/cards/#update-a-project-card
      * @param {string} cardId - the card id
      * @param {Object} options - the description of the card
      * @param {Requestable.callback} cb - will receive the modified card
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'updateProjectCard',
      value: function updateProjectCard(cardId, options, cb) {
         return this._request('PATCH', '/projects/columns/cards/' + cardId, options, cb);
      }

      /**
      * Delete a card
      * @see https://developer.github.com/v3/projects/cards/#delete-a-project-card
      * @param {string} cardId - the card to be deleted
      * @param {Requestable.callback} cb - will receive true if the operation is successful
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'deleteProjectCard',
      value: function deleteProjectCard(cardId, cb) {
         return this._request('DELETE', '/projects/columns/cards/' + cardId, null, cb);
      }

      /**
      * Move a card
      * @see https://developer.github.com/v3/projects/cards/#move-a-project-card
      * @param {string} cardId - the card to be moved
      * @param {string} position - can be one of top, bottom, or after:<card-id>,
      * where <card-id> is the id value of a card in the same project.
      * @param {string} colId - the id value of a column in the same project.
      * @param {Requestable.callback} cb - will receive true if the operation is successful
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'moveProjectCard',
      value: function moveProjectCard(cardId, position, colId, cb) {
         return this._request('POST', '/projects/columns/cards/' + cardId + '/moves', { position: position, column_id: colId }, // eslint-disable-line camelcase
         cb);
      }
   }]);

   return Project;
}(_Requestable3.default);

module.exports = Project;

},{"./Requestable":9}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * RateLimit allows users to query their rate-limit status
 */
var RateLimit = function (_Requestable) {
  _inherits(RateLimit, _Requestable);

  /**
   * construct a RateLimit
   * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
   * @param {string} [apiBase] - the base Github API URL
   * @return {Promise} - the promise for the http request
   */
  function RateLimit(auth, apiBase) {
    _classCallCheck(this, RateLimit);

    return _possibleConstructorReturn(this, (RateLimit.__proto__ || Object.getPrototypeOf(RateLimit)).call(this, auth, apiBase));
  }

  /**
   * Query the current rate limit
   * @see https://developer.github.com/v3/rate_limit/
   * @param {Requestable.callback} [cb] - will receive the rate-limit data
   * @return {Promise} - the promise for the http request
   */


  _createClass(RateLimit, [{
    key: 'getRateLimit',
    value: function getRateLimit(cb) {
      return this._request('GET', '/rate_limit', null, cb);
    }
  }]);

  return RateLimit;
}(_Requestable3.default);

module.exports = RateLimit;

},{"./Requestable":9}],8:[function(require,module,exports){
(function (Buffer){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _utf = require('utf8');

var _utf2 = _interopRequireDefault(_utf);

var _jsBase = require('js-base64');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:repository');

/**
 * Respository encapsulates the functionality to create, query, and modify files.
 */

var Repository = function (_Requestable) {
   _inherits(Repository, _Requestable);

   /**
    * Create a Repository.
    * @param {string} fullname - the full name of the repository
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Repository(fullname, auth, apiBase) {
      _classCallCheck(this, Repository);

      var _this = _possibleConstructorReturn(this, (Repository.__proto__ || Object.getPrototypeOf(Repository)).call(this, auth, apiBase));

      _this.__fullname = fullname;
      _this.__currentTree = {
         branch: null,
         sha: null
      };
      return _this;
   }

   /**
    * Get a reference
    * @see https://developer.github.com/v3/git/refs/#get-a-reference
    * @param {string} ref - the reference to get
    * @param {Requestable.callback} [cb] - will receive the reference's refSpec or a list of refSpecs that match `ref`
    * @return {Promise} - the promise for the http request
    */


   _createClass(Repository, [{
      key: 'getRef',
      value: function getRef(ref, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
      }

      /**
       * Create a reference
       * @see https://developer.github.com/v3/git/refs/#create-a-reference
       * @param {Object} options - the object describing the ref
       * @param {Requestable.callback} [cb] - will receive the ref
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createRef',
      value: function createRef(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/git/refs', options, cb);
      }

      /**
       * Delete a reference
       * @see https://developer.github.com/v3/git/refs/#delete-a-reference
       * @param {string} ref - the name of the ref to delte
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteRef',
      value: function deleteRef(ref, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
      }

      /**
       * Delete a repository
       * @see https://developer.github.com/v3/repos/#delete-a-repository
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteRepo',
      value: function deleteRepo(cb) {
         return this._request('DELETE', '/repos/' + this.__fullname, null, cb);
      }

      /**
       * List the tags on a repository
       * @see https://developer.github.com/v3/repos/#list-tags
       * @param {Requestable.callback} [cb] - will receive the tag data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listTags',
      value: function listTags(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/tags', null, cb);
      }

      /**
       * List the open pull requests on the repository
       * @see https://developer.github.com/v3/pulls/#list-pull-requests
       * @param {Object} options - options to filter the search
       * @param {Requestable.callback} [cb] - will receive the list of PRs
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listPullRequests',
      value: function listPullRequests(options, cb) {
         options = options || {};
         return this._request('GET', '/repos/' + this.__fullname + '/pulls', options, cb);
      }

      /**
       * Get information about a specific pull request
       * @see https://developer.github.com/v3/pulls/#get-a-single-pull-request
       * @param {number} number - the PR you wish to fetch
       * @param {Requestable.callback} [cb] - will receive the PR from the API
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getPullRequest',
      value: function getPullRequest(number, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number, null, cb);
      }

      /**
       * List the files of a specific pull request
       * @see https://developer.github.com/v3/pulls/#list-pull-requests-files
       * @param {number|string} number - the PR you wish to fetch
       * @param {Requestable.callback} [cb] - will receive the list of files from the API
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listPullRequestFiles',
      value: function listPullRequestFiles(number, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number + '/files', null, cb);
      }

      /**
       * Compare two branches/commits/repositories
       * @see https://developer.github.com/v3/repos/commits/#compare-two-commits
       * @param {string} base - the base commit
       * @param {string} head - the head commit
       * @param {Requestable.callback} cb - will receive the comparison
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'compareBranches',
      value: function compareBranches(base, head, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/compare/' + base + '...' + head, null, cb);
      }

      /**
       * List all the branches for the repository
       * @see https://developer.github.com/v3/repos/#list-branches
       * @param {Requestable.callback} cb - will receive the list of branches
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listBranches',
      value: function listBranches(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/branches', null, cb);
      }

      /**
       * Get a raw blob from the repository
       * @see https://developer.github.com/v3/git/blobs/#get-a-blob
       * @param {string} sha - the sha of the blob to fetch
       * @param {Requestable.callback} cb - will receive the blob from the API
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getBlob',
      value: function getBlob(sha, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/blobs/' + sha, null, cb, 'raw');
      }

      /**
       * Get a single branch
       * @see https://developer.github.com/v3/repos/branches/#get-branch
       * @param {string} branch - the name of the branch to fetch
       * @param {Requestable.callback} cb - will receive the branch from the API
       * @returns {Promise} - the promise for the http request
       */

   }, {
      key: 'getBranch',
      value: function getBranch(branch, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/branches/' + branch, null, cb);
      }

      /**
       * Get a commit from the repository
       * @see https://developer.github.com/v3/repos/commits/#get-a-single-commit
       * @param {string} sha - the sha for the commit to fetch
       * @param {Requestable.callback} cb - will receive the commit data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getCommit',
      value: function getCommit(sha, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/commits/' + sha, null, cb);
      }

      /**
       * List the commits on a repository, optionally filtering by path, author or time range
       * @see https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
       * @param {Object} [options] - the filtering options for commits
       * @param {string} [options.sha] - the SHA or branch to start from
       * @param {string} [options.path] - the path to search on
       * @param {string} [options.author] - the commit author
       * @param {(Date|string)} [options.since] - only commits after this date will be returned
       * @param {(Date|string)} [options.until] - only commits before this date will be returned
       * @param {Requestable.callback} cb - will receive the list of commits found matching the criteria
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listCommits',
      value: function listCommits(options, cb) {
         options = options || {};

         options.since = this._dateToISO(options.since);
         options.until = this._dateToISO(options.until);

         return this._request('GET', '/repos/' + this.__fullname + '/commits', options, cb);
      }

      /**
       * Gets a single commit information for a repository
       * @see https://developer.github.com/v3/repos/commits/#get-a-single-commit
       * @param {string} ref - the reference for the commit-ish
       * @param {Requestable.callback} cb - will receive the commit information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getSingleCommit',
      value: function getSingleCommit(ref, cb) {
         ref = ref || '';
         return this._request('GET', '/repos/' + this.__fullname + '/commits/' + ref, null, cb);
      }

      /**
       * Get tha sha for a particular object in the repository. This is a convenience function
       * @see https://developer.github.com/v3/repos/contents/#get-contents
       * @param {string} [branch] - the branch to look in, or the repository's default branch if omitted
       * @param {string} path - the path of the file or directory
       * @param {Requestable.callback} cb - will receive a description of the requested object, including a `SHA` property
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getSha',
      value: function getSha(branch, path, cb) {
         branch = branch ? '?ref=' + branch : '';
         return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path + branch, null, cb);
      }

      /**
       * List the commit statuses for a particular sha, branch, or tag
       * @see https://developer.github.com/v3/repos/statuses/#list-statuses-for-a-specific-ref
       * @param {string} sha - the sha, branch, or tag to get statuses for
       * @param {Requestable.callback} cb - will receive the list of statuses
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listStatuses',
      value: function listStatuses(sha, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/commits/' + sha + '/statuses', null, cb);
      }

      /**
       * Get a description of a git tree
       * @see https://developer.github.com/v3/git/trees/#get-a-tree
       * @param {string} treeSHA - the SHA of the tree to fetch
       * @param {Requestable.callback} cb - will receive the callback data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getTree',
      value: function getTree(treeSHA, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/trees/' + treeSHA, null, cb);
      }

      /**
       * Create a blob
       * @see https://developer.github.com/v3/git/blobs/#create-a-blob
       * @param {(string|Buffer|Blob)} content - the content to add to the repository
       * @param {Requestable.callback} cb - will receive the details of the created blob
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createBlob',
      value: function createBlob(content, cb) {
         var postBody = this._getContentObject(content);

         log('sending content', postBody);
         return this._request('POST', '/repos/' + this.__fullname + '/git/blobs', postBody, cb);
      }

      /**
       * Get the object that represents the provided content
       * @param {string|Buffer|Blob} content - the content to send to the server
       * @return {Object} the representation of `content` for the GitHub API
       */

   }, {
      key: '_getContentObject',
      value: function _getContentObject(content) {
         if (typeof content === 'string') {
            log('contet is a string');
            return {
               content: _utf2.default.encode(content),
               encoding: 'utf-8'
            };
         } else if (typeof Buffer !== 'undefined' && content instanceof Buffer) {
            log('We appear to be in Node');
            return {
               content: content.toString('base64'),
               encoding: 'base64'
            };
         } else if (typeof Blob !== 'undefined' && content instanceof Blob) {
            log('We appear to be in the browser');
            return {
               content: _jsBase.Base64.encode(content),
               encoding: 'base64'
            };
         } else {
            // eslint-disable-line
            log('Not sure what this content is: ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)) + ', ' + JSON.stringify(content));
            throw new Error('Unknown content passed to postBlob. Must be string or Buffer (node) or Blob (web)');
         }
      }

      /**
       * Update a tree in Git
       * @see https://developer.github.com/v3/git/trees/#create-a-tree
       * @param {string} baseTreeSHA - the SHA of the tree to update
       * @param {string} path - the path for the new file
       * @param {string} blobSHA - the SHA for the blob to put at `path`
       * @param {Requestable.callback} cb - will receive the new tree that is created
       * @return {Promise} - the promise for the http request
       * @deprecated use {@link Repository#createTree} instead
       */

   }, {
      key: 'updateTree',
      value: function updateTree(baseTreeSHA, path, blobSHA, cb) {
         var newTree = {
            base_tree: baseTreeSHA, // eslint-disable-line
            tree: [{
               path: path,
               sha: blobSHA,
               mode: '100644',
               type: 'blob'
            }]
         };

         return this._request('POST', '/repos/' + this.__fullname + '/git/trees', newTree, cb);
      }

      /**
       * Create a new tree in git
       * @see https://developer.github.com/v3/git/trees/#create-a-tree
       * @param {Object} tree - the tree to create
       * @param {string} baseSHA - the root sha of the tree
       * @param {Requestable.callback} cb - will receive the new tree that is created
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createTree',
      value: function createTree(tree, baseSHA, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/git/trees', {
            tree: tree,
            base_tree: baseSHA }, cb);
      }

      /**
       * Add a commit to the repository
       * @see https://developer.github.com/v3/git/commits/#create-a-commit
       * @param {string} parent - the SHA of the parent commit
       * @param {string} tree - the SHA of the tree for this commit
       * @param {string} message - the commit message
       * @param {Requestable.callback} cb - will receive the commit that is created
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'commit',
      value: function commit(parent, tree, message, cb) {
         var _this2 = this;

         var data = {
            message: message,
            tree: tree,
            parents: [parent]
         };

         return this._request('POST', '/repos/' + this.__fullname + '/git/commits', data, cb).then(function (response) {
            _this2.__currentTree.sha = response.data.sha; // Update latest commit
            return response;
         });
      }

      /**
       * Update a ref
       * @see https://developer.github.com/v3/git/refs/#update-a-reference
       * @param {string} ref - the ref to update
       * @param {string} commitSHA - the SHA to point the reference to
       * @param {boolean} force - indicates whether to force or ensure a fast-forward update
       * @param {Requestable.callback} cb - will receive the updated ref back
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateHead',
      value: function updateHead(ref, commitSHA, force, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/git/refs/' + ref, {
            sha: commitSHA,
            force: force
         }, cb);
      }

      /**
       * Update commit status
       * @see https://developer.github.com/v3/repos/statuses/
       * @param {string} commitSHA - the SHA of the commit that should be updated
       * @param {object} options - Commit status parameters
       * @param {string} options.state - The state of the status. Can be one of: pending, success, error, or failure.
       * @param {string} [options.target_url] - The target URL to associate with this status.
       * @param {string} [options.description] - A short description of the status.
       * @param {string} [options.context] - A string label to differentiate this status among CI systems.
       * @param {Requestable.callback} cb - will receive the updated commit back
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateStatus',
      value: function updateStatus(commitSHA, options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/statuses/' + commitSHA, options, cb);
      }

      /**
       * Update repository information
       * @see https://developer.github.com/v3/repos/#edit
       * @param {object} options - New parameters that will be set to the repository
       * @param {string} options.name - Name of the repository
       * @param {string} [options.description] - A short description of the repository
       * @param {string} [options.homepage] - A URL with more information about the repository
       * @param {boolean} [options.private] - Either true to make the repository private, or false to make it public.
       * @param {boolean} [options.has_issues] - Either true to enable issues for this repository, false to disable them.
       * @param {boolean} [options.has_wiki] - Either true to enable the wiki for this repository, false to disable it.
       * @param {boolean} [options.has_downloads] - Either true to enable downloads, false to disable them.
       * @param {string} [options.default_branch] - Updates the default branch for this repository.
       * @param {Requestable.callback} cb - will receive the updated repository back
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateRepository',
      value: function updateRepository(options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname, options, cb);
      }

      /**
        * Get information about the repository
        * @see https://developer.github.com/v3/repos/#get
        * @param {Requestable.callback} cb - will receive the information about the repository
        * @return {Promise} - the promise for the http request
        */

   }, {
      key: 'getDetails',
      value: function getDetails(cb) {
         return this._request('GET', '/repos/' + this.__fullname, null, cb);
      }

      /**
       * List the contributors to the repository
       * @see https://developer.github.com/v3/repos/#list-contributors
       * @param {Requestable.callback} cb - will receive the list of contributors
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getContributors',
      value: function getContributors(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/contributors', null, cb);
      }

      /**
       * List the contributor stats to the repository
       * @see https://developer.github.com/v3/repos/#list-contributors
       * @param {Requestable.callback} cb - will receive the list of contributors
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getContributorStats',
      value: function getContributorStats(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/stats/contributors', null, cb);
      }

      /**
       * List the users who are collaborators on the repository. The currently authenticated user must have
       * push access to use this method
       * @see https://developer.github.com/v3/repos/collaborators/#list-collaborators
       * @param {Requestable.callback} cb - will receive the list of collaborators
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getCollaborators',
      value: function getCollaborators(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/collaborators', null, cb);
      }

      /**
       * Check if a user is a collaborator on the repository
       * @see https://developer.github.com/v3/repos/collaborators/#check-if-a-user-is-a-collaborator
       * @param {string} username - the user to check
       * @param {Requestable.callback} cb - will receive true if the user is a collaborator and false if they are not
       * @return {Promise} - the promise for the http request {Boolean} [description]
       */

   }, {
      key: 'isCollaborator',
      value: function isCollaborator(username, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/collaborators/' + username, null, cb);
      }

      /**
       * Get the contents of a repository
       * @see https://developer.github.com/v3/repos/contents/#get-contents
       * @param {string} ref - the ref to check
       * @param {string} path - the path containing the content to fetch
       * @param {boolean} raw - `true` if the results should be returned raw instead of GitHub's normalized format
       * @param {Requestable.callback} cb - will receive the fetched data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getContents',
      value: function getContents(ref, path, raw, cb) {
         path = path ? '' + encodeURI(path) : '';
         return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path, {
            ref: ref
         }, cb, raw);
      }

      /**
       * Get the README of a repository
       * @see https://developer.github.com/v3/repos/contents/#get-the-readme
       * @param {string} ref - the ref to check
       * @param {boolean} raw - `true` if the results should be returned raw instead of GitHub's normalized format
       * @param {Requestable.callback} cb - will receive the fetched data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getReadme',
      value: function getReadme(ref, raw, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/readme', {
            ref: ref
         }, cb, raw);
      }

      /**
       * Fork a repository
       * @see https://developer.github.com/v3/repos/forks/#create-a-fork
       * @param {Requestable.callback} cb - will receive the information about the newly created fork
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'fork',
      value: function fork(cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/forks', null, cb);
      }

      /**
       * List a repository's forks
       * @see https://developer.github.com/v3/repos/forks/#list-forks
       * @param {Requestable.callback} cb - will receive the list of repositories forked from this one
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listForks',
      value: function listForks(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/forks', null, cb);
      }

      /**
       * Create a new branch from an existing branch.
       * @param {string} [oldBranch=master] - the name of the existing branch
       * @param {string} newBranch - the name of the new branch
       * @param {Requestable.callback} cb - will receive the commit data for the head of the new branch
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createBranch',
      value: function createBranch(oldBranch, newBranch, cb) {
         var _this3 = this;

         if (typeof newBranch === 'function') {
            cb = newBranch;
            newBranch = oldBranch;
            oldBranch = 'master';
         }

         return this.getRef('heads/' + oldBranch).then(function (response) {
            var sha = response.data.object.sha;
            return _this3.createRef({
               sha: sha,
               ref: 'refs/heads/' + newBranch
            }, cb);
         });
      }

      /**
       * Create a new pull request
       * @see https://developer.github.com/v3/pulls/#create-a-pull-request
       * @param {Object} options - the pull request description
       * @param {Requestable.callback} cb - will receive the new pull request
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createPullRequest',
      value: function createPullRequest(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/pulls', options, cb);
      }

      /**
       * Update a pull request
       * @see https://developer.github.com/v3/pulls/#update-a-pull-request
       * @param {number|string} number - the number of the pull request to update
       * @param {Object} options - the pull request description
       * @param {Requestable.callback} [cb] - will receive the pull request information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updatePullRequest',
      value: function updatePullRequest(number, options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/pulls/' + number, options, cb);
      }

      /**
       * List the hooks for the repository
       * @see https://developer.github.com/v3/repos/hooks/#list-hooks
       * @param {Requestable.callback} cb - will receive the list of hooks
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listHooks',
      value: function listHooks(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/hooks', null, cb);
      }

      /**
       * Get a hook for the repository
       * @see https://developer.github.com/v3/repos/hooks/#get-single-hook
       * @param {number} id - the id of the webook
       * @param {Requestable.callback} cb - will receive the details of the webook
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getHook',
      value: function getHook(id, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/hooks/' + id, null, cb);
      }

      /**
       * Add a new hook to the repository
       * @see https://developer.github.com/v3/repos/hooks/#create-a-hook
       * @param {Object} options - the configuration describing the new hook
       * @param {Requestable.callback} cb - will receive the new webhook
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createHook',
      value: function createHook(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/hooks', options, cb);
      }

      /**
       * Edit an existing webhook
       * @see https://developer.github.com/v3/repos/hooks/#edit-a-hook
       * @param {number} id - the id of the webhook
       * @param {Object} options - the new description of the webhook
       * @param {Requestable.callback} cb - will receive the updated webhook
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateHook',
      value: function updateHook(id, options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/hooks/' + id, options, cb);
      }

      /**
       * Delete a webhook
       * @see https://developer.github.com/v3/repos/hooks/#delete-a-hook
       * @param {number} id - the id of the webhook to be deleted
       * @param {Requestable.callback} cb - will receive true if the call is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteHook',
      value: function deleteHook(id, cb) {
         return this._request('DELETE', this.__fullname + '/hooks/' + id, null, cb);
      }

      /**
       * List the deploy keys for the repository
       * @see https://developer.github.com/v3/repos/keys/#list-deploy-keys
       * @param {Requestable.callback} cb - will receive the list of deploy keys
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listKeys',
      value: function listKeys(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/keys', null, cb);
      }

      /**
       * Get a deploy key for the repository
       * @see https://developer.github.com/v3/repos/keys/#get-a-deploy-key
       * @param {number} id - the id of the deploy key
       * @param {Requestable.callback} cb - will receive the details of the deploy key
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getKey',
      value: function getKey(id, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/keys/' + id, null, cb);
      }

      /**
       * Add a new deploy key to the repository
       * @see https://developer.github.com/v3/repos/keys/#add-a-new-deploy-key
       * @param {Object} options - the configuration describing the new deploy key
       * @param {Requestable.callback} cb - will receive the new deploy key
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createKey',
      value: function createKey(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/keys', options, cb);
      }

      /**
       * Delete a deploy key
       * @see https://developer.github.com/v3/repos/keys/#remove-a-deploy-key
       * @param {number} id - the id of the deploy key to be deleted
       * @param {Requestable.callback} cb - will receive true if the call is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteKey',
      value: function deleteKey(id, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/keys/' + id, null, cb);
      }

      /**
       * Delete a file from a branch
       * @see https://developer.github.com/v3/repos/contents/#delete-a-file
       * @param {string} branch - the branch to delete from, or the default branch if not specified
       * @param {string} path - the path of the file to remove
       * @param {Requestable.callback} cb - will receive the commit in which the delete occurred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteFile',
      value: function deleteFile(branch, path, cb) {
         var _this4 = this;

         return this.getSha(branch, path).then(function (response) {
            var deleteCommit = {
               message: 'Delete the file at \'' + path + '\'',
               sha: response.data.sha,
               branch: branch
            };
            return _this4._request('DELETE', '/repos/' + _this4.__fullname + '/contents/' + path, deleteCommit, cb);
         });
      }

      /**
       * Change all references in a repo from oldPath to new_path
       * @param {string} branch - the branch to carry out the reference change, or the default branch if not specified
       * @param {string} oldPath - original path
       * @param {string} newPath - new reference path
       * @param {Requestable.callback} cb - will receive the commit in which the move occurred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'move',
      value: function move(branch, oldPath, newPath, cb) {
         var _this5 = this;

         var oldSha = void 0;
         return this.getRef('heads/' + branch).then(function (_ref) {
            var object = _ref.data.object;
            return _this5.getTree(object.sha + '?recursive=true');
         }).then(function (_ref2) {
            var _ref2$data = _ref2.data,
                tree = _ref2$data.tree,
                sha = _ref2$data.sha;

            oldSha = sha;
            var newTree = tree.map(function (ref) {
               if (ref.path === oldPath) {
                  ref.path = newPath;
               }
               if (ref.type === 'tree') {
                  delete ref.sha;
               }
               return ref;
            });
            return _this5.createTree(newTree);
         }).then(function (_ref3) {
            var tree = _ref3.data;
            return _this5.commit(oldSha, tree.sha, 'Renamed \'' + oldPath + '\' to \'' + newPath + '\'');
         }).then(function (_ref4) {
            var commit = _ref4.data;
            return _this5.updateHead('heads/' + branch, commit.sha, true, cb);
         });
      }

      /**
       * Write a file to the repository
       * @see https://developer.github.com/v3/repos/contents/#update-a-file
       * @param {string} branch - the name of the branch
       * @param {string} path - the path for the file
       * @param {string} content - the contents of the file
       * @param {string} message - the commit message
       * @param {Object} [options] - commit options
       * @param {Object} [options.author] - the author of the commit
       * @param {Object} [options.commiter] - the committer
       * @param {boolean} [options.encode] - true if the content should be base64 encoded
       * @param {Requestable.callback} cb - will receive the new commit
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'writeFile',
      value: function writeFile(branch, path, content, message, options, cb) {
         var _this6 = this;

         if (typeof options === 'function') {
            cb = options;
            options = {};
         }
         var filePath = path ? encodeURI(path) : '';
         var shouldEncode = options.encode !== false;
         var commit = {
            branch: branch,
            message: message,
            author: options.author,
            committer: options.committer,
            content: shouldEncode ? _jsBase.Base64.encode(content) : content
         };

         return this.getSha(branch, filePath).then(function (response) {
            commit.sha = response.data.sha;
            return _this6._request('PUT', '/repos/' + _this6.__fullname + '/contents/' + filePath, commit, cb);
         }, function () {
            return _this6._request('PUT', '/repos/' + _this6.__fullname + '/contents/' + filePath, commit, cb);
         });
      }

      /**
       * Check if a repository is starred by you
       * @see https://developer.github.com/v3/activity/starring/#check-if-you-are-starring-a-repository
       * @param {Requestable.callback} cb - will receive true if the repository is starred and false if the repository
       *                                  is not starred
       * @return {Promise} - the promise for the http request {Boolean} [description]
       */

   }, {
      key: 'isStarred',
      value: function isStarred(cb) {
         return this._request204or404('/user/starred/' + this.__fullname, null, cb);
      }

      /**
       * Star a repository
       * @see https://developer.github.com/v3/activity/starring/#star-a-repository
       * @param {Requestable.callback} cb - will receive true if the repository is starred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'star',
      value: function star(cb) {
         return this._request('PUT', '/user/starred/' + this.__fullname, null, cb);
      }

      /**
       * Unstar a repository
       * @see https://developer.github.com/v3/activity/starring/#unstar-a-repository
       * @param {Requestable.callback} cb - will receive true if the repository is unstarred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'unstar',
      value: function unstar(cb) {
         return this._request('DELETE', '/user/starred/' + this.__fullname, null, cb);
      }

      /**
       * Create a new release
       * @see https://developer.github.com/v3/repos/releases/#create-a-release
       * @param {Object} options - the description of the release
       * @param {Requestable.callback} cb - will receive the newly created release
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createRelease',
      value: function createRelease(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/releases', options, cb);
      }

      /**
       * Edit a release
       * @see https://developer.github.com/v3/repos/releases/#edit-a-release
       * @param {string} id - the id of the release
       * @param {Object} options - the description of the release
       * @param {Requestable.callback} cb - will receive the modified release
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateRelease',
      value: function updateRelease(id, options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/releases/' + id, options, cb);
      }

      /**
       * Get information about all releases
       * @see https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository
       * @param {Requestable.callback} cb - will receive the release information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listReleases',
      value: function listReleases(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/releases', null, cb);
      }

      /**
       * Get information about a release
       * @see https://developer.github.com/v3/repos/releases/#get-a-single-release
       * @param {string} id - the id of the release
       * @param {Requestable.callback} cb - will receive the release information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getRelease',
      value: function getRelease(id, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
      }

      /**
       * Delete a release
       * @see https://developer.github.com/v3/repos/releases/#delete-a-release
       * @param {string} id - the release to be deleted
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteRelease',
      value: function deleteRelease(id, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
      }

      /**
       * Merge a pull request
       * @see https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button
       * @param {number|string} number - the number of the pull request to merge
       * @param {Object} options - the merge options for the pull request
       * @param {Requestable.callback} [cb] - will receive the merge information if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'mergePullRequest',
      value: function mergePullRequest(number, options, cb) {
         return this._request('PUT', '/repos/' + this.__fullname + '/pulls/' + number + '/merge', options, cb);
      }

      /**
       * Get information about all projects
       * @see https://developer.github.com/v3/projects/#list-repository-projects
       * @param {Requestable.callback} [cb] - will receive the list of projects
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjects',
      value: function listProjects(cb) {
         return this._requestAllPages('/repos/' + this.__fullname + '/projects', { AcceptHeader: 'inertia-preview' }, cb);
      }

      /**
       * Create a new project
       * @see https://developer.github.com/v3/projects/#create-a-repository-project
       * @param {Object} options - the description of the project
       * @param {Requestable.callback} cb - will receive the newly created project
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createProject',
      value: function createProject(options, cb) {
         options = options || {};
         options.AcceptHeader = 'inertia-preview';
         return this._request('POST', '/repos/' + this.__fullname + '/projects', options, cb);
      }
   }]);

   return Repository;
}(_Requestable3.default);

module.exports = Repository;

}).call(this,require("buffer").Buffer)

},{"./Requestable":9,"buffer":undefined,"debug":undefined,"js-base64":undefined,"utf8":undefined}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsBase = require('js-base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:request');

/**
 * The error structure returned when a network call fails
 */

var ResponseError = function (_Error) {
   _inherits(ResponseError, _Error);

   /**
    * Construct a new ResponseError
    * @param {string} message - an message to return instead of the the default error message
    * @param {string} path - the requested path
    * @param {Object} response - the object returned by Axios
    */
   function ResponseError(message, path, response) {
      _classCallCheck(this, ResponseError);

      var _this = _possibleConstructorReturn(this, (ResponseError.__proto__ || Object.getPrototypeOf(ResponseError)).call(this, message));

      _this.path = path;
      _this.request = response.config;
      _this.response = (response || {}).response || response;
      _this.status = response.status;
      return _this;
   }

   return ResponseError;
}(Error);

/**
 * Requestable wraps the logic for making http requests to the API
 */


var Requestable = function () {
   /**
    * Either a username and password or an oauth token for Github
    * @typedef {Object} Requestable.auth
    * @prop {string} [username] - the Github username
    * @prop {string} [password] - the user's password
    * @prop {token} [token] - an OAuth token
    */
   /**
    * Initialize the http internals.
    * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
    *                                  not provided request will be made unauthenticated
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    * @param {string} [AcceptHeader=v3] - the accept header for the requests
    */
   function Requestable(auth, apiBase, AcceptHeader) {
      _classCallCheck(this, Requestable);

      this.__apiBase = apiBase || 'https://api.github.com';
      this.__auth = {
         token: auth.token,
         username: auth.username,
         password: auth.password
      };
      this.__AcceptHeader = AcceptHeader || 'v3';

      if (auth.token) {
         this.__authorizationHeader = 'token ' + auth.token;
      } else if (auth.username && auth.password) {
         this.__authorizationHeader = 'Basic ' + _jsBase.Base64.encode(auth.username + ':' + auth.password);
      }
   }

   /**
    * Compute the URL to use to make a request.
    * @private
    * @param {string} path - either a URL relative to the API base or an absolute URL
    * @return {string} - the URL to use
    */


   _createClass(Requestable, [{
      key: '__getURL',
      value: function __getURL(path) {
         var url = path;

         if (path.indexOf('//') === -1) {
            url = this.__apiBase + path;
         }

         var newCacheBuster = 'timestamp=' + new Date().getTime();
         return url.replace(/(timestamp=\d+)/, newCacheBuster);
      }

      /**
       * Compute the headers required for an API request.
       * @private
       * @param {boolean} raw - if the request should be treated as JSON or as a raw request
       * @param {string} AcceptHeader - the accept header for the request
       * @return {Object} - the headers to use in the request
       */

   }, {
      key: '__getRequestHeaders',
      value: function __getRequestHeaders(raw, AcceptHeader) {
         var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/vnd.github.' + (AcceptHeader || this.__AcceptHeader)
         };

         if (raw) {
            headers.Accept += '.raw';
         }
         headers.Accept += '+json';

         if (this.__authorizationHeader) {
            headers.Authorization = this.__authorizationHeader;
         }

         return headers;
      }

      /**
       * Sets the default options for API requests
       * @protected
       * @param {Object} [requestOptions={}] - the current options for the request
       * @return {Object} - the options to pass to the request
       */

   }, {
      key: '_getOptionsWithDefaults',
      value: function _getOptionsWithDefaults() {
         var requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

         if (!(requestOptions.visibility || requestOptions.affiliation)) {
            requestOptions.type = requestOptions.type || 'all';
         }
         requestOptions.sort = requestOptions.sort || 'updated';
         requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

         return requestOptions;
      }

      /**
       * if a `Date` is passed to this function it will be converted to an ISO string
       * @param {*} date - the object to attempt to cooerce into an ISO date string
       * @return {string} - the ISO representation of `date` or whatever was passed in if it was not a date
       */

   }, {
      key: '_dateToISO',
      value: function _dateToISO(date) {
         if (date && date instanceof Date) {
            date = date.toISOString();
         }

         return date;
      }

      /**
       * A function that receives the result of the API request.
       * @callback Requestable.callback
       * @param {Requestable.Error} error - the error returned by the API or `null`
       * @param {(Object|true)} result - the data returned by the API or `true` if the API returns `204 No Content`
       * @param {Object} request - the raw {@linkcode https://github.com/mzabriskie/axios#response-schema Response}
       */
      /**
       * Make a request.
       * @param {string} method - the method for the request (GET, PUT, POST, DELETE)
       * @param {string} path - the path for the request
       * @param {*} [data] - the data to send to the server. For HTTP methods that don't have a body the data
       *                   will be sent as query parameters
       * @param {Requestable.callback} [cb] - the callback for the request
       * @param {boolean} [raw=false] - if the request should be sent as raw. If this is a falsy value then the
       *                              request will be made as JSON
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: '_request',
      value: function _request(method, path, data, cb, raw) {
         var url = this.__getURL(path);

         var AcceptHeader = (data || {}).AcceptHeader;
         if (AcceptHeader) {
            delete data.AcceptHeader;
         }
         var headers = this.__getRequestHeaders(raw, AcceptHeader);

         var queryParams = {};

         var shouldUseDataAsParams = data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && methodHasNoBody(method);
         if (shouldUseDataAsParams) {
            queryParams = data;
            data = undefined;
         }

         var config = {
            url: url,
            method: method,
            headers: headers,
            params: queryParams,
            data: data,
            responseType: raw ? 'text' : 'json'
         };

         log(config.method + ' to ' + config.url);
         var requestPromise = (0, _axios2.default)(config).catch(callbackErrorOrThrow(cb, path));

         if (cb) {
            requestPromise.then(function (response) {
               if (response.data && Object.keys(response.data).length > 0) {
                  // When data has results
                  cb(null, response.data, response);
               } else if (config.method !== 'GET' && Object.keys(response.data).length < 1) {
                  // True when successful submit a request and receive a empty object
                  cb(null, response.status < 300, response);
               } else {
                  cb(null, response.data, response);
               }
            });
         }

         return requestPromise;
      }

      /**
       * Make a request to an endpoint the returns 204 when true and 404 when false
       * @param {string} path - the path to request
       * @param {Object} data - any query parameters for the request
       * @param {Requestable.callback} cb - the callback that will receive `true` or `false`
       * @param {method} [method=GET] - HTTP Method to use
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: '_request204or404',
      value: function _request204or404(path, data, cb) {
         var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';

         return this._request(method, path, data).then(function success(response) {
            if (cb) {
               cb(null, true, response);
            }
            return true;
         }, function failure(response) {
            if (response.response.status === 404) {
               if (cb) {
                  cb(null, false, response);
               }
               return false;
            }

            if (cb) {
               cb(response);
            }
            throw response;
         });
      }

      /**
       * Make a request and fetch all the available data. Github will paginate responses so for queries
       * that might span multiple pages this method is preferred to {@link Requestable#request}
       * @param {string} path - the path to request
       * @param {Object} options - the query parameters to include
       * @param {Requestable.callback} [cb] - the function to receive the data. The returned data will always be an array.
       * @param {Object[]} results - the partial results. This argument is intended for interal use only.
       * @return {Promise} - a promise which will resolve when all pages have been fetched
       * @deprecated This will be folded into {@link Requestable#_request} in the 2.0 release.
       */

   }, {
      key: '_requestAllPages',
      value: function _requestAllPages(path, options, cb, results) {
         var _this2 = this;

         results = results || [];

         return this._request('GET', path, options).then(function (response) {
            var _results;

            var thisGroup = void 0;
            if (response.data instanceof Array) {
               thisGroup = response.data;
            } else if (response.data.items instanceof Array) {
               thisGroup = response.data.items;
            } else {
               var message = 'cannot figure out how to append ' + response.data + ' to the result set';
               throw new ResponseError(message, path, response);
            }
            (_results = results).push.apply(_results, _toConsumableArray(thisGroup));

            var nextUrl = getNextPage(response.headers.link);
            if (nextUrl) {
               log('getting next page: ' + nextUrl);
               return _this2._requestAllPages(nextUrl, options, cb, results);
            }

            if (cb) {
               cb(null, results, response);
            }

            response.data = results;
            return response;
         }).catch(callbackErrorOrThrow(cb, path));
      }
   }]);

   return Requestable;
}();

module.exports = Requestable;

// ////////////////////////// //
//  Private helper functions  //
// ////////////////////////// //
var METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
function methodHasNoBody(method) {
   return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
}

function getNextPage() {
   var linksHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

   var links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
   return links.reduce(function (nextUrl, link) {
      if (link.search(/rel="next"/) !== -1) {
         return (link.match(/<(.*)>/) || [])[1];
      }

      return nextUrl;
   }, undefined);
}

function callbackErrorOrThrow(cb, path) {
   return function handler(object) {
      var error = void 0;
      if (object.hasOwnProperty('config')) {
         var _object$response = object.response,
             status = _object$response.status,
             statusText = _object$response.statusText,
             _object$config = object.config,
             method = _object$config.method,
             url = _object$config.url;

         var message = status + ' error making request ' + method + ' ' + url + ': "' + statusText + '"';
         error = new ResponseError(message, path, object);
         log(message + ' ' + JSON.stringify(object.data));
      } else {
         error = object;
      }
      if (cb) {
         log('going to error callback');
         cb(error);
      } else {
         log('throwing error');
         throw error;
      }
   };
}

},{"axios":undefined,"debug":undefined,"js-base64":undefined}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:search');

/**
 * Wrap the Search API
 */

var Search = function (_Requestable) {
  _inherits(Search, _Requestable);

  /**
   * Create a Search
   * @param {Object} defaults - defaults for the search
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Search(defaults, auth, apiBase) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, auth, apiBase));

    _this.__defaults = _this._getOptionsWithDefaults(defaults);
    return _this;
  }

  /**
   * Available search options
   * @see https://developer.github.com/v3/search/#parameters
   * @typedef {Object} Search.Params
   * @param {string} q - the query to make
   * @param {string} sort - the sort field, one of `stars`, `forks`, or `updated`.
   *                      Default is [best match](https://developer.github.com/v3/search/#ranking-search-results)
   * @param {string} order - the ordering, either `asc` or `desc`
   */
  /**
   * Perform a search on the GitHub API
   * @private
   * @param {string} path - the scope of the search
   * @param {Search.Params} [withOptions] - additional parameters for the search
   * @param {Requestable.callback} [cb] - will receive the results of the search
   * @return {Promise} - the promise for the http request
   */


  _createClass(Search, [{
    key: '_search',
    value: function _search(path) {
      var _this2 = this;

      var withOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var requestOptions = {};
      Object.keys(this.__defaults).forEach(function (prop) {
        requestOptions[prop] = _this2.__defaults[prop];
      });
      Object.keys(withOptions).forEach(function (prop) {
        requestOptions[prop] = withOptions[prop];
      });

      log('searching ' + path + ' with options:', requestOptions);
      return this._requestAllPages('/search/' + path, requestOptions, cb);
    }

    /**
     * Search for repositories
     * @see https://developer.github.com/v3/search/#search-repositories
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forRepositories',
    value: function forRepositories(options, cb) {
      return this._search('repositories', options, cb);
    }

    /**
     * Search for code
     * @see https://developer.github.com/v3/search/#search-code
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forCode',
    value: function forCode(options, cb) {
      return this._search('code', options, cb);
    }

    /**
     * Search for issues
     * @see https://developer.github.com/v3/search/#search-issues
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forIssues',
    value: function forIssues(options, cb) {
      return this._search('issues', options, cb);
    }

    /**
     * Search for users
     * @see https://developer.github.com/v3/search/#search-users
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forUsers',
    value: function forUsers(options, cb) {
      return this._search('users', options, cb);
    }
  }]);

  return Search;
}(_Requestable3.default);

module.exports = Search;

},{"./Requestable":9,"debug":undefined}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2016 Matt Smith (Development Seed)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:team');

/**
 * A Team allows scoping of API requests to a particular Github Organization Team.
 */

var Team = function (_Requestable) {
  _inherits(Team, _Requestable);

  /**
   * Create a Team.
   * @param {string} [teamId] - the id for the team
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Team(teamId, auth, apiBase) {
    _classCallCheck(this, Team);

    var _this = _possibleConstructorReturn(this, (Team.__proto__ || Object.getPrototypeOf(Team)).call(this, auth, apiBase));

    _this.__teamId = teamId;
    return _this;
  }

  /**
   * Get Team information
   * @see https://developer.github.com/v3/orgs/teams/#get-team
   * @param {Requestable.callback} [cb] - will receive the team
   * @return {Promise} - the promise for the http request
   */


  _createClass(Team, [{
    key: 'getTeam',
    value: function getTeam(cb) {
      log('Fetching Team ' + this.__teamId);
      return this._request('Get', '/teams/' + this.__teamId, undefined, cb);
    }

    /**
     * List the Team's repositories
     * @see https://developer.github.com/v3/orgs/teams/#list-team-repos
     * @param {Requestable.callback} [cb] - will receive the list of repositories
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listRepos',
    value: function listRepos(cb) {
      log('Fetching repositories for Team ' + this.__teamId);
      return this._requestAllPages('/teams/' + this.__teamId + '/repos', undefined, cb);
    }

    /**
     * Edit Team information
     * @see https://developer.github.com/v3/orgs/teams/#edit-team
     * @param {object} options - Parameters for team edit
     * @param {string} options.name - The name of the team
     * @param {string} [options.description] - Team description
     * @param {string} [options.repo_names] - Repos to add the team to
     * @param {string} [options.privacy=secret] - The level of privacy the team should have. Can be either one
     * of: `secret`, or `closed`
     * @param {Requestable.callback} [cb] - will receive the updated team
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editTeam',
    value: function editTeam(options, cb) {
      log('Editing Team ' + this.__teamId);
      return this._request('PATCH', '/teams/' + this.__teamId, options, cb);
    }

    /**
     * List the users who are members of the Team
     * @see https://developer.github.com/v3/orgs/teams/#list-team-members
     * @param {object} options - Parameters for listing team users
     * @param {string} [options.role=all] - can be one of: `all`, `maintainer`, or `member`
     * @param {Requestable.callback} [cb] - will receive the list of users
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listMembers',
    value: function listMembers(options, cb) {
      log('Getting members of Team ' + this.__teamId);
      return this._requestAllPages('/teams/' + this.__teamId + '/members', options, cb);
    }

    /**
     * Get Team membership status for a user
     * @see https://developer.github.com/v3/orgs/teams/#get-team-membership
     * @param {string} username - can be one of: `all`, `maintainer`, or `member`
     * @param {Requestable.callback} [cb] - will receive the membership status of a user
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getMembership',
    value: function getMembership(username, cb) {
      log('Getting membership of user ' + username + ' in Team ' + this.__teamId);
      return this._request('GET', '/teams/' + this.__teamId + '/memberships/' + username, undefined, cb);
    }

    /**
     * Add a member to the Team
     * @see https://developer.github.com/v3/orgs/teams/#add-team-membership
     * @param {string} username - can be one of: `all`, `maintainer`, or `member`
     * @param {object} options - Parameters for adding a team member
     * @param {string} [options.role=member] - The role that this user should have in the team. Can be one
     * of: `member`, or `maintainer`
     * @param {Requestable.callback} [cb] - will receive the membership status of added user
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'addMembership',
    value: function addMembership(username, options, cb) {
      log('Adding user ' + username + ' to Team ' + this.__teamId);
      return this._request('PUT', '/teams/' + this.__teamId + '/memberships/' + username, options, cb);
    }

    /**
     * Get repo management status for team
     * @see https://developer.github.com/v3/orgs/teams/#remove-team-membership
     * @param {string} owner - Organization name
     * @param {string} repo - Repo name
     * @param {Requestable.callback} [cb] - will receive the membership status of added user
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'isManagedRepo',
    value: function isManagedRepo(owner, repo, cb) {
      log('Getting repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
      return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb);
    }

    /**
     * Add or Update repo management status for team
     * @see https://developer.github.com/v3/orgs/teams/#add-or-update-team-repository
     * @param {string} owner - Organization name
     * @param {string} repo - Repo name
     * @param {object} options - Parameters for adding or updating repo management for the team
     * @param {string} [options.permission] - The permission to grant the team on this repository. Can be one
     * of: `pull`, `push`, or `admin`
     * @param {Requestable.callback} [cb] - will receive the membership status of added user
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'manageRepo',
    value: function manageRepo(owner, repo, options, cb) {
      log('Adding or Updating repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
      return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, options, cb, 'PUT');
    }

    /**
     * Remove repo management status for team
     * @see https://developer.github.com/v3/orgs/teams/#remove-team-repository
     * @param {string} owner - Organization name
     * @param {string} repo - Repo name
     * @param {Requestable.callback} [cb] - will receive the membership status of added user
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'unmanageRepo',
    value: function unmanageRepo(owner, repo, cb) {
      log('Remove repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
      return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb, 'DELETE');
    }

    /**
     * Delete Team
     * @see https://developer.github.com/v3/orgs/teams/#delete-team
     * @param {Requestable.callback} [cb] - will receive the list of repositories
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteTeam',
    value: function deleteTeam(cb) {
      log('Deleting Team ' + this.__teamId);
      return this._request204or404('/teams/' + this.__teamId, undefined, cb, 'DELETE');
    }
  }]);

  return Team;
}(_Requestable3.default);

module.exports = Team;

},{"./Requestable":9,"debug":undefined}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:user');

/**
 * A User allows scoping of API requests to a particular Github user.
 */

var User = function (_Requestable) {
   _inherits(User, _Requestable);

   /**
    * Create a User.
    * @param {string} [username] - the user to use for user-scoped queries
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function User(username, auth, apiBase) {
      _classCallCheck(this, User);

      var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, auth, apiBase));

      _this.__user = username;
      return _this;
   }

   /**
    * Get the url for the request. (dependent on if we're requesting for the authenticated user or not)
    * @private
    * @param {string} endpoint - the endpoint being requested
    * @return {string} - the resolved endpoint
    */


   _createClass(User, [{
      key: '__getScopedUrl',
      value: function __getScopedUrl(endpoint) {
         if (this.__user) {
            return endpoint ? '/users/' + this.__user + '/' + endpoint : '/users/' + this.__user;
         } else {
            // eslint-disable-line
            switch (endpoint) {
               case '':
                  return '/user';

               case 'notifications':
               case 'gists':
                  return '/' + endpoint;

               default:
                  return '/user/' + endpoint;
            }
         }
      }

      /**
       * List the user's repositories
       * @see https://developer.github.com/v3/repos/#list-user-repositories
       * @param {Object} [options={}] - any options to refine the search
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listRepos',
      value: function listRepos(options, cb) {
         if (typeof options === 'function') {
            cb = options;
            options = {};
         }

         options = this._getOptionsWithDefaults(options);

         log('Fetching repositories with options: ' + JSON.stringify(options));
         return this._requestAllPages(this.__getScopedUrl('repos'), options, cb);
      }

      /**
       * List the orgs that the user belongs to
       * @see https://developer.github.com/v3/orgs/#list-user-organizations
       * @param {Requestable.callback} [cb] - will receive the list of organizations
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listOrgs',
      value: function listOrgs(cb) {
         return this._request('GET', this.__getScopedUrl('orgs'), null, cb);
      }

      /**
       * List the user's gists
       * @see https://developer.github.com/v3/gists/#list-a-users-gists
       * @param {Requestable.callback} [cb] - will receive the list of gists
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listGists',
      value: function listGists(cb) {
         return this._request('GET', this.__getScopedUrl('gists'), null, cb);
      }

      /**
       * List the user's notifications
       * @see https://developer.github.com/v3/activity/notifications/#list-your-notifications
       * @param {Object} [options={}] - any options to refine the search
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listNotifications',
      value: function listNotifications(options, cb) {
         options = options || {};
         if (typeof options === 'function') {
            cb = options;
            options = {};
         }

         options.since = this._dateToISO(options.since);
         options.before = this._dateToISO(options.before);

         return this._request('GET', this.__getScopedUrl('notifications'), options, cb);
      }

      /**
       * Show the user's profile
       * @see https://developer.github.com/v3/users/#get-a-single-user
       * @param {Requestable.callback} [cb] - will receive the user's information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getProfile',
      value: function getProfile(cb) {
         return this._request('GET', this.__getScopedUrl(''), null, cb);
      }

      /**
       * Gets the list of starred repositories for the user
       * @see https://developer.github.com/v3/activity/starring/#list-repositories-being-starred
       * @param {Requestable.callback} [cb] - will receive the list of starred repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listStarredRepos',
      value: function listStarredRepos(cb) {
         var requestOptions = this._getOptionsWithDefaults();
         return this._requestAllPages(this.__getScopedUrl('starred'), requestOptions, cb);
      }

      /**
       * List email addresses for a user
       * @see https://developer.github.com/v3/users/emails/#list-email-addresses-for-a-user
       * @param {Requestable.callback} [cb] - will receive the list of emails
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getEmails',
      value: function getEmails(cb) {
         return this._request('GET', '/user/emails', null, cb);
      }

      /**
       * Have the authenticated user follow this user
       * @see https://developer.github.com/v3/users/followers/#follow-a-user
       * @param {string} username - the user to follow
       * @param {Requestable.callback} [cb] - will receive true if the request succeeds
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'follow',
      value: function follow(username, cb) {
         return this._request('PUT', '/user/following/' + this.__user, null, cb);
      }

      /**
       * Have the currently authenticated user unfollow this user
       * @see https://developer.github.com/v3/users/followers/#follow-a-user
       * @param {string} username - the user to unfollow
       * @param {Requestable.callback} [cb] - receives true if the request succeeds
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'unfollow',
      value: function unfollow(username, cb) {
         return this._request('DELETE', '/user/following/' + this.__user, null, cb);
      }

      /**
       * Create a new repository for the currently authenticated user
       * @see https://developer.github.com/v3/repos/#create
       * @param {object} options - the repository definition
       * @param {Requestable.callback} [cb] - will receive the API response
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createRepo',
      value: function createRepo(options, cb) {
         return this._request('POST', '/user/repos', options, cb);
      }
   }]);

   return User;
}(_Requestable3.default);

module.exports = User;

},{"./Requestable":9,"debug":undefined}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvR2lzdC5qcyIsImxpYi9HaXRIdWIuanMiLCJsaWIvSXNzdWUuanMiLCJsaWIvTWFya2Rvd24uanMiLCJsaWIvT3JnYW5pemF0aW9uLmpzIiwibGliL1Byb2plY3QuanMiLCJsaWIvUmF0ZUxpbWl0LmpzIiwibGliL1JlcG9zaXRvcnkuanMiLCJsaWIvUmVxdWVzdGFibGUuanMiLCJsaWIvU2VhcmNoLmpzIiwibGliL1RlYW0uanMiLCJsaWIvVXNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNPQTs7Ozs7Ozs7OzsrZUFQQTs7Ozs7OztBQVNBOzs7SUFHTSxJOzs7QUFDSDs7Ozs7O0FBTUEsZ0JBQVksRUFBWixFQUFnQixJQUFoQixFQUFzQixPQUF0QixFQUErQjtBQUFBOztBQUFBLDRHQUN0QixJQURzQixFQUNoQixPQURnQjs7QUFFNUIsVUFBSyxJQUFMLEdBQVksRUFBWjtBQUY0QjtBQUc5Qjs7QUFFRDs7Ozs7Ozs7Ozt5QkFNSyxFLEVBQUk7QUFDTixhQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBSyxJQUFwQyxFQUE0QyxJQUE1QyxFQUFrRCxFQUFsRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7MkJBT08sSSxFQUFNLEUsRUFBSTtBQUFBOztBQUNkLGFBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFzQixRQUF0QixFQUFnQyxJQUFoQyxFQUFzQyxFQUF0QyxFQUNILElBREcsQ0FDRSxVQUFDLFFBQUQsRUFBYztBQUNqQixlQUFLLElBQUwsR0FBWSxTQUFTLElBQVQsQ0FBYyxFQUExQjtBQUNBLGVBQU8sUUFBUDtBQUNGLE9BSkcsQ0FBUDtBQUtGOztBQUVEOzs7Ozs7Ozs7NEJBTU8sRSxFQUFJO0FBQ1IsYUFBTyxLQUFLLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUssSUFBdkMsRUFBK0MsSUFBL0MsRUFBcUQsRUFBckQsQ0FB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RSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztpQ0FNVyxFLEVBQUk7QUFDWixnQkFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEtBQUssY0FBTCxDQUFvQixFQUFwQixDQUFyQixFQUE4QyxJQUE5QyxFQUFvRCxFQUFwRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozt1Q0FNaUIsRSxFQUFJO0FBQ2xCLGFBQUksaUJBQWlCLEtBQUssdUJBQUwsRUFBckI7QUFDQSxnQkFBTyxLQUFLLGdCQUFMLENBQXNCLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUF0QixFQUFzRCxjQUF0RCxFQUFzRSxFQUF0RSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztnQ0FNVSxFLEVBQUk7QUFDWCxnQkFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLGNBQXJCLEVBQXFDLElBQXJDLEVBQTJDLEVBQTNDLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs2QkFPTyxRLEVBQVUsRSxFQUFJO0FBQ2xCLGdCQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsdUJBQXdDLEtBQUssTUFBN0MsRUFBdUQsSUFBdkQsRUFBNkQsRUFBN0QsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7OytCQU9TLFEsRUFBVSxFLEVBQUk7QUFDcEIsZ0JBQU8sS0FBSyxRQUFMLENBQWMsUUFBZCx1QkFBMkMsS0FBSyxNQUFoRCxFQUEwRCxJQUExRCxFQUFnRSxFQUFoRSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7aUNBT1csTyxFQUFTLEUsRUFBSTtBQUNyQixnQkFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLGFBQXRCLEVBQXFDLE9BQXJDLEVBQThDLEVBQTlDLENBQVA7QUFDRjs7Ozs7O0FBR0osT0FBTyxPQUFQLEdBQWlCLElBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuXG4vKipcbiAqIEEgR2lzdCBjYW4gcmV0cmlldmUgYW5kIG1vZGlmeSBnaXN0cy5cbiAqL1xuY2xhc3MgR2lzdCBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgR2lzdC5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgZ2lzdCAobm90IHJlcXVpcmVkIHdoZW4gY3JlYXRpbmcgYSBnaXN0KVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3RvcihpZCwgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9faWQgPSBpZDtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBGZXRjaCBhIGdpc3QuXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2dldC1hLXNpbmdsZS1naXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBnaXN0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHJlYWQoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgZ2lzdC5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jY3JlYXRlLWEtZ2lzdFxuICAgICogQHBhcmFtIHtPYmplY3R9IGdpc3QgLSB0aGUgZGF0YSBmb3IgdGhlIG5ldyBnaXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgZ2lzdCB1cG9uIGNyZWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZShnaXN0LCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCAnL2dpc3RzJywgZ2lzdCwgY2IpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX19pZCA9IHJlc3BvbnNlLmRhdGEuaWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSBnaXN0LlxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyNkZWxldGUtYS1naXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9naXN0cy8ke3RoaXMuX19pZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRm9yayBhIGdpc3QuXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2ZvcmstYS1naXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gdGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCByZWNlaXZlIHRoZSBnaXN0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvcmsoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9naXN0cy8ke3RoaXMuX19pZH0vZm9ya3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogVXBkYXRlIGEgZ2lzdC5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jZWRpdC1hLWdpc3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBnaXN0IC0gdGhlIG5ldyBkYXRhIGZvciB0aGUgZ2lzdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBBUEkgcmVzdWx0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZShnaXN0LCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9naXN0cy8ke3RoaXMuX19pZH1gLCBnaXN0LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU3RhciBhIGdpc3QuXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI3N0YXItYS1naXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBzdGFyKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC9naXN0cy8ke3RoaXMuX19pZH0vc3RhcmAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVbnN0YXIgYSBnaXN0LlxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyN1bnN0YXItYS1naXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1bnN0YXIoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9zdGFyYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENoZWNrIGlmIGEgZ2lzdCBpcyBzdGFycmVkIGJ5IHRoZSB1c2VyLlxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyNjaGVjay1pZi1hLWdpc3QtaXMtc3RhcnJlZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBnaXN0IGlzIHN0YXJyZWQgYW5kIGZhbHNlIGlmIHRoZSBnaXN0IGlzIG5vdCBzdGFycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGlzU3RhcnJlZChjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL2dpc3RzLyR7dGhpcy5fX2lkfS9zdGFyYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGdpc3QncyBjb21tZW50c1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzL2NvbW1lbnRzLyNsaXN0LWNvbW1lbnRzLW9uLWEtZ2lzdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgY29tbWVudHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdENvbW1lbnRzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvZ2lzdHMvJHt0aGlzLl9faWR9L2NvbW1lbnRzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEZldGNoIG9uZSBvZiB0aGUgZ2lzdCdzIGNvbW1lbnRzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvY29tbWVudHMvI2dldC1hLXNpbmdsZS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29tbWVudCAtIHRoZSBpZCBvZiB0aGUgY29tbWVudFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWVudFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb21tZW50KGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHMvJHtjb21tZW50fWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDb21tZW50IG9uIGEgZ2lzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzL2NvbW1lbnRzLyNjcmVhdGUtYS1jb21tZW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGFkZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBBUEkgcmVzdWx0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUNvbW1lbnQoY29tbWVudCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHNgLCB7Ym9keTogY29tbWVudH0sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBFZGl0IGEgY29tbWVudCBvbiB0aGUgZ2lzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzL2NvbW1lbnRzLyNlZGl0LWEtY29tbWVudFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbW1lbnQgLSB0aGUgaWQgb2YgdGhlIGNvbW1lbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gdGhlIG5ldyBjb21tZW50XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtb2RpZmllZCBjb21tZW50XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGVkaXRDb21tZW50KGNvbW1lbnQsIGJvZHksIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9jb21tZW50cy8ke2NvbW1lbnR9YCwge2JvZHk6IGJvZHl9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgY29tbWVudCBvbiB0aGUgZ2lzdC5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy9jb21tZW50cy8jZGVsZXRlLWEtY29tbWVudFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbW1lbnQgLSB0aGUgaWQgb2YgdGhlIGNvbW1lbnRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVDb21tZW50KGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHMvJHtjb21tZW50fWAsIG51bGwsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHaXN0O1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuLyogZXNsaW50IHZhbGlkLWpzZG9jOiBbXCJlcnJvclwiLCB7XCJyZXF1aXJlUmV0dXJuRGVzY3JpcHRpb25cIjogZmFsc2V9XSAqL1xuXG5pbXBvcnQgR2lzdCBmcm9tICcuL0dpc3QnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcbmltcG9ydCBJc3N1ZSBmcm9tICcuL0lzc3VlJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9TZWFyY2gnO1xuaW1wb3J0IFJhdGVMaW1pdCBmcm9tICcuL1JhdGVMaW1pdCc7XG5pbXBvcnQgUmVwb3NpdG9yeSBmcm9tICcuL1JlcG9zaXRvcnknO1xuaW1wb3J0IE9yZ2FuaXphdGlvbiBmcm9tICcuL09yZ2FuaXphdGlvbic7XG5pbXBvcnQgVGVhbSBmcm9tICcuL1RlYW0nO1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJy4vTWFya2Rvd24nO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcblxuLyoqXG4gKiBHaXRIdWIgZW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSB2YXJpb3VzIEFQSSB3cmFwcGVyIG9iamVjdHMuXG4gKi9cbmNsYXNzIEdpdEh1YiB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBHaXRIdWIuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViLiBJZiBhdXRoIGlzXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgcHJvdmlkZWQgcmVxdWVzdHMgd2lsbCBiZSBtYWRlIHVuYXV0aGVudGljYXRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSA9ICdodHRwczovL2FwaS5naXRodWIuY29tJykge1xuICAgICAgdGhpcy5fX2FwaUJhc2UgPSBhcGlCYXNlO1xuICAgICAgdGhpcy5fX2F1dGggPSBhdXRoIHx8IHt9O1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBHaXN0IHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaWRdIC0gdGhlIGlkIGZvciB0aGUgZ2lzdCwgbGVhdmUgdW5kZWZpbmVkIHdoZW4gY3JlYXRpbmcgYSBuZXcgZ2lzdFxuICAgICogQHJldHVybiB7R2lzdH1cbiAgICAqL1xuICAgZ2V0R2lzdChpZCkge1xuICAgICAgcmV0dXJuIG5ldyBHaXN0KGlkLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBVc2VyIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdXNlcl0gLSB0aGUgbmFtZSBvZiB0aGUgdXNlciB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXRcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmUgdW5kZWZpbmVkIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyXG4gICAgKiBAcmV0dXJuIHtVc2VyfVxuICAgICovXG4gICBnZXRVc2VyKHVzZXIpIHtcbiAgICAgIHJldHVybiBuZXcgVXNlcih1c2VyLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBPcmdhbml6YXRpb24gd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9yZ2FuaXphdGlvbiAtIHRoZSBuYW1lIG9mIHRoZSBvcmdhbml6YXRpb25cbiAgICAqIEByZXR1cm4ge09yZ2FuaXphdGlvbn1cbiAgICAqL1xuICAgZ2V0T3JnYW5pemF0aW9uKG9yZ2FuaXphdGlvbikge1xuICAgICAgcmV0dXJuIG5ldyBPcmdhbml6YXRpb24ob3JnYW5pemF0aW9uLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIGNyZWF0ZSBhIG5ldyBUZWFtIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZWFtSWQgLSB0aGUgbmFtZSBvZiB0aGUgdGVhbVxuICAgICogQHJldHVybiB7dGVhbX1cbiAgICAqL1xuICAgZ2V0VGVhbSh0ZWFtSWQpIHtcbiAgICAgIHJldHVybiBuZXcgVGVhbSh0ZWFtSWQsIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IFJlcG9zaXRvcnkgd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXIgLSB0aGUgdXNlciB3aG8gb3ducyB0aGUgcmVzcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gdGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEByZXR1cm4ge1JlcG9zaXRvcnl9XG4gICAgKi9cbiAgIGdldFJlcG8odXNlciwgcmVwbykge1xuICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHRoaXMuX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBJc3N1ZSB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlciAtIHRoZSB1c2VyIHdobyBvd25zIHRoZSByZXNwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSB0aGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHJldHVybiB7SXNzdWV9XG4gICAgKi9cbiAgIGdldElzc3Vlcyh1c2VyLCByZXBvKSB7XG4gICAgICByZXR1cm4gbmV3IElzc3VlKHRoaXMuX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBTZWFyY2ggd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gdGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3JcbiAgICAqIEByZXR1cm4ge1NlYXJjaH1cbiAgICAqL1xuICAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gbmV3IFNlYXJjaChxdWVyeSwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgUmF0ZUxpbWl0IHdyYXBwZXJcbiAgICAqIEByZXR1cm4ge1JhdGVMaW1pdH1cbiAgICAqL1xuICAgZ2V0UmF0ZUxpbWl0KCkge1xuICAgICAgcmV0dXJuIG5ldyBSYXRlTGltaXQodGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgTWFya2Rvd24gd3JhcHBlclxuICAgICogQHJldHVybiB7TWFya2Rvd259XG4gICAgKi9cbiAgIGdldE1hcmtkb3duKCkge1xuICAgICAgcmV0dXJuIG5ldyBNYXJrZG93bih0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBQcm9qZWN0IHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgcHJvamVjdFxuICAgICogQHJldHVybiB7TWFya2Rvd259XG4gICAgKi9cbiAgIGdldFByb2plY3QoaWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvamVjdChpZCwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDb21wdXRlcyB0aGUgZnVsbCByZXBvc2l0b3J5IG5hbWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyIC0gdGhlIHVzZXJuYW1lIChvciB0aGUgZnVsbCBuYW1lKVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSB0aGUgcmVwb3NpdG9yeSBuYW1lLCBtdXN0IG5vdCBiZSBwYXNzZWQgaWYgYHVzZXJgIGlzIHRoZSBmdWxsIG5hbWVcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHJlcG9zaXRvcnkncyBmdWxsIG5hbWVcbiAgICAqL1xuICAgX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pIHtcbiAgICAgIGxldCBmdWxsbmFtZSA9IHVzZXI7XG5cbiAgICAgIGlmIChyZXBvKSB7XG4gICAgICAgICBmdWxsbmFtZSA9IGAke3VzZXJ9LyR7cmVwb31gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVsbG5hbWU7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2l0SHViO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5cbi8qKlxuICogSXNzdWUgd3JhcHMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gZ2V0IGlzc3VlcyBmb3IgcmVwb3NpdG9yaWVzXG4gKi9cbmNsYXNzIElzc3VlIGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgSXNzdWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvc2l0b3J5IC0gdGhlIGZ1bGwgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeSAoYDp1c2VyLzpyZXBvYCkgdG8gZ2V0IGlzc3VlcyBmb3JcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IocmVwb3NpdG9yeSwgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGlzc3VlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzLyNjcmVhdGUtYW4taXNzdWVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpc3N1ZURhdGEgLSB0aGUgaXNzdWUgdG8gY3JlYXRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjcmVhdGVkIGlzc3VlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUlzc3VlKGlzc3VlRGF0YSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXNgLCBpc3N1ZURhdGEsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBpc3N1ZXMgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzLyNsaXN0LWlzc3Vlcy1mb3ItYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBhcnJheSBvZiBpc3N1ZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdElzc3VlcyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBldmVudHMgZm9yIGFuIGlzc3VlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2V2ZW50cy8jbGlzdC1ldmVudHMtZm9yLWFuLWlzc3VlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaXNzdWUgdG8gZ2V0IGV2ZW50cyBmb3JcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZXZlbnRzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RJc3N1ZUV2ZW50cyhpc3N1ZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfS9ldmVudHNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCBjb21tZW50cyBvbiBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jbGlzdC1jb21tZW50cy1vbi1hbi1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlkIG9mIHRoZSBpc3N1ZSB0byBnZXQgY29tbWVudHMgZnJvbVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWVudHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdElzc3VlQ29tbWVudHMoaXNzdWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX0vY29tbWVudHNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgc2luZ2xlIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2dldC1hLXNpbmdsZS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBnZXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1lbnRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SXNzdWVDb21tZW50KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2NyZWF0ZS1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpZCBvZiB0aGUgaXNzdWUgdG8gY29tbWVudCBvblxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgLSB0aGUgY29tbWVudCB0byBhZGRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNyZWF0ZWQgY29tbWVudFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVJc3N1ZUNvbW1lbnQoaXNzdWUsIGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2NvbW1lbnRzYCwge2JvZHk6IGNvbW1lbnR9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2VkaXQtYS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBlZGl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGVkaXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGVkaXRlZCBjb21tZW50XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGVkaXRJc3N1ZUNvbW1lbnQoaWQsIGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy9jb21tZW50cy8ke2lkfWAsIHtib2R5OiBjb21tZW50fSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2RlbGV0ZS1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGRlbGV0ZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlSXNzdWVDb21tZW50KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2VkaXQtYW4taXNzdWVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpc3N1ZSBudW1iZXIgdG8gZWRpdFxuICAgICogQHBhcmFtIHtPYmplY3R9IGlzc3VlRGF0YSAtIHRoZSBuZXcgaXNzdWUgZGF0YVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZWRpdElzc3VlKGlzc3VlLCBpc3N1ZURhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfWAsIGlzc3VlRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIHBhcnRpY3VsYXIgaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2dldC1hLXNpbmdsZS1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIG51bWJlciB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SXNzdWUoaXNzdWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgbWlsZXN0b25lcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jbGlzdC1taWxlc3RvbmVzLWZvci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIG1pbGVzdG9uZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdE1pbGVzdG9uZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgbWlsZXN0b25lXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2dldC1hLXNpbmdsZS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWlsZXN0b25lXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldE1pbGVzdG9uZShtaWxlc3RvbmUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgbWlsZXN0b25lXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2NyZWF0ZS1hLW1pbGVzdG9uZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG1pbGVzdG9uZURhdGEgLSB0aGUgbWlsZXN0b25lIGRlZmluaXRpb25cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1pbGVzdG9uZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVNaWxlc3RvbmUobWlsZXN0b25lRGF0YSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzYCwgbWlsZXN0b25lRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYSBtaWxlc3RvbmVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jdXBkYXRlLWEtbWlsZXN0b25lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWlsZXN0b25lIC0gdGhlIGlkIG9mIHRoZSBtaWxlc3RvbmUgdG8gZWRpdFxuICAgICogQHBhcmFtIHtPYmplY3R9IG1pbGVzdG9uZURhdGEgLSB0aGUgdXBkYXRlcyB0byBtYWtlIHRvIHRoZSBtaWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgbWlsZXN0b25lXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGVkaXRNaWxlc3RvbmUobWlsZXN0b25lLCBtaWxlc3RvbmVEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG1pbGVzdG9uZURhdGEsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSBtaWxlc3RvbmUgKHRoaXMgaXMgZGlzdGluY3QgZnJvbSBjbG9zaW5nIGEgbWlsZXN0b25lKVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNkZWxldGUtYS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBkZWxldGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHN0YXR1c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVNaWxlc3RvbmUobWlsZXN0b25lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGxhYmVsXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jY3JlYXRlLWEtbGFiZWxcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBsYWJlbERhdGEgLSB0aGUgbGFiZWwgZGVmaW5pdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbGFiZWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlTGFiZWwobGFiZWxEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2xhYmVsc2AsIGxhYmVsRGF0YSwgY2IpO1xuICAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IHRoZSBsYWJlbHMgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbGFiZWxzLyNsaXN0LWFsbC1sYWJlbHMtZm9yLXRoaXMtcmVwb3NpdG9yeVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGxhYmVsc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgbGlzdExhYmVscyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbGFiZWxzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsYWJlbFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jZ2V0LWEtc2luZ2xlLWxhYmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBuYW1lIG9mIHRoZSBsYWJlbCB0byBmZXRjaFxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsYWJlbFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgZ2V0TGFiZWwobGFiZWwsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgLyoqXG4gICAqIEVkaXQgYSBsYWJlbFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jdXBkYXRlLWEtbGFiZWxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIG5hbWUgb2YgdGhlIGxhYmVsIHRvIGVkaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGxhYmVsRGF0YSAtIHRoZSB1cGRhdGVzIHRvIG1ha2UgdG8gdGhlIGxhYmVsXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgbGFiZWxcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgKi9cbiAgIGVkaXRMYWJlbChsYWJlbCwgbGFiZWxEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBsYWJlbERhdGEsIGNiKTtcbiAgIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbGFiZWxcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI2RlbGV0ZS1hLWxhYmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBuYW1lIG9mIHRoZSBsYWJlbCB0byBkZWxldGVcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgc3RhdHVzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICovXG4gICBkZWxldGVMYWJlbChsYWJlbCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2xhYmVscy8ke2xhYmVsfWAsIG51bGwsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJc3N1ZTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuXG4vKipcbiAqIFJlbmRlcnMgaHRtbCBmcm9tIE1hcmtkb3duIHRleHRcbiAqL1xuY2xhc3MgTWFya2Rvd24gZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIGNvbnN0cnVjdCBhIE1hcmtkb3duXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IGF1dGggLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdEh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFJlbmRlciBodG1sIGZyb20gTWFya2Rvd24gdGV4dC5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9tYXJrZG93bi8jcmVuZGVyLWFuLWFyYml0cmFyeS1tYXJrZG93bi1kb2N1bWVudFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb252ZXJzaW9uIG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50ZXh0XSAtIHRoZSBtYXJrZG93biB0ZXh0IHRvIGNvbnZlcnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5tb2RlPW1hcmtkb3duXSAtIGNhbiBiZSBlaXRoZXIgYG1hcmtkb3duYCBvciBgZ2ZtYFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNvbnRleHRdIC0gcmVwb3NpdG9yeSBuYW1lIGlmIG1vZGUgaXMgZ2ZtXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb252ZXJ0ZWQgaHRtbFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICByZW5kZXIob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgJy9tYXJrZG93bicsIG9wdGlvbnMsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZG93bjtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuXG4vKipcbiAqIE9yZ2FuaXphdGlvbiBlbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlIHJlcG9zaXRvcmllcyBpbiBvcmdhbml6YXRpb25zXG4gKi9cbmNsYXNzIE9yZ2FuaXphdGlvbiBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IE9yZ2FuaXphdGlvblxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9yZ2FuaXphdGlvbiAtIHRoZSBuYW1lIG9mIHRoZSBvcmdhbml6YXRpb25cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3Iob3JnYW5pemF0aW9uLCBhdXRoLCBhcGlCYXNlKSB7XG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcbiAgICAgIHRoaXMuX19uYW1lID0gb3JnYW5pemF0aW9uO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIHJlcG9zaXRvcnkgaW4gYW4gb3JnYW5pemF0aW9uXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2NyZWF0ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgcmVwb3NpdG9yeSBkZWZpbml0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjcmVhdGVkIHJlcG9zaXRvcnlcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUmVwbyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL29yZ3MvJHt0aGlzLl9fbmFtZX0vcmVwb3NgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgcmVwb3NpdG9yaWVzIGluIGFuIG9yZ2FuaXphdGlvblxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LW9yZ2FuaXphdGlvbi1yZXBvc2l0b3JpZXNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlcG9zKGNiKSB7XG4gICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKHtkaXJlY3Rpb246ICdkZXNjJ30pO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvb3Jncy8ke3RoaXMuX19uYW1lfS9yZXBvc2AsIHJlcXVlc3RPcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogUXVlcnkgaWYgdGhlIHVzZXIgaXMgYSBtZW1iZXIgb3Igbm90XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSB0aGUgdXNlciBpbiBxdWVzdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSB1c2VyIGlzIGEgbWVtYmVyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGlzTWVtYmVyKHVzZXJuYW1lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL29yZ3MvJHt0aGlzLl9fbmFtZX0vbWVtYmVycy8ke3VzZXJuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB1c2VycyB3aG8gYXJlIG1lbWJlcnMgb2YgdGhlIGNvbXBhbnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL21lbWJlcnMvI21lbWJlcnMtbGlzdFxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBmaWx0ZXJpbmcgb3B0aW9uc1xuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmZpbHRlcj1hbGxdIC0gY2FuIGJlIGVpdGhlciBgMmZhX2Rpc2FibGVkYCBvciBgYWxsYFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJvbGU9YWxsXSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgYWRtaW5gLCBvciBgbWVtYmVyYFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiB1c2Vyc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0TWVtYmVycyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvb3Jncy8ke3RoaXMuX19uYW1lfS9tZW1iZXJzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIFRlYW1zIGluIHRoZSBPcmdhbml6YXRpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNsaXN0LXRlYW1zXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHRlYW1zXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFRlYW1zKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvb3Jncy8ke3RoaXMuX19uYW1lfS90ZWFtc2AsIHVuZGVmaW5lZCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIHRlYW1cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNjcmVhdGUtdGVhbVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUZWFtIGNyZWF0aW9uIHBhcmFtZXRlcnNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdGVhbVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRlc2NyaXB0aW9uXSAtIFRlYW0gZGVzY3JpcHRpb25cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5yZXBvX25hbWVzXSAtIFJlcG9zIHRvIGFkZCB0aGUgdGVhbSB0b1xuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnByaXZhY3k9c2VjcmV0XSAtIFRoZSBsZXZlbCBvZiBwcml2YWN5IHRoZSB0ZWFtIHNob3VsZCBoYXZlLiBDYW4gYmUgZWl0aGVyIG9uZVxuICAgICogb2Y6IGBzZWNyZXRgLCBvciBgY2xvc2VkYFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCB0ZWFtXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVRlYW0ob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9vcmdzLyR7dGhpcy5fX25hbWV9L3RlYW1zYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhbGwgcHJvamVjdHNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy8jbGlzdC1vcmdhbml6YXRpb24tcHJvamVjdHNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcHJvamVjdHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFByb2plY3RzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvb3Jncy8ke3RoaXMuX19uYW1lfS9wcm9qZWN0c2AsIHtBY2NlcHRIZWFkZXI6ICdpbmVydGlhLXByZXZpZXcnfSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBwcm9qZWN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcHJvamVjdHMvI2NyZWF0ZS1hLXByb2plY3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCBwcm9qZWN0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVByb2plY3Qob3B0aW9ucywgY2IpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgb3B0aW9ucy5BY2NlcHRIZWFkZXIgPSAnaW5lcnRpYS1wcmV2aWV3JztcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9vcmdzLyR7dGhpcy5fX25hbWV9L3Byb2plY3RzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9yZ2FuaXphdGlvbjtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuXG4vKipcbiAqIFByb2plY3QgZW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSwgcXVlcnksIGFuZCBtb2RpZnkgY2FyZHMgYW5kIGNvbHVtbnMuXG4gKi9cbmNsYXNzIFByb2plY3QgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIFByb2plY3QuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIHByb2plY3RcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoaWQsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UsICdpbmVydGlhLXByZXZpZXcnKTtcbiAgICAgIHRoaXMuX19pZCA9IGlkO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhIHByb2plY3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy8jZ2V0LWEtcHJvamVjdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHByb2plY3QgaW5mb3JtYXRpb25cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UHJvamVjdChjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcHJvamVjdHMvJHt0aGlzLl9faWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYSBwcm9qZWN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvI3VwZGF0ZS1hLXByb2plY3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgcHJvamVjdFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVQcm9qZWN0KG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3Byb2plY3RzLyR7dGhpcy5fX2lkfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSBwcm9qZWN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvI2RlbGV0ZS1hLXByb2plY3RcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVByb2plY3QoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3Byb2plY3RzLyR7dGhpcy5fX2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIGNvbHVtbnMgb2YgYSBwcm9qZWN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY29sdW1ucy8jbGlzdC1wcm9qZWN0LWNvbHVtbnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29sdW1uc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UHJvamVjdENvbHVtbnMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9wcm9qZWN0cy8ke3RoaXMuX19pZH0vY29sdW1uc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYSBjb2x1bW5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jb2x1bW5zLyNnZXQtYS1wcm9qZWN0LWNvbHVtblxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbElkIC0gdGhlIGlkIG9mIHRoZSBjb2x1bW5cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb2x1bW4gaW5mb3JtYXRpb25cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UHJvamVjdENvbHVtbihjb2xJZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3Byb2plY3RzL2NvbHVtbnMvJHtjb2xJZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGNvbHVtblxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NvbHVtbnMvI2NyZWF0ZS1hLXByb2plY3QtY29sdW1uXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY29sdW1uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCBjb2x1bW5cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUHJvamVjdENvbHVtbihvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3Byb2plY3RzLyR7dGhpcy5fX2lkfS9jb2x1bW5zYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYSBjb2x1bW5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jb2x1bW5zLyN1cGRhdGUtYS1wcm9qZWN0LWNvbHVtblxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbElkIC0gdGhlIGNvbHVtbiBpZFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNvbHVtblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG1vZGlmaWVkIGNvbHVtblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVQcm9qZWN0Q29sdW1uKGNvbElkLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sSWR9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIGNvbHVtblxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NvbHVtbnMvI2RlbGV0ZS1hLXByb2plY3QtY29sdW1uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29sSWQgLSB0aGUgY29sdW1uIHRvIGJlIGRlbGV0ZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVByb2plY3RDb2x1bW4oY29sSWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sSWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIE1vdmUgYSBjb2x1bW5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jb2x1bW5zLyNtb3ZlLWEtcHJvamVjdC1jb2x1bW5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBjb2x1bW4gdG8gYmUgbW92ZWRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIGNhbiBiZSBvbmUgb2YgZmlyc3QsIGxhc3QsIG9yIGFmdGVyOjxjb2x1bW4taWQ+LFxuICAgICogd2hlcmUgPGNvbHVtbi1pZD4gaXMgdGhlIGlkIHZhbHVlIG9mIGEgY29sdW1uIGluIHRoZSBzYW1lIHByb2plY3QuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBtb3ZlUHJvamVjdENvbHVtbihjb2xJZCwgcG9zaXRpb24sIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChcbiAgICAgICAgICdQT1NUJyxcbiAgICAgICAgIGAvcHJvamVjdHMvY29sdW1ucy8ke2NvbElkfS9tb3Zlc2AsXG4gICAgICAgICB7cG9zaXRpb246IHBvc2l0aW9ufSxcbiAgICAgICAgIGNiXG4gICAgICApO1xuICAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIGNhcmRzIG9mIGEgcHJvamVjdFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY2FyZHMvI2xpc3QtcHJvamVjdC1jYXJkc1xuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNhcmRzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICovXG4gICBsaXN0UHJvamVjdENhcmRzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0UHJvamVjdENvbHVtbnMoKVxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XG4gICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChkYXRhLm1hcCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sdW1uLmlkfS9jYXJkc2AsIG51bGwpO1xuICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pLnRoZW4oKGNhcmRzSW5Db2x1bW5zKSA9PiB7XG4gICAgICAgICAgIGNvbnN0IGNhcmRzID0gY2FyZHNJbkNvbHVtbnMucmVkdWNlKChwcmV2LCB7ZGF0YX0pID0+IHtcbiAgICAgICAgICAgICAgcHJldi5wdXNoKC4uLmRhdGEpO1xuICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgfSwgW10pO1xuICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgY2IobnVsbCwgY2FyZHMpO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIHJldHVybiBjYXJkcztcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIGNhcmRzIG9mIGEgY29sdW1uXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jbGlzdC1wcm9qZWN0LWNhcmRzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBpZCBvZiB0aGUgY29sdW1uXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY2FyZHNcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgKi9cbiAgIGxpc3RDb2x1bW5DYXJkcyhjb2xJZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sSWR9L2NhcmRzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgY2FyZFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY2FyZHMvI2dldC1hLXByb2plY3QtY2FyZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2FyZElkIC0gdGhlIGlkIG9mIHRoZSBjYXJkXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjYXJkIGluZm9ybWF0aW9uXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICovXG4gICBnZXRQcm9qZWN0Q2FyZChjYXJkSWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9wcm9qZWN0cy9jb2x1bW5zL2NhcmRzLyR7Y2FyZElkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjYXJkXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jY3JlYXRlLWEtcHJvamVjdC1jYXJkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBjb2x1bW4gaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNhcmRcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ld2x5IGNyZWF0ZWQgY2FyZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgY3JlYXRlUHJvamVjdENhcmQoY29sSWQsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcHJvamVjdHMvY29sdW1ucy8ke2NvbElkfS9jYXJkc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAqIEVkaXQgYSBjYXJkXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jdXBkYXRlLWEtcHJvamVjdC1jYXJkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYXJkSWQgLSB0aGUgY2FyZCBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY2FyZFxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgY2FyZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgdXBkYXRlUHJvamVjdENhcmQoY2FyZElkLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9wcm9qZWN0cy9jb2x1bW5zL2NhcmRzLyR7Y2FyZElkfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAqIERlbGV0ZSBhIGNhcmRcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NhcmRzLyNkZWxldGUtYS1wcm9qZWN0LWNhcmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhcmRJZCAtIHRoZSBjYXJkIHRvIGJlIGRlbGV0ZWRcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWxcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgKi9cbiAgIGRlbGV0ZVByb2plY3RDYXJkKGNhcmRJZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMvJHtjYXJkSWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICogTW92ZSBhIGNhcmRcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NhcmRzLyNtb3ZlLWEtcHJvamVjdC1jYXJkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYXJkSWQgLSB0aGUgY2FyZCB0byBiZSBtb3ZlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcG9zaXRpb24gLSBjYW4gYmUgb25lIG9mIHRvcCwgYm90dG9tLCBvciBhZnRlcjo8Y2FyZC1pZD4sXG4gICAqIHdoZXJlIDxjYXJkLWlkPiBpcyB0aGUgaWQgdmFsdWUgb2YgYSBjYXJkIGluIHRoZSBzYW1lIHByb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBpZCB2YWx1ZSBvZiBhIGNvbHVtbiBpbiB0aGUgc2FtZSBwcm9qZWN0LlxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgbW92ZVByb2plY3RDYXJkKGNhcmRJZCwgcG9zaXRpb24sIGNvbElkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoXG4gICAgICAgICAnUE9TVCcsXG4gICAgICAgICBgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMvJHtjYXJkSWR9L21vdmVzYCxcbiAgICAgICAgIHtwb3NpdGlvbjogcG9zaXRpb24sIGNvbHVtbl9pZDogY29sSWR9LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAgICAgICAgY2JcbiAgICAgICk7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdDtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuXG4vKipcbiAqIFJhdGVMaW1pdCBhbGxvd3MgdXNlcnMgdG8gcXVlcnkgdGhlaXIgcmF0ZS1saW1pdCBzdGF0dXNcbiAqL1xuY2xhc3MgUmF0ZUxpbWl0IGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBjb25zdHJ1Y3QgYSBSYXRlTGltaXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gYXV0aCAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0SHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2VdIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogUXVlcnkgdGhlIGN1cnJlbnQgcmF0ZSBsaW1pdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JhdGVfbGltaXQvXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByYXRlLWxpbWl0IGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UmF0ZUxpbWl0KGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgJy9yYXRlX2xpbWl0JywgbnVsbCwgY2IpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJhdGVMaW1pdDtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuaW1wb3J0IFV0ZjggZnJvbSAndXRmOCc7XG5pbXBvcnQge1xuICAgQmFzZTY0LFxufSBmcm9tICdqcy1iYXNlNjQnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6cmVwb3NpdG9yeScpO1xuXG4vKipcbiAqIFJlc3Bvc2l0b3J5IGVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUsIHF1ZXJ5LCBhbmQgbW9kaWZ5IGZpbGVzLlxuICovXG5jbGFzcyBSZXBvc2l0b3J5IGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBSZXBvc2l0b3J5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxuYW1lIC0gdGhlIGZ1bGwgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3RvcihmdWxsbmFtZSwgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fZnVsbG5hbWUgPSBmdWxsbmFtZTtcbiAgICAgIHRoaXMuX19jdXJyZW50VHJlZSA9IHtcbiAgICAgICAgIGJyYW5jaDogbnVsbCxcbiAgICAgICAgIHNoYTogbnVsbCxcbiAgICAgIH07XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgcmVmZXJlbmNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI2dldC1hLXJlZmVyZW5jZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWZlcmVuY2UgdG8gZ2V0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZWZlcmVuY2UncyByZWZTcGVjIG9yIGEgbGlzdCBvZiByZWZTcGVjcyB0aGF0IG1hdGNoIGByZWZgXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlZihyZWYsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIHJlZmVyZW5jZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNjcmVhdGUtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIG9iamVjdCBkZXNjcmliaW5nIHRoZSByZWZcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlZlxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVSZWYob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgcmVmZXJlbmNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI2RlbGV0ZS1hLXJlZmVyZW5jZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSBuYW1lIG9mIHRoZSByZWYgdG8gZGVsdGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVJlZihyZWYsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jZGVsZXRlLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlUmVwbyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIHRhZ3Mgb24gYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3QtdGFnc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdGFnIGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFRhZ3MoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS90YWdzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIG9wZW4gcHVsbCByZXF1ZXN0cyBvbiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNsaXN0LXB1bGwtcmVxdWVzdHNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyB0byBmaWx0ZXIgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBQUnNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFB1bGxSZXF1ZXN0cyhvcHRpb25zLCBjYikge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgc3BlY2lmaWMgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2dldC1hLXNpbmdsZS1wdWxsLXJlcXVlc3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSB0aGUgUFIgeW91IHdpc2ggdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIFBSIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRQdWxsUmVxdWVzdChudW1iZXIsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGZpbGVzIG9mIGEgc3BlY2lmaWMgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2xpc3QtcHVsbC1yZXF1ZXN0cy1maWxlc1xuICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW1iZXIgLSB0aGUgUFIgeW91IHdpc2ggdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZmlsZXMgZnJvbSB0aGUgQVBJXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RQdWxsUmVxdWVzdEZpbGVzKG51bWJlciwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxscy8ke251bWJlcn0vZmlsZXNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ29tcGFyZSB0d28gYnJhbmNoZXMvY29tbWl0cy9yZXBvc2l0b3JpZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb21taXRzLyNjb21wYXJlLXR3by1jb21taXRzXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZSAtIHRoZSBiYXNlIGNvbW1pdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWQgLSB0aGUgaGVhZCBjb21taXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21wYXJpc29uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNvbXBhcmVCcmFuY2hlcyhiYXNlLCBoZWFkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbXBhcmUvJHtiYXNlfS4uLiR7aGVhZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCBhbGwgdGhlIGJyYW5jaGVzIGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LWJyYW5jaGVzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBicmFuY2hlc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0QnJhbmNoZXMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9icmFuY2hlc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSByYXcgYmxvYiBmcm9tIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2Jsb2JzLyNnZXQtYS1ibG9iXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSBvZiB0aGUgYmxvYiB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGJsb2IgZnJvbSB0aGUgQVBJXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldEJsb2Ioc2hhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9ibG9icy8ke3NoYX1gLCBudWxsLCBjYiwgJ3JhdycpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIHNpbmdsZSBicmFuY2hcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9icmFuY2hlcy8jZ2V0LWJyYW5jaFxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaCAtIHRoZSBuYW1lIG9mIHRoZSBicmFuY2ggdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBicmFuY2ggZnJvbSB0aGUgQVBJXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRCcmFuY2goYnJhbmNoLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2JyYW5jaGVzLyR7YnJhbmNofWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBjb21taXQgZnJvbSB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbW1pdHMvI2dldC1hLXNpbmdsZS1jb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGEgLSB0aGUgc2hhIGZvciB0aGUgY29tbWl0IHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0Q29tbWl0KHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvY29tbWl0cy8ke3NoYX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgY29tbWl0cyBvbiBhIHJlcG9zaXRvcnksIG9wdGlvbmFsbHkgZmlsdGVyaW5nIGJ5IHBhdGgsIGF1dGhvciBvciB0aW1lIHJhbmdlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jbGlzdC1jb21taXRzLW9uLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBmaWx0ZXJpbmcgb3B0aW9ucyBmb3IgY29tbWl0c1xuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnNoYV0gLSB0aGUgU0hBIG9yIGJyYW5jaCB0byBzdGFydCBmcm9tXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGF0aF0gLSB0aGUgcGF0aCB0byBzZWFyY2ggb25cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hdXRob3JdIC0gdGhlIGNvbW1pdCBhdXRob3JcbiAgICAqIEBwYXJhbSB7KERhdGV8c3RyaW5nKX0gW29wdGlvbnMuc2luY2VdIC0gb25seSBjb21taXRzIGFmdGVyIHRoaXMgZGF0ZSB3aWxsIGJlIHJldHVybmVkXG4gICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtvcHRpb25zLnVudGlsXSAtIG9ubHkgY29tbWl0cyBiZWZvcmUgdGhpcyBkYXRlIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbW1pdHMgZm91bmQgbWF0Y2hpbmcgdGhlIGNyaXRlcmlhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RDb21taXRzKG9wdGlvbnMsIGNiKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgb3B0aW9ucy5zaW5jZSA9IHRoaXMuX2RhdGVUb0lTTyhvcHRpb25zLnNpbmNlKTtcbiAgICAgIG9wdGlvbnMudW50aWwgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy51bnRpbCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21taXRzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHNpbmdsZSBjb21taXQgaW5mb3JtYXRpb24gZm9yIGEgcmVwb3NpdG9yeVxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb21taXRzLyNnZXQtYS1zaW5nbGUtY29tbWl0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWZlcmVuY2UgZm9yIHRoZSBjb21taXQtaXNoXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBpbmZvcm1hdGlvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAgKi9cbiAgIGdldFNpbmdsZUNvbW1pdChyZWYsIGNiKSB7XG4gICAgICByZWYgPSByZWYgfHwgJyc7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29tbWl0cy8ke3JlZn1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IHRoYSBzaGEgZm9yIGEgcGFydGljdWxhciBvYmplY3QgaW4gdGhlIHJlcG9zaXRvcnkuIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBmdW5jdGlvblxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNnZXQtY29udGVudHNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYnJhbmNoXSAtIHRoZSBicmFuY2ggdG8gbG9vayBpbiwgb3IgdGhlIHJlcG9zaXRvcnkncyBkZWZhdWx0IGJyYW5jaCBpZiBvbWl0dGVkXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIG9mIHRoZSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgYSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVxdWVzdGVkIG9iamVjdCwgaW5jbHVkaW5nIGEgYFNIQWAgcHJvcGVydHlcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0U2hhKGJyYW5jaCwgcGF0aCwgY2IpIHtcbiAgICAgIGJyYW5jaCA9IGJyYW5jaCA/IGA/cmVmPSR7YnJhbmNofWAgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke3BhdGh9JHticmFuY2h9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGNvbW1pdCBzdGF0dXNlcyBmb3IgYSBwYXJ0aWN1bGFyIHNoYSwgYnJhbmNoLCBvciB0YWdcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9zdGF0dXNlcy8jbGlzdC1zdGF0dXNlcy1mb3ItYS1zcGVjaWZpYy1yZWZcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGEgLSB0aGUgc2hhLCBicmFuY2gsIG9yIHRhZyB0byBnZXQgc3RhdHVzZXMgZm9yXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBzdGF0dXNlc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0U3RhdHVzZXMoc2hhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbW1pdHMvJHtzaGF9L3N0YXR1c2VzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIGRlc2NyaXB0aW9uIG9mIGEgZ2l0IHRyZWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvdHJlZXMvI2dldC1hLXRyZWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmVlU0hBIC0gdGhlIFNIQSBvZiB0aGUgdHJlZSB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNhbGxiYWNrIGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0VHJlZSh0cmVlU0hBLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC90cmVlcy8ke3RyZWVTSEF9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIGJsb2JcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvYmxvYnMvI2NyZWF0ZS1hLWJsb2JcbiAgICAqIEBwYXJhbSB7KHN0cmluZ3xCdWZmZXJ8QmxvYil9IGNvbnRlbnQgLSB0aGUgY29udGVudCB0byBhZGQgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBkZXRhaWxzIG9mIHRoZSBjcmVhdGVkIGJsb2JcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlQmxvYihjb250ZW50LCBjYikge1xuICAgICAgbGV0IHBvc3RCb2R5ID0gdGhpcy5fZ2V0Q29udGVudE9iamVjdChjb250ZW50KTtcblxuICAgICAgbG9nKCdzZW5kaW5nIGNvbnRlbnQnLCBwb3N0Qm9keSk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9ibG9ic2AsIHBvc3RCb2R5LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IHRoZSBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBwcm92aWRlZCBjb250ZW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ3xCdWZmZXJ8QmxvYn0gY29udGVudCAtIHRoZSBjb250ZW50IHRvIHNlbmQgdG8gdGhlIHNlcnZlclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgcmVwcmVzZW50YXRpb24gb2YgYGNvbnRlbnRgIGZvciB0aGUgR2l0SHViIEFQSVxuICAgICovXG4gICBfZ2V0Q29udGVudE9iamVjdChjb250ZW50KSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICBsb2coJ2NvbnRldCBpcyBhIHN0cmluZycpO1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFV0ZjguZW5jb2RlKGNvbnRlbnQpLFxuICAgICAgICAgICAgZW5jb2Rpbmc6ICd1dGYtOCcsXG4gICAgICAgICB9O1xuXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGNvbnRlbnQgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICAgICAgIGxvZygnV2UgYXBwZWFyIHRvIGJlIGluIE5vZGUnKTtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LnRvU3RyaW5nKCdiYXNlNjQnKSxcbiAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0JyxcbiAgICAgICAgIH07XG5cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGNvbnRlbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICBsb2coJ1dlIGFwcGVhciB0byBiZSBpbiB0aGUgYnJvd3NlcicpO1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IEJhc2U2NC5lbmNvZGUoY29udGVudCksXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICB9O1xuXG4gICAgICB9IGVsc2UgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICBsb2coYE5vdCBzdXJlIHdoYXQgdGhpcyBjb250ZW50IGlzOiAke3R5cGVvZiBjb250ZW50fSwgJHtKU09OLnN0cmluZ2lmeShjb250ZW50KX1gKTtcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBjb250ZW50IHBhc3NlZCB0byBwb3N0QmxvYi4gTXVzdCBiZSBzdHJpbmcgb3IgQnVmZmVyIChub2RlKSBvciBCbG9iICh3ZWIpJyk7XG4gICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogVXBkYXRlIGEgdHJlZSBpbiBHaXRcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvdHJlZXMvI2NyZWF0ZS1hLXRyZWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVHJlZVNIQSAtIHRoZSBTSEEgb2YgdGhlIHRyZWUgdG8gdXBkYXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGZvciB0aGUgbmV3IGZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBibG9iU0hBIC0gdGhlIFNIQSBmb3IgdGhlIGJsb2IgdG8gcHV0IGF0IGBwYXRoYFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyB0cmVlIHRoYXQgaXMgY3JlYXRlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBSZXBvc2l0b3J5I2NyZWF0ZVRyZWV9IGluc3RlYWRcbiAgICAqL1xuICAgdXBkYXRlVHJlZShiYXNlVHJlZVNIQSwgcGF0aCwgYmxvYlNIQSwgY2IpIHtcbiAgICAgIGxldCBuZXdUcmVlID0ge1xuICAgICAgICAgYmFzZV90cmVlOiBiYXNlVHJlZVNIQSwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgdHJlZTogW3tcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBzaGE6IGJsb2JTSEEsXG4gICAgICAgICAgICBtb2RlOiAnMTAwNjQ0JyxcbiAgICAgICAgICAgIHR5cGU6ICdibG9iJyxcbiAgICAgICAgIH1dLFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvdHJlZXNgLCBuZXdUcmVlLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHRyZWUgaW4gZ2l0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNjcmVhdGUtYS10cmVlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gdHJlZSAtIHRoZSB0cmVlIHRvIGNyZWF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2VTSEEgLSB0aGUgcm9vdCBzaGEgb2YgdGhlIHRyZWVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgdHJlZSB0aGF0IGlzIGNyZWF0ZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlVHJlZSh0cmVlLCBiYXNlU0hBLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvdHJlZXNgLCB7XG4gICAgICAgICB0cmVlLFxuICAgICAgICAgYmFzZV90cmVlOiBiYXNlU0hBLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAgICAgfSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEFkZCBhIGNvbW1pdCB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9jb21taXRzLyNjcmVhdGUtYS1jb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnQgLSB0aGUgU0hBIG9mIHRoZSBwYXJlbnQgY29tbWl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdHJlZSAtIHRoZSBTSEEgb2YgdGhlIHRyZWUgZm9yIHRoaXMgY29tbWl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBjb21taXQgbWVzc2FnZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCB0aGF0IGlzIGNyZWF0ZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY29tbWl0KHBhcmVudCwgdHJlZSwgbWVzc2FnZSwgY2IpIHtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgIHRyZWUsXG4gICAgICAgICBwYXJlbnRzOiBbcGFyZW50XSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L2NvbW1pdHNgLCBkYXRhLCBjYilcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fX2N1cnJlbnRUcmVlLnNoYSA9IHJlc3BvbnNlLmRhdGEuc2hhOyAvLyBVcGRhdGUgbGF0ZXN0IGNvbW1pdFxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogVXBkYXRlIGEgcmVmXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI3VwZGF0ZS1hLXJlZmVyZW5jZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWYgdG8gdXBkYXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWl0U0hBIC0gdGhlIFNIQSB0byBwb2ludCB0aGUgcmVmZXJlbmNlIHRvXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlIC0gaW5kaWNhdGVzIHdoZXRoZXIgdG8gZm9yY2Ugb3IgZW5zdXJlIGEgZmFzdC1mb3J3YXJkIHVwZGF0ZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgcmVmIGJhY2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlSGVhZChyZWYsIGNvbW1pdFNIQSwgZm9yY2UsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvcmVmcy8ke3JlZn1gLCB7XG4gICAgICAgICBzaGE6IGNvbW1pdFNIQSxcbiAgICAgICAgIGZvcmNlOiBmb3JjZSxcbiAgICAgIH0sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVcGRhdGUgY29tbWl0IHN0YXR1c1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3N0YXR1c2VzL1xuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1pdFNIQSAtIHRoZSBTSEEgb2YgdGhlIGNvbW1pdCB0aGF0IHNob3VsZCBiZSB1cGRhdGVkXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIENvbW1pdCBzdGF0dXMgcGFyYW1ldGVyc1xuICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc3RhdGUgLSBUaGUgc3RhdGUgb2YgdGhlIHN0YXR1cy4gQ2FuIGJlIG9uZSBvZjogcGVuZGluZywgc3VjY2VzcywgZXJyb3IsIG9yIGZhaWx1cmUuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudGFyZ2V0X3VybF0gLSBUaGUgdGFyZ2V0IFVSTCB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIHN0YXR1cy5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kZXNjcmlwdGlvbl0gLSBBIHNob3J0IGRlc2NyaXB0aW9uIG9mIHRoZSBzdGF0dXMuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29udGV4dF0gLSBBIHN0cmluZyBsYWJlbCB0byBkaWZmZXJlbnRpYXRlIHRoaXMgc3RhdHVzIGFtb25nIENJIHN5c3RlbXMuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCBjb21taXQgYmFja1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVTdGF0dXMoY29tbWl0U0hBLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9zdGF0dXNlcy8ke2NvbW1pdFNIQX1gLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogVXBkYXRlIHJlcG9zaXRvcnkgaW5mb3JtYXRpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jZWRpdFxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBOZXcgcGFyYW1ldGVycyB0aGF0IHdpbGwgYmUgc2V0IHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gTmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRlc2NyaXB0aW9uXSAtIEEgc2hvcnQgZGVzY3JpcHRpb24gb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5ob21lcGFnZV0gLSBBIFVSTCB3aXRoIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucHJpdmF0ZV0gLSBFaXRoZXIgdHJ1ZSB0byBtYWtlIHRoZSByZXBvc2l0b3J5IHByaXZhdGUsIG9yIGZhbHNlIHRvIG1ha2UgaXQgcHVibGljLlxuICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5oYXNfaXNzdWVzXSAtIEVpdGhlciB0cnVlIHRvIGVuYWJsZSBpc3N1ZXMgZm9yIHRoaXMgcmVwb3NpdG9yeSwgZmFsc2UgdG8gZGlzYWJsZSB0aGVtLlxuICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5oYXNfd2lraV0gLSBFaXRoZXIgdHJ1ZSB0byBlbmFibGUgdGhlIHdpa2kgZm9yIHRoaXMgcmVwb3NpdG9yeSwgZmFsc2UgdG8gZGlzYWJsZSBpdC5cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaGFzX2Rvd25sb2Fkc10gLSBFaXRoZXIgdHJ1ZSB0byBlbmFibGUgZG93bmxvYWRzLCBmYWxzZSB0byBkaXNhYmxlIHRoZW0uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVmYXVsdF9icmFuY2hdIC0gVXBkYXRlcyB0aGUgZGVmYXVsdCBicmFuY2ggZm9yIHRoaXMgcmVwb3NpdG9yeS5cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHJlcG9zaXRvcnkgYmFja1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVSZXBvc2l0b3J5KG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNnZXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVwb3NpdG9yeVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXREZXRhaWxzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3QtY29udHJpYnV0b3JzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBjb250cmlidXRvcnNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0Q29udHJpYnV0b3JzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udHJpYnV0b3JzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGNvbnRyaWJ1dG9yIHN0YXRzIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3QtY29udHJpYnV0b3JzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBjb250cmlidXRvcnNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0Q29udHJpYnV0b3JTdGF0cyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3N0YXRzL2NvbnRyaWJ1dG9yc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB1c2VycyB3aG8gYXJlIGNvbGxhYm9yYXRvcnMgb24gdGhlIHJlcG9zaXRvcnkuIFRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIG11c3QgaGF2ZVxuICAgICogcHVzaCBhY2Nlc3MgdG8gdXNlIHRoaXMgbWV0aG9kXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29sbGFib3JhdG9ycy8jbGlzdC1jb2xsYWJvcmF0b3JzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBjb2xsYWJvcmF0b3JzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldENvbGxhYm9yYXRvcnMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb2xsYWJvcmF0b3JzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENoZWNrIGlmIGEgdXNlciBpcyBhIGNvbGxhYm9yYXRvciBvbiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbGxhYm9yYXRvcnMvI2NoZWNrLWlmLWEtdXNlci1pcy1hLWNvbGxhYm9yYXRvclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gY2hlY2tcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHVzZXIgaXMgYSBjb2xsYWJvcmF0b3IgYW5kIGZhbHNlIGlmIHRoZXkgYXJlIG5vdFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdCB7Qm9vbGVhbn0gW2Rlc2NyaXB0aW9uXVxuICAgICovXG4gICBpc0NvbGxhYm9yYXRvcih1c2VybmFtZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb2xsYWJvcmF0b3JzLyR7dXNlcm5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGUgY29udGVudHMgb2YgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29udGVudHMvI2dldC1jb250ZW50c1xuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWYgdG8gY2hlY2tcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggY29udGFpbmluZyB0aGUgY29udGVudCB0byBmZXRjaFxuICAgICogQHBhcmFtIHtib29sZWFufSByYXcgLSBgdHJ1ZWAgaWYgdGhlIHJlc3VsdHMgc2hvdWxkIGJlIHJldHVybmVkIHJhdyBpbnN0ZWFkIG9mIEdpdEh1YidzIG5vcm1hbGl6ZWQgZm9ybWF0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZmV0Y2hlZCBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldENvbnRlbnRzKHJlZiwgcGF0aCwgcmF3LCBjYikge1xuICAgICAgcGF0aCA9IHBhdGggPyBgJHtlbmNvZGVVUkkocGF0aCl9YCA6ICcnO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7cGF0aH1gLCB7XG4gICAgICAgICByZWYsXG4gICAgICB9LCBjYiwgcmF3KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgdGhlIFJFQURNRSBvZiBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LXRoZS1yZWFkbWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmIHRvIGNoZWNrXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJhdyAtIGB0cnVlYCBpZiB0aGUgcmVzdWx0cyBzaG91bGQgYmUgcmV0dXJuZWQgcmF3IGluc3RlYWQgb2YgR2l0SHViJ3Mgbm9ybWFsaXplZCBmb3JtYXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBmZXRjaGVkIGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UmVhZG1lKHJlZiwgcmF3LCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlYWRtZWAsIHtcbiAgICAgICAgIHJlZixcbiAgICAgIH0sIGNiLCByYXcpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEZvcmsgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvZm9ya3MvI2NyZWF0ZS1hLWZvcmtcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbmV3bHkgY3JlYXRlZCBmb3JrXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvcmsoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZm9ya3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCBhIHJlcG9zaXRvcnkncyBmb3Jrc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2ZvcmtzLyNsaXN0LWZvcmtzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiByZXBvc2l0b3JpZXMgZm9ya2VkIGZyb20gdGhpcyBvbmVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEZvcmtzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZm9ya3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGJyYW5jaCBmcm9tIGFuIGV4aXN0aW5nIGJyYW5jaC5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb2xkQnJhbmNoPW1hc3Rlcl0gLSB0aGUgbmFtZSBvZiB0aGUgZXhpc3RpbmcgYnJhbmNoXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3QnJhbmNoIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBicmFuY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgZGF0YSBmb3IgdGhlIGhlYWQgb2YgdGhlIG5ldyBicmFuY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlQnJhbmNoKG9sZEJyYW5jaCwgbmV3QnJhbmNoLCBjYikge1xuICAgICAgaWYgKHR5cGVvZiBuZXdCcmFuY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgIGNiID0gbmV3QnJhbmNoO1xuICAgICAgICAgbmV3QnJhbmNoID0gb2xkQnJhbmNoO1xuICAgICAgICAgb2xkQnJhbmNoID0gJ21hc3Rlcic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFJlZihgaGVhZHMvJHtvbGRCcmFuY2h9YClcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNoYSA9IHJlc3BvbnNlLmRhdGEub2JqZWN0LnNoYTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlZih7XG4gICAgICAgICAgICAgICBzaGEsXG4gICAgICAgICAgICAgICByZWY6IGByZWZzL2hlYWRzLyR7bmV3QnJhbmNofWAsXG4gICAgICAgICAgICB9LCBjYik7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2NyZWF0ZS1hLXB1bGwtcmVxdWVzdFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgcHVsbCByZXF1ZXN0IGRlc2NyaXB0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IHB1bGwgcmVxdWVzdFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVQdWxsUmVxdWVzdChvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxsc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVcGRhdGUgYSBwdWxsIHJlcXVlc3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jdXBkYXRlLWEtcHVsbC1yZXF1ZXN0XG4gICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bWJlciAtIHRoZSBudW1iZXIgb2YgdGhlIHB1bGwgcmVxdWVzdCB0byB1cGRhdGVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIHB1bGwgcmVxdWVzdCBkZXNjcmlwdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcHVsbCByZXF1ZXN0IGluZm9ybWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZVB1bGxSZXF1ZXN0KG51bWJlciwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzLyR7bnVtYmVyfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBob29rcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jbGlzdC1ob29rc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgaG9va3NcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEhvb2tzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgaG9vayBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jZ2V0LXNpbmdsZS1ob29rXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgaWQgb2YgdGhlIHdlYm9va1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGRldGFpbHMgb2YgdGhlIHdlYm9va1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRIb29rKGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEFkZCBhIG5ldyBob29rIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2NyZWF0ZS1hLWhvb2tcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGNvbmZpZ3VyYXRpb24gZGVzY3JpYmluZyB0aGUgbmV3IGhvb2tcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgd2ViaG9va1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVIb29rKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYW4gZXhpc3Rpbmcgd2ViaG9va1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNlZGl0LWEtaG9va1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJob29rXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBuZXcgZGVzY3JpcHRpb24gb2YgdGhlIHdlYmhvb2tcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHdlYmhvb2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlSG9vayhpZCwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIHdlYmhvb2tcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jZGVsZXRlLWEtaG9va1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJob29rIHRvIGJlIGRlbGV0ZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIGNhbGwgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVIb29rKGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAke3RoaXMuX19mdWxsbmFtZX0vaG9va3MvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgZGVwbG95IGtleXMgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mva2V5cy8jbGlzdC1kZXBsb3kta2V5c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZGVwbG95IGtleXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEtleXMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9rZXlzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIGRlcGxveSBrZXkgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mva2V5cy8jZ2V0LWEtZGVwbG95LWtleVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSBkZXBsb3kga2V5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZGV0YWlscyBvZiB0aGUgZGVwbG95IGtleVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRLZXkoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0va2V5cy8ke2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBZGQgYSBuZXcgZGVwbG95IGtleSB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI2FkZC1hLW5ldy1kZXBsb3kta2V5XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBjb25maWd1cmF0aW9uIGRlc2NyaWJpbmcgdGhlIG5ldyBkZXBsb3kga2V5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IGRlcGxveSBrZXlcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlS2V5KG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgZGVwbG95IGtleVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI3JlbW92ZS1hLWRlcGxveS1rZXlcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBpZCBvZiB0aGUgZGVwbG95IGtleSB0byBiZSBkZWxldGVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBjYWxsIGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlS2V5KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGEgYnJhbmNoXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29udGVudHMvI2RlbGV0ZS1hLWZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgYnJhbmNoIHRvIGRlbGV0ZSBmcm9tLCBvciB0aGUgZGVmYXVsdCBicmFuY2ggaWYgbm90IHNwZWNpZmllZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZW1vdmVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgaW4gd2hpY2ggdGhlIGRlbGV0ZSBvY2N1cnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVGaWxlKGJyYW5jaCwgcGF0aCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNoYShicmFuY2gsIHBhdGgpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUNvbW1pdCA9IHtcbiAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBEZWxldGUgdGhlIGZpbGUgYXQgJyR7cGF0aH0nYCxcbiAgICAgICAgICAgICAgIHNoYTogcmVzcG9uc2UuZGF0YS5zaGEsXG4gICAgICAgICAgICAgICBicmFuY2gsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7cGF0aH1gLCBkZWxldGVDb21taXQsIGNiKTtcbiAgICAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENoYW5nZSBhbGwgcmVmZXJlbmNlcyBpbiBhIHJlcG8gZnJvbSBvbGRQYXRoIHRvIG5ld19wYXRoXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYnJhbmNoIC0gdGhlIGJyYW5jaCB0byBjYXJyeSBvdXQgdGhlIHJlZmVyZW5jZSBjaGFuZ2UsIG9yIHRoZSBkZWZhdWx0IGJyYW5jaCBpZiBub3Qgc3BlY2lmaWVkXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGF0aCAtIG9yaWdpbmFsIHBhdGhcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXRoIC0gbmV3IHJlZmVyZW5jZSBwYXRoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGluIHdoaWNoIHRoZSBtb3ZlIG9jY3VycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIG1vdmUoYnJhbmNoLCBvbGRQYXRoLCBuZXdQYXRoLCBjYikge1xuICAgICAgbGV0IG9sZFNoYTtcbiAgICAgIHJldHVybiB0aGlzLmdldFJlZihgaGVhZHMvJHticmFuY2h9YClcbiAgICAgICAgIC50aGVuKCh7ZGF0YToge29iamVjdH19KSA9PiB0aGlzLmdldFRyZWUoYCR7b2JqZWN0LnNoYX0/cmVjdXJzaXZlPXRydWVgKSlcbiAgICAgICAgIC50aGVuKCh7ZGF0YToge3RyZWUsIHNoYX19KSA9PiB7XG4gICAgICAgICAgICBvbGRTaGEgPSBzaGE7XG4gICAgICAgICAgICBsZXQgbmV3VHJlZSA9IHRyZWUubWFwKChyZWYpID0+IHtcbiAgICAgICAgICAgICAgIGlmIChyZWYucGF0aCA9PT0gb2xkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgcmVmLnBhdGggPSBuZXdQYXRoO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYgKHJlZi50eXBlID09PSAndHJlZScpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZWYuc2hhO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHJlZShuZXdUcmVlKTtcbiAgICAgICAgIH0pXG4gICAgICAgICAudGhlbigoe2RhdGE6IHRyZWV9KSA9PiB0aGlzLmNvbW1pdChvbGRTaGEsIHRyZWUuc2hhLCBgUmVuYW1lZCAnJHtvbGRQYXRofScgdG8gJyR7bmV3UGF0aH0nYCkpXG4gICAgICAgICAudGhlbigoe2RhdGE6IGNvbW1pdH0pID0+IHRoaXMudXBkYXRlSGVhZChgaGVhZHMvJHticmFuY2h9YCwgY29tbWl0LnNoYSwgdHJ1ZSwgY2IpKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBXcml0ZSBhIGZpbGUgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jdXBkYXRlLWEtZmlsZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaCAtIHRoZSBuYW1lIG9mIHRoZSBicmFuY2hcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggZm9yIHRoZSBmaWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgY29tbWl0IG1lc3NhZ2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBjb21taXQgb3B0aW9uc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmF1dGhvcl0gLSB0aGUgYXV0aG9yIG9mIHRoZSBjb21taXRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5jb21taXRlcl0gLSB0aGUgY29tbWl0dGVyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmVuY29kZV0gLSB0cnVlIGlmIHRoZSBjb250ZW50IHNob3VsZCBiZSBiYXNlNjQgZW5jb2RlZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBjb21taXRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgd3JpdGVGaWxlKGJyYW5jaCwgcGF0aCwgY29udGVudCwgbWVzc2FnZSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVQYXRoID0gcGF0aCA/IGVuY29kZVVSSShwYXRoKSA6ICcnO1xuICAgICAgbGV0IHNob3VsZEVuY29kZSA9IG9wdGlvbnMuZW5jb2RlICE9PSBmYWxzZTtcbiAgICAgIGxldCBjb21taXQgPSB7XG4gICAgICAgICBicmFuY2gsXG4gICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgYXV0aG9yOiBvcHRpb25zLmF1dGhvcixcbiAgICAgICAgIGNvbW1pdHRlcjogb3B0aW9ucy5jb21taXR0ZXIsXG4gICAgICAgICBjb250ZW50OiBzaG91bGRFbmNvZGUgPyBCYXNlNjQuZW5jb2RlKGNvbnRlbnQpIDogY29udGVudCxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFNoYShicmFuY2gsIGZpbGVQYXRoKVxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb21taXQuc2hhID0gcmVzcG9uc2UuZGF0YS5zaGE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtmaWxlUGF0aH1gLCBjb21taXQsIGNiKTtcbiAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke2ZpbGVQYXRofWAsIGNvbW1pdCwgY2IpO1xuICAgICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ2hlY2sgaWYgYSByZXBvc2l0b3J5IGlzIHN0YXJyZWQgYnkgeW91XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI2NoZWNrLWlmLXlvdS1hcmUtc3RhcnJpbmctYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXBvc2l0b3J5IGlzIHN0YXJyZWQgYW5kIGZhbHNlIGlmIHRoZSByZXBvc2l0b3J5XG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBub3Qgc3RhcnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdCB7Qm9vbGVhbn0gW2Rlc2NyaXB0aW9uXVxuICAgICovXG4gICBpc1N0YXJyZWQoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0MjA0b3I0MDQoYC91c2VyL3N0YXJyZWQvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFN0YXIgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI3N0YXItYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXBvc2l0b3J5IGlzIHN0YXJyZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgc3RhcihjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvdXNlci9zdGFycmVkLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVbnN0YXIgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI3Vuc3Rhci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcG9zaXRvcnkgaXMgdW5zdGFycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVuc3RhcihjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvdXNlci9zdGFycmVkLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgcmVsZWFzZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNjcmVhdGUtYS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVsZWFzZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ld2x5IGNyZWF0ZWQgcmVsZWFzZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVSZWxlYXNlKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYSByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2VkaXQtYS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIHJlbGVhc2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSByZWxlYXNlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgcmVsZWFzZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVSZWxlYXNlKGlkLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGFsbCByZWxlYXNlc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNsaXN0LXJlbGVhc2VzLWZvci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSByZWxlYXNlIGluZm9ybWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RSZWxlYXNlcyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhIHJlbGVhc2VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jZ2V0LWEtc2luZ2xlLXJlbGVhc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgcmVsZWFzZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHJlbGVhc2UgaW5mb3JtYXRpb25cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UmVsZWFzZShpZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlcy8ke2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2RlbGV0ZS1hLXJlbGVhc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSByZWxlYXNlIHRvIGJlIGRlbGV0ZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVJlbGVhc2UoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTWVyZ2UgYSBwdWxsIHJlcXVlc3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jbWVyZ2UtYS1wdWxsLXJlcXVlc3QtbWVyZ2UtYnV0dG9uXG4gICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bWJlciAtIHRoZSBudW1iZXIgb2YgdGhlIHB1bGwgcmVxdWVzdCB0byBtZXJnZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgbWVyZ2Ugb3B0aW9ucyBmb3IgdGhlIHB1bGwgcmVxdWVzdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVyZ2UgaW5mb3JtYXRpb24gaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIG1lcmdlUHVsbFJlcXVlc3QobnVtYmVyLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzLyR7bnVtYmVyfS9tZXJnZWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIHByb2plY3RzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvI2xpc3QtcmVwb3NpdG9yeS1wcm9qZWN0c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBwcm9qZWN0c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UHJvamVjdHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHJvamVjdHNgLCB7QWNjZXB0SGVhZGVyOiAnaW5lcnRpYS1wcmV2aWV3J30sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgcHJvamVjdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzLyNjcmVhdGUtYS1yZXBvc2l0b3J5LXByb2plY3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCBwcm9qZWN0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVByb2plY3Qob3B0aW9ucywgY2IpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgb3B0aW9ucy5BY2NlcHRIZWFkZXIgPSAnaW5lcnRpYS1wcmV2aWV3JztcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHJvamVjdHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvc2l0b3J5O1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxNiBZYWhvbyBJbmMuXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHtCYXNlNjR9IGZyb20gJ2pzLWJhc2U2NCc7XG5cbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6cmVxdWVzdCcpO1xuXG4vKipcbiAqIFRoZSBlcnJvciBzdHJ1Y3R1cmUgcmV0dXJuZWQgd2hlbiBhIG5ldHdvcmsgY2FsbCBmYWlsc1xuICovXG5jbGFzcyBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgLyoqXG4gICAgKiBDb25zdHJ1Y3QgYSBuZXcgUmVzcG9uc2VFcnJvclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBhbiBtZXNzYWdlIHRvIHJldHVybiBpbnN0ZWFkIG9mIHRoZSB0aGUgZGVmYXVsdCBlcnJvciBtZXNzYWdlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSByZXF1ZXN0ZWQgcGF0aFxuICAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIC0gdGhlIG9iamVjdCByZXR1cm5lZCBieSBBeGlvc1xuICAgICovXG4gICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBwYXRoLCByZXNwb25zZSkge1xuICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVzcG9uc2UuY29uZmlnO1xuICAgICAgdGhpcy5yZXNwb25zZSA9IChyZXNwb25zZSB8fCB7fSkucmVzcG9uc2UgfHwgcmVzcG9uc2U7XG4gICAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgIH1cbn1cblxuLyoqXG4gKiBSZXF1ZXN0YWJsZSB3cmFwcyB0aGUgbG9naWMgZm9yIG1ha2luZyBodHRwIHJlcXVlc3RzIHRvIHRoZSBBUElcbiAqL1xuY2xhc3MgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBFaXRoZXIgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmQgb3IgYW4gb2F1dGggdG9rZW4gZm9yIEdpdGh1YlxuICAgICogQHR5cGVkZWYge09iamVjdH0gUmVxdWVzdGFibGUuYXV0aFxuICAgICogQHByb3Age3N0cmluZ30gW3VzZXJuYW1lXSAtIHRoZSBHaXRodWIgdXNlcm5hbWVcbiAgICAqIEBwcm9wIHtzdHJpbmd9IFtwYXNzd29yZF0gLSB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgKiBAcHJvcCB7dG9rZW59IFt0b2tlbl0gLSBhbiBPQXV0aCB0b2tlblxuICAgICovXG4gICAvKipcbiAgICAqIEluaXRpYWxpemUgdGhlIGh0dHAgaW50ZXJuYWxzLlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1Yi4gSWYgYXV0aCBpc1xuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IHByb3ZpZGVkIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIHVuYXV0aGVudGljYXRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbQWNjZXB0SGVhZGVyPXYzXSAtIHRoZSBhY2NlcHQgaGVhZGVyIGZvciB0aGUgcmVxdWVzdHNcbiAgICAqL1xuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSwgQWNjZXB0SGVhZGVyKSB7XG4gICAgICB0aGlzLl9fYXBpQmFzZSA9IGFwaUJhc2UgfHwgJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuICAgICAgdGhpcy5fX2F1dGggPSB7XG4gICAgICAgICB0b2tlbjogYXV0aC50b2tlbixcbiAgICAgICAgIHVzZXJuYW1lOiBhdXRoLnVzZXJuYW1lLFxuICAgICAgICAgcGFzc3dvcmQ6IGF1dGgucGFzc3dvcmQsXG4gICAgICB9O1xuICAgICAgdGhpcy5fX0FjY2VwdEhlYWRlciA9IEFjY2VwdEhlYWRlciB8fCAndjMnO1xuXG4gICAgICBpZiAoYXV0aC50b2tlbikge1xuICAgICAgICAgdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXIgPSAndG9rZW4gJyArIGF1dGgudG9rZW47XG4gICAgICB9IGVsc2UgaWYgKGF1dGgudXNlcm5hbWUgJiYgYXV0aC5wYXNzd29yZCkge1xuICAgICAgICAgdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXIgPSAnQmFzaWMgJyArIEJhc2U2NC5lbmNvZGUoYXV0aC51c2VybmFtZSArICc6JyArIGF1dGgucGFzc3dvcmQpO1xuICAgICAgfVxuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXB1dGUgdGhlIFVSTCB0byB1c2UgdG8gbWFrZSBhIHJlcXVlc3QuXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBlaXRoZXIgYSBVUkwgcmVsYXRpdmUgdG8gdGhlIEFQSSBiYXNlIG9yIGFuIGFic29sdXRlIFVSTFxuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBVUkwgdG8gdXNlXG4gICAgKi9cbiAgIF9fZ2V0VVJMKHBhdGgpIHtcbiAgICAgIGxldCB1cmwgPSBwYXRoO1xuXG4gICAgICBpZiAocGF0aC5pbmRleE9mKCcvLycpID09PSAtMSkge1xuICAgICAgICAgdXJsID0gdGhpcy5fX2FwaUJhc2UgKyBwYXRoO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3Q2FjaGVCdXN0ZXIgPSAndGltZXN0YW1wPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZSgvKHRpbWVzdGFtcD1cXGQrKS8sIG5ld0NhY2hlQnVzdGVyKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDb21wdXRlIHRoZSBoZWFkZXJzIHJlcXVpcmVkIGZvciBhbiBBUEkgcmVxdWVzdC5cbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJhdyAtIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSB0cmVhdGVkIGFzIEpTT04gb3IgYXMgYSByYXcgcmVxdWVzdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IEFjY2VwdEhlYWRlciAtIHRoZSBhY2NlcHQgaGVhZGVyIGZvciB0aGUgcmVxdWVzdFxuICAgICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBoZWFkZXJzIHRvIHVzZSBpbiB0aGUgcmVxdWVzdFxuICAgICovXG4gICBfX2dldFJlcXVlc3RIZWFkZXJzKHJhdywgQWNjZXB0SGVhZGVyKSB7XG4gICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JyxcbiAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi4nICsgKEFjY2VwdEhlYWRlciB8fCB0aGlzLl9fQWNjZXB0SGVhZGVyKSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChyYXcpIHtcbiAgICAgICAgIGhlYWRlcnMuQWNjZXB0ICs9ICcucmF3JztcbiAgICAgIH1cbiAgICAgIGhlYWRlcnMuQWNjZXB0ICs9ICcranNvbic7XG5cbiAgICAgIGlmICh0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcikge1xuICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNldHMgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgQVBJIHJlcXVlc3RzXG4gICAgKiBAcHJvdGVjdGVkXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RPcHRpb25zPXt9XSAtIHRoZSBjdXJyZW50IG9wdGlvbnMgZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgcmVxdWVzdFxuICAgICovXG4gICBfZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyhyZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICBpZiAoIShyZXF1ZXN0T3B0aW9ucy52aXNpYmlsaXR5IHx8IHJlcXVlc3RPcHRpb25zLmFmZmlsaWF0aW9uKSkge1xuICAgICAgICAgcmVxdWVzdE9wdGlvbnMudHlwZSA9IHJlcXVlc3RPcHRpb25zLnR5cGUgfHwgJ2FsbCc7XG4gICAgICB9XG4gICAgICByZXF1ZXN0T3B0aW9ucy5zb3J0ID0gcmVxdWVzdE9wdGlvbnMuc29ydCB8fCAndXBkYXRlZCc7XG4gICAgICByZXF1ZXN0T3B0aW9ucy5wZXJfcGFnZSA9IHJlcXVlc3RPcHRpb25zLnBlcl9wYWdlIHx8ICcxMDAnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIHJldHVybiByZXF1ZXN0T3B0aW9ucztcbiAgIH1cblxuICAgLyoqXG4gICAgKiBpZiBhIGBEYXRlYCBpcyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0byBhbiBJU08gc3RyaW5nXG4gICAgKiBAcGFyYW0geyp9IGRhdGUgLSB0aGUgb2JqZWN0IHRvIGF0dGVtcHQgdG8gY29vZXJjZSBpbnRvIGFuIElTTyBkYXRlIHN0cmluZ1xuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBJU08gcmVwcmVzZW50YXRpb24gb2YgYGRhdGVgIG9yIHdoYXRldmVyIHdhcyBwYXNzZWQgaW4gaWYgaXQgd2FzIG5vdCBhIGRhdGVcbiAgICAqL1xuICAgX2RhdGVUb0lTTyhkYXRlKSB7XG4gICAgICBpZiAoZGF0ZSAmJiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICBkYXRlID0gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0ZTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHJlc3VsdCBvZiB0aGUgQVBJIHJlcXVlc3QuXG4gICAgKiBAY2FsbGJhY2sgUmVxdWVzdGFibGUuY2FsbGJhY2tcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuRXJyb3J9IGVycm9yIC0gdGhlIGVycm9yIHJldHVybmVkIGJ5IHRoZSBBUEkgb3IgYG51bGxgXG4gICAgKiBAcGFyYW0geyhPYmplY3R8dHJ1ZSl9IHJlc3VsdCAtIHRoZSBkYXRhIHJldHVybmVkIGJ5IHRoZSBBUEkgb3IgYHRydWVgIGlmIHRoZSBBUEkgcmV0dXJucyBgMjA0IE5vIENvbnRlbnRgXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCAtIHRoZSByYXcge0BsaW5rY29kZSBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcyNyZXNwb25zZS1zY2hlbWEgUmVzcG9uc2V9XG4gICAgKi9cbiAgIC8qKlxuICAgICogTWFrZSBhIHJlcXVlc3QuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIC0gdGhlIG1ldGhvZCBmb3IgdGhlIHJlcXVlc3QgKEdFVCwgUFVULCBQT1NULCBERUxFVEUpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGZvciB0aGUgcmVxdWVzdFxuICAgICogQHBhcmFtIHsqfSBbZGF0YV0gLSB0aGUgZGF0YSB0byBzZW5kIHRvIHRoZSBzZXJ2ZXIuIEZvciBIVFRQIG1ldGhvZHMgdGhhdCBkb24ndCBoYXZlIGEgYm9keSB0aGUgZGF0YVxuICAgICogICAgICAgICAgICAgICAgICAgd2lsbCBiZSBzZW50IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgY2FsbGJhY2sgZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyYXc9ZmFsc2VdIC0gaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHNlbnQgYXMgcmF3LiBJZiB0aGlzIGlzIGEgZmFsc3kgdmFsdWUgdGhlbiB0aGVcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCB3aWxsIGJlIG1hZGUgYXMgSlNPTlxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBfcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEsIGNiLCByYXcpIHtcbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuX19nZXRVUkwocGF0aCk7XG5cbiAgICAgIGNvbnN0IEFjY2VwdEhlYWRlciA9IChkYXRhIHx8IHt9KS5BY2NlcHRIZWFkZXI7XG4gICAgICBpZiAoQWNjZXB0SGVhZGVyKSB7XG4gICAgICAgICBkZWxldGUgZGF0YS5BY2NlcHRIZWFkZXI7XG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5fX2dldFJlcXVlc3RIZWFkZXJzKHJhdywgQWNjZXB0SGVhZGVyKTtcblxuICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0ge307XG5cbiAgICAgIGNvbnN0IHNob3VsZFVzZURhdGFBc1BhcmFtcyA9IGRhdGEgJiYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgbWV0aG9kSGFzTm9Cb2R5KG1ldGhvZCk7XG4gICAgICBpZiAoc2hvdWxkVXNlRGF0YUFzUGFyYW1zKSB7XG4gICAgICAgICBxdWVyeVBhcmFtcyA9IGRhdGE7XG4gICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgIHBhcmFtczogcXVlcnlQYXJhbXMsXG4gICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgcmVzcG9uc2VUeXBlOiByYXcgPyAndGV4dCcgOiAnanNvbicsXG4gICAgICB9O1xuXG4gICAgICBsb2coYCR7Y29uZmlnLm1ldGhvZH0gdG8gJHtjb25maWcudXJsfWApO1xuICAgICAgY29uc3QgcmVxdWVzdFByb21pc2UgPSBheGlvcyhjb25maWcpLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XG5cbiAgICAgIGlmIChjYikge1xuICAgICAgICAgcmVxdWVzdFByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIE9iamVjdC5rZXlzKHJlc3BvbnNlLmRhdGEpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgIC8vIFdoZW4gZGF0YSBoYXMgcmVzdWx0c1xuICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcG9uc2UuZGF0YSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWcubWV0aG9kICE9PSAnR0VUJyAmJiBPYmplY3Qua2V5cyhyZXNwb25zZS5kYXRhKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAvLyBUcnVlIHdoZW4gc3VjY2Vzc2Z1bCBzdWJtaXQgYSByZXF1ZXN0IGFuZCByZWNlaXZlIGEgZW1wdHkgb2JqZWN0XG4gICAgICAgICAgICAgICBjYihudWxsLCAocmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVxdWVzdFByb21pc2U7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTWFrZSBhIHJlcXVlc3QgdG8gYW4gZW5kcG9pbnQgdGhlIHJldHVybnMgMjA0IHdoZW4gdHJ1ZSBhbmQgNDA0IHdoZW4gZmFsc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggdG8gcmVxdWVzdFxuICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBhbnkgcXVlcnkgcGFyYW1ldGVycyBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCByZWNlaXZlIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgKiBAcGFyYW0ge21ldGhvZH0gW21ldGhvZD1HRVRdIC0gSFRUUCBNZXRob2QgdG8gdXNlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIF9yZXF1ZXN0MjA0b3I0MDQocGF0aCwgZGF0YSwgY2IsIG1ldGhvZCA9ICdHRVQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEpXG4gICAgICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHRydWUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfSwgZnVuY3Rpb24gZmFpbHVyZShyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGZhbHNlLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdCBhbmQgZmV0Y2ggYWxsIHRoZSBhdmFpbGFibGUgZGF0YS4gR2l0aHViIHdpbGwgcGFnaW5hdGUgcmVzcG9uc2VzIHNvIGZvciBxdWVyaWVzXG4gICAgKiB0aGF0IG1pZ2h0IHNwYW4gbXVsdGlwbGUgcGFnZXMgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkIHRvIHtAbGluayBSZXF1ZXN0YWJsZSNyZXF1ZXN0fVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCB0byByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgZnVuY3Rpb24gdG8gcmVjZWl2ZSB0aGUgZGF0YS4gVGhlIHJldHVybmVkIGRhdGEgd2lsbCBhbHdheXMgYmUgYW4gYXJyYXkuXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSByZXN1bHRzIC0gdGhlIHBhcnRpYWwgcmVzdWx0cy4gVGhpcyBhcmd1bWVudCBpcyBpbnRlbmRlZCBmb3IgaW50ZXJhbCB1c2Ugb25seS5cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gYSBwcm9taXNlIHdoaWNoIHdpbGwgcmVzb2x2ZSB3aGVuIGFsbCBwYWdlcyBoYXZlIGJlZW4gZmV0Y2hlZFxuICAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIGZvbGRlZCBpbnRvIHtAbGluayBSZXF1ZXN0YWJsZSNfcmVxdWVzdH0gaW4gdGhlIDIuMCByZWxlYXNlLlxuICAgICovXG4gICBfcmVxdWVzdEFsbFBhZ2VzKHBhdGgsIG9wdGlvbnMsIGNiLCByZXN1bHRzKSB7XG4gICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHBhdGgsIG9wdGlvbnMpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCB0aGlzR3JvdXA7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICB0aGlzR3JvdXAgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhLml0ZW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgIHRoaXNHcm91cCA9IHJlc3BvbnNlLmRhdGEuaXRlbXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBgY2Fubm90IGZpZ3VyZSBvdXQgaG93IHRvIGFwcGVuZCAke3Jlc3BvbnNlLmRhdGF9IHRvIHRoZSByZXN1bHQgc2V0YDtcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXNwb25zZUVycm9yKG1lc3NhZ2UsIHBhdGgsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi50aGlzR3JvdXApO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0VXJsID0gZ2V0TmV4dFBhZ2UocmVzcG9uc2UuaGVhZGVycy5saW5rKTtcbiAgICAgICAgICAgIGlmIChuZXh0VXJsKSB7XG4gICAgICAgICAgICAgICBsb2coYGdldHRpbmcgbmV4dCBwYWdlOiAke25leHRVcmx9YCk7XG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKG5leHRVcmwsIG9wdGlvbnMsIGNiLCByZXN1bHRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICBjYihudWxsLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSByZXN1bHRzO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgfSkuY2F0Y2goY2FsbGJhY2tFcnJvck9yVGhyb3coY2IsIHBhdGgpKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0YWJsZTtcblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbi8vICBQcml2YXRlIGhlbHBlciBmdW5jdGlvbnMgIC8vXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAvL1xuY29uc3QgTUVUSE9EU19XSVRIX05PX0JPRFkgPSBbJ0dFVCcsICdIRUFEJywgJ0RFTEVURSddO1xuZnVuY3Rpb24gbWV0aG9kSGFzTm9Cb2R5KG1ldGhvZCkge1xuICAgcmV0dXJuIE1FVEhPRFNfV0lUSF9OT19CT0RZLmluZGV4T2YobWV0aG9kKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIGdldE5leHRQYWdlKGxpbmtzSGVhZGVyID0gJycpIHtcbiAgIGNvbnN0IGxpbmtzID0gbGlua3NIZWFkZXIuc3BsaXQoL1xccyosXFxzKi8pOyAvLyBzcGxpdHMgYW5kIHN0cmlwcyB0aGUgdXJsc1xuICAgcmV0dXJuIGxpbmtzLnJlZHVjZShmdW5jdGlvbihuZXh0VXJsLCBsaW5rKSB7XG4gICAgICBpZiAobGluay5zZWFyY2goL3JlbD1cIm5leHRcIi8pICE9PSAtMSkge1xuICAgICAgICAgcmV0dXJuIChsaW5rLm1hdGNoKC88KC4qKT4vKSB8fCBbXSlbMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0VXJsO1xuICAgfSwgdW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tFcnJvck9yVGhyb3coY2IsIHBhdGgpIHtcbiAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyKG9iamVjdCkge1xuICAgICAgbGV0IGVycm9yO1xuICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eSgnY29uZmlnJykpIHtcbiAgICAgICAgIGNvbnN0IHtyZXNwb25zZToge3N0YXR1cywgc3RhdHVzVGV4dH0sIGNvbmZpZzoge21ldGhvZCwgdXJsfX0gPSBvYmplY3Q7XG4gICAgICAgICBsZXQgbWVzc2FnZSA9IChgJHtzdGF0dXN9IGVycm9yIG1ha2luZyByZXF1ZXN0ICR7bWV0aG9kfSAke3VybH06IFwiJHtzdGF0dXNUZXh0fVwiYCk7XG4gICAgICAgICBlcnJvciA9IG5ldyBSZXNwb25zZUVycm9yKG1lc3NhZ2UsIHBhdGgsIG9iamVjdCk7XG4gICAgICAgICBsb2coYCR7bWVzc2FnZX0gJHtKU09OLnN0cmluZ2lmeShvYmplY3QuZGF0YSl9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgZXJyb3IgPSBvYmplY3Q7XG4gICAgICB9XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgIGxvZygnZ29pbmcgdG8gZXJyb3IgY2FsbGJhY2snKTtcbiAgICAgICAgIGNiKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBsb2coJ3Rocm93aW5nIGVycm9yJyk7XG4gICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgIH07XG59XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnNlYXJjaCcpO1xuXG4vKipcbiAqIFdyYXAgdGhlIFNlYXJjaCBBUElcbiAqL1xuY2xhc3MgU2VhcmNoIGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBTZWFyY2hcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyAtIGRlZmF1bHRzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZT1odHRwczovL2FwaS5naXRodWIuY29tXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGRlZmF1bHRzLCBhdXRoLCBhcGlCYXNlKSB7XG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcbiAgICAgIHRoaXMuX19kZWZhdWx0cyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMoZGVmYXVsdHMpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEF2YWlsYWJsZSBzZWFyY2ggb3B0aW9uc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jcGFyYW1ldGVyc1xuICAgICogQHR5cGVkZWYge09iamVjdH0gU2VhcmNoLlBhcmFtc1xuICAgICogQHBhcmFtIHtzdHJpbmd9IHEgLSB0aGUgcXVlcnkgdG8gbWFrZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNvcnQgLSB0aGUgc29ydCBmaWVsZCwgb25lIG9mIGBzdGFyc2AsIGBmb3Jrc2AsIG9yIGB1cGRhdGVkYC5cbiAgICAqICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgW2Jlc3QgbWF0Y2hdKGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNyYW5raW5nLXNlYXJjaC1yZXN1bHRzKVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyIC0gdGhlIG9yZGVyaW5nLCBlaXRoZXIgYGFzY2Agb3IgYGRlc2NgXG4gICAgKi9cbiAgIC8qKlxuICAgICogUGVyZm9ybSBhIHNlYXJjaCBvbiB0aGUgR2l0SHViIEFQSVxuICAgICogQHByaXZhdGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHNjb3BlIG9mIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7U2VhcmNoLlBhcmFtc30gW3dpdGhPcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIF9zZWFyY2gocGF0aCwgd2l0aE9wdGlvbnMgPSB7fSwgY2IgPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcy5fX2RlZmF1bHRzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICByZXF1ZXN0T3B0aW9uc1twcm9wXSA9IHRoaXMuX19kZWZhdWx0c1twcm9wXTtcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmtleXMod2l0aE9wdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgIHJlcXVlc3RPcHRpb25zW3Byb3BdID0gd2l0aE9wdGlvbnNbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgbG9nKGBzZWFyY2hpbmcgJHtwYXRofSB3aXRoIG9wdGlvbnM6YCwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3NlYXJjaC8ke3BhdGh9YCwgcmVxdWVzdE9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTZWFyY2ggZm9yIHJlcG9zaXRvcmllc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jc2VhcmNoLXJlcG9zaXRvcmllc1xuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb3JSZXBvc2l0b3JpZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWFyY2goJ3JlcG9zaXRvcmllcycsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTZWFyY2ggZm9yIGNvZGVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1jb2RlXG4gICAgKiBAcGFyYW0ge1NlYXJjaC5QYXJhbXN9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvckNvZGUob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWFyY2goJ2NvZGUnLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2VhcmNoIGZvciBpc3N1ZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1pc3N1ZXNcbiAgICAqIEBwYXJhbSB7U2VhcmNoLlBhcmFtc30gW29wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9ySXNzdWVzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCdpc3N1ZXMnLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2VhcmNoIGZvciB1c2Vyc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jc2VhcmNoLXVzZXJzXG4gICAgKiBAcGFyYW0ge1NlYXJjaC5QYXJhbXN9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvclVzZXJzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCd1c2VycycsIG9wdGlvbnMsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2g7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDE2IE1hdHQgU21pdGggKERldmVsb3BtZW50IFNlZWQpXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnRlYW0nKTtcblxuLyoqXG4gKiBBIFRlYW0gYWxsb3dzIHNjb3Bpbmcgb2YgQVBJIHJlcXVlc3RzIHRvIGEgcGFydGljdWxhciBHaXRodWIgT3JnYW5pemF0aW9uIFRlYW0uXG4gKi9cbmNsYXNzIFRlYW0gZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIFRlYW0uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3RlYW1JZF0gLSB0aGUgaWQgZm9yIHRoZSB0ZWFtXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZT1odHRwczovL2FwaS5naXRodWIuY29tXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKHRlYW1JZCwgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fdGVhbUlkID0gdGVhbUlkO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBUZWFtIGluZm9ybWF0aW9uXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jZ2V0LXRlYW1cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHRlYW1cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0VGVhbShjYikge1xuICAgICAgbG9nKGBGZXRjaGluZyBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHZXQnLCBgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH1gLCB1bmRlZmluZWQsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBUZWFtJ3MgcmVwb3NpdG9yaWVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jbGlzdC10ZWFtLXJlcG9zXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UmVwb3MoY2IpIHtcbiAgICAgIGxvZyhgRmV0Y2hpbmcgcmVwb3NpdG9yaWVzIGZvciBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L3JlcG9zYCwgdW5kZWZpbmVkLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBUZWFtIGluZm9ybWF0aW9uXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jZWRpdC10ZWFtXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFBhcmFtZXRlcnMgZm9yIHRlYW0gZWRpdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0ZWFtXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gVGVhbSBkZXNjcmlwdGlvblxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJlcG9fbmFtZXNdIC0gUmVwb3MgdG8gYWRkIHRoZSB0ZWFtIHRvXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucHJpdmFjeT1zZWNyZXRdIC0gVGhlIGxldmVsIG9mIHByaXZhY3kgdGhlIHRlYW0gc2hvdWxkIGhhdmUuIENhbiBiZSBlaXRoZXIgb25lXG4gICAgKiBvZjogYHNlY3JldGAsIG9yIGBjbG9zZWRgXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHRlYW1cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZWRpdFRlYW0ob3B0aW9ucywgY2IpIHtcbiAgICAgIGxvZyhgRWRpdGluZyBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB1c2VycyB3aG8gYXJlIG1lbWJlcnMgb2YgdGhlIFRlYW1cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNsaXN0LXRlYW0tbWVtYmVyc1xuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBQYXJhbWV0ZXJzIGZvciBsaXN0aW5nIHRlYW0gdXNlcnNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5yb2xlPWFsbF0gLSBjYW4gYmUgb25lIG9mOiBgYWxsYCwgYG1haW50YWluZXJgLCBvciBgbWVtYmVyYFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiB1c2Vyc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0TWVtYmVycyhvcHRpb25zLCBjYikge1xuICAgICAgbG9nKGBHZXR0aW5nIG1lbWJlcnMgb2YgVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9tZW1iZXJzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBUZWFtIG1lbWJlcnNoaXAgc3RhdHVzIGZvciBhIHVzZXJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNnZXQtdGVhbS1tZW1iZXJzaGlwXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSBjYW4gYmUgb25lIG9mOiBgYWxsYCwgYG1haW50YWluZXJgLCBvciBgbWVtYmVyYFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVtYmVyc2hpcCBzdGF0dXMgb2YgYSB1c2VyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldE1lbWJlcnNoaXAodXNlcm5hbWUsIGNiKSB7XG4gICAgICBsb2coYEdldHRpbmcgbWVtYmVyc2hpcCBvZiB1c2VyICR7dXNlcm5hbWV9IGluIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9tZW1iZXJzaGlwcy8ke3VzZXJuYW1lfWAsIHVuZGVmaW5lZCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEFkZCBhIG1lbWJlciB0byB0aGUgVGVhbVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2FkZC10ZWFtLW1lbWJlcnNoaXBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgbWFpbnRhaW5lcmAsIG9yIGBtZW1iZXJgXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFBhcmFtZXRlcnMgZm9yIGFkZGluZyBhIHRlYW0gbWVtYmVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucm9sZT1tZW1iZXJdIC0gVGhlIHJvbGUgdGhhdCB0aGlzIHVzZXIgc2hvdWxkIGhhdmUgaW4gdGhlIHRlYW0uIENhbiBiZSBvbmVcbiAgICAqIG9mOiBgbWVtYmVyYCwgb3IgYG1haW50YWluZXJgXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhZGRlZCB1c2VyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGFkZE1lbWJlcnNoaXAodXNlcm5hbWUsIG9wdGlvbnMsIGNiKSB7XG4gICAgICBsb2coYEFkZGluZyB1c2VyICR7dXNlcm5hbWV9IHRvIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9tZW1iZXJzaGlwcy8ke3VzZXJuYW1lfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgcmVwbyBtYW5hZ2VtZW50IHN0YXR1cyBmb3IgdGVhbVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI3JlbW92ZS10ZWFtLW1lbWJlcnNoaXBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lciAtIE9yZ2FuaXphdGlvbiBuYW1lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbyAtIFJlcG8gbmFtZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVtYmVyc2hpcCBzdGF0dXMgb2YgYWRkZWQgdXNlclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBpc01hbmFnZWRSZXBvKG93bmVyLCByZXBvLCBjYikge1xuICAgICAgbG9nKGBHZXR0aW5nIHJlcG8gbWFuYWdlbWVudCBieSBUZWFtICR7dGhpcy5fX3RlYW1JZH0gZm9yIHJlcG8gJHtvd25lcn0vJHtyZXBvfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH0vcmVwb3MvJHtvd25lcn0vJHtyZXBvfWAsIHVuZGVmaW5lZCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEFkZCBvciBVcGRhdGUgcmVwbyBtYW5hZ2VtZW50IHN0YXR1cyBmb3IgdGVhbVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2FkZC1vci11cGRhdGUtdGVhbS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXIgLSBPcmdhbml6YXRpb24gbmFtZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSBSZXBvIG5hbWVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgYWRkaW5nIG9yIHVwZGF0aW5nIHJlcG8gbWFuYWdlbWVudCBmb3IgdGhlIHRlYW1cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wZXJtaXNzaW9uXSAtIFRoZSBwZXJtaXNzaW9uIHRvIGdyYW50IHRoZSB0ZWFtIG9uIHRoaXMgcmVwb3NpdG9yeS4gQ2FuIGJlIG9uZVxuICAgICogb2Y6IGBwdWxsYCwgYHB1c2hgLCBvciBgYWRtaW5gXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhZGRlZCB1c2VyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIG1hbmFnZVJlcG8ob3duZXIsIHJlcG8sIG9wdGlvbnMsIGNiKSB7XG4gICAgICBsb2coYEFkZGluZyBvciBVcGRhdGluZyByZXBvIG1hbmFnZW1lbnQgYnkgVGVhbSAke3RoaXMuX190ZWFtSWR9IGZvciByZXBvICR7b3duZXJ9LyR7cmVwb31gKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0MjA0b3I0MDQoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L3JlcG9zLyR7b3duZXJ9LyR7cmVwb31gLCBvcHRpb25zLCBjYiwgJ1BVVCcpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFJlbW92ZSByZXBvIG1hbmFnZW1lbnQgc3RhdHVzIGZvciB0ZWFtXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jcmVtb3ZlLXRlYW0tcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyIC0gT3JnYW5pemF0aW9uIG5hbWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gUmVwbyBuYW1lXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhZGRlZCB1c2VyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVubWFuYWdlUmVwbyhvd25lciwgcmVwbywgY2IpIHtcbiAgICAgIGxvZyhgUmVtb3ZlIHJlcG8gbWFuYWdlbWVudCBieSBUZWFtICR7dGhpcy5fX3RlYW1JZH0gZm9yIHJlcG8gJHtvd25lcn0vJHtyZXBvfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH0vcmVwb3MvJHtvd25lcn0vJHtyZXBvfWAsIHVuZGVmaW5lZCwgY2IsICdERUxFVEUnKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgVGVhbVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2RlbGV0ZS10ZWFtXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVUZWFtKGNiKSB7XG4gICAgICBsb2coYERlbGV0aW5nIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH1gLCB1bmRlZmluZWQsIGNiLCAnREVMRVRFJyk7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGVhbTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6dXNlcicpO1xuXG4vKipcbiAqIEEgVXNlciBhbGxvd3Mgc2NvcGluZyBvZiBBUEkgcmVxdWVzdHMgdG8gYSBwYXJ0aWN1bGFyIEdpdGh1YiB1c2VyLlxuICovXG5jbGFzcyBVc2VyIGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBVc2VyLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFt1c2VybmFtZV0gLSB0aGUgdXNlciB0byB1c2UgZm9yIHVzZXItc2NvcGVkIHF1ZXJpZXNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IodXNlcm5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX3VzZXIgPSB1c2VybmFtZTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgdGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuIChkZXBlbmRlbnQgb24gaWYgd2UncmUgcmVxdWVzdGluZyBmb3IgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvciBub3QpXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50IC0gdGhlIGVuZHBvaW50IGJlaW5nIHJlcXVlc3RlZFxuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSByZXNvbHZlZCBlbmRwb2ludFxuICAgICovXG4gICBfX2dldFNjb3BlZFVybChlbmRwb2ludCkge1xuICAgICAgaWYgKHRoaXMuX191c2VyKSB7XG4gICAgICAgICByZXR1cm4gZW5kcG9pbnQgP1xuICAgICAgICAgICAgYC91c2Vycy8ke3RoaXMuX191c2VyfS8ke2VuZHBvaW50fWAgOlxuICAgICAgICAgICAgYC91c2Vycy8ke3RoaXMuX191c2VyfWBcbiAgICAgICAgICAgIDtcblxuICAgICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgc3dpdGNoIChlbmRwb2ludCkge1xuICAgICAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgICAgICAgIHJldHVybiAnL3VzZXInO1xuXG4gICAgICAgICAgICBjYXNlICdub3RpZmljYXRpb25zJzpcbiAgICAgICAgICAgIGNhc2UgJ2dpc3RzJzpcbiAgICAgICAgICAgICAgIHJldHVybiBgLyR7ZW5kcG9pbnR9YDtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgIHJldHVybiBgL3VzZXIvJHtlbmRwb2ludH1gO1xuICAgICAgICAgfVxuICAgICAgfVxuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIHVzZXIncyByZXBvc2l0b3JpZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC11c2VyLXJlcG9zaXRvcmllc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIGFueSBvcHRpb25zIHRvIHJlZmluZSB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UmVwb3Mob3B0aW9ucywgY2IpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zKTtcblxuICAgICAgbG9nKGBGZXRjaGluZyByZXBvc2l0b3JpZXMgd2l0aCBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyh0aGlzLl9fZ2V0U2NvcGVkVXJsKCdyZXBvcycpLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgb3JncyB0aGF0IHRoZSB1c2VyIGJlbG9uZ3MgdG9cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzLyNsaXN0LXVzZXItb3JnYW5pemF0aW9uc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBvcmdhbml6YXRpb25zXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RPcmdzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgdGhpcy5fX2dldFNjb3BlZFVybCgnb3JncycpLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcidzIGdpc3RzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2xpc3QtYS11c2Vycy1naXN0c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBnaXN0c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0R2lzdHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCdnaXN0cycpLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcidzIG5vdGlmaWNhdGlvbnNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9ub3RpZmljYXRpb25zLyNsaXN0LXlvdXItbm90aWZpY2F0aW9uc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIGFueSBvcHRpb25zIHRvIHJlZmluZSB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0Tm90aWZpY2F0aW9ucyhvcHRpb25zLCBjYikge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgIGNiID0gb3B0aW9ucztcbiAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucy5zaW5jZSA9IHRoaXMuX2RhdGVUb0lTTyhvcHRpb25zLnNpbmNlKTtcbiAgICAgIG9wdGlvbnMuYmVmb3JlID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMuYmVmb3JlKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHRoaXMuX19nZXRTY29wZWRVcmwoJ25vdGlmaWNhdGlvbnMnKSwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNob3cgdGhlIHVzZXIncyBwcm9maWxlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvI2dldC1hLXNpbmdsZS11c2VyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSB1c2VyJ3MgaW5mb3JtYXRpb25cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UHJvZmlsZShjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHRoaXMuX19nZXRTY29wZWRVcmwoJycpLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0cyB0aGUgbGlzdCBvZiBzdGFycmVkIHJlcG9zaXRvcmllcyBmb3IgdGhlIHVzZXJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9zdGFycmluZy8jbGlzdC1yZXBvc2l0b3JpZXMtYmVpbmctc3RhcnJlZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBzdGFycmVkIHJlcG9zaXRvcmllc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0U3RhcnJlZFJlcG9zKGNiKSB7XG4gICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKHRoaXMuX19nZXRTY29wZWRVcmwoJ3N0YXJyZWQnKSwgcmVxdWVzdE9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IGVtYWlsIGFkZHJlc3NlcyBmb3IgYSB1c2VyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvZW1haWxzLyNsaXN0LWVtYWlsLWFkZHJlc3Nlcy1mb3ItYS11c2VyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGVtYWlsc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRFbWFpbHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCAnL3VzZXIvZW1haWxzJywgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEhhdmUgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBmb2xsb3cgdGhpcyB1c2VyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvZm9sbG93ZXJzLyNmb2xsb3ctYS11c2VyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSB0aGUgdXNlciB0byBmb2xsb3dcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb2xsb3codXNlcm5hbWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC91c2VyL2ZvbGxvd2luZy8ke3RoaXMuX191c2VyfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBIYXZlIHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIHVuZm9sbG93IHRoaXMgdXNlclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3VzZXJzL2ZvbGxvd2Vycy8jZm9sbG93LWEtdXNlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gdW5mb2xsb3dcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSByZWNlaXZlcyB0cnVlIGlmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVuZm9sbG93KHVzZXJuYW1lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvdXNlci9mb2xsb3dpbmcvJHt0aGlzLl9fdXNlcn1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHJlcG9zaXRvcnkgZm9yIHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2NyZWF0ZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB0aGUgcmVwb3NpdG9yeSBkZWZpbml0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBBUEkgcmVzcG9uc2VcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUmVwbyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCAnL3VzZXIvcmVwb3MnLCBvcHRpb25zLCBjYik7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcbiJdfQ==