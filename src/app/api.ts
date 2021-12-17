import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ICategory, ICategoryTreeItem } from "../types/categories";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/create-category.dto";
import { IProduct, IProductPopulated } from "~/types/products";
import { ILook, IPopulatedLook } from "~/types/looks";
import { IOrder } from "~/types/orders";
import { logOut } from "~/auth/state/authSlice";

export interface ICategoryProductsResponse{
    products: IProduct[]
    count: number
    minPrice?: number
    maxPrice?: number
    category: ICategory
}

const API_URI = process.env.REACT_APP_API_URI

const baseQuery = fetchBaseQuery({ baseUrl: API_URI, credentials: 'include' })

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if(result.error && result.error.status === 401){
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if(refreshResult.data){
      result = await baseQuery(args, api, extraOptions)
    } else {
      // api.dispatch(logOut())
      return Promise.reject(result.error)
    }  
  }
  return result
}

export const Api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories', 'Products', 'Looks', 'Orders'],
  endpoints: (builder) => ({
    //categories
    getCategoriesTree: builder.query<ICategoryTreeItem[], void>({
      query: () => `/categories/tree`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Categories' as const, id: _id })), 'Categories']
          : ['Categories'],
    }),
    getCategory: builder.query<ICategory, string>({
      query: (id) => `/categories/${id}/details`,
      providesTags: (result, err, id) => [{type: 'Categories', id}],
    }),
    addCategory: builder.mutation<ICategory, CreateCategoryDto>({
      query: data => ({
        url: '/categories',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Categories']
    }),
    updateCategory: builder.mutation<ICategory, UpdateCategoryDto>({
      query: ({id, ...data}) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Categories', 'Products']
    }),
    deleteCategory: builder.mutation<ICategory, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories', 'Products']
    }),
    unlinkProducts: builder.mutation<{sucess: boolean}, {categoryId: string, productIds: string[]}>({
      query: ({categoryId, productIds}) => ({
        url: `/categories/${categoryId}/unlinkProducts`,
        method: 'PATCH',
        body: {products: productIds}
      }),
      invalidatesTags: ['Categories', 'Products']
    }),
    linkProducts: builder.mutation<{sucess: boolean}, {categoryId: string, productIds: string[]}>({
      query: ({categoryId, productIds}) => ({
        url: `/categories/${categoryId}/linkProducts`,
        method: 'PATCH',
        body: {products: productIds}
      }),
      invalidatesTags: ['Categories', 'Products']
    }),
    selectBestseller: builder.mutation<{sucess: boolean}, {categoryId: string, productId: string}>({
      query: ({categoryId, productId}) => ({
        url: `/categories/${categoryId}/bestseller`,
        method: 'PATCH',
        body: {product: productId}
      }),
      invalidatesTags: ['Categories']
    }),
    getCategoryProducts: builder.query<IProduct[], string>({
      query: (id) => `/categories/${id}/products`,
      providesTags: ['Categories']
    }),
    getCategorySubProducts: builder.query<ICategoryProductsResponse, {categoryName: string, groupName: string}>({
      query: ({categoryName, groupName}) => `/products/category/${categoryName}/${groupName}`,
      providesTags: ['Products']
    }),

    //products
    getProducts: builder.query<IProduct[], void | string>({
      query: (filter) => filter ? `/products/all?filter=${filter}` : '/products/all',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Products' as const, id:_id })), 'Products']
          : ['Products'],
    }),
    getProduct: builder.query<IProductPopulated, string>({
      query: (id) => `/products/all/${id}`,
      providesTags: (res, err, id) => [{type: 'Products', id}],
    }),
    getRelatedProducts: builder.query<IProduct[], string>({
      query: (id) => `/products/${id}/related-products`,
      providesTags: (res, err, id) => [{type: 'Products', id}],
    }),
    deleteProduct: builder.mutation<IProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (res, err, id) => [{type: 'Products', id}, 'Categories']
    }),
    enableProducts: builder.mutation<IProduct[], {products: string[]}>({
      query: (data) => ({
        url: `/products/enable`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (res, err, {products}) => products.map(prod => ({type: 'Products', id: prod}))
    }),
    disableProducts: builder.mutation<IProduct[], {products: string[]}>({
      query: (data) => ({
        url: `/products/disable`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (res, err, {products}) => products.map(prod => ({type: 'Products', id: prod}))
    }),
    deleteProducts: builder.mutation<IProduct[], {products: string[]}>({
      query: (data) => ({
        url: `/products/delete-many`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Products', 'Categories']
    }),
    addProduct: builder.mutation<IProductPopulated, FormData>({
      query: (data) => ({
        url: `/products`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products', 'Categories']
    }),
    updateProduct: builder.mutation<IProductPopulated, {data: FormData, id: string}>({
      query: ({id, data}) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Products', 'Categories']
    }),
    addRelatedProducts: builder.mutation<IProduct[], {id: string, products: string[]}>({
      query: ({id, products}) => ({
        url: `/products/${id}/add-related-products`,
        method: 'PATCH',
        body: {products}
      }),
      invalidatesTags: (res, err, {products, id}) => [...products, id].map(prod => ({type: 'Products', id: prod}))
    }),
    removeRelatedProducts: builder.mutation<IProduct[], {id: string, products: string[]}>({
      query: ({id, products}) => ({
        url: `/products/${id}/remove-related-products`,
        method: 'PATCH',
        body: {products}
      }),
      invalidatesTags: (res, err, {products, id}) => [...products, id].map(prod => ({type: 'Products', id: prod}))
    }),

    //looks
    getLooks: builder.query<IPopulatedLook[], void | string>({
      query: (filter) => filter ? `/looks/all?filter=${filter}` : '/looks/all',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Looks' as const, id:_id })), 'Looks']
          : ['Looks'],
    }),
    getLook: builder.query<ILook, string>({
      query: (id) => `/looks/all/${id}`,
      providesTags: (res, err, id) => [{type: 'Looks', id}],
    }),
    addLook: builder.mutation<ILook, FormData>({
      query: (data) => ({
        url: `/looks`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Looks']
    }),
    deleteLook: builder.mutation<ILook, string>({
      query: (id) => ({
        url: `/looks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (res, err, id) => [{type: 'Looks', id}]
    }),
    updateLook: builder.mutation<ILook, {data: FormData, id: string}>({
      query: ({id, data}) => ({
        url: `/looks/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Looks']
    }),
    deleteLooks: builder.mutation<ILook[], {looks: string[]}>({
      query: (data) => ({
        url: `/looks/delete-many`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Looks']
    }),
    enableLooks: builder.mutation<ILook[], {looks: string[]}>({
      query: (data) => ({
        url: `/looks/enable`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (res, err, {looks}) => looks.map(look => ({type: 'Looks', id: look}))
    }),
    disableLooks: builder.mutation<ILook[], {looks: string[]}>({
      query: (data) => ({
        url: `/looks/disable`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (res, err, {looks}) => looks.map(look => ({type: 'Looks', id: look}))
    }),

    //orders
    getOrders: builder.query<IOrder[], void>({
      query: () => `/orders`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Orders' as const, id: _id })), 'Orders']
          : ['Orders'],
    }),

    updateOrderStatus: builder.mutation<IOrder, {id: string, status: string}>({
      query: ({id, ...data}) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Orders']
    }),
  }),
})

export const {
  useGetCategoriesTreeQuery, 
  useAddCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation, 
  useLinkProductsMutation, 
  useUnlinkProductsMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useDeleteProductsMutation,
  useEnableProductsMutation,
  useDisableProductsMutation,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetCategoryProductsQuery,
  useGetLookQuery,
  useUpdateLookMutation,
  useAddLookMutation,
  useGetLooksQuery,
  useDeleteLookMutation,
  useDeleteLooksMutation,
  useEnableLooksMutation,
  useDisableLooksMutation,
  useAddRelatedProductsMutation,
  useRemoveRelatedProductsMutation,
  useGetRelatedProductsQuery,
  useGetOrdersQuery,
  useSelectBestsellerMutation,
  useGetCategoryQuery,
  useLazyGetCategoryQuery,
  useGetCategorySubProductsQuery,
  useUpdateOrderStatusMutation
} = Api