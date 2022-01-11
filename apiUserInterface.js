/*jshint esversion: 8 */
import { API } from "./api.js";
// HTML elements
let fetchButton = document.querySelector('.fetch-button');
let urlInput = document.querySelector('.url');
let displayElement = document.querySelector('.result-display');
let saveTriggerButton = document.querySelector('.save-trigger');
let closeSave = document.querySelector('.close-btn');
let saveAlert = document.querySelector('.save-alert');
let saveButton = document.querySelector('.save-btn');
let keyInput = document.querySelector('.key-input');
let clearButton = document.querySelector('.clear-btn');
let displayWrapper = document.querySelector('.display-wrapper');

// instance of API class

// eventlisteners and functions
fetchButton.addEventListener('click', () => {
    // fetch resource when the url input has value...
    // api url:    https://jsonplaceholder.typicode.com/posts
    if (urlInput.value !== "") {
        displayWrapper.classList.replace('dp-none', 'dp-show');
        const myApi = new API(urlInput.value);
        myApi.load(displayElement);

        // saves fetch data to localstorage
        saveButton.addEventListener('click', () => {
            if (keyInput.value) {
                let message = myApi.save(keyInput.value);
                alert(message);
            } else {

                alert("Please enter a name to save!");
            }
        });
    }
});

// opens up the save as panel
saveTriggerButton.addEventListener('click', () => {
    saveAlert.classList.add('dp-show');
});

// opens up the save as panel
closeSave.addEventListener('click', () => {
    saveAlert.classList.replace('dp-show', 'dp-none');
});

// 
clearButton.addEventListener('click', () => {
    displayElement.innerHTML = '';
    displayWrapper.classList.replace('dp-show', 'dp-none');
});