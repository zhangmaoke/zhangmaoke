import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

function reducer(state,action){
   switch(action.type){
     case 'GET_WEATHER_SUCCESS':return {...state,...action.payload}
   }
}
const store = createStore(reducer,state,applyMiddleware(thunk));

function getWeather(url, params) {
  return (dispatch, getState) => {
      fetch(url, params)
          .then(result => {
              return result.json();
          }).then(data=>{
            dispatch({
                type: 'GET_WEATHER_SUCCESS', payload: data,
            });
          })
          .catch(err => {
              dispatch({
                  type: 'GET_WEATHER_ERROR', error: err,
              });
          });
      };
}

store.dispatch(getWeather("http://www.wwather.com",{"method":"POST"}));