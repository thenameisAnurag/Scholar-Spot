import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import RecommendationForm from "../components/RecommendationForm"; // Import the form component

const ITEMS_PER_PAGE = 15;

const Scholarships = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Check if the user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch the scholarship data
    const fetchScholarships = async () => {
      try {
        const response = await fetch("/csvjson.json");
        const data = await response.json();
        setScholarships(data);
        // console.log(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScholarships();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentScholarships = scholarships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 mx-10">
      <div className="h-56 bg-sky-200 gap-8 flex flex-col rounded-xl justify-center content-center">
        <h1 className="text-4xl text-center font-bold mb-4">Scholarships</h1>
        <p className="text-xl text-center px-32">
          Explore a wide range of scholarship opportunities designed to help you
          achieve your educational goals. Whether you are pursuing undergraduate,
          graduate, or research programs, our resources offer valuable
          information on eligibility, deadlines, and application processes to
          help secure your financial support.
        </p>
      </div>

      {isLoggedIn ? (
        <>
          <button
            onClick={openModal}
            className="bg-blue-600 m-5 text-white px-4 py-2 rounded"
          >
            Get Recommendations
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative bg-white p-6 rounded shadow-lg w-6/12">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-red-500 text-3xl"
                >
                  <IoCloseCircle />
                </button>
                <RecommendationForm />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Please log in to get scholarship recommendations.</p>
      )}

      <div className="mt-6 mx-10">
        {currentScholarships.length === 0 ? (
          <p>No scholarships available</p>
        ) : (
          <div className="space-y-4">
            {currentScholarships.map((scholarship) => (
              <div key={scholarship.ID} className="border p-4 rounded shadow">
                <h2 className="text-xl py-2 font-semibold">
                  {scholarship.Name}
                </h2>
                <p className="text-gray-700 py-2">{scholarship.Description}</p>
                <button className="bg-yellow-300  rounded-md py-1 px-2">
                  <a
                    href={scholarship.LINKS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium rounded-md hover:underline"
                  >
                    More Info
                  </a>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
