'use client'

export default function error({error, reset}) {
    console.log(error)
  return (
    <div>
        <div>에러남222</div>
        <button onClick={()=>{reset()}}>새로고침</button>
    </div>
  )
}
