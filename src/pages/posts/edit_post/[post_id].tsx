import { useRouter } from 'next/router'
import React from 'react'

const EditPost: React.FC = () => {
  const router = useRouter()
  const { post_id } = router.query

  return <>Edit post with id: {post_id}</>
}

export default EditPost
