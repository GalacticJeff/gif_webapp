import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHistory } from "../../actions/searchActions";
import DataTable from 'react-data-table-component';


class History extends Component {
  constructor() {
    super();
    this.state = {
      query: {},
      currentImage: 0,
      viewIsOpen: false,
      errors: {}
    };
  }

  getFavorites = e => {
    e.preventDefault();

    this.props.getFavorites();
  }


  openLightbox = (event, obj) => {
    event.preventDefault();
    this.setState({
      currentImage: obj.index,
      viewIsOpen: true
    })
  };

  closeLightbox = (e) => {
    e.preventDefault();
    this.setState({
      currentImage: 0,
      viewIsOpen: false
    })
  };

  componentWillMount(){

      this.props.getHistory()
  }

  componentWillReceiveProps(props)
  {
      this.setState({
          query: {
            id: 1, 
            title: 'Conan the Barbarian', 
            year: '1982' 
          }
      })
      this.forceUpdate();
      
  }

  
render() {
    const { user } = this.props.auth;
    const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true
        },
        {
            name: 'Keyword',
            selector: 'search_log',
            sortable: true
        },
        {
            name: 'Search_date',
            selector: 'created_at',
            sortable: true
        }
    ]
    const data = [];

    const { history, existHistory } = this.props.search;
    if(existHistory){
        history.data.map((data, index) => {
        console.log(data.id)
        data[index] = {
          id: data.id,
          search_log: data.search_log,
          created_at: data.created_at 
        }
      })
    }
    console.log(history);
return (
      <div style={{ height: "50vh" }} className="container">
          <div className="row">
            <div className="col s12">
            <h4>
                {user.name.split(" ")[0]}'s keyword search log
            </h4>
            {existHistory ? 
                <DataTable
                    title="Keyword log"
                    columns={columns}
                    data={history.data}
                >
                </DataTable>
            : null}
            </div>
          </div>
      </div>
    );
  }
}

History.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getHistory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
});

export default connect(
  mapStateToProps,
  { getHistory }
)(History);