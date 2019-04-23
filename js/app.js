'use strict';

document.getElementById('requestResourceButton').addEventListener('click', requestResource);

function requestResource(){
  const userInput = document.getElementById('resourceId').value;
  const resourceType = document.getElementById('resourceType');
  const resourceReq = new XMLHttpRequest();

  if (resourceType.value === 'people'){
    resourceReq.addEventListener('load', loadPeopleResource);
    resourceReq.open('GET', `https://swapi.co/api/people/${userInput}`);
    resourceReq.send();
    return;
  }
  if (resourceType.value === 'planets'){
    resourceReq.addEventListener('load', loadPlanetResource);
    resourceReq.open('GET', `https://swapi.co/api/planets/${userInput}`);
    resourceReq.send();
    return;
  }
  if (resourceType.value === 'starships'){
    resourceReq.addEventListener('load', loadStarshipResource);
    resourceReq.open('GET', `https://swapi.co/api/starships/${userInput}`);
    resourceReq.send();
    return;
  }
}

function loadPeopleResource(){
  const resourceObj = JSON.parse(this.responseText);
  const contentContainerDiv = document.getElementById('contentContainer');
  contentContainerDiv.innerHTML = "";

  if (!resourceObj.name){
    const errorElem = document.createElement('p');
    errorElem.innerHTML = 'No person found, try another value';
    contentContainerDiv.appendChild(errorElem);
    return;
  }

  const resourceNameElem = document.createElement('h2');
  const resourceGenderElem = document.createElement('p');
  const resourceSpeciesElem = document.createElement('p');
  let speciesReq = new XMLHttpRequest();
  speciesReq.addEventListener('load', loadSpecies);
  speciesReq.open('GET', resourceObj.species[0]);
  speciesReq.send();

  function loadSpecies(){
    let speciesObj = JSON.parse(this.responseText);
    resourceSpeciesElem.innerHTML = 'Species: ' + speciesObj.name;
  }

  resourceNameElem.innerHTML = resourceObj.name;
  resourceGenderElem.innerHTML = 'Gender: ' + resourceObj.gender;
  contentContainerDiv.appendChild(resourceNameElem);
  contentContainerDiv.appendChild(resourceGenderElem);
  contentContainerDiv.appendChild(resourceSpeciesElem);
}

function loadPlanetResource(){
  const resourceObj = JSON.parse(this.responseText);
  const contentContainerDiv = document.getElementById('contentContainer');
  contentContainerDiv.innerHTML = "";
  
  if (!resourceObj.name){
    const errorElem = document.createElement('p');
    errorElem.innerHTML = 'No planet found, try another value';
    contentContainerDiv.appendChild(errorElem);
    return;
  }

  const resourceNameElem = document.createElement('h2');
  const resourceTerrainElem = document.createElement('p');
  const resourcePopElem = document.createElement('p');
  const resourceFilmsListElem = document.createElement('ul');
  
  resourceNameElem.innerHTML = resourceObj.name;
  resourceTerrainElem.innerHTML = 'Terrain: ' + resourceObj.terrain;
  resourcePopElem.innerHTML = 'Population: ' + resourceObj.population;
  contentContainerDiv.appendChild(resourceNameElem);
  contentContainerDiv.appendChild(resourceTerrainElem);
  contentContainerDiv.appendChild(resourcePopElem);
  contentContainerDiv.appendChild(resourceFilmsListElem);

  resourceObj.films.forEach(function(item){
    let filmsListEntry = document.createElement('li');
    let filmsReq = new XMLHttpRequest();
    filmsReq.addEventListener('load', loadFilms);
    filmsReq.open('GET', item);
    filmsReq.send();
    contentContainerDiv.appendChild(filmsListEntry);

    function loadFilms(){
      let filmObj = JSON.parse(this.responseText);
      filmsListEntry.innerHTML = filmObj.title;
    }
  });
}

function loadStarshipResource(){
  const resourceObj = JSON.parse(this.responseText);
  const contentContainerDiv = document.getElementById('contentContainer');
  contentContainerDiv.innerHTML = "";
  
  if (!resourceObj.name){
    const errorElem = document.createElement('p');
    errorElem.innerHTML = 'No starship found, try another value';
    contentContainerDiv.appendChild(errorElem);
    return;
  }

  const resourceNameElem = document.createElement('h2');
  const resourceManufacturerElem = document.createElement('p');
  const resourceClassElem = document.createElement('p');
  const resourceFilmListElem = document.createElement('ul');

  contentContainerDiv.innerHTML = "";
  resourceNameElem.innerHTML = resourceObj.name;
  resourceManufacturerElem.innerHTML = 'Manufacturer: ' + resourceObj.manufacturer;
  resourceClassElem.innerHTML = 'Class: ' + resourceObj.starship_class;
  contentContainerDiv.appendChild(resourceNameElem);
  contentContainerDiv.appendChild(resourceManufacturerElem);
  contentContainerDiv.appendChild(resourceClassElem);
  contentContainerDiv.appendChild(resourceFilmListElem);

  resourceObj.films.forEach(function(item){
    let filmListEntry = document.createElement('li');
    let filmReq = new XMLHttpRequest();
    filmReq.addEventListener('load', loadFilm);
    filmReq.open('GET', item);
    filmReq.send();
    contentContainerDiv.appendChild(filmListEntry);

    function loadFilm(){
      let filmObj = JSON.parse(this.responseText);
      filmListEntry.innerHTML = filmObj.title;
    }
  });
}

