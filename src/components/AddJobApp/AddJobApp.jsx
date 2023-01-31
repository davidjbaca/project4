import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddJobApp({handleAddPost}) {

  const [, setCaption] = useState('');
  

  function handleChange(e){
	setCaption(e.target.value)
  }


  function handleSubmit(e){
	e.preventDefault();

	// we have to make form data because we are sending over a photo
	// to our express server
	const formData = new FormData()
	formData.append('caption', caption);
	formData.append('photo', photo)
	handleAddPost(formData)
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={}
          placeholder="What's on your pups mind?"
          onChange={handleChange}
          required
        />

        <Button type="submit" className="btn">
          Add Job App
        </Button>
      </Form>
    </Segment>
  );
}

export default AddJobApp;