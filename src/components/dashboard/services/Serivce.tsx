/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Search2, Empty, PaginationNext, PaginationPrev, NoImage } from '../../../assets'
import { FaEllipsisH, FaTimes, } from 'react-icons/fa'
import { useSearchAndPagination } from '../../../services/paginationHook'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import UploadInput from '../upload/Upload'
import { formatAmount, formatDate, shortenText } from '../../../utils/functions'
import Loader from '../loader/Loader'

const Serivce = (props: any) => {

  const [displayType, setDisplayType] = React.useState('list')
  const [service_name, setServiceName] = React.useState('')
  const [category_id, setCategoryId] = React.useState('')
  const [years_of_exp, setYearsOfExp] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [phone_number, setPhoneNumber] = React.useState('')
  const [other_details, setOtherDetails] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [images, setImages] = React.useState([] as any)
  const [imagesToDisplay, setImagesToDisplay] = React.useState([] as any)
  const [category, setCategory] = React.useState('')
  const [serviceID, setServiceID] = React.useState('')
  const [formError, setFormError] = React.useState(false)

  const [singleSerrvice, setSingleSerrvice] = React.useState({} as any)
  const [singleCategory, setSingleCategory] = React.useState({} as any)
  const [createServices, setCreateServices] = React.useState(false)
  const [editService, setEditService] = React.useState(false)

  const clearForm = () => {
    setServiceName('')
    setCategoryId('')
    setYearsOfExp('')
    setAmount('')
    setLocation('')
    setPhoneNumber('')
    setOtherDetails('')
    setDescription('')
    setImages([])
    setCategory('')
    setServiceID('')
    setFormError(false)
    setImagesToDisplay([])
    setSingleSerrvice({})
    setSingleCategory({})
  }

  const checkAll = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = true
    })
  }
  const uncheckAll = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false
    })
  }

  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearchService, search } = useSearchAndPagination(props.allService, itemsPerPage);

  const handleItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  }

  let [dropdown, setDropdown] = React.useState(false)
  const handleDropdown = (id: any, service: any) => {
    if (dropdown === false) {
      setDropdown(id)
      setSingleSerrvice(service.service)
      setSingleCategory(service.category)
      setServiceID(service.service.serviceID)
      setImagesToDisplay(service.service.images)
    }
    else if (dropdown === id) {
      setDropdown(false)
      setSingleSerrvice({})
      setSingleCategory({})
      setServiceID('')
      setImagesToDisplay([])
    }
    else {
      setDropdown(id)
      setSingleSerrvice(service.service)
      setSingleCategory(service.category)
      setServiceID(service.service.serviceID)
      setImagesToDisplay(service.service.images)
    }
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
    setDropdown(false)
  }

  const [isOpen2, setIsOpen2] = React.useState(false)
  const toggleDrawer2 = () => {
    setIsOpen2((prevState) => !prevState)
    setDropdown(false)
  }

  const [isOpen3, setIsOpen3] = React.useState(false)
  const toggleDrawer3 = () => {
    setIsOpen3((prevState) => !prevState)
    setDropdown(false)
  }

  React.useEffect(() => {
    if (isOpen === false) {
      clearForm()
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen2 === false) {
      clearForm()
    }
  }, [isOpen2])

  React.useEffect(() => {
    if (isOpen3 === false) {
      clearForm()
    }
  }, [isOpen3])

  React.useEffect(() => {
    if (singleSerrvice && singleCategory) {
      setServiceName(singleSerrvice.serviceName || '')
      setCategoryId(singleCategory.categoryID || '')
      setYearsOfExp(singleSerrvice.yearsOfExperience || '')
      setAmount(singleSerrvice.pricing || '')
      setLocation(singleSerrvice.location || '')
      setPhoneNumber(singleSerrvice.phoneNumber || '')
      setOtherDetails(singleSerrvice.other_details || '')
      setDescription(singleSerrvice.description || '')
      setCategory(singleCategory?.name || '')
    }
  }, [singleSerrvice, singleCategory])

  const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsDesktop])

  React.useEffect(() => {
    if (props.successActivateServiceDeactivateService) {
      setDropdown(false)
    }
  }, [props.successActivateServiceDeactivateService])

  React.useEffect(() => {
    if (props.success && isOpen) {
      toggleDrawer()
      toggleDrawer3()
    }
    if (props.success && isOpen3) {
      toggleDrawer3()
    }
  }, [props.success, isOpen, isOpen3])

  //create service
  const scrollTo = React.useRef({} as any);
  const handleCreateService = async (e: any) => {
    e.preventDefault()
    if (service_name === '' || category_id === '' || years_of_exp === '' || amount === '' || location === '' || phone_number === '' || description === '') {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
    }
    else {
      setFormError(false)
      const data = {
        service_name,
        category_id,
        years_of_exp,
        amount,
        // state:location,
        location,
        phone_number,
        other_details,
        description,
      }
      await props.createService(data)
    }
  }

  // edit service
  const handleEditService = async (e: any) => {
    e.preventDefault()
    if (service_name === '' || category_id === '' || years_of_exp === '' || amount === '' || location === '' || phone_number === '' || description === '') {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
    }
    else {
      setFormError(false)
      const data = {
        service_name,
        category_id,
        years_of_exp,
        amount,
        // state:location,
        location,
        phone_number,
        other_details,
        description,
        serviceID
      }
      await props.updateService(data)
    }
  }

  // upload image
  const onFileChange = (files: any) => {
    setImages(files)
  }

  const handleUpload = async () => {
    const data = {
      image: images,
      serviceID: serviceID
    }
    await props.addServiceImages(data)
  }

  // remove image
  const handleRemoveImage = async (id: any) => {
    await props.removeServiceImage(id)
  }

  // deactivate service
  const handleDeactivateService = async (id: any) => {
    await props.deactivateService(id)
  }

  // activate service
  const handleActivateService = async (id: any) => {
    await props.activateService(id)
  }

  const tableHead = [
    'Serial No',
    'Name',
    'Category',
    'Price',
    'Location',
    'Status',
    'Date Posted',
    'Action',
  ]


  return (
    <>
      {props.loadingFetchServices ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1">
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center mb-5">
            <div className="flex items-center w-full">
              <div className="flex items-center relative w-full">
                <input type="text" className="w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search order"
                  value={search}
                  onChange={handleSearchService}
                />
                <div className="absolute top-2 left-3">
                  <Image src={Search2} alt="search" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 w-full">
              <button className="filled-btn md:w-40" onClick={
                () => {
                  toggleDrawer()
                  setCreateServices(true)
                  setEditService(false)
                }
              }>Create Service
                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
              </button>
            </div>
          </div>

          <div className="card mb-4">

            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-black align-middle border-b border-solid border-gray5 py-3 text-base font-medium whitespace-nowrap text-left">
                      <input type="checkbox" className="w-3 h-3"
                        onClick={
                          (e: any) => {
                            if (e.target.checked) {
                              checkAll()
                            } else {
                              uncheckAll()
                            }
                          }}
                      />
                    </th>
                    {tableHead.map((item: any, index: number) => (
                      <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left" key={index}>
                        {item}
                      </th>
                    ))}

                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 && currentItems.map((service: any, index: number) => (
                    <tr className={`hover:bg-gray10 ${index % 2 === 0 ? 'bg-gray10' : ''} `} key={index}>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        <input type="checkbox" className="w-3 h-3" />
                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {service.service.serial}
                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {shortenText(service.service.serviceName, 20)}
                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {service.category.name}
                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        ₦ {formatAmount(service.service.pricing)}
                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {service.service.location}
                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {service.service.isActive ? (
                          <span className="bg-green4 text-white px-4 py-1 rounded-md text-xs opacity-80">Active</span>
                        ) : (
                          <span className="bg-red text-white px-4 py-1 rounded-md text-xs opacity-80">Inactive</span>
                        )}

                      </td>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {formatDate(service.datePosted)}
                      </td>

                      <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                          handleDropdown(service.service.serviceID, service)
                        }} />

                        <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                          display: dropdown === service.service.serviceID ? 'block' : 'none'
                        }}>
                          <ul>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                onClick={toggleDrawer2}
                              >
                                View
                              </div>
                            </li>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                onClick={() => {
                                  toggleDrawer()
                                  setEditService(true)
                                  setCreateServices(false)
                                }}
                              >
                                Edit
                              </div>
                            </li>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                () => {
                                  toggleDrawer3()
                                }}
                              >
                                Upload Image
                              </div>
                            </li>

                            {service.service.isActive ? (
                              <>
                                {props.loadingActivateServiceDeactivateService ? (
                                  <li>
                                    <div className="px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white flex items-center gap-1">
                                      <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                      </svg>
                                      Deactivating...
                                    </div>
                                  </li>
                                ) : (
                                  <li>
                                    <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                      () => {
                                        handleDeactivateService(service.service.serviceID)
                                      }
                                    }>Deactivate</div>
                                  </li>
                                )}
                              </>
                            ) : (
                              <>
                                {props.loadingActivateServiceDeactivateService ? (
                                  <li>
                                    <div className="px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white flex items-center gap-1">
                                      <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                      </svg>
                                      Activating...
                                    </div>
                                  </li>
                                ) : (
                                  <li>
                                    <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                      () => {
                                        handleActivateService(service.service.serviceID)
                                      }
                                    }>Activate</div>
                                  </li>
                                )}
                              </>
                            )}

                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center' }}>
                        <Image src={Empty} alt="" width={100} height={100} />
                        <p className="text-gray-500">No service found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
          </div>


        </div>
      )}

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        className='bla bla bla'
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">

            {editService && (
              <h1 className="text-lg font-medium text-gray11">Edit Service</h1>
            )}

            {createServices && (
              <h1 className="text-lg font-medium text-gray11">Add Service</h1>
            )}

            <button className="text-gray11" onClick={toggleDrawer}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="px-6 py-5" ref={scrollTo}>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Service Name <span className="text-red">*</span></label>
              <input type="text" className="input"
                value={service_name || ''}
                onChange={(e) => setServiceName(e.target.value)}
              />
              {formError && !service_name && (<p className="text-red text-sm mt-1 font-light">Service name is required</p>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Service Category <span className="text-red">*</span></label>
              <select className="input"
                value={category_id || ''}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option disabled>Select Category</option>
                {props.servicesCategories && props.servicesCategories.map((category: any, index: number) => (
                  <option value={category.categoryID} key={index}>{category.name}</option>
                ))}
              </select>
              {formError && !category_id && (<p className="text-red text-sm mt-1 font-light">Service category is required</p>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Years of Experience <span className="text-red">*</span></label>
              <input type="number" className="input"
                value={years_of_exp || ''}
                onChange={(e) => setYearsOfExp(e.target.value)}
              />
              {formError && !years_of_exp && (<p className="text-red text-sm mt-1 font-light">Years of experience is required</p>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Amount per Service <span className="text-red">*</span></label>
              <input type="number" className="input"
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value)}
              />
              {formError && !amount && (<p className="text-red text-sm mt-1 font-light">Amount is required</p>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Location <span className="text-red">*</span></label>
              <input type="text" className="input"
                value={location || ''}
                onChange={(e) => setLocation(e.target.value)}
              />
              {formError && !location && (<p className="text-red text-sm mt-1 font-light">Location is required</p>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Phone Number <span className="text-red">*</span></label>
              <input type="number" className="input"
                value={phone_number || ''}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {formError && !phone_number && (<p className="text-red text-sm mt-1 font-light">Phone number is required</p>)}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Description <span className="text-red">*</span></label>
              <textarea className="input"
                rows={4} cols={50}
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              />
              {formError && !description && (<p className="text-red text-sm mt-1 font-light">Description is required</p>)}
            </div>

            {/* <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Other Details</label>
              <textarea className="input"
                rows={4} cols={50}
                value={other_details || ''}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
            </div> */}

            {editService ? (
              <div className="flex justify-start">
                {props.loading ? (
                  <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Submitting...
                  </button>
                ) : (
                  <button type='button' className="filled-btn" onClick={handleEditService}>
                    Edit Service
                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-start">
                {props.loading ? (
                  <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Submitting...
                  </button>
                ) : (
                  <button type='button' className="filled-btn" onClick={handleCreateService}>Add Service
                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                  </button>
                )}
              </div>
            )}

          </div>

        </>
      </Drawer>

      <Drawer
        open={isOpen2}
        onClose={toggleDrawer2}
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">
            <h1 className="text-lg font-medium text-gray11">Service Details</h1>
            <button className="text-gray11" onClick={toggleDrawer2}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* prduct image */}
          <div className="flex flex-col justify-center items-center p-6">
            {imagesToDisplay.length > 0 ? (
              <>
                {imagesToDisplay.map((image: any, index: number) => (
                  index === 0 && (
                    <Image src={image.image} alt="service" width={200} height={200} />
                  )
                ))}
              </>
            ) : (
              <Image src={NoImage} width={200} height={200} alt="no-image" />
            )}
            <h1 className="text-base font-medium text-gray11 mt-4">{service_name}</h1>
          </div>

          {/* product details */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Price</label>
                <p className="text-sm text-gray26 font-medium">₦{amount}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Category</label>
                <p className="text-sm text-gray26 font-medium">{category}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Years of Experience</label>
                <p className="text-sm text-gray26 font-medium">{years_of_exp}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Location</label>
                <p className="text-sm text-gray26 font-medium">{location}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Phone Number</label>
                <p className="text-sm text-gray26 font-medium">{phone_number}</p>
              </div>

            </div>
          </div>

          <hr className="border-gray15 border-1" />

          {/* product description */}
          <div className="p-6">
            <div className="flex flex-col mb-5">
              <label className="text-[13px] text-gray25 font-normal mb-4">Product Description</label>
              <p className="text-base text-gray26 font-medium">
                {description}
              </p>
            </div>
          </div>

        </>
      </Drawer>

      <Drawer
        open={isOpen3}
        onClose={toggleDrawer3}
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">

            <h1 className="text-lg font-medium text-gray11">Upload Image</h1>

            <button className="text-gray11" onClick={toggleDrawer3}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="px-6 py-5" ref={scrollTo}>

            <UploadInput onFileChange={onFileChange} success={props.success} />


            {props.loading ? (
              <button className="bg-primary text-white text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center gap-1" disabled>
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Uploading...
              </button>
            ) : (
              <button type='button' className="bg-primary text-white text-sm font-semibold py-2 px-4 rounded-md" onClick={() => { handleUpload() }}>Upload Image</button>
            )}

            {/* </form> */}
          </div>

          <hr className="border-gray15 border-1" />

          <div className="px-6 py-5">
            <div className="flex flex-col mb-5">
              <label className="text-xs text-gray25 font-normal mb-4">Image Preview</label>
              <div className="flex flex-wrap gap-2">
                {imagesToDisplay.map((image: any, index: any) => (
                  <div className="relative" key={index}>
                    <Image src={image.image} alt="" width={100} height={100} />
                    <button className="absolute top-0 right-0 text-white w-5 h-5 flex items-center justify-center"
                      onClick={
                        () => {
                          handleRemoveImage(image.imageID)
                        }}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </>
      </Drawer>
    </>
  )
}

export default Serivce