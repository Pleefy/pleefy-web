'use client';
import * as React from "react"
export function Switch({ checked, onChange }: { checked: boolean; onChange: (v:boolean)=>void }){
  return (
    <button onClick={()=>onChange(!checked)} className={"inline-flex h-6 w-11 items-center rounded-full "+(checked?"bg-primary":"bg-muted")}>
      <span className={"h-5 w-5 bg-white rounded-full transition ml-1 "+(checked?"translate-x-5":"")}></span>
    </button>
  )
}
