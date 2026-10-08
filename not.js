<form onSubmit={handleRegister}>

  {/* Name */}
  {/* Email */}
  {/* Password */}

  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
  >
    {isLoading ? "Registering..." : "Register"}
  </button>

</form>

<p className="text-center mt-4">
  Already have an account?{" "}

  <button
    type="button"
    onClick={() => navigate("/login")}
    className="text-blue-500"
  >
    Login
  </button>
</p>
