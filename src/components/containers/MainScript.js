import React,{ Component } from "react";
import Navbar from "../presentational/NavbarComponent"
import Slider from "../presentational/SliderComponent";
import PostList from "./PostListComponent";
import Sidebar from "../presentational/SideBarComponent";
import Footer from "../presentational/FooterComponent";

export default class Main extends Component{
    render(){
        return(<div>
            <Navbar/>
            <Slider/>
            <PostList/>
            <Sidebar/>
            <Footer/>
            </div>
        )
    }
}