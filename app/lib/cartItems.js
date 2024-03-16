import { NextResponse } from "next/server";

export async function deleteCartItem(id) {
  const response =  await fetch(`http://localhost:3000/api/cartItem?product_id=${id}`, {
    method: "DELETE",
    cache : "no-store",
    next : { revalidate : 0},
  })
    .then(async(res) => {
      const data = res.json()
      if(res.ok)
        return {error : false, data : { message : data.message}}
      else
        return {error : true, data : { message : data.errorMessage}}

    })
    .catch((error) => {
      console.error(error);
      return {error : true, data : { message : error}}
    });
  
    return response;
}

export async function updateCartItemQuantity(id, newQuantity) {
  const response = await fetch(`http://localhost:3000/api/cartItem?product_id=${id}`, {
    method: "PATCH",
    cache : "no-store",
    next : { revalidate : 0},
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuantity),
  })
    .then(async (res) => {
     const data = await res.json()
      if(res.ok)
        return {error : false, data : { message : data.message}}
      else
        return {error : true, data : { message : data.errormessage}}
    })
    .catch((error) => {
      console.error(error);
      return {error : true, data : { message : error}}
    });
    
    return response;
}

export async function addCartItem(id, quantity) {
  await fetch(`http://localhost:3000/api/cartItem?product_id=${id}`, {
    method: "POST",
    cache : "no-store",
    next : { revalidate : 0},
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quantity),
  })
    .then(async (res) => {
     const data = await res.json()
      if(res.ok)
        return {error : false, data : { message : data.message}}
      else
        return {error : true, data : { message : data.errormessage}}

    })
    .catch((error) => {
      console.error(error);
      return {error : true, data : { message : error}}
    });
  //context.setCartItems((prevCartItems) => [...prevCartItems, {id : id, quantity : count}])
}
