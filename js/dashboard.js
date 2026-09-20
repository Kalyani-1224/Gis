/* =====================================================
   GEOG LASS GIS EXPLORER
   Leaflet.js + Tailwind CSS
===================================================== */

"use strict";

/* =====================================================
   MAP CONFIGURATION
===================================================== */

const HYDERABAD = [17.385, 78.4867];

const INITIAL_ZOOM = 12;

const map = L.map("map", {
  zoomControl: false,
  attributionControl: true,
}).setView(HYDERABAD, INITIAL_ZOOM);

/* =====================================================
   BASE MAP
===================================================== */

const baseMap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  },
).addTo(map);

/* =====================================================
   LAYER GROUPS
===================================================== */

const layers = {
  city: L.layerGroup().addTo(map),
  parks: L.layerGroup().addTo(map),
  roads: L.layerGroup().addTo(map),
  boundary: L.layerGroup().addTo(map),
};

/* =====================================================
   SAMPLE GIS DATA
===================================================== */

const locations = [
  {
    id: 1,
    name: "HITEC City",
    type: "Commercial",
    category: "city",
    lat: 17.4435,
    lng: 78.3772,
    description: "Technology and commercial district.",
  },
  {
    id: 2,
    name: "Charminar",
    type: "Heritage",
    category: "city",
    lat: 17.3616,
    lng: 78.4747,
    description: "Historic monument in Hyderabad.",
  },
  {
    id: 3,
    name: "Gachibowli",
    type: "Commercial",
    category: "city",
    lat: 17.4401,
    lng: 78.3489,
    description: "IT and business district.",
  },
  {
    id: 4,
    name: "Tank Bund",
    type: "Recreation",
    category: "city",
    lat: 17.4239,
    lng: 78.4738,
    description: "Lakefront recreational area.",
  },
  {
    id: 5,
    name: "Secunderabad",
    type: "Urban",
    category: "city",
    lat: 17.4399,
    lng: 78.4983,
    description: "Major urban area.",
  },
  {
    id: 6,
    name: "Mehdipatnam",
    type: "Urban",
    category: "city",
    lat: 17.3948,
    lng: 78.4315,
    description: "Residential and commercial area.",
  },
];

/* =====================================================
   CUSTOM MARKER ICON
===================================================== */

function createMarkerIcon(color = "#22d3ee") {
  return L.divIcon({
    className: "custom-marker",

    html: `
      <div style="
        width: 18px;
        height: 18px;
        background: ${color};
        border: 3px solid #07111e;
        border-radius: 50%;
        box-shadow: 0 0 16px ${color};
      "></div>
    `,

    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  });
}

/* =====================================================
   POPUP TEMPLATE
===================================================== */

function createPopup(location) {
  return `
    <div class="popup-title">${location.name}</div>

    <div class="popup-row">
      <span>Category</span>
      <strong>${location.type}</strong>
    </div>

    <div class="popup-row">
      <span>Latitude</span>
      <strong>${location.lat.toFixed(5)}</strong>
    </div>

    <div class="popup-row">
      <span>Longitude</span>
      <strong>${location.lng.toFixed(5)}</strong>
    </div>

    <div style="
      margin-top: 9px;
      color: #94a3b8;
      line-height: 1.5;
    ">
      ${location.description}
    </div>
  `;
}

/* =====================================================
   ADD CITY MARKERS
===================================================== */

locations.forEach((location) => {
  const marker = L.marker([location.lat, location.lng], {
    icon: createMarkerIcon("#22d3ee"),
    title: location.name,
  });

  marker.bindPopup(createPopup(location));

  marker.on("click", () => {
    map.flyTo([location.lat, location.lng], 15, { duration: 1 });
  });

  marker.addTo(layers.city);
});

/* =====================================================
   GREEN AREAS
===================================================== */

const parks = [
  {
    name: "KBR National Park",
    coordinates: [
      [17.4239, 78.4208],
      [17.4275, 78.426],
      [17.4212, 78.4325],
      [17.416, 78.428],
      [17.417, 78.42],
    ],
  },

  {
    name: "Lumbini Park",
    coordinates: [
      [17.4115, 78.473],
      [17.4135, 78.477],
      [17.41, 78.48],
      [17.4075, 78.475],
    ],
  },
];

