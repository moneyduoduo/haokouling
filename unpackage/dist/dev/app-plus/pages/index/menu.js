"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 136);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/*!******************************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/main.js?{"type":"appStyle"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Vue.prototype.__$appStyle__ = {}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18gPSB7fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),

/***/ 10:
/*!********************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/common/request.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 11));\nvar _msg = _interopRequireDefault(__webpack_require__(/*! ./msg */ 12));\nvar _bindSystem = _interopRequireDefault(__webpack_require__(/*! ./bindSystem */ 13));\nvar _storage = _interopRequireDefault(__webpack_require__(/*! ./storage */ 9));\nvar _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =\n{\n  config: {\n    header: {\n      \"Content-Type\": \"application/x-www-form-urlencoded\" },\n\n    data: {},\n    method: \"POST\" },\n\n  request: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    return new Promise(function (resolve, reject) {\n      options.header = options.header || _this.config.header;\n      options.method = options.method || _this.config.method;\n      options.dataType = options.dataType || _this.config.dataType;\n      options.url = options.url;\n      var systemInfo = _index.default.state.systemInfo;\n      var token = _index.default.state.token;\n      var version = _index.default.state.version;\n      token ? options.header.token = token : options.header.token = '';\n      systemInfo ? options.header.platform = systemInfo.platform : options.header.platform = '';\n      version ? options.header.version = version : options.header.version = '';\n      var formData = options.formData;\n      options.success = function (res) {\n\n        if (res.data.status == 1) {\n          if (res.data.data.hasOwnProperty('versionInfo')) {\n            _this.updata(res.data.data.versionInfo);\n          }\n          return resolve(res.data);\n        }\n        if (res.data.status == 0 || res.data.status == 40000) {\n          _msg.default.toast(res.data.msg);\n          return reject(res.data);\n        }\n        if (res.data.status == 40001) {\n          _this.updata(res.data.data);\n        }\n        if (res.data.status == 40002 || res.data.status == 40004) {\n          _msg.default.alert({ title: '提示', content: '请先登录' }, function () {\n            uni.navigateTo({\n              url: '/pages/pass/login' });\n\n          });\n        }\n        if (res.data.status == 40003) {\n          _msg.default.alert({ title: '提示', content: '请先绑定手机号码' }, function () {\n            uni.navigateTo({\n              url: '/pages/pass/sharpCode' });\n\n          });\n        }\n      };\n      uni.request(options);\n\n\n    });\n  },\n  post: function post(url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n    options.url = _config.default.couponeBaseUrl + url;\n    options.data = data;\n    options.method = 'POST';\n    return this.request(options);\n\n  },\n\n  posts: function posts(url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n    options.url = _config.default.superBackBaseUrl + url;\n    options.data = data;\n    options.method = 'POST';\n    return this.request(options);\n  },\n  updata: function updata(res) {\n    if (!res.downloadUrl && !res.wgtUrl) {\n      return false;\n    }\n\n    plus.webview.open(\n    'hybrid/html/popup/popup.html?data=' + encodeURIComponent(JSON.stringify(res)),\n    'genxinpopup', {\n      background: 'transparent',\n      top: 0,\n      bottom: 0,\n      zindex: 998 },\n\n    'fade-in',\n    500);\n\n\n    /*\r\n          \t\tlet version = parseInt(store.state.version.replace(/\\./g,''))\r\n          let server = parseInt(res.version.replace(/\\./g,''))\r\n           if(server>version){\r\n          \tif(res.isForce==0){\r\n          \t\tplus.webview.open(\r\n          \t\t\t'hybrid/html/popup/popup.html?data=' + encodeURIComponent(res),\r\n          \t\t\t'genxinpopup', {\r\n          \t\t\t\tbackground: 'transparent',\r\n          \t\t\t\ttop: 0, \r\n          \t\t\t\tbottom: 0,\r\n          \t\t\t\tzindex: 998\r\n          \t\t\t},\r\n          \t\t\t'fade-in',\r\n          \t\t\t500\r\n          \t\t);\r\n          \t}else{\r\n          \t\tplus.nativeUI.showWaiting(\"正在下载更新包...\");\r\n          \t\tlet wgtUrl = res.wgtUrl\r\n          \t\tuni.downloadFile({\r\n          \t\t\turl: wgtUrl,\r\n          \t\t\tsuccess: (downloadResult) => {\r\n          \t\t\t\tif (downloadResult.statusCode === 200) {\r\n          \t\t\t\t\tplus.nativeUI.closeWaiting();\r\n          \t\t\t\t\tplus.nativeUI.showWaiting(\"正在更新应用...\");\r\n          \t\t\t\t\tplus.runtime.install(downloadResult.tempFilePath, {\r\n          \t\t\t\t\t\tforce: false\r\n          \t\t\t\t\t}, function() {\r\n          \t\t\t\t\t\tplus.nativeUI.closeWaiting();\r\n          \t\t\t\t\t\tuni.clearStorageSync();\r\n          \t\t\t\t\t\tplus.runtime.restart();\r\n          \t\t\t\t\t}, function(e) {\r\n          \t\t\t\t\t\t//console.error('install fail...');\r\n          \t\t\t\t\t\tuni.showToast({\r\n          \t\t\t\t\t\t\ttitle: e,\r\n          \t\t\t\t\t\t\tduration: 5000\r\n          \t\t\t\t\t\t});\r\n          \t\t\t\t\t});\r\n          \t\t\t\t}\r\n          \t\t\t}\r\n          \t\t})\r\n          \t}\r\n          \t\r\n          }\r\n          */\n\n  } };exports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tbW9uL3JlcXVlc3QuanMiXSwibmFtZXMiOlsiY29uZmlnIiwiaGVhZGVyIiwiZGF0YSIsIm1ldGhvZCIsInJlcXVlc3QiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhVHlwZSIsInVybCIsInN5c3RlbUluZm8iLCJzdG9yZSIsInN0YXRlIiwidG9rZW4iLCJ2ZXJzaW9uIiwicGxhdGZvcm0iLCJmb3JtRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJoYXNPd25Qcm9wZXJ0eSIsInVwZGF0YSIsInZlcnNpb25JbmZvIiwibXNnQWxlcnQiLCJ0b2FzdCIsIm1zZyIsImFsZXJ0IiwidGl0bGUiLCJjb250ZW50IiwidW5pIiwibmF2aWdhdGVUbyIsInBvc3QiLCJjb3Vwb25lQmFzZVVybCIsInBvc3RzIiwic3VwZXJCYWNrQmFzZVVybCIsImRvd25sb2FkVXJsIiwid2d0VXJsIiwicGx1cyIsIndlYnZpZXciLCJvcGVuIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImJhY2tncm91bmQiLCJ0b3AiLCJib3R0b20iLCJ6aW5kZXgiXSwibWFwcGluZ3MiOiJ1RkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGO0FBQ2M7QUFDYkEsUUFBTSxFQUFDO0FBQ05DLFVBQU0sRUFBQztBQUNOLHNCQUFlLG1DQURULEVBREQ7O0FBSU5DLFFBQUksRUFBRSxFQUpBO0FBS05DLFVBQU0sRUFBRSxNQUxGLEVBRE07O0FBUWJDLFNBUmEscUJBUVEsc0JBQWJDLE9BQWEsdUVBQUgsRUFBRztBQUNwQixXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcENILGFBQU8sQ0FBQ0osTUFBUixHQUFpQkksT0FBTyxDQUFDSixNQUFSLElBQWtCLEtBQUksQ0FBQ0QsTUFBTCxDQUFZQyxNQUEvQztBQUNBSSxhQUFPLENBQUNGLE1BQVIsR0FBaUJFLE9B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O0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4Q0EsR0FySVksRSIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCBtc2dBbGVydCBmcm9tICcuL21zZydcclxuaW1wb3J0IGJpbmRTeXN0ZW0gZnJvbSBcIi4vYmluZFN5c3RlbVwiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnXHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiQC9zdG9yZS9pbmRleC5qc1wiXHJcbmV4cG9ydCBkZWZhdWx0e1xyXG5cdGNvbmZpZzp7XHJcblx0XHRoZWFkZXI6e1xyXG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcclxuXHRcdH0sXHJcblx0XHRkYXRhOiB7fSxcclxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXHJcblx0fSxcclxuXHRyZXF1ZXN0KG9wdGlvbnMgPSB7fSl7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cdFx0XHRvcHRpb25zLmhlYWRlciA9IG9wdGlvbnMuaGVhZGVyIHx8IHRoaXMuY29uZmlnLmhlYWRlcjtcclxuXHRcdFx0b3B0aW9ucy5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCB0aGlzLmNvbmZpZy5tZXRob2Q7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8IHRoaXMuY29uZmlnLmRhdGFUeXBlO1xyXG5cdFx0XHRvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsO1xyXG5cdFx0XHRsZXQgc3lzdGVtSW5mbyA9IHN0b3JlLnN0YXRlLnN5c3RlbUluZm9cclxuXHRcdFx0bGV0IHRva2VuID0gc3RvcmUuc3RhdGUudG9rZW5cclxuXHRcdFx0bGV0IHZlcnNpb24gPSBzdG9yZS5zdGF0ZS52ZXJzaW9uXHJcblx0XHRcdHRva2VuID8gb3B0aW9ucy5oZWFkZXIudG9rZW4gPSB0b2tlbiA6IG9wdGlvbnMuaGVhZGVyLnRva2VuID0gJyc7XHJcblx0XHRcdHN5c3RlbUluZm8gPyBvcHRpb25zLmhlYWRlci5wbGF0Zm9ybSA9IHN5c3RlbUluZm8ucGxhdGZvcm0gOiBvcHRpb25zLmhlYWRlci5wbGF0Zm9ybSA9ICcnO1xyXG5cdFx0XHR2ZXJzaW9uID8gb3B0aW9ucy5oZWFkZXIudmVyc2lvbiA9IHZlcnNpb24gOiBvcHRpb25zLmhlYWRlci52ZXJzaW9uID0gJyc7XHJcblx0XHRcdGxldCBmb3JtRGF0YSA9IG9wdGlvbnMuZm9ybURhdGFcclxuXHRcdFx0b3B0aW9ucy5zdWNjZXNzID0gKHJlcykgPT4ge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAocmVzLmRhdGEuc3RhdHVzPT0xKSB7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5kYXRhLmRhdGEuaGFzT3duUHJvcGVydHkoJ3ZlcnNpb25JbmZvJykpe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMudXBkYXRhKHJlcy5kYXRhLmRhdGEudmVyc2lvbkluZm8pXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUocmVzLmRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAocmVzLmRhdGEuc3RhdHVzPT0wfHxyZXMuZGF0YS5zdGF0dXM9PTQwMDAwKSB7XHJcblx0XHRcdFx0XHRcdG1zZ0FsZXJ0LnRvYXN0KHJlcy5kYXRhLm1zZyk7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZWplY3QocmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYocmVzLmRhdGEuc3RhdHVzPT00MDAwMSl7XHJcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRhKHJlcy5kYXRhLmRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZihyZXMuZGF0YS5zdGF0dXM9PTQwMDAyfHxyZXMuZGF0YS5zdGF0dXM9PTQwMDA0KXtcclxuXHRcdFx0XHRcdFx0bXNnQWxlcnQuYWxlcnQoeyB0aXRsZTon5o+Q56S6Jyxjb250ZW50OiAn6K+35YWI55m75b2VJ30sKCk9PntcclxuXHRcdFx0XHRcdFx0XHR1bmkubmF2aWdhdGVUbyh7XHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6ICcvcGFnZXMvcGFzcy9sb2dpbidcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKHJlcy5kYXRhLnN0YXR1cz09NDAwMDMpe1xyXG5cdFx0XHRcdFx0XHRtc2dBbGVydC5hbGVydCh7IHRpdGxlOifmj5DnpLonLGNvbnRlbnQ6ICfor7flhYjnu5HlrprmiYvmnLrlj7fnoIEnfSwoKT0+e1xyXG5cdFx0XHRcdFx0XHRcdHVuaS5uYXZpZ2F0ZVRvKHtcclxuXHRcdFx0XHRcdFx0XHRcdHVybDonL3BhZ2VzL3Bhc3Mvc2hhcnBDb2RlJ1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHVuaS5yZXF1ZXN0KG9wdGlvbnMpXHJcblx0XHRcdFxyXG5cdFx0XHRcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cG9zdCh1cmwsZGF0YSxvcHRpb25zPXt9KXtcclxuXHRcdG9wdGlvbnMudXJsID0gY29uZmlnLmNvdXBvbmVCYXNlVXJsK3VybDtcclxuXHRcdG9wdGlvbnMuZGF0YSA9IGRhdGE7XHJcblx0XHRvcHRpb25zLm1ldGhvZCA9ICdQT1NUJztcclxuXHRcdHJldHVybiB0aGlzLnJlcXVlc3Qob3B0aW9ucylcclxuXHRcdFxyXG5cdH0sXHJcblx0XHJcblx0cG9zdHModXJsLGRhdGEsb3B0aW9ucz17fSl7XHJcblx0XHRvcHRpb25zLnVybCA9IGNvbmZpZy5zdXBlckJhY2tCYXNlVXJsK3VybDtcclxuXHRcdG9wdGlvbnMuZGF0YSA9IGRhdGE7XHJcblx0XHRvcHRpb25zLm1ldGhvZCA9ICdQT1NUJztcclxuXHRcdHJldHVybiB0aGlzLnJlcXVlc3Qob3B0aW9ucyk7XHJcblx0fSxcclxuXHR1cGRhdGEocmVzKXtcclxuXHRcdGlmKCFyZXMuZG93bmxvYWRVcmwmJiFyZXMud2d0VXJsKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdXMud2Vidmlldy5vcGVuKFxyXG5cdFx0XHQnaHlicmlkL2h0bWwvcG9wdXAvcG9wdXAuaHRtbD9kYXRhPScgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocmVzKSksXHJcblx0XHRcdCdnZW54aW5wb3B1cCcsIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLFxyXG5cdFx0XHRcdHRvcDogMCwgXHJcblx0XHRcdFx0Ym90dG9tOiAwLFxyXG5cdFx0XHRcdHppbmRleDogOTk4XHJcblx0XHRcdH0sXHJcblx0XHRcdCdmYWRlLWluJyxcclxuXHRcdFx0NTAwXHJcblx0XHQpO1xyXG5cclxuXHRcdC8qXHJcblxyXG5cdFx0bGV0IHZlcnNpb24gPSBwYXJzZUludChzdG9yZS5zdGF0ZS52ZXJzaW9uLnJlcGxhY2UoL1xcLi9nLCcnKSlcclxuXHRcdGxldCBzZXJ2ZXIgPSBwYXJzZUludChyZXMudmVyc2lvbi5yZXBsYWNlKC9cXC4vZywnJykpXHJcblx0XHQgaWYoc2VydmVyPnZlcnNpb24pe1xyXG5cdFx0XHRpZihyZXMuaXNGb3JjZT09MCl7XHJcblx0XHRcdFx0cGx1cy53ZWJ2aWV3Lm9wZW4oXHJcblx0XHRcdFx0XHQnaHlicmlkL2h0bWwvcG9wdXAvcG9wdXAuaHRtbD9kYXRhPScgKyBlbmNvZGVVUklDb21wb25lbnQocmVzKSxcclxuXHRcdFx0XHRcdCdnZW54aW5wb3B1cCcsIHtcclxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcclxuXHRcdFx0XHRcdFx0dG9wOiAwLCBcclxuXHRcdFx0XHRcdFx0Ym90dG9tOiAwLFxyXG5cdFx0XHRcdFx0XHR6aW5kZXg6IDk5OFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdCdmYWRlLWluJyxcclxuXHRcdFx0XHRcdDUwMFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHBsdXMubmF0aXZlVUkuc2hvd1dhaXRpbmcoXCLmraPlnKjkuIvovb3mm7TmlrDljIUuLi5cIik7XHJcblx0XHRcdFx0bGV0IHdndFVybCA9IHJlcy53Z3RVcmxcclxuXHRcdFx0XHR1bmkuZG93bmxvYWRGaWxlKHtcclxuXHRcdFx0XHRcdHVybDogd2d0VXJsLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRvd25sb2FkUmVzdWx0KSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChkb3dubG9hZFJlc3VsdC5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0XHRcdFx0XHRwbHVzLm5hdGl2ZVVJLmNsb3NlV2FpdGluZygpO1xyXG5cdFx0XHRcdFx0XHRcdHBsdXMubmF0aXZlVUkuc2hvd1dhaXRpbmcoXCLmraPlnKjmm7TmlrDlupTnlKguLi5cIik7XHJcblx0XHRcdFx0XHRcdFx0cGx1cy5ydW50aW1lLmluc3RhbGwoZG93bmxvYWRSZXN1bHQudGVtcEZpbGVQYXRoLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3JjZTogZmFsc2VcclxuXHRcdFx0XHRcdFx0XHR9LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHBsdXMubmF0aXZlVUkuY2xvc2VXYWl0aW5nKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR1bmkuY2xlYXJTdG9yYWdlU3luYygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cGx1cy5ydW50aW1lLnJlc3RhcnQoKTtcclxuXHRcdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUuZXJyb3IoJ2luc3RhbGwgZmFpbC4uLicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dW5pLnNob3dUb2FzdCh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogNTAwMFxyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHR9IFxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///10\n");

/***/ }),

/***/ 11:
/*!*******************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/common/config.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _default = {\n  // 优惠券api请求前缀 \n  couponeBaseUrl: 'http://132.232.8.62:5055',\n  // 超级返api请求前缀\n  superBackBaseUrl: \"http://api-tkb.jixiangshenghuo.com\" };exports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tbW9uL2NvbmZpZy5qcyJdLCJuYW1lcyI6WyJjb3Vwb25lQmFzZVVybCIsInN1cGVyQmFja0Jhc2VVcmwiXSwibWFwcGluZ3MiOiJzR0FBZTtBQUNkO0FBQ0FBLGdCQUFjLEVBQUMsMEJBRkQ7QUFHZDtBQUNBQyxrQkFBZ0IsRUFBQyxvQ0FKSCxFIiwiZmlsZSI6IjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG5cdC8vIOS8mOaDoOWIuGFwaeivt+axguWJjee8gCBcclxuXHRjb3Vwb25lQmFzZVVybDonaHR0cDovLzEzMi4yMzIuOC42Mjo1MDU1JyxcclxuXHQvLyDotoXnuqfov5RhcGnor7fmsYLliY3nvIBcclxuXHRzdXBlckJhY2tCYXNlVXJsOlwiaHR0cDovL2FwaS10a2Iuaml4aWFuZ3NoZW5naHVvLmNvbVwiXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///11\n");

/***/ }),

/***/ 12:
/*!****************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/common/msg.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;\nvar msg = {\n  toast: function toast(message, toPage) {\n    uni.showToast({\n      title: message,\n      duration: 3000,\n      icon: toPage ? \"success\" : \"none\" });\n\n    //用于提交表单成功后跳转页面\n    if (toPage) {\n      setTimeout(function () {\n        if (toPage != 'back') {\n          uni.navigateTo({\n            url: toPage });\n\n        } else {\n          uni.navigateBack();\n        }\n      }, 2000);\n    }\n  },\n  alert: function alert(options, confirmCB) {\n    uni.showModal({\n      title: options.title,\n      content: options.content,\n      confirmColor: '#333333',\n      confirmText: options.confirmText || '确定',\n      showCancel: false,\n      success: function success(res) {\n        if (typeof confirmCB === \"function\") {\n          confirmCB();\n        }\n      } });\n\n  },\n  confirm: function confirm(options, confirmCB, cancelFn) {\n    uni.showModal({\n      title: options.title || '提示信息',\n      content: options.content,\n      confirmColor: options.confirmColor || '#fb285d',\n      cancelColor: options.cancelColor || '#999999',\n      cancelText: options.cancelText || '取消',\n      confirmText: options.confirmText || '确定',\n      success: function success(res) {\n        if (res.confirm) {\n          if (typeof confirmCB === \"function\") {\n            confirmCB();\n          }\n        } else if (res.cancel) {\n          if (typeof cancelFn === \"function\") {\n            cancelFn();\n          }\n        }\n      } });\n\n  } };var _default =\n\n\nmsg;exports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tbW9uL21zZy5qcyJdLCJuYW1lcyI6WyJtc2ciLCJ0b2FzdCIsIm1lc3NhZ2UiLCJ0b1BhZ2UiLCJ1bmkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaWNvbiIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwibmF2aWdhdGVCYWNrIiwiYWxlcnQiLCJvcHRpb25zIiwiY29uZmlybUNCIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm1Db2xvciIsImNvbmZpcm1UZXh0Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsRm4iLCJjYW5jZWxDb2xvciIsImNhbmNlbFRleHQiLCJjYW5jZWwiXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFNQSxHQUFHLEdBQUc7QUFDWEMsT0FBSyxFQUFDLGVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFtQjtBQUN4QkMsT0FBRyxDQUFDQyxTQUFKLENBQWM7QUFDYkMsV0FBSyxFQUFDSixPQURPO0FBRVZLLGNBQVEsRUFBRSxJQUZBO0FBR2JDLFVBQUksRUFBQ0wsTUFBTSxHQUFDLFNBQUQsR0FBVyxNQUhULEVBQWQ7O0FBS0E7QUFDQSxRQUFHQSxNQUFILEVBQVU7QUFDVE0sZ0JBQVUsQ0FBQyxZQUFVO0FBQ3BCLFlBQUdOLE1BQU0sSUFBRSxNQUFYLEVBQWtCO0FBQ2pCQyxhQUFHLENBQUNNLFVBQUosQ0FBZTtBQUNkQyxlQUFHLEVBQUNSLE1BRFUsRUFBZjs7QUFHQSxTQUpELE1BSUs7QUFDSkMsYUFBRyxDQUFDUSxZQUFKO0FBQ0E7QUFDRCxPQVJTLEVBUVIsSUFSUSxDQUFWO0FBU0E7QUFDRCxHQW5CVTtBQW9CWEMsT0FBSyxFQUFDLGVBQUNDLE9BQUQsRUFBU0MsU0FBVCxFQUFzQjtBQUMzQlgsT0FBRyxDQUFDWSxTQUFKLENBQWM7QUFDYlYsV0FBSyxFQUFFUSxPQUFPLENBQUNSLEtBREY7QUFFVlcsYUFBTyxFQUFDSCxPQUFPLENBQUNHLE9BRk47QUFHYkMsa0JBQVksRUFBQyxTQUhBO0FBSWJDLGlCQUFXLEVBQUNMLE9BQU8sQ0FBQ0ssV0FBUixJQUFzQixJQUpyQjtBQUtiQyxnQkFBVSxFQUFDLEtBTEU7QUFNVkMsYUFBTyxFQUFFLGlCQUFVQyxHQUFWLEVBQWU7QUFDMUIsWUFBRyxPQUFPUCxTQUFQLEtBQXFCLFVBQXhCLEVBQW1DO0FBQ2xDQSxtQkFBUztBQUNUO0FBQ0UsT0FWUyxFQUFkOztBQVlBLEdBakNVO0FBa0NYUSxTQUFPLEVBQUMsaUJBQUNULE9BQUQsRUFBU0MsU0FBVCxFQUFtQlMsUUFBbkIsRUFBK0I7QUFDdENwQixPQUFHLENBQUNZLFNBQUosQ0FBYztBQUNiVixXQUFLLEVBQUVRLE9BQU8sQ0FBQ1IsS0FBUixJQUFpQixNQURYO0FBRVZXLGFBQU8sRUFBQ0gsT0FBTyxDQUFDRyxPQUZOO0FBR2JDLGtCQUFZLEVBQUNKLE9BQU8sQ0FBQ0ksWUFBUixJQUF3QixTQUh4QjtBQUliTyxpQkFBVyxFQUFDWCxPQUFPLENBQUNXLFdBQVIsSUFBdUIsU0FKdEI7QUFLYkMsZ0JBQVUsRUFBQ1osT0FBTyxDQUFDWSxVQUFSLElBQXNCLElBTHBCO0FBTWJQLGlCQUFXLEVBQUNMLE9BQU8sQ0FBQ0ssV0FBUixJQUF1QixJQU50QjtBQU9WRSxhQUFPLEVBQUUsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQixZQUFJQSxHQUFHLENBQUNDLE9BQVIsRUFBaUI7QUFDYixjQUFHLE9BQU9SLFNBQVAsS0FBcUIsVUFBeEIsRUFBbUM7QUFDbENBLHFCQUFTO0FBQ1Q7QUFDSixTQUpELE1BSU8sSUFBSU8sR0FBRyxDQUFDSyxNQUFSLEVBQWdCO0FBQ25CLGNBQUcsT0FBT0gsUUFBUCxLQUFvQixVQUF2QixFQUFrQztBQUNqQ0Esb0JBQVE7QUFDUjtBQUNKO0FBQ0osT0FqQlMsRUFBZDs7QUFtQkEsR0F0RFUsRUFBWixDOzs7QUF5RGV4QixHIiwiZmlsZSI6IjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IG1zZyA9IHtcclxuXHR0b2FzdDoobWVzc2FnZSx0b1BhZ2UpID0+e1xyXG5cdFx0dW5pLnNob3dUb2FzdCh7XHJcblx0XHRcdHRpdGxlOm1lc3NhZ2UsXHJcblx0XHQgICAgZHVyYXRpb246IDMwMDAsXHJcblx0XHRcdGljb246dG9QYWdlP1wic3VjY2Vzc1wiOlwibm9uZVwiXHJcblx0XHR9KTtcclxuXHRcdC8v55So5LqO5o+Q5Lqk6KGo5Y2V5oiQ5Yqf5ZCO6Lez6L2s6aG16Z2iXHJcblx0XHRpZih0b1BhZ2Upe1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYodG9QYWdlIT0nYmFjaycpe1xyXG5cdFx0XHRcdFx0dW5pLm5hdmlnYXRlVG8oe1xyXG5cdFx0XHRcdFx0XHR1cmw6dG9QYWdlXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0dW5pLm5hdmlnYXRlQmFjaygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwyMDAwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGFsZXJ0OihvcHRpb25zLGNvbmZpcm1DQikgPT57XHJcblx0XHR1bmkuc2hvd01vZGFsKHtcclxuXHRcdFx0dGl0bGU6IG9wdGlvbnMudGl0bGUsXHJcblx0XHQgICAgY29udGVudDpvcHRpb25zLmNvbnRlbnQsXHJcblx0XHRcdGNvbmZpcm1Db2xvcjonIzMzMzMzMycsXHJcblx0XHRcdGNvbmZpcm1UZXh0Om9wdGlvbnMuY29uZmlybVRleHR8fCAn56Gu5a6aJyxcclxuXHRcdFx0c2hvd0NhbmNlbDpmYWxzZSxcclxuXHRcdCAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRcdFx0aWYodHlwZW9mIGNvbmZpcm1DQiA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0XHRcdGNvbmZpcm1DQigpXHJcblx0XHRcdFx0fVxyXG5cdFx0ICAgIH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y29uZmlybToob3B0aW9ucyxjb25maXJtQ0IsY2FuY2VsRm4pID0+e1xyXG5cdFx0dW5pLnNob3dNb2RhbCh7XHJcblx0XHRcdHRpdGxlOiBvcHRpb25zLnRpdGxlIHx8ICfmj5DnpLrkv6Hmga8nLFxyXG5cdFx0ICAgIGNvbnRlbnQ6b3B0aW9ucy5jb250ZW50LFxyXG5cdFx0XHRjb25maXJtQ29sb3I6b3B0aW9ucy5jb25maXJtQ29sb3IgfHwgJyNmYjI4NWQnLFxyXG5cdFx0XHRjYW5jZWxDb2xvcjpvcHRpb25zLmNhbmNlbENvbG9yIHx8ICcjOTk5OTk5JyxcclxuXHRcdFx0Y2FuY2VsVGV4dDpvcHRpb25zLmNhbmNlbFRleHQgfHwgJ+WPlua2iCcsXHJcblx0XHRcdGNvbmZpcm1UZXh0Om9wdGlvbnMuY29uZmlybVRleHQgfHwgJ+ehruWumicsXHJcblx0XHQgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG5cdFx0ICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuXHRcdCAgICAgICAgICAgIGlmKHR5cGVvZiBjb25maXJtQ0IgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHQgICAgICAgICAgICBcdGNvbmZpcm1DQigpXHJcblx0XHQgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xyXG5cdFx0ICAgICAgICAgICAgaWYodHlwZW9mIGNhbmNlbEZuID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0ICAgICAgICAgICAgXHRjYW5jZWxGbigpXHJcblx0XHQgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1zZyA7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///12\n");

/***/ }),

