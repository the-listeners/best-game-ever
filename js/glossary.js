'use strict';

/*==============================================
DOM REFERENCES
================================================*/

var table = document.getElementById('glossaryTable');

/*==============================================
LOCAL STORAGE
================================================*/
//Retrieves specified language from storage
var language = localStorage.getItem('language');

//Retrieves array with all word objects
var stringyWordArray = localStorage.getItem('wordArray');
var wordObjectArray = JSON.parse(stringyWordArray);

/*==============================================
BUILD TABLE
================================================*/

//Create table heading
var tableHeading = document.createElement('thead');
var tableHeadingRow = document.createElement('tr');

//Add english td to heading
var englishHeading = document.createElement('td');
englishHeading.textContent = 'english';
tableHeadingRow.appendChild(englishHeading);

//Add specified language td to heading
var otherLanguageHeading = document.createElement('td');
otherLanguageHeading.textContent = language;
tableHeadingRow.appendChild(otherLanguageHeading);
tableHeading.appendChild(tableHeadingRow);
table.appendChild(tableHeading);

//This function will add all the rows on the table
for (var i = 0; i < wordObjectArray.length; i++){
  var tableRow = document.createElement('tr');
  
  //Creates English word cells
  var englishCell = document.createElement('td');
  englishCell.textContent = wordObjectArray[i].english;
  tableRow.appendChild(englishCell);

  //If statement to determines language in other cell
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

