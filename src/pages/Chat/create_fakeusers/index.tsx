import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Create_fakeUsers() {
  useEffect(() => {
    fetch("http://127.0.0.1:3095/api/create_fakeUsers");
  }, []);
  return (
    <>
      <Link to={"/chat"}>홈으로</Link>
    </>
  );
}
