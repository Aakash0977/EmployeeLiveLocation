import React from 'react'

const UserSidedetails = (userId) => {

    console.log(userId)

  return (
    <>
    <button type="button" id='fullScreenButton' className="btn btn-outline btn-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Tech details</button>
    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Tech History</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <p>{userId.user} hello</p>
      </div>
    </div>
    </>
  )
}

export default UserSidedetails