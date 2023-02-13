import React from 'react'
import { useState, useEffect } from 'react'

const LanguageSkill = (props: any) => {

    const [languages, setLanguages] = useState([] as any)
    const [inputValue, setInputValue] = React.useState('');
    const [addSkil, setAddSkill] = useState(false)
    const [skills, setSkills] = useState([] as any)


    useEffect(() => {
        if (props.userDetails) {
            setLanguages(props.userDetails?.profile?.merchantInfo?.languages || [])
            setSkills(props.userDetails?.profile?.merchantInfo?.skills || [])
        }
    }, [props.userDetails])

    // add language
    const addLanguageHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            language: languages.map((lang: any) => lang.language)
        }
        await props.addMerchantLanguages(data)
    }

    // add skill
    const addSkillHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            skill: skills
        }
        await props.addMerchantSkills(data)
    }

    // add skill
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && inputValue !== '') {
            setSkills([...skills, { skill: e.target.value }]);
            setInputValue('');
        }
    };

    // delete skill
    const handleDelete = (index: any) => {
        const updatedTags = [...skills];
        updatedTags.splice(index, 1);
        setSkills(updatedTags);
    };

    // add language
    const addLanguage = (e: any) => {
        setLanguages([...languages, { language: e.target.value }])
        e.target.value = ''
    }

    const removeLanguage = (index: any) => {
        const updatedLanguages = [...languages];
        updatedLanguages.splice(index, 1);
        setLanguages(updatedLanguages);
    };

    return (
        <>
            <div className='p-4'>
                <div className='flex flex-col md:flex-row gap-5 w-full'>

                    <div className='w-full'>
                        <div className='flex flex-col gap-2 w-full mb-4'>
                            <label className='text-sm text-gray16 font-medium mb-2'>Language</label>
                            <select className="input"
                                value={languages}
                                onChange={(e) => {
                                    addLanguage(e)
                                }}>
                                <option value='' disabled hidden >Select Language</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Spanish">Spanish</option>
                                <option value="German">German</option>
                                <option value="Italian">Italian</option>
                            </select>
                        </div>

                        <div className="flex flex-wrap">
                            <>
                                {languages && languages.map((tag: any, index: any) => (
                                    <div key={index} className="flex items-center justify-center bg-primary4 rounded-[4px] px-3 py-1 text-sm font-medium text-white mr-2 mb-2">
                                        <span className="mr-2">{tag?.language}</span>
                                        <button className="text-white" onClick={
                                            (e) => {
                                                removeLanguage(index)
                                            }
                                        }>
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </>

                        </div>

                        {languages.length > 0 && (
                            <div className="flex w-full">
                                {props.loading ? (
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Saving...
                                    </button>
                                ) : (
                                    <button type='button' className="filled-btn" onClick={addLanguageHandler}>
                                        Add Language
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </div>
                        )}

                    </div>

                    <div className='w-full'>
                        <div className='flex flex-col gap-2 w-full mb-4'>
                            <label className='text-sm text-gray16 font-medium mb-2'>Skills</label>
                            <input className="input"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Press enter to add tags"
                            />
                        </div>

                        <div className="flex flex-wrap">
                            <>
                                {skills && skills.map((tag: any, index: any) => (
                                    <div key={index} className="flex items-center justify-center bg-primary4 rounded-[4px] px-3 py-1 text-sm font-medium text-white mr-2 mb-2">
                                        <span className="mr-2">{tag.skill}</span>
                                        <button onClick={() => handleDelete(index)} className="text-white">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </>

                        </div>

                        {skills.length > 0 && (
                            <div className="flex w-full">
                                {addSkil && props.loading ? (
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Saving...
                                    </button>
                                ) : (

                                    <button type='button' className="filled-btn"
                                        onClick={(e: any) => {
                                            setAddSkill(true)
                                            addSkillHandler(e)
                                        }}>
                                        Add Skill
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </>
    )
}

export default LanguageSkill