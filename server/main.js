import { Meteor } from "meteor/meteor";
var fs = require('fs');
var search = require('youtube-search');
var _ = require("underscore");

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    Search: async function(keyword) {
      return new Promise(async (resolve, reject) => {
        try {
          item = await searchByKeyword(keyword);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
});

async function searchByKeyword(keyword) {
  var opts = {
    maxResults: 10,
    key: 'AIzaSyBw2-Lwz1zCjI1OWm6YMbysbVOvPoudpHE'
  };
  return new Promise(async (resolve, reject) => {
  search(keyword, opts, function(err, results) {
    if(err) reject(err)
    // console.log('result',JSON.stringify(results))
    // console.log('thumbnails',results[0].thumbnails.default.url) 
    _.map(results,(item)=>{
      // console.log('item',item)
      const temp = item.thumbnails.default.url
      item.thumbnails = null
      item.thumbnails = temp
    })
    // console.log('results',JSON.stringify(results))
   resolve(results)
  });
})
}
