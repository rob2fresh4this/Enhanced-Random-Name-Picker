import { SaveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './local-storage.js';
// layout of local storage
// example: ["Name1", "Name2", "Name3"]
// add a name to local storage: SaveToLocalStorage("Name1");
// remove a name from local storage: removeFromLocalStorage("Name1");
// get all names from local storage: getFromLocalStorage();

const input_name = document.getElementById('name-input');
const add_button = document.getElementById('add-name');
const names_list = document.getElementById('name-list');// list of names
const picked_name = document.getElementById('picked');
const pick_random_btn = document.getElementById('pick-random');

const group_size_input = document.getElementById('group-size');// people per group
const group_count_input = document.getElementById('group-count');// number of groups
const generate_group_btn = document.getElementById('generate-groups');
const groups_display = document.getElementById('groups-display');

function addName(name) {
    if (!name) return ;// if name is empty
    SaveToLocalStorage(name);
    input_name.value = '';
    input_name.focus();
    displayNames();
}

function displayNames() {
    let SavedData = getFromLocalStorage();
    let names = '';
    SavedData.forEach(name => {
        names += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${name}
            <button class="btn btn-sm btn-danger">Remove</button>            
        </li>`
    });
    names_list.innerHTML = names;
    const remove_buttons = document.querySelectorAll('.btn-danger');
    remove_buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            removeFromLocalStorage(SavedData[index]);
            displayNames();
        });
    });
}

function pickRandom() {
    let SavedData = getFromLocalStorage();
    if (SavedData.length === 0) return picked_name.textContent = 'No names to pick from';
    let randomIndex = Math.floor(Math.random() * SavedData.length);
    picked_name.textContent = SavedData[randomIndex];
}

function generateGroups() {
    let SavedData = getFromLocalStorage();
    if (SavedData.length === 0) return groups_display.innerHTML = '<div class="alert alert-danger">No names to generate groups</div>';
    let group_size = parseInt(group_size_input.value);
    let group_count = parseInt(group_count_input.value);
    if (group_size * group_count > SavedData.length) return alert('Not enough names');
    let groups = [];
    for (let i = 0; i < group_count; i++) {// Create groups with the specified size
        groups.push([]);
    }
    for (let i = 0; i < group_count; i++) {// Randomly assign names to groups
        for (let j = 0; j < group_size; j++) {
            if (SavedData.length > 0) {
                let randomIndex = Math.floor(Math.random() * SavedData.length);
                groups[i].push(SavedData[randomIndex]);
                SavedData.splice(randomIndex, 1);
            }
        }
    }
    // Handle remainder (leftover names)
    let remainder = SavedData.length;
    if (remainder > 0) {
        for (let i = 0; i < remainder; i++) {
            groups[i % group_count].push(SavedData[i]);
        }
    }
    console.log(groups);
    groups_display.innerHTML = groups.map(GroupLayout).join('');
    
}

function GroupLayout(group, index) {
    return `
    <div class="alert alert-info">
        <strong>Group ${index + 1}:</strong> ${group.join(', ')}
    </div>`;
}



add_button.addEventListener('click', () => addName(input_name.value));
input_name.addEventListener('keypress', (e) => { if (e.key === 'Enter') addName(input_name.value) });
pick_random_btn.addEventListener('click', pickRandom);
generate_group_btn.addEventListener('click', generateGroups);

function OnStart() {
    pick_random_btn.click();
    displayNames();
}


OnStart();
console.log('script.js loaded');