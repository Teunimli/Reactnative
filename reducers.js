import { combineReducers } from 'redux';

import { CUSTOMERS_AVAILABLE, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { customers: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER:
            let { customer } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));

            clone.unshift(customer); //add the new customer to the top

            return {...state, customers: clone};

        case CUSTOMERS_AVAILABLE:
            let { customers } = action.data;

            return {...state, customers};

        case UPDATE_CUSTOMER:{
            let { customer } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === customer.id);

            //if the customer is in the array, update the customer
            if (index !== -1) clone[index] = customer;

            return {...state, customers: clone};
        }

        case DELETE_CUSTOMER:{
            let { id } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));

            //check if customer already exist
            const index = clone.findIndex((obj) => obj.id === id);

            //if the customer is in the array, remove the customer
            if (index !== -1) clone.splice(index, 1);

            return {...state, customers: clone};
        }

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({dataReducer});

export default rootReducer;