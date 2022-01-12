import api, { getAPICallsWithinLastMinute } from './api.js';
import localforage from 'localforage';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

self.addEventListener(
  'message',
  async function (e) {
    let ids = e.data.map((x) => x.id);
    console.log(`    Team Hera all day
      _____________
    _/_|[][][][][] | - - - - - -
   (Data Fetch Bus | - - - - - -
   =--OO-------OO--`);

    for (let i = 0; i < ids.length; i++) {
      let isCached = await api.isProductCached({ product_id: ids[i] });
      let total = await localforage.getItem('product');
      let numCached = Object.keys(total).length;
      let apicalls = await getAPICallsWithinLastMinute();

      if (isCached) {
        console.log(i, 'already fetched>>>', ids[i], numCached, apicalls);
      } else {
        while (apicalls > 50) {
          console.log('....throttling', apicalls);
          apicalls = await getAPICallsWithinLastMinute();
          await sleep(10000);
        }
        console.log(i, 'fetching...', ids[i], numCached, apicalls);
        await api.getAllData({ product_id: ids[i] }, false);
      }
    }
  },
  false
);

/**********************
 * Archive Worker that pre-loads background images
 */
// let id = 0;

// const setLastFetch = async (product_id) => {
//   let obj = await localforage.getItem('requests');
//   obj[product_id] = new Date().getTime() / 1000;
//   await localforage.setItem('requests', obj);
// };

// const getLastFetch = async (product_id) => {
//   let obj = await localforage.getItem('requests');
//   return obj[product_id];
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// self.addEventListener(
//   'message',
//   async function (e) {
//     id++;
//     //show stats about the current local storage
//     let localdata = await localforage.getItem('data');
//     let cachedIds = Object.keys(localdata || {});
//     let apicalls = await getAPICallsWithinLastMinute();
//     let relatedIds = e.data.relatedProducts.related_product_ids;

//     // console.log(id, 'Initiating Service Worker');
//     // console.log('---------------------------------');
//     // console.log('API calls l60s : ', apicalls);
//     // console.log('Cached Products: ', cachedIds.length);
//     // console.log('Related Ids    : ', relatedIds.join(', '));

//     for (let i = 0; i < relatedIds.length; i++) {
//       //when was the product last fetched?
//       let lastFetch = await getLastFetch(relatedIds[i]);
//       let isStale = !lastFetch || new Date().getTime() / 1000 - lastFetch > 10 * 60;

//       //how many API calls have been made in the last 60 seconds?
//       let apiCalls = await getAPICallsWithinLastMinute();

//       if (isStale) {
//         // console.log('fetching(' + id + '):', relatedIds[i]);
//         while (apiCalls > 50) {
//           // console.log('throttling.. too many API calls', apiCalls);
//           await sleep(5000);
//           apiCalls = await getAPICallsWithinLastMinute();
//         }
//         await api.getAllData({ product_id: relatedIds[i] }, false);
//         await setLastFetch(relatedIds[i]);
//       }
//     }

//     // console.log('done fetching, service(' + id + ')');
//     //self.postMessage('result');
//   },
//   false
// );
