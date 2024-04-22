
// Below are variables
let ServicesAvailable;

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

let getThings = document.getElementById('get-things');
let getServices = document.getElementById('get-services');
let getRelationships = document.getElementById('get-relationships');

let submitbtn_type1 = document.getElementById('submittype1');
let submitbtn_type2 = document.getElementById('submittype2');
let submitbtn_type3 = document.getElementById('submittype3');


let getApps = document.getElementById('get-apps');
let putApps = document.getElementById('put-apps');

let randomBtn = document.getElementById('randombtn');

// Below are functions
tab1Header.onclick = function() {
    tab1.style.display = 'block';
    tab2.style.display = 'none';
    tab3.style.display = 'none';
    tab4.style.display = 'none';
    tab5.style.display = 'none';
    tab6.style.display = 'none';
    tab1Header.classList = 'active';
    tab2Header.classList.remove('active');
    tab3Header.classList.remove('active');
    tab4Header.classList.remove('active');
    tab5Header.classList.remove('active');
    tab6Header.classList.remove('active');
}
tab2Header.onclick = function() {
    tab2.style.display = 'block';
    tab1.style.display = 'none';
    tab3.style.display = 'none';
    tab4.style.display = 'none';
    tab5.style.display = 'none';
    tab6.style.display = 'none';
    tab2Header.classList = 'active';
    tab1Header.classList.remove('active');
    tab3Header.classList.remove('active');
    tab4Header.classList.remove('active');
    tab5Header.classList.remove('active');
    tab6Header.classList.remove('active');
}
tab3Header.onclick = function() {
    tab3.style.display = 'block';
    tab1.style.display = 'none';
    tab2.style.display = 'none';
    tab4.style.display = 'none';
    tab5.style.display = 'none';
    tab6.style.display = 'none';
    tab3Header.classList = 'active';
    tab1Header.classList.remove('active');
    tab2Header.classList.remove('active');
    tab4Header.classList.remove('active');
    tab5Header.classList.remove('active');
    tab6Header.classList.remove('active');
}
tab4Header.onclick = function() {
    tab4.style.display = 'block';
    tab1.style.display = 'none';
    tab2.style.display = 'none';
    tab3.style.display = 'none';
    tab5.style.display = 'none';
    tab6.style.display = 'none';
    tab4Header.classList = 'active';
    tab1Header.classList.remove('active');
    tab2Header.classList.remove('active');
    tab3Header.classList.remove('active');
    tab5Header.classList.remove('active');
    tab6Header.classList.remove('active');

}
tab5Header.onclick = function() {
    tab5.style.display = 'block';
    tab1.style.display = 'none';
    tab2.style.display = 'none';
    tab3.style.display = 'none';
    tab4.style.display = 'none';
    tab6.style.display = 'none';
    tab5Header.classList = 'active';
    tab1Header.classList.remove('active');
    tab2Header.classList.remove('active');
    tab3Header.classList.remove('active');
    tab4Header.classList.remove('active');
    tab6Header.classList.remove('active');
}
tab6Header.onclick = function() {
    tab6.style.display = 'block';
    tab1.style.display = 'none';
    tab2.style.display = 'none';
    tab3.style.display = 'none';
    tab4.style.display = 'none';
    tab5.style.display = 'none';
    tab6Header.classList = 'active';
    tab1Header.classList.remove('active');
    tab2Header.classList.remove('active');
    tab3Header.classList.remove('active');
    tab4Header.classList.remove('active');
    tab5Header.classList.remove('active');
}


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



submitbtn_type1.onclick = async function () {
    const AvailableServices = await fetchData('/Services');
    let type1A= document.getElementById('Type1-A').value;
    let type1B= document.getElementById('Type1-B').value;
    let type1C= document.getElementById('Type1-C').value;

}
submitbtn_type2.onclick = async function () {
    let type2A= document.getElementById('Type2-A').value;
    let type2B= document.getElementById('Type2-B').value;
}

submitbtn_type3.onclick = async function () {
    let type3A= document.getElementById('Type3-A').value;
    let type3B= document.getElementById('Type3-B').value;
    // for conditions, its either on or off (potentiometer is half way is on (output = 1), otherwise off (Output = 0))
    let condition = document.getElementById('condition').value;
}

