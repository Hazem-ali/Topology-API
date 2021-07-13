const fs = require('fs');
const { stringify } = require('querystring');


class toplogy {
  
  
  constructor(filename) {
    
    this.filename = filename
    this.data = ''
    // this.data='lool'
    const data = fs.readFileSync(this.filename,{encoding:'utf8', flag:'r'});
    if (data != ''){
      this.data = JSON.parse(data)

    }
    // this.data = this.retrieve()
    // console.log(this.data)

  }
  


  retrieve  () {

    // console.log(data)
    
    
    // console.log(JSON.parse(data))
    return this.data


  }


  write (data_to_write) {

    
    fs.writeFile(this.filename, data_to_write, function (err) {
      if (err) {
        
        return console.log(err);
      }
      
      console.log("The file was saved!");
    });
  }



  query_devices ()  {
    // iterating over components of a topology
    // console.log(this.data)
    return this.data.components
    // for (let index = 0; index < this.data.components.length; index++) {
    //   const element = this.data.components[index];
    //   console.log(element);

    // }
  }
  query_netlist ()  {
    // iterating over components of a topology
    for (let i = 0; i < this.data.components.length; i++) {
      const component = this.data.components[i];
      
      console.log(component.netlist);
      // for (let j = 0; j < component.netlist.length; j++) {
      //   const element = component.netlist[j];
      //   console.log(element)

      // }


    }
  }





}



class Topologies {
  toplogies = []

  add_topology (top)  {
    this.toplogies.push(top);
  }

  queryTopologies () {
    console.log("Printing All Topologies")
    for (let index = 0; index < this.toplogies.length; index++) {
      const top = this.toplogies[index];
      console.log(top.retrieve())

      // console.log(element)
    }
  }
  removeTopology  (id) {
    let index = 0;
    for (index = 0; index < this.toplogies.length; index++) {
      const top = this.toplogies[index];
      let data = top.retrieve()
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





let top1 = new toplogy("topology.json");
let new_topology_json = {
  "id": "top15",
  "components": [
    {
      "type": "resistor",
      "id": "res1",
      "resistance": {
        "default": 200,
        "min": 10,
        "max": 1000
      },
      "netlist": {
        "t1": "vdd",
        "t2": "n1"
      }
    },
    {
      "type": "nmos",
      "id": "m1",
      "m(l)": {
        "deafult": 2.5,
        "min": 2,
        "max": 4
      },
      "netlist": {
        "drain": "n1",
        "gate": "vin",
        "source": "vss"
      }
    }
  ]
};

console.log("Retreival")
console.log(top1.retrieve())
console.log("-----------------------------------------------")
console.log("Write then read")


let top15 = new toplogy("top15.json");
console.log(top15.write(JSON.stringify(new_topology_json)))
console.log("-----------------------------------------------")
console.log(top1.query_devices())
console.log("-----------------------------------------------")
console.log(top1.query_netlist())

let topologies = new Topologies()
topologies.add_topology(top1)
topologies.add_topology(top15)
topologies.queryTopologies()
console.log('Now removing top15 topology, then we query again')
topologies.removeTopology('top15')
topologies.queryTopologies()


