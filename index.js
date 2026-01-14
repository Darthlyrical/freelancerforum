/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;


// ===State===
const arrFreelancers = [];
let avgFreelancerRate = undefined;

function listOfFreelancers() {

    arrFreelancers.length = 0;

    for (i = 0; i < NUM_FREELANCERS; i++) {
        arrFreelancers.push(freelancerObj())
    }
}

function getAvgRate() {
    let total = 0
    arrFreelancers.forEach((element) => {
        total += element.rate
    })
    return (total / arrFreelancers.length)
}


function freelancerObj() {
    // Below I built 3 variable to help me randomly pull elements from arrays NAMES and OCCUPATIONS while using the rates
    // between the min and max ranges(randomly)
    let ranName = NAMES[Math.floor(Math.random() * NAMES.length)];
    let ranOcc = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
    let ranRate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) + PRICE_RANGE.min;

    // I returned a new object with key:value pairs set according to the requirements
    return { name: ranName, occupation: ranOcc, rate: ranRate }

}


// ===Component=== 



function freelanceRow({ name, occupation, rate }) {
    const $tableRow = document.createElement('tr');
    $tableRow.innerHTML = ` 
        <td> ${name}</td>
        <td>${occupation}</td>
        <td>$${rate}</td> `;

        return $tableRow;
}

function tableOfFreelancers(){
    const $tbody = document.createElement('tbody');
    const $listOfFreelancer = arrFreelancers.map(freelanceRow);
    $tbody.replaceChildren(...$listOfFreelancer);
    return $tbody;
}

function avgRateOfAll() {
    const $p = document.createElement('p');
    $p.textContent = `The average rate is $${avgFreelancerRate.toFixed(2)}.`;
    return $p;
}





function render() {
    listOfFreelancers();
    avgFreelancerRate = getAvgRate();

    const $app = document.querySelector("#app");

    $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <bsthingy></bsthingy>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Occupation</th>
                <th>Rate</th>
            </tr>
        </thead>
        <tbody id="RowsOfFreelancers"><tbody>
    </table>
`;
    $app.querySelector('bsthingy').replaceWith(avgRateOfAll());
    $app.querySelector("#RowsOfFreelancers").replaceWith(tableOfFreelancers());


}

render();


