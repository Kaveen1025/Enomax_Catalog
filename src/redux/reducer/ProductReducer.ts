import {
  CLEAR_PRODUCTS,
  SET_CATALOG,
  SET_CATALOG_DETAILS,
  SET_CATALOG_IMAGES,
  SET_CATEGORY,
  SET_GROUP_CATEGORY,
  SET_PRODUCTS,
  SET_PRODUCTS_ACCO_SIZE_AND_CATEGORY,
  SET_SIZE_CATEGORY,
  SET_SUB_CATEGORY,
  SET_SUB_PRODUCTS_ACCO_PRODUCT_GROUP,
} from '../../constant/ReduxConstant';

const initialState = {
  productsData: [],
  productCategory: [],
  productSubCategory: [],
  productGroupCategory: [],
  productSizeCategory: [],
  productAccoSizeAndCategory: [],
  subProductAccoProductGroup: [],
  catalog: [],
  catalogDetails: [],
  catalogImages: [],
};

const ProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productsData: action.payload,
      };

    case SET_CATEGORY:
      return {
        ...state,
        productCategory: action.payload,
      };

    case SET_SIZE_CATEGORY:
      return {
        ...state,
        productSizeCategory: action.payload,
      };

    case SET_GROUP_CATEGORY:
      return {
        ...state,
        productGroupCategory: action.payload,
      };

    case SET_SUB_CATEGORY:
      return {
        ...state,
        productSubCategory: action.payload,
      };

    case SET_PRODUCTS_ACCO_SIZE_AND_CATEGORY:
      return {
        ...state,
        productAccoSizeAndCategory: action.payload,
      };

    case SET_SUB_PRODUCTS_ACCO_PRODUCT_GROUP:
      return {
        ...state,
        subProductAccoProductGroup: action.payload,
      };

    case CLEAR_PRODUCTS:
      return {
        ...state,
        productsData: [],
      };

    case SET_CATALOG:
      return {
        ...state,
        catalog: action.payload,
      };

    case SET_CATALOG_DETAILS:
      return {
        ...state,
        catalogDetails: action.payload,
      };

    case SET_CATALOG_IMAGES:
      return {
        ...state,
        catalogImages: action.payload,
      };

    default:
      return state;
  }
};

export default ProductReducer;
