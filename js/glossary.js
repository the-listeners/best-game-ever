'use strict';

// DOM references
var table = document.getElementById('glossaryTable');

// Retrieves language:
var language = localStorage.getItem('language');

// Retrieves word array
var stringyWordArray = localStorage.getItem('wordArray');
var wordObjectArray = JSON.parse(stringyWordArray);

// Create table headings
var tableHeading = document.createElement('thead');
var tableHeadingRow = document.createElement('tr');
// Create english heading
var englishHeading = document.createElement('td');
englishHeading.textContent = 'english';
tableHeadingRow.appendChild(englishHeading);
// Create other language heading
var otherLanguageHeading = document.createElement('td');
otherLanguageHeading.textContent = language;
tableHeadingRow.appendChild(otherLanguageHeading);
tableHeading.appendChild(tableHeadingRow);
table.appendChild(tableHeading);

// Function to create rows
for (var i = 0; i < wordObjectArray.length; i++){
  var tableRow = document.createElement('tr');
  
  // Creates English word cells
  var englishCell = document.createElement('td');
  englishCell.textContent = wordObjectArray[i].english;
  tableRow.appendChild(englishCell);

  // If statement to determines language in other cell
  var otherLanguageCell = document.createElement('td');
  if(language === 'spanish'){
    otherLanguageCell.textContent = wordObjectArray[i].spanish;
  } else if(language === 'french'){
    otherLanguageCell.textContent = wordObjectArray[i].french;
  } else if(language === 'latvian'){
    otherLanguageCell.textContent = wordObjectArray[i].latvian;
  } else if(language === 'german'){
    otherLanguageCell.textContent = wordObjectArray[i].german;
  }

  tableRow.appendChild(otherLanguageCell);
  table.appendChild(tableRow);
}

