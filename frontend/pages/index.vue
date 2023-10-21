<template>
  <div class="flex min-h-[85vh] flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">email address</label>
        <div class="mt-2">
          <input
            v-model="username"
            id="username"
            type="username"
            autocomplete="username"
            required
            class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 outline-none shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input
            @keyup.enter="login(username, password)"
            v-model="password"
            id="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 outline-none shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <button
        @click="login(username, password)"
        class="flex w-full justify-center rounded-md bg-blue-500 px-4 uppercase py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "../composables/api";
import { ref } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
const router = useRouter();

const username = ref("javed@allphptricks.com");
const password = ref("javed1234");

async function login(username: string, password: string) {
  await api
    .post(
      "http://127.0.0.1:8000/oauth/token",
      {
        client_id: 2,
        client_secret: "Ln9SZzuhYi938tEfTEKpwqfrRvruoApRWqrCUthR",
        grant_type: "password",
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res.data);

      // save token to local storage
      Cookies.set("access_token", res.data.access_token); // Set the access_token cookie
      Cookies.set("refresh_token", res.data.refresh_token); // Set the refresh_token cookie

       // Retrieve user information
     getUserInfo();

      //redirect to dashboard
      router.push("/dashboard");
    })
    .catch((err) => {
      if (err.response.status === 401) {
        console.log("Invalid Credentials");
      } else if (err.response.status === 400) {
        console.log("Invalid Request");
      } else {
        console.error("An error occurred while logging in:", err);
      }
    });
}

async function getUserInfo() {
  try {
    const userInfo = await api.get(`/api/get-user`);
    console.log("userInfo", userInfo);
    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
</script>
