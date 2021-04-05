export const maxLengthFullName = 60;
export const maxLengthTextField = 100;
export const maxLengthTextarea = 2000;
export const maxLengthPhoneNumber = 25;
export const maxLengthSubdomain = 63;
export const customAttributeType = 'CustomAttribute';
export const userAttributeType = 'UserAttribute';
export const ACCESS_TOKEN_KEY = 'token';
export const maxLengthParameterKey = 20;
export const maxLengthParameterValue = 30;
export const logSignInStatus = [
  { value: 'Success', label: 'Success' },
  { value: 'Error', label: 'Error' },
];
export const defaultFormat = {
  dateMinute: 'YYYY-MM-DD HH:mm \\[UTCZ\\]',
  dateSecond: 'YYYY-MM-DD HH:mm:ss \\[UTCZ\\]',
  dateSecondTimezone: (timezone) => `YYYY-MM-DD HH:mm:ss ${timezone}`,
};

export const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

export const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const shifts = ['s1', 's2'];
export const defaultWorkingTime = {
  s1: {
    startTime: '00:00',
    endTime: '12:00',
  },
  s2: {
    startTime: '12:00',
    endTime: '23:59',
  },
};

export const COLOR_VALUE = {
  DARK_GREEN: 'dark-green',
  LIGHT_GREEN: 'light-green',
  SUPER_LIGHT_GREEN: 'super-light-green',
  YELLOW: 'yellow',
  ORANGE: 'orange',
  GREY: 'grey',
};

export const COLOR_CODE = {
  [COLOR_VALUE.DARK_GREEN]: '#00b050',
  [COLOR_VALUE.LIGHT_GREEN]: '#92d050',
  [COLOR_VALUE.SUPER_LIGHT_GREEN]: '#B6DF89',
  [COLOR_VALUE.YELLOW]: '#ffc001',
  [COLOR_VALUE.ORANGE]: '#ed7d31',
  [COLOR_VALUE.GREY]: '#a5a5a5',
};

export const MANAGER_VALUE = {
  MANAGER: 'Manager',
  BACKUP_MANAGER: 'BackupManager',
  SUB_MANAGER: 'SubManager',
  BACKUP_SUB_MANAGER: 'BackupSubManager',
};

export const getParams = (condition = {}, isPaging = true) => {
  const { searchText, filterCondition, sorted } = condition;
  let { infoPage } = condition;

  if (!infoPage) {
    infoPage = {};
    infoPage.page = 0;
    infoPage.pageSize = 10;
  }
  const { page = 0, pageSize = 10 } = infoPage;

  let params = `?page=${page}&size=${pageSize}`;

  const stringSearch = !isPaging ? '?searchText=' : '&searchText=';
  params = searchText && searchText !== '' ? params + stringSearch + encodeURIComponent(searchText) : params;
  Object.keys(filterCondition || {}).forEach((key) => {
    if (filterCondition[key] !== null && filterCondition[key] !== undefined && filterCondition[key] !== '') {
      params = `${params}&${key}=${encodeURIComponent(filterCondition[key])}`;
    }
  });
  if (sorted && sorted.length > 0) {
    sorted.forEach((sort) => {
      const indexSort = sort.desc === true ? 'desc' : 'asc';
      params += `&sort_${sort.id}=${indexSort}`;
    });
  }
  return params;
};

export const IP_RANGE_TYPE = {
  WHITE_LIST: 'WHITE_LIST',
  BLACK_LIST: 'BLACK_LIST',
};
