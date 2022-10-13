import {combineReducers} from 'redux'
import {appointment} from './appointment'
import {user} from './user'
const Reducers = combineReducers({
   appointmentState:appointment,
   userState:user
})

export default Reducers