getServices.onclick = async function () {
    const currentService = await fetchData('/Services');
  
    const serviceBox = document.getElementById('service-results');

    //serviceBox.innerHTML = ""; // Clear previous content
    const serviceNames = [];

    // Check if currentService is an array with data
    if (Array.isArray(currentService) && currentService.length > 0) {
    serviceBox.innerHTML = ""; // Clear previous content (only if data exists)
    } else {
    // Handle no data scenario (optional)
    serviceBox.innerHTML = "No Services Found"; // Example message
    }
  
      // Loop through each service object in the array
      currentService.forEach((service) => {

      // Add the service name to the serviceNames array
      serviceNames.push(service.Name);
    
      // Create a new element for each service
      const serviceElement = document.createElement('div');
      serviceElement.classList.add('service'); // Add a CSS class for styling
  
      // Extract and display each feature
      const features = `
        <h2>Name: ${service.Name}</h2>
        <p>ThingID: ${service.ThingID}</p>
        <p>EntityID: ${service.EntityID}</p>
        <p>SpaceID: ${service.SpaceID}</p>
        <p>Vendor: ${service.Vendor}</p>
        <p>API: ${service.API}</p>
        <p>Type: ${service.Type}</p>
        <p>AppCategory: ${service.AppCategory}</p>
        <p>Description: ${service.Description}</p>
        <p>Keywords: ${service.Keywords}</p>
      `;
  
      serviceElement.innerHTML = features; // Set the content of the service element
  
      // Append the service element to the serviceBox
      serviceBox.appendChild(serviceElement);

      serviceNames = ServicesAvailable;
    });
  };

getThings.onclick = async function () {
    const currentThing = await fetchData('/Things');
  
    const thingBox = document.getElementById('thing-results');
    //thingBox.innerHTML = ""; // Clear previous content

    // Check if currentThing is an array with data
    if (Array.isArray(currentThing) && currentThing.length > 0) {
    thingBox.innerHTML = ""; // Clear previous content (only if data exists)
    } else {
    // Handle no data scenario (optional)
    thingBox.innerHTML = "No Things Found"; // Example message
    }
  
    // Loop through each thing object in the array
    currentThing.forEach((thing) => {
      // Create a new element for each thing
      const thingElement = document.createElement('div');
      thingElement.classList.add('thing'); // Add a CSS class for styling
  
      // Extract and display each feature
      const features = `
      <h2>Name: ${thing.Name}</h2>
      <p>ThingID: ${thing.ThingID}</p>
      <p>SpaceID: ${thing.SpaceID}</p>
      <p>Model: ${thing.Model}</p>
      <p>Vendor: ${thing.Vendor}</p>
      <p>Owner: ${thing.Owner}</p>
      <p>Description: ${thing.Description}</p>
      <p>OS: ${thing.OS}</p>
      `;
  
      thingElement.innerHTML = features; // Set the content of the thing element
  
      // Append the thing element to the thingBox
      thingBox.appendChild(thingElement);
    });
  };

