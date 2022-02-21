import React, { useState } from 'react';

import { Panel } from "../../components/commom_in";
import News from './News'
import { NewsDialog } from './NewsDialog'

const Dashboard = () => {
  const [newsModalOpen, setNewsModalOpen] = useState(false)

  const handleOpenNewsModal = () => {
    setNewsModalOpen(true)
  }

  const handleCloseNewsModal = () => {
    setNewsModalOpen(false)
  }

  return window.innerWidth < 768 ? (
    <>
      <NewsDialog
        open={newsModalOpen}
        onClose={handleCloseNewsModal}
      />
      <News
        onOpen={handleOpenNewsModal}
      />
    </>
  ) : (
    <Panel>
      <NewsDialog
        open={newsModalOpen}
        onClose={handleCloseNewsModal}
      />
      <News
        onOpen={handleOpenNewsModal}
      />
    </Panel>
  )
}
export default Dashboard