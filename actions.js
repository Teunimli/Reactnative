export const CUSTOMERS_AVAILABLE = 'CUSTOMERS_AVAILABLE';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

// Get Customers
export const addCustomers = (customers) => ({
    type: CUSTOMERS_AVAILABLE,
    data: {customers}
});

// Add Customer - CREATE (C)
export const addCustomer = (customer) => ({
    type: ADD_CUSTOMER,
    data: {customer}
});

// Update Customer - UPDATE (U)
export const updateCustomer = (customer) => ({
    type: UPDATE_CUSTOMER,
    data: {customer}
});

// Delete Customer - DELETE (D)
export const deleteCustomer = (id) => ({
    type: DELETE_CUSTOMER,
    data: {id}
});