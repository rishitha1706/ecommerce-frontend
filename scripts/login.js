import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

onAuthStateChanged(auth, (user) => {

  if (user) {

    const redirectPage =
      sessionStorage.getItem(
        "redirectAfterLogin"
      );

    if (redirectPage) {

      sessionStorage.removeItem(
        "redirectAfterLogin"
      );

      window.location.href =
        redirectPage;

    } else {

      window.location.href =
        "index.html";

    }

  }

});

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value.trim();

    const message =
      document.getElementById("message");

    if (!email || !password) {

      message.style.color = "red";

      message.innerText =
        "Please fill all fields";

      return;

    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      message.style.color = "green";

      message.innerText =
        "Login Successful";

      setTimeout(() => {

        const redirectPage =
          sessionStorage.getItem(
            "redirectAfterLogin"
          );

        if (redirectPage) {

          sessionStorage.removeItem(
            "redirectAfterLogin"
          );

          window.location.href =
            redirectPage;

        } else {

          window.location.href =
            "index.html";

        }

      }, 1000);

    }

    catch (error) {

      message.style.color = "red";

      if (error.code === "auth/invalid-credential") {

        message.innerText =
          "Invalid email or password";

      } else {

        message.innerText =
          "Login failed";

      }

      console.log(error);

    }

  });

}