import {USER_LOCATION,USER_VACCINE_TYPE,USER_NEARBY_LOCATION,USER_AP_DATE,USER_AP_TIME} from '../constants'

const intialState ={
    location:'',
    vaccinetype:'',
    nearbyLocation:'',
    date:'',
    time:''
}

export const appointment = (state = intialState,action) =>
{
    switch(action.type)
    {

        case USER_LOCATION:
                return {
                    ...state,
                    location:action.location
                }

        case USER_VACCINE_TYPE:
                return {
                    ...state,
                    vaccinetype:action.vaccinetype
                }
        
        case USER_NEARBY_LOCATION:
            return {
                ...state,
                nearbyLocation:action.nearbyLocation
            }
        
        case USER_AP_DATE:
            return {
                ...state,
                date: action.date
            }
        case USER_AP_TIME:
            return {
                ...state,
                time:action.time
            }

        
        default:
            return state;

    
    }
}
