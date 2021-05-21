import React , { useState, useEffect } from "react";

export const useUrl = () => {

    const [url, setUrl] = useState<string>(null); 
  
    useEffect(() => {
  
      chrome.tabs.query({
        active: true
      }, ([tab]) => {
        setUrl(tab.url)
      }); 
    } , [])
  
    return url;
  }