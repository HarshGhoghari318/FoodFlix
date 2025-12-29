import { Home, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function ReelsBottomNav() {
  const navigate = useNavigate();

  return (
    <div className="reels-bottom-nav">
      <button onClick={() => navigate("/reels")}>
        <Home />
        <span>Reels</span>
      </button>

      <button onClick={() => navigate("/search")}>
        <Search />
        <span>Search</span>
      </button>

      <button onClick={() => navigate("/userprofile")}>
        <User />
        <span>Profile</span>
      </button>
    </div>
  );
}
