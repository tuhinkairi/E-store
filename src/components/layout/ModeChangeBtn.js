import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../Features/controlers/UiSlice';


export default function ModeChangeBtn() {
  const dispatch = useDispatch()
  const btn = useRef()
  const [isChecked, setIsChecked] = useState(false);


  
  const handleToggle = () => {
    setIsChecked(!isChecked);
    dispatch(toggleTheme())
  };
  return (
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
  )
}
