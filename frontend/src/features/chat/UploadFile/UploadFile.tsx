import React, { useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useAppDispatch } from "../../../store";
import { changeAvatar } from "../../auth/authSlice";
import "./UploadFile.css";

export default function UploadFile(): JSX.Element {
  const filePicker = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", event.target.files![0]);

    const res = await fetch("/api/upload/avatar", {
      method: "POST",
      body: formData,
    });
    const imageUrl = await res.json();
    dispatch(changeAvatar(imageUrl));
  };

  const handlePick = (): void => {
    filePicker.current!.click();
  };

  return (
    <>
      {/* <button className="inputBTNS" type="button" onClick={handlePick}> </button> */}
      <button type="button" onClick={handlePick} style={{border:'none', backgroundColor:"#e0e0e0"}}>
        {" "}
        <AddAPhotoIcon sx={{ ml: "10px" }} />
      </button>
      <input
        className="hidenInput"
        type="file"
        onChange={handleChange}
        ref={filePicker}
        accept="image/*.png,.jpg"
      />
    </>
  );
}