/***/ 13:
/*!***********************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/common/bindSystem.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__, __webpack_provided_uni_dot_requireNativePlugin) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 15));var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 10));\nvar _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 17));\nvar _storage = _interopRequireDefault(__webpack_require__(/*! ./storage.js */ 9));\nvar _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 11));\nvar _msg = _interopRequireDefault(__webpack_require__(/*! ./msg */ 12));\nvar _common = _interopRequireDefault(__webpack_require__(/*! ./common */ 8));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);}_next(undefined);});};}var _default =\n{\n  init: function init() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var version, systemInfo, obj, configObj;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (\n\n                _this2.getVersion());case 2:version = _context.sent;_context.next = 5;return (\n\n                _this2.getPlatform());case 5:systemInfo = _context.sent;\n              _this2.getDeviceInfo();\n\n              //初始化请求\n\n              obj = {\n                mobileBrand: systemInfo.brand,\n                mobileModel: systemInfo.model,\n                mobileOSVersion: systemInfo.system,\n                MobileSysVersion: systemInfo.version };\n\n\n\n\n\n\n\n\n\n\n\n              //读取常量配置信息\n              obj.constantVersion = '';\n              obj.iconListVersion = '';\n              obj.bannerListVersion = '';\n\n              configObj = _index.default.state.jxConfig;\n              if (configObj && configObj.config && configObj.iconList && configObj.bannerList) {\n                obj.constantVersion = configObj.config.constantVersion;\n                obj.iconListVersion = configObj.iconList.iconListVersion;\n                obj.bannerListVersion = configObj.bannerList.bannerListVersion;\n              }\n              _request.default.post('/api/index/getIndex', obj).then(function (res) {\n                /* if (res.data.config.checkImei == 1) {\r\n                                                                                     \tlet imei = store.state.imei\r\n                                                                                     \tif (!imei) {\r\n                                                                                     \t\tthis.getDeviceInfo()\r\n                                                                                     \t}\r\n                                                                                     } */\n                //app更新中的状态标识\n                /* storage.set('isReview',0);\r\n                console.log(storage.get(\"version\"));\r\n                if(res.data.config.appReviewVersion == storage.get(\"version\")){\r\n                \tstorage.set('isReview',1);\r\n                } */\n                _index.default.commit(\"jxConfig\", res.data);\n              }).catch(function (err) {\n                __f__(\"log\", '初始化接口失败' + err, \" at common/bindSystem.js:59\");\n              });case 14:case \"end\":return _context.stop();}}}, _callee);}))();\n  },\n  getPushClientId: function getPushClientId() {\n    var pushInfo = null;\n\n    pushInfo = plus.push.getClientInfo();\n    __f__(\"log\", JSON.stringify(tuisonInfo), \" at common/bindSystem.js:66\");\n\n\n    //模拟调试数据\n\n\n\n\n\n\n\n\n\n    _index.default.commit(\"pushInfo\", pushInfo);\n  },\n  getVersion: function getVersion() {//获取应用版本号\n    return new Promise(function (resolve, reject) {\n\n\n\n\n\n\n\n      //读取资源manifest.json的版本号\n      plus.runtime.getProperty(plus.runtime.appid, function (inf) {\n        _index.default.commit(\"versionInfo\", inf.version);\n        resolve();\n      });\n\n    });\n  },\n  getPlatform: function getPlatform() {var _this3 = this; //获取 客户端信息 //\n    // 手机品牌 brand, 手机型号 model ,手机版本号 version, 客户端平台 platform, 操作系统版本 system\n    return new Promise(function (resolve, reject) {\n      var _this = _this3;\n      uni.getSystemInfo({\n        success: function success(res) {\n          _index.default.commit(\"systemInfo\", res);\n          resolve(res);\n        } });\n\n    });\n  },\n\n  getDeviceInfo: function getDeviceInfo() {// 获取IMEI\n    var _this = this;\n\n\n\n\n\n\n    var imei = plus.device.uuid;\n    if (!imei) {\n      imei = this.getImei();\n    }\n    __f__(\"log\", imei, \" at common/bindSystem.js:123\");\n    _index.default.commit(\"imeiInfo\", imei);\n\n  },\n  getImei: function getImei() {// 随机生成imei\n    var now = new Date();\n    var year = now.getFullYear();\n    var month = now.getMonth() + 1;\n    var day = now.getDate();\n    var hour = now.getHours();\n    var minutes = now.getMinutes();\n    var seconds = now.getSeconds();\n    String(month).length < 2 ? month = Number(\"0\" + month) : month;\n    String(day).length < 2 ? day = Number(\"0\" + day) : day;\n    String(hour).length < 2 ? hour = Number(\"0\" + hour) : hour;\n    String(minutes).length < 2 ? minutes = Number(\"0\" + minutes) : minutes;\n    String(seconds).length < 2 ? seconds = Number(\"0\" + seconds) : seconds;\n    var time = \"\".concat(year).concat(month).concat(day).concat(hour).concat(minutes).concat(seconds);\n    return time + Math.random().toString(36).substr(2, 9);\n  },\n  serialize: function serialize(obj) {// 转换json格式传参为getUrl传参\n    var str = [];\n    for (var p in obj) {\n      if (obj.hasOwnProperty(p)) {\n        str.push(encodeURIComponent(p) + \"=\" + encodeURIComponent(obj[p]));\n      }}\n    return str.join(\"&\");\n  },\n  checkBindTaoBao: function checkBindTaoBao(backURL, opstion) {var _this4 = this; //检测淘宝授权\n    return new Promise(function (resolve) {\n      var token = _index.default.state.token;\n      if (opstion) {\n        var meter = _this4.serialize(opstion);\n        backURL = \"\".concat(backURL, \"?\").concat(meter);\n      }\n      if (!token) {\n        _msg.default.confirm({\n          title: '提示',\n          content: '请先登录' },\n        function () {\n          uni.navigateTo({\n            url: '/pages/pass/login?back=' + encodeURIComponent(backURL) });\n\n        });\n        return;\n      }\n\n      var userInfo = _index.default.state.userInfo;\n      var jxUserInfo = _index.default.state.jxUserInfo;\n      var isBindTaobao = jxUserInfo.buyerInfo.isBindTaobao;\n      var userId = userInfo.id;\n      var taobaoInfo = null;\n\n      if (isBindTaobao == 1) {\n        if (opstion.gotoURL) {\n          uni.navigateTo({\n            url: '/' + opstion.gotoURL });\n\n        } else {\n          resolve();\n        }\n        return;\n      }\n      _msg.default.confirm({\n        title: '授权提示',\n        content: '该功能需要淘宝授权！' },\n      function () {\n        _this4.baiChuan.login().then(function (res) {\n          taobaoInfo = res.userinfo;\n          return _this4.baiChuan.taobaoOauth(userId);\n        }).then(function (res) {\n          return _request.default.post('/api/taobao/doAuth', {\n            code: res.code,\n            avatar: taobaoInfo.avatar });\n\n        }).then(function (res) {\n          jxUserInfo.buyerInfo.isBindTaobao = 1;\n          if (jxUserInfo.buyerInfo.isBindWeixin == 0) {\n            userInfo.nickName = taobaoInfo.nick;\n            userInfo.avatar = _common.default.qiniuCdnUrl(taobaoInfo.avatar);\n            _index.default.commit('userInfo', userInfo);\n          }\n          _index.default.commit('jxUserInfo', jxUserInfo);\n          _msg.default.toast('淘宝授权成功！');\n          if (opstion.gotoURL) {\n            setTimeout(function () {\n              uni.navigateTo({\n                url: '/' + opstion.gotoURL });\n\n            }, 1500);\n          } else {\n            resolve();\n          }\n        }).catch(function (err) {\n          __f__(\"log\", err, \" at common/bindSystem.js:217\");\n        });\n\n      });\n    });\n  },\n  baiChuan: {\n    plug: __webpack_provided_uni_dot_requireNativePlugin('Html5app-Baichuan'),\n    login: function login() {var _this5 = this; //授权登录\n      return new Promise(function (resolve) {\n        _this5.plug.login({}, function (result) {\n          if (result.code == 0) {\n            resolve(result);\n            _index.default.commit(\"userBindTaobaoInfo\", result.userinfo);\n          } else {\n            _msg.default.toast(result.msg);\n          }\n          __f__(\"log\", JSON.stringify(result), \" at common/bindSystem.js:234\");\n\n        });\n      });\n    },\n    logout: function logout() {//退出授权登录\n      this.plug.logout({}, function (result) {\n        __f__(\"log\", result, \" at common/bindSystem.js:241\");\n      });\n    },\n    detail: function detail(itemid) {//跳转商品详情\n      this.plug.detailPage({\n        \"itemid\": itemid,\n        \"openType\": 1 },\n      function (result) {\n        __f__(\"log\", result, \" at common/bindSystem.js:249\");\n      });\n    },\n    goodsUrl: function goodsUrl(url) {//跳转商品链接\n      this.plug.detailPage({\n        \"url\": url,\n        \"openType\": 0 },\n      function (result) {\n        __f__(\"log\", result, \" at common/bindSystem.js:257\");\n      });\n    },\n    checkSession: function checkSession() {var _this6 = this; // 检测是否登录    0 、已登录 2、登录失效\n      return new Promise(function (resolve) {\n        _this6.plug.checkSession({}, function (result) {\n          //let data = JSON.stringify(result)\n          resolve(result);\n          __f__(\"log\", result, \" at common/bindSystem.js:265\");\n        });\n      });\n    },\n    getUserInfo: function getUserInfo() {//获取用户信息\n      this.plug.getUserInfo({}, function (result) {\n        __f__(\"log\", result, \" at common/bindSystem.js:271\");\n      });\n    },\n    OpenMyCart: function OpenMyCart() {//打开我的购物车\n      this.plug.OpenMyCart({\n        \"openType\": 1 },\n      function (result) {});\n    },\n    openCoupon: function openCoupon(url) {//打开优惠券\n      __f__(\"log\", url, \" at common/bindSystem.js:280\");\n      this.plug.openCoupon({\n        \"url\": url,\n        \"openType\": 1 },\n      function (ret) {\n        __f__(\"log\", result, \" at common/bindSystem.js:285\");\n      });\n    },\n    taobaoOauth: function taobaoOauth(userId) {var _this7 = this; //淘宝授权\n      var jxConfig = _index.default.state.jxConfig;\n      var bckey = jxConfig.config.taobaoAppKey;\n      return new Promise(function (resolve) {\n        __f__(\"log\", userId, \" at common/bindSystem.js:292\");\n        var url = \"https://oauth.taobao.com/authorize?response_type=code&client_id=\".concat(\n        bckey, \"&redirect_uri=\").concat(_config.default.couponeBaseUrl, \"/&state=\").concat(userId, \"&view=wap\");\n        __f__(\"log\", url, \" at common/bindSystem.js:295\");\n        _this7.plug.taobaoOauth({\n          \"url\": url },\n        function (result) {\n          resolve(result);\n        });\n      });\n    } },\n\n  isOpenPush: function isOpenPush() {// 检测手机是否开启推送 返回Boolean\n    if ('iOS' == plus.os.name) {\n      var result = false;\n      var UIApplication = plus.ios.import(\"UIApplication\");\n      var app = UIApplication.sharedApplication();\n      var enabledTypes = 0;\n      if (app.currentUserNotificationSettings) {\n        var settings = app.currentUserNotificationSettings();\n        enabledTypes = settings.plusGetAttribute(\"types\");\n        __f__(\"log\", \"enabledTypes1:\" + enabledTypes, \" at common/bindSystem.js:313\");\n        if (enabledTypes == 0) {\n          __f__(\"log\", \"推送权限没有开启\", \" at common/bindSystem.js:315\");\n        } else {\n          result = true;\n          __f__(\"log\", \"已经开启推送功能!\", \" at common/bindSystem.js:318\");\n        }\n        plus.ios.deleteObject(settings);\n      } else {\n        enabledTypes = app.enabledRemoteNotificationTypes();\n        if (enabledTypes == 0) {\n          __f__(\"log\", \"推送权限没有开启!\", \" at common/bindSystem.js:324\");\n        } else {\n          result = true;\n          __f__(\"log\", \"已经开启推送功能!\", \" at common/bindSystem.js:327\");\n        }\n        __f__(\"log\", \"enabledTypes2:\" + enabledTypes, \" at common/bindSystem.js:329\");\n      }\n      plus.ios.deleteObject(app);\n      plus.ios.deleteObject(UIApplication);\n      return result;\n    } else {\n      var main = plus.android.runtimeMainActivity();\n      var NotificationManagerCompat = plus.android.importClass(\"android.support.v4.app.NotificationManagerCompat\");\n      var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();\n      return areNotificationsEnabled;\n    }\n\n  },\n  //请求权限\n  // getPush() {\n  // \tif('iOS' != plus.os.name) {\n  // \t\t plus.android.requestPermissions()\n  // \t}\n  // },\n\n  gotoAppPermissionSetting: function gotoAppPermissionSetting() {// 转跳到设置开启推送\n\n    if ('iOS' == plus.os.name) {\n      var NSURL2 = plus.ios.import(\"NSURL\");\n      var setting2 = NSURL2.URLWithString(\"app-settings:\");\n      var application2 = UIApplication.sharedApplication();\n      application2.openURL(setting2);\n      plus.ios.deleteObject(setting2);\n      plus.ios.deleteObject(NSURL2);\n      plus.ios.deleteObject(application2);\n    } else {\n      var main = plus.android.runtimeMainActivity();\n      var pkName = main.getPackageName();\n      var uid = main.getApplicationInfo().plusGetAttribute(\"uid\");\n      var Intent = plus.android.importClass('android.content.Intent');\n      var Build = plus.android.importClass(\"android.os.Build\");\n      if (Build.VERSION.SDK_INT >= 26) {\n        //android 8.0引导  \n        var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');\n        intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);\n      } else if (Build.VERSION.SDK_INT >= 21) {\n        //android 5.0-7.0  \n        var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');\n        intent.putExtra(\"app_package\", pkName);\n        intent.putExtra(\"app_uid\", uid);\n      } else {\n        //(<21)其他--跳转到该应用管理的详情页  \n        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);\n        var uri = Uri.fromParts(\"package\", mainActivity.getPackageName(), null);\n        intent.setData(uri);\n      }\n      // 跳转到该应用的系统通知设置页  \n      main.startActivity(intent);\n    }\n  },\n  bindAlias: function bindAlias() {\n    var isAndorid, PushManager, context, Instance, GeTuiSdk;\n    if (plus.os.name == 'Android') {\n      isAndorid = true;\n    } else {\n      isAndorid = false;\n    }\n    if (isAndorid) {\n      PushManager = plus.android.importClass(\"com.igexin.sdk.PushManager\");\n      context = plus.android.runtimeMainActivity().getContext();\n      Instance = PushManager.getInstance();\n    } else {\n      GeTuiSdk = plus.ios.importClass(\"GeTuiSdk\");\n    }\n    return { isAndorid: isAndorid, context: context, Instance: Instance, GeTuiSdk: GeTuiSdk };\n  },\n  unbindAlias: function unbindAlias(alias) {//绑定别名个推送  alias 字符串\n    var _this$bindAlias =\n    this.bindAlias(),isAndorid = _this$bindAlias.isAndorid,context = _this$bindAlias.context,Instance = _this$bindAlias.Instance,GeTuiSdk = _this$bindAlias.GeTuiSdk;\n    if (isAndorid) {\n      Instance.unBindAlias(context, alias, true);\n    } else {\n      GeTuiSdk.unbindAliasandSequenceNumandIsSelf(alias, alias, true);\n    }\n\n  },\n  bindAliasAndTag: function bindAliasAndTag(alias, tags) {//绑定别名个推送  alias 字符串\n    var _this$bindAlias2 =\n    this.bindAlias(),isAndorid = _this$bindAlias2.isAndorid,context = _this$bindAlias2.context,Instance = _this$bindAlias2.Instance,GeTuiSdk = _this$bindAlias2.GeTuiSdk;\n    if (isAndorid) {\n      __f__(\"log\", '获取到cid==', Instance.getClientid(context), \" at common/bindSystem.js:414\");\n      __f__(\"log\", '获取到版本号==', Instance.getVersion(context), \" at common/bindSystem.js:415\");\n      __f__(\"log\", '获取到tags==', JSON.stringify(tags), \" at common/bindSystem.js:416\");\n      __f__(\"log\", '获取到alias==', alias, \" at common/bindSystem.js:417\");\n      var data = Instance.bindAlias(context, alias);\n      __f__(\"log\", data, \" at common/bindSystem.js:419\");\n      //绑定标签\n      var Tag = plus.android.importClass(\"com.igexin.sdk.Tag\");\n      __f__(\"log\", Tag, \" at common/bindSystem.js:422\");\n      var tagParam = new Array();\n      for (var i = 0; i < tags.length; i++) {\n        var tag = new Tag();\n        tag.setName(tags[i]);\n        tagParam[i] = tag;\n        __f__(\"log\", 'tags[' + i + ']==', tags[i], \" at common/bindSystem.js:428\");\n      }\n      __f__(\"log\", 'tagParam==', JSON.stringify(tagParam), \" at common/bindSystem.js:430\");\n      Instance.setTag(context, tagParam, Date.now() + \"\");\n    } else {\n      GeTuiSdk.bindAliasandSequenceNum(alias, alias);\n      GeTuiSdk.setTags(tags);\n    }\n\n  },\n  changeNetwork: function changeNetwork() {//监听设备网络\n    uni.getNetworkType({\n      success: function success(res) {\n        if (res.networkType == 'none') {\n          _msg.default.toast('当前网络不可用,请检查网络。');\n        }\n      },\n      fail: function fail() {\n        _msg.default.toast('当前网络不可用,请检查网络。');\n      } });\n\n    uni.onNetworkStatusChange(function (res) {\n      if (!res.isConnected) {\n        _msg.default.toast('网络连接已断开！');\n      }\n    });\n  } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 7)[\"default\"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/require-native-plugin.js */ 14)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tbW9uL2JpbmRTeXN0ZW0uanMiXSwibmFtZXMiOlsiaW5pdCIsImdldFZlcnNpb24iLCJ2ZXJzaW9uIiwiZ2V0UGxhdGZvcm0iLCJzeXN0ZW1JbmZvIiwiZ2V0RGV2aWNlSW5mbyIsIm9iaiIsIm1vYmlsZUJyYW5kIiwiYnJhbmQiLCJtb2JpbGVNb2RlbCIsIm1vZGVsIiwibW9iaWxlT1NWZXJzaW9uIiwic3lzdGVtIiwiTW9iaWxlU3lzVmVyc2lvbiIsImNvbnN0YW50VmVyc2lvbiIsImljb25MaXN0VmVyc2lvbiIsImJhbm5lckxpc3RWZXJzaW9uIiwiY29uZmlnT2JqIiwic3RvcmUiLCJzdGF0ZSIsImp4Q29uZmlnIiwiY29uZmlnIiwiaWNvbkxpc3QiLCJiYW5uZXJMaXN0IiwiaHR0cCIsInBvc3QiLCJ0aGVuIiwicmVzIiwiY29tbWl0IiwiZGF0YSIsImNhdGNoIiwiZXJyIiwiZ2V0UHVzaENsaWVudElkIiwicHVzaEluZm8iLCJwbHVzIiwicHVzaCIsImdldENsaWVudEluZm8iLCJKU09OIiwic3RyaW5naWZ5IiwidHVpc29uSW5mbyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicnVudGltZSIsImdldFByb3BlcnR5IiwiYXBwaWQiLCJpbmYiLCJfdGhpcyIsInVuaSIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwiaW1laSIsImRldmljZSIsInV1aWQiLCJnZXRJbWVpIiwibm93IiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJzZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIlN0cmluZyIsImxlbmd0aCIsIk51bWJlciIsInRpbWUiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiLCJzZXJpYWxpemUiLCJzdHIiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiY2hlY2tCaW5kVGFvQmFvIiwiYmFja1VSTCIsIm9wc3Rpb24iLCJ0b2tlbiIsIm1ldGVyIiwibXNnQWxlcnQiLCJjb25maXJtIiwidGl0bGUiLCJjb250ZW50IiwibmF2aWdhdGVUbyIsInVybCIsInVzZXJJbmZvIiwianhVc2VySW5mbyIsImlzQmluZFRhb2JhbyIsImJ1eWVySW5mbyIsInVzZXJJZCIsImlkIiwidGFvYmFvSW5mbyIsImdvdG9VUkwiLCJiYWlDaHVhbiIsImxvZ2luIiwidXNlcmluZm8iLCJ0YW9iYW9PYXV0aCIsImNvZGUiLCJhdmF0YXIiLCJpc0JpbmRXZWl4aW4iLCJuaWNrTmFtZSIsIm5pY2siLCJjb21tb24iLCJxaW5pdUNkblVybCIsInRvYXN0Iiwic2V0VGltZW91dCIsInBsdWciLCJyZXN1bHQiLCJtc2ciLCJsb2dvdXQiLCJkZXRhaWwiLCJpdGVtaWQiLCJkZXRhaWxQYWdlIiwiZ29vZHNVcmwiLCJjaGVja1Nlc3Npb24iLCJnZXRVc2VySW5mbyIsIk9wZW5NeUNhcnQiLCJvcGVuQ291cG9uIiwicmV0IiwiYmNrZXkiLCJ0YW9iYW9BcHBLZXkiLCJjb3Vwb25lQmFzZVVybCIsImlzT3BlblB1c2giLCJvcyIsIm5hbWUiLCJVSUFwcGxpY2F0aW9uIiwiaW9zIiwiaW1wb3J0IiwiYXBwIiwic2hhcmVkQXBwbGljYXRpb24iLCJlbmFibGVkVHlwZXMiLCJjdXJyZW50VXNlck5vdGlmaWNhdGlvblNldHRpbmdzIiwic2V0dGluZ3MiLCJwbHVzR2V0QXR0cmlidXRlIiwiZGVsZXRlT2JqZWN0IiwiZW5hYmxlZFJlbW90ZU5vdGlmaWNhdGlvblR5cGVzIiwibWFpbiIsImFuZHJvaWQiLCJydW50aW1lTWFpbkFjdGl2aXR5IiwiTm90aWZpY2F0aW9uTWFuYWdlckNvbXBhdCIsImltcG9ydENsYXNzIiwiYXJlTm90aWZpY2F0aW9uc0VuYWJsZWQiLCJmcm9tIiwiZ290b0FwcFBlcm1pc3Npb25TZXR0aW5nIiwiTlNVUkwyIiwic2V0dGluZzIiLCJVUkxXaXRoU3RyaW5nIiwiYXBwbGljYXRpb24yIiwib3BlblVSTCIsInBrTmFtZSIsImdldFBhY2thZ2VOYW1lIiwidWlkIiwiZ2V0QXBwbGljYXRpb25JbmZvIiwiSW50ZW50IiwiQnVpbGQiLCJWRVJTSU9OIiwiU0RLX0lOVCIsImludGVudCIsInB1dEV4dHJhIiwic2V0QWN0aW9uIiwiU2V0dGluZ3MiLCJBQ1RJT05fQVBQTElDQVRJT05fREVUQUlMU19TRVRUSU5HUyIsInVyaSIsIlVyaSIsImZyb21QYXJ0cyIsIm1haW5BY3Rpdml0eSIsInNldERhdGEiLCJzdGFydEFjdGl2aXR5IiwiYmluZEFsaWFzIiwiaXNBbmRvcmlkIiwiUHVzaE1hbmFnZXIiLCJjb250ZXh0IiwiSW5zdGFuY2UiLCJHZVR1aVNkayIsImdldENvbnRleHQiLCJnZXRJbnN0YW5jZSIsInVuYmluZEFsaWFzIiwiYWxpYXMiLCJ1bkJpbmRBbGlhcyIsInVuYmluZEFsaWFzYW5kU2VxdWVuY2VOdW1hbmRJc1NlbGYiLCJiaW5kQWxpYXNBbmRUYWciLCJ0YWdzIiwiZ2V0Q2xpZW50aWQiLCJUYWciLCJ0YWdQYXJhbSIsIkFycmF5IiwiaSIsInRhZyIsInNldE5hbWUiLCJzZXRUYWciLCJiaW5kQWxpYXNhbmRTZXF1ZW5jZU51bSIsInNldFRhZ3MiLCJjaGFuZ2VOZXR3b3JrIiwiZ2V0TmV0d29ya1R5cGUiLCJuZXR3b3JrVHlwZSIsImZhaWwiLCJvbk5ldHdvcmtTdGF0dXNDaGFuZ2UiLCJpc0Nvbm5lY3RlZCJdLCJtYXBwaW5ncyI6IndTQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RTtBQUNlO0FBQ1JBLE1BRFEsa0JBQ0Q7O0FBRVEsc0JBQUksQ0FBQ0MsVUFBTCxFQUZSLFNBRVJDLE9BRlE7O0FBSVcsc0JBQUksQ0FBQ0MsV0FBTCxFQUpYLFNBSVJDLFVBSlE7QUFLWixvQkFBSSxDQUFDQyxhQUFMOztBQUVBOztBQUVJQyxpQkFUUSxHQVNGO0FBQ1RDLDJCQUFXLEVBQUVILFVBQVUsQ0FBQ0ksS0FEZjtB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QTFCLEVBQWlDTCxJQUFJLENBQUNLLENBQUQsQ0FBckM7QUFDQTtBQUNELG1CQUFZLFlBQVosRUFBMEI5SixJQUFJLENBQUNDLFNBQUwsQ0FBZTJKLFFBQWYsQ0FBMUI7QUFDQVosY0FBUSxDQUFDaUIsTUFBVCxDQUFnQmxCLE9BQWhCLEVBQXlCYSxRQUF6QixFQUFtQ3pJLElBQUksQ0FBQ0QsR0FBTCxLQUFhLEVBQWhEO0FBQ0EsS0FuQkQsTUFtQk87QUFDTitILGNBQVEsQ0FBQ2lCLHVCQUFULENBQWlDYixLQUFqQyxFQUF3Q0EsS0FBeEM7QUFDQUosY0FBUSxDQUFDa0IsT0FBVCxDQUFpQlYsSUFBakI7QUFDQTs7QUFFRCxHQTlhYTtBQSthZFcsZUEvYWMsMkJBK2FFLENBQUU7QUFDakJ6SixPQUFHLENBQUMwSixjQUFKLENBQW1CO0FBQ2xCeEosYUFBTyxFQUFFLGlCQUFTdkIsR0FBVCxFQUFjO0FBQ3RCLFlBQUlBLEdBQUcsQ0FBQ2dMLFdBQUosSUFBbUIsTUFBdkIsRUFBK0I7QUFDOUJuSCx1QkFBU3lCLEtBQVQsQ0FBZSxnQkFBZjtBQUNBO0FBQ0QsT0FMaUI7QUFNbEIyRixVQUFJLEVBQUUsZ0JBQVc7QUFDaEJwSCxxQkFBU3lCLEtBQVQsQ0FBZSxnQkFBZjtBQUNBLE9BUmlCLEVBQW5COztBQVVBakUsT0FBRyxDQUFDNkoscUJBQUosQ0FBMEIsVUFBQ2xMLEdBQUQsRUFBUztBQUNsQyxVQUFJLENBQUNBLEdBQUcsQ0FBQ21MLFdBQVQsRUFBc0I7QUFDckJ0SCxxQkFBU3lCLEtBQVQsQ0FBZSxVQUFmO0FBQ0E7QUFDRCxLQUpEO0FBS0EsR0EvYmEsRSIsImZpbGUiOiIxMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gXCIuL3JlcXVlc3QuanNcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gXCJAL3N0b3JlL2luZGV4LmpzXCJcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgbXNnQWxlcnQgZnJvbSAnLi9tc2cnXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0Ly/ojrflj5ZhcHDniYjmnKzlj7dcclxuXHRcdGxldCB2ZXJzaW9uID0gYXdhaXQgdGhpcy5nZXRWZXJzaW9uKCk7XHJcblx0XHQvL+iOt+WPluiuvuWkh+S/oeaBr1xyXG5cdFx0bGV0IHN5c3RlbUluZm8gPSBhd2FpdCB0aGlzLmdldFBsYXRmb3JtKClcclxuXHRcdHRoaXMuZ2V0RGV2aWNlSW5mbygpXHJcblxyXG5cdFx0Ly/liJ3lp4vljJbor7fmsYJcclxuXHJcblx0XHRsZXQgb2JqID0ge1xyXG5cdFx0XHRtb2JpbGVCcmFuZDogc3lzdGVtSW5mby5icmFuZCxcclxuXHRcdFx0bW9iaWxlTW9kZWw6IHN5c3RlbUluZm8ubW9kZWwsXHJcblx0XHRcdG1vYmlsZU9TVmVyc2lvbjogc3lzdGVtSW5mby5zeXN0ZW0sXHJcblx0XHRcdE1vYmlsZVN5c1ZlcnNpb246IHN5c3RlbUluZm8udmVyc2lvbixcclxuXHRcdH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0XHQvL+ivu+WPluW4uOmHj+mFjee9ruS/oeaBr1xyXG5cdFx0b2JqLmNvbnN0YW50VmVyc2lvbiA9ICcnO1xyXG5cdFx0b2JqLmljb25MaXN0VmVyc2lvbiA9ICcnO1xyXG5cdFx0b2JqLmJhbm5lckxpc3RWZXJzaW9uID0gJyc7XHJcblxyXG5cdFx0bGV0IGNvbmZpZ09iaiA9IHN0b3JlLnN0YXRlLmp4Q29uZmlnXHJcblx0XHRpZiAoY29uZmlnT2JqICYmIGNvbmZpZ09iai5jb25maWcgJiYgY29uZmlnT2JqLmljb25MaXN0ICYmIGNvbmZpZ09iai5iYW5uZXJMaXN0KSB7XHJcblx0XHRcdG9iai5jb25zdGFudFZlcnNpb24gPSBjb25maWdPYmouY29uZmlnLmNvbnN0YW50VmVyc2lvbjtcclxuXHRcdFx0b2JqLmljb25MaXN0VmVyc2lvbiA9IGNvbmZpZ09iai5pY29uTGlzdC5pY29uTGlzdFZlcnNpb247XHJcblx0XHRcdG9iai5iYW5uZXJMaXN0VmVyc2lvbiA9IGNvbmZpZ09iai5iYW5uZXJMaXN0LmJhbm5lckxpc3RWZXJzaW9uO1xyXG5cdFx0fVxyXG5cdFx0aHR0cC5wb3N0KCcvYXBpL2luZGV4L2dldEluZGV4Jywgb2JqKS50aGVuKHJlcyA9PiB7XHJcblx0XHRcdC8qIGlmIChyZXMuZGF0YS5jb25maWcuY2hlY2tJbWVpID09IDEpIHtcclxuXHRcdFx0XHRsZXQgaW1laSA9IHN0b3JlLnN0YXRlLmltZWlcclxuXHRcdFx0XHRpZiAoIWltZWkpIHtcclxuXHRcdFx0XHRcdHRoaXMuZ2V0RGV2aWNlSW5mbygpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ICovXHJcblx0XHRcdC8vYXBw5pu05paw5Lit55qE54q25oCB5qCH6K+GXHJcblx0XHRcdC8qIHN0b3JhZ2Uuc2V0KCdpc1JldmlldycsMCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHN0b3JhZ2UuZ2V0KFwidmVyc2lvblwiKSk7XHJcblx0XHRcdGlmKHJlcy5kYXRhLmNvbmZpZy5hcHBSZXZpZXdWZXJzaW9uID09IHN0b3JhZ2UuZ2V0KFwidmVyc2lvblwiKSl7XHJcblx0XHRcdFx0c3RvcmFnZS5zZXQoJ2lzUmV2aWV3JywxKTtcclxuXHRcdFx0fSAqL1xyXG5cdFx0XHRzdG9yZS5jb21taXQoXCJqeENvbmZpZ1wiLCByZXMuZGF0YSlcclxuXHRcdH0pLmNhdGNoKGVyciA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCfliJ3lp4vljJbmjqXlj6PlpLHotKUnICsgZXJyKVxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdGdldFB1c2hDbGllbnRJZCgpIHtcclxuXHRcdGxldCBwdXNoSW5mbyA9IG51bGxcclxuXHJcblx0XHRwdXNoSW5mbyA9IHBsdXMucHVzaC5nZXRDbGllbnRJbmZvKCk7XHJcblx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0dWlzb25JbmZvKSlcclxuXHJcblxyXG5cdFx0Ly/mqKHmi5/osIPor5XmlbDmja5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdHN0b3JlLmNvbW1pdChcInB1c2hJbmZvXCIsIHB1c2hJbmZvKVxyXG5cdH0sXHJcblx0Z2V0VmVyc2lvbigpIHsgLy/ojrflj5blupTnlKjniYjmnKzlj7dcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFx0XHQvL+ivu+WPlui1hOa6kG1hbmlmZXN0Lmpzb27nmoTniYjmnKzlj7dcclxuXHRcdFx0cGx1cy5ydW50aW1lLmdldFByb3BlcnR5KHBsdXMucnVudGltZS5hcHBpZCwgZnVuY3Rpb24oaW5mKSB7XHJcblx0XHRcdFx0c3RvcmUuY29tbWl0KFwidmVyc2lvbkluZm9cIiwgaW5mLnZlcnNpb24pXHJcblx0XHRcdFx0cmVzb2x2ZSgpXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Z2V0UGxhdGZvcm0oKSB7IC8v6I635Y+WIOWuouaIt+err+S/oeaBryAvL1xyXG5cdFx0Ly8g5omL5py65ZOB54mMIGJyYW5kLCDmiYvmnLrlnovlj7cgbW9kZWwgLOaJi+acuueJiOacrOWPtyB2ZXJzaW9uLCDlrqLmiLfnq6/lubPlj7AgcGxhdGZvcm0sIOaTjeS9nOezu+e7n+eJiOacrCBzeXN0ZW1cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGxldCBfdGhpcyA9IHRoaXNcclxuXHRcdFx0dW5pLmdldFN5c3RlbUluZm8oe1xyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0XHRcdFx0c3RvcmUuY29tbWl0KFwic3lzdGVtSW5mb1wiLCByZXMpXHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlcylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Z2V0RGV2aWNlSW5mbygpIHsgLy8g6I635Y+WSU1FSVxyXG5cdFx0bGV0IF90aGlzID0gdGhpc1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFx0bGV0IGltZWkgPSBwbHVzLmRldmljZS51dWlkXHJcblx0XHRpZiAoIWltZWkpIHtcclxuXHRcdFx0aW1laSA9IHRoaXMuZ2V0SW1laSgpXHJcblx0XHR9XHJcblx0XHRjb25zb2xlLmxvZyhpbWVpKVxyXG5cdFx0c3RvcmUuY29tbWl0KFwiaW1laUluZm9cIiwgaW1laSlcclxuXHJcblx0fSxcclxuXHRnZXRJbWVpKCkgeyAvLyDpmo/mnLrnlJ/miJBpbWVpXHJcblx0XHRsZXQgbm93ID0gbmV3IERhdGUoKVxyXG5cdFx0bGV0IHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcclxuXHRcdGxldCBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcclxuXHRcdGxldCBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xyXG5cdFx0bGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcclxuXHRcdGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcclxuXHRcdGxldCBzZWNvbmRzID0gbm93LmdldFNlY29uZHMoKTtcclxuXHRcdFN0cmluZyhtb250aCkubGVuZ3RoIDwgMiA/IChtb250aCA9IE51bWJlcihcIjBcIiArIG1vbnRoKSkgOiBtb250aDtcclxuXHRcdFN0cmluZyhkYXkpLmxlbmd0aCA8IDIgPyAoZGF5ID0gTnVtYmVyKFwiMFwiICsgZGF5KSkgOiBkYXk7XHJcblx0XHRTdHJpbmcoaG91cikubGVuZ3RoIDwgMiA/IChob3VyID0gTnVtYmVyKFwiMFwiICsgaG91cikpIDogaG91cjtcclxuXHRcdFN0cmluZyhtaW51dGVzKS5sZW5ndGggPCAyID8gKG1pbnV0ZXMgPSBOdW1iZXIoXCIwXCIgKyBtaW51dGVzKSkgOiBtaW51dGVzO1xyXG5cdFx0U3RyaW5nKHNlY29uZHMpLmxlbmd0aCA8IDIgPyAoc2Vjb25kcyA9IE51bWJlcihcIjBcIiArIHNlY29uZHMpKSA6IHNlY29uZHM7XHJcblx0XHRjb25zdCB0aW1lID0gYCR7eWVhcn0ke21vbnRofSR7ZGF5fSR7aG91cn0ke21pbnV0ZXN9JHtzZWNvbmRzfWA7XHJcblx0XHRyZXR1cm4gdGltZSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxuXHR9LFxyXG5cdHNlcmlhbGl6ZTogZnVuY3Rpb24ob2JqKSB7IC8vIOi9rOaNompzb27moLzlvI/kvKDlj4LkuLpnZXRVcmzkvKDlj4JcclxuXHRcdHZhciBzdHIgPSBbXTtcclxuXHRcdGZvciAodmFyIHAgaW4gb2JqKVxyXG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XHJcblx0XHRcdFx0c3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW3BdKSk7XHJcblx0XHRcdH1cclxuXHRcdHJldHVybiBzdHIuam9pbihcIiZcIik7XHJcblx0fSxcclxuXHRjaGVja0JpbmRUYW9CYW86IGZ1bmN0aW9uKGJhY2tVUkwsIG9wc3Rpb24pIHsgLy/mo4DmtYvmt5jlrp3mjojmnYNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0bGV0IHRva2VuID0gc3RvcmUuc3RhdGUudG9rZW5cclxuXHRcdFx0aWYgKG9wc3Rpb24pIHtcclxuXHRcdFx0XHRsZXQgbWV0ZXIgPSB0aGlzLnNlcmlhbGl6ZShvcHN0aW9uKVxyXG5cdFx0XHRcdGJhY2tVUkwgPSBgJHtiYWNrVVJMfT8ke21ldGVyfWBcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXRva2VuKSB7XHJcblx0XHRcdFx0bXNnQWxlcnQuY29uZmlybSh7XHJcblx0XHRcdFx0XHR0aXRsZTogJ+aPkOekuicsXHJcblx0XHRcdFx0XHRjb250ZW50OiAn6K+35YWI55m75b2VJ1xyXG5cdFx0XHRcdH0sICgpID0+IHtcclxuXHRcdFx0XHRcdHVuaS5uYXZpZ2F0ZVRvKHtcclxuXHRcdFx0XHRcdFx0dXJsOiAnL3BhZ2VzL3Bhc3MvbG9naW4/YmFjaz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGJhY2tVUkwpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdXNlckluZm8gPSBzdG9yZS5zdGF0ZS51c2VySW5mb1xyXG5cdFx0XHRsZXQganhVc2VySW5mbyA9IHN0b3JlLnN0YXRlLmp4VXNlckluZm9cclxuXHRcdFx0bGV0IGlzQmluZFRhb2JhbyA9IGp4VXNlckluZm8uYnV5ZXJJbmZvLmlzQmluZFRhb2Jhb1xyXG5cdFx0XHRsZXQgdXNlcklkID0gdXNlckluZm8uaWRcclxuXHRcdFx0bGV0IHRhb2Jhb0luZm8gPSBudWxsXHJcblxyXG5cdFx0XHRpZiAoaXNCaW5kVGFvYmFvID09IDEpIHtcclxuXHRcdFx0XHRpZiAob3BzdGlvbi5nb3RvVVJMKSB7XHJcblx0XHRcdFx0XHR1bmkubmF2aWdhdGVUbyh7XHJcblx0XHRcdFx0XHRcdHVybDogJy8nICsgb3BzdGlvbi5nb3RvVVJMXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblx0XHRcdG1zZ0FsZXJ0LmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAn5o6I5p2D5o+Q56S6JyxcclxuXHRcdFx0XHRjb250ZW50OiAn6K+l5Yqf6IO96ZyA6KaB5reY5a6d5o6I5p2D77yBJ1xyXG5cdFx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5iYWlDaHVhbi5sb2dpbigpLnRoZW4ocmVzID0+IHtcclxuXHRcdFx0XHRcdHRhb2Jhb0luZm8gPSByZXMudXNlcmluZm9cclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmJhaUNodWFuLnRhb2Jhb09hdXRoKHVzZXJJZClcclxuXHRcdFx0XHR9KS50aGVuKHJlcyA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gaHR0cC5wb3N0KCcvYXBpL3Rhb2Jhby9kb0F1dGgnLCB7XHJcblx0XHRcdFx0XHRcdGNvZGU6IHJlcy5jb2RlLFxyXG5cdFx0XHRcdFx0XHRhdmF0YXI6IHRhb2Jhb0luZm8uYXZhdGFyXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0pLnRoZW4ocmVzID0+IHtcclxuXHRcdFx0XHRcdGp4VXNlckluZm8uYnV5ZXJJbmZvLmlzQmluZFRhb2JhbyA9IDFcclxuXHRcdFx0XHRcdGlmIChqeFVzZXJJbmZvLmJ1eWVySW5mby5pc0JpbmRXZWl4aW4gPT0gMCkge1xyXG5cdFx0XHRcdFx0XHR1c2VySW5mby5uaWNrTmFtZSA9IHRhb2Jhb0luZm8ubmlja1xyXG5cdFx0XHRcdFx0XHR1c2VySW5mby5hdmF0YXIgPSBjb21tb24ucWluaXVDZG5VcmwodGFvYmFvSW5mby5hdmF0YXIpXHJcblx0XHRcdFx0XHRcdHN0b3JlLmNvbW1pdCgndXNlckluZm8nLCB1c2VySW5mbylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN0b3JlLmNvbW1pdCgnanhVc2VySW5mbycsIGp4VXNlckluZm8pXHJcblx0XHRcdFx0XHRtc2dBbGVydC50b2FzdCgn5reY5a6d5o6I5p2D5oiQ5Yqf77yBJylcclxuXHRcdFx0XHRcdGlmIChvcHN0aW9uLmdvdG9VUkwpIHtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dW5pLm5hdmlnYXRlVG8oe1xyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiAnLycgKyBvcHN0aW9uLmdvdG9VUkxcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSwgMTUwMClcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLmNhdGNoKGVyciA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpXHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0YmFpQ2h1YW46IHtcclxuXHRcdHBsdWc6IHVuaS5yZXF1aXJlTmF0aXZlUGx1Z2luKCdIdG1sNWFwcC1CYWljaHVhbicpLFxyXG5cdFx0bG9naW46IGZ1bmN0aW9uKCkgeyAvL+aOiOadg+eZu+W9lVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0dGhpcy5wbHVnLmxvZ2luKHt9LCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5jb2RlID09IDApIHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpXHJcblx0XHRcdFx0XHRcdHN0b3JlLmNvbW1pdChcInVzZXJCaW5kVGFvYmFvSW5mb1wiLCByZXN1bHQudXNlcmluZm8pXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRtc2dBbGVydC50b2FzdChyZXN1bHQubXNnKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSlcclxuXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGxvZ291dDogZnVuY3Rpb24oKSB7IC8v6YCA5Ye65o6I5p2D55m75b2VXHJcblx0XHRcdHRoaXMucGx1Zy5sb2dvdXQoe30sIHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRkZXRhaWw6IGZ1bmN0aW9uKGl0ZW1pZCkgeyAvL+i3s+i9rOWVhuWTgeivpuaDhVxyXG5cdFx0XHR0aGlzLnBsdWcuZGV0YWlsUGFnZSh7XHJcblx0XHRcdFx0XCJpdGVtaWRcIjogaXRlbWlkLFxyXG5cdFx0XHRcdFwib3BlblR5cGVcIjogMVxyXG5cdFx0XHR9LCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdClcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Z29vZHNVcmw6IGZ1bmN0aW9uKHVybCkgeyAvL+i3s+i9rOWVhuWTgemTvuaOpVxyXG5cdFx0XHR0aGlzLnBsdWcuZGV0YWlsUGFnZSh7XHJcblx0XHRcdFx0XCJ1cmxcIjogdXJsLFxyXG5cdFx0XHRcdFwib3BlblR5cGVcIjogMFxyXG5cdFx0XHR9LCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdClcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y2hlY2tTZXNzaW9uOiBmdW5jdGlvbigpIHsgLy8g5qOA5rWL5piv5ZCm55m75b2VICAgIDAg44CB5bey55m75b2VIDLjgIHnmbvlvZXlpLHmlYhcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHRoaXMucGx1Zy5jaGVja1Nlc3Npb24oe30sIHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0XHQvL2xldCBkYXRhID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGdldFVzZXJJbmZvOiBmdW5jdGlvbigpIHsgLy/ojrflj5bnlKjmiLfkv6Hmga9cclxuXHRcdFx0dGhpcy5wbHVnLmdldFVzZXJJbmZvKHt9LCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdE9wZW5NeUNhcnQ6IGZ1bmN0aW9uKCkgeyAvL+aJk+W8gOaIkeeahOi0reeJqei9plxyXG5cdFx0XHR0aGlzLnBsdWcuT3Blbk15Q2FydCh7XHJcblx0XHRcdFx0XCJvcGVuVHlwZVwiOiAxXHJcblx0XHRcdH0sIHJlc3VsdCA9PiB7fSk7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkNvdXBvbjogZnVuY3Rpb24odXJsKSB7IC8v5omT5byA5LyY5oOg5Yi4XHJcblx0XHRcdGNvbnNvbGUubG9nKHVybClcclxuXHRcdFx0dGhpcy5wbHVnLm9wZW5Db3Vwb24oe1xyXG5cdFx0XHRcdFwidXJsXCI6IHVybCxcclxuXHRcdFx0XHRcIm9wZW5UeXBlXCI6IDFcclxuXHRcdFx0fSwgcmV0ID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0YW9iYW9PYXV0aDogZnVuY3Rpb24odXNlcklkKSB7IC8v5reY5a6d5o6I5p2DXHJcblx0XHRcdGxldCBqeENvbmZpZyA9IHN0b3JlLnN0YXRlLmp4Q29uZmlnXHJcblx0XHRcdGxldCBiY2tleSA9IGp4Q29uZmlnLmNvbmZpZy50YW9iYW9BcHBLZXlcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHVzZXJJZClcclxuXHRcdFx0XHRsZXQgdXJsID1cclxuXHRcdFx0XHRcdGBodHRwczovL29hdXRoLnRhb2Jhby5jb20vYXV0aG9yaXplP3Jlc3BvbnNlX3R5cGU9Y29kZSZjbGllbnRfaWQ9JHtiY2tleX0mcmVkaXJlY3RfdXJpPSR7Y29uZmlnLmNvdXBvbmVCYXNlVXJsfS8mc3RhdGU9JHt1c2VySWR9JnZpZXc9d2FwYFxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHVybClcclxuXHRcdFx0XHR0aGlzLnBsdWcudGFvYmFvT2F1dGgoe1xyXG5cdFx0XHRcdFx0XCJ1cmxcIjogdXJsXHJcblx0XHRcdFx0fSwgcmVzdWx0ID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpc09wZW5QdXNoKCkgeyAvLyDmo4DmtYvmiYvmnLrmmK/lkKblvIDlkK/mjqjpgIEg6L+U5ZueQm9vbGVhblxyXG5cdFx0aWYgKCdpT1MnID09IHBsdXMub3MubmFtZSkge1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gZmFsc2U7XHJcblx0XHRcdHZhciBVSUFwcGxpY2F0aW9uID0gcGx1cy5pb3MuaW1wb3J0KFwiVUlBcHBsaWNhdGlvblwiKTtcclxuXHRcdFx0dmFyIGFwcCA9IFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24oKTtcclxuXHRcdFx0dmFyIGVuYWJsZWRUeXBlcyA9IDA7XHJcblx0XHRcdGlmIChhcHAuY3VycmVudFVzZXJOb3RpZmljYXRpb25TZXR0aW5ncykge1xyXG5cdFx0XHRcdHZhciBzZXR0aW5ncyA9IGFwcC5jdXJyZW50VXNlck5vdGlmaWNhdGlvblNldHRpbmdzKCk7XHJcblx0XHRcdFx0ZW5hYmxlZFR5cGVzID0gc2V0dGluZ3MucGx1c0dldEF0dHJpYnV0ZShcInR5cGVzXCIpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZW5hYmxlZFR5cGVzMTpcIiArIGVuYWJsZWRUeXBlcyk7XHJcblx0XHRcdFx0aWYgKGVuYWJsZWRUeXBlcyA9PSAwKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuaOqOmAgeadg+mZkOayoeacieW8gOWQr1wiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5bey57uP5byA5ZCv5o6o6YCB5Yqf6IO9IVwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwbHVzLmlvcy5kZWxldGVPYmplY3Qoc2V0dGluZ3MpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVuYWJsZWRUeXBlcyA9IGFwcC5lbmFibGVkUmVtb3RlTm90aWZpY2F0aW9uVHlwZXMoKTtcclxuXHRcdFx0XHRpZiAoZW5hYmxlZFR5cGVzID09IDApIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5o6o6YCB5p2D6ZmQ5rKh5pyJ5byA5ZCvIVwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5bey57uP5byA5ZCv5o6o6YCB5Yqf6IO9IVwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImVuYWJsZWRUeXBlczI6XCIgKyBlbmFibGVkVHlwZXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHBsdXMuaW9zLmRlbGV0ZU9iamVjdChhcHApO1xyXG5cdFx0XHRwbHVzLmlvcy5kZWxldGVPYmplY3QoVUlBcHBsaWNhdGlvbik7XHJcblx0XHRcdHJldHVybiByZXN1bHRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBtYWluID0gcGx1cy5hbmRyb2lkLnJ1bnRpbWVNYWluQWN0aXZpdHkoKTtcclxuXHRcdFx0dmFyIE5vdGlmaWNhdGlvbk1hbmFnZXJDb21wYXQgPSBwbHVzLmFuZHJvaWQuaW1wb3J0Q2xhc3MoXCJhbmRyb2lkLnN1cHBvcnQudjQuYXBwLk5vdGlmaWNhdGlvbk1hbmFnZXJDb21wYXRcIik7XHJcblx0XHRcdHZhciBhcmVOb3RpZmljYXRpb25zRW5hYmxlZCA9IE5vdGlmaWNhdGlvbk1hbmFnZXJDb21wYXQuZnJvbShtYWluKS5hcmVOb3RpZmljYXRpb25zRW5hYmxlZCgpO1xyXG5cdFx0XHRyZXR1cm4gYXJlTm90aWZpY2F0aW9uc0VuYWJsZWRcclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHQvL+ivt+axguadg+mZkFxyXG5cdC8vIGdldFB1c2goKSB7XHJcblx0Ly8gXHRpZignaU9TJyAhPSBwbHVzLm9zLm5hbWUpIHtcclxuXHQvLyBcdFx0IHBsdXMuYW5kcm9pZC5yZXF1ZXN0UGVybWlzc2lvbnMoKVxyXG5cdC8vIFx0fVxyXG5cdC8vIH0sXHJcblx0XHJcblx0Z290b0FwcFBlcm1pc3Npb25TZXR0aW5nKCkgeyAvLyDovazot7PliLDorr7nva7lvIDlkK/mjqjpgIFcclxuXHRcdFxyXG5cdFx0aWYgKCdpT1MnID09IHBsdXMub3MubmFtZSkge1xyXG5cdFx0XHR2YXIgTlNVUkwyID0gcGx1cy5pb3MuaW1wb3J0KFwiTlNVUkxcIik7XHJcblx0XHRcdHZhciBzZXR0aW5nMiA9IE5TVVJMMi5VUkxXaXRoU3RyaW5nKFwiYXBwLXNldHRpbmdzOlwiKTtcclxuXHRcdFx0dmFyIGFwcGxpY2F0aW9uMiA9IFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24oKTtcclxuXHRcdFx0YXBwbGljYXRpb24yLm9wZW5VUkwoc2V0dGluZzIpO1xyXG5cdFx0XHRwbHVzLmlvcy5kZWxldGVPYmplY3Qoc2V0dGluZzIpO1xyXG5cdFx0XHRwbHVzLmlvcy5kZWxldGVPYmplY3QoTlNVUkwyKTtcclxuXHRcdFx0cGx1cy5pb3MuZGVsZXRlT2JqZWN0KGFwcGxpY2F0aW9uMik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgbWFpbiA9IHBsdXMuYW5kcm9pZC5ydW50aW1lTWFpbkFjdGl2aXR5KCk7ICBcclxuXHRcdFx0dmFyIHBrTmFtZSA9IG1haW4uZ2V0UGFja2FnZU5hbWUoKTtcclxuXHRcdFx0dmFyIHVpZCA9IG1haW4uZ2V0QXBwbGljYXRpb25JbmZvKCkucGx1c0dldEF0dHJpYnV0ZShcInVpZFwiKTtcclxuXHRcdFx0dmFyIEludGVudCA9IHBsdXMuYW5kcm9pZC5pbXBvcnRDbGFzcygnYW5kcm9pZC5jb250ZW50LkludGVudCcpO1xyXG5cdFx0XHR2YXIgQnVpbGQgPSBwbHVzLmFuZHJvaWQuaW1wb3J0Q2xhc3MoXCJhbmRyb2lkLm9zLkJ1aWxkXCIpO1xyXG5cdFx0XHRpZiAoQnVpbGQuVkVSU0lPTi5TREtfSU5UID49IDI2KSB7XHJcblx0XHRcdFx0Ly9hbmRyb2lkIDguMOW8leWvvCAgXHJcblx0XHRcdFx0dmFyIGludGVudCA9IG5ldyBJbnRlbnQoJ2FuZHJvaWQuc2V0dGluZ3MuQVBQX05PVElGSUNBVElPTl9TRVRUSU5HUycpO1xyXG5cdFx0XHRcdGludGVudC5wdXRFeHRyYSgnYW5kcm9pZC5wcm92aWRlci5leHRyYS5BUFBfUEFDS0FHRScsIHBrTmFtZSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoQnVpbGQuVkVSU0lPTi5TREtfSU5UID49IDIxKSB7XHJcblx0XHRcdFx0Ly9hbmRyb2lkIDUuMC03LjAgIFxyXG5cdFx0XHRcdHZhciBpbnRlbnQgPSBuZXcgSW50ZW50KCdhbmRyb2lkLnNldHRpbmdzLkFQUF9OT1RJRklDQVRJT05fU0VUVElOR1MnKTtcclxuXHRcdFx0XHRpbnRlbnQucHV0RXh0cmEoXCJhcHBfcGFja2FnZVwiLCBwa05hbWUpO1xyXG5cdFx0XHRcdGludGVudC5wdXRFeHRyYShcImFwcF91aWRcIiwgdWlkKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyg8MjEp5YW25LuWLS3ot7PovazliLDor6XlupTnlKjnrqHnkIbnmoTor6bmg4XpobUgIFxyXG5cdFx0XHRcdGludGVudC5zZXRBY3Rpb24oU2V0dGluZ3MuQUNUSU9OX0FQUExJQ0FUSU9OX0RFVEFJTFNfU0VUVElOR1MpO1xyXG5cdFx0XHRcdHZhciB1cmkgPSBVcmkuZnJvbVBhcnRzKFwicGFja2FnZVwiLCBtYWluQWN0aXZpdHkuZ2V0UGFja2FnZU5hbWUoKSwgbnVsbCk7XHJcblx0XHRcdFx0aW50ZW50LnNldERhdGEodXJpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyDot7PovazliLDor6XlupTnlKjnmoTns7vnu5/pgJrnn6Xorr7nva7pobUgIFxyXG5cdFx0XHRtYWluLnN0YXJ0QWN0aXZpdHkoaW50ZW50KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGJpbmRBbGlhcygpe1xyXG5cdFx0dmFyIGlzQW5kb3JpZCwgUHVzaE1hbmFnZXIsIGNvbnRleHQsIEluc3RhbmNlLCBHZVR1aVNkaztcclxuXHRcdGlmKHBsdXMub3MubmFtZSA9PSAnQW5kcm9pZCcpIHtcclxuXHRcdFx0aXNBbmRvcmlkID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlzQW5kb3JpZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoaXNBbmRvcmlkKSB7XHJcblx0XHRcdFB1c2hNYW5hZ2VyID0gcGx1cy5hbmRyb2lkLmltcG9ydENsYXNzKFwiY29tLmlnZXhpbi5zZGsuUHVzaE1hbmFnZXJcIik7XHJcblx0XHRcdGNvbnRleHQgPSBwbHVzLmFuZHJvaWQucnVudGltZU1haW5BY3Rpdml0eSgpLmdldENvbnRleHQoKTtcclxuXHRcdFx0SW5zdGFuY2UgPSBQdXNoTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0R2VUdWlTZGsgPSBwbHVzLmlvcy5pbXBvcnRDbGFzcyhcIkdlVHVpU2RrXCIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtpc0FuZG9yaWQsY29udGV4dCxJbnN0YW5jZSxHZVR1aVNka31cclxuXHR9LFxyXG5cdHVuYmluZEFsaWFzKGFsaWFzKSB7IC8v57uR5a6a5Yir5ZCN5Liq5o6o6YCBICBhbGlhcyDlrZfnrKbkuLJcclxuXHJcblx0XHRsZXQge2lzQW5kb3JpZCxjb250ZXh0LEluc3RhbmNlLEdlVHVpU2RrfSA9IHRoaXMuYmluZEFsaWFzKClcclxuXHRcdGlmKGlzQW5kb3JpZCkge1xyXG5cdFx0XHRJbnN0YW5jZS51bkJpbmRBbGlhcyhjb250ZXh0LCBhbGlhcywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRHZVR1aVNkay51bmJpbmRBbGlhc2FuZFNlcXVlbmNlTnVtYW5kSXNTZWxmKGFsaWFzLCBhbGlhcywgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblx0YmluZEFsaWFzQW5kVGFnKGFsaWFzLCB0YWdzKSB7IC8v57uR5a6a5Yir5ZCN5Liq5o6o6YCBICBhbGlhcyDlrZfnrKbkuLJcclxuXHJcblx0XHRsZXQge2lzQW5kb3JpZCxjb250ZXh0LEluc3RhbmNlLEdlVHVpU2RrfSA9IHRoaXMuYmluZEFsaWFzKClcclxuXHRcdGlmIChpc0FuZG9yaWQpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ+iOt+WPluWIsGNpZD09JywgSW5zdGFuY2UuZ2V0Q2xpZW50aWQoY29udGV4dCkpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygn6I635Y+W5Yiw54mI5pys5Y+3PT0nLCBJbnN0YW5jZS5nZXRWZXJzaW9uKGNvbnRleHQpKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ+iOt+WPluWIsHRhZ3M9PScsIEpTT04uc3RyaW5naWZ5KHRhZ3MpKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ+iOt+WPluWIsGFsaWFzPT0nLCBhbGlhcyk7XHJcblx0XHRcdGxldCAgZGF0YSA9IEluc3RhbmNlLmJpbmRBbGlhcyhjb250ZXh0LCBhbGlhcyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdC8v57uR5a6a5qCH562+XHJcblx0XHRcdHZhciBUYWcgPSBwbHVzLmFuZHJvaWQuaW1wb3J0Q2xhc3MoXCJjb20uaWdleGluLnNkay5UYWdcIik7XHJcblx0XHRcdGNvbnNvbGUubG9nKFRhZylcclxuXHRcdFx0dmFyIHRhZ1BhcmFtID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciB0YWcgPSBuZXcgVGFnKCk7XHJcblx0XHRcdFx0dGFnLnNldE5hbWUodGFnc1tpXSk7XHJcblx0XHRcdFx0dGFnUGFyYW1baV0gPSB0YWc7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3RhZ3NbJyArIGkgKyAnXT09JywgdGFnc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc29sZS5sb2coJ3RhZ1BhcmFtPT0nLCBKU09OLnN0cmluZ2lmeSh0YWdQYXJhbSkpO1xyXG5cdFx0XHRJbnN0YW5jZS5zZXRUYWcoY29udGV4dCwgdGFnUGFyYW0sIERhdGUubm93KCkgKyBcIlwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEdlVHVpU2RrLmJpbmRBbGlhc2FuZFNlcXVlbmNlTnVtKGFsaWFzLCBhbGlhcyk7XHJcblx0XHRcdEdlVHVpU2RrLnNldFRhZ3ModGFncyk7XHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblx0Y2hhbmdlTmV0d29yaygpIHsgLy/nm5HlkKzorr7lpIfnvZHnu5xcclxuXHRcdHVuaS5nZXROZXR3b3JrVHlwZSh7XHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0XHRcdGlmIChyZXMubmV0d29ya1R5cGUgPT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0XHRtc2dBbGVydC50b2FzdCgn5b2T5YmN572R57uc5LiN5Y+v55SoLOivt+ajgOafpee9kee7nOOAgicpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRtc2dBbGVydC50b2FzdCgn5b2T5YmN572R57uc5LiN5Y+v55SoLOivt+ajgOafpee9kee7nOOAgicpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dW5pLm9uTmV0d29ya1N0YXR1c0NoYW5nZSgocmVzKSA9PiB7XHJcblx0XHRcdGlmICghcmVzLmlzQ29ubmVjdGVkKSB7XHJcblx0XHRcdFx0bXNnQWxlcnQudG9hc3QoJ+e9kee7nOi/nuaOpeW3suaWreW8gO+8gScpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///13\n");

/***/ }),

