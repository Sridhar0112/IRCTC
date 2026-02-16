const STATIONS = {
  MAS: { name: 'Chennai Central', city: 'Chennai', zone: 'South', lat: 13.0827, lng: 80.2707 },
  MDU: { name: 'Madurai Junction', city: 'Madurai', zone: 'South', lat: 9.9252, lng: 78.1198 },
  CBE: { name: 'Coimbatore Junction', city: 'Coimbatore', zone: 'South', lat: 11.0168, lng: 76.9558 },
  TPJ: { name: 'Tiruchirappalli Junction', city: 'Trichy', zone: 'South', lat: 10.7905, lng: 78.7047 },
  SA: { name: 'Salem Junction', city: 'Salem', zone: 'South', lat: 11.6643, lng: 78.146 },
  ED: { name: 'Erode Junction', city: 'Erode', zone: 'South', lat: 11.341, lng: 77.7172 },
  TEN: { name: 'Tirunelveli Junction', city: 'Tirunelveli', zone: 'South', lat: 8.7139, lng: 77.7567 },
  SBC: { name: 'KSR Bengaluru', city: 'Bangalore', zone: 'South', lat: 12.9784, lng: 77.5697 },
  CSMT: { name: 'Mumbai CSMT', city: 'Mumbai', zone: 'West', lat: 18.9398, lng: 72.8355 },
  NDLS: { name: 'New Delhi', city: 'Delhi', zone: 'North', lat: 28.6437, lng: 77.2191 },
  HYB: { name: 'Hyderabad Deccan', city: 'Hyderabad', zone: 'South', lat: 17.3833, lng: 78.4867 },
  TVC: { name: 'Thiruvananthapuram Central', city: 'Thiruvananthapuram', zone: 'South', lat: 8.4874, lng: 76.9528 },
  ERS: { name: 'Ernakulam Junction', city: 'Kochi', zone: 'South', lat: 9.9697, lng: 76.3185 },
  VSKP: { name: 'Visakhapatnam', city: 'Visakhapatnam', zone: 'East', lat: 17.7218, lng: 83.3045 },
  HWH: { name: 'Howrah Junction', city: 'Kolkata', zone: 'East', lat: 22.585, lng: 88.3468 },
};

const SOUTH_PRIORITY_ROUTES = [
  { from: 'MAS', to: 'MDU', distance: 497, demand: 1.45 },
  { from: 'MAS', to: 'CBE', distance: 496, demand: 1.35 },
  { from: 'MAS', to: 'TPJ', distance: 331, demand: 1.3 },
  { from: 'MAS', to: 'SA', distance: 342, demand: 1.25 },
  { from: 'MAS', to: 'ED', distance: 401, demand: 1.2 },
  { from: 'MAS', to: 'TEN', distance: 650, demand: 1.4 },
  { from: 'MAS', to: 'SBC', distance: 362, demand: 1.5 },
  { from: 'MDU', to: 'CBE', distance: 215, demand: 1.2 },
  { from: 'MDU', to: 'TEN', distance: 157, demand: 1.18 },
];

const SUPPLEMENTARY_ROUTES = [
  { from: 'SBC', to: 'CBE', distance: 380, demand: 1.12 },
  { from: 'SBC', to: 'HYB', distance: 709, demand: 1.05 },
  { from: 'MAS', to: 'HYB', distance: 716, demand: 1.15 },
  { from: 'MAS', to: 'ERS', distance: 690, demand: 1.09 },
  { from: 'MAS', to: 'TVC', distance: 918, demand: 1.1 },
  { from: 'CBE', to: 'ERS', distance: 193, demand: 1.08 },
  { from: 'CSMT', to: 'MAS', distance: 1283, demand: 0.94 },
  { from: 'NDLS', to: 'MAS', distance: 2180, demand: 0.88 },
  { from: 'HWH', to: 'MAS', distance: 1661, demand: 0.86 },
  { from: 'VSKP', to: 'MAS', distance: 781, demand: 0.91 },
];

