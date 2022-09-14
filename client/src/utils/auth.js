import decode from "jwt-decode";

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if user is still logged in
  loggedIn() {
    // checks if ther is a saved token and it's still valid
    const token = this.getToken();
    // use type coersion to check if token is not undefined and token is not expired
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);

      return decoded.exp < Date.now() / 1000 ? true : false;
    } catch (error) {
      return false;
    }
  }

  getToken() {
    // retrieve token from local storage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    // remove token from localStroage
    localStorage.removeItem("id_token");

    window.location.assign("/");
  }
}

export default new AuthService();
