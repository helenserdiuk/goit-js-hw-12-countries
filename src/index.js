import './styles.css';
import fetchCountries from './fetchCountries';
import countryTmpl from './templates/country.hbs';
import countriesListTmpl from './templates/countries.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core/dist/PNotify.js';

error({
  text: 'Notice me, senpai!',
});

const refs = {
  input: document.querySelector('#input'),
  countriesList: document.querySelector('.country-list'),
};
refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  fetchCountries(e.target.value)
    .then(countries => countryMarkup(countries))
    .catch(err => error({ text: err.message }));
}

function countryMarkup(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    refs.countriesList.insertAdjacentHTML('beforeend', countryTmpl(countries));
    return;
  }
  if (countries.length === 1) {
    refs.countriesList.insertAdjacentHTML('beforeend', countriesListTmpl(countries));
    return;
  }  
  if (countries.length >= 10) {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
  };
}

function errorCountry() {
  error({
    text: 'Сountry with such a set was not found!',
  });
};

