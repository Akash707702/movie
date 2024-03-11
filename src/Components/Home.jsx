import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Navbar from "react-bootstrap/Navbar";

import Card from "react-bootstrap/Card";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Home = () => {
  let [movie, setMovie] = useState([]);
  let [search, setSearch] = useState([]);
  const navigate = useNavigate();
  function movies() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=0eaa440e837bfb3f125fe42065d98f70&language=en-US`
    )
      .then(res => res.json())
      .then(data => {
        setMovie(data.results);
      });
  }

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?&api_key=0eaa440e837bfb3f125fe42065d98f70&language=en-US"
    )
      .then(res => res.json())
      .then(data => {
        setMovie(data.results);
      });
  }, []);
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Movie </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex ">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-3"
                aria-label="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={movies}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel>
        {movie.map(Items => {
          return (
            <div className="des">
              <img
                src={`https://image.tmdb.org/t/p/original/${Items.backdrop_path}`} alt=""
              />
              <p className="legend">
                <h1>{Items.title}</h1>
                <p>{Items.overview}</p>
                <p>{Items.release_date}</p>
              </p>
            </div>
          );
        })}
      </Carousel>

      <div className="display">
        {movie.map(Items => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original/${Items.backdrop_path}`}
              />
              <Card.Body>
                <Card.Title>{Items.title}</Card.Title>
                <Card.Text>{Items.overview}</Card.Text>
                <Button
                  variant="primary ms"
                  onClick={() => {
                    navigate("./movie", { state: { Items } });
                  }}
                >
                  see more
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
