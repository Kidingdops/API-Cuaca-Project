/**
 * CuacaNusantara - BMKG API Integration & Theme Management
 * Endpoint: https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode_wilayah}
 */

// Database Daftar Kota & Kode ADM4 BMKG Utama
const BMKG_CITIES = [
  { name: 'Jakarta', label: 'Jakarta Pusat (Gambir)', adm4: '31.71.01.1001', province: 'DKI Jakarta', lat: -6.1764, lon: 106.8267 },
  { name: 'Jakarta Selatan', label: 'Jakarta Selatan (Kebayoran)', adm4: '31.74.01.1001', province: 'DKI Jakarta', lat: -6.2443, lon: 106.8006 },
  { name: 'Jakarta Barat', label: 'Jakarta Barat (Grogol)', adm4: '31.73.02.1001', province: 'DKI Jakarta', lat: -6.1668, lon: 106.7884 },
  { name: 'Jakarta Utara', label: 'Jakarta Utara (Tanjung Priok)', adm4: '31.72.01.1001', province: 'DKI Jakarta', lat: -6.1321, lon: 106.8837 },
  { name: 'Jakarta Timur', label: 'Jakarta Timur (Jatinegara)', adm4: '31.75.03.1001', province: 'DKI Jakarta', lat: -6.2251, lon: 106.8679 },
  { name: 'Surabaya', label: 'Kota Surabaya', adm4: '35.78.01.1001', province: 'Jawa Timur', lat: -7.3406, lon: 112.6899 },
  { name: 'Bandung', label: 'Kota Bandung', adm4: '32.73.01.1001', province: 'Jawa Barat', lat: -6.8742, lon: 107.5854 },
  { name: 'Semarang', label: 'Kota Semarang', adm4: '33.74.01.1001', province: 'Jawa Tengah', lat: -6.9932, lon: 110.4203 },
  { name: 'Yogyakarta', label: 'Kota Yogyakarta', adm4: '34.71.01.1001', province: 'DI Yogyakarta', lat: -7.8014, lon: 110.3647 },
  { name: 'Solo', label: 'Surakarta / Solo', adm4: '33.72.02.1001', province: 'Jawa Tengah', lat: -7.5561, lon: 110.8317 },
  { name: 'Malang', label: 'Kota Malang', adm4: '35.79.01.1001', province: 'Jawa Timur', lat: -7.9797, lon: 112.6304 },
  { name: 'Denpasar', label: 'Bali (Denpasar)', adm4: '51.71.01.1001', province: 'Bali', lat: -8.6705, lon: 115.2126 },
  { name: 'Medan', label: 'Kota Medan', adm4: '12.71.01.1001', province: 'Sumatera Utara', lat: 3.5952, lon: 98.6722 },
  { name: 'Palembang', label: 'Kota Palembang', adm4: '16.71.01.1001', province: 'Sumatera Selatan', lat: -2.9761, lon: 104.7754 },
  { name: 'Padang', label: 'Kota Padang', adm4: '13.71.01.1001', province: 'Sumatera Barat', lat: -0.9471, lon: 100.3543 },
  { name: 'Pekanbaru', label: 'Kota Pekanbaru', adm4: '14.71.01.1001', province: 'Riau', lat: 0.5071, lon: 101.4478 },
  { name: 'Bandar Lampung', label: 'Bandar Lampung', adm4: '18.71.01.1001', province: 'Lampung', lat: -5.4500, lon: 105.2667 },
  { name: 'Makassar', label: 'Kota Makassar', adm4: '73.71.01.1001', province: 'Sulawesi Selatan', lat: -5.1477, lon: 119.4327 },
  { name: 'Manado', label: 'Kota Manado', adm4: '71.71.01.1001', province: 'Sulawesi Utara', lat: 1.4748, lon: 124.8428 },
  { name: 'Balikpapan', label: 'Kota Balikpapan', adm4: '64.71.01.1001', province: 'Kalimantan Timur', lat: -1.2379, lon: 116.8529 },
  { name: 'Samarinda', label: 'Kota Samarinda', adm4: '64.72.01.1001', province: 'Kalimantan Timur', lat: -0.5022, lon: 117.1536 },
  { name: 'Pontianak', label: 'Kota Pontianak', adm4: '61.71.01.1001', province: 'Kalimantan Barat', lat: -0.0263, lon: 109.3425 },
  { name: 'Banjarmasin', label: 'Kota Banjarmasin', adm4: '63.71.01.1001', province: 'Kalimantan Selatan', lat: -3.3194, lon: 114.5908 },
  { name: 'Jayapura', label: 'Kota Jayapura', adm4: '91.71.01.1001', province: 'Papua', lat: -2.5489, lon: 140.7183 },
  { name: 'Ambon', label: 'Kota Ambon', adm4: '81.71.01.1001', province: 'Maluku', lat: -3.6954, lon: 128.1814 },
  { name: 'Mataram', label: 'Kota Mataram', adm4: '52.71.01.1001', province: 'Nusa Tenggara Barat', lat: -8.5833, lon: 116.1167 },
  { name: 'Kupang', label: 'Kota Kupang', adm4: '53.71.01.1001', province: 'Nusa Tenggara Timur', lat: -10.1772, lon: 123.6070 },
  { name: 'Bogor', label: 'Kota Bogor', adm4: '32.71.01.1001', province: 'Jawa Barat', lat: -6.5971, lon: 106.7996 },
  { name: 'Depok', label: 'Kota Depok', adm4: '32.76.01.1001', province: 'Jawa Barat', lat: -6.4025, lon: 106.7942 },
  { name: 'Tangerang', label: 'Kota Tangerang', adm4: '36.71.01.1001', province: 'Banten', lat: -6.1783, lon: 106.6319 },
  { name: 'Tangerang Selatan', label: 'Tangerang Selatan (Serpong)', adm4: '36.74.01.1001', province: 'Banten', lat: -6.3064, lon: 106.6713 },
  { name: 'Bekasi', label: 'Kota Bekasi', adm4: '32.75.01.1001', province: 'Jawa Barat', lat: -6.2383, lon: 106.9756 },
  { name: 'Banda Aceh', label: 'Kota Banda Aceh', adm4: '11.71.01.1001', province: 'Aceh', lat: 5.5483, lon: 95.3238 },
  { name: 'Batam', label: 'Kota Batam', adm4: '21.71.01.1001', province: 'Kepulauan Riau', lat: 1.1301, lon: 104.0529 },
  { name: 'Serang', label: 'Kota Serang', adm4: '36.73.01.1001', province: 'Banten', lat: -6.1200, lon: 106.1500 }
];

