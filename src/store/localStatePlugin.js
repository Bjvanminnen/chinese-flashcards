import _ from 'lodash';

const key = 'vue-state';

// TODO: ability to look for updates and potentially throw out existing state
export function getLocalState() {
  const str = localStorage.getItem(key);
  try {
    return JSON.parse(str);
  } catch(err) {
    return undefined;
  }
}

export function resetLocalStorage() {
  localStorage.removeItem(key);
}

export default function saveLocalState(store) {
  store.subscribe((mutation, state) => {
    const str = JSON.stringify(_.cloneDeep(state));
    localStorage.setItem(key, str);
  });
}
