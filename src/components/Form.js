import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

//getting the values of localstorage
const getUsers = () => {
    const userInfo = localStorage.getItem("users")
    if (userInfo) {
        return JSON.parse(userInfo)
    }
    else {
        return []
    }
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const Form = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [users, setUsers] = useState(getUsers())
    const [birth, setBirth] = useState('')


    const onSubmit = data => {
        const age = getAge(data.date)

        const duplicate = users.find(u => u.email === data.email)
        if (duplicate) {
            alert(`duplicate email ${JSON.stringify(duplicate)}`);
            reset()
        }
        else if (age < 18) {
            alert('age is less than 18')

        }
        else {
            setUsers([...users, data])
            setBirth('')
            reset()
        }
    };

    //saving data on local storage

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    return (
        <div className=' grid grid-cols-2'>

            <div className=' bg-slate-300 p-10 mx-auto  rounded mt-20 flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className=' text-start'>

                    <div className=' mb-4'>
                        <label className=' block' htmlFor="">Name:</label>
                        <input className='p-2 rounded-lg w-[500px]' type='text' name='name' placeholder='Enter your Name' {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                            maxLength: {
                                value: 20,
                                message: 'Name must be maximum 20 characters'
                            },
                            minLength: {
                                value: 3,
                                message: 'Name should be at least 3 characters'
                            }
                        })} />
                        {errors.name && <p className=' text-red-600'>{errors.name.message}</p>}
                    </div>

                    <div className=' mb-4'>
                        <label className=' block' htmlFor="">Phone:</label>

                        <input className='p-2 rounded-lg w-[500px]' type="number" name="" id="" placeholder='Enter your phone number' {...register("phn", {
                            maxLength: {
                                value: 10,
                                message: 'Number must be 10 digit'
                            },
                            minLength: {
                                value: 10,
                                message: 'Number must be 10 digit'
                            }
                        }
                        )} />
                        {errors.phn && <p className=' text-red-600'>{errors.phn.message}</p>}
                    </div>

                    <div className=' mb-4'>
                        <label className=' block' htmlFor="">Email :</label>
                        <input className='p-2 rounded-lg w-[500px]' type="email" placeholder='Enter your  Email' {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        })} />
                        {errors.email && <p className=' text-red-600'>{errors.email.message}</p>}
                    </div>

                    <div className=' mb-4'>
                        <label className=' block' htmlFor="">Date of birth :</label>
                        <input className='p-2 rounded-lg w-[500px]' type="date" name="date" id="date" onFocus={e => setBirth(e.target.value)} {...register("date", {
                            required: {
                                value: true,
                                message: "Date is required"
                            }
                        })} />
                        {errors.date && <p className=' text-red-600'>{errors.date.message}</p>}
                        {birth && <p className=' text-red-600'>Your age is {getAge(birth)} years old</p>}

                    </div>

                    <div className=' flex justify-center '>
                        <input type="submit" value="Submit" className=' bg-teal-500 px-8 py-3 rounded-xl text-white text-lg font-bold cursor-pointer' />
                    </div>
                </form>
            </div>

            <div className=' bg-slate-300 p-10 mx-auto  rounded mt-20 flex justify-center items-center'>
                {
                    users.length < 1 ? <div>No users are added yet</div>
                        :
                        <div >
                            <div className=''>
                                <table className='border-separate border-spacing-2 border border-slate-500 bg-slate-200'>
                                    <thead>
                                        <tr>
                                            <th className='border border-slate-600 bg-slate-300'>Name</th>
                                            <th className='border border-slate-600 bg-slate-300'>Phone number</th>
                                            <th className='border border-slate-600 bg-slate-300'>Email</th>
                                            <th className='border border-slate-600 bg-slate-300'>Date of Birth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) =>
                                            <tr key={index}>
                                                <td className='border border-slate-700 p-4 '>{user.name}</td>
                                                <td className='border border-slate-700 p-4 '>{user.phn}</td>
                                                <td className='border border-slate-700 p-4 '>{user.email}</td>
                                                <td className='border border-slate-700 p-4 '>{user.date}</td>
                                            </tr>)}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                }
            </div>

        </div >
    );
};

export default Form;