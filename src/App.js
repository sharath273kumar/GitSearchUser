import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBar } from "./components/search-box/search-box.component";
import { Arrow } from "./components/arrow/arrow.component";
import {ClearCache} from "./components/clear-cache/clear-cache.component"
import debounce from "lodash.debounce";
import "./App.css";

class App extends Component{

  constructor(){
    super();

    this.state = {
      users: [],
      searchText: '',
      emptyStatus: '',
      pageCounter: 0
    };
    this.fetchUser = debounce(this.fetchUser.bind(this),500);
  }

  onSearch = (value) => {
    const searchText = value.target.value;
    this.fetchUser(searchText, 1);
  }

  fetchUser = (searchText, page) => { 
    if(searchText && searchText.length >= 3){
      fetch("http://localhost:3001/api/search?searchKey=" + searchText + "&searchType=user&page=" + page,{method: 'post'})
        .then((response)=>response.json())
        .then((userData)=>{
          console.log(userData.items.length);
          userData.items.length === 0 ? 
          this.setState({users:[], emptyStatus:'NO USERS.', searchText: searchText}) : 
          this.setState({users:userData.items, pageCounter:page, searchText: searchText})
        })
        .catch((error)=>{console.log('DONE');this.setState({emptyStatus:error})})
    }
    else{
      this.setState({users:[], emptyStatus:''})
    }
  }

  nextPage = () => {
    this.fetchUser(this.state.searchText, this.state.pageCounter+1);
  }

  previousPage = () =>{
    this.fetchUser(this.state.searchText, this.state.pageCounter-1);
  }
  clearCache = () => {
    fetch("http://localhost:3001/api/clear-cache",{method: 'post'})
    .then((data)=>console.log(data.status))
    .catch((error)=>{console.log('ERROR');this.setState({emptyStatus:error})})
  }

  render(){
    const {users, emptyStatus, pageCounter} = this.state;
    
    return (
      <div className="App">
        <div>
          <h1>GitHub User Search</h1>
          <ClearCache handler={this.clearCache}/>
        </div>
        <SearchBar placeholder="Search GitHub Users..." handler={this.onSearch}/>
        <div>
          {(pageCounter > 1 && users.length !== 0)? <Arrow name="left-arrow" handler={this.previousPage}/> : null}
          {(pageCounter > 0 && users.length !== 0)? <Arrow name="right-arrow" handler={this.nextPage}/> : null}
        </div>
        {(users.length === 0 && emptyStatus.length !== 0) ? <h1>{emptyStatus}</h1> : null}
        <CardList users={users}/>
      </div>
    );
  }
}

export default App;