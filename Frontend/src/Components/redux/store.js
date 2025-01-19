import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../redux/navslice'
const store = configureStore({
    reducer:{
        auth:authreducer
    }
})

export  {store};