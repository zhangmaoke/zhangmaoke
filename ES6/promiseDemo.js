import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';

function reducer(state,action){
   switch(action.type){
     case 'GET_WEATHER_SUCCESS':return {...state,...action.payload}
   }
}
const store = createStore(reducer,applyMiddleware(promise));

const fetchData = (url, params) => fetch(url, params)
async function getWeather(url, params) {
    const result = await fetchData(url, params)
    if (result.error) {
        return {
            type: 'GET_WEATHER_ERROR', error: result.error,
        }
    }
        return {
            type: 'GET_WEATHER_SUCCESS', payload: result,
        }
    }

store.dispatch(getWeather("http://www.wwather.com",{"method":"POST"}));