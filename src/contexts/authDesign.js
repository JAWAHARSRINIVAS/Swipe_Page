import React, { createContext, useContext, useState } from 'react'

const DesignContext = createContext(null);

export const DesignProvider = ({children}) => {
    const [design, setDesign] = useState({
      children: {},
    });
    const [selectedItem, setSelectedItem] = useState({});

    const addDesign = async (index = '', element) => {
       console.log('---', index);
        const indices = index.split('-').map((str) => parseInt(str, 10));
      
        let currentNode = design;
        console.log(' indices ', indices);
        console.log(' design ', design);

        for (let i = 0; i < indices.length-1; i++) {
          const currentIndex = indices[i];
          console.log('current Index ++ ', currentIndex);
          if(isNaN(currentIndex)) continue;
          if (!currentNode.children[currentIndex]) {
            currentNode.children[currentIndex] = {};
          }
          currentNode = currentNode.children[currentIndex];
        }
        console.log(' current node  -- ', currentNode);
        const lastIndex = (indices.length > 0) ? Object.keys(currentNode.children).length : index;
        element.id = lastIndex.toString();
        console.log('lastindex ', lastIndex);
        currentNode.children[lastIndex] = element;
        
        console.log(' final ', currentNode);
        await setDesign({...currentNode});

      }
    
    const delDesign = (index) => {
        const indices = index.split('-').map((str) => parseInt(str, 10));
      
        let currentNode = design;
        for (let i = 0; i < indices.length - 1; i++) {
          const currentIndex = indices[i];
          if (!currentNode[currentIndex]) {
            return ;
          }
          currentNode = currentNode[currentIndex];
        }
      
        const lastIndex = indices[indices.length - 1];
        if (currentNode.hasOwnProperty(lastIndex)) {
          delete currentNode[lastIndex];
        }
      
        setDesign({...currentNode});
      }
    
    const editDesign = (index, attributeName, value) => {
        const indices = index.split('-').map((str) => parseInt(str, 10));

        let currentNode = design;
        for(let i = 0; i < indices.length ; i++ ){
            const currentIndex = indices[i];
            if (currentNode[currentIndex]) {
                currentNode = currentNode[currentIndex];
              }
            else  return "wrong index";
        }

        currentNode[attributeName] = value;

        setDesign({...currentNode});
    }

    return <DesignContext.Provider value={{design, selectedItem, addDesign, delDesign, editDesign}} >
      {children}
    </DesignContext.Provider>
}

export const useAuthDesign = () => {
  return useContext(DesignContext);
}