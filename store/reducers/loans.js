import { SET_LOAN_STATUS } from '../actions/loans';

const initialState = {
    loan: {
        status: 'status',
        statusId: 'statusId',
        loanId: 'loanId'  
    },
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
     case SET_LOAN_STATUS: 
        return {
            ...state,
            loan: {
                status: action.loan.status,
                statusId: action.loan.statusId,
                loanId: action.loan.loanId  
            } 
        };
        default: 
        return state;      
    };    
}

