'use client'

import CARD01 from "./CARD/Card01"
import CARD02 from "./CARD/Card02"
import CARD03 from "./CARD/Card03"

const SECTION2 = () => {
  return (
    <>
    <div className="h-max w-full max-w-sm px-10 mx-auto pb-5">
      <CARD01 />
      <CARD02 />
      <CARD03 />
      <CARD02 />
      <CARD03 />
      <CARD02 />
      <CARD03 />
    </div>
    </>
  )
}

export default SECTION2
