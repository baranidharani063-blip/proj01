import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const userData = localStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <main className="flex-1 flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Home Page
          </h1>

          {user ? (
            <>
              <p className="text-xl text-gray-700">
                Welcome, {user.name}!
              </p>

              <p className="text-gray-600 mt-2">
                Email: {user.email}
              </p>
            </>
          ) : (
            <p className="text-gray-600">
              Welcome User!
            </p>
          )}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Home;
