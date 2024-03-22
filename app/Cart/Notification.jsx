import React from 'react'
import clsx from 'clsx';

export default function Notification({message, setMessage}) {
    //<div className = "flex flex-row mx-3">
        //<div className = "flex-[2_1_0%] border-2 border-teal-700 p-1">
            //Product
        //</div>
        //<div className = "flex-[3_1_0%] border-2 border-l-0 border-teal-700 p-1">
            //Title
        //</div>
        //<div className = " flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
           //Quantity 
        //</div>
        //<div className = "flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
            //Unit price
        //</div>
        //<div className = "flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
            //Total
        //</div>
        //<div className = "flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
            //Delete item
        //</div>

    //</div>
    function handleClearNotification(e){
        e.preventDefault();
        setMessage({type : '', content: ''});
    }

  return (
    <>
    {
        message.type != "" ? 
       <div className = {clsx("flex flex-col pb-2 text-center rounded-lg shadow-md", {
                'bg-red-300 text-white' : message.type === 'error',
                'text-black bg-white ' : message.type == 'message'
       })}>
        <div className = "flex flex-row bg-emerald-300 p-1 rounded-t-lg">
            <div className = "flex flex-col flex-grow text-center">
                {message.type}
            </div>
            <div className = "pr-3">
                <div className = "">
                <button className = "font-bold" onClick = {handleClearNotification}>
                    x
                </button>
                </div>
            </div>
        </div>
        <div className = "p-1">
            {message.content}</div> 
        </div> 
        : <></>
    }
    </>
  )
}
