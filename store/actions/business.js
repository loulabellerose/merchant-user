var url = 'http://localhost:5000';
var businessId = '6051e3f87cfb24fe1d922c2f';

export const SET_BUSINESS = 'SET_BUSINESS';

export const fetchBusiness = () => {
    console.log('FETCHING BUSINESS');
    return (dispatch) => {
        fetch(`${url}/business/${businessId}`)
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

