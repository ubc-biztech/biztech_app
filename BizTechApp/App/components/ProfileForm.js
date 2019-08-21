import React, {Component} from 'react';
import { Picker, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { AMAZON_API } from 'react-native-dotenv';
import { populateUser } from '../actions/Login';
//styling
import styles from '../styles/Styles';
import Button from '../components/Button'

class Register extends Component {

  constructor(){
    super();
    this.state = {
			err: false,
			errMessage: ''
    };
  }

  render() {
    let userData = this.props.userData;
    return (
      <Formik
        initialValues={{
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
          id: userData.id,
          faculty: userData.faculty,
          yr: userData.yr,
          gender: userData.gender,
          diet: userData.diet,
        }}
        validationSchema={ this.props.schema }
        onSubmit={(values, actions) => {
          const {faculty, yr, gender} = values;

          this.registerPress(values)

          actions.setSubmitting(false)
        }}
        onValueChange={ (itemIndex) => {
          this.props.values.diet = itemIndex
        }}
      >
        { props => (
        <View >
            <Text style={{ fontSize: 10 }}>First Name</Text>
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

            <Text style={{ fontSize: 10 }}>Last Name</Text>
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

            <Text style={{ fontSize: 10 }}>Email</Text>
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

            <Text style={{ fontSize: 10 }}>Year of Study</Text>
            <Picker
              style={styles.text}
              selectedValue={this.state.yr}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue('yr', itemValue)
                this.setState({yr: itemValue})
              }}>
              <Picker.Item label={this.props.userData.yr} value={this.props.userData.yr}/>
              <Picker.Item label='1' value='1'/>
              <Picker.Item label='2' value='2'/>
              <Picker.Item label='3' value='3'/>
              <Picker.Item label='4' value='4'/>
              <Picker.Item label='5+' value='5+'/>
            </Picker>
            {//show error text if state has yearErr
              this.state.yearErr &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Required</Text>}

            <Text style={{ fontSize: 10 }}>Faculty</Text>
            <Picker
              selectedValue={this.state.faculty}
              onValueChange={(itemValue) => {
                props.setFieldValue('faculty', itemValue)
                this.setState({faculty: itemValue})
              }}>
              <Picker.Item label={this.props.userData.faculty} value={this.props.userData.faculty}/>
              <Picker.Item label='Science' value='Science'/>
              <Picker.Item label='Commerce' value='Commerce'/>
              <Picker.Item label='Arts' value='Arts'/>
              <Picker.Item label='Engineering' value='Engineering'/>
              <Picker.Item label='Land Food Systems' value='Land Food Systems'/>
              <Picker.Item label='Forestry' value='Forestry'/>
            </Picker>
            {this.state.facultyErr &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Required</Text>}

            <Text style={{ fontSize: 10 }}>Gender</Text>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue('gender', itemValue)
                this.setState({gender: itemValue})
              }}>
              <Picker.Item label={this.props.userData.gender} value={this.props.userData.gender}/>
              <Picker.Item label='Male' value='Male'/>
              <Picker.Item label='Female' value='Female'/>
              <Picker.Item label='Other' value='Other'/>
            </Picker>
            {this.state.genderErr &&
              <Text style={{ fontSize: 10, color: 'red' }}>
              Required</Text>}

            <Text style={{ fontSize: 10 }}>Dietary Restrictions</Text>
            <Picker
              selectedValue={this.state.diet}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue('diet', itemValue)
                this.setState({diet: itemValue})
              }}>
              <Picker.Item label={this.props.userData.diet} value={this.props.userData.diet}/>
              <Picker.Item label='None' value='None'/>
              <Picker.Item label='Vegan' value='Vegan'/>
              <Picker.Item label='Vegetarian' value='Vegetarian'/>
              <Picker.Item label='Halal' value='Halal'/>
              <Picker.Item label='Gluten Free' value='Gluten Free'/>
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


  registerPress(values) {
    const { email, pass, fname, lname, id, yr, faculty, gender, diet } = values;
    console.log(id)
    const body = JSON.stringify({
        fname,
        lname,
        email,
        id,
        faculty,
        yr,
        gender,
        diet
    })
    let response = fetch(AMAZON_API+'/users/update?id='+id,
    {   method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
        })
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        this.props.populateDispatch(id)
    })
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
		populateDispatch: (id) => dispatch(populateUser(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Register);
