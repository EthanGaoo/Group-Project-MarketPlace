import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./marketplace.css";

const Marketplace = (props) => {
  const navigate = useNavigate();
  const MarketplaceList = props.marketplace.map((item) => {
    return (
      <Col key={item._id} className="mb-3">
        <Card style={{ width: "20rem", height: "100%", margin: "12px" }}>
          <Card.Img
            onClick={() => navigate(`/marketplace/${item._id}`)}
            variant="top"
            src={item.image}
            style={{
              width: "20rem",
              height: "25rem",
              objectFit: "cover",
            }}
          />
          <Card.Body className="cardBody">
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>${item.price}</Card.Text>
            <button
              class="button-55"
              onClick={() => navigate(`/marketplace/${item._id}`)}
              role="button"
            >
              Details
            </button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  const CarouselList = props.marketplace.map((item) => {
    return (
      <div>
        <img
          className="carouselImage"
          style={{
            height: "20rem",
            objectFit: "cover",
            objectPositionq: "center",
          }}
          src={`${item.image}`}
        />
        <p
          className="legend"
          onClick={() => navigate(`/marketplace/${item._id}`)}
        >
          {item.name}
        </p>
      </div>
    );
  });
  return (
    <div>
      <Carousel width="80%" className="carouselBar">
        {CarouselList}
      </Carousel>
      <Row className="mainContainer">{MarketplaceList}</Row>
    </div>
  );
};

export default Marketplace;
