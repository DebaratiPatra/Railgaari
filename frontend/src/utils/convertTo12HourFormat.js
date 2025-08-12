export const convertTo12HourFormat = (time) => {
  if (!time || typeof time !== 'string' || !time.includes('.')) return '--:--';

  const [hour, minute] = time.split('.').map(Number); 
  
  if (isNaN(hour) || isNaN(minute)) return '--:--';
  
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const convertedHour = hour % 12 || 12; 
  
  return `${convertedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