parks.forEach((park) => {
  L.polygon(park.coordinates, {
    color: "#34d399",
    weight: 2,
    fillColor: "#34d399",
    fillOpacity: 0.22,
  })
    .bindPopup(
      `
    <div class="popup-title">${park.name}</div>
    <div class="popup-row">
      <span>Feature Type</span>
      <strong>Green Area</strong>
    </div>
  `,
    )
    .addTo(layers.parks);
});

/* =====================================================
   ROAD NETWORK
===================================================== */

const roads = [
  [
    [17.4435, 78.3772],
    [17.4401, 78.3489],
    [17.43, 78.39],
    [17.42, 78.42],
  ],

  [
    [17.3616, 78.4747],
    [17.3948, 78.4315],
    [17.4239, 78.4738],
    [17.4399, 78.4983],
  ],

  [
    [17.385, 78.4867],
    [17.4, 78.46],
    [17.4239, 78.4738],
  ],
];

roads.forEach((road, index) => {
  L.polyline(road, {
    color: "#a78bfa",
    weight: 3,
    opacity: 0.8,
    dashArray: index === 2 ? "7 5" : null,
  })
    .bindPopup(
      `
    <div class="popup-title">Road Network ${index + 1}</div>
    <div class="popup-row">
      <span>Feature Type</span>
      <strong>Road Line</strong>
    </div>
  `,
    )
    .addTo(layers.roads);
});

/* =====================================================
   STUDY BOUNDARY
===================================================== */

const studyBoundary = [
  [17.47, 78.3],
  [17.47, 78.56],
  [17.3, 78.56],
  [17.3, 78.3],
];

L.polygon(studyBoundary, {
  color: "#fb923c",
  weight: 2,
  dashArray: "8 6",
  fillColor: "#fb923c",
  fillOpacity: 0.04,
})
  .bindPopup(
    `
  <div class="popup-title">Study Boundary</div>
  <div class="popup-row">
    <span>Feature Type</span>
    <strong>Polygon</strong>
  </div>
`,
  )
  .addTo(layers.boundary);

/* =====================================================
   LOCATION LIST
===================================================== */

const locationList = document.getElementById("locationList");

function renderLocationList(items = locations) {
  locationList.innerHTML = "";

  items.forEach((location) => {
    const item = document.createElement("div");

    item.className = "location-item";

    item.innerHTML = `
      <div class="location-icon">⌖</div>

      <div>
        <h4>${location.name}</h4>
        <p>${location.type} · ${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}</p>
      </div>
    `;

    item.addEventListener("click", () => {
      map.flyTo([location.lat, location.lng], 15, { duration: 1 });

      const marker = findMarker(location);

      if (marker) marker.openPopup();
    });

    locationList.appendChild(item);
  });
}

function findMarker(location) {
  let result = null;

  layers.city.eachLayer((layer) => {
    if (
      layer.getLatLng &&
      layer.getLatLng().lat === location.lat &&
      layer.getLatLng().lng === location.lng
    ) {
      result = layer;
    }
  });

  return result;
}

renderLocationList();

/* =====================================================
   MAP CONTROLS
===================================================== */

function zoomIn() {
  map.zoomIn();
}

function zoomOut() {
  map.zoomOut();
}

function resetMap() {
  map.setView(HYDERABAD, INITIAL_ZOOM);

  showToast("Map reset to Hyderabad");
}

function focusMap() {
  map.invalidateSize();

  map.setView(HYDERABAD, INITIAL_ZOOM);
}

map.on("zoomend", () => {
  document.getElementById("zoomValue").textContent = map.getZoom();
});

map.on("mousemove", (event) => {
  updateCoordinates(event.latlng);
});

map.on("click", (event) => {
  updateCoordinates(event.latlng);
});

function updateCoordinates(latlng) {
  document.getElementById("coordinates").textContent =
    `Lat: ${latlng.lat.toFixed(5)} | Lng: ${latlng.lng.toFixed(5)}`;
}

function getCenterCoordinates() {
  const center = map.getCenter();

  const text = `Latitude: ${center.lat.toFixed(6)}, Longitude: ${center.lng.toFixed(6)}`;

  updateToolResult(text);

  showToast("Map center coordinates updated");
}

