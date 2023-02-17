import React, { useState } from "react";
import { Calander } from "../components/Calander";

import { MultiSelectDropDown } from "../components/MultiSelect/MultiSelectDropDown";
import { SimpleDropDown } from "../components/SelectDropDown/SimpleDropDown";
import { Textfeild } from "../components/Textfeild";
import styled from "./UpdateJobPage.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import Radio from '@mui/material/Radio';
import { useEffect } from "react";


const BaseURL = process.env.REACT_APP_API_URL1;


const UpdateJobPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(state);

  const [jobTitle, setJobTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [department, setDepartment] = useState(data.departments.departmentName ); // for single drop down
  const [degrees, setDegrees] = useState(
    data.educations.map((data) => data.educationName)
  );
  //data problem
  // const [employmentCategories, setEmploymentCategories] = useState(data.employementCategory);

  const [employmentCategories, setEmploymentCategories] = useState(data.jobTypes.map(jt=>jt.jobTypeName));
  const [genders, setGenders] = useState(data.gender); // for single drop down
  const [location, setLocation] = useState(data.locations.locationName); // for single drop down
  const [softskills, setSoftskills] = useState(
    data.softSkills.map((data) => data.softSkillName)
  );
  const [technicalskills, setTechnicalskills] = useState(
    data.technicalSkills.map((data) => data.technicalSkillName)
  );
  const [experienceLevel, setExperienceLevel] = useState(data.experienceLevel); // for single drop down
  const [Benefits, setBenefits] = useState( data.benefits.map((data) => data.benefitsName));
  const [travelling, setTravelling] = useState(data.traveling); // for single drop down
  const [vacancies, setVacancies] = useState(data.vacancyCount);
  const [closingDate, setClosingDate] = useState(new Date(data.closeDate));
  const [selectedResponsibilites, setSelectedResponsibilities] = useState(
    data.responsibilities
  );
  const [buttonDisable, setButtonDisable] = useState(false);
  const [buttonText, setButtonText] = useState("UPDATE");

  const [active_status, setActive_status] = useState(data.active);

  const [departmentOptions, setDepartmentOptions] = useState([])
  const [degreeOptions, setDegreeOptions] = useState([])
  const [softSkillsOptions, setSoftSkillsOptions] = useState([])
  const [technicalskillsOptions, setTechnicalskillsOptions] = useState([])
  const [employmentCategoriesOptions, setEmploymentCategoriesOptions] = useState([])
  const [benefitsOptions, setBenefitsOptions] = useState([])
  const [perksOptions, setPerksOptions] = useState([])
  const [locationOptions, setLocationOptions] = useState([])
  const [Perks, setPerks] = useState( data.perks.map((data) => data.perksName));



  useEffect(()=>{

    
    fetch(`${BaseURL}/jobType/all`)
    .then( async (response) =>{
      if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
        return await response.json()}
        )
    .then((data) => {
              data = data.filter(d=>d.active)
      
      data = data.map(d=>d.jobTypeName)
      setEmploymentCategoriesOptions(data);
    })
    .catch((err) => {
      if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
      else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
    });


    fetch(`${BaseURL}/department/all`)
    .then( async (response) =>{
      if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
        return await response.json()}
        )
    .then((data) => {
              data = data.filter(d=>d.active)
      
      data = data.map(d=>d.departmentName)
      setDepartmentOptions(data);
    })
    .catch((err) => {
      if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
      else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
    });

    fetch(`${BaseURL}/benefits/all`)
      .then( async (response) =>{
        if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
          return await response.json()}
          )
      .then((data) => {
              data = data.filter(d=>d.active)
        
        data = data.map(d=>d.benefitsName)
        setBenefitsOptions(data);
      })
      .catch((err) => {
        if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
        else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
      });


      fetch(`${BaseURL}/education/all`)
        .then( async (response) =>{
          if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
            return await response.json()}
            )
        .then((data) => {
              data = data.filter(d=>d.active)
          
          data = data.map(d=>d.educationName)
          setDegreeOptions(data);
        })
        .catch((err) => {
          if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
          else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
        });

        fetch(`${BaseURL}/softSkill/all`)
          .then( async (response) =>{
            if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
              return await response.json()}
              )
          .then((data) => {
              data = data.filter(d=>d.active)
            
            data = data.map(d=>d.softSkillName) 
            setSoftSkillsOptions(data);
          })
          .catch((err) => {
            if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
            else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
          });

          fetch(`${BaseURL}/technicalSkill/all`)
            .then( async (response) =>{
              if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
                return await response.json()}
                )
            .then((data) => {
              data = data.filter(d=>d.active)
              
              data = data.map(d=>d.technicalSkillName) 
              setTechnicalskillsOptions(data);
            })
            .catch((err) => {
              if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
              else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
            });

            fetch(`${BaseURL}/location/all`)
            .then( async (response) =>{
              if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
                return await response.json()}
                )
            .then((data) => {
              data = data.filter(d=>d.active)
              
              data = data.map(d=>d.locationName) 
              setLocationOptions(data);
            })
            .catch((err) => {
              if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
              else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
            });

            fetch(`${BaseURL}/perks/all`)
            .then( async (response) =>{
              if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
                return await response.json()}
                )
            .then((data) => {
              data = data.filter(d=>d.active)
              data = data.map(d=>d.perksName) 
              setPerksOptions(data);
            })
            .catch((err) => {
              if(err.Error>=400){ swal( {  title: "Server Down", icon: "error",});}
              else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
            });
  },[])


  const experienceLevelOptionsValue = [
    "Fresh Graduate",
    "1 Year",
    "2 Year",
    "3 Year",
    "4 Year",
    "5 Year",
    "6 Year",
    "7 Year",
    "8 Year",
    "9 Year",
    "10 Year",
    "11 Year",
    "12 Year",
    "13 Year",
    "14 Year",
    "15 Year",
    "16 Year",
    "17 Year",
    "18 Year",
    "19 Year",
    "20 Year",
  ];
  
  const experienceLevelOptions = [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const genderOptions = ["Male", "Female", "Anyone"];
  const travellingOptions = ["Yes", "No", "MayBe "];

 


  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonText("Loading...");
    setButtonDisable(true);
    if (
      !degrees.length ||
      !employmentCategories.length ||
      !softskills.length ||
      !technicalskills.length ||
      !Benefits.length ||
      !Perks.length ||
      !experienceLevel
    ) {
      console.log(degrees);
      // alert("Please fill out all the required fields");
      swal({
        title: "Please fill out all the required fields",
        icon: "error",
      });
      setButtonText("SUBMIT");
      setButtonDisable(false);
      return;
    }
    console.log(employmentCategories)
    let requestData = {
      title: jobTitle,
      departments: {departmentName: department },
      jobTypes: employmentCategories.map(m => {return {jobTypeName: m} }), // ["FULL_TIME","ONLINE"],
      gender: genders, //["MALE","FEMALE"],
      traveling: travelling,
      locations: { locationName: location},
      softSkills: softskills.map((ss) => {
        return { softSkillName: ss };
      }),
      technicalSkills: technicalskills.map((ts) => {
        return { technicalSkillName: ts };
      }),
      closeDate: closingDate, //"2023-01-30"
      description: description,
      responsibilities: selectedResponsibilites,
      educations: degrees.map((edu) => {
        return { educationName: edu };
      }),
      benefits: Benefits.map((pb) => {
        return { benefitsName: pb };
      }),
      perks: Perks.map((per) => {
        return { perksName: per };
      }),
      experienceLevel: parseInt(experienceLevel),
      vacancyCount: vacancies,
      active:active_status,
      hmId: sessionStorage.getItem('user_id')
    };

    fetch(
      `${BaseURL}/job/update/${data.id}`,
      // `http://localhost:5000/job/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        swal({
          title: "Job Updated sucessfully!",
          icon: "success",
        });

        setButtonText("SUBMIT");
        setButtonDisable(false);

        setJobTitle("");
        setDepartment("");
        setEmploymentCategories([]);
        setGenders([]);
        setTravelling("");
        setLocation("");
        setSoftskills([]);
        setTechnicalskills([]);
        setClosingDate("");
        setDescription("");
        setSelectedResponsibilities();
        setDegrees([]);
        setBenefits([]);
        setPerks([]);
        setActive_status(undefined);
        setExperienceLevel(0);
        setVacancies(undefined);
        navigate("/job/all");
      })
      .catch((err) => {
        if (err.Error > 400) {
          swal({
            title: "Server Down",
            icon: "error",
          });
        } else if (err.Error > 299) {
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
        // else{
        //   console.log("fdkmfk" +type(err.Error));
        //   swal({
        //     title: "Job posted sucessfully!",
        //     icon: "success",
        // });
        // }
        setButtonText("SUBMIT");
        setButtonDisable(false);
      });
  };

  return (
    <div className={styled.mainContainer}>
      <div className={styled.create_job_page}>
        {" "}
        <h1 className={`${styled.heading} afnan`}>Update Job</h1>
        <div className={styled.FormCreateJob}>
          <form onSubmit={handleSubmit}>
            <div className={styled.div2}>
              <div className={styled.enterjobtitle}>
                <h4 className={styled.heading2}>Job Title</h4>
                <Textfeild
                  ChildrenTag={{ type: "text" }}
                  data-testid="title-input"
                  inputValue={jobTitle}
                  setInputValue={setJobTitle}
                  labelText="title"
                  placeholderText="Enter Job Title"
                ></Textfeild>
              </div>
              <div className={styled.active_status_container}>
                <h4 className={styled.heading2}>Job Status</h4>
                <label htmlFor="ActiveJob">Active</label>
                <Radio
                  id="ActiveJob"
                  checked={active_status}
                  // className={styled.ActiveJob}
                  onChange={(event)=>setActive_status(true)}
                  color='success'
                  value={true}
                  name="radio-button1"
                  />
                <label htmlFor="InActiveJob">InActive</label>
                <Radio
                  id="InActiveJob"
                  color='warning'
                  // className={styled.InActiveJob}
                  checked={!active_status}
                  onChange={(event)=>setActive_status(false)}
                  value={false}
                  name="radio-button2"

                />
              </div>
            </div>

            {/* <div className={styled.jobdescription}>
            <h4 className={styled.heading3}>Job Description</h4>
            
            <Textfeild
            inputValue={description}
            setInputValue={setDescription}
            placeholderText="Enter Job Description"
            ></Textfeild>
          </div> */}
            <div className={styled.job_description_container}>
              <h4 className={styled.heading3}>Job Description</h4>
              <textarea
                className={styled.job_description_input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Job Description"
              ></textarea>
            </div>
            <div className={styled.job_description_container}>
              <h4 className={styled.heading3}>Responsibilities</h4>
              <textarea
                className={styled.job_description_input}
                onChange={(e) => setSelectedResponsibilities(e.target.value)}
                value={selectedResponsibilites}
                placeholder="Enter Responsibilities"
              ></textarea>
            </div>
            <br></br>

            <div className={styled.div2}>
              <div className={styled.employmentcategory}>
                <h4 className={styled.heading4}>Employment Category</h4>

                <MultiSelectDropDown
                  fetchedOptions={employmentCategoriesOptions}
                  selected={employmentCategories}
                  setSelected={setEmploymentCategories}
                ></MultiSelectDropDown>
              </div>
              <div className={styled.experience}>
                <h4 className={styled.heading12}>Experience</h4>

                <SimpleDropDown
                  optionLabel="Year"
                  selectedOption={experienceLevel}
                  setSelectedOption={setExperienceLevel}
                  options={experienceLevelOptions}
                  optionText={experienceLevelOptionsValue}
                ></SimpleDropDown>
              </div>
             {/* responsibility */}
            </div>
            <br></br>
            <div className={styled.div3}>
              <div className={styled.education}>
                <h4 className={styled.heading6}>Education</h4>

                <MultiSelectDropDown
                  fetchedOptions={degreeOptions}
                  selected={degrees}
                  setSelected={setDegrees}
                ></MultiSelectDropDown>
              </div>

              <div className={styled.dropdown}>
                <h4 className={styled.heading4}>Department</h4>
                <SimpleDropDown
                  title="Department"
                  selectedOption={department}
                  setSelectedOption={setDepartment}
                  options={departmentOptions}
                ></SimpleDropDown>
              </div>

              {/* <div className={styled.employmentcategory}>
                <h4 className={styled.heading7}>Employment Category</h4>

                <MultiSelectDropDown
                  fetchedOptions={employmentCategoriesOptions}
                  selected={employmentCategories}
                  setSelected={setEmploymentCategories}
                ></MultiSelectDropDown>
              </div> */}
            </div>
            <br></br>
            <div className={styled.div4}>
              <div className={`${styled.softskills}`}>
                <h4 className={styled.heading8}>Soft Skills</h4>

                <MultiSelectDropDown
                  fetchedOptions={softSkillsOptions}
                  selected={softskills}
                  setSelected={setSoftskills}
                >
                  {" "}
                </MultiSelectDropDown>
              </div>

              <div className={styled.technicalskills}>
                <h4 className={styled.heading9}>Technical Skills</h4>

                <MultiSelectDropDown
                  fetchedOptions={technicalskillsOptions}
                  selected={technicalskills}
                  setSelected={setTechnicalskills}
                >
                  {" "}
                </MultiSelectDropDown>
              </div>
            </div>
            <br></br>
            <div className={styled.div5}>
            <div className={styled.perksandbenifits}>
                <h4 className={styled.heading10}>Benefits</h4>

                <MultiSelectDropDown
                  fetchedOptions={benefitsOptions}
                  selected={Benefits}
                  setSelected={setBenefits}
                ></MultiSelectDropDown>
              </div>  
              <div className={styled.perksandbenifits}>
                <h4 className={styled.heading10}>Perks</h4>

                <MultiSelectDropDown
                  fetchedOptions={perksOptions}
                  selected={Perks}
                  setSelected={setPerks}
                ></MultiSelectDropDown>
              </div>
           
            </div>

            <br></br>

            <section className={styled.form2}>
              <div className={styled.div6}>
                <div className={styled.gender}>
                  <h4 className={styled.heading14}>Gender</h4>

                  <SimpleDropDown
                    optionLabel="Select"
                    selectedOption={genders}
                    setSelectedOption={setGenders}
                    options={genderOptions}
                  ></SimpleDropDown>
                </div>
                <div className={styled.vacancies}>
                  <h4 className={styled.heading13}>Vacancies</h4>

                  <Textfeild
                    ChildrenTag={{ type: "number", required: "htmlRequired" }}
                    inputValue={vacancies}
                    setInputValue={setVacancies}
                    labelText="title"
                    placeholderText="Number of vacancies"
                  ></Textfeild>
                </div>
              </div>
              <br></br>
              <div className={styled.div7}>
                <div className={styled.Location}>
                  <h4 className={styled.heading11}>City</h4>

                  <SimpleDropDown
                    optionLabel="City"
                    selectedOption={location}
                    setSelectedOption={setLocation}
                    options={locationOptions}
                  ></SimpleDropDown>
                </div>
                <div className={styled.requirestravelling}>
                  <h4 className={styled.heading15}>Requires Travelling</h4>

                  <SimpleDropDown
                    optionLabel="Travelling..."
                    selectedOption={travelling}
                    setSelectedOption={setTravelling}
                    options={travellingOptions}
                  ></SimpleDropDown>
                </div>
              </div>

              <br></br>
              <h4 className={styled.heading16}>Closing date</h4>

              <div className={styled.closingdate}>
                <Calander
                  selectedDate={closingDate}
                  setSelectedDate={setClosingDate}
                ></Calander>
                <div className="button">
                  <button
                    type="button"
                    className={styled.button}
                    onClick={handleSubmit}
                    disabled={buttonDisable}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJobPage;
