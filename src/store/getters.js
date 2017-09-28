

export const isLoggedIn = state =>{
  return state.auth.isLoggedIn;
}

export const authToken = state =>{
  return state.auth.token;
}

export const loginError = state =>{
  return state.auth.error;
}

export const loginInProgress = state =>{
  return state.auth.inProgress;
}


export const contestList = state =>{
  return Object.values(state.app.contest);
}

export const contestFilter = state =>{
  return state.app.filter;
}

export const contestListLength = (state, getters) =>{
  return getters.contestList.length;
}

export const contestDetail = state => (id) =>{
  return state.app.contest[id];
}


export const moreContest = state =>{
  return state.app.moreData;
}

export const contestLoaded = state =>{
  return state.app.isLoaded;
}


export const contestError = state =>{
  return state.app.error;
}

export const contestInProgress = state =>{
  return state.app.inProgress;
}

