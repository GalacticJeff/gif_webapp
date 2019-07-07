import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { searchGif } from "../../actions/searchActions";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {Header} from "./header"
import $ from 'jquery';


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      currentImage: 0,
      viewIsOpen: false,
      errors: {}
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.saveGif = this.saveGif.bind(this);
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  searchGif = e => {
    e.preventDefault();

    this.props.searchGif(this.state.query);
  }

  handleSearchInput(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
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

  saveGif = (s) => {
    console.log(s);
  }

  
render() {
    const { user } = this.props.auth;
    const photos = [];
    const gifs = [];
    const { data, existData } = this.props.search;

    $('body').on('dblclick', 'img.react-images__view-image', function(e){
      e.stopImmediatePropagation();
      $.ajax({
        type: "POST",
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        },
        url: "http://localhost/v1/gif/favorites/save",
        data: {
          'id_gif': e.target.currentSrc
        },
        success: function(d){
          alert('Gif saved');
        },
        error: function(e){
          console.log(e)
        }
      })
    });

    const customStyles = {
      header: (base, state) => ({
        ...base,
        color: state.isFullscreen ? 'red' : 'blue',
        padding: 20,
      })
    }
    const customFullscreen = ({innerProps, isModal}) => isModal ? (
      <div {...innerProps}>
        {Header}
      </div>
    ) : null;

    if(existData){
      data.map((data, index) => {
        photos[index] = {
          src: data.images.original_still.url,
          width: Math.round(data.images.original_still.width),
          height: Math.round(data.images.original_still.height)
        }
        
        gifs[index] = {
          src: data.images.original.url,
          width: Math.round(data.images.original.width),
          height: Math.round(data.images.original.height)
        }
      })
    }
return (
      <div style={{ height: "50vh" }} className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Start looking for some cool gifs! 👏
              </p>
              <p className="flow-text grey-text">
                Double tap/click on the gif in the modal to save it! 🤖
              </p>
            </h4>
            <form>
              <div className="input-field row">
                <input name="query" id="search" type="search" onChange={(e) => this.handleSearchInput(e)} required/>
                <i className="material-icons">close</i>
              </div>
            </form>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.searchGif}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Search
            </button>
          </div>
          <div className="row">
            <div className="col s12">
             <Gallery photos={photos} onClick={(img, e) => this.openLightbox(img, e)}/>
            </div>
          </div>
        </div>
        <ModalGateway>
              {this.state.viewIsOpen ? (
                <Modal onClose={(e) => this.closeLightbox(e)} onShow={(s) => this.saveGif(s)}>
                  <Carousel
                    currentIndex={this.state.currentImage}
                    views={gifs}
                    styles={customStyles}
                    components={{ Header: customFullscreen}}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  searchGif: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
});

export default connect(
  mapStateToProps,
  { logoutUser, searchGif }
)(Dashboard);