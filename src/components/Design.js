import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
// import '../css/Design.css';
// import EditComponent from "./Settings";
import { useAuthDesign } from "../contexts/authDesign";
import '../Css/Design.css'

const Element = ({ element, index, designContext}) => {

    const { tag, attributes, children } = element;

    const classNames = attributes && attributes.className ? attributes.className : '';
    const style = attributes && attributes.style ? attributes.style : {};

    // const [isHovered, setIsHovered] = useState(false);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "widgets",
        drop: (item) => {
            console.log('parent component is -- ', index, ' -- ', element);
            designContext.addDesign(index,item.menuItem)
        },
        collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        }),
    }));

    // const handleDrag = (id) => {
    //     console.log(`Drag component with id: ${id}`);
    // };

    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    // };


    useEffect(()=>{},[]);

    let renderedElement;
    if (typeof tag === 'string') {
        renderedElement =
                React.createElement(
                        tag,
                        {
                            ...attributes,
                            classNames: classNames + " " +index,
                            style: {
                                ...style,
                                border: isOver ? '2px dashed black' : 'none',
                            },
                            ref: drop,
                        },
                        tag === "input" ? null : Object.keys(children).length > 0 && ( Object.keys(children).length > 2 ? RenderElements(children, element.id, designContext): <div> {children[0]}</div> ),
            ) 
    } else {
        renderedElement = <div>Invalid component: {tag}</div>;
    }

    // return (
    // <div
    // key={index + " "}
    // ref={drop}
    // style={{ border: isOver ? '2px dashed black' : 'none' }}
    // className={index + ""}
    // >
    // {renderedElement}
    // </div>
    // );

    return renderedElement;
};
  
const RenderElements = ({elements ,parentIndex = '',designContext}) => {
return  Object.keys(elements).map((element, index) => (
                <Element key={index} element={elements[element]} index={parentIndex+'-'+index} designContext={designContext} />
            ))
};  


function Design(){

    const designContext = useAuthDesign();

    const [{isOver},drop] = useDrop(()=>({
        accept : "widgets",
        drop : (item)=>addWidgetToBoard(item),
        collect : (monitor) => ({
            isOver : !!monitor.isOver(),
        }),
    }))

    const addWidgetToBoard = (item)=>{
        designContext.addDesign( '' ,item.menuItem);
    }
    return <div className="design-board" ref={drop}>
            {
                ( Object.keys(designContext.design.children).length > 0 ) ? <RenderElements elements={designContext.design.children} designContext={designContext} /> : 
                <></>
            }
    </div>
}

export default Design;
export { Element }; 


// 1.vertical order test correction  v
// 2.parentchild ordering