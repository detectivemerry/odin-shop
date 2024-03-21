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
       <div className = {clsx("flex flex-col p-2 text-center rounded-lg shadow-md", {
                'bg-red-300 text-white' : message.type === 'error',
                'text-black bg-white ' : message.type == 'message'
       })}>
        <div className = "flex flex-row">
            <div>
                {/** message.type **/}
            </div>
            <div className = "ml-auto pr-3">
                <button className = "" onClick = {handleClearNotification}>
                    x
                </button>
            </div>
        </div>
        <div>
            {message.content}</div> 
        </div> 
        : <></>
    }
    </>
  )
}
