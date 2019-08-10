import React, {Component} from 'react';
import { Picker, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
//styling
import styles from '../styles/Styles';
import Button from '../components/Button'

// Validation Schema for Formik form using Yup library
// const FormSchema = Yup.object().shape({
// fname: Yup.string()
// 	.required('Required'),
// lname: Yup.string()
// 	.required('Required'),
// id: Yup.number()
// 	.min(9999999, 'Valid Student ID required')
// 	.max(100000000, 'Valid Student ID required')
// 	.required('Required'),
// pass: Yup.string()
// 	.min('6', 'Weak password')
// 	.required('Password Required'),
// email: Yup.string()
// 	.email('Valid email required')
// 	.required('Email required'),
// });

class Register extends Component {

  constructor(){
    super();
    this.state = {
			err: false,
			errMessage: ''
    };
  }



  render() {
    let userData = this.props.userData
    return (
      <Formik
        initialValues={{
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
          id: userData.id,
          faculty: userData.faculty,
          year: userData.year,
          gender: userData.gender,
          diet: userData.diet,
        }}
        validationSchema={ this.props.schema }
        onSubmit={(values, actions) => {
          const {faculty, year, gender} = values;

          this.registerPress(values)

          actions.setSubmitting(false)
        }}
        onValueChange={ (itemIndex) => {
          this.props.values.diet = itemIndex
        }}
      >
        { props => (
        <View >
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={props.handleChange('fname')}
              onBlur={() => props.setFieldTouched('fname')}
              value={props.values.fname}
            />
            {//if touched or invalid show error text
              props.touched.fname && props.errors.fname &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              {props.errors.fname}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={props.handleChange('lname')}
              onBlur={() => props.setFieldTouched('lname')}
              value={props.values.lname}
            />
            {props.touched.lname && props.errors.lname &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              {props.errors.lname}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              onBlur={() => props.setFieldTouched('email')}
              value={props.values.email}
            />
            {props.touched.email && props.errors.email &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              {props.errors.email}</Text>}

            {!this.props.disableSid &&
              <TextInput
              style={styles.input}
              placeholder="Student Number"
              onChangeText={props.handleChange('id')}
              onBlur={() => props.setFieldTouched('id')}
              value={props.values.id}
              />
            }
            {props.touched.id && props.errors.id &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Valid Student ID required</Text>}

            <Picker
              style={styles.text}
              selectedValue={this.state.year}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue('year', itemValue)
                this.setState({year: itemValue})
              }}>
              <Picker.Item label='Year of Study' value=''/>
              <Picker.Item label='1' value='1'/>
              <Picker.Item label='2' value='2'/>
              <Picker.Item label='3' value='3'/>
              <Picker.Item label='4' value='4'/>
              <Picker.Item label='5+' value='5'/>
            </Picker>
            {//show error text if state has yearErr
              this.state.yearErr &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Required</Text>}

            <Picker
              selectedValue={this.state.faculty}
              onValueChange={(itemValue) => {
                props.setFieldValue('faculty', itemValue)
                this.setState({faculty: itemValue})
              }}>
              <Picker.Item label='Faculty' value=''/>
              <Picker.Item label='Science' value='science'/>
              <Picker.Item label='Commerce' value='commerce'/>
              <Picker.Item label='Arts' value='arts'/>
              <Picker.Item label='Engineering' value='engineering'/>
              <Picker.Item label='Land Food Systems' value='lfs'/>
              <Picker.Item label='Forestry' value='forestry'/>
            </Picker>
            {this.state.facultyErr &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Required</Text>}

            <Picker
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue('gender', itemValue)
                this.setState({gender: itemValue})
              }}>
              <Picker.Item label='Gender' value=''/>
              <Picker.Item label='Male' value='m'/>
              <Picker.Item label='Female' value='f'/>
              <Picker.Item label='Other' value='o'/>
            </Picker>
            {this.state.genderErr &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Required</Text>}

            <Picker
              selectedValue={this.state.diet}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue('diet', itemValue)
                this.setState({diet: itemValue})
              }}>
              <Picker.Item label='Dietary Restrictions' value='none'/>
              <Picker.Item label='Vegan' value='Vegan'/>
              <Picker.Item label='Vegetarian' value='Vegetarian'/>
              <Picker.Item label='Halal' value='Halal'/>
              <Picker.Item label='Gluten Free' value='Gluten'/>
            </Picker>

            <Button
              disabled={props.isSubmitting}
              onPress={props.handleSubmit}
              title={this.props.title} />

            { // Notify user if account already exists or some other error
              this.state.err && <Text style={{ marginVertical: 10, fontSize: 10, color: 'red' }}>{this.state.errMessage}</Text> }

          </View>
        )}
      </Formik>
    )
  }
}
// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
	};
};

// actions
const mapDispatchToProps = (dispatch) => {
	return {
		doVerify: () => dispatch(doVerify())
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Register);
