export default function Navbar() {
  return (
    <div className="navbar">
        <h2>SkyView Weather</h2>
        <form className="flex">                
            <div className="flex items-center">
                <img src="./icons/search.png" alt="search icon" className="icon"/>
                <input type="text" placeholder="Enter location..."/>
                <img src="./icons/close.png" alt="close icon" className="icon"/>
            </div>
            <input type="submit" value="Search"/>
        </form>
        <div>
            <h4></h4>
            <button><img src="./icons/moon.png" alt="theme icon" className="icon"/></button>
        </div>
    </div>
  )
}
