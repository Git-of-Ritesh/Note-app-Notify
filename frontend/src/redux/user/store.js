import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  userSlice  from '../user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    version : 1,
}

const rootReducer = combineReducers({
    user: userSlice
})


const persistedReducer = persistReducer(persistConfig , rootReducer)
   

export const store = configureStore({
    reducer: persistedReducer,
    // to prevent possible errors
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })

})

export const persistor = persistStore(store)