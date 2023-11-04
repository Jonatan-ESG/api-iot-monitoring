export const sensorPhrases = {
  Temperature: {
    alert: [
      'High temperature alert: Immediate action required.',
      'Temperature has exceeded safe levels. Alert!',
      'Critical temperature spike detected. Alert!',
    ],
    info: [
      'Temperature has increased beyond normal levels.',
      'Unusual temperature fluctuations detected.',
      'Temperature readings indicate potential issues.',
    ],
  },
  Pressure: {
    alert: [
      'High pressure alert: Immediate action required.',
      'Pressure readings are dangerously high. Alert!',
      'Critical pressure anomaly detected. Alert!',
    ],
    info: ['Pressure readings are outside the normal range.', 'Pressure has dropped significantly.', 'Pressure sensor reports an anomaly.'],
  },
  Humidity: {
    alert: [
      'High humidity alert: Immediate action required.',
      'Humidity has reached a critical level. Alert!',
      'Dangerously high humidity detected. Alert!',
    ],
    info: ['Humidity levels are higher than expected.', 'Humidity has reached a critical point.', 'Humidity sensor detected abnormal conditions.'],
  },
  Acceleration: {
    alert: [
      'Acceleration exceeded safe limits. Alert!',
      'Unusual acceleration patterns detected. Alert!',
      'Critical acceleration anomaly detected. Alert!',
    ],
    info: [
      'Acceleration readings are unusual but not critical.',
      'Moderate changes in acceleration detected.',
      'Acceleration sensor reports irregular patterns.',
    ],
  },
  Motion: {
    alert: ['Motion detected: Immediate action required.', 'Unexpected motion in the area. Alert!', 'Motion sensor triggered. Alert!'],
    info: ['Routine motion detected in the area.', 'Motion sensor reports regular activity.', 'Motion readings indicate normal conditions.'],
  },
  Light: {
    alert: ['Low light levels: Immediate action required.', 'Unusually low illumination detected. Alert!', 'Critical light deficiency. Alert!'],
    info: ['Light levels are below expected values.', 'Light sensor indicates lower illumination.', 'Moderate changes in light detected.'],
  },
  Gas: {
    alert: [
      'High gas levels detected: Immediate action required.',
      'Dangerous gas concentration. Alert!',
      'Gas sensor reports critical levels. Alert!',
    ],
    info: [
      'Gas levels are above normal but not critical.',
      'Moderate changes in gas concentration detected.',
      'Gas sensor indicates irregular gas levels.',
    ],
  },
  Smoke: {
    alert: ['Smoke detected: Immediate action required.', 'Unexpected smoke presence. Alert!', 'Smoke sensor triggered. Alert!'],
    info: ['Routine smoke detection in the area.', 'Smoke sensor reports regular conditions.', 'Smoke readings indicate normal environment.'],
  },
  Fire: {
    alert: ['Fire detected: Immediate action required.', 'Fire alarm triggered. Alert!', 'Fire sensor reports critical conditions. Alert!'],
    info: ['Routine fire alarm detection in the area.', 'Fire sensor indicates normal conditions.', 'Fire readings indicate regular environment.'],
  },
};
