import React from 'react';
import { withFormik } from 'formik';

const ApplicationForm = formikProps => 
  <>
    <TextInput 
      value={formikProps.values.businessId}
      onBlur={formikProps.handleBlur('businessId')}
      onChangeText={formikProps.handleChange('businessId')}
    />
    {/*
    <Slider
      value={formikProps.values.slider}
      onValueChange={formikProps.handleChange('slider')}
    />
    
    <TextInput 
      value={formikProps.values.amount}
      onBlur={formikProps.handleBlur('amount')}
      onChangeText={formikProps.handleChange('amount')}
    />
    */}
    <Button
     title='Submit'
      onPress={() => formikProps.handleSubmit()} />
    </>
export default withFormik({
 initialValues={{
    businessId: '601dd06d90ffa052d858f2d5'
    //amount: '10000'
 }}
 onSubmit={(values, actions) => {...}}
 validate={values => {...}}
})(ApplicationForm);