/***/ 136:
/*!******************************************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/main.js?{"page":"pages%2Findex%2Fmenu"} ***!
  \******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uni-app-style */ 1);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_index_menu_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/index/menu.nvue?mpType=page */ 137);\n\n        \n        \n        \n        if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {\n          Promise.prototype.finally = function(callback) {\n            var promise = this.constructor\n            return this.then(function(value) {\n              return promise.resolve(callback()).then(function() {\n                return value\n              })\n            }, function(reason) {\n              return promise.resolve(callback()).then(function() {\n                throw reason\n              })\n            })\n          }\n        }\n        _pages_index_menu_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mpType = 'page'\n        _pages_index_menu_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].route = 'pages/index/menu'\n        _pages_index_menu_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].el = '#root'\n        new Vue(_pages_index_menu_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n        //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLFFBQThCO0FBQzlCLFFBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBLFFBQVEsMEVBQUc7QUFDWCxRQUFRLDBFQUFHO0FBQ1gsUUFBUSwwRUFBRztBQUNYLGdCQUFnQiwwRUFBRyIsImZpbGUiOiIxMzYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgICAgXG4gICAgICAgIGltcG9ydCAndW5pLWFwcC1zdHlsZSdcbiAgICAgICAgaW1wb3J0IEFwcCBmcm9tICcuL3BhZ2VzL2luZGV4L21lbnUubnZ1ZT9tcFR5cGU9cGFnZSdcbiAgICAgICAgaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiAhUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgcmVhc29uXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBBcHAubXBUeXBlID0gJ3BhZ2UnXG4gICAgICAgIEFwcC5yb3V0ZSA9ICdwYWdlcy9pbmRleC9tZW51J1xuICAgICAgICBBcHAuZWwgPSAnI3Jvb3QnXG4gICAgICAgIG5ldyBWdWUoQXBwKVxuICAgICAgICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///136\n");

/***/ }),

/***/ 137:
/*!************************************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?mpType=page ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.nvue?vue&type=template&id=c282544e&mpType=page */ 138);\n/* harmony import */ var _menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.nvue?vue&type=script&lang=js&mpType=page */ 140);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);\n\nvar renderjs\n\n\nfunction injectStyles (context) {\n  \n  if(!this.options.style){\n          this.options.style = {}\n      }\n      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){\n        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)\n      }\n      if(Vue.prototype.__merge_style){\n                Vue.prototype.__merge_style(__webpack_require__(/*! ./menu.nvue?vue&type=style&index=0&lang=less&mpType=page */ 142).default, this.options.style)\n            }else{\n                Object.assign(this.options.style,__webpack_require__(/*! ./menu.nvue?vue&type=style&index=0&lang=less&mpType=page */ 142).default)\n            }\n\n}\n\n/* normalize component */\n\nvar component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  \"381e0c4f\",\n  false,\n  _menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ninjectStyles.call(component)\ncomponent.options.__file = \"pages/index/menu.nvue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNkg7QUFDN0g7QUFDb0U7QUFDTDtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQkFBTyxDQUFDLG1FQUEwRDtBQUM5RyxhQUFhO0FBQ2IsaURBQWlELG1CQUFPLENBQUMsbUVBQTBEO0FBQ25IOztBQUVBOztBQUVBO0FBQ3FLO0FBQ3JLLGdCQUFnQiwrS0FBVTtBQUMxQixFQUFFLHNGQUFNO0FBQ1IsRUFBRSwyRkFBTTtBQUNSLEVBQUUsb0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0ZBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDZSxnRiIsImZpbGUiOiIxMzcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL21lbnUubnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMjgyNTQ0ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vbWVudS5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL21lbnUubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5mdW5jdGlvbiBpbmplY3RTdHlsZXMgKGNvbnRleHQpIHtcbiAgXG4gIGlmKCF0aGlzLm9wdGlvbnMuc3R5bGUpe1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHt9XG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUgJiYgVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fKXtcbiAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXywgdGhpcy5vcHRpb25zLnN0eWxlKVxuICAgICAgfVxuICAgICAgaWYoVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKXtcbiAgICAgICAgICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUocmVxdWlyZShcIi4vbWVudS5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1sZXNzJm1wVHlwZT1wYWdlXCIpLmRlZmF1bHQsIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLnN0eWxlLHJlcXVpcmUoXCIuL21lbnUubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9bGVzcyZtcFR5cGU9cGFnZVwiKS5kZWZhdWx0KVxuICAgICAgICAgICAgfVxuXG59XG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhRDpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxydW50aW1lXFxcXGNvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBcIjM4MWUwYzRmXCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInBhZ2VzL2luZGV4L21lbnUubnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///137\n");

/***/ }),

