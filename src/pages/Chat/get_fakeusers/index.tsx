import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Get_fakeUsers({ socket }: { socket: any }) {
  const params = useParams<{ id?: string }>();
  const { id } = params;

  const [ds, setDs] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3095/api/fakeUser/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("jwt_token", data.token);
        //   localStorage.setItem("username", data.username);
        setDs(data.token);

        socket.emit("login", data.token);
      });
  }, []);

  return (
    <>
      <div>{ds}</div>
      <Link to={"/chat"}>홈으로</Link>
    </>
  );
}
