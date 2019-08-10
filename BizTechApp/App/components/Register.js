import React, {Component} from 'react';
import { Picker, Button, Modal, StyleSheet, TextInput, View} from 'react-native';
import { Text, Input } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';
import Auth from '@aws-amplify/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { populateUser } from '../actions/Login';
import { connect } from 'react-redux';

// Validation Schema for Formik form using Yup library
const FormSchema = Yup.object().shape({
fname: Yup.string()
	.required('Required'),
lname: Yup.string()
	.required('Required'),
id: Yup.number()
	.min(9999999, 'Valid Student ID required')
	.max(100000000, 'Valid Student ID required')
	.required('Required'),
pass: Yup.string()
	.min('6', 'Weak password')
	.required('Password Required'),
email: Yup.string()
	.email('Valid email required')
	.required('Email required'),
});

class Register extends Component {
	  constructor(){
	    super();
	    this.state = {
        confirmationCode: '',
				genderErr: false,
				yearErr: false,
				facultyErr: false,
				err: false,
				errMessage: ''
      };
	  }

	render() {
		const { diet } = this.props
		return (
			<View>
			<Formik
				initialValues={{
					fname: '',
					lname: '',
					email: '',
					id: '',
	        pass: '',
	        faculty: '',
	        year: '',
	        gender: '',
	        diet: 'none',
				}}
				validationSchema={ FormSchema }
				onSubmit={(values, actions) => {
					const {faculty, year, gender} = values;

					// check if dropdown fields are blank, generate error if they are
					( faculty == '' ? this.setState({facultyErr: true}) : this.setState({facultyErr: false}));
					( year == '' ? this.setState({yearErr: true}) : this.setState({yearErr: false}));
					( gender == '' ? this.setState({genderErr: true}) : this.setState({genderErr: false}));
					const {facultyErr, yearErr, genderErr} = this.state;

					// check if there are no dropdown field errors
					if (!facultyErr && !yearErr && !genderErr ){
						this.registerPress(values)
					}
					actions.setSubmitting(false)
				}}
	      onValueChange={ (itemIndex) => {
	        this.props.values.diet = itemIndex
	      }}
			>
				{ props => (
				<View style={styles.container}>
						<Text style={styles.header}>Member Registration</Text>
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

		        <TextInput
	            style={styles.input}
	            placeholder="Student Number"
							onChangeText={props.handleChange('id')}
							onBlur={() => props.setFieldTouched('id')}
		          value={props.values.id}
						/>
	          {props.touched.id && props.errors.id &&
							<Text style={{ fontSize: 10, color: 'red' }}>
							Valid Student ID required</Text>}

		        <TextInput
							secureTextEntry={true}
	            style={styles.input}
	            placeholder="Password"
							onChangeText={props.handleChange('pass')}
							onBlur={() => props.setFieldTouched('pass')}
		          value={props.values.pass}
						/>
	          {props.touched.pass && props.errors.pass &&
							<Text style={{ fontSize: 10, color: 'red' }}>
							{props.errors.pass}</Text>}

						<Picker
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
	            color='#7ad040'
							onPress={props.handleSubmit}
							title="Join the BizTech Family!" />

						{ // Notify user if account already exists or some other error
							this.state.err && <Text style={{ marginVertical: 10, fontSize: 10, color: 'red' }}>{this.state.errMessage}</Text> }

					</View>
		    )}
	  </Formik>

	</View>

		);
  }

  registerPress(values) {
    const { email, pass, fname, lname, id, year, faculty, gender, diet } = values;
		this.setState({email})
      Auth.signUp({
        username: email,
        password: pass,
        attributes: {
          email,
          name: fname,
          family_name: lname,
					nickname: id
        },
        })
        // On success, show Confirmation Code Modal
        .then(() => {
					const body = JSON.stringify({
							fname,
							lname,
							email,
							faculty,
							id,
							year,
							gender,
							diet
					})
			    let response = fetch(AMAZON_API+'/users/create',
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
			    .done();

				})
        // On failure, display error in console
        .catch(err => {
					console.log(err)
					if (err.message != 'Forbidden')
						this.setState({err: true})
						this.setState({errMessage: err.message})
					if (err.code == 'UsernameExistsException')
						this.setState({err: true})

				});

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

export default connect(mapStateToProps, mapDispatchToProps)
							(Register);

const styles = StyleSheet.create({
	container: {
    alignSelf: 'stretch',
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 60
	},
	header: {
    color: '#333333',
    marginBottom: 20,
    fontSize: 25,
  },
  input: {
  	color: '#333333',
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: '#7ad040',
    borderBottomWidth: 1
  },
  button: {
    paddingTop: 10,
    marginTop: 10,
  },
});
