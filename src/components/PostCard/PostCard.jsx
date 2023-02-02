import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


function PostCard({ post, isProfile, deletePost }) {


  return (
    <Card key={post._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to='/'>
              {/* <Image
                size="large"
                avatar
                src={
                  post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              /> */}
              {post.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}

      <Card.Content>
        <Card.Description><strong>{post.employer}</strong></Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>{post.link}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>{post.notes}</Card.Description>
      </Card.Content>

    </Card>
  );
}

export default PostCard;


