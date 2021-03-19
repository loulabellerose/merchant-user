import { SET_BUSINESS } from '../actions/business';

const initialState = {
    business: {
        businessId: '',
        merchantId: '',
        businessName: '',
        grossMonthlySales: '',
        averageTransactionValue: '',
        pushToken: ''
    },
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
     case SET_BUSINESS: 
        return {
            ...state,
            business: {
                businessId: action.business.businessId,
                merchantId: action.business.merchantId,
                businessName: action.business.businessName,
                grossMonthlySales: action.business.grossMonthlySales,
                averageTransactionValue: action.business.averageTransactionValue,
                pushToken: action.business.pushToken
            }
        };
        default: 
        return state;      
    };    
}

