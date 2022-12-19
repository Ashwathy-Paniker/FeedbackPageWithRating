import axios from 'axios'
import { MAIN_URL } from './Url'
export function addReview(formData){
    console.log(formData);
    return axios.post(`${MAIN_URL}addreview`,formData);
}
export function getReview() {
    return axios.get(`${MAIN_URL}getreview`);
 }
 export function deleteReview(id) {
    console.log(id._id);
    return axios.get(`${MAIN_URL}deletereview/${id._id}`);
 }
 export function getCount() {
    return axios.get(`${MAIN_URL}getcount`);
 }
 export function getAvg() {
    return axios.get(`${MAIN_URL}getavg`);
 }