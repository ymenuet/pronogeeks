export default (date) => {
  date = new Date(date);
  let weekDay = date.getDay();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();
  switch (weekDay) {
    case 0:
      weekDay = 'dimanche';
      break;
    case 1:
      weekDay = 'lundi';
      break;
    case 2:
      weekDay = 'mardi';
      break;
    case 3:
      weekDay = 'mercredi';
      break;
    case 4:
      weekDay = 'jeudi';
      break;
    case 5:
      weekDay = 'vendredi';
      break;
    case 6:
      weekDay = 'samedi';
      break;
    default:
      weekDay = '';
  }
  return {
    fullDate: `${weekDay} ${date.getDate()}/${month}/${date.getFullYear()}`,
    fullTime: `${date.getHours()}h${minutes}`,
  };
};
