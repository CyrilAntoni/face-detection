import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SearchBar from './components/SearchBar/SearchBar';
import Image from './components/Image/Image';
import Particles from 'react-particles-js';
import './App.css';

//initialize Clarifai API
const app = new Clarifai.App({
 apiKey: 'c6f23f1a98ab4496982d059e4aba3c7d'
});

//customize background particules
const particuleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      }
    },
    size: {
      value: 10,
    },
    line_linked: {
      width: 2,
    },
  }
};

//app initial state
const initialState = {
  input: '',
  imageUrl: '',
  faceArea: [],
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '', 
  },
};

//constructor, setup state
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  //load user's data
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    });
  }
  
  //struct the response into useable array
  extractFaceArea = data => {
    return data.outputs[0].data.regions.map(v => v.region_info.bounding_box);
  }
  
  //calculate the area of each face
  calculateFaceArea = data => {
    const image = document.getElementById('image-detection');
    const height = Number(image.height);
    const width = Number(image.width);
    
    this.setState({imageWidth: '150px'});
    
    return data.map(v => {
      return {
        top_row: v.top_row * height,
        left_col: v.left_col * width,
        bottom_row: height - (v.bottom_row * height),
        right_col: width - (v.right_col * width),
      };
    });
  }
  
  //set state faceArea
  setFaceArea = faceArea => {
    this.setState({faceArea});
  }
  
  //manage URL input
  onInputChange = event => {
    this.setState({input: event.target.value});
  };

  //manage API call and response
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
          })
          .catch(console.log);
        }
      
        this.setFaceArea(this.calculateFaceArea(this.extractFaceArea(response)));
        }
      )
      .catch(error => console.log(error));
  }
  
  onRouteChange = route => {
    if (route === 'signin') {
      this.setState(initialState);
    }
    this.setState({route});
  }
  
  render() {
    
    //change view based on state route
    let routeView;
    switch (this.state.route) {
      case 'home':
        routeView = <div>
                      <Logo />
                      <Rank name={this.state.user.name} entries={this.state.user.entries} />
                      <SearchBar 
                        onInputChange={this.onInputChange} 
                        onButtonSubmit={this.onButtonSubmit}
                      />
                      <Image 
                        imageUrl={this.state.imageUrl}
                        faceArea={this.state.faceArea}
                      />
                    </div>;
      break;
      case 'signin':
        routeView = <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
      break;
      case 'register':
        routeView = <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
      break;
      default:
        routeView = <Signin onRouteChange={this.onRouteChange} />;
    }
    
    return (
      <div className="App">
        <Particles className="particules"
          params={particuleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} route={this.state.route} />
        {routeView}
      </div>
    );
  }
}

export default App;
