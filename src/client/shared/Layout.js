import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ title, children }) {
  const pathname = useLocation().pathname.split('/');
  const currentPath = pathname[1].toLowerCase();
  const pathTarget = pathname[1] === 'decode' ? 'encode' : 'decode';
  return (
    <div className={`layout-main layout-main--${currentPath}`}>
      <Helmet title={title} />
      <Navbar currentPath={currentPath} pathTarget={pathTarget} />
      <main>{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: 'IniSteganography',
};

export default Layout;
