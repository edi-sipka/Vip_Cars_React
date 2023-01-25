import React from 'react';
import PropTypes from 'prop-types';

function NavFooter({ isOpen }) {
  return (
    <div className={`NavFooter ${isOpen ? 'open' : 'closed'}`}>
      <footer className="text-center text-white">
        {/* Grid container */}
        <div className="container pt-4">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Facebook */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fa fa-twitter" />
            </a>

            {/* Twitter */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fa fa-facebook-f" />
            </a>

            {/* Google */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >

              <i className="fa fa-google-plus" />
            </a>

            {/* Instagram */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fa fa-vimeo" />
            </a>
            {/* Linkedin */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fa fa-pinterest" />
            </a>
            {/* Github */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fa fa-github" />
            </a>
          </section>
        </div>
<<<<<<< HEAD

=======
>>>>>>> dev
      </footer>
    </div>
  );
}

NavFooter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default NavFooter;