/***/ 138:
/*!******************************************************************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?vue&type=template&id=c282544e&mpType=page ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./menu.nvue?vue&type=template&id=c282544e&mpType=page */ 139);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_c282544e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 139:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?vue&type=template&id=c282544e&mpType=page ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "scroll-view",
    {
      staticStyle: { flexDirection: "column" },
      attrs: {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true"
      }
    },
    [
      _c(
        "view",
        { staticClass: ["tabs"] },
        [
          _c(
            "scroll-view",
            {
              staticClass: ["headerBar"],
              attrs: {
                scrollX: true,
                showScrollbar: "false",
                scrollWithAnimation: "true",
                scrollLeft: _vm.scrollInto
              }
            },
            _vm._l(_vm.tabnav, function(tab, index) {
              return tab.menu
                ? _c(
                    "view",
                    {
                      key: index,
                      staticClass: ["uni-tab-item"],
                      attrs: { id: tab.menu[0].cid, dataCurrent: index },
                      on: {
                        click: function($event) {
                          _vm.ontabtap(index)
                        }
                      }
                    },
                    [
                      _c(
                        "u-text",
                        {
                          staticClass: ["uni-tab-item-title"],
                          class:
                            _vm.tabIndex == index
                              ? "uni-tab-item-title-active"
                              : ""
                        },
                        [_vm._v(_vm._s(tab.menu[0].top))]
                      ),
                      _vm.tabIndex == index
                        ? _c("u-image", {
                            staticClass: ["tabimg"],
                            attrs: {
                              src: "../../static/image/index/bolang_red.png"
                            }
                          })
                        : _c("u-image", {
                            staticClass: ["tabimg"],
                            attrs: { src: "../../static/img/bolang_empty.png" }
                          })
                    ],
                    1
                  )
                : _vm._e()
            }),
            0
          ),
          _c(
            "swiper",
            {
              staticClass: ["swiper-box"],
              staticStyle: { flex: "1" },
              attrs: { current: _vm.tabIndex, duration: 300 },
              on: { change: _vm.changeTab }
            },
            _vm._l(_vm.tabnav, function(tab, index1) {
              return _c(
                "swiper-item",
                { key: index1, staticClass: ["swiper-item"] },
                [
                  _c(
                    "waterfall",
                    {
                      staticStyle: { backgroundColor: "#f6f6f6" },
                      attrs: {
                        showScrollbar: "false",
                        columnCount: "2",
                        leftGap: "15",
                        rightGap: "15",
                        columnGap: "10",
                        columnWidth: "auto",
                        loadmoreoffset: "80"
                      },
                      on: {
                        loadmore: function($event) {
                          _vm.loadMore(index1)
                        }
                      }
                    },
                    [
                      _c(
                        "refresh",
                        {
                          staticClass: ["refresh"],
                          style: _vm.styleObject,
                          attrs: { display: _vm.refreshing ? "show" : "hide" },
                          on: {
                            refresh: function($event) {
                              _vm.onrefresh(index1)
                            },
                            pullingdown: _vm.onpullingdown
                          }
                        },
                        [
                          _c(
                            "div",
                            { staticClass: ["refresh-view"] },
                            [
                              _c("u-image", {
                                staticClass: ["loading-icon"],
                                attrs: { src: "../../static/img/lang.png" }
                              }),
                              _c("u-text", { staticClass: ["loading-text"] }, [
                                _vm._v(_vm._s(_vm.refreshText))
                              ])
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._l(tab.subData, function(item, row) {
                        return _c(
                          "cell",
                          {
                            key: row,
                            appendAsTree: true,
                            attrs: { append: "tree" }
                          },
                          [
                            _c(
                              "view",
                              {
                                staticClass: ["goods-list"],
                                on: {
                                  click: function($event) {
                                    _vm.goodsDetail(item.itemId)
                                  }
                                }
                              },
                              [
                                _c("u-image", {
                                  staticClass: ["lazy"],
                                  attrs: { src: item.itemPic, alt: "" }
                                }),
                                _c("view", { staticClass: ["goods-info"] }, [
                                  _c(
                                    "view",
                                    { staticClass: ["goodstitle"] },
                                    [
                                      item.shopType == "B"
                                        ? _c("u-image", {
                                            staticClass: ["goodslaiyuan"],
                                            attrs: {
                                              src: "../../static/img/tmall.png"
                                            }
                                          })
                                        : _vm._e(),
                                      item.IsTmall == "C"
                                        ? _c("u-image", {
                                            staticClass: ["goodslaiyuan"],
                                            attrs: {
                                              src: "../../static/img/taobao.png"
                                            }
                                          })
                                        : _vm._e(),
                                      _c(
                                        "u-text",
                                        { staticClass: ["text", "title"] },
                                        [
                                          _vm._v(
                                            "     " + _vm._s(item.itemTitle)
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  ),
                                  _c("view", [
                                    _c(
                                      "view",
                                      { staticClass: ["goodslistbaseinfo"] },
                                      [
                                        _c(
                                          "u-text",
                                          { staticClass: ["zhuan"] },
                                          [
                                            _vm._v(
                                              " 赚￥" +
                                                _vm._s(
                                                  _vm._f("numFilter")(
                                                    (item.tkRates *
                                                      item.itemEndPrice *
                                                      _vm.bili *
                                                      _vm.allianceScale) /
                                                      100
                                                  )
                                                )
                                            )
                                          ]
                                        ),
                                        _c(
                                          "view",
                                          { staticClass: ["quanInfo0"] },
                                          [
                                            _c(
                                              "view",
                                              { staticClass: ["yj-quan"] },
                                              [
                                                _c("u-text", {
                                                  staticClass: [
                                                    "yj-quan-before"
                                                  ]
                                                }),
                                                _c("u-text", {
                                                  staticClass: ["yj-quan-after"]
                                                }),
                                                _c(
                                                  "u-text",
                                                  {
                                                    staticClass: ["yj-quan-txt"]
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f("numFilter2")(
                                                          item.couponMoney
                                                        )
                                                      ) + "元券"
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ]),
                                  _c(
                                    "view",
                                    { staticClass: ["goodslistbaseinfo"] },
                                    [
                                      _c(
                                        "view",
                                        { staticClass: ["yt-index-flex"] },
                                        [
                                          _c(
                                            "view",
                                            { staticClass: ["yt-index-flex"] },
                                            [
                                              _c(
                                                "u-text",
                                                {
                                                  staticStyle: {
                                                    fontSize: "20rpx",
                                                    color: "#FD4C66",
                                                    fontWeight: "bold"
                                                  }
                                                },
                                                [_vm._v("¥")]
                                              ),
                                              _c(
                                                "u-text",
                                                { staticClass: ["cost"] },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm._f("numFilter")(
                                                        item.itemPrice -
                                                          item.couponMoney
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                            ]
                                          ),
                                          _c(
                                            "u-text",
                                            { staticClass: ["rice"] },
                                            [
                                              _vm._v(
                                                "¥" +
                                                  _vm._s(
                                                    _vm._f("numFilter")(
                                                      item.itemPrice
                                                    )
                                                  )
                                              )
                                            ]
                                          )
                                        ]
                                      ),
                                      _c("u-text", { staticClass: ["sales"] }, [
                                        _vm._v("月销 " + _vm._s(item.itemSale))
                                      ])
                                    ]
                                  )
                                ])
                              ],
                              1
                            )
                          ]
                        )
                      }),
                      _vm.loadmoredata
                        ? _c(
                            "header",
                            {
                              staticClass: ["loading-more"],
                              appendAsTree: true,
                              attrs: { append: "tree" }
                            },
                            [
                              _c(
                                "u-text",
                                { staticClass: ["loading-more-text"] },
                                [_vm._v(_vm._s(_vm.loadingText))]
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    2
                  )
                ],
                1
              )
            }),
            1
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 14:
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/require-native-plugin.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = requireNativePlugin;function requireNativePlugin(name) {
  return weex.requireModule(name);
}

/***/ }),

/***/ 140:
/*!************************************************************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?vue&type=script&lang=js&mpType=page ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./menu.nvue?vue&type=script&lang=js&mpType=page */ 141);\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThhLENBQWdCLDBkQUFHLEVBQUMiLCJmaWxlIjoiMTQwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZCBmcm9tIFwiLSFEOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz9yZWYtLTQtMCFEOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNC0xIUQ6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL21lbnUubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIUQ6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3JlZi0tNC0wIUQ6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlclxcXFxpbmRleC5qcz8/cmVmLS00LTEhRDpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbWVudS5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///140\n");

/***/ }),

/***/ 141:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 15));\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _common = _interopRequireDefault(__webpack_require__(/*! @/common/common.js */ 8));\nvar _request = _interopRequireDefault(__webpack_require__(/*! @/common/request.js */ 10));\nvar _msg = _interopRequireDefault(__webpack_require__(/*! @/common/msg.js */ 12));\nvar _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 17));\nvar _bindSystem = _interopRequireDefault(__webpack_require__(/*! @/common/bindSystem.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);}_next(undefined);});};}var _default =\n{\n  data: function data() {\n    return {\n      loadIsShow: false,\n      type: '',\n      newsData: '', //其他数据 ,\n      indexData: '', //精选\n      zhuanArr: [],\n      zhuanArr2: [],\n      userData: [],\n      userpid: '',\n      isputong: true,\n      bili: 0,\n      allianceScale: 0,\n      newsDataunit: [],\n      searchKey: \"\",\n      title: '',\n      show: false,\n      tabIndex: 0,\n      //newsAll: newsAll,\n      titleShowId: 'tabTag-0',\n      uid: '',\n      refreshing: false,\n      refreshText: \"下拉可以刷新\",\n      loadmoredata: true,\n      loadingText: \"加载更多....\",\n      tabnav: '',\n      goodsConfig: [],\n      scrollInto: '',\n      sort: 9 };\n\n\n  },\n  onLoad: function onLoad(option) {\n    this.loadIsShow = true;\n    this.type = option.id;\n    __f__(\"log\", option, \" at pages/index/menu.nvue:119\");\n    this.mybili();\n    uni.setNavigationBarTitle({\n      title: option.title });\n\n    if (option.title == '高佣好货') {\n      this.sort = 5;\n    }\n    this.indexContent(this.type);\n  },\n  filters: {\n    numFilter: function numFilter(value) {\n      // 截取当前数据到小数点后两位\n      var realVal = parseFloat(parseFloat(value).toFixed(2));\n      // num.toFixed(2)获取的是字符串\n      return realVal;\n    },\n    numFilter2: function numFilter2(value) {\n      // 截取当前数据到小数点后两位\n      var realVal2 = parseInt(value);\n      // num.toFixed(2)获取的是字符串\n      return realVal2;\n    } },\n\n  methods: {\n    //首页数据\n    indexContent: function indexContent(type) {var _this2 = this;\n      //https://www.haodanku.com/api/detail/show/3.html\n      var _this = this;\n      _request.default.post('/api/goods/getCates').\n      then(function (res) {\n        var nav = [{ cid: 0, top: \"精选\" }];\n        _this2.$set(res.data.list, 0, nav);\n        Object.keys(res.data.list).forEach(function (v, i) {\n          _this2.goodsConfig.push({ type: type, minId: 1, sort: _this.sort, cid: i });\n          var data = { menu: res.data.list[i], subData: [] };\n          res.data.list[i] = data;\n        });\n        _this2.tabnav = res.data.list;\n        __f__(\"log\", _this2.tabnav, \" at pages/index/menu.nvue:158\");\n        _this2.getIndexData(_this2.goodsConfig[0]);\n      });\n    },\n    getIndexData: function getIndexData(postins) {var _this3 = this;\n      _request.default.post('/api/goods/getList', postins).\n      then(function (res) {\n        _this3.goodsConfig[postins.cid].minId = res.data.minId;\n        if (res.data.minId == 0) {\n          _this3.loadingText = '已加载全部';\n        }\n        if (res.data.list.length > 0) {\n          // res.data.list.map((v,i)=>{\n          // \tres.data.list[i].itemPic = $common.imgThumbAli(v.itemPic);\n          // });\n          _this3.tabnav[postins.cid].subData = _this3.tabnav[postins.cid].subData.concat(res.data.list);\n\n        }\n\n      });\n\n    },\n    //其他数据\n    otherContent: function otherContent(e) {\n\n\n    },\n\n    mybili: function mybili() {var _this4 = this;\n      _request.default.post('/api/index/getScale').\n      then(function (res) {\n        _this4.bili = res.data.scale;\n        _this4.allianceScale = res.data.allianceScale;\n        __f__(\"log\", _this4.bili, \" at pages/index/menu.nvue:191\");\n      });\n    },\n\n    goodsDetail: function goodsDetail(itemId) {\n      uni.navigateTo({\n        url: \"../detail/index?itemId=\" + itemId });\n\n    },\n\n\n    //选中的当前页面\n    changeTab: function changeTab(e) {var _this5 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var index;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:\n                index = e.detail.current;\n                _this5.switchTab(index);\n\n                if (_this5.tabnav[index].subData.length == 0) {\n                  _this5.loadingText = '正在加载';\n                  _this5.getIndexData(_this5.goodsConfig[index]);\n                }case 3:case \"end\":return _context.stop();}}}, _callee);}))();\n\n\n    },\n    ontabtap: function ontabtap(i) {\n      var index = i;\n      this.switchTab(index);\n      if (this.tabnav[index].subData.length == 0) {\n        this.loadingText = '正在加载';\n        this.getIndexData(this.goodsConfig[index]);\n      }\n    },\n\n    switchTab: function switchTab(index) {\n      this.tabIndex = index;\n      var scrollData = (this.goodsConfig[index].cid - 3) * 60;\n      if (scrollData < 0) {\n        scrollData = 0;\n      }\n      if (scrollData > this.goodsConfig.length * 60) {\n        scrollData = this.goodsConfig.length * 60;\n      }\n      this.scrollInto = scrollData;\n    },\n    //下拉加载更多\n    loadMore: function loadMore(e) {\n      this.loadmoredata = true;\n      if (this.goodsConfig[e].minId == 0) {\n        this.loadingText = '已加载全部';\n      } else {\n        this.loadingText = '加载更多....';\n        this.getIndexData(this.goodsConfig[e]);\n      }\n\n    },\n\n\n    onrefresh: function onrefresh(e) {var _this6 = this;\n      if (!this.refreshFlag) {\n        return;\n      }\n      __f__(\"log\", e, \" at pages/index/menu.nvue:251\");\n      this.goodsConfig[e].minId = 1;\n      this.tabnav[e].subData = [];\n      this.getIndexData(this.goodsConfig[e]);\n      //this.indexContent();\n      this.refreshing = true;\n      this.refreshText = \"正在刷新...\";\n\n      this.pulling = true;\n      setTimeout(function () {// TODO fix ios和Android 动画时间相反问题\n        _this6.refreshing = false;\n        _this6.refreshText = \"已刷新\";\n        _this6.pulling = false;\n      }, 500);\n    },\n    onpullingdown: function onpullingdown(e) {\n      if (this.refreshing || this.pulling) {\n        return;\n      }\n      if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {\n        this.refreshFlag = true;\n        this.refreshText = \"释放立即刷新\";\n      } else {\n        this.refreshFlag = false;\n        this.refreshText = \"下拉可以刷新\";\n      }\n    } } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 7)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvaW5kZXgvbWVudS5udnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0c7QUFDQTtBQUNBLE1BREEsa0JBQ0E7QUFDQTtBQUNBLHVCQURBO0FBRUEsY0FGQTtBQUdBLGtCQUhBLEVBR0E7QUFDQSxtQkFKQSxFQUlBO0FBQ0Esa0JBTEE7QUFNQSxtQkFOQTtBQU9BLGtCQVBBO0FBUUEsaUJBUkE7QUFTQSxvQkFUQTtBQVVBLGFBVkE7QUFXQSxzQkFYQTtBQVlBLHNCQVpBO0FBYUEsbUJBYkE7QUFjQSxlQWRBO0FBZUEsaUJBZkE7QUFnQkEsaUJBaEJBO0FBaUJBO0FBQ0EsNkJBbEJBO0FBbUJBLGFBbkJBO0FBb0JBLHVCQXBCQTtBQXFCQSwyQkFyQkE7QUFzQkEsd0JBdEJBO0FBdUJBLDZCQXZCQTtBQXdCQSxnQkF4QkE7QUF5QkEscUJBekJBO0FBMEJBLG9CQTFCQTtBQTJCQSxhQTNCQTs7O0FBOEJBLEdBaENBO0FBaUNBLFFBakNBLGtCQWlDQSxNQWpDQSxFQWlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFEQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBN0NBO0FBOENBO0FBQ0EsYUFEQSxxQkFDQSxLQURBLEVBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBTkE7QUFPQSxjQVBBLHNCQU9BLEtBUEEsRUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FaQSxFQTlDQTs7QUE0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FKQTtBQUtBO0FBQ0E7QUFDQTtBQUNBLE9BWkE7QUFhQSxLQWxCQTtBQW1CQTtBQUNBO0FBQ0EsVUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE9BZEE7O0FBZ0JBLEtBcENBO0FBcUNBO0FBQ0E7OztBQUdBLEtBekNBOztBQTJDQTtBQUNBO0FBQ0EsVUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FMQTtBQU1BLEtBbERBOztBQW9EQTtBQUNBO0FBQ0EsK0NBREE7O0FBR0EsS0F4REE7OztBQTJEQTtBQUNBLGFBNURBLHFCQTREQSxDQTVEQSxFQTREQTtBQUNBLHFCQURBLEdBQ0EsZ0JBREE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFQQTs7O0FBVUEsS0F0RUE7QUF1RUEsWUF2RUEsb0JBdUVBLENBdkVBLEVBdUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0E5RUE7O0FBZ0ZBLGFBaEZBLHFCQWdGQSxLQWhGQSxFQWdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBMUZBO0FBMkZBO0FBQ0EsWUE1RkEsb0JBNEZBLENBNUZBLEVBNEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FGQSxNQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBckdBOzs7QUF3R0EsYUF4R0EscUJBd0dBLENBeEdBLEVBd0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BSkEsRUFJQSxHQUpBO0FBS0EsS0ExSEE7QUEySEEsaUJBM0hBLHlCQTJIQSxDQTNIQSxFQTJIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BSEEsTUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBdElBLEVBNURBLEUiLCJmaWxlIjoiMTQxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDx2aWV3IGNsYXNzPVwidGFic1wiPlxuXHRcdDxzY3JvbGwtdmlldyBjbGFzcz1cImhlYWRlckJhclwiIDpzY3JvbGwteD1cInRydWVcIiBzaG93LXNjcm9sbGJhcj1cImZhbHNlXCIgc2Nyb2xsLXdpdGgtYW5pbWF0aW9uPVwidHJ1ZVwiIDpzY3JvbGwtbGVmdD1cInNjcm9sbEludG9cIj5cblx0XHQgICAgPHZpZXcgdi1pZj1cInRhYi5tZW51XCIgdi1mb3I9XCIodGFiLGluZGV4KSBpbiB0YWJuYXZcIiA6a2V5PVwiaW5kZXhcIiBjbGFzcz1cInVuaS10YWItaXRlbVwiIDppZD1cInRhYi5tZW51WzBdLmNpZFwiIDpkYXRhLWN1cnJlbnQ9XCJpbmRleFwiIEBjbGljaz1cIm9udGFidGFwKGluZGV4KVwiPlxuXHRcdCAgICAgICAgPHRleHQgIGNsYXNzPVwidW5pLXRhYi1pdGVtLXRpdGxlXCIgOmNsYXNzPVwidGFiSW5kZXg9PWluZGV4ID8gJ3VuaS10YWItaXRlbS10aXRsZS1hY3RpdmUnIDogJydcIj57e3RhYi5tZW51WzBdLnRvcH19PC90ZXh0PlxuXHRcdFx0XHQ8aW1hZ2Ugdi1pZj1cInRhYkluZGV4PT1pbmRleFwiIGNsYXNzPVwidGFiaW1nXCIgc3JjPVwiLi4vLi4vc3RhdGljL2ltYWdlL2luZGV4L2JvbGFuZ19yZWQucG5nXCI+PC9pbWFnZT5cblx0XHRcdFx0PGltYWdlIHYtZWxzZSBjbGFzcz1cInRhYmltZ1wiIHNyYz1cIi4uLy4uL3N0YXRpYy9pbWcvYm9sYW5nX2VtcHR5LnBuZ1wiPjwvaW1hZ2U+XG5cdFx0ICAgIDwvdmlldz5cblx0XHQ8L3Njcm9sbC12aWV3PlxuICAgICAgICA8c3dpcGVyIDpjdXJyZW50PVwidGFiSW5kZXhcIiBjbGFzcz1cInN3aXBlci1ib3hcIiBzdHlsZT1cImZsZXg6IDE7XCIgOmR1cmF0aW9uPVwiMzAwXCIgQGNoYW5nZT1cImNoYW5nZVRhYlwiPlxuICAgICAgICAgICAgPHN3aXBlci1pdGVtIGNsYXNzPVwic3dpcGVyLWl0ZW1cIiB2LWZvcj1cIih0YWIsaW5kZXgxKSBpbiB0YWJuYXZcIiA6a2V5PVwiaW5kZXgxXCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8c2Nyb2xsLXZpZXcgY2xhc3M9XCJzY3JvbGwtdiBsaXN0XCIgc2Nyb2xsLXkgQHNjcm9sbHRvbG93ZXI9XCJsb2FkTW9yZShpbmRleDEpXCI+IC0tPlxuXHRcdFx0XHQ8d2F0ZXJmYWxsIHNob3ctc2Nyb2xsYmFyPVwiZmFsc2VcIiBjb2x1bW4tY291bnQ9XCIyXCIgbGVmdC1nYXA9XCIxNVwiIHJpZ2h0LWdhcD1cIjE1XCIgY29sdW1uLWdhcD1cIjEwXCJcblx0XHRcdFx0IGNvbHVtbi13aWR0aD1cImF1dG9cIiBAbG9hZG1vcmU9XCJsb2FkTW9yZShpbmRleDEpXCIgbG9hZG1vcmVvZmZzZXQ9XCI4MFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSAjaWZkZWYgQVBQLVBMVVMtTlZVRSAtLT5cbiAgICAgICAgICAgICAgICAgICAgPHJlZnJlc2ggY2xhc3M9XCJyZWZyZXNoXCIgQHJlZnJlc2g9XCJvbnJlZnJlc2goaW5kZXgxKVwiIEBwdWxsaW5nZG93bj1cIm9ucHVsbGluZ2Rvd25cIiA6ZGlzcGxheT1cInJlZnJlc2hpbmcgPyAnc2hvdycgOiAnaGlkZSdcIiA6c3R5bGU9XCJzdHlsZU9iamVjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlZnJlc2gtdmlld1wiPlxuXHRcdFx0XHRcdFx0XHQ8aW1hZ2UgY2xhc3M9XCJsb2FkaW5nLWljb25cIiBzcmM9XCIuLi8uLi9zdGF0aWMvaW1nL2xhbmcucG5nXCI+PC9pbWFnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxvYWRpbmctdGV4dFwiPnt7cmVmcmVzaFRleHR9fTwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3JlZnJlc2g+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gI2VuZGlmIC0tPlxuXG5cdFx0XHRcdFx0PGNlbGwgdi1mb3I9XCIoaXRlbSwgcm93KSBpbiB0YWIuc3ViRGF0YVwiIDprZXk9XCJyb3dcIj48IS0tICBzdHlsZT1cInBhZGRpbmctdG9wOiAyMHJweDtcIiAtLT5cblx0XHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwiZ29vZHMtbGlzdFwiIEBjbGljaz1cImdvb2RzRGV0YWlsKGl0ZW0uaXRlbUlkKVwiPlxuXHRcdFx0XHRcdFx0XHQ8aW1hZ2UgY2xhc3M9XCJsYXp5XCIgOnNyYz1cIml0ZW0uaXRlbVBpY1wiIGFsdD1cIlwiPjwvaW1hZ2U+XG5cdFx0XHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwiZ29vZHMtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwiZ29vZHN0aXRsZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGltYWdlIGNsYXNzPVwiZ29vZHNsYWl5dWFuXCIgdi1pZj1cIml0ZW0uc2hvcFR5cGU9PSdCJ1wiIHNyYz1cIi4uLy4uL3N0YXRpYy9pbWcvdG1hbGwucG5nXCI+PC9pbWFnZT5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbWFnZSBjbGFzcz1cImdvb2RzbGFpeXVhblwiIHYtaWY9XCJpdGVtLklzVG1hbGw9PSdDJ1wiIHNyYz1cIi4uLy4uL3N0YXRpYy9pbWcvdGFvYmFvLnBuZ1wiPjwvaW1hZ2U+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGV4dCBjbGFzcz1cInRleHQgdGl0bGVcIj4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDt7e2l0ZW0uaXRlbVRpdGxlfX08L3RleHQ+XG5cdFx0XHRcdFx0XHRcdFx0PC92aWV3PlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0PCEtLSDlt7LnmbvlvZUg6auY57qnLS0+XG5cdFx0XHRcdFx0XHRcdFx0PHZpZXc+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImdvb2RzbGlzdGJhc2VpbmZvXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwiemh1YW5cIj4g6LWa77+le3soaXRlbS50a1JhdGVzKml0ZW0uaXRlbUVuZFByaWNlKmJpbGkqYWxsaWFuY2VTY2FsZS8xMDApIHwgbnVtRmlsdGVyfX08L3RleHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwicXVhbkluZm8wXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PCEtLSA8aW1hZ2UgY2xhc3M9XCJxdWFuaW1nXCIgc3JjPVwiLi4vLi4vc3RhdGljL2ltZy95b3VodWlxdWFuLnBuZ1wiPjwvaW1hZ2U+IC0tPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwieWotcXVhblwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJ5ai1xdWFuLWJlZm9yZVwiPjwvdGV4dD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwieWotcXVhbi1hZnRlclwiPjwvdGV4dD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwieWotcXVhbi10eHRcIj57e2l0ZW0uY291cG9uTW9uZXkgfCBudW1GaWx0ZXIyfX3lhYPliLg8L3RleHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC92aWV3PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwhLS0gPHRleHQgY2xhc3M9XCJxdWFuZGF0YVwiPnt7aXRlbS5RdWFuX3ByaWNlIHwgbnVtRmlsdGVyMn195YWD5Yi4PC90ZXh0PiAtLT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC92aWV3PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC92aWV3PlxuXHRcdFx0XHRcdFx0XHRcdDwvdmlldz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImdvb2RzbGlzdGJhc2VpbmZvXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cInl0LWluZGV4LWZsZXhcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHZpZXcgY2xhc3M9XCJ5dC1pbmRleC1mbGV4XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJcIiBzdHlsZT1cImZvbnQtc2l6ZTogMjBycHg7IGNvbG9yOiAjRkQ0QzY2OyBmb250LXdlaWdodDogYm9sZDtcIj4meWVuOzwvdGV4dD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGV4dCBjbGFzcz1cImNvc3RcIj57eyhpdGVtLml0ZW1QcmljZS1pdGVtLmNvdXBvbk1vbmV5KSB8IG51bUZpbHRlcn19PC90ZXh0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3ZpZXc+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwicmljZVwiPiZ5ZW47e3tpdGVtLml0ZW1QcmljZSB8IG51bUZpbHRlcn19PC90ZXh0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC92aWV3PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJzYWxlc1wiPuaciOmUgCB7e2l0ZW0uaXRlbVNhbGV9fTwvdGV4dD5cblx0XHRcdFx0XHRcdFx0XHQ8L3ZpZXc+XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdDwvdmlldz5cblx0XHRcdFx0XHRcdDwvdmlldz5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8L2NlbGw+XG4gICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0XHRcdDxoZWFkZXIgY2xhc3M9XCJsb2FkaW5nLW1vcmVcIiB2LWlmPVwibG9hZG1vcmVkYXRhXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxvYWRpbmctbW9yZS10ZXh0XCI+e3tsb2FkaW5nVGV4dH19PC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblx0XHRcdFx0PC93YXRlcmZhbGw+XG4gICAgICAgICAgICAgICAgPCEtLSA8L3Njcm9sbC12aWV3PiAtLT5cbiAgICAgICAgICAgIDwvc3dpcGVyLWl0ZW0+XG4gICAgICAgIDwvc3dpcGVyPlxuICAgIDwvdmlldz5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuXHRpbXBvcnQgJGNvbW1vbiBmcm9tIFwiQC9jb21tb24vY29tbW9uLmpzXCI7XG4gICAgaW1wb3J0ICRodHRwIGZyb20gXCJAL2NvbW1vbi9yZXF1ZXN0LmpzXCI7XG4gICAgaW1wb3J0ICRtc2cgZnJvbSBcIkAvY29tbW9uL21zZy5qc1wiO1xuICAgIGltcG9ydCAkc3RvcmUgZnJvbSBcIkAvc3RvcmUvaW5kZXguanNcIjtcbiAgICBpbXBvcnQgJGJpbmRTeXN0ZW0gZnJvbSBcIkAvY29tbW9uL2JpbmRTeXN0ZW0uanNcIjtcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxvYWRJc1Nob3c6ZmFsc2UsXG4gICAgICAgICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgICAgICAgbmV3c0RhdGE6ICcnLCAvL+WFtuS7luaVsOaNriAsXG4gICAgICAgICAgICAgICAgaW5kZXhEYXRhOiAnJywgLy/nsr7pgIlcbiAgICAgICAgICAgICAgICB6aHVhbkFycjogW10sXHRcbiAgICAgICAgICAgICAgICB6aHVhbkFycjI6IFtdLFx0XG4gICAgICAgICAgICAgICAgdXNlckRhdGE6W10sXG4gICAgICAgICAgICAgICAgdXNlcnBpZDonJyxcbiAgICAgICAgICAgICAgICBpc3B1dG9uZzp0cnVlLFxuICAgICAgICAgICAgICAgIGJpbGk6MCxcblx0XHRcdFx0YWxsaWFuY2VTY2FsZTowLFxuICAgICAgICAgICAgICAgIG5ld3NEYXRhdW5pdDogW10sXG4gICAgICAgICAgICAgICAgc2VhcmNoS2V5OiBcIlwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogMCxcbiAgICAgICAgICAgLy9uZXdzQWxsOiBuZXdzQWxsLFxuICAgICAgICAgICAgICAgIHRpdGxlU2hvd0lkOiAndGFiVGFnLTAnLFxuICAgICAgICAgICAgICAgIHVpZDonJyxcblx0XHRcdFx0cmVmcmVzaGluZzogZmFsc2UsXG5cdFx0XHRcdHJlZnJlc2hUZXh0OiBcIuS4i+aLieWPr+S7peWIt+aWsFwiLFxuXHRcdFx0XHRsb2FkbW9yZWRhdGE6IHRydWUsXG5cdFx0XHRcdGxvYWRpbmdUZXh0OiBcIuWKoOi9veabtOWkmi4uLi5cIixcblx0XHRcdFx0dGFibmF2OicnLFxuXHRcdFx0XHRnb29kc0NvbmZpZzpbXSxcblx0XHRcdFx0c2Nyb2xsSW50bzonJyxcclxuXHRcdFx0XHRzb3J0OiA5XG5cdFx0XHRcdFxuXHRcdCAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuXHRcdFx0dGhpcy5sb2FkSXNTaG93ID0gdHJ1ZTtcblx0XHRcdHRoaXMudHlwZSA9IG9wdGlvbi5pZDtcblx0XHRcdGNvbnNvbGUubG9nKG9wdGlvbilcclxuXHRcdFx0dGhpcy5teWJpbGkoKVxuXHRcdFx0dW5pLnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG5cdFx0XHRcdHRpdGxlOiBvcHRpb24udGl0bGVcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihvcHRpb24udGl0bGUgPT0gJ+mrmOS9o+Wlvei0pycpIHtcclxuXHRcdFx0XHR0aGlzLnNvcnQgPSA1XHJcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5kZXhDb250ZW50KHRoaXMudHlwZSk7XG4gICAgICAgIH0sXG5cdFx0ZmlsdGVyczoge1xuXHRcdFx0bnVtRmlsdGVyKHZhbHVlKSB7XG5cdFx0XHRcdC8vIOaIquWPluW9k+WJjeaVsOaNruWIsOWwj+aVsOeCueWQjuS4pOS9jVxuXHRcdFx0XHRsZXQgcmVhbFZhbCA9IHBhcnNlRmxvYXQocGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKSk7XG5cdFx0XHRcdC8vIG51bS50b0ZpeGVkKDIp6I635Y+W55qE5piv5a2X56ym5LiyXG5cdFx0XHRcdHJldHVybiByZWFsVmFsXG5cdFx0XHR9LFxuXHRcdFx0bnVtRmlsdGVyMih2YWx1ZSkge1xuXHRcdFx0XHQvLyDmiKrlj5blvZPliY3mlbDmja7liLDlsI/mlbDngrnlkI7kuKTkvY1cblx0XHRcdFx0bGV0IHJlYWxWYWwyID0gcGFyc2VJbnQodmFsdWUpO1xuXHRcdFx0XHQvLyBudW0udG9GaXhlZCgyKeiOt+WPlueahOaYr+Wtl+espuS4slxuXHRcdFx0XHRyZXR1cm4gcmVhbFZhbDJcblx0XHRcdH1cblx0XHR9LFxuICAgICAgICBtZXRob2RzOiB7XG5cdFx0XHQvL+mmlumhteaVsOaNrlxuXHRcdFx0aW5kZXhDb250ZW50OiBmdW5jdGlvbih0eXBlKSB7XG5cdFx0XHRcdC8vaHR0cHM6Ly93d3cuaGFvZGFua3UuY29tL2FwaS9kZXRhaWwvc2hvdy8zLmh0bWxcclxuXHRcdFx0XHRjb25zdCBfdGhpcyA9IHRoaXNcblx0XHRcdFx0JGh0dHAucG9zdCgnL2FwaS9nb29kcy9nZXRDYXRlcycpXG5cdFx0XHRcdC50aGVuKHJlcyA9Pntcblx0XHRcdFx0XHRsZXQgbmF2ID0gW3tjaWQ6IDAsdG9wOiBcIueyvumAiVwifV0gXG5cdFx0XHRcdFx0dGhpcy4kc2V0KHJlcy5kYXRhLmxpc3QsMCxuYXYpO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHJlcy5kYXRhLmxpc3QpLmZvckVhY2goKHYsaSk9Pntcblx0XHRcdFx0XHRcdHRoaXMuZ29vZHNDb25maWcucHVzaCh7dHlwZTp0eXBlLG1pbklkOjEsc29ydDpfdGhpcy5zb3J0LGNpZDppfSlcblx0XHRcdFx0XHRcdGxldCBkYXRhID0ge21lbnU6cmVzLmRhdGEubGlzdFtpXSxzdWJEYXRhOltdfVxuXHRcdFx0XHRcdFx0cmVzLmRhdGEubGlzdFtpXSA9IGRhdGFcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHRoaXMudGFibmF2ID0gcmVzLmRhdGEubGlzdFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMudGFibmF2KVxuXHRcdFx0XHRcdHRoaXMuZ2V0SW5kZXhEYXRhKHRoaXMuZ29vZHNDb25maWdbMF0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdGdldEluZGV4RGF0YTogZnVuY3Rpb24ocG9zdGlucyl7XG5cdFx0XHRcdCRodHRwLnBvc3QoJy9hcGkvZ29vZHMvZ2V0TGlzdCcscG9zdGlucylcblx0XHRcdFx0LnRoZW4ocmVzID0+e1xyXG5cdFx0XHRcdFx0dGhpcy5nb29kc0NvbmZpZ1twb3N0aW5zLmNpZF0ubWluSWQgPSByZXMuZGF0YS5taW5JZFxyXG5cdFx0XHRcdFx0aWYocmVzLmRhdGEubWluSWQgPT0gMCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmdUZXh0ID0gJ+W3suWKoOi9veWFqOmDqCdcclxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihyZXMuZGF0YS5saXN0Lmxlbmd0aD4wKXtcclxuXHRcdFx0XHRcdFx0Ly8gcmVzLmRhdGEubGlzdC5tYXAoKHYsaSk9PntcclxuXHRcdFx0XHRcdFx0Ly8gXHRyZXMuZGF0YS5saXN0W2ldLml0ZW1QaWMgPSAkY29tbW9uLmltZ1RodW1iQWxpKHYuaXRlbVBpYyk7XHJcblx0XHRcdFx0XHRcdC8vIH0pO1xuXHRcdFx0XHRcdFx0dGhpcy50YWJuYXZbcG9zdGlucy5jaWRdLnN1YkRhdGEgPSB0aGlzLnRhYm5hdltwb3N0aW5zLmNpZF0uc3ViRGF0YS5jb25jYXQocmVzLmRhdGEubGlzdClcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0Ly/lhbbku5bmlbDmja5cblx0XHRcdG90aGVyQ29udGVudDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0bXliaWxpOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdCRodHRwLnBvc3QoJy9hcGkvaW5kZXgvZ2V0U2NhbGUnKVxuXHRcdFx0XHQudGhlbihyZXMgPT57XG5cdFx0XHRcdFx0dGhpcy5iaWxpID0gcmVzLmRhdGEuc2NhbGVcblx0XHRcdFx0XHR0aGlzLmFsbGlhbmNlU2NhbGUgPSByZXMuZGF0YS5hbGxpYW5jZVNjYWxlXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5iaWxpKVxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Z29vZHNEZXRhaWw6IGZ1bmN0aW9uKGl0ZW1JZCkge1xuXHRcdFx0XHR1bmkubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiBcIi4uL2RldGFpbC9pbmRleD9pdGVtSWQ9XCIgKyBpdGVtSWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdC8v6YCJ5Lit55qE5b2T5YmN6aG16Z2iXG5cdFx0XHRhc3luYyBjaGFuZ2VUYWIoZSkge1xuXHRcdFx0XHRsZXQgaW5kZXggPSBlLmRldGFpbC5jdXJyZW50O1xuXHRcdFx0XHR0aGlzLnN3aXRjaFRhYihpbmRleCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnRhYm5hdltpbmRleF0uc3ViRGF0YS5sZW5ndGg9PTApe1xyXG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nVGV4dCA9ICfmraPlnKjliqDovb0nXG5cdFx0XHRcdFx0dGhpcy5nZXRJbmRleERhdGEodGhpcy5nb29kc0NvbmZpZ1tpbmRleF0pXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdG9udGFidGFwKGkpe1xuXHRcdFx0XHRsZXQgaW5kZXggPSBpO1xuXHRcdFx0XHR0aGlzLnN3aXRjaFRhYihpbmRleCk7XG5cdFx0XHRcdGlmKHRoaXMudGFibmF2W2luZGV4XS5zdWJEYXRhLmxlbmd0aD09MCl7XHJcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmdUZXh0ID0gJ+ato+WcqOWKoOi9vSdcblx0XHRcdFx0XHR0aGlzLmdldEluZGV4RGF0YSh0aGlzLmdvb2RzQ29uZmlnW2luZGV4XSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0c3dpdGNoVGFiKGluZGV4KXtcblx0XHRcdFx0dGhpcy50YWJJbmRleCA9IGluZGV4O1xuXHRcdFx0XHRsZXQgc2Nyb2xsRGF0YSA9ICh0aGlzLmdvb2RzQ29uZmlnW2luZGV4XS5jaWQtMykqNjA7XG5cdFx0XHRcdGlmKHNjcm9sbERhdGE8MCl7XG5cdFx0XHRcdFx0c2Nyb2xsRGF0YSA9IDBcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihzY3JvbGxEYXRhPih0aGlzLmdvb2RzQ29uZmlnLmxlbmd0aCo2MCkpe1xuXHRcdFx0XHRcdHNjcm9sbERhdGEgPSB0aGlzLmdvb2RzQ29uZmlnLmxlbmd0aCo2MFxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2Nyb2xsSW50byA9IHNjcm9sbERhdGFcblx0XHRcdH0sXG5cdFx0XHQvL+S4i+aLieWKoOi9veabtOWkmlxuXHRcdFx0bG9hZE1vcmUoZSkge1xuXHRcdFx0XHR0aGlzLmxvYWRtb3JlZGF0YSA9IHRydWU7XG5cdFx0XHRcdGlmKHRoaXMuZ29vZHNDb25maWdbZV0ubWluSWQgPT0gMCl7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nVGV4dCA9ICflt7LliqDovb3lhajpg6gnXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nVGV4dCA9ICfliqDovb3mm7TlpJouLi4uJ1xuXHRcdFx0XHRcdHRoaXMuZ2V0SW5kZXhEYXRhKHRoaXMuZ29vZHNDb25maWdbZV0pXG5cdFx0XHRcdH1cblx0XHRcdFxuXHRcdFx0fSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICBvbnJlZnJlc2goZSkge1xuICAgICAgICAgICAgIGlmICghdGhpcy5yZWZyZXNoRmxhZykge1xuICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgfVxuICAgICAgICAgXHRjb25zb2xlLmxvZyhlKVxuICAgICAgICAgXHR0aGlzLmdvb2RzQ29uZmlnW2VdLm1pbklkID0gMVxuICAgICAgICAgXHR0aGlzLnRhYm5hdltlXS5zdWJEYXRhID0gW11cbiAgICAgICAgIFx0dGhpcy5nZXRJbmRleERhdGEodGhpcy5nb29kc0NvbmZpZ1tlXSk7XG4gICAgICAgICAgICAgLy90aGlzLmluZGV4Q29udGVudCgpO1xuICAgICAgICAgICAgIHRoaXMucmVmcmVzaGluZyA9IHRydWU7XG4gICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGV4dCA9IFwi5q2j5Zyo5Yi35pawLi4uXCI7XG4gICAgICAgICBcbiAgICAgICAgICAgICB0aGlzLnB1bGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBUT0RPIGZpeCBpb3PlkoxBbmRyb2lkIOWKqOeUu+aXtumXtOebuOWPjemXrumimFxuICAgICAgICAgXHRcdHRoaXMucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICAgXHRcdHRoaXMucmVmcmVzaFRleHQgPSBcIuW3suWIt+aWsFwiO1xuICAgICAgICAgICAgICAgICB0aGlzLnB1bGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgfSxcbiAgICAgICAgICAgb25wdWxsaW5nZG93bihlKSB7XG4gICAgICAgICAgICAgICBpZiAodGhpcy5yZWZyZXNoaW5nIHx8IHRoaXMucHVsbGluZykge1xuICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLnB1bGxpbmdEaXN0YW5jZSkgPiBNYXRoLmFicyhlLnZpZXdIZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGV4dCA9IFwi6YeK5pS+56uL5Y2z5Yi35pawXCI7XG4gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hUZXh0ID0gXCLkuIvmi4nlj6/ku6XliLfmlrBcIjtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cblx0QGltcG9ydCBcIi4uLy4uL3N0YXRpYy9jc3MvdmFyLmxlc3NcIjtcbiAgICAvKiAjaWZuZGVmIEFQUC1QTFVTICovXG4gICAgcGFnZSB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICAvKiAjZW5kaWYgKi9cblx0LnNlYXJjaCB7XG5cdFx0cGFkZGluZzogNzBycHggMzBycHggMTBycHg7XG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdFxuXHR9XG5cdC5zZWFyY2hEaXYge1xuXHRcdGZsZXg6IDE7XG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0XHRib3JkZXItcmFkaXVzOiA0MHJweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRcdGhlaWdodDogNjBycHg7XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0fVxuXHQuc2VhcmNoLWltYWdlc3tcblx0XHR3aWR0aDogMzhycHg7XG5cdFx0aGVpZ2h0OiAzM3JweDtcblx0XHRtYXJnaW4tbGVmdDogMjZycHg7XG5cdH1cblx0LmhlYWRvcGVye1xuXHRcdHdpZHRoOiA1MHJweDtcblx0XHRoZWlnaHQ6IDUwcnB4O1xuXHRcdG1hcmdpbi1sZWZ0OiAzMHJweDtcblx0fVxuXHQudGV4dFZpZXcge1xuXHRcdGZvbnQtc2l6ZTogMjVycHg7XG5cdFx0cGFkZGluZy1sZWZ0OiAxMHJweDtcblx0XHRjb2xvcjogIzk5OTtcblx0fVxuICAgIC50YWJzIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgLyogI2lmZGVmIE1QLUFMSVBBWSB8fCBNUC1CQUlEVSAqL1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICAvKiAjZW5kaWYgKi9cbiAgICB9XG5cbiAgICAuaGVhZGVyQmFyIHtcbiAgICAgICAgd2lkdGg6IDc1MHVweDtcbiAgICAgICAgaGVpZ2h0OiA4MHVweDtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIC8qICNpZm5kZWYgQVBQLVBMVVMgKi9cbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgLyogI2VuZGlmICovXG4gICAgfVxuXG4gIFxuICAgIC51bmktdGFiLWl0ZW0ge1xuICAgICAgICAvKiAjaWZuZGVmIEFQUC1QTFVTICovXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgLyogI2VuZGlmICovXG4gICAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xyXG5cdFx0d2lkdGg6IDEyMHJweDtcbiAgICAgICAgLy8gcGFkZGluZy1sZWZ0OiAzMHVweDtcbiAgICAgICAgLy8gcGFkZGluZy1yaWdodDogMzB1cHg7XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLnVuaS10YWItaXRlbS10aXRsZSB7XG4gICAgICAgIGhlaWdodDogNjBycHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OjcwcnB4O1xuICAgICAgICBmb250LXNpemU6IDI4cnB4O1xuICAgICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICB9XG5cdC51bmktdGFiLWl0ZW0tdGl0bGUtYWN0aXZlIHtcblx0ICAgIGNvbG9yOiAjMzMzMzMzO1xyXG5cdFx0Zm9udC1zaXplOjMycnB4O1xyXG5cdFx0Zm9udC13ZWlnaHQ6Ym9sZDtcblx0fVxuXHQudGFiaW1ne1xuXHRcdHdpZHRoOiA1M3JweDtcblx0XHRoZWlnaHQ6IDlycHg7XG5cdH1cblxuICAgIC5zd2lwZXItYm94IHtcbiAgICAgICAgZmxleDogMTtcbiAgICB9XG5cbiAgICAuc3dpcGVyLWl0ZW0ge1xuICAgICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgIC5zY3JvbGwtdiB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIC8qICNpZm5kZWYgTVAtQUxJUEFZICovXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIC8qICNlbmRpZiAqL1xuICAgICAgICB3aWR0aDogNzUwdXB4O1xuICAgIH1cblx0XG4gICAgXG5cbiAgICAucmVmcmVzaCB7XG4gICAgICAgIHdpZHRoOiA3NTB1cHg7XG4gICAgICAgIGhlaWdodDogNjRweDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLnJlZnJlc2gtdmlldyB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG5cbiAgICAucmVmcmVzaC1pY29uIHtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogLjVzO1xuICAgICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxNnB4IDE2cHg7XG4gICAgfVxuXG4gICAgLnJlZnJlc2gtaWNvbi1hY3RpdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgIH1cblxuICAgIC5sb2FkaW5nLWljb24ge1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICB9XG5cbiAgICAubG9hZGluZy1pY29uLWFjdGl2ZSB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIxNjAwZGVnKTtcbiAgICB9XG5cbiAgICAubG9hZGluZy10ZXh0IHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVycHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMzJycHg7XG4gICAgICAgIGNvbG9yOiAjOTk5O1xuICAgIH1cblxuICAgIC5sb2FkaW5nLW1vcmUge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmxvYWRpbmctbW9yZS10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAyOHVweDtcbiAgICAgICAgY29sb3I6ICM5OTk7XG4gICAgfVxuXHRcblx0XG5cdFxuXHQvKiDova7mkq3lm74gICovXG5cdC5pbmRleFNlaXBlckJne1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0fVxuXHQuaW5kZXhTZWlwZXJ7XG5cdFx0d2lkdGg6IDY5MHJweDtcblx0XHRtYXJnaW46IDAgMzBycHg7XG5cdFx0aGVpZ2h0OiAzMDBycHg7XG5cdFx0Ym9yZGVyLXJhZGl1czogMTBycHg7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdC8qICNpZm5kZWYgQVBQLVBMVVMgKi9cblx0XHRib3gtc2hhZG93OjBycHggMHJweCAyMHJweCAjNTA1MDUwO1xuXHRcdC8qICNlbmRpZiAqL1xuXHR9XG5cdC5pbmRleFNlaXBlckl0ZW17XG5cdFx0d2lkdGg6IDY5MHJweDtcblx0XHRoZWlnaHQ6IDMwMHJweDtcblx0XHRib3JkZXItcmFkaXVzOiAxMHJweDtcblx0fVxuXHQuaW5kZXhTZWlwZXJCZ193aGl0ZXtcblx0XHR3aWR0aDogODAwcnB4O1xuXHRcdGhlaWdodDogMjAwcnB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDgwMHJweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IC05MHJweDtcblx0XHRsZWZ0Oi0yNXJweDtcblx0fVxuXHQvKiB65Li76I+c5Y2VICovXG5cdC5pbmRleE1lYXV7XG5cdFx0d2lkdGg6IDY5MHJweDtcblx0XHRtYXJnaW46IDUwcnB4IDMwcnB4IDA7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0XHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRcdGZsZXgtd3JhcDogd3JhcDtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cdH1cblx0LmluZGV4TWVhdUl0ZW17XG5cdFx0d2lkdGg6IDEyMHJweDtcblx0XHRoZWlnaHQ6IDEyNXJweDtcblx0XHRtYXJnaW4tYm90dG9tOiAzMHJweDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHR9XG5cdC5pbmRleE1lYXVJbWd7XG5cdFx0d2lkdGg6IDkwcnB4O1xuXHRcdGhlaWdodDogOTBycHg7XG5cdH1cblx0LmluZGV4TWVhdVRpdGxle1xuXHRcdGNvbG9yOiAjNjY2O1xuXHRcdG1hcmdpbi10b3A6IDEwcnB4O1xuXHRcdG1hcmdpbi1ib3R0b206IDEwcnB4O1xuXHRcdGZvbnQtc2l6ZTogMjRycHg7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHR9XG5cdFxuXHQvKiDnsr7pgInmjqjojZAgICovXG5cdC5pbmRleFRpdGxle1xuXHRcdGZsZXgtZGlyZWN0aW9uOnJvdztcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdG1hcmdpbi10b3A6IDMwcnB4O1xuXHRcdHBhZGRpbmctYm90dG9tOiAzMHJweDtcblx0fVxuXHQuaW5kZXhUaXRsZUljb257XG5cdFx0d2lkdGg6IDYwcnB4O1xuXHRcdGhlaWdodDogMjhycHg7XG5cdH1cblx0LmluZGV4VGl0bGVUeHR7XG5cdFx0cGFkZGluZzogMCAxNXJweDtcblx0XHRmb250LXNpemU6IDM2cnB4O1xuXHRcdGNvbG9yOiAjMzMzO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHR9XG5cdFxuXHRcblx0Lyog5ZWG5ZOB6K+m5oOFICovXG5cdFxuXHQueWotcmVsYXRpdmV7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR9XG5cdC5nb29kc2xpc3RiYXNlaW5mbyB7XG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRtYXJnaW4tdG9wOiAxNXJweDtcblx0fVxuXHRcblx0Lnl0LWluZGV4LWZsZXgge1xuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdH1cblx0LnlqLXF1YW57XG5cdFx0cG9zaXRpb246cmVsYXRpdmU7XG5cdFx0Ym9yZGVyLXJhZGl1czoxMHJweDtcblx0XHRoZWlnaHQ6IDQwcnB4O1xuXHRcdC8qIHdpZHRoOiA2MHJweDsgKi9cblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0cGFkZGluZzogMCAxNnJweDtcblx0XHRiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byByaWdodCwjRkY3NzhCLCNGRDRENjYpO1xuXHRcdFxuXHR9XG5cdC55ai1xdWFuLXR4dHtcblx0XHRjb2xvcjogI2ZmZjtcblx0XHRsaW5lLWhlaWdodDogNDBycHg7XG5cdFx0Zm9udC1zaXplOjIycnB4O1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0fVxuXHQueWotcXVhbi1iZWZvcmUsLnlqLXF1YW4tYWZ0ZXJ7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHdpZHRoOiAxNHJweDtcblx0XHRoZWlnaHQ6IDE0cnB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDE0cnB4O1xuXHRcdHotaW5kZXg6IDk5O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdFx0dG9wOiAxNHJweDtcblx0fVxuXHQueWotcXVhbi1iZWZvcmV7XG5cdFx0bGVmdDogLTdycHg7XG5cdH1cblx0LnlqLXF1YW4tYWZ0ZXIge1xuXHRcdHJpZ2h0OiAtN3JweDtcblx0fVxuXHQuemh1YW4ge1xuXHRcdHBhZGRpbmc6IDAgMTBycHg7XG5cdFx0aGVpZ2h0OiAzMnJweDtcblx0XHRsaW5lLWhlaWdodDogMzJycHg7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHJweDtcblx0XHRmb250LXNpemU6IDIycnB4O1xuXHRcdGNvbG9yOiAjRkQ0QzY2O1xuXHRcdGJvcmRlci13aWR0aDogMXJweDtcblx0XHRib3JkZXItY29sb3I6ICNGRDRDNjY7XG5cdH1cblx0Lmdvb2RzLWxpc3Qge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdFx0Ym9yZGVyLXJhZGl1czogMTBycHg7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRtYXJnaW4tdG9wOiAyMHJweDtcblx0fVxuXHRcblx0LnRpdGxlIHtcblx0XHRoZWlnaHQ6IDYwcnB4O1xuXHRcdGxpbmUtaGVpZ2h0OiAzMHJweDtcblx0XHRmb250LXNpemU6IDI2cnB4O1xuXHRcdGNvbG9yOiAjMzMzO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHR9XG5cdFxuXHQuZ29vZHN0aXRsZSB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR9XG5cdFxuXHQuZ29vZHNsYWl5dWFuIHtcblx0XHR3aWR0aDogMzBycHg7XG5cdFx0aGVpZ2h0OiAzMHJweDtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0bGVmdDogMDtcblx0XHR0b3A6IDA7XG5cdH1cblx0LmNvc3Qge1xuXHRcdGZvbnQtZmFtaWx5OiBQaW5nRmFuZy1TQy1SZWd1bGFyO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRcdGNvbG9yOiAjRkQ0QzY2O1xuXHRcdGZvbnQtd2VpZ2h0OiA5MDA7XG5cdFx0Zm9udC1zaXplOiAzNnJweDtcblx0fVxuXHQucmljZSB7XG5cdFx0Y29sb3I6ICM5OTk7XG5cdFx0Zm9udC1zaXplOiAyMHJweDtcblx0XHR0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcblx0fVxuXHQuc2FsZXMge1xuXHRcdGNvbG9yOiAjOTk5O1xuXHRcdGZvbnQtc2l6ZTogMjBycHg7XG5cdH1cblx0Lmdvb2RzLWluZm8ge1xuXHRcdHdpZHRoOiAzMzVycHg7XG5cdFx0cGFkZGluZzogMjBycHg7XG5cdH1cblx0Lmxhenkge1xuXHRcdHdpZHRoOiAzMzVycHg7XG5cdFx0aGVpZ2h0OiAzMzVycHg7XG5cdH1cblx0LmluZGV4Q2F0ZSB7XG5cdFx0d2lkdGg6IDc1MHJweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdFx0ZmxleC13cmFwOiB3cmFwO1xuXHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0XHRwYWRkaW5nOiAwIDMwcnB4O1xuXHR9XG5cdFxuXHRcblx0LmluZGV4Q2F0ZUl0ZW0ge1xuXHRcdHdpZHRoOiAxNTBycHg7XG5cdFx0cGFkZGluZzogMzBycHggMDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHR9XG5cdFxuXHQuaW5kZXhDYXRlSW1nIHtcblx0XHR3aWR0aDogMTEwcnB4O1xuXHRcdGhlaWdodDogMTEwcnB4O1xuXHR9XG5cdC5pbmRleENhdGVUaXRsZSB7XG5cdFx0Y29sb3I6ICM2NjY7XG5cdFx0bWFyZ2luLXRvcDogMTBycHg7XG5cdFx0bWFyZ2luLWJvdHRvbTogMTBycHg7XG5cdFx0Zm9udC1zaXplOiAyNHJweDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdH1cblx0XG5cdFxuXHRcbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///141\n");

/***/ }),

/***/ 142:
/*!*********************************************************************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?vue&type=style&index=0&lang=less&mpType=page ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_0_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_less_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-1!./node_modules/postcss-loader/src??ref--11-oneOf-0-2!./node_modules/less-loader/dist/cjs.js??ref--11-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./menu.nvue?vue&type=style&index=0&lang=less&mpType=page */ 143);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_0_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_less_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_0_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_less_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_0_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_less_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_0_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_less_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_0_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_less_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 143:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-1!./node_modules/postcss-loader/src??ref--11-oneOf-0-2!./node_modules/less-loader/dist/cjs.js??ref--11-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!F:/officeProject/xuchengwangluo/haokouling/pages/index/menu.nvue?vue&type=style&index=0&lang=less&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "yj-icon": {
    "width": "44upx",
    "height": "44upx"
  },
  "yj-icon-smlotter": {
    "width": "40upx",
    "height": "40upx"
  },
  "yj-bg-fff": {
    "backgroundColor": "#ffffff"
  },
  "yj-bg-main": {
    "backgroundColor": "#FD4C66",
    "color": "#ffffff"
  },
  "yj-bg-main-light": {
    "backgroundColor": "#FFEDEF",
    "color": "#FD4C66"
  },
  "yj-bg-color": {
    "backgroundColor": "#F6F6F6"
  },
  "yj-bg-gray-light": {
    "backgroundColor": "#F2F2F2"
  },
  "yj-bg-yellow-dark": {
    "backgroundColor": "#FDB84C",
    "color": "#ffffff"
  },
  "yj-text-center": {
    "textAlign": "center"
  },
  "yj-text-left": {
    "textAlign": "left"
  },
  "yj-text-right": {
    "textAlign": "right"
  },
  "yj-text-superbig": {
    "fontSize": "60upx"
  },
  "yj-text-super": {
    "fontSize": "46upx"
  },
  "yj-text-biger": {
    "fontSize": "40upx"
  },
  "yj-text-big": {
    "fontSize": "36upx"
  },
  "yj-text-biglotter": {
    "fontSize": "32upx"
  },
  "yj-text-usual": {
    "fontSize": "28upx"
  },
  "yj-text-sm": {
    "fontSize": "24upx"
  },
  "yj-text-min": {
    "fontSize": "22upx"
  },
  "yj-text-bold": {
    "fontWeight": "700"
  },
  "yj-color-main": {
    "color": "#FD4C66"
  },
  "yj-color-fff": {
    "color": "#ffffff"
  },
  "yj-color-red": {
    "color": "#fe5455"
  },
  "yj-color-gray": {
    "color": "#666666"
  },
  "yj-color-gray-light": {
    "color": "#999999"
  },
  "yj-color-gray-dark": {
    "color": "#333333"
  },
  "yj-mar": {
    "marginTop": "30upx",
    "marginRight": "30upx",
    "marginBottom": "30upx",
    "marginLeft": "30upx"
  },
  "yj-mar-min": {
    "marginTop": "10upx",
    "marginRight": "10upx",
    "marginBottom": "10upx",
    "marginLeft": "10upx"
  },
  "yj-mar-sm": {
    "marginTop": "20upx",
    "marginRight": "20upx",
    "marginBottom": "20upx",
    "marginLeft": "20upx"
  },
  "yj-mar-big": {
    "marginTop": "40upx",
    "marginRight": "40upx",
    "marginBottom": "40upx",
    "marginLeft": "40upx"
  },
  "yj-mar-biger": {
    "marginTop": "60upx",
    "marginRight": "60upx",
    "marginBottom": "60upx",
    "marginLeft": "60upx"
  },
  "yj-mar-super": {
    "marginTop": "100upx",
    "marginRight": "100upx",
    "marginBottom": "100upx",
    "marginLeft": "100upx"
  },
  "yj-mar-lr": {
    "marginLeft": "30upx",
    "marginRight": "30upx"
  },
  "yj-mar-lr-min": {
    "marginLeft": "10upx",
    "marginRight": "10upx"
  },
  "yj-mar-lr-sm": {
    "marginLeft": "20upx",
    "marginRight": "20upx"
  },
  "yj-mar-lr-big": {
    "marginLeft": "40upx",
    "marginRight": "40upx"
  },
  "yj-mar-lr-biger": {
    "marginLeft": "60upx",
    "marginRight": "60upx"
  },
  "yj-mar-lr-super": {
    "marginLeft": "100upx",
    "marginRight": "100upx"
  },
  "yj-mar-tb": {
    "marginTop": "30upx",
    "marginBottom": "30upx"
  },
  "yj-mar-tb-min": {
    "marginTop": "10upx",
    "marginBottom": "10upx"
  },
  "yj-mar-tb-sm": {
    "marginTop": "20upx",
    "marginBottom": "20upx"
  },
  "yj-mar-tb-big": {
    "marginTop": "40upx",
    "marginBottom": "40upx"
  },
  "yj-mar-tb-biger": {
    "marginTop": "60upx",
    "marginBottom": "60upx"
  },
  "yj-mar-tb-super": {
    "marginTop": "100upx",
    "marginBottom": "100upx"
  },
  "yj-mar-t": {
    "marginTop": "30upx"
  },
  "yj-mar-t-min": {
    "marginTop": "10upx"
  },
  "yj-mar-t-sm": {
    "marginTop": "20upx"
  },
  "yj-mar-t-big": {
    "marginTop": "40upx"
  },
  "yj-mar-t-biger": {
    "marginTop": "60upx"
  },
  "yj-mar-t-super": {
    "marginTop": "100upx"
  },
  "yj-mar-b": {
    "marginBottom": "30upx"
  },
  "yj-mar-b-min": {
    "marginBottom": "10upx"
  },
  "yj-mar-b-sm": {
    "marginBottom": "20upx"
  },
  "yj-mar-b-big": {
    "marginBottom": "40upx"
  },
  "yj-mar-b-biger": {
    "marginBottom": "60upx"
  },
  "yj-mar-b-super": {
    "marginBottom": "100upx"
  },
  "yj-mar-l": {
    "marginLeft": "30upx"
  },
  "yj-mar-l-min": {
    "marginLeft": "10upx"
  },
  "yj-mar-l-sm": {
    "marginLeft": "20upx"
  },
  "yj-mar-l-big": {
    "marginLeft": "40upx"
  },
  "yj-mar-l-biger": {
    "marginLeft": "60upx"
  },
  "yj-mar-l-super": {
    "marginLeft": "100upx"
  },
  "yj-mar-r": {
    "marginRight": "30upx"
  },
  "yj-mar-r-min": {
    "marginRight": "10upx"
  },
  "yj-mar-r-sm": {
    "marginRight": "20upx"
  },
  "yj-mar-r-big": {
    "marginRight": "40upx"
  },
  "yj-mar-r-biger": {
    "marginRight": "60upx"
  },
  "yj-mar-r-super": {
    "marginRight": "100upx"
  },
  "yj-pad": {
    "paddingTop": "30upx",
    "paddingRight": "30upx",
    "paddingBottom": "30upx",
    "paddingLeft": "30upx"
  },
  "yj-pad-min": {
    "paddingTop": "10upx",
    "paddingRight": "10upx",
    "paddingBottom": "10upx",
    "paddingLeft": "10upx"
  },
  "yj-pad-sm": {
    "paddingTop": "20upx",
    "paddingRight": "20upx",
    "paddingBottom": "20upx",
    "paddingLeft": "20upx"
  },
  "yj-pad-big": {
    "paddingTop": "40upx",
    "paddingRight": "40upx",
    "paddingBottom": "40upx",
    "paddingLeft": "40upx"
  },
  "yj-pad-biger": {
    "paddingTop": "60upx",
    "paddingRight": "60upx",
    "paddingBottom": "60upx",
    "paddingLeft": "60upx"
  },
  "yj-pad-super": {
    "paddingTop": "100upx",
    "paddingRight": "100upx",
    "paddingBottom": "100upx",
    "paddingLeft": "100upx"
  },
  "yj-pad-lr": {
    "paddingLeft": "30upx",
    "paddingRight": "30upx"
  },
  "yj-pad-lr-min": {
    "paddingLeft": "10upx",
    "paddingRight": "10upx"
  },
  "yj-pad-lr-sm": {
    "paddingLeft": "20upx",
    "paddingRight": "20upx"
  },
  "yj-pad-lr-big": {
    "paddingLeft": "40upx",
    "paddingRight": "40upx"
  },
  "yj-pad-lr-biger": {
    "paddingLeft": "60upx",
    "paddingRight": "60upx"
  },
  "yj-pad-lr-super": {
    "paddingLeft": "100upx",
    "paddingRight": "100upx"
  },
  "yj-pad-tb": {
    "paddingTop": "30upx",
    "paddingBottom": "30upx"
  },
  "yj-pad-tb-min": {
    "paddingTop": "10upx",
    "paddingBottom": "10upx"
  },
  "yj-pad-tb-sm": {
    "paddingTop": "20upx",
    "paddingBottom": "20upx"
  },
  "yj-pad-tb-big": {
    "paddingTop": "40upx",
    "paddingBottom": "40upx"
  },
  "yj-pad-tb-biger": {
    "paddingTop": "60upx",
    "paddingBottom": "60upx"
  },
  "yj-pad-tb-super": {
    "paddingTop": "100upx",
    "paddingBottom": "100upx"
  },
  "yj-pad-t": {
    "paddingTop": "30upx"
  },
  "yj-pad-t-min": {
    "paddingTop": "10upx"
  },
  "yj-pad-t-sm": {
    "paddingTop": "20upx"
  },
  "yj-pad-t-big": {
    "paddingTop": "40upx"
  },
  "yj-pad-t-biger": {
    "paddingTop": "60upx"
  },
  "yj-pad-t-super": {
    "paddingTop": "100upx"
  },
  "yj-pad-b": {
    "paddingBottom": "30upx"
  },
  "yj-pad-b-min": {
    "paddingBottom": "10upx"
  },
  "yj-pad-b-sm": {
    "paddingBottom": "20upx"
  },
  "yj-pad-b-big": {
    "paddingBottom": "40upx"
  },
  "yj-pad-b-biger": {
    "paddingBottom": "60upx"
  },
  "yj-pad-b-super": {
    "paddingBottom": "100upx"
  },
  "yj-pad-l": {
    "paddingLeft": "30upx"
  },
  "yj-pad-l-min": {
    "paddingLeft": "10upx"
  },
  "yj-pad-l-sm": {
    "paddingLeft": "20upx"
  },
  "yj-pad-l-big": {
    "paddingLeft": "40upx"
  },
  "yj-pad-l-biger": {
    "paddingLeft": "60upx"
  },
  "yj-pad-l-super": {
    "paddingLeft": "100upx"
  },
  "yj-pad-r": {
    "paddingRight": "30upx"
  },
  "yj-pad-r-min": {
    "paddingRight": "10upx"
  },
  "yj-pad-r-sm": {
    "paddingRight": "20upx"
  },
  "yj-pad-r-big": {
    "paddingRight": "40upx"
  },
  "yj-pad-r-biger": {
    "paddingRight": "60upx"
  },
  "yj-pad-r-super": {
    "paddingRight": "100upx"
  },
  "yj-pad-header": {
    "paddingTop": "128upx"
  },
  "yj-fixed-top": {
    "position": "fixed",
    "width": 100,
    "left": 0,
    "top": 0,
    "paddingTop": "60upx",
    "zIndex": 9
  },
  "yj-radius": {
    "borderRadius": "20upx"
  },
  "yj-radius-sm": {
    "borderRadius": "10upx"
  },
  "yj-circle": {
    "borderRadius": 50
  },
  "yj-del": {
    "textDecoration": "line-through"
  },
  "yj-relative": {
    "position": "relative"
  },
  "yj-absolute": {
    "position": "absolute"
  },
  "search": {
    "paddingTop": "70rpx",
    "paddingRight": "30rpx",
    "paddingBottom": "10rpx",
    "paddingLeft": "30rpx",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "searchDiv": {
    "flex": 1,
    "flexDirection": "row",
    "borderRadius": "40rpx",
    "backgroundColor": "#ffffff",
    "height": "60rpx",
    "alignItems": "center"
  },
  "search-images": {
    "width": "38rpx",
    "height": "33rpx",
    "marginLeft": "26rpx"
  },
  "headoper": {
    "width": "50rpx",
    "height": "50rpx",
    "marginLeft": "30rpx"
  },
  "textView": {
    "fontSize": "25rpx",
    "paddingLeft": "10rpx",
    "color": "#999999"
  },
  "tabs": {
    "flex": 1,
    "flexDirection": "column",
    "overflow": "hidden",
    "backgroundColor": "#ffffff"
  },
  "headerBar": {
    "width": "750upx",
    "height": "80upx",
    "color": "#ffffff",
    "flexDirection": "row"
  },
  "uni-tab-item": {
    "flexWrap": "nowrap",
    "width": "120rpx",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "uni-tab-item-title": {
    "height": "60rpx",
    "lineHeight": "70rpx",
    "fontSize": "28rpx",
    "color": "#666666"
  },
  "uni-tab-item-title-active": {
    "color": "#333333",
    "fontSize": "32rpx",
    "fontWeight": "bold"
  },
  "tabimg": {
    "width": "53rpx",
    "height": "9rpx"
  },
  "swiper-box": {
    "flex": 1
  },
  "swiper-item": {
    "flex": 1
  },
  "scroll-v": {
    "flex": 1,
    "flexDirection": "column",
    "width": "750upx"
  },
  "refresh": {
    "width": "750upx",
    "height": "64",
    "justifyContent": "center"
  },
  "refresh-view": {
    "flexDirection": "row",
    "flexWrap": "nowrap",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "refresh-icon": {
    "width": "32",
    "height": "32",
    "transitionDuration": 500,
    "transitionProperty": "transform",
    "transform": "rotate(0deg)",
    "transformOrigin": "16px 16px"
  },
  "@TRANSITION": {
    "refresh-icon": {
      "duration": 500,
      "property": "transform"
    }
  },
  "refresh-icon-active": {
    "transform": "rotate(180deg)"
  },
  "loading-icon": {
    "width": "20",
    "height": "20",
    "marginRight": "5"
  },
  "loading-icon-active": {
    "transform": "rotate(21600deg)"
  },
  "loading-text": {
    "marginLeft": "5rpx",
    "fontSize": "32rpx",
    "color": "#999999"
  },
  "loading-more": {
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "10",
    "paddingBottom": "10",
    "textAlign": "center"
  },
  "loading-more-text": {
    "fontSize": "28upx",
    "color": "#999999"
  },
  "indexSeiperBg": {
    "position": "relative"
  },
  "indexSeiper": {
    "width": "690rpx",
    "marginTop": 0,
    "marginRight": "30rpx",
    "marginBottom": 0,
    "marginLeft": "30rpx",
    "height": "300rpx",
    "borderRadius": "10rpx",
    "position": "relative"
  },
  "indexSeiperItem": {
    "width": "690rpx",
    "height": "300rpx",
    "borderRadius": "10rpx"
  },
  "indexSeiperBg_white": {
    "width": "800rpx",
    "height": "200rpx",
    "borderRadius": "800rpx",
    "backgroundColor": "#ffffff",
    "position": "absolute",
    "bottom": "-90rpx",
    "left": "-25rpx"
  },
  "indexMeau": {
    "width": "690rpx",
    "marginTop": "50rpx",
    "marginRight": "30rpx",
    "marginBottom": 0,
    "marginLeft": "30rpx",
    "backgroundColor": "#ffffff",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "justifyContent": "space-between"
  },
  "indexMeauItem": {
    "width": "120rpx",
    "height": "125rpx",
    "marginBottom": "30rpx",
    "alignItems": "center"
  },
  "indexMeauImg": {
    "width": "90rpx",
    "height": "90rpx"
  },
  "indexMeauTitle": {
    "color": "#666666",
    "marginTop": "10rpx",
    "marginBottom": "10rpx",
    "fontSize": "24rpx",
    "textAlign": "center"
  },
  "indexTitle": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "marginTop": "30rpx",
    "paddingBottom": "30rpx"
  },
  "indexTitleIcon": {
    "width": "60rpx",
    "height": "28rpx"
  },
  "indexTitleTxt": {
    "paddingTop": 0,
    "paddingRight": "15rpx",
    "paddingBottom": 0,
    "paddingLeft": "15rpx",
    "fontSize": "36rpx",
    "color": "#333333",
    "fontWeight": "bold"
  },
  "goodslistbaseinfo": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginTop": "15rpx"
  },
  "yt-index-flex": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "yj-quan": {
    "position": "relative",
    "borderRadius": "10rpx",
    "height": "40rpx",
    "textAlign": "center",
    "paddingTop": 0,
    "paddingRight": "16rpx",
    "paddingBottom": 0,
    "paddingLeft": "16rpx",
    "backgroundImage": "linear-gradient(to right, #FF778B, #FD4D66)"
  },
  "yj-quan-txt": {
    "color": "#ffffff",
    "lineHeight": "40rpx",
    "fontSize": "22rpx",
    "position": "relative"
  },
  "yj-quan-before": {
    "position": "absolute",
    "width": "14rpx",
    "height": "14rpx",
    "borderRadius": "14rpx",
    "zIndex": 99,
    "backgroundColor": "#ffffff",
    "top": "14rpx",
    "left": "-7rpx"
  },
  "yj-quan-after": {
    "position": "absolute",
    "width": "14rpx",
    "height": "14rpx",
    "borderRadius": "14rpx",
    "zIndex": 99,
    "backgroundColor": "#ffffff",
    "top": "14rpx",
    "right": "-7rpx"
  },
  "zhuan": {
    "paddingTop": 0,
    "paddingRight": "10rpx",
    "paddingBottom": 0,
    "paddingLeft": "10rpx",
    "height": "32rpx",
    "lineHeight": "32rpx",
    "borderRadius": "4rpx",
    "fontSize": "22rpx",
    "color": "#FD4C66",
    "borderWidth": "1rpx",
    "borderColor": "#FD4C66"
  },
  "goods-list": {
    "backgroundColor": "#ffffff",
    "borderRadius": "10rpx",
    "overflow": "hidden",
    "marginTop": "20rpx"
  },
  "title": {
    "height": "60rpx",
    "lineHeight": "30rpx",
    "fontSize": "26rpx",
    "color": "#333333",
    "fontWeight": "bold"
  },
  "goodstitle": {
    "position": "relative"
  },
  "goodslaiyuan": {
    "width": "30rpx",
    "height": "30rpx",
    "position": "absolute",
    "left": 0,
    "top": 0
  },
  "cost": {
    "fontFamily": "PingFang-SC-Regular",
    "fontWeight": "900",
    "color": "#FD4C66",
    "fontSize": "36rpx"
  },
  "rice": {
    "color": "#999999",
    "fontSize": "20rpx",
    "textDecoration": "line-through"
  },
  "sales": {
    "color": "#999999",
    "fontSize": "20rpx"
  },
  "goods-info": {
    "width": "335rpx",
    "paddingTop": "20rpx",
    "paddingRight": "20rpx",
    "paddingBottom": "20rpx",
    "paddingLeft": "20rpx"
  },
  "lazy": {
    "width": "335rpx",
    "height": "335rpx"
  },
  "indexCate": {
    "width": "750rpx",
    "backgroundColor": "#ffffff",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "justifyContent": "space-between",
    "paddingTop": 0,
    "paddingRight": "30rpx",
    "paddingBottom": 0,
    "paddingLeft": "30rpx"
  },
  "indexCateItem": {
    "width": "150rpx",
    "paddingTop": "30rpx",
    "paddingRight": 0,
    "paddingBottom": "30rpx",
    "paddingLeft": 0,
    "alignItems": "center"
  },
  "indexCateImg": {
    "width": "110rpx",
    "height": "110rpx"
  },
  "indexCateTitle": {
    "color": "#666666",
    "marginTop": "10rpx",
    "marginBottom": "10rpx",
    "fontSize": "24rpx",
    "textAlign": "center"
  }
}

/***/ }),

/***/ 15:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 16);

/***/ }),

/***/ 16:
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true });

    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
  NativeIteratorPrototype !== Op &&
  hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
  Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
  GeneratorFunctionPrototype,
  toStringTagSymbol,
  "GeneratorFunction");


  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ?
    ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" :
    false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
        typeof value === "object" &&
        hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(
      callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) :
      callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
    wrap(innerFn, outerFn, self, tryLocsList),
    PromiseImpl);


    return exports.isGeneratorFunction(outerFn) ?
    iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ?
          GenStateCompleted :
          GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done };


        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
        "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
          hasOwn.call(this, name) &&
          !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
        hasOwn.call(entry, "finallyLoc") &&
        this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (
      type === "break" ||
      type === "continue") &&
      finallyEntry.tryLoc <= arg &&
      arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
      record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc };


      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    } };


  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);


try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ 17:
/*!*****************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/store/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 18));\nvar _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 19));\nvar _storage = _interopRequireDefault(__webpack_require__(/*! @/common/storage */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n_vue.default.use(_vuex.default);\n\nvar store = new _vuex.default.Store({\n  state: {\n    isLogin: false,\n    token: _storage.default.get(\"token\") || '',\n    version: _storage.default.get(\"version\") || '',\n    systemInfo: _storage.default.get(\"systemInfo\") || '',\n    imei: _storage.default.get(\"imei\") || '',\n    userInfo: _storage.default.get(\"userInfo\") || '',\n    jxConfig: _storage.default.get(\"jxConfig\") || '',\n    jxUserInfo: _storage.default.get(\"jxUserInfo\") || '',\n    userBindTaobaoInfo: _storage.default.get(\"userBindTaobaoInfo\") || '',\n    userBindWeixinInfo: _storage.default.get(\"userBindWeixinInfo\") || '',\n    pushInfo: _storage.default.get(\"pushInfo\") || '',\n    sosoGoodsUrl: _storage.default.get(\"sosoGoodsUrl\") || '',\n    weixinOpenId: '',\n    goodsData: '',\n    userLoginInfo: {\n      id: false, //用户ID\n      mobile: false, // 用户手机\n      avatar: false, // 用户头像\n      nickName: false, //用户昵称\n      inviterCode: false, //用户邀请码\n      isBindWeixin: false, //绑定微信\n      isBindTaobao: false, //绑定淘宝\n      isBindBank: false, //绑定银行卡\n      inviter: false //邀请人\n    },\n    isBindSystem: {\n      userSystemInfo: false, //客户端设备信息\n      uniPush: false, //是否开启推送\n      isImei: false // 默认imei需要授权\n    } },\n\n\n  mutations: {\n    systemInfo: function systemInfo(state, opotions) {//更新客户端设备信息\n      state.isBindSystem.userSystemInfo = true;\n      state.systemInfo = opotions;\n      _storage.default.set('systemInfo', opotions);\n    },\n    jxConfig: function jxConfig(state, data) {\n      var thisConfig = _storage.default.get(\"jxConfig\");\n      data.config = data.config.constantVersion ? data.config : thisConfig.config;\n      data.iconList = data.iconList.iconListVersion ? data.iconList : thisConfig.iconList;\n      data.bannerList = data.bannerList.bannerListVersion ? data.bannerList : thisConfig.bannerList;\n      state.jxConfig = data;\n      _storage.default.set('jxConfig', data);\n    },\n    weixinOpenId: function weixinOpenId(state, data) {\n      state.weixinOpenId = data;\n    },\n    sosoGoodsUrl: function sosoGoodsUrl(state, data) {\n      state.sosoGoodsUrl = data;\n      _storage.default.set('sosoGoodsUrl', data);\n    },\n    goodsData: function goodsData(state, data) {\n      state.goodsData = data;\n    },\n    imeiInfo: function imeiInfo(state, data) {\n      state.isBindSystem.isImei = true;\n      state.imei = data;\n      _storage.default.set('imei', data);\n    },\n    pushInfo: function pushInfo(state, data) {\n      state.pushInfo = data;\n      _storage.default.set('pushInfo', data);\n    },\n    jxUserInfo: function jxUserInfo(state, opostion) {\n      state.jxUserInfo = opostion;\n      _storage.default.set('jxUserInfo', opostion);\n    },\n    versionInfo: function versionInfo(state, data) {\n      state.version = data;\n      _storage.default.set('version', data);\n    },\n    token: function token(state, data) {//更新token\n      state.token = data;\n      _storage.default.set('token', data);\n      __f__(\"log\", JSON.stringify(state.token), \" at store/index.js:85\");\n    },\n    userBindTaobaoInfo: function userBindTaobaoInfo(state, data) {\n      state.isBindTaobao = data;\n      state.userLoginInfo.isBindTaobao = true;\n      _storage.default.set('userBindTaobaoInfo', data);\n    },\n    login: function login(state, opotions) {\n      state.isLogin = true;\n      state.userInfo = opotions;\n      _storage.default.set('userInfo', opotions);\n      __f__(\"log\", JSON.stringify(state.userInfo), \" at store/index.js:96\");\n    },\n    logout: function logout(state) {\n      state.isLogin = false;\n      state.token = '';\n      _storage.default.remove('token');\n    } },\n\n  actions: {} });var _default =\n\n\n\n\nstore;exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 7)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vc3RvcmUvaW5kZXguanMiXSwibmFtZXMiOlsiVnVlIiwidXNlIiwiVnVleCIsInN0b3JlIiwiU3RvcmUiLCJzdGF0ZSIsImlzTG9naW4iLCJ0b2tlbiIsInN0b3JhZ2UiLCJnZXQiLCJ2ZXJzaW9uIiwic3lzdGVtSW5mbyIsImltZWkiLCJ1c2VySW5mbyIsImp4Q29uZmlnIiwianhVc2VySW5mbyIsInVzZXJCaW5kVGFvYmFvSW5mbyIsInVzZXJCaW5kV2VpeGluSW5mbyIsInB1c2hJbmZvIiwic29zb0dvb2RzVXJsIiwid2VpeGluT3BlbklkIiwiZ29vZHNEYXRhIiwidXNlckxvZ2luSW5mbyIsImlkIiwibW9iaWxlIiwiYXZhdGFyIiwibmlja05hbWUiLCJpbnZpdGVyQ29kZSIsImlzQmluZFdlaXhpbiIsImlzQmluZFRhb2JhbyIsImlzQmluZEJhbmsiLCJpbnZpdGVyIiwiaXNCaW5kU3lzdGVtIiwidXNlclN5c3RlbUluZm8iLCJ1bmlQdXNoIiwiaXNJbWVpIiwibXV0YXRpb25zIiwib3BvdGlvbnMiLCJzZXQiLCJkYXRhIiwidGhpc0NvbmZpZyIsImNvbmZpZyIsImNvbnN0YW50VmVyc2lvbiIsImljb25MaXN0IiwiaWNvbkxpc3RWZXJzaW9uIiwiYmFubmVyTGlzdCIsImJhbm5lckxpc3RWZXJzaW9uIiwiaW1laUluZm8iLCJvcG9zdGlvbiIsInZlcnNpb25JbmZvIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvZ2luIiwibG9nb3V0IiwicmVtb3ZlIiwiYWN0aW9ucyJdLCJtYXBwaW5ncyI6Im9JQUFBO0FBQ0E7QUFDQSxzRjs7QUFFQUEsYUFBSUMsR0FBSixDQUFRQyxhQUFSOztBQUVBLElBQU1DLEtBQUssR0FBRyxJQUFJRCxjQUFLRSxLQUFULENBQWU7QUFDNUJDLE9BQUssRUFBRTtBQUNOQyxXQUFPLEVBQUUsS0FESDtBQUVOQyxTQUFLLEVBQUNDLGlCQUFRQyxHQUFSLENBQVksT0FBWixLQUF3QixFQUZ4QjtBQUdOQyxXQUFP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QXFCQyxJQUFyQjtBQUNBLG1CQUFZVyxJQUFJLENBQUNDLFNBQUwsQ0FBZTlDLEtBQUssQ0FBQ0UsS0FBckIsQ0FBWjtBQUNBLEtBN0NTO0FBOENWUyxzQkE5Q1UsOEJBOENTWCxLQTlDVCxFQThDZWtDLElBOUNmLEVBOENvQjtBQUM3QmxDLFdBQUssQ0FBQ3dCLFlBQU4sR0FBcUJVLElBQXJCO0FBQ0FsQyxXQUFLLENBQUNpQixhQUFOLENBQW9CTyxZQUFwQixHQUFtQyxJQUFuQztBQUNBckIsdUJBQVE4QixHQUFSLENBQVksb0JBQVosRUFBa0NDLElBQWxDO0FBQ0EsS0FsRFM7QUFtRFZhLFNBbkRVLGlCQW1ESi9DLEtBbkRJLEVBbURHZ0MsUUFuREgsRUFtRGE7QUFDdEJoQyxXQUFLLENBQUNDLE9BQU4sR0FBZ0IsSUFBaEI7QUFDQUQsV0FBSyxDQUFDUSxRQUFOLEdBQWlCd0IsUUFBakI7QUFDQTdCLHVCQUFROEIsR0FBUixDQUFZLFVBQVosRUFBdUJELFFBQXZCO0FBQ0EsbUJBQVlhLElBQUksQ0FBQ0MsU0FBTCxDQUFlOUMsS0FBSyxDQUFDUSxRQUFyQixDQUFaO0FBQ0EsS0F4RFM7QUF5RFZ3QyxVQXpEVSxrQkF5REhoRCxLQXpERyxFQXlESTtBQUNiQSxXQUFLLENBQUNDLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQUQsV0FBSyxDQUFDRSxLQUFOLEdBQWMsRUFBZDtBQUNBQyx1QkFBUThDLE1BQVIsQ0FBZSxPQUFmO0FBQ0EsS0E3RFMsRUFsQ2lCOztBQWlHNUJDLFNBQU8sRUFBRSxFQWpHbUIsRUFBZixDQUFkLEM7Ozs7O0FBc0dlcEQsSyIsImZpbGUiOiIxNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xyXG5pbXBvcnQgVnVleCBmcm9tICd2dWV4J1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiQC9jb21tb24vc3RvcmFnZVwiXHJcblxyXG5WdWUudXNlKFZ1ZXgpXHJcblxyXG5jb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHtcclxuXHRzdGF0ZToge1xyXG5cdFx0aXNMb2dpbjogZmFsc2UsXHJcblx0XHR0b2tlbjpzdG9yYWdlLmdldChcInRva2VuXCIpIHx8ICcnLFxyXG5cdFx0dmVyc2lvbjogc3RvcmFnZS5nZXQoXCJ2ZXJzaW9uXCIpIHx8ICcnLFxyXG5cdFx0c3lzdGVtSW5mbzpzdG9yYWdlLmdldChcInN5c3RlbUluZm9cIikgfHwgJycsXHJcblx0XHRpbWVpOnN0b3JhZ2UuZ2V0KFwiaW1laVwiKSB8fCAnJyxcclxuXHRcdHVzZXJJbmZvOnN0b3JhZ2UuZ2V0KFwidXNlckluZm9cIikgfHwgJycsXHJcblx0XHRqeENvbmZpZzpzdG9yYWdlLmdldChcImp4Q29uZmlnXCIpIHx8ICcnLFxyXG5cdFx0anhVc2VySW5mbzpzdG9yYWdlLmdldChcImp4VXNlckluZm9cIikgfHwgJycsXHJcblx0XHR1c2VyQmluZFRhb2Jhb0luZm86c3RvcmFnZS5nZXQoXCJ1c2VyQmluZFRhb2Jhb0luZm9cIikgfHwgJycsXHJcblx0XHR1c2VyQmluZFdlaXhpbkluZm86c3RvcmFnZS5nZXQoXCJ1c2VyQmluZFdlaXhpbkluZm9cIikgfHwgJycsXHJcblx0XHRwdXNoSW5mbzpzdG9yYWdlLmdldChcInB1c2hJbmZvXCIpIHx8ICcnLFxyXG5cdFx0c29zb0dvb2RzVXJsOnN0b3JhZ2UuZ2V0KFwic29zb0dvb2RzVXJsXCIpIHx8ICcnLFxyXG5cdFx0d2VpeGluT3BlbklkOicnLFxyXG5cdFx0Z29vZHNEYXRhOicnLFxyXG5cdFx0dXNlckxvZ2luSW5mbzoge1xyXG5cdFx0XHRpZDpmYWxzZSwgIC8v55So5oi3SURcclxuXHRcdFx0bW9iaWxlOmZhbHNlLCAvLyDnlKjmiLfmiYvmnLpcclxuXHRcdFx0YXZhdGFyOmZhbHNlLCAvLyDnlKjmiLflpLTlg49cclxuXHRcdFx0bmlja05hbWU6ZmFsc2UsIC8v55So5oi35pi156ewXHJcblx0XHRcdGludml0ZXJDb2RlOmZhbHNlLCAvL+eUqOaIt+mCgOivt+eggVxyXG5cdFx0XHRpc0JpbmRXZWl4aW46ZmFsc2UsIC8v57uR5a6a5b6u5L+hXHJcblx0XHRcdGlzQmluZFRhb2JhbzpmYWxzZSwgLy/nu5Hlrprmt5jlrp1cclxuXHRcdFx0aXNCaW5kQmFuazpmYWxzZSwgLy/nu5Hlrprpk7booYzljaFcclxuXHRcdFx0aW52aXRlcjpmYWxzZSwvL+mCgOivt+S6ulxyXG5cdFx0fSxcclxuXHRcdGlzQmluZFN5c3RlbTp7XHJcblx0XHRcdHVzZXJTeXN0ZW1JbmZvOmZhbHNlLCAvL+WuouaIt+err+iuvuWkh+S/oeaBr1xyXG5cdFx0XHR1bmlQdXNoOmZhbHNlLCAvL+aYr+WQpuW8gOWQr+aOqOmAgVxyXG5cdFx0XHRpc0ltZWk6ZmFsc2UsLy8g6buY6K6kaW1laemcgOimgeaOiOadg1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdH0sXHJcblx0bXV0YXRpb25zOiB7XHJcblx0XHRzeXN0ZW1JbmZvKHN0YXRlLG9wb3Rpb25zKXsgLy/mm7TmlrDlrqLmiLfnq6/orr7lpIfkv6Hmga9cclxuXHRcdFx0c3RhdGUuaXNCaW5kU3lzdGVtLnVzZXJTeXN0ZW1JbmZvID0gdHJ1ZTtcclxuXHRcdFx0c3RhdGUuc3lzdGVtSW5mbyA9IG9wb3Rpb25zIDtcclxuXHRcdFx0c3RvcmFnZS5zZXQoJ3N5c3RlbUluZm8nLG9wb3Rpb25zKVxyXG5cdFx0fSxcclxuXHRcdGp4Q29uZmlnKHN0YXRlLGRhdGEpe1xyXG5cdFx0XHRsZXQgdGhpc0NvbmZpZyA9IHN0b3JhZ2UuZ2V0KFwianhDb25maWdcIik7XHJcblx0XHRcdGRhdGEuY29uZmlnID0gZGF0YS5jb25maWcuY29uc3RhbnRWZXJzaW9uID8gZGF0YS5jb25maWcgOiB0aGlzQ29uZmlnLmNvbmZpZztcclxuXHRcdFx0ZGF0YS5pY29uTGlzdCA9IGRhdGEuaWNvbkxpc3QuaWNvbkxpc3RWZXJzaW9uID8gZGF0YS5pY29uTGlzdCA6IHRoaXNDb25maWcuaWNvbkxpc3Q7XHJcblx0XHRcdGRhdGEuYmFubmVyTGlzdCA9IGRhdGEuYmFubmVyTGlzdC5iYW5uZXJMaXN0VmVyc2lvbiA/IGRhdGEuYmFubmVyTGlzdCA6IHRoaXNDb25maWcuYmFubmVyTGlzdDtcclxuXHRcdFx0c3RhdGUuanhDb25maWcgPSBkYXRhO1xyXG5cdFx0XHRzdG9yYWdlLnNldCgnanhDb25maWcnLGRhdGEpXHJcblx0XHR9LFxyXG5cdFx0d2VpeGluT3BlbklkKHN0YXRlLGRhdGEpe1xyXG5cdFx0XHRzdGF0ZS53ZWl4aW5PcGVuSWQgPSBkYXRhO1xyXG5cdFx0fSxcclxuXHRcdHNvc29Hb29kc1VybChzdGF0ZSxkYXRhKXtcclxuXHRcdFx0c3RhdGUuc29zb0dvb2RzVXJsID0gZGF0YTtcclxuXHRcdFx0c3RvcmFnZS5zZXQoJ3Nvc29Hb29kc1VybCcsIGRhdGEpXHJcblx0XHR9LFxyXG5cdFx0Z29vZHNEYXRhKHN0YXRlLGRhdGEpe1xyXG5cdFx0XHRzdGF0ZS5nb29kc0RhdGEgPSBkYXRhO1xyXG5cdFx0fSxcclxuXHRcdGltZWlJbmZvKHN0YXRlLGRhdGEpe1xyXG5cdFx0XHRzdGF0ZS5pc0JpbmRTeXN0ZW0uaXNJbWVpID0gdHJ1ZTtcclxuXHRcdFx0c3RhdGUuaW1laSA9IGRhdGE7XHJcblx0XHRcdHN0b3JhZ2Uuc2V0KCdpbWVpJywgZGF0YSlcclxuXHRcdH0sXHJcblx0XHRwdXNoSW5mbyhzdGF0ZSxkYXRhKXtcclxuXHRcdFx0c3RhdGUucHVzaEluZm8gPSBkYXRhO1xyXG5cdFx0XHRzdG9yYWdlLnNldCgncHVzaEluZm8nLCBkYXRhKVxyXG5cdFx0fSxcclxuXHRcdGp4VXNlckluZm8oc3RhdGUsb3Bvc3Rpb24pe1xyXG5cdFx0XHRzdGF0ZS5qeFVzZXJJbmZvID0gb3Bvc3Rpb25cclxuXHRcdFx0c3RvcmFnZS5zZXQoJ2p4VXNlckluZm8nLCBvcG9zdGlvbilcclxuXHRcdH0sXHJcblx0XHR2ZXJzaW9uSW5mbyhzdGF0ZSxkYXRhKXtcclxuXHRcdFx0c3RhdGUudmVyc2lvbiA9IGRhdGE7XHJcblx0XHRcdHN0b3JhZ2Uuc2V0KCd2ZXJzaW9uJyxkYXRhKVxyXG5cdFx0fSxcclxuXHRcdHRva2VuKHN0YXRlLGRhdGEpeyAvL+abtOaWsHRva2VuXHJcblx0XHRcdHN0YXRlLnRva2VuID0gZGF0YTtcclxuXHRcdFx0c3RvcmFnZS5zZXQoJ3Rva2VuJywgZGF0YSlcclxuXHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc3RhdGUudG9rZW4pKTtcclxuXHRcdH0sXHJcblx0XHR1c2VyQmluZFRhb2Jhb0luZm8oc3RhdGUsZGF0YSl7XHJcblx0XHRcdHN0YXRlLmlzQmluZFRhb2JhbyA9IGRhdGE7XHJcblx0XHRcdHN0YXRlLnVzZXJMb2dpbkluZm8uaXNCaW5kVGFvYmFvID0gdHJ1ZTtcclxuXHRcdFx0c3RvcmFnZS5zZXQoJ3VzZXJCaW5kVGFvYmFvSW5mbycsIGRhdGEpXHJcblx0XHR9LFxyXG5cdFx0bG9naW4oc3RhdGUsIG9wb3Rpb25zKSB7XHJcblx0XHRcdHN0YXRlLmlzTG9naW4gPSB0cnVlO1xyXG5cdFx0XHRzdGF0ZS51c2VySW5mbyA9IG9wb3Rpb25zO1xyXG5cdFx0XHRzdG9yYWdlLnNldCgndXNlckluZm8nLG9wb3Rpb25zKVxyXG5cdFx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdGF0ZS51c2VySW5mbykpO1xyXG5cdFx0fSxcclxuXHRcdGxvZ291dChzdGF0ZSkge1xyXG5cdFx0XHRzdGF0ZS5pc0xvZ2luID0gZmFsc2U7XHJcblx0XHRcdHN0YXRlLnRva2VuID0gJyc7XHJcblx0XHRcdHN0b3JhZ2UucmVtb3ZlKCd0b2tlbicpXHJcblx0XHR9XHJcblx0fSxcclxuXHRhY3Rpb25zOiB7XHJcblx0XHJcblx0fVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///17\n");

/***/ }),

/***/ 18:
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 19:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.install = install;exports.mapState = exports.mapMutations = exports.mapGetters = exports.mapActions = exports.createNamespacedHelpers = exports.Store = exports.default = void 0; /*!
                                                                                                                                                                                                                                                                      * vuex v3.4.0
                                                                                                                                                                                                                                                                      * (c) 2020 Evan You
                                                                                                                                                                                                                                                                      * @license MIT
                                                                                                                                                                                                                                                                      */
function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};

      options.init = options.init ?
      [vuexInit].concat(options.init) :
      vuexInit;
      _init.call(this, options);
    };
  }

  /**
     * Vuex init hook, injected into each instances init hooks list.
     */

  function vuexInit() {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function' ?
      options.store() :
      options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined' ?
window :
typeof global !== 'undefined' ?
global :
{};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {return;}

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
   * Get the first item that pass the test
   * by second argument function
   *
   * @param {Array} list
   * @param {Function} f
   * @return {*}
   */

/**
       * forEach for object
       */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {return fn(obj[key], key);});
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {throw new Error("[vuex] " + msg);}
}

