import {ALL_LOCATIONS,ALL_NEARBY_LOCATIONS,ALL_VACCINES,ALL_APPOINTMENTS,USERINFO, GETALLDATESETTINGS} from '../constants'

const intialState ={
    all_location:[],
    all_nearby_location:[],
    all_vaccines:[],
    all_appointments:[],
    userinfo:{},
    alldatesettings:{}
    }

   
export const user = (state = intialState,action) =>
    {
        switch(action.type)
        {
    
            case ALL_LOCATIONS:
                    return {
                        ...state,
                        all_location:[...action.all_location]
                    }
            case ALL_NEARBY_LOCATIONS:
                return {
                    ...state,
                    all_nearby_location:[...action.all_nearby_location]
                }
            
            case ALL_VACCINES:
                return {
                    ...state,
                    all_vaccines:[...action.all_vaccines]
                }

            case ALL_APPOINTMENTS:
                    return {
                        ...state,
                        all_appointments:[...action.all_appointments]
                    }
            case USERINFO:
                return {
                    ...state,
                    userinfo:action.userinfo
                }
            case GETALLDATESETTINGS:
                return {
                    ...state,
                    alldatesettings:action.alldatesettings
                }
                
                

                    default:
                        return state;
            
                
                }

    }
            