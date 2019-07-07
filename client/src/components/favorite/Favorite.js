import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFavorites } from "../../actions/searchActions";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
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
      this.props.getFavorites()
  }


  
render() {
    console.log(this.props);
    const { user } = this.props.auth;
    const photos = [];
    const { favorites, existFavorites } = this.props.search;

    if(existFavorites){
        favorites.data.map((data, index) => {
        console.log(data);
        photos[index] = {
          src: data.id_gif,
        }
      })
    }
return (
      <div style={{ height: "50vh" }} className="container">
          <div className="row">
            <div className="col s12">
            <h4>
                {user.name.split(" ")[0]}'s favorite gifs
              <p className="flow-text grey-text text-darken-1">
                Double click to save gifs! 👏
              </p>
            </h4>
            {existFavorites ? <Gallery photos={photos} onClick={(img, e) => this.openLightbox(img, e)}/>
              : <p className="flow-text grey-text text-darken-1">
                You dont have gifs saved! 
              </p>}
            </div>
          </div>
        <ModalGateway>
              {this.state.viewIsOpen ? (
                <Modal onClose={(e) => this.closeLightbox(e)} onShow={(s) => this.saveGif(s)}>
                  <Carousel
                    currentIndex={this.state.currentImage}
                    views={photos}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
      </div>
    );
  }
}

Favorites.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getFavorites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
});

export default connect(
  mapStateToProps,
  { getFavorites }
)(Favorites);