function partial(fn, arg) {
  return function () {
    return fn(arg);
  };
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module(rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) {return;}

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key);
};

function update(path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed');

        }
        return;
      }
      update(
      path.concat(key),
      targetModule.getChild(key),
      newModule.modules[key]);

    }
  }
}

var functionAssert = {
  assert: function assert(value) {return typeof value === 'function';},
  expected: 'function' };


var objectAssert = {
  assert: function assert(value) {return typeof value === 'function' ||
    typeof value === 'object' && typeof value.handler === 'function';},
  expected: 'function or object with "handler" function' };


var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert };


function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) {return;}

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
      assertOptions.assert(value),
      makeAssertionMessage(path, key, type, value, assertOptions.expected));

    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + path.join('.') + "\"";
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins;if (plugins === void 0) plugins = [];
  var strict = options.strict;if (strict === void 0) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) {return plugin(this$1);});

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};exports.Store = Store;

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors$1.state.set = function (v) {
  if (true) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });

  this._subscribers.
  slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
  .forEach(function (sub) {return sub(mutation, this$1.state);});

  if (
   true &&
  options && options.silent)
  {
    console.warn(
    "[vuex] mutation type: " + type + ". Silent option has been removed. " +
    'Use the filter functionality in the vue-devtools');

  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }

  try {
    this._actionSubscribers.
    slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .filter(function (sub) {return sub.before;}).
    forEach(function (sub) {return sub.before(action, this$1.state);});
  } catch (e) {
    if (true) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1 ?
  Promise.all(entry.map(function (handler) {return handler(payload);})) :
  entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers.
        filter(function (sub) {return sub.after;}).
        forEach(function (sub) {return sub.after(action, this$1.state);});
      } catch (e) {
        if (true) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers.
        filter(function (sub) {return sub.error;}).
        forEach(function (sub) {return sub.error(action, this$1.state, error);});
      } catch (e) {
        if (true) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  });
};

Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};

Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () {return getter(this$1.state, this$1.getters);}, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};

  if (typeof path === 'string') {path = [path];}

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {path = [path];}

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === 'string') {path = [path];}

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors$1);

