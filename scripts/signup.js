import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const signupBtn =
  document.getElementById("signupBtn");

if (signupBtn) {

  signupBtn.addEventListener("click", async () => {

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value.trim();

    const message =
      document.getElementById("message");

    if (!name || !email || !password) {

      message.style.color = "red";

      message.innerText =
        "Please fill all fields";

      return;

    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(
        userCredential.user,
        {
          displayName: name
        }
      );

      message.style.color = "green";

      message.innerText =
        "Signup Successful";

      setTimeout(() => {

        window.location.href =
          "index.html";

      }, 1000);

    }

    catch (error) {

      console.log(error);

      message.style.color = "red";

      message.innerText =
        error.message;

    }

  });

}