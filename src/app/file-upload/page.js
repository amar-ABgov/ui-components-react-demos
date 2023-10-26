"use client";
import { FILE_SERVICE_URL, FileUploader } from "@/service/file-upload";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import uuid4 from "uuid4";
import fileDownload from "js-file-download";
import dynamic from 'next/dynamic';


const LoginStatus = dynamic(() => import("../components/login-status"), { ssr: false });

const GoACircularProgress = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoACircularProgress),
  {
    ssr: false,
  }
);
const GoAFileUploadCard = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoAFileUploadCard),
  {
    ssr: false,
  }
);
const GoAFileUploadInput = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoAFileUploadInput),
  {
    ssr: false,
  }
);
const GoAIconButton = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoAIconButton),
  {
    ssr: false,
  }
);
const GoATable = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoATable),
  {
    ssr: false,
  }
);

const FileUpload = () => {
  const { data: session } = useSession();
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [progressList, setProgressList] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [loading, setLoading] = useState(false);

  async function uploadFile(file) {
    const uploader = new FileUploader(session.access_token);
    file.recordId = uuid4(); //generate a recordId to track files within the application
    setUploads((old) => [...old, { file, uploader }]);
    uploader.onabort = () => console.log("Aborting upload");
    uploader.onfail = (err) => console.log("Upload failed: ", err);
    uploader.oncomplete = () => {
      console.log("File upload complete");
      setFetchTrigger((old) => old + 1);
    };
    uploader.onprogress = (percent) => {
      setProgressList((old) => ({ ...old, [file.recordId]: percent }));
    };
    await uploader.upload(file);
  }
  function deleteFile(upload) {}

  function cancelUpload(upload) {
    upload.uploader.abort();
  }

  async function downloadFile(id, name) {
    if (session) {
      const response = await axios.request({
        url: `${FILE_SERVICE_URL}/${id}/download`,
        method: "get",
        headers: { Authorization: `Bearer ${session.access_token}` },
        responseType: "blob",
      });
      console.log(id, name);
      fileDownload(response.data, name);
    }
  }

  useEffect(() => {
    async function fetchAllFiles() {
      if (session) {
        setLoading(true);
        const response = await axios.request({
          url: FILE_SERVICE_URL,
          method: "get",
          params: {
            top: 30,
            criteria: JSON.stringify({ typeEquals: "ds-user-docs" }),
          },
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        setFiles(response.data.results);
        setLoading(false);
      }
    }

    fetchAllFiles();
  }, [session?.access_token, fetchTrigger]);
  return (
    <>
      <LoginStatus></LoginStatus>
      {!!files.length && !loading &&(
        <>
          <h3>Available Files</h3>
          <GoATable mb="2xl">
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Id</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.filename}</td>
                  <td>{file.id}</td>
                  <td>
                    <GoAIconButton
                      icon="download"
                      onClick={() => downloadFile(file.id, file.filename)}
                    ></GoAIconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </GoATable>
        </>
      )}
      {loading && (
        <GoACircularProgress message="Loading..." visible={true} />
      )}

      <GoAFileUploadInput onSelectFile={uploadFile} />
      {uploads.map((upload) => (
        <GoAFileUploadCard
          key={upload.file.name}
          filename={upload.file.name}
          type={upload.file.type}
          size={upload.file.size}
          progress={progressList[upload.file.recordId]}
          onDelete={() => deleteFile(upload)}
          onCancel={() => cancelUpload(upload)}
        />
      ))}
    </>
  );
}

const FileUploadComponent = dynamic(() => Promise.resolve(FileUpload), {
  ssr: false,
})

export default FileUploadComponent;
