let searchInputTag = document.querySelector('#searchInputTag');
let searchBtnTag = document.querySelector('#searchBtnTag');
let resultsField = document.querySelector('#resultsField');
let noOfResults = document.querySelector('#noOfResults');

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
    } else {

        // for results        
        toggle('searchResults', 'block'); // show searchResults

        toggle('alert4NoResult', 'none'); // hide alert4NoResult
        toggle('alert4ValidKey', 'none'); // hide alert4ValidKey
        toggle('alert4Results', 'block'); // show alert4Results

        noOfResults.innerText = results.length

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
            <a href="#" class="btn btn-primary" id="explore">Explore</a>
        </div>
    </div>
        `
            resultsField.appendChild(aDiv);
        });
    }



    toggle('spinner', 'none'); // hide spinner

    console.log(results);
    // console.log(element.image);
    // console.log(element.phone_name);
    // console.log(element.brand);
    // console.log(element.slug);
}