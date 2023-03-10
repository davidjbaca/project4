import React from 'react';
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';

export default function PostDisplay({posts, postsCol, isProfile, loading, loggedUser, deletePost}){

    if(loading){
      return (
      <Segment>
        <Dimmer active inverted>
          <Loader size="small">Loading</Loader>
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
      )
    }


    return (
        <Card.Group itemsPerRow={postsCol} stackable>
        {posts?.map((post) => {
          return (
            <PostCard
              post={post}
              key={post._id}
              isProfile={isProfile}
              loggedUser={loggedUser}
              deletePost={deletePost}
            />
          );
        })}
      </Card.Group>
  
    )
}
