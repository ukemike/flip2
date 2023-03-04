import React from 'react'
import { shortenText, getPostedDate, formatDate } from '../../../utils/functions'
import { Empty, CloseDraw, Search2, PaginationNext, PaginationPrev,  } from '../../../assets'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchAndPagination } from '../../../services/paginationHook'
import Loader from '../loader/Loader'

const Job = (props: any) => {

  const [singleJob, setSingleJob] = useState({} as any)
  const [editJob, setEditJob] = useState(false)
  const [headline, setHeadline] = useState('')
  const [skills_needed, setSkillsNeeded] = useState([] as any)
  const [experience_level, setExperience_level] = useState('')
  const [job_duration, setJob_duration] = useState('')
  const [job_scope, setJob_scope] = useState('')
  const [budget, setBudget] = useState(0)
  const [is_budget_negotiable, setIs_budget_negotiable] = useState(0)
  const [description, setDescription] = useState('')
  const [jobID, setJobID] = useState('')
  const [formError, setFormError] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearchJob, search } = useSearchAndPagination(props.jobs, itemsPerPage);

  const handleItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  }

  const clearForm = () => {
    setHeadline('')
    setSkillsNeeded([])
    setExperience_level('')
    setJob_duration('')
    setJob_scope('')
    setBudget(0)
    setIs_budget_negotiable(0)
    setDescription('')
    setJobID('')
    setFormError(false)
    setInputValue('')
  }

  // drawer state
  const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsDesktop])

  // job details drawer
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  // create job drawer
  const [isOpen2, setIsOpen2] = React.useState(false)
  const toggleDrawer2 = () => {
    setIsOpen2((prevState) => !prevState)
  }

  React.useEffect(() => {
    if (isOpen2 === false) {
      clearForm()
    }
  }, [isOpen2])

  React.useEffect(() => {
    if (props.success && isOpen2) {
      toggleDrawer2()
    }
  }, [props.success, isOpen2])

  const scrollTo = React.useRef({} as any);

  // create job
  const createJobHandler = async (e: any) => {
    e.preventDefault()
    if (headline === '' || experience_level === '' || job_duration === '' || job_scope === '' || budget === 0 || description === '' || skills_needed.length === 0) {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    } else {
      setFormError(false)
      const data = {
        headline,
        experience_level,
        job_duration,
        job_scope,
        budget,
        is_budget_negotiable,
        description,
        skills_needed: JSON.stringify(skills_needed)
      }
      await props.createJob(data)
    }
  }

  // update job
  const updateJobHandler = async (e: any) => {
    e.preventDefault()
    if (headline === '' || experience_level === '' || job_duration === '' || job_scope === '' || budget === 0 || description === '') {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    } else {
      setFormError(false)
      const data = {
        headline,
        experience_level,
        job_duration,
        job_scope,
        budget,
        is_budget_negotiable,
        description,
        skills_needed: JSON.stringify(skills_needed),
        jobID
      }
      await props.updateJob(data)
    }
  }

  // deactivate job
  const handleDeactivateJob = (jobID: any) => {
    props.deactivateJob(jobID)
  }

  // activate job
  const handleActivateJob = (jobID: any) => {
    props.activateJob(jobID)
  }

  // add skills
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && inputValue !== '') {
      setSkillsNeeded([...skills_needed, { skill: inputValue }])
      setInputValue('');
    }
  };

  const handleDelete = (index: any) => {
    const updatedTags = [...skills_needed];
    updatedTags.splice(index, 1);
    setSkillsNeeded(updatedTags)
  };

  useEffect(() => {
    if (singleJob) {
      setHeadline(singleJob.headline || '')
      setSkillsNeeded(singleJob.skillsNeeded || [])
      setExperience_level(singleJob.experienceLevel || '')
      setJob_duration(singleJob.jobDuration || '')
      setJob_scope(singleJob.jobScope || '')
      setBudget(singleJob.budget || '')
      setIs_budget_negotiable(singleJob.isBudgetNegotiable || '')
      setDescription(singleJob.description || '')
      setJobID(singleJob.jobID)
    }
  }, [singleJob])

  return (
    <>
      {props.loadingFetchJobs ? (
        <Loader />
      ) : (
        <>

          <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mb-5 w-full">
            <div className="flex items-center w-full">
              <div className="flex items-center relative w-full">
                <input type="text" className="w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search gigs"
                  value={search}
                  onChange={handleSearchJob}
                />
                <div className="absolute top-2 left-3">
                  <Image src={Search2} alt="search" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 w-full">
              <button onClick={
                () => {
                  toggleDrawer2()
                  setSingleJob({})
                  setEditJob(false)
                }
              } className="filled-btn md:w-40">Create Gig

                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">

            {currentItems && currentItems.map((job: any, index: number) => (
              <div className="card hover:shadow-2xl transition duration-200 ease-in-out cursor-pointer p-6" onClick={
                () => {
                  toggleDrawer()
                  setSingleJob(job)
                }
              } key={index}>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h1 className="text-base font-semibold text-black-100">{shortenText(job.headline, 25)}</h1>
                    <span className="text-xs text-gray18 font-light ml-2">{getPostedDate(job.datePosted)}</span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Budget:</span>
                      <span className="text-sm font-semibold text-gray33">${job.budget}</span>
                    </div>

                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Duration:</span>
                      <span className="text-sm font-semibold text-gray33">{job.jobDuration}</span>
                    </div>
                  </div>

                  {job.skillsNeeded && job.skillsNeeded.length > 0 && (
                    <div className="flex flex-wrap mt-2">
                      {job.skillsNeeded.map((skill: any, index: number) => (
                        <span className="text-sm text-white px-3 py-1 font-semibold bg-primary4 rounded-[4px] mb-2 mr-2" key={index}>{skill.skill}</span>
                      ))}
                    </div>
                  )}


                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Experience:</span>
                      <span className="text-sm font-semibold text-gray33">{job.experienceLevel}</span>
                    </div>

                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Scope:</span>
                      <span className="text-sm font-semibold text-gray33">{job.jobScope}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Budget Negotiable:</span>
                      <span className="text-sm font-semibold text-gray33">
                        {job.isBudgetNegotiable === true ? 'Yes' : 'No'}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Active:</span>
                      <span className="text-sm font-semibold text-gray33">
                        {job.isActive === true ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  <div className="flex mt-2 break-all">
                    <span className="text-sm font-light text-gray33">
                      {shortenText(job.description, 90)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Date posted:</span>
                      <span className="text-sm font-semibold text-gray33">{formatDate(job.datePosted)}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>

          {currentItems && currentItems.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20">
               <Image src={Empty} alt="" width={100} height={100} />
              <p className="text-gray11 text-lg mt-5">No jobs found</p>
            </div>
          )}

          {currentItems.length > 0 && (
            <div className="flex justify-center items-center mt-4 md:justify-between">
              <div className="hidden md:flex items-center">
                <p className="text-sm text-gray35 mr-2">Show</p>
                <select className="rounded-md p-1.5 text-sm text-primary6 bg-gray8 focus:outline-none"
                  value={itemsPerPage}
                  onChange={handleItemsPerPage}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                </select>
                <p className="text-sm text-gray35 ml-2">entries</p>
              </div>

              <div className="flex items-center">
                <ul className="flex items-center justify-between p-0 m-0 list-none">

                  <li className={`mr-3 ${currentPage === pages[0] ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'}`} onClick={handlePrevBtn}>
                    <a className="text-blue">
                      <Image src={PaginationPrev} alt="" />
                    </a>
                  </li>


                  {pages.map((page: number, index: number) => (
                    <li key={index} className={`px-3 py-1.5 border border-gray35 rounded-[10px] text-sm  hover:bg-blue hover:border-blue hover:text-white transition duration-300 ease-in-out cursor-pointer mr-2 ${currentPage === page ? 'bg-blue border-blue text-white' : 'text-blue'}`}
                      onClick={() => paginate(page)}
                    >
                      <a className="">
                        {page}
                      </a>
                    </li>
                  ))}



                  <li className={`ml-3 ${currentPage === pages[pages.length - 1] ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'}`} onClick={handleNextBtn} >
                    <a className="text-blue">
                      <Image src={PaginationNext} alt="" />
                    </a>
                  </li>

                </ul>
              </div>

            </div>
          )}

        </>
      )}

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        size={400}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-4 py-5">

            <h1 className="text-lg font-semibold text-gray39">Gig Details</h1>

            <button className="text-gray11" onClick={toggleDrawer}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          <div className="px-4 py-5">
            <div className="flex flex-col">
              <div className="flex flex-col border border-gray28 rounded-xl">

                <div className="p-3">
                  <div className="flex mb-4 break-all">
                    <h1 className="text-xl font-semibold text-gray33 ">{singleJob.headline}</h1>
                  </div>


                  <div className="flex gap-2 mt-2">
                    <span className="text-sm font-light text-gray33 mr-1">{getPostedDate(singleJob.datePosted)}</span>
                  </div>


                </div>

                <hr className="border-gray28" />

                <div className="p-3">

                  <div className="flex gap-2 mt-2 break-all">
                    <span className="text-sm font-light text-gray33 mr-1">{singleJob.description}</span>
                  </div>

                </div>

                <hr className="border-gray28" />


                <div className="p-3">
                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Budget:</span>
                      <span className="text-sm font-semibold text-gray33">${singleJob.budget}</span>
                    </div>

                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Duration:</span>
                      <span className="text-sm font-semibold text-gray33">{singleJob.jobDuration}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray28" />

                <div className="p-3">
                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Experience:</span>
                      <span className="text-sm font-semibold text-gray33">{singleJob.experienceLevel}</span>
                    </div>

                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Scope:</span>
                      <span className="text-sm font-semibold text-gray33">{singleJob.jobScope}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray28" />

                <div className="p-3">
                  <div className="flex gap-2 mt-2">
                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Budget Negotiable:</span>
                      <span className="text-sm font-semibold text-gray33">
                        {singleJob.isBudgetNegotiable === true ? 'Yes' : 'No'}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-light text-gray33 mr-1">Active:</span>
                      <span className="text-sm font-semibold text-gray33">
                        {singleJob.isActive === true ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray28" />

                {/* skills */}
                {singleJob.skillsNeeded && singleJob.skillsNeeded.length > 0 && (
                  <div className="p-3">
                    <h1 className="text-base font-semibold text-gray33">Required Skills</h1>
                    <div className="flex flex-wrap mt-2">
                      {singleJob.skillsNeeded.map((skill: any, index: number) => (
                        <span className="text-sm text-white px-3 py-1 font-medium bg-primary4 rounded-[4px] mb-2 mr-2" key={index}>{skill.skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                <hr className="border-gray28" />

                {/* date posted */}
                <div className="p-3">
                  <div className="flex gap-2 mt-2">
                    <span className="text-sm font-light text-gray33 mr-1">Date posted:</span>
                    <span className="text-sm font-semibold text-gray33">
                      {formatDate(singleJob.datePosted)}
                    </span>
                  </div>
                </div>


                {/* activate and deactivate job button */}
                <div className="p-3">
                  <div className="flex justify-between items-center mt-2">
                    <>
                      {/* edit button */}
                      <button className="filled-btn w-32"
                        onClick={
                          () => {
                            toggleDrawer()
                            toggleDrawer2()
                            setEditJob(true)
                            setSingleJob(singleJob)
                          }
                        }
                      >
                        Edit Gig
                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                      </button>

                      {/* activate and deactivate button */}
                      {props.loading ? (
                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                          Processing...
                        </button>
                      ) : (
                        <button className={`w-32 filled-btn opacity-80 ${singleJob.isActive === true ? 'bg-red' : 'bg-primary'}`} onClick={
                          () => {
                            singleJob.isActive === true ? handleDeactivateJob(singleJob.jobID) : handleActivateJob(singleJob.jobID)
                          }
                        }>
                          {singleJob.isActive === true ? 'Deactivate' : 'Activate'}
                        </button>
                      )}


                    </>

                  </div>
                </div>


                <div className='flex justify-start p-3'>
                  <Link href={`/proposal/${singleJob.jobID}`}>
                    <a className="text-sm text-primary6 font-medium">View Proposals</a>
                  </Link>

                </div>


              </div>
            </div>


          </div>

        </>
      </Drawer>

      <Drawer
        open={isOpen2}
        onClose={toggleDrawer2}
        className='bla bla bla'
        size={400}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-4 py-5">
            {editJob ? (
              <h1 className="text-lg font-semibold text-gray39">Edit Gig</h1>
            ) : (
              <h1 className="text-lg font-semibold text-gray39">Create Gig</h1>
            )}

            <button className="text-gray11" onClick={toggleDrawer2}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          <div className="px-4 py-5" ref={scrollTo}>
            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Headline<span className="text-red">*</span></label>
              <input type="text" className="input"
                value={headline || ''}
                onChange={(e: any) => setHeadline(e.target.value)}
              />
              {formError && !headline && (<span className="text-red text-sm font-light">Gig name is required</span>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Experience Level<span className="text-red">*</span></label>
              <input type="text" className="input"
                value={experience_level || ''}
                onChange={(e: any) => setExperience_level(e.target.value)}
              />
              {formError && !experience_level && (<span className="text-red text-sm font-light">Experience level is required</span>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Gig Duration<span className="text-red">*</span></label>
              <select className="input"
                value={job_duration || ''}
                onChange={(e: any) => setJob_duration(e.target.value)}
              >
                <option value='' disabled hidden >Select Expected Duration</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="2-3 weeks">2-3 weeks</option>
                <option value="3-4 weeks">3-4 weeks</option>
                <option value="4-5 weeks">4-5 weeks</option>
                <option value="5-6 weeks">5-6 weeks</option>
              </select>
              {formError && !job_duration && (<span className="text-red text-sm font-light">Gig duration is required</span>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Gig Scope<span className="text-red">*</span></label>
              <select className="input"
                value={job_scope || ''}
                onChange={(e: any) => setJob_scope(e.target.value)}
              >
                <option disabled hidden >Select Gig Scope</option>
                <option value="Large">Large</option>
                <option value="Medium">Medium</option>
                <option value="Small">Small</option>
              </select>
              {formError && !job_scope && (<span className="text-red text-sm font-light">Gig scope is required</span>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Budget<span className="text-red">*</span></label>
              <input type="text" className="input"
                value={budget || ''}
                onChange={(e: any) => setBudget(e.target.value)}
              />
              {formError && !budget && (<span className="text-red text-sm font-light">Budget is required</span>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Is Budget Negotiable<span className="text-red">*</span></label>
              <select className="input"
                value={is_budget_negotiable || ''}
                onChange={(e: any) => setIs_budget_negotiable(e.target.value)}
              >
                <option value='' disabled hidden >Select Budget Negotiable</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              {formError && !is_budget_negotiable && (<span className="text-red text-sm font-light">Budget negotiable is required</span>)}
            </div>

            <div className="flex flex-col mt-4 mb-4 w-full">
              <label className="text-sm text-gray16 font-medium mb-2">Skills Needed</label>
              <input className="input w-full"
                type="text"
                value={inputValue || ''}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Press enter to add skills"
              />
              {formError && skills_needed.length === 0 && (<span className="text-red text-sm font-light">Skills needed is required</span>)}
            </div>

            <div className="flex flex-wrap">
              <>
                {skills_needed && skills_needed.map((tag: any, index: any) => (
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

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Description<span className="text-red">*</span></label>
              <textarea className="input"
                rows={4}
                cols={50}
                value={description || ''}
                onChange={(e: any) => setDescription(e.target.value)}
              />
              {formError && !description && (<span className="text-red text-sm font-light">Description is required</span>)}
            </div>



            {editJob ? (
              <div className="flex justify-start">
                {props.loading ? (
                  <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Processing...
                  </button>
                ) : (
                  <button type='button' className="filled-btn" onClick={updateJobHandler}>
                    Edit Gig
                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-start">
                {props.loading ? (
                  <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Processing...
                  </button>
                ) : (
                  <button type='button' className="filled-btn" onClick={createJobHandler}>
                    Add Gig
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

export default Job