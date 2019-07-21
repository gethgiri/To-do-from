import React from 'react';
import './App.css';

class App extends React.Component {
constructor(props){
super(props);
this.state={
name:"",
eventTitle:"",
details:"",
objdata:{},
list:[],
toggleIndex:"",
editName: "",
editEventTitle: "",
editDetails: "",
editObj: {}

}
}

handleName(event){

  this.setState({
    name:event.target.value
  })
  


  }
handleEventTitle(event){

  this.setState({
    eventTitle:event.target.value
  })
  }
handleDetails(event){

  this.setState({
    details:event.target.value
  })
  } 




submitHandle(event){
    this.state.objdata['namevalue']=this.state.name;
    this.state.objdata['eventTitlevalue']=this.state.eventTitle;
    this.state.objdata['detailsvalue']=this.state.details;
    this.setState({
         objdata: this.state.objdata
         }, () => {
            console.log("datasss",this.state.objdata)
            this.state.list.push(this.state.objdata);
            this.setState({
                  list: this.state.list
                   }, () => {
                      console.log("arrayss are",this.state.list)
                          this.setState({
                                objdata:{},
                                name:"",
                                eventTitle:"",
                                details:""

                              })

                          })

                  })

          } 


resetHandle(event){

this.setState({
objdata:{},
name:"",
eventTitle:"",
details:""

          })
}

editcard(data,id){
  console.log("testdata", data,id);
  this.setState({
    toggleIndex:id
  })

}
deletecard(id){
  this.state.list.splice(id,1);
  this.setState({
    list:this.state.list
  })}


updateName(e){
this.setState({
editName: e.target.value
})
}

updateEventTitle(e){
this.setState({
editEventTitle: e.target.value
})
}

updateDetails(e){
this.setState({
editDetails: e.target.value
})
}

editUpdateCard(user, idx){
console.log("toggleEditData", user, idx);
let oldName = user.namevalue;
let oldEventTitle = user.eventTitlevalue;
let oldDetails = user.detailsvalue;

this.setState({
    editName: (this.state.editName) ?  this.state.editName : oldName,
    editEventTitle: (this.state.editEventTitle) ?  this.state.editEventTitle : oldEventTitle,
    editDetails: (this.state.editDetails) ? this.state.editDetails : oldDetails
  }, () => {
    console.log("state", this.state.editName, this.state.editEventTitle, this.state.editDetails)
    this.state.editObj['namevalue'] = this.state.editName;
    this.state.editObj['eventTitlevalue'] = this.state.editEventTitle;
    this.state.editObj['detailsvalue'] = this.state.editDetails;
    this.setState({
      editObj: this.state.editObj
    }, () => {
      console.log("editObj", this.state.editObj)
      if(this.state.editName !== null && this.state.editEventTitle !== null && this.state.editDetails !== null){
        if( this.state.editName !== oldName || this.state.editEventTitle !== oldEventTitle
         || this.state.editDetails !== oldDetails) {


                let updateUserData = [...this.state.list];
                const indexToUpdate = updateUserData.findIndex(function(user, id){
                  return id === idx;
                })
                console.log("indexToUpdate", indexToUpdate);

                this.setState({
                  list: [...this.state.list.slice(0, indexToUpdate), this.state.editObj, 
                  ...this.state.list.slice(indexToUpdate + 1)]
                })
        }
        this.setState({
            toggleIndex: ""
          }, () => {
            this.setState({
              editName: "",
              editEventTitle: "",
              editDetails: "",
              editObj: {}
            })
          })
      }

    })

  })
}


render(){
return (
<div >
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-5 text-center">Let's set your reminders</h1>
      </div>
    </div>
    <div className="bg-dark container-fluid">
    <div className="row">

    <div className="col-sm-12 col-md-4 col-lg-4 "></div>

    <div className="col-sm-12 col-md-4 col-lg-4 ">
    <div className="card login-card ">
    <div className=" card-header ">
    <h3 className="text-center"> TO-DO LIST FORM</h3>
    </div>

                    <div className="card-body">
                     <form className="form-elements">
                        <input value={this.state.name} className="form-control form-inputs form-elements" type="text"   onChange={this.handleName.bind(this)} placeholder="user name"/>
                        <input value={this.state.eventTitle} className="form-control form-inputs form-elements" type="text"   onChange={this.handleEventTitle.bind(this)} placeholder="Event Title"/>
                        <input value={this.state.details} className="form-control form-inputs form-elements" type="text"   onChange={this.handleDetails.bind(this)} placeholder="Details "/>
                      </form>
                    </div>

                   <div className="card-footer ">

                    <button type="submit" onClick={this.submitHandle.bind(this)} className="btn-primary offset-lg-1 offset-md-0  btn-sm ">Create</button>

                    <button type="reset" onClick={this.resetHandle.bind(this)} className="btn-primary  offset-lg-5  offset-md-0 btn-sm">cancel</button>


                   </div>

        </div>
    </div>
    <div className="col-sm-12 col-md-4 col-lg-4 "></div>

    </div>




        <div className="container-fluid  bg-dark">

        <div className="row ">
              
              {(this.state.list.map((data,id)=>{
                if(id ===this.state.toggleIndex){

                  return(
                  <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="card todo-card">
                  <div className="card-header">
                  <input type="text" onChange={this.updateName.bind(this)} defaultValue ={data.namevalue}/>

                   </div>
                    <div className="card-title offset-3 " >
                     <input type="text" onChange={this.updateEventTitle.bind(this)}  defaultValue ={data.eventTitlevalue}/>
                     </div>
                    <div className="card-body">
                    <input type="text" onChange={this.updateDetails.bind(this)} defaultValue ={data.detailsvalue}/>

                    </div>
                    <div className="card-footer">
                         <button className="bt btn-success"onClick={this.editUpdateCard.bind(this, data, id)}>Update</button>
                         <button className="bt btn-warning" onClick={this.deletecard.bind(this,id)}>Delete</button>
                    
                    </div>
                    </div>
                    </div>
                  ); 
                }


                return(

                  <div className="col-sm-12 col-md-6 col-lg-4">
                   
                  <div className="card todo-card">
                  <div className="card-header">
                  <span class="badge badge-secondary">Total Task-Remaining -{id+1}</span>
                   
                  <h5>{data.namevalue}'s reminder</h5>

                  </div>

                    <div className="card-title text-center">
                       <h3><p><ins>{data.eventTitlevalue}</ins></p></h3>
                   </div>
                    <div className="card-body">
                    <h5>{data.detailsvalue}</h5>

                    </div>
                      <div className="card-footer">
                         <button className="bt btn-success" onClick={this.editcard.bind(this,data,id) }>Edit</button>
                       <button className="bt btn-warning" onClick={this.deletecard.bind(this,id)}>Delete</button>
                      </div>
                     </div>
                     </div>
                  );
              }))}

        </div>
        </div>
      </div>

        <div className="footer footer-copyright" style={{background:'#e9ecef'}}>
          <div class="container">
            <h6 class=" text-center">Just make it work ;)</h6>
          </div>
        </div>
</div>

);
}

}

export default App;

