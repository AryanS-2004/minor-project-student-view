'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomSelect from "../custom-select/custom-select";
import toast from "react-hot-toast";
import axios from 'axios'

const studentData = {
  de: 2,
  ge: 0,
}

const deOptions = [
  {
    label: "0",
    value: "0",
  },
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
];
const geOptions = [
  {
    label: "0",
    value: "0",
  },
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
];

const subjects: SelectOptionInterface[] = [
  {
    label: "EC_1",
    value: "EC_1",
  },
  {
    label: "EC_2",
    value: "EC_2",
  },
  {
    label: "EC_3",
    value: "EC_3",
  },
  {
    label: "CS_1",
    value: "CS_1",
  },
  {
    label: "CS_2",
    value: "CS_2",
  },
  {
    label: "CS_3",
    value: "CS_3",
  },
  {
    label: "IT_1",
    value: "IT_1",
  },
  {
    label: "IT_2",
    value: "IT_2",
  },
  {
    label: "IT_3",
    value: "IT_3",
  },
  {
    label: "IC_1",
    value: "IC_1",
  },
  {
    label: "IC_2",
    value: "IC_2",
  },
  {
    label: "IC_3",
    value: "IC_3",
  },
  {
    label: "IP_1",
    value: "IP_1",
  },
  {
    label: "IP_2",
    value: "IP_2",
  },
  {
    label: "IP_3",
    value: "IP_3",
  },
  {
    label: "EE_1",
    value: "EE_1",
  },
  {
    label: "EE_2",
    value: "EE_2",
  },
  {
    label: "EE_3",
    value: "EE_3",
  },
  {
    label: "BT_1",
    value: "BT_1",
  },
  {
    label: "BT_2",
    value: "BT_2",
  },
  {
    label: "BT_3",
    value: "BT_3",
  },
  {
    label: "TT_1",
    value: "TT_1",
  },
  {
    label: "TT_2",
    value: "TT_2",
  },
  {
    label: "TT_3",
    value: "TT_3",
  },
  {
    label: "CE_1",
    value: "CE_1",
  },
  {
    label: "CE_2",
    value: "CE_2",
  },
  {
    label: "CE_3",
    value: "CE_3",
  },
  {
    label: "ME_1",
    value: "ME_1",
  },
  {
    label: "ME_2",
    value: "ME_2",
  },
  {
    label: "ME_3",
    value: "ME_3",
  },
]

const isAvailableOptions = [
  {
    label: "YES",
    value: "YES",
  },
  {
    label: "NO",
    value: "NO",
  },
]

