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

            <!-- Accordian -->
            <div class="accordion" id="accordionExample">

            <!-- Breakfast Information -->
            <div id="breakfast">
                
            </div>

            <div id="lunch">
            <div class="accordion-item border-0 custom-shadow">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <h1 class="mb-0 title">Lunch</h1>
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            </div>

            <div id="dinner">
            <div class="accordion-item border-0 custom-shadow">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <h1 class="mb-0 title">Dinner</h1>
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            </div>

            </div>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Specific Menu Name Goes Here</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Ingredients/nutritional facts go here
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        `;

        $('#menu').html(menuHtml);

        getMenu(restaurantID);

        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function getMenu(restaurantID) {
    getBreakFast(restaurantID);
    // getLunch();
    // getDinner();
}

function getBreakFast(restaurantID) {
    $.ajax({
        type: 'GET',
        url: 'backend/getMenuByCategory.php',
        data: {restaurantID: restaurantID, category: 'Breakfast'},
        success: function(items) {
            console.log(items);

            const accordionHTML = `
            <div class="accordion-item border-0 custom-shadow">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h1 class="mb-0 title">Breakfast</h1>
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <table class="table table-hover table-borderless">
                    <thead>
                        <tr>
                        <th scope="col"><h4>THE KITCHEN</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td data-bs-toggle="modal" id=${item.itemID} data-bs-target="#exampleModal">
                                    <p class="mb-0">${item.name}</p>
                                    <p class="subtitle mb-0"><em>${item.details}</em></p>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            `;

            // Append HTML
            $('#breakfast').append(accordionHTML);

        },
        error: function(xhr, status, error) {
            console.error(error);
        }
        

    });
}

function getLunch() {

}

function getDinner() {

}