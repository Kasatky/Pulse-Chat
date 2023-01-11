import React, { useRef } from "react";
import './UploadFile.css'

export default function UploadFile(): JSX.Element {
	const filePicker = useRef<HTMLInputElement | null>(null)
	// const [selectedFile, setSelectedFile] = useState<any>()

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		console.log(event.target.files);
		// setSelectedFile(event.target.files![0])
		// if (!selectedFile) {
		// 	alert("Файл не выбран")
		// }
		const formData = new FormData()
		formData.append('file', event.target.files![0])
		const res = await fetch('/api/uploadFile', {
			method: 'POST',
			body: formData
		})
		const data = await res.json()
		console.log(data);

	}

	const handlePick = (): void => {
		filePicker.current!.click()
	}


	return (
		<>
			<button className="inputBTNS" type="button" onClick={handlePick}> </button>
			{/* <button type="button" onClick={handlePick}>📎</button> */}
			<input
				className="hidenInput"
				type="file"
				onChange={handleChange}
				ref={filePicker}
				accept="image/*.png,.jpg" />

			{/* {selectedFile && (
				<p>Name: {selectedFile.name} Size: {selectedFile.size}</p>)}
			{uploaded && (
				<img src={uploaded.filePath} alt="" width="100px" />
			)} */}
		</>
	)
}