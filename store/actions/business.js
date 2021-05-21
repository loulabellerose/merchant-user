import { BUSINESS_ID, URL } from '@env';

export const SET_BUSINESS = 'SET_BUSINESS';

export const fetchBusiness = () => {
    console.log('FETCHING BUSINESS');
    return (dispatch) => {
        fetch(`${URL}/business/${BUSINESS_ID}`)
        .then(res => 
            res.json())
        .then(business => {
            console.log(business);
                dispatch({ 
                    type: SET_BUSINESS,
                    business: {
                        businessId: business._id,
                        merchantId: business.merchantId,
                        businessName: business.businessName,
                        grossMonthlySales: business.grossMonthlySales,
                        averageTransactionValue: business.averageTransactionValue,
                        pushToken: business.pushToken
                    }
                });
            }) 
        .catch(error => {
            console.log(error)
        })
    };
};