function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ?
    subs.unshift(fn) :
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function get() {return store._vm[key];},
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state },

    computed: computed });

  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () {return oldVm.$destroy();});
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join('/'));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if (true) {
        if (moduleName in parentState) {
          console.warn(
          "[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + path.join('.') + "\"");

        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
   * make localized dispatch, commit, getters and state
   * if there is no namespace, just use root ones
   */
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    } };


  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ?
      function () {return store.getters;} :
      function () {return makeLocalGetters(store, namespace);} },

    state: {
      get: function get() {return getNestedState(store.state, path);} } });



  return local;
}

function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) {return;}

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function get() {return store.getters[type];},
        enumerable: true });

    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace];
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state },
    payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(
    local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {return this._data.$$state;}, function () {
    if (true) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState(state, path) {
  return path.reduce(function (state, key) {return state[key];}, state);
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', "expects string as the type, but found " + typeof type + ".");
  }

  return { type: type, payload: payload, options: options };
}

function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.');

    }
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
   * Reduce the code which written in Vue.js for getting the state.
   * @param {String} [namespace] - Module's namespace
   * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
   * @param {Object}
   */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if ( true && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function' ?
      val.call(this, state, getters) :
      state[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

/**
     * Reduce the code which written in Vue.js for committing the mutation
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
     * @return {Object}
     */exports.mapState = mapState;
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if ( true && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation() {
      var args = [],len = arguments.length;
      while (len--) {args[len] = arguments[len];}

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return;
        }
        commit = module.context.commit;
      }
      return typeof val === 'function' ?
      val.apply(this, [commit].concat(args)) :
      commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

/**
     * Reduce the code which written in Vue.js for getting the getters
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} getters
     * @return {Object}
     */exports.mapMutations = mapMutations;
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if ( true && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }
      if ( true && !(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

/**
     * Reduce the code which written in Vue.js for dispatch the action
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
     * @return {Object}
     */exports.mapGetters = mapGetters;
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if ( true && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction() {
      var args = [],len = arguments.length;
      while (len--) {args[len] = arguments[len];}

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return;
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function' ?
      val.apply(this, [dispatch].concat(args)) :
      dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

/**
     * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
     * @param {String} namespace
     * @return {Object}
     */exports.mapActions = mapActions;
var createNamespacedHelpers = function createNamespacedHelpers(namespace) {return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace) };
};

/**
    * Normalize the map
    * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
    * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
    * @param {Array|Object} map
    * @return {Object}
    */exports.createNamespacedHelpers = createNamespacedHelpers;
function normalizeMap(map) {
  if (!isValidMap(map)) {
    return [];
  }
  return Array.isArray(map) ?
  map.map(function (key) {return { key: key, val: key };}) :
  Object.keys(map).map(function (key) {return { key: key, val: map[key] };});
}

/**
   * Validate whether given map is valid or not
   * @param {*} map
   * @return {Boolean}
   */
function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
}

/**
   * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
   * @param {Function} fn
   * @return {Function}
   */
function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

/**
   * Search a special module from store by namespace. if module not exist, print error message.
   * @param {Object} store
   * @param {String} helper
   * @param {String} namespace
   * @return {Object}
   */
function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }
  return module;
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers };var _default =


index;exports.default = _default;

/***/ }),

