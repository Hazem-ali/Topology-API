const fs = require('fs')


class toplogy {
  
  constructor(filename) {
    
    this.filename = filename
    // this.data='lool'
    this.data = this.retrieve()
    console.log(this.data)

  }
  


  retrieve  () {

    // console.log(data)
    let x = ''
    let data = ''
    let lol = fs.readFile(this.filename, 'utf8',x = (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      data = JSON.parse(data)
      
      // console.log(data)
      this.data = data
      // console.log(this.data.components)
      return data
      
    })
    return lol


  }


  write  (data) {

    fs.writeFile(this.filename, data, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }



  query_devices ()  {
    // iterating over components of a topology
    console.log(this.data)
    return this.data.component
    // for (let index = 0; index < this.data.components.length; index++) {
    //   const element = this.data.components[index];
    //   console.log(element);

    // }
  }
  query_netlist ()  {
    // iterating over components of a topology
    for (let i = 0; i < this.data.components.length; i++) {
      const component = this.data.components[i];
      // iterating over netlist in a component
      return component.netlist;
      // for (let j = 0; j < component.netlist.length; j++) {
      //   const element = component.netlist[j];
      //   console.log(element)

      // }


    }
  }





}



function Toplogies() {
  this.toplogies = []

  this.add_topology = (top) => {
    this.toplogies.push(top);
  }

  this.queryTopologies = () => {

    for (let index = 0; index < this.toplogies.length; index++) {
      const top = this.toplogies[index];
      console.log(top.retrieve())

      // console.log(element)
    }
  }
  this.removeTopology = (id) => {
    let index = 0;
    for (index = 0; index < this.toplogies.length; index++) {
      const top = this.toplogies[index];
      data = top.retrieve()
      if (data.id == id) {
        break;
      }
      // console.log(element)
    }
    if (index > -1) {
      this.toplogies.splice(index, 1);
    }
  }



};





let x = new toplogy("topology.json");
data = x.retrieve()

// console.log(data)
// console.log("################################################")
// console.log(x.query_devices)
// console.log("################################################")
// console.log(x)

