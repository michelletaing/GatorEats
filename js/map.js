function createMap() {
    // Initialize map
    var map = new L.Map('map', {
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        }
    }).setView([29.6463, -82.3478], 16);


    // Load maps -- other maps can be found here: https://leaflet-extras.github.io/leaflet-providers/preview/
    var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20
    });

    var CartoDB_VoyagerOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });


    // Control layers
    var layerControl = L.control.layers({
        'Default': CartoDB_VoyagerNoLabels,
        'Satellite': Esri_WorldImagery
    }, {
        'Labels': CartoDB_VoyagerOnlyLabels
    }).addTo(map);

    // Control sidebar key
    var sidebarControl = L.control({position: 'bottomleft'});
    sidebarControl.onAdd = function(map) {
        var button = L.DomUtil.create('button', 'sidebar-button btn btn-secondary');
        button.innerHTML = '<i class="fas fa-bars"></i> Key';
        button.onclick = function() {
            sidebar.toggle();
        };
        return button;
    };
    sidebarControl.addTo(map);

    // Format sidebar key
    var sidebarContent = '<h2 class="sidebar-title">Key</h2>';

    // Initialize the Leaflet Sidebar plugin and add it to the map
    var sidebar = L.control.sidebar('sidebar', {
        position: 'left'
    }).addTo(map);
    sidebar.setContent(sidebarContent);
    L.DomUtil.addClass(sidebar.getContainer(), 'sidebar-container');


    // Create markers
    var $markerList = $('<ul>')
        .addClass('list-group')
        .appendTo($('<div>').addClass('marker-list-container').appendTo(sidebar.getContainer()));
    $('<style>').html('.list-group-item:hover {cursor: pointer;}').appendTo($markerList.parent());

    createMarker("Broward Dining ", "Broward Hall", 29.6470013707062, -82.34130057318637, map, $markerList);
    createMarker("College of Veterinary Medicine", "College of Veterinary Medicine", 29.633291211911466, -82.34971217697066, map, $markerList);
    createMarker("Gator Corner Dining Center", "Gator Corner", 29.64802197734256, -82.35007793206672, map, $markerList);
    createMarker("Levin College of Law", "Levin Law", 29.649490931415606, -82.35904405713241, map, $markerList);
    createMarker("Library West", "Library West", 29.6512680840507, -82.34290443289392, map, $markerList);
    createMarker("Marston Science Library", "Marston Library", 29.648085853704796, -82.34384642078679, map, $markerList);
    createMarker("Newell Hall", "Newell Hall", 29.649101626325493, -82.34505776974727, map, $markerList);
    createMarker("Rawlings Hall", "Rawlings", 29.64625374767942, -82.34294851018656, map, $markerList);
    createMarker("Reitz Union", "Reitz Union", 29.646364274528647, -82.3477643199959, map, $markerList);
    createMarker("Shands Hospital", "Shands", 29.639944711575975, -82.3427951651843, map, $markerList);
    createMarker("Southwest Recreation Center", "Southwest Recreation Center", 29.638531773297153, -82.36824877685449, map, $markerList);
    createMarker("The Hub", "The Hub", 29.648177903466213, -82.34552207762731, map, $markerList);
    createMarker("Turlington Plaza", "Turlington Plaza", 29.64872043094608, -82.34452127134229, map, $markerList);

    /* Notes:
        - Graham, Beaty, Little Hall, and Harn curently excluded -- food data is not present on Dine on Campus
        - Location data may have to be manually modified on backend due to inconsistencies on Dine on Campus */
}

function createMarker(name, location, lat, lng, map, $markerList) {
    var marker = L.marker([lat, lng]).addTo(map)
    .on('click', function() {
        openMarkerModal(name, location);
    });

    var $markerListItem = $('<li>').addClass('list-group-item').html(name).appendTo($markerList).css('border', 'none');

    $markerListItem.on('click', function() {
        var zoomRatio = Math.pow(2, 18 - map.getZoom());
        var markerPoint = map.latLngToContainerPoint(marker.getLatLng());
        var offsetLng = map.containerPointToLatLng([markerPoint.x - (130 / zoomRatio), markerPoint.y]).lng;
        map.setView([marker.getLatLng().lat, offsetLng], 18);
    });
}

function openMarkerModal(name, location) {
    var modal = new bootstrap.Modal($('#markerModal'));

    $('#markerModalLabel').text(name);
    createCards($('.card-container'), location);

    if (document.fullscreenElement)
        $('#sidebar').append(modal._element);
    else
        $('#sidebar').find('.modal').remove();

    modal.show();
}