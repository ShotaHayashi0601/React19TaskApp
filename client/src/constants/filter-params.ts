export const sortMenu = {
  DEFAULT: 'デフォルト',
  BY_DATE: '期日が近い順',
  BY_WORKINGTIME: '作業時間が多い順',
};

export const sortMenuList = Object.entries(sortMenu).map(([key, value]) => ({
  id: key,
  name: value,
}));
