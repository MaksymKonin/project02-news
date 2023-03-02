function save(key, value) {
  try {
    const valueJson = JSON.stringify(value);
    localStorage.setItem(key, valueJson);
  } catch (error) {
    console.error(error);
  }
}

function load(key) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

export default {
  save,
  load,
};
