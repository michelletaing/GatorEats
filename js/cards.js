// Mock data (temp)
var mockData = [
    { name: 'Gator Corner Dining Center', description: 'Description', imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', location: "Gator Corner" },
    { name: 'Broward Dining', description: 'Description', imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', location: "Broward Hall" },
    { name: 'Chick-Fil-A', description: 'Description', imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', location: "The Hub" },
    { name: 'Panda Express', description: 'Description', imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', location: "Reitz Union" },
    { name: 'Burger 352', description: 'Description', imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', location: "Reitz Union" },
    { name: 'Mi Apa', description: 'Description', imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', location: "Reitz Union" }
];

function createCards(container, location) {
    // Retrieve data (replace with call to backend)
    var diningLocations = [];

    $.ajax({
        type: 'GET',
        url: 'backend/getRestaurants.php',
        success: function(data) {
            diningLocations = data;
            console.log(diningLocations);

            // Filter dining locations by location parameter, if present
            if (location) {
                diningLocations = diningLocations.filter(function(diningLocation) {
                    return diningLocation.location === location;
                });
            }

            // Clear card container
            container.empty();

            // Create cards
            $.each(diningLocations, function(index, location) {
                // HTML string to structure card
                var card = '<div class="col">' +
                '<a href="menu.html?location=' + location.name.replace(/ /g, '-') + '&id=' + location.restaurantID + '">' +
                    '<div class="card border-0 custom-shadow" id="' + location.restaurantID + '">' +
                    '<img src="' + location.image + '" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                        '<h5 class="card-title">' + location.name + '</h5>' +
                        '<p class="card-text"><i class="fa-sharp fa-solid fa-location-dot"></i> ' + location.description + '</p>' +
                    '</div>' +
                    '</div>' +
                '</a>' +
                '</div>';

                // Create jQuery object from HTML string
                var cardElement = $(card);

                // Add card to container
                container.append(cardElement);
            });
        },
        error: function(xhr, status, error) {
          console.error(error);
        }
    });
}