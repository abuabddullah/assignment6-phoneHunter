// taking some essential variables in global scope 
let searchInputTag = document.querySelector('#searchInputTag');
let searchBtnTag = document.querySelector('#searchBtnTag');
let resultsField = document.querySelector('#resultsField');
let noOfResults = document.querySelector('#noOfResults');
let searchKeyWord = document.querySelector('#searchKeyWord');
let detailsOfPhone = document.querySelector('#detailsOfPhone');



// common function for toggle any element
const toggle = (id, cssProperty) => {
    document.getElementById(id).style.display = cssProperty;
}

// hide spinner and alert messages others div at initial stage
toggle('spinner', 'none'); // hide spinner
toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
toggle('alert4NoResult', 'none'); // hide alert4NoResult
toggle('alert4Results', 'none'); // hide alert4Results
toggle('detailsExplored', 'none'); // hide detailsExplored
toggle('searchResults', 'none'); // hide searchResults
toggle('showAllBtnTag', 'none'); // hide showAllBtnTag


// add event handler for search button
searchBtnTag.addEventListener('click', () => {
    toggle('spinner', 'block'); // show spinner
    toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
    toggle('alert4NoResult', 'none'); // hide alert4NoResult
    toggle('alert4Results', 'none'); // hide alert4Results

    let searchText = searchInputTag.value;
    searchInputTag.value = '';

    if (searchText.length > 0) {

        // for valid key
        let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
            .then(response => response.json())
            .then(jsonData => displayJsonData(jsonData.data, searchText));
    } else {

        // for empty search
        toggle('alert4ValidKey', 'block'); // show alert4ValidKey

        toggle('detailsExplored', 'none'); // hide detailsExplored
        toggle('alert4NoResult', 'none'); // hide alert4NoResult
        toggle('spinner', 'none'); // hide spinner
        toggle('alert4Results', 'none'); // hide alert4Results
        toggle('searchResults', 'none'); // hide searchResults

    }
});

const displayJsonData = (datas, searchText) => {
    resultsField.innerText = '';
    toggle('showAllBtnTag', 'none'); // hide showAllBtnTag

    if (datas.length == 0) {

        // for no results
        toggle('alert4NoResult', 'block'); // show alert4NoResult
        toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
        toggle('searchResults', 'none'); // hide searchResults
        toggle('alert4Results', 'none'); // hide alert4Results
        toggle('detailsExplored', 'none'); // hide detailsExplored
    } else {

        if (datas.length > 20) {
            toggle('showAllBtnTag', 'block'); // show showAllBtnTag
        }

        // for results        
        toggle('searchResults', 'block'); // show searchResults
        toggle('alert4Results', 'block'); // show alert4Results
        toggle('alert4NoResult', 'none'); // hide alert4NoResult
        toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
        toggle('detailsExplored', 'none'); // hide detailsExplored

        // show no of results found and the searched keyword
        noOfResults.innerText = datas.length
        searchKeyWord.innerText = searchText

        // show results in the results field
        datas.slice(0, 20).forEach(element => {
            let aDiv = document.createElement('div');
            aDiv.classList.add('col');
            aDiv.innerHTML = `        
                <div class="card h-100 shadow">
                    <img src="${element.image}" class="p-2 card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.phone_name}</h5>
                        <p class="card-text"><strong>Brand</strong> : ${element.brand}</p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-danger" id="explore" onclick="exploreDetails('${element.slug}')">Explore</a>
                    </div>
                </div>
        `
            resultsField.appendChild(aDiv);
        });
    }
    toggle('spinner', 'none'); // hide spinner
}


const exploreDetails = (slugCode) => {
    toggle('spinner', 'block'); // show spinner
    toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
    toggle('alert4NoResult', 'none'); // hide alert4NoResult
    toggle('alert4Results', 'none'); // hide alert4Results

    let url = `https://openapi.programming-hero.com/api/phone/${slugCode}`
    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayDetails(jsonData.data));
}

