import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
function UploadModal({
  toggle,
  setToggle,
  selectFile,
  setSelectedFile,
  UploadButton,
  loader,
  setLoader,
}) {
  function CloseImg() {
    setLoader(true);
    setSelectedFile(null);
    setToggle(!toggle);
    setLoader(false);
  }
  return (
    <>
      <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
        <ModalBody>
          <img
            src={selectFile}
            onClick={CloseImg}
            className="img-fluid"
            alt="Error!"
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={CloseImg}>
            {loader ? "Cancel..." : "Cancel"}
          </button>
          <button className="btn btn-primary" onClick={UploadButton}>
            {loader ? "Uploading..." : "Upload"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UploadModal;
