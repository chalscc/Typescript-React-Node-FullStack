import { Link, NavLink } from 'react-router-dom';


export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2 mb-3">

      <Link
        className="navbar-brand"
        to="/"
      >
        Prueba técnica
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">

          <NavLink
            className={(arg) => `nav-item nav-link nav-link ${arg.isActive ? 'active' : ''}`}
            to="/operations"
          >
            Operaciones
          </NavLink>

          <NavLink
            className={(arg) => `nav-item nav-link nav-link ${arg.isActive ? 'active' : ''}`}
            to="/marketers"
          >
            Marketers
          </NavLink>
        </div>
      </div>
    </nav>
  )
}