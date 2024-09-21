import React from 'react'
import { useDispatch } from "react-redux";
import { ChangeTheme } from "../../Features/controlers/UiSlice";

export default function ModeChangeBtn() {
  const dispatch = useDispatch()
  const ThemeHandler=(e)=> {
    e.preventDefault()
    dispatch(ChangeTheme())
  }
  return (
    // <span className=" inline-block group">
          <button title='theme chage'
            className="w-fit flex  py-1 items-center"
            onClick={ThemeHandler}
            >
            <span className="_mode scale-125 inline-block material-symbols-outlined">
              dark_mode
            </span>
          </button>
        // </span>
  )
}