// Application State
const state = {
  theme: localStorage.getItem('cuaca_theme') || 'dark', // 'dark' or 'light'
  unit: 'metric', // 'metric' (°C) or 'imperial' (°F)
  currentCityObj: BMKG_CITIES[0],
  rawBMKGData: null,
  currentWeatherDesc: 'cerah'
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');
const gpsBtn = document.getElementById('gpsBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const unitCelcius = document.getElementById('unitCelcius');
const unitFahrenheit = document.getElementById('unitFahrenheit');

// Loading & Error States
const loadingSkeleton = document.getElementById('loadingSkeleton');
const errorCard = document.getElementById('errorCard');
const errorTitle = document.getElementById('errorTitle');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const weatherContent = document.getElementById('weatherContent');

// Hero Display
const locationText = document.getElementById('locationText');
const updateTimeText = document.getElementById('updateTimeText');
const tempText = document.getElementById('tempText');
const weatherMainText = document.getElementById('weatherMainText');
const provinceText = document.getElementById('provinceText');
const tempMaxText = document.getElementById('tempMaxText');
const tempMinText = document.getElementById('tempMinText');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescText = document.getElementById('weatherDescText');

// Metrics Grid
const humidityText = document.getElementById('humidityText');
const humidityDesc = document.getElementById('humidityDesc');
const windText = document.getElementById('windText');
const windDirText = document.getElementById('windDirText');
const cloudinessText = document.getElementById('cloudinessText');
const cloudDescText = document.getElementById('cloudDescText');
const precipText = document.getElementById('precipText');
const precipDescText = document.getElementById('precipDescText');
const adm4CodeText = document.getElementById('adm4CodeText');
const adm4DescText = document.getElementById('adm4DescText');
const timezoneText = document.getElementById('timezoneText');
const timezoneDescText = document.getElementById('timezoneDescText');

// Containers
const hourlyContainer = document.getElementById('hourlyContainer');
const dailyContainer = document.getElementById('dailyContainer');
const quickCityChips = document.querySelectorAll('.quick-city-chip');

// Debounce Utility
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Initial Launch
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  fetchBMKGWeather(state.currentCityObj.adm4);
});

// Initialize Theme Mode
function initTheme() {
  applyTheme(state.theme);
}

