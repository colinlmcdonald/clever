'use strict';

var fetch = require('isomorphic-fetch');

var studentsPerSection = {
  students: 0,
  sections: 0
};

function fetchData(uri) {
  fetch(`https://api.clever.com${uri}`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer DEMO_TOKEN'
    }
  })
  .then(res => res.json())
  .then(json => {
    checkData(json)
    json.links.forEach(function(val) {
      if (val.rel === 'next') {
        fetchData(val.uri)
      }
    })
  })
}

function checkData(data) {
  data.data.forEach(function(val) {
    studentsPerSection.students += val.data.students.length;
    studentsPerSection.sections++
  })
  console.log(studentsPerSection);
}

fetchData('/v1.1/sections')