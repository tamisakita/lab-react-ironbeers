import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar';

import './Beers.css';

import PunkAPI from 'punkapi-javascript-wrapper';

import { Link } from 'react-router-dom';

const punkapi = new PunkAPI();

class Beers extends Component {
  state = {
    allBeers: [],
  }

  componentDidMount() {
    punkapi.getBeers()  
      .then(res => {
        this.setState({allBeers: res});
      })
      .catch(err => console.log(err));
  }

  displayAllBeers = () => {
    const beerDisplay = this.state.allBeers.map((beer) => (
      <div key={beer.id} className="d-flex">
        <div >
          <img src={beer.image_url} alt={beer.name} height="200px" />
        </div>
        <div className="beer-information">
          <h1><Link to={`/singlebeer/${beer.id}`}>{beer.name}</Link></h1>
          <h2>{beer.tagline}</h2>
          <h3>Created by: {beer.contributed_by}</h3>  
        </div>
      </div>
    ));
    return beerDisplay;
  }

  render() {
    return(
      <div>
        <NavBar />
        {this.displayAllBeers()}
      </div>
    );
  }
}

export default Beers;

