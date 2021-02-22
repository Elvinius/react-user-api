import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
    this.clearQuery = this.clearQuery.bind(this);
  }

  componentDidMount() {
    async function fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      return users;
    }

    fetchUsers()
      .then(users => {
        this.setState({
          isLoaded: true,
          items: users,
          query: ''
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }
  render() {
    const { query } = this.state;
    const showingItems = query === ''
      ? this.state.items
      : this.state.items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <input className='search-users'
            type='text'
            value={query}
            onChange={(e) => this.updateQuery(e.target.value)}
          />
          <div>
            {showingItems.length !== this.state.items.length && (
              <div className="showing-users">
                <span>Now showing {showingItems.length} of {this.state.items.length}</span>
                <button onClick={this.clearQuery}>Show all</button>
              </div>
            )}
            <ol className='user-list'>
              {showingItems.map((user) => (
                <li key={user.id} className="user-list-item">
                  <div className="contact-details">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                  </div>
                </li>
              )
              )}
            </ol>
          </div>
        </div>
      );
    }

  }
}

export default App;