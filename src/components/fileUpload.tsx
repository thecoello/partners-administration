import React from "react";

export default class FileUpload extends React.Component{

  constructor(props:any){
    super(props)
  }

  render(): React.ReactNode {
    return(
      <>
      <div className="h-100 d-flex flex-column">

  <label  className="form-label">Upload</label>
  <input className="form-control form-control-lg" id="formFileLg" type="file" />
  </div>

      </>
    )
  }

}