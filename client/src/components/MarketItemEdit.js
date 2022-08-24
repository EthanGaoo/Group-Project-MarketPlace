import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./marketitemedit.css";

const MarketItemEdit = (props) => {
  const { itemID } = useParams();
  const editedItem = props.marketplace.find((item) => {
    return itemID === item._id;
  });
  const [fields, setFields] = useState(editedItem);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setFields({ ...fields, location: location });
  }, [location]);

  const handleChange = (event) => {
    //
    const { name, value, checked, files } = event.target;
    const validateData = () => {
      if (event.target.type === "checkbox") {
        return { ...fields, [name]: event.target.checked };
      } else {
        return { ...fields, [name]: value };
      }
    };
    setFields(validateData());
  };
  const handleUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    const index = props.marketplace.indexOf(editedItem);
    event.preventDefault();
    if (photo) {
      const formData = new FormData();

      formData.append("photo", photo);
      // for (let f in fields) {
      //   formData.append(f, fields[f]);
      // }
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data.path);
      props.handleEdit(itemID, { ...fields, image: data.path }, index);
    } else {
      props.handleEdit(itemID, { ...fields }, index);
    }
  };
  return (
    <div className="editForm">
      <h1>Editing {editedItem.name}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formItemName">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price: </Form.Label>
          <Form.Control
            name="price"
            type="number"
            onChange={handleChange}
            value={fields.price}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategories">
          <Form.Label>Categories: </Form.Label>
          <Form.Control
            name="categories"
            type="text"
            onChange={handleChange}
            value={fields.categories}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description: </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            type="text"
            onChange={handleChange}
            value={fields.description}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image: </Form.Label>
          <Form.Control name="image" type="file" onChange={handleUpload} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location: </Form.Label>
          <Autocomplete
            className="form-control"
            apiKey={process.env.REACT_APP_GOOGLE_API}
            onPlaceSelected={(place) => setLocation(place.formatted_address)}
            defaultValue={fields.location}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDeliverableCheckbox">
          {fields.deliverable ? (
            <Form.Check
              name="deliverable"
              type="checkbox"
              label="Deliverable"
              onClick={handleChange}
              onChange={handleChange}
              checked
            />
          ) : (
            <Form.Check
              name="deliverable"
              type="checkbox"
              label="Deliverable"
              onClick={handleChange}
              onChange={handleChange}
            />
          )}
        </Form.Group>
        <Form.Group className="d-flex justify-content-end">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MarketItemEdit;
