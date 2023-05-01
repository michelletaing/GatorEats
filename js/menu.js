$(document).ready(function() {
    // When a menu item is clicked, this triggers a function
    // that will dynamically generate the modal.
    $('#menu').on('click', '.menu-item', function() {
        itemID = $(this).data('itemid');
        getMenuItemDetails(itemID);
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

        // Generate HTML dynamically
        const menuHtml = `
            <div class="mt-3 mb-3">
            <div class="container">
                <h1 class="mt-4 text-center" id="menu-title">${restaurant.name}</h1>
                <h3 class="text-center mb-4">Weekly Schedule</h2>
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

                <div class="accordion-item border-0 custom-shadow">
                    <h2 class="accordion-header">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#breakfast" aria-expanded="true" aria-controls="breakfast">
                        <h1 class="mb-0 title">Breakfast</h1>
                      </button>
                    </h2>
                    <div id="breakfast" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="Breakfast-details">
                            
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="accordion-item border-0 custom-shadow">
                    <h2 class="accordion-header">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#lunch" aria-expanded="false" aria-controls="lunch">
                        <h1 class="mb-0 title">Lunch</h1>
                      </button>
                    </h2>
                    <div id="lunch" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="Lunch-details">
                            
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item border-0 custom-shadow">
                    <h2 class="accordion-header">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#dinner" aria-expanded="false" aria-controls="dinner">
                        <h1 class="mb-0 title">Dinner</h1>
                      </button>
                    </h2>
                    <div id="dinner" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="Dinner-details">
                            
                            </div>
                        </div>
                    </div>
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
        getMenu(restaurantID);

        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

async function getMenu(restaurantID) {
    // Await all functions to ensure they execute one at a time
    await getMenuDetails(restaurantID, 'Breakfast');
    await getMenuDetails(restaurantID, 'Lunch');
    await getMenuDetails(restaurantID, 'Dinner');
}

async function getMenuDetails(restaurantID, category) {
    // Get all the meal types (The Kitchen, Gator Fire Grill, etc.)
    mealTypes = await getMealTypes(restaurantID, category);
    console.log(mealTypes)

    $.ajax({
        type: 'GET',
        url: 'https://cise.ufl.edu/~michelletaing/cis4930/gator-eats/backend/getMenuByCategory.php',
        data: {restaurantID: restaurantID, category: category},
        success: function(items) {
            console.log(items);

            // Display the menu in order of the meal types
            mealTypes.forEach(mealType => {
                const filteredItems = items.filter(item => item.mealType === mealType);
              
                const accordionHTML = `
                <table class="table table-hover table-borderless">
                    <thead>
                        <tr>
                            <th scope="col"><h4>${mealType}</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                    ${filteredItems.map(item => `
                        <tr>
                        <td data-bs-toggle="modal" id=${item.itemID} data-bs-target="#exampleModal" class="menu-item" data-itemid="${item.itemID}">
                            <p class="mb-0">${item.name}</p>
                            <p class="subtitle mb-0"><em>${item.details}</em></p>
                        </td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
                `;
              
                $(`#${category}-details`).append(accordionHTML);
              });
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
        url: 'https://cise.ufl.edu/~michelletaing/cis4930/gator-eats/backend/getMenuByMealType.php',
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

function getMenuItemDetails(itemID) {
    // Clear the item-details modal that was previously rendered
    $('#item-details').empty();

    // Mock data to be replaced by backend call
    mockItemDetails = [
        { itemID: 1, description: 'this is a list of mock ingredients for the french toasted waffle' },
        { itemID: 2, description: 'this is a list of mock ingredients for the egg whites' },
        { itemID: 3, description: 'this is a list of mock ingredients for the cheese omelet' },
        { itemID: 4, description: 'this is a list of mock ingredients for the baked potatoes' }
    ];

    const selectedItem = mockItemDetails.find(item => item.itemID === itemID);

    const modalHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${selectedItem.itemID}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ${selectedItem.description}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    `;
        
    $('#item-details').append(modalHTML);

}