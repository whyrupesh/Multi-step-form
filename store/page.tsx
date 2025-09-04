// here I am createing Global state for product and steps of the form
// using zustand

import {create} from "zustand";

type ProductForm = {
    name : string;
    image : File | null;
    price : number;
    tax : number;
};

type FormStore = {
    step : number;
    product : ProductForm;
    setStep : (s:number) => void;
    updateProduct : (data: Partial<ProductForm>) => void;
    reset : ()=>void;
};

const useProductForm = create<FormStore>((set) => ({

    step : 1,
    product : {name : "", image: null, price:0, tax:0},
    setStep : (s:number) => set({step : s}),
    updateProduct: (data) => set((state) => ({
        product: { ...state.product, ...data }
    })),
    reset: () => set({
        step: 1,
        product: { name: "", image: null, price: 0, tax: 0 }
    })
}));

export default useProductForm;


