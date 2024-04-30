import axios from "axios";
import { GetServer } from "../LocalStorage/AppSettings";

// This function retrieves the URL of the server based on the server name stored in LocalStorage
async function getServerUrl(){
  const temp = await GetServer() // Call the GetServer function to get the server name from LocalStorage
  if (temp === "Server 1"){ // If the server name is "Server 1"
    return "https://anime-api-rest.vercel.app/" // Return the URL of Server 1
  } else if (temp === "Server 2"){ // If the server name is "Server 2"
    return  "https://anime-api-rest-sigma.vercel.app/" // Return the URL of Server 2
  }
}

// This function retrieves the popular anime data from the server
async function getPopularAnime(){
  const baseUrl = await getServerUrl() // Get the server URL using the getServerUrl function
  let config = { // Configure the axios request
    method: 'get',
    maxBodyLength: Infinity,
    url: baseUrl + "meta/anilist/popular",
    headers: { },
  };
  try {
    const response = await axios.request(config); // Send the axios request
    return response.data // Return the response data
  }
  catch (error) {
    throw error // If there is an error, throw it
  }
}

// This function retrieves the trending anime data from the server
async function getTrendingAnime(){
  const baseUrl = await getServerUrl() // Get the server URL using the getServerUrl function
  let config = { // Configure the axios request
    method: 'get',
    maxBodyLength: Infinity,
    url: baseUrl + "meta/anilist/trending",
    headers: { },
  };
  try {
    const response = await axios.request(config); // Send the axios request
    return response.data // Return the response data
  }
  catch (error) {
    throw error // If there is an error, throw it
  }
}

// This function retrieves the airing schedule anime data from the server
async function getAiringScheduleAnime(){
  const baseUrl = await getServerUrl() // Get the server URL using the getServerUrl function
  let config = { // Configure the axios request
    method: 'get',
    maxBodyLength: Infinity,
    url: baseUrl + "meta/anilist/airing-schedule",
    headers: { },
  };
  try {
    const response = await axios.request(config); // Send the axios request
    return response.data // Return the response data
  }
  catch (error) {
    throw error // If there is an error, throw it
  }
}

// This function retrieves the anime info data from the server based on the anime ID
async function getAnimeInfo(id){
  const baseUrl = await getServerUrl() // Get the server URL using the getServerUrl function
  let config = { // Configure the axios request
    method: 'get',
    maxBodyLength: Infinity,
    url: baseUrl + "meta/anilist/data/" + id,
    headers: { },
  };
  try {
    const response = await axios.request(config); // Send the axios request
    return response.data // Return the response data
 
