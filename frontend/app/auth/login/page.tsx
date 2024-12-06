"use client";
import { postLogin } from "@/services/api";
import React, { useState } from "react";
import SignIn from "@/public/sign-in.png";
import Image from "next/image";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    if (!email.trim()) {
      alert("Veuillez entrer votre adresse email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!password.trim()) {
      alert("Veuillez entrer un mot de passe.");
      return;
    }

    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await postLogin(userData);
      console.log(`La réponse de postLogin est :`, response);

      const token = response.token;
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } catch (error) {
    }
  };

  return (
    <div className="p-5 h-screen">
      <div className="flex h-full">
        <div className="bg-primary w-[50%] h-full md:hidden rounded-3xl p-10 flex items-center justify-center">
          <Image className="w-[70%]" src={SignIn} alt="Connexion" />
        </div>
        <div className="w-[50%] md:w-full p-10">
          <div className="w-[70%] h-full mx-auto flex flex-col justify-center">
            <h1 className="text-[50px] font-medium text-start my-10 text-primary">
              Connexion
            </h1>
            <div>
              <div className="my-3">
                <h2 className="font-medium my-3">Votre adresse email</h2>
                <input
                  className="h-12 px-2 rounded-lg border-2 border-border focus:outline-primary w-full"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                />
              </div>
              <div className="my-3">
                <h2 className="font-medium my-3">Votre mot de passe</h2>
                <input
                  className="h-12 px-2 rounded-lg border-2 border-border focus:outline-primary w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <div className="flex my-3">
                <input
                  className="h-12 w-5 mr-2 rounded-lg border-2 border-border focus:outline-primary cursor-pointer"
                  type="checkbox"
                  onClick={passwordToggle}
                />
                <h2 className="font-medium my-3">
                  {showPassword ? "Cacher" : "Afficher"} le mot de passe
                </h2>
              </div>
            </div>
            <div className="flex my-3">
              <button
                className="bg-primary w-full p-5 rounded-lg text-background font-medium hover:bg-secondary-foreground"
                type="submit"
                onClick={login}
              >
                Connexion
              </button>
            </div>
            <div>
              <span>
                Pas de compte? Cliquez sur{" "}
                <a
                  href="/auth/register"
                  className="text-primary font-bold border-primary border-b-2 hover:border-secondary-foreground hover:text-secondary-foreground"
                >
                  ici
                </a>
                !
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
