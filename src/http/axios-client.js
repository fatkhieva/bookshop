import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  timeout: 10000,
});

export const getGoogleApiBooks = (subject, startIndex) => {
  const params = {
    key: "AIzaSyCy4q4kjkWydQ3TQ5sbKN7nOuWOKXPRHy0",
    printType: "books",
    langRestrict: "en",
    maxResults: "6",
    q: `subject:${subject}`,
    startIndex: `${startIndex}`,
  }

  return axiosClient.get("/volumes", {params: params});
}
