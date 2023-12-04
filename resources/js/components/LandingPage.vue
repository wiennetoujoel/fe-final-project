<template>
    <div class="main-container">
        <div class="container">
            <div class="login-container">
                <div class="login-form">
                    <form class="form" @submit.prevent="submitLogin">
                        <p id="heading">Login Form</p>
                        <div class="field">
                            <svg
                                class="input-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
                                ></path>
                            </svg>
                            <input
                                autocomplete="off"
                                placeholder="Username"
                                class="input-field"
                                type="text"
                                v-model="username"
                                id="username"
                            />
                        </div>
                        <div v-if="usernameNullWarning" class="warning"> 
                            *Please fill the username
                        </div>
                        <div class="field">
                            <svg
                                class="input-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                                ></path>
                            </svg>
                            <input
                                placeholder="Password"
                                class="input-field"
                                type="password"
                                v-model="password"
                                id="password"
                            />
                        </div>
                        <div v-if="passwordNullWarning" class="warning">
                            *Please fill the password
                        </div>
                        <div class="btn">
                            <div v-if="warning" class="allWarning">
                                *Username or Password is incorrect, please try
                                again
                            </div>
                            <button class="button1" @click="submitLogin">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        <!--<button class="button3">Forgot Password</button>-->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            username: "",
            password: "",
            warning: false,
            usernameNullWarning: false,
            passwordNullWarning: false,
        };
    },
    computed: {
        ...mapGetters({
            admins: "example/getAdmin",
        }),
    },

    created() {
        this.$store.dispatch("example/getAdminData");
    },

    methods: {
        submitLogin() {
            console.log("username ", this.username);
            console.log("password ", this.password);

            if (this.username === "") {
                this.usernameNullWarning = true;
                if (this.password !== "") {
                    this.passwordNullWarning = false;
                }
                return;
            } else if (this.password === "") {
                this.passwordNullWarning = true;
                if (this.username !== "") {
                    this.usernameNullWarning = false;
                }
                return;
            } else {
                this.passwordNullWarning = false;
                this.usernameNullWarning = false;
            }

            const user = this.admins.admin.find(
                (admin) =>
                    admin.username === this.username &&
                    admin.password === this.password
            );

            if (user) {
                console.log("Login berhasil!", user.username);
                this.$router.push({ name: "home" });
                this.$store.commit("example/setAdminOnline", user.username);
                this.warning = false;
            } else {
                this.warning = true;
                console.log("Login gagal. Username atau password salah.");
            }
        },
    },
};
</script>

<style scoped>
.main-container {
    height: 100vh;
    background-image: url("../../images/sea.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    height: 100%;
    display: flex;

    flex-direction: column;
    align-items: center;
    background-color: transparent;
}

.login-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: transparent;
    width: 50%;
    min-width: 500px;
    margin: 0 auto;
    padding: 0.5rem;
}

.login-form {
    width: 100%;
}

.login-title {
    width: 100%;
    text-align: center;
}

/*login form */
.form {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.4em;
    background-color: rgba(23, 23, 23, 0.7);
    border-radius: 25px;
    transition: 0.4s ease-in-out;
}

#heading {
    text-align: center;
    margin: 2em;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
}

.field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}

.input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: white;
}

.input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
}

.form .btn {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 2.5em;
}

.button1 {
    width: 10rem;
    padding: 0.5em;
    padding-left: 1.1em;
    padding-right: 1.1em;
    border-radius: 5px;

    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
}

.button1:hover {
    background-color: black;
    color: white;
}

.button2 {
    padding: 0.5em;
    padding-left: 2.3em;
    padding-right: 2.3em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
}

.button2:hover {
    background-color: black;
    color: white;
}

.button3 {
    margin-bottom: 3em;
    padding: 0.5em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
}

.button3:hover {
    background-color: red;
    color: white;
}


.warning{
    font-size: 0.9rem;
    color: red;
    opacity: 0.8;
}

.allWarning{
    color: red;
    opacity: 0.8;
}
</style>
