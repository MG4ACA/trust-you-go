import { Tag } from 'primereact/tag';

const LocationTypeTag = ({ type }) => {
  const getTagProps = () => {
    switch (type) {
      case 'tourist_spot':
        return { severity: 'info', value: 'Tourist Spot' };
      case 'accommodation':
        return { severity: 'success', value: 'Accommodation' };
      case 'restaurant':
        return { severity: 'warning', value: 'Restaurant' };
      case 'activity':
        return { severity: 'danger', value: 'Activity' };
      default:
        return { severity: 'secondary', value: type?.replace('_', ' ') };
    }
  };

  const { severity, value } = getTagProps();

  return <Tag value={value} severity={severity} rounded />;
};

export default LocationTypeTag;
