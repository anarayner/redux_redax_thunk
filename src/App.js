import React from 'react';
import {Button, Container} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {addCustomerAction, removeCustomerAction} from './store/customerReducer';
import {fetchCustomers} from './store/asyncActions/customers';

const App = () => {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customers.customers)

    const add = () => {
      dispatch({type: 'ADD_CASH', payload: 5})
    }
    const get = () => {
        dispatch({type: 'GET_CASH', payload: 5})
    }
    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id))
    }
    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now()
        }
        dispatch(addCustomerAction(customer))
    }
  return (
      <div>
          <Container style={{fontSize: '35px', marginTop: '20px'}}>
          {cash}
          <Button style={{margin: '20px'}}
                  onClick={() => add()} variant="contained">Add cash</Button>
          <Button onClick={() => get()} variant="contained">Get cash</Button>
              <Button style={{margin: '20px'}}
                      onClick={() => addCustomer(prompt())} variant="contained">Add user</Button>
              <Button onClick={() => get()} variant="contained">Remove user</Button>
              <Button onClick={() => dispatch(fetchCustomers())} variant="contained">Fetch users from db</Button>

              {customers.length > 0?
              <div>
                  {customers.map(customer =>
                      <div key={customer.id}
                           style={{cursor: 'default'}}
                           onClick={()=>removeCustomer(customer)}
                      >{customer.name}</div>
                  )}
              </div>
                  :
              <div style={{fontSize: '35px', marginTop: '20px'}}>No customers</div>

              }
          </Container>
      </div>
  );
};

export default App;


