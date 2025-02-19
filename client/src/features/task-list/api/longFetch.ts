export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fetched data');
    }, 2000);
  });
}
