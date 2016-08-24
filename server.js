'use strict';

var fetch = require('isomorphic-fetch');

var studentsPerSection = {
  students: 0,
  sections: 0
};

fetch('https://api.clever.com/v1.1/sections', {
  'method': 'GET',
  'headers': {
    'Authorization': 'Bearer DEMO_TOKEN'
  }
})
.then(res => res.json())
.then(json => {
  checkData(json)
  if (json.links[1].rel === 'next') {
    fetchData(json.links[1].uri)
  }
})

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
    if (json.data.length) {
      json.links.forEach(function(val) {
        if (val.rel === 'next') {
          fetchData(val.uri)
        }
      })
    } 
  })
}

function checkData(data) {
  data.data.forEach(function(val) {
    studentsPerSection.students += val.data.students.length;
    studentsPerSection.sections++
  })
  console.log(studentsPerSection);
}