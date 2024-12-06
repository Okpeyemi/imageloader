"use client";
import { postUser } from "@/services/api";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };

  const registration = async () => {
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
        password2: password2,
        role: "user",
      };
      const response = await postUser(userData);
      console.log(`La réponse de postUser est :`, response);
      window.location.href = "auth/login";
      
    } catch (error) {
        console.error(`Erreur lors de la récupération de la réponse :`, error);
        
    }
  };

  return (
    <div className="p-5 h-screen">
      <div className="flex h-full">
        <div className="bg-primary w-[50%] h-full rounded-3xl p-10">jblj </div>
        <div className="w-[50%] p-10">
          <div className="w-[70%] h-full mx-auto flex flex-col justify-center">
            <h1 className="text-[50px] font-medium text-start my-10 text-primary">
              Inscription
            </h1>
            <div>
              <div className="my-3">
                <h2 className="font-medium my-3">Votre nom complet</h2>
                <input
                  className="h-12 px-4 rounded-lg border-2 border-border focus:outline-primary w-full"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
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
              <div className="my-3">
                <h2 className="font-medium my-3">
                  Confirmez votre mot de passe
                </h2>
                <input
                  className="h-12 px-2 rounded-lg border-2 border-border focus:outline-primary w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
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
                onClick={registration}
              >
                Inscription
              </button>
            </div>
            <div>
              <span>
                Déjà un compte? Cliquez sur{" "}
                <a
                  href="/auth/login"
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