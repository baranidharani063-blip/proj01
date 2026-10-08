import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Home Page
          </h1>

          <p className="text-xl text-gray-700">
            Login Successful!
          </p>

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default Home;
