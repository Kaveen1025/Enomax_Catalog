import {Root_URL, Root_URL2} from '../constant/APIURL';
import http from './httpService';


export function loginFunction(data: any) {
  const endPoint = `${Root_URL2}login.php`;
  // console.log(endPoint);
  return http.post(endPoint, data);
}

export function getProductList(data: any) {
  if (data) {
    const endPoint = `${Root_URL}getproductsbycategory.php`;
    // console.log(endPoint);
    return http.post(endPoint, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getProductCategoryList() {
  const endPoint = `${Root_URL}getallproductcategories.php`;
  // console.log(endPoint);
  return http.post(endPoint, '');
}

export function getAllProductList() {
  const endPoint = `${Root_URL}getallproductswithstock.php`;
  // console.log(endPoint);
  return http.post(endPoint, '');
}

export function getGroupCategoriesAccordingToMain(data: any) {
  if (data) {
    const endPoint = `${Root_URL}getallgroupproductcategories.php`;
    // console.log(endPoint);
    return http.post(endPoint, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getSubCategoriesAccordingToMain(data: any) {
  if (data) {
    const endPoint = `${Root_URL}getallsubproductcategories.php`;
    // console.log(endPoint);
    return http.post(endPoint, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getSizeCategoryList() {
  const endPoint = `${Root_URL}getsizecategories.php`;
  // console.log(endPoint);
  return http.post(endPoint, '');
}

export function getProductsAccoSizeAndCategory(data: any) {
  if (data) {
    const endPoint = `${Root_URL}getsimilarproducts.php`;
    // console.log(endPoint);
    return http.post(endPoint, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getSubProductsAccoProductGroup(data: any) {
  if (data) {
    const endPoint = `${Root_URL2}getsubproductsaccoproductgroup.php`;
    // console.log(endPoint);
    return http.post(endPoint, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getCatalog() {
  const endPoint = `${Root_URL2}getcatalog.php`;
  // console.log(endPoint);
  return http.post(endPoint, '');
}

export function getCatalogDetails(data: any) {
  if (data) {
    const endPoint = `${Root_URL2}getcatalogdetails.php`;
    // console.log(endPoint);
    return http.post(endPoint, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getAllCatalogImages() {
  const endPoint = `${Root_URL2}getallcatalogimages.php`;
  // console.log(endPoint);
  return http.post(endPoint, '');
}
