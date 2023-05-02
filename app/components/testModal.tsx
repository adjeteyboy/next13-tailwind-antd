import { Button, Modal } from "antd";
import { useState } from "react";



const TestModal: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Open Modal
      </Button>

      <Modal title="Basic Modal" open={openModal} onCancel={() => setOpenModal(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default TestModal;