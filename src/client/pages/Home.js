import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-home">
      <Helmet title="Decod" />
      <div className="page-home__wrapper">
        <div className="page-home__mid">
          <img
            alt="Logo"
            src="/images/decod-red.svg"
            className="page-home__mid__img"
          />
          <h1 className="page-home__mid__title">Decod</h1>
        </div>
        <div className="page-home__main">
          <Link to="/encode" className="page-home__btn-encode">
            Encode
          </Link>
          {/* <div className="page-home__or">
						<span>O</span>
						<span>r</span>
					</div> */}
          <Link to="/decode" className="page-home__btn-decode">
            Decode
          </Link>
        </div>
      </div>
      <div className="page-home__divider">
        <div className="page-home__divider__item page-home__left"></div>
        <div className="page-home__divider__item page-home__right"></div>
      </div>
    </div>
  );
}

export default Home;
