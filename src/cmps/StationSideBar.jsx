import { Link } from "react-router-dom";

export function StationSideBar() {
    return (
        <div>
            {/* Your component content goes here */}
            <ul>
                <li><Link to="search">Search</Link>  </li>
                <li><Link to="/album/789">Album 101113</Link></li>
                <li><Link to="/collection/456">Libary 10111256 </Link></li>
                <li><Link to="/playlist/101112">Playlist 101112</Link> </li>
            </ul>        
        </div>
    );
}