import { useNavigate } from "react-router";

export default function Create_fakeUsers() {
  fetch("http://127.0.0.1:3095/api/create_fakeUsers");
  return <>hi</>;
}