// Apply Theme Function
function applyTheme(themeMode) {
  state.theme = themeMode;
  localStorage.setItem('cuaca_theme', themeMode);

  if (themeMode === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    themeIcon.className = 'fa-solid fa-sun text-amber-500';
    themeLabel.textContent = 'Terang';
  } else {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    themeIcon.className = 'fa-solid fa-moon text-amber-400';
    themeLabel.textContent = 'Gelap';
  }

  updateBodyBackground(state.currentWeatherDesc);
}

// Toggle Theme Callback with Smooth Icon Animation
function toggleTheme() {
  themeIcon.classList.remove('theme-icon-rotate');
  void themeIcon.offsetWidth; // Trigger reflow for animation restart
  themeIcon.classList.add('theme-icon-rotate');

  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle Button
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Search Autocomplete
  searchInput.addEventListener('input', debounce((e) => handleSearchInput(e.target.value.trim())));
  
  searchInput.addEventListener('focus', () => {
    if (autocompleteDropdown.children.length > 0) {
      autocompleteDropdown.classList.remove('hidden');
    }
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    autocompleteDropdown.classList.add('hidden');
    searchInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
      autocompleteDropdown.classList.add('hidden');
    }
  });

  // Quick City Chips
  quickCityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cityName = chip.getAttribute('data-city');
      const foundCity = BMKG_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
      if (foundCity) {
        state.currentCityObj = foundCity;
        searchInput.value = foundCity.label;
        clearSearchBtn.classList.remove('hidden');
        fetchBMKGWeather(foundCity.adm4);
      }
    });
  });

  // Unit Toggle
  unitCelcius.addEventListener('click', () => setUnit('metric'));
  unitFahrenheit.addEventListener('click', () => setUnit('imperial'));

  // GPS Geolocation
  gpsBtn.addEventListener('click', handleGPSLocation);

  // Retry Button
  retryBtn.addEventListener('click', () => {
    fetchBMKGWeather(state.currentCityObj.adm4);
  });
}

// Unit Change Handler
function setUnit(newUnit) {
  if (state.unit === newUnit) return;
  state.unit = newUnit;

  if (newUnit === 'metric') {
    unitCelcius.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-white/20 text-white shadow-sm';
    unitFahrenheit.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white';
  } else {
    unitFahrenheit.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-white/20 text-white shadow-sm';
    unitCelcius.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white';
  }

  if (state.rawBMKGData) {
    renderBMKGWeather(state.rawBMKGData);
  }
}

// Handle GPS Location Click
function handleGPSLocation() {
  if (!navigator.geolocation) {
    alert('Browser Anda tidak mendukung Geolocation.');
    return;
  }

  gpsBtn.disabled = true;
  gpsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-cyan-400"></i> <span class="hidden sm:inline">Mendeteksi...</span>`;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      let closestCity = BMKG_CITIES[0];
      let minDistance = Infinity;

      BMKG_CITIES.forEach(city => {
        const dist = calculateDistance(userLat, userLon, city.lat, city.lon);
        if (dist < minDistance) {
          minDistance = dist;
          closestCity = city;
        }
      });

      state.currentCityObj = closestCity;
      searchInput.value = closestCity.label;
      clearSearchBtn.classList.remove('hidden');

      fetchBMKGWeather(closestCity.adm4);

      gpsBtn.disabled = false;
      gpsBtn.innerHTML = `<i class="fa-solid fa-location-crosshairs text-cyan-400"></i> <span class="hidden sm:inline">Lokasi Saya</span>`;
    },
    (err) => {
      gpsBtn.disabled = false;
      gpsBtn.innerHTML = `<i class="fa-solid fa-location-crosshairs text-cyan-400"></i> <span class="hidden sm:inline">Lokasi Saya</span>`;
      alert('Gagal mendeteksi lokasi GPS. Memperlihatkan kota default.');
    },
    { timeout: 10000 }
  );
}

// Distance Calculation (Haversine Formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Search Autocomplete Handler
function handleSearchInput(query) {
  if (!query) {
    clearSearchBtn.classList.add('hidden');
    autocompleteDropdown.classList.add('hidden');
    return;
  }

  clearSearchBtn.classList.remove('hidden');
  const q = query.toLowerCase();

  const filtered = BMKG_CITIES.filter(city => 
    city.name.toLowerCase().includes(q) ||
    city.label.toLowerCase().includes(q) ||
    city.province.toLowerCase().includes(q) ||
    city.adm4.includes(q)
  );

  renderAutocomplete(filtered);
}

