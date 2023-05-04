$(document).ready(function() {
    // When a menu item is clicked, this triggers a function
    // that will dynamically generate the modal.
    $('#menu').on('click', '.menu-item', function() {
        itemID = $(this).data('itemid');
        itemName = $(this).data('itemname');
        getMenuItemDetails(itemID, itemName);
    });    
});

function getRestaurant(restaurantID) {
    // Retrieve location data using locationId
    $.ajax({
        type: 'GET',
        url: 'backend/getRestaurant.php',
        data: {id: restaurantID},
        success: function(data) {
            const restaurant = data;
            console.log(restaurant);

            const orderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let scheduleHtml = '';

            if (restaurant.hours) {
                const schedule = JSON.parse(restaurant.hours);
                scheduleHtml = `
                    <div class="text-center">
                    ${orderedDays.map(day => `<p>${day}: ${schedule[day]}</p>`).join('')}
                    </div>
                `;
            }

            // Generate HTML dynamically
            const menuHtml = `
                <div class="mt-3 mb-3">
                <div class="container">
                    <h1 class="mt-4 text-center" id="menu-title">${restaurant.name}</h1>
                    <h3 class="text-center mb-4">Weekly Schedule</h3>
                    ${scheduleHtml}
                </div>
                </div>

                <!-- Dropdowns -->
                <div class="dropdown mb-3">
                <button class="btn btn-secondary dropdown-toggle border-0 custom-shadow" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Day
                </button>
                <ul class="dropdown-menu border-0 custom-shadow">
                    <li><a class="dropdown-item" href="#">Yesterday</a></li>
                    <li><a class="dropdown-item" href="#">Today</a></li>
                    <li><a class="dropdown-item" href="#">Tomorrow</a></li>
                </ul>
                <button class="btn btn-secondary dropdown-toggle border-0 custom-shadow" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                </button>
                <ul class="dropdown-menu border-0 custom-shadow">
                    <li><a class="dropdown-item" href="#">Vegetarian</a></li>
                    <li><a class="dropdown-item" href="#">Vegan</a></li>
                    <li><a class="dropdown-item" href="#">Avoiding Gluten</a></li>
                </ul>
                </div>

                <!-- Accordion -->
                <div class="accordion mb-3" id="accordionExample">

                    <div id="accordionHTML">

                    </div>

                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div id="item-details">
                    <div class="modal-content">
                        
                    </div>
                    </div>
                </div>
                </div>
            `;

            $('#menu').html(menuHtml);

            // Display restaurant-specific menu
            getMenu(restaurantID, restaurant.categories);

        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

async function getMenu(restaurantID, categories) {
    const categoriesArray = categories.split(",");
    console.log(categoriesArray);

    for (const category of categoriesArray) {
        await getMenuDetails(restaurantID, category);
    }
}

async function getMenuDetails(restaurantID, category) {
    // Get all the meal types (The Kitchen, Gator Fire Grill, etc.)
    mealTypes = await getMealTypes(restaurantID, category);
    console.log(mealTypes)

    $.ajax({
        type: 'GET',
        url: 'backend/getMenuByCategory.php',
        data: {restaurantID: restaurantID, category: category},
        success: function(items) {
            console.log(items);

            const accordionHTML = `
            <div class="accordion-item border-0 custom-shadow">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${category}" aria-expanded="true" aria-controls="${category}">
                    <h1 class="mb-0 title">${category}</h1>
                    </button>
                </h2>
                <div id="${category}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        ${mealTypes.map(mealType => {
                            const filteredItems = items.filter(item => item.mealType === mealType);
                            return `
                            <table class="table table-hover table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col"><h4>${mealType}</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${filteredItems.map(item => `
                                    <tr>
                                    <td data-bs-toggle="modal" id=${item.itemID} data-bs-target="#exampleModal" class="menu-item" data-itemid="${item.itemID}" data-itemname="${item.name}">
                                        <p class="mb-0">${item.name}</p>
                                        <p class="subtitle mb-0"><em>${item.details}</em></p>
                                    </td>
                                    </tr>
                                `).join('')}
                                </tbody>
                            </table>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
            `;

            $('#accordionHTML').append(accordionHTML);
            openCurrCategory(category.replace(/ /g, '-'));
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function getMealTypes(restaurantID, category) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: 'backend/getMenuByMealType.php',
        data: { restaurantID: restaurantID, category: category },
        success: function (mealTypes) {
          console.log(mealTypes);
          resolve(mealTypes);
        },
        error: function (xhr, status, error) {
          console.error(error);
          reject(error);
        }
      });
    });
}

function getMenuItemDetails(itemID, itemName) {
    // Clear the item-details modal that was previously rendered
    $('#item-details').empty();

    $.ajax({
        type: 'GET',
        url: 'backend/getMenuItemDetails.php',
        data: { itemID: itemID },
        success: function(selectedItem) {
            console.log(selectedItem);
            nutrition = JSON.parse(selectedItem.nutrition);
            diet = selectedItem.diet.split(",");
            
            const modalHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${itemName}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3>Nutritional Info</h3>
                        <ul>
                            ${Object.keys(nutrition[0]).map((key) => {
                                return `<li>${key}: ${nutrition[0][key]}</li>`
                            }).join('')}
                        </ul>

                        <h3>Ingredients</h3>
                        <p>${selectedItem.ingredients}</p>
                        
                        <h3>Dietary Preferences</h3>
                        <ul>
                            ${diet.map((preference) => `<li>${preference}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            `;
        
            $('#item-details').append(modalHTML);

        },
        error: function (xhr, status, error) {
            console.error(error);

            const modalHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${itemName}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3>No nutritional information to display.</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            `;
        
            $('#item-details').append(modalHTML);
        }
    });
}

function openCurrCategory(category) {
    // Get current time and open the corresponding category accordion
    const today = new Date();
    const currentHour = today.getHours();
    let currCategory;

    if (currentHour >= 11 && currentHour < 15) // 11am – 3pm
        currCategory = 'Lunch';
    else if (currentHour >= 15 && currentHour < 23) // 3pm - 11pm
        currCategory = 'Dinner';
    else
        currCategory = 'Breakfast';

    if (category === currCategory || category === 'Every-Day')
        $(`#${category}`).collapse('show');
}