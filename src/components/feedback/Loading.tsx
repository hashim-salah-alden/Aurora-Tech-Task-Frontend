/* eslint-disable @typescript-eslint/no-explicit-any */
import SkeletonS from './Skeleton';


const LoadingHandler = ({ loading, error, page, children }: { loading: string, error: any, page: string, children: any }) => {

  if (loading === "pending") {
    return (
      <>
        <SkeletonS />
        <SkeletonS />
        <SkeletonS />
        <SkeletonS />
      </>
    )
  }

  if (error) {
    return (
      <p>Error: {error}</p>
    )
  }

  if (children.length === 0) {
    return (
      <p>No {page} yet</p>
    )
  }

  return <div>{children}</div>
}

export default LoadingHandler