import React from "react"
import * as firebase from "firebase"
 var config = {
    apiKey: "AIzaSyCF4M9Al9rivJKVLs-rW3Y7kmYRKKHsU6k",
    authDomain: "fir-signup-4e72c.firebaseapp.com",
    databaseURL: "https://fir-signup-4e72c.firebaseio.com/",
    storageBucket: "fir-signup-4e72c.appspot.com",
    messagingSenderId: "108609754613"
  };
   firebase.initializeApp(config);
//   firebase.database().ref().child("react").set({
//       speed:10
//   })

var TodoForm = React.createClass({

handleList:function(e){
    e.preventDefault();
    var value = this.refs.name.value;
    this.props.passValue(value);
    this.refs.name.value="";
},
    render:function(){
        return(
            <form onSubmit={this.handleList} className="form-group">
            <input type="text" ref="name" className="form-control"/>
            <button>+</button>
            </form>
        )
    }
});

var TodoList = React.createClass({
    getInitialState:function(){
        return {
            editing:false,
        }
    },

    remove:function(){
        this.props.onRemove(this.props.index);
    },

    edit:function(){
        this.setState({
            editing:true,
        })
    },
    save:function(){

    },

    renderDisplay:function(){
        return (
            <li>
            {this.props.children}
            <span>
            <button onClick={this.remove}>delete</button>
            <button onClick={this.edit}>edit</button>
            </span>
            </li> 
        )
    },
    takeHandleSave:function(){
         var saveValue = this.refs.name.value;
         this.props.onSave(saveValue,this.props.index);
         this.setState({
             editing:false,
         })
        },

    renderForm:function(){
        
        return (
        <form>
        <input type="text" ref="name" defaultValue={this.props.children} className="form-control"/>
        <button onClick={this.takeHandleSave}>save</button>
        </form>
        )
    },
   
   render:function(){
       if(this.state.editing){
           return this.renderForm();
       }
       else {
           return this.renderDisplay();
       }
   }
});


var TodoApp = React.createClass({
    componentWillMount:function(){
     var todos = [];
 firebase.database().ref().once('value',snap=>{
     snap.forEach(function(data){
         todos.push(data.val().app);
     })
     this.setState({notes:todos})
  })
 },
    getInitialState:function(){
        return {
            editing:false,

            notes:[

            ],
        }
    },
    addList:function(val){
    var arr = this.state.notes;
    arr.push(val);
    firebase.database().ref().push({
        app:val
    })
    this.setState({
        notes:arr,
    })
    },
     handleRemove:function(i){
     var arr = this.state.notes;
     arr.splice(i,1);
     this.setState({
         notes:arr,
     })
    },
    handleSave:function(save,i){
    var arr = this.state.notes;
    arr[i] = save;
    this.setState({
        notes:arr
    })
    },
    eachNote:function(note,i){
        return  <TodoList key={i} index={i} onRemove={this.handleRemove} onSave={this.handleSave}>{note}</TodoList>
    },
    render:function(){
        return (
            <div>
            {this.state.speed}pak
             <TodoForm passValue={this.addList}/>
             <ul>
             {this.state.notes.map(this.eachNote)}
             </ul>
            </div>
        )
    }
});
module.exports = TodoApp;