export function Hero() {
  const [dropdownOpened, setDropdownOpened] = useState<string>("");
  const [subjectOptions, setSubjectOption] = useState();
  const [branchOptions, setBranchOptions] = useState();
  const [name, setName] = useState<string>("");
  const [rollNo, setRollNo] = useState<string>("");
  const [cgpa, setCGPA] = useState<string>("");
  const [isFree, setIsFree] = useState<any>(null);
  const [branch, setBranch] = useState<any>(null);
  const [de, setDe] = useState<any>(null)
  const [ge, setGe] = useState<any>(null)
  const [pref1, setPref1] = useState<any>(null);
  const [pref2, setPref2] = useState<any>(null);
  const [pref3, setPref3] = useState<any>(null);
  const [pref4, setPref4] = useState<any>(null);
  const [pref5, setPref5] = useState<any>(null);
  const [pref6, setPref6] = useState<any>(null);
  const [pref7, setPref7] = useState<any>(null);
  const [pref8, setPref8] = useState<any>(null);
  const [pref9, setPref9] = useState<any>(null);
  const [pref10, setPref10] = useState<any>(null);
  const [pref11, setPref11] = useState<any>(null);
  const [pref12, setPref12] = useState<any>(null);
  const [pref13, setPref13] = useState<any>(null);
  const [pref14, setPref14] = useState<any>(null);
  const [pref15, setPref15] = useState<any>(null);
  const [pref16, setPref16] = useState<any>(null);
  const [pref17, setPref17] = useState<any>(null);
  const [pref18, setPref18] = useState<any>(null);
  const [pref19, setPref19] = useState<any>(null);
  const [pref20, setPref20] = useState<any>(null);
  const [pref21, setPref21] = useState<any>(null);
  const [pref22, setPref22] = useState<any>(null);
  const [pref23, setPref23] = useState<any>(null);
  const [pref24, setPref24] = useState<any>(null);
  const [pref25, setPref25] = useState<any>(null);
  const [pref26, setPref26] = useState<any>(null);
  const [pref27, setPref27] = useState<any>(null);
  const [pref28, setPref28] = useState<any>(null);
  const [pref29, setPref29] = useState<any>(null);
  const [pref30, setPref30] = useState<any>(null);
  const [pref31, setPref31] = useState<any>(null);
  const [pref32, setPref32] = useState<any>(null);
  const [pref33, setPref33] = useState<any>(null);



  useEffect(() => {
    getBranchesData();
    getCoursesData();
  }, [])

  const getBranchesData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/get-results/all-branches');
      const data = res?.data?.data;
      const branchesData: any = [];
      data.map((item: any) => {
        branchesData.push({
          label: item.branchName,
          value: item.branchCode,
        })
      })
      console.log(branchesData);
      setBranchOptions(branchesData);
    } catch (err) {
      console.log("Error while fetching Branches: ", err)
    }
  }
  const getCoursesData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/get-results/every-course');
      const data = res?.data?.data;
      const coursesData: any = [];
      data.map((item: any) => {
        coursesData.push({
          label: item.courseTitle,
          value: item.courseCode,
        })
      })
      console.log(coursesData);
      setSubjectOption(coursesData);
    } catch (err) {
      console.log("Error while fetching Courses: ", err)
    }
  }



  const handleSubmit = () => {
    const preferences = [
      pref1, pref2, pref3, pref4, pref5,
      pref6, pref7, pref8, pref9, pref10,
      pref11, pref12, pref13, pref14, pref15,
      pref16, pref17, pref18, pref19, pref20,
      pref21, pref22, pref23, pref24, pref25,
      pref26, pref27, pref28, pref29, pref30,
      pref31, pref32, pref33
    ];
    if (name === "") {
      toast.error("Please fill your Name.");
      return;
    }
    if (rollNo === "") {
      toast.error("Please fill your Roll No.");
      return;
    }
    if (cgpa === "") {
      toast.error("Please fill your CGPA.");
      return;
    }
    if (isFree === null) {
      toast.error("Please tell us if you are free or not.");
      return;
    }
    if (branch === null) {
      toast.error("Please tell us your branch.");
      return;
    }

    if (preferences.some(pref => pref === null)) {
      toast.error("Please fill all preferences.");
      return;
    }

    if (de === null || ge === null) {
      toast.error("Please fill the no of de or ge you want to take.");
      return;
    }

    const duplicatePreferences = preferences.filter((pref, index, self) => self.indexOf(pref) !== index);

    if (duplicatePreferences.length > 0) {
      toast.error("Some subjects are repeated. Please select different subjects for each preference.");
    } else {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      const oePrefrences: any = [];
      const dePrefrences: any = [];
      preferences.map((pref) => {
        if (pref.value.startsWith(branch)) {
          dePrefrences.push(pref.value);
        } else {
          oePrefrences.push(pref.value);
        }
      })
      const body = {
        name: name,
        branchCode: branch?.value,
        isFree: isFree.value === "YES" ? true : false,
        rollNo: parseInt(rollNo),
        gpa: parseInt(cgpa),
        de: randomNumber,
        oe: 3 - randomNumber,
        dePreference: dePrefrences,
        oePreference: oePrefrences,
      }
      console.log(body);
      console.log("Form submitted successfully!");
    }
  };


  return (
    <>
      <div className="bg-neutral-900  w-full">
        <div className="text-4xl font-bold text-white text-center py-12"> Please Enter Your Prefrences</div>
        <div className="flex flex-col gap-4 w-[50%] mx-auto pb-24">
          <input value={name} placeholder="Name" className="bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 py-2 rounded-lg text-white" onChange={(e) => setName(e.target.value)} />
          <input value={rollNo} placeholder="Roll No" className="bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 py-2 rounded-lg text-white" onChange={(e) => setRollNo(e.target.value)} />
          <input value={cgpa} placeholder="CGPA" className="bg-neutral-900 border-[#8b8989] border border-opacity-50 px-4 py-2 rounded-lg text-white" onChange={(e) => setCGPA(e.target.value)} />
          <CustomSelect placeholder='Select Branch' name='branch' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={branchOptions} onChange={setBranch} />
          <CustomSelect placeholder='Is Available' name='available' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={isAvailableOptions} onChange={setIsFree} />
          <CustomSelect placeholder='Select Pref 1' name='1' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref1} />
          <CustomSelect placeholder='Select Pref 2' name='2' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref2} />
          <CustomSelect placeholder='Select Pref 3' name='3' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref3} />
          <CustomSelect placeholder='Select Pref 4' name='4' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref4} />
          <CustomSelect placeholder='Select Pref 5' name='5' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref5} />
          <CustomSelect placeholder='Select Pref 6' name='6' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref6} />
          <CustomSelect placeholder='Select Pref 7' name='7' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref7} />
          <CustomSelect placeholder='Select Pref 8' name='8' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref8} />
          <CustomSelect placeholder='Select Pref 9' name='9' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref9} />
          <CustomSelect placeholder='Select Pref 10' name='10' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref10} />
          <CustomSelect placeholder='Select Pref 11' name='11' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref11} />
          <CustomSelect placeholder='Select Pref 12' name='12' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref12} />
          <CustomSelect placeholder='Select Pref 13' name='13' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref13} />
          <CustomSelect placeholder='Select Pref 14' name='14' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref14} />
          <CustomSelect placeholder='Select Pref 15' name='15' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref15} />
          <CustomSelect placeholder='Select Pref 16' name='16' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref16} />
          <CustomSelect placeholder='Select Pref 17' name='17' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref17} />
          <CustomSelect placeholder='Select Pref 18' name='18' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref18} />
          <CustomSelect placeholder='Select Pref 19' name='19' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref19} />
          <CustomSelect placeholder='Select Pref 20' name='20' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref20} />
          <CustomSelect placeholder='Select Pref 21' name='21' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref21} />
          <CustomSelect placeholder='Select Pref 22' name='22' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref22} />
          <CustomSelect placeholder='Select Pref 23' name='23' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref23} />
          <CustomSelect placeholder='Select Pref 24' name='24' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref24} />
          <CustomSelect placeholder='Select Pref 25' name='25' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref25} />
          <CustomSelect placeholder='Select Pref 26' name='26' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref26} />
          <CustomSelect placeholder='Select Pref 27' name='27' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref27} />
          <CustomSelect placeholder='Select Pref 28' name='28' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref28} />
          <CustomSelect placeholder='Select Pref 29' name='29' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref29} />
          <CustomSelect placeholder='Select Pref 30' name='30' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref30} />
          <CustomSelect placeholder='Select Pref 31' name='31' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref31} />
          <CustomSelect placeholder='Select Pref 32' name='32' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref32} />
          <CustomSelect placeholder='Select Pref 33' name='33' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={subjectOptions} onChange={setPref33} />
          <CustomSelect placeholder='No. of DE you want to opt for' name='DE' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={deOptions} onChange={setDe} />
          <CustomSelect placeholder='No. of GE you want to opt for' name='GE' dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} options={geOptions} onChange={setGe} />
          <button className="border-[#8b8989] text-white font-bold border rounded-full w-[50%] mx-auto py-2 mb-12 mt-8" onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </>
  )
}