const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const result = await login({
      email,
      password,
    }).unwrap();

    alert(result.message);

    localStorage.setItem("user", JSON.stringify(result.user));

    navigate("/home");
  } catch (error) {
    alert(error?.data?.message || "Login failed");
  }
};
