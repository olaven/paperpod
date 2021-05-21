import { logger } from "@paperpod/common";
import React , { useState, useEffect } from "react";

export const useUrl = () => {

    const [url, setUrl] = useState<string>(null); 
  
    useEffect(() => {
  
      chrome.tabs.query({
        active: true
      }, ([tab]) => {
          if (tab)
            setUrl(tab.url)
          else 
            logger.debug(`No active chrome tab`)
      }); 
    } , [])
  
    return url;
  }