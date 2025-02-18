export async function longFetch() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return 'long fetch done';
}
