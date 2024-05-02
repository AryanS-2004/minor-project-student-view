'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomSelect from "../custom-select/custom-select";
import toast from "react-hot-toast";
import axios from 'axios'


export function Hero() {
  const [deSubjects, setDeSubjects] = useState<any>([]);
  const [geSubjects, setGeSubjects] = useState<any>([]);
  const [deNum, setDeNum] = useState<string[]>([]);
  const [geNum, setGeNum] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [branch, setBranch] = useState<string>();
  const [rollNo, setRollNo] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [cgpa, setCGPA] = useState<number>(0);
  const [semester, setSemester] = useState<number>(0);
  const [deDone, setDeDone] = useState<number>(0);
  const [geDone, setGeDone] = useState<number>(0);
  const [de, setDe] = useState<any>(null)
  const [ge, setGe] = useState<any>(null)
  const [deOptions, setDeOptions] = useState<any>([]);
  const [geOptions, setGeOptions] = useState<any>([]);
  const [studentPref, setStudentPref] = useState<string[]>([])
  const [dePref, setDePref] = useState<string[]>([])
  const [gePref, setGePref] = useState<string[]>([]);
  const [deChanged, setDeChanged] = useState<boolean>();



  useEffect(() => {
    if (isVerified) {
      getCoursesData();
    }
  }, [isVerified])

  const getCoursesData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/get-results/every-course');
      const data = res?.data?.data;
      const deData: any = [];
      const geData: any = [];
      data.map((item: any) => {
        if (item.branchCode === branch) {
          deData.push({
            label: item.courseTitle,
            value: item.courseCode,
          })
        } else {
          geData.push({
            label: item.courseTitle,
            value: item.courseCode,
          })
        }
      })
      setDeSubjects(deData);
      setGeSubjects(geData);
      const dePrefArr: any = Array(deData.length).fill("")
      const gePrefArr: any = Array(geData.length).fill("")
      setDeNum(dePrefArr);
      setGeNum(dePrefArr);
      setDePref(dePrefArr);
      setGePref(gePrefArr);
    } catch (err) {
      console.log("Error while fetching Courses: ", err)
    }
  }



  const handleSubmit = () => {
    if (dePref.map(pref => pref === '')) {
      toast.error("Please fill DE preferences.");
      return;
    }
    if (gePref.map(pref => pref === '')) {
      toast.error("Please fill GE preferences.");
      return;
    }

    if (de === null || ge === null) {
      toast.error("Please fill the no of de or ge you want to take.");
      return;
    }

    const randomNumber = Math.floor(Math.random() * 2) + 1;
    const body = {
      name: name,
      branchCode: branch,
      rollNo: rollNo,
      gpa: cgpa,
      de: de,
      oe: ge,
      dePreference: dePref,
      oePreference: gePref,
    }
    console.log(body);
    console.log("Form submitted successfully!");
  };


  const handleLoginSubmit = async () => {
    if (rollNo === 0) {
      toast.error("Please fill your Roll No.");
      return;
    }
    if (password === "") {
      toast.error("Please enter password to login.");
      return;
    }
    try {
      const body = {
        rollNo: rollNo,
        passWord: password
      }
      const res = await axios.post(`http://localhost:4000/get-results/student-info`, body);
      const data = res.data.student;
      console.log(res.data.student);
      setName(data.name);
      setBranch(data.branchCode);
      setCGPA(data.gpa);
      setDeDone(data.de);
      setGeDone(data.oe);
      setSemester(data.semester);
      if (data.semester === 6) {
        const data = [];
        for (let i = 0; i <= 2; i++) {
          data.push({
            label: `${i}`,
            value: `${i}`,
          })
        }
        console.log(data);
        setDeOptions(data);
        setGeOptions(data);
      } else if (data.semester === 7) {
        const deData = [];
        const geData = [];
        if (data.de > 0) {
          for (let i = 0; i <= 3; i++) {
            deData.push({
              label: `${i}`,
              value: `${i}`,
            })
          }
        } else {
          for (let i = 1; i <= 3; i++) {
            deData.push({
              label: `${i}`,
              value: `${i}`,
            })
          }
        }
        console.log(Math.min(4 - data.oe, 3));
        for (let i = 0; i <= Math.min(4 - data.oe, 3); i++) {
          geData.push({
            label: `${i}`,
            value: `${i}`,
          })
        }
        console.log(deData);
        console.log(geData);
        setDeOptions(deData);
        setGeOptions(geData);
      } else {
        const deData = [];
        const geData = [];
        const deMin = Math.max(0, 4 - data.de);
        const geMin = Math.max(0, 2 - data.oe);
        for (let i = deMin; i <= 3 - geMin; i++) {
          deData.push({
            label: `${i}`,
            value: `${i}`,
          })
        }
        for (let i = geMin; i <= 3 - deMin; i++) {
          geData.push({
            label: `${i}`,
            value: `${i}`,
          })
        }
        console.log(deData);
        console.log(geData);
        setDeOptions(deData);
        setGeOptions(geData);

      }
      setIsVerified(true);
    } catch (err) {
      console.log("Error while logging in: ", err);
    }
  }

  useEffect(() => {
    let options = deSubjects;
    options = options.filter((option: any) => {
      if (dePref.includes(option.value)) {
        return false;
      }
      else return true;
    })
    console.log(options);
    setDeSubjects(options);
  }, [deChanged])


  return (
    <>
      <div className="bg-neutral-900  w-full min-h-screen flex flex-col justify-center">
        {!isVerified && <div className="flex flex-col gap-4 w-[50%] mx-auto pb-24">
          <div className="text-4xl font-bold text-white text-center py-8"> Login</div>
          <input type="text" placeholder="Roll No" className="bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 py-2 rounded-lg text-white" onChange={(e) => setRollNo(parseInt(e.target.value))} />
          <input value={password} placeholder="Password" className="bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 py-2 rounded-lg text-white" onChange={(e) => setPassword(e.target.value)} />
          <button className="border-[#8b8989] text-white font-bold border rounded-full w-[50%] mx-auto py-2 mb-12 mt-8" onClick={handleLoginSubmit}>Login</button>
        </div>
        }
        {isVerified && <div className="flex flex-col gap-4 w-[50%] mx-auto pb-24">
          <div className="flex justify-between w-full items-center pt-16 text-lg">
            <div className="text-white w-[47%] "><span className="text-gray-300 font-normal">Name:</span> {name}</div>
            <div className="text-white w-[47%] "><span className="text-gray-300 font-normal">Semester:</span> {semester}</div>
          </div>
          <div className="flex justify-between items-center w-full text-lg">
            <div className="text-white w-[47%] "><span className="text-gray-300 font-normal">No. of DE Completed:</span> {deDone}</div>
            <div className="text-white w-[47%] "><span className="text-gray-300 font-normal">No. of GE Completed:</span> {geDone}</div>
          </div>
          <div className="text-2xl font-bold text-white text-center py-6">Select No. of DE and GE you want to do</div>

          <select
            className={`w-full bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 pr-6 py-2 rounded-lg text-white max-h-300px `}
            value={de}
            onChange={(e) => {
              const value = e.target.value;
              setDe(parseInt(value));
              const lim = semester === 6 ? 2 : 3;
              setGe(lim - parseInt(value));
            }}
          >
            <option className={``} value=''>
              Select No. of DE
            </option>
            {deOptions && deOptions?.map((option: any, index: number) => (
              <option
                key={index}
                className={``}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <select
            className={`w-full bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 pr-6 py-2 rounded-lg text-white max-h-300px `}
            value={ge}
            onChange={(e) => {
              const value = e.target.value;
              setGe(parseInt(value))
              const lim = semester === 6 ? 2 : 3;
              setDe(lim - parseInt(value));
            }}
          >
            <option className={``} value=''>
              Select No. of GE
            </option>
            {geOptions && geOptions?.map((option: any, index: number) => (
              <option
                key={index}
                className={``}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="text-2xl font-bold text-white text-center py-6">Enter Your DE Prefrences</div>

          {deNum?.map((subject: any, index: number) => (
            <select
              key={index}
              className={`w-full bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 pr-6 py-2 rounded-lg text-white max-h-300px `}
              onChange={(e) => {
                const value = e.target.value;
                const prefData = dePref;
                if (prefData.includes(value)) {
                  toast.error('The course has been selected already');
                  e.target.value = prefData[index];
                  return;
                }
                setDeChanged(!deChanged);
                prefData[index] = value;
                console.log(prefData);
                setDePref(prefData)
              }}
            >
              <option
                className={``}
                value=''
              >
                Select DE Pref {index + 1}
              </option>
              {deSubjects?.map((subject: any, index: number) => (
                <option
                  key={index}
                  className={``}
                  value={subject.value}
                >
                  {subject.label}
                </option>
              ))}
            </select>
          ))}
          <div className="text-2xl font-bold text-white text-center py-6">Enter Your GE Prefrences</div>
          {geNum?.map((subject: any, index: number) => (
            <select
              key={index}
              className={`w-full bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 pr-6 py-2 rounded-lg text-white max-h-300px `}
              onChange={(e) => {
                const value = e.target.value;
                const prefData = gePref;
                if (prefData.includes(value)) {
                  toast.error('The course has been selected already');
                  e.target.value = prefData[index];
                  return;
                }
                prefData[index] = value;
                console.log(prefData);
                setGePref(prefData)
              }}
            >
              <option
                className={``}
                value=''
              >
                Select GE Pref {index + 1}
              </option>
              {geSubjects?.map((subject: any, index: number) => (
                <option
                  key={index}
                  className={``}
                  value={subject.value}
                >
                  {subject.label}
                </option>
              ))}
            </select>
          ))}

          <button className="border-[#8b8989] text-white font-bold border rounded-full w-[50%] mx-auto py-2 mb-12 mt-8" onClick={handleSubmit}>Submit</button>
        </div>
        }

      </div>
    </>
  )
}