import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeTheme } from '../../Features/controlers/UiSlice';


export default function ModeChangeBtn() {
  const selectorTheme = useSelector((state)=>state.theme.theme)
  const dispatch = useDispatch()
  const btn = useRef()
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {  
    console.log(selectorTheme)
    const htmlElement = document.documentElement;
    if (isChecked) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isChecked,selectorTheme]);
  const handleToggle = () => {
    setIsChecked(!isChecked);
    dispatch(ChangeTheme())
  };
  return (
    // <span className=" inline-block group">
          <button title='theme chage'
            className="w-fit flex  py-1 items-center"
            onClick={handleToggle}
            >
            {isChecked?<span ref={btn} className="scale-125 inline-block material-symbols-outlined">
              light_mode
            </span>
            :<span ref={btn} className="scale-125 inline-block material-symbols-outlined">
              dark_mode
            </span>}
          </button>
        // </span>
  )
}
