"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { loginAction } from "../actions/LoginAction";

export default function Page() {
  const router = useRouter();
  const [formState, action] = useFormState(loginAction, {
    error: false,
    message: ""
  });

  useEffect(() => {
    if (!formState.error && formState.message !== "") {
      setTimeout(() => {
        router.push("/empresa");
      }, 1000)
    }
  }, [formState]);

  return (
    <section>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Login
          </h2>
          {
            formState.error ? (
              <div className="text-red-600 my-4 text-center">{formState.message}</div>
            ) : (
              <div className="text-green-600 my-4 text-center">{formState.message}</div>
            )
          }
          <form
            action={action} defaultValue={formState.message}
            className="mx-auto max-w-lg rounded-lg border"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Nome de usuário
                </label>
                <input
                  name="username"
                  id="username"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>
              <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                Entrar
              </button>
              <Link href="/esqueci-minha-senha" className="my-4 text-center hover:underline text-blue-600">Esqueci minha senha</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}