getRelationships.onclick = async function () {
    const currentRelationship = await fetchData('/Relationships');
  
    const relationshipBox = document.getElementById('relationship-results');
    //relationshipBox.innerHTML = ""; // Clear previous content

    // Check if currentRelationship is an array with data
    if (Array.isArray(currentRelationship) && currentRelationship.length > 0) {
    relationshipBox.innerHTML = ""; // Clear previous content (only if data exists)
    } else {
    // Handle no data scenario (optional)
    relationshipBox.innerHTML = "No Relationships Found"; // Example message
    }
  
    // Loop through each relationship object in the array
    currentRelationship.forEach((relationship) => {
      // Create a new element for each relationship
      const relationshipElement = document.createElement('div');
      relationshipElement.classList.add('relationship'); // Add a CSS class for styling
  
      // Extract and display each feature
      const features = `
        <h2>ThingID: ${relationship.ThingID}</h2>
        <p>SpaceID: ${relationship.SpaceID}</p>
        <p>Name: ${relationship.Name}</p>
        <p>Owner: ${relationship.Owner}</p>
        <p>Category: ${relationship.Category}</p>
        <p>Type: ${relationship.Type}</p>
        <p>Description: ${relationship.Description}</p>
      `;
  
      relationshipElement.innerHTML = features; // Set the content of the relationship element
  
      // Append the relationship element to the relationshipBox
      relationshipBox.appendChild(relationshipElement);
    });
  }

  getApps.onclick = async function () {
    const serviceBox = document.getElementById('app-results');
    const currentServices = await fetchData('/Saves');
    console.log(JSON.stringify(currentServices));

    serviceBox.innerHTML = ""; // Clear previous content

    currentServices.forEach((app, index) => {
        // Create a new div for each app
        const appElement = document.createElement('div');

        // Create a template string for the app data
        const appData = `
          <h2>${app.AppName}</h2>
          <button id="btn-activate-${index}" class="get">Activate</button>
          <button id="btn-stop-${index}" class="get">Stop</button>
          <button id="btn-delete-${index}" class="get">Delete</button>
          <button id="btn-save-${index}" class="get">Save</button>
          <button id="btn-editor-${index}" class="get">Editor</button>
          <!-- Add more properties as needed -->
        `;

        // Set the content of the app element
        appElement.innerHTML = appData;

        // Append the app element to the serviceBox
        serviceBox.appendChild(appElement);

        // Add onclick events to the buttons
        document.getElementById(`btn-activate-${index}`).onclick = function() {
            console.log(`Activate button clicked for app ${index}`);
        
            // Create the JSON data
            const data = { appName: app.AppName };
        
            // Send the JSON data to the endpoint
            fetch('/App-Activate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
        document.getElementById(`btn-stop-${index}`).onclick = function() {
            console.log(`Stop button clicked for app ${index}`);

            // Create the JSON data
            const data = { appName: app.AppName };
        
            // Send the JSON data to the endpoint
            fetch('/App-Stop', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            // Add your code here
        };
        document.getElementById(`btn-delete-${index}`).onclick = function() {
            console.log(`Delete button clicked for app ${index}`);
            // Create the JSON data
            const data = { appName: app.AppName };
        
            // Send the JSON data to the endpoint
            fetch('/App-Delete', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });

            // Remove the app element from the serviceBox
            serviceBox.removeChild(appElement);
            // Add your code here
        };
        document.getElementById(`btn-save-${index}`).onclick = function() {
            console.log(`Save button clicked for app ${index}`);

            // Create the JSON data
            const data = { appName: app.AppName };
        
            // Send the JSON data to the endpoint
            fetch('/App-Save', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            // Add your code here
        };
        document.getElementById(`btn-editor-${index}`).onclick = function() {
            console.log(`Editor button clicked for app ${index}`);

            // Create the JSON data
            const data = { appName: app.AppName };
        
            // Send the JSON data to the endpoint
            fetch('/App-Editor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            tab4.style.display = 'block';
            tab1.style.display = 'none';
            tab2.style.display = 'none';
            tab3.style.display = 'none';
            tab5.style.display = 'none';
            tab6.style.display = 'none';
            tab4Header.classList = 'active';
            tab1Header.classList.remove('active');
            tab2Header.classList.remove('active');
            tab3Header.classList.remove('active');
            tab5Header.classList.remove('active');
            tab6Header.classList.remove('active');
            // Add your code here
        };
    });
}
/*
putApps.onclick = async function() {
    const data = {
        service1: "empty",
        service2: "empty",
        inputField: "empty"
    };
    try {

        const response = await fetch('/doservice', {
            method: 'PUT', // Use PUT method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
        } else {
            console.error('Server responded with error:', response.statusText);
        }

    } catch (error) {
        console.error('Error occurred while sending data to server:', error);
    }
}
*/

randomBtn.onclick = async function(){
    let message = {
        AppName: 'madetext'
    };
    const reply = await putfetchData('/StartApp', message);

}

/*
    getApps.onclick = async function () {
    const currentService = await fetchData('/Saves');
    const serviceBox = document.getElementById('app-results');
    serviceBox.innerText = currentService;
 */
async function putfetchData(endpoint, data){
    try {
        const response = await fetch(endpoint, {
            method: 'PUT', // Use PUT method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const data2 = await response.json();
        return data2;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
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

