import { useEffect } from "react";
import { useQuery } from "react-query";
import { Container, Nav } from "../../styles/styles";
import { accessTokenState } from "../../recoil/authState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import GlobalStyles from "../../styles/global";

const LoginCheck = () => {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const awsUrl = import.meta.env.VITE_AWS_URL;

  const setAccessToken = useSetRecoilState(accessTokenState);

  const loginCheckQuery = useQuery("loginCheck", async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    window.history.replaceState({}, document.title, window.location.pathname);

    if (!authorizationCode) {
      throw new Error("Authorization code not found");
    }

    const data = {
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      redirect_uri: redirectUri,
    };

    const response = await fetch("https://api.intra.42.fr/oauth/token", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to retrieve access token");
    }

    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const loginResponse = await fetch(awsUrl + "/auth/login", {
      method: "POST",
      headers: headers,
    });

    setAccessToken(accessToken);
    if (loginResponse.status === 200) {
      navigate("/home");
    } else if (loginResponse.status === 401) {
      navigate("/twofactor");
    } else if (loginResponse.status === 404) {
      navigate("/signup");
    } else {
      throw new Error("Unexpected response status code");
    }
  });

  useEffect(() => {
    const { status, data, error } = loginCheckQuery;

    if (status === "error") {
      console.error(error);
    }

    if (status === "success") {
      console.log(data);
    }
  }, [loginCheckQuery]);

  return (
    <div>
      <Container>
        <Nav>○ ○ ○</Nav>
        <h1>Loading...</h1>
      </Container>
    </div>
  );
};

export default LoginCheck;
