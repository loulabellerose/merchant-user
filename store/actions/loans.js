var url = 'http://localhost:5000';
var businessId = '601dd16d37d369441e2e83d2';

export const SET_LOAN_STATUS = 'SET_LOAN_STATUS';
console.log('ACTIONS!!!!!!!!!');
var status, statusId, loanId = '';

export const fetchBusiness = () => {
    console.log('FETCHING BUSINESS');
    return (dispatch) => {
        fetch('http://localhost:5000/business/601dd16d37d369441e2e83d2')
        .then(res => 
            res.json())
        .then(data => {
            dispatch({ 
                type: SET_LOAN_STATUS, 
                loan: {
                    status : business.loan.status[loan.status.length-1].currentStatus,
                    statusId : business.loan.status[loan.status.length-1]._id,
                //Set loan ID to get date application was submitted
                    loanId : business.loan._id  
                }
            });
        }).catch(error => {
            console.log('There was an error with fetchBusiness')
        })
    
        
/*
        //Check to see if a loan application exists on the account
        if(business.loan==null) {
                status = 'No Loan Application Submitted',
                statusId = '',
                loanId = ''  
        }
        else {                        
                status = business.loan.status[loan.status.length-1].currentStatus,
                statusId = business.loan.status[loan.status.length-1]._id,
                //Set loan ID to get date application was submitted
                loanId = business.loan._id                
        }

        dispatch({ 
            type: SET_LOAN_STATUS, 
            loan: {
                status: status,
                statusId: statusId,
                loanId: loanId  
            }
        });
        */
        
    };
};

