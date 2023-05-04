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

            // Links of external menus
            var externalMenus = [
                { name: 'Create', url: 'https://dineoncampus.com/files/section_documents/dfc26474-acfe-4533-be7a-d867c7000667.pdf' },
                { name: "Fat G's", url: 'https://dineoncampus.com/files/section_documents/74eeeb95-52eb-4fd0-9226-4ec255c3cb3a.pdf' },
                { name: 'Firehouse Subs', url: 'https://dineoncampus.com/files/section_documents/2201b317-35f5-489c-843c-f75990ec968b.pdf' },
                { name: 'Melt Lab', url: 'https://dineoncampus.com/files/section_documents/7ca17d26-568d-4867-8d68-e8fbf203bfb0.pdf' },
                { name: 'Mi Apa', url: 'https://dineoncampus.com/files/section_documents/f077fe07-00d5-4d95-a0e7-33bff9293d8e.pdf' },
                { name: 'Subway', url: 'https://dineoncampus.com/files/section_documents/bf39b079-451a-433f-969b-0eae4323f7c8.pdf' },
                { name: 'Sweet Berries', url: 'https://dineoncampus.com/files/section_documents/82fd5fcb-e194-4d47-a274-c1339b469036.pdf' },
                { name: 'Wild Blue Sushi', url: 'https://dineoncampus.com/files/section_documents/45a203e9-dbf1-475c-9d2c-bdfcb39d19fa.pdf' },
                { name: 'Big Island Bowls', url: 'https://www.bigislandbowls.com/s/order?location=11ea6a5765a330a5bd870cc47a2b63e4' },
                { name: 'Chick-Fil-A', url: 'https://www.chick-fil-a.com/menu' },
                { name: 'Einstein Bros. Bagels', url: 'https://www.einsteinbros.com/menu/' },
                { name: 'Panda Express', url: 'https://www.pandaexpress.com/?showMenu=true' },
                { name: 'Shake Smart', url: 'https://shakesmart.com/menu/' },
                { name: 'Starbucks', url: 'https://www.starbucks.com/menu' }
            ];

            // Create cards
            $.each(diningLocations, function(index, diningLocation) {
                // Create link to menu
                var link = 'menu.html?location=' + diningLocation.name.replace(/ /g, '-') + '&id=' + diningLocation.restaurantID;

                // Update link if using external menu
                for (let i = 0; i < externalMenus.length; i++) {
                    if (diningLocation.name.includes(externalMenus[i].name)) {
                        link = externalMenus[i].url + '" target="_blank';
                        break;
                    }
                }

                // HTML string to structure card
                var card = '<div class="col">' +
                '<a href="' + link + '">' +
                    '<div class="card border-0 custom-shadow" id="' + diningLocation.restaurantID + '">' +
                    '<img src="' + diningLocation.image + '" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                        '<h5 class="card-title">' + diningLocation.name + '</h5>' +
                        '<p class="card-text"><i class="fa-sharp fa-solid fa-location-dot"></i> ' + diningLocation.description + '</p>' +
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