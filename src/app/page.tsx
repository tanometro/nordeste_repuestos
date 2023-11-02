"use client";
import Login from "../components/login/login";

export default function Home() {

  return (
   
    <div className="align-top">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <img className="w-100 h-100 mb-6 mr-2" src="assets/logo.svg" alt="logo"/>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Ingresar al sistema
              </h1>           
              <Login/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}