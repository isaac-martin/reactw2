import React, {Component} from 'react';
import loader from './images/loader.svg';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const Userhint = ({loading, hintText}) => (
  <div className="user-hint">
    {loading ? <img className="block mx-auto" src={loader} /> : hintText}
  </div>
);

class App extends Component {
  searchGiphy = async searchTerm => {
    try {
      const response = await fetch(
        'https://api.giphy.com/v1/gifs/search?api_key=lNddjF93W1e1puBzOFqqDPiZBGd3utLP&q=Dog&limit=25&offset=0&rating=R&lang=en'
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {}
  };
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }
  handleChange = event => {
    const {value} = event.target;
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: value,
      hintText: value.length > 2 ? `Hit Enter To Search ${value}` : ''
    }));
  };

  //when we have two or more in our search box and we press enter
  // we want to run a search

  handleKeyPress = event => {
    const {value} = event.target;

    if (value.length > 2 && event.key === 'Enter') {
      this.searchGiphy(value);
    }
  };

  render() {
    const {searchTerm} = this.state;
    return (
      <div className="page">
        <Header />
        <div className="grid search">
          {}
          <input
            className="grid-item input"
            placeholder="Type Something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>

        <Userhint {...this.state} />
      </div>
    );
  }
}

export default App;
