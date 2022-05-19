import React, { useRef, useState } from 'react'

import { useNavigate  } from 'react-router-dom';
import image from '../image/image.jpeg'
import styles from '../styles/register.module.scss';
// import App from '../pages/charts'

export default function Register() {
    const location = useNavigate();
    const formReference = useRef();
    const [formData, setFormData] = useState();
    const [validForm, setValidForm] = useState(false);
    const [valid, setValid] = useState({
        email: {
            valid: false,
            message: '',
        },
        password: {
            valid: false,
            message: '',
        },
        cpassword: {
            valid: false,
            message: '',
        },
        phone: {
            valid: false,
            message: '',
        },
        checked: false
    });
    const validateForm = () => {
        const email = formReference.current.email.value
        const phone = formReference.current.phone.value
        const password = formReference.current.password.value
        const name = formReference.current.name.value
        const cpassword = formReference.current.cpassword.value
        setFormData({ ...formData, email, phone, password, name })
        if (email) {
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(emailRegex)) {
                setValid({
                    ...valid, email: {
                        valid: true,
                        message: ''
                    }
                })
            } else {
                setValid({
                    ...valid, email: {
                        valid: false,
                        message: 'Enter correct email'
                    }
                })
            }
        }
        if (password) {
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (password.match(passw)) {
                setValid({
                    ...valid, password: {
                        valid: true,
                        message: ''
                    }
                })
            } else {
                setValid({
                    ...valid, password: {
                        valid: false,
                        message: 'Password must be 7 to 15 characters which contain only characters numeric digits, underscore and first character must be a letter'
                    }
                })
            }
        }
        if (cpassword) {
            if (password == cpassword) {
                setValid({
                    ...valid, cpassword: {
                        valid: true,
                        message: ''
                    }
                })
            } else {
                setValid({
                    ...valid, cpassword: {
                        valid: false,
                        message: 'Password must me matched'
                    }
                })
            }
        }

        if (phone) {
            var phoneno = /^\d{10}$/;

            if (phone.length == 10) {
                if (phone.match(phoneno)) {
                    setValid({
                        ...valid, phone: {
                            valid: true,
                            message: ''
                        }
                    })
                } else {
                    setValid({
                        ...valid, phone: {
                            valid: false,
                            message: 'Enter valid phone number'
                        }
                    })
                }
            }
            else {
                setValid({
                    ...valid, phone: {
                        valid: false,
                        message: 'Enter valid phone number'
                    }
                })
            }
        }
        for (const element in valid) {
            if(valid[element].valid) {
                setValidForm(true)
            }
        }
    }
    const submitForm = (e) => {
        e.preventDefault();
        location("/chart");
    }
    return (
        <>
            <div className={styles.signup}>
                <div className={styles.signup__leftContainer}>
                    <img className={styles.signup__leftContainer__image} src={image} alt='register illustration' />
                </div>
                <div className={styles.signup__rightContainer}>
                    <h2 className={styles.signup__rightContainer__head}>Create an account</h2>
                    <form ref={formReference} className={styles.signup__rightContainer__form}>
                        <div className={styles.signup__rightContainer__form__inputfields}>
                            <label className={styles.signup__rightContainer__form__inputfields__label} htmlFor='email'>Your Email Address</label>
                            <input onChange={validateForm} size="60" className={styles.signup__rightContainer__form__inputfields__input} name='email' type='email' />
                            {valid.email.message && <legend>{valid.email.message}</legend>}
                        </div>
                        <div className={styles.signup__rightContainer__form__inputfields}>
                            <label className={styles.signup__rightContainer__form__inputfields__label} htmlFor='password'>Your password</label>
                            <input onChange={validateForm} className={styles.signup__rightContainer__form__inputfields__input} name='password' type='password' />
                            {valid.password.message && <legend>{valid.password.message}</legend>}
                        </div>
                        <div className={styles.signup__rightContainer__form__inputfields}>
                            <label className={styles.signup__rightContainer__form__inputfields__label} htmlFor='cpassword'>Confirm your password</label>
                            <input onChange={validateForm} className={styles.signup__rightContainer__form__inputfields__input} name='cpassword' type='password' />
                            {valid.cpassword.message && <legend>{valid.cpassword.message}</legend>}
                        </div>
                        <div className={styles.signup__rightContainer__form__inputfields}>
                            <label className={styles.signup__rightContainer__form__inputfields__label} htmlFor='name'>Your full name</label>
                            <input onChange={validateForm} className={styles.signup__rightContainer__form__inputfields__input} name='name' type='text' />
                        </div>
                        <div className={styles.signup__rightContainer__form__inputfields}>
                            <label className={styles.signup__rightContainer__form__inputfields__label} htmlFor='phone'>Your phone number</label>
                            <input onChange={validateForm} size="40" className={`${styles.signup__rightContainer__form__inputfields__input} ${styles.w25}`} name='phone' type='text' />
                            {valid.phone.message && <legend>{valid.phone.message}</legend>}
                        </div>
                        <div className={`${styles.signup__rightContainer__form__inputfields} ${styles.flexBox}`}>
                            <input onChange={(e) => setFormData({ ...formData, checked: e.target.checked })} className={styles.signup__rightContainer__form__inputfields__checkbox} type='checkbox' name='terms' />
                            <span>I read and agree Terms and Conditions</span>
                        </div>
                        <button disabled={!validForm} type='submit' onClick={submitForm}>Create Account</button>
                    </form>
                </div>
            </div>
        </>
    )
}