const displayDetails = (datas) => {
    toggle('detailsExplored', 'block'); // show detailsExplored
    toggle('spinner', 'none'); // hide spinner

    // clear previous details
    detailsOfPhone.innerText = '';

    // show details of phone
    let aDiv = document.createElement('div');
    aDiv.classList.add('col-sm-10');

    aDiv.innerHTML = `    
        <div class="card shadow-lg p-3">
            <div class="row align-items-center">
                <div class="col-sm-4">
                    <img src="${datas.image}" class="p-3 card-img-top" alt="...">
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <h5 class="card-title text-danger font-poppins fw-bold">${datas.name}</h5>
                        <p class="card-text">One of the best device of <strong> ${datas.brand}</strong>, <strong> ${datas.releaseDate ? datas.releaseDate : 'Not Released Yet'} </strong>. Features are breaking down bellow,</p>

                        <div class="row p-3 my-5 shadow">
                            <div class="col-sm-4">
                                <strong>Features</strong>
                                <ul class="list-unstyled">
                                    <li>ChipSet : ${datas.mainFeatures?.chipSet ? datas.mainFeatures?.chipSet : `Not Defined`}</li>
                                    <li>Memory : ${datas.mainFeatures?.memory ? datas.mainFeatures?.memory : `Not Defined`}</li>
                                    <li>Storage : ${datas.mainFeatures?.Storage ? datas.mainFeatures?.Storage : `Not Defined`}</li>
                                    <li>DisplaySize : ${datas.mainFeatures?.displaySize ? datas.mainFeatures?.displaySize : `Not Defined`}</li>
                                </ul>
                            </div>
                            <div class="col-sm-4">
                                <strong>Sensors</strong>
                                <ul class="list-unstyled">
                                    <li>Sensors-1 : ${datas.mainFeatures?.sensors[0] ? datas.mainFeatures?.sensors[0] : `Not Defined`}</li>
                                    <li>Sensors-2 : ${datas.mainFeatures?.sensors[1] ? datas.mainFeatures?.sensors[1] : `Not Defined`}</li>
                                    <li>Sensors-3 : ${datas.mainFeatures?.sensors[2] ? datas.mainFeatures?.sensors[2] : `Not Defined`}</li>
                                    <li>Sensors-4 : ${datas.mainFeatures?.sensors[3] ? datas.mainFeatures?.sensors[3] : `Not Defined`}</li>
                                    <li>Sensors-5 : ${datas.mainFeatures?.sensors[4] ? datas.mainFeatures?.sensors[4] : `Not Defined`}</li>
                                    <li>Sensors-6 : ${datas.mainFeatures?.sensors[5] ? datas.mainFeatures?.sensors[5] : `Not Defined`}</li>
                                </ul>
                            </div>
                            <div class="col-sm-4">
                                <strong>Others</strong>
                                <ul class="list-unstyled">
                                    <li>Bluetooth : ${datas.others?.Bluetooth ? datas.others?.Bluetooth : `Not Defined`}</li>
                                    <li>GPS : ${datas.others?.GPS ? datas.others?.GPS : `Not Defined`}</li>
                                    <li>NFC : ${datas.others?.NFC ? datas.others?.NFC : `Not Defined`}</li>
                                    <li>Radio : ${datas.others?.Radio ? datas.others?.Radio : `Not Defined`}</li>
                                    <li>USB : ${datas.others?.USB? datas.others?.USB:'No Data Found'}</li>
                                    <li>WLAN : ${datas.others?.WLAN ? datas.others?.WLAN : `Not Defined`}</li>
                                
                                </ul>
                            </div>
                        </div>

                        <p class="text-center">
                            <a href="#" class="btn btn-danger" onclick="deleteIt(event)" id="deleteSelf">Close</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    detailsOfPhone.appendChild(aDiv);
}

const deleteIt = (event) => {
    console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText = '');
}