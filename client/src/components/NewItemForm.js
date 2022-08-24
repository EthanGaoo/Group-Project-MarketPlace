import { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./newitemform.css";

const initialState = {
  name: "",
  categories: "",
  image: "",
  description: "",
  price: 0,
  deliverable: false,
  location: "",
  postowner: "",
};

const NewItemForm = (props) => {
  const [fields, setFields] = useState(initialState);
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
      } else if (event.target.file) {
        return { ...fields, [name]: files[0] };
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
    event.preventDefault();
    if (photo) {
      const formData = new FormData();

      formData.append("photo", photo);
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      props.handleCreate({
        ...fields,
        image: data.path,
        postowner: props.currentUser,
      });
    } else {
      props.handleCreate({
        ...fields,
        image: `https://loremflickr.com/320/240/${fields.name}`,
        postowner: props.currentUser,
      });
    }
  };
  return (
    <div className="newForm">
      <h1>New Item </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formItemName">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            name="name"
            type="text"
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
          />
        </Form.Group>
        {/* //Images */}
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
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDeliverableCheckbox">
          <Form.Check
            name="deliverable"
            type="checkbox"
            label="Deliverable"
            onClick={handleChange}
          />
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

export default NewItemForm;
