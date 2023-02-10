import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./CandidatePersonalInfo.module.css";
import { useNavigate } from "react-router-dom";
import InputLabel from "../Label/InputLabel";
import { message } from 'antd';
//import swal from 'sweetalert';


function CandidatePersonalInfo() {

    const [id, setId] = useState(null); 
    const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));
    const [firstname, setFirstname] = useState(sessionStorage.getItem("user_firstname"));
    const [lastname, setLastname] = useState(sessionStorage.getItem("user_lastname"));
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [nin, setNin] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [maritalstat, setMaritalstat] = useState('');
    const [email, setEmail] = useState(sessionStorage.getItem("user_email"));
    const [phone, setPhone] = useState('');

    const [messageApi, contextHolder] = message.useMessage();
    const [disableNextBtn, setDisableNextBtn] = useState(true)

    const [dataExists, setDataExists] = useState(false);

    const basicRoute = 'http://userprofileserviceapplication3-env.eba-pm56e7xe.us-east-1.elasticbeanstalk.com/api/personal_information'
    // const basicRoute = 'http://192.168.0.128:5000/api/personal_information'
    const getByUserIdUrl = `${basicRoute}/users/${userId}`
    const postUrl = basicRoute
    const deleteUrl = `${basicRoute}/${id}`
    const putUrl = `${basicRoute}/${id}`

    useEffect(() => {
        fetch(getByUserIdUrl)
            .then(async (response) => await response.json())
            .then((data) => {
                console.log(data)
                if (data.userId) {
                    setDataExists(true)

                    const {id, firstName, lastName, dateOfBirth, gender, nationalIdentityNumber,
                    city, address, linkedProfile, maritalStatus, phoneNumber} = data
                    setId(id)
                    setFirstname(firstName)
                    setLastname(lastName)
                    setDob(dateOfBirth)
                    setGender(gender)
                    setNin(nationalIdentityNumber)
                    setCity(city)
                    setAddress(address)
                    setLinkedin(linkedProfile)
                    setMaritalstat(maritalStatus)
                    setPhone(phoneNumber)
                    setDisableNextBtn(false)
                    
                }
            })
            .catch(err => {
                console.log(err, "\nhello I caught this error");
            });
    }, [])



    const handleFirstname = useCallback(val => {
        setFirstname(val);
    }, []);

    const handleLastname = useCallback(val => {
        setLastname(val);
    }, []);

    const handleDob = useCallback(val => {
        setDob(val);
    }, []);

    const handleGender = useCallback(val => {
        setGender(val);
    }, []);

    const handleNin = useCallback(val => {
        setNin(val);
    }, []);

    const handleCity = useCallback(val => {
        setCity(val);
    }, []);

    const handleAddress = useCallback(val => {
        setAddress(val);
    }, []);

    const handleLinkedin = useCallback(val => {
        setLinkedin(val);
    }, []);

    const handleMaritalstat = useCallback(val => {
        setMaritalstat(val);
    }, []);

    const handlePhone = useCallback(val => {
        setPhone(val);
    }, []);

    async function onSubmit(event) {
        event.preventDefault();

        const data = {
            userId,
            firstName: firstname,
            lastName: lastname,
            dateOfBirth: dob,
            gender: gender,
            nationalIdentityNumber: nin,
            city: city,
            address: address,
            linkedProfile: linkedin,
            maritalStatus: maritalstat,
            phoneNumber: phone
        }

        fetch(dataExists ? putUrl : postUrl, {
            method: dataExists ? 'PUT' : 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response);
                const res = response ? response.ok : false;
                let updateUser = res ? 'Info saved successfully!' : 'Error saving info!';
                setDisableNextBtn(!res)
                if (res) {
                    updateUser = dataExists ? 'Info edited successfully!' : updateUser
                    messageApi.success(updateUser);
                }
                else {
                    messageApi.error(updateUser)
                }

                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                messageApi.error(updateUser);
                setDisableNextBtn(true)
            });
    }

    const navigate = useNavigate();

    const onNext = () => {
        navigate("/academic-details");
    }

    return (
        <>
            {contextHolder}
            <div className={styles.mainContainer}>
                <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
                    
                    <Heading className={styles.personalInfoHeading} text="Personal Information" />
                    {/* <div>
                        <InputField value={firstname} handler={handleFirstname} type='text' placeholder='First Name' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='fa-solid fa-user'></InputField>
                        <InputField value={lastname} handler={handleLastname} type='text' placeholder='Last Name' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='fa-regular fa-user'></InputField>
                    </div>
                    <div>
                        <DropdownField value={gender} handler={handleGender} options={['Male', 'Female']} className={styles.halfSize} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress' />
                        <InputField value={dob} handler={handleDob} min="" type='date' placeholder='' className={styles.halfSize} required='required' icon='fa-solid fa-calendar-days'></InputField>
                    </div>
                    <div>
                        <InputField value={nin} handler={handleNin} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className={styles.halfSize} required='required' icon='fa-solid fa-address-card'></InputField>
                        <DropdownField value={maritalstat} handler={handleMaritalstat} options={['Single', 'Married']} className={styles.halfSize} placeholder='Marital Status' icon='fa-solid fa-heart' />
                    </div>
                    <div>
                        <InputField disabled={true} value={email} type='email' placeholder='Email' className={styles.fullSize} required='required' icon='fa-solid fa-envelope'></InputField>
                    </div>
                    <div>
                        <PhoneComponent value={phone} handler={handlePhone} placeholder='Mobile Number' type='text' className='' required='required' />
                    </div>
                    <div>
                        <InputField value={city} handler={handleCity} type='text' placeholder='City' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' icon='ffa-sharp fa-solid fa-city'></InputField>
                    </div>
                    <div>
                        <InputField value={address} handler={handleAddress} type='text' placeholder='Address' className={styles.fullSize} required='required' icon='fa-solid fa-location-dot'></InputField>
                    </div>
                    <div>
                        <InputField value={linkedin} handler={handleLinkedin} type='text' placeholder='LinkedIn Profile' className={styles.fullSize} required='required' icon='fa-brands fa-linkedin'></InputField>
                    </div> */}
                    <table>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='First Name'></InputLabel></td>
                            <td className={styles.makeFieldAdjustment}><InputField value={firstname} handler={handleFirstname} type='text' placeholder='First Name' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='fa-solid fa-user'></InputField></td>
                            <td className={styles.makeLabelAdjustment}><InputLabel className={styles.inputLabel} text='Last Name' ></InputLabel></td>
                            <td><InputField value={lastname} handler={handleLastname} type='text' placeholder='Last Name' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='fa-regular fa-user'></InputField></td>
                        </tr>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='Gender'></InputLabel></td>
                            <td className={styles.makeFieldAdjustment}><DropdownField value={gender} handler={handleGender} options={['Male', 'Female']} className={styles.halfSize} placeholder='Select' icon='fa-sharp fa-solid fa-person-dress' /></td>
                            <td className={styles.makeLabelAdjustment}><InputLabel className={styles.inputLabel} text='Birth Date'></InputLabel></td>
                            <td><InputField value={dob} handler={handleDob} min="" type='date' placeholder='' className={styles.halfSize} required='required' icon='fa-solid fa-calendar-days'></InputField></td>
                        </tr>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='CNIC'></InputLabel></td>
                            <td className={styles.makeFieldAdjustment}><InputField value={nin} handler={handleNin} type='text' pattern="[0-9]*" placeholder='CNIC' className={styles.halfSize} required='required' icon='fa-solid fa-address-card'></InputField></td>
                            <td className={styles.makeLabelAdjustment}><InputLabel className={styles.inputLabel} text='Marital status'></InputLabel></td>
                            <td><DropdownField value={maritalstat} handler={handleMaritalstat} options={['Single', 'Married']} className={styles.halfSize} placeholder='Select' icon='fa-solid fa-heart' /></td>
                        </tr>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='Email'></InputLabel></td>
                            <td className={styles.makeFieldAdjustment}><InputField disabled={true} value={email} type='email' placeholder='Email' className={styles.halfSize} required='required' icon='fa-solid fa-envelope'></InputField></td>
                            <td className={styles.makeLabelAdjustment}><InputLabel className={styles.inputLabel} text='City'></InputLabel></td>
                            <td><InputField value={city} handler={handleCity} type='text' placeholder='City' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='ffa-sharp fa-solid fa-city'></InputField></td>
                        </tr>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='Contact No'></InputLabel></td>
                            <td colSpan="3"><PhoneComponent value={phone} handler={handlePhone} placeholder='Mobile Number' type='text' className='' required='required' /></td>
                        </tr>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='Address'></InputLabel></td>
                            <td colSpan="3"><InputField value={address} handler={handleAddress} type='text' placeholder='Address' className={styles.fullSize} required='required' icon='fa-solid fa-location-dot'></InputField></td>
                        </tr>
                        <tr>
                            <td><InputLabel className={styles.inputLabel} text='LinkedIn'></InputLabel></td>
                            <td colSpan="3"><InputField value={linkedin} handler={handleLinkedin} type='text' placeholder='LinkedIn Profile' className={styles.fullSize} required='' icon='fa-brands fa-linkedin'></InputField></td>
                        </tr>
                    </table>
                    <div className={styles.buttonContainer}>
                        <Button type="submit" text="Save" className={styles.saveButton} />
                        <Button disabled={disableNextBtn} onClick={onNext} text="Next" type="button" className={styles.nextButton} />
                    </div>
                </form>
            </div>
        </>

    )
}

export default CandidatePersonalInfo;