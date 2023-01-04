import "./App.css";
import { useEffect, useState } from "react";

function App() {
  //state to store students
  const [students, setStudents] = useState([]);

  //state to store student name
  const [name, setName] = useState("");

  //state to store roll number
  const [rollNo, setRollNo] = useState(0);

  //function to create a new student
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInDate = `${new Date().getHours()} : ${
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes()
    } : ${
      new Date().getSeconds() < 10
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds()
    }`;

    //create new student
    const newStudent = {
      name,
      rollNo,
      checkIn: checkInDate,
    };

    //add new student to students list
    setStudents((prevState) => [...prevState, newStudent]);

    //update local storage
    updateStorage();
  };

  //function to delete student
  const handleCheckOut = (rollNo) => {
    //find students which do not match roll number
    const filteredStudents = students.filter(
      (student) => student.rollNo !== rollNo
    );

    //update student list
    setStudents(filteredStudents);

    //update local storage
    updateStorage();
  };

  //function to update local storage
  const updateStorage = () => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  //use effect to fetch students from local storage
  useEffect(() => {
    //fetch students from local storage
    const fetchedStudents = JSON.parse(localStorage.getItem("students"));

    console.log("fetched students", fetchedStudents);

    if (fetchedStudents) {
      //set students list
      setStudents(fetchedStudents);
    }
  }, []);
  return (
    <div className=" h-screen flex flex-col justify-center items-center bg-slate-100">
      <h1 className="text-4xl font-bold mb-12 ">Student Attendance System</h1>
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-200 shadow-xl shadow-slate-300 border-2 border-slate-200 rounded-lg">
        <form className="flex flex-col w-2/3 justify-center items-center gap-12 py-8 text-xl md:text-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 gap-2">
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full md:w-1/2 p-2 rounded-md focus:outline-none"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 gap-2">
            <label htmlFor="name">Roll Number</label>
            <input
              type="number"
              name="name"
              id="name"
              className="w-full md:w-1/2 p-2 rounded-md focus:outline-none"
              placeholder="20"
              onChange={(e) => setRollNo(parseInt(e.target.value))}
            />
          </div>
          <button
            className="bg-red-500 hover:bg-black hover:text-white w-36 p-2 rounded-md hover:scale-110"
            onClick={handleSubmit}
          >
            Check In
          </button>
        </form>
      </div>
      {students.length > 0 ? (
        <>
          <span className="text-xl">Total Students: {students.length}</span>
          <div className="w-full md:w-1/2 bg-orange-50 border-2 border-gray-900 shadow-xl shadow-slate-300 border-2 border-slate-200 rounded-lg mt-4">
            {students.map((student) => (
              <ul
                className="flex flex-col md:flex-row justify-between items-center p-4 gap-2"
                key={student.rollNo}
              >
                <li>
                  <span className="font-bold">Student:</span> {student.name}
                </li>
                <li>
                  <span className="font-bold">Roll Number:</span>{" "}
                  {student.rollNo}
                </li>
                <li>
                  <span className="font-bold">Check-in Time:</span>{" "}
                  {student.checkIn}
                </li>
                <li>
                  <button
                    className="bg-black text-white hover:bg-blue-500 hover:scale-110 w-24 p-1 rounded-md"
                    onClick={() => handleCheckOut(student.rollNo)}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-4">No students found</h1>
        </>
      )}
    </div>
  );
}

export default App;