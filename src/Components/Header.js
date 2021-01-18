import React, {Component} from 'react';
import Matrix from './Matrix';

class Header extends Component {
  render() {
    const name = this.props.data.name;
    const occupation = this.props.data.occupation;
    const description = this.props.data.description;
    const city = this.props.data.address.city;
    const networks = this.props.data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className}></i>
          </a>
        </li>
      );
    });

    return (
      <>
        <header id="home">
          <Matrix
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
            fullscreen={true}
            color={'#11ABB0'}
          />
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
              Show navigation
            </a>
            <a className="mobile-btn" href="#home" title="Hide navigation">
              Hide navigation
            </a>

            <ul id="nav" className="nav">
              <li className="current">
                <a className="smoothscroll" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#resume">
                  Resume
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#portfolio">
                  Works
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#testimonials">
                  Testimonials
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">I'm {name}.</h1>
              <h3>
                I'm a {city} based <span>{occupation}</span>. {description}.
              </h3>
              <hr />
              <ul className="social">{networks}</ul>

              <div className="scrolldown">
                <a className="smoothscroll" href="#about">
                  <i className="icon-down-circle"></i>
                </a>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