/***/ 32:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 7:
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.log = log;exports.default = formatLog;function typof(v) {
  var s = Object.prototype.toString.call(v);
  return s.substring(8, s.length - 1);
}

function isDebugMode() {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__;
}

function log(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  console[type].apply(console, args);
}

function formatLog() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args.shift();
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'));
    return console[type].apply(console, args);
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase();

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v) + '---END:JSON---';
      } catch (e) {
        v = '[object object]';
      }
    } else {
      if (v === null) {
        v = '---NULL---';
      } else if (v === undefined) {
        v = '---UNDEFINED---';
      } else {
        var vType = typof(v).toUpperCase();

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
        } else {
          v = String(v);
        }
      }
    }

    return v;
  });
  var msg = '';

  if (msgs.length > 1) {
    var lastMsg = msgs.pop();
    msg = msgs.join('---COMMA---');

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg;
    } else {
      msg += '---COMMA---' + lastMsg;
    }
  } else {
    msg = msgs[0];
  }

  console[type](msg);
}

/***/ }),

/***/ 8:
/*!*******************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/common/common.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _storage = _interopRequireDefault(__webpack_require__(/*! ./storage */ 9));\nvar _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 10));\nvar _msg = _interopRequireDefault(__webpack_require__(/*! ./msg.js */ 12));\nvar _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =\n{\n\n  getCopy: function getCopy() {\n    var _this = this;\n    try {\n      //获取剪贴板内容\n      uni.getClipboardData({\n        success: function success(res) {\n          try {\n            if (typeof res.data === 'object') {\n              var Context = plus.android.importClass(\"android.content.Context\");\n              var main = plus.android.runtimeMainActivity();\n              var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);\n              res.data = plus.android.invoke(clip, \"getText\").toString();\n            }\n            //如果剪贴板内容和缓存的剪贴板内容一致不做弹窗\n            if (res.data == _index.default.state.sosoGoodsUrl) {\n              return false;\n            }\n            // if(uni.getStorageSync('clipboardContent') == res.data){\n            // \treturn false;\n            // }\n            //全部数字不弹窗\n            if (!isNaN(res.data)) {\n              return false;\n            }\n            var pipei = res.data.match(/[\\w|\\d]{11}/g);\n            //少于15位字符的不弹窗\n            if (res.data.length < 15 && !pipei) {\n              return false;\n            }\n\n            //如果匹配到淘宝商品id\n            var matchIdParam = res.data.match(/id=(\\d+)/);\n            __f__(\"log\", res.data, \" at common/common.js:39\");\n            _index.default.commit(\"sosoGoodsUrl\", res.data);\n            if (matchIdParam) {\n              return _request.default.post('/api/goods/getDetail', { itemId: matchIdParam[1] }).then(function (r) {\n                if (r.data.itemTitle) {\n                  _this.goSoso({ itemTitle: r.data.itemTitle, itemId: r.data.itemId, itemPic: common.imgThumbAli(r.data.itemPic) });\n                } else {\n                  _this.goSoso({ itemTitle: res.data });\n                }\n              });\n            }\n            //关闭已有的搜索弹窗\n            if (plus.webview.getWebviewById('sousuo') !== null) {\n              plus.webview.getWebviewById('sousuo').close();\n            }\n            if (_storage.default.get('jxConfig').config.isTpwdConvert == \"1\" && pipei) {\n              _request.default.post('/api/goods/tpwdConvert', { tpwd: '￥' + pipei + '￥' }).then(function (v) {\n                _this.goSoso(v.data);\n              });\n            } else {\n              _this.goSoso({ itemTitle: res.data });\n            }\n          } catch (e) {\n            __f__(\"log\", e, \" at common/common.js:62\");\n          }\n        } });\n\n    } catch (e) {\n      uni.showToast({\n        title: '获取剪切板失败:' + e,\n        icon: 'none' });\n\n    }\n  },\n  goSoso: function goSoso(data) {\n    __f__(\"log\", 123, \" at common/common.js:74\");\n    var topH = 0;\n    if (plus.device.vendor == \"Apple\") {\n      topH = -20;\n    };\n\n    plus.webview.open('/hybrid/html/popup/sousuo.html?' + encodeURIComponent(JSON.stringify(data)),\n    'sousuo', {\n      background: 'transparent',\n      top: topH,\n      bottom: 0,\n      zindex: 997 });\n\n\n  },\n\n\n  //获取当前时间戳（服务器时间为准）\n  getTime: function getTime() {\n    return parseInt(new Date().getTime() / 1000) + _storage.default.get('timeDistance');\n  },\n  //推客宝客服\n  getKefu: function getKefu() {\n    var url = _storage.default.get('cjfConfig').cjfKefu + '&token=' + _storage.default.get('token');\n    return this.goPage('/pages/common/webView?url=' + url + '&title=在线客服');\n  },\n  //集享客服\n  getJXKefu: function getJXKefu() {var _this2 = this;\n\n    var url = _storage.default.get('jxConfig').config.jxshKefu + '&token=' + _storage.default.get('token');\n    if (!_storage.default.get('jxConfig').config.jxshKefu) {\n      _request.default.post('/api/index/getIndex').then(function (res) {\n        _index.default.commit(\"jxConfig\", res.data);\n        __f__(\"log\", res.data, \" at common/common.js:107\");\n        _this2.goPage('/pages/common/webView?url=' + res.data.config.jxshKefu + '&title=在线客服');\n      });\n    } else {\n      this.goPage('/pages/common/webView?url=' + url + '&title=在线客服');\n    }\n\n  },\n  //下单流程\n  getTaskArticle: function getTaskArticle() {\n    var id = _storage.default.get('cjfConfig').article.cjfTaskArticleId;\n    return this.goPage('/pages/superBack/noticeDetail?id=' + id + '&title=下单流程');\n  },\n  //页面跳转\n  goPage: function goPage(url, type) {\n    //返回上一页\n    if (url == -1) {\n      return uni.navigateBack();\n    }\n    //返回集享首页\n    if (url == 0) {\n      return uni.switchTab({\n        url: '/pages/index/index' });\n\n    }\n    //具体跳转页面\n    return uni.navigateTo({\n      url: url,\n      animationType: type ? type : 'pop-in',\n      animationDuration: 200 });\n\n  },\n  //倒计时，timestamp:时间戳（返款，抢购倒计时）\n  countDown: function countDown(timestamp) {\n    var nowTime = this.getTime();\n    var distance = timestamp - nowTime;\n    if (distance > 0) {\n      var dd = Math.floor(distance / 60 / 60 / 24);\n      var hh = Math.floor(distance / 60 / 60 % 24);\n      var mm = Math.floor(distance / 60 % 60);\n      var ss = Math.floor(distance % 60);\n      return \"\".concat(dd, \"\\u5929\").concat(hh, \"\\u5C0F\\u65F6\").concat(mm, \"\\u5206\").concat(ss, \"\\u79D2\");\n    } else {\n      return false;\n    }\n  },\n  //发送短信倒计时\n  countDownSms: function countDownSms(obj) {\n    var th = this;\n    if (_storage.default.get('sendCodeTime') > th.getTime()) {\n      obj.time = _storage.default.get('sendCodeTime') - th.getTime();\n      var smsInterval = setInterval(function () {\n        obj.time = _storage.default.get('sendCodeTime') - th.getTime();\n        if (obj.time < 1) {\n          _storage.default.remove('sendCodeTime');\n          clearInterval(smsInterval);\n        }\n      }, 1000);\n    }\n  },\n  //时间戳格式化，t:时间戳，format:格式\n  timeFormat: function timeFormat(t, format) {\n    var time = new Date();\n    time.setTime(t * 1000);\n    var Year = time.getFullYear(),\n    Month = time.getMonth() + 1,\n    Data = time.getDate(),\n    Hours = time.getHours(),\n    Minutes = time.getMinutes(),\n    Seconds = time.getSeconds();\n    Month = Month < 10 ? 0 + '' + Month : Month;\n    Data = Data < 10 ? 0 + '' + Data : Data;\n    Hours = Hours < 10 ? 0 + '' + Hours : Hours;\n    Minutes = Minutes < 10 ? 0 + '' + Minutes : Minutes;\n    Seconds = Seconds < 10 ? 0 + '' + Seconds : Seconds;\n    if (format == 'yyyy-mm-dd') {\n      return Year + \"-\" + Month + \"-\" + Data;\n    }\n    if (format == 'mmddhhii') {\n      return Month + \"-\" + Data + \" \" + Hours + \":\" + Minutes;\n    }\n    if (format == 'mmdd') {\n      return Month + \"-\" + Data;\n    }\n    return Year + \"-\" + Month + \"-\" + Data + \" \" + Hours + \":\" + Minutes + \":\" + Seconds;\n  },\n  //七牛云图片格式化，url：路径，size:尺寸\n  imgThumb: function imgThumb(url, size) {\n    //已经是七牛压缩格式直接返回\n    if (url.indexOf('?imageView2') > 0 || url.indexOf('http') > 0) {\n      return url;\n    }\n    var baseUrl = _storage.default.get('cjfConfig')['qiniuCdnUrl'] + url;\n    switch (size) {\n      case '50':\n        return baseUrl + '?imageView2/0/w/50/h/50/q/75';\n        break;\n      case '100':\n        return baseUrl + '?imageView2/0/w/100/h/100/q/75';\n        break;\n      case '300':\n        return baseUrl + '?imageView2/0/w/300/h/300/q/75';\n        break;\n      case '750':\n        return baseUrl + '?imageView2/0/w/750/h/750/q/75';\n        break;\n      default:\n        return baseUrl + '?imageView2/0/w/200/h/200/q/75';\n        break;}\n\n  },\n  //阿里云\n  imgThumbAli: function imgThumbAli(url, size, quality) {\n    if (!url) {\n      return url;\n    }\n    if (url.indexOf('haodanku') > -1) {\n      return url;\n    }\n    var q = 80;\n    if (quality) {\n      q = quality;\n    }\n    switch (size) {\n      case '50':\n        return url + '_50x50q' + q + '.jpg';\n        break;\n      case '100':\n        return url + '_100x100q' + q + '.jpg';\n        break;\n      case '300':\n        return url + '_300x300q' + q + '.jpg';\n        break;\n      case '750':\n        return url + '_750x750q' + q + '.jpg';\n        break;\n      default:\n\n        return url + '_200x200q' + q + '.jpg';\n        break;}\n\n    __f__(\"log\", \" at common/common.js:248\");\n  },\n  //去除图片前缀\n  imgRemovePre: function imgRemovePre(urls) {\n    var qiniuCdnUrl = _storage.default.get('cjfConfig').qiniuCdnUrl;\n    if (Array.isArray(urls)) {\n      var temp = [];\n      urls.map(function (item) {\n        temp.push(item.replace(qiniuCdnUrl, ''));\n      });\n      return temp;\n    } else {\n      var _temp = urls.replace(qiniuCdnUrl, '');\n      return _temp;\n    }\n  },\n  sendCode: function sendCode(option, callBack) {var _this3 = this;\n    if (this.getTime() < _storage.default.get('sendCodeTime')) {\n      var wait = _storage.default.get('sendCodeTime') - this.getTime();\n      _msg.default.toast('请' + wait + 's后再试');\n      callBack({ status: 0 });\n      return true;\n    }\n    option.userType = 1;\n    return _request.default.posts(\"/api/sms/doSend\", option).\n    then(function (res) {\n      //可发送短信时间\n      if (res.status == 1) {\n        _msg.default.toast(res.msg);\n        _storage.default.set('sendCodeTime', _this3.getTime() + 60);\n      } else {\n        _msg.default.toast(res.msg);\n      }\n      callBack(res.status);\n    });\n\n  },\n  //复制\n  copy: function copy(content, callback) {\n    uni.setClipboardData({\n      data: content,\n      success: function success() {\n        _msg.default.toast('复制成功');\n        if (callback) {\n          callback();\n        }\n      },\n      fail: function fail() {\n        _msg.default.toast('复制失败');\n      } });\n\n  },\n  //粘贴\n  paste: function paste(callBack) {\n    uni.getClipboardData({\n      success: function success(res) {\n        __f__(\"log\", res, \" at common/common.js:304\");\n        callBack(res.data);\n      },\n      fail: function fail() {\n        _msg.default.toast('粘贴失败');\n      } });\n\n  },\n  previewImage: function previewImage(url, urls) {\n    if (!urls) {\n      var showImgs = [url.split('?')[0]];\n    } else {\n      var showImgs = [];\n      urls.map(function (item) {\n        showImgs.push(item.split('?')[0]);\n      });\n    }\n    //图片预览\n    uni.previewImage({\n      current: url.split('?')[0],\n      urls: showImgs });\n\n  },\n\n  qiniuCdnUrl: function qiniuCdnUrl(url) {\n    if (url == '') {\n      return;\n    }\n    var jxConfig = _storage.default.get('jxConfig');\n    var qiniuCdnUrl = jxConfig.config.qiniuCdnUrl;\n    if (url.includes('http')) {\n      return url;\n    }\n    return \"\".concat(qiniuCdnUrl).concat(url);\n  },\n  //手机号码格式化  153****1212\n  telFormat: function telFormat(tel) {\n    if (tel == '') {\n      return;\n    }\n    return tel.replace(/^(\\d{3})\\d{4}(\\d+)/, \"$1****$2\");\n  }\n  /* \r\n    base64Fn:{ //base64编码转换\r\n    \tfs:require('fs'), //导入fs\r\n    \tbase64ToString:function(base64str){ //base64解码字符串\r\n    \t\treturn new Buffer(base64str).toString('base64'); \r\n    \t\t// 调用 this.$common.base64Fn.base64ToString(base64Data)\r\n    \t},\r\n    \tstringToBase64:function(str){//字符串转base64\r\n    \t\treturn  new Buffer(str,'base64').toString('utf8');\r\n    \t\t// 调用 this.$common.base64Fn.stringToBase64(str)\r\n    \t},\r\n    \tbase64ToFile:function(base64str, file){ //base64转文件格式\r\n    \t\t var fs = require('fs');\r\n    \t\t let bitmap = new Buffer(base64str, 'base64');\r\n    \t\t fs.writeFileSync(file, bitmap);\r\n    \t\t // 调用 this.$common.base64Fn.base64ToFile(base64Data,'定义文件名.png')\r\n    \t},\r\n    \tfileTobase64:function(file){\r\n    \t\t\r\n    \t\tlet bitmap = this.fs.readFileSync(file);\r\n    \t\treturn new Buffer(bitmap).toString('base64');\r\n    \t\t// 调用 this.$common.base64Fn.fileTobase64('文件路径')\r\n    \t}\r\n    } */ };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 7)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tbW9uL2NvbW1vbi5qcyJdLCJuYW1lcyI6WyJnZXRDb3B5IiwiX3RoaXMiLCJ1bmkiLCJnZXRDbGlwYm9hcmREYXRhIiwic3VjY2VzcyIsInJlcyIsImRhdGEiLCJDb250ZXh0IiwicGx1cyIsImFuZHJvaWQiLCJpbXBvcnRDbGFzcyIsIm1haW4iLCJydW50aW1lTWFpbkFjdGl2aXR5IiwiY2xpcCIsImdldFN5c3RlbVNlcnZpY2UiLCJDTElQQk9BUkRfU0VSVklDRSIsImludm9rZSIsInRvU3RyaW5nIiwic3RvcmUiLCJzdGF0ZSIsInNvc29Hb29kc1VybCIsImlzTmFOIiwicGlwZWkiLCJtYXRjaCIsImxlbmd0aCIsIm1hdGNoSWRQYXJhbSIsImNvbW1pdCIsInJlcXVlc3QiLCJwb3N0IiwiaXRlbUlkIiwidGhlbiIsInIiLCJpdGVtVGl0bGUiLCJnb1Nvc28iLCJpdGVtUGljIiwiY29tbW9uIiwiaW1nVGh1bWJBbGkiLCJ3ZWJ2aWV3IiwiZ2V0V2Vidmlld0J5SWQiLCJjbG9zZSIsInN0b3JhZ2UiLCJnZXQiLCJjb25maWciLCJpc1Rwd2RDb252ZXJ0IiwidHB3ZCIsInYiLCJlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwidG9wSCIsImRldmljZSIsInZlbmRvciIsIm9wZW4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiYmFja2dyb3VuZCIsInRvcCIsImJvdHRvbSIsInppbmRleCIsImdldFRpbWUiLCJwYXJzZUludCIsIkRhdGUiLCJnZXRLZWZ1IiwidXJsIiwiY2pmS2VmdSIsImdvUGFnZSIsImdldEpYS2VmdSIsImp4c2hLZWZ1IiwiZ2V0VGFza0FydGljbGUiLCJpZCIsImFydGljbGUiLCJjamZUYXNrQXJ0aWNsZUlkIiwidHlwZSIsIm5hdmlnYXRlQmFjayIsInN3aXRjaFRhYiIsIm5hdmlnYXRlVG8iLCJhbmltYXRpb25UeXBlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJjb3VudERvd24iLCJ0aW1lc3RhbXAiLCJub3dUaW1lIiwiZGlzdGFuY2UiLCJkZCIsIk1hdGgiLCJmbG9vciIsImhoIiwibW0iLCJzcyIsImNvdW50RG93blNtcyIsIm9iaiIsInRoIiwidGltZSIsInNtc0ludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJyZW1vdmUiLCJjbGVhckludGVydmFsIiwidGltZUZvcm1hdCIsInQiLCJmb3JtYXQiLCJzZXRUaW1lIiwiWWVhciIsImdldEZ1bGxZZWFyIiwiTW9udGgiLCJnZXRNb250aCIsIkRhdGEiLCJnZXREYXRlIiwiSG91cnMiLCJnZXRIb3VycyIsIk1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiU2Vjb25kcyIsImdldFNlY29uZHMiLCJpbWdUaHVtYiIsInNpemUiLCJpbmRleE9mIiwiYmFzZVVybCIsInF1YWxpdHkiLCJxIiwiaW1nUmVtb3ZlUHJlIiwidXJscyIsInFpbml1Q2RuVXJsIiwiQXJyYXkiLCJpc0FycmF5IiwidGVtcCIsIm1hcCIsIml0ZW0iLCJwdXNoIiwicmVwbGFjZSIsInNlbmRDb2RlIiwib3B0aW9uIiwiY2FsbEJhY2siLCJ3YWl0IiwibXNnIiwidG9hc3QiLCJzdGF0dXMiLCJ1c2VyVHlwZSIsInBvc3RzIiwic2V0IiwiY29weSIsImNvbnRlbnQiLCJjYWxsYmFjayIsInNldENsaXBib2FyZERhdGEiLCJmYWlsIiwicGFzdGUiLCJwcmV2aWV3SW1hZ2UiLCJzaG93SW1ncyIsInNwbGl0IiwiY3VycmVudCIsImp4Q29uZmlnIiwiaW5jbHVkZXMiLCJ0ZWxGb3JtYXQiLCJ0ZWwiXSwibWFwcGluZ3MiOiJvSUFBQTtBQUNBO0FBQ0E7QUFDQSxxRjtBQUNlOztBQUVkQSxTQUZjLHFCQUVIO0FBQ1YsUUFBSUMsS0FBSyxHQUFHLElBQVo7QUFDQSxRQUFJO0FBQ0g7QUFDQUMsU0FBRyxDQUFDQyxnQkFBSixDQUFxQjtBQUNwQkMsZUFBTyxFQUFFLGlCQUFTQyxHQUFULEVBQWM7QUFDdEIsY0FBSTtBQUNILGdCQUFJLE9BQU9BLEdBQUcsQ0FBQ0MsSUFBWCxL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LG9CQUFaLEVBQWlDLFVBQWpDLENBQVA7QUFDQTtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXJWYyxFIiwiZmlsZSI6IjguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnXHJcbmltcG9ydCByZXF1ZXN0IGZyb20gXCIuL3JlcXVlc3QuanNcIlxyXG5pbXBvcnQgbXNnIGZyb20gXCIuL21zZy5qc1wiXHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiQC9zdG9yZS9pbmRleC5qc1wiXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRcclxuXHRnZXRDb3B5ICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8v6I635Y+W5Ymq6LS05p2/5YaF5a65XHJcblx0XHRcdHVuaS5nZXRDbGlwYm9hcmREYXRhKHtcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YocmVzLmRhdGEpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBDb250ZXh0ID0gcGx1cy5hbmRyb2lkLmltcG9ydENsYXNzKFwiYW5kcm9pZC5jb250ZW50LkNvbnRleHRcIik7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG1haW4gPSBwbHVzLmFuZHJvaWQucnVudGltZU1haW5BY3Rpdml0eSgpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjbGlwID0gbWFpbi5nZXRTeXN0ZW1TZXJ2aWNlKENvbnRleHQuQ0xJUEJPQVJEX1NFUlZJQ0UpO1xyXG5cdFx0XHRcdFx0XHRcdHJlcy5kYXRhID0gcGx1cy5hbmRyb2lkLmludm9rZShjbGlwLCBcImdldFRleHRcIikudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvL+WmguaenOWJqui0tOadv+WGheWuueWSjOe8k+WtmOeahOWJqui0tOadv+WGheWuueS4gOiHtOS4jeWBmuW8ueeql1xyXG5cdFx0XHRcdFx0XHRpZihyZXMuZGF0YSA9PSBzdG9yZS5zdGF0ZS5zb3NvR29vZHNVcmwpe1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvLyBpZih1bmkuZ2V0U3RvcmFnZVN5bmMoJ2NsaXBib2FyZENvbnRlbnQnKSA9PSByZXMuZGF0YSl7XHJcblx0XHRcdFx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHRcdC8v5YWo6YOo5pWw5a2X5LiN5by556qXXHJcblx0XHRcdFx0XHRcdGlmKCFpc05hTihyZXMuZGF0YSkpe1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR2YXIgcGlwZWkgPSByZXMuZGF0YS5tYXRjaCgvW1xcd3xcXGRdezExfS9nKTtcclxuXHRcdFx0XHRcdFx0Ly/lsJHkuo4xNeS9jeWtl+espueahOS4jeW8ueeql1xyXG5cdFx0XHRcdFx0XHRpZihyZXMuZGF0YS5sZW5ndGg8MTUmJiFwaXBlaSl7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQvL+WmguaenOWMuemFjeWIsOa3mOWuneWVhuWTgWlkXHJcblx0XHRcdFx0XHRcdHZhciBtYXRjaElkUGFyYW0gPSByZXMuZGF0YS5tYXRjaCgvaWQ9KFxcZCspLyk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG5cdFx0XHRcdFx0XHRzdG9yZS5jb21taXQoXCJzb3NvR29vZHNVcmxcIiwgcmVzLmRhdGEpXHJcblx0XHRcdFx0XHRcdGlmKG1hdGNoSWRQYXJhbSl7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcXVlc3QucG9zdCgnL2FwaS9nb29kcy9nZXREZXRhaWwnLHtpdGVtSWQ6bWF0Y2hJZFBhcmFtWzFdfSkudGhlbigocik9PntcclxuXHRcdFx0XHRcdFx0XHRcdGlmKHIuZGF0YS5pdGVtVGl0bGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfdGhpcy5nb1Nvc28oe2l0ZW1UaXRsZTpyLmRhdGEuaXRlbVRpdGxlLGl0ZW1JZDpyLmRhdGEuaXRlbUlkLGl0ZW1QaWM6Y29tbW9uLmltZ1RodW1iQWxpKHIuZGF0YS5pdGVtUGljKX0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF90aGlzLmdvU29zbyh7aXRlbVRpdGxlOnJlcy5kYXRhfSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Ly/lhbPpl63lt7LmnInnmoTmkJzntKLlvLnnqpdcclxuXHRcdFx0XHRcdFx0aWYocGx1cy53ZWJ2aWV3LmdldFdlYnZpZXdCeUlkKCdzb3VzdW8nKSAhPT0gbnVsbCl7XHJcblx0XHRcdFx0XHRcdFx0cGx1cy53ZWJ2aWV3LmdldFdlYnZpZXdCeUlkKCdzb3VzdW8nKS5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmKHN0b3JhZ2UuZ2V0KCdqeENvbmZpZycpLmNvbmZpZy5pc1Rwd2RDb252ZXJ0ID09IFwiMVwiICYmIHBpcGVpKXtcclxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnBvc3QoJy9hcGkvZ29vZHMvdHB3ZENvbnZlcnQnLHt0cHdkOifvv6UnK3BpcGVpKyfvv6UnfSkudGhlbigodik9PntcclxuXHRcdFx0XHRcdFx0XHRcdF90aGlzLmdvU29zbyh2LmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmdvU29zbyh7aXRlbVRpdGxlOnJlcy5kYXRhfSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHR1bmkuc2hvd1RvYXN0KHtcclxuXHRcdFx0XHR0aXRsZTogJ+iOt+WPluWJquWIh+adv+Wksei0pTonICsgZSxcclxuXHRcdFx0XHRpY29uOiAnbm9uZSdcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9LFxyXG5cdGdvU29zbzpmdW5jdGlvbihkYXRhKXtcclxuXHRcdGNvbnNvbGUubG9nKDEyMylcclxuXHRcdHZhciB0b3BIID0gMDtcclxuXHRcdGlmIChwbHVzLmRldmljZS52ZW5kb3IgPT0gXCJBcHBsZVwiKSB7XHJcblx0XHRcdHRvcEggPSAtMjBcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHBsdXMud2Vidmlldy5vcGVuKCcvaHlicmlkL2h0bWwvcG9wdXAvc291c3VvLmh0bWw/JyArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShkYXRhKSksXHJcblx0XHRcdCdzb3VzdW8nLCB7XHJcblx0XHRcdGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRcdHRvcDogdG9wSCxcclxuXHRcdFx0Ym90dG9tOiAwLFxyXG5cdFx0XHR6aW5kZXg6IDk5N1xyXG5cdFx0fSk7XHJcblx0XHJcblx0fSxcclxuXHRcclxuXHRcclxuXHQvL+iOt+WPluW9k+WJjeaXtumXtOaIs++8iOacjeWKoeWZqOaXtumXtOS4uuWHhu+8iVxyXG5cdGdldFRpbWU6ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKS8xMDAwKSArIHN0b3JhZ2UuZ2V0KCd0aW1lRGlzdGFuY2UnKTtcclxuXHR9LFxyXG5cdC8v5o6o5a6i5a6d5a6i5pyNXHJcblx0Z2V0S2VmdTpmdW5jdGlvbigpe1xyXG5cdFx0bGV0IHVybCA9IHN0b3JhZ2UuZ2V0KCdjamZDb25maWcnKS5jamZLZWZ1KycmdG9rZW49JytzdG9yYWdlLmdldCgndG9rZW4nKTtcclxuXHRcdHJldHVybiB0aGlzLmdvUGFnZSgnL3BhZ2VzL2NvbW1vbi93ZWJWaWV3P3VybD0nK3VybCsnJnRpdGxlPeWcqOe6v+WuouacjScpO1xyXG5cdH0sXHJcblx0Ly/pm4bkuqvlrqLmnI1cclxuXHRnZXRKWEtlZnU6ZnVuY3Rpb24oKXtcclxuXHRcdFxyXG5cdFx0bGV0IHVybCA9IHN0b3JhZ2UuZ2V0KCdqeENvbmZpZycpLmNvbmZpZy5qeHNoS2VmdSsnJnRva2VuPScrc3RvcmFnZS5nZXQoJ3Rva2VuJyk7XHJcblx0XHRpZighc3RvcmFnZS5nZXQoJ2p4Q29uZmlnJykuY29uZmlnLmp4c2hLZWZ1KSB7XHJcblx0XHRcdHJlcXVlc3QucG9zdCgnL2FwaS9pbmRleC9nZXRJbmRleCcpLnRoZW4ocmVzID0+IHtcclxuXHRcdFx0XHRzdG9yZS5jb21taXQoXCJqeENvbmZpZ1wiLCByZXMuZGF0YSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMuZGF0YSlcclxuXHRcdFx0XHR0aGlzLmdvUGFnZSgnL3BhZ2VzL2NvbW1vbi93ZWJWaWV3P3VybD0nK3Jlcy5kYXRhLmNvbmZpZy5qeHNoS2VmdSsnJnRpdGxlPeWcqOe6v+WuouacjScpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fWVsc2Uge1xyXG5cdFx0XHR0aGlzLmdvUGFnZSgnL3BhZ2VzL2NvbW1vbi93ZWJWaWV3P3VybD0nK3VybCsnJnRpdGxlPeWcqOe6v+WuouacjScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSxcclxuXHQvL+S4i+WNlea1geeoi1xyXG5cdGdldFRhc2tBcnRpY2xlOmZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgaWQgPSBzdG9yYWdlLmdldCgnY2pmQ29uZmlnJykuYXJ0aWNsZS5jamZUYXNrQXJ0aWNsZUlkO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ29QYWdlKCcvcGFnZXMvc3VwZXJCYWNrL25vdGljZURldGFpbD9pZD0nK2lkKycmdGl0bGU95LiL5Y2V5rWB56iLJyk7XHJcblx0fSxcclxuXHQvL+mhtemdoui3s+i9rFxyXG5cdGdvUGFnZTpmdW5jdGlvbih1cmwsdHlwZSl7XHJcblx0XHQvL+i/lOWbnuS4iuS4gOmhtVxyXG5cdFx0aWYodXJsPT0tMSl7XHJcblx0XHRcdHJldHVybiB1bmkubmF2aWdhdGVCYWNrKCk7XHJcblx0XHR9XHJcblx0XHQvL+i/lOWbnumbhuS6q+mmlumhtVxyXG5cdFx0aWYodXJsPT0wKXtcclxuXHRcdFx0cmV0dXJuIHVuaS5zd2l0Y2hUYWIoe1xyXG5cdFx0XHRcdHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHQvL+WFt+S9k+i3s+i9rOmhtemdolxyXG5cdFx0cmV0dXJuIHVuaS5uYXZpZ2F0ZVRvKHtcclxuXHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdGFuaW1hdGlvblR5cGU6IHR5cGU/dHlwZToncG9wLWluJyxcclxuXHRcdFx0YW5pbWF0aW9uRHVyYXRpb246IDIwMFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHQvL+WAkuiuoeaXtu+8jHRpbWVzdGFtcDrml7bpl7TmiLPvvIjov5TmrL7vvIzmiqLotK3lgJLorqHml7bvvIlcclxuXHRjb3VudERvd24gOiBmdW5jdGlvbiAodGltZXN0YW1wKSB7XHJcblx0XHRsZXQgbm93VGltZSA9IHRoaXMuZ2V0VGltZSgpO1xyXG5cdFx0bGV0IGRpc3RhbmNlID0gdGltZXN0YW1wIC0gbm93VGltZTtcclxuXHRcdGlmIChkaXN0YW5jZSA+IDApIHtcclxuXHRcdFx0bGV0IGRkID0gTWF0aC5mbG9vcihkaXN0YW5jZSAvIDYwIC8gNjAgLyAyNCk7XHJcblx0XHRcdGxldCBoaCA9IE1hdGguZmxvb3IoKGRpc3RhbmNlIC8gNjAgLyA2MCkgJSAyNCk7XHJcblx0XHRcdGxldCBtbSA9IE1hdGguZmxvb3IoKGRpc3RhbmNlIC8gNjApICUgNjApO1xyXG5cdFx0XHRsZXQgc3MgPSBNYXRoLmZsb29yKGRpc3RhbmNlICUgNjApO1xyXG5cdFx0XHRyZXR1cm4gYCR7ZGR95aSpJHtoaH3lsI/ml7Yke21tfeWIhiR7c3N956eSYDtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSxcclxuXHQvL+WPkemAgeefreS/oeWAkuiuoeaXtlxyXG5cdGNvdW50RG93blNtcyA6IGZ1bmN0aW9uKG9iail7XHJcblx0XHRsZXQgdGggPSB0aGlzO1xyXG5cdFx0aWYoc3RvcmFnZS5nZXQoJ3NlbmRDb2RlVGltZScpPnRoLmdldFRpbWUoKSl7XHJcblx0XHRcdG9iai50aW1lID0gc3RvcmFnZS5nZXQoJ3NlbmRDb2RlVGltZScpIC0gdGguZ2V0VGltZSgpO1xyXG5cdFx0XHR2YXIgc21zSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdG9iai50aW1lID0gc3RvcmFnZS5nZXQoJ3NlbmRDb2RlVGltZScpIC0gdGguZ2V0VGltZSgpO1xyXG5cdFx0XHRcdGlmKG9iai50aW1lPDEpe1xyXG5cdFx0XHRcdFx0c3RvcmFnZS5yZW1vdmUoJ3NlbmRDb2RlVGltZScpO1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChzbXNJbnRlcnZhbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LDEwMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Ly/ml7bpl7TmiLPmoLzlvI/ljJbvvIx0OuaXtumXtOaIs++8jGZvcm1hdDrmoLzlvI9cclxuXHR0aW1lRm9ybWF0IDogZnVuY3Rpb24odCxmb3JtYXQpIHtcclxuXHRcdGxldCB0aW1lID0gbmV3IERhdGUoKVxyXG5cdFx0dGltZS5zZXRUaW1lKHQgKiAxMDAwKVxyXG5cdFx0bGV0IFllYXIgPSB0aW1lLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE1vbnRoID0gdGltZS5nZXRNb250aCgpICsgMSxcclxuXHRcdFx0RGF0YSA9IHRpbWUuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRIb3VycyA9IHRpbWUuZ2V0SG91cnMoKSxcclxuXHRcdFx0TWludXRlcyA9IHRpbWUuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRTZWNvbmRzID0gdGltZS5nZXRTZWNvbmRzKCk7XHJcblx0XHRNb250aCA9IE1vbnRoIDwgMTAgPyAwICsgJycgKyBNb250aCA6IE1vbnRoO1xyXG5cdFx0RGF0YSA9IERhdGEgPCAxMCA/IDAgKyAnJyArIERhdGEgOiBEYXRhO1xyXG5cdFx0SG91cnMgPSBIb3VycyA8IDEwID8gMCArICcnICsgSG91cnMgOiBIb3VycztcclxuXHRcdE1pbnV0ZXMgPSBNaW51dGVzIDwgMTAgPyAwICsgJycgKyBNaW51dGVzIDogTWludXRlcztcclxuXHRcdFNlY29uZHMgPSBTZWNvbmRzIDwgMTAgPyAwICsgJycgKyBTZWNvbmRzIDogU2Vjb25kcztcclxuXHRcdGlmKGZvcm1hdCA9PSAneXl5eS1tbS1kZCcpe1xyXG5cdFx0XHRyZXR1cm4gWWVhciArIFwiLVwiICsgTW9udGggKyBcIi1cIiArIERhdGE7XHJcblx0XHR9XHJcblx0XHRpZihmb3JtYXQgPT0gJ21tZGRoaGlpJyl7XHJcblx0XHRcdHJldHVybiBNb250aCArIFwiLVwiICsgRGF0YSArIFwiIFwiICsgSG91cnMgKyBcIjpcIiArIE1pbnV0ZXM7XHJcblx0XHR9XHJcblx0XHRpZihmb3JtYXQgPT0gJ21tZGQnKXtcclxuXHRcdFx0cmV0dXJuIE1vbnRoICsgXCItXCIgKyBEYXRhO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFllYXIgKyBcIi1cIiArIE1vbnRoICsgXCItXCIgKyBEYXRhICsgXCIgXCIgKyBIb3VycyArIFwiOlwiICsgTWludXRlcyArIFwiOlwiICtTZWNvbmRzO1xyXG5cdH0sXHJcblx0Ly/kuIPniZvkupHlm77niYfmoLzlvI/ljJbvvIx1cmzvvJrot6/lvoTvvIxzaXplOuWwuuWvuFxyXG5cdGltZ1RodW1iIDogZnVuY3Rpb24odXJsLHNpemUpIHtcclxuXHRcdC8v5bey57uP5piv5LiD54mb5Y6L57yp5qC85byP55u05o6l6L+U5ZueXHJcblx0XHRpZih1cmwuaW5kZXhPZignP2ltYWdlVmlldzInKT4wfHx1cmwuaW5kZXhPZignaHR0cCcpPjApe1xyXG5cdFx0XHRyZXR1cm4gdXJsO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGJhc2VVcmwgPSBzdG9yYWdlLmdldCgnY2pmQ29uZmlnJylbJ3Fpbml1Q2RuVXJsJ10rdXJsO1xyXG5cdFx0c3dpdGNoKHNpemUpe1xyXG5cdFx0XHRjYXNlICc1MCc6XHJcblx0XHRcdFx0cmV0dXJuIGJhc2VVcmwrJz9pbWFnZVZpZXcyLzAvdy81MC9oLzUwL3EvNzUnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcxMDAnOlxyXG5cdFx0XHRcdHJldHVybiBiYXNlVXJsKyc/aW1hZ2VWaWV3Mi8wL3cvMTAwL2gvMTAwL3EvNzUnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICczMDAnOlxyXG5cdFx0XHRcdHJldHVybiBiYXNlVXJsKyc/aW1hZ2VWaWV3Mi8wL3cvMzAwL2gvMzAwL3EvNzUnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICc3NTAnOlxyXG5cdFx0XHRcdHJldHVybiBiYXNlVXJsKyc/aW1hZ2VWaWV3Mi8wL3cvNzUwL2gvNzUwL3EvNzUnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBiYXNlVXJsKyc/aW1hZ2VWaWV3Mi8wL3cvMjAwL2gvMjAwL3EvNzUnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Ly/pmL/ph4zkupFcclxuXHRpbWdUaHVtYkFsaTpmdW5jdGlvbih1cmwsc2l6ZSxxdWFsaXR5KXtcclxuXHRcdGlmKCF1cmwpe1xyXG5cdFx0XHRyZXR1cm4gdXJsO1xyXG5cdFx0fVxyXG5cdFx0aWYodXJsLmluZGV4T2YoJ2hhb2Rhbmt1Jyk+LTEpe1xyXG5cdFx0XHRyZXR1cm4gdXJsO1xyXG5cdFx0fVxyXG5cdFx0bGV0IHEgPSA4MDtcclxuXHRcdGlmKHF1YWxpdHkpe1xyXG5cdFx0XHRxID0gcXVhbGl0eTtcclxuXHRcdH1cclxuXHRcdHN3aXRjaChzaXplKXtcclxuXHRcdFx0Y2FzZSAnNTAnOlxyXG5cdFx0XHRcdHJldHVybiB1cmwrJ181MHg1MHEnK3ErJy5qcGcnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcxMDAnOlxyXG5cdFx0XHRcdHJldHVybiB1cmwrJ18xMDB4MTAwcScrcSsnLmpwZyc7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJzMwMCc6XHJcblx0XHRcdFx0cmV0dXJuIHVybCsnXzMwMHgzMDBxJytxKycuanBnJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnNzUwJzpcclxuXHRcdFx0XHRyZXR1cm4gdXJsKydfNzUweDc1MHEnK3ErJy5qcGcnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gdXJsKydfMjAweDIwMHEnK3ErJy5qcGcnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5sb2coKVxyXG5cdH0sXHJcblx0Ly/ljrvpmaTlm77niYfliY3nvIBcclxuXHRpbWdSZW1vdmVQcmU6ZnVuY3Rpb24odXJscyl7XHJcblx0XHRsZXQgcWluaXVDZG5VcmwgPSBzdG9yYWdlLmdldCgnY2pmQ29uZmlnJykucWluaXVDZG5Vcmw7XHJcblx0XHRpZihBcnJheS5pc0FycmF5KHVybHMpKXtcclxuXHRcdFx0bGV0IHRlbXAgPSBbXTtcclxuXHRcdFx0dXJscy5tYXAoKGl0ZW0pPT57XHJcblx0XHRcdFx0dGVtcC5wdXNoKGl0ZW0ucmVwbGFjZShxaW5pdUNkblVybCwgJycpKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiB0ZW1wO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCB0ZW1wID0gdXJscy5yZXBsYWNlKHFpbml1Q2RuVXJsLCAnJyk7XHJcblx0XHRcdHJldHVybiB0ZW1wO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VuZENvZGUgOiBmdW5jdGlvbihvcHRpb24sY2FsbEJhY2spe1xyXG5cdFx0aWYodGhpcy5nZXRUaW1lKCk8c3RvcmFnZS5nZXQoJ3NlbmRDb2RlVGltZScpKXtcclxuXHRcdFx0bGV0IHdhaXQgPSBzdG9yYWdlLmdldCgnc2VuZENvZGVUaW1lJyktdGhpcy5nZXRUaW1lKCk7XHJcblx0XHRcdG1zZy50b2FzdCgn6K+3Jyt3YWl0Kydz5ZCO5YaN6K+VJyk7XHJcblx0XHRcdGNhbGxCYWNrKHtzdGF0dXM6MH0pO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdG9wdGlvbi51c2VyVHlwZSA9IDE7XHJcblx0XHRyZXR1cm4gcmVxdWVzdC5wb3N0cyhcIi9hcGkvc21zL2RvU2VuZFwiLG9wdGlvbilcclxuXHRcdC50aGVuKHJlcz0+e1xyXG5cdFx0XHQvL+WPr+WPkemAgeefreS/oeaXtumXtFxyXG5cdFx0XHRpZihyZXMuc3RhdHVzID09IDEpe1xyXG5cdFx0XHRcdG1zZy50b2FzdChyZXMubXNnKTtcclxuXHRcdFx0XHRzdG9yYWdlLnNldCgnc2VuZENvZGVUaW1lJyx0aGlzLmdldFRpbWUoKSs2MCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdG1zZy50b2FzdChyZXMubXNnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYWxsQmFjayhyZXMuc3RhdHVzKTtcclxuXHRcdH0pXHJcblxyXG5cdH0sXHJcblx0Ly/lpI3liLZcclxuXHRjb3B5OmZ1bmN0aW9uKGNvbnRlbnQsY2FsbGJhY2spe1xyXG5cdFx0dW5pLnNldENsaXBib2FyZERhdGEoe1xyXG5cdFx0XHRkYXRhOiBjb250ZW50LFxyXG5cdFx0XHRzdWNjZXNzOiAoKSA9PiB7XHJcblx0XHRcdFx0bXNnLnRvYXN0KCflpI3liLbmiJDlip8nKTtcclxuXHRcdFx0XHRpZihjYWxsYmFjayl7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFpbDogKCkgPT4ge1xyXG5cdFx0XHRcdG1zZy50b2FzdCgn5aSN5Yi25aSx6LSlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Ly/nspjotLRcclxuXHRwYXN0ZTpmdW5jdGlvbihjYWxsQmFjayl7XHJcblx0XHR1bmkuZ2V0Q2xpcGJvYXJkRGF0YSh7XHJcblx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpO1xyXG5cdFx0XHRcdGNhbGxCYWNrKHJlcy5kYXRhKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFpbDogKCkgPT4ge1xyXG5cdFx0XHRcdG1zZy50b2FzdCgn57KY6LS05aSx6LSlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cHJldmlld0ltYWdlOmZ1bmN0aW9uKHVybCx1cmxzKXtcclxuXHRcdGlmKCF1cmxzKXtcclxuXHRcdFx0dmFyIHNob3dJbWdzID0gW3VybC5zcGxpdCgnPycpWzBdXTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR2YXIgc2hvd0ltZ3MgPSBbXTtcclxuXHRcdFx0dXJscy5tYXAoKGl0ZW0pPT57XHJcblx0XHRcdFx0c2hvd0ltZ3MucHVzaChpdGVtLnNwbGl0KCc/JylbMF0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0Ly/lm77niYfpooTop4hcclxuXHRcdHVuaS5wcmV2aWV3SW1hZ2Uoe1xyXG5cdFx0XHRjdXJyZW50OiB1cmwuc3BsaXQoJz8nKVswXSxcclxuXHRcdFx0dXJsczogc2hvd0ltZ3MsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRxaW5pdUNkblVybDpmdW5jdGlvbih1cmwpe1xyXG5cdFx0XHRpZih1cmw9PScnKXtcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQganhDb25maWcgPSBzdG9yYWdlLmdldCgnanhDb25maWcnKVxyXG5cdFx0XHRsZXQgcWluaXVDZG5VcmwgPSBqeENvbmZpZy5jb25maWcucWluaXVDZG5VcmxcclxuXHRcdFx0aWYodXJsLmluY2x1ZGVzKCdodHRwJykpe1xyXG5cdFx0XHRcdHJldHVybiB1cmxcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gYCR7cWluaXVDZG5Vcmx9JHt1cmx9YFxyXG5cdH0sXHJcblx0Ly/miYvmnLrlj7fnoIHmoLzlvI/ljJYgIDE1MyoqKioxMjEyXHJcblx0dGVsRm9ybWF0KHRlbCkge1xyXG5cdFx0aWYodGVsPT0nJyl7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRlbC5yZXBsYWNlKC9eKFxcZHszfSlcXGR7NH0oXFxkKykvLFwiJDEqKioqJDJcIilcclxuXHR9LFxyXG5cdC8qIFxyXG5cdGJhc2U2NEZuOnsgLy9iYXNlNjTnvJbnoIHovazmjaJcclxuXHRcdGZzOnJlcXVpcmUoJ2ZzJyksIC8v5a+85YWlZnNcclxuXHRcdGJhc2U2NFRvU3RyaW5nOmZ1bmN0aW9uKGJhc2U2NHN0cil7IC8vYmFzZTY06Kej56CB5a2X56ym5LiyXHJcblx0XHRcdHJldHVybiBuZXcgQnVmZmVyKGJhc2U2NHN0cikudG9TdHJpbmcoJ2Jhc2U2NCcpOyBcclxuXHRcdFx0Ly8g6LCD55SoIHRoaXMuJGNvbW1vbi5iYXNlNjRGbi5iYXNlNjRUb1N0cmluZyhiYXNlNjREYXRhKVxyXG5cdFx0fSxcclxuXHRcdHN0cmluZ1RvQmFzZTY0OmZ1bmN0aW9uKHN0cil7Ly/lrZfnrKbkuLLovaxiYXNlNjRcclxuXHRcdFx0cmV0dXJuICBuZXcgQnVmZmVyKHN0ciwnYmFzZTY0JykudG9TdHJpbmcoJ3V0ZjgnKTtcclxuXHRcdFx0Ly8g6LCD55SoIHRoaXMuJGNvbW1vbi5iYXNlNjRGbi5zdHJpbmdUb0Jhc2U2NChzdHIpXHJcblx0XHR9LFxyXG5cdFx0YmFzZTY0VG9GaWxlOmZ1bmN0aW9uKGJhc2U2NHN0ciwgZmlsZSl7IC8vYmFzZTY06L2s5paH5Lu25qC85byPXHJcblx0XHRcdCB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cdFx0XHQgbGV0IGJpdG1hcCA9IG5ldyBCdWZmZXIoYmFzZTY0c3RyLCAnYmFzZTY0Jyk7XHJcblx0XHRcdCBmcy53cml0ZUZpbGVTeW5jKGZpbGUsIGJpdG1hcCk7XHJcblx0XHRcdCAvLyDosIPnlKggdGhpcy4kY29tbW9uLmJhc2U2NEZuLmJhc2U2NFRvRmlsZShiYXNlNjREYXRhLCflrprkuYnmlofku7blkI0ucG5nJylcclxuXHRcdH0sXHJcblx0XHRmaWxlVG9iYXNlNjQ6ZnVuY3Rpb24oZmlsZSl7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgYml0bWFwID0gdGhpcy5mcy5yZWFkRmlsZVN5bmMoZmlsZSk7XHJcblx0XHRcdHJldHVybiBuZXcgQnVmZmVyKGJpdG1hcCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xyXG5cdFx0XHQvLyDosIPnlKggdGhpcy4kY29tbW9uLmJhc2U2NEZuLmZpbGVUb2Jhc2U2NCgn5paH5Lu26Lev5b6EJylcclxuXHRcdH1cclxuXHR9ICovXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///8\n");

/***/ }),

/***/ 9:
/*!********************************************************************!*\
  !*** F:/officeProject/xuchengwangluo/haokouling/common/storage.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var storageBase = '_jxsh';var _default =\n{\n  set: function set(key, value, time) {\n    uni.setStorageSync(key, value);\n    var seconds = parseInt(time);\n    if (seconds > 0) {\n      var timestamp = Date.parse(new Date());\n      timestamp = timestamp / 1000 + seconds;\n      uni.setStorageSync(key + storageBase, timestamp + \"\");\n    } else {\n      uni.removeStorageSync(key + storageBase);\n    }\n  },\n  get: function get(key, def) {\n    var deadtime = parseInt(uni.getStorageSync(key + storageBase));\n    if (deadtime) {\n      if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {\n        if (def) {\n          return def;\n        } else {\n          return false;\n        }\n      }\n    }\n    var res = uni.getStorageSync(key);\n    if (res) {\n      return res;\n    } else {\n      if (def == undefined || def == \"\") {\n        def = false;\n      }\n      return def;\n    }\n  },\n  remove: function remove(key) {\n    uni.removeStorageSync(key);\n    uni.removeStorageSync(key + storageBase);\n  },\n  clear: function clear() {\n    uni.clearStorageSync();\n  } };exports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tbW9uL3N0b3JhZ2UuanMiXSwibmFtZXMiOlsic3RvcmFnZUJhc2UiLCJzZXQiLCJrZXkiLCJ2YWx1ZSIsInRpbWUiLCJ1bmkiLCJzZXRTdG9yYWdlU3luYyIsInNlY29uZHMiLCJwYXJzZUludCIsInRpbWVzdGFtcCIsIkRhdGUiLCJwYXJzZSIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiZ2V0IiwiZGVmIiwiZGVhZHRpbWUiLCJnZXRTdG9yYWdlU3luYyIsInJlcyIsInVuZGVmaW5lZCIsInJlbW92ZSIsImNsZWFyIiwiY2xlYXJTdG9yYWdlU3luYyJdLCJtYXBwaW5ncyI6InVGQUFBLElBQU1BLFdBQVcsR0FBRyxPQUFwQixDO0FBQ2M7QUFDYkMsS0FEYSxlQUNUQyxHQURTLEVBQ0pDLEtBREksRUFDR0MsSUFESCxFQUNRO0FBQ2pCQyxPQUFHLENBQUNDLGNBQUosQ0FBbUJKLEdBQW5CLEVBQXdCQyxLQUF4QjtBQUNBLFFBQUlJLE9BQU8sR0FBR0MsUUFBUSxDQUFDSixJQUFELENBQXRCO0FBQ0EsUUFBSUcsT0FBTyxHQUFHLENBQWQsRUFBaUI7QUFDYixVQUFJRSxTQUFTLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLElBQUlELElBQUosRUFBWCxDQUFoQjtBQUNBRCxlQUFTLEdBQUdBLFNBQVMsR0FBRyxJQUFaLEdBQW1CRixPQUEvQjtBQUNBRixTQUFHLENBQUNDLGNBQUosQ0FBbUJKLEdBQUcsR0FBR0YsV0FBekIsRUFBc0NTLFNBQVMsR0FBRyxFQUFsRDtBQUNILEtBSkQsTUFJTztBQUNISixTQUFHLENBQUNPLGlCQUFKLENBQXNCVixHQUFHLEdBQUdGLFdBQTVCO0FBQ0g7QUFDSixHQVhZO0FBWWJhLEtBWmEsZUFZVFgsR0FaUyxFQVlKWSxHQVpJLEVBWUE7QUFDWixRQUFJQyxRQUFRLEdBQUdQLFFBQVEsQ0FBQ0gsR0FBRyxDQUFDVyxjQUFKLENBQW1CZCxHQUFHLEdBQUdGLFdBQXpCLENBQUQsQ0FBdkI7QUFDQSxRQUFJZSxRQUFKLEVBQWM7QUFDVixVQUFJUCxRQUFRLENBQUNPLFFBQUQsQ0FBUixHQUFxQkwsSUFBSSxDQUFDQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLElBQXlCLElBQWxELEVBQXdEO0FBQ3BELFlBQUlJLEdBQUosRUFBUztBQUNMLGlCQUFPQSxHQUFQO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsaUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFFBQUlHLEdBQUcsR0FBR1osR0FBRyxDQUFDVyxjQUFKLENBQW1CZCxHQUFuQixDQUFWO0FBQ0EsUUFBSWUsR0FBSixFQUFTO0FBQ0wsYUFBT0EsR0FBUDtBQUNILEtBRkQsTUFFTztBQUNILFVBQUlILEdBQUcsSUFBSUksU0FBUCxJQUFxQkosR0FBRyxJQUFJLEVBQWhDLEVBQW9DO0FBQ2hDQSxXQUFHLEdBQUcsS0FBTjtBQUNIO0FBQ0QsYUFBT0EsR0FBUDtBQUNIO0FBQ0QsR0FoQ1k7QUFpQ2JLLFFBakNhLGtCQWlDTmpCLEdBakNNLEVBaUNGO0FBQ1BHLE9BQUcsQ0FBQ08saUJBQUosQ0FBc0JWLEdBQXRCO0FBQ0FHLE9BQUcsQ0FBQ08saUJBQUosQ0FBc0JWLEdBQUcsR0FBR0YsV0FBNUI7QUFDSCxHQXBDWTtBQXFDYm9CLE9BckNhLG1CQXFDTjtBQUNIZixPQUFHLENBQUNnQixnQkFBSjtBQUNILEdBdkNZLEUiLCJmaWxlIjoiOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0b3JhZ2VCYXNlID0gJ19qeHNoJztcclxuZXhwb3J0IGRlZmF1bHR7XHJcblx0c2V0KGtleSwgdmFsdWUsIHRpbWUpe1xyXG5cdCAgICB1bmkuc2V0U3RvcmFnZVN5bmMoa2V5LCB2YWx1ZSkgXHJcblx0ICAgIHZhciBzZWNvbmRzID0gcGFyc2VJbnQodGltZSk7XHJcblx0ICAgIGlmIChzZWNvbmRzID4gMCkge1xyXG5cdCAgICAgICAgdmFyIHRpbWVzdGFtcCA9IERhdGUucGFyc2UobmV3IERhdGUoKSk7XHJcblx0ICAgICAgICB0aW1lc3RhbXAgPSB0aW1lc3RhbXAgLyAxMDAwICsgc2Vjb25kcztcclxuXHQgICAgICAgIHVuaS5zZXRTdG9yYWdlU3luYyhrZXkgKyBzdG9yYWdlQmFzZSwgdGltZXN0YW1wICsgXCJcIilcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIHVuaS5yZW1vdmVTdG9yYWdlU3luYyhrZXkgKyBzdG9yYWdlQmFzZSlcclxuXHQgICAgfVxyXG5cdH0sXHJcblx0Z2V0KGtleSwgZGVmKXtcclxuXHRcdHZhciBkZWFkdGltZSA9IHBhcnNlSW50KHVuaS5nZXRTdG9yYWdlU3luYyhrZXkgKyBzdG9yYWdlQmFzZSkpXHJcblx0XHRpZiAoZGVhZHRpbWUpIHtcclxuXHRcdCAgICBpZiAocGFyc2VJbnQoZGVhZHRpbWUpIDwgRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKSAvIDEwMDApIHtcclxuXHRcdCAgICAgICAgaWYgKGRlZikge1xyXG5cdFx0ICAgICAgICAgICAgcmV0dXJuIGRlZjtcclxuXHRcdCAgICAgICAgfSBlbHNlIHtcclxuXHRcdCAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH1cclxuXHRcdH1cclxuXHRcdHZhciByZXMgPSB1bmkuZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxuXHRcdGlmIChyZXMpIHtcclxuXHRcdCAgICByZXR1cm4gcmVzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCAgICBpZiAoZGVmID09IHVuZGVmaW5lZCAgfHwgZGVmID09IFwiXCIpIHtcclxuXHRcdCAgICAgICAgZGVmID0gZmFsc2U7IFxyXG5cdFx0ICAgIH1cclxuXHRcdCAgICByZXR1cm4gZGVmO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVtb3ZlKGtleSl7XHJcblx0ICAgIHVuaS5yZW1vdmVTdG9yYWdlU3luYyhrZXkpO1xyXG5cdCAgICB1bmkucmVtb3ZlU3RvcmFnZVN5bmMoa2V5ICsgc3RvcmFnZUJhc2UpO1xyXG5cdH0sXHJcblx0Y2xlYXIoKXtcclxuXHQgICAgdW5pLmNsZWFyU3RvcmFnZVN5bmMoKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///9\n");

/***/ })

/******/ });