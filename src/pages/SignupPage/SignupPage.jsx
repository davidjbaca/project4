
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";

function SignUpPage({handleSignUpOrLogin}) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from submitting the form, we will use fetch. We are using a SPA (single, page, app, no page reloads)


    const formData = new FormData();
    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }


    console.log(formData.forEach((item) => console.log(item)));

	try {
		
		await userService.signup(formData); // this finishes, after the signup fetch call sets the token in localstorage
		// after this we can route the user to whereever we want
		// the jwt token is now stored in localstorage
		handleSignUpOrLogin(); // this function is from the app, which gets the token and sets the user in the App component state
		// switch the view, switch what page we are on
		navigate('/')

	} catch(err){
		console.log(err.message, ' this is the error in signup')
		setError('Check your terminal, there was an error signing up')
	}


  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    // e.target.files is an array, we just want the first file uploaded to set in state
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
            <Image style={{ width: 200, height: 200 }} className="ui centered rounded image" src="https://i.imgur.com/FbCtzqwl.png" />   Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;