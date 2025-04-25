// 'use client'
// import { useState } from "react"
// import { HandThumbUpIcon } from "@heroicons/react/24/solid"; // Icon khi Like
// import { HandThumbUpIcon as HandThumbUpOutline } from "@heroicons/react/24/outline"; // Icon khi chưa Like


// export default function Home(){
//     const [liked, setLiked] = useState(false);
//     const handleLike = () => {
//         setLiked(!liked); 
//     };




//     const [count, setCount] = useState(0) //Khai báo 1 State với giá trị khởi tạo là 0
//     const dec = ()=>{setCount(count - 1)};
//     const insert = ()=>{
//         console.log('insert: '+count);
//         // fetch('http://localhost:3000/login',{
//         //     method:'post',
//         //     headers:{
//         //         'content-type':  'application/json'
//         //     }

//         // })
//     }
//     const change = (e:any)=>{
//         setCount(Number(e.target.value))
//     }
//     return (
//         <div>
//             {/* <h1>State</h1>
//             <p>Count: {count}</p>
//             <input type="text" value={count} onChange={change} />
//             <button  onClick={()=>setCount(count + 1)}>Increment</button>
//             <button onClick={dec}>Decrement</button>
//             <button onClick={insert}> Thêm</button> */}

//             {/* Nút like */}
//             {/* <div className="p-4 text-center">
//             <h1 className="text-xl font-bold">Bài viết</h1> */}
//     {liked ? (count+1) : ((count+1)-1)}

// <button 
//     onClick={handleLike} 
//     className={`mt-4 px-4 py-2 rounded-lg text-lg font-semibold transition-all flex items-center justify-center w-15 h-12 border-2 
//       ${liked ? "bg-blue-500 text-white border-blue-500" 
//               : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"}`}
// >
//     {liked ? "👍" : "👍"}

//     {liked ? <HandThumbUpIcon className="w-6 h-6" /> : <HandThumbUpOutline className="w-6 h-6" />}

// </button>

//         </div>
//         // </div>
//     )
// }



'use client'
import { useState } from "react"
import { HandThumbUpIcon } from "@heroicons/react/24/solid"; // Icon khi Like
import { HandThumbUpIcon as HandThumbUpOutline } from "@heroicons/react/24/outline"; // Icon khi chưa Like

export default function Home() {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0); // Đếm số lượt like

    const handleLike = () => {
        if (liked) {
            setCount(count - 1);
        } else {
            setCount(count + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="flex flex-col items-center p-4">
            {/* Hiển thị số lượt like */}
            <h1 className="text-xl font-bold mb-2">Bài viết</h1>
            <p className="text-lg mb-2">Lượt thích: {count}</p>

            {/* Nút Like */}
            <button 
                onClick={handleLike} 
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all flex items-center gap-2 w-10 h-12 border-2 
                    ${liked ? "bg-blue-500 text-white border-blue-500" 
                            : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"}`}
            >
                {liked ? <HandThumbUpIcon className="w-10 h-6" /> : <HandThumbUpOutline className="w-10 h-6" />}
                {/* {liked ? "Đã thích" : "Thích"} */}
            </button>
        </div>
    )
}