/* =====================================================
   LAYER MANAGEMENT
===================================================== */

function toggleLayer(layerName, visible) {
  const layer = layers[layerName];

  if (!layer) return;

  if (visible) {
    layer.addTo(map);
  } else {
    map.removeLayer(layer);
  }

  updateActiveLayerCount();
}

function toggleBaseMap(visible) {
  if (visible) {
    baseMap.addTo(map);
  } else {
    map.removeLayer(baseMap);
  }

  updateActiveLayerCount();
}

function updateActiveLayerCount() {
  let count = 0;

  if (map.hasLayer(baseMap)) count++;

  Object.values(layers).forEach((layer) => {
    if (map.hasLayer(layer)) count++;
  });

  document.getElementById("activeLayerCount").textContent = count;
}

function changeOpacity(value) {
  document.getElementById("opacityValue").textContent = `${value}%`;

  const opacity = Number(value) / 100;

  Object.values(layers).forEach((layer) => {
    layer.eachLayer((item) => {
      if (item.setStyle) {
        item.setStyle({
          opacity: opacity,
          fillOpacity: opacity * 0.25,
        });
      }
    });
  });
}

/* =====================================================
   LAYER SEARCH
===================================================== */

function filterLayers() {
  const query = document.getElementById("layerSearch").value.toLowerCase();

  document.querySelectorAll(".layer-item").forEach((item) => {
    const name = item.dataset.layerName.toLowerCase();

    item.style.display = name.includes(query) ? "flex" : "none";
  });
}

/* =====================================================
   LOCATION SEARCH
===================================================== */

function searchLocation() {
  const input = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  if (!input) {
    showToast("Enter a location name");

    return;
  }

  const matches = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(input) ||
      location.type.toLowerCase().includes(input),
  );

  if (matches.length > 0) {
    const location = matches[0];

    map.flyTo([location.lat, location.lng], 15, { duration: 1 });

    const marker = findMarker(location);

    if (marker) marker.openPopup();

    renderLocationList(matches);

    showToast(`Found ${matches.length} location(s)`);
  } else {
    showToast("No matching sample location found");
  }
}

document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchLocation();
  }
});

/* =====================================================
   LOCATION DETECTION
===================================================== */

function locateUser() {
  if (!navigator.geolocation) {
    showToast("Geolocation is not supported");

    return;
  }

  showToast("Requesting your location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      map.flyTo([lat, lng], 16, { duration: 1 });

      L.marker([lat, lng], {
        icon: createMarkerIcon("#fb923c"),
      })
        .bindPopup(
          `
        <div class="popup-title">Your Location</div>
        <div class="popup-row">
          <span>Latitude</span>
          <strong>${lat.toFixed(6)}</strong>
        </div>
        <div class="popup-row">
          <span>Longitude</span>
          <strong>${lng.toFixed(6)}</strong>
        </div>
      `,
        )
        .addTo(map)
        .openPopup();

      updateCoordinates({ lat, lng });

      showToast("Your location found");
    },

    (error) => {
      showToast("Unable to access your location");
    },
  );
}

/* =====================================================
   FULLSCREEN
===================================================== */

