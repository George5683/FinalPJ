
// Below are variables
let tab1Next = document.getElementById('tab1-next');
let tab2Next = document.getElementById('tab2-next');
let tab3Next = document.getElementById('tab3-next');
let tab4Next = document.getElementById('tab4-next');
let tab5Next = document.getElementById('tab5-next');

let tab2Previous = document.getElementById('tab2-previous');
let tab3Previous = document.getElementById('tab3-previous');
let tab4Previous = document.getElementById('tab4-previous');
let tab5Previous = document.getElementById('tab5-previous');
let tab6Previous = document.getElementById('tab6-previous');

let tab1 = document.getElementById('tab-1-section');
let tab2 = document.getElementById('tab-2-section');
let tab3 = document.getElementById('tab-3-section');
let tab4 = document.getElementById('tab-4-section');
let tab5 = document.getElementById('tab-5-section');
let tab6 = document.getElementById('tab-6-section');

let tab1Header = document.getElementById('tab-1-btn');
let tab2Header = document.getElementById('tab-2-btn');
let tab3Header = document.getElementById('tab-3-btn');
let tab4Header = document.getElementById('tab-4-btn');
let tab5Header = document.getElementById('tab-5-btn');
let tab6Header = document.getElementById('tab-6-btn');

let getthings = document.getElementById('get-things');
let getServices = document.getElementById('get-services');
// Below are functions

tab1Next.onclick = function() {
    tab1.style.display = 'none';
    tab1Header.classList.remove('active');
    tab2Header.classList = "active";
    tab2.style.display = 'block';
}
tab2Next.onclick = function() {
    tab2.style.display = 'none';
    tab2Header.classList.remove('active');
    tab3Header.classList = "active";
    tab3.style.display = 'block';
}
tab3Next.onclick = function() {
    tab3.style.display = 'none';
    tab3Header.classList.remove('active');
    tab4Header.classList = "active";
    tab4.style.display = 'block';
}
tab4Next.onclick = function() {
    tab4.style.display = 'none';
    tab4Header.classList.remove('active');
    tab5Header.classList = "active";
    tab5.style.display = 'block';
}
tab5Next.onclick = function() {
    tab5.style.display = 'none';
    tab5Header.classList.remove('active');
    tab6Header.classList = "active";
    tab6.style.display = 'block';
}

tab2Previous.onclick = function() {
    tab2.style.display = 'none';
    tab2Header.classList.remove('active');
    tab1Header.classList = 'active';
    tab1.style.display = 'block';
}

tab3Previous.onclick = function() {
    tab3.style.display = 'none';
    tab3Header.classList.remove('active');
    tab2Header.classList = 'active';
    tab2.style.display = 'block';
}
tab4Previous.onclick = function() {
    tab4.style.display = 'none';
    tab4Header.classList.remove('active');
    tab3Header.classList = 'active';
    tab3.style.display = 'block';
}
tab5Previous.onclick = function() {
    tab5.style.display = 'none';
    tab5Header.classList.remove('active');
    tab4Header.classList = 'active';
    tab4.style.display = 'block';
}
tab6Previous.onclick = function() {
    tab6.style.display = 'none';
    tab6Header.classList.remove('active');
    tab5Header.classList = 'active';
    tab5.style.display = 'block';
}

getthings.onclick = function() {

}
getServices.onclick = async function () {
    const currentService = await fetchData('/Services');
    const serviceBox = document.getElementById('service-results');
    serviceBox.innerText = currentService;
}




// Function to send a GET request to the specified endpoint
async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}