// Render Dropdown Results
function renderAutocomplete(results) {
  autocompleteDropdown.innerHTML = '';

  if (results.length === 0) {
    autocompleteDropdown.innerHTML = `
      <div class="px-4 py-3 text-xs text-slate-400 text-center">
        Kota tidak ditemukan dalam basis data BMKG. Coba kata kunci lain (misal: Jakarta, Surabaya, Bali).
      </div>`;
    autocompleteDropdown.classList.remove('hidden');
    return;
  }

  results.forEach(city => {
    const div = document.createElement('div');
    div.className = 'px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between text-sm';
    
    div.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-location-dot text-cyan-400 text-xs"></i>
        <span class="font-medium text-slate-100">${city.label}</span>
        <span class="text-xs text-slate-400">(${city.province})</span>
      </div>
      <span class="text-[11px] text-amber-400 font-mono">ADM4: ${city.adm4}</span>
    `;

    div.addEventListener('click', () => {
      searchInput.value = city.label;
      autocompleteDropdown.classList.add('hidden');
      state.currentCityObj = city;
      fetchBMKGWeather(city.adm4);
    });

    autocompleteDropdown.appendChild(div);
  });

  autocompleteDropdown.classList.remove('hidden');
}

// Fetch BMKG Weather API Endpoint
async function fetchBMKGWeather(adm4Code) {
  showLoading();

  try {
    const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4Code)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      throw new Error('Data cuaca tidak ditemukan dari server BMKG.');
    }

    state.rawBMKGData = data;
    renderBMKGWeather(data);
    hideLoading();
  } catch (err) {
    console.error('Error fetching BMKG data:', err);
    showError('Gagal Memuat Data BMKG', 'Server BMKG tidak merespons atau sedang dalam pemeliharaan. Silakan coba beberapa saat lagi.');
  }
}

// Render Weather Data from BMKG Payload
function renderBMKGWeather(data) {
  const lokasi = data.lokasi;
  const cuacaDays = data.data[0].cuaca;

  const allForecasts = [];
  cuacaDays.forEach(dayArray => {
    dayArray.forEach(item => allForecasts.push(item));
  });

  if (allForecasts.length === 0) return;

  const currentForecast = allForecasts[0];
  state.currentWeatherDesc = currentForecast.weather_desc;

  const formatTemp = (tempC) => {
    if (state.unit === 'imperial') {
      const tempF = Math.round((tempC * 9 / 5) + 32);
      return `${tempF}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  // 1. Hero Card Update
  const cityTitle = `${lokasi.desa}, Kec. ${lokasi.kecamatan}, ${lokasi.kotkab}`;
  locationText.textContent = cityTitle;
  provinceText.textContent = lokasi.provinsi;

  const now = new Date();
  updateTimeText.textContent = `Diperbarui: ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

  tempText.textContent = formatTemp(currentForecast.t);
  weatherMainText.textContent = currentForecast.weather_desc;
  weatherDescText.textContent = currentForecast.weather_desc_en ? `${currentForecast.weather_desc} (${currentForecast.weather_desc_en})` : currentForecast.weather_desc;

  if (currentForecast.image) {
    weatherIcon.src = currentForecast.image;
  }

  const allTemps = allForecasts.map(f => f.t);
  const maxTemp = Math.max(...allTemps);
  const minTemp = Math.min(...allTemps);
  tempMaxText.textContent = formatTemp(maxTemp);
  tempMinText.textContent = formatTemp(minTemp);

  // Dynamic Background Update
  updateBodyBackground(currentForecast.weather_desc);

  // 2. Metrics Grid
  humidityText.textContent = `${currentForecast.hu}%`;
  humidityDesc.textContent = currentForecast.hu > 80 ? 'Tinggi' : currentForecast.hu < 50 ? 'Rendah' : 'Normal';

  const windSpeedKmh = currentForecast.ws;
  if (state.unit === 'imperial') {
    const speedMph = (windSpeedKmh * 0.621371).toFixed(1);
    windText.textContent = `${speedMph} mph`;
  } else {
    windText.textContent = `${windSpeedKmh} km/jam`;
  }
  windDirText.textContent = `Arah ${currentForecast.wd || 'Utara'}`;

  cloudinessText.textContent = `${currentForecast.tcc}%`;
  cloudDescText.textContent = currentForecast.tcc > 75 ? 'Sangat Berawan' : currentForecast.tcc > 30 ? 'Cerah Berawan' : 'Langit Cerah';

  precipText.textContent = `${currentForecast.tp || 0} mm`;
  precipDescText.textContent = (currentForecast.tp > 0) ? 'Potensi Hujan' : 'Tidak Ada Hujan';

  adm4CodeText.textContent = lokasi.adm4;
  adm4DescText.textContent = `${lokasi.desa}`;

  timezoneText.textContent = lokasi.timezone?.includes('Jakarta') ? 'WIB' : lokasi.timezone?.includes('Makassar') ? 'WITA' : 'WIT';
  timezoneDescText.textContent = lokasi.timezone || 'Asia/Jakarta';

  // 3. Hourly Forecast
  hourlyContainer.innerHTML = '';
  const hourlyItems = allForecasts.slice(0, 8);
  hourlyItems.forEach(item => {
    const itemDate = new Date(item.datetime || item.local_datetime);
    const timeStr = itemDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const dayStr = itemDate.toLocaleDateString('id-ID', { weekday: 'short' });

    const card = document.createElement('div');
    card.className = 'glass-card glass-card-hover rounded-2xl p-4 flex flex-col items-center justify-between min-w-[110px] text-center flex-shrink-0';
    card.innerHTML = `
      <span class="text-[11px] font-semibold text-cyan-400 uppercase">${dayStr}</span>
      <span class="text-xs font-bold text-slate-100 mb-1">${timeStr}</span>
      <img src="${item.image}" alt="icon" class="w-10 h-10 object-contain my-1" />
      <span class="text-base font-bold text-slate-100">${formatTemp(item.t)}</span>
      <span class="text-[10px] text-slate-300 mt-1 truncate max-w-[90px]" title="${item.weather_desc}">${item.weather_desc}</span>
    `;
    hourlyContainer.appendChild(card);
  });

  // 4. Daily Forecast
  dailyContainer.innerHTML = '';
  cuacaDays.forEach((dayArray, index) => {
    if (dayArray.length === 0) return;

    const firstItem = dayArray[0];
    const dateObj = new Date(firstItem.datetime || firstItem.local_datetime);
    const dateStr = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });

    const dayTemps = dayArray.map(i => i.t);
    const dayMax = Math.max(...dayTemps);
    const dayMin = Math.min(...dayTemps);

    const midItem = dayArray[Math.floor(dayArray.length / 2)];

    const card = document.createElement('div');
    card.className = 'glass-card glass-card-hover rounded-2xl p-5 flex flex-col items-center justify-between text-center gap-2';
    card.innerHTML = `
      <span class="text-sm font-bold text-slate-100">${dateStr}</span>
      <img src="${midItem.image}" alt="icon" class="w-16 h-16 object-contain animate-float" />
      <p class="text-xs text-slate-300 font-semibold capitalize h-8 flex items-center justify-center">${midItem.weather_desc}</p>
      <div class="flex items-center gap-3 text-xs font-semibold mt-1">
        <span class="text-red-400 font-bold">${formatTemp(dayMax)}</span>
        <span class="text-slate-500">/</span>
        <span class="text-blue-400 font-bold">${formatTemp(dayMin)}</span>
      </div>
    `;
    dailyContainer.appendChild(card);
  });
}

// Background Switcher supporting both Light & Dark Theme
function updateBodyBackground(desc) {
  const themeClass = state.theme === 'light' ? 'theme-light' : 'theme-dark';
  document.body.className = `${themeClass} min-h-screen flex flex-col justify-between selection:bg-cyan-500 selection:text-white`;
  
  const d = (desc || '').toLowerCase();
  if (d.includes('cerah berawan')) {
    document.body.classList.add('bg-clouds');
  } else if (d.includes('cerah')) {
    document.body.classList.add('bg-clear');
  } else if (d.includes('hujan') || d.includes('gerimis')) {
    document.body.classList.add('bg-rain');
  } else if (d.includes('petir') || d.includes('badai')) {
    document.body.classList.add('bg-thunderstorm');
  } else if (d.includes('kabut') || d.includes('asap')) {
    document.body.classList.add('bg-mist');
  } else {
    document.body.classList.add('bg-clouds');
  }
}

// UI State Management
function showLoading() {
  loadingSkeleton.classList.remove('hidden');
  weatherContent.classList.add('hidden');
  errorCard.classList.add('hidden');
}

function hideLoading() {
  loadingSkeleton.classList.add('hidden');
  weatherContent.classList.remove('hidden');
  errorCard.classList.add('hidden');
}

function showError(title, msg) {
  loadingSkeleton.classList.add('hidden');
  weatherContent.classList.add('hidden');
  errorCard.classList.remove('hidden');
  errorTitle.textContent = title;
  errorMessage.textContent = msg;
}