const TRAIN_TYPES = [
  { label: 'Rajdhani', speed: 82, surcharge: 2.05, classes: ['1A', '2A', '3A'] },
  { label: 'Shatabdi', speed: 86, surcharge: 1.8, classes: ['CC', 'EC', '2A'] },
  { label: 'Superfast', speed: 68, surcharge: 1.45, classes: ['SL', '3A', '2A'] },
  { label: 'Express', speed: 58, surcharge: 1.2, classes: ['SL', '3A', '2A', '1A'] },
  { label: 'Passenger', speed: 42, surcharge: 0.78, classes: ['2S', 'SL'] },
  { label: 'Special', speed: 64, surcharge: 1.4, classes: ['SL', '3A', '2A'] },
];

const NAME_PREFIX = ['Kaveri', 'Pothigai', 'Nilgiri', 'Cauvery', 'Vaigai', 'Palani', 'Pandian', 'Yercaud', 'Annamalai', 'Tamirabarani'];
const RUNNING_DAY_PATTERNS = [
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
  ['Tue', 'Wed', 'Fri', 'Sun'],
  ['Mon', 'Wed', 'Fri'],
  ['Thu', 'Fri', 'Sat', 'Sun'],
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  ['Sat', 'Sun'],
];

const PEAK_HOUR_WINDOWS = [
  [5, 8],
  [17, 22],
];

const CLASS_CAPACITY = {
  '1A': 24,
  '2A': 54,
  '3A': 72,
  SL: 80,
  CC: 78,
  EC: 56,
  '2S': 106,
};

const CLASS_PRICING_FACTOR = {
  '1A': 3.1,
  '2A': 2.2,
  '3A': 1.65,
  SL: 1,
  CC: 1.35,
  EC: 1.9,
  '2S': 0.72,
};

const SOUTH_ROUTE_KEYS = new Set(SOUTH_PRIORITY_ROUTES.map((r) => `${r.from}-${r.to}`));
const SOUTH_CITIES = new Set(['Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Erode', 'Tirunelveli', 'Bangalore']);

