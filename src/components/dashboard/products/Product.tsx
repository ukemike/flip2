/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Empty, PaginationNext, PaginationPrev, Search2, CloseDraw, NoImage } from '../../../assets'
import { FaEllipsisH, FaTimes } from 'react-icons/fa'
import { useSearchAndPagination } from '../../../services/paginationHook'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import UploadInput from '../upload/Upload'
import { shortenText, formatAmount } from '../../../utils/functions'
import Loader from '../loader/Loader'

const Product = (props: any) => {

  const scrollTo = React.useRef({} as any);

  const [displayType, setDisplayType] = React.useState('list')
  const [singleProduct, setSingleProduct] = React.useState({} as any)
  const [singleCategory, setSingleCategory] = React.useState({} as any)
  const [editProduct, setEditProduct] = React.useState(false)
  const [createProducts, setCreateProducts] = React.useState(false)
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [category_id, setCategory_id] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [free_delivery, setFree_delivery] = React.useState('')
  const [shipping_fee, setShipping_fee] = React.useState('')
  const [discount_available, setDiscount_available] = React.useState('')
  const [discount_percentage, setDiscount_percentage] = React.useState('')
  const [brand, setBrand] = React.useState('')
  const [product_warranty, setProduct_warranty] = React.useState('')
  const [weight, setWeight] = React.useState('')
  const [productID, setProductID] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [images, setImages] = React.useState([] as any)
  const [formError, setFormError] = React.useState(false)
  const [specifications, setSpecifications] = React.useState([] as any)
  const [features, setFeatures] = React.useState([] as any)
  const [imagesToDisplay, setImagesToDisplay] = React.useState([] as any)
  const [inputValue, setInputValue] = React.useState('');
  const [specTitle, setSpecTitle] = React.useState('' as any);
  const [specDescription, setSpecDescription] = React.useState('' as any);
  let [dropdown, setDropdown] = React.useState(false)

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
  const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearch, search } = useSearchAndPagination(props.allProducts, itemsPerPage);

  const handleItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  }

  const handleDropdown = (id: any, product: any) => {
    if (dropdown === false) {
      setDropdown(id)
      setSingleProduct(product.product)
      setSingleCategory(product.category)
      setProductID(product.product.productID)
      setSpecifications(product.product.specifications)
      setImagesToDisplay(product.product.images)
    }
    else if (dropdown === id) {
      setDropdown(false)
      setSingleProduct({} as any)
      setSingleCategory({} as any)
      setProductID('')
      setSpecifications([])
      setImagesToDisplay([])
    }
    else {
      setDropdown(id)
      setSingleProduct(product.product)
      setSingleCategory(product.category)
      setProductID(product.product.productID)
      setSpecifications(product.product.specifications)
      setImagesToDisplay(product.product.images)
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

  const [isOpen4, setIsOpen4] = React.useState(false)
  const toggleDrawer4 = () => {
    setIsOpen4((prevState) => !prevState)
    setDropdown(false)
  }

  const [isOpen5, setIsOpen5] = React.useState(false)
  const toggleDrawer5 = () => {
    setIsOpen5((prevState) => !prevState)
    setDropdown(false)
  }

  const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsDesktop])

  const clearForm = () => {
    setName('')
    setPrice('')
    setDescription('')
    setCategory_id('')
    setQuantity('')
    setFree_delivery('')
    setShipping_fee('')
    setDiscount_available('')
    setDiscount_percentage('')
    setBrand('')
    setProduct_warranty('')
    setWeight('')
    setProductID('')
    setFormError(false)
    setSingleProduct({})
    setSingleCategory({})
    setCategory('')
    setImages([])
    setSpecifications([])
    setFeatures([])
    setSpecTitle('')
    setSpecDescription('')
    setInputValue('')
    setImagesToDisplay([])
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
    if (isOpen4 === false) {
      clearForm()
    }
  }, [isOpen4])

  React.useEffect(() => {
    if (isOpen5 === false) {
      clearForm()
    }
  }, [isOpen5])

  React.useEffect(() => {
    if (singleProduct && singleCategory) {
      setName(singleProduct?.name || '')
      setPrice(singleProduct?.price || '')
      setDescription(singleProduct?.description || '')
      setQuantity(singleProduct?.quantity || '')
      setFree_delivery(singleProduct?.delivery?.freeDelivery || '')
      setShipping_fee(singleProduct?.delivery?.shippingFee)
      setDiscount_available(singleProduct?.discount?.isDiscountAvailable || '')
      setDiscount_percentage(singleProduct?.discount?.discountPercentage)
      setBrand(singleProduct?.brand || '')
      setProduct_warranty(singleProduct?.productWarranty || '')
      setWeight(singleProduct?.weight || '')
      setProductID(singleProduct?.productID)
      setCategory_id(singleCategory?.categoryID)
      setCategory(singleCategory?.name || '')
      setFeatures(singleProduct?.features || [])
    }
  }, [singleProduct, singleCategory])

  React.useEffect(() => {
    if (props.successActivateProductDeactivateProduct) {
      setDropdown(false)
    }
  }, [props.successActivateProductDeactivateProduct])

  React.useEffect(() => {
    if (props.success && isOpen) {
      toggleDrawer()
    }
    if (props.success && isOpen3) {
      toggleDrawer3()
    }
    if (props.success && isOpen4) {
      toggleDrawer4()
    }
    if (props.success && isOpen5) {
      toggleDrawer5()
    }
  }, [props.success, isOpen, isOpen3, isOpen4, isOpen5])

  // create product
  const handleCreateProduct = async (e: any) => {
    e.preventDefault()
    if (name === '' || price === '' || description === '' || category_id === '' || quantity === '' || product_warranty === '' ) {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    }
    if (free_delivery === 'No' && shipping_fee === '') {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    }
    if (discount_available === 'Yes' && discount_percentage === undefined) {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    } else {
      setFormError(false)
      const data = {
        name,
        price,
        description,
        category_id,
        quantity,
        free_delivery,
        shipping_fee,
        discount_available,
        discount_percentage,
        brand,
        product_warranty,
        weight
      }
      await props.createProduct(data)
    }
  }

  // edit product
  const handleEditProduct = (e: any) => {
    e.preventDefault()
    if (name === '' || price === '' || description === '' || category_id === '' || quantity === '') {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    }
    if (free_delivery === 'No' && shipping_fee === undefined) {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    }
    if (discount_available === 'Yes' && discount_percentage === undefined) {
      setFormError(true)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      return
    } else {
      setFormError(false)
      const data = {
        name,
        price,
        description,
        category_id,
        quantity,
        free_delivery,
        discount_available,
        brand,
        product_warranty,
        weight,
        productID,
        shipping_fee: free_delivery === 'Yes' ? undefined : shipping_fee,
        discount_percentage: discount_available === 'No' ? undefined : discount_percentage

      }
      props.updateProduct(data)
    }
  }

  // deactivate product
  const handleDeactivateProduct = async (id: number) => {
    await props.deactivateProduct(id)
  }

  // activate product
  const handleActivateProduct = async (id: number) => {
    await props.activateProduct(id)
  }

  // upload image
  const onFileChange = (files: any) => {
    setImages(files)
  }

  const handleUpload = async () => {
    const data = {
      image: images,
      productID: productID
    }
    await props.addProductImages(data)
  }

  // remove image
  const handleRemoveImage = async (id: any) => {
    await props.removeProductImage(id)
  }

  // add product features
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && inputValue !== '') {
      setFeatures([...features, { featureName: e.target.value }])
      setInputValue('');
    }
  };

  const handleDelete = (index: any) => {
    const updatedTags = [...features];
    updatedTags.splice(index, 1);
    setFeatures(updatedTags)
  };

  const handleAddFeature = async () => {
    const data = {
      productID,
      feature: features.map((feat: any) => feat.featureName)
    }
    await props.addProductFeatures(data)
  }


  // add product specifications
  const handleAddSpec = (e: any) => {
    e.preventDefault()
    if (specTitle === '' || specDescription === '') {
      setFormError(true)
      return
    }
    const spec = {
      title: specTitle,
      value: specDescription
    }
    setSpecifications([...specifications, spec])
    setSpecTitle('')
    setSpecDescription('')
  }

  const handleDeleteSpec = (index: any) => {
    const updatedSpecs = [...specifications];
    updatedSpecs.splice(index, 1);
    setSpecifications(updatedSpecs);
  }

  const handleAddSpecification = async () => {
    const data = {
      productID,
      spec: specifications
    }
    await props.addProductSpecifications(data)
  }

  const handleRemoveSpecification = async (id: any) => {
    const data = {
      productID: id
    }
    await props.removeProductSpecification(data)
  }

  const tableHead = [
    'Serial No.',
    'Name',
    'Brand',
    'Category',
    'Price',
    'Quantity',
    'Status',
    'Action',
  ] as any

  return (
    <>
      {props.loadingFetchProducts ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1">

          <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center mb-5">
            <div className="flex items-center w-full">
              <div className="flex items-center relative w-full">
                <input type="text" className="w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search products"
                  value={search}
                  onChange={handleSearch}
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
                  setCreateProducts(true)
                  setEditProduct(false)
                }
              }>
                Create Product
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

                  {currentItems.length > 0 && currentItems.map((product: any, index: number) => (
                    <tr className={`hover:bg-gray10 ${index % 2 === 0 ? 'bg-gray10' : ''} `} key={index}>
                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        <input type="checkbox" className="w-3 h-3" />
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {product.product.serial}
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {shortenText(product.product.name, 20)}
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {product.product.brand}
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {product.category.name}
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        ₦ {formatAmount(product.product.price)}
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                        {product.product.quantity}
                      </td>

                      <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">

                        {product.product.isActive === true && (
                          <span className="text-xs text-white bg-green4 px-4 py-1 rounded-md opacity-80">{
                            product.product.isActive === true ? "Active" : "Inactive"
                          }</span>
                        )}

                        {product.product.isActive === false && (
                          <span className="text-xs text-white bg-red px-4 py-1 rounded-md opacity-80">{
                            product.product.isActive === true ? "Active" : "Inactive"
                          }</span>
                        )}
                      </td>

                      <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                          handleDropdown(product.product.productID, product)
                        }} />

                        <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                          display: dropdown === product.product.productID ? 'block' : 'none'
                        }}>
                          <ul>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={toggleDrawer2}>
                                View
                              </div>
                            </li>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                () => {
                                  toggleDrawer()
                                  setEditProduct(true)
                                  setCreateProducts(false)
                                }}
                              >Edit</div>
                            </li>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                () => {
                                  toggleDrawer4()
                                }}
                              >
                                Add Features
                              </div>
                            </li>

                            <li>
                              <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                () => {
                                  toggleDrawer5()
                                }}
                              >
                                Add Specifications
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

                            {product.product.isActive ? (
                              <>
                                {props.loadingActivateProductDeactivateProduct ? (
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
                                    <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={() => { handleDeactivateProduct(product.product.productID) }}>Deactivate</div>
                                  </li>
                                )}
                              </>
                            ) : (
                              <>
                                {props.loadingActivateProductDeactivateProduct ? (
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
                                    <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={() => { handleActivateProduct(product.product.productID) }}>Activate</div>
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
                        <p className="text-gray11 font-medium text-sm">No product found</p>
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
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">
            {editProduct && (
              <h1 className="text-lg font-medium text-gray39">Edit Product</h1>
            )}

            {createProducts && (
              <h1 className="text-lg font-medium text-gray39">Add Product</h1>
            )}

            <button className="text-gray11" onClick={toggleDrawer}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          <div className="px-6 py-5" ref={scrollTo}>
            {/* <form> */}

            <>
              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Product Name <span className="text-red">*</span></label>
                <input type="text" className="input"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
                {formError && !name && (<p className="text-red text-sm mt-1 font-light">Product name is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Product Price <span className="text-red">*</span></label>
                <input type="number" className="input"
                  value={price || ''}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {formError && !price && (<p className="text-red text-sm mt-1 font-light">Product price is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Product Description <span className="text-red">*</span></label>
                <textarea className="input"
                  rows={4} cols={50}
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {formError && !description && (<p className="text-red text-sm mt-1 font-light">Product description is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Product Category <span className="text-red">*</span></label>
                <select className="input"
                  value={category_id || ''}
                  onChange={(e) => setCategory_id(e.target.value)}
                >
                  <option disabled>Select Category</option>
                  {props.productsCategory && props.productsCategory.map((category: any, index: number) => (
                    <option value={category.categoryID} key={index}>{category.name}</option>
                  ))}
                </select>
                {formError && !category_id && (<p className="text-red text-sm mt-1 font-light">Product category is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Product Quantity <span className="text-red">*</span></label>
                <input type="number" className="input"
                  value={quantity || ''}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {formError && !quantity && (<p className="text-red text-sm mt-1 font-light">Product quantity is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Free Delivery</label>
                <select className="input"
                  value={free_delivery || ''}
                  onChange={(e) => setFree_delivery(e.target.value)}
                >
                  <option value="">Select Free Delivery Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {free_delivery === 'No' && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm text-gray16 font-medium mb-2">Shipping Fee <span className="text-red">*</span></label>
                  <input type="number" className="input"
                    value={shipping_fee || ''}
                    onChange={(e) => setShipping_fee(e.target.value)}
                  />
                  {formError && !shipping_fee && (<p className="text-red text-sm mt-1 font-light">Shipping fee is required</p>)}
                </div>
              )}

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Discount Available</label>
                <select className="input"
                  value={discount_available || ''}
                  onChange={(e) => setDiscount_available(e.target.value)}
                >
                  <option value="">Select Discount Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {discount_available === 'Yes' && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm text-gray16 font-medium mb-2">Discount Percentage <span className="text-red">*</span></label>
                  <input type="number" className="input"
                    value={discount_percentage || ''}
                    onChange={(e) => setDiscount_percentage(e.target.value)}
                  />
                  {formError && !discount_percentage && (<p className="text-red text-sm mt-1 font-light">Discount percentage is required</p>)}
                </div>
              )}

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Brand <span className="text-red">*</span></label>
                <input type="text" className="input"
                  value={brand || ''}
                  onChange={(e) => setBrand(e.target.value)}
                />
                {formError && !brand && (<p className="text-red text-sm mt-1 font-light">Brand is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Product Warranty <span className="text-red">*</span></label>
                <input type="text" className="input"
                  value={product_warranty || ''}
                  onChange={(e) => setProduct_warranty(e.target.value)}
                />
                {formError && !product_warranty && (<p className="text-red text-sm mt-1 font-light">Product warranty is required</p>)}
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm text-gray16 font-medium mb-2">Weight</label>
                <input type="number" className="input"
                  value={weight || ''}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {editProduct ? (
                <div className="flex justify-start">
                  {props.loading ? (
                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Submitting...
                    </button>
                  ) : (
                    <button type='button' className="filled-btn" onClick={handleEditProduct}>Edit Product
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
                    <button type='button' className="filled-btn" onClick={handleCreateProduct}>
                      Add Product
                      <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                    </button>
                  )}
                </div>
              )}

            </>

            {/* </form> */}
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
            <h1 className="text-lg font-medium text-gray39">Product Details</h1>
            <button className="text-gray11" onClick={toggleDrawer2}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          {/* prduct image */}
          <div className="flex flex-col justify-center items-center p-6">
            {imagesToDisplay.length > 0 ? (
              <>
                {imagesToDisplay.map((image: any, index: number) => (
                  index === 0 && (
                    <Image src={image.image} alt="product"
                      width={200}
                      height={200}
                    />
                  )
                ))}
              </>
            ) : (
              <Image src={NoImage} alt="no-image" width={200} height={200} />
            )}
            <h1 className="text-base font-medium text-gray11 text-center mt-4">{name}</h1>
          </div>

          {/* product details */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Price</label>
                <p className="text-sm text-gray26 font-medium">₦{formatAmount(price)}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Category</label>
                <p className="text-sm text-gray26 font-medium">{category}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Quantity</label>
                <p className="text-sm text-gray26 font-medium">{quantity}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Free Delivery</label>
                <p className="text-sm text-gray26 font-medium">{free_delivery}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Shipping Fee</label>
                {free_delivery === 'Yes' ? (
                  <p className="text-sm text-gray26 font-medium">Free</p>
                ) : (
                  <p className="text-sm text-gray26 font-medium">₦{formatAmount(shipping_fee)}</p>
                )}
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Discount Available</label>
                <p className="text-sm text-gray26 font-medium">{discount_available}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Discount Percentage</label>
                <p className="text-sm text-gray26 font-medium">{discount_percentage}%</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Brand</label>
                <p className="text-sm text-gray26 font-medium">{brand}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Product Warranty</label>
                <p className="text-sm text-gray26 font-medium">{product_warranty} Year</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Weight</label>
                <p className="text-sm text-gray26 font-medium">{weight}kg</p>
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

            <h1 className="text-lg font-medium text-gray39">Upload Image</h1>

            <button className="text-gray11" onClick={toggleDrawer3}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          <div className="px-6 py-5" ref={scrollTo}>

            <UploadInput onFileChange={onFileChange} success={props.success} />


            {props.loading ? (
              <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Uploading...
              </button>
            ) : (
              <button type='button' className="filled-btn" onClick={() => { handleUpload() }}>Upload Image
                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
              </button>
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
                    <button className="absolute top-0 right-0 text-white w-5 h-5 flex items-center justify-center bg-gray22 rounded-full hover:bg-red transition duration-200 ease-in-out"
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

      <Drawer
        open={isOpen4}
        onClose={toggleDrawer4}
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">

            <h1 className="text-lg font-medium text-gray39">Add Product Features</h1>

            <button className="text-gray11" onClick={toggleDrawer4}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          {/* Features  */}
          <div className="flex flex-col flex-wrap  px-6 py-5">

            <div className="flex flex-col mt-4 mb-4 w-full">
              <label className="text-sm text-gray16 font-medium mb-2">Features</label>
              <input className="input w-full"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Press enter to add tags"
              />
            </div>

            <div className="flex flex-wrap">
              <>
                {features && features.map((feature: any, index: any) => (
                  <div key={index} className="flex items-center justify-center bg-primary4 rounded-[4px] px-3 py-1 text-sm font-light text-white mr-2 mb-2">
                    <span className="mr-2">{feature.featureName}</span>
                    <button onClick={() => handleDelete(index)} className="text-white">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </>

            </div>

            <div className="flex justify-start mt-4">
              {props.loading ? (
                <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Submitting...
                </button>
              ) : (
                <button className="filled-btn" onClick={handleAddFeature}>
                  Save
                  <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                </button>
              )}
            </div>

          </div>


        </>
      </Drawer>

      <Drawer
        open={isOpen5}
        onClose={toggleDrawer5}
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">

            <h1 className="text-lg font-medium text-gray39">Add Product Specifications</h1>

            <button className="text-gray11" onClick={toggleDrawer5}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          {/* Specifications */}
          <div className="px-6 py-5">
            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Title<span className="text-red">*</span></label>
              <input type="text" className="input"
                placeholder="Enter title"
                value={specTitle || ''}
                onChange={(e) => setSpecTitle(e.target.value)}
              />
              {formError && specTitle === '' && <p className="text-red text-sm font-light">Title is required</p>}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray16 font-medium mb-2">Product Description <span className="text-red">*</span></label>
              <textarea className="input"
                rows={4} cols={50}
                placeholder="Enter description"
                value={specDescription || ''}
                onChange={(e) => setSpecDescription(e.target.value)}
              />
              {formError && specDescription === '' && <p className="text-red text-sm font-light">Description is required</p>}
            </div>


            <div className="flex flex-col mt-4">

              <ul className="flex flex-col">
                {specifications && specifications.map((spec: any, index: any) => (
                  <li className="flex justify-between items-center bg-gray8 rounded-md p-2 mb-2" key={index}>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray11 font-medium mb-[2px]">{spec.title}</p>
                      <p className="text-sm text-gray11">{spec.value}</p>
                    </div>
                    {spec.id && (
                      <button className="text-gray11"
                        onClick={() => handleRemoveSpecification(spec.id)}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    {!spec.id && (
                      <button className="text-gray11"
                        onClick={() => handleDeleteSpec(index)}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>

            </div>

            <div className="flex justify-between mt-4">
              <button className="filled-btn w-32 bg-primary4" onClick={handleAddSpec}>
                Add
                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
              </button>
              <div>
                {props.loading ? (
                  <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Uploading...
                  </button>
                ) : (
                  <button className="filled-btn w-32" onClick={handleAddSpecification}>
                    Save
                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                  </button>
                )}
              </div>
            </div>
            <br />

          </div>

        </>
      </Drawer>
    </>
  )
}

export default Product