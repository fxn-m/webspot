import React from 'react';
import './SearchBar.css';

interface IProps {
  onSearch?: (term: string) => void;
}

interface IState {
}

export class SearchBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // search() {
  //   this.props.onSearch && this.props.onSearch('search term');
  // }

  handleTermChange(event:React.ChangeEvent<HTMLInputElement>) {
    this.props.onSearch && this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}
