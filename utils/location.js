const GOOGLE_MAPS_API = 'AIzaSyB03rH6K99UycLwn1j47Rpsnu7N8gzJvPw';
const USER_LETTER = 'U';
const MARKER_COLOR = '0xea1c5d';
const MAP_SIZE = '400x200';
const MAP_ZOOM = '15';

export const getGoogleMapPreview = ({ latitude, longitude }) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${MAP_ZOOM}&size=${MAP_SIZE}&maptype=roadmap&markers=color:${MARKER_COLOR}%7Clabel:${USER_LETTER}%7C${latitude},${longitude}&key=${GOOGLE_MAPS_API}`;
  return imagePreviewUrl;
};

export const getGoogleMapAddress = async ({ latitude, longitude }) => {
  // Google maps geocoding: https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
};