function toggleFullscreen() {
  const wrapper = document.querySelector(".map-wrapper");

  if (!document.fullscreenElement) {
    wrapper.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

/* =====================================================
   GIS DRAWING
===================================================== */

const drawnItems = new L.FeatureGroup();

drawnItems.addTo(map);

let drawControl = null;

function startDraw() {
  if (!L.Control || !L.Control.Draw) {
    updateToolResult(
      "Drawing tools are unavailable because the drawing library failed to load.",
    );
    showToast("Drawing tools unavailable");
    return;
  }

  if (drawControl) {
    map.removeControl(drawControl);
  }

  drawControl = new L.Control.Draw({
    /* =================================================
       DRAWING TOOL POSITION
       Moved from top-left zoom controls
       to bottom-left above coordinates
    ================================================= */

    position: "bottomleft",

    edit: {
      featureGroup: drawnItems,
    },

    draw: {
      polyline: true,
      polygon: true,
      rectangle: true,
      circle: true,
      marker: true,
      circlemarker: false,
    },
  });

  map.addControl(drawControl);

  /* =================================================
     MOVE DRAWING TOOL ABOVE LAT/LNG DISPLAY
  ================================================= */

  const drawContainer = drawControl.getContainer();

  if (drawContainer) {
    drawContainer.style.marginBottom = "65px";
  }

  updateToolResult("Drawing enabled. Use the drawing toolbar on the map.");

  showToast("Choose a drawing tool");
}

if (L.Draw && L.Draw.Event) {
  map.on(L.Draw.Event.CREATED, (event) => {
    const layer = event.layer;

    drawnItems.addLayer(layer);

    let result = "New feature created.";

    if (event.layerType === "polyline") {
      result = "Line feature created.";
    }

    if (event.layerType === "polygon") {
      result = "Polygon feature created.";
    }

    if (event.layerType === "rectangle") {
      result = "Rectangle feature created.";
    }

    if (event.layerType === "circle") {
      result = "Circle feature created.";
    }

    if (event.layerType === "marker") {
      result = "Marker feature created.";
    }

    updateToolResult(result);

    showToast(result);
  });
}

/* =====================================================
   MEASUREMENT
===================================================== */

let measuring = false;
let measurePoints = [];
let measureLine = null;

function startMeasure() {
  measuring = true;

  measurePoints = [];

  if (measureLine) {
    map.removeLayer(measureLine);

    measureLine = null;
  }

  updateToolResult("Click two or more points on the map to measure distance.");

  showToast("Measurement mode enabled");
}

map.on("click", (event) => {
  if (!measuring) return;

  measurePoints.push(event.latlng);

  if (measurePoints.length >= 2) {
    if (measureLine) {
      map.removeLayer(measureLine);
    }

    measureLine = L.polyline(measurePoints, {
      color: "#22d3ee",
      weight: 3,
      dashArray: "6 5",
    }).addTo(map);

    let distance = 0;

    for (let i = 1; i < measurePoints.length; i++) {
      distance += map.distance(measurePoints[i - 1], measurePoints[i]);
    }

    updateToolResult(`Measured distance: ${(distance / 1000).toFixed(3)} km`);
  }
});

/* =====================================================
   CLEAR DRAWINGS
===================================================== */

function clearDrawings() {
  drawnItems.clearLayers();

  if (measureLine) {
    map.removeLayer(measureLine);

    measureLine = null;
  }

  measurePoints = [];

  measuring = false;

  updateToolResult("All drawings and measurements cleared.");

  showToast("Drawings cleared");
}

/* =====================================================
   PANEL CONTROLS
===================================================== */

function togglePanel(id) {
  const panel = document.getElementById(id);

  if (panel) {
    panel.style.display = panel.style.display === "none" ? "" : "none";
  }
}

function openPanel(id) {
  const panels = ["layersPanel", "toolsPanel", "analyticsPanel"];

  panels.forEach((panelId) => {
    const panel = document.getElementById(panelId);

    if (panel) {
      panel.classList.remove("panel-visible");
    }
  });

  const selectedPanel = document.getElementById(id);

  if (selectedPanel) {
    selectedPanel.classList.add("panel-visible");

    selectedPanel.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
}
/* =====================================================
   LEGEND
===================================================== */

function toggleLegend() {
  const content = document.getElementById("legendContent");

  content.style.display = content.style.display === "none" ? "" : "none";
}

/* =====================================================
   THEME
===================================================== */

function toggleTheme() {
  document.body.classList.toggle("light-theme");

  showToast(
    document.body.classList.contains("light-theme")
      ? "Light theme enabled"
      : "Dark theme enabled",
  );
}

/* =====================================================
   TOAST
===================================================== */

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");

  document.getElementById("toastMessage").textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function updateToolResult(message) {
  document.getElementById("toolResult").innerHTML = `
    <p>Tool output</p>
    <span>${message}</span>
  `;
}

/* =====================================================
   SIDEBAR TOGGLE
===================================================== */

document.getElementById("sidebarToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

/* =====================================================
   INITIALIZE
===================================================== */

updateActiveLayerCount();

document.getElementById("zoomValue").textContent = map.getZoom();

console.log("GeoGlass GIS Explorer initialized.");
