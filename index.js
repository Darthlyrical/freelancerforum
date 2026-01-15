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
    //this resets the array to be empty before repopulating 
    arrFreelancers.length = 0;
    // using less than since my index is starting at 0. If it were starting at 1 then I would use i <= 100
    for (let i = 0; i < NUM_FREELANCERS; i++) {
        //per every number of freelancers, I want to invoke the object building code and push it to the array list of freelancers(arrFreelancers)
        arrFreelancers.push(freelancerObj())
        //this code doesn't return anything because it is being used to mutate the array arrFreelancers. 
    }
}

function getAvgRate() {
    //my accumulator
    let total = 0
    //for every element/index in the array (which is a list of objects containing the freelancers name, occ, and rate).
    arrFreelancers.forEach((element) => {
        //take total and add the rate of each element/object. 
        total += element.rate
    })
    //return the average by taking the accumulated total and dividing it by the length(number of objects) in the array arrFreelancers. 
    return (total / arrFreelancers.length)
}


function freelancerObj() {
    // Below I built 3 variable to help me randomly pull elements from arrays NAMES and OCCUPATIONS while using the rates
    // between the min and max ranges(randomly)
    // ranName is using the const NAMES array to randomly select an element in the list. Math.floor wrap rounds the number down to a whole number. 
    let ranName = NAMES[Math.floor(Math.random() * NAMES.length)];
    // ranOcc has the same concept as ranName but for the list of occupations
    let ranOcc = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
    // ranRate takes the min and max values in the object PRICE_RANGE. max - min gives you the range between the two numbers but it is not inclusive of the max number
    // +1 is necessary to make the max number inclusive. The + PRICE_RANGE.min outside of the Math.floor is needed to move the range upward to meet the min standards. 
    let ranRate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) + PRICE_RANGE.min;

    // I returned a new object with key:value pairs set according to the requirements
    return { name: ranName, occupation: ranOcc, rate: ranRate }

}


// ===Component=== 


// reusable component that takes specific values from an object and lays them out in a table row format
function freelanceRow({ name, occupation, rate }) {
    //$tableRow is a variable that'll invoke a method to createElement(an HTML tag/element) like so <tr></tr>
    const $tableRow = document.createElement('tr');
    //innerHTML injects the string within the backtick to the HTML element/tag <tr></tr>
    $tableRow.innerHTML = ` 
        <td>${name}</td>
        <td>${occupation}</td>
        <td>$${rate}</td> `;
    // then returns the completed node
    return $tableRow;
}

function tableOfFreelancers() {
    // variable $tbody invokes dom method createElement to create an HTML tag for 'tbody' which goes inside a table<table> tag. Reference the render code to see the full table build.
    const $tbody = document.createElement('tbody');
    //map creates a new array out of all the elements inside an array by using a function(passed as an argument). $listOfFreelancer will then be a new array container
    //  with each element in the format of $tableRow(reference freelanceRow())
    const $listOfFreelancer = arrFreelancers.map(freelanceRow);
    // replaceChildren is a dom method that allows us to replace ALL(clears all existing children and replaces with new ones). ...$listOfFreelancer takes every element in that array and adds them to the body of the table(tbody)
    // each one of those elements looks like this thanks to function freelanceRow
    //<tr>
    // <td> ${name}</td>
    // <td>${occupation}</td>
    // <td>$${rate}</td>
    //</tr>
    $tbody.replaceChildren(...$listOfFreelancer);
    //This returns the full table ready to be rendered. 
    $tbody.id = 'RowsOfFreelancers';
    return $tbody;
}

function avgRateOfAll() {
    // makes an html tag <p> and assigns it to $p variable
    const $p = document.createElement('p');
    //textContent is a dom method that injects text into tag element. the backticks and ${} create a template literal which will take the function result and insert it into the strings. 
    $p.textContent = `The average rate is $${avgFreelancerRate.toFixed(2)}.`;
    //returns the ready to render <p></p> node
    return $p;
}




// This render is going to first generate a list of freelancers using function listOfFreelancers(). then it will assign a value to avgFreelancerRate by invoking getAvgRate(). 
// const $app is the initial rendering of the html which is being inserted into the div tagged id=app(#app)
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
        <tbody id="RowsOfFreelancers"></tbody>
    </table>
`;

// here is where the magic happens. these two lines are taking the two elements <bsthingy> and #RowsOfFreelancers and replacing them with the reusable containers made in functions avgRateOfAll() and tableOfFreelancers().
    $app.querySelector('bsthingy').replaceWith(avgRateOfAll());
    $app.querySelector("#RowsOfFreelancers").replaceWith(tableOfFreelancers());


}
//renders the state everytime the website is either loaded or refreshed. 
render();


