import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  FormGroup,
  Col
} from 'reactstrap';

import Weather from './Weather';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ""
    };
  }

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    });
  };

  getWeather = (city) => {
    if (city === "def") {
      this.setState({ weather: null });
    } else{
      fetch(`/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        this.setState({ weather });
      });
    }
  };

  handleAddCity = () => {
    fetch('/api/cities', {
      method: "post",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({city: this.state.newCityName})
    })
    .then(res => res.json())
    .then(res => {
      this.getCityList();
      this.setState({ newCityName: ""});
    });
  };

  handleChangeCity = (e) => {
    if (e.target.value === "defaultText") {
      this.getWeather("def");
    } else{
      this.getWeather(e.target.value);
    }
  };

  handleInputChange = (e) => {
    this.setState({newCityName: e.target.value});
  };

  componentDidMount() {
    this.getCityList();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyWeather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your favorite cities!</p>
              <InputGroup>
                <Input
                  placeholder="New city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No cities addet yet.</option> };
                { this.state.cityList.length > 0 && <option value="defaultText">Select a city.</option> };
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) };
              </Input>
          </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather} />
      </Container>
    );
  }
}

export default App;
