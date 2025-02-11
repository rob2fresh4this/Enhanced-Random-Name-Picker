function SaveToLocalStorage(SavedDataID000) {
    console.log(`Name was saved: ${SavedDataID000}`);
    let SavedData = getFromLocalStorage();
    if (!SavedData.includes(SavedDataID000)) {
        SavedData.push(SavedDataID000);
        localStorage.setItem('SavedData', JSON.stringify(SavedData));
    }
}

function getFromLocalStorage() {
    console.log('Retrieving data from local storage');
    let SavedData = localStorage.getItem('SavedData');
    if (SavedData) {
        console.log(`Retrieved data: ${SavedData}`);
        return JSON.parse(SavedData);
    }
    console.log('No data found in local storage');
    return [];
}

function removeFromLocalStorage(SavedDataID000) {
    console.log(`Trying to remove ${SavedDataID000}`);
    let SavedData = getFromLocalStorage(); // Correct function call
    let index = SavedData.indexOf(SavedDataID000);
    if (index !== -1) {
        SavedData.splice(index, 1);
        localStorage.setItem('SavedData', JSON.stringify(SavedData));
        console.log(`Removed ${SavedDataID000} from local storage`);
    } else {
        console.log(`${SavedDataID000} not found in local storage`);
    }
}

export { SaveToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
