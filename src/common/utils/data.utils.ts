import { equipmentBySensorType } from '../data/equipments';
import { locations } from '../data/locations';
import { manufacturers } from '../data/manufacturers';
import { regulations } from '../data/regulations';
import { reliabilities } from '../data/reliabilities';
import { sensorPhrases } from '../data/sensor_phrases';
import { status } from '../data/status';
import { sensorTypes } from './../data/sensor_types';

export const getRandomSensorType = () => {
  const sensorTypeIndex = getRandomNumber(0, sensorTypes.length - 1);
  return sensorTypes[sensorTypeIndex];
};

export const getRandomSensorId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters.charAt(getRandomNumber(0, letters.length - 1));
  const randomNumber = getRandomNumber(100, 999);

  return randomLetter + randomNumber.toString();
};

export const getRandomLocation = () => {
  const randomEnterprise = locations.enterprise[getRandomNumber(0, locations.enterprise.length - 1)];
  const randomCity = locations.city[getRandomNumber(0, locations.city.length - 1)];
  const randomLocation = locations.location[getRandomNumber(0, locations.location.length - 1)];

  const randomAddress = `${randomEnterprise}, ${randomCity}, ${randomLocation}`;

  return randomAddress;
};
export const getRandomStatus = (isAlert: boolean) => (isAlert ? (Date.now() % 17 === 0 ? 'error' : 'warning') : 'normal');

export const getRandomReliability = () => reliabilities[getRandomNumber(0, reliabilities.length - 1)];

export const getRandomRegulations = () => regulations[getRandomNumber(0, regulations.length - 1)];

export const getRandomSensorDescription = (sensorType: string, isAlert: boolean) => {
  const typePhrases = sensorPhrases[sensorType];
  if (typePhrases) {
    const phrases = isAlert ? typePhrases.alert : typePhrases.info;
    if (phrases) {
      const randomIndex = getRandomNumber(0, phrases.length - 1);
      const selectedPhrase = phrases[randomIndex];
      return isAlert ? `ALERT: ${selectedPhrase}` : `INFO: ${selectedPhrase}`;
    }
  }
  return 'No sensor-specific phrases available for this type.';
};

export const getRandomManufacturerAndModel = () => {
  const randomManufacturer = manufacturers[getRandomNumber(0, manufacturers.length - 1)];
  const randomModel = randomManufacturer.model[getRandomNumber(0, randomManufacturer.model.length - 1)];
  return { manufacturer: randomManufacturer.manufacturer, model: randomModel };
};

export const getRandomSensorValue = (sensorType: string) => {
  const sensorInfo = sensorTypes.find((type) => type.sensor_type === sensorType);

  if (sensorInfo) {
    let value: number;
    let alarmThreshold: number;

    if (sensorType === 'Temperature') {
      value = getRandomNumber(5, 50);
      alarmThreshold = 30; // Umbral de alarma de temperatura a 30°C
    } else if (sensorType === 'Pressure') {
      value = getRandomNumber(0, 100);
      alarmThreshold = 80; // Umbral de alarma de presión a 80 PSI
    } else if (sensorType === 'Humidity') {
      value = getRandomNumber(0, 100);
      alarmThreshold = 70; // Umbral de alarma de humedad al 70%
    } else if (sensorType === 'Acceleration') {
      value = getRandomNumber(0, 20); // Valor máximo arbitrario de aceleración
      alarmThreshold = 15; // Umbral de alarma de aceleración a 15 (ejemplo)
    } else if (sensorType === 'Motion') {
      value = Math.random() > 0.5 ? 1 : 0;
      alarmThreshold = 0.5; // Umbral de alarma de movimiento a 0.5 (ejemplo)
    } else if (sensorType === 'Light') {
      value = getRandomNumber(0, 1000); // Valor máximo arbitrario de lux
      alarmThreshold = 800; // Umbral de alarma de luz a 800 lux (ejemplo)
    } else if (sensorType === 'Gas' || sensorType === 'Smoke') {
      value = getRandomNumber(0, 1000); // Valor máximo arbitrario de ppm
      alarmThreshold = 500; // Umbral de alarma de gas o humo a 500 ppm (ejemplo)
    } else if (sensorType === 'Fire') {
      value = Math.random() > 0.5 ? 1 : 0;
      alarmThreshold = 0.5; // Umbral de alarma de fuego a 0.5 (ejemplo)
    }

    return { value, alarmThreshold };
  }
};

export const getRandomAffectedEquipment = (sensorType: string) => {
  const relatedEquipment = equipmentBySensorType[sensorType];
  if (relatedEquipment) {
    const randomIndex = getRandomNumber(0, relatedEquipment.length - 1);
    return relatedEquipment[randomIndex];
  } else {
    return 'No related equipment found for this sensor type.';
  }
};

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
