import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/photos/logos/google.png";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useScrollTop from "../../hooks/useScrollTop";
import useDarkMode from "../../hooks/useDarkMode";

const Register = () => {
  // Custom hook
  const { pathname } = useLocation();
  useScrollTop(pathname);

  const { darkMode } = useDarkMode();

  // Context API
  const { createUser, profileUpdate, googleLogin, setLoading } = useAuth();

  // state
  const [err, setError] = useState("");
  const [nLoading, setNLoading] = useState(false);

  // Use Location for redirect target page or home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  // Registration with email password
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const photo = data.photoUrl;
    const password = data.password;

    setNLoading(true);

    // Create user
    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // Update user profile
        profileUpdate(name, photo)
          .then(() => {
            const saveUser = {
              profilePhoto: data?.photoUrl,
              name: data?.name,
              email: data?.email,
            };
            fetch(`${import.meta.env.VITE_SERVER_API}/users/${data?.email}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.matchedCount === 1 || data.upsertedCount === 1) {
                  reset();
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    // didOpen: (toast) => {
                    //   toast.addEventListener("mouseenter", Swal.stopTimer);
                    //   toast.addEventListener("mouseleave", Swal.resumeTimer);
                    // },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Registration successful!",
                  });
                  setNLoading(false);
                  navigate(from, { replace: true });
                }
              })
              .catch((error) => {
                setLoading(false);
                setNLoading(false);
                console.log(error);
                setError(error);
              });
          })
          .catch((error) => {
            setLoading(false);
            setNLoading(false);
            console.log(error);
            setError(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setNLoading(false);
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  // Google login
  const googleHandler = () => {
    setNLoading(true);
    googleLogin()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        const saveUser = {
          profilePhoto: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        };
        fetch(`${import.meta.env.VITE_SERVER_API}/users/${user?.email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.matchedCount === 1 || data.upsertedCount === 1) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                // didOpen: (toast) => {
                //   toast.addEventListener("mouseenter", Swal.stopTimer);
                //   toast.addEventListener("mouseleave", Swal.resumeTimer);
                // },
              });

              Toast.fire({
                icon: "success",
                title: "Login successful!",
              });
              setNLoading(false);
              navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            setLoading(false);
            setNLoading(false);
            console.log(error);
            setError(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setNLoading(false);
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <>
      <Helmet>
        <title>FightingSpirit | Register</title>
      </Helmet>
      <section className="min-h-[calc(100vh-65px)] py-16">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div
            className={`${
              darkMode
                ? "bg-black text-gray-300 border border-gray-700"
                : "bg-white"
            } w-full  rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0 border`}
          >
            {/* Error message */}
            {err ? (
              <div className="bg-white alert alert-error border-none">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-500">{err}</span>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* Register form */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Create and account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    className={`${
                      darkMode
                        ? "bg-gray-400 placeholder-gray-600"
                        : "bg-gray-50"
                    }  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    className={`${
                      darkMode
                        ? "bg-gray-400 placeholder-gray-600"
                        : "bg-gray-50"
                    }  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Photo URL
                  </label>
                  <input
                    {...register("photoUrl")}
                    type="url"
                    name="photoUrl"
                    className={`${
                      darkMode
                        ? "bg-gray-400 placeholder-gray-600"
                        : "bg-gray-50"
                    }  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="https://photo.com/"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Password
                  </label>
                  <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                    <input
                      {...register("password", {
                        pattern: {
                          value: /(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})/,
                          message:
                            "The password must be at least 6 characters long and include at least one special character and one capital letter.",
                        },
                      })}
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className={`${
                        darkMode
                          ? "bg-gray-400 placeholder-gray-600"
                          : "bg-gray-50"
                      }  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-600" role="alert">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                    <input
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className={`${
                        darkMode
                          ? "bg-gray-400 placeholder-gray-500"
                          : "bg-gray-50"
                      }  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600" role="alert">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {nLoading ? (
                  <div className="flex justify-center items-center">
                    <span className="loading loading-ring loading-lg"></span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Register
                  </button>
                )}
              </form>
              {/* Alternative login */}
              <div className="flex flex-col">
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-b border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span
                      className={`${
                        darkMode ? "bg-black" : "bg-white"
                      }  px-4 text-sm text-gray-500`}
                    >
                      Or
                    </span>
                  </div>
                </div>
                <button
                  onClick={googleHandler}
                  type="submit"
                  className={`${
                    darkMode
                      ? "bg-gray-400 hover:bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  } flex justify-center items-center gap-4 w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  <img className="h-5 w-5" src={google} alt="" />
                  <span>Login with Google</span>
                </button>
              </div>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
