/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/api.js":
/*!***********************!*\
  !*** ./client/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAPICallsWithinLastMinute\": () => (/* binding */ getAPICallsWithinLastMinute),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! local-storage */ \"./node_modules/local-storage/local-storage.js\");\n/* harmony import */ var local_storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(local_storage__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! localforage */ \"./node_modules/localforage/dist/localforage.js\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n// const { github_token, campus } = require('./env/config.js');\nconst campus = 'rfe7';\nconst github_token = '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';\n\nconst headers = {\n  headers: {\n    Authorization: `${github_token}`,\n  },\n};\n\nconst cache = async (key, id, value) => {\n  let obj = (await localforage__WEBPACK_IMPORTED_MODULE_2___default().getItem(key)) || {};\n  obj[id] = value;\n  await localforage__WEBPACK_IMPORTED_MODULE_2___default().setItem(key, obj);\n};\n\nconst getCache = async (key, id) => {\n  let obj = (await localforage__WEBPACK_IMPORTED_MODULE_2___default().getItem(key)) || {};\n  return obj[id];\n};\n\nconst logAPICall = async () => {\n  let now = new Date().getTime() / 1000;\n  let arr = (await localforage__WEBPACK_IMPORTED_MODULE_2___default().getItem('apicalls')) || [];\n  arr.push(now);\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] > now - 60) {\n      arr = arr.slice(i);\n      break;\n    }\n  }\n  await localforage__WEBPACK_IMPORTED_MODULE_2___default().setItem('apicalls', arr);\n};\n\nconst getAPICallsWithinLastMinute = async () => {\n  let now = new Date().getTime() / 1000;\n  let arr = (await localforage__WEBPACK_IMPORTED_MODULE_2___default().getItem('apicalls')) || [];\n\n  return arr.filter((x) => x > now - 60).length;\n};\n\nconst host = `https://app-hrsei-api.herokuapp.com/api/fec2/${campus}`;\n\nconst api = {\n  /******************************************************************************\n   * Get All\n   ******************************************************************************/\n\n  getAllData: async function (params = {}, useCache = true) {\n    const { product_id } = params;\n\n    let obj = {};\n    obj.currentProduct = await this.getProductData({ product_id });\n    obj.reviewData = await this.getReviewData({ product_id }, useCache);\n    obj.relatedProducts = await this.getRelatedProductData({ product_id });\n    obj.questionData = await this.getQuestionData({ product_id }, useCache);\n\n    return obj;\n  },\n\n  isProductCached: async function ({ product_id }) {\n    let cachedProduct = await getCache('product', product_id);\n    return !!cachedProduct;\n  },\n\n  /******************************************************************************\n   * Product\n   ******************************************************************************/\n\n  // Parameter\tType\tDescription\n  // page\tinteger\tSelects the page of results to return. Default 1.\n  // count\tinteger\tSpecifies how many results per page to return. Default 5.\n  getProducts: async function (params = {}) {\n    const { page = 1, count = 100 } = params;\n    let url = `${host}/products?page=${page}&count=${count}`;\n    try {\n      let res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(url, headers);\n      await logAPICall();\n      return res.data;\n    } catch (err) {\n      return {};\n    }\n  },\n\n  // Returns data for an individual product, includes style data\n  getProductData: async function ({ product_id }) {\n    let productUrl = `${host}/products/${product_id}`;\n    let stylesUrl = `${host}/products/${product_id}/styles`;\n    try {\n      let cachedProduct = await getCache('product', product_id);\n\n      if (cachedProduct) {\n        return cachedProduct;\n      }\n      let productRes = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(productUrl, headers);\n      await logAPICall();\n      let obj = productRes.data;\n      let stylesRes = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(stylesUrl, headers);\n      await logAPICall();\n      obj.styles = stylesRes.data.results;\n      await cache('product', product_id, obj);\n      return obj;\n    } catch (err) {\n      return {};\n    }\n  },\n\n  //gets array of related products\n  //iterates through and returns product info + ratings info for each\n  getRelatedProductData: async function ({ product_id }) {\n    let url = `${host}/products/${product_id}/related`;\n\n    try {\n      let obj = {};\n      let related = await getCache('related', product_id);\n      if (!related) {\n        let res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(url, headers);\n        await logAPICall();\n        await cache('related', product_id, res.data);\n        related = res.data;\n      }\n      obj.related_product_ids = related;\n      obj.related = [];\n      obj.ratings = [];\n\n      for (let i = 0; i < related.length; i++) {\n        let temp1 = await this.getProductData({ product_id: related[i] });\n        let temp2 = await this.getReviewData({ product_id: related[i] });\n        obj.related.push(temp1);\n        obj.ratings.push(temp2);\n      }\n\n      return obj;\n    } catch (err) {\n      return {};\n    }\n  },\n\n  /******************************************************************************\n   * Ratings and Reviews\n   ******************************************************************************/\n  // Returns a list of reviews for a particular product. This list does not include any reported reviews.\n  // page\tinteger\tSelects the page of results to return. Default 1.\n  // count\tinteger\tSpecifies how many results per page to return. Default 5.\n  // sort\ttext\tChanges the sort order of reviews to be based on \"newest\", \"helpful\", or \"relevant\"\n  // product_id\tinteger\tSpecifies the product for which to retrieve reviews.\n  // TODO - implement CACHING for getReviews\n  getReviews: function (params = {}) {\n    const { product_id, count = 100, page = 1, sort = 'newest' } = params;\n    if (!product_id) {\n      return Promise.reject(new Error('must provide product_id'));\n    }\n\n    const url = `/reviews?product_id=${product_id}&count=${count}&page=${page}&sort=${sort}`;\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().get(host + url, headers)\n      .then((res) => Promise.resolve(res.data))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Returns review metadata for a given product.\n  // product_id\tinteger\tRequired ID of the product for which data should be returned\n  getReviewMeta: function (params = {}) {\n    const { product_id } = params;\n    if (!product_id) {\n      return Promise.reject(new Error('must provide product_id'));\n    }\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().get(host + '/reviews/meta?product_id=' + product_id, headers)\n      .then((res) => Promise.resolve(res.data))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  getReviewData: async function (params = {}, useCache = true) {\n    const { product_id, count = 100, page = 1, sort = 'newest' } = params;\n\n    const reviewUrl = `${host}/reviews?product_id=${product_id}&count=${count}&page=${page}&sort=${sort}`;\n    const metaUrl = `${host}/reviews/meta?product_id=${product_id}`;\n\n    try {\n      if (useCache === true) {\n        let cachedReviews = await getCache('reviews', product_id);\n        if (cachedReviews) {\n          return cachedReviews;\n        }\n      }\n\n      let resMeta = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(metaUrl, headers);\n      await logAPICall();\n      let resReviews = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(reviewUrl, headers);\n      await logAPICall();\n      let data = resMeta.data;\n\n      data.reviews = resReviews.data.results;\n      data.numReviews = resReviews.data.results.length;\n\n      await cache('reviews', product_id, data);\n      return data;\n    } catch (err) {\n      throw new Error(err);\n    }\n  },\n\n  // product_id\tinteger\tRequired ID of the product to post the review for\n  // rating\tint\tInteger (1-5) indicating the review rating\n  // summary\ttext\tSummary text of the review\n  // body\ttext\tContinued or full text of the review\n  // recommend\tbool\tValue indicating if the reviewer recommends the product\n  // name\ttext\tUsername for question asker\n  // email\ttext\tEmail address for question asker\n  // photos\t[text]\tArray of text urls that link to images to be shown\n  // characteristics\tobject\tObject of keys representing characteristic_id and values representing the review value for that characteristic. { \"14\": 5, \"15\": 5 //...}\n  addReview: function (params = {}) {\n    if (Object.keys(params).length !== 9) {\n      return Promise.reject(\n        new Error('params must contain exactly 9 properties')\n      );\n    }\n\n    const url = host + '/reviews';\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Updates a review to show it was found helpful.\n  // Parameter\tType\tDescription\n  // reveiw_id\tinteger\tRequired ID of the review to update\n  markReviewAsHelpful: function (params = {}) {\n    const { review_id } = params;\n    if (!review_id) {\n      return Promise.reject(new Error('params must contain {review_id}'));\n    }\n    let url = `${host}/reviews/${review_id}/helpful`;\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, {}, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.\n  // Parameter\tType\tDescription\n  // review_id\tinteger\tRequired ID of the review to update\n\n  reportReview: function (params = {}) {\n    const { review_id } = params;\n    if (!review_id) {\n      return Promise.reject(new Error('params must contain {review_id}'));\n    }\n    let url = `${host}/reviews/${review_id}/report`;\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, {}, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  /******************************************************************************\n   * Questions and Answers\n   ******************************************************************************/\n\n  // GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.\n  // Parameter\tType\tDescription\n  // product_id\tinteger\tSpecifies the product for which to retrieve questions.\n  // page\tinteger\tSelects the page of results to return. Default 1.\n  // count\tinteger\tSpecifies how many results per page to return. Default 5.\n\n  getQuestions: function (params = {}) {\n    const { product_id, page = 1, count = 5 } = params;\n    if (!product_id) {\n      return Promise.reject(new Error('must provide product_id'));\n    }\n    const url = `/qa/questions?product_id=${product_id}&count=${count}&page=${page}`;\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().get(host + url, headers)\n      .then((res) => Promise.resolve(res.data))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Returns answers for a given question. This list does not include any reported answers.\n  // GET /qa/questions/:question_id/answers\n  // Parameter\tType\tDescription\n  // question_id\tinteger\tRequired ID of the question for wich answers are needed\n\n  getAnswers: function (params = {}) {\n    const { question_id } = params;\n    if (!question_id) {\n      return Promise.reject(new Error('must provide a question_id'));\n    }\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().get(host + '/qa/questions/' + question_id + '/answers', headers)\n      .then((res) => Promise.resolve(res.data))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  getQuestionData: async function (params = {}, useCache = true) {\n    const { product_id, count = 100, page = 1 } = params;\n    const url = `/qa/questions?product_id=${product_id}&count=${count}&page=${page}`;\n\n    try {\n      if (useCache === true) {\n        let cachedQuestions = await getCache('questions', product_id);\n        if (cachedQuestions) {\n          return cachedQuestions;\n        }\n      }\n      let questionRes = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(host + url, headers);\n      await logAPICall();\n      await cache('questions', product_id, questionRes.data);\n      return questionRes.data;\n    } catch (err) {\n      throw new Error(err);\n    }\n  },\n\n  //Adds a question for the given product\n  // Parameter\tType\tDescription\n  // body\ttext\tText of question being asked\n  // name\ttext\tUsername for question asker\n  // email\ttext\tEmail address for question asker\n  // product_id\tinteger\tRequired ID of the Product for which the question is posted\n\n  addQuestion: function (params = {}) {\n    const { body, name, email, product_id } = params;\n    if (\n      !body ||\n      !name ||\n      !email ||\n      !product_id ||\n      Object.keys(params).length !== 4\n    ) {\n      return Promise.reject(\n        new Error('params must contain only {body, name, email, product_id}')\n      );\n    }\n\n    const url = host + '/qa/questions';\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Adds an answer for the given question\n  // Parameter\tType\tDescription\n  // body\ttext\tText of question being asked\n  // name\ttext\tUsername for question asker\n  // email\ttext\tEmail address for question asker\n  // photos\t[text]\tAn array of urls corresponding to images to display\n\n  addAnswer: function (params = {}) {\n    const { question_id, body, name, email, photos } = params;\n    if (\n      !question_id ||\n      !body ||\n      !name ||\n      !email ||\n      !photos ||\n      Object.keys(params).length !== 5\n    ) {\n      return Promise.reject(\n        new Error('params must contain only {question_id, body, name, email}')\n      );\n    }\n    let url = `${host}/qa/questions/${question_id}/answers`;\n    delete params.question_id;\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Updates a question to show it was found helpful.\n  // Parameter\tType\tDescription\n  // question_id\tinteger\tRequired ID of the question to update\n  markQuestionAsHelpful: function (params = {}) {\n    const { question_id } = params;\n    if (!question_id) {\n      return Promise.reject(new Error('params must contain {question_id}'));\n    }\n    let url = `${host}/qa/questions/${question_id}/helpful`;\n\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, {}, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.\n  // Parameter\tType\tDescription\n  // question_id\tinteger\tRequired ID of the question to update\n  reportQuestion: function (params = {}) {\n    const { question_id } = params;\n    if (!question_id) {\n      return Promise.reject(new Error('params must contain {question_id}'));\n    }\n    let url = `${host}/qa/questions/${question_id}/report`;\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, {}, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Updates an answer to show it was found helpful.\n  // Parameter\tType\tDescription\n  // answer_id\tinteger\tRequired ID of the answer to update\n  markAnswerAsHelpful: function (params = {}) {\n    const { answer_id } = params;\n    if (!answer_id) {\n      return Promise.reject(new Error('params must contain {answer_id}'));\n    }\n    let url = `${host}/qa/answers/${answer_id}/helpful`;\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, {}, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  // Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.\n  // Parameter\tType\tDescription\n  // answer_id\tinteger\tRequired ID of the answer to update\n  reportAnswer: function (params = {}) {\n    const { answer_id } = params;\n    if (!answer_id) {\n      return Promise.reject(new Error('params must contain {answer_id}'));\n    }\n    let url = `${host}/qa/answers/${answer_id}/report`;\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, {}, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  /******************************************************************************\n   * Interactions\n   ******************************************************************************/\n\n  // Parameter\tType\tDescription\n  // element\tstring\tRequired. Selector for the element which was clicked\n  // widget\tstring\tRequired. Name of the module/widget in which the click occured\n  // time\tstring\tRequired. Time the interaction occurred\n  // POST /interactions\n\n  logInteraction: function (params = {}) {\n    const { element, widget, time } = params;\n    let url = `${host}/interactions`;\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, headers)\n      .then((res) => Promise.resolve(res))\n      .catch((err) => Promise.reject(new Error(err)));\n  },\n\n  /******************************************************************************\n   * SHOPPING CART\n   ******************************************************************************/\n\n  // TODO -- Shopping Cart API appears to be broke - fix this\n  // Retrieves list of products added to the cart by a user.\n  // getCart: function () {\n  //   return axios.get(host + '/cart', headers)\n  //     .then(res => Promise.resolve(res.data))\n  //     .catch(err => Promise.reject(new Error(err)));\n  // },\n\n  // addToCart: function (params = {}) {\n  //   const { sku_id } = params;\n  //   if (!sku_id) return Promise.reject(new Error('params must contain {sku_id}'));\n\n  //   return axios.post(host + '/cart', params, headers)\n  //     .then(res => Promise.resolve(res.data))\n  //     .catch(err => Promise.reject(new Error(err)));\n  // }\n\n  /******************************************************************************\n   * ARCHIVE\n   ******************************************************************************/\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n\n//# sourceURL=webpack://fec/./client/api.js?");

