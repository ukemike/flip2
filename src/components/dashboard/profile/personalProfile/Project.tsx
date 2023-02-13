import React from 'react'
import Image from 'next/image'
import { Project1, Empty, CloseDraw } from '../../../../assets'
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { shortenText, shortenUrl } from '../../../../utils/functions'

const Project = (props: any) => {

    // personal merchant state
    const [projects, setProjects] = useState([] as any)

    // project state
    const [project_name, setProjectName] = useState('')
    const [link, setLink] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [editProject, setEditProject] = useState(false)
    const [singleProject, setSingleProject] = useState({} as any)
    const [projectID, setProjectID] = useState('')
    const [formError, setFormError] = useState(false)

    const clearProjectState = () => {
        setProjectName('')
        setLink('')
        setProjectDescription('')
        setEditProject(false)
        setSingleProject({})
        setProjectID('')
        setFormError(false)
    }


    useEffect(() => {
        if (singleProject) {
            setProjectName(singleProject.projectName || '')
            setLink(singleProject.link || '')
            setProjectDescription(singleProject.description || '')
            setProjectID(singleProject.projectID || '')
        }
    }, [singleProject])

    useEffect(() => {
        if (props.userDetails) {
            setProjects(props.userDetails?.profile?.merchantInfo?.projects || [])
        }
    }, [props.userDetails])

    // drawer state
    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsDesktop])


    // project drawer
    const [isOpen3, setIsOpen3] = React.useState(false)
    const toggleDrawer3 = () => {
        setIsOpen3((prevState) => !prevState)
    }

    useEffect(() => {
        if (props.success && isOpen3) {
            toggleDrawer3()
        }
    }, [props.success, isOpen3])

    useEffect(() => {
        if (isOpen3 === false) {
            clearProjectState()
        }
    }, [isOpen3])


    // add project
    const addProjectHandler = async (e: any) => {
        e.preventDefault()
        if(!project_name || !link || !projectDescription) {
            setFormError(true)
            return
        }
        const data = {
            project_name,
            link,
            description: projectDescription
        }
        await props.addMerchantProjects(data)
    }

    // update project
    const updateProjectHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            project_name,
            link,
            description: projectDescription,
            projectID
        }
        await props.editMerchantProjects(data)
    }

    // delete project
    const deleteProjectHandler = async (projectID: any) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await props.removeMerchantProjects(projectID)
        }
    }


    return (
        <>
            <div className='p-4'>
                <div className="flex justify-end mb-3">
                    <button type='button' className="filled-btn flex items-center justify-center gap-2 md:w-52" onClick={toggleDrawer3}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Project
                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {projects && projects.map((item: any, index: number) => (
                        <div className="card border border-gray27 shadow-sm p-4 hover:shadow-2xl transition duration-200 ease-in-out" key={index}>
                            <div className="flex gap-3">
                                <div className="w-20 h-20 flex items-center">
                                    <Image src={Project1} alt='education' />
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-lg font-medium text-primary6 mb-1">{shortenText(item.projectName, 16)}</p>
                                    <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-primary5 font-medium mb-1 underline">{shortenUrl(item.link)}</a>
                                </div>

                                <div className="flex flex-col gap-2 ml-auto">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-primary4 cursor-pointer">
                                        <FaEdit className="text-primary4"
                                            onClick={() => {
                                                toggleDrawer3()
                                                setSingleProject(item)
                                                setEditProject(true)
                                            }}
                                        />
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-red cursor-pointer">
                                        <FaTrash className="text-red"
                                            onClick={
                                                () => {
                                                    deleteProjectHandler(item.projectID)
                                                }
                                            }
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
                {projects.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src={Empty} alt='empty state'
                            width={100}
                            height={100}
                        />
                        <p className="text-lg font-medium text-gray11">No Projects Added</p>
                    </div>
                )}
            </div>




            <Drawer
                open={isOpen3}
                onClose={toggleDrawer3}
                size={400}
                direction={isDesktop ? 'right' : 'bottom'}
                style={{
                    overflow: 'scroll',
                    maxHeight: '100vh'
                }}
            >
                <>
                    <div className="flex justify-between items-center border-b-2 border-gray px-4 py-5">

                        {editProject ? (
                            <h1 className="text-lg font-medium text-gray39">Edit Project</h1>

                        ) : (
                            <h1 className="text-lg font-medium text-gray39">Add Project</h1>
                        )}

                        <button className="text-gray11" onClick={toggleDrawer3}>
                            <Image src={CloseDraw} alt='close' />
                        </button>
                    </div>

                    <div className="px-4 py-5">

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Project Name</label>
                            <input type="text" className="input"
                                value={project_name}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                            {formError && !project_name && ( <p className="text-red text-xs font-light mt-1">Project name is required</p> )}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Link</label>
                            <input type="text" className="input"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                            {formError && !link && ( <p className="text-red text-xs font-light mt-1">Link is required</p> )}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Description</label>
                            <textarea className="input"
                                rows={4}
                                cols={50}
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                            {formError && !projectDescription && ( <p className="text-red text-xs font-light mt-1">Description is required</p> )}
                        </div>

                        {editProject ? (
                            <div className="flex w-full">
                                {props.loading ? (
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Updating...
                                    </button>
                                ) : (
                                    <button type='button' className="filled-btn" onClick={updateProjectHandler}>
                                        Update Project
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex w-full">
                                {props.loading ? (
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Adding...
                                    </button>
                                ) : (
                                    <button type='button' className="filled-btn" onClick={addProjectHandler}>
                                        Add Project
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </div>
                        )}


                    </div>
                </>


            </Drawer>
        </>
    )
}

export default Project