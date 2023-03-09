import React, { useEffect } from "react";
import TimePicker from "react-time-picker";
import styles from "./ScheduleInterview.module.css";
import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import InputField from "../profile/InputField/InputField";
import '../../../index.css';
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const BaseUrl = process.env.REACT_APP_API_URL4;
const UserUrl = process.env.REACT_APP_API_URL2;

const ScheduleInterview = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [interviewerId, setInterviewerId] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [hmName, setHmName] = useState("");
  const [interviewers,setInterviewers] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [errors, setErrors] = useState({});


  useEffect(()=>{
        fetch(`${UserUrl}/user/getByRole/2`)
        .then((response)=>response.json()).then((result)=>setInterviewers(result));

        fetch(`${UserUrl}/user/`+state.JobData.hmId)
        .then((response)=>response.json()).then((result)=>setHmName(result.first_name+" "+result.last_name));
  },[])

  const validate = (values) => {
    let errors = {};
    if (!values.interviewerId) {
      errors.interviewer = "Select Interviewer";
    }
    if (!values.date) {
      errors.date = "Set Date";
    }
    if (!values.time) {
      errors.time = "Set Time";
    }
    return errors;
  };

  const handleInterviewer = useCallback(e => {
    setInterviewerId(e.target.value);
    const index = e.nativeEvent.target.selectedIndex;
    setInterviewerName(e.nativeEvent.target[index].text);    
  }, []);

  const handleDate = useCallback((val) => {
    setDate(val);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    const errors = validate({interviewerId, date, time });
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        jobId : state.JobData.id,
        jobTitle:state.JobData.title,
        interviewerId:interviewerId,
        interviewer_name: interviewerName,
        candidate_name:state.name,
        candidateId: state.userId,
        interview_date:date,
        interview_time: time,
        status:0
      };

      fetch(`${BaseUrl}/interview`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => {
        if (response.status === 200) {
          swal(
            {
              title: "Scheduled Successfully!",
              icon: "success",
            });
            navigate("/");
        }
        else if (response.status === 404) {
          swal({
            title: "Server Not Responding!",
            icon: "error",
          }
          );
        }
      }
      );
    }
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div>
          <h1 className={styles.scheduleInterview}>Schedule Interview</h1>
        </div>
        <form className={styles.formInterview} onSubmit={onSubmit}>
          <div className={styles.form_row}>
            <div className={styles.form_column}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label>Candidate Name:</label>
                  <InputField
                    readonly
                    value={state.name}
                    type="text"
                    className={styles.halfSize}
                  ></InputField>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label>Hiring Manager:</label>
                  <InputField
                    readonly
                    value={hmName}
                    type="text"
                    className={styles.halfSize}
                  ></InputField>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label>Job Title:</label>
                  <InputField
                    readonly
                    value={state.JobData.title}
                    type="text"
                    className={styles.halfSize}
                  ></InputField>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label>Select Interviewer:</label>
                  <select
                    value={interviewerId}
                    onChange={handleInterviewer}
                    className={`${styles.halfSize} ${styles.select}`}
                  >
                    <option value="">Select Interviewer</option>
                    {interviewers.map((option) => (
                      <option className={styles.option} value={option.id}>
                        {option.first_name} {option.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.interviewer && (
                  <p className={styles.error}>{errors.interviewer}</p>
                )}
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.dob_label}>Date:</label>
                  <InputField
                    value={date}
                    handler={handleDate}
                    type="date"
                    placeholder="Date"
                    className={styles.halfSize}
                  ></InputField>
                </div>
                {errors.date && <p className={styles.error}>{errors.date}</p>}
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.time_label}>Time:</label>
                  <TimePicker
                    className={styles.time_picker}
                    onChange={setTime}
                    value={time}
                  />
                </div>
                {errors.time && <p className={styles.error}>{errors.time}</p>}
              </div>
            </div>
          </div>
          <div className={styles.btnDiv}>
            <Button
              type="submit"
              text="Schedule"
              className={styles.buttonSchedule}
            >
              Schedule
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleInterview;
