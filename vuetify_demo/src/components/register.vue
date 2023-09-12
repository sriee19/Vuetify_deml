<template>
    <div class="login-form">
      <h2>Sign In</h2>
      <v-form @submit.prevent="login">
        <div class="context">
          <p>Hey, Enter your Details to sign in to your account</p>
        </div>
        <div class="input-group">
          <input
            class="username"
            type="text"
            v-model="username"
            placeholder="Username"
          />
          <v-icon class="input-icon">mdi-account</v-icon>
  
          <!-- <span class="input-icon "></span> -->
        </div>
        <div class="input-group">
          <input
            class="password"
            type="password"
            v-model="password"
            placeholder="Password"
          />
          <v-icon class="input-icon">mdi-lock</v-icon>
  
          <!-- <span class="input-icon"></span> -->
        </div>
        <div class="context1">Having trouble sign in?</div>
  
        <!-- <v-col cols="auto" class="submit" type="submit">
          <v-btn>Login</v-btn>
        </v-col> -->
        <button class="submit" type="submit">Sign-In</button>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        // Here you can implement your login logic
        // For this example, let's just log the entered credentials
        console.log("Username:", this.username);
        console.log("Password:", this.password);
        // Reset the form after logging the credentials
        this.username = "";
        this.password = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
    background-color: rgba(76, 183, 245, 0.322);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    max-height: 300px;
    max-width: 300px;
  }
  
  .login-form h2 {
    margin-bottom: 20px;
    margin-left: 95px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
  }
  
  .login-form form input {
    width: 100%;
    padding: 6px;
    margin-bottom: 10px;
    border: 1px solid rgba(87, 141, 219, 1);
    border-radius: 5px;
    font-size: smaller;
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgba(170, 172, 175, 0.35);
  }
  .input-group {
    position: relative; /* To position the icon */
  }
  
  .input-icon {
    position: absolute; /* Position the icon */
    top: 45%;
    bottom: 50%; /* Vertically center the icon */
    transform: translateY(-50%); /* Adjust vertical alignment */
    right: 10px; /* Adjust horizontal position as needed */
    color: #33333376; /* Icon color */
  }
  
  .login-form form button {
    background-color: rgba(40, 113, 216, 0.633);
    width: 50%;
    color: rgb(45, 45, 45);
    border: none;
    padding: 10px 20px;
    max-height: 50px;
    border-radius: 3px;
    cursor: pointer;
  }
  .username {
    width: 75%;
    padding: 10px;
    margin-bottom: 3px;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 10px;
    border: 1px solid #2871d8;
    border-radius: 3px;
  }
  .password {
    width: 75%;
    padding: 10px;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 3px;
    border: 1px solid #2871d8;
    border-radius: 3px;
  }
  
  .submit {
    width: 50%;
    padding: 10px;
    margin-bottom: 8px;
    margin-left: 75px;
    margin-right: 6px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: rgba(40, 113, 216, 0.5);
  }
  .context1 {
    margin-bottom: 10px;
    font-size: small;
    font-style: italic;
    margin-left: 10px;
    margin-right: 100px;
  }
  .context {
    font-size: x-small;
    font-style: italic;
    position: relative;
    margin-left: 20px;
  }
  </style>
  