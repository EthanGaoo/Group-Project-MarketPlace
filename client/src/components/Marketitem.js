import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./marketitem.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const Marketitem = (props) => {
  const { itemID } = useParams();

  const navigate = useNavigate();
  const Item = props.marketplace.find((item) => {
    return item._id === itemID;
  });

  return (
    <div className="container">
      <Row className="mainContainer">
        <img
          className="marketImg"
          style={{
            width: "30rem",
            height: "40rem",
            objectFit: "cover",
          }}
          src={Item.image}
        />

        <Card style={{ width: "420px" }}>
          <h1>{Item.name}</h1>
          <Card.Body>
            <Card.Text>{Item.description}</Card.Text>
            <Card.Text>Price: ${Item.price}</Card.Text>
            <Card.Text>{Item.location}</Card.Text>
            {props.currentUser === Item.postowner ? (
              <div className="buttons">
                <button
                  class="button-55"
                  onClick={() => {
                    navigate(`/marketplace/${itemID}/edit`);
                  }}
                  role="button"
                >
                  Edit
                </button>
                <button
                  class="button-55"
                  onClick={() => {
                    props.handleDelete(itemID);
                  }}
                  role="button"
                >
                  Delete
                </button>
                <button
                  class="button-55"
                  onClick={() => {
                    navigate("/marketplace");
                  }}
                  role="button"
                >
                  Go Back
                </button>
              </div>
            ) : (
              <div>
                <button
                  class="button-55"
                  onClick={() => {
                    navigate("/marketplace");
                  }}
                  role="button"
                >
                  Go Back
                </button>
              </div>
            )}
          </Card.Body>
          <iframe
            className="iframe"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API}
              &q=${Item.location}&language=en`}
            width="400"
            height="325"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          />
        </Card>
      </Row>
    </div>
  );
};

export default Marketitem;
