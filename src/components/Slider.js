import React from "react";
import { useDrag } from "react-dnd";
import '../Css/Sidebar.css';

function Widget({menuItem}){

	const [{isDragging} , drag] = useDrag(()=>({
		type : "widgets",
		item : {menuItem},
		collect : (monitor)=>({
			isDragging: !!monitor.isDragging(),
		})
	}));
	return (
		<div className="singleWidget" ref={drag} style={{ boxShadow: isDragging ? "rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;" : ""  }} >
			<span id={menuItem.id} class={menuItem.icon}>{menuItem.content}</span>
			<p>{menuItem.name}</p>
		</div>
	);
}

function SideBar(){

	const sidebarData = [
		{
			id : "1",
			"name" : "Text",
			"icon" : "material-symbols-outlined",
			"content" : "title",
			tag: 'p',
			attributes: {
				className: 'text-muted',
				style:{}
			},
			children: {0:'This is a paragraph', }
		},
		{
			id : "2",
			"name" : "button" ,
			"icon" : "material-symbols-outlined",
			"content": "crop_7_5",
			tag: 'button',
			attributes: {
				className: 'button',
				style:{}
			},
			children: {0: 'Click .'}
		},
		{
			id : "3",
			"name" : "container",
			"icon" : "material-symbols-outlined",
			"content":"crop_free",
			tag: 'div',
			attributes: {
				className: 'container',
				style: {
				backgroundColor: 'lightblue',
				padding: '100px'
				}
			},
			children:{}
		},
		
		{
			id:"5",
			"name" : "Italic",
			"icon" : "material-symbols-outlined",
			"content" : "format_italic",
			tag: 'i',
			attributes: {
				className: 'font-italic',
				style:{}
			},
			children: {0: 'Hello, World!'}
		},
		{
			id:"4",
			"name" : "input",
			"icon" : "material-symbols-outlined",
			"content" : "text_fields",
			tag: 'input',
			type: 'text',
			placeholder: 'Enter your username',
			attributes: {
				className: 'font-italic',
				style:{}
			},
			children:{}
		},
	];
	

    return (
        <div className="sidebar" >
            <div className="navbar" >
                <div className="navvbar-heading" >  GUVI </div>
            </div>
            <div className="SidebarItems" >
                <div className="widgets" >
                    <div className="menuName" >Widgets</div>
                    <div className="widgetGrid" >
                        {
                            sidebarData.map( (menuItem) => {
                                return ( <Widget menuItem={menuItem} /> );
                                
                            } )
                        }
                    </div>
                </div>
            </div>
            
        
        </div>
    );
}
export default SideBar;