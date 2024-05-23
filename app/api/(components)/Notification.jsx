import React from 'react'
import clsx from 'clsx';

export default function Notification({ message, setMessage }) {

    function handleClearNotification(e) {
        e.preventDefault();
        setMessage({ type: '', content: '' });
    }
    let content = ""

    if (message.content)
        content = message.content.match(/.*?[?!.]/g)

    return (
        <>
            {
                message.type != "" ?
                    <div className={clsx("flex flex-col pb-2 text-center rounded-lg shadow-md", {
                        'bg-rose-50 text-rose-500': message.type === 'error',
                        'text-black bg-white ': message.type == 'message'
                    })}>
                        <div className="flex flex-row bg-emerald-300 p-1 rounded-t-lg text-black">
                            <div className="flex flex-col flex-grow text-center">
                                {message.type}
                            </div>
                            <div className="pr-3">
                                <div className="">
                                    <button className="font-bold" onClick={handleClearNotification}>
                                        x
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-1">
                            {message.content && (content === null ? message.content :
                                content.map((msg) =>
                                    <p>{msg}</p>
                                )
                            )}
                        </div>
                    </div>
                    : <></>
            }
        </>
    )
}