const toTime = (mins) => `${String(Math.floor((mins % 1440) / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

const seededNoise = (n) => {
  const x = Math.sin(n * 999) * 10000;
  return x - Math.floor(x);
};

const getTimeBand = (hour) => {
  if (hour < 6) return 'Early Morning';
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  if (hour < 21) return 'Evening';
  return 'Overnight';
};

const getRouteHeat = (occupancy) => {
  if (occupancy > 88) return 'High';
  if (occupancy > 74) return 'Medium';
  return 'Low';
};

const computeSurgeMultiplier = (departureMinutes, demandMultiplier, weekendBias = 1) => {
  const departureHour = Math.floor((departureMinutes % 1440) / 60);
  const peak = PEAK_HOUR_WINDOWS.some(([from, to]) => departureHour >= from && departureHour <= to);
  const peakFactor = peak ? 1.16 : 1;
  const noise = 1 + seededNoise(departureMinutes) * 0.12;
  return Number((peakFactor * weekendBias * demandMultiplier * noise).toFixed(2));
};

const pickTrainType = (seed) => {
  const roll = seededNoise(seed);
  if (roll > 0.96) return TRAIN_TYPES[0];
  if (roll > 0.9) return TRAIN_TYPES[1];
  if (roll > 0.65) return TRAIN_TYPES[2];
  if (roll > 0.28) return TRAIN_TYPES[3];
  if (roll > 0.12) return TRAIN_TYPES[5];
  return TRAIN_TYPES[4];
};

const buildClassInventory = (classes, occupancy, seed) =>
  classes.reduce((acc, cls, idx) => {
    const capacity = CLASS_CAPACITY[cls];
    const localNoise = seededNoise(seed + idx * 7);
    const booked = Math.min(capacity - 1, Math.round(capacity * (occupancy / 100) * (0.82 + localNoise * 0.3)));
    const waiting = Math.max(0, Math.round((booked - capacity * 0.9) * (0.8 + localNoise)));
    acc[cls] = {
      capacity,
      available: Math.max(0, capacity - booked),
      waiting,
      fare: 0,
    };
    return acc;
  }, {});

export const trainSearchKey = (train) => `${train.number}|${train.name}|${train.fromStation.name}|${train.toStation.name}|${train.fromStation.city}|${train.toStation.city}`.toLowerCase();

export function createTrainDataset(total = 620) {
  const routes = [...SOUTH_PRIORITY_ROUTES, ...SUPPLEMENTARY_ROUTES];
  const today = new Date();
  const weekend = [0, 6].includes(today.getDay()) ? 1.08 : 1;

  return Array.from({ length: total }, (_, idx) => {
    const route = routes[idx % routes.length];
    const reverse = idx % 3 === 0;
    const fromCode = reverse ? route.to : route.from;
    const toCode = reverse ? route.from : route.to;
    const fromStation = STATIONS[fromCode];
    const toStation = STATIONS[toCode];
    const trainType = pickTrainType(idx + 13);
    const number = String(12000 + idx * 3 + Math.floor(seededNoise(idx + 71) * 8));
    const depSlotBase = [285, 390, 515, 690, 980, 1125, 1305, 1380][idx % 8];
    const departureMinutes = (depSlotBase + Math.floor(seededNoise(idx + 33) * 95)) % 1440;
    const speedNoise = 0.9 + seededNoise(idx + 91) * 0.26;
    const durationMinutes = Math.max(105, Math.round((route.distance / trainType.speed) * 60 * (1 / speedNoise)));
    const arrivalMinutes = (departureMinutes + durationMinutes) % 1440;
    const dayOffset = departureMinutes + durationMinutes >= 1440 ? 1 : 0;
    const occupancy = Math.min(96, Math.max(48, Math.round(62 + route.demand * 18 + seededNoise(idx + 48) * 24)));
    const classAvailability = buildClassInventory(trainType.classes, occupancy, idx + 9);
    const demandMultiplier = route.demand * (SOUTH_ROUTE_KEYS.has(`${route.from}-${route.to}`) ? 1.08 : 1);
    const surgeMultiplier = computeSurgeMultiplier(departureMinutes, demandMultiplier, weekend);
    const baseFare = route.distance * 1.02 * trainType.surcharge;

    let minFare = Infinity;
    Object.keys(classAvailability).forEach((cls) => {
      const fare = Math.round(baseFare * CLASS_PRICING_FACTOR[cls] * surgeMultiplier);
      classAvailability[cls].fare = fare;
      minFare = Math.min(minFare, fare);
    });

    const totalCapacity = Object.values(classAvailability).reduce((sum, cls) => sum + cls.capacity, 0);
    const seatsLeft = Object.values(classAvailability).reduce((sum, cls) => sum + cls.available, 0);
    const routeKey = `${fromCode}-${toCode}`;
    const popularity = Math.round(100 * (occupancy / 100) * demandMultiplier);
    const routeDemand = getRouteHeat(occupancy);

    return {
      id: number,
      number,
      name: `${NAME_PREFIX[idx % NAME_PREFIX.length]} ${trainType.label}`,
      type: trainType.label,
      from: fromStation.city,
      to: toStation.city,
      fromStation,
      toStation,
      routeKey,
      departure: toTime(departureMinutes),
      departureMinutes,
      arrival: toTime(arrivalMinutes),
      arrivalMinutes,
      arrivalDayOffset: dayOffset,
      timeBand: getTimeBand(Math.floor(departureMinutes / 60)),
      duration: durationMinutes,
      distance: route.distance,
      runningDays: RUNNING_DAY_PATTERNS[idx % RUNNING_DAY_PATTERNS.length],
      classAvailability,
      availableClasses: Object.keys(classAvailability),
      seatsLeft,
      totalCapacity,
      occupancy,
      popularity,
      routeDemand,
      fare: minFare,
      dynamicFare: Math.round(minFare * surgeMultiplier),
      surgeMultiplier,
      surge: surgeMultiplier > 1.16,
      southIndiaRoute: SOUTH_CITIES.has(fromStation.city) && SOUTH_CITIES.has(toStation.city),
      overnight: departureMinutes + durationMinutes > 1260,
      festivalRush: seededNoise(idx + today.getMonth() * 100) > 0.87,
      searchIndex: '',
    };
  }).map((train) => ({ ...train, searchIndex: trainSearchKey(train) }));
}

export const stationDirectory = STATIONS;