/***/ }),

/***/ "./client/worker.js":
/*!**************************!*\
  !*** ./client/worker.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./client/api.js\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ \"./node_modules/localforage/dist/localforage.js\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nself.addEventListener(\n  'message',\n  async function (e) {\n    let ids = e.data.map((x) => x.id);\n    console.log(`    Team Hera all day\n      _____________\n    _/_|[][][][][] | - - - - - -\n   (Data Fetch Bus | - - - - - -\n   =--OO-------OO--`);\n\n    for (let i = 0; i < ids.length; i++) {\n      let isCached = await _api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isProductCached({ product_id: ids[i] });\n      let total = await localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem('product');\n      let numCached = Object.keys(total).length;\n      let apicalls = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getAPICallsWithinLastMinute)();\n\n      if (isCached) {\n        console.log(i, 'already fetched>>>', ids[i], numCached, apicalls);\n      } else {\n        while (apicalls > 50) {\n          console.log('....throttling', apicalls);\n          apicalls = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getAPICallsWithinLastMinute)();\n          await sleep(10000);\n        }\n        console.log(i, 'fetching...', ids[i], numCached, apicalls);\n        await _api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllData({ product_id: ids[i] }, false);\n      }\n    }\n  },\n  false\n);\n\n/**********************\n * Archive Worker that pre-loads background images\n */\n// let id = 0;\n\n// const setLastFetch = async (product_id) => {\n//   let obj = await localforage.getItem('requests');\n//   obj[product_id] = new Date().getTime() / 1000;\n//   await localforage.setItem('requests', obj);\n// };\n\n// const getLastFetch = async (product_id) => {\n//   let obj = await localforage.getItem('requests');\n//   return obj[product_id];\n// };\n\n// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\n// self.addEventListener(\n//   'message',\n//   async function (e) {\n//     id++;\n//     //show stats about the current local storage\n//     let localdata = await localforage.getItem('data');\n//     let cachedIds = Object.keys(localdata || {});\n//     let apicalls = await getAPICallsWithinLastMinute();\n//     let relatedIds = e.data.relatedProducts.related_product_ids;\n\n//     // console.log(id, 'Initiating Service Worker');\n//     // console.log('---------------------------------');\n//     // console.log('API calls l60s : ', apicalls);\n//     // console.log('Cached Products: ', cachedIds.length);\n//     // console.log('Related Ids    : ', relatedIds.join(', '));\n\n//     for (let i = 0; i < relatedIds.length; i++) {\n//       //when was the product last fetched?\n//       let lastFetch = await getLastFetch(relatedIds[i]);\n//       let isStale = !lastFetch || new Date().getTime() / 1000 - lastFetch > 10 * 60;\n\n//       //how many API calls have been made in the last 60 seconds?\n//       let apiCalls = await getAPICallsWithinLastMinute();\n\n//       if (isStale) {\n//         // console.log('fetching(' + id + '):', relatedIds[i]);\n//         while (apiCalls > 50) {\n//           // console.log('throttling.. too many API calls', apiCalls);\n//           await sleep(5000);\n//           apiCalls = await getAPICallsWithinLastMinute();\n//         }\n//         await api.getAllData({ product_id: relatedIds[i] }, false);\n//         await setLastFetch(relatedIds[i]);\n//       }\n//     }\n\n//     // console.log('done fetching, service(' + id + ')');\n//     //self.postMessage('result');\n//   },\n//   false\n// );\n\n\n//# sourceURL=webpack://fec/./client/worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_axios_index_js-node_modules_local-storage_local-storage_js-node_modules_-8aeed4"], () => (__webpack_require__("./client/worker.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"client_worker_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfec"] = self["webpackChunkfec"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e("vendors-node_modules_axios_index_js-node_modules_local-storage_local-storage_js-node_modules_-8aeed4").then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;