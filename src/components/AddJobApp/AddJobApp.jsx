import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

import PageHeader from "../PageHeader/PageHeader";
import PostDisplay from "../PostDisplay/PostDisplay";

function AddJobApp({handleAddPost}) {

  const [ employer, setEmployer] = useState('');
  const [ email, setEmail] = useState('');
  const [ notes, setNotes] = useState('')
  

  function handleEmployerChange(e){
	setEmployer(e.target.value)
  }

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handleNotesChange(e){
    setNotes(e.target.value)
  }

  function handleSubmit(e){
	e.preventDefault();

	// we have to make form data because we are sending over a photo
	// to our express server
	const formData = new FormData()
	formData.append('employer', employer);
	formData.append('email', email)
	formData.append('notes', notes)
	handleAddPost(formData)
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="employer"
          value={employer}
          placeholder="Employer"
          onChange={handleEmployerChange}
          required
        />
         <Form.Input
          className="form-control"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />
         <Form.Input
          className="form-control"
          name="notes"
          value={notes}
          placeholder="Notes"
          onChange={handleNotesChange}
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