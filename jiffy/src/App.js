import React, {Component} from 'react';
import loader from './images/loader.svg';
import clearButton from './images/close-icon.svg';
import Gif from './Gif';

const random = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Header = ({clearSearch, hasResults}) => (
  <div className="header grid">
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
  </div>
);

const Userhint = ({loading, hintText}) => (
  <div className="user-hint">
    {loading ? <img className="block mx-auto" src={loader} /> : hintText}
  </div>
);

class App extends Component {
  searchGiphy = async searchTerm => {
    this.setState({
      loading: true
    });
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=lNddjF93W1e1puBzOFqqDPiZBGd3utLP&q=${searchTerm}&limit=25&offset=0&rating=R&lang=en`
      );

      const {data} = await response.json();

      if (!data.length) {
        throw `Nothing found for ${searchTerm}`;
      }
      const randomGif = random(data);
      console.log({randomGif});

      this.setState((prevState, props) => ({
        ...prevState,
        gif: randomGif,
        gifs: [...prevState.gifs, randomGif],
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }));
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }));
      console.log(error);
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
      hintText: '',
      gifs: []
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

  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: []
    }));

    this.textInput.focus();
  };

  render() {
    const {searchTerm, gifs} = this.state;
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />
        <div className="grid search">
          {this.state.gifs.map(gif => <Gif {...gif} />)}
          <input
            className="grid-item input"
            placeholder="Type Something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
            ref={input => {
              this.textInput = input;
            }}
          />
        </div>

        <Userhint {...this.state} />
      </div>
    );
  }
}

export default App;
