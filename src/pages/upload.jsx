import { useState } from "react";
import API from "../api/api";

export default function Upload(){
  const [file,setFile]=useState(null);

  const submit=async()=>{
    const form=new FormData();
    form.append("document",file);

    await API.post("/documents/upload",form);
    alert("Uploaded");
  };

  return(
    <div>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button onClick={submit}>Upload</button>
    </div>
  );
}
