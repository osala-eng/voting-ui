
const Header = ({title}) => {
  return (
    <header className="app-header">
        <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
    title: 'Online Voting',
}
export default Header