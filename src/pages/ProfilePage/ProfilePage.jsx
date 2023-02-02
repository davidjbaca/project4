import { useState, useEffect } from "react";


import PageHeader from "../../components/PageHeader/PageHeader";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddJobApp from "../../components/AddJobApp/AddJobApp";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import * as postsAPI from "../../utils/postApi";

import { useNavigate } from "react-router-dom";




import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";

import userService from "../../utils/userService";

function ProfilePage({ loggedUser, handleLogout }) {
    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  
    async function getProfile() {
      try {
        
        const userObject = await userService.getUser();
        const response = await userService.getProfile(userObject.username)
        console.log(response, "<---- response" )
  
        setLoading(false); 
        setPosts(response.data);
        setProfileUser(response.user);
        console.log(response, " <- data is getprofile");
      } catch (err) {
        console.log(
          err,
          " error in getProfile something went wrong with the getProfile api request, check server terminal"
        );
        setLoading(false);
        setError("Profile does not exist"); 
      }
    }

    // async function handleAddPost(post){
    //     try{

    //     setLoading(true);
    //     const response = await postsAPI.create(post);
    //     console.log([response.post, ...posts]);
    //     setLoading(false);
    //     }catch (err) {

    //     console.log(err.message, "error in addPost");
    //     setError("error creating post, please try again");
    //     }
    // }

    async function handleAddPost(post){
        
        try{

        setLoading(true);
        const response = await postsAPI.create(post);
        console.log(response, "handle post");
        setPosts([response.post, ...posts]);
        setLoading(false);
        }catch (err) {
        
        console.log(err.message, "error in addPost"); 
        setError("error creating post, please try again");
        }  
    }

    // async function getPosts() {
    //     try {
    //       const response = await postsAPI.getAll();
    //       console.log(response, " data");
    //       setPosts(response.data);
    //       setLoading(false);
    //     } catch (err) {
    //       console.log(err.message, " this is the error in getPosts");
    //       setLoading(false);
    //     }
    // }
    // useEffect(() => {
    //     //Getting posts, C(R)UD
    
    //     getPosts();
    // }, []); 
  
    useEffect(() => {
      getProfile();
    }, []);
  
    if (error) {
      return (
        <>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
          <ErrorMessage error={error} />
        </>
      );
    }
  
    if (loading) {
      return (
        <>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
          <Loader />
        </>
      );
    }
  
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddJobApp handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
        <Grid.Row centered>
          <Grid.Column style={{ maxWidth: 750 }}>
            <PostDisplay
              posts={posts}
              postsCol={4}
              isProfile={true}
              loading={loading}
              loggedUser={loggedUser}

            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  
  export default ProfilePage;
  