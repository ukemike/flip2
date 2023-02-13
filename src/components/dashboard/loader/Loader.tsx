import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0195FF",
};

const Loader = (props: any) => {
  return (
    <>
      <div className='fixed top-0 left-0 z-[99999] flex items-center justify-center w-full h-full bg-black-100 bg-opacity-50 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out'>
        <div className="text-center">
          <SyncLoader
            color={'#0195FF'}
            loading={true}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="text-center">
            <p className="text-lg font-medium text-white mt-[10px]">Loading...</p>
          </div>
        </div>

      </div>

    </>
  )
}

export default Loader