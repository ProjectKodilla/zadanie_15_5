App = React.createClass({
  
  getInitialState () {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    }
  },
  
  handleSearch: function (searchingText) {
    this.setState({
      loading: true
    })
    
    this.getGif(searchingText, function (gif) {
      this.setState({ 
        loading: false,
        gif: gif,
        searchingText: searchingText
      })
    }.bind(this)) 
  },
  
  getGif: function(searchingText) {
    return new Promise (
      (resolve, reject) => {
        const GIPHY_PUB_KEY = 'gJ8TFfCdfwquNY24Qp53zvFhGs05Pz3y';
        const GIPHY_API_URL = 'https://api.giphy.com';
        let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (this.status === 200) {
            let data = JSON.parse(xhr.responseText).data;
            let gif = {
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
            };
            resolve(gif);
          }
          reject(new Error(this.statusText));
        };
        xhr.onerror = function () {
          reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
        };
        xhr.send();
      }
    );
  },
  
  render: function () {
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '60%'
    }
    
    return (
      <div style={styles}>
      <h1>Wyszukiwarka GIFów!</h1>
      <p>Znajdź GIFy na: <a href='http://giphy.com'>
      giphy.com</a> <br /> Wciśnij enter aby załadować więcej.
      </p>
      <Search onSearch={this.handleSearch} />
      <Gif
      loading={this.state.loading}
      url={this.state.gif.url}
      sourceUrl={this.state.gif.sourceUrl}
      />
      </div>
    )
  }
})
