export const getProduct = (state ,id) => {
    id ? state.product = state.products.find((d)=>{return  d.id === id }) : {}
}

export  const  setProducts =  (state , arr) => {
    state.products = arr
}

export  const  setCategories =  (state , arr) => {
    state.categories = arr
}

export  const  setCount =  (state , count) => {
    state.count = count
}