let searchInputTag = document.querySelector('#searchInputTag');
let searchBtnTag = document.querySelector('#searchBtnTag');
let resultsField = document.querySelector('#resultsField');
let noOfResults = document.querySelector('#noOfResults');
let detailsOfPhone = document.querySelector('#detailsOfPhone');



// function for toggle
const toggle = (id, cssProperty) => {
    document.getElementById(id).style.display = cssProperty;
}

// hide spinner-alert messages
toggle('spinner', 'none'); // hide spinner
toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
toggle('alert4NoResult', 'none'); // hide alert4NoResult
toggle('alert4Results', 'none'); // hide alert4Results
toggle('detailsExplored', 'none'); // hide detailsExplored
toggle('searchResults', 'none'); // hide searchResults

searchBtnTag.addEventListener('click', () => {
    toggle('spinner', 'block'); // show spinner

    let searchText = searchInputTag.value;
    searchInputTag.value = '';

    if (searchText.length > 0) {

        // for valid key
        let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
            .then(response => response.json())
            .then(jsonData => displayJsonData(jsonData.data));
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

const displayJsonData = (datas) => {
    resultsField.innerText = '';
    let results = datas.slice(0, 20);

    if (results.length == 0) {

        // for no results
        toggle('alert4NoResult', 'block'); // show alert4NoResult
        toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
        toggle('searchResults', 'none'); // hide searchResults
        toggle('alert4Results', 'none'); // hide alert4Results
        toggle('detailsExplored', 'none'); // hide detailsExplored
    } else {

        // for results        
        toggle('searchResults', 'block'); // show searchResults

        toggle('alert4NoResult', 'none'); // hide alert4NoResult
        toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
        toggle('alert4Results', 'block'); // show alert4Results
        toggle('detailsExplored', 'none'); // hide detailsExplored

        // show no of results found
        noOfResults.innerText = results.length

        // show results in the results field
        results.forEach(element => {
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
    
    <div class="card shadow p-3">
    <div class="row align-items-center">
        <div class="col-sm-4">
            <img src="${datas.image}" class="p-3 card-img-top" alt="...">
        </div>
        <div class="col-sm-8">
            <div class="card-body">
                <h5 class="card-title">${datas.name}</h5>
                <p class="card-text">One of the best phone of <strong> ${datas.brand} </strong>
                    released on <strong> ${datas.releaseDate ? datas.releaseDate : 'Not Released Yet'} </strong>. Features are breaking down bellow,</p>

                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Features</th>
                            <th scope="col">Sensors</th>
                            <th scope="col">Others</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>${datas.mainFeatures.chipSet}</td>
                            <td>${datas.mainFeatures.sensors[0]}</td>
                            <td>${datas.others.Bluetooth}</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>${datas.mainFeatures.memory}</td>
                            <td>${datas.mainFeatures.sensors[1]}</td>
                            <td>${datas.others.GPS}</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>${datas.mainFeatures.storage}</td>
                            <td>${datas.mainFeatures.sensors[2]}</td>
                            <td>${datas.others.NFC}</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>${datas.mainFeatures.displaySize}</td>
                            <td>${datas.mainFeatures.sensors[3]}</td>
                            <td>${datas.others.Radio}</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td></td>
                            <td>${datas.mainFeatures.sensors[4]}</td>
                            <td>${datas.others.USB}</td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td></td>
                            <td>${datas.mainFeatures.sensors[5]}</td>
                            <td>${datas.others.WLAN}</td>
                        </tr>
                    </tbody>
                </table>

                <p class="text-center">
                    <a href="#" class="btn btn-primary" onclick="deleteIt(event)" id="deleteSelf">Delete</a>
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